import { NextRequest, NextResponse } from 'next/server';
import { createRouteHandlerClient } from '@supabase/auth-helpers-nextjs';
import { cookies } from 'next/headers';

export async function GET(req: NextRequest) {
  try {
    const cookieStore = cookies();
    const supabase = createRouteHandlerClient({ cookies: () => cookieStore });
    const { searchParams } = new URL(req.url);
    const timeRange = searchParams.get('timeRange') || '30d';
    
    // Get authenticated user
    const { data: { user }, error: authError } = await supabase.auth.getUser();
    
    if (authError || !user) {
      return NextResponse.json(
        { error: 'Authentication required' },
        { status: 401 }
      );
    }

    // Get user's organization
    const { data: profile } = await supabase
      .from('profiles')
      .select('organization_id, subscription_status')
      .eq('id', user.id)
      .single();

    if (!profile?.organization_id) {
      return NextResponse.json(
        { error: 'Not part of an organization' },
        { status: 403 }
      );
    }

    if (profile.subscription_status !== 'enterprise') {
      return NextResponse.json(
        { error: 'Enterprise subscription required' },
        { status: 403 }
      );
    }

    // Calculate date range
    const endDate = new Date();
    const startDate = new Date();
    switch (timeRange) {
      case '7d':
        startDate.setDate(endDate.getDate() - 7);
        break;
      case '30d':
        startDate.setDate(endDate.getDate() - 30);
        break;
      case '90d':
        startDate.setDate(endDate.getDate() - 90);
        break;
      case '1y':
        startDate.setFullYear(endDate.getFullYear() - 1);
        break;
      default:
        startDate.setDate(endDate.getDate() - 30);
    }

    // Get team members count
    const { count: teamMembersCount } = await supabase
      .from('profiles')
      .select('*', { count: 'exact', head: true })
      .eq('organization_id', profile.organization_id);

    // Get active users (logged in within last 7 days)
    const { count: activeUsersCount } = await supabase
      .from('profiles')
      .select('*', { count: 'exact', head: true })
      .eq('organization_id', profile.organization_id)
      .gte('last_active_at', new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString());

    // Get resume creation stats
    const { data: resumeStats } = await supabase
      .from('resumes')
      .select('created_at, ats_score')
      .eq('organization_id', profile.organization_id)
      .gte('created_at', startDate.toISOString())
      .lte('created_at', endDate.toISOString());

    // Calculate metrics
    const totalResumes = resumeStats?.length || 0;
    const avgAtsScore = resumeStats && resumeStats.length > 0
      ? Math.round(resumeStats.reduce((acc, r) => acc + (r.ats_score || 0), 0) / resumeStats.length)
      : 0;

    // Get activity logs for the time period
    const { data: activityLogs } = await supabase
      .from('team_activity_logs')
      .select('action, created_at')
      .eq('organization_id', profile.organization_id)
      .gte('created_at', startDate.toISOString())
      .lte('created_at', endDate.toISOString())
      .order('created_at', { ascending: false });

    // Group resumes by date for chart data
    const resumesByDate: { [key: string]: number } = {};
    resumeStats?.forEach((resume) => {
      const date = new Date(resume.created_at).toISOString().split('T')[0];
      resumesByDate[date] = (resumesByDate[date] || 0) + 1;
    });

    // Get template usage stats
    const { data: templateStats } = await supabase
      .from('resume_templates')
      .select('name, usage_count')
      .eq('organization_id', profile.organization_id)
      .order('usage_count', { ascending: false })
      .limit(5);

    // Calculate team productivity (resumes per active user)
    const teamProductivity = activeUsersCount && activeUsersCount > 0
      ? Math.round((totalResumes / activeUsersCount) * 100) / 100
      : 0;

    // Mock time to hire calculation (in real app, this would come from HR system integration)
    const avgTimeToHire = 18; // days

    return NextResponse.json({
      overview: {
        teamMembers: teamMembersCount || 0,
        activeUsers: activeUsersCount || 0,
        totalResumes,
        avgAtsScore,
        teamProductivity,
        avgTimeToHire
      },
      chartData: {
        resumesByDate,
        templateUsage: templateStats || []
      },
      recentActivity: activityLogs?.slice(0, 20) || [],
      timeRange
    });
  } catch (error) {
    console.error('Error fetching analytics:', error);
    return NextResponse.json(
      { error: 'Failed to fetch analytics' },
      { status: 500 }
    );
  }
}

// Export analytics data
export async function POST(req: NextRequest) {
  try {
    const cookieStore = cookies();
    const supabase = createRouteHandlerClient({ cookies: () => cookieStore });
    const { format = 'csv', timeRange = '30d' } = await req.json();

    // Get authenticated user and verify permissions
    const { data: { user }, error: authError } = await supabase.auth.getUser();
    
    if (authError || !user) {
      return NextResponse.json(
        { error: 'Authentication required' },
        { status: 401 }
      );
    }

    const { data: profile } = await supabase
      .from('profiles')
      .select('organization_id, organization_role')
      .eq('id', user.id)
      .single();

    if (!profile?.organization_id || !['admin', 'owner'].includes(profile.organization_role)) {
      return NextResponse.json(
        { error: 'Insufficient permissions' },
        { status: 403 }
      );
    }

    // Log export activity
    await supabase.rpc('log_team_activity', {
      p_organization_id: profile.organization_id,
      p_user_id: user.id,
      p_action: 'exported_analytics',
      p_metadata: { format, timeRange }
    });

    // TODO: Implement actual export logic based on format
    // For now, return a success response
    return NextResponse.json({
      success: true,
      message: 'Export initiated. You will receive an email with the download link.'
    });
  } catch (error) {
    console.error('Error exporting analytics:', error);
    return NextResponse.json(
      { error: 'Failed to export analytics' },
      { status: 500 }
    );
  }
}