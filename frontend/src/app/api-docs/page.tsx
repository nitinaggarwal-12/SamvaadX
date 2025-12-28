'use client';

import { useState } from 'react';
import Link from 'next/link';

interface APIKey {
  id: string;
  name: string;
  key: string;
  permissions: string[];
  created: string;
  lastUsed: string;
  calls: number;
  rateLimit: string;
}

export default function APIMarketplace() {
  const [apiKeys] = useState<APIKey[]>([
    {
      id: '1',
      name: 'Production Key',
      key: 'gp_prod_8x9k2a...',
      permissions: ['read', 'write', 'delete'],
      created: '2025-01-15',
      lastUsed: '2 hours ago',
      calls: 45289,
      rateLimit: '10,000/hour',
    },
    {
      id: '2',
      name: 'Analytics Integration',
      key: 'gp_analytics_2b7...',
      permissions: ['read'],
      created: '2025-02-10',
      lastUsed: '15 minutes ago',
      calls: 128456,
      rateLimit: '50,000/hour',
    },
  ]);

  const endpoints = [
    {
      method: 'GET',
      path: '/api/v1/posts',
      description: 'List all posts',
      params: '?limit=10&offset=0',
    },
    {
      method: 'POST',
      path: '/api/v1/posts',
      description: 'Create a new post',
      body: '{ "content": "...", "platforms": [...] }',
    },
    {
      method: 'GET',
      path: '/api/v1/analytics',
      description: 'Get analytics data',
      params: '?from=YYYY-MM-DD&to=YYYY-MM-DD',
    },
    {
      method: 'POST',
      path: '/api/v1/media/upload',
      description: 'Upload media file',
      body: 'multipart/form-data',
    },
    {
      method: 'GET',
      path: '/api/v1/campaigns',
      description: 'List campaigns',
      params: '?status=active',
    },
    {
      method: 'POST',
      path: '/api/v1/webhooks',
      description: 'Create webhook',
      body: '{ "url": "...", "events": [...] }',
    },
  ];

  const [showCreateKeyModal, setShowCreateKeyModal] = useState(false);

  const getMethodColor = (method: string) => {
    switch (method) {
      case 'GET': return 'bg-green-600/30 text-green-400';
      case 'POST': return 'bg-blue-600/30 text-blue-400';
      case 'PUT': return 'bg-yellow-600/30 text-yellow-400';
      case 'DELETE': return 'bg-red-600/30 text-red-400';
      default: return 'bg-gray-600/30 text-gray-400';
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 text-white">
      <nav className="relative z-50 border-b border-white/10 backdrop-blur-lg">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <Link href="/" className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl flex items-center justify-center">
                <span className="text-xl">🏛️</span>
              </div>
              <h1 className="text-xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                Guddu-Project
              </h1>
            </Link>
            <div className="flex items-center space-x-4">
              <Link href="/webhooks" className="px-4 py-2 hover:bg-white/10 rounded-lg">Webhooks</Link>
              <Link href="/api-docs" className="px-4 py-2 bg-white/10 rounded-lg font-semibold">API</Link>
            </div>
          </div>
        </div>
      </nav>

      <div className="container mx-auto px-6 py-8">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-5xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent mb-4">
              API Marketplace
            </h1>
            <p className="text-xl text-gray-400">Integrate Guddu-Project with your systems</p>
          </div>
          <button
            onClick={() => setShowCreateKeyModal(true)}
            className="px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl font-bold hover:shadow-lg transition-all"
          >
            + Create API Key
          </button>
        </div>

        <div className="grid lg:grid-cols-3 gap-6 mb-8">
          <div className="lg:col-span-2 space-y-6">
            <div className="bg-white/5 backdrop-blur-lg rounded-3xl border border-white/10 p-8">
              <h2 className="text-2xl font-bold mb-6">Your API Keys</h2>
              <div className="space-y-4">
                {apiKeys.map(key => (
                  <div key={key.id} className="p-4 bg-white/5 rounded-xl">
                    <div className="flex items-start justify-between mb-3">
                      <div>
                        <h3 className="font-bold text-lg">{key.name}</h3>
                        <div className="font-mono text-sm text-gray-400">{key.key}</div>
                      </div>
                      <button className="px-3 py-1 bg-blue-600/30 hover:bg-blue-600/50 rounded transition-colors text-sm">
                        Copy
                      </button>
                    </div>
                    <div className="grid grid-cols-3 gap-3 text-sm">
                      <div>
                        <div className="text-gray-400">Calls</div>
                        <div className="font-bold">{key.calls.toLocaleString()}</div>
                      </div>
                      <div>
                        <div className="text-gray-400">Rate Limit</div>
                        <div className="font-bold">{key.rateLimit}</div>
                      </div>
                      <div>
                        <div className="text-gray-400">Last Used</div>
                        <div className="font-bold">{key.lastUsed}</div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-white/5 backdrop-blur-lg rounded-3xl border border-white/10 p-8">
              <h2 className="text-2xl font-bold mb-6">API Endpoints</h2>
              <div className="space-y-3">
                {endpoints.map((endpoint, i) => (
                  <div key={i} className="p-4 bg-white/5 rounded-xl hover:bg-white/10 transition-colors cursor-pointer">
                    <div className="flex items-start space-x-3">
                      <span className={`text-xs px-3 py-1 rounded font-bold ${getMethodColor(endpoint.method)}`}>
                        {endpoint.method}
                      </span>
                      <div className="flex-1">
                        <div className="font-mono text-sm mb-1">{endpoint.path}</div>
                        <div className="text-sm text-gray-400">{endpoint.description}</div>
                        {endpoint.params && (
                          <div className="text-xs text-purple-400 mt-1 font-mono">{endpoint.params}</div>
                        )}
                        {endpoint.body && (
                          <div className="text-xs text-blue-400 mt-1 font-mono">{endpoint.body}</div>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="space-y-6">
            <div className="bg-gradient-to-br from-blue-900/30 to-purple-900/30 backdrop-blur-lg rounded-3xl border border-white/10 p-6">
              <h3 className="text-xl font-bold mb-4">Quick Start</h3>
              <div className="space-y-4 text-sm">
                <div>
                  <div className="font-semibold mb-2">1. Get API Key</div>
                  <div className="text-gray-400">Create your API key above</div>
                </div>
                <div>
                  <div className="font-semibold mb-2">2. Make Request</div>
                  <div className="font-mono text-xs bg-black/30 p-3 rounded">
                    curl -H "Authorization: Bearer YOUR_KEY" https://api.guddu-project.com/v1/posts
                  </div>
                </div>
                <div>
                  <div className="font-semibold mb-2">3. Handle Response</div>
                  <div className="text-gray-400">All responses are JSON</div>
                </div>
              </div>
            </div>

            <div className="bg-white/5 backdrop-blur-lg rounded-3xl border border-white/10 p-6">
              <h3 className="text-xl font-bold mb-4">Features</h3>
              <div className="space-y-2 text-sm text-gray-400">
                <div>✅ RESTful API</div>
                <div>✅ Rate limiting</div>
                <div>✅ Webhook support</div>
                <div>✅ OAuth 2.0</div>
                <div>✅ SDKs available</div>
                <div>✅ Real-time events</div>
                <div>✅ Comprehensive docs</div>
              </div>
            </div>

            <div className="bg-white/5 backdrop-blur-lg rounded-3xl border border-white/10 p-6">
              <h3 className="text-xl font-bold mb-4">SDKs</h3>
              <div className="space-y-2">
                <button className="w-full px-4 py-2 bg-white/5 hover:bg-white/10 rounded-lg transition-colors text-left">
                  📦 Node.js SDK
                </button>
                <button className="w-full px-4 py-2 bg-white/5 hover:bg-white/10 rounded-lg transition-colors text-left">
                  🐍 Python SDK
                </button>
                <button className="w-full px-4 py-2 bg-white/5 hover:bg-white/10 rounded-lg transition-colors text-left">
                  ☕ Java SDK
                </button>
                <button className="w-full px-4 py-2 bg-white/5 hover:bg-white/10 rounded-lg transition-colors text-left">
                  💎 Ruby SDK
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {showCreateKeyModal && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-6">
          <div className="bg-gradient-to-br from-slate-900 to-purple-900 rounded-3xl border border-white/20 p-8 max-w-2xl w-full">
            <h2 className="text-3xl font-bold mb-6">Create API Key</h2>
            <div className="space-y-4">
              <input
                type="text"
                placeholder="Key name (e.g., Production, Analytics)..."
                className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl focus:outline-none focus:border-purple-500/50"
              />
              <div>
                <label className="block text-sm font-semibold mb-2">Permissions</label>
                <div className="space-y-2">
                  {['Read', 'Write', 'Delete', 'Admin'].map((perm, i) => (
                    <label key={i} className="flex items-center space-x-2 cursor-pointer">
                      <input type="checkbox" className="w-4 h-4" />
                      <span>{perm}</span>
                    </label>
                  ))}
                </div>
              </div>
              <div className="flex space-x-4">
                <button className="flex-1 px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl font-bold">
                  Generate Key
                </button>
                <button onClick={() => setShowCreateKeyModal(false)} className="px-6 py-3 bg-white/5 rounded-xl">
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

