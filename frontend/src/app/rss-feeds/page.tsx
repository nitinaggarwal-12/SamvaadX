'use client';

import { useState } from 'react';
import Link from 'next/link';

interface RSSFeed {
  id: string;
  name: string;
  url: string;
  category: string;
  active: boolean;
  lastFetched: string;
  itemsCount: number;
  autoPost: boolean;
}

interface FeedItem {
  id: string;
  feedName: string;
  title: string;
  description: string;
  link: string;
  pubDate: string;
  image?: string;
  imported: boolean;
}

export default function RSSFeeds() {
  const [feeds, setFeeds] = useState<RSSFeed[]>([
    {
      id: '1',
      name: 'Parliamentary News India',
      url: 'https://parliament.gov.in/rss/news.xml',
      category: 'News',
      active: true,
      lastFetched: '5 min ago',
      itemsCount: 234,
      autoPost: false,
    },
    {
      id: '2',
      name: 'Commonwealth Updates',
      url: 'https://thecommonwealth.org/rss/updates.xml',
      category: 'Updates',
      active: true,
      lastFetched: '10 min ago',
      itemsCount: 156,
      autoPost: false,
    },
    {
      id: '3',
      name: 'Democratic Governance Blog',
      url: 'https://democraticgovernance.org/feed',
      category: 'Blog',
      active: false,
      lastFetched: '2 hours ago',
      itemsCount: 89,
      autoPost: false,
    },
  ]);

  const [feedItems] = useState<FeedItem[]>([
    {
      id: '1',
      feedName: 'Parliamentary News India',
      title: 'New Parliamentary Session Begins with Focus on Digital Democracy',
      description: 'The winter session of Parliament commenced today with a special emphasis on digital transformation and e-governance initiatives...',
      link: 'https://parliament.gov.in/news/123',
      pubDate: '2 hours ago',
      imported: false,
    },
    {
      id: '2',
      feedName: 'Commonwealth Updates',
      title: 'Commonwealth Speakers to Discuss Climate Action at CSPOC 2026',
      description: 'Climate change and environmental sustainability will be key agenda items at the upcoming conference...',
      link: 'https://thecommonwealth.org/updates/456',
      pubDate: '4 hours ago',
      imported: false,
    },
    {
      id: '3',
      feedName: 'Parliamentary News India',
      title: 'Parliament Approves New Digital Infrastructure Bill',
      description: 'The Lok Sabha passed landmark legislation aimed at strengthening India\'s digital infrastructure...',
      link: 'https://parliament.gov.in/news/124',
      pubDate: '6 hours ago',
      imported: true,
    },
  ]);

  const [showAddForm, setShowAddForm] = useState(false);

  const toggleFeed = (id: string) => {
    setFeeds(feeds.map(f => f.id === id ? {...f, active: !f.active} : f));
  };

  const activeFeeds = feeds.filter(f => f.active).length;
  const totalItems = feeds.reduce((sum, f) => sum + f.itemsCount, 0);

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
              <Link href="/rss-feeds" className="px-4 py-2 bg-white/10 rounded-lg font-semibold">RSS Feeds</Link>
            </div>
          </div>
        </div>
      </nav>

      <div className="container mx-auto px-6 py-8">
        <div className="mb-8 flex items-center justify-between">
          <div>
            <h1 className="text-5xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent mb-4">
              RSS Feed Importer
            </h1>
            <p className="text-xl text-gray-400">Import and curate content from trusted sources</p>
          </div>
          <button
            onClick={() => setShowAddForm(!showAddForm)}
            className="px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg font-semibold hover:shadow-lg"
          >
            ➕ Add Feed
          </button>
        </div>

        <div className="grid grid-cols-3 gap-6 mb-8">
          <div className="p-6 bg-white/5 backdrop-blur-lg rounded-2xl border border-white/10">
            <div className="text-sm text-gray-400 mb-2">Active Feeds</div>
            <div className="text-3xl font-bold text-green-400">{activeFeeds}/{feeds.length}</div>
          </div>
          <div className="p-6 bg-white/5 backdrop-blur-lg rounded-2xl border border-white/10">
            <div className="text-sm text-gray-400 mb-2">Total Items</div>
            <div className="text-3xl font-bold text-blue-400">{totalItems}</div>
          </div>
          <div className="p-6 bg-white/5 backdrop-blur-lg rounded-2xl border border-white/10">
            <div className="text-sm text-gray-400 mb-2">Items Today</div>
            <div className="text-3xl font-bold text-purple-400">12</div>
          </div>
        </div>

        {showAddForm && (
          <div className="mb-8 p-6 bg-white/5 backdrop-blur-lg rounded-2xl border border-white/10">
            <h2 className="text-2xl font-bold mb-4">Add New RSS Feed</h2>
            <div className="space-y-4">
              <div>
                <label className="block text-sm text-gray-400 mb-2">Feed Name</label>
                <input
                  type="text"
                  className="w-full px-4 py-2 bg-black/30 border border-white/10 rounded-lg"
                  placeholder="e.g., BBC World News"
                />
              </div>
              <div>
                <label className="block text-sm text-gray-400 mb-2">RSS Feed URL</label>
                <input
                  type="url"
                  className="w-full px-4 py-2 bg-black/30 border border-white/10 rounded-lg"
                  placeholder="https://example.com/rss/feed.xml"
                />
              </div>
              <div>
                <label className="block text-sm text-gray-400 mb-2">Category</label>
                <select className="w-full px-4 py-2 bg-black/30 border border-white/10 rounded-lg">
                  <option>News</option>
                  <option>Updates</option>
                  <option>Blog</option>
                  <option>Press Release</option>
                </select>
              </div>
              <div className="flex items-center space-x-2">
                <input type="checkbox" id="autoPost" />
                <label htmlFor="autoPost" className="text-sm">Auto-publish imported items</label>
              </div>
              <div className="flex space-x-3">
                <button className="px-6 py-2 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg font-semibold">
                  💾 Add Feed
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

        <div className="grid lg:grid-cols-3 gap-6">
          <div>
            <h2 className="text-2xl font-bold mb-4">📡 Your Feeds</h2>
            <div className="space-y-3">
              {feeds.map(feed => (
                <div key={feed.id} className="p-4 bg-white/5 backdrop-blur-lg rounded-2xl border border-white/10">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="font-bold">{feed.name}</h3>
                    <button
                      onClick={() => toggleFeed(feed.id)}
                      className={`px-2 py-1 rounded text-xs ${
                        feed.active ? 'bg-green-600/30 text-green-400' : 'bg-gray-600/30 text-gray-400'
                      }`}
                    >
                      {feed.active ? 'ON' : 'OFF'}
                    </button>
                  </div>
                  <div className="text-xs text-gray-400 mb-2 font-mono truncate">{feed.url}</div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-xs px-2 py-1 bg-purple-600/30 rounded">{feed.category}</span>
                    <span className="text-gray-400">{feed.itemsCount} items</span>
                  </div>
                  <div className="text-xs text-gray-500 mt-2">Last: {feed.lastFetched}</div>
                  <div className="flex space-x-2 mt-3">
                    <button className="flex-1 px-3 py-1 bg-blue-600 hover:bg-blue-700 rounded text-xs">
                      🔄 Refresh
                    </button>
                    <button className="px-3 py-1 bg-red-600 hover:bg-red-700 rounded text-xs">
                      🗑️
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="lg:col-span-2">
            <h2 className="text-2xl font-bold mb-4">📰 Latest Items</h2>
            <div className="space-y-4">
              {feedItems.map(item => (
                <div key={item.id} className="p-5 bg-white/5 backdrop-blur-lg rounded-2xl border border-white/10">
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex-1">
                      <div className="flex items-center space-x-2 mb-2">
                        <h3 className="text-lg font-bold">{item.title}</h3>
                        {item.imported && (
                          <span className="text-xs px-2 py-1 bg-green-600/30 text-green-400 rounded">
                            IMPORTED
                          </span>
                        )}
                      </div>
                      <div className="text-sm text-gray-400 mb-2">{item.feedName} · {item.pubDate}</div>
                      <p className="text-gray-300 mb-3">{item.description}</p>
                      <a
                        href={item.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-sm text-blue-400 hover:underline"
                      >
                        🔗 Read full article →
                      </a>
                    </div>
                  </div>
                  <div className="flex space-x-2">
                    {!item.imported && (
                      <>
                        <button className="px-4 py-2 bg-green-600 hover:bg-green-700 rounded-lg text-sm font-semibold">
                          ⬇️ Import to Drafts
                        </button>
                        <button className="px-4 py-2 bg-blue-600 hover:bg-blue-700 rounded-lg text-sm">
                          📤 Share Now
                        </button>
                      </>
                    )}
                    {item.imported && (
                      <div className="px-4 py-2 bg-green-600/30 text-green-400 rounded-lg text-sm">
                        ✅ Already imported
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

