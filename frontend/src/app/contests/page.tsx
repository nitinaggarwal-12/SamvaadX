'use client';

import { useState } from 'react';
import Link from 'next/link';

interface Contest {
  id: string;
  name: string;
  type: 'giveaway' | 'photo' | 'video' | 'caption';
  status: 'draft' | 'active' | 'ended';
  startDate: string;
  endDate: string;
  prize: string;
  entries: number;
  platforms: string[];
  rules: string[];
}

export default function ContestManager() {
  const [contests, setContests] = useState<Contest[]>([
    {
      id: '1',
      name: 'CSPOC 2026 Photo Contest',
      type: 'photo',
      status: 'active',
      startDate: '2025-12-15',
      endDate: '2026-01-10',
      prize: 'VIP Passes to CSPOC 2026',
      entries: 1245,
      platforms: ['Instagram', 'Facebook'],
      rules: ['Follow @ParliamentIndia', 'Use #CSPOC2026Photo', 'Tag 3 friends'],
    },
    {
      id: '2',
      name: 'Democracy Quote Contest',
      type: 'caption',
      status: 'active',
      startDate: '2025-12-20',
      endDate: '2026-01-05',
      prize: '₹50,000 + Official Merchandise',
      entries: 892,
      platforms: ['Twitter/X', 'LinkedIn'],
      rules: ['Share best democracy quote', 'Use #DemocracyQuotes', 'Tag @ParliamentIndia'],
    },
    {
      id: '3',
      name: 'New Year Giveaway 2026',
      type: 'giveaway',
      status: 'draft',
      startDate: '2026-01-01',
      endDate: '2026-01-07',
      prize: 'Parliamentary Tour + Dinner',
      entries: 0,
      platforms: ['Facebook', 'Instagram', 'Twitter/X'],
      rules: ['Like & share post', 'Follow all platforms', 'Comment your favorite moment'],
    },
  ]);

  const [showCreateModal, setShowCreateModal] = useState(false);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-green-600/30 text-green-400';
      case 'draft': return 'bg-gray-600/30 text-gray-400';
      case 'ended': return 'bg-blue-600/30 text-blue-400';
      default: return 'bg-white/10';
    }
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'giveaway': return '🎁';
      case 'photo': return '📸';
      case 'video': return '🎬';
      case 'caption': return '✍️';
      default: return '🏆';
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
              <Link href="/campaigns" className="px-4 py-2 hover:bg-white/10 rounded-lg">Campaigns</Link>
              <Link href="/contests" className="px-4 py-2 bg-white/10 rounded-lg font-semibold">Contests</Link>
            </div>
          </div>
        </div>
      </nav>

      <div className="container mx-auto px-6 py-8">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-5xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent mb-4">
              Contest & Giveaway Manager
            </h1>
            <p className="text-xl text-gray-400">Run engaging contests to boost community interaction</p>
          </div>
          <button
            onClick={() => setShowCreateModal(true)}
            className="px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl font-bold hover:shadow-lg transition-all"
          >
            + Create Contest
          </button>
        </div>

        <div className="grid grid-cols-3 gap-6 mb-8">
          <div className="p-6 bg-white/5 backdrop-blur-lg rounded-2xl border border-white/10">
            <div className="text-sm text-gray-400 mb-2">Active Contests</div>
            <div className="text-3xl font-bold text-green-400">{contests.filter(c => c.status === 'active').length}</div>
          </div>
          <div className="p-6 bg-white/5 backdrop-blur-lg rounded-2xl border border-white/10">
            <div className="text-sm text-gray-400 mb-2">Total Entries</div>
            <div className="text-3xl font-bold text-blue-400">{contests.reduce((sum, c) => sum + c.entries, 0).toLocaleString()}</div>
          </div>
          <div className="p-6 bg-white/5 backdrop-blur-lg rounded-2xl border border-white/10">
            <div className="text-sm text-gray-400 mb-2">Avg Entry Rate</div>
            <div className="text-3xl font-bold text-purple-400">456/day</div>
          </div>
        </div>

        <div className="space-y-4">
          {contests.map(contest => (
            <div key={contest.id} className="p-6 bg-white/5 backdrop-blur-lg rounded-2xl border border-white/10">
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center space-x-4">
                  <div className="text-6xl">{getTypeIcon(contest.type)}</div>
                  <div>
                    <div className="flex items-center space-x-3 mb-2">
                      <h3 className="text-2xl font-bold">{contest.name}</h3>
                      <span className={`text-xs px-3 py-1 rounded-full ${getStatusColor(contest.status)}`}>
                        {contest.status.toUpperCase()}
                      </span>
                    </div>
                    <div className="text-sm text-gray-400">
                      {contest.startDate} → {contest.endDate}
                    </div>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-6 mb-4">
                <div>
                  <div className="text-sm text-gray-400 mb-2">Prize</div>
                  <div className="text-lg font-bold text-yellow-400">{contest.prize}</div>
                </div>
                <div>
                  <div className="text-sm text-gray-400 mb-2">Entries</div>
                  <div className="text-lg font-bold text-green-400">{contest.entries.toLocaleString()}</div>
                </div>
              </div>

              <div className="mb-4">
                <div className="text-sm font-semibold mb-2">Platforms</div>
                <div className="flex flex-wrap gap-2">
                  {contest.platforms.map((platform, i) => (
                    <span key={i} className="text-xs px-3 py-1 bg-purple-600/30 rounded-full">
                      {platform}
                    </span>
                  ))}
                </div>
              </div>

              <div className="mb-4">
                <div className="text-sm font-semibold mb-2">Rules</div>
                <ul className="space-y-1">
                  {contest.rules.map((rule, i) => (
                    <li key={i} className="text-sm text-gray-400">• {rule}</li>
                  ))}
                </ul>
              </div>

              <div className="flex items-center space-x-3">
                {contest.status === 'active' && (
                  <>
                    <button className="px-6 py-2 bg-purple-600/30 hover:bg-purple-600/50 rounded-lg transition-colors">
                      👥 View Entries
                    </button>
                    <button className="px-6 py-2 bg-green-600/30 hover:bg-green-600/50 rounded-lg transition-colors">
                      🏆 Pick Winner
                    </button>
                    <button className="px-6 py-2 bg-blue-600/30 hover:bg-blue-600/50 rounded-lg transition-colors">
                      📊 Analytics
                    </button>
                  </>
                )}
                {contest.status === 'draft' && (
                  <>
                    <button className="px-6 py-2 bg-green-600 hover:bg-green-700 rounded-lg font-semibold transition-colors">
                      🚀 Launch Contest
                    </button>
                    <button className="px-6 py-2 bg-blue-600/30 hover:bg-blue-600/50 rounded-lg transition-colors">
                      ✏️ Edit
                    </button>
                  </>
                )}
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
            <h2 className="text-3xl font-bold mb-6">Create New Contest</h2>
            <div className="space-y-4">
              <input
                type="text"
                placeholder="Contest name..."
                className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl focus:outline-none focus:border-purple-500/50"
              />
              <select className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl focus:outline-none focus:border-purple-500/50">
                <option>Contest Type</option>
                <option>🎁 Giveaway</option>
                <option>📸 Photo Contest</option>
                <option>🎬 Video Contest</option>
                <option>✍️ Caption Contest</option>
              </select>
              <input
                type="text"
                placeholder="Prize description..."
                className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl focus:outline-none focus:border-purple-500/50"
              />
              <div className="grid grid-cols-2 gap-4">
                <input
                  type="date"
                  className="px-4 py-3 bg-white/5 border border-white/10 rounded-xl focus:outline-none focus:border-purple-500/50"
                />
                <input
                  type="date"
                  className="px-4 py-3 bg-white/5 border border-white/10 rounded-xl focus:outline-none focus:border-purple-500/50"
                />
              </div>
              <div className="flex space-x-4">
                <button className="flex-1 px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl font-bold">
                  Create Contest
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

