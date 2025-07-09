// src/components/ResumeBuilder/TemplateRenderer.tsx - Create this file
'use client';
import React from 'react';
import { Resume } from '@/types/resume';
import { Template } from '@/types/templates';

interface TemplateRendererProps {
  resume: Resume;
  template: Template;
  className?: string;
}

export default function TemplateRenderer({ resume, template, className = '' }: TemplateRendererProps) {
  const renderBasicTemplate = () => (
    <div className="bg-white p-8 shadow-lg rounded-lg max-w-4xl mx-auto font-serif">
      {/* Header */}
      <div className="text-center border-b-2 border-gray-300 pb-6 mb-6">
        <h1 className="text-3xl font-bold text-gray-900 mb-3">
          {resume.personalInfo.fullName || 'Your Name'}
        </h1>
        <div className="flex flex-wrap justify-center gap-4 text-gray-600">
          {resume.personalInfo.email && <span>{resume.personalInfo.email}</span>}
          {resume.personalInfo.phone && <span>•</span>}
          {resume.personalInfo.phone && <span>{resume.personalInfo.phone}</span>}
          {resume.personalInfo.location && <span>•</span>}
          {resume.personalInfo.location && <span>{resume.personalInfo.location}</span>}
        </div>
        {(resume.personalInfo.linkedin || resume.personalInfo.portfolio) && (
          <div className="flex justify-center gap-4 mt-2 text-blue-600">
            {resume.personalInfo.linkedin && (
              <a href={resume.personalInfo.linkedin} className="hover:underline">LinkedIn</a>
            )}
            {resume.personalInfo.portfolio && (
              <a href={resume.personalInfo.portfolio} className="hover:underline">Portfolio</a>
            )}
          </div>
        )}
      </div>

      {/* Professional Summary */}
      {resume.summary && (
        <div className="mb-6">
          <h2 className="text-xl font-bold text-gray-900 mb-3 uppercase tracking-wide">
            Professional Summary
          </h2>
          <p className="text-gray-700 leading-relaxed">{resume.summary}</p>
        </div>
      )}

      {/* Experience */}
      {resume.experience.length > 0 && (
        <div className="mb-6">
          <h2 className="text-xl font-bold text-gray-900 mb-4 uppercase tracking-wide">
            Work Experience
          </h2>
          <div className="space-y-6">
            {resume.experience.map((exp) => (
              <div key={exp.id}>
                <div className="flex justify-between items-start mb-2">
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900">{exp.position}</h3>
                    <p className="text-gray-700 font-medium">{exp.company}</p>
                  </div>
                  <p className="text-gray-600 text-sm">
                    {exp.startDate} - {exp.current ? 'Present' : exp.endDate}
                  </p>
                </div>
                {exp.description && (
                  <p className="text-gray-700 mb-2 leading-relaxed">{exp.description}</p>
                )}
                {exp.achievements.some(ach => ach.trim()) && (
                  <ul className="list-disc list-inside text-gray-700 space-y-1 ml-4">
                    {exp.achievements.filter(ach => ach.trim()).map((achievement, achIndex) => (
                      <li key={achIndex} className="leading-relaxed">{achievement}</li>
                    ))}
                  </ul>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Education */}
      {resume.education.length > 0 && (
        <div className="mb-6">
          <h2 className="text-xl font-bold text-gray-900 mb-4 uppercase tracking-wide">
            Education
          </h2>
          <div className="space-y-3">
            {resume.education.map((edu) => (
              <div key={edu.id} className="flex justify-between items-start">
                <div>
                  <h3 className="font-semibold text-gray-900">{edu.degree} in {edu.field}</h3>
                  <p className="text-gray-700">{edu.institution}</p>
                  {edu.gpa && <p className="text-gray-600 text-sm">GPA: {edu.gpa}</p>}
                </div>
                <p className="text-gray-600 text-sm">{edu.graduationDate}</p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Skills */}
      {resume.skills.length > 0 && (
        <div>
          <h2 className="text-xl font-bold text-gray-900 mb-4 uppercase tracking-wide">
            Skills
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {['technical', 'soft', 'language'].map(category => {
              const categorySkills = resume.skills.filter(skill => skill.category === category);
              if (categorySkills.length === 0) return null;
              
              return (
                <div key={category}>
                  <h4 className="font-semibold text-gray-900 mb-2 capitalize">
                    {category === 'technical' ? 'Technical Skills' : 
                     category === 'soft' ? 'Soft Skills' : 'Languages'}
                  </h4>
                  <div className="space-y-1">
                    {categorySkills.map(skill => (
                      <div key={skill.id} className="text-gray-700 text-sm">
                        {skill.name}
                      </div>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );

  const renderMinimalistTemplate = () => (
    <div className="bg-white p-8 shadow-lg rounded-lg max-w-4xl mx-auto font-sans">
      <div className="grid grid-cols-3 gap-8">
        {/* Left Column */}
        <div className="col-span-1 space-y-6">
          {/* Contact Info */}
          <div>
            <h1 className="text-2xl font-bold text-gray-900 mb-4">
              {resume.personalInfo.fullName || 'Your Name'}
            </h1>
            <div className="space-y-2 text-sm text-gray-600">
              {resume.personalInfo.email && <div>{resume.personalInfo.email}</div>}
              {resume.personalInfo.phone && <div>{resume.personalInfo.phone}</div>}
              {resume.personalInfo.location && <div>{resume.personalInfo.location}</div>}
              {resume.personalInfo.linkedin && (
                <div><a href={resume.personalInfo.linkedin} className="text-blue-600 hover:underline">LinkedIn</a></div>
              )}
              {resume.personalInfo.portfolio && (
                <div><a href={resume.personalInfo.portfolio} className="text-blue-600 hover:underline">Portfolio</a></div>
              )}
            </div>
          </div>

          {/* Skills */}
          {resume.skills.length > 0 && (
            <div>
              <h2 className="text-lg font-bold text-gray-900 mb-3 pb-1 border-b">
                Skills
              </h2>
              {['technical', 'soft', 'language'].map(category => {
                const categorySkills = resume.skills.filter(skill => skill.category === category);
                if (categorySkills.length === 0) return null;
                
                return (
                  <div key={category} className="mb-4">
                    <h4 className="font-medium text-gray-800 mb-2 text-sm capitalize">
                      {category === 'technical' ? 'Technical' : 
                       category === 'soft' ? 'Soft Skills' : 'Languages'}
                    </h4>
                    <div className="space-y-1">
                      {categorySkills.map(skill => (
                        <div key={skill.id} className="text-gray-600 text-sm">
  {skill.name}
</div>
))}
                    </div>
                  </div>
                );
              })}
            </div>
          )}

          {/* Education */}
          {resume.education.length > 0 && (
            <div>
              <h2 className="text-lg font-bold text-gray-900 mb-3 pb-1 border-b">
                Education
              </h2>
              <div className="space-y-3">
                {resume.education.map(edu => (
                  <div key={edu.id}>
                    <h3 className="font-medium text-gray-900 text-sm">{edu.degree}</h3>
                    <p className="text-gray-600 text-sm">{edu.field}</p>
                    <p className="text-gray-600 text-sm">{edu.institution}</p>
                    <p className="text-gray-500 text-xs">{edu.graduationDate}</p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Right Column */}
        <div className="col-span-2 space-y-6">
          {/* Professional Summary */}
          {resume.summary && (
            <div>
              <h2 className="text-lg font-bold text-gray-900 mb-3 pb-1 border-b">
                Professional Summary
              </h2>
              <p className="text-gray-700 leading-relaxed">{resume.summary}</p>
            </div>
          )}

          {/* Experience */}
          {resume.experience.length > 0 && (
            <div>
              <h2 className="text-lg font-bold text-gray-900 mb-4 pb-1 border-b">
                Experience
              </h2>
              <div className="space-y-6">
                {resume.experience.map(exp => (
                  <div key={exp.id}>
                    <div className="flex justify-between items-start mb-2">
                      <div>
                        <h3 className="font-semibold text-gray-900">{exp.position}</h3>
                        <p className="text-gray-700">{exp.company}</p>
                      </div>
                      <p className="text-gray-600 text-sm">
                        {exp.startDate} - {exp.current ? 'Present' : exp.endDate}
                      </p>
                    </div>
                    {exp.description && (
                      <p className="text-gray-700 mb-2 text-sm leading-relaxed">{exp.description}</p>
                    )}
                    {exp.achievements.some(ach => ach.trim()) && (
                      <ul className="list-disc list-inside text-gray-700 space-y-1 text-sm">
                        {exp.achievements.filter(ach => ach.trim()).map((achievement, achIndex) => (
                          <li key={achIndex}>{achievement}</li>
                        ))}
                      </ul>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );

  // Template renderer logic
  const renderTemplate = () => {
    switch (template.category) {
      case 'basic':
        return renderBasicTemplate();
      case 'minimalist':
        return renderMinimalistTemplate();
      case 'modern':
        return renderBasicTemplate(); // Will enhance with color later
      case 'creative':
        return renderMinimalistTemplate(); // Will enhance with creative elements later
      case 'professional':
        return renderBasicTemplate(); // Will enhance with professional polish later
      default:
        return renderBasicTemplate();
    }
  };

  return (
    <div className={className}>
      {renderTemplate()}
    </div>
  );
}
