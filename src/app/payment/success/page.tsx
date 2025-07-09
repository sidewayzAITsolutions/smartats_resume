
'use client';
import React, { useEffect, useState } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { CheckCircle, Sparkles, ArrowRight, Loader2, AlertCircle } from 'lucide-react';

const PaymentSuccessPage = () => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    // Optional: Trigger confetti animation
    const timer = setTimeout(() => {
      setLoading(false);
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  const verifyPayment = async () => {
    try {
      const sessionId = searchParams.get('session_id');
      if (!sessionId) {
        setError('Invalid payment session');
        return;
      }

      // Wait for webhook to process (give it time to update the database)
      await new Promise(resolve => setTimeout(resolve, 3000));

      // Force refresh user data in localStorage to clear any cached premium status
      if (typeof window !== 'undefined') {
        localStorage.removeItem('userData');
        localStorage.removeItem('userProfile');

        // Trigger a page reload to refresh all user data
        window.location.href = '/templates?upgraded=true';
      }

      setLoading(false);
    } catch (error) {
      console.error('Error verifying payment:', error);
      setError('Failed to verify payment. Please contact support.');
      setLoading(false);
    }
  };

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
      <div className="min-h-screen bg-gray-950 flex items-center justify-center">
        <div className="text-center max-w-md">
          <div className="bg-red-500/20 rounded-full w-20 h-20 flex items-center justify-center mx-auto mb-6">
            <AlertCircle className="w-10 h-10 text-red-500" />
          </div>
          <h1 className="text-3xl font-bold text-white mb-4">Payment Error</h1>
          <p className="text-gray-400 mb-8">{error}</p>
          <button
            onClick={() => router.push('/builder')}
            className="px-6 py-3 bg-gray-800 text-white rounded-lg hover:bg-gray-700 transition-colors"
          >
            Go to Builder
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-950 flex items-center justify-center px-4">
      <div className="max-w-2xl w-full">
        <div className="text-center mb-12">
          {/* Success Icon */}
          <div className="relative inline-block mb-8">
            <div className="bg-green-500/20 rounded-full w-24 h-24 flex items-center justify-center">
              <CheckCircle className="w-12 h-12 text-green-500" />
            </div>
            <Sparkles className="absolute -top-2 -right-2 w-8 h-8 text-yellow-500 animate-pulse" />
          </div>

          {/* Success Message */}
          <h1 className="text-4xl font-bold text-white mb-4">
            Welcome to SmartATS Pro! 🎉
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
              '✨ AI-Powered Summary Generation',
              '📊 Unlimited ATS Scans',
              '💾 Unlimited Resume Saves',
              '🎨 Premium Templates',
              '🔍 Advanced Keyword Analysis',
              '📧 Priority Email Support',
              '📈 Detailed Analytics',
              '🚀 Early Access to New Features'
            ].map((feature, index) => (
              <div key={index} className="flex items-center space-x-3">
                <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0" />
                <span className="text-gray-300">{feature.substring(2)}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4">
          <button
            onClick={() => router.push('/builder')}
            className="flex-1 flex items-center justify-center space-x-2 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            <span>Start Building</span>
            <ArrowRight className="w-5 h-5" />
          </button>
          
          <button
            onClick={() => router.push('/templates')}
            className="flex-1 px-6 py-3 bg-gray-800 text-white rounded-lg hover:bg-gray-700 transition-colors"
          >
            Browse Templates
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

export default PaymentSuccessPage;

