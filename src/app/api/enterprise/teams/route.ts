import { NextRequest, NextResponse } from 'next/server';
import { createRouteHandlerClient } from '@supabase/auth-helpers-nextjs';
import { cookies } from 'next/headers';
import { randomBytes } from 'crypto';

export async function GET(req: NextRequest) {
  try {
    const supabase = createRouteHandlerClient({ cookies });
    
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
      .select('organization_id, organization_role')
      .eq('id', user.id)
      .single();

    if (!profile?.organization_id) {
      return NextResponse.json(
        { error: 'Not part of an organization' },
        { status: 403 }
      );
    }

    // Get team members
    const { data: teamMembers, error: teamError } = await supabase
      .from('profiles')
      .select('*')
      .eq('organization_id', profile.organization_id)
      .order('created_at', { ascending: false });

    if (teamError) {
      throw teamError;
    }

    // Get activity logs
    const { data: activityLogs } = await supabase
      .from('team_activity_logs')
      .select('*')
      .eq('organization_id', profile.organization_id)
      .order('created_at', { ascending: false })
      .limit(10);

    return NextResponse.json({
      teamMembers,
      activityLogs,
      userRole: profile.organization_role
    });
  } catch (error) {
    console.error('Error fetching team data:', error);
    return NextResponse.json(
      { error: 'Failed to fetch team data' },
      { status: 500 }
    );
  }
}

export async function POST(req: NextRequest) {
  try {
    const supabase = createRouteHandlerClient({ cookies });
    const { email, role, permissions } = await req.json();

    // Get authenticated user
    const { data: { user }, error: authError } = await supabase.auth.getUser();
    
    if (authError || !user) {
      return NextResponse.json(
        { error: 'Authentication required' },
        { status: 401 }
      );
    }

    // Get user's organization and check permissions
    const { data: profile } = await supabase
      .from('profiles')
      .select('organization_id, organization_role')
      .eq('id', user.id)
      .single();

    if (!profile?.organization_id) {
      return NextResponse.json(
        { error: 'Not part of an organization' },
        { status: 403 }
      );
    }

    if (!['admin', 'owner'].includes(profile.organization_role)) {
      return NextResponse.json(
        { error: 'Insufficient permissions' },
        { status: 403 }
      );
    }

    // Generate invite token
    const inviteToken = randomBytes(32).toString('hex');

    // Create invitation
    const { data: invite, error: inviteError } = await supabase
      .from('organization_invites')
      .insert({
        organization_id: profile.organization_id,
        email,
        role: role || 'member',
        permissions: permissions || [],
        invited_by: user.id,
        invite_token: inviteToken
      })
      .select()
      .single();

    if (inviteError) {
      throw inviteError;
    }

    // Log activity
    await supabase.rpc('log_team_activity', {
      p_organization_id: profile.organization_id,
      p_user_id: user.id,
      p_action: 'invited_team_member',
      p_resource_type: 'invite',
      p_resource_id: invite.id,
      p_metadata: { email, role }
    });

    // TODO: Send invitation email
    // await sendInvitationEmail(email, inviteToken, organization);

    return NextResponse.json({
      success: true,
      invite: {
        id: invite.id,
        email: invite.email,
        role: invite.role
      }
    });
  } catch (error) {
    console.error('Error creating invitation:', error);
    return NextResponse.json(
      { error: 'Failed to create invitation' },
      { status: 500 }
    );
  }
}

export async function DELETE(req: NextRequest) {
  try {
    const supabase = createRouteHandlerClient({ cookies });
    const { searchParams } = new URL(req.url);
    const memberId = searchParams.get('memberId');

    if (!memberId) {
      return NextResponse.json(
        { error: 'Member ID required' },
        { status: 400 }
      );
    }

    // Get authenticated user
    const { data: { user }, error: authError } = await supabase.auth.getUser();
    
    if (authError || !user) {
      return NextResponse.json(
        { error: 'Authentication required' },
        { status: 401 }
      );
    }

    // Get user's organization and check permissions
    const { data: profile } = await supabase
      .from('profiles')
      .select('organization_id, organization_role')
      .eq('id', user.id)
      .single();

    if (!profile?.organization_id) {
      return NextResponse.json(
        { error: 'Not part of an organization' },
        { status: 403 }
      );
    }

    if (!['admin', 'owner'].includes(profile.organization_role)) {
      return NextResponse.json(
        { error: 'Insufficient permissions' },
        { status: 403 }
      );
    }

    // Remove member from organization
    const { error: updateError } = await supabase
      .from('profiles')
      .update({
        organization_id: null,
        organization_role: null,
        permissions: []
      })
      .eq('id', memberId)
      .eq('organization_id', profile.organization_id);

    if (updateError) {
      throw updateError;
    }

    // Update seats used
    await supabase.rpc('decrement_seats_used', {
      organization_id: profile.organization_id
    });

    // Log activity
    await supabase.rpc('log_team_activity', {
      p_organization_id: profile.organization_id,
      p_user_id: user.id,
      p_action: 'removed_team_member',
      p_resource_type: 'user',
      p_resource_id: memberId
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error removing team member:', error);
    return NextResponse.json(
      { error: 'Failed to remove team member' },
      { status: 500 }
    );
  }
}