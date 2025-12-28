'use client';

import { useState } from 'react';
import Link from 'next/link';

interface Platform {
  id: string;
  name: string;
  icon: string;
  color: string;
  connected: boolean;
  authUrl: string;
  description: string;
}

export default function ConnectionsPage() {
  const [platforms, setPlatforms] = useState<Platform[]>([
    {
      id: 'facebook',
      name: 'Facebook',
      icon: '📘',
      color: 'from-blue-600 to-blue-400',
      connected: false,
      authUrl: 'https://www.facebook.com/v18.0/dialog/oauth',
      description: 'Connect to Facebook Pages and Groups',
    },
    {
      id: 'twitter',
      name: 'Twitter/X',
      icon: '🐦',
      color: 'from-sky-600 to-sky-400',
      connected: false,
      authUrl: 'https://twitter.com/i/oauth2/authorize',
      description: 'Post tweets and manage your X account',
    },
    {
      id: 'instagram',
      name: 'Instagram',
      icon: '📷',
      color: 'from-pink-600 via-purple-600 to-orange-500',
      connected: false,
      authUrl: 'https://api.instagram.com/oauth/authorize',
      description: 'Share photos and stories on Instagram',
    },
    {
      id: 'youtube',
      name: 'YouTube',
      icon: '▶️',
      color: 'from-red-600 to-red-400',
      connected: false,
      authUrl: 'https://accounts.google.com/o/oauth2/v2/auth',
      description: 'Upload videos and manage your channel',
    },
    {
      id: 'linkedin',
      name: 'LinkedIn',
      icon: '💼',
      color: 'from-blue-700 to-blue-500',
      connected: false,
      authUrl: 'https://www.linkedin.com/oauth/v2/authorization',
      description: 'Share professional updates and articles',
    },
  ]);

  const handleConnect = (platformId: string) => {
    const platform = platforms.find(p => p.id === platformId);
    if (!platform) return;

    // Simulate OAuth flow
    const authParams = new URLSearchParams({
      client_id: 'guddu_project_client_id',
      redirect_uri: `${window.location.origin}/api/auth/callback/${platformId}`,
      scope: 'publish_content,read_insights,manage_pages',
      response_type: 'code',
      state: Math.random().toString(36).substring(7),
    });

    const message = `🔐 Initiating OAuth 2.0 Flow for ${platform.name}\n\n` +
      `📋 Requested Permissions:\n` +
      `  ✓ Publish content\n` +
      `  ✓ Read analytics\n` +
      `  ✓ Manage pages/accounts\n\n` +
      `🔗 Redirect URL:\n${platform.authUrl}?${authParams.toString()}\n\n` +
      `In production, you'll be redirected to ${platform.name}'s OAuth page.`;

    alert(message);

    // Simulate successful connection after 2 seconds
    setTimeout(() => {
      setPlatforms(prev =>
        prev.map(p =>
          p.id === platformId ? { ...p, connected: true } : p
        )
      );
    }, 2000);
  };

  const handleDisconnect = (platformId: string) => {
    if (confirm('Are you sure you want to disconnect this platform?')) {
      setPlatforms(prev =>
        prev.map(p =>
          p.id === platformId ? { ...p, connected: false } : p
        )
      );
    }
  };

  const connectedCount = platforms.filter(p => p.connected).length;

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 text-white">
      {/* Navigation */}
      <nav className="relative z-50 border-b border-white/10 backdrop-blur-lg">
        <div className="container mx-auto px-6 py-6">
          <div className="flex items-center justify-between">
            <Link href="/" className="flex items-center space-x-3 group">
              <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl flex items-center justify-center shadow-2xl shadow-purple-500/50">
                <span className="text-2xl">🏛️</span>
              </div>
              <div>
                <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                  Guddu-Project
                </h1>
                <p className="text-xs text-gray-400">Social Media Connections</p>
              </div>
            </Link>

            <Link
              href="/"
              className="px-6 py-2 bg-white/10 hover:bg-white/20 rounded-full transition-all"
            >
              ← Back to Home
            </Link>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <div className="container mx-auto px-6 py-12">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-6xl font-bold mb-4 bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
            Connect Your Platforms
          </h1>
          <p className="text-xl text-gray-400 mb-6">
            Link your social media accounts to publish content across all channels
          </p>
          
          {/* Connection Status */}
          <div className="inline-flex items-center space-x-4 px-6 py-3 bg-white/10 backdrop-blur-lg rounded-full border border-white/20">
            <div className="flex items-center space-x-2">
              <span className={`w-3 h-3 rounded-full ${connectedCount > 0 ? 'bg-green-500' : 'bg-gray-500'}`} />
              <span className="font-semibold">{connectedCount} of {platforms.length} connected</span>
            </div>
          </div>
        </div>

        {/* Platforms Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-7xl mx-auto">
          {platforms.map((platform) => (
            <div
              key={platform.id}
              className="group relative p-8 bg-white/5 backdrop-blur-lg rounded-3xl border border-white/10 hover:bg-white/10 transition-all duration-500"
            >
              {/* Connection Status Badge */}
              {platform.connected && (
                <div className="absolute top-4 right-4">
                  <div className="flex items-center space-x-1 px-3 py-1 bg-green-500/20 border border-green-500/50 rounded-full">
                    <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                    <span className="text-xs text-green-400 font-semibold">Connected</span>
                  </div>
                </div>
              )}

              {/* Platform Icon */}
              <div className={`w-20 h-20 bg-gradient-to-br ${platform.color} rounded-3xl flex items-center justify-center text-4xl mb-6 transform group-hover:scale-110 transition-transform duration-300 shadow-lg`}>
                {platform.icon}
              </div>

              {/* Platform Info */}
              <h3 className="text-3xl font-bold mb-3">{platform.name}</h3>
              <p className="text-gray-400 mb-6">{platform.description}</p>

              {/* Action Button */}
              {platform.connected ? (
                <div className="space-y-3">
                  <button
                    onClick={() => handleDisconnect(platform.id)}
                    className="w-full px-6 py-3 bg-red-500/20 hover:bg-red-500/30 border border-red-500/50 rounded-xl font-semibold transition-all"
                  >
                    Disconnect
                  </button>
                  <div className="flex items-center justify-center space-x-2 text-sm text-gray-400">
                    <svg className="w-4 h-4 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span>Ready to publish</span>
                  </div>
                </div>
              ) : (
                <button
                  onClick={() => handleConnect(platform.id)}
                  className={`w-full px-6 py-4 bg-gradient-to-r ${platform.color} hover:shadow-lg hover:shadow-purple-500/50 rounded-xl font-bold transition-all transform hover:scale-105 flex items-center justify-center space-x-2`}
                >
                  <span>Connect {platform.name}</span>
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                  </svg>
                </button>
              )}
            </div>
          ))}
        </div>

        {/* OAuth Info */}
        <div className="mt-12 max-w-4xl mx-auto p-8 bg-blue-500/10 border border-blue-500/30 rounded-3xl">
          <div className="flex items-start space-x-4">
            <div className="text-4xl">🔐</div>
            <div>
              <h3 className="text-2xl font-bold mb-3">Secure OAuth 2.0 Authentication</h3>
              <ul className="space-y-2 text-gray-300">
                <li className="flex items-center space-x-2">
                  <span className="text-green-400">✓</span>
                  <span>Your credentials are never stored on our servers</span>
                </li>
                <li className="flex items-center space-x-2">
                  <span className="text-green-400">✓</span>
                  <span>Industry-standard OAuth 2.0 protocol</span>
                </li>
                <li className="flex items-center space-x-2">
                  <span className="text-green-400">✓</span>
                  <span>Tokens encrypted at rest and in transit</span>
                </li>
                <li className="flex items-center space-x-2">
                  <span className="text-green-400">✓</span>
                  <span>Revoke access anytime from platform settings</span>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Next Steps */}
        {connectedCount === platforms.length && (
          <div className="mt-12 text-center">
            <div className="inline-block p-8 bg-gradient-to-r from-green-500/20 to-blue-500/20 border border-green-500/50 rounded-3xl">
              <div className="text-6xl mb-4">🎉</div>
              <h3 className="text-3xl font-bold mb-3 text-green-400">All Platforms Connected!</h3>
              <p className="text-gray-300 mb-6">You're ready to publish content across all channels</p>
              <Link
                href="/dashboard"
                className="inline-block px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full font-bold text-lg hover:shadow-lg hover:shadow-purple-500/50 transition-all"
              >
                Go to Dashboard →
              </Link>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

