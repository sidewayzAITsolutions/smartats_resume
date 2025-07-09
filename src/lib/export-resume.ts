// lib/export-resume.ts
import { useState } from 'react';

// Simple Resume interface for type safety
export interface Resume {
  personalInfo: {
    fullName: string;
    email: string;
    phone: string;
    location: string;
    linkedin?: string;
    portfolio?: string;
  };
  summary: string;
  experience: Array<{
    id: string;
    company: string;
    position: string;
    startDate: string;
    endDate?: string;
    current: boolean;
    description: string;
    achievements: string[];
  }>;
  education: Array<{
    id: string;
    institution: string;
    degree: string;
    field: string;
    graduationDate: string;
    gpa?: string;
  }>;
  skills: Array<{
    id: string;
    name: string;
    category: string;
  }>;
}

export class ResumeExporter {
  // Export to PDF using basic HTML conversion
  async exportToPDF(resume: Resume): Promise<Blob> {
    try {
      // Create HTML content for the resume
      const htmlContent = this.generateResumeHTML(resume);
      
      // For now, return a text blob as placeholder
      // In production, you would use jsPDF or similar library
      const blob = new Blob([htmlContent], { type: 'text/html' });
      return blob;
    } catch (error) {
      console.error('PDF export error:', error);
      throw new Error('Failed to export PDF');
    }
  }

  // Export to DOCX (placeholder implementation)
  async exportToDOCX(resume: Resume): Promise<Blob> {
    try {
      // Create a simple text version for now
      const textContent = this.generateResumeText(resume);
      const blob = new Blob([textContent], { type: 'text/plain' });
      return blob;
    } catch (error) {
      console.error('DOCX export error:', error);
      throw new Error('Failed to export DOCX');
    }
  }

  // Generate HTML content for the resume
  private generateResumeHTML(resume: Resume): string {
    return `
      <!DOCTYPE html>
      <html>
      <head>
        <title>${resume.personalInfo.fullName} - Resume</title>
        <style>
          body { font-family: Arial, sans-serif; margin: 40px; line-height: 1.6; color: #333; }
          .header { text-align: center; margin-bottom: 30px; border-bottom: 2px solid #333; padding-bottom: 20px; }
          .name { font-size: 24px; font-weight: bold; margin-bottom: 10px; }
          .contact { font-size: 14px; margin-bottom: 5px; }
          .section { margin-bottom: 25px; }
          .section-title { font-size: 18px; font-weight: bold; margin-bottom: 15px; text-transform: uppercase; border-bottom: 1px solid #ccc; padding-bottom: 5px; }
          .experience-item, .education-item { margin-bottom: 15px; }
          .job-title { font-weight: bold; font-size: 16px; }
          .company { font-style: italic; margin-bottom: 5px; }
          .dates { font-size: 14px; color: #666; margin-bottom: 10px; }
          .achievement { margin-left: 20px; margin-bottom: 5px; }
          .skills-list { display: flex; flex-wrap: wrap; gap: 15px; }
          .skill { background: #f0f0f0; padding: 5px 10px; border-radius: 3px; font-size: 14px; }
        </style>
      </head>
      <body>
        <div class="header">
          <div class="name">${resume.personalInfo.fullName}</div>
          <div class="contact">${resume.personalInfo.email}</div>
          <div class="contact">${resume.personalInfo.phone}</div>
          <div class="contact">${resume.personalInfo.location}</div>
          ${resume.personalInfo.linkedin ? `<div class="contact">${resume.personalInfo.linkedin}</div>` : ''}
          ${resume.personalInfo.portfolio ? `<div class="contact">${resume.personalInfo.portfolio}</div>` : ''}
        </div>

        ${resume.summary ? `
        <div class="section">
          <div class="section-title">Professional Summary</div>
          <p>${resume.summary}</p>
        </div>
        ` : ''}

        ${resume.experience.length > 0 ? `
        <div class="section">
          <div class="section-title">Experience</div>
          ${resume.experience.map(exp => `
            <div class="experience-item">
              <div class="job-title">${exp.position}</div>
              <div class="company">${exp.company}</div>
              <div class="dates">${exp.startDate} - ${exp.current ? 'Present' : exp.endDate}</div>
              ${exp.description ? `<p>${exp.description}</p>` : ''}
              ${exp.achievements.length > 0 ? `
                <ul>
                  ${exp.achievements.map(achievement => `<li class="achievement">${achievement}</li>`).join('')}
                </ul>
              ` : ''}
            </div>
          `).join('')}
        </div>
        ` : ''}

        ${resume.education.length > 0 ? `
        <div class="section">
          <div class="section-title">Education</div>
          ${resume.education.map(edu => `
            <div class="education-item">
              <div class="job-title">${edu.degree} in ${edu.field}</div>
              <div class="company">${edu.institution}</div>
              <div class="dates">${edu.graduationDate}</div>
              ${edu.gpa ? `<div>GPA: ${edu.gpa}</div>` : ''}
            </div>
          `).join('')}
        </div>
        ` : ''}

        ${resume.skills.length > 0 ? `
        <div class="section">
          <div class="section-title">Skills</div>
          <div class="skills-list">
            ${resume.skills.map(skill => `<span class="skill">${skill.name}</span>`).join('')}
          </div>
        </div>
        ` : ''}
      </body>
      </html>
    `;
  }

  // Generate plain text version
  private generateResumeText(resume: Resume): string {
    let text = '';
    
    // Header
    text += `${resume.personalInfo.fullName}\n`;
    text += `${resume.personalInfo.email} | ${resume.personalInfo.phone}\n`;
    text += `${resume.personalInfo.location}\n`;
    if (resume.personalInfo.linkedin) text += `${resume.personalInfo.linkedin}\n`;
    if (resume.personalInfo.portfolio) text += `${resume.personalInfo.portfolio}\n`;
    text += '\n';

    // Summary
    if (resume.summary) {
      text += 'PROFESSIONAL SUMMARY\n';
      text += '===================\n';
      text += `${resume.summary}\n\n`;
    }

    // Experience
    if (resume.experience.length > 0) {
      text += 'EXPERIENCE\n';
      text += '==========\n';
      resume.experience.forEach(exp => {
        text += `${exp.position}\n`;
        text += `${exp.company}\n`;
        text += `${exp.startDate} - ${exp.current ? 'Present' : exp.endDate}\n`;
        if (exp.description) text += `${exp.description}\n`;
        exp.achievements.forEach(achievement => {
          text += `• ${achievement}\n`;
        });
        text += '\n';
      });
    }

    // Education
    if (resume.education.length > 0) {
      text += 'EDUCATION\n';
      text += '=========\n';
      resume.education.forEach(edu => {
        text += `${edu.degree} in ${edu.field}\n`;
        text += `${edu.institution}\n`;
        text += `${edu.graduationDate}\n`;
        if (edu.gpa) text += `GPA: ${edu.gpa}\n`;
        text += '\n';
      });
    }

    // Skills
    if (resume.skills.length > 0) {
      text += 'SKILLS\n';
      text += '======\n';
      text += resume.skills.map(skill => skill.name).join(', ') + '\n';
    }

    return text;
  }
}

// React hook for easy usage
export function useResumeExport() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const exporter = new ResumeExporter();

  const exportResume = async (
    resume: Resume, 
    format: 'pdf' | 'docx' | 'html' | 'txt', 
    templateId: string = 'basic'
  ): Promise<void> => {
    setLoading(true);
    setError(null);

    try {
      let blob: Blob;
      let filename: string;
      let mimeType: string;

      const baseName = resume.personalInfo.fullName || 'resume';

      switch (format) {
        case 'pdf':
          blob = await exporter.exportToPDF(resume);
          filename = `${baseName}.pdf`;
          mimeType = 'application/pdf';
          break;
        case 'docx':
          blob = await exporter.exportToDOCX(resume);
          filename = `${baseName}.docx`;
          mimeType = 'application/vnd.openxmlformats-officedocument.wordprocessingml.document';
          break;
        case 'html':
          blob = new Blob([exporter['generateResumeHTML'](resume)], { type: 'text/html' });
          filename = `${baseName}.html`;
          mimeType = 'text/html';
          break;
        case 'txt':
          blob = new Blob([exporter['generateResumeText'](resume)], { type: 'text/plain' });
          filename = `${baseName}.txt`;
          mimeType = 'text/plain';
          break;
        default:
          throw new Error('Unsupported format');
      }

      // Create download link
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = filename;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);

    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Export failed';
      setError(errorMessage);
      console.error('Export error:', err);
    } finally {
      setLoading(false);
    }
  };

  return {
    exportResume,
    loading,
    error
  };
}

// Default export
export default ResumeExporter;
