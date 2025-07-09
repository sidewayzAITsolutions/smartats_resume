/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";

import React, { useState, useEffect, useCallback, useRef } from 'react';
// Import for PDF generation
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import DebugSectionNavigation from '@/components/OAuthDebug';
import Navigation from '@/components/Navigation';
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';

import {
  FileText, Star, Shield, Zap, Filter, CheckCircle, Lock,
  TrendingUp, Award, Users, Clock, ArrowRight, X, Sparkles,
  BarChart, Target, Eye, Briefcase, Code, Heart, GraduationCap,
  Building, Palette, DollarSign, Globe, Microscope, Brain,
  Search, RefreshCw, Download, Save, Lightbulb, Loader,
  Plus, Crown, MapPin, ChevronRight, Rocket, AlertCircle,
  User, Menu, ChevronDown, Copy, Trash2, Move, Info,
  MessageSquare, BookOpen, Settings, BarChart3, Home, Upload, LogOut
} from 'lucide-react';
import OAuthDebug from '@/components/OAuthDebug';


interface UserData {
  isPremium: boolean;
  email?: string;
  name?: string;
}

// Enhanced Skills Database with more categories
const skillsDatabase = {
  'Leadership & Management': [
    'Leadership', 'Team Leadership', 'Staff Management', 'Project Management',
    'Strategic Planning', 'Change Management', 'Performance Management',
    'Conflict Resolution', 'Decision Making', 'Delegation', 'Mentoring',
    'Cross-functional Leadership', 'Agile Leadership', 'Remote Team Management',
    'Executive Leadership', 'People Development', 'Organizational Development'
  ],
  'Technical Skills': [
    'Python', 'JavaScript', 'React', 'Node.js', 'AWS', 'Docker', 'Kubernetes',
    'Machine Learning', 'Data Analysis', 'SQL', 'MongoDB', 'API Development',
    'TypeScript', 'Java', 'C++', 'Go', 'Rust', 'Swift', 'Kotlin',
    'TensorFlow', 'PyTorch', 'Git', 'CI/CD', 'Microservices', 'GraphQL'
  ],
  'Data & Analytics': [
    'Data Analysis', 'Data Visualization', 'Statistical Analysis', 'Business Intelligence',
    'Tableau', 'Power BI', 'Excel', 'R Programming', 'SAS', 'SPSS',
    'Big Data', 'Hadoop', 'Spark', 'Data Mining', 'Predictive Analytics',
    'A/B Testing', 'Google Analytics', 'Data Warehousing', 'ETL'
  ],
  'Design & Creative': [
    'UI/UX Design', 'Graphic Design', 'Adobe Creative Suite', 'Figma', 'Sketch',
    'Wireframing', 'Prototyping', 'User Research', 'Design Thinking',
    'Typography', 'Color Theory', 'Responsive Design', 'Motion Graphics',
    'Video Editing', 'Animation', '3D Modeling', 'Brand Identity'
  ],
  'Marketing & Sales': [
    'Digital Marketing', 'Content Marketing', 'SEO', 'SEM', 'Social Media Marketing',
    'Email Marketing', 'Marketing Automation', 'HubSpot', 'Salesforce',
    'Lead Generation', 'Brand Management', 'Public Relations', 'Copywriting',
    'Market Research', 'Campaign Management', 'Google Ads', 'Facebook Ads'
  ],
  'Communication': [
    'Communication', 'Public Speaking', 'Presentation Skills', 'Negotiation',
    'Written Communication', 'Interpersonal Skills', 'Active Listening',
    'Stakeholder Management', 'Client Relations', 'Cross-cultural Communication',
    'Storytelling', 'Persuasion', 'Emotional Intelligence', 'Networking'
  ],
  'Business & Finance': [
    'Financial Analysis', 'Budgeting', 'Forecasting', 'Financial Modeling',
    'Accounting', 'QuickBooks', 'SAP', 'Risk Management', 'Compliance',
    'Business Development', 'Strategic Partnerships', 'Mergers & Acquisitions',
    'Private Equity', 'Investment Banking', 'Portfolio Management'
  ],
  'Operations & Supply Chain': [
    'Operations Management', 'Supply Chain Management', 'Logistics', 'Procurement',
    'Inventory Management', 'Lean Six Sigma', 'Process Improvement',
    'Quality Control', 'Vendor Management', 'ERP Systems', 'Manufacturing',
    'Distribution', 'Warehouse Management', 'Cost Reduction'
  ],
  'Healthcare': [
    'Patient Care', 'Clinical Research', 'HIPAA Compliance', 'EMR/EHR',
    'Medical Terminology', 'Healthcare Administration', 'Nursing',
    'Pharmacy', 'Medical Coding', 'Telehealth', 'Public Health',
    'Healthcare Analytics', 'Clinical Trials', 'Medical Device'
  ],
  'Education & Training': [
    'Curriculum Development', 'Instructional Design', 'E-Learning',
    'Classroom Management', 'Student Assessment', 'Educational Technology',
    'Adult Learning', 'Training Facilitation', 'LMS Administration',
    'Special Education', 'Academic Advising', 'Research', 'Grant Writing'
  ]
};

// Industry-specific keywords
const industryKeywords = {
  'Technology': ['Agile', 'Scrum', 'DevOps', 'Cloud Computing', 'SaaS', 'API', 'Microservices', 'Scalability'],
  'Finance': ['Risk Assessment', 'Compliance', 'Portfolio Management', 'Financial Modeling', 'ROI', 'P&L'],
  'Healthcare': ['Patient Outcomes', 'Clinical Excellence', 'HIPAA', 'Quality Improvement', 'Patient Safety'],
  'Marketing': ['ROI', 'Conversion Rate', 'Brand Awareness', 'Customer Acquisition', 'Marketing Mix', 'KPIs'],
  'Sales': ['Revenue Growth', 'Pipeline Management', 'Customer Retention', 'Sales Cycle', 'Quota Achievement'],
  'Education': ['Student Success', 'Curriculum Standards', 'Assessment', 'Differentiated Instruction'],
  'Manufacturing': ['Lean Manufacturing', 'Quality Control', 'Supply Chain', 'Production Efficiency', 'Safety']
};

// Action verbs for achievements
const actionVerbs = {
  'Leadership': ['Led', 'Directed', 'Managed', 'Supervised', 'Coordinated', 'Orchestrated', 'Spearheaded'],
  'Achievement': ['Achieved', 'Exceeded', 'Surpassed', 'Delivered', 'Accomplished', 'Attained', 'Realized'],
  'Improvement': ['Improved', 'Enhanced', 'Optimized', 'Streamlined', 'Upgraded', 'Refined', 'Transformed'],
  'Creation': ['Developed', 'Created', 'Designed', 'Built', 'Established', 'Launched', 'Pioneered'],
  'Analysis': ['Analyzed', 'Evaluated', 'Assessed', 'Investigated', 'Examined', 'Researched', 'Studied'],
  'Growth': ['Increased', 'Expanded', 'Grew', 'Boosted', 'Amplified', 'Accelerated', 'Maximized']
};

// Utility function to generate unique IDs
const generateUniqueId = () => {
  return Date.now() + Math.random() * 1000000;
};

// Define a type for custom sections
interface CustomSection {
  id: number;
  title: string;
  content: string;
}

// Define the structure for your resume data
interface ResumeData {
  personalInfo: {
    name: string;
    email: string;
    phone: string;
    address: string;
  };
  experience: Array<{
    id: number;
    company: string;
    role: string;
    startDate: string;
    endDate: string;
    description: string;
  }>;
  education: Array<{
    id: number;
    school: string;
    degree: string;
    gradDate: string;
  }>;
  skills: string[];
}

// Initial empty state for the resume
const initialResumeData: ResumeData = {
  personalInfo: {
    name: '',
    email: '',
    phone: '',
    address: '',
  },
  experience: [
    { id: 1, company: '', role: '', startDate: '', endDate: '', description: '' },
  ],
  education: [{ id: 1, school: '', degree: '', gradDate: '' }],
  skills: [''],
};

// Define section names type
type SectionName = 'overview' | 'personal' | 'summary' | 'experience' | 'education' | 'skills' | 'additional';

// Premium Upgrade Banner Component
const PremiumUpgradeBanner = ({ feature }: { feature: string }) => (
  <div className="bg-gradient-to-r from-pink-600 via-pink-500 to-pink-600 rounded-xl p-6 text-white text-center shadow-2xl animate-pulse-slow">
    <div className="flex items-center justify-center gap-3 mb-3">
      <Crown className="w-8 h-8" />
      <h3 className="text-xl font-bold">Unlock {feature} with Premium!</h3>
      <Crown className="w-8 h-8" />
    </div>
    <p className="mb-4 text-pink-100">
      Join thousands of job seekers who've boosted their interview rates by 300%
    </p>
    <Link href="/pricing">
      <button className="px-6 py-3 bg-white text-pink-600 font-bold rounded-lg hover:bg-pink-50 transform hover:scale-105 transition-all cursor-pointer">
        Upgrade to Premium - Only $19.99/month
      </button>
    </Link>
    <p className="text-xs mt-2 text-pink-200">Limited time offer • Cancel anytime</p>
  </div>
);

// Section Navigation Component with Premium Badges
const SectionNav = ({ currentSection, setCurrentSection, userData }: { 
  currentSection: SectionName; 
  setCurrentSection: (section: SectionName) => void;
  userData: UserData | null;
}) => {
  const handleSectionClick = (sectionId: SectionName) => {
    console.log('Clicking section:', sectionId);
    setCurrentSection(sectionId);
  };
  
  return (
    <div className="bg-gray-900 border-b border-gray-800 sticky top-0 z-20">
      <div className="flex items-center gap-1 p-4 overflow-x-auto">
        {[
          { id: 'overview' as SectionName, label: 'Overview', icon: <Home className="w-4 h-4" />, isPremium: false },
          { id: 'personal' as SectionName, label: 'Personal', icon: <User className="w-4 h-4" />, isPremium: false },
          { id: 'summary' as SectionName, label: 'Summary', icon: <FileText className="w-4 h-4" />, isPremium: false },
          { id: 'experience' as SectionName, label: 'Experience', icon: <Briefcase className="w-4 h-4" />, isPremium: false },
          { id: 'education' as SectionName, label: 'Education', icon: <GraduationCap className="w-4 h-4" />, isPremium: false },
          { id: 'skills' as SectionName, label: 'Skills', icon: <Zap className="w-4 h-4" />, isPremium: true },
        ].map(section => (
          <button
            key={section.id}
            type="button"
            onClick={() => handleSectionClick(section.id)}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-all cursor-pointer relative ${
              currentSection === section.id
                ? 'bg-gradient-to-r from-teal-600 to-amber-600 text-white shadow-lg'
                : 'text-gray-400 hover:text-white hover:bg-gray-800'
            }`}
          >
            {section.icon}
            <span className="hidden sm:inline">{section.label}</span>
            {section.isPremium && !userData?.isPremium && (
              <Crown className="w-3 h-3 text-pink-400 absolute -top-1 -right-1" />
            )}
          </button>
        ))}
      </div>
    </div>
  );
};

// Overview Section Component
const OverviewSection = ({
    setCurrentSection,
    calculateCompletion,
    resumeData,
    targetRole,
    industryFocus,
    lastSaved,
    setShowPreview,
    setShowLoadDialog,
    setShowSaveDialog,
    saveStatus,
    dragOver,
    handleDragOver,
    handleDragLeave,
    handleDrop,
    fileInputRef,
    handleFileUpload,
    uploadedFile,
    setUploadedFile,
    userData
  }: any) => (
    <div className="space-y-6">
      {/* Welcome Card */}
      <div className="bg-gradient-to-br from-teal-900/50 to-amber-900/50 rounded-2xl p-8 border border-teal-700/50">
        <div className="flex items-start justify-between">
          <div>
            <h2 className="text-3xl font-bold text-white mb-2">
              Welcome to SmartATS Builder! 🚀
            </h2>
            <p className="text-gray-300 text-lg mb-6">
              Let's create a resume that beats the ATS and lands you interviews.
            </p>

            {/* Quick Start */}
            <div className="flex flex-wrap gap-4">
              <button
                onClick={() => setCurrentSection('personal')}
                className="px-6 py-3 bg-white/10 backdrop-blur rounded-xl text-white font-medium hover:bg-white/20 transition-colors flex items-center gap-2 cursor-pointer"
              >
                <User className="w-5 h-5" />
                Start Building
              </button>
              {userData?.isPremium ? (
                <button
                  onClick={() => {
                    const linkedinAuthUrl = `https://www.linkedin.com/oauth/v2/authorization?response_type=code&client_id=YOUR_CLIENT_ID&redirect_uri=${encodeURIComponent(window.location.origin + '/auth/linkedin')}&scope=r_liteprofile%20r_emailaddress`;
                    window.open(linkedinAuthUrl, '_blank', 'width=600,height=600');
                  }}
                  className="px-6 py-3 bg-blue-600 hover:bg-blue-700 rounded-xl text-white font-medium transition-colors flex items-center gap-2 cursor-pointer"
                >
                  <Globe className="w-5 h-5" />
                  Import from LinkedIn
                </button>
              ) : (
                <button
                  className="px-6 py-3 bg-pink-600 hover:bg-pink-700 rounded-xl text-white font-medium transition-colors flex items-center gap-2 cursor-pointer relative overflow-hidden group"
                >
                  <Lock className="w-5 h-5" />
                  Import from LinkedIn
                  <Crown className="w-4 h-4" />
                  <span className="absolute inset-0 bg-pink-700 opacity-0 group-hover:opacity-20 transition-opacity"></span>
                </button>
              )}
            </div>
          </div>

          <div className="hidden lg:block">
            <div className="relative">
              <div className="w-32 h-32 bg-gradient-to-br from-teal-500 to-amber-500 rounded-full opacity-20 animate-pulse"></div>
              <Rocket className="w-16 h-16 text-white absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2" />
            </div>
          </div>
        </div>
      </div>

      {/* Premium Features Banner for Non-Premium Users */}
      {!userData?.isPremium && (
        <PremiumUpgradeBanner feature="All Premium Features" />
      )}

      {/* Progress Overview */}
      <div className="grid md:grid-cols-3 gap-6">
        {/* Completion Card */}
        <div className="bg-gray-800 rounded-xl p-6 border border-gray-700">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-white">Resume Completion</h3>
            <Target className="w-5 h-5 text-teal-400" />
          </div>
          <div className="relative h-32 flex items-center justify-center">
            <svg className="w-32 h-32 transform -rotate-90">
              <circle
                cx="64"
                cy="64"
                r="56"
                stroke="rgb(55, 65, 81)"
                strokeWidth="12"
                fill="none"
              />
              <circle
                cx="64"
                cy="64"
                r="56"
                stroke="url(#gradient)"
                strokeWidth="12"
                fill="none"
                strokeDasharray={`${2 * Math.PI * 56}`}
                strokeDashoffset={`${2 * Math.PI * 56 * (1 - calculateCompletion() / 100)}`}
                className="transition-all duration-1000"
              />
              <defs>
                <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="#14b8a6" />
                  <stop offset="100%" stopColor="#f59e0b" />
                </linearGradient>
              </defs>
            </svg>
            <div className="absolute text-3xl font-bold text-white">
              {calculateCompletion()}%
            </div>
          </div>
          <p className="text-center text-gray-400 mt-4">
            {calculateCompletion() < 50 ? 'Keep going!' : calculateCompletion() < 80 ? 'Almost there!' : 'Looking great!'}
          </p>
        </div>

        {/* Keywords Card */}
        <div className="bg-gray-800 rounded-xl p-6 border border-gray-700">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-white">Keywords</h3>
            <Search className="w-5 h-5 text-teal-400" />
          </div>
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-gray-400">Skills Added</span>
              <span className="text-2xl font-bold text-teal-400">{resumeData.skills.length}</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-gray-400">Target Role</span>
              <span className="text-sm font-medium text-gray-300">
                {targetRole || 'Not set'}
              </span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-gray-400">Industry</span>
              <span className="text-sm font-medium text-gray-300">
                {industryFocus || 'Not set'}
              </span>
            </div>
          </div>
          <button
            onClick={() => setCurrentSection('skills')}
            className="w-full mt-4 py-2 bg-teal-600 hover:bg-teal-700 rounded-lg text-sm font-medium transition-colors cursor-pointer"
          >
            Manage Keywords
          </button>
        </div>

        {/* Quick Actions Card */}
        <div className="bg-gray-800 rounded-xl p-6 border border-gray-700">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-white">Quick Actions</h3>
            <Zap className="w-5 h-5 text-amber-400" />
          </div>

          {/* Last Saved Indicator */}
          {lastSaved && (
            <div className="mb-4 p-2 bg-gray-700 rounded-lg">
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4 text-gray-400" />
                <span className="text-xs text-gray-400">
                  Last saved: {new Date(lastSaved).toLocaleString()}
                </span>
              </div>
            </div>
          )}

          <div className="space-y-3">
            <button
              onClick={() => setShowPreview(true)}
              className="w-full py-2 bg-gray-700 hover:bg-gray-600 rounded-lg text-sm font-medium text-gray-300 transition-colors flex items-center justify-center gap-2 cursor-pointer"
            >
              <Eye className="w-4 h-4" />
              Preview Resume
            </button>
            <button
              onClick={() => setShowLoadDialog(true)}
              className="w-full py-2 bg-gray-700 hover:bg-gray-600 rounded-lg text-sm font-medium text-gray-300 transition-colors flex items-center justify-center gap-2 cursor-pointer"
            >
              <Download className="w-4 h-4" />
              Load Resume
            </button>
            {userData?.isPremium ? (
              <button
                onClick={() => setShowSaveDialog(true)}
                disabled={saveStatus === 'saving'}
                className="w-full py-2 bg-gradient-to-r from-teal-600 to-amber-600 text-white rounded-lg text-sm font-medium hover:shadow-lg transition-all flex items-center justify-center gap-2 disabled:opacity-50 cursor-pointer"
              >
                {saveStatus === 'saving' ? (
                  <Loader className="w-4 h-4 animate-spin" />
                ) : (
                  <Save className="w-4 h-4" />
                )}
                {saveStatus === 'saving' ? 'Saving...' : 'Save Progress'}
              </button>
            ) : (
              <Link href="/pricing">
                <button className="w-full py-2 bg-gradient-to-r from-pink-600 to-pink-500 text-white rounded-lg text-sm font-medium hover:shadow-lg transition-all flex items-center justify-center gap-2 cursor-pointer relative overflow-hidden group">
                  <Lock className="w-4 h-4" />
                  Save Progress
                  <Crown className="w-4 h-4" />
                  <span className="absolute inset-0 bg-pink-700 opacity-0 group-hover:opacity-20 transition-opacity"></span>
                </button>
              </Link>
            )}
          </div>
        </div>
      </div>

      {/* Quick Upload Section */}
      <div className="bg-gradient-to-br from-green-900/30 to-teal-900/30 rounded-xl p-6 border border-green-700/50">
        <div className="flex items-start gap-4">
          <div className="p-3 bg-green-900/50 rounded-xl">
            <Upload className="w-6 h-6 text-green-400" />
          </div>
          <div className="flex-1">
            <h3 className="text-lg font-semibold text-white mb-2">Quick Start: Upload Your Resume</h3>
            <p className="text-gray-300 mb-4">
              Already have a resume? Upload it and we'll extract all your information automatically!
            </p>

            {/* Drag and Drop Area */}
            <div
              className={`border-2 border-dashed rounded-xl p-8 text-center transition-all duration-300 cursor-pointer ${
                dragOver
                  ? 'border-green-400 bg-green-900/20 scale-105'
                  : 'border-gray-600 hover:border-green-500 hover:bg-green-900/10'
              }`}
              onDragOver={handleDragOver}
              onDragLeave={handleDragLeave}
              onDrop={handleDrop}
              onClick={() => fileInputRef.current?.click()}
            >
              <input
                ref={fileInputRef}
                type="file"
                accept=".pdf,.doc,.docx"
                onChange={(e) => handleFileUpload(e.target.files?.[0] || null)}
                className="hidden"
              />

              {uploadedFile ? (
                <div className="space-y-2">
                  <CheckCircle className="w-12 h-12 text-green-400 mx-auto" />
                  <p className="text-green-400 font-medium">{uploadedFile.name}</p>
                  <p className="text-gray-400 text-sm">File uploaded successfully!</p>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      setUploadedFile(null);
                    }}
                    className="text-gray-400 hover:text-white text-sm underline cursor-pointer"
                  >
                    Upload different file
                  </button>
                </div>
              ) : (
                <div className="space-y-2">
                  {dragOver ? (
                    <>
                      <Download className="w-12 h-12 text-green-400 mx-auto animate-bounce" />
                      <p className="text-green-400 font-medium">Drop your resume here!</p>
                    </>
                  ) : (
                    <>
                      <FileText className="w-12 h-12 text-gray-400 mx-auto" />
                      <p className="text-gray-300 font-medium">Drag & drop your resume here</p>
                      <p className="text-gray-400 text-sm">or click to browse files</p>
                      <p className="text-gray-500 text-xs">Supports PDF, DOC, DOCX • Max 10MB</p>
                    </>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Tips & Suggestions */}
      <div className="bg-gradient-to-br from-teal-900/30 to-pink-900/30 rounded-xl p-6 border border-teal-700/50">
        <div className="flex items-start gap-4">
          <div className="p-3 bg-teal-900/50 rounded-xl">
            <Lightbulb className="w-6 h-6 text-amber-400" />
          </div>
          <div className="flex-1">
            <h3 className="text-lg font-semibold text-white mb-2">Pro Tips for ATS Success</h3>
            <ul className="space-y-2 text-gray-300">
              <li className="flex items-start gap-2">
                <CheckCircle className="w-4 h-4 text-green-400 mt-0.5 flex-shrink-0" />
                <span>Use standard section headings like "Experience" and "Education"</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle className="w-4 h-4 text-green-400 mt-0.5 flex-shrink-0" />
                <span>Include keywords from the job description naturally throughout</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle className="w-4 h-4 text-green-400 mt-0.5 flex-shrink-0" />
                <span>Start bullet points with action verbs and include metrics</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );

// Personal Section Component
const PersonalSection = ({
    resumeData,
    updateResumeData,
    targetRole,
    setTargetRole,
    industryFocus,
    setIndustryFocus,
    dragOver,
    handleDragOver,
    handleDragLeave,
    handleDrop,
    fileInputRef,
    handleFileUpload,
    uploadedFile
  }: any) => (
    <div className="space-y-6" data-section="personal">
      <div className="bg-gray-800 rounded-xl p-6 border border-gray-700">
        <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
          <User className="w-6 h-6 text-teal-400" />
          Personal Information
        </h2>

        <div className="grid md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Full Name *
            </label>
              <input
                type="text"
                value={resumeData.personal.fullName}
                onChange={(e) => updateResumeData('personal', (prevPersonal: any) => ({
                  ...prevPersonal,
                  fullName: e.target.value
                }))}
                className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-teal-500 transition-colors cursor-text"
                placeholder="John Doe"
              />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Professional Title
            </label>
            <input
              type="text"
              value={resumeData.personal.title}
              onChange={(e) => updateResumeData('personal', (prevPersonal: any) => ({
                ...prevPersonal,
                title: e.target.value
              }))}
              className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-teal-500 transition-colors cursor-text"
              placeholder="Senior Software Engineer"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Email Address *
            </label>
            <input
              type="email"
              value={resumeData.personal.email}
              onChange={(e) => updateResumeData('personal', (prevPersonal: any) => ({
                ...prevPersonal,
                email: e.target.value
              }))}
              className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-teal-500 transition-colors cursor-text"
              placeholder="john.doe@email.com"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Phone Number *
            </label>
            <input
              type="tel"
              value={resumeData.personal.phone}
              onChange={(e) => updateResumeData('personal', (prevPersonal: any) => ({
                ...prevPersonal,
                phone: e.target.value
              }))}
              className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-teal-500 transition-colors cursor-text"
              placeholder="(555) 123-4567"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Location
            </label>
            <div className="relative">
              <MapPin className="absolute left-3 top-3.5 w-5 h-5 text-gray-400" />
              <input
                type="text"
                value={resumeData.personal.location}
                onChange={(e) => updateResumeData('personal', (prevPersonal: any) => ({
                  ...prevPersonal,
                  location: e.target.value
                }))}
                className="w-full pl-10 pr-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-teal-500 transition-colors cursor-text"
                placeholder="New York, NY"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              LinkedIn URL
            </label>
            <input
              type="url"
              value={resumeData.personal.linkedin}
              onChange={(e) => updateResumeData('personal', (prevPersonal: any) => ({
                ...prevPersonal,
                linkedin: e.target.value
              }))}
              className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-teal-500 transition-colors cursor-text"
              placeholder="linkedin.com/in/johndoe"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Portfolio/Website
            </label>
            <input
              type="url"
              value={resumeData.personal.portfolio}
              onChange={(e) => updateResumeData('personal', (prevPersonal: any) => ({
                ...prevPersonal,
                portfolio: e.target.value
              }))}
              className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-teal-500 transition-colors cursor-text"
              placeholder="johndoe.com"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              GitHub
            </label>
            <input
              type="url"
              value={resumeData.personal.github}
              onChange={(e) => updateResumeData('personal', (prevPersonal: any) => ({
                ...prevPersonal,
                github: e.target.value
              }))}
              className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-teal-500 transition-colors cursor-text"
              placeholder="github.com/johndoe"
            />
          </div>
        </div>
      </div>

      {/* Target Role & Industry */}
      <div className="bg-gray-800 rounded-xl p-6 border border-gray-700">
        <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
          <Target className="w-5 h-5 text-amber-400" />
          Target Position & Industry
        </h3>

        <div className="grid md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Target Job Role
            </label>
            <input
              type="text"
              value={targetRole}
              onChange={(e) => setTargetRole(e.target.value)}
              className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-teal-500 transition-colors cursor-text"
              placeholder="e.g., Product Manager, Software Engineer"
            />
          </div>

          <div>
            <label htmlFor="industry-focus" className="block text-sm font-medium text-gray-300 mb-2">
              Industry Focus
            </label>
            <select
              id="industry-focus"
              value={industryFocus}
              onChange={(e) => setIndustryFocus(e.target.value)}
              className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:border-teal-500 transition-colors cursor-pointer"
            >
              <option value="">Select Industry</option>
              <option value="Technology">Technology</option>
              <option value="Finance">Finance</option>
              <option value="Healthcare">Healthcare</option>
              <option value="Marketing">Marketing</option>
              <option value="Sales">Sales</option>
              <option value="Education">Education</option>
              <option value="Manufacturing">Manufacturing</option>
            </select>
          </div>
        </div>

        <p className="text-sm text-gray-400 mt-4">
          💡 Tip: Setting your target role and industry helps us optimize your resume with the right keywords
        </p>
      </div>

      {/* Resume Import Section */}
      <div className="bg-gray-800 rounded-xl p-6 border border-gray-700">
        <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
          <Download className="w-5 h-5 text-green-400" />
          Import Existing Resume
        </h3>

        <div className="grid md:grid-cols-2 gap-4">
          {/* File Upload */}
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Upload Resume File
            </label>
            <div
              className={`border-2 border-dashed rounded-lg p-6 text-center transition-all duration-300 cursor-pointer ${
                dragOver
                  ? 'border-teal-400 bg-teal-900/20 scale-102'
                  : 'border-gray-600 hover:border-teal-500 hover:bg-teal-900/10'
              }`}
              onDragOver={handleDragOver}
              onDragLeave={handleDragLeave}
              onDrop={handleDrop}
              onClick={() => fileInputRef.current?.click()}
            >
              <input
                type="file"
                accept=".pdf,.doc,.docx"
                onChange={(e) => handleFileUpload(e.target.files?.[0] || null)}
                className="hidden"
                id="resume-upload-personal"
              />

              {uploadedFile ? (
                <div className="space-y-2">
                  <CheckCircle className="w-8 h-8 text-green-400 mx-auto" />
                  <p className="text-green-400 font-medium text-sm">{uploadedFile.name}</p>
                  <p className="text-gray-400 text-xs">Ready to extract data</p>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      fileInputRef.current!.value = '';
                    }}
                    className="text-teal-400 hover:text-teal-300 text-xs underline cursor-pointer"
                  >
                    Change file
                  </button>
                </div>
              ) : (
                <>
                  {dragOver ? (
                    <>
                      <Download className="w-8 h-8 text-teal-400 mx-auto mb-2 animate-bounce" />
                      <p className="text-teal-400 text-sm font-medium">Drop it here!</p>
                    </>
                  ) : (
                    <>
                      <FileText className="w-8 h-8 text-gray-400 mx-auto mb-2" />
                      <p className="text-gray-400 text-sm">Click to upload or drag & drop</p>
                      <p className="text-gray-500 text-xs mt-1">PDF, DOC, DOCX • Max 10MB</p>
                    </>
                  )}
                </>
              )}
            </div>
          </div>

          {/* Quick Import Options */}
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Quick Import
            </label>
            <div className="space-y-3">
              <button
                onClick={() => {
                  const linkedinAuthUrl = `https://www.linkedin.com/oauth/v2/authorization?response_type=code&client_id=YOUR_CLIENT_ID&redirect_uri=${encodeURIComponent(window.location.origin + '/auth/linkedin')}&scope=r_liteprofile%20r_emailaddress`;
                  window.open(linkedinAuthUrl, '_blank', 'width=600,height=600');
                }}
                className="w-full py-3 px-4 bg-blue-600 hover:bg-blue-700 rounded-lg text-white font-medium transition-colors flex items-center justify-center gap-2 cursor-pointer"
              >
                <Globe className="w-4 h-4" />
                Connect LinkedIn Profile
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

// Summary Section Component
const SummarySection = ({ resumeData, updateResumeData, generateAISummary, loadingStates, aiSuggestions, userData }: any) => (
    <div className="space-y-6">
      <div className="bg-gray-800 rounded-xl p-6 border border-gray-700">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-white flex items-center gap-3">
            <FileText className="w-6 h-6 text-teal-400" />
            Professional Summary
          </h2>
          {userData?.isPremium ? (
            <button
              onClick={generateAISummary}
              disabled={loadingStates.summary}
              className="px-4 py-2 bg-gradient-to-r from-teal-600 to-amber-600 text-white rounded-lg font-medium hover:shadow-lg transition-all flex items-center gap-2 disabled:opacity-50 cursor-pointer"
            >
              {loadingStates.summary ? (
                <Loader className="w-4 h-4 animate-spin" />
              ) : (
                <Brain className="w-4 h-4" />
              )}
              AI Generate
            </button>
          ) : (
            <Link href="/pricing">
              <button className="px-4 py-2 bg-gradient-to-r from-pink-600 to-pink-500 text-white rounded-lg font-medium hover:shadow-lg transition-all flex items-center gap-2 cursor-pointer relative overflow-hidden group">
                <Brain className="w-4 h-4" />
                AI Generate
                <Crown className="w-4 h-4" />
                <span className="absolute inset-0 bg-pink-700 opacity-0 group-hover:opacity-20 transition-opacity"></span>
              </button>
            </Link>
          )}
        </div>

        <textarea
          value={resumeData.summary}
          onChange={(e) => updateResumeData('summary', () => e.target.value)}
          rows={6}
          className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-teal-500 transition-colors resize-none cursor-text"
          placeholder="Write a compelling professional summary that highlights your key strengths, experience, and what you bring to the role..."
        />

        <div className="flex items-center justify-between mt-4">
          <p className="text-sm text-gray-400">
            {resumeData.summary.length} / 500 characters
          </p>
          <p className="text-sm text-gray-400">
            💡 Keep it concise: 3-4 sentences
          </p>
        </div>

        {/* AI Suggestions */}
        {userData?.isPremium && aiSuggestions.summary.length > 0 && (
          <div className="mt-6 space-y-3">
            <h4 className="text-sm font-medium text-gray-300">AI Suggestions:</h4>
            {aiSuggestions.summary.map((suggestion: string, index: number) => (
              <div
                key={index}
                className="p-4 bg-gray-700 rounded-lg cursor-pointer hover:bg-gray-600 transition-colors group"
                onClick={() => updateResumeData('summary', () => suggestion)}
              >
                <p className="text-gray-300 text-sm">{suggestion}</p>
                <p className="text-xs text-teal-400 mt-2 opacity-0 group-hover:opacity-100 transition-opacity">
                  Click to use this suggestion
                </p>
              </div>
            ))}
          </div>
        )}

        {/* Premium Banner for Non-Premium Users */}
        {!userData?.isPremium && (
          <div className="mt-6">
            <PremiumUpgradeBanner feature="AI-Powered Summary Generation" />
          </div>
        )}
      </div>

      {/* Writing Tips */}
      <div className="bg-gradient-to-br from-teal-900/30 to-amber-900/30 rounded-xl p-6 border border-teal-700/50">
        <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
          <Lightbulb className="w-5 h-5 text-amber-400" />
          Summary Writing Tips
        </h3>
        <div className="grid md:grid-cols-2 gap-4 text-sm text-gray-300">
          <div className="space-y-2">
            <p className="flex items-start gap-2">
              <CheckCircle className="w-4 h-4 text-green-400 mt-0.5 flex-shrink-0" />
              Start with your professional title and years of experience
            </p>
            <p className="flex items-start gap-2">
              <CheckCircle className="w-4 h-4 text-green-400 mt-0.5 flex-shrink-0" />
              Mention 2-3 key skills or areas of expertise
            </p>
          </div>
          <div className="space-y-2">
            <p className="flex items-start gap-2">
              <CheckCircle className="w-4 h-4 text-green-400 mt-0.5 flex-shrink-0" />
              Include a notable achievement or unique value proposition
            </p>
            <p className="flex items-start gap-2">
              <CheckCircle className="w-4 h-4 text-green-400 mt-0.5 flex-shrink-0" />
              End with what you're looking for in your next role
            </p>
          </div>
        </div>
      </div>
    </div>
  );

// Experience Section Component
const ExperienceSection = ({ resumeData, updateResumeData, generateAIAchievements, loadingStates, userData }: any) => (
    <div className="space-y-6">
      {resumeData.experience.map((exp: any, index: number) => (
        <div key={exp.id} className="bg-gray-800 rounded-xl p-6 border border-gray-700">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-semibold text-white">
              Experience #{index + 1}
            </h3>
            <div className="flex items-center gap-2">
              {resumeData.experience.length > 1 && (
                <button
                  onClick={() => {
                    const updated = resumeData.experience.filter((e: any) => e.id !== exp.id);
                    updateResumeData('experience',  () => updated);
                  }}
                  className="p-2 text-red-400 hover:bg-red-900/20 rounded-lg transition-colors cursor-pointer"
                  title="Delete Experience"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              )}
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-4 mb-4">
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Company Name *
              </label>
              <input
                type="text"
                value={exp.company}
                onChange={(e) => {
                  const updated = [...resumeData.experience];
                  updated[index] = { ...exp, company: e.target.value };
                  updateResumeData('experience', () => updated);
                }}
                className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-teal-500 transition-colors cursor-text"
                placeholder="Company Name"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Position Title *
              </label>
              <input
                type="text"
                value={exp.position}
                onChange={(e) => {
                  const updated = [...resumeData.experience];
                  updated[index] = { ...exp, position: e.target.value };
                  updateResumeData('experience', () => updated);
                }}
                className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-teal-500 transition-colors cursor-text"
                placeholder="Job Title"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Start Date
              </label>
              <input
                type="text"
                value={exp.startDate}
                onChange={(e) => {
                  const updated = [...resumeData.experience];
                  updated[index] = { ...exp, startDate: e.target.value };
                  updateResumeData('experience', () => updated);
                }}
                className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-teal-500 transition-colors cursor-text"
                placeholder="Jan 2020"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                End Date
              </label>
              <div className="flex items-center gap-3">
                <input
                  type="text"
                  value={exp.current ? 'Present' : exp.endDate}
                  onChange={(e) => {
                    const updated = [...resumeData.experience];
                    updated[index] = { ...exp, endDate: e.target.value, current: false };
                    updateResumeData('experience', () => updated);
                  }}
                  disabled={exp.current}
                  className="flex-1 px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-teal-500 transition-colors disabled:opacity-50 cursor-text"
                  placeholder="Dec 2023"
                />
                <label htmlFor={`current-experience-${index}`} className="flex items-center gap-2 text-sm text-gray-300 cursor-pointer">
                  <input
                    type="checkbox"
                    id={`current-experience-${index}`}
                    checked={exp.current}
                    onChange={(e) => {
                      const updated = [...resumeData.experience];
                      updated[index] = { ...exp, current: e.target.checked };
                      updateResumeData('experience', () => updated);
                    }}
                    className="w-4 h-4 rounded border-gray-600 text-teal-600 focus:ring-teal-500"
                  />
                  Current
                </label>
              </div>
            </div>
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Location
            </label>
            <input
              type="text"
              value={exp.location}
              onChange={(e) => {
                const updated = [...resumeData.experience];
                updated[index] = { ...exp, location: e.target.value };
                updateResumeData('experience', () => updated);
              }}
              className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-teal-500 transition-colors cursor-text"
              placeholder="New York, NY"
            />
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Job Description
            </label>
            <textarea
              value={exp.description}
              onChange={(e) => {
                const updated = [...resumeData.experience];
                updated[index] = { ...exp, description: e.target.value };
                updateResumeData('experience', () => updated);
              }}
              rows={3}
              className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-teal-500 transition-colors resize-none cursor-text"
              placeholder="Briefly describe your role and responsibilities..."
            />
          </div>

          <div>
            <div className="flex items-center justify-between mb-3">
              <label className="block text-sm font-medium text-gray-300">
                Key Achievements
              </label>
              {userData?.isPremium ? (
                <button
                  onClick={() => generateAIAchievements(exp.id)}
                  disabled={loadingStates.achievements[exp.id]}
                  className="px-3 py-1 bg-teal-600 text-white rounded-lg text-sm font-medium hover:bg-teal-700 transition-colors flex items-center gap-2 disabled:opacity-50 cursor-pointer"
                >
                  {loadingStates.achievements[exp.id] ? (
                    <Loader className="w-3 h-3 animate-spin" />
                  ) : (
                    <Sparkles className="w-3 h-3" />
                  )}
                  AI Generate
                </button>
              ) : (
                <Link href="/pricing">
                  <button className="px-3 py-1 bg-gradient-to-r from-pink-600 to-pink-500 text-white rounded-lg text-sm font-medium hover:shadow-lg transition-colors flex items-center gap-2 cursor-pointer relative overflow-hidden group">
                    <Sparkles className="w-3 h-3" />
                    AI Generate
                    <Crown className="w-3 h-3" />
                    <span className="absolute inset-0 bg-pink-700 opacity-0 group-hover:opacity-20 transition-opacity"></span>
                  </button>
                </Link>
              )}
            </div>

            {exp.achievements.map((achievement: string, achIndex: number) => (
              <div key={achIndex} className="flex items-start gap-2 mb-2">
                <span className="text-gray-400 mt-3">•</span>
                <textarea
                  value={achievement}
                  onChange={(e) => updateResumeData('experience', (prevExperience: any) => {
                    const updated = [...prevExperience];
                    updated[index].achievements[achIndex] = e.target.value;
                    return updated;
                  })}
                  rows={2}
                  className="flex-1 px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-teal-500 transition-colors resize-none text-sm cursor-text"
                  placeholder="Start with an action verb and include metrics..."
                />
                <button
                  onClick={() => {
                    const updated = [...resumeData.experience];
                    updated[index].achievements = exp.achievements.filter((_: any, i: number) => i !== achIndex);
                    updateResumeData('experience', () => updated);
                  }}
                  className="p-1 text-red-400 hover:bg-red-900/20 rounded transition-colors cursor-pointer"
                  title="Remove Achievement"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            ))}

            <button
                onClick={() => updateResumeData('experience', (prevExperience: any) => {
                  const updated = [...prevExperience];
                  updated[index].achievements.push('');
                  return updated;
                })}
              className="mt-2 px-4 py-2 bg-gray-700 hover:bg-gray-600 rounded-lg text-sm font-medium text-gray-300 transition-colors flex items-center gap-2 cursor-pointer"
            >
              <Plus className="w-4 h-4" />
              Add Achievement
            </button>
          </div>

          {/* Premium Banner for Non-Premium Users */}
          {!userData?.isPremium && (
            <div className="mt-6">
              <PremiumUpgradeBanner feature="AI-Generated Achievements" />
            </div>
          )}
        </div>
      ))}

      <button
        onClick={() => {
          const newExp = {
            id: generateUniqueId(),
            company: '',
            position: '',
            startDate: '',
            endDate: '',
            current: false,
            location: '',
            description: '',
            achievements: ['']
          };
          updateResumeData('experience', (prev: any) => [...prev, newExp]);
        }}
        className="w-full py-3 bg-gradient-to-r from-teal-600 to-amber-600 text-white rounded-xl font-medium hover:shadow-lg transition-all flex items-center justify-center gap-2 cursor-pointer"
      >
        <Plus className="w-5 h-5" />
        Add Experience
      </button>

      {/* Action Verbs Helper */}
      <div className="bg-gradient-to-br from-amber-900/30 to-orange-900/30 rounded-xl p-6 border border-amber-700/50">
        <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
          <Zap className="w-5 h-5 text-amber-400" />
          Power Words for Achievements
        </h3>
        <div className="grid md:grid-cols-3 gap-4">
          {Object.entries(actionVerbs).map(([category, verbs]) => (
            <div key={category}>
              <h4 className="text-sm font-medium text-gray-300 mb-2">{category}</h4>
              <div className="flex flex-wrap gap-2">
                {verbs.slice(0, 4).map(verb => (
                  <span key={verb} className="px-2 py-1 bg-gray-700 rounded text-xs text-gray-300">
                    {verb}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

// Education Section Component
const EducationSection = ({ resumeData, updateResumeData }: any) => (
    <div className="space-y-6">
      {resumeData.education.map((edu: any, index: number) => (
        <div key={edu.id} className="bg-gray-800 rounded-xl p-6 border border-gray-700">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-semibold text-white">
              Education #{index + 1}
            </h3>
            {resumeData.education.length > 1 && (
              <button
                onClick={() => {
                  const updated = resumeData.education.filter((e: any) => e.id !== edu.id);
                  updateResumeData('education', () => updated);
                }}
                className="p-2 text-red-400 hover:bg-red-900/20 rounded-lg transition-colors cursor-pointer"
                title="Delete Education"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            )}
          </div>

          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                School/University *
              </label>
              <input
                type="text"
                value={edu.school}
                onChange={(e) => {
                  const updated = [...resumeData.education];
                  updated[index] = { ...edu, school: e.target.value };
                  updateResumeData('education', () => updated);
                }}
                className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-teal-500 transition-colors cursor-text"
                placeholder="University Name"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Degree
              </label>
              <input
                type="text"
                value={edu.degree}
                onChange={(e) => {
                  const updated = [...resumeData.education];
                  updated[index] = { ...edu, degree: e.target.value };
                  updateResumeData('education', () => updated);
                }}
                className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-teal-500 transition-colors cursor-text"
                placeholder="Bachelor of Science"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Field of Study
              </label>
              <input
                type="text"
                value={edu.field}
                onChange={(e) => {
                  const updated = [...resumeData.education];
                  updated[index] = { ...edu, field: e.target.value };
                  updateResumeData('education', () => updated);
                }}
                className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-teal-500 transition-colors cursor-text"
                placeholder="Computer Science"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Graduation Year
              </label>
              <input
                type="text"
                value={edu.endYear}
                onChange={(e) => {
                  const updated = [...resumeData.education];
                  updated[index] = { ...edu, endYear: e.target.value };
                  updateResumeData('education', () => updated);
                }}
                className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-teal-500 transition-colors cursor-text"
                placeholder="2020"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                GPA (Optional)
              </label>
              <input
                type="text"
                value={edu.gpa}
                onChange={(e) => {
                  const updated = [...resumeData.education];
                  updated[index] = { ...edu, gpa: e.target.value };
                  updateResumeData('education', () => updated);
                }}
                className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-teal-500 transition-colors cursor-text"
                placeholder="3.8/4.0"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Honors/Awards
              </label>
              <input
                type="text"
                value={edu.honors}
                onChange={(e) => {
                  const updated = [...resumeData.education];
                  updated[index] = { ...edu, honors: e.target.value };
                  updateResumeData('education', () => updated);
                }}
                className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-teal-500 transition-colors cursor-text"
                placeholder="Magna Cum Laude"
              />
            </div>
          </div>
        </div>
      ))}

      <button
        onClick={() => {
          const newEdu = {
            id: generateUniqueId(),
            school: '',
            degree: '',
            field: '',
            startYear: '',
            endYear: '',
            gpa: '',
            honors: ''
          };
          updateResumeData('education', (prev: any) => [...prev, newEdu]);
        }}
        className="w-full py-3 bg-gradient-to-r from-teal-600 to-amber-600 text-white rounded-xl font-medium hover:shadow-lg transition-all flex items-center justify-center gap-2 cursor-pointer"
      >
        <Plus className="w-5 h-5" />
        Add Education
      </button>
    </div>
  );

const SkillsSection = ({
  resumeData,
  updateResumeData,
  skillSearchTerm,
  setSkillSearchTerm,
  showSkillSearch,
  setShowSkillSearch,
  skillSearchRef,
  filteredSkills,
  suggestSkills,
  loadingStates,
  industryFocus,
  userData
}: any) => {
  // Show premium banner for non-premium users
  if (!userData?.isPremium) {
    return (
      <div className="space-y-6">
        <PremiumUpgradeBanner feature="AI-Powered Keyword Optimization" />
        
        <div className="bg-gray-800 rounded-xl p-6 border border-gray-700 opacity-50">
          <h2 className="text-2xl font-bold text-white flex items-center gap-3 mb-6">
            <Zap className="w-6 h-6 text-teal-400" />
            Skills & Keywords
            <Lock className="w-5 h-5 text-pink-400" />
          </h2>
          <p className="text-gray-400 text-center py-8">
            Unlock the most powerful ATS optimization feature with Premium membership
          </p>
        </div>
      </div>
    );
  }

  const handleSuggestSkills = () => {
    suggestSkills();
  };
  
  return (
    <div className="space-y-6">
      <div className="bg-gray-800 rounded-xl p-6 border border-gray-700">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-white flex items-center gap-3">
            <Zap className="w-6 h-6 text-teal-400" />
            Skills & Keywords
          </h2>
          <button
            type="button"
            onClick={handleSuggestSkills}
            disabled={loadingStates.skills}
            className="px-4 py-2 bg-gradient-to-r from-teal-600 to-amber-600 text-white rounded-lg font-medium hover:shadow-lg transition-all flex items-center gap-2 disabled:opacity-50 cursor-pointer"
          >
            {loadingStates.skills ? (
              <Loader className="w-4 h-4 animate-spin" />
            ) : (
              <Brain className="w-4 h-4" />
            )}
            AI Suggest
          </button>
        </div>
        <div className="mb-6 relative" ref={skillSearchRef}>
          <div className="relative">
            <Search className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
            <input
              type="text"
              value={skillSearchTerm}
              onChange={(e) => setSkillSearchTerm(e.target.value)}
              onFocus={() => setShowSkillSearch(true)}
              className="w-full pl-10 pr-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-teal-500 transition-colors cursor-text"
              placeholder="Search skills to add..."
            />
            {showSkillSearch && filteredSkills.length > 0 && (
              <div className="absolute left-0 right-0 mt-2 bg-gray-800 border border-gray-700 rounded-lg shadow-lg z-20 max-h-60 overflow-y-auto">
                {filteredSkills.map((skill: string) => (
                  <button
                    key={skill}
                    type="button"
                    className="w-full text-left px-4 py-2 hover:bg-teal-700/40 text-gray-200 cursor-pointer"
                    onClick={() => {
                      updateResumeData('skills', (prevSkills: string[]) => [...prevSkills, skill]);
                      setSkillSearchTerm('');
                      setShowSkillSearch(false);
                    }}
                  >
                    {skill}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Selected Skills */}
        <div className="mb-6">
          <h3 className="text-sm font-medium text-gray-300 mb-3">
            Selected Skills ({resumeData.skills.length})
          </h3>
          <div className="flex flex-wrap gap-2">
            {resumeData.skills.map((skill: string, index: number) => (
              <span
                key={index}
                className="px-3 py-1 bg-gradient-to-r from-teal-600 to-amber-600 text-white rounded-full text-sm flex items-center gap-2 group hover:shadow-lg transition-all"
              >
                {skill}
                <button
                  onClick={() => {
                    const updated = resumeData.skills.filter((_: any, i: number) => i !== index);
                    updateResumeData('skills',() => updated);
                  }}
                  className="opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer"
                  title="Remove Skill"
                >
                  <X className="w-3 h-3" />
                </button>

              </span>
            ))}
          </div>
        </div>

        {/* Skill Categories */}
        <div>
          <h3 className="text-sm font-medium text-gray-300 mb-3">
            Browse by Category
          </h3>
          <div className="space-y-4">
            {Object.entries(skillsDatabase).slice(0, 5).map(([category, skills]) => (
              <div key={category} className="bg-gray-700 rounded-lg p-4">
                <h4 className="text-sm font-semibold text-white mb-2">{category}</h4>
                <div className="flex flex-wrap gap-2">
                  {skills.slice(0, 8).map(skill => (
                    <button
                      key={skill}
                      onClick={() => {
                        if (!resumeData.skills.includes(skill)) {
                          updateResumeData('skills', (prevSkills: string[]) => [...prevSkills, skill]);
                        }
                      }}
                      disabled={resumeData.skills.includes(skill)}
                      className={`px-2 py-1 rounded text-xs transition-all cursor-pointer ${
                        resumeData.skills.includes(skill)
                          ? 'bg-gray-600 text-gray-400 cursor-not-allowed'
                          : 'bg-gray-600 text-gray-300 hover:bg-teal-600 hover:text-white'
                      }`}
                    >
                      {skill}
                      {resumeData.skills.includes(skill) && ' ✓'}
                    </button>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Skill Match Analysis */}
      {industryFocus && (
        <div className="bg-gradient-to-br from-green-900/30 to-teal-900/30 rounded-xl p-6 border border-green-700/50">
          <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
            <Target className="w-5 h-5 text-green-400" />
            Keyword Match for {industryFocus}
          </h3>
          <div className="space-y-3">
            {industryKeywords[industryFocus as keyof typeof industryKeywords]?.map((keyword: string) => {
              const hasKeyword = resumeData.skills.some((skill: string) =>
                skill.toLowerCase().includes(keyword.toLowerCase())
              ) || JSON.stringify(resumeData).toLowerCase().includes(keyword.toLowerCase());

              return (
                <div key={keyword} className="flex items-center justify-between">
                  <span className="text-gray-300">{keyword}</span>
                  {hasKeyword ? (
                    <CheckCircle className="w-5 h-5 text-green-400" />
                  ) : (
                    <button
                      onClick={() => {
                        if (!resumeData.skills.includes(keyword)) {
                          updateResumeData('skills', (prevSkills: string[]) => [...prevSkills, keyword]);
                        }
                      }}
                      className="text-xs px-2 py-1 bg-gray-700 hover:bg-gray-600 rounded text-gray-300 transition-colors cursor-pointer"
                    >
                      Add
                    </button>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
};

// Additional Section Component
const AdditionalSection = ({ resumeData, updateResumeData, handleAddProject, userData }: any) => (
  <div className="space-y-6">
    {/* Premium Banner for Non-Premium Users */}
    {!userData?.isPremium && (
      <PremiumUpgradeBanner feature="Additional Resume Sections" />
    )}

    {/* Certifications */}
    <div className={`bg-gray-800 rounded-xl p-6 border border-gray-700 ${!userData?.isPremium ? 'opacity-50' : ''}`}>
      <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
        <Award className="w-5 h-5 text-amber-400" />
        Certifications
        {!userData?.isPremium && <Lock className="w-4 h-4 text-pink-400" />}
      </h3>
      {userData?.isPremium ? (
        <div className="space-y-3">
          {resumeData.certifications.map((cert: string, index: number) => (
            <div key={index} className="flex items-center gap-2">
              <input
                type="text"
                value={cert}
                onChange={(e) => updateResumeData('certifications', (prevCertifications: string[]) => {
                  const updated = [...prevCertifications];
                  updated[index] = e.target.value;
                  return updated;
                })}
                className="flex-1 px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-teal-500 transition-colors cursor-text"
                placeholder="Certification name and issuer"
              />
              <button
                onClick={() => updateResumeData('certifications', (prevCertifications: string[]) => {
                  const updated = prevCertifications.filter((_: string, i: number) => i !== index);
                  return updated;
                })}
                className="p-2 text-red-400 hover:bg-red-900/20 rounded-lg transition-colors cursor-pointer"
                title="Remove Certification"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          ))}
          <button
            onClick={() => {
              updateResumeData('certifications', (prevCertifications: string[]) => [...prevCertifications, '']);
            }}
            className="px-4 py-2 bg-gray-700 hover:bg-gray-600 rounded-lg text-sm font-medium text-gray-300 transition-colors flex items-center gap-2 cursor-pointer"
          >
            <Plus className="w-4 h-4" />
            Add Certification
          </button>
        </div>
      ) : (
        <p className="text-gray-400 text-center py-4">
          Upgrade to Premium to add certifications
        </p>
      )}
    </div>

    {/* Licenses */}
    <div className={`bg-gray-800 rounded-xl p-6 border border-gray-700 ${!userData?.isPremium ? 'opacity-50' : ''}`}>
      <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
        <Award className="w-5 h-5 text-amber-400" />
        Licenses
        {!userData?.isPremium && <Lock className="w-4 h-4 text-pink-400" />}
      </h3>
      {userData?.isPremium ? (
        <div className="space-y-3">
          {resumeData.licenses.map((cert: string, index: number) => (
            <div key={index} className="flex items-center gap-2">
              <input
                type="text"
                value={cert}
                onChange={(e) => updateResumeData('licenses', (prevLicenses: string[]) => {
                  const updated = [...prevLicenses];
                  updated[index] = e.target.value;
                  return updated;
                })}
                className="flex-1 px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-teal-500 transition-colors cursor-text"
                placeholder="Licenses name and issuer"
              />
              <button
                onClick={() => updateResumeData('licenses', (prevLicenses: string[]) => {
                  const updated = prevLicenses.filter((_: string, i: number) => i !== index);
                  return updated;
                })}
                className="p-2 text-red-400 hover:bg-red-900/20 rounded-lg transition-colors cursor-pointer"
                title="Remove License"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          ))}
          <button
            onClick={() => {
              updateResumeData('licenses', (prevLicenses: string[]) => [...prevLicenses, '']);
            }}
            className="px-4 py-2 bg-gray-700 hover:bg-gray-600 rounded-lg text-sm font-medium text-gray-300 transition-colors flex items-center gap-2 cursor-pointer"
          >
            <Plus className="w-4 h-4" />
            Add Professional Licenses
          </button>
        </div>
      ) : (
        <p className="text-gray-400 text-center py-4">
          Upgrade to Premium to add licenses
        </p>
      )}
    </div>

    {/* Languages */}
    <div className={`bg-gray-800 rounded-xl p-6 border border-gray-700 ${!userData?.isPremium ? 'opacity-50' : ''}`}>
      <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
        <Globe className="w-5 h-5 text-teal-400" />
        Languages
        {!userData?.isPremium && <Lock className="w-4 h-4 text-pink-400" />}
      </h3>
      {userData?.isPremium ? (
        <div className="space-y-3">
          {resumeData.languages.map((lang: string, index: number) => (
            <div key={index} className="flex items-center gap-2">
              <input
                type="text"
                value={lang}
                onChange={(e) => updateResumeData('languages', (prevLanguages: string[]) => {
                  const updated = [...prevLanguages];
                  updated[index] = e.target.value;
                  return updated;
                })}
                className="flex-1 px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-teal-500 transition-colors cursor-text"
                placeholder="Language - Proficiency level"
              />
              <button
                onClick={() => updateResumeData('languages', (prevLanguages: string[]) => {
                  const updated = prevLanguages.filter((_: string, i: number) => i !== index);
                  return updated;
                })}
                className="p-2 text-red-400 hover:bg-red-900/20 rounded-lg transition-colors cursor-pointer"
                title="Remove Language"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          ))}
          <button
            onClick={() => {
              updateResumeData('languages', (prevLanguages: string[]) => [...prevLanguages, '']);
            }}
            className="px-4 py-2 bg-gray-700 hover:bg-gray-600 rounded-lg text-sm font-medium text-gray-300 transition-colors flex items-center gap-2 cursor-pointer"
          >
            <Plus className="w-4 h-4" />
            Add Language
          </button>
        </div>
      ) : (
        <p className="text-gray-400 text-center py-4">
          Upgrade to Premium to add languages
        </p>
      )}
    </div>

    {/* Projects */}
    <div className={`bg-gray-800 rounded-xl p-6 border border-gray-700 ${!userData?.isPremium ? 'opacity-50' : ''}`}>
      <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
        <Code className="w-5 h-5 text-teal-400" />
        Projects
        {!userData?.isPremium && <Lock className="w-4 h-4 text-pink-400" />}
      </h3>
      {userData?.isPremium ? (
        <>
          <p className="text-sm text-gray-400 mb-4">
            Add personal projects, open source contributions, or significant academic projects
          </p>
          <button
            onClick={handleAddProject}
            className="px-4 py-2 bg-gradient-to-r from-teal-600 to-amber-600 text-white rounded-lg font-medium hover:shadow-lg transition-all flex items-center gap-2 cursor-pointer"
          >
            <Plus className="w-4 h-4" />
            Add Project
          </button>
        </>
      ) : (
        <p className="text-gray-400 text-center py-4">
          Upgrade to Premium to add projects
        </p>
      )}
    </div>

    {/* Custom Sections */}
    <div className={`bg-gray-800 rounded-xl p-6 border border-gray-700 ${!userData?.isPremium ? 'opacity-50' : ''}`}>
      <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
        <Settings className="w-5 h-5 text-gray-400" />
        Custom Sections
        {!userData?.isPremium && <Lock className="w-4 h-4 text-pink-400" />}
      </h3>
      {userData?.isPremium ? (
        <>
          <p className="text-sm text-gray-400 mb-4">
            Add additional sections like awards, publications, volunteer work, etc.
          </p>
          <button
            onClick={() => {
              const newSection: CustomSection = {
                id: generateUniqueId(),
                title: 'Custom Section',
                content: ''
              };
              updateResumeData('customSections', (prevSections: CustomSection[]) => [...prevSections, newSection]);
            }}
            className="px-4 py-2 bg-gradient-to-r from-teal-600 to-amber-600 text-white rounded-lg font-medium hover:shadow-lg transition-all flex items-center gap-2 cursor-pointer"
          >
            <Plus className="w-4 h-4" />
            Add Custom Section
          </button>
        </>
      ) : (
        <p className="text-gray-400 text-center py-4">
          Upgrade to Premium to add custom sections
        </p>
      )}
    </div>
  </div>
);


const EnhancedATSResumeBuilder = () => {
  
  // State Management
  const [currentSection, setCurrentSection] = useState<SectionName>('overview');

  
  // Handle section navigation
  const handleSectionChange = useCallback((newSection: SectionName) => {
    console.log('Changing section from', currentSection, 'to', newSection);
    setCurrentSection(newSection);
  }, [currentSection]);

  // Debug effect to track section changes
  useEffect(() => {
    console.log('Section changed to:', currentSection);
  }, [currentSection]);
  const searchParams = useSearchParams();
  const templateId = searchParams.get('template');
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [userData, setUserData] = useState<UserData | null>(null);
  const [resumeData, setResumeData] = useState<{
    personal: {
      fullName: string;
      title: string;
      email: string;
      phone: string;
      location: string;
      linkedin: string;
      portfolio: string;
      github: string;
    };
    summary: string;
    experience: Array<{
      id: number;
      company: string;
      position: string;
      startDate: string;
      endDate: string;
      current: boolean;
      location: string;
      description: string;
      achievements: string[];
    }>;
    education: Array<{
      id: number;
      school: string;
      degree: string;
      field: string;
      startYear: string;
      endYear: string;
      gpa?: string;
      honors?: string;
    }>;
    skills: string[];
    certifications: string[];
    licenses: string[];
    languages: string[];
    projects: Array<{
      id: number;
      name: string;
      description: string;
      technologies: string[];
      link: string;
      date: string;
    }>;
    customSections: CustomSection[];
  }>({
    personal: {
      fullName: '',
      title: '',
      email: '',
      phone: '',
      location: '',
      linkedin: '',
      portfolio: '',
      github: ''
    },
    summary: '',
    experience: [{
      id: generateUniqueId(),
      company: '',
      position: '',
      startDate: '',
      endDate: '',
      current: false,
      location: '',
      description: '',
      achievements: ['']
    }],
    education: [{
      id: generateUniqueId() + 1000,
      school: '',
      degree: '',
      field: '',
      startYear: '',
      endYear: '',
      gpa: '',
      honors: ''
    }],
    skills: [],
    certifications: [],
    licenses: [],
    languages: [],
    projects: [],
    customSections: []
  });

  const [atsScore, setAtsScore] = useState(0);
  const [scoreBreakdown, setScoreBreakdown] = useState({
    personal: 0,
    summary: 0,
    experience: 0,
    skills: 0,
    keywords: 0
  });
  const [showPreview, setShowPreview] = useState(false);
  const [aiSuggestions, setAiSuggestions] = useState<{
    summary: string[];
    achievements: Record<string, string[]>;
    skills: string[];
    improvements: string[];
  }>({
    summary: [],
    achievements: {},
    skills: [],
    improvements: []
  });
  const [loadingStates, setLoadingStates] = useState<{
    summary: boolean;
    achievements: Record<string, boolean>;
    skills: boolean;
    analysis: boolean;
  }>({
    summary: false,
    achievements: {},
    skills: false,
    analysis: false
  });
  const [industryFocus, setIndustryFocus] = useState('');
  const [targetRole, setTargetRole] = useState('');
  const [skillSearchTerm, setSkillSearchTerm] = useState('');
  const [showSkillSearch, setShowSkillSearch] = useState(false);
  const [scoreAnimation, setScoreAnimation] = useState(0);
  const [showScorePanel, setShowScorePanel] = useState(false);
  const [previousScore, setPreviousScore] = useState(0);
  const [showScoreIncrease, setShowScoreIncrease] = useState(false);
  const [scoreIncreaseAmount, setScoreIncreaseAmount] = useState(0);
  const [dragOver, setDragOver] = useState(false);
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);
  const [saveStatus, setSaveStatus] = useState('saved'); // 'saving', 'saved', 'unsaved'
  const [showSaveDialog, setShowSaveDialog] = useState(false);
  const [resumeName, setResumeName] = useState('');
  const [savedResumes, setSavedResumes] = useState<SavedResume[]>([]);
  const [showLoadDialog, setShowLoadDialog] = useState(false);
  const [lastSaved, setLastSaved] = useState<string | null>(null);
  const [autoSaveEnabled, setAutoSaveEnabled] = useState(true);
  const skillSearchRef = useRef<HTMLDivElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const autoSaveRef = useRef<NodeJS.Timeout | null>(null);
  const resumePreviewRef = useRef<HTMLDivElement>(null);

  // Check user authentication and premium status
  useEffect(() => {
    checkUserStatus();

    // Check for upgrade parameter and refresh user data
    const urlParams = new URLSearchParams(window.location.search);
    if (urlParams.get('upgraded') === 'true') {
      // Clear any cached data and refresh user status
      setTimeout(() => {
        checkUserStatus();
      }, 1000);
    }
  }, []);

  const checkUserStatus = async () => {
    try {
      const supabase = createClientComponentClient();
      const { data: { user }, error: authError } = await supabase.auth.getUser();

      if (authError || !user) {
        console.log('No authenticated user found');
        setUserData(null);
        return;
      }

      // Get user profile with premium status
      const { data: profile, error: profileError } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', user.id)
        .single();

      if (profileError) {
        console.error('Error fetching user profile:', profileError);
        // Fallback to basic user data
        setUserData({
          isPremium: false,
          email: user.email || '',
          name: user.user_metadata?.full_name || 'User'
        });
        return;
      }

      // Set user data with real premium status
      setUserData({
        isPremium: profile?.is_premium || profile?.subscription_status === 'active',
        email: profile?.email || user.email || '',
        name: profile?.full_name || user.user_metadata?.full_name || 'User'
      });

      console.log('User premium status:', profile?.is_premium || profile?.subscription_status === 'active');
    } catch (error) {
      console.error('Error checking user status:', error);
      setUserData(null);
    }
  };

  // Click outside handler for skill search
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (skillSearchRef.current && !skillSearchRef.current.contains(event.target as Node)) {
        setShowSkillSearch(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  // Load saved resumes on component mount
  useEffect(() => {
    loadSavedResumes();
  }, []);

  // Auto-save functionality - debounced to prevent input interruption
  useEffect(() => {
    if (autoSaveEnabled && userData?.isPremium) {
      // Clear existing timer
      if (autoSaveRef.current) {
        clearTimeout(autoSaveRef.current);
      }

      // Set new timer for auto-save after 5 seconds of inactivity (increased delay)
      autoSaveRef.current = setTimeout(() => {
        if (resumeName || resumeData.personal.fullName) {
          autoSaveResume();
        }
      }, 5000);
    }

    return () => {
      if (autoSaveRef.current) {
        clearTimeout(autoSaveRef.current);
      }
    };
  }, [resumeData, resumeName, autoSaveEnabled, userData?.isPremium]);

  // Mark as unsaved when data changes - debounced
  useEffect(() => {
    const timer = setTimeout(() => {
      setSaveStatus('unsaved');
    }, 100);
    return () => clearTimeout(timer);
  }, [resumeData, targetRole, industryFocus]);

  // Mark as unsaved when data changes
  useEffect(() => {
    setSaveStatus('unsaved');
  }, [resumeData, targetRole, industryFocus]);

  // Helper functions for score display
  const getScoreRingColor = (score: number) => {
    if (score >= 90) return 'text-green-400';
    if (score >= 75) return 'text-yellow-400';
    return 'text-red-400';
  };

  const getScoreTrackColor = (score: number) => {
    if (score >= 90) return 'text-green-400/30';
    if (score >= 75) return 'text-yellow-400/30';
    return 'text-red-400/30';
  }

  const getMotivationalMessage = (score: number) => {
    if (score >= 95) return 'Outstanding!';
    if (score >= 90) return 'Excellent!';
    if (score >= 75) return 'Great Progress!';
    if (score >= 50) return 'Keep Going!';
    return 'Good Start';
  };

  // Filtered skills for search
  const allSkills = Object.values(skillsDatabase).flat();
  const filteredSkills = skillSearchTerm
    ? allSkills.filter(skill =>
        skill.toLowerCase().includes(skillSearchTerm.toLowerCase()) &&
        !resumeData.skills.includes(skill)
      )
    : [];

  // Calculate completion percentage
  const calculateCompletion = () => {
    const requiredFields = [
      resumeData.personal.fullName,
      resumeData.personal.email,
      resumeData.personal.phone,
      resumeData.summary,
      resumeData.experience[0]?.company,
      resumeData.skills.length > 0
    ];
    const completed = requiredFields.filter(field => field).length;
    return Math.round((completed / requiredFields.length) * 100);
  };

  // Real-time ATS Analysis with instant feedback
  const analyzeATS = useCallback(() => {
    let score = 0;
    const breakdown = {
      personal: 0,
      summary: 0,
      experience: 0,
      skills: 0,
      keywords: 0
    };

    // Personal info completeness (20 points)
    const personalFields = [
      resumeData.personal.fullName,
      resumeData.personal.email,
      resumeData.personal.phone,
      resumeData.personal.location,
      resumeData.personal.title,
      resumeData.personal.linkedin
    ].filter(v => v && v.trim());
    const personalScore = (personalFields.length / 6) * 20;
    score += personalScore;
    breakdown.personal = Math.round((personalFields.length / 6) * 100);

    // Summary (15 points)
    if (resumeData.summary) {
      const summaryScore = resumeData.summary.length > 50 ?
        (resumeData.summary.length > 150 ? 15 : 10) : 5;
      score += summaryScore;
      breakdown.summary = Math.round((summaryScore / 15) * 100);
    }

    // Experience (25 points)
    const validExperiences = resumeData.experience.filter(exp =>
      exp.company && exp.position
    );
    const hasAchievements = resumeData.experience.some(exp =>
      exp.achievements.some(ach => ach.trim().length > 10)
    );
    const expScore = (validExperiences.length > 0 ? 10 : 0) +
                     (hasAchievements ? 15 : 0);
    score += expScore;
    breakdown.experience = Math.round((expScore / 25) * 100);

    // Skills (20 points)
    const skillScore = Math.min((resumeData.skills.length / 12) * 20, 20);
    score += skillScore;
    breakdown.skills = Math.round((resumeData.skills.length / 12) * 100);

    // Keywords and optimization (20 points)
    let keywordScore = 0;
    if (targetRole) keywordScore += 5;
    if (industryFocus) keywordScore += 5;

    // Check for industry keywords
    if (industryFocus && industryKeywords[industryFocus as keyof typeof industryKeywords]) {
      const matchedKeywords = industryKeywords[industryFocus as keyof typeof industryKeywords].filter((keyword: string) =>
        JSON.stringify(resumeData).toLowerCase().includes(keyword.toLowerCase())
      );
      keywordScore += Math.min((matchedKeywords.length / 4) * 10, 10);
    }

    score += keywordScore;
    breakdown.keywords = Math.round((keywordScore / 20) * 100);

    // Bonus for action verbs (up to 5 extra points)
    const hasActionVerbs = Object.values(actionVerbs).flat().some(verb =>
      resumeData.experience.some(exp =>
        exp.achievements.some(ach => ach.toLowerCase().startsWith(verb.toLowerCase()))
      )
    );
    if (hasActionVerbs) score += 5;

    // Education bonus (up to 5 points)
    if (resumeData.education.some(edu => edu.school && edu.degree)) {
      score += 5;
    }

    setAtsScore(Math.min(Math.round(score), 100));
    setScoreBreakdown(breakdown);
  }, [resumeData, industryFocus, targetRole]);

  // Auto-analyze on data change with immediate feedback
  useEffect(() => {
    const debounceTimer = setTimeout(() => {
      analyzeATS();
    }, 300);

    return () => clearTimeout(debounceTimer);
  }, [resumeData, analyzeATS]);

  // Animate score changes with notifications
  useEffect(() => {
    const animationTimer = setInterval(() => {
      setScoreAnimation(prev => {
        if (prev < atsScore) {
          return Math.min(prev + 2, atsScore);
        } else if (prev > atsScore) {
          return Math.max(prev - 2, atsScore);
        }
        return prev;
      });
    }, 20);

    // Show score increase notification
    if (atsScore > previousScore && previousScore > 0) {
      setScoreIncreaseAmount(atsScore - previousScore);
      setShowScoreIncrease(true);
      setTimeout(() => setShowScoreIncrease(false), 2000);
    }
    setPreviousScore(atsScore);

    return () => {
      clearInterval(animationTimer);
    }
  }, [atsScore, previousScore]);


  // Update resume data helper
  type ResumeSectionKey =
    | 'personal'
    | 'summary'
    | 'experience'
    | 'education'
    | 'skills'
    | 'certifications'
    | 'licenses'
    | 'languages'
    | 'projects'
    | 'customSections';

  const updateResumeData = <K extends ResumeSectionKey>(
    section: K,
    updater: (prevSectionData: typeof resumeData[K]) => typeof resumeData[K]
  ) => {
    setResumeData(prev => ({
      ...prev,
      [section]: updater(prev[section])
    }));
  };

  const loadTemplateData = (templateId: string) => {
    // Template-specific initial data
    const templateData: Record<string, any> = {
      'modern-pro': {
        personal: {
          fullName: 'Sarah Johnson',
          title: 'Senior Marketing Manager',
          email: 'sarah.johnson@email.com',
          phone: '(555) 123-4567',
          location: 'New York, NY',
        },
        summary: 'Results-driven marketing professional with 8+ years experience driving brand growth and customer engagement through innovative digital strategies.',
      },
      'software-engineer': {
        personal: {
          fullName: 'Alex Chen',
          title: 'Full Stack Developer',
          email: 'alex.chen@email.com',
          phone: '(555) 234-5678',
          location: 'San Francisco, CA',
        },
        summary: 'Full stack developer with expertise in React, Node.js, and cloud technologies. Passionate about building scalable applications.',
      },
      'data-scientist': {
        personal: {
          fullName: 'David Kumar',
          title: 'Senior Data Scientist',
          email: 'dkumar@email.com',
          phone: '(555) 567-8901',
          location: 'Seattle, WA',
        },
        summary: 'Data scientist specializing in machine learning and predictive analytics with proven track record of delivering actionable insights.',
      },
      'executive-elite': {
        personal: {
          fullName: 'Michael Thompson',
          title: 'Chief Operating Officer',
          email: 'mthompson@email.com',
          phone: '(555) 345-6789',
          location: 'Chicago, IL',
        },
        summary: 'Transformational executive with 15+ years driving operational excellence and strategic growth across Fortune 500 companies.',
      },
      'creative-designer': {
        personal: {
          fullName: 'Emma Williams',
          title: 'Senior UX Designer',
          email: 'emma.w@email.com',
          phone: '(555) 456-7890',
          location: 'Los Angeles, CA',
        },
        summary: 'Creative UX designer passionate about user-centered design and creating intuitive digital experiences that drive engagement.',
      },
      'healthcare-hero': {
        personal: {
          fullName: 'Dr. Rachel Martinez',
          title: 'Registered Nurse',
          email: 'rmartinez@email.com',
          phone: '(555) 678-9012',
          location: 'Houston, TX',
        },
        summary: 'Compassionate RN with 10+ years in critical care and emergency medicine, dedicated to providing exceptional patient care.',
      },
      'sales-professional': {
        personal: {
          fullName: 'James Wilson',
          title: 'Senior Sales Executive',
          email: 'jwilson@email.com',
          phone: '(555) 789-0123',
          location: 'Dallas, TX',
        },
        summary: 'Top-performing sales executive with consistent 150%+ quota achievement and expertise in building lasting client relationships.',
      },
      // Add more template data as needed
    };

    if (templateData[templateId]) {
      const data = templateData[templateId];
      if (data.personal) {
        updateResumeData('personal', () => data.personal);
      }
      if (data.summary) {
        updateResumeData('summary', () => data.summary);
      }
      // You can add more fields as needed
    }
  };

  useEffect(() => {
    if (templateId) {
      loadTemplateData(templateId);
    }
  }, [templateId]);

  // Save/Load Functions
  const generateResumeId = () => {
    return 'resume_' + Date.now() + '_' + Math.random().toString(36).substr(2, 9);
  };

  const loadSavedResumes = () => {
    try {
      const saved = localStorage.getItem('smartats_saved_resumes');
      if (saved) {
        setSavedResumes(JSON.parse(saved));
      }
    } catch (error) {
      console.error('Failed to load saved resumes:', error);
    }
  };

  const saveResume = async (name: string, isAutoSave = false) => {
    if (!userData?.isPremium) {
      // Non-premium users can't save
      return;
    }

    setSaveStatus('saving');

    try {
      const resumeToSave = {
        id: resumeName ? resumeName.replace(/[^a-zA-Z0-9]/g, '_') : generateResumeId(),
        name: name || resumeName || resumeData.personal.fullName || 'Untitled Resume',
        data: resumeData,
        targetRole,
        industryFocus,
        createdAt: lastSaved || new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        atsScore,
        scoreBreakdown
      };

      // Get existing saved resumes
      const existingSaves = JSON.parse(localStorage.getItem('smartats_saved_resumes') || '[]');

      // Update existing or add new
      const existingIndex = existingSaves.findIndex((resume: { id: string; }) => resume.id === resumeToSave.id);
      if (existingIndex >= 0) {
        existingSaves[existingIndex] = resumeToSave;
      } else {
        existingSaves.unshift(resumeToSave);
      }

      // Keep only last 10 resumes
      if (existingSaves.length > 10) {
        existingSaves.splice(10);
      }

      localStorage.setItem('smartats_saved_resumes', JSON.stringify(existingSaves));
      setSavedResumes(existingSaves);

      setResumeName(resumeToSave.name);
      setLastSaved(resumeToSave.updatedAt);
      setSaveStatus('saved');

      if (!isAutoSave) {
        // Show save confirmation
        setTimeout(() => {
          setSaveStatus('saved');
        }, 1000);
      }

      return resumeToSave;
    } catch (error) {
      console.error('Failed to save resume:', error);
      setSaveStatus('unsaved');
      throw error;
    }
  };

  const autoSaveResume = async () => {
    if (resumeData.personal.fullName || resumeName) {
      try {
        await saveResume(resumeName || resumeData.personal.fullName || 'Auto-saved Resume', true);
      } catch (error) {
        console.error('Auto-save failed:', error);
      }
    }
  };

  interface SavedResume {
    id: string;
    name: string;
    data: typeof resumeData;
    targetRole?: string;
    industryFocus?: string;
    createdAt?: string;
    updatedAt?: string;
    atsScore?: number;
    scoreBreakdown?: typeof scoreBreakdown;
  }

  const loadResume = (resume: SavedResume) => {
    setResumeData(resume.data);
    setTargetRole(resume.targetRole || '');
    setIndustryFocus(resume.industryFocus || '');
    setResumeName(resume.name);
    setLastSaved(resume.updatedAt ?? null);
    setSaveStatus('saved');
    setShowLoadDialog(false);
  };

  const deleteResume = (resumeId: string) => {
    try {
      const existingSaves = JSON.parse(localStorage.getItem('smartats_saved_resumes') || '[]');
      const filtered = existingSaves.filter((resume: SavedResume) => resume.id !== resumeId);
      localStorage.setItem('smartats_saved_resumes', JSON.stringify(filtered));
      setSavedResumes(filtered);
    } catch (error) {
      console.error('Failed to delete resume:', error);
    }
  };

  const exportResume = () => {
    const exportData = {
      resumeData,
      targetRole,
      industryFocus,
      atsScore,
      scoreBreakdown,
      exportedAt: new Date().toISOString()
    };

    const dataStr = JSON.stringify(exportData, null, 2);
    const dataBlob = new Blob([dataStr], { type: 'application/json' });
    const url = URL.createObjectURL(dataBlob);

    const link = document.createElement('a');
    link.href = url;
    link.download = `${resumeName || resumeData.personal.fullName || 'resume'}_data.json`;
    link.click();

    URL.revokeObjectURL(url);
  };

  const importResume = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (e) => {
      try {
        const result = e.target?.result;
        if (typeof result === 'string') {
          const importedData = JSON.parse(result);
          if (importedData.resumeData) {
            setResumeData(importedData.resumeData);
            setTargetRole(importedData.targetRole || '');
            setIndustryFocus(importedData.industryFocus || '');
            setSaveStatus('unsaved');
            alert('Resume imported successfully!');
          } else {
            alert('Invalid resume file format.');
          }
        }
      } catch (error) {
        console.error('Import failed:', error);
        alert('Failed to import resume. Please check the file format.');
      }
    };
    reader.readAsText(file);
  };

  // AI Suggestion Functions
  const generateAISummary = async () => {
    if (!userData?.isPremium) return;

    setLoadingStates(prev => ({ ...prev, summary: true }));

    // Simulate AI generation
    setTimeout(() => {
      const suggestions = [
        `Results-driven ${targetRole || 'professional'} with proven expertise in ${resumeData.skills.slice(0, 3).join(', ')}. Demonstrated success in delivering high-impact solutions and driving measurable business outcomes in ${industryFocus || 'dynamic'} environments.`,
        `Innovative ${targetRole || 'professional'} combining technical excellence with strategic thinking. Track record of ${resumeData.experience[0]?.achievements[0] || 'achieving significant results'} while maintaining focus on continuous improvement and team collaboration.`,
        `Dynamic ${targetRole || 'professional'} passionate about leveraging ${resumeData.skills.slice(0, 2).join(' and ')} to solve complex challenges. Committed to delivering exceptional results through data-driven decision making and innovative problem-solving approaches.`
      ];

      setAiSuggestions(prev => ({ ...prev, summary: suggestions }));
      setLoadingStates(prev => ({ ...prev, summary: false }));
    }, 2000);
  };

  const generateAIAchievements = async (experienceId: string | number) => {
    if (!userData?.isPremium) return;

    setLoadingStates(prev => ({
      ...prev,
      achievements: { ...prev.achievements, [experienceId]: true }
    }));

    // Simulate AI generation
    setTimeout(() => {
      const experience = resumeData.experience.find(exp => exp.id === experienceId);
      const achievements = [
        `Led cross-functional team of 12 to deliver ${experience?.position || 'project'} ahead of schedule, resulting in 25% cost savings`,
        `Implemented innovative solutions that improved operational efficiency by 40% and reduced processing time from 5 days to 24 hours`,
        `Drove revenue growth of $2.5M through strategic initiatives and process optimization`,
        `Mentored 5 junior team members, with 100% receiving promotions within 18 months`,
        `Spearheaded digital transformation initiative affecting 500+ employees, achieving 95% adoption rate`
      ];

      // Update the specific experience with new achievements
      const updatedExperience = resumeData.experience.map(exp =>
        exp.id === experienceId
          ? { ...exp, achievements: achievements.slice(0, 3) }
          : exp
      );

      updateResumeData('experience', () => updatedExperience);
      setLoadingStates(prev => ({
        ...prev,
        achievements: { ...prev.achievements, [experienceId]: false }
      }));
    }, 2000);
  };

  const suggestSkills = () => {
    if (!userData?.isPremium) return;

    setLoadingStates(prev => ({ ...prev, skills: true }));

    setTimeout(() => {
      const relevantSkills = industryKeywords[industryFocus as keyof typeof industryKeywords] || [];
      const foundCategory = Object.keys(skillsDatabase).find(cat =>
        cat.toLowerCase().includes(industryFocus?.toLowerCase() || '')
      );
      const categorySkills = foundCategory ? skillsDatabase[foundCategory as keyof typeof skillsDatabase] : [];

      const suggestions = [...new Set([...relevantSkills, ...categorySkills.slice(0, 5)])];
      const newSkills = suggestions.filter((skill: string) => !resumeData.skills.includes(skill));

      if (newSkills.length > 0) {
        updateResumeData('skills', (prevSkills: string[]) => [...prevSkills, ...newSkills.slice(0, 5)]);
      }

      setLoadingStates(prev => ({ ...prev, skills: false }));
    }, 1000);
  };

  // Handle project addition
  const handleAddProject = () => {
    if (!userData?.isPremium) return;

    const newProject = {
      id: generateUniqueId(),
      name: '',
      description: '',
      technologies: [],
      link: '',
      date: ''
    };
    setCurrentSection('additional');
  };

  const handleFileUpload = async (file: File | null) => {
    if (!file) return;

    const validTypes = ['application/pdf', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'];

    if (!validTypes.includes(file.type)) {
      alert('Please upload a PDF, DOC, or DOCX file only.');
      return;
    }

    if (file.size > 10 * 1024 * 1024) { // 10MB limit
      alert('File size must be less than 10MB.');
      return;
    }

    setUploadedFile(file);
    setIsAnalyzing(true);

    const formData = new FormData();
    formData.append('resume', file);

    try {
      const response = await fetch('/api/parse-resume', {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to parse resume from server');
      }

      const parsedData = await response.json();

      // Check if there was a parsing error
      if (parsedData.error) {
        console.warn('Parsing warning:', parsedData.error);
        alert(`Warning: ${parsedData.error}\n\nSome information may not have been extracted correctly. Please review and fill in any missing details.`);
      }

      // Update the state with the data returned from the API
      // Only update fields that have meaningful data
      if (parsedData.personal) {
        const updatedPersonal: typeof resumeData.personal = { ...resumeData.personal };
        Object.keys(parsedData.personal).forEach((key: string) => {
          if (
            key in updatedPersonal &&
            parsedData.personal[key] &&
            typeof parsedData.personal[key] === 'string' &&
            parsedData.personal[key].trim()
          ) {
            // @ts-expect-error: Indexing by key is safe here due to the check above
            updatedPersonal[key] = parsedData.personal[key];
          }
        });
        updateResumeData('personal', () => updatedPersonal);
      }

      if (parsedData.summary && parsedData.summary.trim()) {
        updateResumeData('summary', () => parsedData.summary);
      }

      if (parsedData.experience && parsedData.experience.length > 0) {
        // Filter out empty experiences
        const validExperiences = parsedData.experience.filter(
          (exp: {
            company?: string;
            position?: string;
          }) =>
            (exp.company && exp.company.trim() && exp.company !== 'Company Name') ||
            (exp.position && exp.position.trim() && exp.position !== 'Position Title')
        );
        if (validExperiences.length > 0) {
          updateResumeData('experience', () => validExperiences);
        }
      }

      if (parsedData.education && parsedData.education.length > 0) {
        // Filter out empty education entries
        const validEducation = parsedData.education.filter((edu: { school?: string; degree?: string }) =>
          (edu.school && edu.school.trim() && edu.school !== 'School Name') ||
          (edu.degree && edu.degree.trim() && edu.degree !== 'Degree')
        );
        if (validEducation.length > 0) {
          updateResumeData('education', () => validEducation);
        }
      }

      if (parsedData.skills && parsedData.skills.length > 0) {
        // Filter out empty or generic skills
        const validSkills = parsedData.skills.filter((skill: string) =>
          skill && skill.trim() && skill.length > 1
        );
        if (validSkills.length > 0) {
          updateResumeData('skills', (prevSkills: string[]) => [...new Set([...prevSkills, ...validSkills])]);
        }
      }

      // Show success message with details
      const extractedFields = [];
      if (parsedData.personal?.fullName) extractedFields.push('name');
      if (parsedData.personal?.email) extractedFields.push('email');
      if (parsedData.personal?.phone) extractedFields.push('phone');
      if (parsedData.summary) extractedFields.push('summary');
      if (parsedData.experience?.length > 0) extractedFields.push('experience');
      if (parsedData.education?.length > 0) extractedFields.push('education');
      if (parsedData.skills?.length > 0) extractedFields.push('skills');

      if (extractedFields.length > 0) {
        alert(`Success! Extracted: ${extractedFields.join(', ')}.\n\nPlease review the information and make any necessary adjustments.`);
        // Auto-navigate to personal section to review
        setCurrentSection('personal');
      } else {
        alert('File uploaded successfully, but we couldn\'t extract much information. Please fill in the fields manually.');
      }

    } catch (error: unknown) {
      console.error('Error parsing resume:', error);
      let message = 'An unknown error occurred.';
      if (error instanceof Error) {
        message = error.message;
      }
      alert(`Error: ${message}\n\nPlease try again or fill in the fields manually.`);
    } finally {
      setIsAnalyzing(false);
    }
  };

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setDragOver(true);
  };

  const handleDragLeave = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setDragOver(false);
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setDragOver(false);

    const files = e.dataTransfer.files;
    if (files.length > 0) {
      handleFileUpload(files[0]);
    }
  };

  // Logout Button
  const handleLogout = async () => {
    try {
      // Clear any user session data (e.g., from localStorage)
      localStorage.clear();
      sessionStorage.clear();

      // If using Supabase, sign out
      // const { error } = await supabase.auth.signOut();
      // if (error) console.error('Error signing out:', error);

      // Redirect to the home page
      window.location.href = '/';
    } catch (error) {
      console.error('Error during logout:', error);
      // Still redirect even if there's an error
      window.location.href = '/';
    }
  };

  // Fixed PDF Download Function
  const handleDownloadPdf = async () => {
    const input = resumePreviewRef.current;
    if (!input) {
      alert('Preview element not found. Please try again.');
      return;
    }

    try {
      // Show the preview to ensure content is rendered
      setShowPreview(true);
      
      // Wait for preview to render
      await new Promise(resolve => setTimeout(resolve, 500));

      const canvas = await html2canvas(input, {
        scale: 2,
        useCORS: true,
        backgroundColor: '#ffffff',
        logging: false,
        windowWidth: 1200,
        windowHeight: 1600
      });

      const imgData = canvas.toDataURL('image/png');
      const pdf = new jsPDF({
        orientation: 'portrait',
        unit: 'pt',
        format: 'a4',
      });

      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = pdf.internal.pageSize.getHeight();
      const imgWidth = canvas.width;
      const imgHeight = canvas.height;
      const ratio = Math.min(pdfWidth / imgWidth, pdfHeight / imgHeight);
      const imgX = (pdfWidth - imgWidth * ratio) / 2;
      const imgY = 30;

      pdf.addImage(imgData, 'PNG', imgX, imgY, imgWidth * ratio, imgHeight * ratio);
      pdf.save(`${resumeName || resumeData.personal.fullName || 'resume'}.pdf`);
      
      // Hide preview after successful download
      setShowPreview(false);
    } catch (error) {
      console.error('Error generating PDF:', error);
      alert('Failed to generate PDF. Please try again.');
      setShowPreview(false);
    }
  };

// Render functions
const renderSectionContent = () => {
    switch (currentSection) {
      case 'overview':
        return <OverviewSection
                    setCurrentSection={setCurrentSection}
                    calculateCompletion={calculateCompletion}
                    resumeData={resumeData}
                    targetRole={targetRole}
                    industryFocus={industryFocus}
                    lastSaved={lastSaved}
                    setShowPreview={setShowPreview}
                    setShowLoadDialog={setShowLoadDialog}
                    setShowSaveDialog={setShowSaveDialog}
                    saveStatus={saveStatus}
                    dragOver={dragOver}
                    handleDragOver={handleDragOver}
                    handleDragLeave={handleDragLeave}
                    handleDrop={handleDrop}
                    fileInputRef={fileInputRef}
                    handleFileUpload={handleFileUpload}
                    uploadedFile={uploadedFile}
                    setUploadedFile={setUploadedFile}
                    userData={userData}
                />;
      case 'personal':
        return <PersonalSection
                    resumeData={resumeData}
                    updateResumeData={updateResumeData}
                    targetRole={targetRole}
                    setTargetRole={setTargetRole}
                    industryFocus={industryFocus}
                    setIndustryFocus={setIndustryFocus}
                    dragOver={dragOver}
                    handleDragOver={handleDragOver}
                    handleDragLeave={handleDragLeave}
                    handleDrop={handleDrop}
                    fileInputRef={fileInputRef}
                    handleFileUpload={handleFileUpload}
                    uploadedFile={uploadedFile}
                />;
      case 'summary':
        return <SummarySection
                    resumeData={resumeData}
                    updateResumeData={updateResumeData}
                    generateAISummary={generateAISummary}
                    loadingStates={loadingStates}
                    aiSuggestions={aiSuggestions}
                    userData={userData}
                />;
      case 'experience':
        return <ExperienceSection
                    resumeData={resumeData}
                    updateResumeData={updateResumeData}
                    generateAIAchievements={generateAIAchievements}
                    loadingStates={loadingStates}
                    userData={userData}
                />;
      case 'education':
        return <EducationSection
                    resumeData={resumeData}
                    updateResumeData={updateResumeData}
                />;
      case 'skills':
        return <SkillsSection
                    resumeData={resumeData}
                    updateResumeData={updateResumeData}
                    skillSearchTerm={skillSearchTerm}
                    setSkillSearchTerm={setSkillSearchTerm}
                    showSkillSearch={showSkillSearch}
                    setShowSkillSearch={setShowSkillSearch}
                    skillSearchRef={skillSearchRef}
                    filteredSkills={filteredSkills}
                    suggestSkills={suggestSkills}
                    loadingStates={loadingStates}
                    industryFocus={industryFocus}
                    userData={userData}
                />;
      case 'additional':
        return <AdditionalSection
                    resumeData={resumeData}
                    updateResumeData={updateResumeData}
                    handleAddProject={handleAddProject}
                    userData={userData}
                />;
      default:
        return <OverviewSection
                    setCurrentSection={setCurrentSection}
                    calculateCompletion={calculateCompletion}
                    resumeData={resumeData}
                    targetRole={targetRole}
                    industryFocus={industryFocus}
                    lastSaved={lastSaved}
                    setShowPreview={setShowPreview}
                    setShowLoadDialog={setShowLoadDialog}
                    setShowSaveDialog={setShowSaveDialog}
                    saveStatus={saveStatus}
                    dragOver={dragOver}
                    handleDragOver={handleDragOver}
                    handleDragLeave={handleDragLeave}
                    handleDrop={handleDrop}
                    fileInputRef={fileInputRef}
                    handleFileUpload={handleFileUpload}
                    uploadedFile={uploadedFile}
                    setUploadedFile={setUploadedFile}
                    userData={userData}
                />;
    }
  };

return (
  <div className="min-h-screen bg-gradient-to-b from-gray-950 via-gray-900 to-black text-white relative">
    {/* Navigation */}
    <Navigation />

    {/* Background Logo - Large and Faded */}
    <div className="fixed inset-0 overflow-hidden pointer-events-none">
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] opacity-5">
        <img src="/horse-logo.png" alt="" className="w-full h-full object-contain" />
      </div>
    </div>

    {/* Header */}
    <header className="bg-gray-900/90 backdrop-blur-md border-b border-gray-800 sticky top-16 z-40">
      <div className="max-w-7xl mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-8">
            <Link href="/" className="flex items-center gap-3 cursor-pointer">
              <div className="relative w-12 h-12">
                <img src="/horse-logo.png" alt="SmartATS Logo" className="w-full h-full object-contain" />
              </div>
              <span className="text-2xl font-bold">SmartATS</span>
            </Link>

            {/* Resume Name & Save Status */}
            <div className="hidden md:flex items-center gap-4">
              <div className="flex flex-col">
                <span className="text-sm font-medium text-white">
                  {resumeName || resumeData.personal.fullName || 'Untitled Resume'}
                </span>
                <div className="flex items-center gap-2">
                  <div className="flex items-center gap-2">
                    <div className="w-32 h-2 bg-gray-700 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-gradient-to-r from-teal-600 to-amber-600 transition-all duration-500"
                        style={{ width: `${calculateCompletion()}%` }}
                      />
                    </div>
                    <span className="text-sm text-gray-400">{calculateCompletion()}%</span>
                  </div>

                  {/* Save Status Indicator */}
                  <div className="flex items-center gap-1">
                    {saveStatus === 'saving' && (
                      <>
                        <Loader className="w-3 h-3 animate-spin text-amber-400" />
                        <span className="text-xs text-amber-400">Saving...</span>
                      </>
                    )}
                    {saveStatus === 'saved' && (
                      <>
                        <CheckCircle className="w-3 h-3 text-green-400" />
                        <span className="text-xs text-green-400">Saved</span>
                      </>
                    )}
                    {saveStatus === 'unsaved' && (
                      <>
                        <AlertCircle className="w-3 h-3 text-orange-400" />
                        <span className="text-xs text-orange-400">Unsaved</span>
                      </>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-2">
            {/* Save Button */}
            {userData?.isPremium ? (
              <button
                onClick={() => setShowSaveDialog(true)}
                disabled={saveStatus === 'saving'}
                className="px-4 py-2 bg-green-600 hover:bg-green-700 disabled:bg-green-600/50 rounded-lg font-medium transition-colors flex items-center gap-2 text-white cursor-pointer"
              >
                {saveStatus === 'saving' ? (
                  <Loader className="w-4 h-4 animate-spin" />
                ) : (
                  <Save className="w-4 h-4" />
                )}
                <span className="hidden sm:inline">
                  {saveStatus === 'saving' ? 'Saving...' : 'Save'}
                </span>
              </button>
            ) : (
              <Link href="/pricing">
                <button className="px-4 py-2 bg-gradient-to-r from-pink-600 to-pink-500 text-white rounded-lg font-medium hover:shadow-lg transition-all flex items-center gap-2 cursor-pointer relative overflow-hidden group">
                  <Lock className="w-4 h-4" />
                  <span className="hidden sm:inline">Save</span>
                  <Crown className="w-4 h-4" />
                  <span className="absolute inset-0 bg-pink-700 opacity-0 group-hover:opacity-20 transition-opacity"></span>
                </button>
              </Link>
            )}

            {/* Load Button */}
            <button
              onClick={() => setShowLoadDialog(true)}
              className="px-4 py-2 bg-blue-600 hover:bg-blue-700 rounded-lg font-medium transition-colors flex items-center gap-2 text-white cursor-pointer"
            >
              <Download className="w-4 h-4" />
              <span className="hidden sm:inline">Load</span>
            </button>

            {/* Preview Button */}
            <button
              onClick={() => setShowPreview(true)}
              className="px-4 py-2 bg-gray-800 hover:bg-gray-700 rounded-lg font-medium transition-colors flex items-center gap-2 cursor-pointer"
            >
              <Eye className="w-4 h-4" />
              <span className="hidden sm:inline">Preview</span>
            </button>

            {/* Download PDF Button */}
            <button
              onClick={handleDownloadPdf}
              className="px-4 py-2 bg-gradient-to-r from-teal-600 to-amber-600 text-white rounded-lg font-medium hover:shadow-lg transition-all flex items-center gap-2 cursor-pointer"
            >
              <Download className="w-4 h-4" />
              <span className="hidden sm:inline">PDF</span>
            </button>
            
            {/* Logout Button */}
            <button
                onClick={handleLogout}
                className="p-2 text-gray-400 hover:text-white hover:bg-red-900/20 rounded-lg transition-colors cursor-pointer"
                title="Logout"
            >
                <LogOut className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>
    </header>

    {/* Main Content Area */}
    <div className="flex">
      {/* Slide-out ATS Score Tab */}
      <div className="fixed top-1/2 right-0 transform -translate-y-1/2 z-50">
        {/* Score increase notification */}
        {showScoreIncrease && (
          <div className="absolute -top-12 left-1/2 transform -translate-x-1/2 bg-green-500 text-white px-3 py-1 rounded-full text-sm font-bold animate-bounce z-10">
            +{scoreIncreaseAmount} points! 🎉
          </div>
        )}

        <div className="flex items-center">
          {/* Always Visible Tab */}
          <div
            className="bg-gray-900/90 backdrop-blur-sm border-l border-t border-b border-gray-700 rounded-l-2xl shadow-2xl cursor-pointer transition-all duration-300 w-20 h-24 hover:bg-gray-800/90 hover:scale-105 relative z-10"
            onClick={() => setShowScorePanel(!showScorePanel)}
          >
            <div className="flex flex-col items-center justify-center h-full p-2 relative">
              {/* Small Score Circle */}
              <div className="relative w-12 h-12 mb-1">
                <svg className="w-full h-full transform -rotate-90">
                  <circle
                    cx="24"
                    cy="24"
                    r="20"
                    stroke="currentColor"
                    strokeWidth="3"
                    fill="none"
                    className="text-gray-700"
                  />
                  <circle
                    cx="24"
                    cy="24"
                    r="20"
                    stroke="currentColor"
                    strokeWidth="3"
                    fill="none"
                    strokeDasharray={`${2 * Math.PI * 20}`}
                    strokeDashoffset={`${2 * Math.PI * 20 * (1 - scoreAnimation / 100)}`}
                    className={`transition-all duration-500 ${getScoreRingColor(scoreAnimation)}`}
                  />
                </svg>
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="text-sm font-bold text-white">{scoreAnimation}%</span>
                </div>
              </div>

              {/* ATS Label */}
              <div className="text-xs text-gray-400 font-medium">ATS</div>

              {/* Expand/Collapse Arrow */}
              <div className="absolute right-1 top-1/2 transform -translate-y-1/2">
                <ChevronRight className={`w-3 h-3 text-gray-400 transition-transform duration-300 ${
                  showScorePanel ? 'rotate-180' : ''
                }`} />
              </div>
            </div>
          </div>

          {/* Expanded Panel */}
          <div className={`bg-gray-900/95 backdrop-blur-sm border border-gray-700 rounded-l-2xl shadow-2xl transition-all duration-300 ease-in-out overflow-hidden ${
            showScorePanel ? 'w-80 opacity-100 translate-x-0' : 'w-0 opacity-0 -translate-x-4'
          }`}>
            <div className="p-6 w-80 relative">
              {/* Close Button */}
              <button
                onClick={() => setShowScorePanel(false)}
                className="absolute top-4 right-4 p-1 text-gray-400 hover:text-white hover:bg-gray-700 rounded-full transition-colors z-10 cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>

              {/* Score Header */}
              <div className="flex items-center justify-between mb-4 pr-8">
                <h3 className="text-sm font-semibold text-gray-400 uppercase tracking-wider">
                  ATS Score Analysis
                </h3>
                  <span className={`text-xs px-2 py-1 rounded-full font-medium text-white ${getScoreRingColor(scoreAnimation).replace('text-', 'bg-')}`}>
                  {getMotivationalMessage(scoreAnimation)}
                </span>
              </div>

             {/* Large Score Display with Ring */}
                <div className="relative w-40 h-40 mx-auto mb-6">
                    <svg className="w-full h-full transform -rotate-90">
                        <circle
                            cx="80"
                            cy="80"
                            r="70"
                            stroke="currentColor"
                            strokeWidth="12"
                            fill="none"
                            className={`transition-colors duration-500 ${getScoreTrackColor(scoreAnimation)}`}
                        />
                        <circle
                            cx="80"
                            cy="80"
                            r="70"
                            stroke="currentColor"
                            strokeWidth="12"
                            fill="none"
                            strokeDasharray={`${2 * Math.PI * 70}`}
                            strokeDashoffset={`${2 * Math.PI * 70 * (1 - scoreAnimation / 100)}`}
                            className={`transition-all duration-500 ${getScoreRingColor(scoreAnimation)}`}
                            strokeLinecap="round"
                        />
                    </svg>
                    <div className="absolute inset-0 flex flex-col items-center justify-center">
                        <span className={`text-5xl font-bold transition-colors duration-500 ${getScoreRingColor(scoreAnimation)}`}>
                            {scoreAnimation}%
                        </span>
                        <span className="text-sm text-gray-400 font-medium">out of 100</span>
                    </div>
                </div>

              {/* Detailed breakdown */}
              <div className="space-y-3">
                {Object.entries(scoreBreakdown).map(([key, value]) => (
                  <div key={key} className="bg-gray-800/50 rounded-lg p-3">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm text-gray-300 capitalize font-medium">{key}</span>
                      <span className={`text-sm font-bold ${
                        value >= 80 ? 'text-green-400' :
                        value >= 50 ? 'text-yellow-400' :
                        'text-red-400'
                      }`}>
                        {value}%
                      </span>
                    </div>
                    <div className="w-full h-2 bg-gray-700 rounded-full overflow-hidden">
                      <div
                        className={`h-full transition-all duration-500 rounded-full ${
                          value >= 80 ? 'bg-green-500' :
                          value >= 50 ? 'bg-yellow-500' :
                          'bg-red-500'
                        }`}
                        style={{ width: `${value}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>

              {/* Current Focus Tip */}
              <div className="mt-4 p-3 bg-gradient-to-r from-teal-900/30 to-amber-900/30 rounded-lg border border-teal-700/50">
                <div className="flex items-center gap-2 mb-1">
                  <Lightbulb className="w-4 h-4 text-amber-400" />
                  <span className="text-xs font-semibold text-gray-300">FOCUS NOW</span>
                </div>
                <p className="text-xs text-gray-400">
                  {scoreAnimation < 40 && "💡 Start with your personal info"}
                  {scoreAnimation >= 40 && scoreAnimation < 60 && "📝 Add a compelling summary"}
                  {scoreAnimation >= 60 && scoreAnimation < 80 && "🎯 Include relevant keywords"}
                  {scoreAnimation >= 80 && "🌟 Looking great! Fine-tune details"}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="flex-1">
        <SectionNav currentSection={currentSection} setCurrentSection={handleSectionChange} userData={userData} />

        <div className="max-w-6xl mx-auto p-6" key={currentSection}>
          {renderSectionContent()}
        </div>
      </div>
    </div>

      {/* Resume Preview Modal */}
      {showPreview && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-hidden">
            <div className="flex items-center justify-between p-6 border-b">
              <h2 className="text-2xl font-bold text-gray-900">Resume Preview</h2>
              <button
                onClick={() => setShowPreview(false)}
                className="p-2 hover:bg-gray-100 rounded-full transition-colors cursor-pointer"
              >
                <X className="w-5 h-5 text-gray-600" />
              </button>
            </div>

            <div className="p-8 overflow-y-auto max-h-[calc(90vh-100px)]">
              {/* Added ref to this div for PDF download */}
              <div ref={resumePreviewRef} className="max-w-3xl mx-auto bg-white p-8">
                <div className="text-center mb-8">
                  <h1 className="text-3xl font-bold text-gray-900">
                    {resumeData.personal.fullName || 'Your Name'}
                  </h1>
                  <p className="text-lg text-gray-600 mt-1">
                    {resumeData.personal.title || 'Professional Title'}
                  </p>
                  <div className="flex items-center justify-center gap-4 text-sm text-gray-600 mt-3">
                    {resumeData.personal.email && <span>{resumeData.personal.email}</span>}
                    {resumeData.personal.phone && <span>{resumeData.personal.phone}</span>}
                    {resumeData.personal.location && <span>{resumeData.personal.location}</span>}
                  </div>
                </div>

                {resumeData.summary && (
                  <div className="mb-8">
                    <h2 className="text-xl font-bold text-gray-900 border-b-2 border-gray-300 pb-2 mb-3">
                      Professional Summary
                    </h2>
                    <p className="text-gray-700 leading-relaxed">{resumeData.summary}</p>
                  </div>
                )}

                {resumeData.experience.length > 0 && resumeData.experience[0].company && (
                  <div className="mb-8">
                    <h2 className="text-xl font-bold text-gray-900 border-b-2 border-gray-300 pb-2 mb-3">
                      Professional Experience
                    </h2>
                    {resumeData.experience.map((exp, index) => (
                      <div key={exp.id} className="mb-6">
                        <div className="flex justify-between items-start mb-2">
                          <div>
                            <h3 className="text-lg font-semibold text-gray-900">{exp.position}</h3>
                            <p className="text-gray-600">{exp.company}</p>
                          </div>
                          <div className="text-right text-sm text-gray-500">
                            <p>{exp.startDate} - {exp.current ? 'Present' : exp.endDate}</p>
                            <p>{exp.location}</p>
                          </div>
                        </div>
                        {exp.description && (
                          <p className="text-gray-700 mb-2">{exp.description}</p>
                        )}
                        {exp.achievements.filter(ach => ach.trim()).length > 0 && (
                          <ul className="list-disc list-inside text-gray-700 space-y-1">
                            {exp.achievements.filter(ach => ach.trim()).map((achievement, achIndex) => (
                              <li key={achIndex}>{achievement}</li>
                            ))}
                          </ul>
                        )}
                      </div>
                    ))}
                  </div>
                )}

                {resumeData.skills.length > 0 && (
                  <div className="mb-8">
                    <h2 className="text-xl font-bold text-gray-900 border-b-2 border-gray-300 pb-2 mb-3">
                      Skills
                    </h2>
                    <div className="flex flex-wrap gap-2">
                      {resumeData.skills.map((skill, index) => (
                        <span key={index} className="px-3 py-1 bg-gray-200 text-gray-700 rounded-full text-sm">
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>
                )}

                {resumeData.education.length > 0 && resumeData.education[0].school && (
                  <div className="mb-8">
                    <h2 className="text-xl font-bold text-gray-900 border-b-2 border-gray-300 pb-2 mb-3">
                      Education
                    </h2>
                    {resumeData.education.map((edu, index) => (
                      <div key={edu.id} className="mb-4">
                        <div className="flex justify-between items-start">
                          <div>
                            <h3 className="text-lg font-semibold text-gray-900">{edu.degree} {edu.field && `in ${edu.field}`}</h3>
                            <p className="text-gray-600">{edu.school}</p>
                            {edu.honors && <p className="text-gray-600 italic">{edu.honors}</p>}
                          </div>
                          <div className="text-right text-sm text-gray-500">
                            <p>{edu.endYear}</p>
                            {edu.gpa && <p>GPA: {edu.gpa}</p>}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Save Dialog */}
      {showSaveDialog && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-gray-800 rounded-2xl shadow-2xl max-w-md w-full border border-gray-700">
            <div className="flex items-center justify-between p-6 border-b border-gray-700">
              <h2 className="text-xl font-bold text-white">Save Resume</h2>
                <button
                  onClick={() => setShowSaveDialog(false)}
                  className="p-2 hover:bg-gray-700 rounded-full transition-colors cursor-pointer"
                  title="Close"
                >
                  <X className="w-5 h-5 text-gray-400" />
                </button>

            </div>

            <div className="p-6">
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Resume Name
                </label>
                <input
                  type="text"
                  value={resumeName || resumeData.personal.fullName || ''}
                  onChange={(e) => setResumeName(e.target.value)}
                  className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-teal-500 transition-colors cursor-text"
                  placeholder="Enter resume name..."
                  autoFocus
                />
              </div>

              <div className="mb-6">
                <label htmlFor="auto-save" className="flex items-center gap-2 text-sm text-gray-300 cursor-pointer">
                  <input
                    id="auto-save"
                    type="checkbox"
                    checked={autoSaveEnabled}
                    onChange={(e) => setAutoSaveEnabled(e.target.checked)}
                    className="w-4 h-4 rounded border-gray-600 text-teal-600 focus:ring-teal-500"
                  />
                  Enable auto-save (saves every 3 seconds)
                </label>
              </div>


              <div className="flex gap-3">
                <button
                  onClick={() => setShowSaveDialog(false)}
                  className="flex-1 px-4 py-2 bg-gray-700 hover:bg-gray-600 rounded-lg font-medium text-gray-300 transition-colors cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  onClick={async () => {
                    try {
                      await saveResume(resumeName || resumeData.personal.fullName || 'Untitled Resume');
                      setShowSaveDialog(false);
                    } catch (error) {
                      alert('Failed to save resume. Please try again.');
                    }
                  }}
                  disabled={saveStatus === 'saving'}
                  className="flex-1 px-4 py-2 bg-green-600 hover:bg-green-700 disabled:bg-green-600/50 rounded-lg font-medium text-white transition-colors flex items-center justify-center gap-2 cursor-pointer"
                >
                  {saveStatus === 'saving' ? (
                    <Loader className="w-4 h-4 animate-spin" />
                  ) : (
                    <Save className="w-4 h-4" />
                  )}
                  Save
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Load Dialog */}
      {showLoadDialog && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-gray-800 rounded-2xl shadow-2xl max-w-2xl w-full max-h-[80vh] border border-gray-700">
            <div className="flex items-center justify-between p-6 border-b border-gray-700">
              <h2 className="text-xl font-bold text-white">Load Resume</h2>
              <div className="flex items-center gap-2">
                {/* Import Button */}
                <label className="px-3 py-1 bg-blue-600 hover:bg-blue-700 rounded-lg text-sm font-medium text-white transition-colors cursor-pointer flex items-center gap-2">
                  <Upload className="w-4 h-4" />
                  Import
                  <input
                    type="file"
                    accept=".json"
                    onChange={importResume}
                    className="hidden"
                  />
                </label>
                <button
                  onClick={() => setShowLoadDialog(false)}
                  className="p-2 hover:bg-gray-700 rounded-full transition-colors cursor-pointer"
                  title="Close"
                >
                  <X className="w-5 h-5 text-gray-400" />
                </button>

              </div>
            </div>

            <div className="p-6 max-h-[60vh] overflow-y-auto">
              {savedResumes.length === 0 ? (
                <div className="text-center py-8">
                  <FileText className="w-16 h-16 text-gray-500 mx-auto mb-4" />
                  <h3 className="text-lg font-semibold text-gray-300 mb-2">No Saved Resumes</h3>
                  <p className="text-gray-400 mb-4">Create and save your first resume to see it here.</p>
                  <button
                    onClick={() => setShowLoadDialog(false)}
                    className="px-4 py-2 bg-teal-600 hover:bg-teal-700 rounded-lg font-medium text-white transition-colors cursor-pointer"
                  >
                    Start Building
                  </button>
                </div>
              ) : (
                <div className="space-y-4">
                  {savedResumes.map((resume: SavedResume) => (
                    <div key={resume.id} className="bg-gray-700 rounded-lg p-4 hover:bg-gray-600 transition-colors">
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <h3 className="font-semibold text-white mb-1">{resume.name}</h3>
                          <div className="flex items-center gap-4 text-sm text-gray-400 mb-2">
                            <span>Updated: {new Date(resume.updatedAt ?? '').toLocaleDateString()}</span>
                            <span>ATS Score: {resume.atsScore || 0}</span>
                            <span>{resume.targetRole || 'No target role'}</span>
                          </div>
                          <div className="flex flex-wrap gap-1">
                            {resume.data?.skills?.slice(0, 3).map((skill: string, index: number) => (
                              <span key={index} className="px-2 py-1 bg-gray-600 rounded text-xs text-gray-300">
                                {skill}
                              </span>
                            ))}
                            {resume.data?.skills?.length > 3 && (
                              <span className="px-2 py-1 bg-gray-600 rounded text-xs text-gray-300">
                                +{resume.data.skills.length - 3} more
                              </span>
                            )}
                          </div>
                        </div>

                        <div className="flex items-center gap-2 ml-4">
                          <button
                            onClick={() => exportResume()}
                            className="p-2 text-blue-400 hover:bg-gray-600 rounded-lg transition-colors cursor-pointer"
                            title="Export"
                          >
                            <Download className="w-4 h-4" />
                          </button>
                          <button
                            onClick={() => loadResume(resume)}
                            className="px-3 py-1 bg-green-600 hover:bg-green-700 rounded-lg text-sm font-medium text-white transition-colors cursor-pointer"
                          >
                            Load
                          </button>
                          <button
                            onClick={() => {
                              if (confirm('Are you sure you want to delete this resume?')) {
                                deleteResume(resume.id);
                              }
                            }}
                            className="p-2 text-red-400 hover:bg-red-900/20 rounded-lg transition-colors cursor-pointer"
                            title="Delete"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      )}
      {/* Debug Component - Remove in production */}
      {process.env.NODE_ENV === 'development' && (
        <OAuthDebug />
      )}
    </div>
  );
};

export default EnhancedATSResumeBuilder;
