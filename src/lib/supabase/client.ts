// lib/supabase/client.ts
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'

export const createClient = () => {
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
