'use client';

import { useState } from 'react';
import Link from 'next/link';

interface LiveStream {
  id: string;
  title: string;
  platform: string[];
  status: 'upcoming' | 'live' | 'ended';
  startTime: string;
  duration: string;
  viewers: number;
  peakViewers: number;
  streamUrl: string;
  thumbnail: string;
}

export default function LiveStreaming() {
  const [streams] = useState<LiveStream[]>([
    {
      id: '1',
      title: 'CSPOC 2026 Opening Ceremony',
      platform: ['YouTube', 'Facebook'],
      status: 'live',
      startTime: '2026-01-14 10:00',
      duration: '2:34:15',
      viewers: 12450,
      peakViewers: 15890,
      streamUrl: 'https://youtube.com/watch?v=...',
      thumbnail: '/stream-thumb-1.jpg',
    },
    {
      id: '2',
      title: 'Day 1 Highlights & Analysis',
      platform: ['LinkedIn', 'YouTube'],
      status: 'upcoming',
      startTime: '2026-01-14 18:00',
      duration: '0:00:00',
      viewers: 0,
      peakViewers: 0,
      streamUrl: 'https://youtube.com/watch?v=...',
      thumbnail: '/stream-thumb-2.jpg',
    },
    {
      id: '3',
      title: 'Pre-Event Press Conference',
      platform: ['Facebook', 'Twitter/X'],
      status: 'ended',
      startTime: '2026-01-13 15:00',
      duration: '1:15:30',
      viewers: 0,
      peakViewers: 8920,
      streamUrl: 'https://facebook.com/watch?v=...',
      thumbnail: '/stream-thumb-3.jpg',
    },
  ]);

  const [showCreateModal, setShowCreateModal] = useState(false);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'live': return 'bg-red-600 text-white animate-pulse';
      case 'upcoming': return 'bg-blue-600/30 text-blue-400';
      case 'ended': return 'bg-gray-600/30 text-gray-400';
      default: return 'bg-white/10';
    }
  };

  const getPlatformIcon = (platform: string) => {
    switch (platform) {
      case 'YouTube': return '📺';
      case 'Facebook': return '👥';
      case 'LinkedIn': return '💼';
      case 'Twitter/X': return '🐦';
      default: return '🌐';
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
              <Link href="/live-stream" className="px-4 py-2 bg-white/10 rounded-lg font-semibold">Live Streams</Link>
            </div>
          </div>
        </div>
      </nav>

      <div className="container mx-auto px-6 py-8">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-5xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent mb-4">
              Live Streaming
            </h1>
            <p className="text-xl text-gray-400">Broadcast events across multiple platforms</p>
          </div>
          <button
            onClick={() => setShowCreateModal(true)}
            className="px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl font-bold hover:shadow-lg transition-all"
          >
            + Schedule Stream
          </button>
        </div>

        <div className="grid grid-cols-3 gap-6 mb-8">
          <div className="p-6 bg-white/5 backdrop-blur-lg rounded-2xl border border-white/10">
            <div className="text-sm text-gray-400 mb-2">Live Now</div>
            <div className="text-3xl font-bold text-red-400">{streams.filter(s => s.status === 'live').length}</div>
          </div>
          <div className="p-6 bg-white/5 backdrop-blur-lg rounded-2xl border border-white/10">
            <div className="text-sm text-gray-400 mb-2">Current Viewers</div>
            <div className="text-3xl font-bold text-green-400">
              {streams.filter(s => s.status === 'live').reduce((sum, s) => sum + s.viewers, 0).toLocaleString()}
            </div>
          </div>
          <div className="p-6 bg-white/5 backdrop-blur-lg rounded-2xl border border-white/10">
            <div className="text-sm text-gray-400 mb-2">Peak Viewers</div>
            <div className="text-3xl font-bold text-purple-400">
              {Math.max(...streams.map(s => s.peakViewers)).toLocaleString()}
            </div>
          </div>
        </div>

        <div className="space-y-4">
          {streams.map(stream => (
            <div key={stream.id} className="p-6 bg-white/5 backdrop-blur-lg rounded-2xl border border-white/10">
              <div className="grid md:grid-cols-5 gap-6">
                <div className="md:col-span-2">
                  <div className="aspect-video bg-gradient-to-br from-slate-800 to-purple-900 rounded-2xl flex items-center justify-center text-6xl relative overflow-hidden">
                    {stream.status === 'live' && (
                      <div className="absolute top-4 left-4 px-4 py-2 bg-red-600 rounded-lg font-bold flex items-center space-x-2">
                        <div className="w-3 h-3 bg-white rounded-full animate-pulse"></div>
                        <span>LIVE</span>
                      </div>
                    )}
                    📺
                  </div>
                </div>

                <div className="md:col-span-3">
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <div className="flex items-center space-x-3 mb-2">
                        <h3 className="text-2xl font-bold">{stream.title}</h3>
                        <span className={`text-xs px-3 py-1 rounded-full font-bold ${getStatusColor(stream.status)}`}>
                          {stream.status.toUpperCase()}
                        </span>
                      </div>
                      <div className="text-sm text-gray-400 mb-3">
                        📅 {stream.startTime} • ⏱️ {stream.duration}
                      </div>
                      <div className="flex items-center space-x-2 mb-4">
                        {stream.platform.map((p, i) => (
                          <span key={i} className="text-xs px-3 py-1 bg-purple-600/30 rounded-full">
                            {getPlatformIcon(p)} {p}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4 mb-4">
                    <div className="p-3 bg-black/30 rounded-lg">
                      <div className="text-xs text-gray-400 mb-1">Current Viewers</div>
                      <div className="text-2xl font-bold text-green-400">{stream.viewers.toLocaleString()}</div>
                    </div>
                    <div className="p-3 bg-black/30 rounded-lg">
                      <div className="text-xs text-gray-400 mb-1">Peak Viewers</div>
                      <div className="text-2xl font-bold text-purple-400">{stream.peakViewers.toLocaleString()}</div>
                    </div>
                  </div>

                  <div className="flex items-center space-x-3">
                    {stream.status === 'live' && (
                      <>
                        <button className="px-6 py-2 bg-red-600 hover:bg-red-700 rounded-lg font-semibold transition-colors">
                          🛑 End Stream
                        </button>
                        <button className="px-6 py-2 bg-blue-600/30 hover:bg-blue-600/50 rounded-lg transition-colors">
                          📊 View Analytics
                        </button>
                        <button className="px-6 py-2 bg-white/10 hover:bg-white/20 rounded-lg transition-colors">
                          🔗 Copy Link
                        </button>
                      </>
                    )}
                    {stream.status === 'upcoming' && (
                      <>
                        <button className="px-6 py-2 bg-green-600 hover:bg-green-700 rounded-lg font-semibold transition-colors">
                          🎥 Start Stream
                        </button>
                        <button className="px-6 py-2 bg-blue-600/30 hover:bg-blue-600/50 rounded-lg transition-colors">
                          ✏️ Edit
                        </button>
                        <button className="px-6 py-2 bg-white/10 hover:bg-white/20 rounded-lg transition-colors">
                          🗑️ Cancel
                        </button>
                      </>
                    )}
                    {stream.status === 'ended' && (
                      <>
                        <button className="px-6 py-2 bg-purple-600/30 hover:bg-purple-600/50 rounded-lg transition-colors">
                          📺 Watch Recording
                        </button>
                        <button className="px-6 py-2 bg-blue-600/30 hover:bg-blue-600/50 rounded-lg transition-colors">
                          📊 View Stats
                        </button>
                        <button className="px-6 py-2 bg-white/10 hover:bg-white/20 rounded-lg transition-colors">
                          📥 Download
                        </button>
                      </>
                    )}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {showCreateModal && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-6">
          <div className="bg-gradient-to-br from-slate-900 to-purple-900 rounded-3xl border border-white/20 p-8 max-w-2xl w-full">
            <h2 className="text-3xl font-bold mb-6">Schedule Live Stream</h2>
            <div className="space-y-4">
              <input
                type="text"
                placeholder="Stream title..."
                className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl focus:outline-none focus:border-purple-500/50"
              />
              <div>
                <label className="block text-sm font-semibold mb-2">Platforms</label>
                <div className="space-y-2">
                  {['YouTube', 'Facebook', 'LinkedIn', 'Twitter/X'].map((platform, i) => (
                    <label key={i} className="flex items-center space-x-2 cursor-pointer">
                      <input type="checkbox" className="w-4 h-4" />
                      <span>{getPlatformIcon(platform)} {platform}</span>
                    </label>
                  ))}
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <input
                  type="datetime-local"
                  className="px-4 py-3 bg-white/5 border border-white/10 rounded-xl focus:outline-none focus:border-purple-500/50"
                />
                <input
                  type="number"
                  placeholder="Expected duration (minutes)..."
                  className="px-4 py-3 bg-white/5 border border-white/10 rounded-xl focus:outline-none focus:border-purple-500/50"
                />
              </div>
              <div className="flex space-x-4">
                <button className="flex-1 px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl font-bold">
                  Schedule Stream
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

