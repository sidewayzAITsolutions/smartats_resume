// app/enterprise/page.tsx
'use client';
import React from 'react';
import { useRouter } from 'next/navigation';
import { 
  Users, Zap, Award, BarChart3, Building2, Palette, 
  FileText, HeadphonesIcon, CheckCircle2, ArrowRight, 
  Clock, TrendingUp, Star, ChevronRight
} from 'lucide-react';
import Navigation from '@/components/Navigation';

const EnterprisePage = () => {
  const router = useRouter();

  const enterpriseFeatures = [
    {
      icon: Users,
      title: "Team Collaboration",
      description: "Seamless workspace sharing with role-based permissions and real-time editing",
      details: [
        "Unlimited team members",
        "Real-time collaborative editing",
        "Role-based access control",
        "Shared workspace management"
      ]
    },
    {
      icon: Palette,
      title: "Custom Branding",
      description: "Make it yours with custom branding, logos, and color schemes",
      details: [
        "Upload your company logo",
        "Custom color schemes",
        "Branded resume templates",
        "White-label experience"
      ]
    },
    {
      icon: FileText,
      title: "Bulk Resume Creation",
      description: "Generate hundreds of ATS-optimized resumes simultaneously",
      details: [
        "Batch upload via CSV",
        "Template automation",
        "Bulk export options",
        "Progress tracking"
      ]
    },
    {
      icon: BarChart3,
      title: "Advanced Analytics",
      description: "Comprehensive insights into resume performance and team productivity",
      details: [
        "Performance dashboards",
        "Team activity reports",
        "ATS success metrics",
        "Export analytics data"
      ]
    },
    {
      icon: HeadphonesIcon,
      title: "Dedicated Support",
      description: "Get personalized assistance with a dedicated account manager",
      details: [
        "Dedicated account manager",
        "Priority email support",
        "Onboarding assistance",
        "Regular check-ins"
      ]
    }
  ];

  const testimonials = [
    {
      company: "TechCorp Global",
      person: "Sarah Chen",
      role: "VP of Talent Acquisition",
      quote: "ResumeLift Enterprise transformed our hiring process. We've reduced time-to-hire by 40% and improved candidate quality significantly.",
      logo: "🏢"
    },
    {
      company: "Innovation Labs",
      person: "Michael Roberts",
      role: "HR Director",
      quote: "The bulk resume creation feature alone saved our team hundreds of hours. The ROI was immediate and substantial.",
      logo: "🚀"
    },
    {
      company: "Growth Partners",
      person: "Emily Johnson",
      role: "Chief People Officer",
      quote: "Being able to maintain our brand identity while leveraging powerful resume optimization has been a game-changer.",
      logo: "📈"
    }
  ];

  const integrations = [
    { name: "API Access", icon: "🔌", description: "RESTful API for custom integrations" },
    { name: "CSV Import/Export", icon: "📊", description: "Bulk data management" },
    { name: "Google Drive", icon: "📁", description: "Direct export to cloud storage" },
    { name: "Webhooks", icon: "🔗", description: "Real-time event notifications" },
    { name: "Email Integration", icon: "📧", description: "Automated resume delivery" },
    { name: "Custom Export", icon: "📤", description: "PDF, DOCX, TXT formats" }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-950 via-gray-900 to-black">
      <Navigation />
      
      {/* Hero Section */}
      <section className="relative pt-24 pb-20 px-6 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-amber-600/10 via-transparent to-teal-600/10"></div>
        <div className="max-w-7xl mx-auto relative z-10">
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 bg-amber-900/30 text-amber-300 px-6 py-3 rounded-full text-sm font-medium mb-6 border border-amber-700/50">
              <Building2 className="w-5 h-5" />
              Enterprise Solution
            </div>
            
            <h1 className="text-5xl md:text-7xl font-bold text-white mb-6">
              Scale Your Hiring with
              <span className="block bg-gradient-to-r from-amber-400 to-orange-400 bg-clip-text text-transparent">
                ResumeLift Enterprise
              </span>
            </h1>
            
            <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed mb-8">
              Empower your HR team with AI-powered resume optimization, advanced analytics, 
              and seamless collaboration tools designed for high-volume recruitment.
            </p>
            
            <div className="flex justify-center">
              <button
                onClick={() => router.push('/contact-sales')}
                className="inline-flex items-center gap-3 px-10 py-4 bg-gradient-to-r from-amber-600 to-orange-600 text-white font-bold text-lg rounded-xl hover:shadow-2xl transform hover:scale-105 transition-all duration-200"
              >
                <HeadphonesIcon className="w-6 h-6" />
                Contact Sales
                <ArrowRight className="w-6 h-6" />
              </button>
            </div>
          </div>
          
          {/* Key Metrics */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-16">
            {[
              { label: "Enterprise Clients", value: "500+", icon: Building2 },
              { label: "Resumes Created", value: "2M+", icon: FileText },
              { label: "Time Saved", value: "75%", icon: Clock },
              { label: "ROI Increase", value: "10x", icon: TrendingUp }
            ].map((metric, idx) => (
              <div key={idx} className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-6 border border-gray-700">
                <metric.icon className="w-8 h-8 text-amber-400 mb-3" />
                <div className="text-3xl font-bold text-white mb-1">{metric.value}</div>
                <div className="text-gray-400">{metric.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Simple Pricing Section */}
      <section className="py-20 px-6 bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
              Simple, Transparent Pricing
            </h2>
            <p className="text-xl text-gray-300">
              One plan with everything you need to scale your hiring
            </p>
          </div>
          
          <div className="bg-gradient-to-br from-amber-900/20 to-orange-900/20 border-2 border-amber-500 rounded-3xl p-8 md:p-12 shadow-2xl shadow-amber-500/20">
            <div className="text-center mb-8">
              <div className="inline-flex items-center gap-2 bg-amber-600 text-white px-4 py-2 rounded-full text-sm font-bold mb-6">
                <Award className="w-4 h-4" />
                ENTERPRISE PLAN
              </div>
              
              <div className="flex items-center justify-center gap-2 mb-2">
                <span className="text-5xl md:text-6xl font-bold text-white">$49.99</span>
                <span className="text-gray-300 text-xl">/month</span>
              </div>
              <p className="text-amber-200">per user • billed annually</p>
            </div>
            
            <div className="grid md:grid-cols-2 gap-6 mb-8">
              <div>
                <h4 className="font-semibold text-white mb-4 flex items-center gap-2">
                  <CheckCircle2 className="w-5 h-5 text-teal-500" />
                  Core Features
                </h4>
                <ul className="space-y-3">
                  <li className="flex items-start gap-2 text-gray-300">
                    <ChevronRight className="w-5 h-5 text-teal-500 flex-shrink-0 mt-0.5" />
                    <span>Unlimited team collaboration</span>
                  </li>
                  <li className="flex items-start gap-2 text-gray-300">
                    <ChevronRight className="w-5 h-5 text-teal-500 flex-shrink-0 mt-0.5" />
                    <span>Custom branding & logos</span>
                  </li>
                  <li className="flex items-start gap-2 text-gray-300">
                    <ChevronRight className="w-5 h-5 text-teal-500 flex-shrink-0 mt-0.5" />
                    <span>Bulk resume creation</span>
                  </li>
                  <li className="flex items-start gap-2 text-gray-300">
                    <ChevronRight className="w-5 h-5 text-teal-500 flex-shrink-0 mt-0.5" />
                    <span>Advanced analytics dashboard</span>
                  </li>
                </ul>
              </div>
              
              <div>
                <h4 className="font-semibold text-white mb-4 flex items-center gap-2">
                  <CheckCircle2 className="w-5 h-5 text-teal-500" />
                  Premium Support
                </h4>
                <ul className="space-y-3">
                  <li className="flex items-start gap-2 text-gray-300">
                    <ChevronRight className="w-5 h-5 text-teal-500 flex-shrink-0 mt-0.5" />
                    <span>Dedicated account manager</span>
                  </li>
                  <li className="flex items-start gap-2 text-gray-300">
                    <ChevronRight className="w-5 h-5 text-teal-500 flex-shrink-0 mt-0.5" />
                    <span>Priority email support</span>
                  </li>
                  <li className="flex items-start gap-2 text-gray-300">
                    <ChevronRight className="w-5 h-5 text-teal-500 flex-shrink-0 mt-0.5" />
                    <span>Onboarding assistance</span>
                  </li>
                  <li className="flex items-start gap-2 text-gray-300">
                    <ChevronRight className="w-5 h-5 text-teal-500 flex-shrink-0 mt-0.5" />
                    <span>Regular strategy calls</span>
                  </li>
                </ul>
              </div>
            </div>
            
            <div className="text-center">
              <button
                onClick={() => router.push('/pricing')}
                className="inline-flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-amber-600 to-orange-600 text-white font-bold rounded-xl hover:shadow-2xl transform hover:scale-105 transition-all duration-200 w-full md:w-auto"
              >
                Get Started with Enterprise
                <ArrowRight className="w-5 h-5" />
              </button>
              <p className="text-gray-400 text-sm mt-4">
                30-day money-back guarantee • No setup fees
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="py-20 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
              Everything You Need to Scale
            </h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Powerful features designed for teams and recruitment agencies
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {enterpriseFeatures.slice(0, 5).map((feature, idx) => (
              <div key={idx} className="bg-gray-800/30 backdrop-blur-sm rounded-2xl p-8 border border-gray-700 hover:border-amber-500/50 transition-all duration-300 group">
                <div className="w-14 h-14 bg-gradient-to-br from-amber-500 to-orange-500 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                  <feature.icon className="w-7 h-7 text-white" />
                </div>
                
                <h3 className="text-2xl font-bold text-white mb-3">{feature.title}</h3>
                <p className="text-gray-300 mb-6">{feature.description}</p>
                
                <ul className="space-y-2">
                  {feature.details.map((detail, detailIdx) => (
                    <li key={detailIdx} className="flex items-start gap-2 text-gray-400">
                      <CheckCircle2 className="w-5 h-5 text-teal-500 flex-shrink-0 mt-0.5" />
                      <span>{detail}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Integrations */}
      <section className="py-20 px-6 bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
              Powerful Integrations & Export Options
            </h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Connect ResumeLift to your workflow with flexible integration options
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {integrations.map((integration, idx) => (
              <div key={idx} className="bg-gray-800/50 rounded-xl p-6 border border-gray-700 hover:border-amber-500/50 transition-all duration-300 group">
                <div className="flex items-start gap-4">
                  <div className="text-3xl group-hover:scale-110 transition-transform">{integration.icon}</div>
                  <div>
                    <h4 className="text-lg font-semibold text-white mb-1">{integration.name}</h4>
                    <p className="text-sm text-gray-400">{integration.description}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
          
          <div className="text-center mt-12">
            <p className="text-gray-400 mb-4">Need a custom integration?</p>
            <button
              onClick={() => router.push('/contact-sales')}
              className="inline-flex items-center gap-2 text-amber-400 hover:text-amber-300 font-medium"
            >
              Contact our team
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 px-6">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-4xl md:text-5xl font-bold text-white text-center mb-16">
            Trusted by Leading Organizations
          </h2>
          
          <div className="grid md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, idx) => (
              <div key={idx} className="bg-gray-800/30 backdrop-blur-sm rounded-2xl p-8 border border-gray-700">
                <div className="flex items-center gap-4 mb-6">
                  <div className="text-4xl">{testimonial.logo}</div>
                  <div>
                    <div className="font-bold text-white">{testimonial.company}</div>
                    <div className="text-sm text-gray-400">{testimonial.person}, {testimonial.role}</div>
                  </div>
                </div>
                
                <div className="flex gap-1 mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 fill-amber-400 text-amber-400" />
                  ))}
                </div>
                
                <p className="text-gray-300 italic">"{testimonial.quote}"</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-6 bg-gradient-to-r from-amber-600 to-orange-600">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            Ready to Transform Your Hiring Process?
          </h2>
          <p className="text-xl text-white/90 mb-8">
            Join 500+ organizations already using ResumeLift Enterprise
          </p>
          
          <div className="flex flex-wrap gap-4 justify-center">
            <button
              onClick={() => router.push('/contact-sales')}
              className="inline-flex items-center gap-3 px-8 py-4 bg-white text-amber-600 font-bold rounded-xl hover:shadow-2xl transform hover:scale-105 transition-all duration-200"
            >
              <HeadphonesIcon className="w-5 h-5" />
              Talk to Sales
            </button>
            
            <button
              onClick={() => router.push('/checkout?plan=enterprise')}
              className="inline-flex items-center gap-3 px-8 py-4 bg-amber-700 text-white font-bold rounded-xl hover:bg-amber-800 transition-all duration-200"
            >
              Start Enterprise Plan
              <ArrowRight className="w-5 h-5" />
            </button>
          </div>
          
          <p className="text-white/80 text-sm mt-6">
            30-day money-back guarantee • Cancel anytime
          </p>
        </div>
      </section>
    </div>
  );
};

export default EnterprisePage;