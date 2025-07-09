// lib/supabase/client.ts
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'

export const createClient = () => {
  // Check if required environment variables are present
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
  const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

  if (!supabaseUrl || !supabaseAnonKey) {
    console.error('Missing Supabase environment variables:', {
      url: !!supabaseUrl,
      key: !!supabaseAnonKey
    })

    // Return a mock client for development to prevent crashes
    if (process.env.NODE_ENV === 'development') {
      console.warn('Creating mock Supabase client due to missing environment variables')
      return {
        auth: {
          getUser: () => Promise.resolve({ data: { user: null }, error: new Error('Supabase not configured') }),
          signInWithPassword: () => Promise.resolve({ data: null, error: new Error('Supabase not configured') }),
          signInWithOAuth: () => Promise.resolve({ data: null, error: new Error('Supabase not configured') }),
          signOut: () => Promise.resolve({ error: null })
        },
        from: () => ({
          select: () => ({
            eq: () => ({
              single: () => Promise.resolve({ data: null, error: new Error('Supabase not configured') })
            })
          }),
          insert: () => Promise.resolve({ data: null, error: new Error('Supabase not configured') })
        })
      } as any
    }

    throw new Error('Missing required Supabase environment variables. Please check your .env.local file.')
  }

  return createClientComponentClient()
}

// Helper to get the site URL
export const getSiteURL = () => {
  let url =
    process?.env?.NEXT_PUBLIC_SITE_URL ?? // Set this in your .env
    process?.env?.NEXT_PUBLIC_VERCEL_URL ?? // Automatically set by Vercel
    'http://localhost:3000'

  // Make sure to include `https://` when not localhost.
  url = url.includes('http') ? url : `https://${url}`
  // Make sure to include a trailing `/`.
  url = url.charAt(url.length - 1) === '/' ? url : `${url}/`
  
  return url
}
