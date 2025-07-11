'use client';
import React, { useState } from 'react';
import { Copy, Check, ChevronRight } from 'lucide-react';

const APIDocsPage = () => {
  const [copiedEndpoint, setCopiedEndpoint] = useState('');
  
  const copyToClipboard = (text: string, endpoint: string) => {
    navigator.clipboard.writeText(text);
    setCopiedEndpoint(endpoint);
    setTimeout(() => setCopiedEndpoint(''), 2000);
  };

  const endpoints = [
    {
      method: 'GET',
      endpoint: '/api/v1/resumes',
      description: 'List all resumes',
      example: `curl -X GET https://resumelift.com/api/v1/resumes \\
  -H "X-API-Key: your_api_key_here"`,
      response: `{
  "resumes": [
    {
      "id": "res_123",
      "name": "John Doe",
      "created_at": "2024-01-15T10:30:00Z",
      "ats_score": 85
    }
  ],
  "total": 42,
  "page": 1
}`
    },
    {
      method: 'POST',
      endpoint: '/api/v1/resumes',
      description: 'Create a new resume',
      example: `curl -X POST https://resumelift.com/api/v1/resumes \\
  -H "X-API-Key: your_api_key_here" \\
  -H "Content-Type: application/json" \\
  -d '{
    "name": "Jane Smith",
    "email": "jane@example.com",
    "phone": "+1234567890",
    "experience": [
      {
        "title": "Software Engineer",
        "company": "Tech Corp",
        "duration": "2020-2023"
      }
    ]
  }'`,
      response: `{
  "id": "res_124",
  "name": "Jane Smith",
  "created_at": "2024-01-15T10:35:00Z",
  "status": "created"
}`
    },
    {
      method: 'POST',
      endpoint: '/api/v1/resumes/bulk',
      description: 'Create multiple resumes at once',
      example: `curl -X POST https://resumelift.com/api/v1/resumes/bulk \\
  -H "X-API-Key: your_api_key_here" \\
  -H "Content-Type: application/json" \\
  -d '{
    "resumes": [
      {
        "name": "User 1",
        "email": "user1@example.com"
      },
      {
        "name": "User 2", 
        "email": "user2@example.com"
      }
    ]
  }'`,
      response: `{
  "created": 2,
  "failed": 0,
  "resumes": ["res_125", "res_126"]
}`
    },
    {
      method: 'GET',
      endpoint: '/api/v1/resumes/{id}/export',
      description: 'Export resume in different formats',
      example: `curl -X GET https://resumelift.com/api/v1/resumes/res_123/export?format=pdf \\
  -H "X-API-Key: your_api_key_here" \\
  -o resume.pdf`,
      response: `Binary PDF content (when format=pdf)
or
{
  "content": "Resume text content...",
  "format": "txt"
}`
    }
  ];

  const webhookEvents = [
    {
      event: 'resume.created',
      description: 'Triggered when a new resume is created',
      payload: `{
  "event": "resume.created",
  "data": {
    "id": "res_123",
    "name": "John Doe",
    "created_by": "user_456"
  },
  "timestamp": "2024-01-15T10:30:00Z"
}`
    },
    {
      event: 'resume.updated',
      description: 'Triggered when a resume is updated',
      payload: `{
  "event": "resume.updated",
  "data": {
    "id": "res_123",
    "changes": ["experience", "skills"]
  },
  "timestamp": "2024-01-15T11:00:00Z"
}`
    },
    {
      event: 'team.member.added',
      description: 'Triggered when a new team member joins',
      payload: `{
  "event": "team.member.added",
  "data": {
    "user_id": "user_789",
    "email": "newmember@example.com",
    "role": "editor"
  },
  "timestamp": "2024-01-15T12:00:00Z"
}`
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-950 via-gray-900 to-black">
      <div className="max-w-7xl mx-auto px-6 py-12">
        <div className="mb-12">
          <h1 className="text-4xl font-bold text-white mb-4">Enterprise API Documentation</h1>
          <p className="text-xl text-gray-300">
            Integrate ResumeLift into your workflow with our powerful API
          </p>
        </div>

        {/* Authentication */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-white mb-6">Authentication</h2>
          <div className="bg-gray-800/50 rounded-xl p-6 border border-gray-700">
            <p className="text-gray-300 mb-4">
              All API requests must include your API key in the header:
            </p>
            <div className="bg-gray-900 rounded-lg p-4 font-mono text-sm text-gray-300">
              X-API-Key: your_api_key_here
            </div>
            <p className="text-gray-400 text-sm mt-4">
              Generate your API key from the Enterprise Dashboard → Settings → API Access
            </p>
          </div>
        </section>

        {/* Base URL */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-white mb-6">Base URL</h2>
          <div className="bg-gray-800/50 rounded-xl p-6 border border-gray-700">
            <div className="bg-gray-900 rounded-lg p-4 font-mono text-gray-300">
              https://resumelift.com/api/v1
            </div>
          </div>
        </section>

        {/* Endpoints */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-white mb-6">API Endpoints</h2>
          <div className="space-y-6">
            {endpoints.map((endpoint, idx) => (
              <div key={idx} className="bg-gray-800/50 rounded-xl p-6 border border-gray-700">
                <div className="flex items-center gap-3 mb-4">
                  <span className={`px-3 py-1 rounded-lg font-mono text-sm font-bold ${
                    endpoint.method === 'GET' 
                      ? 'bg-blue-600 text-white' 
                      : 'bg-green-600 text-white'
                  }`}>
                    {endpoint.method}
                  </span>
                  <code className="text-gray-300 font-mono">{endpoint.endpoint}</code>
                </div>
                
                <p className="text-gray-300 mb-4">{endpoint.description}</p>
                
                <div className="space-y-4">
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <h4 className="text-sm font-medium text-gray-400">Example Request</h4>
                      <button
                        onClick={() => copyToClipboard(endpoint.example, `${endpoint.method}-${idx}`)}
                        className="text-gray-400 hover:text-white"
                      >
                        {copiedEndpoint === `${endpoint.method}-${idx}` ? (
                          <Check className="w-4 h-4" />
                        ) : (
                          <Copy className="w-4 h-4" />
                        )}
                      </button>
                    </div>
                    <pre className="bg-gray-900 rounded-lg p-4 overflow-x-auto">
                      <code className="text-sm text-gray-300">{endpoint.example}</code>
                    </pre>
                  </div>
                  
                  <div>
                    <h4 className="text-sm font-medium text-gray-400 mb-2">Example Response</h4>
                    <pre className="bg-gray-900 rounded-lg p-4 overflow-x-auto">
                      <code className="text-sm text-gray-300">{endpoint.response}</code>
                    </pre>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Webhooks */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-white mb-6">Webhook Events</h2>
          <p className="text-gray-300 mb-6">
            Configure webhooks to receive real-time notifications about events in your account
          </p>
          
          <div className="space-y-6">
            {webhookEvents.map((webhook, idx) => (
              <div key={idx} className="bg-gray-800/50 rounded-xl p-6 border border-gray-700">
                <div className="flex items-center gap-3 mb-2">
                  <code className="text-amber-400 font-mono font-bold">{webhook.event}</code>
                </div>
                <p className="text-gray-300 mb-4">{webhook.description}</p>
                
                <div>
                  <h4 className="text-sm font-medium text-gray-400 mb-2">Payload Example</h4>
                  <pre className="bg-gray-900 rounded-lg p-4 overflow-x-auto">
                    <code className="text-sm text-gray-300">{webhook.payload}</code>
                  </pre>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Rate Limits */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-white mb-6">Rate Limits</h2>
          <div className="bg-gray-800/50 rounded-xl p-6 border border-gray-700">
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <h3 className="font-semibold text-white mb-2">Standard Endpoints</h3>
                <p className="text-gray-300">1,000 requests per hour</p>
              </div>
              <div>
                <h3 className="font-semibold text-white mb-2">Bulk Operations</h3>
                <p className="text-gray-300">100 requests per hour</p>
              </div>
            </div>
            <p className="text-gray-400 text-sm mt-4">
              Rate limit information is included in response headers: X-RateLimit-Limit, X-RateLimit-Remaining
            </p>
          </div>
        </section>

        {/* SDKs */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-white mb-6">SDKs & Libraries</h2>
          <div className="grid md:grid-cols-3 gap-6">
            <div className="bg-gray-800/50 rounded-xl p-6 border border-gray-700">
              <h3 className="font-semibold text-white mb-2">Node.js</h3>
              <code className="text-sm text-gray-400">npm install @resumelift/node</code>
            </div>
            <div className="bg-gray-800/50 rounded-xl p-6 border border-gray-700">
              <h3 className="font-semibold text-white mb-2">Python</h3>
              <code className="text-sm text-gray-400">pip install resumelift</code>
            </div>
            <div className="bg-gray-800/50 rounded-xl p-6 border border-gray-700">
              <h3 className="font-semibold text-white mb-2">PHP</h3>
              <code className="text-sm text-gray-400">composer require resumelift/php</code>
            </div>
          </div>
        </section>

        {/* Support */}
        <section className="bg-gradient-to-r from-amber-600 to-orange-600 rounded-xl p-8 text-center">
          <h2 className="text-2xl font-bold text-white mb-4">Need Help?</h2>
          <p className="text-white/90 mb-6">
            Our enterprise support team is here to help with your integration
          </p>
          <button className="inline-flex items-center gap-2 px-6 py-3 bg-white text-amber-600 rounded-lg font-bold hover:shadow-xl transition-all">
            Contact Support
            <ChevronRight className="w-5 h-5" />
          </button>
        </section>
      </div>
    </div>
  );
};

export default APIDocsPage;