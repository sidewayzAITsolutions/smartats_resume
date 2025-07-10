import { useState, useEffect, useCallback } from 'react';
import { createClient } from '@/lib/supabase/client';
import { toast } from 'react-hot-toast';

interface PremiumStatus {
  isPremium: boolean;
  subscriptionStatus: string | null;
  loading: boolean;
  error: string | null;
}

export function usePremiumStatus() {
  const [status, setStatus] = useState<PremiumStatus>({
    isPremium: false,
    subscriptionStatus: null,
    loading: true,
    error: null
  });

  const checkUserStatus = useCallback(async () => {
    try {
      setStatus(prev => ({ ...prev, loading: true, error: null }));
      
      const supabase = createClient();
      const { data: { user }, error: userError } = await supabase.auth.getUser();

      if (userError || !user) {
        setStatus({
          isPremium: false,
          subscriptionStatus: null,
          loading: false,
          error: userError?.message || 'Not authenticated'
        });
        return;
      }

      // Fetch user profile with premium status
      const { data: profile, error: profileError } = await supabase
        .from('profiles')
        .select('is_premium, subscription_status')
        .eq('id', user.id)
        .single();

      if (profileError) {
        console.error('Error fetching profile:', profileError);
        setStatus(prev => ({
          ...prev,
          loading: false,
          error: 'Failed to fetch premium status'
        }));
        return;
      }

      setStatus({
        isPremium: profile?.is_premium || false,
        subscriptionStatus: profile?.subscription_status || null,
        loading: false,
        error: null
      });

    } catch (error) {
      console.error('Error checking premium status:', error);
      setStatus(prev => ({
        ...prev,
        loading: false,
        error: 'Failed to check premium status'
      }));
    }
  }, []);

  // Check for upgrade parameter on mount and URL changes
  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const upgraded = urlParams.get('upgraded');
    const sessionId = urlParams.get('session_id');
    
    if (upgraded === 'true' || sessionId) {
      // User returned from successful payment
      console.log('Payment success detected, refreshing premium status...');
      
      // Show success message
      if (upgraded === 'true') {
        toast.success('🎉 Welcome to Premium! Your account has been upgraded.');
      }
      
      // Refresh status with a slight delay to ensure webhook has processed
      setTimeout(() => {
        checkUserStatus();
      }, 2000);
      
      // Clean up URL parameters
      const newUrl = window.location.pathname;
      window.history.replaceState({}, '', newUrl);
    } else {
      // Normal status check
      checkUserStatus();
    }
  }, [checkUserStatus]);

  // Listen for storage events (when user upgrades in another tab)
  useEffect(() => {
    const handleStorageChange = (e: StorageEvent) => {
      if (e.key === 'premium_status_updated') {
        console.log('Premium status updated in another tab, refreshing...');
        checkUserStatus();
        // Clear the storage flag
        localStorage.removeItem('premium_status_updated');
      }
    };

    window.addEventListener('storage', handleStorageChange);
    return () => window.removeEventListener('storage', handleStorageChange);
  }, [checkUserStatus]);

  // Manual refresh function
  const refreshStatus = useCallback(() => {
    checkUserStatus();
  }, [checkUserStatus]);

  // Function to trigger status update across tabs
  const triggerStatusUpdate = useCallback(() => {
    localStorage.setItem('premium_status_updated', Date.now().toString());
    checkUserStatus();
  }, [checkUserStatus]);

  return {
    ...status,
    refreshStatus,
    triggerStatusUpdate
  };
}
