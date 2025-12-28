'use client';

import { useState } from 'react';
import Link from 'next/link';

interface AdCampaign {
  id: string;
  name: string;
  platform: string;
  objective: string;
  budget: number;
  spent: number;
  impressions: number;
  clicks: number;
  conversions: number;
  ctr: number;
  cpc: number;
  status: 'active' | 'paused' | 'draft';
  startDate: string;
  endDate: string;
}

export default function AdCampaignManager() {
  const [campaigns] = useState<AdCampaign[]>([
    {
      id: '1',
      name: 'CSPOC Registration Drive',
      platform: 'Facebook',
      objective: 'Conversions',
      budget: 100000,
      spent: 67340,
      impressions: 2450000,
      clicks: 34580,
      conversions: 892,
      ctr: 1.41,
      cpc: 1.95,
      status: 'active',
      startDate: '2025-12-15',
      endDate: '2026-01-10',
    },
    {
      id: '2',
      name: 'Speaker Awareness Campaign',
      platform: 'LinkedIn',
      objective: 'Brand Awareness',
      budget: 75000,
      spent: 42100,
      impressions: 1890000,
      clicks: 18900,
      conversions: 0,
      ctr: 1.0,
      cpc: 2.23,
      status: 'active',
      startDate: '2025-12-20',
      endDate: '2026-01-05',
    },
    {
      id: '3',
      name: 'Event Livestream Promo',
      platform: 'YouTube',
      objective: 'Video Views',
      budget: 50000,
      spent: 0,
      impressions: 0,
      clicks: 0,
      conversions: 0,
      ctr: 0,
      cpc: 0,
      status: 'draft',
      startDate: '2026-01-12',
      endDate: '2026-01-17',
    },
  ]);

  const [showCreateModal, setShowCreateModal] = useState(false);

  const totalSpent = campaigns.reduce((sum, c) => sum + c.spent, 0);
  const totalImpressions = campaigns.reduce((sum, c) => sum + c.impressions, 0);
  const totalConversions = campaigns.reduce((sum, c) => sum + c.conversions, 0);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-green-600/30 text-green-400';
      case 'paused': return 'bg-yellow-600/30 text-yellow-400';
      case 'draft': return 'bg-gray-600/30 text-gray-400';
      default: return 'bg-white/10';
    }
  };

  const getPlatformIcon = (platform: string) => {
    switch (platform) {
      case 'Facebook': return '👥';
      case 'LinkedIn': return '💼';
      case 'YouTube': return '📺';
      case 'Twitter/X': return '🐦';
      case 'Instagram': return '📸';
      default: return '🌐';
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
              <Link href="/budget" className="px-4 py-2 hover:bg-white/10 rounded-lg">Budget</Link>
              <Link href="/ad-campaigns" className="px-4 py-2 bg-white/10 rounded-lg font-semibold">Ad Campaigns</Link>
            </div>
          </div>
        </div>
      </nav>

      <div className="container mx-auto px-6 py-8">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-5xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent mb-4">
              Ad Campaign Manager
            </h1>
            <p className="text-xl text-gray-400">Manage paid social media advertising</p>
          </div>
          <button
            onClick={() => setShowCreateModal(true)}
            className="px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl font-bold hover:shadow-lg transition-all"
          >
            + Create Campaign
          </button>
        </div>

        <div className="grid grid-cols-4 gap-6 mb-8">
          <div className="p-6 bg-white/5 backdrop-blur-lg rounded-2xl border border-white/10">
            <div className="text-sm text-gray-400 mb-2">Total Spent</div>
            <div className="text-3xl font-bold text-orange-400">₹{(totalSpent / 1000).toFixed(0)}K</div>
          </div>
          <div className="p-6 bg-white/5 backdrop-blur-lg rounded-2xl border border-white/10">
            <div className="text-sm text-gray-400 mb-2">Impressions</div>
            <div className="text-3xl font-bold text-blue-400">{(totalImpressions / 1000000).toFixed(1)}M</div>
          </div>
          <div className="p-6 bg-white/5 backdrop-blur-lg rounded-2xl border border-white/10">
            <div className="text-sm text-gray-400 mb-2">Conversions</div>
            <div className="text-3xl font-bold text-green-400">{totalConversions}</div>
          </div>
          <div className="p-6 bg-white/5 backdrop-blur-lg rounded-2xl border border-white/10">
            <div className="text-sm text-gray-400 mb-2">Active</div>
            <div className="text-3xl font-bold text-purple-400">{campaigns.filter(c => c.status === 'active').length}</div>
          </div>
        </div>

        <div className="space-y-4">
          {campaigns.map(campaign => (
            <div key={campaign.id} className="p-6 bg-white/5 backdrop-blur-lg rounded-2xl border border-white/10">
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl flex items-center justify-center text-2xl">
                    {getPlatformIcon(campaign.platform)}
                  </div>
                  <div>
                    <div className="flex items-center space-x-3 mb-1">
                      <h3 className="text-2xl font-bold">{campaign.name}</h3>
                      <span className={`text-xs px-3 py-1 rounded-full ${getStatusColor(campaign.status)}`}>
                        {campaign.status.toUpperCase()}
                      </span>
                    </div>
                    <div className="text-sm text-gray-400">
                      {campaign.platform} • {campaign.objective} • {campaign.startDate} → {campaign.endDate}
                    </div>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-6 gap-4 mb-4">
                <div className="p-3 bg-black/30 rounded-lg">
                  <div className="text-xs text-gray-400 mb-1">Budget</div>
                  <div className="text-lg font-bold">₹{(campaign.budget / 1000).toFixed(0)}K</div>
                </div>
                <div className="p-3 bg-black/30 rounded-lg">
                  <div className="text-xs text-gray-400 mb-1">Spent</div>
                  <div className="text-lg font-bold text-orange-400">₹{(campaign.spent / 1000).toFixed(0)}K</div>
                </div>
                <div className="p-3 bg-black/30 rounded-lg">
                  <div className="text-xs text-gray-400 mb-1">Impressions</div>
                  <div className="text-lg font-bold">{(campaign.impressions / 1000).toFixed(0)}K</div>
                </div>
                <div className="p-3 bg-black/30 rounded-lg">
                  <div className="text-xs text-gray-400 mb-1">Clicks</div>
                  <div className="text-lg font-bold text-blue-400">{campaign.clicks.toLocaleString()}</div>
                </div>
                <div className="p-3 bg-black/30 rounded-lg">
                  <div className="text-xs text-gray-400 mb-1">CTR</div>
                  <div className="text-lg font-bold text-purple-400">{campaign.ctr.toFixed(2)}%</div>
                </div>
                <div className="p-3 bg-black/30 rounded-lg">
                  <div className="text-xs text-gray-400 mb-1">CPC</div>
                  <div className="text-lg font-bold text-green-400">₹{campaign.cpc.toFixed(2)}</div>
                </div>
              </div>

              {campaign.conversions > 0 && (
                <div className="mb-4 p-3 bg-green-600/10 border border-green-500/30 rounded-lg">
                  <div className="text-sm">
                    ✅ <strong>{campaign.conversions} conversions</strong> generated •
                    Cost per conversion: <strong>₹{(campaign.spent / campaign.conversions).toFixed(2)}</strong>
                  </div>
                </div>
              )}

              <div className="flex items-center space-x-3">
                {campaign.status === 'active' && (
                  <>
                    <button className="px-6 py-2 bg-yellow-600/30 hover:bg-yellow-600/50 rounded-lg transition-colors">
                      ⏸️ Pause
                    </button>
                    <button className="px-6 py-2 bg-blue-600/30 hover:bg-blue-600/50 rounded-lg transition-colors">
                      ✏️ Edit
                    </button>
                  </>
                )}
                {campaign.status === 'paused' && (
                  <button className="px-6 py-2 bg-green-600/30 hover:bg-green-600/50 rounded-lg transition-colors">
                    ▶️ Resume
                  </button>
                )}
                {campaign.status === 'draft' && (
                  <button className="px-6 py-2 bg-green-600/30 hover:bg-green-600/50 rounded-lg transition-colors">
                    🚀 Launch
                  </button>
                )}
                <button className="px-6 py-2 bg-purple-600/30 hover:bg-purple-600/50 rounded-lg transition-colors">
                  📊 Analytics
                </button>
                <button className="px-6 py-2 bg-white/10 hover:bg-white/20 rounded-lg transition-colors">
                  📥 Export
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {showCreateModal && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-6">
          <div className="bg-gradient-to-br from-slate-900 to-purple-900 rounded-3xl border border-white/20 p-8 max-w-2xl w-full">
            <h2 className="text-3xl font-bold mb-6">Create Ad Campaign</h2>
            <div className="space-y-4">
              <input
                type="text"
                placeholder="Campaign name..."
                className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl focus:outline-none focus:border-purple-500/50"
              />
              <select className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl focus:outline-none focus:border-purple-500/50">
                <option>Select Platform</option>
                <option>Facebook</option>
                <option>Instagram</option>
                <option>LinkedIn</option>
                <option>Twitter/X</option>
                <option>YouTube</option>
              </select>
              <select className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl focus:outline-none focus:border-purple-500/50">
                <option>Campaign Objective</option>
                <option>Brand Awareness</option>
                <option>Reach</option>
                <option>Traffic</option>
                <option>Engagement</option>
                <option>Conversions</option>
                <option>Video Views</option>
              </select>
              <input
                type="number"
                placeholder="Budget (₹)..."
                className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl focus:outline-none focus:border-purple-500/50"
              />
              <div className="grid grid-cols-2 gap-4">
                <input
                  type="date"
                  placeholder="Start Date"
                  className="px-4 py-3 bg-white/5 border border-white/10 rounded-xl focus:outline-none focus:border-purple-500/50"
                />
                <input
                  type="date"
                  placeholder="End Date"
                  className="px-4 py-3 bg-white/5 border border-white/10 rounded-xl focus:outline-none focus:border-purple-500/50"
                />
              </div>
              <div className="flex space-x-4">
                <button className="flex-1 px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl font-bold">
                  Create Campaign
                </button>
                <button onClick={() => setShowCreateModal(false)} className="px-6 py-3 bg-white/5 rounded-xl">
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

