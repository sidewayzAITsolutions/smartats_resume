import React from 'react';
import { CheckCircle, AlertTriangle, FileText, Eye, Search, Target } from 'lucide-react';

const ATSGuide = () => {
  const tips = [
    {
      icon: <FileText className="w-6 h-6 text-blue-600" />,
      title: "Use Standard Fonts",
      description: "Stick to Arial, Calibri, or Times New Roman for maximum compatibility"
    },
    {
      icon: <Search className="w-6 h-6 text-blue-600" />,
      title: "Include Keywords",
      description: "Mirror keywords from the job description naturally throughout your resume"
    },
    {
      icon: <Target className="w-6 h-6 text-blue-600" />,
      title: "Simple Formatting",
      description: "Avoid tables, graphics, and complex layouts that confuse ATS systems"
    },
    {
      icon: <Eye className="w-6 h-6 text-blue-600" />,
      title: "Standard Sections",
      description: "Use conventional headings: Experience, Education, Skills, etc."
    }
  ];

  const commonMistakes = [
    "Using images or graphics",
    "Complex table layouts",
    "Headers and footers",
    "Unusual fonts or formatting",
    "Missing contact information",
    "Inconsistent date formats"
  ];

  return (
    <div className="max-w-6xl mx-auto px-4 py-16">
      {/* Header */}
      <div className="text-center mb-16">
        <h1 className="text-4xl md:text-5xl font-bold mb-4">
          ATS Guide
        </h1>
        <p className="text-xl text-gray-600 max-w-3xl mx-auto">
          Master the art of beating Applicant Tracking Systems with our comprehensive guide
        </p>
      </div>

      {/* What is ATS Section */}
      <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-2xl p-8 mb-16">
        <h2 className="text-3xl font-bold mb-6 bg-gradient-to-r from-blue-600 via-blue-500 to-blue-700 bg-clip-text text-transparent">
          What is an ATS?
        </h2>
        <p className="text-lg text-gray-700 mb-4">
          An Applicant Tracking System (ATS) is software used by employers to collect, sort, scan, and rank job applications. 
          Over 90% of Fortune 500 companies use ATS to filter resumes before human recruiters ever see them.
        </p>
        <div className="bg-yellow-100 border-l-4 border-yellow-500 p-4 rounded">
          <div className="flex items-center">
            <AlertTriangle className="w-5 h-5 text-yellow-600 mr-2" />
            <p className="text-yellow-800 font-semibold">
              Your resume has only 6 seconds to pass the ATS scan!
            </p>
          </div>
        </div>
      </div>

      {/* ATS Optimization Tips */}
      <div className="mb-16">
        <h2 className="text-3xl font-bold mb-8 text-center bg-gradient-to-r from-blue-600 via-blue-500 to-blue-700 bg-clip-text text-transparent">
          ATS Optimization Tips
        </h2>
        <div className="grid md:grid-cols-2 gap-8">
          {tips.map((tip, index) => (
            <div key={index} className="bg-white rounded-xl p-6 shadow-lg border border-gray-100 hover:shadow-xl transition-shadow">
              <div className="flex items-start space-x-4">
                <div className="flex-shrink-0">
                  {tip.icon}
                </div>
                <div>
                  <h3 className="text-xl font-semibold mb-2">{tip.title}</h3>
                  <p className="text-gray-600">{tip.description}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Common Mistakes */}
      <div className="mb-16">
        <h2 className="text-3xl font-bold mb-8 text-center bg-gradient-to-r from-red-600 to-red-500 bg-clip-text text-transparent">
          Common ATS Mistakes to Avoid
        </h2>
        <div className="bg-red-50 rounded-2xl p-8">
          <div className="grid md:grid-cols-2 gap-4">
            {commonMistakes.map((mistake, index) => (
              <div key={index} className="flex items-center space-x-3">
                <div className="w-2 h-2 bg-red-500 rounded-full"></div>
                <span className="text-gray-700">{mistake}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ATS Testing Checklist */}
      <div className="bg-green-50 rounded-2xl p-8">
        <h2 className="text-3xl font-bold mb-6 bg-gradient-to-r from-green-600 to-green-500 bg-clip-text text-transparent">
          ATS Testing Checklist
        </h2>
        <div className="space-y-4">
          {[
            "Save your resume as both .docx and .pdf formats",
            "Test your resume by copying and pasting it into a plain text editor",
            "Ensure all text is selectable and readable",
            "Check that your contact information appears clearly",
            "Verify that dates and job titles are properly formatted",
            "Use our ATS optimization tool for a detailed scan"
          ].map((item, index) => (
            <div key={index} className="flex items-start space-x-3">
              <CheckCircle className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
              <span className="text-gray-700">{item}</span>
            </div>
          ))}
        </div>
      </div>

      {/* CTA */}
      <div className="text-center mt-16">
        <h3 className="text-2xl font-bold mb-4">Ready to Optimize Your Resume?</h3>
        <p className="text-gray-600 mb-8">Use our smart ATS optimization tool to ensure your resume passes every scan.</p>
        <button className="bg-gradient-to-r from-blue-600 to-blue-700 text-white px-8 py-4 rounded-lg font-semibold hover:from-blue-700 hover:to-blue-800 transition-all transform hover:scale-105">
          Optimize My Resume Now
        </button>
      </div>
    </div>
  );
};

export default ATSGuide;
