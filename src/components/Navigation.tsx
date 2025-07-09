'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { Menu, X, Zap, User, FileText, BarChart3, LogOut, Loader2 } from 'lucide-react';
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';
import toast from 'react-hot-toast';

const Navigation = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [user, setUser] = useState<any>(null);
  const [isLoggingOut, setIsLoggingOut] = useState(false);
  const supabase = createClientComponentClient();

  const navItems = [
    { href: '/', label: 'ATS Guide', icon: <FileText className="w-4 h-4" /> },
    { href: '/builder', label: 'Resume Builder', icon: <Zap className="w-4 h-4" /> },
    { href: '/templates', label: 'Templates', icon: <BarChart3 className="w-4 h-4" /> },
    { href: '/pricing', label: 'Pricing', icon: <User className="w-4 h-4" /> },
  ];

  useEffect(() => {
    const checkUser = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      setUser(user);
    };
    checkUser();
  }, [supabase]);

  const handleLogout = async () => {
    if (isLoggingOut) return; // Prevent multiple logout attempts

    setIsLoggingOut(true);

    try {
      // Sign out from Supabase
      const { error } = await supabase.auth.signOut();

      if (error) {
        console.error('Supabase logout error:', error);
        toast.error('Error signing out');
      } else {
        toast.success('Signed out successfully');
      }

      // Clear local storage
      localStorage.clear();
      sessionStorage.clear();

      // Update state
      setUser(null);

      // Redirect to landing page
      window.location.href = '/';
    } catch (error) {
      console.error('Error during logout:', error);
      toast.error('Error signing out');

      // Even if logout fails, clear local state and redirect
      localStorage.clear();
      sessionStorage.clear();
      setUser(null);
      window.location.href = '/';
    } finally {
      setIsLoggingOut(false);
    }
  };

  return (
    <nav className="sticky top-0 z-50 bg-white/80 backdrop-blur-lg border-b border-gray-200/50 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2 group">
            <div className="w-8 h-8 bg-gradient-to-br from-blue-600 to-purple-600 rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform">
              <Zap className="w-5 h-5 text-white" />
            </div>
            <span className="text-xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              SmartATS
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="flex items-center space-x-2 text-gray-600 hover:text-blue-600 transition-colors duration-200 font-medium group"
              >
                <span className="group-hover:scale-110 transition-transform">
                  {item.icon}
                </span>
                <span>{item.label}</span>
              </Link>
            ))}
          </div>

          {/* Auth Buttons */}
          <div className="hidden md:flex items-center space-x-4">
            {user ? (
              <>
                <Link
                  href="/templates"
                  className="text-gray-600 hover:text-blue-600 transition-colors font-medium"
                >
                  Templates
                </Link>
                <button
                  onClick={handleLogout}
                  disabled={isLoggingOut}
                  className="flex items-center space-x-2 text-gray-600 hover:text-red-600 transition-colors font-medium disabled:opacity-50 disabled:cursor-not-allowed"
                  type="button"
                >
                  {isLoggingOut ? (
                    <Loader2 className="w-4 h-4 animate-spin" />
                  ) : (
                    <LogOut className="w-4 h-4" />
                  )}
                  <span>{isLoggingOut ? 'Signing out...' : 'Logout'}</span>
                </button>
              </>
            ) : (
              <>
                <Link
                  href="/login"
                  className="text-gray-600 hover:text-blue-600 transition-colors font-medium"
                >
                  Sign In
                </Link>
                <Link
                  href="/signup"
                  className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-6 py-2 rounded-lg font-medium hover:from-blue-700 hover:to-purple-700 transition-all duration-200 transform hover:scale-105 shadow-lg hover:shadow-xl"
                >
                  Get Started
                </Link>
              </>
            )}
          </div>

          {/* Mobile menu button */}
          <button
            type="button"
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden p-2 rounded-lg text-gray-600 hover:text-blue-600 hover:bg-gray-100 transition-colors"
          >
            {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isOpen && (
          <div className="md:hidden py-4 border-t border-gray-200/50 animate-slide-in">
            <div className="flex flex-col space-y-4">
              {navItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="flex items-center space-x-3 text-gray-600 hover:text-blue-600 transition-colors font-medium py-2"
                  onClick={() => setIsOpen(false)}
                >
                  {item.icon}
                  <span>{item.label}</span>
                </Link>
              ))}
              <div className="pt-4 border-t border-gray-200/50 flex flex-col space-y-3">
                {user ? (
                  <>
                    <Link
                      href="/templates"
                      className="text-gray-600 hover:text-blue-600 transition-colors font-medium py-2"
                      onClick={() => setIsOpen(false)}
                    >
                      Choose Template
                    </Link>
                    <button
                      onClick={() => {
                        handleLogout();
                        setIsOpen(false);
                      }}
                      disabled={isLoggingOut}
                      className="flex items-center space-x-2 text-gray-600 hover:text-red-600 transition-colors font-medium py-2 text-left disabled:opacity-50 disabled:cursor-not-allowed"
                      type="button"
                    >
                      {isLoggingOut ? (
                        <Loader2 className="w-4 h-4 animate-spin" />
                      ) : (
                        <LogOut className="w-4 h-4" />
                      )}
                      <span>{isLoggingOut ? 'Signing out...' : 'Logout'}</span>
                    </button>
                  </>
                ) : (
                  <>
                    <Link
                      href="/login"
                      className="text-gray-600 hover:text-blue-600 transition-colors font-medium py-2"
                      onClick={() => setIsOpen(false)}
                    >
                      Sign In
                    </Link>
                    <Link
                      href="/signup"
                      className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-6 py-3 rounded-lg font-medium text-center hover:from-blue-700 hover:to-purple-700 transition-all duration-200 shadow-lg"
                      onClick={() => setIsOpen(false)}
                    >
                      Get Started
                    </Link>
                  </>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navigation;
