'use client';

import { useState } from 'react';
import Link from 'next/link';

interface Draft {
  id: string;
  content: string;
  platforms: string[];
  mediaUrl?: string;
  scheduledTime?: string;
  lastEdited: string;
  version: number;
  campaign?: string;
  tags: string[];
}

export default function Drafts() {
  const [drafts, setDrafts] = useState<Draft[]>([
    {
      id: '1',
      content: 'Exciting announcement coming soon! Stay tuned for major updates about CSPOC 2026. 🎉',
      platforms: ['Facebook', 'Twitter/X', 'LinkedIn'],
      lastEdited: '2 hours ago',
      version: 3,
      campaign: 'CSPOC Pre-Event',
      tags: ['announcement', 'teaser'],
    },
    {
      id: '2',
      content: 'Meet our keynote speakers for #CSPOC2026. Thread 🧵',
      platforms: ['Twitter/X'],
      lastEdited: '1 day ago',
      version: 1,
      campaign: 'Speaker Spotlight',
      tags: ['speakers', 'thread'],
    },
    {
      id: '3',
      content: 'Behind the scenes: Setting up the world-class venue for CSPOC 2026',
      platforms: ['Instagram', 'Facebook'],
      mediaUrl: '/venue-image.jpg',
      lastEdited: '3 days ago',
      version: 5,
      tags: ['bts', 'venue'],
    },
  ]);

  const [selectedDraft, setSelectedDraft] = useState<Draft | null>(null);
  const [editContent, setEditContent] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [filterTag, setFilterTag] = useState<string>('all');

  const allTags = ['all', ...Array.from(new Set(drafts.flatMap(d => d.tags)))];

  const filteredDrafts = drafts.filter(draft => {
    if (searchTerm && !draft.content.toLowerCase().includes(searchTerm.toLowerCase())) return false;
    if (filterTag !== 'all' && !draft.tags.includes(filterTag)) return false;
    return true;
  });

  const handleEdit = (draft: Draft) => {
    setSelectedDraft(draft);
    setEditContent(draft.content);
  };

  const handleSave = () => {
    if (!selectedDraft) return;

    setDrafts(prev => prev.map(d => 
      d.id === selectedDraft.id 
        ? { ...d, content: editContent, version: d.version + 1, lastEdited: 'Just now' }
        : d
    ));

    alert('✅ Draft saved successfully!');
    setSelectedDraft(null);
  };

  const handleDelete = (id: string) => {
    if (confirm('Delete this draft?')) {
      setDrafts(prev => prev.filter(d => d.id !== id));
    }
  };

  const handleDuplicate = (draft: Draft) => {
    const newDraft = {
      ...draft,
      id: Date.now().toString(),
      content: draft.content + ' (Copy)',
      version: 1,
      lastEdited: 'Just now',
    };
    setDrafts(prev => [...prev, newDraft]);
  };

  const handlePublish = (draft: Draft) => {
    alert(`✅ Publishing to: ${draft.platforms.join(', ')}\n\n"${draft.content}"`);
    setDrafts(prev => prev.filter(d => d.id !== draft.id));
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
              <div>
                <h1 className="text-xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                  Guddu-Project
                </h1>
              </div>
            </Link>

            <div className="flex items-center space-x-4">
              <Link href="/dashboard" className="px-4 py-2 hover:bg-white/10 rounded-lg transition-colors">Dashboard</Link>
              <Link href="/drafts" className="px-4 py-2 bg-white/10 rounded-lg font-semibold">Drafts</Link>
              <Link href="/inbox" className="px-4 py-2 hover:bg-white/10 rounded-lg transition-colors">Inbox</Link>
              <Link href="/calendar" className="px-4 py-2 hover:bg-white/10 rounded-lg transition-colors">Calendar</Link>
            </div>
          </div>
        </div>
      </nav>

      <div className="container mx-auto px-6 py-8">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-5xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent mb-4">
              Drafts
            </h1>
            <p className="text-xl text-gray-400">Your saved posts and work in progress</p>
          </div>

          <div className="flex items-center space-x-4">
            <div className="px-6 py-3 bg-blue-600/20 border border-blue-500/50 rounded-xl">
              <div className="text-3xl font-bold text-blue-400">{drafts.length}</div>
              <div className="text-sm text-gray-400">Total Drafts</div>
            </div>
          </div>
        </div>

        <div className="flex items-center space-x-4 mb-6">
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search drafts..."
            className="flex-1 px-4 py-2 bg-white/5 border border-white/10 rounded-xl focus:outline-none focus:border-purple-500/50"
          />

          <select
            value={filterTag}
            onChange={(e) => setFilterTag(e.target.value)}
            className="px-4 py-2 bg-white/5 border border-white/10 rounded-xl focus:outline-none focus:border-purple-500/50"
          >
            {allTags.map(tag => (
              <option key={tag} value={tag}>{tag === 'all' ? 'All Tags' : `#${tag}`}</option>
            ))}
          </select>

          <Link
            href="/dashboard"
            className="px-6 py-2 bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl font-semibold hover:shadow-lg transition-all"
          >
            + New Draft
          </Link>
        </div>

        <div className="grid lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 space-y-4">
            {filteredDrafts.map(draft => (
              <div
                key={draft.id}
                className="p-6 bg-white/5 backdrop-blur-lg rounded-2xl border border-white/10 hover:border-purple-500/50 transition-all"
              >
                <div className="flex items-start justify-between mb-4">
                  <div className="flex-1">
                    <p className="text-lg mb-3">{draft.content}</p>
                    
                    {draft.mediaUrl && (
                      <div className="mb-3 p-3 bg-white/5 rounded-lg text-sm text-gray-400">
                        📎 Media attached
                      </div>
                    )}

                    <div className="flex flex-wrap gap-2 mb-3">
                      {draft.platforms.map((p, i) => (
                        <span key={i} className="text-xs px-3 py-1 bg-blue-600/30 rounded-full">
                          {p}
                        </span>
                      ))}
                      {draft.tags.map((tag, i) => (
                        <span key={i} className="text-xs px-3 py-1 bg-purple-600/30 rounded-full">
                          #{tag}
                        </span>
                      ))}
                    </div>

                    {draft.campaign && (
                      <div className="text-sm text-gray-400 mb-2">
                        📁 {draft.campaign}
                      </div>
                    )}

                    <div className="flex items-center space-x-4 text-sm text-gray-400">
                      <span>✏️ Version {draft.version}</span>
                      <span>🕒 {draft.lastEdited}</span>
                    </div>
                  </div>
                </div>

                <div className="flex items-center space-x-2">
                  <button
                    onClick={() => handleEdit(draft)}
                    className="flex-1 px-4 py-2 bg-blue-600/30 hover:bg-blue-600/50 rounded-lg transition-colors"
                  >
                    ✏️ Edit
                  </button>
                  <button
                    onClick={() => handlePublish(draft)}
                    className="flex-1 px-4 py-2 bg-green-600/30 hover:bg-green-600/50 rounded-lg transition-colors"
                  >
                    📢 Publish
                  </button>
                  <button
                    onClick={() => handleDuplicate(draft)}
                    className="px-4 py-2 bg-white/5 hover:bg-white/10 rounded-lg transition-colors"
                  >
                    📋
                  </button>
                  <button
                    onClick={() => handleDelete(draft.id)}
                    className="px-4 py-2 bg-red-600/30 hover:bg-red-600/50 rounded-lg transition-colors"
                  >
                    🗑️
                  </button>
                </div>
              </div>
            ))}

            {filteredDrafts.length === 0 && (
              <div className="text-center py-20">
                <div className="text-6xl mb-4">📝</div>
                <p className="text-xl text-gray-400">No drafts found</p>
              </div>
            )}
          </div>

          <div className="bg-white/5 backdrop-blur-lg rounded-3xl border border-white/10 p-6 h-fit">
            <h2 className="text-2xl font-bold mb-6">Quick Stats</h2>
            
            <div className="space-y-4">
              <div className="p-4 bg-white/5 rounded-xl">
                <div className="text-2xl font-bold text-blue-400">{drafts.length}</div>
                <div className="text-sm text-gray-400">Total Drafts</div>
              </div>

              <div className="p-4 bg-white/5 rounded-xl">
                <div className="text-2xl font-bold text-green-400">
                  {drafts.filter(d => d.version > 1).length}
                </div>
                <div className="text-sm text-gray-400">Edited Drafts</div>
              </div>

              <div className="p-4 bg-white/5 rounded-xl">
                <div className="text-2xl font-bold text-purple-400">
                  {drafts.filter(d => d.campaign).length}
                </div>
                <div className="text-sm text-gray-400">In Campaigns</div>
              </div>
            </div>

            <div className="mt-6 pt-6 border-t border-white/10">
              <h3 className="font-bold mb-3">Recent Activity</h3>
              <div className="space-y-2 text-sm text-gray-400">
                <div>✏️ Draft edited 2 hours ago</div>
                <div>📝 New draft created yesterday</div>
                <div>🗑️ Draft deleted 2 days ago</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {selectedDraft && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-6">
          <div className="bg-gradient-to-br from-slate-900 to-purple-900 rounded-3xl border border-white/20 p-8 max-w-3xl w-full">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-3xl font-bold">Edit Draft</h2>
              <button
                onClick={() => setSelectedDraft(null)}
                className="text-3xl hover:text-red-400 transition-colors"
              >
                ✕
              </button>
            </div>

            <textarea
              value={editContent}
              onChange={(e) => setEditContent(e.target.value)}
              className="w-full h-48 px-4 py-3 bg-white/5 border border-white/10 rounded-xl focus:outline-none focus:border-purple-500/50 resize-none mb-6"
            />

            <div className="flex items-center space-x-4">
              <button
                onClick={handleSave}
                className="flex-1 px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl font-bold hover:shadow-lg transition-all"
              >
                💾 Save Changes
              </button>
              <button
                onClick={() => setSelectedDraft(null)}
                className="px-6 py-3 bg-white/5 hover:bg-white/10 rounded-xl transition-colors"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

