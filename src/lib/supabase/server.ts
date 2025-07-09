// lib/supabase/server.ts
import { createServerClient, type CookieOptions } from '@supabase/ssr'
import { cookies } from 'next/headers'
import { NextRequest, NextResponse } from 'next/server'

export function createClient() {
  const cookieStore = cookies()

  return createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        get(name: string) {
          return cookieStore.get(name)?.value
        },
        set(name: string, value: string, options: CookieOptions) {
          try {
            cookieStore.set({ name, value, ...options })
          } catch {
            // The `set` method was called from a Server Component.
            // This can be ignored if you have middleware refreshing
            // user sessions.
          }
        },
        remove(name: string, options: CookieOptions) {
          try {
            cookieStore.set({ name, value: '', ...options })
          } catch {
            // The `delete` method was called from a Server Component.
            // This can be ignored if you have middleware refreshing
            // user sessions.
          }
        },
      },
    }
  )
}

// For API routes that need request/response context
export function createClientFromRequest(request: NextRequest) {
  let response = NextResponse.next({
    request: {
      headers: request.headers,
    },
  })

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        get(name: string) {
          return request.cookies.get(name)?.value
        },
        set(name: string, value: string, options: CookieOptions) {
          request.cookies.set({
            name,
            value,
            ...options,
          })
          response = NextResponse.next({
            request: {
              headers: request.headers,
            },
          })
          response.cookies.set({
            name,
            value,
            ...options,
          })
        },
        remove(name: string, options: CookieOptions) {
          request.cookies.set({
            name,
            value: '',
            ...options,
          })
          response = NextResponse.next({
            request: {
              headers: request.headers,
            },
          })
          response.cookies.set({
            name,
            value: '',
            ...options,
          })
        },
      },
    }
  )

  return { supabase, response }
}

// Utility to get user from server context
export async function getUser() {
  const supabase = createClient()
  const { data: { user }, error } = await supabase.auth.getUser()
  
  if (error || !user) {
    return null
  }
  
  return user
}

// Utility to get user profile with subscription info
export async function getUserProfile(userId?: string) {
  const supabase = createClient()
  
  let targetUserId = userId
  if (!targetUserId) {
    const { data: { user } } = await supabase.auth.getUser()
    if (!user) return null
    targetUserId = user.id
  }
  
  const { data: profile, error } = await supabase
    .from('profiles')
    .select('*')
    .eq('id', targetUserId)
    .single()
  
  if (error) {
    console.error('Error fetching user profile:', error)
    return null
  }
  
  return profile
}

// Check if user has premium access
export async function checkPremiumAccess(userId?: string): Promise<boolean> {
  const profile = await getUserProfile(userId)
  return profile?.subscription_status === 'active'
}

// Usage tracking utilities
export async function trackUsage(
  userId: string, 
  action: string, 
  metadata: Record<string, any> = {}
) {
  const supabase = createClient()
  
  const { error } = await supabase
    .from('usage_logs')
    .insert({
      user_id: userId,
      action,
      metadata,
      created_at: new Date().toISOString()
    })
    
  if (error) {
    console.error('Error tracking usage:', error)
  }
}

// Check daily usage limits
export async function checkUsageLimit(
  userId: string, 
  action: string, 
  dailyLimit: number
): Promise<{ canUse: boolean; remaining: number }> {
  const supabase = createClient()
  
  const today = new Date().toISOString().split('T')[0]
  
  const { data, error } = await supabase
    .from('usage_logs')
    .select('id')
    .eq('user_id', userId)
    .eq('action', action)
    .gte('created_at', today)
  
  if (error) {
    console.error('Error checking usage limit:', error)
    return { canUse: false, remaining: 0 }
  }
  
  const currentUsage = data?.length || 0
  const remaining = Math.max(0, dailyLimit - currentUsage)
  
  return {
    canUse: currentUsage < dailyLimit,
    remaining
  }
}

// Free tier limits
export const FREE_TIER_LIMITS = {
  AI_GENERATIONS: 3,
  RESUME_SAVES: 10,
  PDF_DOWNLOADS: 2,
  ATS_SCANS: 5
} as const

// Check if user can perform action
export async function canPerformAction(
  userId: string, 
  action: keyof typeof FREE_TIER_LIMITS
): Promise<{ allowed: boolean; remaining: number; isPremium: boolean }> {
  const isPremium = await checkPremiumAccess(userId)
  
  if (isPremium) {
    return { allowed: true, remaining: Infinity, isPremium: true }
  }
  
  const actionMap = {
    AI_GENERATIONS: 'ai_generation',
    RESUME_SAVES: 'resume_save',
    PDF_DOWNLOADS: 'pdf_download',
    ATS_SCANS: 'ats_scan'
  }
  
  const limit = FREE_TIER_LIMITS[action]
  const { canUse, remaining } = await checkUsageLimit(
    userId, 
    actionMap[action], 
    limit
  )
  
  return { allowed: canUse, remaining, isPremium: false }
}
