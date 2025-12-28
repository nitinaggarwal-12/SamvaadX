'use client';

import { useState } from 'react';
import Link from 'next/link';

interface ScheduledPost {
  id: string;
  title: string;
  content: string;
  platforms: string[];
  scheduledTime: string;
  status: 'queued' | 'publishing' | 'published' | 'failed';
  priority: 'low' | 'normal' | 'high';
  author: string;
  category: string;
}

export default function ScheduleQueue() {
  const [posts] = useState<ScheduledPost[]>([
    {
      id: '1',
      title: 'CSPOC 2026 Week Countdown',
      content: '🗓️ Just 7 days until CSPOC 2026! Are you ready to witness history? #CSPOC2026',
      platforms: ['Twitter', 'Facebook', 'LinkedIn'],
      scheduledTime: '2024-12-27 09:00 AM',
      status: 'queued',
      priority: 'high',
      author: 'Dr. Sharma',
      category: 'Event',
    },
    {
      id: '2',
      title: 'Daily Parliamentary Fact',
      content: 'Did you know? The Commonwealth has 56 member nations representing 2.4 billion people! 🌍',
      platforms: ['Twitter', 'Instagram'],
      scheduledTime: '2024-12-27 02:00 PM',
      status: 'queued',
      priority: 'normal',
      author: 'Jane Smith',
      category: 'Education',
    },
    {
      id: '3',
      title: 'Evening Engagement Post',
      content: 'What aspect of parliamentary democracy interests you the most? Let us know in the comments! 💬',
      platforms: ['Facebook', 'LinkedIn'],
      scheduledTime: '2024-12-27 06:00 PM',
      status: 'queued',
      priority: 'normal',
      author: 'John Doe',
      category: 'Engagement',
    },
    {
      id: '4',
      title: 'Morning Greetings',
      content: 'Good morning! Start your day with inspiration from great parliamentary leaders. 🌅',
      platforms: ['Twitter', 'Facebook', 'Instagram', 'LinkedIn'],
      scheduledTime: '2024-12-27 07:00 AM',
      status: 'publishing',
      priority: 'low',
      author: 'Sarah Lee',
      category: 'General',
    },
    {
      id: '5',
      title: 'Yesterday Registration Reminder',
      content: 'Last 24 hours to register for CSPOC 2026! Don\'t miss this historic event. Register now! 🚀',
      platforms: ['Twitter', 'Facebook', 'LinkedIn'],
      scheduledTime: '2024-12-26 05:00 PM',
      status: 'published',
      priority: 'high',
      author: 'Dr. Sharma',
      category: 'Event',
    },
  ]);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'queued': return 'bg-blue-600/30 text-blue-400';
      case 'publishing': return 'bg-yellow-600/30 text-yellow-400';
      case 'published': return 'bg-green-600/30 text-green-400';
      case 'failed': return 'bg-red-600/30 text-red-400';
      default: return 'bg-gray-600/30 text-gray-400';
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'bg-red-600/30 text-red-400';
      case 'normal': return 'bg-blue-600/30 text-blue-400';
      case 'low': return 'bg-gray-600/30 text-gray-400';
      default: return 'bg-gray-600/30 text-gray-400';
    }
  };

  const stats = {
    queued: posts.filter(p => p.status === 'queued').length,
    publishing: posts.filter(p => p.status === 'publishing').length,
    published: posts.filter(p => p.status === 'published').length,
    failed: posts.filter(p => p.status === 'failed').length,
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
              <Link href="/schedule-queue" className="px-4 py-2 bg-white/10 rounded-lg font-semibold">Queue</Link>
            </div>
          </div>
        </div>
      </nav>

      <div className="container mx-auto px-6 py-8">
        <div className="mb-8">
          <h1 className="text-5xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent mb-4">
            Post Scheduling Queue
          </h1>
          <p className="text-xl text-gray-400">Monitor and manage your scheduled content pipeline</p>
        </div>

        <div className="grid grid-cols-4 gap-6 mb-8">
          <div className="p-6 bg-white/5 backdrop-blur-lg rounded-2xl border border-white/10">
            <div className="text-sm text-gray-400 mb-2">Queued</div>
            <div className="text-3xl font-bold text-blue-400">{stats.queued}</div>
          </div>
          <div className="p-6 bg-white/5 backdrop-blur-lg rounded-2xl border border-white/10">
            <div className="text-sm text-gray-400 mb-2">Publishing</div>
            <div className="text-3xl font-bold text-yellow-400">{stats.publishing}</div>
          </div>
          <div className="p-6 bg-white/5 backdrop-blur-lg rounded-2xl border border-white/10">
            <div className="text-sm text-gray-400 mb-2">Published</div>
            <div className="text-3xl font-bold text-green-400">{stats.published}</div>
          </div>
          <div className="p-6 bg-white/5 backdrop-blur-lg rounded-2xl border border-white/10">
            <div className="text-sm text-gray-400 mb-2">Failed</div>
            <div className="text-3xl font-bold text-red-400">{stats.failed}</div>
          </div>
        </div>

        {/* Timeline View */}
        <div className="mb-6 p-6 bg-white/5 backdrop-blur-lg rounded-2xl border border-white/10">
          <h3 className="text-xl font-bold mb-4">📅 Timeline View</h3>
          <div className="h-24 bg-black/30 rounded-lg flex items-center px-4">
            <div className="flex space-x-4 overflow-x-auto">
              {posts.filter(p => p.status === 'queued').map((post, idx) => (
                <div key={post.id} className="flex-shrink-0 w-16 h-16 bg-blue-600/30 rounded-lg flex items-center justify-center relative">
                  <span className="text-2xl">{idx + 1}</span>
                  <div className="absolute -bottom-6 text-xs text-gray-400 whitespace-nowrap">
                    {post.scheduledTime.split(' ')[1]}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="space-y-4">
          {posts.map((post, index) => (
            <div key={post.id} className="p-6 bg-white/5 backdrop-blur-lg rounded-2xl border border-white/10">
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-purple-600 rounded-full flex items-center justify-center font-bold">
                    #{index + 1}
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center space-x-3 mb-2">
                      <h3 className="text-xl font-bold">{post.title}</h3>
                      <span className={`px-3 py-1 rounded-full text-xs ${getStatusColor(post.status)}`}>
                        {post.status.toUpperCase()}
                      </span>
                      <span className={`px-3 py-1 rounded-full text-xs ${getPriorityColor(post.priority)}`}>
                        {post.priority.toUpperCase()}
                      </span>
                      <span className="text-xs px-2 py-1 bg-purple-600/30 rounded">{post.category}</span>
                    </div>
                    <p className="text-gray-400 mb-3">{post.content}</p>

                    <div className="grid md:grid-cols-2 gap-4 mb-3">
                      <div>
                        <div className="text-sm text-gray-400">Scheduled Time:</div>
                        <div className="font-bold text-lg">{post.scheduledTime}</div>
                      </div>
                      <div>
                        <div className="text-sm text-gray-400">Author:</div>
                        <div className="font-bold">{post.author}</div>
                      </div>
                    </div>

                    <div>
                      <div className="text-sm text-gray-400 mb-2">Platforms:</div>
                      <div className="flex flex-wrap gap-2">
                        {post.platforms.map(platform => (
                          <span key={platform} className="text-xs px-2 py-1 bg-blue-600/30 rounded">
                            {platform}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex space-x-2">
                {post.status === 'queued' && (
                  <>
                    <button className="px-4 py-2 bg-blue-600 hover:bg-blue-700 rounded-lg text-sm">
                      ✏️ Edit
                    </button>
                    <button className="px-4 py-2 bg-purple-600 hover:bg-purple-700 rounded-lg text-sm">
                      ⏰ Reschedule
                    </button>
                    <button className="px-4 py-2 bg-green-600 hover:bg-green-700 rounded-lg text-sm">
                      🚀 Publish Now
                    </button>
                    <button className="px-4 py-2 bg-red-600 hover:bg-red-700 rounded-lg text-sm">
                      🗑️ Cancel
                    </button>
                  </>
                )}
                {post.status === 'publishing' && (
                  <div className="px-4 py-2 bg-yellow-600/30 text-yellow-400 rounded-lg text-sm flex items-center space-x-2">
                    <div className="animate-spin">⏳</div>
                    <span>Publishing...</span>
                  </div>
                )}
                {post.status === 'published' && (
                  <button className="px-4 py-2 bg-purple-600 hover:bg-purple-700 rounded-lg text-sm">
                    📊 View Performance
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

