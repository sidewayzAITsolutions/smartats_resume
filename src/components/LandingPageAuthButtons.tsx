import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';
import { useEffect, useState } from 'react';

export function HeroAuthButtons() {
  const router = useRouter();
  const supabase = createClientComponentClient();
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    const checkUser = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      setUser(user);
    };
    checkUser();
  }, [supabase]);

  if (user) {
    return (
      <div className="flex flex-col sm:flex-row gap-4">
        <Link
          href="/builder"
          className="inline-flex items-center justify-center px-8 py-4 text-lg font-semibold text-white bg-gradient-to-r from-blue-600 to-blue-700 rounded-lg hover:from-blue-700 hover:to-blue-800 transform transition-all duration-200 hover:scale-105 shadow-lg hover:shadow-xl"
        ><span>Go to Resume Builder
                      <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg></span></Link>
        <Link
          href="/templates"
          className="inline-flex items-center justify-center px-8 py-4 text-lg font-semibold text-gray-700 bg-white rounded-lg hover:bg-gray-50 transform transition-all duration-200 hover:scale-105 shadow-lg hover:shadow-xl"
        >
          Choose Template
        </Link>
      </div>
    );
  }

  return (
    <div className="flex flex-col sm:flex-row gap-4">
      <Link
        href="/signup"
        className="inline-flex items-center justify-center px-8 py-4 text-lg font-semibold text-white bg-gradient-to-r from-blue-600 to-blue-700 rounded-lg hover:from-blue-700 hover:to-blue-800 transform transition-all duration-200 hover:scale-105 shadow-lg hover:shadow-xl"
      ><span>Start Free Trial
                  <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg></span></Link>
      <Link
        href="/login"
        className="inline-flex items-center justify-center px-8 py-4 text-lg font-semibold text-gray-700 bg-white rounded-lg hover:bg-gray-50 transform transition-all duration-200 hover:scale-105 shadow-lg hover:shadow-xl"
      >
        Sign In
      </Link>
    </div>
  );
}

// For the navbar - similar component
export function NavbarAuthButtons() {
  const supabase = createClientComponentClient();
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    const checkUser = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      setUser(user);
    };
    checkUser();
  }, [supabase]);

  if (user) {
    return (
      <div className="flex items-center gap-4">
        <Link
          href="/templates"
          className="text-gray-600 hover:text-gray-900 transition-colors"
        >
          Templates
        </Link>
        <Link
          href="/builder"
          className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
        >
          Resume Builder
        </Link>
      </div>
    );
  }

  return (
    <div className="flex items-center gap-4">
      <Link
        href="/login"
        className="text-gray-600 hover:text-gray-900 transition-colors"
      >
        Sign In
      </Link>
      <Link
        href="/signup"
        className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
      >
        Get Started
      </Link>
    </div>
  );
}
