'use client';

import { useState } from 'react';
import Link from 'next/link';

interface ScheduledPost {
  id: number;
  date: string;
  time: string;
  content: string;
  platforms: string[];
  status: 'scheduled' | 'published' | 'failed';
  campaign?: string;
}

export default function Calendar() {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [view, setView] = useState<'month' | 'week'>('month');
  const [showScheduleModal, setShowScheduleModal] = useState(false);

  const scheduledPosts: ScheduledPost[] = [
    {
      id: 1,
      date: '2025-12-28',
      time: '09:00',
      content: 'CSPOC 2026: Registration opens today!',
      platforms: ['Facebook', 'Twitter/X', 'LinkedIn'],
      status: 'scheduled',
      campaign: 'CSPOC 2026 Pre-Event',
    },
    {
      id: 2,
      date: '2025-12-28',
      time: '15:00',
      content: 'Meet our keynote speakers...',
      platforms: ['Instagram', 'LinkedIn'],
      status: 'scheduled',
      campaign: 'Speaker Spotlight',
    },
    {
      id: 3,
      date: '2025-12-29',
      time: '10:00',
      content: 'Behind the scenes: Venue preparations',
      platforms: ['Instagram', 'Facebook'],
      status: 'scheduled',
    },
    {
      id: 4,
      date: '2025-12-29',
      time: '18:00',
      content: 'Only 17 days until CSPOC 2026!',
      platforms: ['Twitter/X', 'Facebook', 'LinkedIn'],
      status: 'scheduled',
      campaign: 'CSPOC 2026 Pre-Event',
    },
    {
      id: 5,
      date: '2025-12-30',
      time: '09:00',
      content: 'Spotlight on Speaker: Hon. Member XYZ',
      platforms: ['LinkedIn', 'Twitter/X'],
      status: 'scheduled',
      campaign: 'Speaker Spotlight',
    },
  ];

  const getDaysInMonth = (date: Date) => {
    const year = date.getFullYear();
    const month = date.getMonth();
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const daysInMonth = lastDay.getDate();
    const startingDayOfWeek = firstDay.getDay();

    return { daysInMonth, startingDayOfWeek, year, month };
  };

  const { daysInMonth, startingDayOfWeek, year, month } = getDaysInMonth(selectedDate);

  const getPostsForDate = (day: number) => {
    const dateStr = `${year}-${String(month + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
    return scheduledPosts.filter(post => post.date === dateStr);
  };

  const monthNames = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

  const navigateMonth = (direction: number) => {
    const newDate = new Date(selectedDate);
    newDate.setMonth(newDate.getMonth() + direction);
    setSelectedDate(newDate);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 text-white">
      {/* Navigation */}
      <nav className="relative z-50 border-b border-white/10 backdrop-blur-lg">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <Link href="/" className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl flex items-center justify-center">
                <span className="text-xl">🏛️</span>
              </div>
              <div>
                <h1 className="text-xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                  Guddu-Project
                </h1>
              </div>
            </Link>

            <div className="flex items-center space-x-4">
              <Link href="/dashboard" className="px-4 py-2 hover:bg-white/10 rounded-lg transition-colors">Dashboard</Link>
              <Link href="/analytics" className="px-4 py-2 hover:bg-white/10 rounded-lg transition-colors">Analytics</Link>
              <Link href="/campaigns" className="px-4 py-2 hover:bg-white/10 rounded-lg transition-colors">Campaigns</Link>
              <Link href="/calendar" className="px-4 py-2 bg-white/10 rounded-lg font-semibold">Calendar</Link>
              <Link href="/connections" className="px-4 py-2 hover:bg-white/10 rounded-lg transition-colors">Connections</Link>
            </div>
          </div>
        </div>
      </nav>

      <div className="container mx-auto px-6 py-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-5xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent mb-4">
              Content Calendar
            </h1>
            <p className="text-xl text-gray-400">Schedule and manage your social media posts</p>
          </div>
          <button
            onClick={() => setShowScheduleModal(true)}
            className="px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl font-bold text-lg hover:shadow-lg hover:shadow-purple-500/50 transition-all transform hover:scale-105 flex items-center space-x-2"
          >
            <span className="text-2xl">📅</span>
            <span>Schedule Post</span>
          </button>
        </div>

        <div className="grid lg:grid-cols-4 gap-6">
          {/* Calendar */}
          <div className="lg:col-span-3">
            <div className="bg-white/5 backdrop-blur-lg rounded-3xl border border-white/10 p-6">
              {/* Calendar Header */}
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center space-x-4">
                  <button
                    onClick={() => navigateMonth(-1)}
                    className="p-2 hover:bg-white/10 rounded-lg transition-colors"
                  >
                    ←
                  </button>
                  <h2 className="text-3xl font-bold">
                    {monthNames[month]} {year}
                  </h2>
                  <button
                    onClick={() => navigateMonth(1)}
                    className="p-2 hover:bg-white/10 rounded-lg transition-colors"
                  >
                    →
                  </button>
                </div>

                <div className="flex items-center space-x-2 bg-white/5 rounded-lg p-1">
                  <button
                    onClick={() => setView('month')}
                    className={`px-4 py-2 rounded-lg transition-all ${
                      view === 'month' ? 'bg-purple-600' : 'hover:bg-white/10'
                    }`}
                  >
                    Month
                  </button>
                  <button
                    onClick={() => setView('week')}
                    className={`px-4 py-2 rounded-lg transition-all ${
                      view === 'week' ? 'bg-purple-600' : 'hover:bg-white/10'
                    }`}
                  >
                    Week
                  </button>
                </div>
              </div>

              {/* Calendar Grid */}
              <div className="grid grid-cols-7 gap-2">
                {/* Day Headers */}
                {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map((day) => (
                  <div key={day} className="text-center text-sm font-semibold text-gray-400 py-2">
                    {day}
                  </div>
                ))}

                {/* Empty cells for days before month starts */}
                {Array.from({ length: startingDayOfWeek }).map((_, i) => (
                  <div key={`empty-${i}`} className="aspect-square" />
                ))}

                {/* Calendar days */}
                {Array.from({ length: daysInMonth }).map((_, i) => {
                  const day = i + 1;
                  const posts = getPostsForDate(day);
                  const isToday = day === new Date().getDate() && month === new Date().getMonth() && year === new Date().getFullYear();

                  return (
                    <div
                      key={day}
                      className={`aspect-square p-2 rounded-xl border transition-all cursor-pointer ${
                        isToday
                          ? 'bg-purple-600/30 border-purple-500'
                          : 'bg-white/5 border-white/10 hover:bg-white/10 hover:border-purple-500/50'
                      }`}
                    >
                      <div className="flex flex-col h-full">
                        <div className={`text-sm font-semibold mb-1 ${isToday ? 'text-purple-400' : ''}`}>
                          {day}
                        </div>
                        <div className="flex-1 space-y-1 overflow-hidden">
                          {posts.slice(0, 3).map((post) => (
                            <div
                              key={post.id}
                              className="text-xs px-2 py-1 bg-blue-600/50 rounded truncate"
                              title={post.content}
                            >
                              {post.time} · {post.platforms[0]}
                            </div>
                          ))}
                          {posts.length > 3 && (
                            <div className="text-xs text-gray-400 px-2">
                              +{posts.length - 3} more
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Scheduled Today */}
            <div className="bg-gradient-to-br from-blue-900/30 to-purple-900/30 backdrop-blur-lg rounded-3xl border border-white/10 p-6">
              <h3 className="text-xl font-bold mb-4">Today's Schedule</h3>
              <div className="space-y-3">
                {scheduledPosts
                  .filter(post => post.date === new Date().toISOString().split('T')[0])
                  .slice(0, 3)
                  .map((post) => (
                    <div
                      key={post.id}
                      className="p-3 bg-white/5 border border-white/10 rounded-xl"
                    >
                      <div className="text-sm font-semibold mb-1">{post.time}</div>
                      <div className="text-xs text-gray-400 truncate">{post.content}</div>
                      <div className="flex items-center space-x-1 mt-2">
                        {post.platforms.map((p, i) => (
                          <span key={i} className="text-xs px-2 py-0.5 bg-white/10 rounded-full">
                            {p.split('/')[0]}
                          </span>
                        ))}
                      </div>
                    </div>
                  ))}
                {scheduledPosts.filter(post => post.date === new Date().toISOString().split('T')[0]).length === 0 && (
                  <div className="text-center text-gray-400 py-6">
                    <div className="text-4xl mb-2">📭</div>
                    <div className="text-sm">No posts scheduled today</div>
                  </div>
                )}
              </div>
            </div>

            {/* Quick Stats */}
            <div className="bg-white/5 backdrop-blur-lg rounded-3xl border border-white/10 p-6">
              <h3 className="text-xl font-bold mb-4">This Week</h3>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-gray-400">Scheduled</span>
                  <span className="text-2xl font-bold text-blue-400">24</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-400">Published</span>
                  <span className="text-2xl font-bold text-green-400">18</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-400">Drafts</span>
                  <span className="text-2xl font-bold text-yellow-400">6</span>
                </div>
              </div>
            </div>

            {/* Best Times */}
            <div className="bg-white/5 backdrop-blur-lg rounded-3xl border border-white/10 p-6">
              <h3 className="text-xl font-bold mb-4">Best Times to Post</h3>
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-sm">📘 Facebook</span>
                  <span className="text-sm text-purple-400">1-3 PM</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm">🐦 Twitter/X</span>
                  <span className="text-sm text-purple-400">9-11 AM</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm">📷 Instagram</span>
                  <span className="text-sm text-purple-400">11 AM-1 PM</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm">💼 LinkedIn</span>
                  <span className="text-sm text-purple-400">7-9 AM</span>
                </div>
              </div>
            </div>

            {/* Quick Actions */}
            <Link
              href="/dashboard"
              className="block p-6 bg-gradient-to-r from-purple-600/20 to-pink-600/20 border border-purple-500/30 rounded-3xl hover:scale-105 transition-transform text-center"
            >
              <div className="text-4xl mb-2">✍️</div>
              <div className="font-bold">Create Post</div>
              <div className="text-xs text-gray-400 mt-1">Quick publish now</div>
            </Link>
          </div>
        </div>

        {/* Upcoming Posts List */}
        <div className="mt-8 bg-white/5 backdrop-blur-lg rounded-3xl border border-white/10 p-8">
          <h2 className="text-2xl font-bold mb-6">Upcoming Posts</h2>
          <div className="space-y-3">
            {scheduledPosts.slice(0, 5).map((post) => (
              <div
                key={post.id}
                className="p-4 bg-white/5 border border-white/10 rounded-2xl hover:bg-white/10 transition-all flex items-center justify-between group"
              >
                <div className="flex-1">
                  <div className="flex items-center space-x-4 mb-2">
                    <span className="text-sm font-semibold text-purple-400">
                      {post.date} at {post.time}
                    </span>
                    {post.campaign && (
                      <span className="text-xs px-2 py-1 bg-blue-600/30 rounded-full">
                        {post.campaign}
                      </span>
                    )}
                  </div>
                  <p className="text-lg mb-2">{post.content}</p>
                  <div className="flex items-center space-x-2">
                    {post.platforms.map((platform, i) => (
                      <span key={i} className="text-xs px-3 py-1 bg-white/10 rounded-full">
                        {platform}
                      </span>
                    ))}
                  </div>
                </div>
                <div className="flex items-center space-x-2 opacity-0 group-hover:opacity-100 transition-opacity">
                  <button className="p-2 hover:bg-blue-600/30 rounded-lg transition-colors" title="Edit">
                    ✏️
                  </button>
                  <button className="p-2 hover:bg-red-600/30 rounded-lg transition-colors" title="Delete">
                    🗑️
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Schedule Modal Placeholder */}
      {showScheduleModal && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-6">
          <div className="bg-gradient-to-br from-slate-900 to-purple-900 rounded-3xl border border-white/20 p-8 max-w-2xl w-full">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-3xl font-bold">Schedule New Post</h2>
              <button
                onClick={() => setShowScheduleModal(false)}
                className="text-3xl hover:text-red-400 transition-colors"
              >
                ✕
              </button>
            </div>
            <div className="text-center py-12">
              <div className="text-6xl mb-4">📅</div>
              <p className="text-xl text-gray-400 mb-6">
                Schedule post feature coming soon!
              </p>
              <Link
                href="/dashboard"
                className="inline-block px-8 py-3 bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl font-bold hover:shadow-lg transition-all"
              >
                Create Post Now
              </Link>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

