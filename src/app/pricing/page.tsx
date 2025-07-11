'use client';
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import Navigation from '@/components/Navigation';
import {
  Check, X, ArrowRight, Crown,
  FileText, Building
} from 'lucide-react';
import toast from 'react-hot-toast';

const PricingPage = () => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState('');
  const [showContactModal, setShowContactModal] = useState(false);
  const [contactData, setContactData] = useState({
    companyName: '',
    fullName: '',
    email: '',
    phone: '',
    employees: '',
    message: ''
  });

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
      period: 'user/month',
      icon: Building,
      description: 'For teams and agencies',
      features: [
        'Everything in Pro',
        'Team collaboration',
        'Brand customization',
        'Bulk resume creation',
        'Advanced analytics',
        'Phone support',
        'Custom integrations',
        'Account manager',
        'API access',
        '99.9% SLA guarantee'
      ],
      notIncluded: [],
      highlighted: false,
      buttonText: 'Contact Sales'
    }
  ];

 const handlePlanSelect = async (planName: string) => {
  // Handle Enterprise plan
  if (planName === 'Enterprise') {
    // Option 1: Open email client with pre-filled subject
    const subject = encodeURIComponent('SmartATS Enterprise Plan Inquiry');
    const body = encodeURIComponent(`Hi SmartATS Team,

I'm interested in learning more about the Enterprise plan for my organization.

Company Name: [Your Company]
Team Size: [Number of Users]
Current Needs: [Brief Description]

Please contact me at your earliest convenience.

Best regards,
[Your Name]`);
    
    window.location.href = `mailto:enterprise@smartats.com?subject=${subject}&body=${body}`;
    return;
  }

  // Handle Free plan
  if (planName === 'Free') {
    toast.success('Free plan selected!');
    router.push('/builder');
    return;
  }

  // Handle Pro plan
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
        priceId: 'price_1RfIl8RAg7kfFjRm4nlpS8DN', // Pro plan price ID
        successUrl: `${window.location.origin}/payment/success?session_id={CHECKOUT_SESSION_ID}`,
        cancelUrl: `${window.location.origin}/pricing?canceled=true`,
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



  const handleContactSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      // Send to your API endpoint
      const response = await fetch('/api/enterprise-inquiry', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(contactData)
      });

      if (response.ok) {
        toast.success('Thank you! Our enterprise team will contact you within 24 hours.');
        setShowContactModal(false);
        // Reset form
        setContactData({
          companyName: '',
          fullName: '',
          email: '',
          phone: '',
          employees: '',
          message: ''
        });
      } else {
        throw new Error('Failed to submit');
      }
    } catch (error) {
      toast.error('Failed to submit inquiry. Please email us directly.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900">
      <Navigation />

      <div className="container mx-auto px-4 py-16">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <h1 className="text-5xl font-bold mb-6 bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
            Choose Your Plan
          </h1>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Get the perfect plan for your career goals. Start free and upgrade when you're ready.
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
                    : tier.name === 'Enterprise'
                    ? 'bg-gradient-to-br from-amber-900/20 to-orange-900/20 border-2 border-amber-600'
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
                  <div className={`inline-flex items-center justify-center w-16 h-16 rounded-xl mb-4 ${
                    tier.name === 'Enterprise'
                      ? 'bg-gradient-to-br from-amber-600 to-orange-600'
                      : 'bg-gradient-to-br from-blue-600 to-purple-600'
                  }`}>
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
                  type="button"
                  onClick={() => handlePlanSelect(tier.name)}
                  disabled={loading && selectedPlan === tier.name}
                  className={`w-full flex items-center justify-center gap-2 px-6 py-3 rounded-xl font-semibold transition-all duration-200 mb-8 ${
                    isHighlighted
                      ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white hover:shadow-lg'
                      : tier.name === 'Enterprise'
                      ? 'bg-gradient-to-r from-amber-600 to-orange-600 text-white hover:shadow-lg'
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

        {/* Enterprise CTA */}
        <div className="bg-gradient-to-br from-amber-900/20 to-orange-900/20 border border-amber-700/30 rounded-2xl p-8 text-center">
          <h3 className="text-2xl font-bold mb-4">Need a Custom Solution?</h3>
          <p className="text-gray-300 mb-6 max-w-2xl mx-auto">
            Our Enterprise plan includes volume discounts, custom integrations, and dedicated support for teams of 10+
          </p>
          <button
           type="button"
           onClick={() => {
             const subject = encodeURIComponent('SmartATS Enterprise Plan Inquiry');
             window.location.href = `mailto:enterprise@smartats.com?subject=${subject}`;
           }}
           className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-amber-600 to-orange-600 text-white font-semibold rounded-lg hover:shadow-lg transform hover:scale-105 transition-all duration-200">
            Learn More About Enterprise
            <ArrowRight className="w-5 h-5" />
          </button>
        </div>

        {/* FAQ Section */}
        <div className="max-w-3xl mx-auto mt-16">
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
            
            <div className="bg-gray-900 rounded-lg p-6">
              <h3 className="text-lg font-semibold mb-2">What's included in Enterprise?</h3>
              <p className="text-gray-400">Enterprise includes everything in Pro plus team collaboration, custom branding, API access, dedicated support, and more. Contact sales for details.</p>
            </div>

            <div className="bg-gray-900 rounded-lg p-6">
              <h3 className="text-lg font-semibold mb-2">How does team billing work?</h3>
              <p className="text-gray-400">Enterprise plans are billed per user with volume discounts. You can add or remove team members anytime and we'll prorate the charges.</p>
            </div>
          </div>
        </div>
      </div>

      {/* Contact Modal */}
      {showContactModal && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-gray-900 rounded-2xl shadow-2xl max-w-2xl w-full border border-gray-800">
            <div className="flex items-center justify-between p-6 border-b border-gray-800">
              <h3 className="text-2xl font-bold text-white">Contact Enterprise Sales</h3>
              <button
                type="button"
                onClick={() => setShowContactModal(false)}
                className="p-2 hover:bg-gray-800 rounded-lg transition-colors"
              >
                <X className="w-5 h-5 text-gray-400" />
              </button>
            </div>

            <form onSubmit={handleContactSubmit} className="p-6 space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Company Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={contactData.companyName}
                    onChange={(e) => setContactData({ ...contactData, companyName: e.target.value })}
                    className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-amber-500 transition-colors"
                    placeholder="Acme Corp"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Full Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={contactData.fullName}
                    onChange={(e) => setContactData({ ...contactData, fullName: e.target.value })}
                    className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-amber-500 transition-colors"
                    placeholder="John Doe"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Work Email *
                  </label>
                  <input
                    type="email"
                    required
                    value={contactData.email}
                    onChange={(e) => setContactData({ ...contactData, email: e.target.value })}
                    className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-amber-500 transition-colors"
                    placeholder="john@company.com"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Phone Number
                  </label>
                  <input
                    type="tel"
                    value={contactData.phone}
                    onChange={(e) => setContactData({ ...contactData, phone: e.target.value })}
                    className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-amber-500 transition-colors"
                    placeholder="+1 (555) 123-4567"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Number of Employees *
                </label>
                <select
                  required
                  value={contactData.employees}
                  onChange={(e) => setContactData({ ...contactData, employees: e.target.value })}
                  className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg text-white focus:outline-none focus:border-amber-500 transition-colors"
                  aria-label="Number of Employees"
                >
                  <option value="">Select team size</option>
                  <option value="10-49">10-49</option>
                  <option value="50-99">50-99</option>
                  <option value="100-499">100-499</option>
                  <option value="500-999">500-999</option>
                  <option value="1000+">1000+</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Tell us about your needs
                </label>
                <textarea
                  rows={4}
                  value={contactData.message}
                  onChange={(e) => setContactData({ ...contactData, message: e.target.value })}
                  className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-amber-500 transition-colors resize-none"
                  placeholder="What are your hiring challenges? What features are most important to your team?"
                />
              </div>

              <div className="flex gap-4">
                <button
                  type="button"
                  onClick={() => setShowContactModal(false)}
                  className="flex-1 px-6 py-3 bg-gray-800 hover:bg-gray-700 text-white font-medium rounded-lg transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 px-6 py-3 bg-gradient-to-r from-amber-600 to-orange-600 text-white font-medium rounded-lg hover:shadow-lg transition-all"
                >
                  Submit Request
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default PricingPage;