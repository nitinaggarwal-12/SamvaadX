'use client';

import { useState } from 'react';
import Link from 'next/link';

interface PostVersion {
  versionNumber: number;
  content: string;
  images: string[];
  editedBy: string;
  timestamp: string;
  changeDescription: string;
  platforms: string[];
}

interface Post {
  id: string;
  title: string;
  currentVersion: PostVersion;
  versions: PostVersion[];
  status: 'draft' | 'published' | 'scheduled';
}

export default function PostVersioning() {
  const [selectedPost, setSelectedPost] = useState<string | null>('1');
  const [posts] = useState<Post[]>([
    {
      id: '1',
      title: 'CSPOC 2026 Main Announcement',
      status: 'published',
      currentVersion: {
        versionNumber: 4,
        content: 'Exciting News! 🎉 The 28th Conference of Speakers & Presiding Officers of the Commonwealth (CSPOC) will be held in New Delhi from Jan 14-17, 2026. Join us for this historic parliamentary event! #CSPOC2026 #ParliamentaryDemocracy',
        images: [],
        editedBy: 'Dr. Sharma',
        timestamp: '2024-12-26 10:30 AM',
        changeDescription: 'Added emojis and improved hashtags',
        platforms: ['Twitter', 'Facebook', 'LinkedIn'],
      },
      versions: [
        {
          versionNumber: 1,
          content: 'The 28th CSPOC will be held in New Delhi from January 14-17, 2026.',
          images: [],
          editedBy: 'John Doe',
          timestamp: '2024-12-20 09:00 AM',
          changeDescription: 'Initial draft',
          platforms: ['Twitter'],
        },
        {
          versionNumber: 2,
          content: 'The 28th Conference of Speakers and Presiding Officers of the Commonwealth (CSPOC 2026) will take place in New Delhi from January 14-17, 2026. More details coming soon.',
          images: [],
          editedBy: 'Jane Smith',
          timestamp: '2024-12-22 02:15 PM',
          changeDescription: 'Expanded acronym and added teaser',
          platforms: ['Twitter', 'Facebook'],
        },
        {
          versionNumber: 3,
          content: 'Exciting announcement! The 28th Conference of Speakers & Presiding Officers of the Commonwealth (CSPOC) will be held in New Delhi from Jan 14-17, 2026. Join us for this historic event! #CSPOC2026',
          images: [],
          editedBy: 'Dr. Sharma',
          timestamp: '2024-12-25 11:45 AM',
          changeDescription: 'Made more engaging, added hashtag',
          platforms: ['Twitter', 'Facebook', 'LinkedIn'],
        },
        {
          versionNumber: 4,
          content: 'Exciting News! 🎉 The 28th Conference of Speakers & Presiding Officers of the Commonwealth (CSPOC) will be held in New Delhi from Jan 14-17, 2026. Join us for this historic parliamentary event! #CSPOC2026 #ParliamentaryDemocracy',
          images: [],
          editedBy: 'Dr. Sharma',
          timestamp: '2024-12-26 10:30 AM',
          changeDescription: 'Added emojis and improved hashtags',
          platforms: ['Twitter', 'Facebook', 'LinkedIn'],
        },
      ],
    },
    {
      id: '2',
      title: 'Delegate Registration Open',
      status: 'scheduled',
      currentVersion: {
        versionNumber: 2,
        content: '📢 Delegate registration for #CSPOC2026 is now OPEN! Secure your spot at this prestigious Commonwealth event. Register at https://cspoc2026.gov.in/register',
        images: [],
        editedBy: 'Ms. Patel',
        timestamp: '2024-12-26 03:00 PM',
        changeDescription: 'Added URL and improved CTA',
        platforms: ['Twitter', 'LinkedIn'],
      },
      versions: [
        {
          versionNumber: 1,
          content: 'Registration is now open for CSPOC 2026 delegates.',
          images: [],
          editedBy: 'Ms. Patel',
          timestamp: '2024-12-25 04:00 PM',
          changeDescription: 'Initial draft',
          platforms: ['Twitter'],
        },
        {
          versionNumber: 2,
          content: '📢 Delegate registration for #CSPOC2026 is now OPEN! Secure your spot at this prestigious Commonwealth event. Register at https://cspoc2026.gov.in/register',
          images: [],
          editedBy: 'Ms. Patel',
          timestamp: '2024-12-26 03:00 PM',
          changeDescription: 'Added URL and improved CTA',
          platforms: ['Twitter', 'LinkedIn'],
        },
      ],
    },
  ]);

  const currentPost = posts.find(p => p.id === selectedPost);

  const compareVersions = (v1: number, v2: number) => {
    // Placeholder for version comparison logic
    return { added: 12, removed: 5, changed: 3 };
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
              <Link href="/drafts" className="px-4 py-2 hover:bg-white/10 rounded-lg">Drafts</Link>
              <Link href="/post-versions" className="px-4 py-2 bg-white/10 rounded-lg font-semibold">Version History</Link>
            </div>
          </div>
        </div>
      </nav>

      <div className="container mx-auto px-6 py-8">
        <div className="mb-8">
          <h1 className="text-5xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent mb-4">
            Post Versioning & History
          </h1>
          <p className="text-xl text-gray-400">Track every edit and restore previous versions</p>
        </div>

        <div className="grid lg:grid-cols-3 gap-6">
          <div className="space-y-3">
            <h2 className="text-xl font-bold mb-4">📝 All Posts</h2>
            {posts.map(post => (
              <div
                key={post.id}
                onClick={() => setSelectedPost(post.id)}
                className={`p-4 rounded-xl cursor-pointer transition-all ${
                  selectedPost === post.id
                    ? 'bg-gradient-to-r from-blue-600 to-purple-600'
                    : 'bg-white/5 hover:bg-white/10'
                } backdrop-blur-lg border border-white/10`}
              >
                <div className="flex items-center justify-between mb-2">
                  <h3 className="font-bold">{post.title}</h3>
                  <span className={`text-xs px-2 py-1 rounded ${
                    post.status === 'published' ? 'bg-green-600/30 text-green-400' :
                    post.status === 'scheduled' ? 'bg-blue-600/30 text-blue-400' :
                    'bg-gray-600/30 text-gray-400'
                  }`}>
                    {post.status.toUpperCase()}
                  </span>
                </div>
                <div className="text-sm text-gray-400">
                  v{post.currentVersion.versionNumber} · {post.versions.length} versions
                </div>
              </div>
            ))}
          </div>

          {currentPost && (
            <div className="lg:col-span-2">
              <div className="mb-6 p-6 bg-white/5 backdrop-blur-lg rounded-2xl border border-white/10">
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-2xl font-bold">Current Version (v{currentPost.currentVersion.versionNumber})</h2>
                  <span className={`px-3 py-1 rounded-full text-xs ${
                    currentPost.status === 'published' ? 'bg-green-600/30 text-green-400' :
                    currentPost.status === 'scheduled' ? 'bg-blue-600/30 text-blue-400' :
                    'bg-gray-600/30 text-gray-400'
                  }`}>
                    {currentPost.status.toUpperCase()}
                  </span>
                </div>
                <div className="p-4 bg-black/30 rounded-lg mb-4">
                  <p className="text-lg">{currentPost.currentVersion.content}</p>
                </div>
                <div className="flex items-center justify-between text-sm text-gray-400 mb-3">
                  <div>
                    Edited by <span className="font-bold">{currentPost.currentVersion.editedBy}</span>
                  </div>
                  <div>{currentPost.currentVersion.timestamp}</div>
                </div>
                <div className="flex items-center space-x-2">
                  {currentPost.currentVersion.platforms.map(platform => (
                    <span key={platform} className="text-xs px-2 py-1 bg-purple-600/30 rounded">
                      {platform}
                    </span>
                  ))}
                </div>
              </div>

              <h3 className="text-xl font-bold mb-4">📚 Version History</h3>
              <div className="space-y-3">
                {currentPost.versions.map((version, idx) => {
                  const isLatest = idx === currentPost.versions.length - 1;
                  return (
                    <div
                      key={version.versionNumber}
                      className={`p-5 rounded-2xl border ${
                        isLatest
                          ? 'bg-gradient-to-r from-blue-600/20 to-purple-600/20 border-blue-500/50'
                          : 'bg-white/5 border-white/10'
                      } backdrop-blur-lg`}
                    >
                      <div className="flex items-start justify-between mb-3">
                        <div>
                          <div className="flex items-center space-x-2 mb-1">
                            <h4 className="font-bold">Version {version.versionNumber}</h4>
                            {isLatest && (
                              <span className="text-xs px-2 py-1 bg-green-600/30 text-green-400 rounded">
                                CURRENT
                              </span>
                            )}
                          </div>
                          <div className="text-sm text-gray-400">
                            {version.editedBy} · {version.timestamp}
                          </div>
                        </div>
                      </div>
                      <div className="p-3 bg-black/30 rounded-lg mb-3">
                        <p className="text-sm text-gray-300">{version.content}</p>
                      </div>
                      <div className="text-xs text-yellow-400 mb-2">
                        📝 {version.changeDescription}
                      </div>
                      <div className="flex items-center justify-between">
                        <div className="flex space-x-2">
                          {version.platforms.map(platform => (
                            <span key={platform} className="text-xs px-2 py-1 bg-blue-600/30 rounded">
                              {platform}
                            </span>
                          ))}
                        </div>
                        {!isLatest && (
                          <button className="px-3 py-1 bg-blue-600 hover:bg-blue-700 rounded text-xs font-semibold">
                            ↩️ Restore
                          </button>
                        )}
                      </div>
                      {idx < currentPost.versions.length - 1 && (
                        <div className="mt-3 pt-3 border-t border-white/10 flex items-center space-x-3 text-xs">
                          <button className="text-blue-400 hover:underline">
                            📊 Compare with v{version.versionNumber + 1}
                          </button>
                          <span className="text-gray-500">|</span>
                          <span className="text-green-400">+12 added</span>
                          <span className="text-red-400">-5 removed</span>
                          <span className="text-yellow-400">~3 changed</span>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

