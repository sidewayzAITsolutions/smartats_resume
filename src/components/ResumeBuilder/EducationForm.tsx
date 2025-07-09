// src/components/ResumeBuilder/EducationForm.tsx
'use client';
import React from 'react';
import { useState } from 'react';
import { Education } from '@/types/resume';
import { Plus, Trash2, GraduationCap, Calendar, School } from 'lucide-react';
import { Button } from '@/components/ui/Button';

interface EducationFormProps {
  initialData: Education[];
  onUpdate: (education: Education[]) => void;
}

export default function EducationForm({ initialData, onUpdate }: EducationFormProps) {
  const [education, setEducation] = useState<Education[]>(
    initialData.length > 0 ? initialData : [createEmptyEducation()]
  );

  function createEmptyEducation(): Education {
    return {
      id: `${Date.now()}-${Math.random()}`,
      institution: '',
      degree: '',
      field: '',
      graduationDate: '', // Assuming this is a string in format YYYY-MM
      gpa: '',
      startDate: '', // Added startDate
      achievements: [] // Added achievements
    };
  }

  const updateEducation = (index: number, field: keyof Education, value: string) => {
    const updated = education.map((edu, i) => 
      i === index ? { ...edu, [field]: value } : edu
    );
    setEducation(updated);
    onUpdate(updated);
  };

  const addEducation = () => {
    const updated = [...education, createEmptyEducation()];
    setEducation(updated);
    onUpdate(updated);
  };

  const removeEducation = (index: number) => {
    if (education.length > 1) {
      const updated = education.filter((_, i) => i !== index);
      setEducation(updated);
      onUpdate(updated);
    }
  };

  const commonDegrees = [
    'High School Diploma',
    'Associate Degree',
    'Bachelor of Science',
    'Bachelor of Arts',
    'Bachelor of Engineering',
    'Bachelor of Business Administration',
    'Master of Science',
    'Master of Arts',
    'Master of Engineering',
    'Master of Business Administration',
    'Master of Fine Arts',
    'Doctor of Philosophy',
    'Juris Doctor',
    'Doctor of Medicine',
    'Professional Certificate',
    'Certification',
    'Other'
  ];

  const popularFields = [
    'Computer Science',
    'Business Administration',
    'Engineering',
    'Marketing',
    'Finance',
    'Psychology',
    'Communications',
    'Biology',
    'Chemistry',
    'Mathematics',
    'English',
    'History',
    'Political Science',
    'Economics',
    'Art',
    'Design',
    'Education',
    'Nursing',
    'Medicine',
    'Law'
  ];

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold text-gray-900 mb-2">Education</h2>
          <p className="text-lg text-gray-600">
            Add your educational background, starting with the most recent. Include relevant coursework, honors, or achievements.
          </p>
        </div>
        <Button onClick={addEducation} variant="outline" className="btn-modern"> {/* Apply btn-modern */}
          <Plus className="w-4 h-4 mr-2" />
          Add Education
        </Button>
      </div>

      <div className="space-y-6">
        {education.map((edu, index) => (
          <div key={edu.id} className="border border-gray-200 rounded-lg p-6 bg-white shadow-sm">
            <div className="flex justify-between items-start mb-6">
              <h3 className="text-lg font-semibold text-gray-900 flex items-center">
                <GraduationCap className="w-5 h-5 mr-2 text-blue-600" />
                {edu.degree ? `${edu.degree}${edu.field ? ` in ${edu.field}` : ''}` : `Education ${index + 1}`}
              </h3>
              {education.length > 1 && (
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => removeEducation(index)}
                  className="text-red-600 hover:text-red-700 border-red-200 hover:bg-red-50"
                >
                  <Trash2 className="w-4 h-4" />
                </Button>
              )}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Institution */}
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Institution/School *
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <School className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    type="text"
                    value={edu.institution}
                    onChange={(e) => updateEducation(index, 'institution', e.target.value)}
                    className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 sleek-input" // Apply sleek-input
                    placeholder="e.g., University of California, Berkeley"
                  />
                </div>
              </div>

              {/* Degree */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Degree *
                </label>
                <select
                  value={edu.degree}
                  onChange={(e) => updateEducation(index, 'degree', e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 sleek-input" // Apply sleek-input
                >
                  <option value="">Select degree type</option>
                  {commonDegrees.map(degree => (
                    <option key={degree} value={degree}>{degree}</option>
                  ))}
                </select>
              </div>

              {/* Field of Study */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Field of Study *
                </label>
                <input
                  type="text"
                  value={edu.field}
                  onChange={(e) => updateEducation(index, 'field', e.target.value)}
                  list={`fields-${index}`}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 sleek-input" // Apply sleek-input
                  placeholder="e.g., Computer Science"
                />
                <datalist id={`fields-${index}`}>
                  {popularFields.map(field => (
                    <option key={field} value={field} />
                  ))}
                </datalist>
              </div>

              {/* Graduation Date */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Graduation Date *
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Calendar className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    type="month"
                    value={typeof edu.graduationDate === 'string' ? edu.graduationDate : ''}
                    onChange={(e) => updateEducation(index, 'graduationDate', e.target.value)}
                    className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 sleek-input" // Apply sleek-input
                  />
                </div>
              </div>

              {/* GPA */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  GPA (Optional)
                </label>
                <input
                  type="text"
                  value={edu.gpa}
                  onChange={(e) => updateEducation(index, 'gpa', e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 sleek-input" // Apply sleek-input
                  placeholder="e.g., 3.8/4.0"
                />
                <p className="mt-1 text-xs text-gray-500">
                  Only include if 3.5 or above, or if specifically requested by the employer
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Tips Section */}
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
        <h3 className="text-lg font-semibold text-blue-900 mb-3">💡 Education Section Tips</h3>
        <div className="grid md:grid-cols-2 gap-4 text-blue-800">
          <div>
            <h4 className="font-medium mb-2">What to Include:</h4>
            <ul className="space-y-1 text-sm">
              <li>• Degree type and field of study</li>
              <li>• Institution name and location</li>
              <li>• Graduation date (month/year)</li>
              <li>• GPA if 3.5+ or employer requires it</li>
              <li>• Relevant coursework, honors, or projects</li>
            </ul>
          </div>
          <div>
            <h4 className="font-medium mb-2">Pro Tips:</h4>
            <ul className="space-y-1 text-sm">
              <li>• List most recent education first</li>
              <li>• Use official degree names</li>
              <li>• Include certifications and professional development</li>
              <li>• For recent grads: education goes before experience</li>
              <li>• Omit high school if you have college degree</li>
            </ul>
          </div>
        </div>
      </div>

      {/* Additional Education Prompt */}{/* Apply btn-modern */}
      <div className="text-center p-6 border-2 border-dashed border-gray-300 rounded-lg">
        <GraduationCap className="w-12 h-12 text-gray-400 mx-auto mb-4" />
        <h3 className="text-lg font-medium text-gray-900 mb-2">Have Additional Education?</h3>
        <p className="text-gray-600 mb-4">
          Include certifications, online courses, bootcamps, or continuing education that&apos;s relevant to your career
        </p>
        <Button onClick={addEducation} variant="outline" className="btn-modern">
          <Plus className="w-4 h-4 mr-2" />
          Add Another Education Entry
        </Button>
      </div>
    </div>
  );
}

