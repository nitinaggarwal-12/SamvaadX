'use client';

import { useState } from 'react';
import Link from 'next/link';

interface BrandMention {
  id: string;
  platform: string;
  author: string;
  content: string;
  sentiment: 'positive' | 'neutral' | 'negative';
  reach: number;
  engagement: number;
  timestamp: string;
  keywords: string[];
  priority: 'low' | 'medium' | 'high' | 'critical';
}

export default function BrandMonitoring() {
  const [mentions] = useState<BrandMention[]>([
    {
      id: '1',
      platform: 'Twitter/X',
      author: '@news_network',
      content: '@ParliamentIndia announces historic CSPOC 2026 with 56 Commonwealth nations. A milestone for global democracy! 🌍 #CSPOC2026',
      sentiment: 'positive',
      reach: 245000,
      engagement: 3420,
      timestamp: '5 minutes ago',
      keywords: ['CSPOC2026', 'Parliament', 'democracy'],
      priority: 'high',
    },
    {
      id: '2',
      platform: 'Facebook',
      author: 'Political Observer',
      content: 'Concerns about accessibility for disabled delegates at CSPOC 2026. @ParliamentIndia needs to address this.',
      sentiment: 'negative',
      reach: 12000,
      engagement: 234,
      timestamp: '15 minutes ago',
      keywords: ['CSPOC2026', 'accessibility', 'Parliament'],
      priority: 'critical',
    },
    {
      id: '3',
      platform: 'LinkedIn',
      author: 'Dr. Sharma',
      content: 'Excited to attend CSPOC 2026. Great initiative by Parliament of India to foster Commonwealth cooperation.',
      sentiment: 'positive',
      reach: 8500,
      engagement: 156,
      timestamp: '1 hour ago',
      keywords: ['CSPOC2026', 'Parliament'],
      priority: 'medium',
    },
  ]);

  const [alerts] = useState([
    { id: '1', type: 'spike', message: 'Mention volume increased by 340% in last hour', severity: 'high' },
    { id: '2', type: 'negative', message: 'Negative sentiment detected: accessibility concerns', severity: 'critical' },
    { id: '3', type: 'viral', message: 'Post about CSPOC going viral - 1.2M impressions', severity: 'high' },
  ]);

  const sentimentStats = {
    positive: mentions.filter(m => m.sentiment === 'positive').length,
    neutral: mentions.filter(m => m.sentiment === 'neutral').length,
    negative: mentions.filter(m => m.sentiment === 'negative').length,
  };

  const totalReach = mentions.reduce((sum, m) => sum + m.reach, 0);

  const getSentimentColor = (sentiment: string) => {
    switch (sentiment) {
      case 'positive': return 'bg-green-600/30 text-green-400';
      case 'negative': return 'bg-red-600/30 text-red-400';
      default: return 'bg-gray-600/30 text-gray-400';
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'critical': return 'bg-red-600 text-white animate-pulse';
      case 'high': return 'bg-orange-600/50 text-white';
      case 'medium': return 'bg-yellow-600/50 text-white';
      default: return 'bg-gray-600/50 text-white';
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
              <Link href="/listening" className="px-4 py-2 hover:bg-white/10 rounded-lg">Social Listening</Link>
              <Link href="/brand-monitor" className="px-4 py-2 bg-white/10 rounded-lg font-semibold">Brand Monitor</Link>
            </div>
          </div>
        </div>
      </nav>

      <div className="container mx-auto px-6 py-8">
        <div className="mb-8">
          <h1 className="text-5xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent mb-4">
            Brand Monitoring & Alerts
          </h1>
          <p className="text-xl text-gray-400">Real-time brand mention tracking and sentiment analysis</p>
        </div>

        {alerts.length > 0 && (
          <div className="mb-8 space-y-3">
            {alerts.map(alert => (
              <div key={alert.id} className={`p-4 rounded-2xl border-2 ${
                alert.severity === 'critical' ? 'bg-red-600/20 border-red-500 animate-pulse' :
                'bg-yellow-600/20 border-yellow-500'
              }`}>
                <div className="flex items-center space-x-3">
                  <span className="text-2xl">⚠️</span>
                  <div className="flex-1">
                    <div className="font-bold">{alert.message}</div>
                    <div className="text-xs text-gray-400 capitalize">{alert.type} alert • {alert.severity} priority</div>
                  </div>
                  <button className="px-4 py-2 bg-white/20 hover:bg-white/30 rounded-lg transition-colors">
                    View
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}

        <div className="grid grid-cols-4 gap-6 mb-8">
          <div className="p-6 bg-white/5 backdrop-blur-lg rounded-2xl border border-white/10">
            <div className="text-sm text-gray-400 mb-2">Total Mentions</div>
            <div className="text-3xl font-bold text-blue-400">{mentions.length}</div>
          </div>
          <div className="p-6 bg-white/5 backdrop-blur-lg rounded-2xl border border-white/10">
            <div className="text-sm text-gray-400 mb-2">Total Reach</div>
            <div className="text-3xl font-bold text-purple-400">{(totalReach / 1000).toFixed(0)}K</div>
          </div>
          <div className="p-6 bg-white/5 backdrop-blur-lg rounded-2xl border border-white/10">
            <div className="text-sm text-gray-400 mb-2">Positive</div>
            <div className="text-3xl font-bold text-green-400">{sentimentStats.positive}</div>
          </div>
          <div className="p-6 bg-white/5 backdrop-blur-lg rounded-2xl border border-white/10">
            <div className="text-sm text-gray-400 mb-2">Negative</div>
            <div className="text-3xl font-bold text-red-400">{sentimentStats.negative}</div>
          </div>
        </div>

        <div className="space-y-4">
          {mentions.map(mention => (
            <div key={mention.id} className="p-6 bg-white/5 backdrop-blur-lg rounded-2xl border border-white/10">
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center space-x-3">
                  <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
                    {mention.platform === 'Twitter/X' && '🐦'}
                    {mention.platform === 'Facebook' && '👥'}
                    {mention.platform === 'LinkedIn' && '💼'}
                  </div>
                  <div>
                    <div className="font-bold">{mention.author}</div>
                    <div className="text-xs text-gray-400">{mention.platform} • {mention.timestamp}</div>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <span className={`text-xs px-3 py-1 rounded-full ${getPriorityColor(mention.priority)}`}>
                    {mention.priority.toUpperCase()}
                  </span>
                  <span className={`text-xs px-3 py-1 rounded-full ${getSentimentColor(mention.sentiment)}`}>
                    {mention.sentiment.toUpperCase()}
                  </span>
                </div>
              </div>

              <p className="mb-4">{mention.content}</p>

              <div className="flex flex-wrap gap-2 mb-4">
                {mention.keywords.map((keyword, i) => (
                  <span key={i} className="text-xs px-3 py-1 bg-purple-600/30 rounded-full">
                    #{keyword}
                  </span>
                ))}
              </div>

              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center space-x-6 text-sm text-gray-400">
                  <div>👁️ {mention.reach.toLocaleString()} reach</div>
                  <div>💬 {mention.engagement} engagements</div>
                </div>
              </div>

              <div className="flex items-center space-x-3">
                <button className="px-4 py-2 bg-blue-600/30 hover:bg-blue-600/50 rounded-lg transition-colors text-sm">
                  💬 Respond
                </button>
                <button className="px-4 py-2 bg-purple-600/30 hover:bg-purple-600/50 rounded-lg transition-colors text-sm">
                  🔔 Set Alert
                </button>
                <button className="px-4 py-2 bg-green-600/30 hover:bg-green-600/50 rounded-lg transition-colors text-sm">
                  📊 Analyze
                </button>
                <button className="px-4 py-2 bg-white/10 hover:bg-white/20 rounded-lg transition-colors text-sm">
                  🗑️ Archive
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

