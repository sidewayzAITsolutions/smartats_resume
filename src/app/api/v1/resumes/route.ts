import { NextResponse } from 'next/server';
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';

// Types
interface ResumeData {
  personal: {
    fullName: string;
    title: string;
    email: string;
    phone: string;
    location: string;
    linkedin?: string;
    portfolio?: string;
    github?: string;
  };
  summary: string;
  experience: Array<{
    id: string;
    company: string;
    position: string;
    startDate: string;
    endDate: string;
    current: boolean;
    location: string;
    description: string;
    achievements: string[];
  }>;
  education: Array<{
    id: string;
    school: string;
    degree: string;
    field: string;
    startYear: string;
    endYear: string;
    gpa?: string;
    honors?: string;
  }>;
  skills: string[];
  certifications: string[];
  licenses: string[];
  languages: string[];
  projects: Array<{
    id: string;
    name: string;
    description: string;
    technologies: string[];
    link?: string;
    date: string;
  }>;
  customSections: Array<{
    id: string;
    title: string;
    content: string;
  }>;
}

interface SavedResume {
  id: string;
  name: string;
  data: ResumeData;
  targetRole?: string;
  industryFocus?: string;
  createdAt: string;
  updatedAt: string;
  atsScore?: number;
  scoreBreakdown?: any;
  userId: string;
}

// Helper functions
async function verifyApiKey(apiKey: string | null): Promise<{ isValid: boolean; userId?: string }> {
  if (!apiKey) {
    return { isValid: false };
  }

  // For now, we'll use a simple API key validation
  // In production, you'd want to store API keys in your database
  const validApiKeys = process.env.VALID_API_KEYS?.split(',') || [];

  if (validApiKeys.includes(apiKey)) {
    // Extract user ID from API key or use a default
    // This is a simplified approach - in production, you'd look up the user from the API key
    return { isValid: true, userId: 'api-user' };
  }

  return { isValid: false };
}

async function getUserResumes(userId: string): Promise<SavedResume[]> {
  try {
    const supabase = createClientComponentClient();

    // Get user's resumes from database
    const { data: resumes, error } = await supabase
      .from('resumes')
      .select('*')
      .eq('user_id', userId)
      .order('updated_at', { ascending: false });

    if (error) {
      console.error('Error fetching resumes:', error);
      return [];
    }

    return resumes || [];
  } catch (error) {
    console.error('Error in getUserResumes:', error);
    return [];
  }
}

async function createResume(resumeData: Partial<SavedResume>, userId: string): Promise<SavedResume | null> {
  try {
    const supabase = createClientComponentClient();

    const newResume: Omit<SavedResume, 'id'> = {
      name: resumeData.name || 'Untitled Resume',
      data: resumeData.data || {} as ResumeData,
      targetRole: resumeData.targetRole,
      industryFocus: resumeData.industryFocus,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      atsScore: resumeData.atsScore,
      scoreBreakdown: resumeData.scoreBreakdown,
      userId: userId,
    };

    const { data: resume, error } = await supabase
      .from('resumes')
      .insert([{
        name: newResume.name,
        data: newResume.data,
        target_role: newResume.targetRole,
        industry_focus: newResume.industryFocus,
        created_at: newResume.createdAt,
        updated_at: newResume.updatedAt,
        ats_score: newResume.atsScore,
        score_breakdown: newResume.scoreBreakdown,
        user_id: newResume.userId,
      }])
      .select()
      .single();

    if (error) {
      console.error('Error creating resume:', error);
      return null;
    }

    return {
      id: resume.id,
      name: resume.name,
      data: resume.data,
      targetRole: resume.target_role,
      industryFocus: resume.industry_focus,
      createdAt: resume.created_at,
      updatedAt: resume.updated_at,
      atsScore: resume.ats_score,
      scoreBreakdown: resume.score_breakdown,
      userId: resume.user_id,
    };
  } catch (error) {
    console.error('Error in createResume:', error);
    return null;
  }
}

// API Routes
export async function GET(req: Request) {
  try {
    // Verify API key
    const apiKey = req.headers.get('X-API-Key');
    const { isValid, userId } = await verifyApiKey(apiKey);

    if (!isValid || !userId) {
      return NextResponse.json(
        { error: 'Invalid or missing API Key' },
        { status: 401 }
      );
    }

    // Get query parameters
    const url = new URL(req.url);
    const limit = parseInt(url.searchParams.get('limit') || '10');
    const offset = parseInt(url.searchParams.get('offset') || '0');

    // Get user's resumes
    const allResumes = await getUserResumes(userId);
    const resumes = allResumes.slice(offset, offset + limit);

    return NextResponse.json({
      resumes,
      total: allResumes.length,
      limit,
      offset,
    });
  } catch (error) {
    console.error('Error in GET /api/v1/resumes:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

export async function POST(req: Request) {
  try {
    // Verify API key
    const apiKey = req.headers.get('X-API-Key');
    const { isValid, userId } = await verifyApiKey(apiKey);

    if (!isValid || !userId) {
      return NextResponse.json(
        { error: 'Invalid or missing API Key' },
        { status: 401 }
      );
    }

    // Parse request body
    const resumeData = await req.json();

    // Validate required fields
    if (!resumeData.name && !resumeData.data?.personal?.fullName) {
      return NextResponse.json(
        { error: 'Resume name or personal.fullName is required' },
        { status: 400 }
      );
    }

    // Create resume
    const resume = await createResume(resumeData, userId);

    if (!resume) {
      return NextResponse.json(
        { error: 'Failed to create resume' },
        { status: 500 }
      );
    }

    return NextResponse.json({ resume }, { status: 201 });
  } catch (error) {
    console.error('Error in POST /api/v1/resumes:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

export async function PUT(req: Request) {
  try {
    // Verify API key
    const apiKey = req.headers.get('X-API-Key');
    const { isValid, userId } = await verifyApiKey(apiKey);

    if (!isValid || !userId) {
      return NextResponse.json(
        { error: 'Invalid or missing API Key' },
        { status: 401 }
      );
    }

    // Get resume ID from URL
    const url = new URL(req.url);
    const resumeId = url.searchParams.get('id');

    if (!resumeId) {
      return NextResponse.json(
        { error: 'Resume ID is required' },
        { status: 400 }
      );
    }

    // Parse request body
    const resumeData = await req.json();

    // Update resume in database
    const supabase = createClientComponentClient();
    const { data: resume, error } = await supabase
      .from('resumes')
      .update({
        name: resumeData.name,
        data: resumeData.data,
        target_role: resumeData.targetRole,
        industry_focus: resumeData.industryFocus,
        updated_at: new Date().toISOString(),
        ats_score: resumeData.atsScore,
        score_breakdown: resumeData.scoreBreakdown,
      })
      .eq('id', resumeId)
      .eq('user_id', userId)
      .select()
      .single();

    if (error) {
      console.error('Error updating resume:', error);
      return NextResponse.json(
        { error: 'Failed to update resume' },
        { status: 500 }
      );
    }

    if (!resume) {
      return NextResponse.json(
        { error: 'Resume not found' },
        { status: 404 }
      );
    }

    return NextResponse.json({
      resume: {
        id: resume.id,
        name: resume.name,
        data: resume.data,
        targetRole: resume.target_role,
        industryFocus: resume.industry_focus,
        createdAt: resume.created_at,
        updatedAt: resume.updated_at,
        atsScore: resume.ats_score,
        scoreBreakdown: resume.score_breakdown,
        userId: resume.user_id,
      }
    });
  } catch (error) {
    console.error('Error in PUT /api/v1/resumes:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

export async function DELETE(req: Request) {
  try {
    // Verify API key
    const apiKey = req.headers.get('X-API-Key');
    const { isValid, userId } = await verifyApiKey(apiKey);

    if (!isValid || !userId) {
      return NextResponse.json(
        { error: 'Invalid or missing API Key' },
        { status: 401 }
      );
    }

    // Get resume ID from URL
    const url = new URL(req.url);
    const resumeId = url.searchParams.get('id');

    if (!resumeId) {
      return NextResponse.json(
        { error: 'Resume ID is required' },
        { status: 400 }
      );
    }

    // Delete resume from database
    const supabase = createClientComponentClient();
    const { error } = await supabase
      .from('resumes')
      .delete()
      .eq('id', resumeId)
      .eq('user_id', userId);

    if (error) {
      console.error('Error deleting resume:', error);
      return NextResponse.json(
        { error: 'Failed to delete resume' },
        { status: 500 }
      );
    }

    return NextResponse.json({ message: 'Resume deleted successfully' });
  } catch (error) {
    console.error('Error in DELETE /api/v1/resumes:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}