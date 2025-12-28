'use client';

import { useState } from 'react';
import Link from 'next/link';

interface Post {
  content: string;
  platforms: string[];
  media?: File;
  scheduledTime?: string;
}

export default function Dashboard() {
  const [activeTab, setActiveTab] = useState('create');
  const [postContent, setPostContent] = useState('');
  const [selectedPlatforms, setSelectedPlatforms] = useState<string[]>(['Facebook', 'Twitter/X', 'Instagram', 'LinkedIn', 'YouTube']);
  const [charCount, setCharCount] = useState(0);
  const [publishing, setPublishing] = useState(false);

  const platforms = [
    { name: 'Facebook', icon: '📘', color: 'bg-blue-600', limit: 63206 },
    { name: 'Twitter/X', icon: '🐦', color: 'bg-sky-500', limit: 280 },
    { name: 'Instagram', icon: '📷', color: 'bg-pink-600', limit: 2200 },
    { name: 'LinkedIn', icon: '💼', color: 'bg-blue-700', limit: 3000 },
    { name: 'YouTube', icon: '▶️', color: 'bg-red-600', limit: 5000 },
  ];

  const recentPosts = [
    { id: 1, content: 'Announcing CSPOC 2026 registration is now open!', platforms: ['Facebook', 'Twitter/X', 'LinkedIn'], time: '2 hours ago', engagement: '1.2K' },
    { id: 2, content: 'Behind the scenes: Preparing for the world\'s largest parliamentary gathering', platforms: ['Instagram', 'Facebook'], time: '5 hours ago', engagement: '856' },
    { id: 3, content: 'Meet our keynote speakers for CSPOC 2026', platforms: ['LinkedIn', 'Twitter/X'], time: '1 day ago', engagement: '2.1K' },
  ];

  const handleContentChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const text = e.target.value;
    setPostContent(text);
    setCharCount(text.length);
  };

  const togglePlatform = (platform: string) => {
    setSelectedPlatforms(prev =>
      prev.includes(platform)
        ? prev.filter(p => p !== platform)
        : [...prev, platform]
    );
  };

  const handlePublish = async () => {
    if (!postContent.trim()) {
      alert('⚠️ Please enter some content to publish');
      return;
    }
    if (selectedPlatforms.length === 0) {
      alert('⚠️ Please select at least one platform');
      return;
    }

    setPublishing(true);
    
    // Simulate publishing
    setTimeout(() => {
      setPublishing(false);
      alert(`✅ Published successfully to:\n${selectedPlatforms.join(', ')}\n\n🎉 Your content is now live!`);
      setPostContent('');
      setCharCount(0);
    }, 2000);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 text-white">
      {/* Navigation */}
      <nav className="relative z-50 border-b border-white/10 backdrop-blur-lg">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <Link href="/" className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl flex items-center justify-center">
                <span className="text-xl">🏛️</span>
              </div>
              <div>
                <h1 className="text-xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                  Guddu-Project
                </h1>
              </div>
            </Link>

            <div className="flex items-center space-x-4">
              <Link href="/dashboard" className="px-4 py-2 bg-white/10 rounded-lg font-semibold">Dashboard</Link>
              <Link href="/analytics" className="px-4 py-2 hover:bg-white/10 rounded-lg transition-colors">Analytics</Link>
              <Link href="/campaigns" className="px-4 py-2 hover:bg-white/10 rounded-lg transition-colors">Campaigns</Link>
              <Link href="/calendar" className="px-4 py-2 hover:bg-white/10 rounded-lg transition-colors">Calendar</Link>
              <Link href="/connections" className="px-4 py-2 hover:bg-white/10 rounded-lg transition-colors">Connections</Link>
            </div>
          </div>
        </div>
      </nav>

      <div className="container mx-auto px-6 py-8">
        <div className="grid lg:grid-cols-3 gap-6">
          {/* Main Content - Post Creator */}
          <div className="lg:col-span-2 space-y-6">
            {/* Header */}
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent mb-2">
                  Dashboard
                </h1>
                <p className="text-gray-400">Create and publish content across all platforms</p>
              </div>
              <div className="flex items-center space-x-2 px-4 py-2 bg-green-500/20 border border-green-500/50 rounded-full">
                <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                <span className="text-sm text-green-400 font-semibold">5 Platforms Connected</span>
              </div>
            </div>

            {/* Post Creator */}
            <div className="bg-white/5 backdrop-blur-lg rounded-3xl border border-white/10 p-8">
              <div className="flex items-center space-x-3 mb-6">
                <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-2xl">
                  👤
                </div>
                <div>
                  <div className="font-semibold">Parliament of India</div>
                  <div className="text-sm text-gray-400">Official Account</div>
                </div>
              </div>

              {/* Text Input */}
              <textarea
                value={postContent}
                onChange={handleContentChange}
                placeholder="What's happening at CSPOC 2026? Share your update..."
                className="w-full h-48 bg-white/5 border border-white/10 rounded-2xl p-6 text-lg resize-none focus:outline-none focus:border-purple-500/50 transition-colors mb-4"
                maxLength={5000}
              />

              {/* Character Count */}
              <div className="flex items-center justify-between mb-6">
                <div className="text-sm text-gray-400">
                  {charCount} / 5000 characters
                </div>
                {charCount > 280 && (
                  <div className="text-sm text-yellow-400">
                    ⚠️ Exceeds Twitter/X limit (280 chars)
                  </div>
                )}
              </div>

              {/* Platform Selection */}
              <div className="mb-6">
                <div className="text-sm font-semibold mb-3 text-gray-300">Publish to:</div>
                <div className="flex flex-wrap gap-3">
                  {platforms.map((platform) => (
                    <button
                      key={platform.name}
                      onClick={() => togglePlatform(platform.name)}
                      className={`flex items-center space-x-2 px-4 py-2 rounded-xl border-2 transition-all ${
                        selectedPlatforms.includes(platform.name)
                          ? `${platform.color} border-white/50 scale-105`
                          : 'bg-white/5 border-white/10 hover:border-white/30'
                      }`}
                    >
                      <span className="text-xl">{platform.icon}</span>
                      <span className="font-semibold text-sm">{platform.name}</span>
                      {selectedPlatforms.includes(platform.name) && (
                        <span className="text-xs">✓</span>
                      )}
                    </button>
                  ))}
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex items-center justify-between pt-6 border-t border-white/10">
                <div className="flex items-center space-x-4">
                  <button className="flex items-center space-x-2 px-4 py-2 bg-white/5 hover:bg-white/10 rounded-lg transition-colors">
                    <span className="text-xl">🖼️</span>
                    <span className="text-sm">Media</span>
                  </button>
                  <button className="flex items-center space-x-2 px-4 py-2 bg-white/5 hover:bg-white/10 rounded-lg transition-colors">
                    <span className="text-xl">😊</span>
                    <span className="text-sm">Emoji</span>
                  </button>
                  <button className="flex items-center space-x-2 px-4 py-2 bg-white/5 hover:bg-white/10 rounded-lg transition-colors">
                    <span className="text-xl">📅</span>
                    <span className="text-sm">Schedule</span>
                  </button>
                </div>

                <button
                  onClick={handlePublish}
                  disabled={publishing || !postContent.trim() || selectedPlatforms.length === 0}
                  className={`px-8 py-3 bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl font-bold transition-all ${
                    publishing || !postContent.trim() || selectedPlatforms.length === 0
                      ? 'opacity-50 cursor-not-allowed'
                      : 'hover:shadow-lg hover:shadow-purple-500/50 transform hover:scale-105'
                  }`}
                >
                  {publishing ? '🚀 Publishing...' : '📢 Publish Now'}
                </button>
              </div>
            </div>

            {/* Recent Posts */}
            <div className="bg-white/5 backdrop-blur-lg rounded-3xl border border-white/10 p-8">
              <h2 className="text-2xl font-bold mb-6">Recent Posts</h2>
              <div className="space-y-4">
                {recentPosts.map((post) => (
                  <div
                    key={post.id}
                    className="p-6 bg-white/5 border border-white/10 rounded-2xl hover:bg-white/10 transition-all cursor-pointer group"
                  >
                    <p className="text-lg mb-4">{post.content}</p>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        {post.platforms.map((p, i) => (
                          <span key={i} className="text-xs px-2 py-1 bg-white/10 rounded-full">
                            {p}
                          </span>
                        ))}
                      </div>
                      <div className="flex items-center space-x-4 text-sm text-gray-400">
                        <span>💚 {post.engagement}</span>
                        <span>{post.time}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Sidebar - Quick Stats & Actions */}
          <div className="space-y-6">
            {/* Quick Stats */}
            <div className="bg-gradient-to-br from-blue-900/30 to-purple-900/30 backdrop-blur-lg rounded-3xl border border-white/10 p-6">
              <h3 className="text-xl font-bold mb-6">Today's Performance</h3>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-gray-400">Posts Published</span>
                  <span className="text-2xl font-bold text-blue-400">12</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-400">Total Reach</span>
                  <span className="text-2xl font-bold text-purple-400">45.2K</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-400">Engagement</span>
                  <span className="text-2xl font-bold text-green-400">3.8K</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-400">Growth</span>
                  <span className="text-2xl font-bold text-orange-400">+12%</span>
                </div>
              </div>
              <Link
                href="/analytics"
                className="mt-6 block w-full py-3 bg-white/10 hover:bg-white/20 rounded-xl text-center font-semibold transition-colors"
              >
                View Full Analytics →
              </Link>
            </div>

            {/* Quick Actions */}
            <div className="bg-white/5 backdrop-blur-lg rounded-3xl border border-white/10 p-6">
              <h3 className="text-xl font-bold mb-6">Quick Actions</h3>
              <div className="space-y-3">
                <Link
                  href="/campaigns"
                  className="block p-4 bg-gradient-to-r from-blue-600/20 to-purple-600/20 border border-blue-500/30 rounded-xl hover:scale-105 transition-transform"
                >
                  <div className="flex items-center space-x-3">
                    <span className="text-2xl">🎯</span>
                    <div>
                      <div className="font-semibold">New Campaign</div>
                      <div className="text-xs text-gray-400">Plan multi-post strategy</div>
                    </div>
                  </div>
                </Link>
                <Link
                  href="/calendar"
                  className="block p-4 bg-gradient-to-r from-green-600/20 to-blue-600/20 border border-green-500/30 rounded-xl hover:scale-105 transition-transform"
                >
                  <div className="flex items-center space-x-3">
                    <span className="text-2xl">📅</span>
                    <div>
                      <div className="font-semibold">Schedule Content</div>
                      <div className="text-xs text-gray-400">Plan ahead for the week</div>
                    </div>
                  </div>
                </Link>
                <button className="w-full p-4 bg-gradient-to-r from-purple-600/20 to-pink-600/20 border border-purple-500/30 rounded-xl hover:scale-105 transition-transform">
                  <div className="flex items-center space-x-3">
                    <span className="text-2xl">🤖</span>
                    <div>
                      <div className="font-semibold">AI Content Ideas</div>
                      <div className="text-xs text-gray-400">Get AI suggestions</div>
                    </div>
                  </div>
                </button>
              </div>
            </div>

            {/* Scheduled Posts */}
            <div className="bg-white/5 backdrop-blur-lg rounded-3xl border border-white/10 p-6">
              <h3 className="text-xl font-bold mb-4">Upcoming</h3>
              <div className="space-y-3">
                <div className="p-3 bg-white/5 rounded-lg">
                  <div className="text-sm font-semibold">Speaker Announcement</div>
                  <div className="text-xs text-gray-400 mt-1">Tomorrow, 9:00 AM</div>
                </div>
                <div className="p-3 bg-white/5 rounded-lg">
                  <div className="text-sm font-semibold">Registration Reminder</div>
                  <div className="text-xs text-gray-400 mt-1">Tomorrow, 3:00 PM</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

