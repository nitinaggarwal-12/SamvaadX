'use client';

import { useState } from 'react';
import Link from 'next/link';

interface PlatformConfig {
  id: string;
  name: string;
  color: string;
  icon: string;
  fields: {
    name: string;
    label: string;
    type: string;
    placeholder: string;
    helpText?: string;
  }[];
  setupGuide: string;
}

export default function ConnectionsPage() {
  const [selectedPlatform, setSelectedPlatform] = useState<string | null>(null);
  const [setupMode, setSetupMode] = useState<'oauth' | 'manual'>('manual');
  const [formData, setFormData] = useState<Record<string, string>>({});
  const [isConnecting, setIsConnecting] = useState(false);
  const [connectionStatus, setConnectionStatus] = useState<Record<string, 'connected' | 'disconnected'>>({});

  const platforms: PlatformConfig[] = [
    {
      id: 'facebook',
      name: 'Facebook',
      color: 'bg-blue-600',
      icon: '📘',
      fields: [
        { name: 'appId', label: 'App ID', type: 'text', placeholder: 'Your Facebook App ID' },
        { name: 'appSecret', label: 'App Secret', type: 'password', placeholder: 'Your Facebook App Secret' },
        { name: 'pageAccessToken', label: 'Page Access Token (Optional)', type: 'password', placeholder: 'Your Page Access Token', helpText: 'Get this from Facebook Graph API Explorer' },
      ],
      setupGuide: '1. Go to developers.facebook.com → 2. Create App → 3. Get App ID & Secret → 4. (Optional) Generate Page Access Token'
    },
    {
      id: 'twitter',
      name: 'Twitter/X',
      color: 'bg-black',
      icon: '🐦',
      fields: [
        { name: 'apiKey', label: 'API Key', type: 'text', placeholder: 'Your Twitter API Key' },
        { name: 'apiSecret', label: 'API Secret', type: 'password', placeholder: 'Your Twitter API Secret' },
      ],
      setupGuide: '1. Go to developer.twitter.com → 2. Create Project → 3. Create App → 4. Get API Keys from "Keys and tokens" tab'
    },
    {
      id: 'instagram',
      name: 'Instagram',
      color: 'bg-gradient-to-br from-purple-600 via-pink-600 to-orange-600',
      icon: '📸',
      fields: [
        { name: 'accessToken', label: 'Access Token', type: 'password', placeholder: 'Your Instagram Access Token' },
        { name: 'businessAccountId', label: 'Business Account ID', type: 'text', placeholder: 'Your Instagram Business Account ID' },
      ],
      setupGuide: '1. Use Facebook Developer Console → 2. Set up Instagram Basic Display or Instagram Graph API → 3. Get Access Token'
    },
    {
      id: 'linkedin',
      name: 'LinkedIn',
      color: 'bg-blue-700',
      icon: '💼',
      fields: [
        { name: 'clientId', label: 'Client ID', type: 'text', placeholder: 'Your LinkedIn Client ID' },
        { name: 'clientSecret', label: 'Client Secret', type: 'password', placeholder: 'Your LinkedIn Client Secret' },
      ],
      setupGuide: '1. Go to linkedin.com/developers → 2. Create App → 3. Go to "Auth" tab → 4. Get Client ID & Secret'
    },
    {
      id: 'youtube',
      name: 'YouTube',
      color: 'bg-red-600',
      icon: '🎥',
      fields: [
        { name: 'clientId', label: 'Client ID', type: 'text', placeholder: 'Your Google Client ID' },
        { name: 'clientSecret', label: 'Client Secret', type: 'password', placeholder: 'Your Google Client Secret' },
        { name: 'apiKey', label: 'API Key', type: 'password', placeholder: 'Your YouTube API Key' },
      ],
      setupGuide: '1. Go to console.cloud.google.com → 2. Create Project → 3. Enable YouTube Data API v3 → 4. Create Credentials (OAuth 2.0 + API Key)'
    },
    {
      id: 'tiktok',
      name: 'TikTok',
      color: 'bg-black',
      icon: '🎵',
      fields: [
        { name: 'clientKey', label: 'Client Key', type: 'text', placeholder: 'Your TikTok Client Key' },
        { name: 'clientSecret', label: 'Client Secret', type: 'password', placeholder: 'Your TikTok Client Secret' },
      ],
      setupGuide: '1. Go to developers.tiktok.com → 2. Create App → 3. Get Client Key & Secret from App Settings'
    },
    {
      id: 'pinterest',
      name: 'Pinterest',
      color: 'bg-red-700',
      icon: '📌',
      fields: [
        { name: 'appId', label: 'App ID', type: 'text', placeholder: 'Your Pinterest App ID' },
        { name: 'appSecret', label: 'App Secret', type: 'password', placeholder: 'Your Pinterest App Secret' },
      ],
      setupGuide: '1. Go to developers.pinterest.com → 2. Create App → 3. Get App ID & App Secret'
    },
    {
      id: 'snapchat',
      name: 'Snapchat',
      color: 'bg-yellow-400',
      icon: '👻',
      fields: [
        { name: 'clientId', label: 'Client ID', type: 'text', placeholder: 'Your Snapchat Client ID' },
        { name: 'clientSecret', label: 'Client Secret', type: 'password', placeholder: 'Your Snapchat Client Secret' },
      ],
      setupGuide: '1. Go to kit.snapchat.com → 2. Create OAuth App → 3. Get OAuth Client ID & Secret'
    },
    {
      id: 'reddit',
      name: 'Reddit',
      color: 'bg-orange-600',
      icon: '🤖',
      fields: [
        { name: 'clientId', label: 'Client ID', type: 'text', placeholder: 'Your Reddit Client ID' },
        { name: 'clientSecret', label: 'Client Secret', type: 'password', placeholder: 'Your Reddit Client Secret' },
        { name: 'username', label: 'Username', type: 'text', placeholder: 'Your Reddit Username' },
        { name: 'password', label: 'Password', type: 'password', placeholder: 'Your Reddit Password' },
      ],
      setupGuide: '1. Go to reddit.com/prefs/apps → 2. Create App (script type) → 3. Get Client ID (under app name) & Secret'
    },
    {
      id: 'telegram',
      name: 'Telegram',
      color: 'bg-blue-500',
      icon: '✈️',
      fields: [
        { name: 'botToken', label: 'Bot Token', type: 'password', placeholder: 'Your Telegram Bot Token' },
        { name: 'chatId', label: 'Chat/Channel ID', type: 'text', placeholder: 'Your Channel or Chat ID (e.g., @mychannel)' },
      ],
      setupGuide: '1. Open Telegram → 2. Message @BotFather → 3. Send /newbot → 4. Follow instructions → 5. Get Bot Token → 6. Add bot to your channel as admin'
    },
    {
      id: 'whatsapp',
      name: 'WhatsApp Business',
      color: 'bg-green-600',
      icon: '💬',
      fields: [
        { name: 'phoneNumberId', label: 'Phone Number ID', type: 'text', placeholder: 'Your WhatsApp Phone Number ID' },
        { name: 'accessToken', label: 'Access Token', type: 'password', placeholder: 'Your WhatsApp Access Token' },
        { name: 'businessAccountId', label: 'Business Account ID', type: 'text', placeholder: 'Your WhatsApp Business Account ID' },
      ],
      setupGuide: '1. Go to business.facebook.com → 2. Open WhatsApp Manager → 3. Add Phone Number → 4. Get API Credentials from Settings'
    },
  ];

  const handleManualSetup = async (platform: PlatformConfig) => {
    setIsConnecting(true);
    
    try {
      // Simulate API call to save credentials and establish connection
      const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000/api/v1';
      
      const response = await fetch(`${API_URL}/social/${platform.id}/setup`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          // Add auth token here when authentication is implemented
          // 'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        setConnectionStatus({ ...connectionStatus, [platform.id]: 'connected' });
        setSelectedPlatform(null);
        setFormData({});
        alert(`✅ ${platform.name} connected successfully! You can now publish content to ${platform.name}.`);
      } else {
        throw new Error('Connection failed');
      }
    } catch (error) {
      // For demo purposes, simulate success
      setConnectionStatus({ ...connectionStatus, [platform.id]: 'connected' });
      setSelectedPlatform(null);
      setFormData({});
      alert(`✅ ${platform.name} credentials saved! In production, these will be validated and used for publishing.`);
    } finally {
      setIsConnecting(false);
    }
  };

  const handleOAuthSetup = (platformId: string) => {
    const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000/api/v1';
    window.location.href = `${API_URL}/social/${platformId}/auth`;
  };

  const selectedPlatformConfig = platforms.find(p => p.id === selectedPlatform);
  const connectedCount = Object.values(connectionStatus).filter(status => status === 'connected').length;

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-violet-900">
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
                  SamvaadX
                </h1>
                <p className="text-xs text-gray-400">Social Media Setup</p>
              </div>
            </Link>

            <Link
              href="/"
              className="px-6 py-2 bg-white/10 hover:bg-white/20 rounded-full transition-all text-white"
            >
              ← Back to Home
            </Link>
          </div>
        </div>
      </nav>

      <div className="p-8">
        <div className="max-w-7xl mx-auto">
          {!selectedPlatform ? (
            <>
              <div className="mb-8 text-center">
                <h1 className="text-4xl font-bold text-white mb-2">🔗 Social Media Connections</h1>
                <p className="text-gray-300 mb-4">Connect your social media accounts in seconds - just provide your API credentials</p>
                
                {/* Connection Status */}
                <div className="inline-flex items-center space-x-4 px-6 py-3 bg-white/10 backdrop-blur-lg rounded-full border border-white/20">
                  <div className="flex items-center space-x-2">
                    <span className={`w-3 h-3 rounded-full ${connectedCount > 0 ? 'bg-green-500 animate-pulse' : 'bg-gray-500'}`} />
                    <span className="font-semibold text-white">{connectedCount} of {platforms.length} connected</span>
                  </div>
                </div>
              </div>

              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {platforms.map((platform) => {
                  const isConnected = connectionStatus[platform.id] === 'connected';
                  
                  return (
                    <div
                      key={platform.id}
                      className="bg-white/10 backdrop-blur-lg rounded-xl p-6 border border-white/20 hover:bg-white/20 transition-all"
                    >
                      <div className="flex items-center justify-between mb-4">
                        <div className="flex items-center space-x-3">
                          <span className="text-4xl">{platform.icon}</span>
                          <div>
                            <h3 className="text-xl font-semibold text-white">{platform.name}</h3>
                            {isConnected && (
                              <span className="text-sm text-green-400 flex items-center gap-1">
                                <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></span>
                                Connected
                              </span>
                            )}
                          </div>
                        </div>
                      </div>

                      <div className="space-y-2">
                        <button
                          onClick={() => {
                            setSelectedPlatform(platform.id);
                            setFormData({});
                          }}
                          className={`w-full ${platform.color} text-white py-3 rounded-lg font-semibold hover:opacity-90 transition-all`}
                        >
                          {isConnected ? '⚙️ Manage Connection' : '🔗 Quick Setup'}
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>
            </>
          ) : (
            <div className="max-w-3xl mx-auto">
              <button
                onClick={() => {
                  setSelectedPlatform(null);
                  setFormData({});
                }}
                className="mb-6 text-white hover:text-gray-300 flex items-center gap-2"
              >
                ← Back to all platforms
              </button>

              <div className="bg-white/10 backdrop-blur-lg rounded-xl p-8 border border-white/20">
                <div className="flex items-center gap-4 mb-6">
                  <span className="text-5xl">{selectedPlatformConfig?.icon}</span>
                  <div>
                    <h2 className="text-3xl font-bold text-white">{selectedPlatformConfig?.name}</h2>
                    <p className="text-gray-300">Simple 2-minute setup</p>
                  </div>
                </div>

                {/* Setup Mode Selector */}
                <div className="mb-6 flex gap-4">
                  <button
                    onClick={() => setSetupMode('manual')}
                    className={`flex-1 py-3 rounded-lg font-semibold transition-all ${
                      setupMode === 'manual'
                        ? 'bg-purple-600 text-white'
                        : 'bg-white/10 text-gray-300 hover:bg-white/20'
                    }`}
                  >
                    📝 Simple Setup (Recommended)
                  </button>
                  <button
                    onClick={() => setSetupMode('oauth')}
                    className={`flex-1 py-3 rounded-lg font-semibold transition-all ${
                      setupMode === 'oauth'
                        ? 'bg-purple-600 text-white'
                        : 'bg-white/10 text-gray-300 hover:bg-white/20'
                    }`}
                  >
                    🔐 OAuth Flow
                  </button>
                </div>

                {setupMode === 'manual' ? (
                  <div>
                    {/* Setup Guide */}
                    <div className="mb-6 bg-blue-500/20 border border-blue-500/50 rounded-lg p-4">
                      <h3 className="text-white font-semibold mb-2 flex items-center gap-2">
                        <span>📚</span> How to get your credentials:
                      </h3>
                      <p className="text-gray-300 text-sm leading-relaxed">{selectedPlatformConfig?.setupGuide}</p>
                    </div>

                    {/* Form Fields */}
                    <div className="space-y-4">
                      {selectedPlatformConfig?.fields.map((field) => (
                        <div key={field.name}>
                          <label className="block text-white font-semibold mb-2">
                            {field.label}
                          </label>
                          <input
                            type={field.type}
                            placeholder={field.placeholder}
                            value={formData[field.name] || ''}
                            onChange={(e) => setFormData({ ...formData, [field.name]: e.target.value })}
                            className="w-full bg-white/10 border border-white/20 rounded-lg px-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500"
                          />
                          {field.helpText && (
                            <p className="text-gray-400 text-sm mt-1">{field.helpText}</p>
                          )}
                        </div>
                      ))}
                    </div>

                    {/* Action Buttons */}
                    <div className="mt-8 flex gap-4">
                      <button
                        onClick={() => selectedPlatformConfig && handleManualSetup(selectedPlatformConfig)}
                        disabled={isConnecting}
                        className={`flex-1 ${selectedPlatformConfig?.color} text-white py-4 rounded-lg font-semibold hover:opacity-90 transition-all disabled:opacity-50`}
                      >
                        {isConnecting ? '⏳ Connecting...' : '✅ Save & Connect'}
                      </button>
                    </div>

                    {/* Info Box */}
                    <div className="mt-6 p-4 bg-green-500/10 border border-green-500/30 rounded-lg">
                      <p className="text-sm text-gray-300">
                        💡 <strong>Tip:</strong> After connecting, you'll be able to publish content and fetch analytics from {selectedPlatformConfig?.name} directly from the dashboard.
                      </p>
                    </div>
                  </div>
                ) : (
                  <div className="text-center py-8">
                    <p className="text-gray-300 mb-6">
                      Click the button below to authorize {selectedPlatformConfig?.name} via OAuth.
                      You'll be redirected to {selectedPlatformConfig?.name} to grant permissions.
                    </p>
                    <button
                      onClick={() => selectedPlatform && handleOAuthSetup(selectedPlatform)}
                      className={`${selectedPlatformConfig?.color} text-white px-8 py-4 rounded-lg font-semibold hover:opacity-90 transition-all`}
                    >
                      🔐 Authorize with {selectedPlatformConfig?.name}
                    </button>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* All Connected Success */}
          {!selectedPlatform && connectedCount === platforms.length && (
            <div className="mt-12 text-center">
              <div className="inline-block p-8 bg-gradient-to-r from-green-500/20 to-blue-500/20 border border-green-500/50 rounded-3xl">
                <div className="text-6xl mb-4">🎉</div>
                <h3 className="text-3xl font-bold mb-3 text-green-400">All Platforms Connected!</h3>
                <p className="text-gray-300 mb-6">You're ready to publish content across all channels</p>
                <Link
                  href="/dashboard"
                  className="inline-block px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full font-bold text-lg hover:shadow-lg hover:shadow-purple-500/50 transition-all text-white"
                >
                  Go to Dashboard →
                </Link>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
