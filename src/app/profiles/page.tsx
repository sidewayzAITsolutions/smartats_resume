'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';
import toast from 'react-hot-toast';
import UnifiedNavigation from '@/components/UnifiedNavigation';
import {
  User, FileText, Calendar, Download, Trash2, Edit3, Plus,
  Eye, Star, Clock, BarChart3, Target, Briefcase, Crown,
  ArrowRight, Settings, Upload, Save
} from 'lucide-react';

interface SavedResume {
  id: string;
  name: string;
  data: any;
  targetRole?: string;
  industryFocus?: string;
  createdAt?: string;
  updatedAt?: string;
  atsScore?: number;
  scoreBreakdown?: any;
}

interface UserProfile {
  id: string;
  email: string;
  full_name?: string;
  avatar_url?: string;
  is_premium: boolean;
  created_at: string;
  updated_at: string;
}

const ProfilesPage = () => {
  const [user, setUser] = useState<any>(null);
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null);
  const [savedResumes, setSavedResumes] = useState<SavedResume[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<'resumes' | 'profile'>('resumes');
  const supabase = createClientComponentClient();

  useEffect(() => {
    checkUserAndLoadData();
  }, []);

  const checkUserAndLoadData = async () => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      
      if (!user) {
        window.location.href = '/login';
        return;
      }

      setUser(user);

      // Get user profile
      const { data: profile } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', user.id)
        .single();

      setUserProfile(profile);

      // Load saved resumes from localStorage
      loadSavedResumes();
    } catch (error) {
      console.error('Error loading user data:', error);
      toast.error('Failed to load profile data');
    } finally {
      setLoading(false);
    }
  };

  const loadSavedResumes = () => {
    try {
      const saved = localStorage.getItem('smartats_saved_resumes');
      if (saved) {
        setSavedResumes(JSON.parse(saved));
      }
    } catch (error) {
      console.error('Failed to load saved resumes:', error);
      toast.error('Failed to load saved resumes');
    }
  };

  const deleteResume = (resumeId: string) => {
    try {
      const existingSaves = JSON.parse(localStorage.getItem('smartats_saved_resumes') || '[]');
      const resumeToDelete = existingSaves.find((resume: SavedResume) => resume.id === resumeId);
      const filtered = existingSaves.filter((resume: SavedResume) => resume.id !== resumeId);
      
      localStorage.setItem('smartats_saved_resumes', JSON.stringify(filtered));
      setSavedResumes(filtered);
      
      if (resumeToDelete) {
        toast.success(`Resume "${resumeToDelete.name}" deleted successfully`);
      }
    } catch (error) {
      console.error('Failed to delete resume:', error);
      toast.error('Failed to delete resume. Please try again.');
    }
  };

  const exportResume = (resume: SavedResume) => {
    const exportData = {
      resumeData: resume.data,
      targetRole: resume.targetRole,
      industryFocus: resume.industryFocus,
      atsScore: resume.atsScore,
      scoreBreakdown: resume.scoreBreakdown,
      exportedAt: new Date().toISOString()
    };

    const dataStr = JSON.stringify(exportData, null, 2);
    const dataBlob = new Blob([dataStr], { type: 'application/json' });
    const url = URL.createObjectURL(dataBlob);

    const link = document.createElement('a');
    link.href = url;
    link.download = `${resume.name}_data.json`;
    link.click();

    URL.revokeObjectURL(url);
    toast.success('Resume exported successfully!');
  };

  const formatDate = (dateString?: string) => {
    if (!dateString) return 'Unknown';
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-gray-950 via-gray-900 to-black text-white">
        <UnifiedNavigation />
        <div className="flex items-center justify-center min-h-[calc(100vh-80px)]">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto mb-4"></div>
            <p className="text-gray-400">Loading your profile...</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-950 via-gray-900 to-black text-white">
      <UnifiedNavigation />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-white mb-2">My Profile</h1>
              <p className="text-gray-400">Manage your resumes and profile settings</p>
            </div>
            <Link
              href="/builder"
              className="px-6 py-3 bg-gradient-to-r from-teal-600 to-amber-600 text-white rounded-xl font-medium hover:shadow-lg transform hover:scale-105 transition-all duration-200 flex items-center space-x-2"
            >
              <Plus className="w-5 h-5" />
              <span>Create New Resume</span>
            </Link>
          </div>
        </div>

        {/* Profile Summary Card */}
        <div className="bg-gray-800 rounded-2xl p-6 border border-gray-700 mb-8">
          <div className="flex items-center space-x-4">
            <div className="w-16 h-16 bg-gradient-to-r from-teal-600 to-amber-600 rounded-full flex items-center justify-center">
              <User className="w-8 h-8 text-white" />
            </div>
            <div className="flex-1">
              <h2 className="text-xl font-bold text-white">
                {userProfile?.full_name || user?.email || 'User'}
              </h2>
              <p className="text-gray-400">{user?.email}</p>
              <div className="flex items-center space-x-4 mt-2">
                <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                  userProfile?.is_premium 
                    ? 'bg-gradient-to-r from-pink-600 to-purple-600 text-white' 
                    : 'bg-gray-700 text-gray-300'
                }`}>
                  {userProfile?.is_premium ? (
                    <span className="flex items-center gap-1">
                      <Crown className="w-4 h-4" />
                      Premium
                    </span>
                  ) : (
                    'Free Plan'
                  )}
                </span>
                <span className="text-gray-500 text-sm">
                  Member since {formatDate(userProfile?.created_at)}
                </span>
              </div>
            </div>
            <Link
              href="/settings"
              className="px-4 py-2 bg-gray-700 hover:bg-gray-600 text-white rounded-lg font-medium transition-colors flex items-center space-x-2"
            >
              <Settings className="w-4 h-4" />
              <span>Settings</span>
            </Link>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-gray-800 rounded-xl p-6 border border-gray-700">
            <div className="flex items-center space-x-3">
              <div className="w-12 h-12 bg-blue-600 rounded-lg flex items-center justify-center">
                <FileText className="w-6 h-6 text-white" />
              </div>
              <div>
                <p className="text-2xl font-bold text-white">{savedResumes.length}</p>
                <p className="text-gray-400 text-sm">Saved Resumes</p>
              </div>
            </div>
          </div>
          
          <div className="bg-gray-800 rounded-xl p-6 border border-gray-700">
            <div className="flex items-center space-x-3">
              <div className="w-12 h-12 bg-green-600 rounded-lg flex items-center justify-center">
                <BarChart3 className="w-6 h-6 text-white" />
              </div>
              <div>
                <p className="text-2xl font-bold text-white">
                  {savedResumes.length > 0 
                    ? Math.round(savedResumes.reduce((acc, resume) => acc + (resume.atsScore || 0), 0) / savedResumes.length)
                    : 0
                  }
                </p>
                <p className="text-gray-400 text-sm">Avg ATS Score</p>
              </div>
            </div>
          </div>
          
          <div className="bg-gray-800 rounded-xl p-6 border border-gray-700">
            <div className="flex items-center space-x-3">
              <div className="w-12 h-12 bg-purple-600 rounded-lg flex items-center justify-center">
                <Target className="w-6 h-6 text-white" />
              </div>
              <div>
                <p className="text-2xl font-bold text-white">
                  {new Set(savedResumes.map(r => r.targetRole).filter(Boolean)).size}
                </p>
                <p className="text-gray-400 text-sm">Target Roles</p>
              </div>
            </div>
          </div>
        </div>

        {/* Resumes List */}
        <div className="bg-gray-800 rounded-2xl border border-gray-700">
          <div className="p-6 border-b border-gray-700">
            <h3 className="text-xl font-bold text-white">Your Resumes</h3>
            <p className="text-gray-400 mt-1">Manage and organize your resume versions</p>
          </div>
          
          <div className="p-6">
            {savedResumes.length === 0 ? (
              <div className="text-center py-12">
                <FileText className="w-16 h-16 text-gray-500 mx-auto mb-4" />
                <h3 className="text-lg font-semibold text-gray-300 mb-2">No Resumes Yet</h3>
                <p className="text-gray-400 mb-6">Create your first resume to get started</p>
                <Link
                  href="/builder"
                  className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-teal-600 to-amber-600 text-white rounded-xl font-medium hover:shadow-lg transform hover:scale-105 transition-all duration-200"
                >
                  <Plus className="w-5 h-5 mr-2" />
                  Create Resume
                </Link>
              </div>
            ) : (
              <div className="space-y-4">
                {savedResumes.map((resume) => (
                  <div key={resume.id} className="bg-gray-700 rounded-lg p-4 hover:bg-gray-600 transition-colors">
                    <div className="flex items-center justify-between">
                      <div className="flex-1">
                        <h4 className="text-lg font-semibold text-white mb-1">{resume.name}</h4>
                        <div className="flex items-center space-x-4 text-sm text-gray-400">
                          <span className="flex items-center gap-1">
                            <Calendar className="w-4 h-4" />
                            Updated {formatDate(resume.updatedAt)}
                          </span>
                          {resume.targetRole && (
                            <span className="flex items-center gap-1">
                              <Briefcase className="w-4 h-4" />
                              {resume.targetRole}
                            </span>
                          )}
                          {resume.atsScore && (
                            <span className="flex items-center gap-1">
                              <BarChart3 className="w-4 h-4" />
                              ATS Score: {resume.atsScore}
                            </span>
                          )}
                        </div>
                      </div>
                      
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => exportResume(resume)}
                          className="p-2 text-blue-400 hover:bg-gray-600 rounded-lg transition-colors"
                          title="Export Resume"
                        >
                          <Download className="w-4 h-4" />
                        </button>
                        <Link
                          href={`/builder?resume=${resume.id}`}
                          className="p-2 text-green-400 hover:bg-gray-600 rounded-lg transition-colors"
                          title="Edit Resume"
                        >
                          <Edit3 className="w-4 h-4" />
                        </Link>
                        <button
                          onClick={() => {
                            if (confirm('Are you sure you want to delete this resume?')) {
                              deleteResume(resume.id);
                            }
                          }}
                          className="p-2 text-red-400 hover:bg-red-900/20 rounded-lg transition-colors"
                          title="Delete Resume"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilesPage;
