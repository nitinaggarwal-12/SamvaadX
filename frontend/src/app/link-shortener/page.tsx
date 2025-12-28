'use client';

import { useState } from 'react';
import Link from 'next/link';

interface ShortenedLink {
  id: string;
  originalUrl: string;
  shortCode: string;
  shortUrl: string;
  title: string;
  clicks: number;
  uniqueClicks: number;
  createdAt: string;
  campaign?: string;
}

export default function LinkShortener() {
  const [links, setLinks] = useState<ShortenedLink[]>([
    {
      id: '1',
      originalUrl: 'https://parliament.gov.in/cspoc2026/registration',
      shortCode: 'cspoc-reg',
      shortUrl: 'guddu.link/cspoc-reg',
      title: 'CSPOC 2026 Registration',
      clicks: 1245,
      uniqueClicks: 892,
      createdAt: '2025-12-15',
      campaign: 'CSPOC Main',
    },
    {
      id: '2',
      originalUrl: 'https://parliament.gov.in/cspoc2026/speakers',
      shortCode: 'speakers',
      shortUrl: 'guddu.link/speakers',
      title: 'Keynote Speakers',
      clicks: 856,
      uniqueClicks: 634,
      createdAt: '2025-12-18',
      campaign: 'CSPOC Main',
    },
    {
      id: '3',
      originalUrl: 'https://parliament.gov.in/cspoc2026/venue',
      shortCode: 'venue',
      shortUrl: 'guddu.link/venue',
      title: 'Event Venue Info',
      clicks: 523,
      uniqueClicks: 412,
      createdAt: '2025-12-20',
    },
  ]);

  const [originalUrl, setOriginalUrl] = useState('');
  const [customCode, setCustomCode] = useState('');
  const [linkTitle, setLinkTitle] = useState('');
  const [showCreateModal, setShowCreateModal] = useState(false);

  const handleCreate = () => {
    if (!originalUrl) {
      alert('Please enter a URL');
      return;
    }

    const code = customCode || Math.random().toString(36).substring(2, 8);
    const newLink: ShortenedLink = {
      id: Date.now().toString(),
      originalUrl,
      shortCode: code,
      shortUrl: `guddu.link/${code}`,
      title: linkTitle || 'Untitled Link',
      clicks: 0,
      uniqueClicks: 0,
      createdAt: new Date().toISOString().split('T')[0],
    };

    setLinks(prev => [newLink, ...prev]);
    setOriginalUrl('');
    setCustomCode('');
    setLinkTitle('');
    setShowCreateModal(false);
    alert(`✅ Link shortened!\n\n${newLink.shortUrl}\n\nCopied to clipboard!`);
    navigator.clipboard.writeText(newLink.shortUrl);
  };

  const handleCopy = (url: string) => {
    navigator.clipboard.writeText(url);
    alert('✅ Copied to clipboard!');
  };

  const handleDelete = (id: string) => {
    if (confirm('Delete this shortened link?')) {
      setLinks(prev => prev.filter(l => l.id !== id));
    }
  };

  const totalClicks = links.reduce((sum, link) => sum + link.clicks, 0);
  const totalUnique = links.reduce((sum, link) => sum + link.uniqueClicks, 0);

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
              <Link href="/link-shortener" className="px-4 py-2 bg-white/10 rounded-lg font-semibold">Links</Link>
            </div>
          </div>
        </div>
      </nav>

      <div className="container mx-auto px-6 py-8">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-5xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent mb-4">
              Link Shortener
            </h1>
            <p className="text-xl text-gray-400">Track clicks and optimize your links</p>
          </div>
          <button
            onClick={() => setShowCreateModal(true)}
            className="px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl font-bold hover:shadow-lg transition-all"
          >
            + Shorten URL
          </button>
        </div>

        <div className="grid grid-cols-3 gap-6 mb-8">
          <div className="p-6 bg-white/5 backdrop-blur-lg rounded-2xl border border-white/10">
            <div className="text-4xl font-bold text-blue-400">{links.length}</div>
            <div className="text-gray-400">Total Links</div>
          </div>
          <div className="p-6 bg-white/5 backdrop-blur-lg rounded-2xl border border-white/10">
            <div className="text-4xl font-bold text-green-400">{totalClicks.toLocaleString()}</div>
            <div className="text-gray-400">Total Clicks</div>
          </div>
          <div className="p-6 bg-white/5 backdrop-blur-lg rounded-2xl border border-white/10">
            <div className="text-4xl font-bold text-purple-400">{totalUnique.toLocaleString()}</div>
            <div className="text-gray-400">Unique Visitors</div>
          </div>
        </div>

        <div className="grid lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 space-y-4">
            {links.map(link => (
              <div key={link.id} className="p-6 bg-white/5 backdrop-blur-lg rounded-2xl border border-white/10">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex-1">
                    <h3 className="text-xl font-bold mb-2">{link.title}</h3>
                    {link.campaign && (
                      <span className="text-xs px-2 py-1 bg-purple-600/30 rounded-full">{link.campaign}</span>
                    )}
                  </div>
                  <div className="text-right">
                    <div className="text-2xl font-bold text-green-400">{link.clicks}</div>
                    <div className="text-xs text-gray-400">clicks</div>
                  </div>
                </div>

                <div className="mb-4 p-3 bg-black/30 rounded-lg">
                  <div className="flex items-center justify-between mb-2">
                    <div className="text-sm text-gray-400">Short URL</div>
                    <button
                      onClick={() => handleCopy(link.shortUrl)}
                      className="text-xs px-3 py-1 bg-blue-600/30 hover:bg-blue-600/50 rounded transition-colors"
                    >
                      Copy
                    </button>
                  </div>
                  <div className="font-mono text-blue-400">{link.shortUrl}</div>
                </div>

                <div className="mb-4 p-3 bg-black/20 rounded-lg">
                  <div className="text-sm text-gray-400 mb-1">Original URL</div>
                  <div className="font-mono text-sm text-gray-300 truncate">{link.originalUrl}</div>
                </div>

                <div className="flex items-center justify-between text-sm">
                  <div className="text-gray-400">
                    {link.uniqueClicks} unique · Created {link.createdAt}
                  </div>
                  <div className="flex items-center space-x-2">
                    <button className="px-3 py-1 bg-green-600/30 hover:bg-green-600/50 rounded transition-colors">
                      📊 Stats
                    </button>
                    <button
                      onClick={() => handleDelete(link.id)}
                      className="px-3 py-1 bg-red-600/30 hover:bg-red-600/50 rounded transition-colors"
                    >
                      🗑️
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="space-y-6">
            <div className="bg-gradient-to-br from-blue-900/30 to-purple-900/30 backdrop-blur-lg rounded-3xl border border-white/10 p-6">
              <h3 className="text-xl font-bold mb-4">Top Performing</h3>
              <div className="space-y-3">
                {links.slice(0, 3).map((link, i) => (
                  <div key={link.id} className="p-3 bg-white/5 rounded-lg">
                    <div className="flex items-center justify-between mb-1">
                      <span className="font-semibold text-sm truncate">{link.title}</span>
                    </div>
                    <div className="text-xs text-gray-400">{link.clicks} clicks</div>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-white/5 backdrop-blur-lg rounded-3xl border border-white/10 p-6">
              <h3 className="text-xl font-bold mb-4">Features</h3>
              <div className="space-y-2 text-sm text-gray-400">
                <div>✅ Custom short codes</div>
                <div>✅ Click tracking</div>
                <div>✅ Geographic data</div>
                <div>✅ Device analytics</div>
                <div>✅ Campaign grouping</div>
                <div>✅ QR code generation</div>
              </div>
            </div>

            <div className="bg-white/5 backdrop-blur-lg rounded-3xl border border-white/10 p-6">
              <h3 className="text-xl font-bold mb-4">Tips</h3>
              <div className="space-y-2 text-sm text-gray-400">
                <div>💡 Use branded short domains</div>
                <div>💡 Create memorable codes</div>
                <div>💡 Track campaign performance</div>
                <div>💡 Update links without changing URLs</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {showCreateModal && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-6">
          <div className="bg-gradient-to-br from-slate-900 to-purple-900 rounded-3xl border border-white/20 p-8 max-w-2xl w-full">
            <h2 className="text-3xl font-bold mb-6">Shorten URL</h2>
            <div className="space-y-4">
              <input
                type="text"
                value={originalUrl}
                onChange={(e) => setOriginalUrl(e.target.value)}
                placeholder="https://example.com/very-long-url..."
                className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl focus:outline-none focus:border-purple-500/50"
              />
              <input
                type="text"
                value={linkTitle}
                onChange={(e) => setLinkTitle(e.target.value)}
                placeholder="Link title (optional)..."
                className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl focus:outline-none focus:border-purple-500/50"
              />
              <div className="flex items-center space-x-2">
                <span className="text-gray-400">guddu.link/</span>
                <input
                  type="text"
                  value={customCode}
                  onChange={(e) => setCustomCode(e.target.value)}
                  placeholder="custom-code (optional)"
                  className="flex-1 px-4 py-3 bg-white/5 border border-white/10 rounded-xl focus:outline-none focus:border-purple-500/50"
                />
              </div>
              <div className="flex space-x-4">
                <button onClick={handleCreate} className="flex-1 px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl font-bold">
                  Shorten
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

