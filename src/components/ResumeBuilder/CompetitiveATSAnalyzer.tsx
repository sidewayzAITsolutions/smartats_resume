// src/components/ResumeBuilder/CompetitiveATSCard.tsx - Create this file
'use client';
import { useState, useEffect } from 'react';
import { ATSAnalysisResult, CompetitiveATSAnalyzer } from '@/utils/competitive-ats-analyzer';
import { TrendingUp, Target, Award, Zap, CheckCircle, AlertTriangle, XCircle } from 'lucide-react';

interface CompetitiveATSCardProps {
  resume: any;
  jobDescription?: string;
  targetIndustry?: string;
}

export default function CompetitiveATSCard({ resume, jobDescription, targetIndustry }: CompetitiveATSCardProps) {
  const [analysis, setAnalysis] = useState<ATSAnalysisResult | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (resume && resume.personalInfo?.fullName) {
      analyzeResume();
    }
  }, [resume, jobDescription, targetIndustry]);

  const analyzeResume = async () => {
    setLoading(true);
    
    // Simulate API call (replace with actual analysis)
    setTimeout(() => {
      const analyzer = new CompetitiveATSAnalyzer();
      const result = analyzer.analyzeCompetitively(resume, jobDescription, targetIndustry);
      setAnalysis(result);
      setLoading(false);
    }, 1500);
  };

  const getScoreColor = (score: number) => {
    if (score >= 80) return 'text-green-600 bg-green-100';
    if (score >= 60) return 'text-yellow-600 bg-yellow-100';
    return 'text-red-600 bg-red-100';
  };

  const getScoreIcon = (score: number) => {
    if (score >= 80) return <CheckCircle className="w-5 h-5 text-green-600" />;
    if (score >= 60) return <AlertTriangle className="w-5 h-5 text-yellow-600" />;
    return <XCircle className="w-5 h-5 text-red-600" />;
  };

  if (loading) {
    return (
      <div className="bg-white rounded-lg shadow-sm p-6">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <h3 className="text-lg font-semibold text-gray-900 mb-2">Analyzing Your Resume</h3>
          <p className="text-gray-600">Running competitive ATS analysis...</p>
        </div>
      </div>
    );
  }

  if (!analysis) return null;

  return (
    <div className="space-y-6">
      {/* Overall Score Card */}
      <div className="bg-white rounded-lg shadow-sm p-6">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h3 className="text-2xl font-bold text-gray-900">Your ATS Score</h3>
            <p className="text-gray-600">Competitive analysis vs industry leaders</p>
          </div>
          <div className={`px-6 py-3 rounded-full ${getScoreColor(analysis.overallScore)}`}>
            <span className="text-3xl font-bold">{analysis.overallScore}%</span>
          </div>
        </div>

        {/* Competitive Comparison */}
        <div className="grid md:grid-cols-3 gap-4 mb-6">
          {Object.values(analysis.competitiveAnalysis).map((competitor, index) => (
            <div key={index} className="bg-gray-50 rounded-lg p-4 text-center">
              <h4 className="font-semibold text-gray-900 mb-2">vs {competitor.competitorName}</h4>
              <div className="flex justify-center items-center gap-4 mb-2">
                <div className="text-center">
                  <div className="text-lg font-bold text-blue-600">{competitor.ourScore}%</div>
                  <div className="text-xs text-gray-600">ResuMate</div>
                </div>
                <div className="text-gray-400">vs</div>
                <div className="text-center">
                  <div className="text-lg font-bold text-gray-400">{competitor.theirEstimatedScore}%</div>
                  <div className="text-xs text-gray-600">{competitor.competitorName}</div>
                </div>
              </div>
              <div className="text-xs text-green-600 font-medium">
                ✓ {competitor.advantage}
              </div>
            </div>
          ))}
        </div>

        {/* Score Breakdown */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
          {Object.entries(analysis.detailedBreakdown).map(([key, section]) => (
            <div key={key} className="text-center">
              <div className="flex items-center justify-center mb-2">
                {getScoreIcon(section.score)}
              </div>
              <div className="font-semibold text-gray-900 capitalize">
                {key.replace(/([A-Z])/g, ' $1').trim()}
              </div>
              <div className={`text-lg font-bold ${section.score >= 80 ? 'text-green-600' : section.score >= 60 ? 'text-yellow-600' : 'text-red-600'}`}>
                {section.score}%
              </div>
            </div>
          ))}
        </div>
      </div>
      {/* Actionable Insights */}
      <div className="bg-white rounded-lg shadow-sm p-6">
        <h4 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
          <Target className="w-5 h-5 mr-2 text-blue-600" />
          Actionable Insights
        </h4>
        
        <div className="space-y-4">
          {analysis.actionableInsights.map((insight, index) => (
            <div key={index} className={`border-l-4 pl-4 py-3 ${
              insight.priority === 'high' ? 'border-red-500 bg-red-50' :
              insight.priority === 'medium' ? 'border-yellow-500 bg-yellow-50' :
              'border-green-500 bg-green-50'
            }`}>
              <div className="flex items-center justify-between mb-2">
                <h5 className="font-medium text-gray-900">{insight.title}</h5>
                <span className={`px-2 py-1 rounded text-xs font-medium ${
                  insight.priority === 'high' ? 'bg-red-100 text-red-800' :
                  insight.priority === 'medium' ? 'bg-yellow-100 text-yellow-800' :
                  'bg-green-100 text-green-800'
                }`}>
                  {insight.priority} priority
                </span>
              </div>
              <p className="text-gray-700 text-sm mb-2">{insight.description}</p>
              <div className="text-sm">
                <div className="font-medium text-gray-900">Action: {insight.action}</div>
                <div className="text-blue-600">Impact: {insight.impact}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
      {/* Competitive Advantages */}
      <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg p-6">
        <h4 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
          <Award className="w-5 h-5 mr-2 text-blue-600" />
          Your Competitive Advantages
        </h4>
        
        <div className="grid md:grid-cols-2 gap-3">
          {analysis.competitiveAdvantages.map((advantage, index) => (
            <div key={index} className="flex items-start gap-2">
              <Zap className="w-4 h-4 text-blue-600 mt-0.5 flex-shrink-0" />
              <span className="text-gray-700 text-sm">{advantage}</span>
            </div>
          ))}
        </div>
        
        <div className="mt-4 p-4 bg-white rounded-lg">
          <div className="text-sm text-center text-gray-600">
            🎯 <strong>Bottom Line:</strong> Your resume performs {analysis.overallScore >= 80 ? 'excellently' : analysis.overallScore >= 60 ? 'well' : 'adequately'} compared to users of expensive competitors like Jobscan ($49.95/mo), Resume.io ($16/mo), and Rezi ($29/mo) - all for just $9.99/month!
          </div>
        </div>
      </div>
    </div>
  );
}
