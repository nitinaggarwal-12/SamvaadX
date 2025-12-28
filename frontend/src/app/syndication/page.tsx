'use client';

import { useState } from 'react';
import Link from 'next/link';

interface SyndicationRule {
  id: string;
  name: string;
  sourcePlatform: string;
  targetPlatforms: string[];
  autoPublish: boolean;
  transformContent: boolean;
  addPrefix: string;
  active: boolean;
}

export default function ContentSyndication() {
  const [rules] = useState<SyndicationRule[]>([
    {
      id: '1',
      name: 'Twitter to All Platforms',
      sourcePlatform: 'Twitter',
      targetPlatforms: ['Facebook', 'LinkedIn'],
      autoPublish: true,
      transformContent: true,
      addPrefix: '📢 ',
      active: true,
    },
    {
      id: '2',
      name: 'LinkedIn Professional Posts',
      sourcePlatform: 'LinkedIn',
      targetPlatforms: ['Twitter', 'Facebook'],
      autoPublish: false,
      transformContent: true,
      addPrefix: '',
      active: true,
    },
  ]);

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
              <Link href="/syndication" className="px-4 py-2 bg-white/10 rounded-lg font-semibold">Syndication</Link>
            </div>
          </div>
        </div>
      </nav>

      <div className="container mx-auto px-6 py-8">
        <div className="mb-8">
          <h1 className="text-5xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent mb-4">
            Cross-Network Content Syndication
          </h1>
          <p className="text-xl text-gray-400">Automatically distribute content across all platforms</p>
        </div>

        <div className="grid md:grid-cols-3 gap-6 mb-8">
          <div className="p-6 bg-white/5 backdrop-blur-lg rounded-2xl border border-white/10">
            <div className="text-sm text-gray-400 mb-2">Active Rules</div>
            <div className="text-3xl font-bold text-green-400">{rules.filter(r => r.active).length}</div>
          </div>
          <div className="p-6 bg-white/5 backdrop-blur-lg rounded-2xl border border-white/10">
            <div className="text-sm text-gray-400 mb-2">Posts Syndicated</div>
            <div className="text-3xl font-bold text-blue-400">234</div>
          </div>
          <div className="p-6 bg-white/5 backdrop-blur-lg rounded-2xl border border-white/10">
            <div className="text-sm text-gray-400 mb-2">Time Saved</div>
            <div className="text-3xl font-bold text-purple-400">48h</div>
          </div>
        </div>

        <div className="space-y-4">
          {rules.map(rule => (
            <div key={rule.id} className="p-6 bg-white/5 backdrop-blur-lg rounded-2xl border border-white/10">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-2xl font-bold">{rule.name}</h3>
                <span className={`px-3 py-1 rounded-full text-xs ${rule.active ? 'bg-green-600/30 text-green-400' : 'bg-gray-600/30 text-gray-400'}`}>
                  {rule.active ? 'ACTIVE' : 'INACTIVE'}
                </span>
              </div>
              
              <div className="grid md:grid-cols-2 gap-4 mb-4">
                <div>
                  <div className="text-sm text-gray-400 mb-2">Source:</div>
                  <span className="px-3 py-1 bg-blue-600/30 rounded">{rule.sourcePlatform}</span>
                </div>
                <div>
                  <div className="text-sm text-gray-400 mb-2">Targets:</div>
                  <div className="flex flex-wrap gap-2">
                    {rule.targetPlatforms.map(p => (
                      <span key={p} className="px-3 py-1 bg-purple-600/30 rounded text-sm">{p}</span>
                    ))}
                  </div>
                </div>
              </div>

              <div className="flex items-center space-x-4 text-sm mb-4">
                <div className={rule.autoPublish ? 'text-green-400' : 'text-gray-500'}>
                  {rule.autoPublish ? '✅' : '❌'} Auto-publish
                </div>
                <div className={rule.transformContent ? 'text-green-400' : 'text-gray-500'}>
                  {rule.transformContent ? '✅' : '❌'} Transform content
                </div>
              </div>

              <div className="flex space-x-2">
                <button className="px-4 py-2 bg-blue-600 hover:bg-blue-700 rounded-lg text-sm">✏️ Edit</button>
                <button className="px-4 py-2 bg-purple-600 hover:bg-purple-700 rounded-lg text-sm">📊 View Stats</button>
                <button className="px-4 py-2 bg-red-600 hover:bg-red-700 rounded-lg text-sm">🗑️ Delete</button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

