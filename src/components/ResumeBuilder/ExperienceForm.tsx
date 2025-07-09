// src/components/ResumeBuilder/ExperienceForm.tsx
'use client';
import React, { useState, useCallback } from 'react';
import { Experience } from '../../types/resume';
import { Plus, Trash2, Calendar, Building, Briefcase, Star, Lightbulb, Loader } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { toast } from 'react-hot-toast'; // Import toast

interface ExperienceFormProps {
  initialData: Experience[];
  onUpdate: (experience: Experience[]) => void;
  jobDescription: string;
  isProUser: boolean; // Passed from parent for premium check
  onUpgradeClick: () => void; // Callback to trigger parent's upgrade modal
}

export default function ExperienceForm({ initialData, onUpdate, jobDescription, isProUser, onUpgradeClick }: ExperienceFormProps) {
  const [experiences, setExperiences] = useState<Experience[]>(
    initialData.length > 0 ? initialData : [createEmptyExperience()]
  );
  const [generatingAchievementIndex, setGeneratingAchievementIndex] = useState<number | null>(null);

function createEmptyExperience(): Experience {
  return {
    id: Date.now().toString(),
    company: '',
    position: '',
    startDate: '',
    endDate: '',
    current: false,
    description: '',
    achievements: [],
    keywords: []
  };
}

  const updateExperience = (
    index: number,
    field: keyof Experience,
    value: string | boolean | string[]
  ) => {
    const updated = experiences.map((exp, i) => 
      i === index ? { ...exp, [field]: value } : exp
    );
    setExperiences(updated);
    onUpdate(updated);
  };

  const addExperience = () => {
    const updated = [...experiences, createEmptyExperience()];
    setExperiences(updated);
    onUpdate(updated);
  };

  const removeExperience = (index: number) => {
    if (experiences.length > 1) {
      const updated = experiences.filter((_, i) => i !== index);
      setExperiences(updated);
      onUpdate(updated);
    }
  };

  const addAchievement = (expIndex: number) => {
    const updated = experiences.map((exp, i) => 
      i === expIndex ? { ...exp, achievements: [...exp.achievements, ''] } : exp
    );
    setExperiences(updated);
    onUpdate(updated);
  };

  const updateAchievement = (expIndex: number, achIndex: number, value: string) => {
    const updated = experiences.map((exp, i) => 
      i === expIndex ? {
        ...exp,
        achievements: exp.achievements.map((ach: string, j: number) => j === achIndex ? value : ach)
      } : exp
    );
    setExperiences(updated);
    onUpdate(updated);
  };

  const removeAchievement = (expIndex: number, achIndex: number) => {
    const updated = experiences.map((exp, i) => 
      i === expIndex ? {
        ...exp,
        achievements: exp.achievements.filter((_: string, j: number) => j !== achIndex)
      } : exp
    );
    setExperiences(updated);
    onUpdate(updated);
  };

  // AI Achievement Generation Function
  const generateAchievementSuggestions = useCallback(async (expIndex: number) => {
    if (!isProUser) {
      onUpgradeClick(); // Trigger parent's upgrade modal
      return;
    }

    const experience = experiences[expIndex];
    if (!experience.position || !experience.company || !experience.description) {
      toast.error("Please fill in job title, company, and job description for AI to work.");
      return;
    }

    setGeneratingAchievementIndex(expIndex);

    try {
      const prompt = `Generate 3 impactful, quantifiable, and ATS-friendly achievement bullet points for a resume. Focus on results using action verbs. Each point should start with a hyphen.
      
      Job Title: ${experience.position}
      Company: ${experience.company}
      My Responsibilities/Summary for this role: ${experience.description}
      ${jobDescription ? `Target Job Description (for keywords): ${jobDescription}` : ''}
      
      Achievements:`;

      const chatHistory = [];
      chatHistory.push({ role: "user", parts: [{ text: prompt }] });
      const payload = { contents: chatHistory };
      const apiKey = ""; // Canvas will automatically provide this in runtime
      const apiUrl = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${apiKey}`;
      
      const response = await fetch(apiUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });

      const result = await response.json();

      if (result.candidates && result.candidates.length > 0 &&
          result.candidates[0].content && result.candidates[0].content.parts &&
          result.candidates[0].content.parts.length > 0) {
        const text = result.candidates[0].content.parts[0].text;
        const generatedAchievements = text.split('\n').filter((line: string) => line.trim().startsWith('-')).map((line: string) => line.trim().substring(1).trim());

        // Update the achievements for the specific experience entry
        const updatedExperiences = experiences.map((exp, i) =>
          i === expIndex ? { ...exp, achievements: generatedAchievements.filter(Boolean) } : exp
        );
        setExperiences(updatedExperiences);
        onUpdate(updatedExperiences);
        toast.success('AI achievements generated!');

      } else {
        toast.error("Failed to generate achievements. Please try again.");
      }
    } catch (err) {
      console.error('Error generating achievements:', err);
      toast.error("Failed to generate achievements. Network error or API issue.");
    } finally {
      setGeneratingAchievementIndex(null);
    }
  }, [experiences, jobDescription, onUpdate, isProUser, onUpgradeClick]); // Added onUpgradeClick to dependencies

  const actionVerbSuggestions = [
    'Achieved', 'Managed', 'Led', 'Developed', 'Implemented', 'Increased', 'Decreased',
    'Improved', 'Created', 'Built', 'Designed', 'Optimized', 'Streamlined', 'Coordinated',
    'Supervised', 'Trained', 'Mentored', 'Negotiated', 'Delivered', 'Launched'
  ];

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold text-gray-900 mb-2">Work Experience</h2>
          <p className="text-lg text-gray-600">
            Add your work experience, starting with your most recent position. Focus on achievements and quantifiable results.
          </p>
        </div>
        <Button onClick={addExperience} variant="outline" className="btn-modern"> {/* Apply btn-modern */}
          <Plus className="w-4 h-4 mr-2" />
          Add Experience
        </Button>
      </div>

      <div className="space-y-8">
        {experiences.map((experience, expIndex) => (
          <div key={experience.id} className="border border-gray-200 rounded-lg p-6 bg-white shadow-sm">
            <div className="flex justify-between items-start mb-6">
              <h3 className="text-lg font-semibold text-gray-900 flex items-center">
                <Briefcase className="w-5 h-5 mr-2 text-blue-600" />
                {experience.position || `Experience ${expIndex + 1}`}
              </h3>
              {experiences.length > 1 && (
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => removeExperience(expIndex)}
                  className="text-red-600 hover:text-red-700 border-red-200 hover:bg-red-50"
                >
                  <Trash2 className="w-4 h-4" />
                </Button>
              )}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              {/* Job Title */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Job Title *
                </label>
                <input
                  type="text"
                  value={experience.position}
                  onChange={(e) => updateExperience(expIndex, 'position', e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 sleek-input"
                  placeholder="e.g., Senior Software Engineer"
                />
              </div>

              {/* Company */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Company *
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Building className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    type="text"
                    value={experience.company}
                    onChange={(e) => updateExperience(expIndex, 'company', e.target.value)}
                    className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 sleek-input"
                    placeholder="e.g., Tech Company Inc."
                  />
                </div>
              </div>

              {/* Start Date */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Start Date *
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Calendar className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    type="month"
                    value={experience.startDate}
                    onChange={(e) => updateExperience(expIndex, 'startDate', e.target.value)}
                    className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 sleek-input"
                  />
                </div>
              </div>

              {/* End Date */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  End Date
                </label>
                <div className="space-y-3">
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <Calendar className="h-5 w-5 text-gray-400" />
                    </div>
                    <input
                      type="month"
                      value={experience.endDate || ''}
                      onChange={(e) => updateExperience(expIndex, 'endDate', e.target.value)}
                      disabled={experience.current}
                      className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:bg-gray-100 disabled:text-gray-500 sleek-input"
                    />
                  </div>
                  <label className="flex items-center text-sm text-gray-600">
                    <input
                      type="checkbox"
                      checked={experience.current}
                      onChange={(e) => {
                        updateExperience(expIndex, 'current', e.target.checked);
                        if (e.target.checked) {
                          updateExperience(expIndex, 'endDate', '');
                        }
                      }}
                      className="mr-3 h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                    />
                    I currently work here
                  </label>
                </div>
              </div>
            </div>

            {/* Job Description */}
            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Job Description
              </label>
              <textarea
                value={experience.description}
                onChange={(e) => updateExperience(expIndex, 'description', e.target.value)}
                rows={3}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 sleek-input"
                placeholder="Brief description of your role and responsibilities..."
              />
              <p className="mt-1 text-xs text-gray-500">
                Keep it concise - focus on your key responsibilities and the scope of your role
              </p>
            </div>

            {/* Key Achievements */}
            <div>
              <div className="flex justify-between items-center mb-3">
                <label className="block text-sm font-medium text-gray-700">
                  Key Achievements *
                </label>
                <div className="flex items-center gap-2">
                  {/* AI Generate Achievements Button */}
                  <Button
                    onClick={() => generateAchievementSuggestions(expIndex)}
                    disabled={generatingAchievementIndex === expIndex} // Only disable if this specific index is generating
                    size="sm"
                    variant="ghost"
                    className="flex items-center text-primary-dark-blue-600 hover:text-primary-dark-blue-800 hover:bg-primary-dark-blue-50" // Apply matte blue
                  >
                    {generatingAchievementIndex === expIndex ? (
                      <Loader className="w-4 h-4 mr-1 animate-spin" />
                    ) : (
                      <Lightbulb className="w-4 h-4 mr-1" />
                    )}
                    AI Generate
                    {!isProUser && <span className="text-xs ml-1 text-gray-400">(Pro)</span>}
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => addAchievement(expIndex)}
                    className="btn-modern" // Apply btn-modern
                  >
                    <Plus className="w-3 h-3 mr-1" />
                    Add Achievement
                  </Button>
                </div>
              </div>
              
              <div className="space-y-3">
                {experience.achievements.map((achievement: string, achIndex: number) => (
                  <div key={achIndex} className="flex gap-3">
                    <div className="flex-1">
                      <textarea
                        value={achievement}
                        onChange={(e) => updateAchievement(expIndex, achIndex, e.target.value)}
                        rows={2}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 sleek-input"
                        placeholder="• Increased sales by 25% through strategic client relationship management and cross-selling initiatives"
                      />
                    </div>
                    {experience.achievements.length > 1 && (
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => removeAchievement(expIndex, achIndex)}
                        className="text-red-600 hover:text-red-700 border-red-200 hover:bg-red-50"
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    )}
                  </div>
                ))}
              </div>

              {/* Achievement Tips */}
              <div className="mt-4 bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                <h4 className="text-sm font-semibold text-yellow-900 mb-2 flex items-center">
                  <Star className="w-4 h-4 mr-1" />
                  Achievement Writing Tips
                </h4>
                <div className="grid md:grid-cols-2 gap-4 text-xs text-yellow-800">
                  <div>
                    <p className="font-medium mb-1">Start with action verbs:</p>
                    <div className="flex flex-wrap gap-1">
                      {actionVerbSuggestions.slice(0, 6).map(verb => (
                        <span key={verb} className="bg-yellow-100 px-2 py-1 rounded text-xs">
                          {verb}
                        </span>
                      ))}
                    </div>
                  </div>
                  <div>
                    <p className="font-medium mb-1">Include numbers:</p>
                    <ul className="space-y-1">
                      <li>• Percentages (increased by 25%)</li>
                      <li>• Dollar amounts ($50K savings)</li>
                      <li>• Time frames (within 6 months)</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Overall Tips */}
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
        <h3 className="text-lg font-semibold text-blue-900 mb-3">💡 Experience Section Tips</h3>
        <div className="grid md:grid-cols-2 gap-4 text-blue-800">
          <div>
            <h4 className="font-medium mb-2">What ATS Systems Look For:</h4>
            <ul className="space-y-1 text-sm">
              <li>• Relevant job titles and company names</li>
              <li>• Industry-specific keywords and skills</li>
              <li>• Clear employment dates and progression</li>
              <li>• Quantified achievements with numbers</li>
            </ul>
          </div>
          <div>
            <h4 className="font-medium mb-2">Best Practices:</h4>
            <ul className="space-y-1 text-sm">
              <li>• List experiences in reverse chronological order</li>
              <li>• Focus on achievements, not just responsibilities</li>
              <li>• Use keywords from the job description</li>
              <li>• Keep bullet points concise but impactful</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
// You can add other resume-related types here
export interface Resume {
  experiences: Experience[];
  // ... other resume fields
}