'use client';

import { useState } from 'react';
import Link from 'next/link';

interface Influencer {
  id: string;
  name: string;
  platform: string;
  handle: string;
  followers: number;
  engagement: number;
  category: string;
  status: 'prospect' | 'contacted' | 'negotiating' | 'active' | 'archived';
  lastContact?: string;
  campaigns: number;
  avgReach: number;
  costPerPost?: number;
  notes: string;
}

export default function InfluencerTracking() {
  const [influencers, setInfluencers] = useState<Influencer[]>([
    {
      id: '1',
      name: 'Priya Mehra',
      platform: 'Instagram',
      handle: '@priyamehra_official',
      followers: 450000,
      engagement: 5.8,
      category: 'Politics & Governance',
      status: 'active',
      lastContact: '2025-12-20',
      campaigns: 3,
      avgReach: 280000,
      costPerPost: 50000,
      notes: 'Strong engagement with youth. Posted about parliamentary democracy.',
    },
    {
      id: '2',
      name: 'Rahul Verma',
      platform: 'Twitter/X',
      handle: '@rahulverma',
      followers: 890000,
      engagement: 4.2,
      category: 'News & Current Affairs',
      status: 'negotiating',
      lastContact: '2025-12-24',
      campaigns: 0,
      avgReach: 520000,
      costPerPost: 75000,
      notes: 'Potential collaboration for CSPOC coverage. Awaiting response.',
    },
    {
      id: '3',
      name: 'Kavita Desai',
      platform: 'YouTube',
      handle: '@KavitaSpeaks',
      followers: 1200000,
      engagement: 6.5,
      category: 'Education & Leadership',
      status: 'active',
      lastContact: '2025-12-22',
      campaigns: 2,
      avgReach: 850000,
      costPerPost: 120000,
      notes: 'Created excellent explainer video on Commonwealth. High ROI.',
    },
    {
      id: '4',
      name: 'Amit Kumar',
      platform: 'LinkedIn',
      handle: '@amitkumar-policy',
      followers: 320000,
      engagement: 7.2,
      category: 'Policy & Diplomacy',
      status: 'contacted',
      lastContact: '2025-12-25',
      campaigns: 0,
      avgReach: 180000,
      notes: 'Professional audience. Ideal for B2G messaging.',
    },
  ]);

  const [selectedInfluencer, setSelectedInfluencer] = useState<Influencer | null>(null);
  const [showAddModal, setShowAddModal] = useState(false);
  const [filterStatus, setFilterStatus] = useState<string>('all');

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-green-600/30 border-green-500/50 text-green-400';
      case 'negotiating': return 'bg-yellow-600/30 border-yellow-500/50 text-yellow-400';
      case 'contacted': return 'bg-blue-600/30 border-blue-500/50 text-blue-400';
      case 'prospect': return 'bg-purple-600/30 border-purple-500/50 text-purple-400';
      case 'archived': return 'bg-gray-600/30 border-gray-500/50 text-gray-400';
      default: return 'bg-white/10';
    }
  };

  const getPlatformIcon = (platform: string) => {
    switch (platform.toLowerCase()) {
      case 'instagram': return '📸';
      case 'twitter/x': return '🐦';
      case 'youtube': return '📺';
      case 'linkedin': return '💼';
      case 'facebook': return '👥';
      default: return '🌐';
    }
  };

  const filteredInfluencers = filterStatus === 'all' 
    ? influencers 
    : influencers.filter(i => i.status === filterStatus);

  const totalReach = influencers.reduce((sum, inf) => sum + inf.avgReach, 0);
  const activeCount = influencers.filter(i => i.status === 'active').length;

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
              <Link href="/dashboard" className="px-4 py-2 hover:bg-white/10 rounded-lg">Dashboard</Link>
              <Link href="/influencers" className="px-4 py-2 bg-white/10 rounded-lg font-semibold">Influencers</Link>
            </div>
          </div>
        </div>
      </nav>

      <div className="container mx-auto px-6 py-8">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-5xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent mb-4">
              Influencer Tracking
            </h1>
            <p className="text-xl text-gray-400">Manage influencer relationships and campaigns</p>
          </div>
          <button
            onClick={() => setShowAddModal(true)}
            className="px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl font-bold hover:shadow-lg transition-all"
          >
            + Add Influencer
          </button>
        </div>

        <div className="grid grid-cols-4 gap-6 mb-8">
          <div className="p-6 bg-white/5 backdrop-blur-lg rounded-2xl border border-white/10">
            <div className="text-4xl font-bold text-blue-400">{influencers.length}</div>
            <div className="text-gray-400">Total Influencers</div>
          </div>
          <div className="p-6 bg-white/5 backdrop-blur-lg rounded-2xl border border-white/10">
            <div className="text-4xl font-bold text-green-400">{activeCount}</div>
            <div className="text-gray-400">Active Partnerships</div>
          </div>
          <div className="p-6 bg-white/5 backdrop-blur-lg rounded-2xl border border-white/10">
            <div className="text-4xl font-bold text-purple-400">{(totalReach / 1000000).toFixed(1)}M</div>
            <div className="text-gray-400">Total Reach</div>
          </div>
          <div className="p-6 bg-white/5 backdrop-blur-lg rounded-2xl border border-white/10">
            <div className="text-4xl font-bold text-yellow-400">
              {(influencers.reduce((sum, i) => sum + i.engagement, 0) / influencers.length).toFixed(1)}%
            </div>
            <div className="text-gray-400">Avg Engagement</div>
          </div>
        </div>

        <div className="mb-6 flex items-center space-x-3">
          <button
            onClick={() => setFilterStatus('all')}
            className={`px-4 py-2 rounded-lg transition-colors ${filterStatus === 'all' ? 'bg-purple-600' : 'bg-white/5 hover:bg-white/10'}`}
          >
            All
          </button>
          {['prospect', 'contacted', 'negotiating', 'active', 'archived'].map(status => (
            <button
              key={status}
              onClick={() => setFilterStatus(status)}
              className={`px-4 py-2 rounded-lg transition-colors capitalize ${filterStatus === status ? 'bg-purple-600' : 'bg-white/5 hover:bg-white/10'}`}
            >
              {status}
            </button>
          ))}
        </div>

        <div className="grid lg:grid-cols-2 gap-6">
          {filteredInfluencers.map(influencer => (
            <div key={influencer.id} className="p-6 bg-white/5 backdrop-blur-lg rounded-2xl border border-white/10">
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center space-x-3">
                  <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-3xl">
                    {getPlatformIcon(influencer.platform)}
                  </div>
                  <div>
                    <h3 className="text-xl font-bold">{influencer.name}</h3>
                    <div className="text-sm text-gray-400">{influencer.handle}</div>
                  </div>
                </div>
                <span className={`text-xs px-3 py-1 rounded-full border ${getStatusColor(influencer.status)}`}>
                  {influencer.status.toUpperCase()}
                </span>
              </div>

              <div className="grid grid-cols-3 gap-3 mb-4">
                <div className="p-3 bg-black/30 rounded-lg text-center">
                  <div className="text-xl font-bold text-blue-400">{(influencer.followers / 1000).toFixed(0)}K</div>
                  <div className="text-xs text-gray-400">Followers</div>
                </div>
                <div className="p-3 bg-black/30 rounded-lg text-center">
                  <div className="text-xl font-bold text-green-400">{influencer.engagement}%</div>
                  <div className="text-xs text-gray-400">Engagement</div>
                </div>
                <div className="p-3 bg-black/30 rounded-lg text-center">
                  <div className="text-xl font-bold text-purple-400">{(influencer.avgReach / 1000).toFixed(0)}K</div>
                  <div className="text-xs text-gray-400">Avg Reach</div>
                </div>
              </div>

              <div className="mb-4">
                <div className="text-xs text-gray-400 mb-1">Category</div>
                <div className="text-sm">{influencer.category}</div>
              </div>

              {influencer.costPerPost && (
                <div className="mb-4">
                  <div className="text-xs text-gray-400 mb-1">Cost Per Post</div>
                  <div className="text-sm">₹{influencer.costPerPost.toLocaleString()}</div>
                </div>
              )}

              <div className="mb-4 p-3 bg-black/20 rounded-lg">
                <div className="text-xs text-gray-400 mb-1">Notes</div>
                <div className="text-sm">{influencer.notes}</div>
              </div>

              <div className="flex items-center justify-between text-xs text-gray-400 mb-4">
                <span>{influencer.campaigns} campaigns</span>
                {influencer.lastContact && <span>Last contact: {influencer.lastContact}</span>}
              </div>

              <div className="flex items-center space-x-2">
                <button
                  onClick={() => setSelectedInfluencer(influencer)}
                  className="flex-1 px-4 py-2 bg-blue-600/30 hover:bg-blue-600/50 rounded-lg transition-colors"
                >
                  View Details
                </button>
                <button className="px-4 py-2 bg-green-600/30 hover:bg-green-600/50 rounded-lg transition-colors">
                  💬 Contact
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {selectedInfluencer && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-6">
          <div className="bg-gradient-to-br from-slate-900 to-purple-900 rounded-3xl border border-white/20 p-8 max-w-2xl w-full">
            <h2 className="text-3xl font-bold mb-6">{selectedInfluencer.name}</h2>
            <div className="space-y-4 mb-6">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <div className="text-sm text-gray-400">Platform</div>
                  <div className="text-lg">{selectedInfluencer.platform}</div>
                </div>
                <div>
                  <div className="text-sm text-gray-400">Handle</div>
                  <div className="text-lg">{selectedInfluencer.handle}</div>
                </div>
                <div>
                  <div className="text-sm text-gray-400">Followers</div>
                  <div className="text-lg">{selectedInfluencer.followers.toLocaleString()}</div>
                </div>
                <div>
                  <div className="text-sm text-gray-400">Engagement Rate</div>
                  <div className="text-lg">{selectedInfluencer.engagement}%</div>
                </div>
              </div>
            </div>
            <button
              onClick={() => setSelectedInfluencer(null)}
              className="w-full px-6 py-3 bg-white/5 hover:bg-white/10 rounded-xl transition-colors"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

