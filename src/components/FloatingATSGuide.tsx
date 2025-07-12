'use client';

import React, { useState, useEffect } from 'react';
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
  Sparkles,
  X,
  BookOpen,
  ChevronUp,
  ChevronDown
} from 'lucide-react';

const FloatingATSGuide = () => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [isVisible, setIsVisible] = useState(true);

  const stats = [
    { number: "90%", label: "Fortune 500 companies use ATS", icon: <Users className="w-4 h-4" /> },
    { number: "6 sec", label: "Average ATS scan time", icon: <Clock className="w-4 h-4" /> },
    { number: "75%", label: "Resumes filtered out by ATS", icon: <Shield className="w-4 h-4" /> },
    { number: "3x", label: "Higher interview rate with optimization", icon: <TrendingUp className="w-4 h-4" /> },
  ];

  const quickTips = [
    {
      icon: <FileText className="w-5 h-5 text-blue-400" />,
      title: "Use Standard Fonts",
      description: "Stick to Arial, Calibri, or Times New Roman"
    },
    {
      icon: <Search className="w-5 h-5 text-purple-400" />,
      title: "Include Keywords",
      description: "Mirror keywords from job descriptions"
    },
    {
      icon: <Target className="w-5 h-5 text-green-400" />,
      title: "Simple Formatting",
      description: "Avoid tables, graphics, and complex layouts"
    },
    {
      icon: <Eye className="w-5 h-5 text-orange-400" />,
      title: "Use Standard Sections",
      description: "Experience, Education, Skills sections"
    }
  ];

  if (!isVisible) return null;

  return (
    <div className="fixed bottom-6 right-6 z-50 max-w-sm">
      {/* Collapsed State */}
      {!isExpanded && (
        <div 
          className="bg-gradient-to-r from-teal-600 to-amber-600 text-white p-4 rounded-2xl shadow-2xl cursor-pointer hover:shadow-3xl transform hover:scale-105 transition-all duration-300 border border-teal-500/30"
          onClick={() => setIsExpanded(true)}
        >
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-white/20 rounded-xl flex items-center justify-center">
              <BookOpen className="w-5 h-5" />
            </div>
            <div className="flex-1">
              <div className="font-bold text-sm">ATS Guide</div>
              <div className="text-xs opacity-90">Quick tips to beat ATS</div>
            </div>
            <ChevronUp className="w-5 h-5 opacity-70" />
          </div>
        </div>
      )}

      {/* Expanded State */}
      {isExpanded && (
        <div className="bg-gray-900 border border-gray-700 rounded-2xl shadow-2xl overflow-hidden max-h-[80vh] overflow-y-auto">
          {/* Header */}
          <div className="bg-gradient-to-r from-teal-600 to-amber-600 p-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 bg-white/20 rounded-lg flex items-center justify-center">
                  <BookOpen className="w-4 h-4 text-white" />
                </div>
                <div>
                  <div className="font-bold text-white text-sm">ATS Guide</div>
                  <div className="text-xs text-white/80">Beat the bots, get the job</div>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setIsExpanded(false)}
                  className="p-1 hover:bg-white/20 rounded-lg transition-colors"
                >
                  <ChevronDown className="w-4 h-4 text-white" />
                </button>
                <button
                  onClick={() => setIsVisible(false)}
                  className="p-1 hover:bg-white/20 rounded-lg transition-colors"
                >
                  <X className="w-4 h-4 text-white" />
                </button>
              </div>
            </div>
          </div>

          {/* Content */}
          <div className="p-4 space-y-4">
            {/* Stats */}
            <div className="grid grid-cols-2 gap-2">
              {stats.map((stat, idx) => (
                <div key={idx} className="bg-gray-800 rounded-lg p-3 text-center">
                  <div className="flex items-center justify-center mb-1 text-teal-400">
                    {stat.icon}
                  </div>
                  <div className="text-lg font-bold text-white">{stat.number}</div>
                  <div className="text-xs text-gray-400">{stat.label}</div>
                </div>
              ))}
            </div>

            {/* Quick Tips */}
            <div>
              <h3 className="text-sm font-bold text-white mb-3 flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-amber-400" />
                Quick Tips
              </h3>
              <div className="space-y-2">
                {quickTips.map((tip, idx) => (
                  <div key={idx} className="bg-gray-800 rounded-lg p-3">
                    <div className="flex items-start gap-3">
                      <div className="mt-0.5">{tip.icon}</div>
                      <div className="flex-1">
                        <div className="text-sm font-medium text-white">{tip.title}</div>
                        <div className="text-xs text-gray-400 mt-1">{tip.description}</div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* CTA */}
            <div className="bg-gradient-to-r from-teal-900/50 to-amber-900/50 border border-teal-700/50 rounded-lg p-3">
              <div className="text-sm font-medium text-white mb-2">Ready to optimize?</div>
              <div className="text-xs text-gray-300 mb-3">
                Use our AI-powered builder to create an ATS-optimized resume in minutes.
              </div>
              <button
                onClick={() => window.location.href = '/builder'}
                className="w-full bg-gradient-to-r from-teal-600 to-amber-600 text-white text-sm font-medium py-2 px-3 rounded-lg hover:shadow-lg transition-all duration-200 flex items-center justify-center gap-2"
              >
                Start Building
                <ArrowRight className="w-3 h-3" />
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default FloatingATSGuide;
