'use client';

import { useState } from 'react';
import Link from 'next/link';

interface MediaAsset {
  id: string;
  type: 'image' | 'video' | 'gif';
  url: string;
  thumbnail: string;
  name: string;
  size: string;
  uploadedAt: string;
  usedIn: number;
  tags: string[];
  folder: string;
}

export default function MediaLibrary() {
  const [assets, setAssets] = useState<MediaAsset[]>([
    {
      id: '1',
      type: 'image',
      url: '/sample1.jpg',
      thumbnail: '🖼️',
      name: 'CSPOC 2026 Banner.jpg',
      size: '2.4 MB',
      uploadedAt: '2 days ago',
      usedIn: 5,
      tags: ['banner', 'event', 'cspoc'],
      folder: 'Events',
    },
    {
      id: '2',
      type: 'video',
      url: '/sample2.mp4',
      thumbnail: '🎥',
      name: 'Speaker Highlight Reel.mp4',
      size: '45.2 MB',
      uploadedAt: '3 days ago',
      usedIn: 2,
      tags: ['video', 'speakers', 'highlights'],
      folder: 'Videos',
    },
    {
      id: '3',
      type: 'image',
      url: '/sample3.jpg',
      thumbnail: '📸',
      name: 'Parliament Building.jpg',
      size: '3.1 MB',
      uploadedAt: '1 week ago',
      usedIn: 8,
      tags: ['building', 'venue', 'architecture'],
      folder: 'Venue',
    },
    {
      id: '4',
      type: 'gif',
      url: '/sample4.gif',
      thumbnail: '✨',
      name: 'Countdown Animation.gif',
      size: '1.8 MB',
      uploadedAt: '1 week ago',
      usedIn: 12,
      tags: ['animation', 'countdown', 'promotional'],
      folder: 'Animations',
    },
  ]);

  const [view, setView] = useState<'grid' | 'list'>('grid');
  const [filter, setFilter] = useState<'all' | 'image' | 'video' | 'gif'>('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedAssets, setSelectedAssets] = useState<string[]>([]);
  const [selectedFolder, setSelectedFolder] = useState('all');
  const [showUploadModal, setShowUploadModal] = useState(false);

  const folders = ['all', 'Events', 'Videos', 'Venue', 'Animations', 'Graphics', 'Logos'];

  const filteredAssets = assets.filter(asset => {
    if (filter !== 'all' && asset.type !== filter) return false;
    if (selectedFolder !== 'all' && asset.folder !== selectedFolder) return false;
    if (searchTerm && !asset.name.toLowerCase().includes(searchTerm.toLowerCase())) return false;
    return true;
  });

  const toggleSelect = (id: string) => {
    setSelectedAssets(prev =>
      prev.includes(id) ? prev.filter(i => i !== id) : [...prev, id]
    );
  };

  const handleDelete = () => {
    if (confirm(`Delete ${selectedAssets.length} asset(s)?`)) {
      setAssets(prev => prev.filter(a => !selectedAssets.includes(a.id)));
      setSelectedAssets([]);
    }
  };

  const handleUpload = () => {
    alert('File upload would trigger here. In production, this would:\n- Open file picker\n- Upload to cloud storage (S3/CloudFlare)\n- Process images/videos\n- Generate thumbnails\n- Extract metadata');
    setShowUploadModal(false);
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
              <Link href="/inbox" className="px-4 py-2 hover:bg-white/10 rounded-lg transition-colors">Inbox</Link>
              <Link href="/media-library" className="px-4 py-2 bg-white/10 rounded-lg font-semibold">Media</Link>
              <Link href="/analytics" className="px-4 py-2 hover:bg-white/10 rounded-lg transition-colors">Analytics</Link>
            </div>
          </div>
        </div>
      </nav>

      <div className="container mx-auto px-6 py-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-5xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent mb-4">
              Media Library
            </h1>
            <p className="text-xl text-gray-400">Organize and manage all your assets</p>
          </div>

          <button
            onClick={() => setShowUploadModal(true)}
            className="px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl font-bold text-lg hover:shadow-lg hover:shadow-purple-500/50 transition-all transform hover:scale-105 flex items-center space-x-2"
          >
            <span className="text-2xl">⬆️</span>
            <span>Upload Media</span>
          </button>
        </div>

        <div className="grid lg:grid-cols-4 gap-6">
          {/* Sidebar */}
          <div className="bg-white/5 backdrop-blur-lg rounded-3xl border border-white/10 p-6 h-fit">
            <h3 className="text-xl font-bold mb-4">Folders</h3>
            <div className="space-y-2">
              {folders.map((folder) => (
                <button
                  key={folder}
                  onClick={() => setSelectedFolder(folder)}
                  className={`w-full text-left px-4 py-2 rounded-lg transition-all ${
                    selectedFolder === folder
                      ? 'bg-purple-600 font-semibold'
                      : 'hover:bg-white/10'
                  }`}
                >
                  📁 {folder === 'all' ? 'All Files' : folder}
                </button>
              ))}
            </div>

            <div className="mt-6 pt-6 border-t border-white/10">
              <h3 className="text-xl font-bold mb-4">Storage</h3>
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-400">Used</span>
                  <span className="font-semibold">52.5 GB</span>
                </div>
                <div className="w-full h-2 bg-white/10 rounded-full overflow-hidden">
                  <div className="h-full bg-gradient-to-r from-blue-600 to-purple-600 rounded-full" style={{ width: '52.5%' }} />
                </div>
                <div className="text-xs text-gray-400">52.5 GB of 100 GB used</div>
              </div>
            </div>

            <button className="w-full mt-6 px-4 py-3 bg-gradient-to-r from-green-600 to-blue-600 rounded-xl font-semibold hover:shadow-lg transition-all">
              Upgrade Storage
            </button>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-3">
            {/* Toolbar */}
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center space-x-4">
                <div className="flex items-center space-x-2 bg-white/5 backdrop-blur-lg rounded-xl p-2 border border-white/10">
                  {['all', 'image', 'video', 'gif'].map((f) => (
                    <button
                      key={f}
                      onClick={() => setFilter(f as any)}
                      className={`px-4 py-2 rounded-lg transition-all capitalize ${
                        filter === f
                          ? 'bg-gradient-to-r from-blue-600 to-purple-600 font-semibold'
                          : 'hover:bg-white/10'
                      }`}
                    >
                      {f}
                    </button>
                  ))}
                </div>

                <input
                  type="text"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  placeholder="Search assets..."
                  className="px-4 py-2 bg-white/5 border border-white/10 rounded-xl focus:outline-none focus:border-purple-500/50 w-64"
                />
              </div>

              <div className="flex items-center space-x-2">
                <button
                  onClick={() => setView('grid')}
                  className={`p-2 rounded-lg ${view === 'grid' ? 'bg-purple-600' : 'bg-white/5 hover:bg-white/10'}`}
                >
                  ⊞
                </button>
                <button
                  onClick={() => setView('list')}
                  className={`p-2 rounded-lg ${view === 'list' ? 'bg-purple-600' : 'bg-white/5 hover:bg-white/10'}`}
                >
                  ☰
                </button>
              </div>
            </div>

            {/* Selected Actions */}
            {selectedAssets.length > 0 && (
              <div className="mb-6 p-4 bg-blue-600/20 border border-blue-500/50 rounded-xl flex items-center justify-between">
                <span className="font-semibold">{selectedAssets.length} asset(s) selected</span>
                <div className="flex items-center space-x-2">
                  <button className="px-4 py-2 bg-white/10 hover:bg-white/20 rounded-lg transition-colors">
                    Move
                  </button>
                  <button className="px-4 py-2 bg-white/10 hover:bg-white/20 rounded-lg transition-colors">
                    Download
                  </button>
                  <button
                    onClick={handleDelete}
                    className="px-4 py-2 bg-red-600/50 hover:bg-red-600/70 rounded-lg transition-colors"
                  >
                    Delete
                  </button>
                  <button
                    onClick={() => setSelectedAssets([])}
                    className="px-4 py-2 bg-white/10 hover:bg-white/20 rounded-lg transition-colors"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            )}

            {/* Assets Grid/List */}
            {view === 'grid' ? (
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                {filteredAssets.map((asset) => (
                  <div
                    key={asset.id}
                    onClick={() => toggleSelect(asset.id)}
                    className={`group relative p-4 bg-white/5 backdrop-blur-lg rounded-2xl border cursor-pointer transition-all ${
                      selectedAssets.includes(asset.id)
                        ? 'border-purple-500 ring-2 ring-purple-500'
                        : 'border-white/10 hover:border-purple-500/50'
                    }`}
                  >
                    <div className="aspect-square bg-white/10 rounded-xl flex items-center justify-center text-6xl mb-4">
                      {asset.thumbnail}
                    </div>

                    <h3 className="font-semibold truncate mb-2">{asset.name}</h3>

                    <div className="flex items-center justify-between text-sm text-gray-400 mb-2">
                      <span>{asset.size}</span>
                      <span>{asset.uploadedAt}</span>
                    </div>

                    <div className="flex flex-wrap gap-1 mb-2">
                      {asset.tags.slice(0, 3).map((tag, i) => (
                        <span key={i} className="text-xs px-2 py-1 bg-white/10 rounded-full">
                          #{tag}
                        </span>
                      ))}
                    </div>

                    <div className="text-xs text-gray-400">
                      Used in {asset.usedIn} post{asset.usedIn !== 1 ? 's' : ''}
                    </div>

                    {selectedAssets.includes(asset.id) && (
                      <div className="absolute top-2 right-2 w-6 h-6 bg-purple-600 rounded-full flex items-center justify-center">
                        ✓
                      </div>
                    )}
                  </div>
                ))}
              </div>
            ) : (
              <div className="space-y-2">
                {filteredAssets.map((asset) => (
                  <div
                    key={asset.id}
                    onClick={() => toggleSelect(asset.id)}
                    className={`flex items-center space-x-4 p-4 bg-white/5 rounded-xl border cursor-pointer transition-all ${
                      selectedAssets.includes(asset.id)
                        ? 'border-purple-500'
                        : 'border-white/10 hover:border-purple-500/50'
                    }`}
                  >
                    <div className="w-16 h-16 bg-white/10 rounded-lg flex items-center justify-center text-3xl">
                      {asset.thumbnail}
                    </div>

                    <div className="flex-1">
                      <h3 className="font-semibold">{asset.name}</h3>
                      <div className="text-sm text-gray-400">{asset.size} • {asset.uploadedAt}</div>
                    </div>

                    <div className="flex flex-wrap gap-1">
                      {asset.tags.map((tag, i) => (
                        <span key={i} className="text-xs px-2 py-1 bg-white/10 rounded-full">
                          #{tag}
                        </span>
                      ))}
                    </div>

                    <div className="text-sm text-gray-400">
                      📊 {asset.usedIn}
                    </div>
                  </div>
                ))}
              </div>
            )}

            {filteredAssets.length === 0 && (
              <div className="text-center py-20">
                <div className="text-6xl mb-4">📁</div>
                <p className="text-xl text-gray-400">No assets found</p>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Upload Modal */}
      {showUploadModal && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-6">
          <div className="bg-gradient-to-br from-slate-900 to-purple-900 rounded-3xl border border-white/20 p-8 max-w-2xl w-full">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-3xl font-bold">Upload Media</h2>
              <button
                onClick={() => setShowUploadModal(false)}
                className="text-3xl hover:text-red-400 transition-colors"
              >
                ✕
              </button>
            </div>

            <div className="border-2 border-dashed border-white/20 rounded-2xl p-12 text-center mb-6 hover:border-purple-500/50 transition-colors cursor-pointer">
              <div className="text-6xl mb-4">⬆️</div>
              <p className="text-xl mb-2">Drag and drop files here</p>
              <p className="text-gray-400 mb-4">or click to browse</p>
              <button className="px-6 py-3 bg-white/10 hover:bg-white/20 rounded-xl transition-colors">
                Choose Files
              </button>
            </div>

            <div className="space-y-4">
              <select className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl focus:outline-none focus:border-purple-500/50">
                <option>Select Folder</option>
                {folders.filter(f => f !== 'all').map(f => (
                  <option key={f}>{f}</option>
                ))}
              </select>

              <input
                type="text"
                placeholder="Tags (comma separated)"
                className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl focus:outline-none focus:border-purple-500/50"
              />

              <div className="flex items-center space-x-4">
                <button
                  onClick={handleUpload}
                  className="flex-1 px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl font-bold hover:shadow-lg transition-all"
                >
                  Upload
                </button>
                <button
                  onClick={() => setShowUploadModal(false)}
                  className="px-6 py-3 bg-white/5 hover:bg-white/10 rounded-xl transition-colors"
                >
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

