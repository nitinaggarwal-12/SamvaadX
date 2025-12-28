'use client';

import { useState } from 'react';
import Link from 'next/link';

interface ExpiringContent {
  id: string;
  postTitle: string;
  platform: string;
  publishedAt: string;
  expiresAt: string;
  daysRemaining: number;
  status: 'active' | 'expiring-soon' | 'expired';
  autoDelete: boolean;
  autoArchive: boolean;
}

export default function ContentExpiration() {
  const [contents] = useState<ExpiringContent[]>([
    {
      id: '1',
      postTitle: 'CSPOC 2026 Early Bird Registration',
      platform: 'Twitter',
      publishedAt: '2024-12-01',
      expiresAt: '2024-12-31',
      daysRemaining: 5,
      status: 'expiring-soon',
      autoDelete: false,
      autoArchive: true,
    },
    {
      id: '2',
      postTitle: 'Holiday Office Hours',
      platform: 'Facebook',
      publishedAt: '2024-12-15',
      expiresAt: '2024-12-26',
      daysRemaining: 0,
      status: 'expired',
      autoDelete: true,
      autoArchive: false,
    },
    {
      id: '3',
      postTitle: 'Q1 2025 Parliamentary Calendar',
      platform: 'LinkedIn',
      publishedAt: '2024-11-20',
      expiresAt: '2025-03-31',
      daysRemaining: 95,
      status: 'active',
      autoDelete: false,
      autoArchive: true,
    },
    {
      id: '4',
      postTitle: 'Limited Time: Youth Scholarship Applications',
      platform: 'Instagram',
      publishedAt: '2024-12-10',
      expiresAt: '2025-01-15',
      daysRemaining: 20,
      status: 'active',
      autoDelete: false,
      autoArchive: true,
    },
  ]);

  const [showAddForm, setShowAddForm] = useState(false);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-green-600/30 text-green-400';
      case 'expiring-soon': return 'bg-yellow-600/30 text-yellow-400';
      case 'expired': return 'bg-red-600/30 text-red-400';
      default: return 'bg-gray-600/30 text-gray-400';
    }
  };

  const stats = {
    total: contents.length,
    active: contents.filter(c => c.status === 'active').length,
    expiringSoon: contents.filter(c => c.status === 'expiring-soon').length,
    expired: contents.filter(c => c.status === 'expired').length,
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
              <Link href="/content-expiration" className="px-4 py-2 bg-white/10 rounded-lg font-semibold">Expiration</Link>
            </div>
          </div>
        </div>
      </nav>

      <div className="container mx-auto px-6 py-8">
        <div className="mb-8 flex items-center justify-between">
          <div>
            <h1 className="text-5xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent mb-4">
              Content Expiration Manager
            </h1>
            <p className="text-xl text-gray-400">Automatically manage time-sensitive content</p>
          </div>
          <button
            onClick={() => setShowAddForm(!showAddForm)}
            className="px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg font-semibold hover:shadow-lg"
          >
            ➕ Set Expiration
          </button>
        </div>

        <div className="grid grid-cols-4 gap-6 mb-8">
          <div className="p-6 bg-white/5 backdrop-blur-lg rounded-2xl border border-white/10">
            <div className="text-sm text-gray-400 mb-2">Total Posts</div>
            <div className="text-3xl font-bold text-blue-400">{stats.total}</div>
          </div>
          <div className="p-6 bg-white/5 backdrop-blur-lg rounded-2xl border border-white/10">
            <div className="text-sm text-gray-400 mb-2">Active</div>
            <div className="text-3xl font-bold text-green-400">{stats.active}</div>
          </div>
          <div className="p-6 bg-white/5 backdrop-blur-lg rounded-2xl border border-white/10">
            <div className="text-sm text-gray-400 mb-2">Expiring Soon</div>
            <div className="text-3xl font-bold text-yellow-400">{stats.expiringSoon}</div>
          </div>
          <div className="p-6 bg-white/5 backdrop-blur-lg rounded-2xl border border-white/10">
            <div className="text-sm text-gray-400 mb-2">Expired</div>
            <div className="text-3xl font-bold text-red-400">{stats.expired}</div>
          </div>
        </div>

        {showAddForm && (
          <div className="mb-8 p-6 bg-white/5 backdrop-blur-lg rounded-2xl border border-white/10">
            <h2 className="text-2xl font-bold mb-4">Set Content Expiration</h2>
            <div className="space-y-4">
              <div>
                <label className="block text-sm text-gray-400 mb-2">Select Post</label>
                <select className="w-full px-4 py-2 bg-black/30 border border-white/10 rounded-lg">
                  <option>CSPOC 2026 Main Announcement</option>
                  <option>Delegate Registration Notice</option>
                  <option>Event Schedule Preview</option>
                </select>
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm text-gray-400 mb-2">Published Date</label>
                  <input
                    type="date"
                    className="w-full px-4 py-2 bg-black/30 border border-white/10 rounded-lg"
                  />
                </div>
                <div>
                  <label className="block text-sm text-gray-400 mb-2">Expiration Date</label>
                  <input
                    type="date"
                    className="w-full px-4 py-2 bg-black/30 border border-white/10 rounded-lg"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="flex items-center space-x-2 cursor-pointer">
                  <input type="checkbox" />
                  <span>Auto-delete after expiration</span>
                </label>
                <label className="flex items-center space-x-2 cursor-pointer">
                  <input type="checkbox" defaultChecked />
                  <span>Auto-archive after expiration</span>
                </label>
                <label className="flex items-center space-x-2 cursor-pointer">
                  <input type="checkbox" defaultChecked />
                  <span>Send notification 7 days before expiration</span>
                </label>
              </div>

              <div className="flex space-x-3">
                <button className="px-6 py-2 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg font-semibold">
                  💾 Set Expiration
                </button>
                <button
                  onClick={() => setShowAddForm(false)}
                  className="px-6 py-2 bg-white/10 rounded-lg"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        )}

        <div className="space-y-4">
          {contents.map(content => (
            <div key={content.id} className="p-6 bg-white/5 backdrop-blur-lg rounded-2xl border border-white/10">
              <div className="flex items-start justify-between mb-4">
                <div className="flex-1">
                  <div className="flex items-center space-x-3 mb-2">
                    <h3 className="text-xl font-bold">{content.postTitle}</h3>
                    <span className={`px-3 py-1 rounded-full text-xs ${getStatusColor(content.status)}`}>
                      {content.status.toUpperCase().replace('-', ' ')}
                    </span>
                    <span className="text-xs px-2 py-1 bg-blue-600/30 rounded">{content.platform}</span>
                  </div>

                  <div className="grid md:grid-cols-3 gap-4 mb-4">
                    <div className="p-3 bg-black/30 rounded-lg">
                      <div className="text-xs text-gray-400 mb-1">Published</div>
                      <div className="font-bold">{content.publishedAt}</div>
                    </div>
                    <div className="p-3 bg-black/30 rounded-lg">
                      <div className="text-xs text-gray-400 mb-1">Expires</div>
                      <div className="font-bold">{content.expiresAt}</div>
                    </div>
                    <div className="p-3 bg-black/30 rounded-lg">
                      <div className="text-xs text-gray-400 mb-1">Days Remaining</div>
                      <div className={`font-bold text-2xl ${
                        content.daysRemaining === 0 ? 'text-red-400' :
                        content.daysRemaining < 7 ? 'text-yellow-400' :
                        'text-green-400'
                      }`}>
                        {content.daysRemaining === 0 ? 'EXPIRED' : content.daysRemaining}
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center space-x-4 text-sm mb-3">
                    <div className={`flex items-center space-x-2 ${content.autoDelete ? 'text-red-400' : 'text-gray-500'}`}>
                      <span>{content.autoDelete ? '✅' : '❌'}</span>
                      <span>Auto-delete</span>
                    </div>
                    <div className={`flex items-center space-x-2 ${content.autoArchive ? 'text-blue-400' : 'text-gray-500'}`}>
                      <span>{content.autoArchive ? '✅' : '❌'}</span>
                      <span>Auto-archive</span>
                    </div>
                  </div>

                  {content.status === 'expiring-soon' && (
                    <div className="p-3 bg-yellow-900/30 border border-yellow-500/50 rounded-lg text-sm">
                      ⚠️ <strong>Warning:</strong> This content will expire in {content.daysRemaining} days!
                    </div>
                  )}

                  {content.status === 'expired' && (
                    <div className="p-3 bg-red-900/30 border border-red-500/50 rounded-lg text-sm">
                      🚨 <strong>Expired:</strong> This content has reached its expiration date.
                    </div>
                  )}
                </div>
              </div>

              <div className="flex space-x-2">
                <button className="px-4 py-2 bg-blue-600 hover:bg-blue-700 rounded-lg text-sm">
                  ✏️ Edit Expiration
                </button>
                {content.status === 'active' && (
                  <button className="px-4 py-2 bg-green-600 hover:bg-green-700 rounded-lg text-sm">
                    ⏱️ Extend
                  </button>
                )}
                {content.status === 'expired' && (
                  <>
                    <button className="px-4 py-2 bg-purple-600 hover:bg-purple-700 rounded-lg text-sm">
                      📦 Archive Now
                    </button>
                    <button className="px-4 py-2 bg-red-600 hover:bg-red-700 rounded-lg text-sm">
                      🗑️ Delete Now
                    </button>
                  </>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

