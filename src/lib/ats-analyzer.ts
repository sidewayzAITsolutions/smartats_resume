// lib/ats-analyzer.ts
export interface ATSAnalysis {
  score: number;
  breakdown: {
    keywords: number;
    formatting: number;
    content: number;
    impact: number;
  };
  matchedKeywords: string[];
  missingKeywords: string[];
  suggestions: string[];
  risks: string[];
}

export class ATSAnalyzer {
  private static readonly ROLE_KEYWORDS: Record<string, string[]> = {
    'software engineer': [
      'javascript', 'typescript', 'react', 'node.js', 'python', 'java', 'c++',
      'aws', 'azure', 'gcp', 'docker', 'kubernetes', 'git', 'agile', 'scrum',
      'api', 'rest', 'graphql', 'database', 'sql', 'nosql', 'mongodb', 'postgresql',
      'microservices', 'ci/cd', 'testing', 'debugging', 'performance', 'scalability'
    ],
    'product manager': [
      'agile', 'scrum', 'roadmap', 'stakeholder', 'analytics', 'strategy',
      'leadership', 'metrics', 'kpi', 'user research', 'jira', 'confluence',
      'product lifecycle', 'go-to-market', 'roi', 'user stories', 'backlog',
      'prioritization', 'cross-functional', 'data-driven', 'customer-centric'
    ],
    'data scientist': [
      'python', 'r', 'machine learning', 'deep learning', 'tensorflow', 'pytorch',
      'scikit-learn', 'pandas', 'numpy', 'sql', 'statistics', 'data analysis',
      'visualization', 'tableau', 'power bi', 'nlp', 'computer vision', 'model',
      'algorithm', 'prediction', 'classification', 'regression', 'neural network'
    ],
    'designer': [
      'figma', 'sketch', 'adobe xd', 'photoshop', 'illustrator', 'ux', 'ui',
      'prototyping', 'wireframing', 'user research', 'design systems', 'responsive',
      'mobile', 'web', 'accessibility', 'usability', 'interaction', 'visual',
      'typography', 'color theory', 'design thinking', 'user-centered'
    ],
    'marketing': [
      'seo', 'sem', 'ppc', 'google ads', 'facebook ads', 'analytics', 'conversion',
      'roi', 'kpi', 'content marketing', 'social media', 'email marketing', 'crm',
      'salesforce', 'hubspot', 'lead generation', 'funnel', 'campaign', 'strategy',
      'brand', 'engagement', 'metrics', 'a/b testing', 'marketing automation'
    ]
  };

  private static readonly ACTION_VERBS = [
    'achieved', 'administered', 'analyzed', 'built', 'collaborated', 'created',
    'delivered', 'designed', 'developed', 'directed', 'enhanced', 'established',
    'executed', 'generated', 'implemented', 'improved', 'increased', 'initiated',
    'launched', 'led', 'managed', 'optimized', 'organized', 'pioneered',
    'reduced', 'resolved', 'spearheaded', 'streamlined', 'supervised', 'transformed'
  ];

  private static readonly FORMATTING_RULES = {
    hasEmail: { weight: 15, check: (data: any) => data.personal?.email?.includes('@') },
    hasPhone: { weight: 15, check: (data: any) => data.personal?.phone?.length > 5 },
    hasName: { weight: 15, check: (data: any) => data.personal?.fullName?.length > 2 },
    hasSummary: { weight: 20, check: (data: any) => data.summary?.length > 50 },
    hasExperience: { weight: 20, check: (data: any) => data.experience?.[0]?.company },
    hasEducation: { weight: 15, check: (data: any) => data.education?.[0]?.school }
  };

  static analyze(resumeData: any, targetRole: string = ''): ATSAnalysis {
    const role = targetRole.toLowerCase();
    const keywords = this.ROLE_KEYWORDS[role] || this.ROLE_KEYWORDS['software engineer'];
    
    // Add custom keywords if provided
    const allKeywords = [...new Set([...keywords, ...(resumeData.targetKeywords || [])])];
    
    // Convert resume to searchable text
    const resumeText = JSON.stringify(resumeData).toLowerCase();
    const words = resumeText.split(/\s+/);
    
    // Keyword Analysis
    const matchedKeywords = allKeywords.filter(kw => resumeText.includes(kw.toLowerCase()));
    const missingKeywords = allKeywords.filter(kw => !matchedKeywords.includes(kw));
    const keywordScore = (matchedKeywords.length / allKeywords.length) * 100;
    
    // Formatting Analysis
    let formattingScore = 0;
    Object.values(this.FORMATTING_RULES).forEach(rule => {
      if (rule.check(resumeData)) {
        formattingScore += rule.weight;
      }
    });
    
    // Content Analysis
    const wordCount = words.length;
    const optimalWordCount = 500;
    const contentScore = Math.min(100, (wordCount / optimalWordCount) * 100);
    
    // Impact Analysis
    const actionVerbsUsed = this.ACTION_VERBS.filter(verb => 
      resumeText.includes(verb.toLowerCase())
    );
    const hasMetrics = /\d+%|\d+k|\d+m|\$\d+|#\d+/i.test(resumeText);
    const hasBulletPoints = resumeData.experience?.some((exp: any) => 
      exp.description?.includes('•') || exp.description?.includes('-')
    );
    
    let impactScore = 0;
    impactScore += actionVerbsUsed.length * 5; // 5 points per action verb
    impactScore += hasMetrics ? 30 : 0;
    impactScore += hasBulletPoints ? 20 : 0;
    impactScore = Math.min(100, impactScore);
    
    // Calculate total score
    const breakdown = {
      keywords: Math.round(keywordScore),
      formatting: Math.round(formattingScore),
      content: Math.round(contentScore),
      impact: Math.round(impactScore)
    };
    
    const totalScore = Math.round(
      (breakdown.keywords * 0.35) +
      (breakdown.formatting * 0.25) +
      (breakdown.content * 0.20) +
      (breakdown.impact * 0.20)
    );
    
    // Generate suggestions
    const suggestions = this.generateSuggestions(
      resumeData,
      breakdown,
      matchedKeywords,
      actionVerbsUsed,
      hasMetrics
    );
    
    // Identify risks
    const risks = this.identifyRisks(resumeData, breakdown);
    
    return {
      score: totalScore,
      breakdown,
      matchedKeywords,
      missingKeywords: missingKeywords.slice(0, 10), // Top 10 missing
      suggestions,
      risks
    };
  }

  private static generateSuggestions(
    resumeData: any,
    breakdown: any,
    matchedKeywords: string[],
    actionVerbsUsed: string[],
    hasMetrics: boolean
  ): string[] {
    const suggestions = [];
    
    if (breakdown.keywords < 60) {
      suggestions.push('Add more industry-specific keywords from the job description');
    }
    
    if (!hasMetrics) {
      suggestions.push('Include quantifiable achievements (e.g., "increased sales by 40%")');
    }
    
    if (actionVerbsUsed.length < 5) {
      suggestions.push('Use more action verbs to start your bullet points');
    }
    
    if (!resumeData.summary || resumeData.summary.length < 100) {
      suggestions.push('Expand your professional summary to 2-3 impactful sentences');
    }
    
    if (resumeData.skills?.length < 8) {
      suggestions.push('Add more relevant technical and soft skills');
    }
    
    if (!resumeData.personal?.linkedin) {
      suggestions.push('Include your LinkedIn profile URL');
    }
    
    return suggestions.slice(0, 5); // Top 5 suggestions
  }

  private static identifyRisks(resumeData: any, breakdown: any): string[] {
    const risks = [];
    
    if (breakdown.formatting < 50) {
      risks.push('Missing critical contact information');
    }
    
    if (breakdown.keywords < 40) {
      risks.push('Very low keyword match - may be filtered out');
    }
    
    if (!resumeData.experience?.[0]?.description) {
      risks.push('No job descriptions provided');
    }
    
    const resumeText = JSON.stringify(resumeData).toLowerCase();
    if (resumeText.includes('responsible for') || resumeText.includes('duties include')) {
      risks.push('Using passive language instead of action verbs');
    }
    
    return risks;
  }

  static getKeywordsForRole(role: string): string[] {
    return this.ROLE_KEYWORDS[role.toLowerCase()] || this.ROLE_KEYWORDS['software engineer'];
  }

  static getActionVerbs(): string[] {
    return this.ACTION_VERBS;
  }
}
