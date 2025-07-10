// src/components/Navigation.tsx
'use client';
import React, { useState, useEffect } from 'react';
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { 
  FileText, Menu, X, LogOut, User, Crown, 
  ChevronDown, Building, Target
} from 'lucide-react';
import toast from 'react-hot-toast';

interface UserData {
  id: string;
  email: string;
  fullName?: string;
  isPremium: boolean;
  isEnterprise?: boolean;
}

export default function Navigation() {
  const router = useRouter();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrollY, setScrollY] = useState(0);
  const [userData, setUserData] = useState<UserData | null>(null);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const supabase = createClientComponentClient();

  useEffect(() => {
    checkUserStatus();
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const checkUserStatus = async () => {
    try {
      const { data: { user }, error: authError } = await supabase.auth.getUser();

      if (authError || !user) {
        setUserData(null);
        return;
      }

      // Get user profile with premium status
      const { data: profile } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', user.id)
        .single();

      if (profile) {
        setUserData({
          id: user.id,
          email: profile.email || user.email || '',
          fullName: profile.full_name || user.user_metadata?.full_name || '',
          isPremium: profile.is_premium || profile.subscription_status === 'active',
          isEnterprise: profile.subscription_status === 'enterprise'
        });
      }
    } catch (error) {
      console.error('Error checking user status:', error);
      setUserData(null);
    }
  };

  const handleLogout = async () => {
    try {
      const { error } = await supabase.auth.signOut();
      if (error) throw error;

      // Clear local storage
      localStorage.clear();
      sessionStorage.clear();

      toast.success('Logged out successfully');
      setUserData(null);
      router.push('/');
    } catch (error) {
      console.error('Error during logout:', error);
      toast.error('Failed to logout');
    }
  };

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
      scrollY > 20 ? 'bg-gray-900/90 backdrop-blur-md shadow-lg border-b border-gray-800' : 'bg-transparent'
    }`}>
      <nav className="max-w-7xl mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          <Link href="/" className="flex items-center gap-3">
            <div className="relative w-12 h-12">
              <img src="/horse-logo.png" alt="SmartATS Logo" className="w-full h-full object-contain" />
            </div>
            <div>
              <div className="text-2xl font-bold bg-gradient-to-r from-teal-400 to-amber-400 bg-clip-text text-transparent">
                SmartATS
              </div>
              <div className="text-xs text-gray-500">Beat the Bots</div>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-8">
            <Link href="/templates" className="text-gray-300 hover:text-teal-400 font-medium transition-colors">
              Templates
            </Link>
            <Link href="/pricing" className="text-gray-300 hover:text-teal-400 font-medium transition-colors">
              Pricing
            </Link>
            <Link href="/enterprise" className="text-gray-300 hover:text-teal-400 font-medium transition-colors flex items-center gap-1">
              <Building className="w-4 h-4" />
              Enterprise
            </Link>
            <Link href="/ats-guide" className="text-gray-300 hover:text-teal-400 font-medium transition-colors">
              ATS Guide
            </Link>

            {userData ? (
              <div className="flex items-center gap-4">
                {/* User Menu */}
                <div className="relative">
                  <button
                    onClick={() => setDropdownOpen(!dropdownOpen)}
                    className="flex items-center gap-2 px-4 py-2 bg-gray-800 hover:bg-gray-700 rounded-lg transition-colors"
                  >
                    <User className="w-4 h-4" />
                    <span className="text-sm font-medium text-gray-200">
                      {userData.fullName || userData.email.split('@')[0]}
                    </span>
                    {userData.isPremium && (
                      <Crown className="w-4 h-4 text-amber-400" />
                    )}
                    {userData.isEnterprise && (
                      <Building className="w-4 h-4 text-purple-400" />
                    )}
                    <ChevronDown className={`w-4 h-4 transition-transform ${dropdownOpen ? 'rotate-180' : ''}`} />
                  </button>

                  {dropdownOpen && (
                    <div className="absolute right-0 mt-2 w-56 bg-gray-800 rounded-lg shadow-lg border border-gray-700 py-2">
                      <Link href="/builder" className="flex items-center gap-2 px-4 py-2 hover:bg-gray-700 text-gray-300 hover:text-white transition-colors">
                        <FileText className="w-4 h-4" />
                        Resume Builder
                      </Link>
                      <Link href="/dashboard" className="flex items-center gap-2 px-4 py-2 hover:bg-gray-700 text-gray-300 hover:text-white transition-colors">
                        <Target className="w-4 h-4" />
                        Dashboard
                      </Link>
                      {userData.isEnterprise && (
                        <Link href="/enterprise/dashboard" className="flex items-center gap-2 px-4 py-2 hover:bg-gray-700 text-gray-300 hover:text-white transition-colors">
                          <Building className="w-4 h-4" />
                          Enterprise Dashboard
                        </Link>
                      )}
                      <hr className="my-2 border-gray-700" />
                      <button
                        onClick={handleLogout}
                        className="w-full flex items-center gap-2 px-4 py-2 hover:bg-red-900/20 text-gray-300 hover:text-red-400 transition-colors text-left"
                      >
                        <LogOut className="w-4 h-4" />
                        Logout
                      </button>
                    </div>
                  )}
                </div>

                <Link href="/builder" className="bg-gradient-to-r from-teal-600 to-amber-600 text-white px-6 py-2.5 rounded-xl font-medium hover:shadow-lg transform hover:scale-105 transition-all duration-200">
                  Build Resume
                </Link>
              </div>
            ) : (
              <Link href="/login" className="bg-gradient-to-r from-teal-600 to-amber-600 text-white px-6 py-2.5 rounded-xl font-medium hover:shadow-lg transform hover:scale-105 transition-all duration-200">
                Start Free
              </Link>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 rounded-lg hover:bg-gray-800 text-gray-300"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden absolute top-full left-0 right-0 bg-gray-900 shadow-lg border-t border-gray-800 p-6 space-y-4">
            <Link href="/templates" className="block text-gray-300 hover:text-teal-400 font-medium">
              Templates
            </Link>
            <Link href="/pricing" className="block text-gray-300 hover:text-teal-400 font-medium">
              Pricing
            </Link>
            <Link href="/enterprise" className="block text-gray-300 hover:text-teal-400 font-medium">
              Enterprise
            </Link>
            <Link href="/ats-guide" className="block text-gray-300 hover:text-teal-400 font-medium">
              ATS Guide
            </Link>
            
            {userData ? (
              <>
                <hr className="border-gray-700" />
                <div className="space-y-3">
                  <div className="text-sm text-gray-400">
                    Signed in as {userData.email}
                    {userData.isPremium && <Crown className="w-4 h-4 text-amber-400 inline ml-2" />}
                  </div>
                  <Link href="/builder" className="block w-full bg-gradient-to-r from-teal-600 to-amber-600 text-white px-6 py-3 rounded-xl font-medium text-center">
                    Build Resume
                  </Link>
                  <button
                    onClick={handleLogout}
                    className="w-full flex items-center justify-center gap-2 px-6 py-3 bg-red-900/20 text-red-400 rounded-xl font-medium"
                  >
                    <LogOut className="w-4 h-4" />
                    Logout
                  </button>
                </div>
              </>
            ) : (
              <Link href="/login" className="block w-full bg-gradient-to-r from-teal-600 to-amber-600 text-white px-6 py-3 rounded-xl font-medium text-center">
                Start Free
              </Link>
            )}
          </div>
        )}
      </nav>

      {/* Click outside to close dropdown */}
      {dropdownOpen && (
        <div 
          className="fixed inset-0 z-40" 
          onClick={() => setDropdownOpen(false)}
        />
      )}
    </header>
  );
}