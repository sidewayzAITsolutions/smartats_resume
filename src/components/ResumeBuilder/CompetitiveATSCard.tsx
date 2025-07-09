import React, { useState, useEffect } from 'react';
import { 
  MapPin, Lock, Brain, BarChart3, Lightbulb, Star, Search, Target, 
  CheckCircle, Plus, X, TrendingUp, Award, Users, ChevronRight, 
  RefreshCw, AlertCircle, Zap, Eye, Download
} from 'lucide-react';

const UltimateSmartATS = () => {
  const [activeTab, setActiveTab] = useState('personal');
  const [personalInfo, setPersonalInfo] = useState({
    fullName: '',
    professionalTitle: '',
    email: '',
    phone: '',
    location: '',
    linkedIn: ''
  });
  
  // Skills management
  const [selectedSkills, setSelectedSkills] = useState([
    'Leadership', 'Budget Planning', 'Inventory Control', 'Staff Management', 
    'Conflict Resolution', 'Team Leadership', 'Customer Service Excellence', 
    'Health Regulations', 'POS Systems', 'Food Safety Compliance'
  ]);
  const [customKeywords, setCustomKeywords] = useState(['Server']);
  const [targetJob, setTargetJob] = useState('General Manager of Restaurant');
  const [skillSearchTerm, setSkillSearchTerm] = useState('');
  
  // ATS Analysis
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [atsScore, setAtsScore] = useState(0);
  const [showDetails, setShowDetails] = useState(false);
  const [competitiveAnalysis, setCompetitiveAnalysis] = useState({
    score: 0,
    keywordMatches: 0,
    totalKeywords: 25,
    missingKeywords: ['Teamwork', 'Communication', 'Revenue Growth'],
    industryBenchmark: 75,
    competitiveRanking: 'Low' as 'Low' | 'Average' | 'Good' | 'Excellent'
  });

  // Skills database
  const skillsDatabase = {
    'Leadership & Management': [
      'Leadership', 'Team Leadership', 'Staff Management', 'Project Management',
      'Strategic Planning', 'Change Management', 'Performance Management', 
      'Conflict Resolution', 'Decision Making', 'Delegation', 'Mentoring',
      'Cross-functional Leadership', 'Agile Leadership', 'Remote Team Management'
    ],
    'Finance & Operations': [
      'Budget Planning', 'Financial Analysis', 'Cost Control', 'P&L Management',
      'Inventory Control', 'Supply Chain Management', 'Procurement', 'Vendor Management',
      'Risk Management', 'Operational Excellence', 'Process Improvement', 'Quality Control'
    ],
    'Customer Service': [
      'Customer Service Excellence', 'Client Relations', 'Customer Retention',
      'Customer Experience', 'Complaint Resolution', 'Customer Success',
      'Account Management', 'Relationship Building', 'Sales Support'
    ],
    'Food Service & Hospitality': [
      'Food Safety Compliance', 'Health Regulations', 'HACCP', 'ServSafe Certified',
      'Menu Planning', 'Kitchen Operations', 'Catering Management', 'Event Planning',
      'Wine Knowledge', 'Beverage Management', 'Restaurant Operations'
    ],
    'Technology & Systems': [
      'POS Systems', 'Restaurant Management Software', 'Inventory Management Systems',
      'CRM Software', 'Microsoft Office Suite', 'Data Analysis', 'Reporting',
      'Digital Marketing', 'Social Media Management', 'E-commerce'
    ]
  };

  const jobRoles = [
    'General Manager of Restaurant', 'Restaurant Manager', 'Operations Manager',
    'Food & Beverage Manager', 'Kitchen Manager', 'Assistant Manager',
    'Store Manager', 'Regional Manager', 'District Manager', 'Area Manager'
  ];

  // Calculate ATS score based on various factors
  useEffect(() => {
    const calculateScore = () => {
      let score = 0;
      
      // Keywords score (40%)
      const keywordScore = Math.min((selectedSkills.length / 15) * 40, 40);
      score += keywordScore;
      
      // Personal info completeness (20%)
      const filledFields = Object.values(personalInfo).filter(val => val).length;
      const infoScore = (filledFields / 6) * 20;
      score += infoScore;
      
      // Custom keywords (20%)
      const customScore = Math.min((customKeywords.length / 5) * 20, 20);
      score += customScore;
      
      // Format and impact (20%)
      score += 15; // Base formatting score
      
      setAtsScore(Math.round(score));
      
      // Update competitive analysis
      const matches = Math.min(selectedSkills.length, 20);
      setCompetitiveAnalysis(prev => ({
        ...prev,
        score: Math.round(score),
        keywordMatches: matches,
        competitiveRanking: score > 85 ? 'Excellent' : score > 70 ? 'Good' : score > 50 ? 'Average' : 'Low'
      }));
    };
    
    calculateScore();
  }, [selectedSkills, personalInfo, customKeywords]);

  // Filter skills for search
  const allSkills = Object.values(skillsDatabase).flat();
  const filteredSkills = allSkills.filter(skill => 
    skill.toLowerCase().includes(skillSearchTerm.toLowerCase()) &&
    !selectedSkills.includes(skill)
  );

  const addSkill = (skill: string) => {
    setSelectedSkills([...selectedSkills, skill]);
    setSkillSearchTerm('');
  };

  const removeSkill = (skillToRemove: string) => {
    setSelectedSkills(selectedSkills.filter(skill => skill !== skillToRemove));
  };

  const runQuickTest = async () => {
    setIsAnalyzing(true);
    await new Promise(resolve => setTimeout(resolve, 2000));
    setIsAnalyzing(false);
  };

  const suggestSkills = () => {
    const suggestions: Record<string, string[]> = {
      'General Manager of Restaurant': ['Staff Scheduling', 'Revenue Optimization', 'Customer Retention'],
      'Restaurant Manager': ['Table Management', 'Food Cost Control', 'Staff Training'],
      'Operations Manager': ['Process Optimization', 'KPI Management', 'Vendor Relations']
    };
    
    const jobSuggestions = suggestions[targetJob] || suggestions['General Manager of Restaurant'];
    const newSkills = jobSuggestions.filter(skill => !selectedSkills.includes(skill));
    setSelectedSkills([...selectedSkills, ...newSkills]);
  };

  const getScoreColor = (score: number) => {
    if (score >= 85) return 'text-green-500';
    if (score >= 70) return 'text-blue-500';
    if (score >= 50) return 'text-yellow-500';
    return 'text-red-500';
  };

  const getScoreLabel = (score: number) => {
    if (score >= 85) return { text: 'Excellent', color: 'bg-green-500/20 text-green-500' };
    if (score >= 70) return { text: 'Good', color: 'bg-blue-500/20 text-blue-500' };
    if (score >= 50) return { text: 'Average', color: 'bg-yellow-500/20 text-yellow-500' };
    return { text: 'Needs Work', color: 'bg-red-500/20 text-red-500' };
  };

  const scoreLabel = getScoreLabel(atsScore);

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
              <div className={`w-4 h-4 rounded-full ${atsScore > 50 ? 'bg-green-500' : 'bg-yellow-500'}`}></div>
              <span className="text-sm">{Math.round((Object.values(personalInfo).filter(v => v).length / 6) * 100)}% Complete</span>
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
        {/* Left Column - All components except ATS Score */}
        <div className="w-2/3 p-6 space-y-6 overflow-y-auto">
          {/* Personal Information */}
          <div className="bg-gray-800 rounded-lg p-6">
            <h2 className="text-xl font-semibold mb-4">Personal Information</h2>
            <div className="grid grid-cols-2 gap-4">
              <input
                type="text"
                placeholder="Full Name"
                value={personalInfo.fullName}
                onChange={(e) => setPersonalInfo({...personalInfo, fullName: e.target.value})}
                className="bg-gray-700 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <input
                type="text"
                placeholder="Professional Title"
                value={personalInfo.professionalTitle}
                onChange={(e) => setPersonalInfo({...personalInfo, professionalTitle: e.target.value})}
                className="bg-gray-700 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <input
                type="email"
                placeholder="Email Address"
                value={personalInfo.email}
                onChange={(e) => setPersonalInfo({...personalInfo, email: e.target.value})}
                className="bg-gray-700 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <input
                type="tel"
                placeholder="Phone Number"
                value={personalInfo.phone}
                onChange={(e) => setPersonalInfo({...personalInfo, phone: e.target.value})}
                className="bg-gray-700 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <div className="relative">
                <MapPin className="absolute left-3 top-3.5 w-5 h-5 text-gray-400" />
                <input
                  type="text"
                  placeholder="Location"
                  value={personalInfo.location}
                  onChange={(e) => setPersonalInfo({...personalInfo, location: e.target.value})}
                  className="bg-gray-700 rounded-lg pl-10 pr-4 py-3 w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <input
                type="text"
                placeholder="LinkedIn URL"
                value={personalInfo.linkedIn}
                onChange={(e) => setPersonalInfo({...personalInfo, linkedIn: e.target.value})}
                className="bg-gray-700 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>

          {/* Skills & Keywords Section */}
          <div className="bg-gray-800 rounded-lg p-6">
            <h3 className="text-xl font-bold mb-4 flex items-center">
              <Target className="mr-2 text-blue-400" /> Skills & Keywords
            </h3>
            
            {/* Target Job Role */}
            <div className="mb-6">
              <label className="block text-sm font-medium mb-2">Target Job Role</label>
              <select 
                value={targetJob}
                onChange={(e) => setTargetJob(e.target.value)}
                className="w-full bg-gray-700 border border-gray-600 rounded-lg px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                {jobRoles.map(role => (
                  <option key={role} value={role}>{role}</option>
                ))}
              </select>
              <p className="text-gray-400 text-sm mt-1">This helps optimize keywords for your target position</p>
            </div>

            {/* Skills Search and Add */}
            <div className="mb-6">
              <div className="flex gap-2 mb-4">
                <div className="relative flex-1">
                  <Search className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
                  <input
                    type="text"
                    placeholder="Search skills to add..."
                    value={skillSearchTerm}
                    onChange={(e) => setSkillSearchTerm(e.target.value)}
                    className="w-full bg-gray-700 border border-gray-600 rounded-lg pl-10 pr-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <button
                  onClick={suggestSkills}
                  className="bg-purple-600 hover:bg-purple-700 px-4 py-3 rounded-lg flex items-center gap-2 transition-colors"
                >
                  <Brain className="w-5 h-5" />
                  AI Suggest
                </button>
              </div>

              {/* Skills Suggestions Dropdown */}
              {skillSearchTerm && filteredSkills.length > 0 && (
                <div className="bg-gray-700 border border-gray-600 rounded-lg max-h-48 overflow-y-auto mb-4">
                  {Object.entries(skillsDatabase).map(([category, skills]) => {
                    const categorySkills = skills.filter(skill => 
                      skill.toLowerCase().includes(skillSearchTerm.toLowerCase()) &&
                      !selectedSkills.includes(skill)
                    );
                    
                    if (categorySkills.length === 0) return null;
                    
                    return (
                      <div key={category} className="p-2">
                        <div className="text-xs font-semibold text-gray-400 mb-1">{category}</div>
                        {categorySkills.map(skill => (
                          <button
                            key={skill}
                            onClick={() => addSkill(skill)}
                            className="block w-full text-left px-3 py-2 hover:bg-gray-600 rounded text-sm transition-colors"
                          >
                            {skill}
                          </button>
                        ))}
                      </div>
                    );
                  })}
                </div>
              )}
            </div>

            {/* Selected Skills */}
            <div className="mb-6">
              <label className="block text-sm font-medium mb-2">Selected Skills ({selectedSkills.length})</label>
              <div className="bg-gray-700 rounded-lg p-4 min-h-[120px]">
                <div className="flex flex-wrap gap-2">
                  {selectedSkills.map(skill => (
                    <span key={skill} className="bg-blue-600 text-white px-3 py-1 rounded-full text-sm flex items-center gap-2 hover:bg-blue-700 transition-colors">
                      {skill}
                      <button onClick={() => removeSkill(skill)} className="hover:bg-blue-800 rounded-full p-0.5">
                        <X className="w-3 h-3" />
                      </button>
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Custom Keywords */}
            <div className="mb-6">
              <label className="block text-sm font-medium mb-2">Custom Keywords (from job description)</label>
              <textarea
                value={customKeywords.join(', ')}
                onChange={(e) => setCustomKeywords(e.target.value.split(',').map(k => k.trim()).filter(k => k))}
                className="w-full bg-gray-700 border border-gray-600 rounded-lg px-4 py-3 text-white h-24 focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Add custom keywords from the job posting..."
              />
            </div>

            {/* Quick AI Test */}
            <button
              onClick={runQuickTest}
              disabled={isAnalyzing}
              className={`w-full py-4 rounded-lg border-2 border-purple-500 font-semibold flex items-center justify-center gap-2 transition-all ${
                isAnalyzing 
                  ? 'bg-purple-600 cursor-not-allowed' 
                  : 'bg-transparent hover:bg-purple-600 text-purple-400 hover:text-white'
              }`}
            >
              {isAnalyzing ? (
                <>
                  <RefreshCw className="w-5 h-5 animate-spin" />
                  Running Analysis...
                </>
              ) : (
                <>
                  <Zap className="w-5 h-5" />
                  Quick AI Test
                </>
              )}
            </button>
          </div>

          {/* Competitive Analysis */}
          <div className="bg-gray-800 rounded-lg p-6">
            <h2 className="text-xl font-semibold mb-4 flex items-center">
              <Award className="w-5 h-5 mr-2 text-blue-600" />
              ATS Competitive Analysis
            </h2>
            
            <div className="space-y-4">
              {/* Competitive Ranking */}
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <Users className="w-4 h-4 text-gray-500" />
                  <span className="text-sm text-gray-400">Market Position</span>
                </div>
                <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                  competitiveAnalysis.competitiveRanking === 'Excellent' ? 'bg-green-100 text-green-800' :
                  competitiveAnalysis.competitiveRanking === 'Good' ? 'bg-blue-100 text-blue-800' :
                  competitiveAnalysis.competitiveRanking === 'Average' ? 'bg-yellow-100 text-yellow-800' :
                  'bg-red-100 text-red-800'
                }`}>
                  {competitiveAnalysis.competitiveRanking}
                </span>
              </div>

              {/* Industry Benchmark */}
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <TrendingUp className="w-4 h-4 text-gray-500" />
                  <span className="text-sm text-gray-400">Industry Average</span>
                </div>
                <span className="text-sm font-medium">{competitiveAnalysis.industryBenchmark}/100</span>
              </div>

              {/* Performance Indicator */}
              <div className="bg-gray-700 rounded-lg p-3">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs font-medium text-gray-400">VS INDUSTRY AVERAGE</span>
                  <span className={`text-xs font-medium ${
                    atsScore > competitiveAnalysis.industryBenchmark ? 'text-green-500' : 'text-red-500'
                  }`}>
                    {atsScore > competitiveAnalysis.industryBenchmark ? '+' : ''}
                    {atsScore - competitiveAnalysis.industryBenchmark} points
                  </span>
                </div>
                <div className="w-full bg-gray-600 rounded-full h-2">
                  <div 
                    className={`h-2 rounded-full transition-all duration-500 ${
                      atsScore > competitiveAnalysis.industryBenchmark ? 'bg-green-500' : 'bg-red-500'
                    }`}
                    style={{ width: `${Math.min((atsScore / 100) * 100, 100)}%` }}
                  />
                </div>
              </div>

              {/* Unlock Premium */}
              <div className="bg-gradient-to-r from-purple-600 to-pink-600 rounded-lg p-4 text-center">
                <h3 className="text-sm font-semibold mb-1">Want Deeper Analysis?</h3>
                <p className="text-xs opacity-90 mb-3">
                  Compare your resume against industry leaders and top performers
                </p>
                <button className="bg-white/20 hover:bg-white/30 backdrop-blur rounded px-4 py-2 text-sm font-medium transition-colors">
                  ⭐ Unlock Full Analysis
                </button>
              </div>
            </div>
          </div>

          {/* Keyword Analysis */}
          <div className="bg-gray-800 rounded-lg p-6">
            <h3 className="text-xl font-bold mb-4 flex items-center">
              <Search className="mr-2 text-blue-400" /> Keyword Analysis
            </h3>
            
            <div className="mb-4">
              <h4 className="text-sm font-semibold text-green-400 mb-2">
                Matched Keywords ({Math.min(selectedSkills.length, 15)})
              </h4>
              <div className="flex flex-wrap gap-2">
                {selectedSkills.slice(0, 5).map(skill => (
                  <span key={skill} className="bg-green-600 text-white px-3 py-1 rounded text-sm">
                    {skill}
                  </span>
                ))}
                {selectedSkills.length > 5 && (
                  <span className="bg-gray-600 text-gray-300 px-3 py-1 rounded text-sm">
                    +{selectedSkills.length - 5} more
                  </span>
                )}
              </div>
            </div>

            {competitiveAnalysis.missingKeywords.length > 0 && (
              <div>
                <h4 className="text-sm font-semibold text-yellow-400 mb-2">
                  Missing Keywords ({competitiveAnalysis.missingKeywords.length})
                </h4>
                <div className="flex flex-wrap gap-2">
                  {competitiveAnalysis.missingKeywords.map(keyword => (
                    <span key={keyword} className="bg-gray-600 text-gray-300 px-3 py-1 rounded text-sm">
                      {keyword}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* AI Recommendations */}
          <div className="bg-gray-800 rounded-lg p-6">
            <h2 className="text-xl font-semibold mb-4 flex items-center">
              <Brain className="w-5 h-5 mr-2 text-purple-500" />
              AI Recommendations
            </h2>
            {selectedSkills.length > 5 ? (
              <div className="space-y-3">
                <div className="flex items-start space-x-2">
                  <CheckCircle className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                  <p className="text-sm">Great skill diversity! Consider adding industry-specific certifications.</p>
                </div>
                <div className="flex items-start space-x-2">
                  <CheckCircle className="w-4 h-4 text-blue-500 mt-0.5 flex-shrink-0" />
                  <p className="text-sm">Add quantified achievements to showcase your {targetJob} impact.</p>
                </div>
                <div className="flex items-start space-x-2">
                  <AlertCircle className="w-4 h-4 text-yellow-500 mt-0.5 flex-shrink-0" />
                  <p className="text-sm">Consider adding: {competitiveAnalysis.missingKeywords.join(', ')}</p>
                </div>
              </div>
            ) : (
              <div className="text-center py-8">
                <Brain className="w-16 h-16 mx-auto mb-4 text-gray-600" />
                <p className="text-gray-400">
                  Keep adding content to see personalized recommendations
                </p>
              </div>
            )}
            <div className="mt-4 text-sm text-gray-500 text-center">
              AI Usage Today: 0/3
            </div>
          </div>

          {/* Resume Analytics */}
          <div className="bg-gray-800 rounded-lg p-6">
            <h2 className="text-xl font-semibold mb-4 flex items-center">
              <BarChart3 className="w-5 h-5 mr-2 text-green-500" />
              Resume Analytics
            </h2>
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-gray-400">Completion</span>
                <span>{Math.round((Object.values(personalInfo).filter(v => v).length / 6) * 100)}%</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-400">Word Count</span>
                <span>{selectedSkills.length * 10 + 50}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-400">Skills Count</span>
                <span>{selectedSkills.length}</span>
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

          {/* Pro Tips */}
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

        {/* Right Column - Only ATS Score */}
        <div className="w-1/3 p-6">
          {/* Live ATS Score - Enhanced version */}
          <div className="bg-gray-800 rounded-lg p-6 sticky top-6">
            <h2 className="text-xl font-semibold mb-6 text-center flex items-center justify-center">
              🎯 Live ATS Score
            </h2>
            
            {/* Main Score Circle */}
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
                  stroke="currentColor"
                  strokeWidth="16"
                  fill="none"
                  strokeDasharray={`${2 * Math.PI * 88}`}
                  strokeDashoffset={`${2 * Math.PI * 88 * (1 - atsScore / 100)}`}
                  className={`${getScoreColor(atsScore)} transition-all duration-1000`}
                />
              </svg>
              <div className="absolute inset-0 flex items-center justify-center">
                <span className={`text-5xl font-bold ${getScoreColor(atsScore)}`}>
                  {atsScore}%
                </span>
              </div>
            </div>
            
            {/* Score Status */}
            <div className="text-center mb-6">
              <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm ${scoreLabel.color}`}>
                {atsScore >= 50 ? <CheckCircle className="w-4 h-4 mr-1" /> : <AlertCircle className="w-4 h-4 mr-1" />}
                {scoreLabel.text}
              </span>
            </div>

            {/* Score Breakdown */}
            <div className="space-y-4 mb-6">
              <h3 className="text-sm font-medium text-gray-400 uppercase tracking-wider">
                Score Breakdown
              </h3>
              
              <div className="space-y-3">
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-400">Keywords</span>
                    <span>{Math.min(Math.round((selectedSkills.length / 15) * 100), 100)}%</span>
                  </div>
                  <div className="h-2 bg-gray-700 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-blue-500 transition-all duration-500"
                      style={{ width: `${Math.min((selectedSkills.length / 15) * 100, 100)}%` }}
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-400">Formatting</span>
                    <span>90%</span>
                  </div>
                  <div className="h-2 bg-gray-700 rounded-full overflow-hidden">
                    <div className="h-full bg-green-500 transition-all duration-500" style={{ width: '90%' }} />
                  </div>
                </div>

                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-400">Content</span>
                    <span>{Math.round((Object.values(personalInfo).filter(v => v).length / 6) * 100)}%</span>
                  </div>
                  <div className="h-2 bg-gray-700 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-yellow-500 transition-all duration-500"
                      style={{ width: `${(Object.values(personalInfo).filter(v => v).length / 6) * 100}%` }}
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-400">Impact</span>
                    <span>75%</span>
                  </div>
                  <div className="h-2 bg-gray-700 rounded-full overflow-hidden">
                    <div className="h-full bg-purple-500 transition-all duration-500" style={{ width: '75%' }} />
                  </div>
                </div>
              </div>
            </div>

            {/* Keyword Match Stats */}
            <div className="bg-gray-700 rounded-lg p-3 mb-6">
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-medium text-gray-300">KEYWORD MATCH</span>
                <span className="text-xs font-medium text-blue-400">
                  {competitiveAnalysis.keywordMatches}/{competitiveAnalysis.totalKeywords}
                </span>
              </div>
              <div className="w-full bg-gray-600 rounded-full h-2">
                <div 
                  className="h-2 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 transition-all duration-500"
                  style={{ width: `${(competitiveAnalysis.keywordMatches / competitiveAnalysis.totalKeywords) * 100}%` }}
                />
              </div>
            </div>

            {/* Quick Actions */}
            <div className="space-y-3">
              <button className="w-full bg-blue-600 hover:bg-blue-700 rounded-lg py-3 px-4 font-medium transition-colors flex items-center justify-center space-x-2">
                <Eye className="w-5 h-5" />
                <span>Preview Resume</span>
              </button>
              
              <button 
                className="w-full bg-green-600 hover:bg-green-700 rounded-lg py-3 px-4 font-medium transition-colors flex items-center justify-center space-x-2"
                onClick={() => setShowDetails(!showDetails)}
              >
                <Download className="w-5 h-5" />
                <span>Download PDF</span>
              </button>
              
              <button 
                className="w-full border border-gray-600 hover:bg-gray-700 rounded-lg py-3 px-4 font-medium transition-colors flex items-center justify-center space-x-2"
                onClick={runQuickTest}
              >
                <RefreshCw className={`w-5 h-5 ${isAnalyzing ? 'animate-spin' : ''}`} />
                <span>Refresh Analysis</span>
              </button>
            </div>

            {/* Pro Features Teaser */}
            <div className="mt-6 pt-6 border-t border-gray-700">
              <div className="bg-gradient-to-r from-purple-900/50 to-pink-900/50 rounded-lg p-4 text-center">
                <h4 className="text-sm font-semibold mb-1">🚀 Boost Your Score</h4>
                <p className="text-xs text-gray-300 mb-3">
                  Get AI-powered optimization suggestions
                </p>
                <button className="text-xs text-purple-400 hover:text-purple-300 font-medium">
                  Upgrade to Pro →
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UltimateSmartATS;
