'use client';

import React from 'react';
import BusinessCard from '@/components/BusinessCard';
import UnifiedNavigation from '@/components/UnifiedNavigation';
import { ArrowLeft } from 'lucide-react';
import Link from 'next/link';

export default function ContactSalesPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-950 via-gray-900 to-black">
      {/* Navigation */}
      <UnifiedNavigation />
      
      {/* Header Section */}
      <div className="pt-24 pb-12 px-6">
        <div className="max-w-4xl mx-auto">
          {/* Back Button */}
          <Link 
            href="/enterprise"
            className="inline-flex items-center gap-2 text-amber-400 hover:text-amber-300 transition-colors mb-8"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Enterprise
          </Link>
          
          {/* Page Header */}
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
              Contact Our Sales Team
            </h1>
            <p className="text-xl text-gray-300 max-w-2xl mx-auto">
              Ready to transform your enterprise hiring process? Get in touch with our team to discuss custom solutions tailored to your organization's needs.
            </p>
          </div>
        </div>
      </div>

      {/* Business Card Section */}
      <div className="px-6 pb-20">
        <BusinessCard />
      </div>

      {/* Additional Information Section */}
      <div className="px-6 pb-20">
        <div className="max-w-4xl mx-auto">
          <div className="bg-gray-800/50 rounded-2xl p-8 border border-gray-700/50">
            <h2 className="text-2xl font-bold text-white mb-6 text-center">
              What to Expect When You Contact Us
            </h2>
            
            <div className="grid md:grid-cols-3 gap-6">
              <div className="text-center">
                <div className="w-12 h-12 bg-amber-600 rounded-lg flex items-center justify-center mx-auto mb-4">
                  <span className="text-white font-bold text-lg">1</span>
                </div>
                <h3 className="text-lg font-semibold text-white mb-2">
                  Initial Consultation
                </h3>
                <p className="text-gray-300 text-sm">
                  We'll discuss your current hiring challenges and understand your specific requirements.
                </p>
              </div>
              
              <div className="text-center">
                <div className="w-12 h-12 bg-amber-600 rounded-lg flex items-center justify-center mx-auto mb-4">
                  <span className="text-white font-bold text-lg">2</span>
                </div>
                <h3 className="text-lg font-semibold text-white mb-2">
                  Custom Proposal
                </h3>
                <p className="text-gray-300 text-sm">
                  Receive a tailored solution proposal with pricing that fits your organization's scale.
                </p>
              </div>
              
              <div className="text-center">
                <div className="w-12 h-12 bg-amber-600 rounded-lg flex items-center justify-center mx-auto mb-4">
                  <span className="text-white font-bold text-lg">3</span>
                </div>
                <h3 className="text-lg font-semibold text-white mb-2">
                  Implementation
                </h3>
                <p className="text-gray-300 text-sm">
                  Our team will guide you through setup and provide comprehensive training for your staff.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
