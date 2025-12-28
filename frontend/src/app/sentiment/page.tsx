'use client';

import { useState } from 'react';
import Link from 'next/link';

export default function SentimentAnalysis() {
  const sentimentData = {
    overall: 78, // Positive sentiment percentage
    positive: 234,
    neutral: 89,
    negative: 45,
    trend: '+12%',
  };

  const platformSentiment = [
    { platform: 'Facebook', positive: 85, neutral: 12, negative: 3, score: 91 },
    { platform: 'Twitter/X', positive: 68, neutral: 20, negative: 12, score: 78 },
    { platform: 'Instagram', positive: 92, neutral: 6, negative: 2, score: 95 },
    { platform: 'LinkedIn', positive: 76, neutral: 18, negative: 6, score: 85 },
  ];

  const topTopics = [
    { topic: 'CSPOC 2026 Event', sentiment: 88, mentions: 1245, trend: 'up' },
    { topic: 'Keynote Speakers', sentiment: 82, mentions: 892, trend: 'up' },
    { topic: 'Venue & Location', sentiment: 65, mentions: 456, trend: 'down' },
    { topic: 'Registration Process', sentiment: 58, mentions: 234, trend: 'down' },
  ];

  const timelineData = [
    { time: '00:00', positive: 45, negative: 12 },
    { time: '04:00', positive: 52, negative: 8 },
    { time: '08:00', positive: 78, negative: 15 },
    { time: '12:00', positive: 92, negative: 18 },
    { time: '16:00', positive: 85, negative: 22 },
    { time: '20:00', positive: 67, negative: 14 },
  ];

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
              <Link href="/brand-monitor" className="px-4 py-2 hover:bg-white/10 rounded-lg">Brand Monitor</Link>
              <Link href="/sentiment" className="px-4 py-2 bg-white/10 rounded-lg font-semibold">Sentiment</Link>
            </div>
          </div>
        </div>
      </nav>

      <div className="container mx-auto px-6 py-8">
        <div className="mb-8">
          <h1 className="text-5xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent mb-4">
            Sentiment Analysis
          </h1>
          <p className="text-xl text-gray-400">AI-powered emotion detection and trend analysis</p>
        </div>

        <div className="grid grid-cols-4 gap-6 mb-8">
          <div className="p-6 bg-gradient-to-br from-green-900/30 to-green-600/20 backdrop-blur-lg rounded-2xl border border-green-500/30">
            <div className="text-sm text-gray-300 mb-2">Overall Sentiment</div>
            <div className="text-4xl font-bold text-green-400 mb-1">{sentimentData.overall}%</div>
            <div className="text-xs text-green-400">▲ {sentimentData.trend} vs last week</div>
          </div>
          <div className="p-6 bg-white/5 backdrop-blur-lg rounded-2xl border border-white/10">
            <div className="text-sm text-gray-400 mb-2">Positive</div>
            <div className="text-3xl font-bold text-green-400">{sentimentData.positive}</div>
          </div>
          <div className="p-6 bg-white/5 backdrop-blur-lg rounded-2xl border border-white/10">
            <div className="text-sm text-gray-400 mb-2">Neutral</div>
            <div className="text-3xl font-bold text-gray-400">{sentimentData.neutral}</div>
          </div>
          <div className="p-6 bg-white/5 backdrop-blur-lg rounded-2xl border border-white/10">
            <div className="text-sm text-gray-400 mb-2">Negative</div>
            <div className="text-3xl font-bold text-red-400">{sentimentData.negative}</div>
          </div>
        </div>

        <div className="grid lg:grid-cols-2 gap-6 mb-8">
          <div className="bg-white/5 backdrop-blur-lg rounded-3xl border border-white/10 p-8">
            <h2 className="text-2xl font-bold mb-6">Sentiment by Platform</h2>
            <div className="space-y-4">
              {platformSentiment.map((item, i) => (
                <div key={i}>
                  <div className="flex items-center justify-between mb-2">
                    <div className="font-semibold">{item.platform}</div>
                    <div className="text-2xl font-bold text-green-400">{item.score}%</div>
                  </div>
                  <div className="h-3 bg-black/30 rounded-full overflow-hidden flex">
                    <div className="bg-green-500" style={{ width: `${item.positive}%` }}></div>
                    <div className="bg-gray-500" style={{ width: `${item.neutral}%` }}></div>
                    <div className="bg-red-500" style={{ width: `${item.negative}%` }}></div>
                  </div>
                  <div className="flex items-center justify-between mt-1 text-xs text-gray-400">
                    <span className="text-green-400">{item.positive}% positive</span>
                    <span>{item.neutral}% neutral</span>
                    <span className="text-red-400">{item.negative}% negative</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-white/5 backdrop-blur-lg rounded-3xl border border-white/10 p-8">
            <h2 className="text-2xl font-bold mb-6">Top Topics by Sentiment</h2>
            <div className="space-y-4">
              {topTopics.map((topic, i) => (
                <div key={i} className="p-4 bg-white/5 rounded-xl">
                  <div className="flex items-start justify-between mb-2">
                    <div>
                      <div className="font-semibold mb-1">{topic.topic}</div>
                      <div className="text-xs text-gray-400">{topic.mentions} mentions</div>
                    </div>
                    <div className="flex items-center space-x-2">
                      <div className={`text-2xl font-bold ${
                        topic.sentiment > 75 ? 'text-green-400' :
                        topic.sentiment > 50 ? 'text-yellow-400' : 'text-red-400'
                      }`}>
                        {topic.sentiment}%
                      </div>
                      <span className={topic.trend === 'up' ? 'text-green-400' : 'text-red-400'}>
                        {topic.trend === 'up' ? '▲' : '▼'}
                      </span>
                    </div>
                  </div>
                  <div className="h-2 bg-black/30 rounded-full overflow-hidden">
                    <div 
                      className={topic.sentiment > 75 ? 'bg-green-500' : topic.sentiment > 50 ? 'bg-yellow-500' : 'bg-red-500'}
                      style={{ width: `${topic.sentiment}%` }}
                    ></div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="bg-white/5 backdrop-blur-lg rounded-3xl border border-white/10 p-8">
          <h2 className="text-2xl font-bold mb-6">Sentiment Timeline (24 Hours)</h2>
          <div className="h-64 flex items-end space-x-4">
            {timelineData.map((data, i) => (
              <div key={i} className="flex-1 flex flex-col items-center">
                <div className="w-full flex flex-col items-center space-y-1 mb-2">
                  <div 
                    className="w-full bg-green-500 rounded-t"
                    style={{ height: `${data.positive * 2}px` }}
                  ></div>
                  <div 
                    className="w-full bg-red-500 rounded-b"
                    style={{ height: `${data.negative * 2}px` }}
                  ></div>
                </div>
                <div className="text-xs text-gray-400">{data.time}</div>
              </div>
            ))}
          </div>
          <div className="flex items-center justify-center space-x-6 mt-4 text-sm">
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 bg-green-500 rounded"></div>
              <span>Positive</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 bg-red-500 rounded"></div>
              <span>Negative</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

