'use client';

import { useState } from 'react';
import Link from 'next/link';

interface CampaignTemplate {
  id: string;
  name: string;
  category: string;
  description: string;
  duration: string;
  postsCount: number;
  platforms: string[];
  tags: string[];
  usageCount: number;
  thumbnail: string;
}

export default function CampaignTemplates() {
  const [templates] = useState<CampaignTemplate[]>([
    {
      id: '1',
      name: 'International Event Launch',
      category: 'Event Marketing',
      description: 'Complete campaign template for launching major international events. Includes pre-event buzz, countdown posts, live coverage, and post-event engagement.',
      duration: '4 weeks',
      postsCount: 28,
      platforms: ['Twitter', 'Facebook', 'LinkedIn', 'Instagram'],
      tags: ['event', 'international', 'government'],
      usageCount: 145,
      thumbnail: '🌍',
    },
    {
      id: '2',
      name: 'Parliamentary Session Awareness',
      category: 'Government Communication',
      description: 'Raise awareness about parliamentary sessions with daily highlights, key discussions, and legislative updates.',
      duration: '2 weeks',
      postsCount: 14,
      platforms: ['Twitter', 'Facebook', 'LinkedIn'],
      tags: ['parliament', 'legislation', 'civic'],
      usageCount: 98,
      thumbnail: '🏛️',
    },
    {
      id: '3',
      name: 'Policy Announcement Campaign',
      category: 'Policy Communication',
      description: 'Structured rollout for major policy announcements with explainer content, infographics, and Q&A sessions.',
      duration: '1 week',
      postsCount: 10,
      platforms: ['Twitter', 'Facebook', 'LinkedIn', 'YouTube'],
      tags: ['policy', 'announcement', 'explainer'],
      usageCount: 234,
      thumbnail: '📜',
    },
    {
      id: '4',
      name: 'Youth Engagement Initiative',
      category: 'Outreach',
      description: 'Connect with younger demographics through interactive content, polls, Q&A sessions, and behind-the-scenes glimpses.',
      duration: '3 weeks',
      postsCount: 21,
      platforms: ['Instagram', 'Twitter', 'YouTube'],
      tags: ['youth', 'engagement', 'interactive'],
      usageCount: 176,
      thumbnail: '🎓',
    },
    {
      id: '5',
      name: 'Diplomatic Visit Coverage',
      category: 'International Relations',
      description: 'Comprehensive coverage template for state visits and diplomatic engagements with live updates and photo galleries.',
      duration: '3 days',
      postsCount: 15,
      platforms: ['Twitter', 'Facebook', 'Instagram', 'LinkedIn'],
      tags: ['diplomacy', 'visit', 'international'],
      usageCount: 89,
      thumbnail: '🤝',
    },
    {
      id: '6',
      name: 'Heritage & Culture Celebration',
      category: 'Cultural',
      description: 'Celebrate national heritage, important anniversaries, and cultural milestones with rich media content.',
      duration: '1 week',
      postsCount: 12,
      platforms: ['Instagram', 'Facebook', 'Twitter'],
      tags: ['heritage', 'culture', 'celebration'],
      usageCount: 134,
      thumbnail: '🎨',
    },
  ]);

  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [searchTerm, setSearchTerm] = useState('');

  const categories = ['all', ...Array.from(new Set(templates.map(t => t.category)))];

  const filteredTemplates = templates.filter(template => {
    const matchesSearch = template.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         template.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         template.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()));
    const matchesCategory = selectedCategory === 'all' || template.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

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
              <Link href="/campaigns" className="px-4 py-2 hover:bg-white/10 rounded-lg">Campaigns</Link>
              <Link href="/campaign-templates" className="px-4 py-2 bg-white/10 rounded-lg font-semibold">Templates</Link>
            </div>
          </div>
        </div>
      </nav>

      <div className="container mx-auto px-6 py-8">
        <div className="mb-8">
          <h1 className="text-5xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent mb-4">
            Campaign Templates Library
          </h1>
          <p className="text-xl text-gray-400">Ready-to-use campaign blueprints for government communication</p>
        </div>

        <div className="grid grid-cols-3 gap-6 mb-8">
          <div className="p-6 bg-white/5 backdrop-blur-lg rounded-2xl border border-white/10">
            <div className="text-sm text-gray-400 mb-2">Total Templates</div>
            <div className="text-3xl font-bold text-blue-400">{templates.length}</div>
          </div>
          <div className="p-6 bg-white/5 backdrop-blur-lg rounded-2xl border border-white/10">
            <div className="text-sm text-gray-400 mb-2">Total Usage</div>
            <div className="text-3xl font-bold text-green-400">
              {templates.reduce((sum, t) => sum + t.usageCount, 0)}
            </div>
          </div>
          <div className="p-6 bg-white/5 backdrop-blur-lg rounded-2xl border border-white/10">
            <div className="text-sm text-gray-400 mb-2">Categories</div>
            <div className="text-3xl font-bold text-purple-400">{categories.length - 1}</div>
          </div>
        </div>

        <div className="mb-6 flex items-center space-x-4">
          <input
            type="text"
            className="flex-1 px-4 py-2 bg-white/5 border border-white/10 rounded-lg"
            placeholder="🔍 Search templates..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <select
            className="px-4 py-2 bg-white/5 border border-white/10 rounded-lg"
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
          >
            {categories.map(cat => (
              <option key={cat} value={cat}>
                {cat === 'all' ? 'All Categories' : cat}
              </option>
            ))}
          </select>
        </div>

        <div className="grid lg:grid-cols-2 gap-6">
          {filteredTemplates.map(template => (
            <div key={template.id} className="p-6 bg-white/5 backdrop-blur-lg rounded-2xl border border-white/10 hover:border-blue-500/50 transition-all">
              <div className="flex items-start space-x-4">
                <div className="w-20 h-20 bg-gradient-to-br from-blue-600 to-purple-600 rounded-2xl flex items-center justify-center text-4xl flex-shrink-0">
                  {template.thumbnail}
                </div>
                <div className="flex-1">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="text-xl font-bold">{template.name}</h3>
                    <span className="text-xs px-2 py-1 bg-purple-600/30 rounded">
                      {template.category}
                    </span>
                  </div>
                  <p className="text-sm text-gray-400 mb-3">{template.description}</p>
                  
                  <div className="grid grid-cols-2 gap-3 mb-3">
                    <div className="p-2 bg-black/30 rounded text-center">
                      <div className="text-xs text-gray-400">Duration</div>
                      <div className="font-bold text-blue-400">{template.duration}</div>
                    </div>
                    <div className="p-2 bg-black/30 rounded text-center">
                      <div className="text-xs text-gray-400">Posts</div>
                      <div className="font-bold text-green-400">{template.postsCount}</div>
                    </div>
                  </div>

                  <div className="mb-3">
                    <div className="text-xs text-gray-400 mb-1">Platforms:</div>
                    <div className="flex flex-wrap gap-2">
                      {template.platforms.map(platform => (
                        <span key={platform} className="text-xs px-2 py-1 bg-blue-600/30 rounded">
                          {platform}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="mb-3">
                    <div className="text-xs text-gray-400 mb-1">Tags:</div>
                    <div className="flex flex-wrap gap-2">
                      {template.tags.map(tag => (
                        <span key={tag} className="text-xs px-2 py-1 bg-purple-600/20 text-purple-300 rounded">
                          #{tag}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="text-xs text-gray-500 mb-3">
                    Used {template.usageCount} times
                  </div>

                  <div className="flex space-x-2">
                    <button className="flex-1 px-4 py-2 bg-gradient-to-r from-blue-600 to-purple-600 hover:shadow-lg rounded-lg font-semibold transition-all">
                      🚀 Use Template
                    </button>
                    <button className="px-4 py-2 bg-white/10 hover:bg-white/20 rounded-lg">
                      👁️
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {filteredTemplates.length === 0 && (
          <div className="text-center py-12 text-gray-400">
            <div className="text-6xl mb-4">📭</div>
            <p className="text-xl">No templates found matching your criteria</p>
          </div>
        )}
      </div>
    </div>
  );
}

