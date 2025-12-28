'use client';

import { useState } from 'react';
import Link from 'next/link';

interface Campaign {
  id: number;
  name: string;
  status: 'draft' | 'active' | 'completed';
  startDate: string;
  endDate: string;
  platforms: string[];
  posts: number;
  reach: string;
  engagement: string;
}

export default function Campaigns() {
  const [activeTab, setActiveTab] = useState('active');
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [newCampaign, setNewCampaign] = useState({
    name: '',
    startDate: '',
    endDate: '',
    platforms: [] as string[],
    objective: '',
  });

  const campaigns: Campaign[] = [
    {
      id: 1,
      name: 'CSPOC 2026 Pre-Event Buzz',
      status: 'active',
      startDate: 'Dec 1, 2025',
      endDate: 'Jan 14, 2026',
      platforms: ['Facebook', 'Twitter/X', 'LinkedIn'],
      posts: 24,
      reach: '1.2M',
      engagement: '89K',
    },
    {
      id: 2,
      name: 'Speaker Spotlight Series',
      status: 'active',
      startDate: 'Dec 15, 2025',
      endDate: 'Jan 10, 2026',
      platforms: ['Instagram', 'LinkedIn', 'YouTube'],
      posts: 12,
      reach: '567K',
      engagement: '45K',
    },
    {
      id: 3,
      name: 'Registration Drive',
      status: 'completed',
      startDate: 'Nov 1, 2025',
      endDate: 'Nov 30, 2025',
      platforms: ['Facebook', 'Twitter/X', 'Instagram', 'LinkedIn'],
      posts: 36,
      reach: '2.1M',
      engagement: '156K',
    },
  ];

  const platforms = ['Facebook', 'Twitter/X', 'Instagram', 'LinkedIn', 'YouTube'];

  const togglePlatform = (platform: string) => {
    setNewCampaign(prev => ({
      ...prev,
      platforms: prev.platforms.includes(platform)
        ? prev.platforms.filter(p => p !== platform)
        : [...prev.platforms, platform]
    }));
  };

  const handleCreateCampaign = () => {
    if (!newCampaign.name || !newCampaign.startDate || !newCampaign.endDate || newCampaign.platforms.length === 0) {
      alert('⚠️ Please fill in all required fields');
      return;
    }

    alert(`✅ Campaign "${newCampaign.name}" created successfully!\n\n` +
      `📅 Duration: ${newCampaign.startDate} - ${newCampaign.endDate}\n` +
      `📱 Platforms: ${newCampaign.platforms.join(', ')}\n` +
      `🎯 Objective: ${newCampaign.objective}\n\n` +
      `You can now start adding posts to this campaign!`);
    
    setShowCreateModal(false);
    setNewCampaign({ name: '', startDate: '', endDate: '', platforms: [], objective: '' });
  };

  const filteredCampaigns = campaigns.filter(c => 
    activeTab === 'all' ? true : c.status === activeTab
  );

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
              <Link href="/analytics" className="px-4 py-2 hover:bg-white/10 rounded-lg transition-colors">Analytics</Link>
              <Link href="/campaigns" className="px-4 py-2 bg-white/10 rounded-lg font-semibold">Campaigns</Link>
              <Link href="/calendar" className="px-4 py-2 hover:bg-white/10 rounded-lg transition-colors">Calendar</Link>
              <Link href="/connections" className="px-4 py-2 hover:bg-white/10 rounded-lg transition-colors">Connections</Link>
            </div>
          </div>
        </div>
      </nav>

      <div className="container mx-auto px-6 py-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-5xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent mb-4">
              Campaign Manager
            </h1>
            <p className="text-xl text-gray-400">Plan and execute multi-post marketing strategies</p>
          </div>
          <button
            onClick={() => setShowCreateModal(true)}
            className="px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl font-bold text-lg hover:shadow-lg hover:shadow-purple-500/50 transition-all transform hover:scale-105 flex items-center space-x-2"
          >
            <span className="text-2xl">➕</span>
            <span>New Campaign</span>
          </button>
        </div>

        {/* Tabs */}
        <div className="flex items-center space-x-2 mb-8 bg-white/5 backdrop-blur-lg rounded-xl p-2 border border-white/10 w-fit">
          {['all', 'active', 'draft', 'completed'].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-6 py-2 rounded-lg transition-all capitalize ${
                activeTab === tab
                  ? 'bg-gradient-to-r from-blue-600 to-purple-600 font-semibold'
                  : 'hover:bg-white/10'
              }`}
            >
              {tab}
            </button>
          ))}
        </div>

        {/* Campaigns Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          {filteredCampaigns.map((campaign) => (
            <div
              key={campaign.id}
              className="bg-white/5 backdrop-blur-lg rounded-3xl border border-white/10 p-6 hover:bg-white/10 transition-all group cursor-pointer"
            >
              {/* Status Badge */}
              <div className="flex items-center justify-between mb-4">
                <div className={`px-3 py-1 rounded-full text-xs font-semibold ${
                  campaign.status === 'active' ? 'bg-green-500/20 text-green-400 border border-green-500/50' :
                  campaign.status === 'draft' ? 'bg-yellow-500/20 text-yellow-400 border border-yellow-500/50' :
                  'bg-gray-500/20 text-gray-400 border border-gray-500/50'
                }`}>
                  {campaign.status === 'active' && '🟢 Active'}
                  {campaign.status === 'draft' && '📝 Draft'}
                  {campaign.status === 'completed' && '✅ Completed'}
                </div>
                <button className="text-2xl opacity-0 group-hover:opacity-100 transition-opacity">⚙️</button>
              </div>

              {/* Campaign Name */}
              <h3 className="text-2xl font-bold mb-4 group-hover:text-purple-400 transition-colors">
                {campaign.name}
              </h3>

              {/* Date Range */}
              <div className="flex items-center space-x-2 text-sm text-gray-400 mb-4">
                <span>📅</span>
                <span>{campaign.startDate} - {campaign.endDate}</span>
              </div>

              {/* Platforms */}
              <div className="flex flex-wrap gap-2 mb-4">
                {campaign.platforms.map((platform, i) => (
                  <span
                    key={i}
                    className="px-3 py-1 bg-white/10 rounded-full text-xs font-semibold"
                  >
                    {platform}
                  </span>
                ))}
              </div>

              {/* Stats */}
              <div className="grid grid-cols-3 gap-3 pt-4 border-t border-white/10">
                <div className="text-center">
                  <div className="text-xl font-bold text-blue-400">{campaign.posts}</div>
                  <div className="text-xs text-gray-400">Posts</div>
                </div>
                <div className="text-center">
                  <div className="text-xl font-bold text-purple-400">{campaign.reach}</div>
                  <div className="text-xs text-gray-400">Reach</div>
                </div>
                <div className="text-center">
                  <div className="text-xl font-bold text-green-400">{campaign.engagement}</div>
                  <div className="text-xs text-gray-400">Engagement</div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Campaign Templates */}
        <div className="bg-gradient-to-br from-blue-900/30 to-purple-900/30 backdrop-blur-lg rounded-3xl border border-white/10 p-8">
          <h2 className="text-3xl font-bold mb-6">Campaign Templates</h2>
          <div className="grid md:grid-cols-3 gap-6">
            {[
              {
                name: 'Product Launch',
                icon: '🚀',
                description: 'Build anticipation and excitement for a new launch',
                duration: '2 weeks',
                posts: '15-20',
              },
              {
                name: 'Event Promotion',
                icon: '🎪',
                description: 'Drive registrations and attendance',
                duration: '4 weeks',
                posts: '25-30',
              },
              {
                name: 'Brand Awareness',
                icon: '📢',
                description: 'Increase visibility and recognition',
                duration: '8 weeks',
                posts: '40-50',
              },
            ].map((template, index) => (
              <div
                key={index}
                className="p-6 bg-white/5 border border-white/10 rounded-2xl hover:bg-white/10 transition-all group cursor-pointer"
              >
                <div className="text-5xl mb-4">{template.icon}</div>
                <h3 className="text-xl font-bold mb-2 group-hover:text-purple-400 transition-colors">
                  {template.name}
                </h3>
                <p className="text-sm text-gray-400 mb-4">{template.description}</p>
                <div className="flex items-center justify-between text-xs text-gray-500">
                  <span>⏱️ {template.duration}</span>
                  <span>📝 {template.posts} posts</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Create Campaign Modal */}
      {showCreateModal && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-6">
          <div className="bg-gradient-to-br from-slate-900 to-purple-900 rounded-3xl border border-white/20 p-8 max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-3xl font-bold">Create New Campaign</h2>
              <button
                onClick={() => setShowCreateModal(false)}
                className="text-3xl hover:text-red-400 transition-colors"
              >
                ✕
              </button>
            </div>

            <div className="space-y-6">
              {/* Campaign Name */}
              <div>
                <label className="block text-sm font-semibold mb-2">Campaign Name *</label>
                <input
                  type="text"
                  value={newCampaign.name}
                  onChange={(e) => setNewCampaign({...newCampaign, name: e.target.value})}
                  placeholder="e.g., CSPOC 2026 Pre-Event Campaign"
                  className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl focus:outline-none focus:border-purple-500/50"
                />
              </div>

              {/* Date Range */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-semibold mb-2">Start Date *</label>
                  <input
                    type="date"
                    value={newCampaign.startDate}
                    onChange={(e) => setNewCampaign({...newCampaign, startDate: e.target.value})}
                    className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl focus:outline-none focus:border-purple-500/50"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold mb-2">End Date *</label>
                  <input
                    type="date"
                    value={newCampaign.endDate}
                    onChange={(e) => setNewCampaign({...newCampaign, endDate: e.target.value})}
                    className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl focus:outline-none focus:border-purple-500/50"
                  />
                </div>
              </div>

              {/* Platforms */}
              <div>
                <label className="block text-sm font-semibold mb-3">Target Platforms *</label>
                <div className="grid grid-cols-3 gap-3">
                  {platforms.map((platform) => (
                    <button
                      key={platform}
                      onClick={() => togglePlatform(platform)}
                      className={`px-4 py-3 rounded-xl border-2 transition-all ${
                        newCampaign.platforms.includes(platform)
                          ? 'bg-purple-600 border-purple-400'
                          : 'bg-white/5 border-white/10 hover:border-white/30'
                      }`}
                    >
                      {platform}
                    </button>
                  ))}
                </div>
              </div>

              {/* Objective */}
              <div>
                <label className="block text-sm font-semibold mb-2">Campaign Objective</label>
                <textarea
                  value={newCampaign.objective}
                  onChange={(e) => setNewCampaign({...newCampaign, objective: e.target.value})}
                  placeholder="What do you want to achieve with this campaign?"
                  className="w-full h-24 px-4 py-3 bg-white/5 border border-white/10 rounded-xl focus:outline-none focus:border-purple-500/50 resize-none"
                />
              </div>

              {/* Actions */}
              <div className="flex items-center space-x-4 pt-4">
                <button
                  onClick={handleCreateCampaign}
                  className="flex-1 px-6 py-4 bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl font-bold hover:shadow-lg hover:shadow-purple-500/50 transition-all"
                >
                  Create Campaign
                </button>
                <button
                  onClick={() => setShowCreateModal(false)}
                  className="px-6 py-4 bg-white/5 hover:bg-white/10 rounded-xl font-semibold transition-all"
                >
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

