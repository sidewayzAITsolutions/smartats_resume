export interface Template {
  industries: string[]; // Changed from 'any' to 'string[]'
  targetAudience: string[]; // Changed from 'any' to 'string[]'
  id: string;
  name: string;
  description: string;
  category: 'basic' | 'modern' | 'creative' | 'professional' | 'minimalist';
  atsScore: number;
  isPremium: boolean;
  previewImage: string;
  features: string[];
}

export const TEMPLATE_CATEGORIES = [
  { id: 'all', label: 'All Templates' },
  { id: 'basic', label: 'Basic' },
  { id: 'modern', label: 'Modern' },
  { id: 'creative', label: 'Creative' },
  { id: 'professional', label: 'Professional' },
  { id: 'minimalist', label: 'Minimalist' }
];

export const TEMPLATE_LIBRARY: Template[] = [
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
  
