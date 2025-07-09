
import React, { useState } from 'react';
import { MapPin, Lock, Brain, BarChart3, Lightbulb, Star } from 'lucide-react';

const SmartATSRedesign = () => {
  const [activeTab, setActiveTab] = useState('personal');

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      {/* Header */}
      <header className="bg-gray-950 border-b border-gray-800 px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-8">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center">
                <span className="text-sm font-bold">S</span>
              </div>
              <span className="text-xl font-semibold">SmartATS</span>
            </div>
            <div className="flex items-center space-x-2 text-gray-400">
              <div className="w-4 h-4 bg-green-500 rounded-full"></div>
              <span className="text-sm">0% Complete</span>
            </div>
          </div>
          <div className="flex items-center space-x-4">
            <button className="px-4 py-2 bg-purple-600 hover:bg-purple-700 rounded-lg flex items-center space-x-2">
              <Star className="w-4 h-4" />
              <span>Upgrade Pro!</span>
            </button>
            <span className="text-gray-400">Free Plan</span>
            <button className="px-4 py-2 bg-blue-600 hover:bg-blue-700 rounded-lg">
              Login
            </button>
          </div>
        </div>
      </header>

      {/* Navigation Tabs */}
      <div className="bg-gray-900 border-b border-gray-800 px-6">
        <div className="flex space-x-8">
          <button
            onClick={() => setActiveTab('personal')}
            className={`py-4 px-2 border-b-2 transition-colors ${
              activeTab === 'personal' 
                ? 'border-blue-500 text-blue-500' 
                : 'border-transparent text-gray-400 hover:text-white'
            }`}
          >
            👤 Personal
          </button>
          <button className="py-4 px-2 text-gray-400 hover:text-white">📄 Summary</button>
          <button className="py-4 px-2 text-gray-400 hover:text-white">💼 Experience</button>
          <button className="py-4 px-2 text-gray-400 hover:text-white">🎓 Education</button>
          <button className="py-4 px-2 text-gray-400 hover:text-white"># Skills</button>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex flex-1">
        {/* Left Column - Now includes moved sections */}
        <div className="w-1/2 p-6 space-y-6 overflow-y-auto">
          {/* Personal Information */}
          <div className="bg-gray-800 rounded-lg p-6">
            <h2 className="text-xl font-semibold mb-4">Personal Information</h2>
            <div className="grid grid-cols-2 gap-4">
              <input
                type="text"
                placeholder="Full Name"
                className="bg-gray-700 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <input
                type="text"
                placeholder="Professional Title"
                className="bg-gray-700 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <input
                type="email"
                placeholder="Email Address"
                className="bg-gray-700 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <input
                type="tel"
                placeholder="Phone Number"
                className="bg-gray-700 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <div className="relative">
                <MapPin className="absolute left-3 top-3.5 w-5 h-5 text-gray-400" />
                <input
                  type="text"
                  placeholder="Location"
                  className="bg-gray-700 rounded-lg pl-10 pr-4 py-3 w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <input
                type="text"
                placeholder="LinkedIn URL"
                className="bg-gray-700 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>

          {/* Competitive Analysis */}
          <div className="bg-gray-800 rounded-lg p-6">
            <h2 className="text-xl font-semibold mb-4 flex items-center">
              <Lock className="w-5 h-5 mr-2 text-yellow-500" />
              Competitive Analysis
            </h2>
            <div className="bg-gradient-to-r from-purple-600 to-pink-600 rounded-lg p-6 text-center">
              <div className="text-3xl mb-4">👑</div>
              <h3 className="text-lg font-semibold mb-2">Premium Feature</h3>
              <p className="text-sm mb-4 opacity-90">
                Compare your resume against industry leaders and top performers
              </p>
              <button className="w-full bg-white/20 hover:bg-white/30 backdrop-blur rounded-lg py-3 px-4 font-medium transition-colors">
                ⭐ Unlock Analysis
              </button>
            </div>
          </div>

          {/* AI Recommendations - Moved from right */}
          <div className="bg-gray-800 rounded-lg p-6">
            <h2 className="text-xl font-semibold mb-4 flex items-center">
              <Brain className="w-5 h-5 mr-2 text-purple-500" />
              AI Recommendations
            </h2>
            <div className="text-center py-8">
              <Brain className="w-16 h-16 mx-auto mb-4 text-gray-600" />
              <p className="text-gray-400">
                Keep adding content to see personalized recommendations
              </p>
            </div>
            <div className="mt-4 text-sm text-gray-500 text-center">
              AI Usage Today: 0/3
            </div>
          </div>

          {/* Resume Analytics - Moved from right */}
          <div className="bg-gray-800 rounded-lg p-6">
            <h2 className="text-xl font-semibold mb-4 flex items-center">
              <BarChart3 className="w-5 h-5 mr-2 text-green-500" />
              Resume Analytics
            </h2>
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-gray-400">Completion</span>
                <span>0%</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-400">Word Count</span>
                <span>1</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-400">Skills Count</span>
                <span>0</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-400">Experience Entries</span>
                <span>1</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-400">Readability</span>
                <span className="text-green-500">Good</span>
              </div>
              <div className="text-sm text-gray-500 mt-2">
                Clear, professional language detected
              </div>
            </div>
          </div>

          {/* Pro Tips - Moved from right */}
          <div className="bg-gray-800 rounded-lg p-6">
            <h2 className="text-xl font-semibold mb-4 flex items-center">
              <Lightbulb className="w-5 h-5 mr-2 text-yellow-500" />
              Pro Tips
            </h2>
            <div className="space-y-3">
              <div className="bg-blue-600/20 border border-blue-600/30 rounded-lg p-4">
                <div className="flex items-start space-x-3">
                  <div className="bg-blue-600 rounded p-1">
                    <BarChart3 className="w-4 h-4" />
                  </div>
                  <div>
                    <h4 className="font-medium mb-1">Quantify Everything</h4>
                    <p className="text-sm text-gray-300">
                      Use numbers, percentages, and metrics in your achievements
                    </p>
                  </div>
                </div>
              </div>
              
              <div className="bg-green-600/20 border border-green-600/30 rounded-lg p-4">
                <div className="flex items-start space-x-3">
                  <div className="bg-green-600 rounded p-1 text-white text-sm font-bold">
                    %
                  </div>
                  <div>
                    <h4 className="font-medium mb-1">Target Keywords</h4>
                    <p className="text-sm text-gray-300">
                      Match 70%+ of job description keywords for best results
                    </p>
                  </div>
                </div>
              </div>
              
              <div className="bg-purple-600/20 border border-purple-600/30 rounded-lg p-4">
                <div className="flex items-start space-x-3">
                  <div className="bg-purple-600 rounded p-1">
                    <span className="text-sm">⚡</span>
                  </div>
                  <div>
                    <h4 className="font-medium mb-1">Action Verbs</h4>
                    <p className="text-sm text-gray-300">
                      Start bullet points with strong action verbs
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column - Now only has ATS Score and Keyword Analysis */}
        <div className="w-1/2 p-6 space-y-6">
          {/* Live ATS Score */}
          <div className="bg-gray-800 rounded-lg p-6">
            <h2 className="text-xl font-semibold mb-6 text-center">
              🎯 Live ATS Score
            </h2>
            <div className="relative w-48 h-48 mx-auto mb-6">
              <svg className="w-full h-full transform -rotate-90">
                <circle
                  cx="96"
                  cy="96"
                  r="88"
                  stroke="rgb(55, 65, 81)"
                  strokeWidth="16"
                  fill="none"
                />
                <circle
                  cx="96"
                  cy="96"
                  r="88"
                  stroke="rgb(239, 68, 68)"
                  strokeWidth="16"
                  fill="none"
                  strokeDasharray={`${0 * 5.53} ${553}`}
                  className="transition-all duration-500"
                />
              </svg>
              <div className="absolute inset-0 flex items-center justify-center">
                <span className="text-5xl font-bold text-red-500">0%</span>
              </div>
            </div>
            
            <div className="text-center mb-6">
              <span className="inline-flex items-center px-3 py-1 rounded-full bg-red-500/20 text-red-500 text-sm">
                ⚠️ Needs Work
              </span>
            </div>

            <div className="space-y-4 mb-6">
              <h3 className="text-sm font-medium text-gray-400 uppercase tracking-wider">
                Score Breakdown
              </h3>
              {['Keywords', 'Formatting', 'Content', 'Impact'].map((item) => (
                <div key={item} className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-400">{item}</span>
                    <span>0%</span>
                  </div>
                  <div className="h-2 bg-gray-700 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-blue-500 transition-all duration-500"
                      style={{ width: '0%' }}
                    />
                  </div>
                </div>
              ))}
            </div>

            <button className="w-full bg-blue-600 hover:bg-blue-700 rounded-lg py-3 px-4 font-medium transition-colors flex items-center justify-center space-x-2">
              <span>👁️</span>
              <span>Preview Resume</span>
            </button>
          </div>

          {/* Keyword Analysis */}
          <div className="bg-gray-800 rounded-lg p-6">
            <h2 className="text-xl font-semibold mb-4 flex items-center">
              🔍 Keyword Analysis
            </h2>
            <div className="bg-gray-700 rounded-lg p-8 text-center">
              <p className="text-gray-400">
                Add your target role and skills to see keyword analysis
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// *** FIXED: Added default keyword ***
export default SmartATSRedesign;