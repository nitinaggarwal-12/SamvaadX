'use client';

import { useState } from 'react';
import Link from 'next/link';

interface PressRelease {
  id: string;
  title: string;
  summary: string;
  content: string;
  status: 'draft' | 'scheduled' | 'published';
  publishDate: string;
  distributionList: string[];
  mediaContacts: number;
  views: number;
}

export default function PressReleaseDistribution() {
  const [releases, setReleases] = useState<PressRelease[]>([
    {
      id: '1',
      title: 'Parliament of India Announces CSPOC 2026',
      summary: 'Historic gathering of 56 Commonwealth nations scheduled for January 2026',
      content: 'Full press release content here...',
      status: 'published',
      publishDate: '2025-12-10',
      distributionList: ['National Media', 'International Wire', 'Digital Publications'],
      mediaContacts: 450,
      views: 12450,
    },
    {
      id: '2',
      title: 'CSPOC 2026: Keynote Speakers Announced',
      summary: 'Distinguished parliamentary leaders to address democracy and governance',
      content: 'Detailed speaker bios and schedule...',
      status: 'scheduled',
      publishDate: '2025-12-28',
      distributionList: ['Political Correspondents', 'News Agencies'],
      mediaContacts: 380,
      views: 0,
    },
    {
      id: '3',
      title: 'Registration Opens for Media Coverage',
      summary: 'Journalists invited to apply for CSPOC 2026 press credentials',
      content: 'Draft content in progress...',
      status: 'draft',
      publishDate: '2025-12-30',
      distributionList: [],
      mediaContacts: 0,
      views: 0,
    },
  ]);

  const [showCreateModal, setShowCreateModal] = useState(false);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'published': return 'bg-green-600/30 text-green-400';
      case 'scheduled': return 'bg-blue-600/30 text-blue-400';
      case 'draft': return 'bg-gray-600/30 text-gray-400';
      default: return 'bg-white/10';
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
              <Link href="/press-releases" className="px-4 py-2 bg-white/10 rounded-lg font-semibold">Press Releases</Link>
            </div>
          </div>
        </div>
      </nav>

      <div className="container mx-auto px-6 py-8">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-5xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent mb-4">
              Press Release Distribution
            </h1>
            <p className="text-xl text-gray-400">Distribute official announcements to media outlets</p>
          </div>
          <button
            onClick={() => setShowCreateModal(true)}
            className="px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl font-bold hover:shadow-lg transition-all"
          >
            + New Release
          </button>
        </div>

        <div className="grid grid-cols-4 gap-6 mb-8">
          <div className="p-6 bg-white/5 backdrop-blur-lg rounded-2xl border border-white/10">
            <div className="text-sm text-gray-400 mb-2">Published</div>
            <div className="text-3xl font-bold text-green-400">{releases.filter(r => r.status === 'published').length}</div>
          </div>
          <div className="p-6 bg-white/5 backdrop-blur-lg rounded-2xl border border-white/10">
            <div className="text-sm text-gray-400 mb-2">Scheduled</div>
            <div className="text-3xl font-bold text-blue-400">{releases.filter(r => r.status === 'scheduled').length}</div>
          </div>
          <div className="p-6 bg-white/5 backdrop-blur-lg rounded-2xl border border-white/10">
            <div className="text-sm text-gray-400 mb-2">Total Views</div>
            <div className="text-3xl font-bold text-purple-400">{releases.reduce((sum, r) => sum + r.views, 0).toLocaleString()}</div>
          </div>
          <div className="p-6 bg-white/5 backdrop-blur-lg rounded-2xl border border-white/10">
            <div className="text-sm text-gray-400 mb-2">Media Contacts</div>
            <div className="text-3xl font-bold text-yellow-400">682</div>
          </div>
        </div>

        <div className="space-y-4">
          {releases.map(release => (
            <div key={release.id} className="p-6 bg-white/5 backdrop-blur-lg rounded-2xl border border-white/10">
              <div className="flex items-start justify-between mb-4">
                <div className="flex-1">
                  <div className="flex items-center space-x-3 mb-2">
                    <h3 className="text-2xl font-bold">{release.title}</h3>
                    <span className={`text-xs px-3 py-1 rounded-full ${getStatusColor(release.status)}`}>
                      {release.status.toUpperCase()}
                    </span>
                  </div>
                  <p className="text-gray-400 mb-3">{release.summary}</p>
                  <div className="text-sm text-gray-400">
                    📅 {release.publishDate}
                  </div>
                </div>
              </div>

              {release.distributionList.length > 0 && (
                <div className="mb-4">
                  <div className="text-sm font-semibold mb-2">Distribution Lists</div>
                  <div className="flex flex-wrap gap-2">
                    {release.distributionList.map((list, i) => (
                      <span key={i} className="text-xs px-3 py-1 bg-purple-600/30 rounded-full">
                        {list}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              <div className="grid grid-cols-3 gap-4 mb-4">
                <div className="p-3 bg-black/30 rounded-lg">
                  <div className="text-xs text-gray-400 mb-1">Media Contacts</div>
                  <div className="text-xl font-bold">{release.mediaContacts}</div>
                </div>
                <div className="p-3 bg-black/30 rounded-lg">
                  <div className="text-xs text-gray-400 mb-1">Views</div>
                  <div className="text-xl font-bold text-blue-400">{release.views.toLocaleString()}</div>
                </div>
                <div className="p-3 bg-black/30 rounded-lg">
                  <div className="text-xs text-gray-400 mb-1">Engagement</div>
                  <div className="text-xl font-bold text-green-400">{release.views > 0 ? ((release.views / release.mediaContacts) * 100).toFixed(1) : 0}%</div>
                </div>
              </div>

              <div className="flex items-center space-x-3">
                {release.status === 'published' && (
                  <>
                    <button className="px-6 py-2 bg-purple-600/30 hover:bg-purple-600/50 rounded-lg transition-colors">
                      📊 View Analytics
                    </button>
                    <button className="px-6 py-2 bg-blue-600/30 hover:bg-blue-600/50 rounded-lg transition-colors">
                      📤 Resend
                    </button>
                  </>
                )}
                {release.status === 'scheduled' && (
                  <>
                    <button className="px-6 py-2 bg-green-600/30 hover:bg-green-600/50 rounded-lg transition-colors">
                      🚀 Publish Now
                    </button>
                    <button className="px-6 py-2 bg-blue-600/30 hover:bg-blue-600/50 rounded-lg transition-colors">
                      ✏️ Edit
                    </button>
                  </>
                )}
                {release.status === 'draft' && (
                  <>
                    <button className="px-6 py-2 bg-blue-600/30 hover:bg-blue-600/50 rounded-lg transition-colors">
                      ✏️ Continue Editing
                    </button>
                    <button className="px-6 py-2 bg-green-600 hover:bg-green-700 rounded-lg font-semibold transition-colors">
                      📤 Publish
                    </button>
                  </>
                )}
                <button className="px-6 py-2 bg-white/10 hover:bg-white/20 rounded-lg transition-colors">
                  📥 Export PDF
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {showCreateModal && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-6">
          <div className="bg-gradient-to-br from-slate-900 to-purple-900 rounded-3xl border border-white/20 p-8 max-w-4xl w-full max-h-[90vh] overflow-y-auto">
            <h2 className="text-3xl font-bold mb-6">New Press Release</h2>
            <div className="space-y-4">
              <input
                type="text"
                placeholder="Release title..."
                className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl focus:outline-none focus:border-purple-500/50"
              />
              <textarea
                placeholder="Summary (2-3 sentences)..."
                className="w-full h-24 px-4 py-3 bg-white/5 border border-white/10 rounded-xl focus:outline-none focus:border-purple-500/50 resize-none"
              />
              <textarea
                placeholder="Full content..."
                className="w-full h-48 px-4 py-3 bg-white/5 border border-white/10 rounded-xl focus:outline-none focus:border-purple-500/50 resize-none"
              />
              <input
                type="date"
                className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl focus:outline-none focus:border-purple-500/50"
              />
              <div className="flex space-x-4">
                <button className="flex-1 px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl font-bold">
                  Create Release
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

