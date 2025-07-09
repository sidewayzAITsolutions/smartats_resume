'use client';
import React, { useState, useEffect } from 'react';
import { ArrowRight, CheckCircle, Zap, Shield, Star, Target, TrendingUp, BarChart2, X, Menu, Sparkles, Award, FileText, Clock, User } from 'lucide-react';
import LogoSplashScreen from '@/components/LogoSplashScreen';

type ATSDemoModalProps = {
  open: boolean;
  onClose: () => void;
};

const EnhancedLandingPage = () => {
  const [showDemoModal, setShowDemoModal] = useState(false);
  const [activeTestimonial, setActiveTestimonial] = useState(0);
  const [scrollY, setScrollY] = useState(0);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navigateTo = (path: string) => {
    window.location.href = path;
  };

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveTestimonial((prev) => (prev + 1) % 3);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  const testimonials = [
    {
      name: "Sarah Chen",
      role: "Software Engineer",
      company: "Microsoft",
      content: "SmartATS helped me get past the ATS filters. Got 5 interviews in 2 weeks!",
      gender: "female"
    },
    {
      name: "Michael Rodriguez",
      role: "Marketing Manager",
      company: "Adobe",
      content: "The keyword optimization is incredible. My interview rate went from 5% to 45%!",
      gender: "male"
    },
    {
      name: "Emily Johnson",
      role: "Data Scientist",
      company: "Google",
      content: "Finally, a resume builder that understands ATS systems. Worth every penny!",
      gender: "female"
    }
  ];
  
  const ATSDemoModal = ({ open, onClose }: ATSDemoModalProps) => {
    if (!open) return null;

    return (
      <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4 animate-fadeIn">
        <div className="bg-gray-900 border border-gray-800 rounded-3xl shadow-2xl p-8 w-full max-w-2xl relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-br from-teal-600/20 to-amber-600/20 rounded-full blur-3xl"></div>
          
          <button
            type="button"
            onClick={onClose}
            className="absolute top-6 right-6 text-gray-400 hover:text-gray-200 p-2 rounded-full hover:bg-gray-800 transition-all"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="relative z-10">
            <h2 className="text-3xl font-bold text-white mb-6">Live ATS Analysis Demo</h2>
            
            <div className="bg-gradient-to-br from-teal-900/50 to-amber-900/50 border border-teal-700/50 rounded-2xl p-6 mb-6">
              <div className="flex items-center justify-between mb-4">
                <span className="text-lg font-semibold text-gray-200">ATS Score</span>
                <div className="flex items-center gap-2">
                  <div className="text-4xl font-bold text-teal-400">94</div>
                  <TrendingUp className="w-6 h-6 text-green-400" />
                </div>
              </div>
              
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-400">Keyword Match</span>
                  <div className="flex items-center gap-2">
                    <div className="w-32 h-2 bg-gray-700 rounded-full overflow-hidden">
                      <div className="w-[92%] h-full bg-gradient-to-r from-teal-500 to-amber-500 rounded-full"></div>
                    </div>
                    <span className="text-sm font-medium text-gray-300">92%</span>
                  </div>
                </div>
                
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-400">Format Compatibility</span>
                  <div className="flex items-center gap-2">
                    <div className="w-32 h-2 bg-gray-700 rounded-full overflow-hidden">
                      <div className="w-[96%] h-full bg-gradient-to-r from-teal-500 to-amber-500 rounded-full"></div>
                    </div>
                    <span className="text-sm font-medium text-gray-300">96%</span>
                  </div>
                </div>
                
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-400">Readability Score</span>
                  <div className="flex items-center gap-2">
                    <div className="w-32 h-2 bg-gray-700 rounded-full overflow-hidden">
                      <div className="w-[94%] h-full bg-gradient-to-r from-teal-500 to-amber-500 rounded-full"></div>
                    </div>
                    <span className="text-sm font-medium text-gray-300">94%</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-green-900/30 border border-green-700/50 rounded-xl p-4 mb-6">
              <div className="flex items-start gap-3">
                <CheckCircle className="w-5 h-5 text-green-400 mt-0.5" />
                <div>
                  <p className="font-medium text-green-300">Resume Optimized!</p>
                  <p className="text-sm text-green-400 mt-1">Your resume scored above the 75% threshold - ready for submission!</p>
                </div>
              </div>
            </div>

            <button
              type="button"
              onClick={() => {
                onClose();
                navigateTo('/templates');
              }}
              className="w-full bg-gradient-to-r from-teal-600 to-amber-600 text-white font-semibold py-4 px-8 rounded-xl hover:shadow-lg transform hover:scale-[1.02] transition-all duration-200"
            >
              Start Building Your ATS-Optimized Resume
              <ArrowRight className="inline-block ml-2 w-5 h-5" />
            </button>
          </div>
        </div>
      </div>
    );
  };

  return (
    <>
      {/* LOGO SPLASH SCREEN - ADDED HERE */}
      <LogoSplashScreen />

      <div className="min-h-screen bg-gradient-to-b from-gray-950 via-gray-900 to-black overflow-hidden relative">
        {/* Background Logo - Large and Faded */}
        <div className="fixed inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] opacity-5">
            <img src="/horse-logo.png" alt="" className="w-full h-full object-contain" />
          </div>
        </div>

        {/* Animated Background Elements */}
        <div className="fixed inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-20 left-10 w-72 h-72 bg-teal-600/10 rounded-full blur-3xl animate-float"></div>
          <div className="absolute top-96 right-10 w-96 h-96 bg-amber-600/10 rounded-full blur-3xl animate-float-delayed"></div>
          <div className="absolute bottom-20 left-1/2 w-80 h-80 bg-green-600/10 rounded-full blur-3xl animate-float"></div>
        </div>

        {/* Header */}
        <header className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${scrollY > 20 ? 'bg-gray-900/90 backdrop-blur-md shadow-lg border-b border-gray-800' : 'bg-transparent'}`}>
          <nav className="max-w-7xl mx-auto px-6 py-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                {/* Logo Container */}
                <div className="relative w-12 h-12">
                  <img src="/horse-logo.png" alt="SmartATS Logo" className="w-full h-full object-contain" />
                </div>
                <div>
                  <div className="text-2xl font-bold bg-gradient-to-r from-teal-400 to-amber-400 bg-clip-text text-transparent">
                    SmartATS
                  </div>
                  <div className="text-xs text-gray-500">Beat the Bots</div>
                </div>
              </div>

              {/* Desktop Navigation */}
              <div className="hidden md:flex items-center gap-8">
                <a href="/templates" className="text-gray-300 hover:text-teal-400 font-medium transition-colors">Templates</a>
                <a href="/pricing" className="text-gray-300 hover:text-teal-400 font-medium transition-colors">Pricing</a>
                <a href="/ats-guide" className="text-gray-300 hover:text-teal-400 font-medium transition-colors">ATS Guide</a>
                <button
                  type="button"
                  onClick={() => navigateTo('/login')}
                  className="bg-gradient-to-r from-teal-600 to-amber-600 text-white px-6 py-2.5 rounded-xl font-medium hover:shadow-lg transform hover:scale-105 transition-all duration-200"
                >
                  Start Free
                </button>
              </div>

              {/* Mobile Menu Button */}
              <button
                type="button"
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="md:hidden p-2 rounded-lg hover:bg-gray-800 text-gray-300"
              >
                <Menu className="w-6 h-6" />
              </button>
            </div>

            {/* Mobile Menu */}
            {mobileMenuOpen && (
              <div className="md:hidden absolute top-full left-0 right-0 bg-gray-900 shadow-lg border-t border-gray-800 p-6 space-y-4">
                <a href="/templates" className="block text-gray-300 hover:text-teal-400 font-medium">Templates</a>
                <a href="/pricing" className="block text-gray-300 hover:text-teal-400 font-medium">Pricing</a>
                <a href="/ats-guide" className="block text-gray-300 hover:text-teal-400 font-medium">ATS Guide</a>
                <button
                  type="button"
                  onClick={() => navigateTo('/login')}
                  className="w-full bg-gradient-to-r from-teal-600 to-amber-600 text-white px-6 py-3 rounded-xl font-medium"
                >
                  Start Free
                </button>
              </div>
            )}
          </nav>
        </header>

        {/* Hero Section */}
        <section className="relative pt-32 pb-20 px-6">
          <div className="max-w-6xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-teal-900/50 to-amber-900/50 border border-teal-700/50 rounded-full mb-8 animate-bounce-slow">
              <Sparkles className="w-4 h-4 text-teal-400" />
              <span className="text-sm font-medium text-gray-300">AI-Powered ATS Optimization for a $17B Market</span>
            </div>

            <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 leading-tight">
              Smart ATS Resume
              <span className="block mt-2 text-2xl md:text-3xl bg-gradient-to-r from-teal-400 to-amber-400 bg-clip-text text-transparent">
                For The Love of Humanity
              </span>
            </h1>

            <p className="text-xl md:text-2xl text-red-400 mb-8 max-w-3xl mx-auto leading-relaxed">
              <span className="font-bold text-gray-200">ATS makes a decision in 6 seconds or less!</span>   
              <span className="font-bold text-red-200"> 75% of qualified candidates</span> get rejected by keyword mismatches.
              Our AI ensures yours makes it to human eyes.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
              <button
                type="button"
                onClick={() => navigateTo('/login')}
                className="group px-8 py-4 bg-gradient-to-r from-teal-600 to-amber-600 text-white font-semibold rounded-xl hover:shadow-2xl transform hover:scale-105 transition-all duration-200 flex items-center justify-center gap-2"
              >
                Build Your Resume Free
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </button>
              <button
                type="button"
                onClick={() => setShowDemoModal(true)}
                className="px-8 py-4 bg-gray-800 text-gray-200 font-semibold rounded-xl border-2 border-gray-700 hover:border-teal-500 hover:shadow-lg transition-all duration-200 flex items-center justify-center gap-2"
              >
                <BarChart2 className="w-5 h-5" />
                See ATS Analysis Demo
              </button>
            </div>

            {/* Trust Indicators */}
            <div className="flex flex-wrap items-center justify-center gap-8 text-sm text-gray-500">
              <div className="flex items-center gap-2">
                <BarChart2 className="w-5 h-5 text-teal-400" />
                <span><strong className="text-gray-300">70%</strong> of resumes never reach humans</span>
              </div>
              <div className="flex items-center gap-2">
                <TrendingUp className="w-5 h-5 text-green-400" />
                <span><strong className="text-gray-300">60%</strong> faster hiring with ATS optimization</span>
              </div>
              <div className="flex items-center gap-2">
                <Award className="w-5 h-5 text-amber-400" />
                <span><strong className="text-gray-300">94%</strong> of recruiters rely on ATS</span>
              </div>
            </div>
          </div>
        </section>

        {/* Problem/Solution Section */}
        <section className="py-20 px-6 relative">
          <div className="max-w-6xl mx-auto">
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-br from-red-900/30 to-orange-900/30 rounded-3xl transform rotate-3"></div>
                <div className="relative bg-gray-900 border border-gray-800 rounded-3xl p-8 shadow-xl">
                  <div className="w-16 h-16 bg-red-900/50 rounded-2xl flex items-center justify-center mb-6">
                    <X className="w-8 h-8 text-red-400" />
                  </div>
                  <h3 className="text-2xl font-bold text-white mb-4">The Brutal Truth</h3>
                  <ul className="space-y-3">
                    <li className="flex items-start gap-3">
                      <div className="w-5 h-5 bg-red-900/50 rounded-full flex items-center justify-center mt-0.5">
                        <X className="w-3 h-3 text-red-400" />
                      </div>
                      <span className="text-gray-300">98.4% of Fortune 500 companies use ATS filters</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <div className="w-5 h-5 bg-red-900/50 rounded-full flex items-center justify-center mt-0.5">
                        <X className="w-3 h-3 text-red-400" />
                      </div>
                      <span className="text-gray-300">75% of qualified candidates rejected by keyword mismatches</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <div className="w-5 h-5 bg-red-900/50 rounded-full flex items-center justify-center mt-0.5">
                        <X className="w-3 h-3 text-red-400" />
                      </div>
                      <span className="text-gray-300">70% of resumes auto-rejected before human review</span>
                    </li>
                  </ul>
                </div>
              </div>

              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-br from-green-900/30 to-teal-900/30 rounded-3xl transform -rotate-3"></div>
                <div className="relative bg-gray-900 border border-gray-800 rounded-3xl p-8 shadow-xl">
                  <div className="w-16 h-16 bg-green-900/50 rounded-2xl flex items-center justify-center mb-6">
                    <CheckCircle className="w-8 h-8 text-green-400" />
                  </div>
                  <h3 className="text-2xl font-bold text-white mb-4">Your Secret Weapon</h3>
                  <ul className="space-y-3">
                    <li className="flex items-start gap-3">
                      <div className="w-5 h-5 bg-green-900/50 rounded-full flex items-center justify-center mt-0.5">
                        <CheckCircle className="w-3 h-3 text-green-400" />
                      </div>
                      <span className="text-gray-300">AI analyzes job descriptions for perfect keyword match</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <div className="w-5 h-5 bg-green-900/50 rounded-full flex items-center justify-center mt-0.5">
                        <CheckCircle className="w-3 h-3 text-green-400" />
                      </div>
                      <span className="text-gray-300">Real-time ATS score with actionable improvements</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <div className="w-5 h-5 bg-green-900/50 rounded-full flex items-center justify-center mt-0.5">
                        <CheckCircle className="w-3 h-3 text-green-400" />
                      </div>
                      <span className="text-gray-300">Proven templates that pass all major ATS systems</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Features Grid */}
        <section className="py-20 px-6">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
                Everything You Need to
                <span className="block mt-2 bg-gradient-to-r from-teal-400 to-amber-400 bg-clip-text text-transparent">
                  Beat the ATS
                </span>
              </h2>
            </div>
            
            <div className="grid md:grid-cols-3 gap-8">
              {[
                {
                  icon: <Target className="w-8 h-8" />,
                  title: "Smart Keyword Matching",
                  description: "AI analyzes job descriptions and optimizes your resume with the right keywords",
                  color: "teal"
                },
                {
                  icon: <Shield className="w-8 h-8" />,
                  title: "ATS-Proof Formatting",
                  description: "Clean, scannable templates that work with all major ATS systems",
                  color: "green"
                },
                {
                  icon: <Zap className="w-8 h-8" />,
                  title: "Real-Time Scoring",
                  description: "See your ATS score instantly and get tips to improve it",
                  color: "amber"
                },
                {
                  icon: <FileText className="w-8 h-8" />,
                  title: "Multiple Formats",
                  description: "Download in PDF, DOCX, or plain text - whatever the job requires",
                  color: "orange"
                },
                {
                  icon: <Clock className="w-8 h-8" />,
                  title: "Quick Builder",
                  description: "Professional resume in under 10 minutes - beat the 60% faster ATS hiring cycle",
                  color: "pink"
                },
                {
                  icon: <Award className="w-8 h-8" />,
                  title: "Industry Templates",
                  description: "Specialized templates for tech, healthcare, finance, and more",
                  color: "indigo"
                }
              ].map((feature, idx) => {
                const getColorClasses = (color: string) => {
                  switch(color) {
                    case 'teal': return 'bg-teal-900/50 text-teal-400';
                    case 'green': return 'bg-green-900/50 text-green-400';
                    case 'amber': return 'bg-amber-900/50 text-amber-400';
                    case 'orange': return 'bg-orange-900/50 text-orange-400';
                    case 'pink': return 'bg-pink-900/50 text-pink-400';
                    case 'indigo': return 'bg-indigo-900/50 text-indigo-400';
                    default: return 'bg-gray-900/50 text-gray-400';
                  }
                };
                
                return (
                  <div key={idx} className="group relative">
                    <div className="absolute inset-0 bg-gradient-to-br from-gray-800 to-gray-900 rounded-2xl transform group-hover:scale-105 transition-transform duration-300"></div>
                    <div className="relative bg-gray-900 border border-gray-800 rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300">
                      <div className={`w-16 h-16 ${getColorClasses(feature.color)} rounded-2xl flex items-center justify-center mb-6`}>
                        {feature.icon}
                      </div>
                      <h3 className="text-xl font-bold text-white mb-2">{feature.title}</h3>
                      <p className="text-gray-400">{feature.description}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* Comparison Table Section */}
        <section className="py-20 px-6 bg-gradient-to-br from-gray-900 via-teal-900/10 to-gray-900">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
                Why SmartATS Beats
                <span className="block mt-2 bg-gradient-to-r from-teal-400 to-amber-400 bg-clip-text text-transparent">
                  The Competition
                </span>
              </h2>
              <p className="text-xl text-gray-400 mt-4">See how we stack up against the biggest names in resume building</p>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full bg-gray-900 rounded-2xl shadow-2xl border border-gray-800">
                <thead>
                  <tr className="border-b border-gray-800">
                    <th className="text-left p-6 text-gray-400 font-medium">Features</th>
                    <th className="text-center p-6">
                      <div className="flex flex-col items-center gap-2">
                        <div className="bg-gradient-to-br from-teal-600 to-amber-600 p-2 rounded-lg">
                          <FileText className="w-6 h-6 text-white" />
                        </div>
                        <span className="text-white font-bold">SmartATS</span>
                        <span className="text-green-400 text-sm">$9.99/mo</span>
                      </div>
                    </th>
                    <th className="text-center p-6">
                      <div className="flex flex-col items-center gap-2">
                        <span className="text-gray-300">Resume.io</span>
                        <span className="text-gray-500 text-sm">$24.95/mo</span>
                      </div>
                    </th>
                    <th className="text-center p-6">
                      <div className="flex flex-col items-center gap-2">
                        <span className="text-gray-300">Zety</span>
                        <span className="text-gray-500 text-sm">$23.70/mo</span>
                      </div>
                    </th>
                    <th className="text-center p-6">
                      <div className="flex flex-col items-center gap-2">
                        <span className="text-gray-300">Jobscan</span>
                        <span className="text-gray-500 text-sm">$49.95/mo</span>
                      </div>
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-800">
                  <tr className="hover:bg-gray-800/50 transition-colors">
                    <td className="p-6 text-gray-300">Real-Time ATS Scoring</td>
                    <td className="p-6 text-center"><CheckCircle className="w-6 h-6 text-green-400 mx-auto" /></td>
                    <td className="p-6 text-center"><X className="w-6 h-6 text-red-400 mx-auto" /></td>
                    <td className="p-6 text-center"><CheckCircle className="w-6 h-6 text-green-400 mx-auto" /></td>
                    <td className="p-6 text-center"><CheckCircle className="w-6 h-6 text-green-400 mx-auto" /></td>
                  </tr>
                  <tr className="hover:bg-gray-800/50 transition-colors">
                    <td className="p-6 text-gray-300">All Templates ATS-Optimized</td>
                    <td className="p-6 text-center"><CheckCircle className="w-6 h-6 text-green-400 mx-auto" /></td>
                    <td className="p-6 text-center"><span className="text-yellow-400">Only 4</span></td>
                    <td className="p-6 text-center"><CheckCircle className="w-6 h-6 text-green-400 mx-auto" /></td>
                    <td className="p-6 text-center"><CheckCircle className="w-6 h-6 text-green-400 mx-auto" /></td>
                  </tr>
                  <tr className="hover:bg-gray-800/50 transition-colors">
                    <td className="p-6 text-gray-300">Keyword Optimization</td>
                    <td className="p-6 text-center"><CheckCircle className="w-6 h-6 text-green-400 mx-auto" /></td>
                    <td className="p-6 text-center"><span className="text-yellow-400">Basic</span></td>
                    <td className="p-6 text-center"><span className="text-yellow-400">Basic</span></td>
                    <td className="p-6 text-center"><CheckCircle className="w-6 h-6 text-green-400 mx-auto" /></td>
                  </tr>
                  <tr className="hover:bg-gray-800/50 transition-colors">
                    <td className="p-6 text-gray-300">Free Downloads</td>
                    <td className="p-6 text-center"><span className="text-green-400">3 Free</span></td>
                    <td className="p-6 text-center"><span className="text-yellow-400">TXT only</span></td>
                    <td className="p-6 text-center"><X className="w-6 h-6 text-red-400 mx-auto" /></td>
                    <td className="p-6 text-center"><span className="text-yellow-400">5 scans/mo</span></td>
                  </tr>
                  <tr className="hover:bg-gray-800/50 transition-colors">
                    <td className="p-6 text-gray-300">No Hidden Fees</td>
                    <td className="p-6 text-center"><CheckCircle className="w-6 h-6 text-green-400 mx-auto" /></td>
                    <td className="p-6 text-center"><span className="text-red-400">Auto-renewal</span></td>
                    <td className="p-6 text-center"><span className="text-red-400">Auto-renewal</span></td>
                    <td className="p-6 text-center"><CheckCircle className="w-6 h-6 text-green-400 mx-auto" /></td>
                  </tr>
                  <tr className="hover:bg-gray-800/50 transition-colors">
                    <td className="p-6 text-gray-300">AI-Powered Suggestions</td>
                    <td className="p-6 text-center"><CheckCircle className="w-6 h-6 text-green-400 mx-auto" /></td>
                    <td className="p-6 text-center"><CheckCircle className="w-6 h-6 text-green-400 mx-auto" /></td>
                    <td className="p-6 text-center"><CheckCircle className="w-6 h-6 text-green-400 mx-auto" /></td>
                    <td className="p-6 text-center"><CheckCircle className="w-6 h-6 text-green-400 mx-auto" /></td>
                  </tr>
                  <tr className="hover:bg-gray-800/50 transition-colors">
                    <td className="p-6 text-gray-300">Value for Money</td>
                    <td className="p-6 text-center">
                      <div className="flex justify-center gap-1">
                        {[...Array(5)].map((_, i) => (
                          <Star key={i} className="w-5 h-5 fill-green-400 text-green-400" />
                        ))}
                      </div>
                    </td>
                    <td className="p-6 text-center">
                      <div className="flex justify-center gap-1">
                        {[...Array(3)].map((_, i) => (
                          <Star key={i} className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                        ))}
                        {[...Array(2)].map((_, i) => (
                          <Star key={i + 3} className="w-5 h-5 text-gray-600" />
                        ))}
                      </div>
                    </td>
                    <td className="p-6 text-center">
                      <div className="flex justify-center gap-1">
                        {[...Array(3)].map((_, i) => (
                          <Star key={i} className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                        ))}
                        {[...Array(2)].map((_, i) => (
                          <Star key={i + 3} className="w-5 h-5 text-gray-600" />
                        ))}
                      </div>
                    </td>
                    <td className="p-6 text-center">
                      <div className="flex justify-center gap-1">
                        {[...Array(2)].map((_, i) => (
                          <Star key={i} className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                        ))}
                        {[...Array(3)].map((_, i) => (
                          <Star key={i + 2} className="w-5 h-5 text-gray-600" />
                        ))}
                      </div>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>

            <div className="mt-12 text-center">
              <div className="inline-flex items-center gap-3 px-6 py-3 bg-gradient-to-r from-green-900/30 to-green-800/30 border border-green-700/50 rounded-xl">
                <Sparkles className="w-5 h-5 text-green-400" />
                <p className="text-green-300 font-medium">
                  SmartATS offers premium features at <span className="text-green-400 font-bold">60% less</span> than competitors
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Testimonials */}
        <section className="py-20 px-6 bg-gradient-to-br from-gray-900 to-black">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-4xl font-bold text-white mb-4">Success Stories</h2>
              <p className="text-xl text-gray-400">Join thousands who beat the ATS and landed their dream jobs</p>
            </div>

            <div className="relative">
              <div className="bg-gray-900 border border-gray-800 rounded-3xl p-8 shadow-xl">
                {testimonials.map((testimonial, idx) => (
                  <div
                    key={idx}
                    className={`transition-all duration-500 ${idx === activeTestimonial ? 'opacity-100' : 'opacity-0 absolute inset-0 p-8'}`}
                  >
                    <div className="flex items-start gap-6">
                      <div className={`w-16 h-16 rounded-full flex items-center justify-center ${
                        testimonial.gender === 'female' 
                          ? 'bg-gradient-to-br from-pink-500 to-teal-500' 
                          : 'bg-gradient-to-br from-blue-500 to-green-500'
                      }`}>
                        <User className="w-8 h-8 text-white" />
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center gap-1 mb-3">
                          {[...Array(5)].map((_, i) => (
                            <Star key={i} className="w-5 h-5 fill-amber-400 text-amber-400" />
                          ))}
                        </div>
                        <p className="text-lg text-gray-300 mb-4 italic">"{testimonial.content}"</p>
                        <div>
                          <p className="font-semibold text-white">{testimonial.name}</p>
                          <p className="text-sm text-gray-500">{testimonial.role} at {testimonial.company}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <div className="flex justify-center gap-2 mt-6">
                {testimonials.map((_, idx) => (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => setActiveTestimonial(idx)}
                    className={`w-2 h-2 rounded-full transition-all duration-300 ${
                      idx === activeTestimonial ? 'w-8 bg-teal-500' : 'bg-gray-600'
                    }`}
                  />
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Enterprise Value Proposition Section */}
        <section className="py-20 px-6 bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-16">
              <div className="inline-flex items-center gap-2 bg-amber-900/30 text-amber-300 px-4 py-2 rounded-full text-sm font-medium mb-6 border border-amber-700/50">
                <Award className="w-4 h-4" />
                Enterprise Solution
              </div>
              <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
                Scale Your Hiring Success with
                <span className="bg-gradient-to-r from-amber-400 to-orange-400 bg-clip-text text-transparent"> Enterprise</span>
              </h2>
              <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
                Transform your organization's hiring process with advanced team collaboration,
                custom branding, and enterprise-grade analytics. Built for HR teams and agencies
                managing high-volume recruitment.
              </p>
            </div>

            <div className="grid lg:grid-cols-2 gap-12 items-center mb-16">
              {/* Left side - Key Benefits */}
              <div className="space-y-8">
                <div className="bg-gradient-to-br from-amber-900/20 to-orange-900/20 border border-amber-700/30 rounded-2xl p-6">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-12 h-12 bg-gradient-to-br from-amber-500 to-orange-500 rounded-xl flex items-center justify-center">
                      <User className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-white">Team Collaboration</h3>
                      <p className="text-amber-200 text-sm">Streamline team workflows</p>
                    </div>
                  </div>
                  <p className="text-gray-300 leading-relaxed">
                    Enable seamless collaboration with shared workspaces, real-time editing,
                    role-based permissions, and approval workflows for consistent quality control.
                  </p>
                </div>

                <div className="bg-gradient-to-br from-amber-900/20 to-orange-900/20 border border-amber-700/30 rounded-2xl p-6">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-12 h-12 bg-gradient-to-br from-amber-500 to-orange-500 rounded-xl flex items-center justify-center">
                      <Sparkles className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-white">Brand Customization</h3>
                      <p className="text-amber-200 text-sm">White-label solution</p>
                    </div>
                  </div>
                  <p className="text-gray-300 leading-relaxed">
                    Customize templates with your company branding, logos, color schemes,
                    and create branded candidate experiences that reflect your organization.
                  </p>
                </div>

                <div className="bg-gradient-to-br from-amber-900/20 to-orange-900/20 border border-amber-700/30 rounded-2xl p-6">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-12 h-12 bg-gradient-to-br from-amber-500 to-orange-500 rounded-xl flex items-center justify-center">
                      <BarChart2 className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-white">Advanced Analytics</h3>
                      <p className="text-amber-200 text-sm">Data-driven insights</p>
                    </div>
                  </div>
                  <p className="text-gray-300 leading-relaxed">
                    Track hiring metrics, ATS performance, team productivity, and ROI with
                    comprehensive dashboards and custom reporting capabilities.
                  </p>
                </div>
              </div>

              {/* Right side - ROI Stats */}
              <div className="bg-gradient-to-br from-gray-800 to-gray-900 border border-gray-700 rounded-3xl p-8">
                <h3 className="text-2xl font-bold text-white mb-8 text-center">Enterprise ROI Impact</h3>

                <div className="space-y-6">
                  <div className="flex items-center justify-between p-4 bg-gradient-to-r from-green-900/30 to-emerald-900/30 rounded-xl border border-green-700/30">
                    <div>
                      <div className="text-2xl font-bold text-green-400">67%</div>
                      <div className="text-sm text-gray-300">Faster Hiring</div>
                    </div>
                    <TrendingUp className="w-8 h-8 text-green-400" />
                  </div>

                  <div className="flex items-center justify-between p-4 bg-gradient-to-r from-blue-900/30 to-cyan-900/30 rounded-xl border border-blue-700/30">
                    <div>
                      <div className="text-2xl font-bold text-blue-400">$2.3M</div>
                      <div className="text-sm text-gray-300">Annual Savings</div>
                    </div>
                    <Target className="w-8 h-8 text-blue-400" />
                  </div>

                  <div className="flex items-center justify-between p-4 bg-gradient-to-r from-purple-900/30 to-violet-900/30 rounded-xl border border-purple-700/30">
                    <div>
                      <div className="text-2xl font-bold text-purple-400">94%</div>
                      <div className="text-sm text-gray-300">Team Satisfaction</div>
                    </div>
                    <Star className="w-8 h-8 text-purple-400" />
                  </div>

                  <div className="flex items-center justify-between p-4 bg-gradient-to-r from-amber-900/30 to-orange-900/30 rounded-xl border border-amber-700/30">
                    <div>
                      <div className="text-2xl font-bold text-amber-400">10x</div>
                      <div className="text-sm text-gray-300">Productivity Gain</div>
                    </div>
                    <Zap className="w-8 h-8 text-amber-400" />
                  </div>
                </div>

                <div className="mt-8 p-4 bg-gradient-to-r from-amber-600 to-orange-600 rounded-xl text-center">
                  <div className="text-3xl font-bold text-white mb-1">$49.99</div>
                  <div className="text-amber-100 text-sm">per user/month</div>
                  <div className="text-xs text-amber-200 mt-1">Billed annually • Volume discounts available</div>
                </div>
              </div>
            </div>

            {/* Enterprise Features Grid */}
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
              <div className="text-center p-6 bg-gray-800/50 rounded-xl border border-gray-700">
                <FileText className="w-8 h-8 text-amber-400 mx-auto mb-3" />
                <h4 className="font-semibold text-white mb-2">Bulk Creation</h4>
                <p className="text-sm text-gray-400">Generate hundreds of resumes simultaneously with batch processing</p>
              </div>

              <div className="text-center p-6 bg-gray-800/50 rounded-xl border border-gray-700">
                <Shield className="w-8 h-8 text-amber-400 mx-auto mb-3" />
                <h4 className="font-semibold text-white mb-2">Priority Support</h4>
                <p className="text-sm text-gray-400">Dedicated phone support and account manager for enterprise needs</p>
              </div>

              <div className="text-center p-6 bg-gray-800/50 rounded-xl border border-gray-700">
                <Target className="w-8 h-8 text-amber-400 mx-auto mb-3" />
                <h4 className="font-semibold text-white mb-2">Custom Integrations</h4>
                <p className="text-sm text-gray-400">API access and custom integrations with your existing HR systems</p>
              </div>

              <div className="text-center p-6 bg-gray-800/50 rounded-xl border border-gray-700">
                <Clock className="w-8 h-8 text-amber-400 mx-auto mb-3" />
                <h4 className="font-semibold text-white mb-2">SLA Guarantee</h4>
                <p className="text-sm text-gray-400">99.9% uptime guarantee with enterprise-grade infrastructure</p>
              </div>
            </div>

            {/* CTA */}
            <div className="text-center">
              <button
                type="button"
                onClick={() => navigateTo('/pricing')}
                className="inline-flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-amber-600 to-orange-600 text-white font-bold rounded-xl hover:shadow-2xl transform hover:scale-105 transition-all duration-200"
              >
                <Award className="w-5 h-5" />
                Explore Enterprise Plans
                <ArrowRight className="w-5 h-5" />
              </button>
              <p className="mt-4 text-gray-400">
                Contact sales for custom pricing and volume discounts
              </p>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 px-6">
          <div className="max-w-4xl mx-auto text-center">
            <div className="bg-gradient-to-br from-teal-600 to-amber-600 rounded-3xl p-12 text-white relative overflow-hidden">
              <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-3xl"></div>
              <div className="relative z-10">
                <h2 className="text-4xl font-bold mb-4">Ready to Join the Top 25%?</h2>
                <p className="text-xl mb-8 opacity-90">75% of resumes fail ATS. Don't be one of them.</p>
                <button
                  type="button"
                  onClick={() => navigateTo('/login')}
                  className="px-8 py-4 bg-white text-teal-600 font-bold rounded-xl hover:shadow-2xl transform hover:scale-105 transition-all duration-200"
                >
                  Start Building Free
                </button>
                <p className="mt-4 text-sm opacity-75">No credit card required • 5 minute setup</p>
              </div>
            </div>
          </div>
        </section>

        {/* Footer */}
        <footer className="bg-black border-t border-gray-900 text-gray-400 py-12 px-6">
          <div className="max-w-6xl mx-auto">
            <div className="grid md:grid-cols-4 gap-8 mb-8">
              <div>
                <div className="flex items-center gap-2 mb-4">
                  <div className="w-8 h-8">
                    <img src="/horse-logo.png" alt="SmartATS Logo" className="w-full h-full object-contain" />
                  </div>
                  <span className="text-xl font-bold text-white">SmartATS</span>
                </div>
                <p className="text-sm">Beat the bots. Get the job.</p>
              </div>
              
              <div>
                <h4 className="font-semibold text-white mb-4">Product</h4>
                <ul className="space-y-2 text-sm">
                  <li><a href="/templates" className="hover:text-teal-400 transition-colors">Templates</a></li>
                  <li><a href="/builder" className="hover:text-teal-400 transition-colors">Resume Builder</a></li>
                  <li><a href="/ats-guide" className="hover:text-teal-400 transition-colors">ATS Guide</a></li>
                </ul>
              </div>

              <div>
                <h4 className="font-semibold text-white mb-4">Company</h4>
                <ul className="space-y-2 text-sm">
                  <li><a href="/about" className="hover:text-teal-400 transition-colors">About</a></li>
                  <li><a href="/pricing" className="hover:text-teal-400 transition-colors">Pricing</a></li>
                  <li><a href="/blog" className="hover:text-teal-400 transition-colors">Blog</a></li>
                </ul>
              </div>

              <div>
                <h4 className="font-semibold text-white mb-4">Support</h4>
                <ul className="space-y-2 text-sm">
                  <li><a href="/help" className="hover:text-teal-400 transition-colors">Help Center</a></li>
                  <li><a href="/contact" className="hover:text-teal-400 transition-colors">Contact</a></li>
                  <li><a href="/privacy" className="hover:text-teal-400 transition-colors">Privacy Policy</a></li>
                </ul>
              </div>
            </div>

            <div className="border-t border-gray-900 pt-8 text-center text-sm">
              <p>&copy; 2024 SmartATS. All rights reserved.</p>
            </div>
          </div>
        </footer>

        {/* Demo Modal */}
        <ATSDemoModal open={showDemoModal} onClose={() => setShowDemoModal(false)} />

        <style>{`
          @keyframes float {
            0%, 100% { transform: translateY(0px); }
            50% { transform: translateY(-20px); }
          }
          
          @keyframes float-delayed {
            0%, 100% { transform: translateY(0px); }
            50% { transform: translateY(-30px); }
          }
          
          .animate-float {
            animation: float 6s ease-in-out infinite;
          }
          
          .animate-float-delayed {
            animation: float-delayed 8s ease-in-out infinite;
          }
          
          .animate-bounce-slow {
            animation: bounce 3s ease-in-out infinite;
          }
          
          @keyframes fadeIn {
            from { opacity: 0; }
            to { opacity: 1; }
          }
          
          .animate-fadeIn {
            animation: fadeIn 0.3s ease-out;
          }
        `}</style>
      </div>
    </>
  );
};

export default EnhancedLandingPage;
