'use client';

import React from 'react';
import {
  Mail,
  Phone,
  MapPin,
  Globe,
  Linkedin,
  Building2,
  User,
  Calendar,
  Clock,
  Zap,
  BarChart3,
  Users,
  Award,
  TrendingUp,
  Target,
  Star
} from 'lucide-react';

interface BusinessCardProps {
  className?: string;
}

const BusinessCard: React.FC<BusinessCardProps> = ({ className = '' }) => {
  // Business information - you can fill this out with your details
  const businessInfo = {
    // Company Information
    companyName: "SmartATS Enterprise",
    companyTagline: "AI-Powered Resume Optimization & Enterprise Hiring Solutions",

    // Personal Information
    name: "Benjamin Shirley",
    title: "Head of Sales & Partnerships",

    // Contact Information
    email: "enterprise@smartatsresume.com",
    phone: "+1 (225) 301-9908",

    // Location
    address: "551 Marignny Street",
    city: "New Orleans",
    state: "LA",
    zipCode: "70117",
    country: "United States",

    // Online Presence
    website: "https://smartatsresume.com",
    linkedin: "https://www.linkedin.com/in/benjamin-shirley",
    
    // Business Hours
    businessHours: "Monday - Friday: 9:00 AM - 6:00 PM CST",
    timezone: "Central Standard Time",

    // Additional Info
    founded: "2024",

    // Enterprise ROI Stats
    roiStats: {
      fasterHiring: "67%",
      annualSavings: "$2.3M",
      teamSatisfaction: "94%",
      productivityGain: "10x"
    },

    // Enterprise Specialties
    specialties: [
      "AI-Powered Resume Optimization",
      "Bulk Resume Creation & Processing",
      "Advanced Analytics & Reporting",
      "Custom Branding & White-Label Solutions",
      "Dedicated Account Management",
      "24/7 Enterprise Support"
    ]
  };

  return (
    <div className={`max-w-4xl mx-auto ${className}`}>
      {/* Main Business Card */}
      <div className="bg-gradient-to-br from-gray-900 via-gray-800 to-black rounded-2xl p-8 border border-amber-700/30 shadow-2xl">
        {/* Header Section */}
        <div className="flex flex-col lg:flex-row items-start lg:items-center gap-6 mb-8">
          {/* Company Logo/Avatar Placeholder */}
          <div className="w-24 h-24 bg-gradient-to-br from-amber-600 to-amber-700 rounded-xl flex items-center justify-center">
            <Building2 className="w-12 h-12 text-white" />
          </div>
          
          {/* Company & Personal Info */}
          <div className="flex-1">
            <h1 className="text-3xl font-bold text-white mb-2">
              {businessInfo.companyName}
            </h1>
            <p className="text-amber-400 text-lg mb-3">
              {businessInfo.companyTagline}
            </p>
            <div className="flex items-center gap-3 text-white">
              <User className="w-5 h-5 text-amber-400" />
              <span className="font-semibold">{businessInfo.name}</span>
              <span className="text-gray-400">•</span>
              <span className="text-gray-300">{businessInfo.title}</span>
            </div>
          </div>
          
          {/* Founded Badge */}
          <div className="bg-amber-700/20 border border-amber-700/50 rounded-lg px-4 py-2">
            <div className="flex items-center gap-2 text-amber-400">
              <Calendar className="w-4 h-4" />
              <span className="text-sm font-medium">Founded {businessInfo.founded}</span>
            </div>
          </div>
        </div>

        {/* Contact Information Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          {/* Email */}
          <div className="flex items-center gap-3 p-4 bg-gray-800/50 rounded-lg border border-gray-700/50">
            <Mail className="w-5 h-5 text-amber-400" />
            <div>
              <p className="text-gray-400 text-sm">Email</p>
              <a 
                href={`mailto:${businessInfo.email}`}
                className="text-white hover:text-amber-400 transition-colors"
              >
                {businessInfo.email}
              </a>
            </div>
          </div>

          {/* Phone */}
          <div className="flex items-center gap-3 p-4 bg-gray-800/50 rounded-lg border border-gray-700/50">
            <Phone className="w-5 h-5 text-amber-400" />
            <div>
              <p className="text-gray-400 text-sm">Phone</p>
              <a 
                href={`tel:${businessInfo.phone}`}
                className="text-white hover:text-amber-400 transition-colors"
              >
                {businessInfo.phone}
              </a>
            </div>
          </div>

          {/* Location */}
          <div className="flex items-center gap-3 p-4 bg-gray-800/50 rounded-lg border border-gray-700/50">
            <MapPin className="w-5 h-5 text-amber-400" />
            <div>
              <p className="text-gray-400 text-sm">Location</p>
              <p className="text-white">
                {businessInfo.city}, {businessInfo.state}
              </p>
              <p className="text-gray-300 text-sm">{businessInfo.country}</p>
            </div>
          </div>

          {/* Website */}
          <div className="flex items-center gap-3 p-4 bg-gray-800/50 rounded-lg border border-gray-700/50">
            <Globe className="w-5 h-5 text-amber-400" />
            <div>
              <p className="text-gray-400 text-sm">Website</p>
              <a 
                href={businessInfo.website}
                target="_blank"
                rel="noopener noreferrer"
                className="text-white hover:text-amber-400 transition-colors"
              >
                {businessInfo.website.replace('https://', '')}
              </a>
            </div>
          </div>

          {/* LinkedIn */}
          <div className="flex items-center gap-3 p-4 bg-gray-800/50 rounded-lg border border-gray-700/50">
            <Linkedin className="w-5 h-5 text-amber-400" />
            <div>
              <p className="text-gray-400 text-sm">LinkedIn</p>
              <a 
                href={businessInfo.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="text-white hover:text-amber-400 transition-colors"
              >
                View Profile
              </a>
            </div>
          </div>

          {/* Business Hours */}
          <div className="flex items-center gap-3 p-4 bg-gray-800/50 rounded-lg border border-gray-700/50">
            <Clock className="w-5 h-5 text-amber-400" />
            <div>
              <p className="text-gray-400 text-sm">Business Hours</p>
              <p className="text-white text-sm">{businessInfo.businessHours}</p>
              <p className="text-gray-300 text-xs">{businessInfo.timezone}</p>
            </div>
          </div>
        </div>

        {/* Enterprise ROI Stats */}
        <div className="border-t border-gray-700/50 pt-6 mb-8">
          <h3 className="text-xl font-semibold text-white mb-6 text-center">
            Proven Enterprise ROI Impact
          </h3>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="bg-gradient-to-r from-green-900/30 to-emerald-900/30 rounded-xl p-4 border border-green-700/30 text-center">
              <TrendingUp className="w-6 h-6 text-green-400 mx-auto mb-2" />
              <div className="text-2xl font-bold text-green-400">{businessInfo.roiStats.fasterHiring}</div>
              <div className="text-sm text-gray-300">Faster Hiring</div>
            </div>
            <div className="bg-gradient-to-r from-blue-900/30 to-cyan-900/30 rounded-xl p-4 border border-blue-700/30 text-center">
              <Target className="w-6 h-6 text-blue-400 mx-auto mb-2" />
              <div className="text-2xl font-bold text-blue-400">{businessInfo.roiStats.annualSavings}</div>
              <div className="text-sm text-gray-300">Annual Savings</div>
            </div>
            <div className="bg-gradient-to-r from-purple-900/30 to-violet-900/30 rounded-xl p-4 border border-purple-700/30 text-center">
              <Star className="w-6 h-6 text-purple-400 mx-auto mb-2" />
              <div className="text-2xl font-bold text-purple-400">{businessInfo.roiStats.teamSatisfaction}</div>
              <div className="text-sm text-gray-300">Team Satisfaction</div>
            </div>
            <div className="bg-gradient-to-r from-amber-900/30 to-orange-900/30 rounded-xl p-4 border border-amber-700/30 text-center">
              <Zap className="w-6 h-6 text-amber-400 mx-auto mb-2" />
              <div className="text-2xl font-bold text-amber-400">{businessInfo.roiStats.productivityGain}</div>
              <div className="text-sm text-gray-300">Productivity Gain</div>
            </div>
          </div>
        </div>

        {/* Enterprise Solutions Section */}
        <div className="mb-6">
          <h3 className="text-xl font-semibold text-white mb-4 flex items-center gap-2">
            <BarChart3 className="w-5 h-5 text-amber-400" />
            Enterprise Solutions
          </h3>
          <div className="grid md:grid-cols-2 gap-3">
            {businessInfo.specialties.map((specialty, index) => (
              <div 
                key={index}
                className="flex items-center gap-2 text-gray-300"
              >
                <div className="w-2 h-2 bg-amber-400 rounded-full"></div>
                <span>{specialty}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Call to Action */}
        <div className="mt-8 p-6 bg-gradient-to-r from-amber-700/20 to-amber-600/20 rounded-lg border border-amber-700/30">
          <div className="text-center">
            <h4 className="text-xl font-semibold text-white mb-2">
              Scale Your Hiring with SmartATS Enterprise
            </h4>
            <p className="text-gray-300 mb-2">
              Join organizations already using our AI-powered resume optimization platform.
            </p>
            <p className="text-amber-300 text-sm mb-4">
              • Dedicated Account Manager • 24/7 Enterprise Support • Custom Implementation
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <a
                href={`mailto:${businessInfo.email}?subject=SmartATS Enterprise Demo Request&body=Hi Benjamin,%0D%0A%0D%0AI'm interested in learning more about SmartATS Enterprise solutions for our organization.%0D%0A%0D%0ACompany: [Your Company]%0D%0ATeam Size: [Number of employees]%0D%0ACurrent Hiring Volume: [Resumes per month]%0D%0A%0D%0APlease schedule a demo at your earliest convenience.%0D%0A%0D%0AThank you!`}
                className="inline-flex items-center gap-2 px-6 py-3 bg-amber-600 text-white font-semibold rounded-lg hover:bg-amber-700 transition-colors"
              >
                <Mail className="w-4 h-4" />
                Request Enterprise Demo
              </a>
              <a
                href={`tel:${businessInfo.phone}`}
                className="inline-flex items-center gap-2 px-6 py-3 bg-gray-700 text-white font-semibold rounded-lg hover:bg-gray-600 transition-colors"
              >
                <Phone className="w-4 h-4" />
                Call Sales Team
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BusinessCard;
