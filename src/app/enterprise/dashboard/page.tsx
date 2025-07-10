'use client';
import React, { useState, useEffect } from 'react';
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';
import { useRouter } from 'next/navigation';
import Navigation from '@/components/Navigation';
import { 
  Building, Users, Target, Shield, Zap, BarChart3, Award, 
  FileText, Clock, Phone, Code, CheckCircle, TrendingUp,
  Star, Sparkles, ArrowRight, Globe, Lock, Palette,
  BarChart2, Settings, Brain, RefreshCw, Database,
  MessageSquare, Calendar, CreditCard, Plus, Edit,
  Trash2, Download, Upload, Search, Filter, Eye
} from 'lucide-react';
import toast from 'react-hot-toast';

interface TeamMember {
  id: string;
  name: string;
  email: string;
  role: string;
  status: 'active' | 'pending' | 'inactive';
  resumesCreated: number;
  lastActive: string;
}

interface Analytics {
  totalResumes: number;
  activeUsers: number;
  avgAtsScore: number;
  timeToHire: number;
  resumesThisMonth: number;
  teamProductivity: number;
}

const EnterpriseDashboard = () => {
  const router = useRouter();
  const supabase = createClientComponentClient();
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('overview');
  const [showInviteModal, setShowInviteModal] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  
  // Mock data - replace with actual API calls
  const [teamMembers, setTeamMembers] = useState<TeamMember[]>([
    {
      id: '1',
      name: 'Sarah Chen',
      email: 'sarah.chen@company.com',
      role: 'HR Manager',
      status: 'active',
      resumesCreated: 145,
      lastActive: '2 hours ago'
    },
    {
      id: '2',
      name: 'Michael Rodriguez',
      email: 'michael.r@company.com',
      role: 'Recruiter',
      status: 'active',
      resumesCreated: 89,
      lastActive: '5 minutes ago'
    },
    {
      id: '3',
      name: 'Emily Johnson',
      email: 'emily.j@company.com',
      role: 'Talent Specialist',
      status: 'pending',
      resumesCreated: 0,
      lastActive: 'Never'
    }
  ]);

  const [analytics] = useState<Analytics>({
    totalResumes: 2847,
    activeUsers: 24,
    avgAtsScore: 87,
    timeToHire: 18,
    resumesThisMonth: 432,
    teamProductivity: 94
  });

  const [inviteData, setInviteData] = useState({
    email: '',
    role: '',
    permissions: [] as string[]
  });

  useEffect(() => {
    checkAccess();
  }, []);

  const checkAccess = async () => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      
      if (!user) {
        router.push('/login');
        return;
      }

      // Check if user has enterprise access
      const { data: profile } = await supabase
        .from('profiles')
        .select('subscription_status')
        .eq('id', user.id)
        .single();

      if (profile?.subscription_status !== 'enterprise') {
        toast.error('Enterprise access required');
        router.push('/pricing');
        return;
      }

      setLoading(false);
    } catch (error) {
      console.error('Error checking access:', error);
      router.push('/login');
    }
  };

  const handleInviteTeamMember = (e: React.FormEvent) => {
    e.preventDefault();
    // Implement invite logic
    toast.success(`Invitation sent to ${inviteData.email}`);
    setShowInviteModal(false);
    setInviteData({ email: '', role: '', permissions: [] });
  };

  const handleDeleteMember = (id: string) => {
    if (confirm('Are you sure you want to remove this team member?')) {
      setTeamMembers(prev => prev.filter(member => member.id !== id));
      toast.success('Team member removed');
    }
  };

  const filteredMembers = teamMembers.filter(member => 
    member.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    member.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    member.role.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-950 flex items-center justify-center">
        <div className="text-center">
          <RefreshCw className="w-8 h-8 text-amber-400 animate-spin mx-auto mb-4" />
          <p className="text-gray-400">Loading enterprise dashboard...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-950 via-gray-900 to-black">
      <Navigation />

      {/* Dashboard Header */}
      <div className="pt-24 pb-8 px-6 bg-gradient-to-br from-amber-900/20 to-orange-900/20 border-b border-amber-700/30">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-white mb-2">Enterprise Dashboard</h1>
              <p className="text-gray-400">Manage your team and track performance</p>
            </div>
            <div className="flex items-center gap-4">
              <button className="px-4 py-2 bg-gray-800 hover:bg-gray-700 text-white rounded-lg font-medium transition-colors flex items-center gap-2">
                <Download className="w-4 h-4" />
                Export Report
              </button>
              <button
                onClick={() => setShowInviteModal(true)}
                className="px-4 py-2 bg-gradient-to-r from-amber-600 to-orange-600 text-white rounded-lg font-medium hover:shadow-lg transition-all flex items-center gap-2"
              >
                <Plus className="w-4 h-4" />
                Invite Team Member
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="bg-gray-900 border-b border-gray-800 sticky top-16 z-30">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex items-center gap-8">
            {['overview', 'team', 'analytics', 'templates', 'settings'].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`py-4 px-2 font-medium transition-colors relative ${
                  activeTab === tab 
                    ? 'text-amber-400' 
                    : 'text-gray-400 hover:text-white'
                }`}
              >
                {tab.charAt(0).toUpperCase() + tab.slice(1)}
                {activeTab === tab && (
                  <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-amber-600 to-orange-600" />
                )}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-7xl mx-auto px-6 py-8">
        {activeTab === 'overview' && (
          <div className="space-y-8">
            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="bg-gray-800 rounded-xl p-6 border border-gray-700">
                <div className="flex items-center justify-between mb-4">
                  <FileText className="w-8 h-8 text-amber-400" />
                  <TrendingUp className="w-5 h-5 text-green-400" />
                </div>
                <div className="text-3xl font-bold text-white mb-1">{analytics.totalResumes.toLocaleString()}</div>
                <div className="text-sm text-gray-400">Total Resumes Created</div>
                <div className="text-xs text-green-400 mt-2">+12% from last month</div>
              </div>

              <div className="bg-gray-800 rounded-xl p-6 border border-gray-700">
                <div className="flex items-center justify-between mb-4">
                  <Users className="w-8 h-8 text-blue-400" />
                  <span className="text-xs px-2 py-1 bg-green-900/50 text-green-400 rounded-full">Active</span>
                </div>
                <div className="text-3xl font-bold text-white mb-1">{analytics.activeUsers}</div>
                <div className="text-sm text-gray-400">Active Team Members</div>
                <div className="text-xs text-gray-500 mt-2">3 pending invites</div>
              </div>

              <div className="bg-gray-800 rounded-xl p-6 border border-gray-700">
                <div className="flex items-center justify-between mb-4">
                  <Target className="w-8 h-8 text-purple-400" />
                  <div className="text-2xl font-bold text-white">{analytics.avgAtsScore}%</div>
                </div>
                <div className="text-sm text-gray-400 mb-2">Average ATS Score</div>
                <div className="w-full h-2 bg-gray-700 rounded-full overflow-hidden">
                  <div className="h-full bg-gradient-to-r from-purple-500 to-pink-500" style={{ width: `${analytics.avgAtsScore}%` }} />
                </div>
              </div>

              <div className="bg-gray-800 rounded-xl p-6 border border-gray-700">
                <div className="flex items-center justify-between mb-4">
                  <Clock className="w-8 h-8 text-green-400" />
                  <span className="text-xs text-green-400">-23%</span>
                </div>
                <div className="text-3xl font-bold text-white mb-1">{analytics.timeToHire} days</div>
                <div className="text-sm text-gray-400">Avg. Time to Hire</div>
                <div className="text-xs text-green-400 mt-2">Industry avg: 24 days</div>
              </div>
            </div>

            {/* Activity Chart */}
            <div className="bg-gray-800 rounded-xl p-6 border border-gray-700">
              <h3 className="text-xl font-bold text-white mb-6">Resume Creation Activity</h3>
              <div className="h-64 flex items-end justify-between gap-2">
                {[65, 80, 45, 90, 70, 85, 95, 75, 88, 92, 78, 86].map((height, idx) => (
                  <div key={idx} className="flex-1">
                    <div 
                      className="bg-gradient-to-t from-amber-600 to-orange-600 rounded-t"
                      style={{ height: `${height}%` }}
                    />
                    <div className="text-xs text-gray-500 text-center mt-2">
                      {['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'][idx]}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Recent Activity */}
            <div className="bg-gray-800 rounded-xl p-6 border border-gray-700">
              <h3 className="text-xl font-bold text-white mb-4">Recent Team Activity</h3>
              <div className="space-y-4">
                {[
                  { user: 'Sarah Chen', action: 'created a resume', target: 'Senior Developer Position', time: '2 minutes ago' },
                  { user: 'Michael Rodriguez', action: 'updated template', target: 'Executive Template', time: '15 minutes ago' },
                  { user: 'Emily Johnson', action: 'exported analytics', target: 'Q4 Report', time: '1 hour ago' },
                  { user: 'David Kim', action: 'invited team member', target: 'alex.wong@company.com', time: '3 hours ago' }
                ].map((activity, idx) => (
                  <div key={idx} className="flex items-center justify-between py-3 border-b border-gray-700 last:border-0">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 bg-gradient-to-br from-amber-500 to-orange-500 rounded-full flex items-center justify-center">
                        <span className="text-white text-sm font-bold">{activity.user[0]}</span>
                      </div>
                      <div>
                        <p className="text-gray-300">
                          <span className="font-medium text-white">{activity.user}</span> {activity.action} <span className="text-amber-400">{activity.target}</span>
                        </p>
                        <p className="text-xs text-gray-500">{activity.time}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {activeTab === 'team' && (
          <div className="space-y-6">
            {/* Search and Filter */}
            <div className="flex items-center gap-4">
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="text"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  placeholder="Search team members..."
                  className="w-full pl-10 pr-4 py-3 bg-gray-800 border border-gray-700 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-amber-500 transition-colors"
                />
              </div>
              <button className="px-4 py-3 bg-gray-800 hover:bg-gray-700 border border-gray-700 rounded-lg text-white font-medium transition-colors flex items-center gap-2">
                <Filter className="w-4 h-4" />
                Filters
              </button>
            </div>

            {/* Team Members Table */}
            <div className="bg-gray-800 rounded-xl border border-gray-700 overflow-hidden">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-gray-700">
                    <th className="text-left p-6 text-gray-400 font-medium">Member</th>
                    <th className="text-left p-6 text-gray-400 font-medium">Role</th>
                    <th className="text-left p-6 text-gray-400 font-medium">Status</th>
                    <th className="text-center p-6 text-gray-400 font-medium">Resumes</th>
                    <th className="text-left p-6 text-gray-400 font-medium">Last Active</th>
                    <th className="text-right p-6 text-gray-400 font-medium">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredMembers.map((member) => (
                    <tr key={member.id} className="border-b border-gray-700 hover:bg-gray-700/50 transition-colors">
                      <td className="p-6">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 bg-gradient-to-br from-amber-500 to-orange-500 rounded-full flex items-center justify-center">
                            <span className="text-white font-bold">{member.name[0]}</span>
                          </div>
                          <div>
                            <p className="font-medium text-white">{member.name}</p>
                            <p className="text-sm text-gray-400">{member.email}</p>
                          </div>
                        </div>
                      </td>
                      <td className="p-6 text-gray-300">{member.role}</td>
                      <td className="p-6">
                        <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${
                          member.status === 'active' 
                            ? 'bg-green-900/50 text-green-400'
                            : member.status === 'pending'
                            ? 'bg-yellow-900/50 text-yellow-400'
                            : 'bg-gray-700 text-gray-400'
                        }`}>
                          {member.status}
                        </span>
                      </td>
                      <td className="p-6 text-center text-gray-300">{member.resumesCreated}</td>
                      <td className="p-6 text-gray-400">{member.lastActive}</td>
                      <td className="p-6">
                        <div className="flex items-center justify-end gap-2">
                          <button className="p-2 hover:bg-gray-700 rounded-lg transition-colors">
                            <Eye className="w-4 h-4 text-gray-400" />
                          </button>
                          <button className="p-2 hover:bg-gray-700 rounded-lg transition-colors">
                            <Edit className="w-4 h-4 text-gray-400" />
                          </button>
                          <button 
                            onClick={() => handleDeleteMember(member.id)}
                            className="p-2 hover:bg-red-900/20 rounded-lg transition-colors"
                          >
                            <Trash2 className="w-4 h-4 text-red-400" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {activeTab === 'analytics' && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Performance Metrics */}
            <div className="bg-gray-800 rounded-xl p-6 border border-gray-700">
              <h3 className="text-xl font-bold text-white mb-6">Performance Metrics</h3>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-gray-400">Team Productivity</span>
                  <div className="flex items-center gap-2">
                    <div className="w-32 h-2 bg-gray-700 rounded-full overflow-hidden">
                      <div className="w-[94%] h-full bg-gradient-to-r from-green-500 to-emerald-500" />
                    </div>
                    <span className="text-sm font-medium text-green-400">94%</span>
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-400">ATS Pass Rate</span>
                  <div className="flex items-center gap-2">
                    <div className="w-32 h-2 bg-gray-700 rounded-full overflow-hidden">
                      <div className="w-[87%] h-full bg-gradient-to-r from-blue-500 to-cyan-500" />
                    </div>
                    <span className="text-sm font-medium text-blue-400">87%</span>
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-400">Template Usage</span>
                  <div className="flex items-center gap-2">
                    <div className="w-32 h-2 bg-gray-700 rounded-full overflow-hidden">
                      <div className="w-[78%] h-full bg-gradient-to-r from-purple-500 to-pink-500" />
                    </div>
                    <span className="text-sm font-medium text-purple-400">78%</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Top Templates */}
            <div className="bg-gray-800 rounded-xl p-6 border border-gray-700">
              <h3 className="text-xl font-bold text-white mb-6">Most Used Templates</h3>
              <div className="space-y-3">
                {[
                  { name: 'Executive Elite', uses: 342, trend: '+12%' },
                  { name: 'Professional Modern', uses: 287, trend: '+8%' },
                  { name: 'Tech Specialist', uses: 198, trend: '+15%' },
                  { name: 'Creative Designer', uses: 156, trend: '-3%' }
                ].map((template, idx) => (
                  <div key={idx} className="flex items-center justify-between p-3 bg-gray-700/50 rounded-lg">
                    <span className="font-medium text-white">{template.name}</span>
                    <div className="flex items-center gap-4">
                      <span className="text-gray-400">{template.uses} uses</span>
                      <span className={`text-sm ${template.trend.startsWith('+') ? 'text-green-400' : 'text-red-400'}`}>
                        {template.trend}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Invite Modal */}
      {showInviteModal && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-gray-900 rounded-2xl shadow-2xl max-w-md w-full border border-gray-800">
            <div className="flex items-center justify-between p-6 border-b border-gray-800">
              <h3 className="text-xl font-bold text-white">Invite Team Member</h3>
              <button
                onClick={() => setShowInviteModal(false)}
                className="p-2 hover:bg-gray-800 rounded-lg transition-colors"
              >
                <X className="w-5 h-5 text-gray-400" />
              </button>
            </div>

            <form onSubmit={handleInviteTeamMember} className="p-6 space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Email Address
                </label>
                <input
                  type="email"
                  required
                  value={inviteData.email}
                  onChange={(e) => setInviteData({ ...inviteData, email: e.target.value })}
                  className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-amber-500 transition-colors"
                  placeholder="colleague@company.com"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Role
                </label>
                <select
                  required
                  value={inviteData.role}
                  onChange={(e) => setInviteData({ ...inviteData, role: e.target.value })}
                  className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg text-white focus:outline-none focus:border-amber-500 transition-colors"
                >
                  <option value="">Select role</option>
                  <option value="admin">Admin</option>
                  <option value="manager">Manager</option>
                  <option value="member">Team Member</option>
                  <option value="viewer">Viewer</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Permissions
                </label>
                <div className="space-y-2">
                  {['Create Resumes', 'Edit Templates', 'View Analytics', 'Manage Team'].map((permission) => (
                    <label key={permission} className="flex items-center gap-2 text-sm text-gray-300">
                      <input
                        type="checkbox"
                        checked={inviteData.permissions.includes(permission)}
                        onChange={(e) => {
                          if (e.target.checked) {
                            setInviteData({ ...inviteData, permissions: [...inviteData.permissions, permission] });
                          } else {
                            setInviteData({ ...inviteData, permissions: inviteData.permissions.filter(p => p !== permission) });
                          }
                        }}
                        className="rounded border-gray-600 text-amber-600 focus:ring-amber-500"
                      />
                      {permission}
                    </label>
                  ))}
                </div>
              </div>

              <div className="flex gap-4 pt-4">
                <button
                  type="button"
                  onClick={() => setShowInviteModal(false)}
                  className="flex-1 px-4 py-2 bg-gray-800 hover:bg-gray-700 text-white font-medium rounded-lg transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 px-4 py-2 bg-gradient-to-r from-amber-600 to-orange-600 text-white font-medium rounded-lg hover:shadow-lg transition-all"
                >
                  Send Invite
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default EnterpriseDashboard;