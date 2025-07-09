// app/auth/signin/page.tsx
'use client';

import { useEffect, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { createClient } from '@/lib/supabase/client';
import { Button } from '@/components/ui/Button';
import { FcGoogle } from 'react-icons/fc';

export default function SignInPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const supabase = createClient();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Get the callback URL from query params or default to templates
  const callbackUrl = searchParams.get('callbackUrl') || '/templates';

  // Check if user is already signed in
  useEffect(() => {
    const checkUser = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (user) {
        // User is already signed in, redirect to callback URL
        router.push(callbackUrl);
      }
    };
    
    checkUser();
  }, [router, callbackUrl, supabase.auth]);

  // Listen for auth state changes
  useEffect(() => {
    const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
      console.log('Auth event:', event); // Debug log
      
      if (event === 'SIGNED_IN' && session) {
        console.log('User signed in, redirecting to:', callbackUrl);
        router.push(callbackUrl);
      }
    });

    return () => subscription.unsubscribe();
  }, [router, callbackUrl, supabase.auth]);

  const handleGoogleSignIn = async () => {
    try {
      setLoading(true);
      setError(null);

      const { error } = await supabase.auth.signInWithOAuth({
        provider: 'google',
        options: {
          redirectTo: `${window.location.origin}/auth/callback?next=${encodeURIComponent(callbackUrl)}`,
          queryParams: {
            access_type: 'offline',
            prompt: 'consent',
          },
        },
      });

      if (error) {
        console.error('Sign in error:', error);
        setError(error.message);
      }
    } catch (error) {
      console.error('Unexpected error:', error);
      setError('An unexpected error occurred');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="max-w-md w-full space-y-8">
        <div className="text-center">
          <h2 className="text-3xl font-bold text-gray-900">Sign in to SmartATSResume</h2>
          <p className="mt-2 text-gray-600">
            Sign in to save and manage your resumes
          </p>
        </div>

        <div className="bg-white py-8 px-10 shadow rounded-lg">
          {error && (
            <div className="mb-4 p-3 bg-red-50 border border-red-200 text-red-600 rounded-md text-sm">
              {error}
            </div>
          )}

          <Button
            onClick={handleGoogleSignIn}
            disabled={loading}
            className="w-full flex items-center justify-center gap-3"
            variant="outline"
          >
            <FcGoogle className="w-5 h-5" />
            {loading ? 'Signing in...' : 'Continue with Google'}
          </Button>

          <div className="mt-6 text-center text-sm text-gray-600">
            By signing in, you agree to our{' '}
            <a href="/terms" className="text-blue-600 hover:underline">
              Terms of Service
            </a>{' '}
            and{' '}
            <a href="/privacy" className="text-blue-600 hover:underline">
              Privacy Policy
            </a>
          </div>
        </div>

        {/* Debug info - remove in production */}
        <div className="text-xs text-gray-500 text-center">
          Callback URL: {callbackUrl}
        </div>
      </div>
    </div>
  );
}
  
