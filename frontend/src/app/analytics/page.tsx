'use client';

import { useState } from 'react';
import Link from 'next/link';

export default function Analytics() {
  const [timeRange, setTimeRange] = useState('7days');
  const [selectedPlatform, setSelectedPlatform] = useState('all');

  const platforms = [
    { name: 'All Platforms', value: 'all', color: 'from-purple-500 to-blue-500' },
    { name: 'Facebook', value: 'facebook', color: 'from-blue-600 to-blue-400', icon: '📘' },
    { name: 'Twitter/X', value: 'twitter', color: 'from-sky-600 to-sky-400', icon: '🐦' },
    { name: 'Instagram', value: 'instagram', color: 'from-pink-600 to-purple-600', icon: '📷' },
    { name: 'LinkedIn', value: 'linkedin', color: 'from-blue-700 to-blue-500', icon: '💼' },
    { name: 'YouTube', value: 'youtube', color: 'from-red-600 to-red-400', icon: '▶️' },
  ];

  const stats = [
    { label: 'Total Reach', value: '1.2M', change: '+15.3%', trend: 'up', icon: '👁️' },
    { label: 'Engagement', value: '89.4K', change: '+23.1%', trend: 'up', icon: '💚' },
    { label: 'New Followers', value: '12.3K', change: '+8.7%', trend: 'up', icon: '👥' },
    { label: 'Clicks', value: '45.2K', change: '-2.4%', trend: 'down', icon: '🔗' },
  ];

  const topPosts = [
    { 
      content: 'Announcing CSPOC 2026: Join us in New Delhi',
      reach: '456K',
      engagement: '34.2K',
      platform: 'Facebook',
      date: '2 days ago',
      score: 98
    },
    {
      content: 'Meet our distinguished speakers at CSPOC 2026',
      reach: '234K',
      engagement: '18.9K',
      platform: 'LinkedIn',
      date: '3 days ago',
      score: 95
    },
    {
      content: 'Behind the scenes: Parliament preparations',
      reach: '189K',
      engagement: '12.4K',
      platform: 'Instagram',
      date: '4 days ago',
      score: 87
    },
  ];

  const engagementByHour = [
    { hour: '00:00', value: 12 },
    { hour: '03:00', value: 8 },
    { hour: '06:00', value: 15 },
    { hour: '09:00', value: 45 },
    { hour: '12:00', value: 67 },
    { hour: '15:00', value: 89 },
    { hour: '18:00', value: 92 },
    { hour: '21:00', value: 56 },
  ];

  const maxEngagement = Math.max(...engagementByHour.map(e => e.value));

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
              <Link href="/dashboard" className="px-4 py-2 hover:bg-white/10 rounded-lg transition-colors">Dashboard</Link>
              <Link href="/analytics" className="px-4 py-2 bg-white/10 rounded-lg font-semibold">Analytics</Link>
              <Link href="/campaigns" className="px-4 py-2 hover:bg-white/10 rounded-lg transition-colors">Campaigns</Link>
              <Link href="/calendar" className="px-4 py-2 hover:bg-white/10 rounded-lg transition-colors">Calendar</Link>
              <Link href="/connections" className="px-4 py-2 hover:bg-white/10 rounded-lg transition-colors">Connections</Link>
            </div>
          </div>
        </div>
      </nav>

      <div className="container mx-auto px-6 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-5xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent mb-4">
            Analytics Dashboard
          </h1>
          <p className="text-xl text-gray-400">Track your performance across all platforms</p>
        </div>

        {/* Filters */}
        <div className="flex items-center space-x-4 mb-8">
          <div className="flex items-center space-x-2 bg-white/5 backdrop-blur-lg rounded-xl p-2 border border-white/10">
            {['7days', '30days', '90days', 'year'].map((range) => (
              <button
                key={range}
                onClick={() => setTimeRange(range)}
                className={`px-4 py-2 rounded-lg transition-all ${
                  timeRange === range
                    ? 'bg-gradient-to-r from-blue-600 to-purple-600 font-semibold'
                    : 'hover:bg-white/10'
                }`}
              >
                {range === '7days' && 'Last 7 Days'}
                {range === '30days' && 'Last 30 Days'}
                {range === '90days' && 'Last 90 Days'}
                {range === 'year' && 'This Year'}
              </button>
            ))}
          </div>

          <select
            value={selectedPlatform}
            onChange={(e) => setSelectedPlatform(e.target.value)}
            className="px-4 py-2 bg-white/5 backdrop-blur-lg rounded-xl border border-white/10 focus:outline-none focus:border-purple-500/50"
          >
            {platforms.map((platform) => (
              <option key={platform.value} value={platform.value}>
                {platform.name}
              </option>
            ))}
          </select>
        </div>

        {/* Key Metrics */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {stats.map((stat, index) => (
            <div
              key={index}
              className="bg-gradient-to-br from-white/5 to-white/10 backdrop-blur-lg rounded-3xl border border-white/10 p-6 hover:scale-105 transition-transform"
            >
              <div className="flex items-center justify-between mb-4">
                <span className="text-4xl">{stat.icon}</span>
                <div className={`flex items-center space-x-1 text-sm font-semibold ${
                  stat.trend === 'up' ? 'text-green-400' : 'text-red-400'
                }`}>
                  <span>{stat.trend === 'up' ? '↗' : '↘'}</span>
                  <span>{stat.change}</span>
                </div>
              </div>
              <div className="text-3xl font-bold mb-1">{stat.value}</div>
              <div className="text-sm text-gray-400">{stat.label}</div>
            </div>
          ))}
        </div>

        <div className="grid lg:grid-cols-3 gap-6">
          {/* Main Charts */}
          <div className="lg:col-span-2 space-y-6">
            {/* Engagement by Time */}
            <div className="bg-white/5 backdrop-blur-lg rounded-3xl border border-white/10 p-8">
              <h2 className="text-2xl font-bold mb-6">Engagement by Time of Day</h2>
              <div className="space-y-3">
                {engagementByHour.map((data, index) => (
                  <div key={index} className="flex items-center space-x-4">
                    <div className="w-16 text-sm text-gray-400">{data.hour}</div>
                    <div className="flex-1 h-10 bg-white/5 rounded-lg overflow-hidden">
                      <div
                        className="h-full bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg transition-all duration-500 flex items-center justify-end pr-4"
                        style={{ width: `${(data.value / maxEngagement) * 100}%` }}
                      >
                        {data.value > 30 && (
                          <span className="text-sm font-bold">{data.value}K</span>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              <div className="mt-6 p-4 bg-blue-500/10 border border-blue-500/30 rounded-xl">
                <div className="flex items-center space-x-2">
                  <span className="text-2xl">💡</span>
                  <div>
                    <div className="font-semibold text-blue-400">Best Time to Post</div>
                    <div className="text-sm text-gray-400">Peak engagement between 6 PM - 9 PM</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Top Performing Posts */}
            <div className="bg-white/5 backdrop-blur-lg rounded-3xl border border-white/10 p-8">
              <h2 className="text-2xl font-bold mb-6">Top Performing Posts</h2>
              <div className="space-y-4">
                {topPosts.map((post, index) => (
                  <div
                    key={index}
                    className="p-6 bg-white/5 border border-white/10 rounded-2xl hover:bg-white/10 transition-all group"
                  >
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex-1">
                        <p className="text-lg font-semibold mb-2">{post.content}</p>
                        <div className="flex items-center space-x-4 text-sm text-gray-400">
                          <span className="px-2 py-1 bg-white/10 rounded-full">{post.platform}</span>
                          <span>{post.date}</span>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className={`text-3xl font-bold mb-1 ${
                          post.score >= 90 ? 'text-green-400' : 'text-blue-400'
                        }`}>
                          {post.score}
                        </div>
                        <div className="text-xs text-gray-400">Score</div>
                      </div>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="p-3 bg-white/5 rounded-lg">
                        <div className="text-2xl font-bold text-purple-400">{post.reach}</div>
                        <div className="text-xs text-gray-400">Reach</div>
                      </div>
                      <div className="p-3 bg-white/5 rounded-lg">
                        <div className="text-2xl font-bold text-green-400">{post.engagement}</div>
                        <div className="text-xs text-gray-400">Engagement</div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Platform Breakdown */}
            <div className="bg-gradient-to-br from-blue-900/30 to-purple-900/30 backdrop-blur-lg rounded-3xl border border-white/10 p-6">
              <h3 className="text-xl font-bold mb-6">Platform Breakdown</h3>
              <div className="space-y-4">
                {platforms.slice(1).map((platform, index) => (
                  <div key={index} className="space-y-2">
                    <div className="flex items-center justify-between text-sm">
                      <div className="flex items-center space-x-2">
                        <span className="text-xl">{platform.icon}</span>
                        <span className="font-semibold">{platform.name}</span>
                      </div>
                      <span className="text-gray-400">{Math.floor(Math.random() * 40 + 60)}%</span>
                    </div>
                    <div className="h-2 bg-white/5 rounded-full overflow-hidden">
                      <div
                        className={`h-full bg-gradient-to-r ${platform.color} rounded-full`}
                        style={{ width: `${Math.floor(Math.random() * 40 + 60)}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Audience Demographics */}
            <div className="bg-white/5 backdrop-blur-lg rounded-3xl border border-white/10 p-6">
              <h3 className="text-xl font-bold mb-6">Audience Demographics</h3>
              <div className="space-y-4">
                <div>
                  <div className="flex items-center justify-between mb-2 text-sm">
                    <span className="text-gray-400">Age 18-24</span>
                    <span className="font-semibold">15%</span>
                  </div>
                  <div className="flex items-center justify-between mb-2 text-sm">
                    <span className="text-gray-400">Age 25-34</span>
                    <span className="font-semibold">35%</span>
                  </div>
                  <div className="flex items-center justify-between mb-2 text-sm">
                    <span className="text-gray-400">Age 35-44</span>
                    <span className="font-semibold">28%</span>
                  </div>
                  <div className="flex items-center justify-between mb-2 text-sm">
                    <span className="text-gray-400">Age 45+</span>
                    <span className="font-semibold">22%</span>
                  </div>
                </div>
                <div className="pt-4 border-t border-white/10">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="text-center p-3 bg-white/5 rounded-lg">
                      <div className="text-2xl font-bold text-blue-400">58%</div>
                      <div className="text-xs text-gray-400">Male</div>
                    </div>
                    <div className="text-center p-3 bg-white/5 rounded-lg">
                      <div className="text-2xl font-bold text-pink-400">42%</div>
                      <div className="text-xs text-gray-400">Female</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Top Locations */}
            <div className="bg-white/5 backdrop-blur-lg rounded-3xl border border-white/10 p-6">
              <h3 className="text-xl font-bold mb-6">Top Locations</h3>
              <div className="space-y-3">
                {[
                  { country: '🇮🇳 India', percent: 45 },
                  { country: '🇬🇧 UK', percent: 18 },
                  { country: '🇺🇸 USA', percent: 15 },
                  { country: '🇦🇺 Australia', percent: 12 },
                  { country: '🇨🇦 Canada', percent: 10 },
                ].map((location, index) => (
                  <div key={index} className="flex items-center justify-between">
                    <span className="text-sm">{location.country}</span>
                    <span className="text-sm font-semibold text-purple-400">{location.percent}%</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Export Report */}
            <button className="w-full p-6 bg-gradient-to-r from-green-600/20 to-blue-600/20 border border-green-500/30 rounded-3xl hover:scale-105 transition-transform">
              <div className="text-center">
                <div className="text-4xl mb-2">📊</div>
                <div className="font-bold mb-1">Export Full Report</div>
                <div className="text-xs text-gray-400">PDF, Excel, or PowerPoint</div>
              </div>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

