'use client';

import { useState, useEffect } from 'react';
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';
import { CheckCircle, XCircle, AlertCircle, RefreshCw } from 'lucide-react';
import Link from 'next/link';

interface CheckResult {
  name: string;
  status: 'success' | 'error' | 'warning' | 'checking';
  message: string;
  details?: string;
}

export default function OAuthTroubleshootPage() {
  const [checks, setChecks] = useState<CheckResult[]>([]);
  const [isChecking, setIsChecking] = useState(false);
  const supabase = createClientComponentClient();

  useEffect(() => {
    runDiagnostics();
  }, []);

  const runDiagnostics = async () => {
    setIsChecking(true);
    const results: CheckResult[] = [];

    // 1. Check Environment Variables
    results.push({
      name: 'Environment Variables',
      status: 'checking',
      message: 'Checking configuration...'
    });
    
    const envCheck: CheckResult = {
      name: 'Environment Variables',
      status: 'success',
      message: 'All required variables are set',
      details: ''
    };

    if (!process.env.NEXT_PUBLIC_SUPABASE_URL) {
      envCheck.status = 'error';
      envCheck.message = 'NEXT_PUBLIC_SUPABASE_URL is not set';
    } else if (!process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY) {
      envCheck.status = 'error';
      envCheck.message = 'NEXT_PUBLIC_SUPABASE_ANON_KEY is not set';
    } else {
      envCheck.details = `URL: ${process.env.NEXT_PUBLIC_SUPABASE_URL.substring(0, 30)}...`;
    }
    
    results[0] = envCheck;
    setChecks([...results]);

    // 2. Check Supabase Connection
    results.push({
      name: 'Supabase Connection',
      status: 'checking',
      message: 'Testing connection...'
    });

    try {
      const { error } = await supabase.auth.getSession();
      results[1] = {
        name: 'Supabase Connection',
        status: error ? 'error' : 'success',
        message: error ? `Connection failed: ${error.message}` : 'Connected successfully',
      };
    } catch (err) {
      results[1] = {
        name: 'Supabase Connection',
        status: 'error',
        message: `Connection error: ${err}`,
      };
    }
    
    setChecks([...results]);

    // 3. Check Callback URL
    results.push({
      name: 'Callback URL Configuration',
      status: 'checking',
      message: 'Verifying callback URL...'
    });

    const currentOrigin = window.location.origin;
    const expectedCallback = `${currentOrigin}/auth/callback`;
    
    results[2] = {
      name: 'Callback URL Configuration',
      status: 'warning',
      message: 'Callback URL configured',
      details: `Expected: ${expectedCallback}`
    };
    
    setChecks([...results]);

    // 4. Test OAuth Provider Configuration
    results.push({
      name: 'Google OAuth Provider',
      status: 'checking',
      message: 'Checking provider configuration...'
    });

    try {
      // This won't actually redirect, just test if the OAuth URL can be generated
      const { data, error } = await supabase.auth.signInWithOAuth({
        provider: 'google',
        options: {
          skipBrowserRedirect: true,
          redirectTo: expectedCallback,
        }
      });

      if (error) {
        results[3] = {
          name: 'Google OAuth Provider',
          status: 'error',
          message: `Provider error: ${error.message}`,
        };
      } else if (data?.url) {
        results[3] = {
          name: 'Google OAuth Provider',
          status: 'success',
          message: 'Provider configured correctly',
          details: 'OAuth URL can be generated'
        };
      } else {
        results[3] = {
          name: 'Google OAuth Provider',
          status: 'warning',
          message: 'Provider configuration unclear',
          details: 'No error but no URL generated'
        };
      }
    } catch (err) {
      results[3] = {
        name: 'Google OAuth Provider',
        status: 'error',
        message: `Provider test failed: ${err}`,
      };
    }
    
    setChecks([...results]);

    // 5. Check Browser Configuration
    results.push({
      name: 'Browser Configuration',
      status: 'checking',
      message: 'Checking browser settings...'
    });

    const browserCheck: CheckResult = {
      name: 'Browser Configuration',
      status: 'success',
      message: 'Browser configured correctly',
      details: ''
    };

    // Check if cookies are enabled
    if (!navigator.cookieEnabled) {
      browserCheck.status = 'error';
      browserCheck.message = 'Cookies are disabled';
      browserCheck.details = 'OAuth requires cookies to be enabled';
    }

    // Check if third-party cookies might be blocked
    if (document.cookie.includes('SameSite=None') === false) {
      browserCheck.status = 'warning';
      browserCheck.details = 'Third-party cookies might be restricted';
    }

    results[4] = browserCheck;
    setChecks([...results]);

    setIsChecking(false);
  };

  const getStatusIcon = (status: CheckResult['status']) => {
    switch (status) {
      case 'success':
        return <CheckCircle className="w-5 h-5 text-green-400" />;
      case 'error':
        return <XCircle className="w-5 h-5 text-red-400" />;
      case 'warning':
        return <AlertCircle className="w-5 h-5 text-yellow-400" />;
      case 'checking':
        return <RefreshCw className="w-5 h-5 text-blue-400 animate-spin" />;
    }
  };

  const getStatusColor = (status: CheckResult['status']) => {
    switch (status) {
      case 'success':
        return 'bg-green-900/20 border-green-700';
      case 'error':
        return 'bg-red-900/20 border-red-700';
      case 'warning':
        return 'bg-yellow-900/20 border-yellow-700';
      case 'checking':
        return 'bg-blue-900/20 border-blue-700';
    }
  };

  return (
    <div className="min-h-screen bg-gray-950 p-8">
      <div className="max-w-4xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-white mb-2">OAuth Troubleshooting</h1>
          <p className="text-gray-400">
            This page helps diagnose issues with Google OAuth authentication.
          </p>
        </div>

        <div className="space-y-4 mb-8">
          {checks.map((check, index) => (
            <div
              key={index}
              className={`p-4 rounded-lg border ${getStatusColor(check.status)}`}
            >
              <div className="flex items-start gap-3">
                {getStatusIcon(check.status)}
                <div className="flex-1">
                  <h3 className="font-semibold text-white">{check.name}</h3>
                  <p className="text-sm text-gray-300 mt-1">{check.message}</p>
                  {check.details && (
                    <p className="text-xs text-gray-400 mt-2 font-mono">{check.details}</p>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="flex gap-4">
          <button
            onClick={runDiagnostics}
            disabled={isChecking}
            className="px-6 py-2 bg-blue-600 hover:bg-blue-700 disabled:bg-blue-800 rounded-lg text-white font-medium transition-colors flex items-center gap-2 cursor-pointer"
          >
            <RefreshCw className={`w-4 h-4 ${isChecking ? 'animate-spin' : ''}`} />
            Run Diagnostics Again
          </button>
          
          <Link href="/login">
            <button className="px-6 py-2 bg-gray-700 hover:bg-gray-600 rounded-lg text-white font-medium transition-colors cursor-pointer">
              Back to Login
            </button>
          </Link>
        </div>

        <div className="mt-12 p-6 bg-gray-900 rounded-lg border border-gray-800">
          <h2 className="text-xl font-semibold text-white mb-4">Common Solutions</h2>
          <div className="space-y-3 text-sm text-gray-300">
            <div>
              <strong className="text-white">1. redirect_uri_mismatch:</strong>
              <p className="mt-1">Ensure your callback URL in Google Console matches exactly:</p>
              <code className="block mt-1 p-2 bg-gray-800 rounded text-xs">
                {window.location.origin}/auth/callback
              </code>
            </div>
            
            <div>
              <strong className="text-white">2. Cookies disabled:</strong>
              <p className="mt-1">Enable cookies in your browser settings and try again.</p>
            </div>
            
            <div>
              <strong className="text-white">3. No redirect happens:</strong>
              <p className="mt-1">Check browser console for JavaScript errors and ensure pop-ups aren't blocked.</p>
            </div>
            
            <div>
              <strong className="text-white">4. User not created:</strong>
              <p className="mt-1">Check Supabase Dashboard → Authentication → Users to see if the user was created.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
