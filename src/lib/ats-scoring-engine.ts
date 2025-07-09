import { Resume } from '@/types/resume';
import { useState, useEffect, useRef, useCallback } from 'react';

interface ATSScore {
  overall: number;
  breakdown: {
    keywords: number;
    formatting: number;
    content: number;
    completeness: number;
  };
  issues: string[];
  suggestions: string[];
  passRate: 'high' | 'medium' | 'low';
}

export class ATSScoring {
  analyzeResume(resume: Resume, jobDescription?: string): ATSScore {
    try {
      const scores = {
        keywords: this.scoreKeywords(resume, jobDescription),
        formatting: this.scoreFormatting(resume),
        content: this.scoreContent(resume),
        completeness: this.scoreCompleteness(resume)
      };

      const overall = Math.round(
        (scores.keywords * 0.4) +
        (scores.formatting * 0.2) +
        (scores.content * 0.25) +
        (scores.completeness * 0.15)
      );

      const issues: string[] = [];
      const suggestions: string[] = [];

      if (scores.keywords < 70) {
        issues.push('Missing important keywords from job description');
        suggestions.push('Add relevant keywords from the job description');
      }

      if (scores.formatting < 80) {
        issues.push('Formatting may confuse ATS systems');
        suggestions.push('Use standard section headers and avoid complex layouts');
      }

      if (scores.content < 70) {
        issues.push('Content lacks quantifiable achievements');
        suggestions.push('Add metrics and numbers to demonstrate impact');
      }

      if (scores.completeness < 80) {
        issues.push('Missing important resume sections');
        suggestions.push('Add all standard resume sections for better ATS parsing');
      }

      return {
        overall,
        breakdown: scores,
        issues,
        suggestions,
        passRate: overall >= 85 ? 'high' : overall >= 70 ? 'medium' : 'low'
      };
    } catch (error) {
      console.error('Error analyzing resume:', error);
      // Return a default score if analysis fails
      return {
        overall: 0,
        breakdown: {
          keywords: 0,
          formatting: 0,
          content: 0,
          completeness: 0
        },
        issues: ['Error analyzing resume'],
        suggestions: ['Please try again'],
        passRate: 'low'
      };
    }
  }

  private scoreKeywords(resume: Resume, jobDescription?: string): number {
    if (!jobDescription || jobDescription.trim().length === 0) {
      return 75; // Base score without job description
    }

    try {
      const resumeText = this.resumeToText(resume).toLowerCase();
      const jobText = jobDescription.toLowerCase();
      
      // Simple keyword matching
      const jobWords = jobText.split(/\W+/).filter(word => word.length > 3);
      const uniqueJobWords = [...new Set(jobWords)];
      
      let matchCount = 0;
      uniqueJobWords.forEach(word => {
        if (resumeText.includes(word)) {
          matchCount++;
        }
      });
      
      const matchRate = uniqueJobWords.length > 0 
        ? (matchCount / uniqueJobWords.length) * 100 
        : 75;
        
      return Math.min(100, Math.round(matchRate));
    } catch (error) {
      console.error('Error scoring keywords:', error);
      return 50;
    }
  }

  private scoreFormatting(resume: Resume): number {
    let score = 100;

    try {
      // Check email format
      if (resume.personalInfo?.email && !resume.personalInfo.email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)) {
        score -= 20;
      }

      // Check phone format
      if (resume.personalInfo?.phone && !resume.personalInfo.phone.match(/^[\d\s\-\(\)+]+$/)) {
        score -= 15;
      }

      // Check section structure
      if (!resume.experience || resume.experience.length === 0) score -= 20;
      if (!resume.education || resume.education.length === 0) score -= 15;
      if (!resume.skills || resume.skills.length === 0) score -= 10;

      return Math.max(0, score);
    } catch (error) {
      console.error('Error scoring formatting:', error);
      return 50;
    }
  }

  private scoreContent(resume: Resume): number {
    let score = 100;

    try {
      const resumeText = this.resumeToText(resume).toLowerCase();
      
      // Check for action verbs
      const actionVerbs = ['managed', 'led', 'created', 'developed', 'achieved'];
      const hasActionVerbs = actionVerbs.some(verb => resumeText.includes(verb));
      if (!hasActionVerbs) score -= 30;

      // Check for quantified achievements
      const hasNumbers = /\d+/.test(resumeText);
      if (!hasNumbers) score -= 40;

      // Check summary length
      if (!resume.summary || resume.summary.length < 50) score -= 15;

      return Math.max(0, score);
    } catch (error) {
      console.error('Error scoring content:', error);
      return 50;
    }
  }

  private scoreCompleteness(resume: Resume): number {
    let score = 100;

    try {
      const requiredFields = [
        resume.personalInfo?.fullName,
        resume.personalInfo?.email,
        resume.personalInfo?.phone,
        resume.summary,
        resume.experience?.length > 0,
        resume.education?.length > 0,
        resume.skills?.length > 0
      ];

      const missingFields = requiredFields.filter(field => !field).length;
      score -= missingFields * 15;

      return Math.max(0, score);
    } catch (error) {
      console.error('Error scoring completeness:', error);
      return 50;
    }
  }

  private resumeToText(resume: Resume): string {
    try {
      const parts = [
        resume.personalInfo?.fullName || '',
        resume.personalInfo?.email || '',
        resume.personalInfo?.phone || '',
        resume.personalInfo?.location || '',
        resume.summary || '',
        ...(resume.experience || []).map(exp => 
          `${exp.position || ''} ${exp.company || ''} ${exp.description || ''} ${(exp.achievements || []).join(' ')}`
        ),
        ...(resume.education || []).map(edu => 
          `${edu.degree || ''} ${edu.institution || ''} ${edu.field || ''}`
        ),
        ...(resume.skills || []).map(skill => skill.name || '')
      ];

      return parts.filter(Boolean).join(' ');
    } catch (error) {
      console.error('Error converting resume to text:', error);
      return '';
    }
  }
}

// Export singleton instance
export const atsScoring = new ATSScoring();

// Updated Hook with better error handling and immediate scoring
export function useATSScore(resume: Resume, jobDescription?: string) {
  const [score, setScore] = useState<ATSScore | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const timeoutRef = useRef<NodeJS.Timeout | undefined>(undefined);
  const mountedRef = useRef(true);

  // Use callback to memoize the scoring function
  const performScoring = useCallback(() => {
    if (!mountedRef.current) return;

    // Don't analyze if no content
    if (!resume.personalInfo?.fullName && !resume.summary) {
      setScore(null);
      setLoading(false);
      return;
    }

    setLoading(true);
    setError(null);

    // Clear any existing timeout
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }

    // Perform scoring after a short delay
    timeoutRef.current = setTimeout(() => {
      if (!mountedRef.current) return;

      try {
        console.log('Starting ATS analysis...');
        const result = atsScoring.analyzeResume(resume, jobDescription);
        console.log('ATS analysis complete:', result);
        
        if (mountedRef.current) {
          setScore(result);
          setError(null);
          setLoading(false);
        }
      } catch (err) {
        console.error('ATS analysis error:', err);
        if (mountedRef.current) {
          setError('Failed to analyze resume. Please try again.');
          setScore(null);
          setLoading(false);
        }
      }
    }, 500); // Reduced delay for faster feedback
  }, [resume, jobDescription]);

  useEffect(() => {
    mountedRef.current = true;
    performScoring();

    return () => {
      mountedRef.current = false;
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, [performScoring]);

  // Force re-analyze function
  const reanalyze = useCallback(() => {
    performScoring();
  }, [performScoring]);

  return { score, loading, error, reanalyze };
}