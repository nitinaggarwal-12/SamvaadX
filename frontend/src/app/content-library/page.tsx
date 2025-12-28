'use client';

import { useState } from 'react';
import Link from 'next/link';

interface ContentItem {
  id: string;
  type: 'post' | 'image' | 'video' | 'template';
  title: string;
  category: string;
  tags: string[];
  uses: number;
  lastUsed: string;
  thumbnail: string;
  size?: string;
}

export default function ContentLibrary() {
  const [items] = useState<ContentItem[]>([
    {
      id: '1',
      type: 'post',
      title: 'Weekly Update Template',
      category: 'Templates',
      tags: ['weekly', 'update', 'engagement'],
      uses: 45,
      lastUsed: '2 days ago',
      thumbnail: '/content-1.jpg',
    },
    {
      id: '2',
      type: 'image',
      title: 'CSPOC Logo Suite',
      category: 'Branding',
      tags: ['logo', 'branding', 'official'],
      uses: 128,
      lastUsed: '1 hour ago',
      thumbnail: '/content-2.jpg',
      size: '2.4 MB',
    },
    {
      id: '3',
      type: 'video',
      title: 'Event Promo Video',
      category: 'Video Assets',
      tags: ['promo', 'video', 'event'],
      uses: 23,
      lastUsed: 'Yesterday',
      thumbnail: '/content-3.jpg',
      size: '45 MB',
    },
    {
      id: '4',
      type: 'template',
      title: 'Speaker Announcement Design',
      category: 'Design Templates',
      tags: ['speaker', 'announcement', 'design'],
      uses: 67,
      lastUsed: '3 hours ago',
      thumbnail: '/content-4.jpg',
    },
  ]);

  const [filterType, setFilterType] = useState<string>('all');
  const [filterCategory, setFilterCategory] = useState<string>('all');

  const categories = ['All', 'Templates', 'Branding', 'Video Assets', 'Design Templates', 'Social Graphics'];

  const filteredItems = items.filter(item => {
    const typeMatch = filterType === 'all' || item.type === filterType;
    const categoryMatch = filterCategory === 'all' || item.category === filterCategory;
    return typeMatch && categoryMatch;
  });

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'post': return '📝';
      case 'image': return '🖼️';
      case 'video': return '🎬';
      case 'template': return '📋';
      default: return '📄';
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
              <Link href="/media-library" className="px-4 py-2 hover:bg-white/10 rounded-lg">Media</Link>
              <Link href="/content-library" className="px-4 py-2 bg-white/10 rounded-lg font-semibold">Content Library</Link>
            </div>
          </div>
        </div>
      </nav>

      <div className="container mx-auto px-6 py-8">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-5xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent mb-4">
              Content Library & Asset Hub
            </h1>
            <p className="text-xl text-gray-400">Organize and reuse your best-performing content</p>
          </div>
          <button className="px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl font-bold hover:shadow-lg transition-all">
            + Add Content
          </button>
        </div>

        <div className="flex items-center space-x-4 mb-8">
          <div className="flex items-center space-x-2">
            <span className="text-sm text-gray-400">Type:</span>
            {['all', 'post', 'image', 'video', 'template'].map(type => (
              <button
                key={type}
                onClick={() => setFilterType(type)}
                className={`px-4 py-2 rounded-lg capitalize transition-colors ${
                  filterType === type ? 'bg-purple-600' : 'bg-white/5 hover:bg-white/10'
                }`}
              >
                {type}
              </button>
            ))}
          </div>
          <div className="flex items-center space-x-2">
            <span className="text-sm text-gray-400">Category:</span>
            <select
              value={filterCategory}
              onChange={(e) => setFilterCategory(e.target.value)}
              className="px-4 py-2 bg-white/5 border border-white/10 rounded-lg focus:outline-none focus:border-purple-500/50"
            >
              {categories.map(cat => (
                <option key={cat} value={cat.toLowerCase()}>{cat}</option>
              ))}
            </select>
          </div>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredItems.map(item => (
            <div key={item.id} className="bg-white/5 backdrop-blur-lg rounded-2xl border border-white/10 overflow-hidden group hover:border-purple-500/50 transition-all">
              <div className="aspect-video bg-gradient-to-br from-slate-800 to-purple-900 flex items-center justify-center text-6xl relative">
                {getTypeIcon(item.type)}
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/50 transition-all flex items-center justify-center opacity-0 group-hover:opacity-100">
                  <button className="px-4 py-2 bg-white/20 backdrop-blur-sm rounded-lg font-bold">
                    Use
                  </button>
                </div>
              </div>

              <div className="p-4">
                <div className="flex items-start justify-between mb-2">
                  <h3 className="font-bold text-sm">{item.title}</h3>
                  <span className="text-xs px-2 py-1 bg-purple-600/30 rounded capitalize">
                    {item.type}
                  </span>
                </div>

                <div className="text-xs text-gray-400 mb-3">{item.category}</div>

                <div className="flex flex-wrap gap-1 mb-3">
                  {item.tags.map((tag, i) => (
                    <span key={i} className="text-xs px-2 py-1 bg-white/10 rounded">
                      #{tag}
                    </span>
                  ))}
                </div>

                <div className="flex items-center justify-between text-xs text-gray-400 mb-3">
                  <span>Used {item.uses} times</span>
                  {item.size && <span>{item.size}</span>}
                </div>

                <div className="text-xs text-gray-400 mb-3">Last used: {item.lastUsed}</div>

                <div className="grid grid-cols-2 gap-2">
                  <button className="px-3 py-2 bg-blue-600/30 hover:bg-blue-600/50 rounded-lg transition-colors text-xs">
                    Use
                  </button>
                  <button className="px-3 py-2 bg-white/10 hover:bg-white/20 rounded-lg transition-colors text-xs">
                    Edit
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

