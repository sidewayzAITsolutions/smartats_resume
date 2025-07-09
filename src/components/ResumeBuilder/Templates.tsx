import React, { useState } from 'react';
import { Crown, Shield, Target, Zap, CheckCircle, Star, ArrowRight, Filter } from 'lucide-react';

// Template interface and data
interface Template {
  industries: string[];
  targetAudience: string[];
  id: string;
  name: string;
  description: string;
  category: 'basic' | 'modern' | 'creative' | 'professional' | 'minimalist';
  atsScore: number;
  isPremium: boolean;
  previewImage: string;
  features: string[];
}

const TEMPLATE_CATEGORIES = [
  { id: 'all', label: 'All Templates' },
  { id: 'basic', label: 'Basic' },
  { id: 'modern', label: 'Modern' },
  { id: 'creative', label: 'Creative' },
  { id: 'professional', label: 'Professional' },
  { id: 'minimalist', label: 'Minimalist' }
];

const TEMPLATE_LIBRARY: Template[] = [
  {
    id: 'basic-clean',
    name: 'Basic Clean',
    description: 'Simple, ATS-friendly layout perfect for any industry',
    category: 'basic',
    atsScore: 95,
    isPremium: false,
    previewImage: '/templates/basic-clean.png',
    features: ['ATS Optimized', 'Single Column', 'Clean Typography', 'Easy to Edit'],
    industries: ['Technology', 'Finance', 'Healthcare', 'Education', 'Retail', 'Manufacturing'],
    targetAudience: ['Entry-Level', 'Professional', 'Career Changer']
  },
  {
    id: 'modern-professional',
    name: 'Modern Professional',
    description: 'Contemporary design with strategic color accents',
    category: 'modern',
    atsScore: 92,
    isPremium: false,
    previewImage: '/templates/modern-professional.png',
    features: ['Two Column', 'Color Accents', 'Modern Layout', 'Skills Highlight'],
    industries: ['Technology', 'Marketing', 'Consulting', 'Finance', 'Media'],
    targetAudience: ['Professional', 'Mid-Level', 'Senior']
  },
  {
    id: 'creative-designer',
    name: 'Creative Designer',
    description: 'Stand out template for creative professionals',
    category: 'creative',
    atsScore: 88,
    isPremium: true,
    previewImage: '/templates/creative-designer.png',
    features: ['Visual Elements', 'Creative Layout', 'Portfolio Focused', 'Color Customization'],
    industries: ['Design', 'Marketing', 'Media', 'Entertainment', 'Advertising'],
    targetAudience: ['Creative Professional', 'Designer', 'Artist']
  },
  {
    id: 'executive-premium',
    name: 'Executive Premium',
    description: 'Sophisticated design for senior-level positions',
    category: 'professional',
    atsScore: 94,
    isPremium: true,
    previewImage: '/templates/executive-premium.png',
    features: ['Executive Style', 'Premium Typography', 'Leadership Focused', 'Achievement Emphasis'],
    industries: ['Finance', 'Consulting', 'Technology', 'Healthcare', 'Manufacturing'],
    targetAudience: ['Executive', 'Senior', 'C-Level']
  },
  {
    id: 'tech-minimal',
    name: 'Tech Minimal',
    description: 'Streamlined design optimized for tech roles',
    category: 'modern',
    atsScore: 96,
    isPremium: false,
    previewImage: '/templates/tech-minimal.png',
    features: ['Tech Optimized', 'Minimal Design', 'Skills Focused', 'GitHub Integration'],
    industries: ['Technology', 'Software', 'Engineering', 'Data Science', 'Cybersecurity'],
    targetAudience: ['Developer', 'Engineer', 'Technical Professional']
  },
  {
    id: 'minimalist-elegant',
    name: 'Minimalist Elegant',
    description: 'Clean, sophisticated design with maximum readability',
    category: 'minimalist',
    atsScore: 97,
    isPremium: false,
    previewImage: '/templates/minimalist-elegant.png',
    features: ['Ultra Clean', 'Maximum ATS Score', 'Elegant Typography', 'White Space Optimized'],
    industries: ['Law', 'Finance', 'Consulting', 'Academia', 'Government'],
    targetAudience: ['Professional', 'Academic', 'Legal Professional']
  },
  {
    id: 'sales-impact',
    name: 'Sales Impact',
    description: 'Results-driven template highlighting achievements and metrics',
    category: 'professional',
    atsScore: 93,
    isPremium: true,
    previewImage: '/templates/sales-impact.png',
    features: ['Metrics Focused', 'Achievement Highlights', 'Results Emphasis', 'Performance Tracking'],
    industries: ['Sales', 'Marketing', 'Business Development', 'Real Estate', 'Insurance'],
    targetAudience: ['Sales Professional', 'Account Manager', 'Business Developer']
  },
  {
    id: 'healthcare-professional',
    name: 'Healthcare Professional',
    description: 'Specialized template for medical and healthcare professionals',
    category: 'professional',
    atsScore: 95,
    isPremium: false,
    previewImage: '/templates/healthcare-professional.png',
    features: ['Medical Focused', 'Certification Emphasis', 'Clean Layout', 'Professional Standards'],
    industries: ['Healthcare', 'Medical', 'Nursing', 'Pharmacy', 'Therapy'],
    targetAudience: ['Healthcare Professional', 'Medical Professional', 'Nurse']
  },
  {
    id: 'startup-innovator',
    name: 'Startup Innovator',
    description: 'Dynamic template for entrepreneurs and startup professionals',
    category: 'creative',
    atsScore: 89,
    isPremium: true,
    previewImage: '/templates/startup-innovator.png',
    features: ['Innovation Focus', 'Project Highlights', 'Startup Experience', 'Growth Metrics'],
    industries: ['Startups', 'Technology', 'Innovation', 'Venture Capital', 'Product Management'],
    targetAudience: ['Entrepreneur', 'Startup Professional', 'Product Manager']
  },
  {
    id: 'academic-researcher',
    name: 'Academic Researcher',
    description: 'Comprehensive template for academic and research positions',
    category: 'basic',
    atsScore: 96,
    isPremium: false,
    previewImage: '/templates/academic-researcher.png',
    features: ['Publication Focus', 'Research Emphasis', 'Academic Format', 'Citation Ready'],
    industries: ['Academia', 'Research', 'Education', 'Science', 'Government'],
    targetAudience: ['Academic', 'Researcher', 'Professor']
  }
];

// Mock resume template preview component
const TemplatePreview = ({ template }: { template: Template }) => {
  const getTemplatePreview = (templateId: string) => {
    const baseStyles = "w-full h-full p-4 text-xs font-mono";
    
    switch (templateId) {
      case 'basic-clean':
        return (
          <div className={`${baseStyles} bg-white text-gray-800 border border-gray-200`}>
            <div className="text-center mb-3">
              <div className="font-bold text-lg">JOHN DOE</div>
              <div className="text-sm">Software Engineer</div>
              <div className="text-xs text-gray-600">john@email.com | (555) 123-4567</div>
            </div>
            <div className="mb-3">
              <div className="font-semibold border-b border-gray-300 mb-1">SUMMARY</div>
              <div className="text-xs leading-tight">Experienced software engineer with 5+ years...</div>
            </div>
            <div className="mb-3">
              <div className="font-semibold border-b border-gray-300 mb-1">EXPERIENCE</div>
              <div className="text-xs">
                <div className="font-medium">Senior Developer</div>
                <div className="text-gray-600">TechCorp | 2021-Present</div>
              </div>
            </div>
            <div>
              <div className="font-semibold border-b border-gray-300 mb-1">SKILLS</div>
              <div className="text-xs">JavaScript, React, Node.js, Python</div>
            </div>
          </div>
        );
      
      case 'modern-professional':
        return (
          <div className={`${baseStyles} bg-white text-gray-800 flex`}>
            <div className="w-1/3 bg-blue-50 p-2 mr-2">
              <div className="font-bold text-blue-800 mb-2">CONTACT</div>
              <div className="text-xs text-blue-700 mb-2">john@email.com</div>
              <div className="font-bold text-blue-800 mb-2">SKILLS</div>
              <div className="text-xs text-blue-700">JavaScript<br/>React<br/>Node.js</div>
            </div>
            <div className="w-2/3 p-2">
              <div className="font-bold text-2xl text-blue-800">John Doe</div>
              <div className="text-blue-600 mb-2">Software Engineer</div>
              <div className="font-semibold text-blue-800 mb-1">EXPERIENCE</div>
              <div className="text-xs mb-2">
                <div className="font-medium">Senior Developer</div>
                <div className="text-gray-600">TechCorp | 2021-Present</div>
              </div>
            </div>
          </div>
        );
      
      case 'creative-designer':
        return (
          <div className={`${baseStyles} bg-gradient-to-br from-purple-50 to-pink-50 text-gray-800`}>
            <div className="text-center mb-3">
              <div className="font-bold text-2xl text-purple-800">JANE SMITH</div>
              <div className="text-pink-600 font-medium">Creative Designer</div>
              <div className="w-full h-1 bg-gradient-to-r from-purple-400 to-pink-400 my-2"></div>
            </div>
            <div className="grid grid-cols-2 gap-2 text-xs">
              <div>
                <div className="font-semibold text-purple-800 mb-1">PORTFOLIO</div>
                <div className="text-purple-700">◆ Brand Identity<br/>◆ Web Design<br/>◆ Print Design</div>
              </div>
              <div>
                <div className="font-semibold text-pink-800 mb-1">SKILLS</div>
                <div className="text-pink-700">Photoshop<br/>Illustrator<br/>Figma</div>
              </div>
            </div>
          </div>
        );
      
      case 'executive-premium':
        return (
          <div className={`${baseStyles} bg-white text-gray-800 border-l-4 border-gray-800`}>
            <div className="mb-3">
              <div className="font-bold text-xl">MICHAEL JOHNSON</div>
              <div className="text-gray-600 font-medium">Chief Executive Officer</div>
              <div className="w-full h-px bg-gray-400 my-2"></div>
            </div>
            <div className="mb-3">
              <div className="font-semibold text-gray-800 mb-1">EXECUTIVE SUMMARY</div>
              <div className="text-xs leading-tight">Strategic leader with 15+ years executive experience...</div>
            </div>
            <div className="mb-3">
              <div className="font-semibold text-gray-800 mb-1">KEY ACHIEVEMENTS</div>
              <div className="text-xs">
                <div>• Increased revenue by 300%</div>
                <div>• Led team of 200+ employees</div>
              </div>
            </div>
          </div>
        );
      
      case 'tech-minimal':
        return (
          <div className={`${baseStyles} bg-gray-50 text-gray-900 font-mono`}>
            <div className="border-b border-gray-400 pb-2 mb-3">
              <div className="font-bold text-lg">john_doe@dev</div>
              <div className="text-gray-600">$ whoami: Full Stack Developer</div>
            </div>
            <div className="mb-3">
              <div className="text-gray-700 mb-1">~/experience</div>
              <div className="text-xs pl-2">
                <div>└── senior_dev@techcorp</div>
                <div>└── dev@startup</div>
              </div>
            </div>
            <div>
              <div className="text-gray-700 mb-1">~/skills</div>
              <div className="text-xs pl-2">
                <div>├── languages: [js, py, go]</div>
                <div>└── frameworks: [react, node]</div>
              </div>
            </div>
          </div>
        );
      
      case 'minimalist-elegant':
        return (
          <div className={`${baseStyles} bg-white text-gray-800`}>
            <div className="text-center mb-4">
              <div className="font-light text-2xl mb-1">Sarah Williams</div>
              <div className="text-gray-600 text-sm">Legal Professional</div>
              <div className="w-16 h-px bg-gray-400 mx-auto my-2"></div>
            </div>
            <div className="space-y-3">
              <div>
                <div className="font-light text-gray-700 mb-1">Experience</div>
                <div className="text-xs">
                  <div className="font-medium">Senior Attorney</div>
                  <div className="text-gray-600">Law Firm LLP</div>
                </div>
              </div>
              <div>
                <div className="font-light text-gray-700 mb-1">Education</div>
                <div className="text-xs">
                  <div>J.D., Harvard Law School</div>
                </div>
              </div>
            </div>
          </div>
        );
      
      case 'sales-impact':
        return (
          <div className={`${baseStyles} bg-white text-gray-800 border-t-4 border-green-500`}>
            <div className="mb-3">
              <div className="font-bold text-xl text-green-800">ALEX THOMPSON</div>
              <div className="text-green-600 font-medium">Sales Director</div>
            </div>
            <div className="mb-3">
              <div className="font-semibold text-green-800 mb-1">KEY METRICS</div>
              <div className="text-xs grid grid-cols-2 gap-1">
                <div className="bg-green-50 p-1 rounded">
                  <div className="font-bold text-green-800">$2.5M</div>
                  <div className="text-green-600">Revenue</div>
                </div>
                <div className="bg-green-50 p-1 rounded">
                  <div className="font-bold text-green-800">150%</div>
                  <div className="text-green-600">Target</div>
                </div>
              </div>
            </div>
            <div>
              <div className="font-semibold text-green-800 mb-1">ACHIEVEMENTS</div>
              <div className="text-xs">
                <div>• Exceeded quota by 150%</div>
                <div>• Closed 50+ enterprise deals</div>
              </div>
            </div>
          </div>
        );
      
      case 'healthcare-professional':
        return (
          <div className={`${baseStyles} bg-white text-gray-800 border-l-4 border-blue-500`}>
            <div className="mb-3">
              <div className="font-bold text-lg">Dr. Emily Chen, MD</div>
              <div className="text-blue-600">Emergency Medicine Physician</div>
              <div className="text-xs text-gray-600">Board Certified | License #12345</div>
            </div>
            <div className="mb-3">
              <div className="font-semibold text-blue-800 mb-1">CLINICAL EXPERIENCE</div>
              <div className="text-xs">
                <div className="font-medium">Attending Physician</div>
                <div className="text-gray-600">City General Hospital</div>
              </div>
            </div>
            <div>
              <div className="font-semibold text-blue-800 mb-1">CERTIFICATIONS</div>
              <div className="text-xs">
                <div>• Board Certified Emergency Medicine</div>
                <div>• ACLS, PALS, BLS</div>
              </div>
            </div>
          </div>
        );
      
      case 'startup-innovator':
        return (
          <div className={`${baseStyles} bg-gradient-to-r from-orange-50 to-red-50 text-gray-800`}>
            <div className="mb-3">
              <div className="font-bold text-xl text-orange-800">DAVID PARK</div>
              <div className="text-red-600 font-medium">Product Manager & Entrepreneur</div>
              <div className="flex gap-1 mt-1">
                <div className="w-2 h-2 bg-orange-400 rounded-full"></div>
                <div className="w-2 h-2 bg-red-400 rounded-full"></div>
                <div className="w-2 h-2 bg-yellow-400 rounded-full"></div>
              </div>
            </div>
            <div className="mb-3">
              <div className="font-semibold text-orange-800 mb-1">VENTURES</div>
              <div className="text-xs">
                <div>🚀 Co-founded 2 startups</div>
                <div>📈 $5M Series A raised</div>
              </div>
            </div>
            <div>
              <div className="font-semibold text-red-800 mb-1">SKILLS</div>
              <div className="text-xs">Product Strategy • Growth Hacking • Team Building</div>
            </div>
          </div>
        );
      
      case 'academic-researcher':
        return (
          <div className={`${baseStyles} bg-white text-gray-800`}>
            <div className="text-center mb-3">
              <div className="font-bold text-lg">Dr. Robert Martinez, PhD</div>
              <div className="text-gray-600">Research Professor</div>
              <div className="text-xs text-gray-500">Department of Computer Science</div>
            </div>
            <div className="mb-3">
              <div className="font-semibold text-gray-800 mb-1">RESEARCH FOCUS</div>
              <div className="text-xs">Machine Learning, AI Ethics, Data Privacy</div>
            </div>
            <div className="mb-3">
              <div className="font-semibold text-gray-800 mb-1">PUBLICATIONS</div>
              <div className="text-xs">
                <div>• 25+ peer-reviewed papers</div>
                <div>• h-index: 18</div>
              </div>
            </div>
            <div>
              <div className="font-semibold text-gray-800 mb-1">GRANTS</div>
              <div className="text-xs">NSF, NIH, DARPA funding</div>
            </div>
          </div>
        );
      
      default:
        return (
          <div className={`${baseStyles} bg-white text-gray-800 border border-gray-200`}>
            <div className="text-center">
              <div className="font-bold text-lg">Professional Resume</div>
              <div className="text-sm text-gray-600 mt-2">Template Preview</div>
            </div>
          </div>
        );
    }
  };

  return (
    <div className="aspect-[3/4] bg-gray-100 rounded-lg overflow-hidden shadow-sm">
      {getTemplatePreview(template.id)}
    </div>
  );
};

const TemplatePreviewPage = () => {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedTemplate, setSelectedTemplate] = useState<string | null>(null);

  const filteredTemplates = selectedCategory === 'all' 
    ? TEMPLATE_LIBRARY 
    : TEMPLATE_LIBRARY.filter(template => template.category === selectedCategory);

  const getATSScoreColor = (score: number) => {
    if (score >= 95) return 'bg-green-100 text-green-800';
    if (score >= 90) return 'bg-blue-100 text-blue-800';
    if (score >= 85) return 'bg-yellow-100 text-yellow-800';
    return 'bg-red-100 text-red-800';
  };

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'basic': return '📄';
      case 'modern': return '🎨';
      case 'creative': return '✨';
      case 'professional': return '💼';
      case 'minimalist': return '⚡';
      default: return '📋';
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2">
                <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center">
                  <span className="text-sm font-bold text-white">S</span>
                </div>
                <span className="text-xl font-semibold text-gray-900">SmartATS</span>
              </div>
              <div className="text-gray-400">|</div>
              <h1 className="text-lg font-medium text-gray-900">Resume Templates</h1>
            </div>
            <div className="flex items-center space-x-4">
              <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
                Start Building
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="bg-gradient-to-br from-blue-50 to-indigo-100 py-12">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            ATS-Optimized Resume Templates
          </h2>
          <p className="text-lg text-gray-600 mb-6 max-w-2xl mx-auto">
            Choose from our professionally designed templates, all tested and optimized for Applicant Tracking Systems (ATS) to ensure your resume gets noticed.
          </p>
          <div className="flex items-center justify-center space-x-8 text-sm">
            <div className="flex items-center space-x-2">
              <Shield className="w-5 h-5 text-green-600" />
              <span className="text-gray-700">100% ATS Compatible</span>
            </div>
            <div className="flex items-center space-x-2">
              <Target className="w-5 h-5 text-blue-600" />
              <span className="text-gray-700">Industry Tested</span>
            </div>
            <div className="flex items-center space-x-2">
              <Zap className="w-5 h-5 text-purple-600" />
              <span className="text-gray-700">Easy to Customize</span>
            </div>
          </div>
        </div>
      </section>

      {/* Category Filter */}
      <section className="py-8 bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-semibold text-gray-900 flex items-center">
              <Filter className="w-5 h-5 mr-2" />
              Filter by Category
            </h3>
            <div className="text-sm text-gray-600">
              {filteredTemplates.length} template{filteredTemplates.length !== 1 ? 's' : ''} found
            </div>
          </div>
          
          <div className="flex flex-wrap gap-3">
            {TEMPLATE_CATEGORIES.map(category => (
              <button
                key={category.id}
                onClick={() => setSelectedCategory(category.id)}
                className={`px-4 py-2 rounded-lg font-medium transition-all duration-200 flex items-center space-x-2 ${
                  selectedCategory === category.id
                    ? 'bg-blue-600 text-white shadow-lg'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                <span>{getCategoryIcon(category.id)}</span>
                <span>{category.label}</span>
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Templates Grid */}
      <section className="py-12">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredTemplates.map((template) => (
              <div
                key={template.id}
                className={`bg-white rounded-xl shadow-sm border-2 transition-all duration-300 hover:shadow-lg hover:border-blue-200 ${
                  selectedTemplate === template.id
                    ? 'border-blue-500 shadow-lg'
                    : 'border-gray-200'
                }`}
              >
                {/* Template Preview */}
                <div className="p-4">
                  <div className="relative">
                    <TemplatePreview template={template} />
                    
                    {/* Premium Badge */}
                    {template.isPremium && (
                      <div className="absolute top-2 right-2 bg-yellow-400 text-yellow-900 p-1 rounded-full">
                        <Crown className="w-3 h-3" />
                      </div>
                    )}
                    
                    {/* ATS Score Badge */}
                    <div className="absolute top-2 right-2 bg-green-500 text-white px-2 py-1 rounded-full text-xs font-bold">
                      <Shield className="w-3 h-3 inline mr-1" />
                      {template.atsScore}%
                    </div>
                  </div>
                </div>

                {/* Template Info */}
                <div className="p-4 pt-0">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="font-bold text-lg text-gray-900">{template.name}</h3>
                    <div className={`px-2 py-1 rounded-full text-xs font-bold ${getATSScoreColor(template.atsScore)}`}>
                      {template.atsScore}% ATS
                    </div>
                  </div>
                  
                  <p className="text-gray-600 text-sm mb-3 line-clamp-2">{template.description}</p>
                  
                  {/* Category */}
                  <div className="flex items-center space-x-2 mb-3">
                    <span className="text-xs text-gray-500">Category:</span>
                    <span className="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded capitalize">
                      {template.category}
                    </span>
                  </div>

                  {/* Target Audience */}
                  <div className="mb-3">
                    <div className="text-xs text-gray-500 mb-1">Perfect for:</div>
                    <div className="flex flex-wrap gap-1">
                      {template.targetAudience.slice(0, 2).map((audience, index) => (
                        <span key={index} className="px-2 py-1 bg-blue-100 text-blue-700 text-xs rounded">
                          {audience}
                        </span>
                      ))}
                      {template.targetAudience.length > 2 && (
                        <span className="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded">
                          +{template.targetAudience.length - 2}
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Industries */}
                  <div className="mb-4">
                    <div className="text-xs text-gray-500 mb-1">Industries:</div>
                    <div className="flex flex-wrap gap-1">
                      {template.industries.slice(0, 3).map((industry, index) => (
                        <span key={index} className="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded">
                          {industry}
                        </span>
                      ))}
                      {template.industries.length > 3 && (
                        <span className="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded">
                          +{template.industries.length - 3}
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Key Features */}
                  <div className="mb-4">
                    <div className="text-xs text-gray-500 mb-1">Key Features:</div>
                    <div className="space-y-1">
                      {template.features.slice(0, 2).map((feature, index) => (
                        <div key={index} className="flex items-center space-x-2 text-xs text-gray-600">
                          <CheckCircle className="w-3 h-3 text-green-500" />
                          <span>{feature}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Action Button */}
                  <button
                    onClick={() => setSelectedTemplate(template.id)}
                    className={`w-full py-2 px-4 rounded-lg font-medium transition-colors flex items-center justify-center space-x-2 ${
                      selectedTemplate === template.id
                        ? 'bg-blue-600 text-white'
                        : template.isPremium
                        ? 'bg-gradient-to-r from-yellow-400 to-orange-400 text-white hover:from-yellow-500 hover:to-orange-500'
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                  >
                    {selectedTemplate === template.id ? (
                      <>
                        <CheckCircle className="w-4 h-4" />
                        <span>Selected</span>
                      </>
                    ) : (
                      <>
                        <span>
                          {template.isPremium ? 'Choose Pro Template' : 'Choose Template'}
                        </span>
                        <ArrowRight className="w-4 h-4" />
                      </>
                    )}
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Bottom CTA */}
      <section className="bg-gray-900 text-white py-12">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h3 className="text-2xl font-bold mb-4">
            Ready to Build Your ATS-Optimized Resume?
          </h3>
          <p className="text-gray-300 mb-8">
            Choose your template and start building a resume that gets you noticed by both ATS systems and hiring managers.
          </p>
          <div className="grid md:grid-cols-3 gap-6 mb-8">
            <div className="text-center">
              <div className="bg-blue-600 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-3">
                <Shield className="w-6 h-6" />
              </div>
              <div className="font-medium mb-1">ATS-Tested</div>
              <div className="text-sm text-gray-400">Every template tested against real ATS systems</div>
            </div>
            <div className="text-center">
              <div className="bg-green-600 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-3">
                <Target className="w-6 h-6" />
              </div>
              <div className="font-medium mb-1">Industry-Specific</div>
              <div className="text-sm text-gray-400">Tailored for different careers and industries</div>
            </div>
            <div className="text-center">
              <div className="bg-purple-600 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-3">
                <Zap className="w-6 h-6" />
              </div>
              <div className="font-medium mb-1">Easy to Use</div>
              <div className="text-sm text-gray-400">Professional results in minutes, not hours</div>
            </div>
          </div>
          <button className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 px-8 rounded-lg transition-colors">
            Start Building Your Resume
          </button>
        </div>
      </section>
    </div>
  );
};

export default TemplatePreviewPage;

