// lib/cache.ts
import { unstable_cache } from 'next/cache';
import { createClient } from '@supabase/supabase-js'; // Add this import

export const getCachedTemplates = unstable_cache(
  async () => {
    const supabase = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
    );
    const { data } = await supabase.from('templates').select('*');
    return data;
  },
  ['templates'],
  { revalidate: 3600 } // 1 hour
);
