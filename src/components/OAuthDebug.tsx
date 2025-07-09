'use client';

import { useEffect, useState } from 'react';
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';

export default function OAuthDebug() {
  const [debugInfo, setDebugInfo] = useState<any>({});
  const [isVisible, setIsVisible] = useState(false);
  const supabase = createClientComponentClient();

  useEffect(() => {
    // Only show in development
    if (process.env.NODE_ENV === 'development') {
      setIsVisible(true);
      collectDebugInfo();
    }
  }, []);

  const collectDebugInfo = async () => {
    const info: any = {};

    // Check environment variables
    info.env = {
      NEXT_PUBLIC_SUPABASE_URL: process.env.NEXT_PUBLIC_SUPABASE_URL ? '✅ Set' : '❌ Missing',
      NEXT_PUBLIC_SUPABASE_ANON_KEY: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ? '✅ Set' : '❌ Missing',
      NEXT_PUBLIC_SITE_URL: process.env.NEXT_PUBLIC_SITE_URL || 'Not set (using default)',
    };

    // Check current URL
    info.currentUrl = window.location.origin;

    // Check Supabase connection
    try {
      const { data: { session }, error } = await supabase.auth.getSession();
      info.supabaseConnection = error ? `❌ Error: ${error.message}` : '✅ Connected';
      info.currentSession = session ? '✅ Active session' : '❌ No session';
    } catch (err) {
      info.supabaseConnection = `❌ Error: ${err}`;
    }

    // Expected callback URL
    info.expectedCallbackUrl = `${window.location.origin}/auth/callback`;

    setDebugInfo(info);
  };

  const testGoogleOAuth = async () => {
    try {
      const { data, error } = await supabase.auth.signInWithOAuth({
        provider: 'google',
        options: {
          redirectTo: `${window.location.origin}/auth/callback?next=/builder`,
          queryParams: {
            access_type: 'offline',
            prompt: 'consent',
          },
        }
      });

      if (error) {
        console.error('OAuth test error:', error);
        alert(`OAuth Error: ${error.message}`);
      } else {
        console.log('OAuth initiated successfully:', data);
      }
    } catch (err) {
      console.error('Unexpected error:', err);
      alert(`Unexpected error: ${err}`);
    }
  };

  if (!isVisible) return null;

  return (
    <div className="fixed bottom-4 right-4 bg-gray-900 border border-gray-700 rounded-lg p-4 max-w-md text-sm text-white shadow-lg z-50">
      <h3 className="font-bold mb-2 text-yellow-400">🔧 OAuth Debug Panel</h3>
      
      <div className="space-y-2 text-xs">
        <div>
          <strong>Environment:</strong>
          <ul className="ml-4 mt-1">
            {Object.entries(debugInfo.env || {}).map(([key, value]) => (
              <li key={key}>{key}: {value as string}</li>
            ))}
          </ul>
        </div>

        <div>
          <strong>Current URL:</strong> {debugInfo.currentUrl}
        </div>

        <div>
          <strong>Expected Callback:</strong> {debugInfo.expectedCallbackUrl}
        </div>

        <div>
          <strong>Supabase:</strong> {debugInfo.supabaseConnection}
        </div>

        <div>
          <strong>Session:</strong> {debugInfo.currentSession}
        </div>
      </div>

      <div className="mt-4 space-y-2">
        <button
          onClick={testGoogleOAuth}
          className="w-full px-3 py-2 bg-blue-600 hover:bg-blue-700 rounded text-white text-xs font-medium cursor-pointer"
        >
          Test Google OAuth
        </button>
        <button
          onClick={collectDebugInfo}
          className="w-full px-3 py-2 bg-gray-700 hover:bg-gray-600 rounded text-white text-xs font-medium cursor-pointer"
        >
          Refresh Info
        </button>
        <button
          onClick={() => setIsVisible(false)}
          className="w-full px-3 py-2 bg-red-600 hover:bg-red-700 rounded text-white text-xs font-medium cursor-pointer"
        >
          Close Debug Panel
        </button>
      </div>
    </div>
  );
}
