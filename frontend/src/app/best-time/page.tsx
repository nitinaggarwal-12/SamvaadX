'use client';

import { useState } from 'react';
import Link from 'next/link';

export default function BestTimeToPost() {
  const platformData = [
    {
      platform: 'Facebook',
      icon: '👥',
      bestDays: ['Tuesday', 'Wednesday', 'Friday'],
      bestTimes: ['1-3 PM', '7-9 PM'],
      peakEngagement: '2:00 PM',
      avgEngagement: 5.8,
      recommendation: 'Post on weekdays during lunch and evening hours',
    },
    {
      platform: 'Twitter/X',
      icon: '🐦',
      bestDays: ['Monday', 'Wednesday', 'Friday'],
      bestTimes: ['9-11 AM', '6-8 PM'],
      peakEngagement: '9:30 AM',
      avgEngagement: 3.2,
      recommendation: 'Morning commute and evening hours see highest activity',
    },
    {
      platform: 'Instagram',
      icon: '📸',
      bestDays: ['Monday', 'Thursday', 'Friday'],
      bestTimes: ['11 AM-1 PM', '7-9 PM'],
      peakEngagement: '7:00 PM',
      avgEngagement: 7.4,
      recommendation: 'Evening posts perform best for visual content',
    },
    {
      platform: 'LinkedIn',
      icon: '💼',
      bestDays: ['Tuesday', 'Wednesday', 'Thursday'],
      bestTimes: ['8-10 AM', '12-1 PM'],
      peakEngagement: '8:30 AM',
      avgEngagement: 4.6,
      recommendation: 'Business hours, especially before meetings',
    },
  ];

  const weeklyHeatmap = {
    Monday: [3, 5, 7, 9, 8, 6, 4],
    Tuesday: [4, 6, 8, 10, 9, 7, 5],
    Wednesday: [4, 7, 9, 10, 9, 7, 5],
    Thursday: [3, 6, 8, 9, 8, 6, 4],
    Friday: [5, 7, 8, 9, 7, 5, 3],
    Saturday: [2, 3, 4, 5, 6, 5, 4],
    Sunday: [2, 3, 4, 5, 5, 4, 3],
  };

  const timeSlots = ['6-9 AM', '9-12 PM', '12-3 PM', '3-6 PM', '6-9 PM', '9-12 AM', '12-6 AM'];

  const getHeatColor = (value: number) => {
    if (value >= 9) return 'bg-green-600';
    if (value >= 7) return 'bg-green-500';
    if (value >= 5) return 'bg-yellow-500';
    if (value >= 3) return 'bg-orange-500';
    return 'bg-red-500';
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
              <Link href="/best-time" className="px-4 py-2 bg-white/10 rounded-lg font-semibold">Best Time AI</Link>
            </div>
          </div>
        </div>
      </nav>

      <div className="container mx-auto px-6 py-8">
        <div className="mb-8">
          <h1 className="text-5xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent mb-4">
            Best Time to Post AI
          </h1>
          <p className="text-xl text-gray-400">AI-powered optimal posting schedule based on your audience</p>
        </div>

        <div className="grid md:grid-cols-2 gap-6 mb-8">
          {platformData.map((data, i) => (
            <div key={i} className="bg-white/5 backdrop-blur-lg rounded-3xl border border-white/10 p-8">
              <div className="flex items-center space-x-3 mb-6">
                <div className="text-5xl">{data.icon}</div>
                <div>
                  <h3 className="text-2xl font-bold">{data.platform}</h3>
                  <div className="text-sm text-gray-400">{data.avgEngagement}% avg engagement</div>
                </div>
              </div>

              <div className="space-y-4 mb-6">
                <div>
                  <div className="text-sm text-gray-400 mb-2">Best Days</div>
                  <div className="flex flex-wrap gap-2">
                    {data.bestDays.map((day, j) => (
                      <span key={j} className="px-3 py-1 bg-green-600/30 rounded-full text-sm">
                        {day}
                      </span>
                    ))}
                  </div>
                </div>

                <div>
                  <div className="text-sm text-gray-400 mb-2">Best Times</div>
                  <div className="flex flex-wrap gap-2">
                    {data.bestTimes.map((time, j) => (
                      <span key={j} className="px-3 py-1 bg-blue-600/30 rounded-full text-sm">
                        {time}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="p-4 bg-gradient-to-r from-purple-900/30 to-blue-900/30 rounded-xl">
                  <div className="text-xs text-gray-400 mb-1">Peak Engagement</div>
                  <div className="text-3xl font-bold text-purple-400">{data.peakEngagement}</div>
                </div>
              </div>

              <div className="p-4 bg-blue-600/10 border border-blue-500/30 rounded-xl">
                <div className="text-sm">
                  💡 <strong>AI Recommendation:</strong> {data.recommendation}
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="bg-white/5 backdrop-blur-lg rounded-3xl border border-white/10 p-8">
          <h2 className="text-2xl font-bold mb-6">Weekly Engagement Heatmap</h2>
          <div className="overflow-x-auto">
            <div className="inline-block min-w-full">
              <div className="flex items-center space-x-2 mb-4">
                <div className="w-32"></div>
                {timeSlots.map((slot, i) => (
                  <div key={i} className="w-16 text-center text-xs text-gray-400">{slot}</div>
                ))}
              </div>
              {Object.entries(weeklyHeatmap).map(([day, values]) => (
                <div key={day} className="flex items-center space-x-2 mb-2">
                  <div className="w-32 text-sm font-semibold">{day}</div>
                  {values.map((value, i) => (
                    <div
                      key={i}
                      className={`w-16 h-12 ${getHeatColor(value)} rounded flex items-center justify-center text-sm font-bold cursor-pointer hover:scale-110 transition-transform`}
                      title={`${day} ${timeSlots[i]}: ${value}/10`}
                    >
                      {value}
                    </div>
                  ))}
                </div>
              ))}
              <div className="flex items-center justify-center space-x-4 mt-6 text-xs">
                <div className="flex items-center space-x-2">
                  <div className="w-4 h-4 bg-red-500 rounded"></div>
                  <span>Low</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-4 h-4 bg-yellow-500 rounded"></div>
                  <span>Medium</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-4 h-4 bg-green-500 rounded"></div>
                  <span>High</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

