'use client';

import { useState } from 'react';
import Link from 'next/link';

interface Competitor {
  id: string;
  name: string;
  handle: string;
  platform: string;
  followers: number;
  avgLikes: number;
  avgComments: number;
  postFrequency: string;
  lastPost: string;
}

interface CompetitorPost {
  id: string;
  competitorId: string;
  content: string;
  likes: number;
  comments: number;
  shares: number;
  engagement: number;
  timestamp: string;
  platform: string;
}

export default function CompetitorMonitor() {
  const [competitors] = useState<Competitor[]>([
    {
      id: '1',
      name: 'UK Parliament',
      handle: '@UKParliament',
      platform: 'Twitter/X',
      followers: 890000,
      avgLikes: 4200,
      avgComments: 320,
      postFrequency: '5-7 per day',
      lastPost: '2 hours ago',
    },
    {
      id: '2',
      name: 'Australian Parliament',
      handle: '@AusParliament',
      platform: 'Twitter/X',
      followers: 520000,
      avgLikes: 2100,
      avgComments: 180,
      postFrequency: '3-5 per day',
      lastPost: '4 hours ago',
    },
    {
      id: '3',
      name: 'Canadian Parliament',
      handle: '@OurCommons',
      platform: 'Twitter/X',
      followers: 380000,
      avgLikes: 1800,
      avgComments: 150,
      postFrequency: '4-6 per day',
      lastPost: '1 hour ago',
    },
  ]);

  const [recentPosts] = useState<CompetitorPost[]>([
    {
      id: '1',
      competitorId: '1',
      content: 'Speaker of the House addresses the Commons on upcoming legislative agenda. Historic session begins Monday. 🏛️ #Parliament #UKPolitics',
      likes: 5400,
      comments: 420,
      shares: 890,
      engagement: 6.8,
      timestamp: '2 hours ago',
      platform: 'Twitter/X',
    },
    {
      id: '2',
      competitorId: '3',
      content: 'Commemorating 150 years of parliamentary democracy in Canada. Join us for special ceremonies this week! 🇨🇦 #CDNPoli',
      likes: 3200,
      comments: 280,
      shares: 560,
      engagement: 7.2,
      timestamp: '1 hour ago',
      platform: 'Twitter/X',
    },
    {
      id: '3',
      competitorId: '2',
      content: 'Question Time highlights: Key discussions on climate policy and economic recovery. Watch full session: [link] 📺',
      likes: 2800,
      comments: 190,
      shares: 420,
      engagement: 5.9,
      timestamp: '4 hours ago',
      platform: 'Twitter/X',
    },
  ]);

  const [selectedCompetitor, setSelectedCompetitor] = useState<string | null>(null);

  const getCompetitorPosts = (competitorId: string) => {
    return recentPosts.filter(p => p.competitorId === competitorId);
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
              <Link href="/analytics" className="px-4 py-2 hover:bg-white/10 rounded-lg">Analytics</Link>
              <Link href="/competitors" className="px-4 py-2 bg-white/10 rounded-lg font-semibold">Competitors</Link>
            </div>
          </div>
        </div>
      </nav>

      <div className="container mx-auto px-6 py-8">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-5xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent mb-4">
              Competitor Monitor
            </h1>
            <p className="text-xl text-gray-400">Track and analyze competitor social media activity</p>
          </div>
          <button className="px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl font-bold hover:shadow-lg transition-all">
            + Add Competitor
          </button>
        </div>

        <div className="grid lg:grid-cols-3 gap-6 mb-8">
          {competitors.map(competitor => (
            <div key={competitor.id} className="p-6 bg-white/5 backdrop-blur-lg rounded-2xl border border-white/10">
              <div className="flex items-center space-x-3 mb-4">
                <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
                  🏛️
                </div>
                <div className="flex-1">
                  <h3 className="font-bold">{competitor.name}</h3>
                  <div className="text-sm text-gray-400">{competitor.handle}</div>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3 mb-4">
                <div className="p-3 bg-black/30 rounded-lg">
                  <div className="text-xl font-bold text-blue-400">{(competitor.followers / 1000).toFixed(0)}K</div>
                  <div className="text-xs text-gray-400">Followers</div>
                </div>
                <div className="p-3 bg-black/30 rounded-lg">
                  <div className="text-xl font-bold text-green-400">{(competitor.avgLikes / 1000).toFixed(1)}K</div>
                  <div className="text-xs text-gray-400">Avg Likes</div>
                </div>
              </div>

              <div className="space-y-2 text-sm mb-4">
                <div className="flex justify-between">
                  <span className="text-gray-400">Post Frequency</span>
                  <span>{competitor.postFrequency}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Last Post</span>
                  <span>{competitor.lastPost}</span>
                </div>
              </div>

              <button
                onClick={() => setSelectedCompetitor(competitor.id)}
                className="w-full px-4 py-2 bg-blue-600/30 hover:bg-blue-600/50 rounded-lg transition-colors"
              >
                View Activity
              </button>
            </div>
          ))}
        </div>

        <div className="bg-white/5 backdrop-blur-lg rounded-3xl border border-white/10 p-8">
          <h2 className="text-2xl font-bold mb-6">Recent Competitor Posts</h2>
          
          <div className="space-y-4">
            {recentPosts.map(post => {
              const competitor = competitors.find(c => c.id === post.competitorId);
              return (
                <div key={post.id} className="p-5 bg-white/5 rounded-2xl border border-white/10">
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-sm">
                        🏛️
                      </div>
                      <div>
                        <div className="font-bold">{competitor?.name}</div>
                        <div className="text-xs text-gray-400">{post.timestamp}</div>
                      </div>
                    </div>
                    <span className="text-xs px-2 py-1 bg-purple-600/30 rounded">{post.platform}</span>
                  </div>

                  <p className="mb-4">{post.content}</p>

                  <div className="flex items-center space-x-6 text-sm">
                    <div className="flex items-center space-x-2">
                      <span>👍</span>
                      <span>{post.likes.toLocaleString()}</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <span>💬</span>
                      <span>{post.comments}</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <span>🔄</span>
                      <span>{post.shares}</span>
                    </div>
                    <div className="ml-auto px-3 py-1 bg-green-600/30 rounded">
                      {post.engagement}% engagement
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {selectedCompetitor && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-6">
          <div className="bg-gradient-to-br from-slate-900 to-purple-900 rounded-3xl border border-white/20 p-8 max-w-4xl w-full max-h-[90vh] overflow-y-auto">
            <h2 className="text-3xl font-bold mb-6">
              {competitors.find(c => c.id === selectedCompetitor)?.name} Activity
            </h2>

            <div className="space-y-4">
              {getCompetitorPosts(selectedCompetitor).map(post => (
                <div key={post.id} className="p-4 bg-white/5 rounded-xl">
                  <p className="mb-3">{post.content}</p>
                  <div className="flex items-center space-x-4 text-sm text-gray-400">
                    <span>👍 {post.likes.toLocaleString()}</span>
                    <span>💬 {post.comments}</span>
                    <span>🔄 {post.shares}</span>
                    <span className="ml-auto">{post.timestamp}</span>
                  </div>
                </div>
              ))}
            </div>

            <button
              onClick={() => setSelectedCompetitor(null)}
              className="w-full mt-6 px-6 py-3 bg-white/5 hover:bg-white/10 rounded-xl transition-colors"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

