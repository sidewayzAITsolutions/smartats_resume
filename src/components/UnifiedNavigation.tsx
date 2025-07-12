'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  Menu, X, Zap, User, FileText, BarChart3, LogOut, Loader2,
  Save, Download, Eye, FileDown, FolderOpen, ChevronDown,
  CreditCard, Building2, BookOpen, Crown, Plus, Briefcase, GraduationCap
} from 'lucide-react';
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';
import toast from 'react-hot-toast';

interface UnifiedNavigationProps {
  // Builder-specific props
  resumeName?: string;
  saveStatus?: 'saved' | 'saving' | 'unsaved';
  onSave?: () => void;
  onLoad?: () => void;
  onPreview?: () => void;
  onExportPDF?: () => void;

}

const UnifiedNavigation = ({
  resumeName,
  saveStatus,
  onSave,
  onLoad,
  onPreview,
  onExportPDF
}: UnifiedNavigationProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [user, setUser] = useState<any>(null);
  const [userProfile, setUserProfile] = useState<any>(null);
  const [isLoggingOut, setIsLoggingOut] = useState(false);
  const [showUserMenu, setShowUserMenu] = useState(false);
  const pathname = usePathname();
  const supabase = createClientComponentClient();

  const isBuilder = pathname === '/builder';
  const isTemplates = pathname === '/templates';

  useEffect(() => {
    const checkUser = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      setUser(user);

      if (user) {
        const { data: profile } = await supabase
          .from('profiles')
          .select('*')
          .eq('id', user.id)
          .single();
        setUserProfile(profile);
      }
    };
    checkUser();
  }, [supabase]);

  const handleLogout = async () => {
    if (isLoggingOut) return;
    setIsLoggingOut(true);

    try {
      const { error } = await supabase.auth.signOut();
      if (error) {
        toast.error('Error signing out');
      } else {
        toast.success('Signed out successfully');
      }
      localStorage.clear();
      sessionStorage.clear();
      setUser(null);
      window.location.href = '/';
    } catch (error) {
      console.error('Error during logout:', error);
      toast.error('Error signing out');
      localStorage.clear();
      sessionStorage.clear();
      setUser(null);
      window.location.href = '/';
    } finally {
      setIsLoggingOut(false);
    }
  };

  const mainNavItems = [
    { href: '/templates', label: 'Templates', icon: <BarChart3 className="w-4 h-4" /> },
    { href: '/pricing', label: 'Pricing', icon: <CreditCard className="w-4 h-4" /> },
    { href: '/enterprise', label: 'Enterprise', icon: <Building2 className="w-4 h-4" /> },
  ];



  return (
    <nav className="sticky top-0 z-50 bg-gray-900/95 backdrop-blur-md border-b border-gray-800 shadow-lg">
      <div className="mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Left Section */}
          <div className="flex items-center space-x-8">
            {/* Logo */}
            <Link href="/" className="flex items-center space-x-3 group">
              <div className="relative w-10 h-10">
                <img 
                  src="/horse-logo.png" 
                  alt="SmartATS" 
                  className="w-full h-full object-contain group-hover:scale-110 transition-transform" 
                />
              </div>
              <span className="text-xl font-bold text-white">SmartATS</span>
            </Link>

            {/* Builder-specific: Resume Name */}
            {isBuilder && resumeName && (
              <div className="hidden md:flex items-center space-x-2 text-gray-300">
                <FileText className="w-4 h-4" />
                <span className="font-medium">{resumeName}</span>
                <span className="text-xs text-gray-500">
                  {saveStatus === 'saving' && '• Saving...'}
                  {saveStatus === 'saved' && '• Saved'}
                  {saveStatus === 'unsaved' && '• Unsaved changes'}
                </span>
              </div>
            )}

            {/* Main Navigation Links - Desktop */}
            <div className="hidden lg:flex items-center space-x-6">
              {mainNavItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`flex items-center space-x-2 font-medium transition-colors ${
                    pathname === item.href
                      ? 'text-blue-400'
                      : 'text-gray-300 hover:text-white'
                  }`}
                >
                  {item.icon}
                  <span>{item.label}</span>
                </Link>
              ))}
            </div>
          </div>

          {/* Right Section */}
          <div className="flex items-center space-x-4">
            {/* Templates-specific: Build Resume button */}
            {isTemplates && user && (
              <Link
                href="/builder"
                className="bg-gradient-to-r from-teal-600 to-amber-600 text-white px-6 py-2.5 rounded-xl font-medium hover:shadow-lg transform hover:scale-105 transition-all duration-200 flex items-center space-x-2"
              >
                <FileText className="w-4 h-4" />
                <span>Build Resume</span>
              </Link>
            )}

            {/* Builder-specific controls */}
            {isBuilder && (
              <div className="hidden md:flex items-center space-x-3">
                <button
                  type="button"
                  onClick={onSave}
                  className="flex items-center space-x-2 px-4 py-2 bg-pink-600 hover:bg-pink-700 text-white rounded-lg font-medium transition-colors"
                >
                  <Save className="w-4 h-4" />
                  <span>Save</span>
                </button>
                <button
                  type="button"
                  onClick={onLoad}
                  className="flex items-center space-x-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium transition-colors"
                >
                  <FolderOpen className="w-4 h-4" />
                  <span>Load</span>
                </button>
                <button
                  type="button"
                  onClick={onPreview}
                  className="flex items-center space-x-2 px-4 py-2 bg-gray-700 hover:bg-gray-600 text-white rounded-lg font-medium transition-colors"
                >
                  <Eye className="w-4 h-4" />
                  <span>Preview</span>
                </button>
                <button
                  type="button"
                  onClick={onExportPDF}
                  className="flex items-center space-x-2 px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg font-medium transition-colors"
                >
                  <FileDown className="w-4 h-4" />
                  <span>PDF</span>
                </button>
              </div>
            )}

            {/* User Section */}
            {user ? (
              <div className="relative">
                <button
                  type="button"
                  onClick={() => setShowUserMenu(!showUserMenu)}
                  className="flex items-center space-x-2 px-4 py-2 bg-gray-800 hover:bg-gray-700 text-white rounded-lg font-medium transition-colors"
                >
                  <User className="w-4 h-4" />
                  <span className="hidden md:inline">
                    {userProfile?.full_name || user.email?.split('@')[0] || 'User'}
                  </span>
                  <ChevronDown className="w-4 h-4" />
                </button>

                {/* User Dropdown */}
                {showUserMenu && (
                  <div className="absolute right-0 mt-2 w-48 bg-gray-800 rounded-lg shadow-xl border border-gray-700 py-1">
                    <Link
                      href="/profiles"
                      className="block px-4 py-2 text-gray-300 hover:bg-gray-700 hover:text-white transition-colors"
                      onClick={() => setShowUserMenu(false)}
                    >
                      Profile
                    </Link>
                    <Link
                      href="/settings"
                      className="block px-4 py-2 text-gray-300 hover:bg-gray-700 hover:text-white transition-colors"
                      onClick={() => setShowUserMenu(false)}
                    >
                      Settings
                    </Link>
                    <hr className="my-1 border-gray-700" />
                    <button
                      type="button"
                      onClick={() => {
                        setShowUserMenu(false);
                        handleLogout();
                      }}
                      disabled={isLoggingOut}
                      className="w-full text-left px-4 py-2 text-gray-300 hover:bg-gray-700 hover:text-white transition-colors disabled:opacity-50"
                    >
                      {isLoggingOut ? (
                        <span className="flex items-center space-x-2">
                          <Loader2 className="w-4 h-4 animate-spin" />
                          <span>Signing out...</span>
                        </span>
                      ) : (
                        <span className="flex items-center space-x-2">
                          <LogOut className="w-4 h-4" />
                          <span>Logout</span>
                        </span>
                      )}
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <Link
                href={isBuilder || isTemplates ? "/builder" : "/signup"}
                className="px-6 py-2.5 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg font-medium hover:from-blue-700 hover:to-purple-700 transition-all duration-200 transform hover:scale-105 shadow-lg"
              >
                {isBuilder || isTemplates ? "Build Resume" : "Get Started"}
              </Link>
            )}

            {/* Mobile menu button */}
            <button
              type="button"
              onClick={() => setIsOpen(!isOpen)}
              className="lg:hidden p-2 rounded-lg text-gray-300 hover:text-white hover:bg-gray-800 transition-colors"
            >
              {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>



        {/* Mobile Navigation */}
        {isOpen && (
          <div className="lg:hidden py-4 border-t border-gray-800">
            <div className="flex flex-col space-y-3">
              {/* Mobile Navigation Links */}
              {mainNavItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`flex items-center space-x-3 px-4 py-2 rounded-lg font-medium transition-colors ${
                    pathname === item.href
                      ? 'bg-gray-800 text-blue-400'
                      : 'text-gray-300 hover:bg-gray-800 hover:text-white'
                  }`}
                  onClick={() => setIsOpen(false)}
                >
                  {item.icon}
                  <span>{item.label}</span>
                </Link>
              ))}

              {/* Mobile Builder Controls */}
              {isBuilder && (
                <>
                  <hr className="border-gray-800" />
                  <div className="grid grid-cols-2 gap-2 px-4">
                    <button
                      type="button"
                      onClick={() => {
                        onSave?.();
                        setIsOpen(false);
                      }}
                      className="flex items-center justify-center space-x-2 px-4 py-2 bg-pink-600 text-white rounded-lg"
                    >
                      <Save className="w-4 h-4" />
                      <span>Save</span>
                    </button>
                    <button
                      type="button"
                      onClick={() => {
                        onLoad?.();
                        setIsOpen(false);
                      }}
                      className="flex items-center justify-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-lg"
                    >
                      <FolderOpen className="w-4 h-4" />
                      <span>Load</span>
                    </button>
                    <button
                      type="button"
                      onClick={() => {
                        onPreview?.();
                        setIsOpen(false);
                      }}
                      className="flex items-center justify-center space-x-2 px-4 py-2 bg-gray-700 text-white rounded-lg"
                    >
                      <Eye className="w-4 h-4" />
                      <span>Preview</span>
                    </button>
                    <button
                      type="button"
                      onClick={() => {
                        onExportPDF?.();
                        setIsOpen(false);
                      }}
                      className="flex items-center justify-center space-x-2 px-4 py-2 bg-green-600 text-white rounded-lg"
                    >
                      <FileDown className="w-4 h-4" />
                      <span>PDF</span>
                    </button>
                  </div>
                </>
              )}

              {/* Mobile Templates: Build Resume button */}
              {isTemplates && user && (
                <>
                  <hr className="border-gray-800" />
                  <div className="px-4">
                    <Link
                      href="/builder"
                      className="block w-full text-center px-6 py-2.5 bg-gradient-to-r from-teal-600 to-amber-600 text-white rounded-xl font-medium"
                      onClick={() => setIsOpen(false)}
                    >
                      Build Resume
                    </Link>
                  </div>
                </>
              )}

              {/* Mobile User Section */}
              <hr className="border-gray-800" />
              {user ? (
                <div className="px-4 space-y-3">
                  <div className="text-gray-300 font-medium">
                    {userProfile?.full_name || user.email?.split('@')[0] || 'User'}
                  </div>
                  <button
                    type="button"
                    onClick={() => {
                      handleLogout();
                      setIsOpen(false);
                    }}
                    disabled={isLoggingOut}
                    className="w-full flex items-center space-x-2 px-4 py-2 bg-gray-800 text-gray-300 hover:bg-gray-700 hover:text-white rounded-lg transition-colors"
                  >
                    {isLoggingOut ? (
                      <>
                        <Loader2 className="w-4 h-4 animate-spin" />
                        <span>Signing out...</span>
                      </>
                    ) : (
                      <>
                        <LogOut className="w-4 h-4" />
                        <span>Logout</span>
                      </>
                    )}
                  </button>
                </div>
              ) : (
                <div className="px-4">
                  <Link
                    href={isBuilder || isTemplates ? "/builder" : "/signup"}
                    className="block w-full text-center px-6 py-2.5 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg font-medium"
                    onClick={() => setIsOpen(false)}
                  >
                    {isBuilder || isTemplates ? "Build Resume" : "Get Started"}
                  </Link>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default UnifiedNavigation;