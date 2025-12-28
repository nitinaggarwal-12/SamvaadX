'use client';

import { useState } from 'react';
import Link from 'next/link';

interface RecurringPost {
  id: string;
  title: string;
  content: string;
  frequency: 'daily' | 'weekly' | 'monthly';
  time: string;
  platforms: string[];
  active: boolean;
  nextPost: string;
  totalPosts: number;
}

export default function RecurringPosts() {
  const [posts, setPost] = useState<RecurringPost[]>([
    {
      id: '1',
      title: 'Daily Democracy Quote',
      content: 'Share inspiring quotes about democracy and governance #DemocracyMatters',
      frequency: 'daily',
      time: '9:00 AM',
      platforms: ['Twitter/X', 'LinkedIn'],
      active: true,
      nextPost: 'Tomorrow at 9:00 AM',
      totalPosts: 145,
    },
    {
      id: '2',
      title: 'Weekly Parliamentary Highlights',
      content: 'Recap of the week\'s key discussions and decisions #WeeklyWrap',
      frequency: 'weekly',
      time: 'Friday 5:00 PM',
      platforms: ['Facebook', 'Instagram', 'Twitter/X'],
      active: true,
      nextPost: 'Friday at 5:00 PM',
      totalPosts: 23,
    },
    {
      id: '3',
      title: 'Monthly Newsletter',
      content: 'Comprehensive monthly update for stakeholders #MonthlyUpdate',
      frequency: 'monthly',
      time: '1st of month, 10:00 AM',
      platforms: ['LinkedIn', 'Facebook'],
      active: true,
      nextPost: 'Jan 1 at 10:00 AM',
      totalPosts: 8,
    },
  ]);

  const [showCreateModal, setShowCreateModal] = useState(false);

  const getFrequencyColor = (freq: string) => {
    switch (freq) {
      case 'daily': return 'bg-green-600/30 text-green-400';
      case 'weekly': return 'bg-blue-600/30 text-blue-400';
      case 'monthly': return 'bg-purple-600/30 text-purple-400';
      default: return 'bg-gray-600/30 text-gray-400';
    }
  };

  const toggleActive = (id: string) => {
    setPost(prev => prev.map(p => 
      p.id === id ? { ...p, active: !p.active } : p
    ));
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
              <Link href="/calendar" className="px-4 py-2 hover:bg-white/10 rounded-lg">Calendar</Link>
              <Link href="/recurring-posts" className="px-4 py-2 bg-white/10 rounded-lg font-semibold">Recurring</Link>
            </div>
          </div>
        </div>
      </nav>

      <div className="container mx-auto px-6 py-8">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-5xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent mb-4">
              Recurring Posts Scheduler
            </h1>
            <p className="text-xl text-gray-400">Set it and forget it - automate your regular content</p>
          </div>
          <button
            onClick={() => setShowCreateModal(true)}
            className="px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl font-bold hover:shadow-lg transition-all"
          >
            + Create Recurring Post
          </button>
        </div>

        <div className="grid grid-cols-3 gap-6 mb-8">
          <div className="p-6 bg-white/5 backdrop-blur-lg rounded-2xl border border-white/10">
            <div className="text-sm text-gray-400 mb-2">Active Schedules</div>
            <div className="text-3xl font-bold text-green-400">{posts.filter(p => p.active).length}</div>
          </div>
          <div className="p-6 bg-white/5 backdrop-blur-lg rounded-2xl border border-white/10">
            <div className="text-sm text-gray-400 mb-2">Total Posts Published</div>
            <div className="text-3xl font-bold text-blue-400">{posts.reduce((sum, p) => sum + p.totalPosts, 0)}</div>
          </div>
          <div className="p-6 bg-white/5 backdrop-blur-lg rounded-2xl border border-white/10">
            <div className="text-sm text-gray-400 mb-2">Next Scheduled</div>
            <div className="text-lg font-bold text-purple-400">Tomorrow 9 AM</div>
          </div>
        </div>

        <div className="space-y-4">
          {posts.map(post => (
            <div key={post.id} className="p-6 bg-white/5 backdrop-blur-lg rounded-2xl border border-white/10">
              <div className="flex items-start justify-between mb-4">
                <div className="flex-1">
                  <div className="flex items-center space-x-3 mb-2">
                    <h3 className="text-2xl font-bold">{post.title}</h3>
                    <span className={`text-xs px-3 py-1 rounded-full ${getFrequencyColor(post.frequency)}`}>
                      {post.frequency.toUpperCase()}
                    </span>
                    <button
                      onClick={() => toggleActive(post.id)}
                      className={`px-3 py-1 rounded-full text-xs ${
                        post.active ? 'bg-green-600' : 'bg-gray-600'
                      }`}
                    >
                      {post.active ? '● ACTIVE' : '○ PAUSED'}
                    </button>
                  </div>
                  <p className="text-gray-400 mb-3">{post.content}</p>
                </div>
              </div>

              <div className="grid grid-cols-3 gap-4 mb-4">
                <div className="p-3 bg-black/30 rounded-lg">
                  <div className="text-xs text-gray-400 mb-1">Schedule</div>
                  <div className="font-bold">{post.time}</div>
                </div>
                <div className="p-3 bg-black/30 rounded-lg">
                  <div className="text-xs text-gray-400 mb-1">Next Post</div>
                  <div className="font-bold text-blue-400">{post.nextPost}</div>
                </div>
                <div className="p-3 bg-black/30 rounded-lg">
                  <div className="text-xs text-gray-400 mb-1">Posts Published</div>
                  <div className="font-bold text-green-400">{post.totalPosts}</div>
                </div>
              </div>

              <div className="mb-4">
                <div className="text-sm font-semibold mb-2">Platforms</div>
                <div className="flex flex-wrap gap-2">
                  {post.platforms.map((platform, i) => (
                    <span key={i} className="text-xs px-3 py-1 bg-purple-600/30 rounded-full">
                      {platform}
                    </span>
                  ))}
                </div>
              </div>

              <div className="flex items-center space-x-3">
                <button className="px-6 py-2 bg-blue-600/30 hover:bg-blue-600/50 rounded-lg transition-colors">
                  ✏️ Edit
                </button>
                <button className="px-6 py-2 bg-purple-600/30 hover:bg-purple-600/50 rounded-lg transition-colors">
                  📊 View History
                </button>
                <button className="px-6 py-2 bg-green-600/30 hover:bg-green-600/50 rounded-lg transition-colors">
                  🔄 Post Now
                </button>
                <button className="px-6 py-2 bg-white/10 hover:bg-white/20 rounded-lg transition-colors">
                  🗑️ Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {showCreateModal && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-6">
          <div className="bg-gradient-to-br from-slate-900 to-purple-900 rounded-3xl border border-white/20 p-8 max-w-2xl w-full">
            <h2 className="text-3xl font-bold mb-6">Create Recurring Post</h2>
            <div className="space-y-4">
              <input
                type="text"
                placeholder="Post title..."
                className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl focus:outline-none focus:border-purple-500/50"
              />
              <textarea
                placeholder="Post content..."
                className="w-full h-32 px-4 py-3 bg-white/5 border border-white/10 rounded-xl focus:outline-none focus:border-purple-500/50 resize-none"
              />
              <select className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl focus:outline-none focus:border-purple-500/50">
                <option>Daily</option>
                <option>Weekly</option>
                <option>Monthly</option>
              </select>
              <input
                type="time"
                className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl focus:outline-none focus:border-purple-500/50"
              />
              <div className="flex space-x-4">
                <button className="flex-1 px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl font-bold">
                  Create Schedule
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

