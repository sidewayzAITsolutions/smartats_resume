// src/components/ResumeBuilder/SkillsForm.tsx - Create this file
'use client';
import React, { useState } from 'react';
import { Skill } from '@/types/resume';
import { Plus, X, Code, Target, Zap } from 'lucide-react';
import { Button } from '@/components/ui/Button';

interface SkillsFormProps {
  initialData: Skill[];
  onUpdate: (skills: Skill[]) => void;
}

export default function SkillsForm({ initialData, onUpdate }: SkillsFormProps) {
  const [skills, setSkills] = useState<Skill[]>(initialData);
  const [newSkill, setNewSkill] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<'technical' | 'soft' | 'language'>('technical');
  const [selectedLevel, setSelectedLevel] = useState<'beginner' | 'intermediate' | 'advanced' | 'expert'>('intermediate');

  const addSkill = () => {
    if (!newSkill.trim()) return;

    // Check if skill already exists
    const exists = skills.some(skill => 
      skill.name.toLowerCase() === newSkill.trim().toLowerCase()
    );
    if (exists) return;

    const skill: Skill = {
      id: Date.now().toString(),
      name: newSkill.trim(),
      category: selectedCategory,
      level: selectedLevel,
      proficiency: 'beginner',
      keywords: []
    };

    const updated = [...skills, skill];
    setSkills(updated);
    onUpdate(updated);
    setNewSkill('');
  };

  const removeSkill = (id: string) => {
    const updated = skills.filter(skill => skill.id !== id);
    setSkills(updated);
    onUpdate(updated);
  };

  const updateSkillLevel = (id: string, level: Skill['level']) => {
    const updated = skills.map(skill => 
      skill.id === id ? { ...skill, level } : skill
    );
    setSkills(updated);
    onUpdate(updated);
  };

  const addSuggestedSkill = (skillName: string) => {
    setNewSkill(skillName);
  };

  const skillSuggestions = {
    technical: [
      // Programming Languages
      'JavaScript', 'TypeScript', 'Python', 'Java', 'C++', 'C#', 'PHP', 'Ruby', 'Go', 'Rust',
      // Web Technologies
      'React', 'Vue.js', 'Angular', 'Node.js', 'Express.js', 'HTML', 'CSS', 'SASS',
      // Databases
      'SQL', 'MongoDB', 'PostgreSQL', 'MySQL', 'Redis', 'Firebase',
      // Cloud & DevOps
      'AWS', 'Azure', 'Google Cloud', 'Docker', 'Kubernetes', 'Jenkins', 'Git',
      // Tools & Frameworks
      'REST APIs', 'GraphQL', 'Microservices', 'Agile', 'Scrum', 'JIRA',
      // Data & Analytics
      'Machine Learning', 'Data Analysis', 'Tableau', 'Power BI', 'Excel', 'R'
    ],
    soft: [
      'Leadership', 'Communication', 'Project Management', 'Team Collaboration',
      'Problem Solving', 'Critical Thinking', 'Time Management', 'Adaptability',
      'Presentation Skills', 'Mentoring', 'Strategic Planning', 'Customer Service',
      'Negotiation', 'Conflict Resolution', 'Decision Making', 'Creativity',
      'Attention to Detail', 'Organizational Skills', 'Multitasking', 'Initiative'
    ],
    language: [
      'English', 'Spanish', 'French', 'German', 'Chinese (Mandarin)', 
      'Japanese', 'Korean', 'Portuguese', 'Italian', 'Arabic', 'Russian',
      'Hindi', 'Dutch', 'Swedish', 'Norwegian', 'Polish', 'Turkish'
    ]
  };


  const getCategoryColor = (category: Skill['category']) => {
    switch (category) {
      case 'technical': return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'soft': return 'bg-green-100 text-green-800 border-green-200';
      case 'language': return 'bg-purple-100 text-purple-800 border-purple-200';
    }
  };

  // Add type predicate function for skill levels
  const isValidSkillLevel = (value: unknown): value is 'beginner' | 'intermediate' | 'advanced' | 'expert' => {
    return typeof value === 'string' && ['beginner', 'intermediate', 'advanced', 'expert'].includes(value);
  };

  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-3xl font-bold text-gray-900 mb-2">Skills</h2>
        <p className="text-lg text-gray-600">
          Add skills that are relevant to your target position. Focus on skills mentioned in job descriptions to improve your ATS score.
        </p>
      </div>

      {/* Add New Skill */}
      <div className="border border-gray-200 rounded-lg p-6 bg-white shadow-sm">
        <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
          <Plus className="w-5 h-5 mr-2 text-blue-600" />
          Add Skills
        </h3>
        
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-4">
          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Skill Name
            </label>
            <input
              type="text"
              value={newSkill}
              onChange={(e) => setNewSkill(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && addSkill()}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter a skill..."
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Category
            </label>
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value as 'technical' | 'soft' | 'language')}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="technical">Technical</option>
              <option value="soft">Soft Skills</option>
              <option value="language">Languages</option>
            </select>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Level
            </label>
            <select
              value={selectedLevel}
              onChange={(e) => setSelectedLevel(e.target.value as 'beginner' | 'intermediate' | 'advanced' | 'expert')}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="beginner">Beginner</option>
              <option value="intermediate">Intermediate</option>
              <option value="advanced">Advanced</option>
              <option value="expert">Expert</option>
            </select>
          </div>
        </div>

        <Button onClick={addSkill} disabled={!newSkill.trim()} className="w-full md:w-auto">
          <Plus className="w-4 h-4 mr-2" />
          Add Skill
        </Button>

        {/* Skill Suggestions */}
        <div className="mt-6">
          <h4 className="text-sm font-medium text-gray-700 mb-3">
            Popular {selectedCategory} skills:
          </h4>
          <div className="flex flex-wrap gap-2">
            {skillSuggestions[selectedCategory].slice(0, 12).map(suggestion => (
              <button
                key={suggestion}
                onClick={() => addSuggestedSkill(suggestion)}
                className="px-3 py-1 text-sm bg-gray-100 hover:bg-gray-200 rounded-full transition-colors"
                disabled={skills.some(skill => skill.name.toLowerCase() === suggestion.toLowerCase())}
              >
                {suggestion}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Current Skills */}
      {skills.length > 0 && (
        <div>
          {['technical', 'soft', 'language'].map(category => {
            const categorySkills = skills.filter(skill => skill.category === category);
            
            if (categorySkills.length === 0) return null;

            return (
              <div key={category} className="mb-8">
                <h3 className="text-lg font-semibold mb-4 capitalize">
                  {category === 'technical' ? 'Technical Skills' : 
                   category === 'soft' ? 'Soft Skills' : 
                   'Languages'}
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {categorySkills.map(skill => (
                    <div key={skill.id} className={`border rounded-lg p-4 ${getCategoryColor(skill.category)}`}>
                      <div className="flex items-center justify-between mb-2">
                        <span className="font-medium">{skill.name}</span>
                        <button
                          onClick={() => removeSkill(skill.id)}
                          className="text-red-500 hover:text-red-700 p-1"
                        >
                          <X className="w-4 h-4" />
                        </button>
                      </div>
                      <select
                        value={skill.level}
                        onChange={(e) => {
                          const value = e.target.value;
                          if (isValidSkillLevel(value)) {
                            updateSkillLevel(skill.id, value);
                          }
                        }}
                        className="text-xs border-none bg-transparent focus:ring-0 p-0 font-medium"
                      >
                        <option value="beginner">Beginner</option>
                        <option value="intermediate">Intermediate</option>
                        <option value="advanced">Advanced</option>
                        <option value="expert">Expert</option>
                      </select>
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      )}

      {skills.length === 0 && (
        <div className="text-center py-12 border-2 border-dashed border-gray-300 rounded-lg">
          <Code className="w-16 h-16 mx-auto mb-4 text-gray-400" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">No skills added yet</h3>
          <p className="text-gray-600 mb-4">
            Start by adding your most relevant skills above. Aim for 8-15 skills total.
          </p>
        </div>
      )}

      {/* Tips Section */}
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
        <h3 className="text-lg font-semibold text-blue-900 mb-3">💡 Skills Section Tips</h3>
        <div className="grid md:grid-cols-2 gap-4 text-blue-800">
          <div>
            <h4 className="font-medium mb-2 flex items-center">
              <Target className="w-4 h-4 mr-1" />
              ATS Optimization:
            </h4>
            <ul className="space-y-1 text-sm">
              <li>• Include exact keywords from job descriptions</li>
              <li>• Use industry-standard skill names</li>
              <li>• Balance technical and soft skills</li>
              <li>• Avoid abbreviations (use &quot;JavaScript&quot; not &quot;JS&quot;)</li>
            </ul>
          </div>
          <div>
            <h4 className="font-medium mb-2 flex items-center">
              <Zap className="w-4 h-4 mr-1" />
              Best Practices:
            </h4>
            <ul className="space-y-1 text-sm">
              <li>• List your strongest skills first</li>
              <li>• Be honest about your skill levels</li>
              <li>• Include 8-15 total skills</li>
              <li>• Update skills based on job requirements</li>
            </ul>
          </div>
        </div>
      </div>

      {/* Skill Level Guide */}
      <div className="bg-gray-50 border border-gray-200 rounded-lg p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-3">📚 Skill Level Guide</h3>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4 text-sm">
          <div className="text-center">
            <div className="font-medium text-gray-700 mb-1">Beginner</div>
            <div className="text-xs text-gray-600">Basic understanding, some experience</div>
          </div>
          <div className="text-center">
            <div className="font-medium text-gray-700 mb-1">Intermediate</div>
            <div className="text-xs text-gray-600">Good working knowledge, can work independently</div>
          </div>
          <div className="text-center">
            <div className="font-medium text-gray-700 mb-1">Advanced</div>
            <div className="text-xs text-gray-600">Extensive experience, can teach others</div>
          </div>
          <div className="text-center">
            <div className="font-medium text-gray-700 mb-1">Expert</div>
            <div className="text-xs text-gray-600">Deep expertise, industry recognition</div>
          </div>
        </div>
      </div>
    </div>
  );
}
