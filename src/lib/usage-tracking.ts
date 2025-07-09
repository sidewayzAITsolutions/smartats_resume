// lib/usage-tracking.ts
import { createClient } from '@supabase/supabase-js';

// Define action types
export enum UsageAction {
  RESUME_SAVE = 'resume_save',
  ATS_SCAN = 'ats_scan',
  PDF_DOWNLOAD = 'pdf_download',
  TEMPLATE_CHANGE = 'template_change',
  PREMIUM_FEATURE = 'premium_feature'
}

// Define usage limits (can be stored in DB later)
export const USAGE_LIMITS = {
  free: {
    [UsageAction.RESUME_SAVE]: 5,
    [UsageAction.ATS_SCAN]: 3,
    [UsageAction.PDF_DOWNLOAD]: 3,
    [UsageAction.TEMPLATE_CHANGE]: 10,
  },
  premium: {
    [UsageAction.RESUME_SAVE]: -1, // unlimited
    [UsageAction.ATS_SCAN]: -1,
    [UsageAction.PDF_DOWNLOAD]: -1,
    [UsageAction.TEMPLATE_CHANGE]: -1,
  }
};

export class UsageTracker {
  private supabase: any;
  private userId: string | null = null;

  constructor(supabase: any) {
    this.supabase = supabase;
  }

  async initialize() {
    const { data: { user } } = await this.supabase.auth.getUser();
    this.userId = user?.id || null;
  }

  // Track a usage action
  async trackUsage(action: UsageAction, metadata: any = {}) {
    if (!this.userId) {
      throw new Error('User not authenticated');
    }

    try {
      const { data, error } = await this.supabase
        .rpc('log_usage', {
          p_user_id: this.userId,
          p_action: action,
          p_metadata: metadata
        });

      if (error) throw error;
      return data;
    } catch (error) {
      console.error('Error tracking usage:', error);
      throw error;
    }
  }

  // Check if user can perform action
  async canPerformAction(action: UsageAction): Promise<boolean> {
    if (!this.userId) {
      throw new Error('User not authenticated');
    }

    try {
      // First check if user is premium
      const isPremium = await this.checkPremiumStatus();
      
      if (isPremium) {
        return true; // Premium users have unlimited access
      }

      // Check daily limit for free users
      const limit = USAGE_LIMITS.free[action];
      if (limit === -1) return true; // Unlimited

      const { data, error } = await this.supabase
        .rpc('check_daily_limit', {
          p_user_id: this.userId,
          p_action: action,
          p_limit: limit
        });

      if (error) throw error;
      return data;
    } catch (error) {
      console.error('Error checking usage limit:', error);
      return false;
    }
  }

  // Get usage count for today
  async getDailyUsageCount(action: UsageAction): Promise<number> {
    if (!this.userId) {
      throw new Error('User not authenticated');
    }

    try {
      const { data, error } = await this.supabase
        .rpc('get_daily_usage_count', {
          p_user_id: this.userId,
          p_action: action
        });

      if (error) throw error;
      return data || 0;
    } catch (error) {
      console.error('Error getting usage count:', error);
      return 0;
    }
  }

  // Get remaining uses for today
  async getRemainingUses(action: UsageAction): Promise<number | null> {
    const isPremium = await this.checkPremiumStatus();
    
    if (isPremium) {
      return null; // Unlimited for premium
    }

    const limit = USAGE_LIMITS.free[action];
    if (limit === -1) return null; // Unlimited

    const used = await this.getDailyUsageCount(action);
    return Math.max(0, limit - used);
  }

  // Check premium status (implement based on your subscription system)
  private async checkPremiumStatus(): Promise<boolean> {
    // TODO: Implement your premium check logic
    // This could check a subscriptions table or user metadata
    try {
      const { data: profile } = await this.supabase
        .from('profiles')
        .select('is_premium')
        .eq('id', this.userId)
        .single();
      
      return profile?.is_premium || false;
    } catch {
      return false;
    }
  }

  // Get usage statistics
  async getUsageStats(startDate?: Date, endDate?: Date) {
    if (!this.userId) {
      throw new Error('User not authenticated');
    }

    try {
      let query = this.supabase
        .from('usage_statistics')
        .select('*')
        .eq('user_id', this.userId);

      if (startDate) {
        query = query.gte('usage_date', startDate.toISOString().split('T')[0]);
      }
      if (endDate) {
        query = query.lte('usage_date', endDate.toISOString().split('T')[0]);
      }

      const { data, error } = await query;
      if (error) throw error;
      return data;
    } catch (error) {
      console.error('Error getting usage stats:', error);
      return [];
    }
  }
}

// Hook for React components
export function useUsageTracking(supabase: any) {
  const tracker = new UsageTracker(supabase);
  
  return {
    trackUsage: tracker.trackUsage.bind(tracker),
    canPerformAction: tracker.canPerformAction.bind(tracker),
    getDailyUsageCount: tracker.getDailyUsageCount.bind(tracker),
    getRemainingUses: tracker.getRemainingUses.bind(tracker),
    getUsageStats: tracker.getUsageStats.bind(tracker),
    initialize: tracker.initialize.bind(tracker)
  };
}
