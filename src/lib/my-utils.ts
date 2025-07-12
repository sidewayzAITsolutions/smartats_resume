import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';

/**
 * Forces a refresh of the user's premium status by refreshing the session.
 * Works in both Node.js and browser environments.
 * Optionally triggers a UI update by updating localStorage (browser only).
 */
export async function refreshUserPremiumStatus() {
  const supabase = createClientComponentClient();

  try {
    // Refresh the session to get latest user data
    const { data, error } = await supabase.auth.refreshSession();
    const { session } = data;
    // If running in a browser, optionally trigger a UI update
    if (typeof window !== 'undefined' && session) {
      // Browser-only: update localStorage to trigger UI refresh
      localStorage.setItem('premium_activated', new Date().toISOString());
    }
  } catch (error) {
    console.error('Failed to refresh user premium status:', error);
  }
}

