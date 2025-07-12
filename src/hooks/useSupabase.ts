import { createClient } from '@/lib/supabase/client';
import { useEffect, useState } from 'react';
import type { SupabaseClient } from '@supabase/supabase-js';

/**
 * Custom hook that provides a Supabase client instance
 * This hook ensures the client is properly initialized and available for use
 */
export function useSupabase(): SupabaseClient {
  const [client] = useState(() => createClient());

  return client;
}
