'use client';

import { useState } from 'react';
import Link from 'next/link';

interface UGCItem {
  id: string;
  author: string;
  authorHandle: string;
  platform: string;
  content: string;
  image?: string;
  likes: number;
  shares: number;
  sentiment: 'positive' | 'neutral' | 'negative';
  timestamp: string;
  approved: boolean;
  featured: boolean;
}

export default function UGCCurator() {
  const [filter, setFilter] = useState<'all' | 'pending' | 'approved' | 'featured'>('all');
  const [ugcItems] = useState<UGCItem[]>([
    {
      id: '1',
      author: 'Dr. Mehra',
      authorHandle: '@drmehra',
      platform: 'Twitter',
      content: 'So excited for #CSPOC2026! This will be a landmark event for Commonwealth parliaments. 🏛️',
      likes: 342,
      shares: 89,
      sentiment: 'positive',
      timestamp: '2 hours ago',
      approved: true,
      featured: true,
    },
    {
      id: '2',
      author: 'Parliament Watcher',
      authorHandle: '@parlwatch',
      platform: 'LinkedIn',
      content: 'Looking forward to the innovations and discussions at CSPOC 2026. India is setting the bar high! 🇮🇳',
      likes: 521,
      shares: 143,
      sentiment: 'positive',
      timestamp: '5 hours ago',
      approved: true,
      featured: false,
    },
    {
      id: '3',
      author: 'Global Affairs',
      authorHandle: '@globalaffairs',
      platform: 'Facebook',
      content: 'Can\'t wait to see the agenda for CSPOC 2026. Hoping for strong sessions on digital democracy.',
      likes: 234,
      shares: 67,
      sentiment: 'positive',
      timestamp: '8 hours ago',
      approved: false,
      featured: false,
    },
    {
      id: '4',
      author: 'Media Observer',
      authorHandle: '@mediaobs',
      platform: 'Instagram',
      content: 'The buzz around #CSPOC2026 is amazing! This is going to be historic. 📸',
      likes: 789,
      shares: 234,
      sentiment: 'positive',
      timestamp: '1 day ago',
      approved: true,
      featured: false,
    },
  ]);

  const filteredItems = ugcItems.filter(item => {
    if (filter === 'pending') return !item.approved;
    if (filter === 'approved') return item.approved;
    if (filter === 'featured') return item.featured;
    return true;
  });

  const stats = {
    total: ugcItems.length,
    pending: ugcItems.filter(i => !i.approved).length,
    approved: ugcItems.filter(i => i.approved).length,
    featured: ugcItems.filter(i => i.featured).length,
  };

  const getSentimentColor = (sentiment: string) => {
    switch (sentiment) {
      case 'positive': return 'text-green-400 bg-green-600/20';
      case 'neutral': return 'text-yellow-400 bg-yellow-600/20';
      case 'negative': return 'text-red-400 bg-red-600/20';
    }
  };

  const getPlatformIcon = (platform: string) => {
    switch (platform) {
      case 'Twitter': return '𝕏';
      case 'Facebook': return '📘';
      case 'LinkedIn': return '💼';
      case 'Instagram': return '📸';
      default: return '📱';
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
              <Link href="/ugc" className="px-4 py-2 bg-white/10 rounded-lg font-semibold">UGC Curator</Link>
            </div>
          </div>
        </div>
      </nav>

      <div className="container mx-auto px-6 py-8">
        <div className="mb-8">
          <h1 className="text-5xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent mb-4">
            User-Generated Content Curator
          </h1>
          <p className="text-xl text-gray-400">Discover, moderate, and showcase authentic voices</p>
        </div>

        <div className="grid grid-cols-4 gap-6 mb-8">
          <div className="p-6 bg-white/5 backdrop-blur-lg rounded-2xl border border-white/10">
            <div className="text-sm text-gray-400 mb-2">Total UGC</div>
            <div className="text-3xl font-bold text-blue-400">{stats.total}</div>
          </div>
          <div className="p-6 bg-white/5 backdrop-blur-lg rounded-2xl border border-white/10">
            <div className="text-sm text-gray-400 mb-2">Pending Review</div>
            <div className="text-3xl font-bold text-yellow-400">{stats.pending}</div>
          </div>
          <div className="p-6 bg-white/5 backdrop-blur-lg rounded-2xl border border-white/10">
            <div className="text-sm text-gray-400 mb-2">Approved</div>
            <div className="text-3xl font-bold text-green-400">{stats.approved}</div>
          </div>
          <div className="p-6 bg-white/5 backdrop-blur-lg rounded-2xl border border-white/10">
            <div className="text-sm text-gray-400 mb-2">Featured</div>
            <div className="text-3xl font-bold text-purple-400">{stats.featured}</div>
          </div>
        </div>

        <div className="mb-6 flex items-center space-x-3">
          <button
            onClick={() => setFilter('all')}
            className={`px-4 py-2 rounded-lg ${filter === 'all' ? 'bg-blue-600' : 'bg-white/5'}`}
          >
            All ({stats.total})
          </button>
          <button
            onClick={() => setFilter('pending')}
            className={`px-4 py-2 rounded-lg ${filter === 'pending' ? 'bg-yellow-600' : 'bg-white/5'}`}
          >
            Pending ({stats.pending})
          </button>
          <button
            onClick={() => setFilter('approved')}
            className={`px-4 py-2 rounded-lg ${filter === 'approved' ? 'bg-green-600' : 'bg-white/5'}`}
          >
            Approved ({stats.approved})
          </button>
          <button
            onClick={() => setFilter('featured')}
            className={`px-4 py-2 rounded-lg ${filter === 'featured' ? 'bg-purple-600' : 'bg-white/5'}`}
          >
            Featured ({stats.featured})
          </button>
        </div>

        <div className="grid lg:grid-cols-2 gap-6">
          {filteredItems.map(item => (
            <div key={item.id} className="p-6 bg-white/5 backdrop-blur-lg rounded-2xl border border-white/10">
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center space-x-3">
                  <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-2xl">
                    {getPlatformIcon(item.platform)}
                  </div>
                  <div>
                    <div className="font-bold">{item.author}</div>
                    <div className="text-sm text-gray-400">{item.authorHandle} · {item.timestamp}</div>
                  </div>
                </div>
                <div className={`px-3 py-1 rounded-full text-xs ${getSentimentColor(item.sentiment)}`}>
                  {item.sentiment.toUpperCase()}
                </div>
              </div>

              <p className="text-gray-300 mb-4">{item.content}</p>

              <div className="flex items-center justify-between mb-4 text-sm">
                <div className="flex space-x-4">
                  <span className="text-gray-400">❤️ {item.likes}</span>
                  <span className="text-gray-400">🔄 {item.shares}</span>
                </div>
                <span className="text-xs px-2 py-1 bg-blue-600/30 rounded">{item.platform}</span>
              </div>

              <div className="flex items-center space-x-2">
                {!item.approved && (
                  <button className="flex-1 px-4 py-2 bg-green-600 hover:bg-green-700 rounded-lg font-semibold">
                    ✅ Approve
                  </button>
                )}
                {item.approved && !item.featured && (
                  <button className="flex-1 px-4 py-2 bg-purple-600 hover:bg-purple-700 rounded-lg font-semibold">
                    ⭐ Feature
                  </button>
                )}
                {item.featured && (
                  <div className="flex-1 px-4 py-2 bg-purple-600/30 text-purple-400 rounded-lg font-semibold text-center">
                    ⭐ FEATURED
                  </div>
                )}
                <button className="px-4 py-2 bg-blue-600 hover:bg-blue-700 rounded-lg">
                  🔄 Repost
                </button>
                <button className="px-4 py-2 bg-red-600 hover:bg-red-700 rounded-lg">
                  🗑️
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

