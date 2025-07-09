'use client';

import React from 'react';
import Link from 'next/link';
import { ArrowLeft, CheckCircle, AlertTriangle, Target, Zap, FileText, Award } from 'lucide-react';

const ATSGuidePage = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-950 via-gray-900 to-black text-white">
      {/* Header */}
      <header className="bg-gray-900/90 backdrop-blur-md border-b border-gray-800 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <Link href="/" className="flex items-center gap-3">
              <div className="relative w-12 h-12">
                <img src="/horse-logo.png" alt="SmartATS Logo" className="w-full h-full object-contain" />
              </div>
              <span className="text-2xl font-bold bg-gradient-to-r from-teal-400 to-amber-400 bg-clip-text text-transparent">
                SmartATS
              </span>
            </Link>
            
            <div className="flex items-center gap-4">
              <Link href="/templates" className="text-gray-300 hover:text-teal-400 transition-colors">
                Templates
              </Link>
              <Link href="/pricing" className="text-gray-300 hover:text-teal-400 transition-colors">
                Pricing
              </Link>
              <Link href="/builder" className="bg-gradient-to-r from-teal-600 to-amber-600 text-white px-6 py-2 rounded-xl font-medium hover:shadow-lg transition-all">
                Start Building
              </Link>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-4xl mx-auto px-6 py-12">
        <div className="mb-8">
          <Link href="/" className="inline-flex items-center gap-2 text-gray-400 hover:text-teal-400 transition-colors mb-6">
            <ArrowLeft className="w-4 h-4" />
            Back to Home
          </Link>
          
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            Complete ATS Guide
          </h1>
          <p className="text-xl text-gray-400">
            Everything you need to know about beating Applicant Tracking Systems
          </p>
        </div>

        {/* What is ATS Section */}
        <section className="mb-12">
          <div className="bg-gray-900 border border-gray-800 rounded-2xl p-8">
            <h2 className="text-3xl font-bold mb-6 flex items-center gap-3">
              <FileText className="w-8 h-8 text-teal-400" />
              What is an ATS?
            </h2>
            <p className="text-gray-300 text-lg leading-relaxed mb-6">
              An Applicant Tracking System (ATS) is software used by employers to collect, sort, scan, and rank job applications. 
              Over 98% of Fortune 500 companies use ATS to filter resumes before they reach human recruiters.
            </p>
            <div className="grid md:grid-cols-3 gap-6">
              <div className="bg-gray-800 rounded-xl p-6">
                <div className="text-2xl font-bold text-red-400 mb-2">75%</div>
                <p className="text-gray-400">of resumes are rejected by ATS before human review</p>
              </div>
              <div className="bg-gray-800 rounded-xl p-6">
                <div className="text-2xl font-bold text-yellow-400 mb-2">6 sec</div>
                <p className="text-gray-400">average time ATS spends scanning each resume</p>
              </div>
              <div className="bg-gray-800 rounded-xl p-6">
                <div className="text-2xl font-bold text-green-400 mb-2">94%</div>
                <p className="text-gray-400">of recruiters rely on ATS for initial screening</p>
              </div>
            </div>
          </div>
        </section>

        {/* ATS Optimization Tips */}
        <section className="mb-12">
          <div className="bg-gray-900 border border-gray-800 rounded-2xl p-8">
            <h2 className="text-3xl font-bold mb-6 flex items-center gap-3">
              <Target className="w-8 h-8 text-amber-400" />
              ATS Optimization Tips
            </h2>
            
            <div className="space-y-6">
              <div className="flex items-start gap-4">
                <CheckCircle className="w-6 h-6 text-green-400 mt-1 flex-shrink-0" />
                <div>
                  <h3 className="text-xl font-semibold mb-2">Use Standard Section Headers</h3>
                  <p className="text-gray-400">Stick to conventional headers like "Work Experience," "Education," and "Skills" instead of creative alternatives.</p>
                </div>
              </div>
              
              <div className="flex items-start gap-4">
                <CheckCircle className="w-6 h-6 text-green-400 mt-1 flex-shrink-0" />
                <div>
                  <h3 className="text-xl font-semibold mb-2">Include Relevant Keywords</h3>
                  <p className="text-gray-400">Mirror the language used in the job description. Include both the full term and abbreviations (e.g., "Search Engine Optimization (SEO)").</p>
                </div>
              </div>
              
              <div className="flex items-start gap-4">
                <CheckCircle className="w-6 h-6 text-green-400 mt-1 flex-shrink-0" />
                <div>
                  <h3 className="text-xl font-semibold mb-2">Use Simple Formatting</h3>
                  <p className="text-gray-400">Avoid tables, text boxes, headers/footers, and complex formatting that can confuse ATS parsers.</p>
                </div>
              </div>
              
              <div className="flex items-start gap-4">
                <CheckCircle className="w-6 h-6 text-green-400 mt-1 flex-shrink-0" />
                <div>
                  <h3 className="text-xl font-semibold mb-2">Save as PDF or DOCX</h3>
                  <p className="text-gray-400">Most modern ATS can read PDF and DOCX files. Avoid older formats or images.</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Common ATS Mistakes */}
        <section className="mb-12">
          <div className="bg-gray-900 border border-gray-800 rounded-2xl p-8">
            <h2 className="text-3xl font-bold mb-6 flex items-center gap-3">
              <AlertTriangle className="w-8 h-8 text-red-400" />
              Common ATS Mistakes to Avoid
            </h2>
            
            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-red-900/20 border border-red-800 rounded-xl p-6">
                <h3 className="text-lg font-semibold text-red-400 mb-3">❌ Don't Do</h3>
                <ul className="space-y-2 text-gray-300">
                  <li>• Use images or graphics for text</li>
                  <li>• Include contact info in headers/footers</li>
                  <li>• Use fancy fonts or colors</li>
                  <li>• Submit as PNG or JPG files</li>
                  <li>• Use tables for layout</li>
                </ul>
              </div>
              
              <div className="bg-green-900/20 border border-green-800 rounded-xl p-6">
                <h3 className="text-lg font-semibold text-green-400 mb-3">✅ Do This</h3>
                <ul className="space-y-2 text-gray-300">
                  <li>• Use standard fonts (Arial, Calibri)</li>
                  <li>• Include keywords naturally</li>
                  <li>• Use bullet points for lists</li>
                  <li>• Save as PDF or DOCX</li>
                  <li>• Keep formatting simple</li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="text-center">
          <div className="bg-gradient-to-r from-teal-600 to-amber-600 rounded-2xl p-8">
            <h2 className="text-3xl font-bold mb-4">Ready to Beat the ATS?</h2>
            <p className="text-xl mb-6 opacity-90">
              Use our AI-powered resume builder to create an ATS-optimized resume in minutes.
            </p>
            <Link href="/templates" className="inline-block bg-white text-teal-600 px-8 py-3 rounded-xl font-bold hover:shadow-lg transition-all">
              Start Building Your Resume
            </Link>
          </div>
        </section>
      </main>
    </div>
  );
};

export default ATSGuidePage;
