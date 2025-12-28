'use client';

import { useState } from 'react';
import Link from 'next/link';

interface ListeningStream {
  id: string;
  name: string;
  type: 'keywords' | 'hashtags' | 'mentions' | 'competitors';
  query: string[];
  platforms: string[];
  active: boolean;
  matchCount: number;
}

interface StreamItem {
  id: string;
  streamId: string;
  platform: string;
  author: string;
  content: string;
  timestamp: string;
  sentiment: 'positive' | 'neutral' | 'negative';
  engagement: number;
}

export default function SocialListening() {
  const [streams] = useState<ListeningStream[]>([
    {
      id: '1',
      name: 'CSPOC 2026 Mentions',
      type: 'hashtags',
      query: ['#CSPOC2026', '#Parliament', '#Commonwealth'],
      platforms: ['Twitter/X', 'Facebook', 'Instagram'],
      active: true,
      matchCount: 4523,
    },
    {
      id: '2',
      name: 'Brand Mentions',
      type: 'mentions',
      query: ['@ParliamentIndia', '@CSPOC2026'],
      platforms: ['Twitter/X', 'LinkedIn'],
      active: true,
      matchCount: 892,
    },
    {
      id: '3',
      name: 'Competitor Watch',
      type: 'competitors',
      query: ['@UKParliament', '@AusParliament'],
      platforms: ['Twitter/X'],
      active: true,
      matchCount: 234,
    },
  ]);

  const [items] = useState<StreamItem[]>([
    {
      id: '1',
      streamId: '1',
      platform: 'Twitter/X',
      author: '@rajeshmehra',
      content: 'Excited for #CSPOC2026! Historic gathering of Commonwealth leaders in New Delhi. Democracy in action! 🏛️',
      timestamp: '2 minutes ago',
      sentiment: 'positive',
      engagement: 23,
    },
    {
      id: '2',
      streamId: '1',
      platform: 'Instagram',
      author: '@priya_sharma',
      content: 'The preparations for #CSPOC2026 look amazing! Can\'t wait for the opening ceremony.',
      timestamp: '15 minutes ago',
      sentiment: 'positive',
      engagement: 156,
    },
    {
      id: '3',
      streamId: '2',
      platform: 'Twitter/X',
      author: '@news_daily',
      content: '@ParliamentIndia When will the registration for CSPOC2026 close? Need clarification.',
      timestamp: '32 minutes ago',
      sentiment: 'neutral',
      engagement: 8,
    },
    {
      id: '4',
      streamId: '3',
      platform: 'Twitter/X',
      author: '@UKParliament',
      content: 'Speaker announces new digital initiatives for parliamentary transparency. Leading the way in democratic innovation.',
      timestamp: '1 hour ago',
      sentiment: 'positive',
      engagement: 445,
    },
  ]);

  const [selectedStream, setSelectedStream] = useState<string | null>(streams[0]?.id);

  const getSentimentColor = (sentiment: string) => {
    switch (sentiment) {
      case 'positive': return 'bg-green-600/30 text-green-400';
      case 'negative': return 'bg-red-600/30 text-red-400';
      default: return 'bg-gray-600/30 text-gray-400';
    }
  };

  const getSentimentIcon = (sentiment: string) => {
    switch (sentiment) {
      case 'positive': return '😊';
      case 'negative': return '😟';
      default: return '😐';
    }
  };

  const filteredItems = selectedStream 
    ? items.filter(i => i.streamId === selectedStream)
    : items;

  const sentimentCounts = {
    positive: items.filter(i => i.sentiment === 'positive').length,
    neutral: items.filter(i => i.sentiment === 'neutral').length,
    negative: items.filter(i => i.sentiment === 'negative').length,
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
              <Link href="/listening" className="px-4 py-2 bg-white/10 rounded-lg font-semibold">Listening</Link>
            </div>
          </div>
        </div>
      </nav>

      <div className="container mx-auto px-6 py-8">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-5xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent mb-4">
              Social Listening
            </h1>
            <p className="text-xl text-gray-400">Monitor conversations across social media</p>
          </div>
          <button className="px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl font-bold hover:shadow-lg transition-all">
            + New Stream
          </button>
        </div>

        <div className="grid grid-cols-4 gap-6 mb-8">
          <div className="p-6 bg-white/5 backdrop-blur-lg rounded-2xl border border-white/10">
            <div className="text-sm text-gray-400 mb-2">Active Streams</div>
            <div className="text-3xl font-bold text-blue-400">{streams.filter(s => s.active).length}</div>
          </div>
          <div className="p-6 bg-white/5 backdrop-blur-lg rounded-2xl border border-white/10">
            <div className="text-sm text-gray-400 mb-2">Total Matches</div>
            <div className="text-3xl font-bold text-purple-400">{streams.reduce((sum, s) => sum + s.matchCount, 0).toLocaleString()}</div>
          </div>
          <div className="p-6 bg-white/5 backdrop-blur-lg rounded-2xl border border-white/10">
            <div className="text-sm text-gray-400 mb-2">Positive</div>
            <div className="text-3xl font-bold text-green-400">{sentimentCounts.positive}</div>
          </div>
          <div className="p-6 bg-white/5 backdrop-blur-lg rounded-2xl border border-white/10">
            <div className="text-sm text-gray-400 mb-2">Negative</div>
            <div className="text-3xl font-bold text-red-400">{sentimentCounts.negative}</div>
          </div>
        </div>

        <div className="grid lg:grid-cols-4 gap-6">
          <div className="space-y-3">
            <h2 className="text-xl font-bold mb-4">Listening Streams</h2>
            {streams.map(stream => (
              <button
                key={stream.id}
                onClick={() => setSelectedStream(stream.id)}
                className={`w-full p-4 rounded-xl text-left transition-colors ${
                  selectedStream === stream.id
                    ? 'bg-purple-600'
                    : 'bg-white/5 hover:bg-white/10'
                }`}
              >
                <div className="font-bold mb-1">{stream.name}</div>
                <div className="text-xs text-gray-400 mb-2 capitalize">{stream.type}</div>
                <div className="text-sm font-bold text-blue-400">{stream.matchCount} matches</div>
              </button>
            ))}
          </div>

          <div className="lg:col-span-3">
            <div className="bg-white/5 backdrop-blur-lg rounded-3xl border border-white/10 p-6">
              <h2 className="text-2xl font-bold mb-6">
                {streams.find(s => s.id === selectedStream)?.name}
              </h2>

              <div className="space-y-4">
                {filteredItems.map(item => (
                  <div key={item.id} className="p-5 bg-white/5 rounded-2xl">
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex items-center space-x-3">
                        <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-xl">
                          {getSentimentIcon(item.sentiment)}
                        </div>
                        <div>
                          <div className="font-bold">{item.author}</div>
                          <div className="text-xs text-gray-400">{item.platform} • {item.timestamp}</div>
                        </div>
                      </div>
                      <span className={`text-xs px-3 py-1 rounded-full ${getSentimentColor(item.sentiment)}`}>
                        {item.sentiment.toUpperCase()}
                      </span>
                    </div>

                    <p className="mb-3">{item.content}</p>

                    <div className="flex items-center space-x-4 text-sm">
                      <div className="text-gray-400">
                        💬 {item.engagement} engagements
                      </div>
                      <button className="px-3 py-1 bg-blue-600/30 hover:bg-blue-600/50 rounded transition-colors">
                        Reply
                      </button>
                      <button className="px-3 py-1 bg-purple-600/30 hover:bg-purple-600/50 rounded transition-colors">
                        Create Post
                      </button>
                      <button className="px-3 py-1 bg-white/10 hover:bg-white/20 rounded transition-colors">
                        Archive
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

