'use client';

import { useState } from 'react';
import Link from 'next/link';

interface HashtagSet {
  id: string;
  name: string;
  hashtags: string[];
  category: string;
  uses: number;
  performance: number;
}

export default function HashtagManager() {
  const [sets, setSets] = useState<HashtagSet[]>([
    {
      id: '1',
      name: 'CSPOC 2026 Main',
      hashtags: ['#CSPOC2026', '#Parliament', '#Commonwealth', '#India', '#NewDelhi'],
      category: 'Event',
      uses: 45,
      performance: 92,
    },
    {
      id: '2',
      name: 'Speakers & Guests',
      hashtags: ['#KeynoteSpeaker', '#Delegates', '#Leadership', '#GlobalLeaders'],
      category: 'People',
      uses: 28,
      performance: 87,
    },
    {
      id: '3',
      name: 'General Engagement',
      hashtags: ['#Politics', '#Democracy', '#Governance', '#Parliament', '#PublicService'],
      category: 'General',
      uses: 156,
      performance: 78,
    },
  ]);

  const [newSetName, setNewSetName] = useState('');
  const [newHashtags, setNewHashtags] = useState('');
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [trendingHashtags] = useState([
    { tag: '#CSPOC2026', posts: '12.5K', growth: '+45%' },
    { tag: '#Parliament', posts: '8.3K', growth: '+23%' },
    { tag: '#Democracy', posts: '156K', growth: '+12%' },
    { tag: '#Governance', posts: '45K', growth: '+8%' },
  ]);

  const handleCreate = () => {
    if (!newSetName || !newHashtags) {
      alert('Please fill in all fields');
      return;
    }

    const hashtags = newHashtags
      .split(',')
      .map(h => h.trim())
      .filter(h => h.startsWith('#') || h.length > 0)
      .map(h => h.startsWith('#') ? h : `#${h}`);

    const newSet: HashtagSet = {
      id: Date.now().toString(),
      name: newSetName,
      hashtags,
      category: 'Custom',
      uses: 0,
      performance: 0,
    };

    setSets(prev => [...prev, newSet]);
    setNewSetName('');
    setNewHashtags('');
    setShowCreateModal(false);
    alert('✅ Hashtag set created!');
  };

  const handleCopy = (hashtags: string[]) => {
    navigator.clipboard.writeText(hashtags.join(' '));
    alert('✅ Copied to clipboard!');
  };

  const handleDelete = (id: string) => {
    if (confirm('Delete this hashtag set?')) {
      setSets(prev => prev.filter(s => s.id !== id));
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
              <Link href="/dashboard" className="px-4 py-2 hover:bg-white/10 rounded-lg">Dashboard</Link>
              <Link href="/hashtags" className="px-4 py-2 bg-white/10 rounded-lg font-semibold">Hashtags</Link>
            </div>
          </div>
        </div>
      </nav>

      <div className="container mx-auto px-6 py-8">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-5xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent mb-4">
              Hashtag Manager
            </h1>
            <p className="text-xl text-gray-400">Organize and reuse hashtag collections</p>
          </div>
          <button
            onClick={() => setShowCreateModal(true)}
            className="px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl font-bold hover:shadow-lg transition-all"
          >
            + New Set
          </button>
        </div>

        <div className="grid lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 space-y-4">
            {sets.map(set => (
              <div key={set.id} className="p-6 bg-white/5 backdrop-blur-lg rounded-2xl border border-white/10">
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <h3 className="text-2xl font-bold mb-2">{set.name}</h3>
                    <span className="text-sm px-3 py-1 bg-purple-600/30 rounded-full">{set.category}</span>
                  </div>
                  <div className="text-right">
                    <div className="text-2xl font-bold text-green-400">{set.performance}%</div>
                    <div className="text-xs text-gray-400">Performance</div>
                  </div>
                </div>

                <div className="flex flex-wrap gap-2 mb-4">
                  {set.hashtags.map((tag, i) => (
                    <span key={i} className="px-3 py-1 bg-blue-600/30 rounded-full text-sm">
                      {tag}
                    </span>
                  ))}
                </div>

                <div className="flex items-center justify-between text-sm text-gray-400 mb-4">
                  <span>Used in {set.uses} posts</span>
                  <span>{set.hashtags.length} hashtags</span>
                </div>

                <div className="flex items-center space-x-2">
                  <button
                    onClick={() => handleCopy(set.hashtags)}
                    className="flex-1 px-4 py-2 bg-blue-600/30 hover:bg-blue-600/50 rounded-lg transition-colors"
                  >
                    📋 Copy
                  </button>
                  <button className="flex-1 px-4 py-2 bg-green-600/30 hover:bg-green-600/50 rounded-lg transition-colors">
                    ✏️ Edit
                  </button>
                  <button
                    onClick={() => handleDelete(set.id)}
                    className="px-4 py-2 bg-red-600/30 hover:bg-red-600/50 rounded-lg transition-colors"
                  >
                    🗑️
                  </button>
                </div>
              </div>
            ))}
          </div>

          <div className="space-y-6">
            <div className="bg-gradient-to-br from-blue-900/30 to-purple-900/30 backdrop-blur-lg rounded-3xl border border-white/10 p-6">
              <h3 className="text-xl font-bold mb-4">Trending Hashtags</h3>
              <div className="space-y-3">
                {trendingHashtags.map((trend, i) => (
                  <div key={i} className="p-3 bg-white/5 rounded-lg">
                    <div className="flex items-center justify-between mb-1">
                      <span className="font-semibold">{trend.tag}</span>
                      <span className="text-xs text-green-400">{trend.growth}</span>
                    </div>
                    <div className="text-sm text-gray-400">{trend.posts} posts</div>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-white/5 backdrop-blur-lg rounded-3xl border border-white/10 p-6">
              <h3 className="text-xl font-bold mb-4">Tips</h3>
              <div className="space-y-2 text-sm text-gray-400">
                <div>💡 Use 5-10 hashtags per post</div>
                <div>💡 Mix popular and niche tags</div>
                <div>💡 Create event-specific sets</div>
                <div>💡 Track performance over time</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {showCreateModal && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-6">
          <div className="bg-gradient-to-br from-slate-900 to-purple-900 rounded-3xl border border-white/20 p-8 max-w-2xl w-full">
            <h2 className="text-3xl font-bold mb-6">Create Hashtag Set</h2>
            <div className="space-y-4">
              <input
                type="text"
                value={newSetName}
                onChange={(e) => setNewSetName(e.target.value)}
                placeholder="Set name..."
                className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl focus:outline-none focus:border-purple-500/50"
              />
              <textarea
                value={newHashtags}
                onChange={(e) => setNewHashtags(e.target.value)}
                placeholder="Enter hashtags (comma separated)..."
                className="w-full h-32 px-4 py-3 bg-white/5 border border-white/10 rounded-xl focus:outline-none focus:border-purple-500/50 resize-none"
              />
              <div className="flex space-x-4">
                <button onClick={handleCreate} className="flex-1 px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl font-bold">
                  Create
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

