'use client';

import React from 'react';
import Link from 'next/link';
import { 
  CheckCircle, 
  AlertTriangle, 
  FileText, 
  Eye, 
  Search, 
  Target, 
  Zap, 
  TrendingUp, 
  Shield, 
  Clock,
  Users,
  Award,
  ArrowRight,
  Sparkles
} from 'lucide-react';

const ATSGuide = () => {
  const stats = [
    { number: "90%", label: "Fortune 500 companies use ATS", icon: <Users className="w-6 h-6" /> },
    { number: "6 sec", label: "Average ATS scan time", icon: <Clock className="w-6 h-6" /> },
    { number: "75%", label: "Resumes filtered out by ATS", icon: <Shield className="w-6 h-6" /> },
    { number: "3x", label: "Higher interview rate with optimization", icon: <TrendingUp className="w-6 h-6" /> },
  ];

  const tips = [
    {
      icon: <FileText className="w-8 h-8 text-blue-600" />,
      title: "Use Standard Fonts",
      description: "Stick to Arial, Calibri, or Times New Roman for maximum compatibility",
      details: "ATS systems struggle with decorative fonts and may misread your content"
    },
    {
      icon: <Search className="w-8 h-8 text-purple-600" />,
      title: "Include Keywords",
      description: "Mirror keywords from the job description naturally throughout your resume",
      details: "Use both acronyms and full terms (e.g., 'AI' and 'Artificial Intelligence')"
    },
    {
      icon: <Target className="w-8 h-8 text-green-600" />,
      title: "Simple Formatting",
      description: "Avoid tables, graphics, and complex layouts that confuse ATS systems",
      details: "Use standard bullet points and clear section headers"
    },
    {
      icon: <Eye className="w-8 h-8 text-orange-600" />,
      title: "Standard Sections",
      description: "Use conventional headings: Experience, Education, Skills, etc.",
      details: "Creative section names like 'My Journey' confuse ATS parsers"
    }
  ];

  const commonMistakes = [
    { mistake: "Using images or graphics", impact: "ATS can't read visual elements" },
    { mistake: "Complex table layouts", impact: "Text order gets scrambled" },
    { mistake: "Headers and footers", impact: "Often ignored by ATS" },
    { mistake: "Unusual fonts or formatting", impact: "Characters may be misread" },
    { mistake: "Missing contact information", impact: "Can't reach qualified candidates" },
    { mistake: "Inconsistent date formats", impact: "Timeline appears unclear" }
  ];

  const checklistItems = [
    { item: "Save your resume as both .docx and .pdf formats", tip: "Most ATS prefer .docx files" },
    { item: "Test your resume by copying and pasting it into a plain text editor", tip: "Check if formatting survives" },
    { item: "Ensure all text is selectable and readable", tip: "No text should be in images" },
    { item: "Check that your contact information appears clearly", tip: "Use standard format" },
    { item: "Verify that dates and job titles are properly formatted", tip: "Use consistent MM/YYYY format" },
    { item: "Use our ATS optimization tool for a detailed scan", tip: "Get instant feedback" }
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 pt-20 pb-32">
        <div className="absolute inset-0 bg-grid-pattern opacity-5"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="inline-flex items-center px-4 py-2 bg-blue-100 rounded-full text-blue-800 text-sm font-medium mb-8">
              <Sparkles className="w-4 h-4 mr-2" />
              Master ATS Systems & Land More Interviews
            </div>
            <h1 className="text-5xl md:text-7xl font-bold mb-6">
              <span className="bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 bg-clip-text text-transparent">
                Beat the ATS
              </span>
              <br />
              <span className="text-gray-900">Get Noticed</span>
            </h1>
            <p className="text-xl md:text-2xl text-gray-600 max-w-4xl mx-auto mb-12 leading-relaxed">
              Master Applicant Tracking Systems with our comprehensive guide. 
              Learn the secrets to getting your resume past automated filters and into human hands.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Link
                href="/builder"
                className="group bg-gradient-to-r from-blue-600 to-purple-600 text-white px-8 py-4 rounded-xl font-semibold text-lg hover:from-blue-700 hover:to-purple-700 transition-all duration-300 transform hover:scale-105 shadow-xl hover:shadow-2xl flex items-center"
              >
                Start Building Now
                <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
              </Link>
              <Link
                href="#guide"
                className="text-gray-600 hover:text-blue-600 font-semibold text-lg transition-colors flex items-center"
              >
                Learn More
                <ArrowRight className="w-5 h-5 ml-2" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center group">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-blue-100 to-purple-100 rounded-2xl mb-4 group-hover:scale-110 transition-transform">
                  <div className="text-blue-600">
                    {stat.icon}
                  </div>
                </div>
                <div className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">{stat.number}</div>
                <div className="text-gray-600 font-medium">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* What is ATS Section */}
      <section id="guide" className="py-20 bg-gradient-to-br from-gray-50 to-blue-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-bold mb-6">
                <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                  What is an ATS?
                </span>
              </h2>
              <p className="text-xl text-gray-600 leading-relaxed">
                An Applicant Tracking System (ATS) is software used by employers to collect, sort, scan, and rank job applications.
              </p>
            </div>
            
            <div className="bg-white rounded-3xl p-8 md:p-12 shadow-xl border border-gray-100">
              <div className="prose prose-lg max-w-none">
                <p className="text-gray-700 mb-6 text-lg leading-relaxed">
                  Over 90% of Fortune 500 companies use ATS to filter resumes before human recruiters ever see them. 
                  These systems scan for keywords, formatting, and structure to determine if your resume matches the job requirements.
                </p>
                
                <div className="bg-gradient-to-r from-yellow-50 to-orange-50 border-l-4 border-yellow-400 p-6 rounded-lg">
                  <div className="flex items-start">
                    <AlertTriangle className="w-6 h-6 text-yellow-600 mr-3 mt-1 flex-shrink-0" />
                    <div>
                      <p className="text-yellow-800 font-semibold text-lg mb-2">
                        Critical Fact: Your resume has only 6 seconds to pass the ATS scan!
                      </p>
                      <p className="text-yellow-700">
                        If your resume isn't optimized for ATS, it may never reach human eyes, regardless of your qualifications.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ATS Optimization Tips */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                ATS Optimization Tips
              </span>
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Follow these proven strategies to ensure your resume passes ATS filters
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 gap-8">
            {tips.map((tip, index) => (
              <div key={index} className="group bg-gradient-to-br from-white to-gray-50 rounded-2xl p-8 shadow-lg border border-gray-100 hover:shadow-2xl transition-all duration-300 hover:-translate-y-2">
                <div className="flex items-start space-x-6">
                  <div className="flex-shrink-0 p-3 bg-gradient-to-br from-blue-50 to-purple-50 rounded-xl group-hover:scale-110 transition-transform">
                    {tip.icon}
                  </div>
                  <div className="flex-1">
                    <h3 className="text-2xl font-bold mb-3 text-gray-900">{tip.title}</h3>
                    <p className="text-gray-600 mb-4 text-lg">{tip.description}</p>
                    <p className="text-sm text-gray-500 italic">{tip.details}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Common Mistakes */}
      <section className="py-20 bg-gradient-to-br from-red-50 to-pink-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              <span className="bg-gradient-to-r from-red-600 to-pink-600 bg-clip-text text-transparent">
                Common ATS Mistakes to Avoid
              </span>
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Don't let these common errors prevent your resume from being seen
            </p>
          </div>
          
          <div className="bg-white rounded-3xl p-8 md:p-12 shadow-xl">
            <div className="grid md:grid-cols-2 gap-8">
              {commonMistakes.map((item, index) => (
                <div key={index} className="flex items-start space-x-4 p-4 rounded-xl hover:bg-red-50 transition-colors">
                  <div className="w-3 h-3 bg-red-500 rounded-full mt-2 flex-shrink-0"></div>
                  <div>
                    <span className="text-gray-900 font-semibold text-lg block mb-1">{item.mistake}</span>
                    <span className="text-gray-600 text-sm">{item.impact}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ATS Testing Checklist */}
      <section className="py-20 bg-gradient-to-br from-green-50 to-emerald-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              <span className="bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent">
                ATS Testing Checklist
              </span>
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Use this checklist to ensure your resume is ATS-ready
            </p>
          </div>
          
          <div className="bg-white rounded-3xl p-8 md:p-12 shadow-xl">
            <div className="space-y-6">
              {checklistItems.map((item, index) => (
                <div key={index} className="flex items-start space-x-4 p-4 rounded-xl hover:bg-green-50 transition-colors group">
                  <CheckCircle className="w-6 h-6 text-green-600 mt-1 flex-shrink-0 group-hover:scale-110 transition-transform" />
                  <div className="flex-1">
                    <span className="text-gray-900 font-semibold text-lg block mb-1">{item.item}</span>
                    <span className="text-gray-600 text-sm italic">{item.tip}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-br from-blue-600 via-purple-600 to-indigo-600 relative overflow-hidden">
        <div className="absolute inset-0 bg-grid-pattern opacity-10"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="max-w-4xl mx-auto">
            <div className="inline-flex items-center px-4 py-2 bg-white/20 rounded-full text-white text-sm font-medium mb-8">
              <Award className="w-4 h-4 mr-2" />
              Join 50,000+ Job Seekers Who've Optimized Their Resumes
            </div>
            <h2 className="text-4xl md:text-6xl font-bold text-white mb-6">
              Ready to Beat the ATS?
            </h2>
            <p className="text-xl text-blue-100 mb-12 leading-relaxed">
              Use our AI-powered resume builder and optimization tools to ensure your resume passes every ATS scan and lands in the hands of hiring managers.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Link
                href="/builder"
                className="group bg-white text-blue-600 px-8 py-4 rounded-xl font-bold text-lg hover:bg-gray-50 transition-all duration-300 transform hover:scale-105 shadow-xl hover:shadow-2xl flex items-center"
              >
                <Zap className="w-5 h-5 mr-2" />
                Start Building Your ATS-Optimized Resume
                <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
              </Link>
              <Link
                href="/templates"
                className="text-white hover:text-blue-200 font-semibold text-lg transition-colors flex items-center border border-white/30 px-6 py-4 rounded-xl hover:bg-white/10"
              >
                View Templates
                <ArrowRight className="w-5 h-5 ml-2" />
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ATSGuide;
