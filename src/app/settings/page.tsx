'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';
import toast from 'react-hot-toast';
import UnifiedNavigation from '@/components/UnifiedNavigation';
import {
  User, Mail, Lock, Bell, Palette, Download, Trash2, 
  Save, ArrowLeft, Shield, CreditCard, Crown, Settings as SettingsIcon,
  Eye, EyeOff, Check, X, AlertTriangle, LogOut
} from 'lucide-react';

interface UserProfile {
  id: string;
  email: string;
  full_name?: string;
  avatar_url?: string;
  is_premium: boolean;
  created_at: string;
  updated_at: string;
}

const SettingsPage = () => {
  const [user, setUser] = useState<any>(null);
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [activeSection, setActiveSection] = useState<'profile' | 'account' | 'preferences' | 'data'>('profile');
  
  // Form states
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPasswords, setShowPasswords] = useState(false);
  
  // Preferences
  const [autoSave, setAutoSave] = useState(true);
  const [emailNotifications, setEmailNotifications] = useState(true);
  const [darkMode, setDarkMode] = useState(true);
  
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
      setEmail(user.email || '');

      // Get user profile
      const { data: profile } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', user.id)
        .single();

      if (profile) {
        setUserProfile(profile);
        setFullName(profile.full_name || '');
      }

      // Load preferences from localStorage
      loadPreferences();
    } catch (error) {
      console.error('Error loading user data:', error);
      toast.error('Failed to load settings');
    } finally {
      setLoading(false);
    }
  };

  const loadPreferences = () => {
    try {
      const savedPrefs = localStorage.getItem('smartats_preferences');
      if (savedPrefs) {
        const prefs = JSON.parse(savedPrefs);
        setAutoSave(prefs.autoSave ?? true);
        setEmailNotifications(prefs.emailNotifications ?? true);
        setDarkMode(prefs.darkMode ?? true);
      }
    } catch (error) {
      console.error('Failed to load preferences:', error);
    }
  };

  const saveProfile = async () => {
    setSaving(true);
    try {
      const { error } = await supabase
        .from('profiles')
        .update({
          full_name: fullName,
          updated_at: new Date().toISOString()
        })
        .eq('id', user.id);

      if (error) throw error;

      toast.success('Profile updated successfully!');
      
      // Update local state
      setUserProfile(prev => prev ? { ...prev, full_name: fullName } : null);
    } catch (error) {
      console.error('Error updating profile:', error);
      toast.error('Failed to update profile');
    } finally {
      setSaving(false);
    }
  };

  const changePassword = async () => {
    if (newPassword !== confirmPassword) {
      toast.error('New passwords do not match');
      return;
    }

    if (newPassword.length < 6) {
      toast.error('Password must be at least 6 characters long');
      return;
    }

    setSaving(true);
    try {
      const { error } = await supabase.auth.updateUser({
        password: newPassword
      });

      if (error) throw error;

      toast.success('Password updated successfully!');
      setCurrentPassword('');
      setNewPassword('');
      setConfirmPassword('');
    } catch (error) {
      console.error('Error updating password:', error);
      toast.error('Failed to update password');
    } finally {
      setSaving(false);
    }
  };

  const savePreferences = () => {
    try {
      const preferences = {
        autoSave,
        emailNotifications,
        darkMode
      };
      localStorage.setItem('smartats_preferences', JSON.stringify(preferences));
      toast.success('Preferences saved successfully!');
    } catch (error) {
      console.error('Failed to save preferences:', error);
      toast.error('Failed to save preferences');
    }
  };

  const exportAllData = () => {
    try {
      const savedResumes = localStorage.getItem('smartats_saved_resumes');
      const preferences = localStorage.getItem('smartats_preferences');
      
      const exportData = {
        profile: userProfile,
        resumes: savedResumes ? JSON.parse(savedResumes) : [],
        preferences: preferences ? JSON.parse(preferences) : {},
        exportedAt: new Date().toISOString()
      };

      const dataStr = JSON.stringify(exportData, null, 2);
      const dataBlob = new Blob([dataStr], { type: 'application/json' });
      const url = URL.createObjectURL(dataBlob);

      const link = document.createElement('a');
      link.href = url;
      link.download = `smartats_data_${new Date().toISOString().split('T')[0]}.json`;
      link.click();

      URL.revokeObjectURL(url);
      toast.success('Data exported successfully!');
    } catch (error) {
      console.error('Failed to export data:', error);
      toast.error('Failed to export data');
    }
  };

  const deleteAllData = async () => {
    const confirmed = confirm(
      'Are you sure you want to delete all your data? This action cannot be undone.'
    );
    
    if (!confirmed) return;

    try {
      // Clear localStorage
      localStorage.removeItem('smartats_saved_resumes');
      localStorage.removeItem('smartats_preferences');
      
      toast.success('All local data deleted successfully');
    } catch (error) {
      console.error('Failed to delete data:', error);
      toast.error('Failed to delete data');
    }
  };

  const signOut = async () => {
    try {
      const { error } = await supabase.auth.signOut();
      if (error) throw error;
      
      toast.success('Signed out successfully');
      window.location.href = '/';
    } catch (error) {
      console.error('Error signing out:', error);
      toast.error('Failed to sign out');
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-gray-950 via-gray-900 to-black text-white">
        <UnifiedNavigation />
        <div className="flex items-center justify-center min-h-[calc(100vh-80px)]">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto mb-4"></div>
            <p className="text-gray-400">Loading settings...</p>
          </div>
        </div>
      </div>
    );
  }

  const sections = [
    { id: 'profile', label: 'Profile', icon: User },
    { id: 'account', label: 'Account', icon: Shield },
    { id: 'preferences', label: 'Preferences', icon: SettingsIcon },
    { id: 'data', label: 'Data & Privacy', icon: Download }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-950 via-gray-900 to-black text-white">
      <UnifiedNavigation />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center space-x-4 mb-4">
            <Link
              href="/profiles"
              className="p-2 hover:bg-gray-800 rounded-lg transition-colors"
            >
              <ArrowLeft className="w-5 h-5 text-gray-400" />
            </Link>
            <div>
              <h1 className="text-3xl font-bold text-white">Settings</h1>
              <p className="text-gray-400">Manage your account and preferences</p>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Sidebar */}
          <div className="lg:col-span-1">
            <div className="bg-gray-800 rounded-xl border border-gray-700 p-4">
              <nav className="space-y-2">
                {sections.map((section) => {
                  const Icon = section.icon;
                  return (
                    <button
                      key={section.id}
                      onClick={() => setActiveSection(section.id as any)}
                      className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg font-medium transition-colors text-left ${
                        activeSection === section.id
                          ? 'bg-blue-600 text-white'
                          : 'text-gray-300 hover:bg-gray-700 hover:text-white'
                      }`}
                    >
                      <Icon className="w-5 h-5" />
                      <span>{section.label}</span>
                    </button>
                  );
                })}
              </nav>
            </div>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-3">
            <div className="bg-gray-800 rounded-xl border border-gray-700 p-6">
              {activeSection === 'profile' && (
                <div>
                  <h2 className="text-xl font-bold text-white mb-6">Profile Information</h2>
                  
                  <div className="space-y-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-2">
                        Full Name
                      </label>
                      <input
                        type="text"
                        value={fullName}
                        onChange={(e) => setFullName(e.target.value)}
                        className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        placeholder="Enter your full name"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-2">
                        Email Address
                      </label>
                      <input
                        type="email"
                        value={email}
                        disabled
                        className="w-full px-4 py-3 bg-gray-600 border border-gray-600 rounded-lg text-gray-400 cursor-not-allowed"
                      />
                      <p className="text-xs text-gray-500 mt-1">
                        Email cannot be changed. Contact support if needed.
                      </p>
                    </div>

                    <div className="flex items-center space-x-2">
                      {userProfile?.is_premium ? (
                        <span className="px-3 py-1 bg-gradient-to-r from-pink-600 to-purple-600 text-white rounded-full text-sm font-medium flex items-center gap-1">
                          <Crown className="w-4 h-4" />
                          Premium Member
                        </span>
                      ) : (
                        <Link
                          href="/pricing"
                          className="px-4 py-2 bg-gradient-to-r from-pink-600 to-purple-600 text-white rounded-lg font-medium hover:shadow-lg transition-all"
                        >
                          Upgrade to Premium
                        </Link>
                      )}
                    </div>

                    <button
                      onClick={saveProfile}
                      disabled={saving}
                      className="px-6 py-3 bg-blue-600 hover:bg-blue-700 disabled:bg-blue-800 text-white rounded-lg font-medium transition-colors flex items-center space-x-2"
                    >
                      {saving ? (
                        <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                      ) : (
                        <Save className="w-4 h-4" />
                      )}
                      <span>{saving ? 'Saving...' : 'Save Changes'}</span>
                    </button>
                  </div>
                </div>
              )}

              {activeSection === 'account' && (
                <div>
                  <h2 className="text-xl font-bold text-white mb-6">Account Security</h2>
                  
                  <div className="space-y-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-2">
                        Current Password
                      </label>
                      <div className="relative">
                        <input
                          type={showPasswords ? 'text' : 'password'}
                          value={currentPassword}
                          onChange={(e) => setCurrentPassword(e.target.value)}
                          className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent pr-12"
                          placeholder="Enter current password"
                        />
                        <button
                          type="button"
                          onClick={() => setShowPasswords(!showPasswords)}
                          className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-white"
                        >
                          {showPasswords ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                        </button>
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-2">
                        New Password
                      </label>
                      <input
                        type={showPasswords ? 'text' : 'password'}
                        value={newPassword}
                        onChange={(e) => setNewPassword(e.target.value)}
                        className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        placeholder="Enter new password"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-2">
                        Confirm New Password
                      </label>
                      <input
                        type={showPasswords ? 'text' : 'password'}
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        placeholder="Confirm new password"
                      />
                    </div>

                    <button
                      onClick={changePassword}
                      disabled={saving || !currentPassword || !newPassword || !confirmPassword}
                      className="px-6 py-3 bg-green-600 hover:bg-green-700 disabled:bg-gray-600 text-white rounded-lg font-medium transition-colors flex items-center space-x-2"
                    >
                      {saving ? (
                        <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                      ) : (
                        <Lock className="w-4 h-4" />
                      )}
                      <span>{saving ? 'Updating...' : 'Update Password'}</span>
                    </button>

                    <hr className="border-gray-700" />

                    <div>
                      <h3 className="text-lg font-semibold text-white mb-4">Sign Out</h3>
                      <p className="text-gray-400 mb-4">
                        Sign out of your account on this device.
                      </p>
                      <button
                        onClick={signOut}
                        className="px-6 py-3 bg-red-600 hover:bg-red-700 text-white rounded-lg font-medium transition-colors flex items-center space-x-2"
                      >
                        <LogOut className="w-4 h-4" />
                        <span>Sign Out</span>
                      </button>
                    </div>
                  </div>
                </div>
              )}

              {activeSection === 'preferences' && (
                <div>
                  <h2 className="text-xl font-bold text-white mb-6">Preferences</h2>
                  
                  <div className="space-y-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className="text-white font-medium">Auto-save</h3>
                        <p className="text-gray-400 text-sm">Automatically save your resume as you work</p>
                      </div>
                      <button
                        onClick={() => setAutoSave(!autoSave)}
                        className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                          autoSave ? 'bg-blue-600' : 'bg-gray-600'
                        }`}
                      >
                        <span
                          className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                            autoSave ? 'translate-x-6' : 'translate-x-1'
                          }`}
                        />
                      </button>
                    </div>

                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className="text-white font-medium">Email Notifications</h3>
                        <p className="text-gray-400 text-sm">Receive updates and tips via email</p>
                      </div>
                      <button
                        onClick={() => setEmailNotifications(!emailNotifications)}
                        className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                          emailNotifications ? 'bg-blue-600' : 'bg-gray-600'
                        }`}
                      >
                        <span
                          className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                            emailNotifications ? 'translate-x-6' : 'translate-x-1'
                          }`}
                        />
                      </button>
                    </div>

                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className="text-white font-medium">Dark Mode</h3>
                        <p className="text-gray-400 text-sm">Use dark theme (currently always enabled)</p>
                      </div>
                      <button
                        onClick={() => setDarkMode(!darkMode)}
                        className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                          darkMode ? 'bg-blue-600' : 'bg-gray-600'
                        }`}
                      >
                        <span
                          className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                            darkMode ? 'translate-x-6' : 'translate-x-1'
                          }`}
                        />
                      </button>
                    </div>

                    <button
                      onClick={savePreferences}
                      className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium transition-colors flex items-center space-x-2"
                    >
                      <Save className="w-4 h-4" />
                      <span>Save Preferences</span>
                    </button>
                  </div>
                </div>
              )}

              {activeSection === 'data' && (
                <div>
                  <h2 className="text-xl font-bold text-white mb-6">Data & Privacy</h2>
                  
                  <div className="space-y-6">
                    <div>
                      <h3 className="text-lg font-semibold text-white mb-2">Export Your Data</h3>
                      <p className="text-gray-400 mb-4">
                        Download all your resume data, preferences, and profile information.
                      </p>
                      <button
                        onClick={exportAllData}
                        className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium transition-colors flex items-center space-x-2"
                      >
                        <Download className="w-4 h-4" />
                        <span>Export Data</span>
                      </button>
                    </div>

                    <hr className="border-gray-700" />

                    <div>
                      <h3 className="text-lg font-semibold text-white mb-2 flex items-center gap-2">
                        <AlertTriangle className="w-5 h-5 text-red-400" />
                        Delete All Data
                      </h3>
                      <p className="text-gray-400 mb-4">
                        Permanently delete all your local resume data and preferences. This action cannot be undone.
                      </p>
                      <button
                        onClick={deleteAllData}
                        className="px-6 py-3 bg-red-600 hover:bg-red-700 text-white rounded-lg font-medium transition-colors flex items-center space-x-2"
                      >
                        <Trash2 className="w-4 h-4" />
                        <span>Delete All Data</span>
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SettingsPage;
