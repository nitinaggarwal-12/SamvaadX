'use client';

import { useState } from 'react';
import Link from 'next/link';

interface TikTokConnection {
  connected: boolean;
  username?: string;
  displayName?: string;
  avatarUrl?: string;
  followers?: number;
  following?: number;
  totalVideos?: number;
}

interface TikTokPost {
  videoFile?: File;
  title: string;
  caption: string;
  privacyLevel: 'PUBLIC' | 'FRIENDS' | 'SELF';
  disableComment: boolean;
  disableDuet: boolean;
  disableStitch: boolean;
  hashtags: string[];
}

export default function TikTokIntegration() {
  const [connection, setConnection] = useState<TikTokConnection>({
    connected: false,
  });

  const [post, setPost] = useState<TikTokPost>({
    videoFile: undefined,
    title: '',
    caption: '',
    privacyLevel: 'PUBLIC',
    disableComment: false,
    disableDuet: false,
    disableStitch: false,
    hashtags: [],
  });

  const [uploading, setUploading] = useState(false);
  const [hashtagInput, setHashtagInput] = useState('');

  const handleConnect = async () => {
    // In production, this would trigger OAuth flow
    window.location.href = '/api/social/tiktok/auth';
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setPost({ ...post, videoFile: e.target.files[0] });
    }
  };

  const addHashtag = () => {
    if (hashtagInput.trim() && !post.hashtags.includes(hashtagInput.trim())) {
      setPost({
        ...post,
        hashtags: [...post.hashtags, hashtagInput.trim().replace('#', '')],
      });
      setHashtagInput('');
    }
  };

  const removeHashtag = (tag: string) => {
    setPost({
      ...post,
      hashtags: post.hashtags.filter(t => t !== tag),
    });
  };

  const handleUpload = async () => {
    setUploading(true);
    // In production, this would upload to backend API
    setTimeout(() => {
      setUploading(false);
      alert('Video uploaded to TikTok successfully!');
    }, 2000);
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
              <Link href="/connections" className="px-4 py-2 hover:bg-white/10 rounded-lg">Connections</Link>
              <Link href="/tiktok" className="px-4 py-2 bg-white/10 rounded-lg font-semibold">TikTok</Link>
            </div>
          </div>
        </div>
      </nav>

      <div className="container mx-auto px-6 py-8">
        <div className="mb-8">
          <h1 className="text-5xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent mb-4">
            TikTok Integration
          </h1>
          <p className="text-xl text-gray-400">Create and publish engaging short-form videos</p>
        </div>

        {!connection.connected ? (
          <div className="max-w-2xl mx-auto">
            <div className="p-8 bg-white/5 backdrop-blur-lg rounded-2xl border border-white/10 text-center">
              <div className="w-24 h-24 bg-gradient-to-br from-pink-500 to-purple-600 rounded-2xl flex items-center justify-center mx-auto mb-6">
                <span className="text-5xl">🎵</span>
              </div>
              <h2 className="text-3xl font-bold mb-4">Connect Your TikTok Account</h2>
              <p className="text-gray-400 mb-6">
                Publish videos, track performance, and engage with your audience directly from Guddu-Project
              </p>
              
              <div className="mb-6 p-4 bg-blue-900/30 border border-blue-500/30 rounded-lg text-left">
                <h3 className="font-bold mb-2">📋 Required Permissions:</h3>
                <ul className="text-sm space-y-1 text-gray-300">
                  <li>✓ Video upload and publishing</li>
                  <li>✓ Video analytics and insights</li>
                  <li>✓ Account information</li>
                  <li>✓ Comment management</li>
                </ul>
              </div>

              <button
                onClick={handleConnect}
                className="px-8 py-4 bg-gradient-to-r from-pink-600 to-purple-600 rounded-lg font-bold text-lg hover:shadow-lg transition-all"
              >
                🔗 Connect TikTok Account
              </button>
            </div>
          </div>
        ) : (
          <div className="grid lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2">
              <div className="p-6 bg-white/5 backdrop-blur-lg rounded-2xl border border-white/10 mb-6">
                <h2 className="text-2xl font-bold mb-4">📹 Upload Video</h2>
                
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm text-gray-400 mb-2">Video File</label>
                    <input
                      type="file"
                      accept="video/*"
                      onChange={handleFileChange}
                      className="w-full px-4 py-2 bg-black/30 border border-white/10 rounded-lg"
                    />
                    {post.videoFile && (
                      <div className="mt-2 text-sm text-green-400">
                        ✓ {post.videoFile.name} selected
                      </div>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm text-gray-400 mb-2">Title (required)</label>
                    <input
                      type="text"
                      value={post.title}
                      onChange={(e) => setPost({ ...post, title: e.target.value })}
                      placeholder="Enter video title..."
                      className="w-full px-4 py-2 bg-black/30 border border-white/10 rounded-lg"
                      maxLength={150}
                    />
                    <div className="text-xs text-gray-500 mt-1">{post.title.length}/150</div>
                  </div>

                  <div>
                    <label className="block text-sm text-gray-400 mb-2">Caption</label>
                    <textarea
                      value={post.caption}
                      onChange={(e) => setPost({ ...post, caption: e.target.value })}
                      placeholder="Write a catchy caption..."
                      className="w-full px-4 py-2 bg-black/30 border border-white/10 rounded-lg h-24"
                      maxLength={2200}
                    />
                    <div className="text-xs text-gray-500 mt-1">{post.caption.length}/2200</div>
                  </div>

                  <div>
                    <label className="block text-sm text-gray-400 mb-2">Hashtags</label>
                    <div className="flex space-x-2 mb-2">
                      <input
                        type="text"
                        value={hashtagInput}
                        onChange={(e) => setHashtagInput(e.target.value)}
                        onKeyPress={(e) => e.key === 'Enter' && addHashtag()}
                        placeholder="Add hashtag..."
                        className="flex-1 px-4 py-2 bg-black/30 border border-white/10 rounded-lg"
                      />
                      <button
                        onClick={addHashtag}
                        className="px-4 py-2 bg-blue-600 hover:bg-blue-700 rounded-lg"
                      >
                        Add
                      </button>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {post.hashtags.map(tag => (
                        <span
                          key={tag}
                          className="px-3 py-1 bg-purple-600/30 rounded-full text-sm flex items-center space-x-2"
                        >
                          <span>#{tag}</span>
                          <button
                            onClick={() => removeHashtag(tag)}
                            className="hover:text-red-400"
                          >
                            ×
                          </button>
                        </span>
                      ))}
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm text-gray-400 mb-2">Privacy Level</label>
                    <select
                      value={post.privacyLevel}
                      onChange={(e) => setPost({ ...post, privacyLevel: e.target.value as any })}
                      className="w-full px-4 py-2 bg-black/30 border border-white/10 rounded-lg"
                    >
                      <option value="PUBLIC">Public - Everyone can see</option>
                      <option value="FRIENDS">Friends - Only friends</option>
                      <option value="SELF">Private - Only me</option>
                    </select>
                  </div>

                  <div className="space-y-2">
                    <label className="flex items-center space-x-2 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={post.disableComment}
                        onChange={(e) => setPost({ ...post, disableComment: e.target.checked })}
                      />
                      <span>Disable comments</span>
                    </label>
                    <label className="flex items-center space-x-2 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={post.disableDuet}
                        onChange={(e) => setPost({ ...post, disableDuet: e.target.checked })}
                      />
                      <span>Disable duet</span>
                    </label>
                    <label className="flex items-center space-x-2 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={post.disableStitch}
                        onChange={(e) => setPost({ ...post, disableStitch: e.target.checked })}
                      />
                      <span>Disable stitch</span>
                    </label>
                  </div>

                  <button
                    onClick={handleUpload}
                    disabled={!post.videoFile || !post.title || uploading}
                    className="w-full px-6 py-3 bg-gradient-to-r from-pink-600 to-purple-600 rounded-lg font-bold disabled:opacity-50 disabled:cursor-not-allowed hover:shadow-lg transition-all"
                  >
                    {uploading ? '⏳ Uploading...' : '🚀 Upload to TikTok'}
                  </button>
                </div>
              </div>
            </div>

            <div>
              <div className="p-6 bg-white/5 backdrop-blur-lg rounded-2xl border border-white/10 mb-6">
                <h3 className="text-xl font-bold mb-4">📊 Account Stats</h3>
                <div className="space-y-3">
                  <div className="p-3 bg-black/30 rounded-lg">
                    <div className="text-sm text-gray-400">Followers</div>
                    <div className="text-2xl font-bold text-blue-400">{connection.followers?.toLocaleString() || '0'}</div>
                  </div>
                  <div className="p-3 bg-black/30 rounded-lg">
                    <div className="text-sm text-gray-400">Following</div>
                    <div className="text-2xl font-bold text-purple-400">{connection.following?.toLocaleString() || '0'}</div>
                  </div>
                  <div className="p-3 bg-black/30 rounded-lg">
                    <div className="text-sm text-gray-400">Total Videos</div>
                    <div className="text-2xl font-bold text-green-400">{connection.totalVideos?.toLocaleString() || '0'}</div>
                  </div>
                </div>
              </div>

              <div className="p-6 bg-white/5 backdrop-blur-lg rounded-2xl border border-white/10">
                <h3 className="text-xl font-bold mb-4">💡 TikTok Tips</h3>
                <ul className="text-sm space-y-2 text-gray-300">
                  <li>✓ Keep videos 15-60 seconds</li>
                  <li>✓ Use trending sounds</li>
                  <li>✓ Post during peak hours</li>
                  <li>✓ Engage with comments</li>
                  <li>✓ Use 3-5 relevant hashtags</li>
                  <li>✓ Create eye-catching thumbnails</li>
                </ul>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

