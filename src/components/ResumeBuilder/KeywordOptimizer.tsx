// src/components/ResumeBuilder/KeywordOptimizer.tsx
'use client';
import React from 'react';
import { useState, useEffect } from 'react';
import { Zap, Target, TrendingUp } from 'lucide-react';

const INDUSTRY_KEYWORDS = {
  'ats-friendly-resume': { weight: 10, category: 'core' },
  'resume-optimization': { weight: 9, category: 'core' },
  'applicant-tracking-system': { weight: 8, category: 'technical' },
  'keyword-matching': { weight: 8, category: 'technical' },
  'beat-the-bots': { weight: 7, category: 'colloquial' },
  'job-application': { weight: 6, category: 'general' },
  'interview-calls': { weight: 7, category: 'outcome' },
  'career-advancement': { weight: 6, category: 'outcome' },
  'resume-templates': { weight: 5, category: 'product' },
  'resume-builder': { weight: 5, category: 'product' }
};

interface KeywordOptimizerProps {
  resumeText: string;
  targetJob?: string;
  onKeywordSuggestion: (keywords: string[]) => void;
}

interface Suggestion {
  keyword: string;
  suggestion: string;
  impact: number;
}

interface Analysis {
  score: number;
  foundKeywords: string[];
  missingKeywords: string[];
  suggestions: Suggestion[];
}

export default function KeywordOptimizer({ resumeText, targetJob, onKeywordSuggestion }: KeywordOptimizerProps) {
  const [analysis, setAnalysis] = useState<Analysis | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (resumeText) {
      analyzeKeywords();
    }
  }, [resumeText, targetJob]);

  const analyzeKeywords = async () => {
    setLoading(true);
    
    // Simulate analysis (replace with actual API call)
    setTimeout(() => {
      const foundKeywords = Object.keys(INDUSTRY_KEYWORDS).filter(keyword =>
        resumeText.toLowerCase().includes(keyword.replace(/-/g, ' '))
      );

      const missingKeywords = Object.keys(INDUSTRY_KEYWORDS).filter(keyword =>
        !resumeText.toLowerCase().includes(keyword.replace(/-/g, ' '))
      );

      const score = Math.round((foundKeywords.length / Object.keys(INDUSTRY_KEYWORDS).length) * 100);

      setAnalysis({
        score,
        foundKeywords: foundKeywords.slice(0, 5),
        missingKeywords: missingKeywords.slice(0, 5),
        suggestions: generateSuggestions(missingKeywords.slice(0, 3))
      });

      onKeywordSuggestion(missingKeywords.slice(0, 3));
      setLoading(false);
    }, 1000);
  };

  const generateSuggestions = (missingKeywords: string[]) => {
    return missingKeywords.map(keyword => ({
      keyword: keyword.replace(/-/g, ' '),
      suggestion: `Consider adding "${keyword.replace(/-/g, ' ')}" to your ${getRecommendedSection(keyword)} section`,
      impact: INDUSTRY_KEYWORDS[keyword as keyof typeof INDUSTRY_KEYWORDS]?.weight || 5
    }));
  };

  const getRecommendedSection = (keyword: string) => {
    if (keyword.includes('resume') || keyword.includes('application')) return 'summary';
    if (keyword.includes('career') || keyword.includes('advancement')) return 'objective';
    return 'skills or experience';
  };

  if (loading) {
    return (
      <div className="bg-white rounded-lg shadow-sm p-6">
        <div className="animate-pulse">
          <div className="h-4 bg-gray-200 rounded w-3/4 mb-4"></div>
          <div className="h-4 bg-gray-200 rounded w-1/2"></div>
        </div>
      </div>
    );
  }

  if (!analysis) return null;

  return (
    <div className="bg-white rounded-lg shadow-sm p-6">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-gray-900">Keyword Optimization</h3>
        <div className={`px-3 py-1 rounded-full text-sm font-medium ${
          analysis.score >= 80 ? 'bg-green-100 text-green-800' :
          analysis.score >= 60 ? 'bg-yellow-100 text-yellow-800' :
          'bg-red-100 text-red-800'
        }`}>
          {analysis.score}% optimized
        </div>
      </div>
      {/* Found Keywords */}
      {analysis.foundKeywords.length > 0 && (
        <div className="mb-4">
          <h4 className="flex items-center text-sm font-medium text-green-700 mb-2">
            <Target className="w-4 h-4 mr-1" />
            Keywords Found ({analysis.foundKeywords.length})
          </h4>
          <div className="flex flex-wrap gap-1">
            {analysis.foundKeywords.map((keyword: string, index: number) => (
              <span key={index} className="px-2 py-1 bg-green-100 text-green-800 text-xs rounded">
                {keyword.replace(/-/g, ' ')}
              </span>
            ))}
          </div>
        </div>
      )}
      {/* Missing Keywords */}
      {analysis.missingKeywords.length > 0 && (
        <div className="mb-4">
          <h4 className="flex items-center text-sm font-medium text-orange-700 mb-2">
            <Zap className="w-4 h-4 mr-1" />
            Recommended Keywords ({analysis.missingKeywords.length})
          </h4>
          <div className="flex flex-wrap gap-1">
            {analysis.missingKeywords.map((keyword: string, index: number) => (
              <span key={index} className="px-2 py-1 bg-orange-100 text-orange-800 text-xs rounded">
                {keyword.replace(/-/g, ' ')}
              </span>
            ))}
          </div>
        </div>
      )}
      {analysis.suggestions.length > 0 && (
        <div>
          <h4 className="flex items-center text-sm font-medium text-blue-700 mb-2">
            <TrendingUp className="w-4 h-4 mr-1" />
            Quick Wins
          </h4>
          <div className="space-y-2">
            {analysis.suggestions.map((suggestion: Suggestion, index: number) => (
              <div key={index} className="text-sm text-gray-600 flex items-start">
                <span className="w-1 h-1 bg-blue-400 rounded-full mt-2 mr-2 flex-shrink-0"></span>
                {suggestion.suggestion}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
