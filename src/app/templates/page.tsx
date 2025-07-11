'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import {
  FileText, Star, Shield, Zap, Filter, CheckCircle, Lock,
  TrendingUp, Award, Users, Clock, ArrowRight, X, Sparkles,
  BarChart, Target, Eye, Briefcase, Code, Heart, GraduationCap,
  Building, Palette, DollarSign, Globe, Microscope, Crown
} from 'lucide-react';
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';
import { usePremiumStatus } from '@/hooks/usePremiumStatus';
import   UnifiedNavigation from '@/components/UnifiedNavigation';

// Premium Upgrade Banner Component
const PremiumUpgradeBanner = () => (
  <div className="bg-gradient-to-r from-pink-600 via-pink-500 to-pink-600 rounded-2xl p-8 text-white text-center shadow-2xl mb-8 border border-pink-400/30 relative overflow-hidden">
    {/* Animated background effect */}
    <div className="absolute inset-0 bg-gradient-to-r from-pink-600/20 via-pink-400/20 to-pink-600/20 animate-pulse"></div>

    <div className="relative z-10">
      <div className="flex items-center justify-center gap-3 mb-4">
        <Crown className="w-10 h-10 animate-bounce text-yellow-300" />
        <h3 className="text-2xl md:text-3xl font-bold">Unlock ALL Premium Templates!</h3>
        <Crown className="w-10 h-10 animate-bounce text-yellow-300" style={{ animationDelay: '0.5s' }} />
      </div>
      <p className="mb-2 text-pink-100 text-lg">
        🚀 <strong>3x More Interviews</strong> • 🎯 <strong>98% ATS Pass Rate</strong> • ⚡ <strong>AI-Powered Optimization</strong>
      </p>
      <p className="mb-6 text-pink-200 text-sm">
        Join 50,000+ job seekers who landed their dream jobs with our premium templates
      </p>
      <Link href="/pricing">
        <button className="px-8 py-4 bg-white text-pink-600 font-bold rounded-xl hover:bg-pink-50 transform hover:scale-105 transition-all cursor-pointer shadow-lg text-lg">
          Get Premium Access - Only $19.99/month
        </button>
      </Link>
      <p className="text-xs mt-3 text-pink-200">✨  Cancel anytime</p>
    </div>
  </div>
);

const EnhancedTemplatesPage = () => {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [showPreview, setShowPreview] = useState<TemplateType | null>(null);
  const [hoveredTemplate, setHoveredTemplate] = useState<string | null>(null);

  // Use the premium status hook
  const { isPremium, loading: premiumLoading, error: premiumError, refreshStatus } = usePremiumStatus();

  const [userData, setUserData] = useState<{email?: string; name?: string} | null>(null);

  // Check user basic data on component mount
  useEffect(() => {
    const checkUserData = async () => {
      try {
        const supabase = createClientComponentClient();
        const { data: { user }, error: authError } = await supabase.auth.getUser();

        if (authError || !user) {
          console.log('No authenticated user found');
          setUserData(null);
          return;
        }

        // Get basic user profile data (premium status handled by hook)
        const { data: profile, error: profileError } = await supabase
          .from('profiles')
          .select('email, full_name')
          .eq('id', user.id)
          .single();

        if (profileError) {
          console.error('Error fetching user profile:', profileError);
          // Fallback to basic user data
          setUserData({
            email: user.email || '',
            name: user.user_metadata?.full_name || 'User'
          });
          return;
        }

        // Set user data (premium status comes from hook)
        setUserData({
          email: profile?.email || user.email || '',
          name: profile?.full_name || user.user_metadata?.full_name || 'User'
        });
      } catch (error) {
        console.error('Error checking user status:', error);
        setUserData(null);
      }
    };

    checkUserData();
    const urlParams = new URLSearchParams(window.location.search);
    if (urlParams.get('upgraded') === 'true') {
      // Clear any cached data and refresh user status
      setTimeout(() => {
        checkUserData();
      }, 1000);
    }
  }, []);

  const templates = [
    {
      id: 'modern-pro',
      name: 'Modern Professional',
      category: 'professional',
      description: 'Clean, modern design perfect for corporate roles',
      atsScore: 98,
      isPremium: false,
      popularityRank: 1,
      downloads: 15420,
      rating: 4.9,
      features: ['ATS Optimized', 'Keyword Rich', 'Clean Layout', 'Easy to Scan'],
      industries: ['Technology', 'Finance', 'Consulting', 'Marketing'],
      preview: {
        name: 'Sarah Johnson',
        title: 'Senior Marketing Manager',
        email: 'sarah.johnson@email.com',
        phone: '(555) 123-4567',
        location: 'New York, NY',
        summary: 'Results-driven marketing professional with 8+ years experience...',
        experience: [
          { title: 'Senior Marketing Manager', company: 'Tech Corp', years: '2020-Present' },
          { title: 'Marketing Manager', company: 'Growth Inc', years: '2018-2020' }
        ],
        skills: ['Digital Marketing', 'SEO/SEM', 'Data Analysis', 'Team Leadership']
      }
    },
    {
      id: 'software-engineer',
      name: 'Software Engineer Pro',
      category: 'technical',
      description: 'Optimized for developers with technical skills showcase',
      atsScore: 97,
      isPremium: false,
      popularityRank: 2,
      downloads: 23560,
      rating: 4.95,
      features: ['Tech Stack Focus', 'Project Highlights', 'GitHub Integration', 'Skills Matrix'],
      industries: ['Software Development', 'Engineering', 'IT', 'DevOps'],
      preview: {
        name: 'Alex Chen',
        title: 'Full Stack Developer',
        email: 'alex.chen@email.com',
        phone: '(555) 234-5678',
        location: 'San Francisco, CA',
        summary: 'Full stack developer with expertise in React, Node.js, and cloud technologies...',
        experience: [
          { title: 'Senior Developer', company: 'StartupXYZ', years: '2021-Present' },
          { title: 'Full Stack Developer', company: 'WebSolutions', years: '2019-2021' }
        ],
        skills: ['JavaScript', 'React', 'Node.js', 'AWS', 'Python', 'Docker']
      }
    },
    {
      id: 'executive-elite',
      name: 'Executive Elite',
      category: 'executive',
      description: 'Sophisticated template for senior leadership positions',
      atsScore: 96,
      isPremium: true,
      popularityRank: 3,
      downloads: 12350,
      rating: 4.95,
      features: ['Executive Format', 'Achievement Focus', 'Leadership Emphasis', 'Board Ready'],
      industries: ['C-Suite', 'Management', 'Director Level', 'VP Positions'],
      preview: {
        name: 'Michael Thompson',
        title: 'Chief Operating Officer',
        email: 'mthompson@email.com',
        phone: '(555) 345-6789',
        location: 'Chicago, IL',
        summary: 'Transformational executive with 15+ years driving operational excellence...',
        experience: [
          { title: 'Chief Operating Officer', company: 'Fortune 500 Co', years: '2019-Present' },
          { title: 'VP of Operations', company: 'Global Corp', years: '2015-2019' }
        ],
        skills: ['Strategic Planning', 'P&L Management', 'Change Management', 'M&A']
      }
    },
    {
      id: 'creative-designer',
      name: 'Creative Designer',
      category: 'creative',
      description: 'Stand out with visual appeal while maintaining ATS compatibility',
      atsScore: 92,
      isPremium: true,
      popularityRank: 5,
      downloads: 8930,
      rating: 4.8,
      features: ['Creative Layout', 'Portfolio Section', 'Visual Hierarchy', 'Brand Colors'],
      industries: ['Design', 'UX/UI', 'Marketing', 'Advertising'],
      preview: {
        name: 'Emma Williams',
        title: 'Senior UX Designer',
        email: 'emma.w@email.com',
        phone: '(555) 456-7890',
        location: 'Los Angeles, CA',
        summary: 'Creative UX designer passionate about user-centered design...',
        experience: [
          { title: 'Senior UX Designer', company: 'Design Studio', years: '2020-Present' },
          { title: 'UX Designer', company: 'Digital Agency', years: '2018-2020' }
        ],
        skills: ['Figma', 'Adobe Creative Suite', 'Prototyping', 'User Research']
      }
    },
    {
      id: 'data-scientist',
      name: 'Data Science Expert',
      category: 'technical',
      description: 'Highlight analytical skills and technical expertise',
      atsScore: 96,
      isPremium: false,
      popularityRank: 4,
      downloads: 14280,
      rating: 4.88,
      features: ['Technical Skills', 'Project Results', 'Publications', 'Certifications'],
      industries: ['Data Science', 'Analytics', 'Machine Learning', 'AI'],
      preview: {
        name: 'David Kumar',
        title: 'Senior Data Scientist',
        email: 'dkumar@email.com',
        phone: '(555) 567-8901',
        location: 'Seattle, WA',
        summary: 'Data scientist specializing in machine learning and predictive analytics...',
        experience: [
          { title: 'Senior Data Scientist', company: 'Tech Giant', years: '2020-Present' },
          { title: 'Data Scientist', company: 'Analytics Co', years: '2018-2020' }
        ],
        skills: ['Python', 'R', 'Machine Learning', 'SQL', 'TensorFlow', 'Tableau']
      }
    },
    {
      id: 'healthcare-hero',
      name: 'Healthcare Professional',
      category: 'industry',
      description: 'Tailored for medical and healthcare professionals',
      atsScore: 95,
      isPremium: true,
      popularityRank: 6,
      downloads: 9460,
      rating: 4.92,
      features: ['Medical Terms', 'Certification Focus', 'Clinical Format', 'HIPAA Aware'],
      industries: ['Healthcare', 'Medical', 'Nursing', 'Clinical Research'],
      preview: {
        name: 'Dr. Rachel Martinez',
        title: 'Registered Nurse',
        email: 'rmartinez@email.com',
        phone: '(555) 678-9012',
        location: 'Houston, TX',
        summary: 'Compassionate RN with 10+ years in critical care and emergency medicine...',
        experience: [
          { title: 'Senior Registered Nurse', company: 'City Hospital', years: '2018-Present' },
          { title: 'Registered Nurse', company: 'Medical Center', years: '2014-2018' }
        ],
        skills: ['Patient Care', 'Emergency Medicine', 'IV Therapy', 'EMR Systems']
      }
    },
    {
      id: 'sales-professional',
      name: 'Sales Champion',
      category: 'professional',
      description: 'Results-focused template for sales professionals',
      atsScore: 97,
      isPremium: false,
      popularityRank: 7,
      downloads: 11890,
      rating: 4.85,
      features: ['Achievement Metrics', 'Revenue Focus', 'Client Success', 'Quota Performance'],
      industries: ['Sales', 'Business Development', 'Account Management', 'SaaS'],
      preview: {
        name: 'James Wilson',
        title: 'Senior Sales Executive',
        email: 'jwilson@email.com',
        phone: '(555) 789-0123',
        location: 'Dallas, TX',
        summary: 'Top-performing sales executive with consistent 150%+ quota achievement...',
        experience: [
          { title: 'Senior Sales Executive', company: 'SaaS Corp', years: '2019-Present' },
          { title: 'Sales Representative', company: 'Tech Sales Inc', years: '2017-2019' }
        ],
        skills: ['Salesforce', 'Negotiation', 'Pipeline Management', 'Cold Calling']
      }
    },
    {
      id: 'finance-expert',
      name: 'Finance Professional',
      category: 'professional',
      description: 'Structured template for finance and accounting roles',
      atsScore: 98,
      isPremium: true,
      popularityRank: 8,
      downloads: 10320,
      rating: 4.91,
      features: ['Financial Metrics', 'Compliance Focus', 'Technical Skills', 'Certifications'],
      industries: ['Finance', 'Accounting', 'Banking', 'Investment'],
      preview: {
        name: 'Jennifer Park',
        title: 'Senior Financial Analyst',
        email: 'jpark@email.com',
        phone: '(555) 890-1234',
        location: 'Boston, MA',
        summary: 'CPA with expertise in financial analysis and strategic planning...',
        experience: [
          { title: 'Senior Financial Analyst', company: 'Investment Bank', years: '2020-Present' },
          { title: 'Financial Analyst', company: 'Consulting Firm', years: '2018-2020' }
        ],
        skills: ['Excel', 'Financial Modeling', 'SAP', 'Risk Analysis', 'CPA']
      }
    },
    {
      id: 'teacher-educator',
      name: 'Education Professional',
      category: 'industry',
      description: 'Perfect for teachers and education professionals',
      atsScore: 94,
      isPremium: false,
      popularityRank: 9,
      downloads: 8760,
      rating: 4.87,
      features: ['Certification Display', 'Teaching Methods', 'Student Success', 'Curriculum'],
      industries: ['Education', 'Teaching', 'Training', 'Academic'],
      preview: {
        name: 'Lisa Anderson',
        title: 'High School Teacher',
        email: 'landerson@email.com',
        phone: '(555) 901-2345',
        location: 'Denver, CO',
        summary: 'Dedicated educator with 12+ years fostering student growth...',
        experience: [
          { title: 'Lead Teacher', company: 'Lincoln High School', years: '2018-Present' },
          { title: 'Teacher', company: 'Washington Middle School', years: '2012-2018' }
        ],
        skills: ['Curriculum Development', 'Classroom Management', 'Google Classroom', 'IEP']
      }
    },
    {
      id: 'recent-graduate',
      name: 'Fresh Graduate',
      category: 'entry-level',
      description: 'Clean design emphasizing education and potential',
      atsScore: 99,
      isPremium: false,
      popularityRank: 10,
      downloads: 19540,
      rating: 4.82,
      features: ['Education Focus', 'Internships', 'Projects', 'Skills Emphasis'],
      industries: ['Entry Level', 'Internships', 'Recent Grads', 'Students'],
      preview: {
        name: 'Tyler Roberts',
        title: 'Recent Graduate',
        email: 'troberts@email.com',
        phone: '(555) 012-3456',
        location: 'Austin, TX',
        summary: 'Recent Computer Science graduate seeking entry-level position...',
        experience: [
          { title: 'Software Intern', company: 'Tech Startup', years: 'Summer 2023' },
          { title: 'IT Help Desk', company: 'University IT', years: '2022-2023' }
        ],
        skills: ['Java', 'Python', 'Git', 'Agile', 'Problem Solving']
      }
    },
    {
      id: 'project-manager',
      name: 'Project Manager Pro',
      category: 'professional',
      description: 'Showcase project leadership and delivery success',
      atsScore: 96,
      isPremium: true,
      popularityRank: 11,
      downloads: 13670,
      rating: 4.89,
      features: ['Project Metrics', 'Team Leadership', 'Agile/Scrum', 'Budget Management'],
      industries: ['Project Management', 'IT', 'Construction', 'Consulting'],
      preview: {
        name: 'Robert Chang',
        title: 'Senior Project Manager',
        email: 'rchang@email.com',
        phone: '(555) 123-4567',
        location: 'San Diego, CA',
        summary: 'PMP-certified project manager with track record of on-time delivery...',
        experience: [
          { title: 'Senior Project Manager', company: 'Global Tech', years: '2019-Present' },
          { title: 'Project Manager', company: 'Solutions Inc', years: '2016-2019' }
        ],
        skills: ['PMP', 'Agile', 'Scrum', 'JIRA', 'Risk Management', 'MS Project']
      }
    },
    {
      id: 'customer-service',
      name: 'Customer Success Star',
      category: 'professional',
      description: 'Highlight customer service excellence and satisfaction',
      atsScore: 95,
      isPremium: false,
      popularityRank: 12,
      downloads: 7890,
      rating: 4.83,
      features: ['Customer Metrics', 'Communication Skills', 'Problem Resolution', 'CRM Tools'],
      industries: ['Customer Service', 'Support', 'Hospitality', 'Retail'],
      preview: {
        name: 'Maria Garcia',
        title: 'Customer Success Manager',
        email: 'mgarcia@email.com',
        phone: '(555) 234-5678',
        location: 'Phoenix, AZ',
        summary: 'Customer-focused professional with 95%+ satisfaction ratings...',
        experience: [
          { title: 'Customer Success Manager', company: 'Service Pro', years: '2020-Present' },
          { title: 'Customer Service Rep', company: 'Retail Giant', years: '2018-2020' }
        ],
        skills: ['Zendesk', 'Communication', 'Conflict Resolution', 'Salesforce']
      }
    },
    {
      id: 'cybersecurity-expert',
      name: 'Cybersecurity Specialist',
      category: 'technical',
      description: 'Security-focused template for InfoSec professionals',
      atsScore: 96,
      isPremium: true,
      popularityRank: 13,
      downloads: 9870,
      rating: 4.90,
      features: ['Security Certifications', 'Threat Analysis', 'Compliance Focus', 'Tool Expertise'],
      industries: ['Cybersecurity', 'InfoSec', 'IT Security', 'Risk Management'],
      preview: {
        name: 'Kevin O\'Brien',
        title: 'Senior Security Engineer',
        email: 'kobrien@email.com',
        phone: '(555) 345-6789',
        location: 'Washington, DC',
        summary: 'CISSP-certified security professional with expertise in threat detection...',
        experience: [
          { title: 'Senior Security Engineer', company: 'CyberDef Inc', years: '2019-Present' },
          { title: 'Security Analyst', company: 'SecureNet', years: '2017-2019' }
        ],
        skills: ['CISSP', 'Penetration Testing', 'SIEM', 'Incident Response', 'Python', 'Firewall']
      }
    },
    {
      id: 'hr-professional',
      name: 'HR Leader',
      category: 'professional',
      description: 'Comprehensive template for HR professionals',
      atsScore: 97,
      isPremium: false,
      popularityRank: 14,
      downloads: 10230,
      rating: 4.86,
      features: ['HRIS Systems', 'Recruitment Metrics', 'Policy Development', 'Employee Relations'],
      industries: ['Human Resources', 'Talent Acquisition', 'HR Management', 'People Ops'],
      preview: {
        name: 'Patricia White',
        title: 'HR Director',
        email: 'pwhite@email.com',
        phone: '(555) 456-7890',
        location: 'Atlanta, GA',
        summary: 'Strategic HR leader with 12+ years driving organizational growth...',
        experience: [
          { title: 'HR Director', company: 'Growth Corp', years: '2019-Present' },
          { title: 'Senior HR Manager', company: 'TalentFirst', years: '2016-2019' }
        ],
        skills: ['Workday', 'Talent Management', 'SHRM-CP', 'Employee Engagement', 'Compliance']
      }
    },
    {
      id: 'marketing-digital',
      name: 'Digital Marketing Pro',
      category: 'creative',
      description: 'Data-driven template for digital marketers',
      atsScore: 95,
      isPremium: true,
      popularityRank: 15,
      downloads: 11450,
      rating: 4.88,
      features: ['Campaign Metrics', 'SEO/SEM Focus', 'Analytics Tools', 'ROI Emphasis'],
      industries: ['Digital Marketing', 'Content Marketing', 'Social Media', 'Growth Marketing'],
      preview: {
        name: 'Ashley Thompson',
        title: 'Digital Marketing Manager',
        email: 'athompson@email.com',
        phone: '(555) 567-8901',
        location: 'Austin, TX',
        summary: 'ROI-focused digital marketer with proven track record in SEM/SEO...',
        experience: [
          { title: 'Digital Marketing Manager', company: 'TechStart', years: '2020-Present' },
          { title: 'Marketing Specialist', company: 'MediaCo', years: '2018-2020' }
        ],
        skills: ['Google Ads', 'SEO', 'Analytics', 'HubSpot', 'Facebook Ads', 'Content Strategy']
      }
    },
    {
      id: 'lawyer-attorney',
      name: 'Legal Professional',
      category: 'industry',
      description: 'Formal template for attorneys and legal professionals',
      atsScore: 98,
      isPremium: true,
      popularityRank: 16,
      downloads: 7650,
      rating: 4.93,
      features: ['Bar Admissions', 'Case Highlights', 'Practice Areas', 'Legal Writing'],
      industries: ['Law', 'Legal', 'Corporate Counsel', 'Litigation'],
      preview: {
        name: 'Jonathan Davis, Esq.',
        title: 'Senior Associate Attorney',
        email: 'jdavis@lawfirm.com',
        phone: '(555) 678-9012',
        location: 'New York, NY',
        summary: 'Corporate attorney with expertise in M&A and securities law...',
        experience: [
          { title: 'Senior Associate', company: 'Big Law LLP', years: '2019-Present' },
          { title: 'Associate Attorney', company: 'Legal Partners', years: '2016-2019' }
        ],
        skills: ['Corporate Law', 'M&A', 'Securities', 'Contract Negotiation', 'Litigation']
      }
    },
    {
      id: 'architect-design',
      name: 'Architecture & Design',
      category: 'creative',
      description: 'Portfolio-ready template for architects',
      atsScore: 93,
      isPremium: false,
      popularityRank: 17,
      downloads: 6890,
      rating: 4.84,
      features: ['Project Portfolio', 'Software Skills', 'Design Awards', 'LEED Focus'],
      industries: ['Architecture', 'Interior Design', 'Urban Planning', 'Construction'],
      preview: {
        name: 'Sofia Martinez',
        title: 'Senior Architect',
        email: 'smartinez@email.com',
        phone: '(555) 789-0123',
        location: 'Miami, FL',
        summary: 'LEED-certified architect specializing in sustainable design...',
        experience: [
          { title: 'Senior Architect', company: 'Design Studio', years: '2018-Present' },
          { title: 'Project Architect', company: 'BuildGreen', years: '2015-2018' }
        ],
        skills: ['AutoCAD', 'Revit', 'SketchUp', 'LEED AP', 'Project Management', '3D Modeling']
      }
    },
    {
      id: 'mechanical-engineer',
      name: 'Mechanical Engineer',
      category: 'technical',
      description: 'Technical template for mechanical engineers',
      atsScore: 97,
      isPremium: false,
      popularityRank: 18,
      downloads: 8920,
      rating: 4.87,
      features: ['CAD Skills', 'Project Results', 'Technical Specs', 'Manufacturing'],
      industries: ['Mechanical Engineering', 'Manufacturing', 'Automotive', 'Aerospace'],
      preview: {
        name: 'Richard Chen',
        title: 'Senior Mechanical Engineer',
        email: 'rchen@email.com',
        phone: '(555) 890-1234',
        location: 'Detroit, MI',
        summary: 'Innovative mechanical engineer with 10+ years in automotive design...',
        experience: [
          { title: 'Senior Mechanical Engineer', company: 'AutoTech', years: '2019-Present' },
          { title: 'Mechanical Engineer', company: 'Motors Inc', years: '2015-2019' }
        ],
        skills: ['SolidWorks', 'CATIA', 'FEA', 'GD&T', 'Six Sigma', 'Lean Manufacturing']
      }
    },
    {
      id: 'pharmacist-medical',
      name: 'Pharmacist Professional',
      category: 'industry',
      description: 'Clinical template for pharmacy professionals',
      atsScore: 96,
      isPremium: true,
      popularityRank: 19,
      downloads: 5670,
      rating: 4.91,
      features: ['License Display', 'Clinical Skills', 'Drug Knowledge', 'Patient Care'],
      industries: ['Pharmacy', 'Healthcare', 'Clinical', 'Pharmaceutical'],
      preview: {
        name: 'Dr. Angela Kim, PharmD',
        title: 'Clinical Pharmacist',
        email: 'akim@email.com',
        phone: '(555) 901-2345',
        location: 'San Francisco, CA',
        summary: 'Board-certified clinical pharmacist specializing in oncology...',
        experience: [
          { title: 'Clinical Pharmacist', company: 'Regional Medical Center', years: '2018-Present' },
          { title: 'Staff Pharmacist', company: 'Community Pharmacy', years: '2015-2018' }
        ],
        skills: ['Clinical Pharmacy', 'Oncology', 'Drug Interactions', 'Patient Counseling', 'Epic']
      }
    },
    {
      id: 'real-estate-agent',
      name: 'Real Estate Professional',
      category: 'professional',
      description: 'Sales-focused template for real estate agents',
      atsScore: 94,
      isPremium: false,
      popularityRank: 20,
      downloads: 7230,
      rating: 4.81,
      features: ['Sales Metrics', 'Property Types', 'Client Success', 'Market Knowledge'],
      industries: ['Real Estate', 'Property Management', 'Commercial Real Estate', 'Residential'],
      preview: {
        name: 'Brandon Taylor',
        title: 'Senior Real Estate Agent',
        email: 'btaylor@email.com',
        phone: '(555) 012-3456',
        location: 'Los Angeles, CA',
        summary: 'Top-producing agent with $50M+ in sales and 200+ transactions...',
        experience: [
          { title: 'Senior Agent', company: 'Premier Realty', years: '2017-Present' },
          { title: 'Real Estate Agent', company: 'HomeSales Inc', years: '2014-2017' }
        ],
        skills: ['MLS', 'Negotiation', 'Market Analysis', 'CRM', 'Property Valuation', 'Contracts']
      }
    },
    {
      id: 'supply-chain',
      name: 'Supply Chain Manager',
      category: 'professional',
      description: 'Logistics-focused template for supply chain pros',
      atsScore: 96,
      isPremium: true,
      popularityRank: 21,
      downloads: 8450,
      rating: 4.85,
      features: ['Logistics Metrics', 'Cost Reduction', 'Vendor Management', 'ERP Systems'],
      industries: ['Supply Chain', 'Logistics', 'Operations', 'Procurement'],
      preview: {
        name: 'Michelle Wong',
        title: 'Supply Chain Director',
        email: 'mwong@email.com',
        phone: '(555) 123-4567',
        location: 'Chicago, IL',
        summary: 'Strategic supply chain leader with expertise in global logistics...',
        experience: [
          { title: 'Supply Chain Director', company: 'Global Logistics', years: '2019-Present' },
          { title: 'Sr. Supply Chain Manager', company: 'ShipCo', years: '2016-2019' }
        ],
        skills: ['SAP', 'Lean Six Sigma', 'Inventory Management', 'Forecasting', 'Vendor Relations']
      }
    }
  ];

  const categories = [
    { id: 'all', name: 'All Templates', icon: <FileText className="w-4 h-4" /> },
    { id: 'professional', name: 'Professional', icon: <Briefcase className="w-4 h-4" /> },
    { id: 'technical', name: 'Technical', icon: <Code className="w-4 h-4" /> },
    { id: 'creative', name: 'Creative', icon: <Palette className="w-4 h-4" /> },
    { id: 'executive', name: 'Executive', icon: <Building className="w-4 h-4" /> },
    { id: 'industry', name: 'Industry Specific', icon: <Globe className="w-4 h-4" /> },
    { id: 'entry-level', name: 'Entry Level', icon: <GraduationCap className="w-4 h-4" /> }
  ];

  const filteredTemplates = selectedCategory === 'all' 
    ? templates 
    : templates.filter(t => t.category === selectedCategory);

  type TemplateType = typeof templates[number];
  interface TemplatePreviewModalProps {
    template: TemplateType | null;
    onClose: () => void;
  }
  const TemplatePreviewModal: React.FC<TemplatePreviewModalProps> = ({ template, onClose }) => {
    if (!template) return null;

    return (
      <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
        <div className="bg-gray-900 rounded-3xl shadow-2xl max-w-5xl w-full max-h-[90vh] overflow-hidden border border-gray-800">
          <div className="flex items-center justify-between p-6 border-b border-gray-800">
            <div>
              <h3 className="text-2xl font-bold text-white">{template.name}</h3>
              <p className="text-gray-400 mt-1">{template.description}</p>
            </div>
            <button
              onClick={onClose}
              className="p-2 rounded-full hover:bg-gray-800 transition-colors"
            >
              <X className="w-6 h-6 text-gray-400" />
            </button>
          </div>

          <div className="grid md:grid-cols-2 gap-8 p-6">
            <div className="bg-gray-800 rounded-2xl p-8 flex items-center justify-center">
              <div className="w-full max-w-sm h-96 bg-white rounded-xl shadow-xl overflow-hidden">
                <EnhancedResumePreview template={template} />
              </div>
            </div>

            <div className="space-y-6">
              <div>
                <h4 className="text-lg font-semibold text-white mb-3">ATS Performance</h4>
                <div className="bg-green-900/30 rounded-xl p-4 border border-green-700/50">
                  <div className="flex items-center justify-between mb-3">
                    <span className="font-medium text-gray-300">ATS Score</span>
                    <div className="flex items-center gap-2">
                      <span className="text-3xl font-bold text-green-400">{template.atsScore}</span>
                      <span className="text-gray-500">/100</span>
                    </div>
                  </div>
                  <div className="w-full h-3 bg-gray-700 rounded-full overflow-hidden">
                    <div 
                      className="h-full bg-gradient-to-r from-green-500 to-green-400 rounded-full transition-all duration-500"
                      style={{ width: `${template.atsScore}%` }}
                    ></div>
                  </div>
                </div>
              </div>

              <div>
                <h4 className="text-lg font-semibold text-white mb-3">Key Features</h4>
                <div className="grid grid-cols-2 gap-3">
                  {template.features.map((feature, idx) => (
                    <div key={idx} className="flex items-center gap-2">
                      <CheckCircle className="w-5 h-5 text-green-400" />
                      <span className="text-gray-300">{feature}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <h4 className="text-lg font-semibold text-white mb-3">Best For</h4>
                <div className="flex flex-wrap gap-2">
                  {template.industries.map((industry, idx) => (
                    <span key={idx} className="px-3 py-1 bg-teal-900/30 text-teal-300 rounded-full text-sm border border-teal-700/50">
                      {industry}
                    </span>
                  ))}
                </div>
              </div>

              <div className="flex gap-4 pt-4">
                <button
                  onClick={() => {
                    onClose();
                    if (template.isPremium && !isPremium) {
                      // Redirect to pricing for premium templates if user is not premium
                      window.location.href = '/pricing';
                    } else {
                      // Navigate to builder with template
                      window.location.href = `/builder?template=${template.id}`;
                    }
                  }}
                  className={`flex-1 font-semibold py-3 rounded-xl hover:shadow-lg transform hover:scale-105 transition-all duration-200 flex items-center justify-center gap-2 ${
                    template.isPremium && !isPremium
                      ? 'bg-gradient-to-r from-pink-600 to-pink-500 text-white'
                      : 'bg-gradient-to-r from-teal-600 to-amber-600 text-white'
                  }`}
                >
                  {template.isPremium && !isPremium ? (
                    <>
                      <Crown className="w-5 h-5" />
                      Upgrade to Use
                    </>
                  ) : (
                    <>
                      Use This Template
                      <ArrowRight className="w-5 h-5" />
                    </>
                  )}
                </button>
                <button 
                  onClick={onClose}
                  className="px-6 py-3 border-2 border-gray-700 rounded-xl font-medium text-gray-300 hover:bg-gray-800 transition-colors"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };

  // Replace the ResumePreview component in your templates page with this enhanced version

const EnhancedResumePreview: React.FC<{ template: TemplateType }> = ({ template }) => {
  const baseStyles = "h-full text-xs leading-tight overflow-hidden";
  
  // Modern Professional Template
  if (template.id === 'modern-pro') {
    return (
      <div className={`${baseStyles} bg-white text-gray-900 p-4 font-professional`}>
        <div className="border-l-4 border-blue-500 pl-3 mb-3">
          <div className="font-bold text-lg text-blue-900 tracking-tight leading-tight">{template.preview.name}</div>
          <div className="text-blue-600 font-medium tracking-wide">{template.preview.title}</div>
          <div className="text-gray-600 text-[10px] font-light tracking-wide">{template.preview.location} • {template.preview.phone}</div>
        </div>
        
        <div className="mb-3">
          <div className="font-semibold text-blue-800 text-[10px] uppercase tracking-wide mb-1 border-b border-blue-200">Summary</div>
          <div className="text-gray-700 text-[10px]">{template.preview.summary.substring(0, 80)}...</div>
        </div>
        
        <div className="mb-3">
          <div className="font-semibold text-blue-800 text-[10px] uppercase tracking-wide mb-1 border-b border-blue-200">Experience</div>
          {template.preview.experience.slice(0, 2).map((exp: { title: string | number | bigint | boolean | React.ReactElement<unknown, string | React.JSXElementConstructor<any>> | Iterable<React.ReactNode> | React.ReactPortal | Promise<string | number | bigint | boolean | React.ReactPortal | React.ReactElement<unknown, string | React.JSXElementConstructor<any>> | Iterable<React.ReactNode> | null | undefined> | null | undefined; company: string | number | bigint | boolean | React.ReactElement<unknown, string | React.JSXElementConstructor<any>> | Iterable<React.ReactNode> | React.ReactPortal | Promise<string | number | bigint | boolean | React.ReactPortal | React.ReactElement<unknown, string | React.JSXElementConstructor<any>> | Iterable<React.ReactNode> | null | undefined> | null | undefined; years: string | number | bigint | boolean | React.ReactElement<unknown, string | React.JSXElementConstructor<any>> | Iterable<React.ReactNode> | React.ReactPortal | Promise<string | number | bigint | boolean | React.ReactPortal | React.ReactElement<unknown, string | React.JSXElementConstructor<any>> | Iterable<React.ReactNode> | null | undefined> | null | undefined; }, idx: React.Key | null | undefined) => (
            <div key={idx} className="mb-2">
              <div className="font-medium text-[10px] text-blue-900">{exp.title}</div>
              <div className="text-gray-600 text-[10px]">{exp.company} • {exp.years}</div>
            </div>
          ))}
        </div>
        
        <div>
          <div className="font-semibold text-blue-800 text-[10px] uppercase tracking-wide mb-1 border-b border-blue-200">Skills</div>
          <div className="grid grid-cols-2 gap-1">
            {template.preview.skills.slice(0, 6).map((skill: string | number | bigint | boolean | React.ReactElement<unknown, string | React.JSXElementConstructor<any>> | Iterable<React.ReactNode> | React.ReactPortal | Promise<string | number | bigint | boolean | React.ReactPortal | React.ReactElement<unknown, string | React.JSXElementConstructor<any>> | Iterable<React.ReactNode> | null | undefined> | null | undefined, idx: React.Key | null | undefined) => (
              <div key={idx} className="text-[10px] text-gray-700">• {skill}</div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  // Software Engineer Template
  if (template.id === 'software-engineer') {
    return (
      <div className={`${baseStyles} bg-gray-900 text-white p-4 font-mono`}>
        <div className="border border-green-400 p-2 mb-3">
          <div className="text-green-400 font-bold">{template.preview.name.toUpperCase()}</div>
          <div className="text-green-300 text-[10px]">$ whoami: {template.preview.title}</div>
          <div className="text-gray-400 text-[10px]">{template.preview.location}</div>
        </div>
        
        <div className="mb-3">
          <div className="text-green-400 text-[10px] mb-1">~/profile</div>
          <div className="text-gray-300 text-[10px] pl-2">{template.preview.summary.substring(0, 70)}...</div>
        </div>
        
        <div className="mb-3">
          <div className="text-green-400 text-[10px] mb-1">~/experience</div>
          {template.preview.experience.slice(0, 2).map((exp: { title: string | number | bigint | boolean | React.ReactElement<unknown, string | React.JSXElementConstructor<any>> | Iterable<React.ReactNode> | React.ReactPortal | Promise<string | number | bigint | boolean | React.ReactPortal | React.ReactElement<unknown, string | React.JSXElementConstructor<any>> | Iterable<React.ReactNode> | null | undefined> | null | undefined; company: string | number | bigint | boolean | React.ReactElement<unknown, string | React.JSXElementConstructor<any>> | Iterable<React.ReactNode> | React.ReactPortal | Promise<string | number | bigint | boolean | React.ReactPortal | React.ReactElement<unknown, string | React.JSXElementConstructor<any>> | Iterable<React.ReactNode> | null | undefined> | null | undefined; years: string | number | bigint | boolean | React.ReactElement<unknown, string | React.JSXElementConstructor<any>> | Iterable<React.ReactNode> | React.ReactPortal | Promise<string | number | bigint | boolean | React.ReactPortal | React.ReactElement<unknown, string | React.JSXElementConstructor<any>> | Iterable<React.ReactNode> | null | undefined> | null | undefined; }, idx: React.Key | null | undefined) => (
            <div key={idx} className="text-[10px] pl-2 mb-1">
              <div className="text-white">├── {exp.title}</div>
              <div className="text-gray-400">└── {exp.company} ({exp.years})</div>
            </div>
          ))}
        </div>
        
        <div>
          <div className="text-green-400 text-[10px] mb-1">~/skills</div>
          <div className="text-[10px] pl-2">
            {template.preview.skills.slice(0, 4).map((skill: string | number | bigint | boolean | React.ReactElement<unknown, string | React.JSXElementConstructor<any>> | Iterable<React.ReactNode> | React.ReactPortal | Promise<string | number | bigint | boolean | React.ReactPortal | React.ReactElement<unknown, string | React.JSXElementConstructor<any>> | Iterable<React.ReactNode> | null | undefined> | null | undefined, idx: number) => (
                <span key={idx} className="text-yellow-300">{skill}{idx < 3 ? ', ' : ''}</span>
              ))}
          </div>
        </div>
      </div>
    );
  }

  // Executive Elite Template
  if (template.id === 'executive-elite') {
    return (
      <div className={`${baseStyles} bg-white text-gray-900 p-4`}>
        <div className="text-center mb-3 border-b-2 border-gray-800 pb-2">
          <div className="font-bold text-lg tracking-wide">{template.preview.name.toUpperCase()}</div>
          <div className="text-gray-600 font-medium italic">{template.preview.title}</div>
          <div className="text-gray-500 text-[10px]">{template.preview.location} | {template.preview.phone}</div>
        </div>
        
        <div className="mb-3">
          <div className="font-bold text-gray-800 text-[10px] tracking-wider mb-1">EXECUTIVE SUMMARY</div>
          <div className="text-gray-700 text-[10px] leading-relaxed">{template.preview.summary.substring(0, 90)}...</div>
        </div>
        
        <div className="mb-3">
          <div className="font-bold text-gray-800 text-[10px] tracking-wider mb-1">LEADERSHIP EXPERIENCE</div>
          {template.preview.experience.slice(0, 2).map((exp: { title: string | number | bigint | boolean | React.ReactElement<unknown, string | React.JSXElementConstructor<any>> | Iterable<React.ReactNode> | React.ReactPortal | Promise<string | number | bigint | boolean | React.ReactPortal | React.ReactElement<unknown, string | React.JSXElementConstructor<any>> | Iterable<React.ReactNode> | null | undefined> | null | undefined; company: string | number | bigint | boolean | React.ReactElement<unknown, string | React.JSXElementConstructor<any>> | Iterable<React.ReactNode> | React.ReactPortal | Promise<string | number | bigint | boolean | React.ReactPortal | React.ReactElement<unknown, string | React.JSXElementConstructor<any>> | Iterable<React.ReactNode> | null | undefined> | null | undefined; years: string | number | bigint | boolean | React.ReactElement<unknown, string | React.JSXElementConstructor<any>> | Iterable<React.ReactNode> | React.ReactPortal | Promise<string | number | bigint | boolean | React.ReactPortal | React.ReactElement<unknown, string | React.JSXElementConstructor<any>> | Iterable<React.ReactNode> | null | undefined> | null | undefined; }, idx: React.Key | null | undefined) => (
            <div key={idx} className="mb-2">
              <div className="font-semibold text-[10px]">{exp.title}</div>
              <div className="text-gray-600 text-[10px] italic">{exp.company} | {exp.years}</div>
            </div>
          ))}
        </div>
        
        <div>
          <div className="font-bold text-gray-800 text-[10px] tracking-wider mb-1">CORE COMPETENCIES</div>
          <div className="grid grid-cols-2 gap-0.5">
            {template.preview.skills.slice(0, 4).map((skill: string | number | bigint | boolean | React.ReactElement<unknown, string | React.JSXElementConstructor<any>> | Iterable<React.ReactNode> | React.ReactPortal | Promise<string | number | bigint | boolean | React.ReactPortal | React.ReactElement<unknown, string | React.JSXElementConstructor<any>> | Iterable<React.ReactNode> | null | undefined> | null | undefined, idx: React.Key | null | undefined) => (
              <div key={idx} className="text-[10px] text-gray-700">▪ {skill}</div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  // Creative Designer Template
  if (template.id === 'creative-designer') {
    return (
      <div className={`${baseStyles} bg-gradient-to-br from-purple-50 to-pink-50 p-4`}>
        <div className="text-center mb-3">
          <div className="font-bold text-lg text-purple-800">{template.preview.name}</div>
          <div className="text-pink-600 font-medium">{template.preview.title}</div>
          <div className="w-full h-1 bg-gradient-to-r from-purple-400 to-pink-400 my-1 rounded"></div>
          <div className="text-gray-600 text-[10px]">{template.preview.location}</div>
        </div>
        
        <div className="grid grid-cols-2 gap-2 mb-3">
          <div>
            <div className="font-semibold text-purple-700 text-[10px] mb-1">ABOUT</div>
            <div className="text-gray-700 text-[10px]">{template.preview.summary.substring(0, 50)}...</div>
          </div>
          <div>
            <div className="font-semibold text-pink-700 text-[10px] mb-1">CONTACT</div>
            <div className="text-gray-600 text-[10px]">{template.preview.email}</div>
          </div>
        </div>
        
        <div className="mb-3">
          <div className="font-semibold text-purple-700 text-[10px] mb-1">EXPERIENCE</div>
          {template.preview.experience.slice(0, 2).map((exp: { title: string | number | bigint | boolean | React.ReactElement<unknown, string | React.JSXElementConstructor<any>> | Iterable<React.ReactNode> | React.ReactPortal | Promise<string | number | bigint | boolean | React.ReactPortal | React.ReactElement<unknown, string | React.JSXElementConstructor<any>> | Iterable<React.ReactNode> | null | undefined> | null | undefined; company: string | number | bigint | boolean | React.ReactElement<unknown, string | React.JSXElementConstructor<any>> | Iterable<React.ReactNode> | React.ReactPortal | Promise<string | number | bigint | boolean | React.ReactPortal | React.ReactElement<unknown, string | React.JSXElementConstructor<any>> | Iterable<React.ReactNode> | null | undefined> | null | undefined; }, idx: React.Key | null | undefined) => (
            <div key={idx} className="mb-1.5">
              <div className="font-medium text-[10px] text-purple-800">{exp.title}</div>
              <div className="text-pink-600 text-[10px]">{exp.company}</div>
            </div>
          ))}
        </div>
        
        <div>
          <div className="font-semibold text-purple-700 text-[10px] mb-1">SKILLS</div>
          <div className="flex flex-wrap gap-1">
            {template.preview.skills.slice(0, 4).map((skill: string | number | bigint | boolean | React.ReactElement<unknown, string | React.JSXElementConstructor<any>> | Iterable<React.ReactNode> | React.ReactPortal | Promise<string | number | bigint | boolean | React.ReactPortal | React.ReactElement<unknown, string | React.JSXElementConstructor<any>> | Iterable<React.ReactNode> | null | undefined> | null | undefined, idx: React.Key | null | undefined) => (
              <span key={idx} className="text-[10px] px-1.5 py-0.5 bg-purple-100 text-purple-700 rounded">
                {skill}
              </span>
            ))}
          </div>
        </div>
      </div>
    );
  }

  // Data Science Expert Template
  if (template.id === 'data-scientist') {
    return (
      <div className={`${baseStyles} bg-white text-gray-900 p-4`}>
        <div className="mb-3 border-l-4 border-teal-500 pl-3">
          <div className="font-bold text-lg text-teal-800">{template.preview.name}</div>
          <div className="text-teal-600 font-medium">{template.preview.title}</div>
          <div className="text-gray-500 text-[10px]">{template.preview.location} • {template.preview.phone}</div>
        </div>
        
        <div className="grid grid-cols-5 gap-2 mb-3">
          <div className="col-span-3">
            <div className="font-semibold text-teal-700 text-[10px] mb-1">PROFILE</div>
            <div className="text-gray-700 text-[10px]">{template.preview.summary.substring(0, 60)}...</div>
          </div>
          <div className="col-span-2">
            <div className="font-semibold text-teal-700 text-[10px] mb-1">TECH STACK</div>
            {template.preview.skills.slice(0, 3).map((skill: string | number | bigint | boolean | React.ReactElement<unknown, string | React.JSXElementConstructor<any>> | Iterable<React.ReactNode> | React.ReactPortal | Promise<string | number | bigint | boolean | React.ReactPortal | React.ReactElement<unknown, string | React.JSXElementConstructor<any>> | Iterable<React.ReactNode> | null | undefined> | null | undefined, idx: React.Key | null | undefined) => (
              <div key={idx} className="text-[10px] text-gray-600">▶ {skill}</div>
            ))}
          </div>
        </div>
        
        <div className="mb-3">
          <div className="font-semibold text-teal-700 text-[10px] mb-1 flex items-center">
            <span className="w-2 h-2 bg-teal-500 rounded-full mr-1"></span>
            EXPERIENCE
          </div>
          {template.preview.experience.slice(0, 2).map((exp: { title: string | number | bigint | boolean | React.ReactElement<unknown, string | React.JSXElementConstructor<any>> | Iterable<React.ReactNode> | React.ReactPortal | Promise<string | number | bigint | boolean | React.ReactPortal | React.ReactElement<unknown, string | React.JSXElementConstructor<any>> | Iterable<React.ReactNode> | null | undefined> | null | undefined; company: string | number | bigint | boolean | React.ReactElement<unknown, string | React.JSXElementConstructor<any>> | Iterable<React.ReactNode> | React.ReactPortal | Promise<string | number | bigint | boolean | React.ReactPortal | React.ReactElement<unknown, string | React.JSXElementConstructor<any>> | Iterable<React.ReactNode> | null | undefined> | null | undefined; years: string | number | bigint | boolean | React.ReactElement<unknown, string | React.JSXElementConstructor<any>> | Iterable<React.ReactNode> | React.ReactPortal | Promise<string | number | bigint | boolean | React.ReactPortal | React.ReactElement<unknown, string | React.JSXElementConstructor<any>> | Iterable<React.ReactNode> | null | undefined> | null | undefined; }, idx: React.Key | null | undefined) => (
            <div key={idx} className="mb-1.5 ml-3">
              <div className="font-medium text-[10px] text-teal-800">{exp.title}</div>
              <div className="text-gray-600 text-[10px]">{exp.company} | {exp.years}</div>
            </div>
          ))}
        </div>
        
        <div className="bg-teal-50 p-2 rounded">
          <div className="font-semibold text-teal-700 text-[10px] mb-1">KEY TECHNOLOGIES</div>
          <div className="flex flex-wrap gap-1">
            {template.preview.skills.slice(0, 4).map((skill: string | number | bigint | boolean | React.ReactElement<unknown, string | React.JSXElementConstructor<any>> | Iterable<React.ReactNode> | React.ReactPortal | Promise<string | number | bigint | boolean | React.ReactPortal | React.ReactElement<unknown, string | React.JSXElementConstructor<any>> | Iterable<React.ReactNode> | null | undefined> | null | undefined, idx: React.Key | null | undefined) => (
              <span key={idx} className="text-[10px] px-1 py-0.5 bg-teal-100 text-teal-700 rounded">
                {skill}
              </span>
            ))}
          </div>
        </div>
      </div>
    );
  }

  // Healthcare Professional Template
  if (template.id === 'healthcare-hero') {
    return (
      <div className={`${baseStyles} bg-white text-gray-900 p-4`}>
        <div className="text-center mb-3 border-b border-blue-300 pb-2">
          <div className="font-bold text-lg text-blue-900">{template.preview.name}</div>
          <div className="text-blue-600 font-medium">{template.preview.title}</div>
          <div className="text-blue-500 text-[10px]">Licensed Healthcare Professional</div>
          <div className="text-gray-600 text-[10px]">{template.preview.location} • {template.preview.phone}</div>
        </div>
        
        <div className="mb-3">
          <div className="font-semibold text-blue-800 text-[10px] mb-1 bg-blue-50 p-1 rounded">PROFESSIONAL SUMMARY</div>
          <div className="text-gray-700 text-[10px]">{template.preview.summary.substring(0, 70)}...</div>
        </div>
        
        <div className="mb-3">
          <div className="font-semibold text-blue-800 text-[10px] mb-1 bg-blue-50 p-1 rounded">CLINICAL EXPERIENCE</div>
          {template.preview.experience.slice(0, 2).map((exp: { title: string | number | bigint | boolean | React.ReactElement<unknown, string | React.JSXElementConstructor<any>> | Iterable<React.ReactNode> | React.ReactPortal | Promise<string | number | bigint | boolean | React.ReactPortal | React.ReactElement<unknown, string | React.JSXElementConstructor<any>> | Iterable<React.ReactNode> | null | undefined> | null | undefined; company: string | number | bigint | boolean | React.ReactElement<unknown, string | React.JSXElementConstructor<any>> | Iterable<React.ReactNode> | React.ReactPortal | Promise<string | number | bigint | boolean | React.ReactPortal | React.ReactElement<unknown, string | React.JSXElementConstructor<any>> | Iterable<React.ReactNode> | null | undefined> | null | undefined; years: string | number | bigint | boolean | React.ReactElement<unknown, string | React.JSXElementConstructor<any>> | Iterable<React.ReactNode> | React.ReactPortal | Promise<string | number | bigint | boolean | React.ReactPortal | React.ReactElement<unknown, string | React.JSXElementConstructor<any>> | Iterable<React.ReactNode> | null | undefined> | null | undefined; }, idx: React.Key | null | undefined) => (
            <div key={idx} className="mb-1.5 border-l-2 border-blue-200 pl-2">
              <div className="font-medium text-[10px] text-blue-900">{exp.title}</div>
              <div className="text-gray-600 text-[10px]">{exp.company} • {exp.years}</div>
            </div>
          ))}
        </div>
        
        <div>
          <div className="font-semibold text-blue-800 text-[10px] mb-1 bg-blue-50 p-1 rounded">CORE COMPETENCIES</div>
          <div className="grid grid-cols-2 gap-1">
            {template.preview.skills.slice(0, 4).map((skill: string | number | bigint | boolean | React.ReactElement<unknown, string | React.JSXElementConstructor<any>> | Iterable<React.ReactNode> | React.ReactPortal | Promise<string | number | bigint | boolean | React.ReactPortal | React.ReactElement<unknown, string | React.JSXElementConstructor<any>> | Iterable<React.ReactNode> | null | undefined> | null | undefined, idx: React.Key | null | undefined) => (
              <div key={idx} className="text-[10px] text-gray-700 flex items-center">
                <span className="w-1 h-1 bg-blue-500 rounded-full mr-1"></span>
                {skill}
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  // Healthcare Professional Template
  if (template.id === 'healthcare-hero') {
    return (
      <div className={`${baseStyles} bg-blue-50 text-gray-900 p-4`}>
        <div className="text-center mb-3 border-b border-blue-200 pb-2">
          <div className="font-bold text-lg text-blue-800">{template.preview.name}</div>
          <div className="text-blue-600 font-medium">{template.preview.title}</div>
          <div className="text-gray-600 text-[10px]">{template.preview.location} • {template.preview.phone}</div>
        </div>

        <div className="mb-3">
          <div className="font-semibold text-blue-700 text-[10px] mb-1 flex items-center">
            <span className="w-2 h-2 bg-blue-500 rounded-full mr-1"></span>
            PROFESSIONAL SUMMARY
          </div>
          <div className="text-gray-700 text-[10px] leading-relaxed">{template.preview.summary.substring(0, 80)}...</div>
        </div>

        <div className="mb-3">
          <div className="font-semibold text-blue-700 text-[10px] mb-1 flex items-center">
            <span className="w-2 h-2 bg-blue-500 rounded-full mr-1"></span>
            CLINICAL EXPERIENCE
          </div>
          {template.preview.experience.slice(0, 2).map((exp: any, idx: number) => (
            <div key={idx} className="mb-2 ml-3">
              <div className="font-medium text-[10px] text-blue-800">{exp.title}</div>
              <div className="text-blue-600 text-[10px]">{exp.company} • {exp.years}</div>
            </div>
          ))}
        </div>

        <div>
          <div className="font-semibold text-blue-700 text-[10px] mb-1 flex items-center">
            <span className="w-2 h-2 bg-blue-500 rounded-full mr-1"></span>
            CORE COMPETENCIES
          </div>
          <div className="grid grid-cols-2 gap-1">
            {template.preview.skills.slice(0, 4).map((skill: string | number | bigint | boolean | React.ReactElement<unknown, string | React.JSXElementConstructor<any>> | Iterable<React.ReactNode> | React.ReactPortal | Promise<string | number | bigint | boolean | React.ReactPortal | React.ReactElement<unknown, string | React.JSXElementConstructor<any>> | Iterable<React.ReactNode> | null | undefined> | null | undefined, idx: React.Key | null | undefined) => (
              <div key={idx} className="text-[10px] text-gray-700">+ {skill}</div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  // Sales Professional Template
  if (template.id === 'sales-professional') {
    return (
      <div className={`${baseStyles} bg-gradient-to-br from-green-50 to-emerald-50 p-4`}>
        <div className="mb-3">
          <div className="font-bold text-lg text-green-800">{template.preview.name}</div>
          <div className="text-green-600 font-semibold">{template.preview.title}</div>
          <div className="text-gray-600 text-[10px]">{template.preview.location} • {template.preview.phone}</div>
          <div className="w-full h-1 bg-gradient-to-r from-green-400 to-emerald-400 my-1 rounded"></div>
        </div>

        <div className="mb-3">
          <div className="font-bold text-green-700 text-[10px] mb-1">🎯 SALES PERFORMANCE</div>
          <div className="text-gray-700 text-[10px] leading-relaxed">{template.preview.summary.substring(0, 70)}...</div>
        </div>

        <div className="mb-3">
          <div className="font-bold text-green-700 text-[10px] mb-1">💼 EXPERIENCE</div>
          {template.preview.experience.slice(0, 2).map((exp: { title: string | number | bigint | boolean | React.ReactElement<unknown, string | React.JSXElementConstructor<any>> | Iterable<React.ReactNode> | React.ReactPortal | Promise<string | number | bigint | boolean | React.ReactPortal | React.ReactElement<unknown, string | React.JSXElementConstructor<any>> | Iterable<React.ReactNode> | null | undefined> | null | undefined; company: string | number | bigint | boolean | React.ReactElement<unknown, string | React.JSXElementConstructor<any>> | Iterable<React.ReactNode> | React.ReactPortal | Promise<string | number | bigint | boolean | React.ReactPortal | React.ReactElement<unknown, string | React.JSXElementConstructor<any>> | Iterable<React.ReactNode> | null | undefined> | null | undefined; years: string | number | bigint | boolean | React.ReactElement<unknown, string | React.JSXElementConstructor<any>> | Iterable<React.ReactNode> | React.ReactPortal | Promise<string | number | bigint | boolean | React.ReactPortal | React.ReactElement<unknown, string | React.JSXElementConstructor<any>> | Iterable<React.ReactNode> | null | undefined> | null | undefined; }, idx: React.Key | null | undefined) => (
            <div key={idx} className="mb-2">
              <div className="font-medium text-[10px] text-green-800">{exp.title}</div>
              <div className="text-green-600 text-[10px]">{exp.company} | {exp.years}</div>
            </div>
          ))}
        </div>

        <div>
          <div className="font-bold text-green-700 text-[10px] mb-1">⚡ KEY SKILLS</div>
          <div className="flex flex-wrap gap-1">
            {template.preview.skills.slice(0, 4).map((skill: string | number | bigint | boolean | React.ReactElement<unknown, string | React.JSXElementConstructor<any>> | Iterable<React.ReactNode> | React.ReactPortal | Promise<string | number | bigint | boolean | React.ReactPortal | React.ReactElement<unknown, string | React.JSXElementConstructor<any>> | Iterable<React.ReactNode> | null | undefined> | null | undefined, idx: React.Key | null | undefined) => (
              <span key={idx} className="text-[8px] px-1.5 py-0.5 bg-green-100 text-green-700 rounded-full">
                {skill}
              </span>
            ))}
          </div>
        </div>
      </div>
    );
  }

  // Default template (fallback)
  return (
    <div className={`${baseStyles} bg-white text-gray-900 p-4`}>
      <div className="text-center mb-3">
        <div className="font-bold text-sm">{template.preview.name}</div>
        <div className="text-gray-600 text-xs">{template.preview.title}</div>
        <div className="text-gray-500 text-[10px] mt-0.5">
          {template.preview.location} • {template.preview.phone}
        </div>
      </div>
      
      <div className="mb-3">
        <div className="font-semibold text-[10px] uppercase tracking-wide mb-1">Summary</div>
        <div className="text-gray-700 text-[10px] leading-relaxed">
          {template.preview.summary.substring(0, 60)}...
        </div>
      </div>
      
      <div className="mb-3">
        <div className="font-semibold text-[10px] uppercase tracking-wide mb-1">Experience</div>
        {template.preview.experience.slice(0, 2).map((exp: { title: string | number | bigint | boolean | React.ReactElement<unknown, string | React.JSXElementConstructor<any>> | Iterable<React.ReactNode> | React.ReactPortal | Promise<string | number | bigint | boolean | React.ReactPortal | React.ReactElement<unknown, string | React.JSXElementConstructor<any>> | Iterable<React.ReactNode> | null | undefined> | null | undefined; company: string | number | bigint | boolean | React.ReactElement<unknown, string | React.JSXElementConstructor<any>> | Iterable<React.ReactNode> | React.ReactPortal | Promise<string | number | bigint | boolean | React.ReactPortal | React.ReactElement<unknown, string | React.JSXElementConstructor<any>> | Iterable<React.ReactNode> | null | undefined> | null | undefined; years: string | number | bigint | boolean | React.ReactElement<unknown, string | React.JSXElementConstructor<any>> | Iterable<React.ReactNode> | React.ReactPortal | Promise<string | number | bigint | boolean | React.ReactPortal | React.ReactElement<unknown, string | React.JSXElementConstructor<any>> | Iterable<React.ReactNode> | null | undefined> | null | undefined; }, idx: React.Key | null | undefined) => (
          <div key={idx} className="mb-1.5">
            <div className="font-medium text-[10px]">{exp.title}</div>
            <div className="text-gray-600 text-[10px]">{exp.company} • {exp.years}</div>
          </div>
        ))}
      </div>
      
      <div>
        <div className="font-semibold text-[10px] uppercase tracking-wide mb-1">Skills</div>
        <div className="flex flex-wrap gap-1">
          {template.preview.skills.slice(0, 4).map((skill: string | number | bigint | boolean | React.ReactElement<unknown, string | React.JSXElementConstructor<any>> | Iterable<React.ReactNode> | React.ReactPortal | Promise<string | number | bigint | boolean | React.ReactPortal | React.ReactElement<unknown, string | React.JSXElementConstructor<any>> | Iterable<React.ReactNode> | null | undefined> | null | undefined, idx: React.Key | null | undefined) => (
            <span key={idx} className="text-[10px] px-1.5 py-0.5 bg-gray-100 rounded text-gray-700">
              {skill}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
};

// Replace the existing ResumePreview component with this new EnhancedResumePreview

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-950 via-gray-900 to-black relative">
      {/* UnifiedNavigation */}
      < UnifiedNavigation />

      {/* Premium Banner for Non-Premium Users - Top of Page */}
      {!isPremium && (
        <section className="py-6 px-6">
          <div className="max-w-5xl mx-auto">
            <PremiumUpgradeBanner />
          </div>
        </section>
      )}

      {/* Background Logo - Large and Faded */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] opacity-5">
          <img src="/horse-logo.png" alt="" className="w-full h-full object-contain" />
        </div>
      </div>

      {/* Hero Section */}
      <section className="relative pt-24 pb-16 px-6 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-teal-900/20 via-amber-900/20 to-pink-900/20 opacity-50"></div>
        <div className="relative max-w-6xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-teal-900/50 border border-teal-700/50 rounded-full mb-6">
            <Shield className="w-4 h-4 text-teal-400" />
            <span className="text-sm font-medium text-teal-300">All Templates Pass 98.4% of ATS Systems</span>
          </div>
          
          <h1 className="text-5xl font-bold text-white mb-4">
            Choose Your Perfect
            <span className="block mt-2 bg-gradient-to-r from-teal-400 to-amber-400 bg-clip-text text-transparent">
              ATS-Beating Template
            </span>
          </h1>
          
          <p className="text-xl text-gray-400 mb-8 max-w-3xl mx-auto">
            Professional templates designed to pass ATS filters and impress recruiters. 
            Each template is tested against Workday, Taleo, iCIMS, and 50+ ATS systems.
          </p>

          <div className="grid grid-cols-3 gap-8 max-w-2xl mx-auto">
            <div className="text-center">
              <div className="text-3xl font-bold text-teal-400 mb-1">98%</div>
              <div className="text-sm text-gray-500">ATS Pass Rate</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-amber-400 mb-1">21+</div>
              <div className="text-sm text-gray-500">Job-Specific Templates</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-green-400 mb-1">3x</div>
              <div className="text-sm text-gray-500">More Interviews</div>
            </div>
          </div>


        </div>
      </section>

      {/* Category Filter */}
      <section className="sticky top-[73px] z-20 bg-gray-900/90 backdrop-blur-md border-b border-gray-800 py-4 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="flex items-center gap-4 overflow-x-auto pb-2">
            {categories.map((category) => (
              <button
                key={category.id}
                onClick={() => setSelectedCategory(category.id)}
                className={`flex items-center gap-2 px-4 py-2 rounded-xl font-medium whitespace-nowrap transition-all duration-200 ${
                  selectedCategory === category.id
                    ? 'bg-gradient-to-r from-teal-600 to-amber-600 text-white shadow-lg'
                    : 'bg-gray-800 text-gray-300 hover:bg-gray-700 border border-gray-700'
                }`}
              >
                {category.icon}
                {category.name}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Templates Grid */}
      <section className="py-12 px-6">
        <div className="max-w-6xl mx-auto">


          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredTemplates.map((template) => (
              <div
                key={template.id}
                className={`group relative rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden ${
                  template.isPremium
                    ? 'bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 border-2 border-gradient-to-r from-amber-400 to-orange-400 hover:border-amber-300 hover:shadow-amber-400/20'
                    : 'bg-gray-900 border border-gray-800'
                }`}
                onMouseEnter={() => setHoveredTemplate(template.id)}
                onMouseLeave={() => setHoveredTemplate(null)}
              >
                {/* Premium Glow Effect */}
                {template.isPremium && (
                  <div className="absolute inset-0 bg-gradient-to-r from-amber-400/10 via-orange-400/5 to-amber-400/10 pointer-events-none"></div>
                )}

                {/* Premium Badge */}
                {template.isPremium && (
                  <div className="absolute top-4 right-4 z-10">
                    <div className="bg-gradient-to-r from-amber-400 to-orange-400 text-gray-900 px-4 py-2 rounded-full text-sm font-bold flex items-center gap-2 shadow-lg">
                      <Crown className="w-4 h-4" />
                      PREMIUM
                    </div>
                  </div>
                )}

                {/* Premium Corner Accent */}
                {template.isPremium && (
                  <div className="absolute top-0 left-0 w-16 h-16 overflow-hidden">
                    <div className="absolute top-0 left-0 w-0 h-0 border-l-16 border-t-16 border-l-transparent border-t-amber-400 opacity-80"></div>
                  </div>
                )}

                {/* Popularity Badge */}
                {template.popularityRank <= 3 && (
                  <div className="absolute top-4 left-4 z-10">
                    <div className="bg-red-500 text-white px-3 py-1 rounded-full text-xs font-bold flex items-center gap-1">
                      <TrendingUp className="w-3 h-3" />
                      Popular
                    </div>
                  </div>
                )}

                {/* Template Preview */}
                <div 
                  className="h-64 relative overflow-hidden cursor-pointer bg-gray-800"
                  onClick={() => setShowPreview(template)}
                >
                  <div className="absolute inset-0 flex items-center justify-center p-6">
                    <div className="w-full max-w-[200px] h-full bg-white rounded-lg shadow-xl transform transition-transform duration-300"
                      style={{ 
                        transform: hoveredTemplate === template.id ? 'scale(1.05) rotate(-1deg)' : 'scale(1)'
                      }}
                    >
                      <EnhancedResumePreview template={template} />
                    </div>
                  </div>

                  {/* Hover Overlay */}
                  <div className={`absolute inset-0 bg-black/60 flex items-center justify-center transition-opacity duration-300 ${
                    hoveredTemplate === template.id ? 'opacity-100' : 'opacity-0'
                  }`}>
                    <button className="bg-white text-gray-900 px-6 py-3 rounded-xl font-semibold flex items-center gap-2 transform hover:scale-105 transition-transform">
                      <Eye className="w-5 h-5" />
                      Preview Template
                    </button>
                  </div>
                </div>

                {/* Template Info */}
                <div className={`p-6 ${template.isPremium ? 'bg-gradient-to-b from-gray-800/50 to-gray-900/50' : ''}`}>
                  <div className="flex items-start justify-between mb-3">
                    <div>
                      <h3 className={`text-xl font-bold mb-1 ${template.isPremium ? 'text-amber-100' : 'text-white'}`}>
                        {template.name}
                        {template.isPremium && <span className="ml-2 text-amber-400">✨</span>}
                      </h3>
                      <p className={`text-sm ${template.isPremium ? 'text-amber-200/80' : 'text-gray-400'}`}>
                        {template.description}
                      </p>
                    </div>
                  </div>

                  {/* Enhanced Stats for Premium */}
                  <div className={`grid grid-cols-3 gap-3 mb-4 ${template.isPremium ? 'bg-amber-400/10 rounded-lg p-3 border border-amber-400/20' : ''}`}>
                    <div className="text-center">
                      <div className={`text-sm font-bold ${template.isPremium ? 'text-amber-300' : 'text-white'}`}>
                        {template.atsScore}%
                      </div>
                      <div className={`text-xs ${template.isPremium ? 'text-amber-200/70' : 'text-gray-500'}`}>
                        ATS Score
                      </div>
                    </div>
                    <div className="text-center">
                      <div className="flex items-center justify-center gap-1">
                        <Star className={`w-3 h-3 fill-amber-400 ${template.isPremium ? 'text-amber-300' : 'text-amber-400'}`} />
                        <span className={`text-sm font-bold ${template.isPremium ? 'text-amber-300' : 'text-white'}`}>
                          {template.rating}
                        </span>
                      </div>
                      <div className={`text-xs ${template.isPremium ? 'text-amber-200/70' : 'text-gray-500'}`}>
                        Rating
                      </div>
                    </div>
                    <div className="text-center">
                      <div className={`text-sm font-bold ${template.isPremium ? 'text-amber-300' : 'text-white'}`}>
                        {(template.downloads / 1000).toFixed(1)}k
                      </div>
                      <div className={`text-xs ${template.isPremium ? 'text-amber-200/70' : 'text-gray-500'}`}>
                        Uses
                      </div>
                    </div>
                  </div>

                  {/* Enhanced Features for Premium */}
                  <div className="flex flex-wrap gap-2 mb-4">
                    {template.features.slice(0, 3).map((feature, idx) => (
                      <span
                        key={idx}
                        className={`text-xs px-3 py-1.5 rounded-full border font-medium ${
                          template.isPremium
                            ? 'bg-amber-400/20 text-amber-200 border-amber-400/30'
                            : 'bg-gray-800 text-gray-300 border-gray-700'
                        }`}
                      >
                        {template.isPremium && '✨ '}{feature}
                      </span>
                    ))}
                  </div>

                  {/* Premium Value Proposition */}
                  {template.isPremium && (
                    <div className="mb-4 p-3 bg-amber-400/10 rounded-lg border border-amber-400/20">
                      <div className="flex items-center gap-2 text-amber-300 text-sm font-medium">
                        <Crown className="w-4 h-4" />
                        Premium Benefits
                      </div>
                      <div className="text-xs text-amber-200/80 mt-1">
                        AI-optimized • Advanced layouts • Priority support
                      </div>
                    </div>
                  )}

                  {/* Enhanced Action Button */}
                  <button
                    onClick={() => {
                      if (template.isPremium && !isPremium) {
                        // Redirect to pricing for premium templates if user is not premium
                        window.location.href = '/pricing';
                      } else {
                        // Navigate to builder with template
                        window.location.href = `/builder?template=${template.id}`;
                      }
                    }}
                    className={`w-full py-4 rounded-xl font-bold transition-all duration-200 flex items-center justify-center gap-2 text-lg ${
                      template.isPremium
                        ? 'bg-gradient-to-r from-amber-400 via-orange-400 to-amber-400 text-gray-900 hover:shadow-xl hover:shadow-amber-400/25 transform hover:scale-[1.02]'
                        : 'bg-gradient-to-r from-teal-600 to-amber-600 text-white hover:shadow-lg'
                    }`}
                  >
                    {template.isPremium && !isPremium ? (
                      <>
                        <Crown className="w-5 h-5" />
                        Upgrade for $19.99/mo
                      </>
                    ) : (
                      <>
                        {template.isPremium && <Crown className="w-5 h-5" />}
                        Use Template
                        <ArrowRight className="w-5 h-5" />
                      </>
                    )}
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>



      {/* CTA Section */}
      <section className="py-16 px-6 bg-gradient-to-br from-teal-900/20 to-amber-900/20">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold text-white mb-4">
            Can't Find the Perfect Template?
          </h2>
          <p className="text-xl text-gray-300 mb-6">
            Start with our smart builder and create a custom ATS-optimized resume
          </p>
          <button 
            onClick={() => window.location.href = '/builder'}
            className="bg-gradient-to-r from-teal-600 to-amber-600 text-white px-8 py-4 rounded-xl font-semibold hover:shadow-lg transform hover:scale-105 transition-all duration-200 flex items-center gap-2 mx-auto"
          >
            <Zap className="w-5 h-5" />
            Start Smart Builder
            <ArrowRight className="w-5 h-5" />
          </button>
        </div>
      </section>

      {/* Template Preview Modal */}
      <TemplatePreviewModal 
        template={showPreview} 
        onClose={() => setShowPreview(null)} 
      />
    </div>
  );
};

export default EnhancedTemplatesPage;
