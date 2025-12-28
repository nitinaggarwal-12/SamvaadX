'use client';

import { useState } from 'react';
import Link from 'next/link';

export default function AudienceInsights() {
  const demographics = {
    age: [
      { range: '18-24', percentage: 18, count: 45600 },
      { range: '25-34', percentage: 32, count: 81200 },
      { range: '35-44', percentage: 25, count: 63400 },
      { range: '45-54', percentage: 15, count: 38100 },
      { range: '55+', percentage: 10, count: 25400 },
    ],
    gender: [
      { type: 'Male', percentage: 58, count: 147200 },
      { type: 'Female', percentage: 40, count: 101600 },
      { type: 'Other', percentage: 2, count: 5080 },
    ],
    location: [
      { city: 'New Delhi', percentage: 28, count: 71120 },
      { city: 'Mumbai', percentage: 22, count: 55880 },
      { city: 'Bangalore', percentage: 18, count: 45720 },
      { city: 'Kolkata', percentage: 12, count: 30480 },
      { city: 'Others', percentage: 20, count: 50800 },
    ],
  };

  const interests = [
    { topic: 'Politics & Governance', engagement: 92, followers: 89000 },
    { topic: 'Democracy & Rights', engagement: 85, followers: 76000 },
    { topic: 'International Relations', engagement: 78, followers: 68000 },
    { topic: 'Public Policy', engagement: 72, followers: 61000 },
    { topic: 'Current Affairs', engagement: 88, followers: 82000 },
  ];

  const growthData = [
    { month: 'Jul', followers: 180000, growth: 5 },
    { month: 'Aug', followers: 195000, growth: 8 },
    { month: 'Sep', followers: 215000, growth: 10 },
    { month: 'Oct', followers: 235000, growth: 9 },
    { month: 'Nov', followers: 248000, growth: 6 },
    { month: 'Dec', followers: 267000, growth: 8 },
  ];

  const peakTimes = [
    { time: '9-10 AM', engagement: 85 },
    { time: '12-1 PM', engagement: 92 },
    { time: '6-7 PM', engagement: 88 },
    { time: '9-10 PM', engagement: 78 },
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
              <Link href="/analytics" className="px-4 py-2 hover:bg-white/10 rounded-lg">Analytics</Link>
              <Link href="/audience-insights" className="px-4 py-2 bg-white/10 rounded-lg font-semibold">Audience</Link>
            </div>
          </div>
        </div>
      </nav>

      <div className="container mx-auto px-6 py-8">
        <div className="mb-8">
          <h1 className="text-5xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent mb-4">
            Advanced Audience Insights
          </h1>
          <p className="text-xl text-gray-400">Deep demographic and behavioral analysis</p>
        </div>

        <div className="grid lg:grid-cols-3 gap-6 mb-8">
          <div className="bg-white/5 backdrop-blur-lg rounded-3xl border border-white/10 p-8">
            <h2 className="text-2xl font-bold mb-6">Age Distribution</h2>
            <div className="space-y-4">
              {demographics.age.map((item, i) => (
                <div key={i}>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm">{item.range}</span>
                    <span className="font-bold text-blue-400">{item.percentage}%</span>
                  </div>
                  <div className="h-2 bg-black/30 rounded-full overflow-hidden">
                    <div className="h-full bg-gradient-to-r from-blue-500 to-purple-500" style={{ width: `${item.percentage}%` }}></div>
                  </div>
                  <div className="text-xs text-gray-400 mt-1">{item.count.toLocaleString()} followers</div>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-white/5 backdrop-blur-lg rounded-3xl border border-white/10 p-8">
            <h2 className="text-2xl font-bold mb-6">Gender Split</h2>
            <div className="space-y-6">
              {demographics.gender.map((item, i) => (
                <div key={i} className="text-center">
                  <div className="text-5xl font-bold mb-2 bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                    {item.percentage}%
                  </div>
                  <div className="font-semibold mb-1">{item.type}</div>
                  <div className="text-sm text-gray-400">{item.count.toLocaleString()} followers</div>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-white/5 backdrop-blur-lg rounded-3xl border border-white/10 p-8">
            <h2 className="text-2xl font-bold mb-6">Top Locations</h2>
            <div className="space-y-4">
              {demographics.location.map((item, i) => (
                <div key={i}>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm">{item.city}</span>
                    <span className="font-bold text-purple-400">{item.percentage}%</span>
                  </div>
                  <div className="h-2 bg-black/30 rounded-full overflow-hidden">
                    <div className="h-full bg-gradient-to-r from-purple-500 to-pink-500" style={{ width: `${item.percentage}%` }}></div>
                  </div>
                  <div className="text-xs text-gray-400 mt-1">{item.count.toLocaleString()} followers</div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="grid lg:grid-cols-2 gap-6 mb-8">
          <div className="bg-white/5 backdrop-blur-lg rounded-3xl border border-white/10 p-8">
            <h2 className="text-2xl font-bold mb-6">Top Interests</h2>
            <div className="space-y-4">
              {interests.map((item, i) => (
                <div key={i} className="p-4 bg-white/5 rounded-xl">
                  <div className="flex items-center justify-between mb-3">
                    <div className="font-semibold">{item.topic}</div>
                    <div className="text-2xl font-bold text-green-400">{item.engagement}%</div>
                  </div>
                  <div className="text-sm text-gray-400">{item.followers.toLocaleString()} engaged followers</div>
                  <div className="h-2 bg-black/30 rounded-full overflow-hidden mt-2">
                    <div className="h-full bg-green-500" style={{ width: `${item.engagement}%` }}></div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-white/5 backdrop-blur-lg rounded-3xl border border-white/10 p-8">
            <h2 className="text-2xl font-bold mb-6">Follower Growth</h2>
            <div className="h-64 flex items-end space-x-4 mb-4">
              {growthData.map((data, i) => (
                <div key={i} className="flex-1 flex flex-col items-center">
                  <div className="text-xs text-green-400 mb-1">+{data.growth}%</div>
                  <div 
                    className="w-full bg-gradient-to-t from-blue-500 to-purple-500 rounded-t"
                    style={{ height: `${(data.followers / 3000)}px` }}
                  ></div>
                  <div className="text-xs text-gray-400 mt-2">{data.month}</div>
                  <div className="text-xs font-bold mt-1">{(data.followers / 1000).toFixed(0)}K</div>
                </div>
              ))}
            </div>
            <div className="text-center text-sm text-gray-400">6-month trend showing consistent growth</div>
          </div>
        </div>

        <div className="bg-white/5 backdrop-blur-lg rounded-3xl border border-white/10 p-8">
          <h2 className="text-2xl font-bold mb-6">Peak Engagement Times</h2>
          <div className="grid grid-cols-4 gap-4">
            {peakTimes.map((time, i) => (
              <div key={i} className="p-6 bg-gradient-to-br from-blue-900/30 to-purple-900/30 rounded-2xl text-center">
                <div className="text-3xl font-bold text-blue-400 mb-2">{time.engagement}%</div>
                <div className="font-semibold">{time.time}</div>
                <div className="text-xs text-gray-400 mt-2">High engagement window</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

