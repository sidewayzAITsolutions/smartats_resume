'use client';
import React, { useState, useRef, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { User, Settings, LogOut, ChevronDown, Crown, FileText } from 'lucide-react';
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';
import toast from 'react-hot-toast';

interface UserDropdownProps {
  userData: {
    isPremium: boolean;
    email?: string;
    name?: string;
  } | null;
}

const UserDropdown = ({ userData }: UserDropdownProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isLoggingOut, setIsLoggingOut] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const router = useRouter();
  const supabase = createClientComponentClient();

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleLogout = async () => {
    if (isLoggingOut) return;
    
    setIsLoggingOut(true);
    try {
      const { error } = await supabase.auth.signOut();
      
      if (error) {
        console.error('Logout error:', error);
        toast.error('Error signing out');
      } else {
        toast.success('Signed out successfully');
        localStorage.clear();
        sessionStorage.clear();
        router.push('/');
      }
    } catch (error) {
      console.error('Error during logout:', error);
      toast.error('Error signing out');
    } finally {
      setIsLoggingOut(false);
    }
  };

  const menuItems = [
    {
      label: 'Profile',
      icon: User,
      onClick: () => {
        router.push('/profile');
        setIsOpen(false);
      }
    },
    {
      label: 'My Resumes',
      icon: FileText,
      onClick: () => {
        router.push('/resumes');
        setIsOpen(false);
      }
    },
    {
      label: 'Settings',
      icon: Settings,
      onClick: () => {
        router.push('/settings');
        setIsOpen(false);
      }
    }
  ];

  if (!userData) {
    return (
      <button
        onClick={() => router.push('/login')}
        className="px-4 py-2 bg-teal-600 text-white rounded-lg hover:bg-teal-700 transition-colors"
      >
        Sign In
      </button>
    );
  }

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 px-3 py-2 bg-gray-800 hover:bg-gray-700 rounded-lg transition-colors"
      >
        <div className="w-8 h-8 bg-gradient-to-br from-teal-500 to-amber-500 rounded-full flex items-center justify-center">
          <User className="w-5 h-5 text-white" />
        </div>
        <span className="text-white font-medium">{userData.name || 'User'}</span>
        {userData.isPremium && <Crown className="w-4 h-4 text-amber-400" />}
        <ChevronDown className={`w-4 h-4 text-gray-400 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-56 bg-gray-800 rounded-lg shadow-xl border border-gray-700 py-2 z-50">
          <div className="px-4 py-2 border-b border-gray-700">
            <p className="text-sm text-gray-400">Signed in as</p>
            <p className="text-sm font-medium text-white truncate">{userData.email}</p>
            {userData.isPremium && (
              <span className="text-xs text-amber-400 flex items-center gap-1 mt-1">
                <Crown className="w-3 h-3" />
                Premium Member
              </span>
            )}
          </div>

          {menuItems.map((item, index) => (
            <button
              key={index}
              onClick={item.onClick}
              className="w-full px-4 py-2 text-left text-gray-300 hover:bg-gray-700 hover:text-white transition-colors flex items-center gap-3"
            >
              <item.icon className="w-4 h-4" />
              {item.label}
            </button>
          ))}

          {!userData.isPremium && (
            <button
              onClick={() => {
                router.push('/pricing');
                setIsOpen(false);
              }}
              className="w-full px-4 py-2 text-left text-amber-400 hover:bg-gray-700 transition-colors flex items-center gap-3 border-t border-gray-700 mt-2 pt-2"
            >
              <Crown className="w-4 h-4" />
              Upgrade to Premium
            </button>
          )}

          <button
            onClick={handleLogout}
            disabled={isLoggingOut}
            className="w-full px-4 py-2 text-left text-red-400 hover:bg-gray-700 transition-colors flex items-center gap-3 border-t border-gray-700 mt-2 pt-2 disabled:opacity-50"
          >
            <LogOut className="w-4 h-4" />
            {isLoggingOut ? 'Signing out...' : 'Sign Out'}
          </button>
        </div>
      )}
    </div>
  );
};

export default UserDropdown;