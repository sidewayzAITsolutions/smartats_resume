'use client';

import React, { useEffect, useState, Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';
import { CheckCircle, ArrowRight, Loader2 } from 'lucide-react';
import toast from 'react-hot-toast';
import { refreshUserPremiumStatus } from '@/lib/my-utils';

const PaymentSuccessContent = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const supabase = createClientComponentClient();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const updatePremiumStatus = async () => {
      try {
        // Get the current user
        const { data: { user }, error: authError } = await supabase.auth.getUser();
        
        if (authError || !user) {
          throw new Error('User not authenticated');
        }

        // Force update the user's premium status in the database
        const { error: updateError } = await supabase
          .from('profiles')
          .update({
            is_premium: true,
            subscription_status: 'active',
            updated_at: new Date().toISOString()
          })
          .eq('id', user.id);

        if (updateError) {
          console.error('Error updating premium status:', updateError);
          throw updateError;
        }

        // Clear any cached data to ensure fresh state
        await refreshUserPremiumStatus();

        // Show success message
        toast.success('Welcome to SmartATS Premium! 🎉');

        setLoading(false);
      } catch (err) {
        console.error('Error in payment success handler:', err);
        setError('There was an issue activating your premium features. Please contact support.');
        setLoading(false);
      }
    };

    updatePremiumStatus();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-950 flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="w-12 h-12 text-blue-500 animate-spin mx-auto mb-4" />
          <p className="text-white text-lg">Activating your premium features...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-950 flex items-center justify-center px-4">
        <div className="max-w-md w-full bg-gray-900 rounded-xl p-8 text-center">
          <div className="w-16 h-16 bg-red-900/20 rounded-full flex items-center justify-center mx-auto mb-4">
            <span className="text-3xl">⚠️</span>
          </div>
          <h1 className="text-2xl font-bold text-white mb-4">Activation Issue</h1>
          <p className="text-gray-400 mb-6">{error}</p>
          <button
            onClick={() => window.location.href = 'mailto:support@smartats.com'}
            className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            Contact Support
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-950 flex items-center justify-center px-4">
      <div className="max-w-2xl w-full">
        {/* Success Icon */}
        <div className="text-center mb-8">
          <div className="w-24 h-24 bg-green-900/20 rounded-full flex items-center justify-center mx-auto mb-4 animate-bounce">
            <CheckCircle className="w-12 h-12 text-green-500" />
          </div>
          <h1 className="text-4xl font-bold text-white mb-2">
            Payment Successful! 🎉
          </h1>
          <p className="text-xl text-gray-400 mb-8">
            Your payment was successful. All premium features are now unlocked!
          </p>
        </div>

        {/* Premium Features */}
        <div className="bg-gray-900 rounded-xl p-8 border border-gray-800 mb-8">
          <h2 className="text-2xl font-semibold text-white mb-6">
            Your Premium Features:
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {[
              { emoji: '✨', text: 'AI-Powered Summary Generation' },
              { emoji: '📊', text: 'Unlimited ATS Scans' },
              { emoji: '💾', text: 'Unlimited Resume Saves' },
              { emoji: '🎨', text: 'Premium Templates' },
              { emoji: '🔍', text: 'Advanced Keyword Analysis' },
              { emoji: '📧', text: 'Priority Email Support' },
              { emoji: '📈', text: 'Detailed Analytics' },
              { emoji: '🚀', text: 'Early Access to New Features' }
            ].map((feature, index) => (
              <div key={index} className="flex items-center space-x-3">
                <span className="text-xl">{feature.emoji}</span>
                <span className="text-gray-300">{feature.text}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4">
          <button
            onClick={() => {
              // Navigate with upgraded flag to trigger UI refresh
              router.push('/builder?upgraded=true');
            }}
            className="flex-1 flex items-center justify-center space-x-2 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            <span>Start Building</span>
            <ArrowRight className="w-5 h-5" />
          </button>
          
          <button
            onClick={() => {
              // Navigate with upgraded flag to trigger UI refresh
              router.push('/templates?upgraded=true');
            }}
            className="flex-1 px-6 py-3 bg-gray-800 text-white rounded-lg hover:bg-gray-700 transition-colors"
          >
            Browse Premium Templates
          </button>
        </div>

        {/* Support Note */}
        <p className="text-center text-sm text-gray-500 mt-8">
          Need help? Email us at{' '}
          <a href="mailto:support@smartats.com" className="text-blue-400 hover:text-blue-300">
            support@smartats.com
          </a>
        </p>
      </div>
    </div>
  );
};

const PaymentSuccessPage = () => {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-green-600 mx-auto"></div>
          <p className="mt-2 text-gray-600">Loading...</p>
        </div>
      </div>
    }>
      <PaymentSuccessContent />
    </Suspense>
  );
};

export default PaymentSuccessPage;

