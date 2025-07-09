'use client';
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { 
  Check, X, ArrowRight, Sparkles, Crown, Zap, Shield, 
  FileText, Award, Users, Star, DollarSign 
} from 'lucide-react';
import toast from 'react-hot-toast';

const PricingPage = () => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState('');

  const pricingTiers = [
    {
      name: 'Free',
      price: 0,
      period: 'forever',
      icon: FileText,
      description: 'Perfect for getting started',
      features: [
        'Basic resume builder',
        'ATS score checker',
        '3 basic templates',
        'PDF download',
        'Basic keyword optimization'
      ],
      notIncluded: [
        'Premium templates',
        'AI-powered suggestions',
        'Unlimited downloads',
        'Priority support'
      ],
      highlighted: false,
      buttonText: 'Get Started Free'
    },
    {
      name: 'Pro',
      price: 19.99,
      period: 'month',
      icon: Crown,
      description: 'Most popular for job seekers',
      features: [
        'Everything in Free',
        'All premium templates',
        'AI-powered optimization',
        'Unlimited downloads',
        'Advanced ATS analysis',
        'Job description scanner',
        'Priority email support',
        'Resume analytics'
      ],
      notIncluded: [],
      highlighted: true,
      buttonText: 'Start Pro Trial'
    },
    {
      name: 'Enterprise',
      price: 49.99,
      period: 'month',
      icon: Award,
      description: 'For teams and agencies',
      features: [
        'Everything in Pro',
        'Team collaboration',
        'Brand customization',
        'Bulk resume creation',
        'Advanced analytics',
        'Phone support',
        'Custom integrations',
        'Account manager'
      ],
      notIncluded: [],
      highlighted: false,
      buttonText: 'Contact Sales'
    }
  ];

  const handlePlanSelect = async (planName) => {
    if (planName === 'Free') {
      toast.success('Free plan selected!');
      router.push('/builder');
      return;
    }

    setLoading(true);
    setSelectedPlan(planName);

    try {
      // Create checkout session
      const response = await fetch('/api/create-checkout-session', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          priceId: planName === 'Pro' ? 'price_1RfIl8RAg7kfFjRm4nlpS8DN' : 'price_1RfIldRAg7kfFjRmycl1rUZF',
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to create checkout session');
      }

      const { url } = await response.json();
      
      // Redirect to Stripe Checkout
      window.location.href = url;
    } catch (error) {
      console.error('Error:', error);
      toast.error('Failed to start checkout process');
      setLoading(false);
      setSelectedPlan('');
    }
  };

  return (
    <div className="min-h-screen bg-gray-950 text-white">
      {/* Header */}
      <header className="bg-gray-900 border-b border-gray-800">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <button onClick={() => router.push('/')} className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-purple-600 rounded-xl flex items-center justify-center">
                <FileText className="w-6 h-6 text-white" />
              </div>
              <span className="text-2xl font-bold text-white">SmartATS</span>
            </button>

            <nav className="hidden md:flex items-center gap-6">
              <button onClick={() => router.push('/')} className="text-gray-300 hover:text-white font-medium">Home</button>
              <button onClick={() => router.push('/templates')} className="text-gray-300 hover:text-white font-medium">Templates</button>
              <button onClick={() => router.push('/builder')} className="text-gray-300 hover:text-white font-medium">Builder</button>
              <button className="text-blue-400 font-medium">Pricing</button>
            </nav>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 py-16">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-blue-400 to-purple-600 text-transparent bg-clip-text">
            Choose Your Plan
          </h1>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto">
            Get the most out of SmartATS with our premium features. Upgrade anytime, cancel anytime.
          </p>
        </div>

        {/* Pricing Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          {pricingTiers.map((tier) => {
            const Icon = tier.icon;
            const isHighlighted = tier.highlighted;
            
            return (
              <div
                key={tier.name}
                className={`relative rounded-2xl p-8 ${
                  isHighlighted
                    ? 'bg-gradient-to-br from-blue-600/20 to-purple-600/20 border-2 border-blue-500'
                    : 'bg-gray-900 border border-gray-800'
                }`}
              >
                {isHighlighted && (
                  <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                    <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-6 py-2 rounded-full text-sm font-bold">
                      Most Popular
                    </div>
                  </div>
                )}

                <div className="text-center mb-8">
                  <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-blue-600 to-purple-600 rounded-xl mb-4">
                    <Icon className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-2xl font-bold mb-2">{tier.name}</h3>
                  <p className="text-gray-400 mb-6">{tier.description}</p>
                  
                  <div className="flex items-baseline justify-center gap-2">
                    <span className="text-4xl font-bold">${tier.price}</span>
                    <span className="text-gray-400">/{tier.period}</span>
                  </div>
                </div>

                <button
                  onClick={() => handlePlanSelect(tier.name)}
                  disabled={loading && selectedPlan === tier.name}
                  className={`w-full flex items-center justify-center gap-2 px-6 py-3 rounded-xl font-semibold transition-all duration-200 mb-8 ${
                    isHighlighted
                      ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white hover:shadow-lg'
                      : tier.price === 0
                      ? 'bg-gray-800 hover:bg-gray-700 text-white'
                      : 'bg-purple-600 hover:bg-purple-700 text-white'
                  } ${loading && selectedPlan === tier.name ? 'opacity-50 cursor-not-allowed' : ''}`}
                >
                  <span>{loading && selectedPlan === tier.name ? 'Processing...' : tier.buttonText}</span>
                  <ArrowRight className="w-4 h-4" />
                </button>

                <div className="space-y-3">
                  {tier.features.map((feature, index) => (
                    <div key={index} className="flex items-start space-x-3">
                      <Check className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
                      <span className="text-sm text-gray-300">{feature}</span>
                    </div>
                  ))}
                  
                  {tier.notIncluded?.map((feature, index) => (
                    <div key={`not-${index}`} className="flex items-start space-x-3 opacity-50">
                      <X className="w-5 h-5 text-gray-500 mt-0.5 flex-shrink-0" />
                      <span className="text-sm text-gray-500 line-through">{feature}</span>
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>

        {/* FAQ Section */}
        <div className="max-w-3xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-8">Frequently Asked Questions</h2>
          
          <div className="space-y-6">
            <div className="bg-gray-900 rounded-lg p-6">
              <h3 className="text-lg font-semibold mb-2">Can I cancel anytime?</h3>
              <p className="text-gray-400">Yes! You can cancel your subscription at any time. You'll continue to have access until the end of your billing period.</p>
            </div>
            
            <div className="bg-gray-900 rounded-lg p-6">
              <h3 className="text-lg font-semibold mb-2">Do I need a credit card for the free plan?</h3>
              <p className="text-gray-400">No! The free plan is completely free forever, no credit card required.</p>
            </div>
            
            <div className="bg-gray-900 rounded-lg p-6">
              <h3 className="text-lg font-semibold mb-2">Can I switch plans later?</h3>
              <p className="text-gray-400">Absolutely! You can upgrade or downgrade your plan at any time from your account settings.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PricingPage;
