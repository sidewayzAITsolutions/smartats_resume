// lib/auth-utils.ts
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';
import { toast } from 'react-hot-toast';

export interface UserProfile {
  id: string;
  email: string;
  full_name?: string;
  avatar_url?: string;
  is_premium: boolean;
  subscription_status: string;
  created_at: string;
  updated_at?: string;
}

export class AuthService {
  private supabase = createClientComponentClient();

  async signInWithGoogle(callbackUrl = '/templates') {
    try {
      console.log('🚀 Starting Google OAuth...');
      
      const { data, error } = await this.supabase.auth.signInWithOAuth({
        provider: 'google',
        options: {
          redirectTo: `${window.location.origin}/auth/callback?next=${encodeURIComponent(callbackUrl)}`,
          queryParams: {
            access_type: 'offline',
            prompt: 'consent',
          },
        }
      });

      if (error) {
        console.error('❌ Google OAuth error:', error);
        toast.error(error.message);
        throw error;
      }

      console.log('✅ OAuth redirect initiated');
      return data;
      
    } catch (error) {
      console.error('❌ Unexpected Google OAuth error:', error);
      toast.error('Failed to connect with Google');
      throw error;
    }
  }

  async signInWithEmail(email: string, password: string) {
    try {
      const { data, error } = await this.supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) {
        toast.error(error.message);
        throw error;
      }

      if (data.user) {
        await this.ensureUserProfile(data.user);
        toast.success('Welcome back!');
      }

      return { user: data.user, session: data.session };
    } catch (error) {
      throw error;
    }
  }

  async signOut() {
    try {
      const { error } = await this.supabase.auth.signOut();
      
      if (error) {
        toast.error(error.message);
        throw error;
      }

      toast.success('Signed out successfully');
    } catch (error) {
      throw error;
    }
  }

  async getCurrentUser() {
    const { data: { user }, error } = await this.supabase.auth.getUser();
    
    if (error) {
      console.error('Error getting current user:', error);
      return null;
    }

    return user;
  }

  async getUserProfile(userId: string): Promise<UserProfile | null> {
    try {
      const { data, error } = await this.supabase
        .from('profiles')
        .select('*')
        .eq('id', userId)
        .single();

      if (error) {
        console.error('Error fetching user profile:', error);
        return null;
      }

      return data;
    } catch (error) {
      console.error('Unexpected error fetching profile:', error);
      return null;
    }
  }

  private async ensureUserProfile(user: any) {
    try {
      // Check if profile exists
      const { data: existingProfile } = await this.supabase
        .from('profiles')
        .select('*')
        .eq('id', user.id)
        .single();

      if (!existingProfile) {
        // Create profile
        const { error: insertError } = await this.supabase
          .from('profiles')
          .insert({
            id: user.id,
            email: user.email,
            full_name: user.user_metadata?.full_name || '',
            avatar_url: user.user_metadata?.avatar_url || '',
            is_premium: false,
            subscription_status: 'free',
          });

        if (insertError) {
          console.error('Error creating user profile:', insertError);
        } else {
          console.log('✅ User profile created');
        }
      }
    } catch (error) {
      console.error('Error ensuring user profile:', error);
    }
  }

  // Auth state listener
  onAuthStateChange(callback: (event: string, session: any) => void) {
    return this.supabase.auth.onAuthStateChange(callback);
  }
}

// Singleton instance
export const authService = new AuthService();

// Helper functions
export const getAuthErrorMessage = (error: any): string => {
  if (typeof error === 'string') return error;
  if (error?.message) return error.message;
  return 'An authentication error occurred';
};

export const isAuthError = (error: any): boolean => {
  return error?.message && typeof error.message === 'string';
};
