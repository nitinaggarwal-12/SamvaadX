'use client';

import { useState } from 'react';
import Link from 'next/link';

interface ReplyTemplate {
  id: string;
  name: string;
  category: string;
  content: string;
  tags: string[];
  usageCount: number;
  lastUsed: string;
}

export default function SavedReplies() {
  const [templates, setTemplates] = useState<ReplyTemplate[]>([
    {
      id: '1',
      name: 'Thank You for Interest',
      category: 'Appreciation',
      content: 'Thank you so much for your interest in CSPOC 2026! We truly appreciate your support and enthusiasm. 🙏',
      tags: ['thank-you', 'appreciation', 'engagement'],
      usageCount: 145,
      lastUsed: '2 hours ago',
    },
    {
      id: '2',
      name: 'Event Registration Info',
      category: 'Information',
      content: 'Registration for CSPOC 2026 opens on March 1st, 2025. Visit our official website for details: https://cspoc2026.gov.in/register',
      tags: ['registration', 'information', 'event'],
      usageCount: 98,
      lastUsed: '5 hours ago',
    },
    {
      id: '3',
      name: 'Delegate Inquiry Response',
      category: 'Formal',
      content: 'Dear {NAME}, Thank you for your inquiry regarding delegate participation. Our team will contact you within 24 hours with detailed information. Best regards, CSPOC 2026 Team',
      tags: ['delegate', 'formal', 'inquiry'],
      usageCount: 67,
      lastUsed: '1 day ago',
    },
    {
      id: '4',
      name: 'Media Request Acknowledgment',
      category: 'Media',
      content: 'We have received your media accreditation request. Our communications team will review and respond within 48 hours. For urgent queries: media@cspoc2026.gov.in',
      tags: ['media', 'press', 'accreditation'],
      usageCount: 34,
      lastUsed: '2 days ago',
    },
    {
      id: '5',
      name: 'General Support',
      category: 'Support',
      content: 'Hello! Our support team is here to assist you. For immediate help, please email support@cspoc2026.gov.in or call our helpline at +91-11-XXXX-XXXX.',
      tags: ['support', 'help', 'contact'],
      usageCount: 89,
      lastUsed: '3 hours ago',
    },
  ]);

  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [showAddForm, setShowAddForm] = useState(false);

  const categories = ['all', ...Array.from(new Set(templates.map(t => t.category)))];

  const filteredTemplates = templates.filter(template => {
    const matchesSearch = template.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         template.content.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         template.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()));
    const matchesCategory = selectedCategory === 'all' || template.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const totalUsage = templates.reduce((sum, t) => sum + t.usageCount, 0);

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
              <Link href="/inbox" className="px-4 py-2 hover:bg-white/10 rounded-lg">Inbox</Link>
              <Link href="/saved-replies" className="px-4 py-2 bg-white/10 rounded-lg font-semibold">Saved Replies</Link>
            </div>
          </div>
        </div>
      </nav>

      <div className="container mx-auto px-6 py-8">
        <div className="mb-8 flex items-center justify-between">
          <div>
            <h1 className="text-5xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent mb-4">
              Saved Reply Templates
            </h1>
            <p className="text-xl text-gray-400">Quick responses for common interactions</p>
          </div>
          <button
            onClick={() => setShowAddForm(!showAddForm)}
            className="px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg font-semibold hover:shadow-lg"
          >
            ➕ New Template
          </button>
        </div>

        <div className="grid grid-cols-3 gap-6 mb-8">
          <div className="p-6 bg-white/5 backdrop-blur-lg rounded-2xl border border-white/10">
            <div className="text-sm text-gray-400 mb-2">Total Templates</div>
            <div className="text-3xl font-bold text-blue-400">{templates.length}</div>
          </div>
          <div className="p-6 bg-white/5 backdrop-blur-lg rounded-2xl border border-white/10">
            <div className="text-sm text-gray-400 mb-2">Total Usage</div>
            <div className="text-3xl font-bold text-purple-400">{totalUsage}</div>
          </div>
          <div className="p-6 bg-white/5 backdrop-blur-lg rounded-2xl border border-white/10">
            <div className="text-sm text-gray-400 mb-2">Avg per Template</div>
            <div className="text-3xl font-bold text-green-400">{Math.round(totalUsage / templates.length)}</div>
          </div>
        </div>

        {showAddForm && (
          <div className="mb-8 p-6 bg-white/5 backdrop-blur-lg rounded-2xl border border-white/10">
            <h2 className="text-2xl font-bold mb-4">Create New Template</h2>
            <div className="space-y-4">
              <div>
                <label className="block text-sm text-gray-400 mb-2">Template Name</label>
                <input
                  type="text"
                  className="w-full px-4 py-2 bg-black/30 border border-white/10 rounded-lg"
                  placeholder="e.g., VIP Welcome Message"
                />
              </div>
              <div>
                <label className="block text-sm text-gray-400 mb-2">Category</label>
                <select className="w-full px-4 py-2 bg-black/30 border border-white/10 rounded-lg">
                  <option>Appreciation</option>
                  <option>Information</option>
                  <option>Formal</option>
                  <option>Media</option>
                  <option>Support</option>
                </select>
              </div>
              <div>
                <label className="block text-sm text-gray-400 mb-2">Template Content</label>
                <textarea
                  className="w-full px-4 py-2 bg-black/30 border border-white/10 rounded-lg h-32"
                  placeholder="Use {NAME}, {EMAIL}, {DATE} for dynamic fields..."
                />
              </div>
              <div>
                <label className="block text-sm text-gray-400 mb-2">Tags (comma separated)</label>
                <input
                  type="text"
                  className="w-full px-4 py-2 bg-black/30 border border-white/10 rounded-lg"
                  placeholder="e.g., welcome, vip, formal"
                />
              </div>
              <div className="flex space-x-3">
                <button className="px-6 py-2 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg font-semibold">
                  💾 Save Template
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

        <div className="mb-6 flex items-center space-x-4">
          <input
            type="text"
            className="flex-1 px-4 py-2 bg-white/5 border border-white/10 rounded-lg"
            placeholder="🔍 Search templates, tags, or content..."
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

        <div className="space-y-4">
          {filteredTemplates.map(template => (
            <div key={template.id} className="p-6 bg-white/5 backdrop-blur-lg rounded-2xl border border-white/10">
              <div className="flex items-start justify-between mb-4">
                <div className="flex-1">
                  <div className="flex items-center space-x-3 mb-2">
                    <h3 className="text-xl font-bold">{template.name}</h3>
                    <span className="px-3 py-1 bg-purple-600/30 text-purple-400 rounded-full text-xs">
                      {template.category}
                    </span>
                  </div>
                  <div className="p-4 bg-black/30 rounded-lg mb-3">
                    <p className="text-gray-300">{template.content}</p>
                  </div>
                  <div className="flex items-center space-x-2 mb-2">
                    {template.tags.map(tag => (
                      <span key={tag} className="text-xs px-2 py-1 bg-blue-600/30 text-blue-400 rounded">
                        #{tag}
                      </span>
                    ))}
                  </div>
                  <div className="text-sm text-gray-400">
                    Used {template.usageCount} times · Last used {template.lastUsed}
                  </div>
                </div>
              </div>
              <div className="flex space-x-2">
                <button className="px-4 py-2 bg-green-600 hover:bg-green-700 rounded-lg text-sm font-semibold">
                  📋 Copy
                </button>
                <button className="px-4 py-2 bg-blue-600 hover:bg-blue-700 rounded-lg text-sm">
                  ✏️ Edit
                </button>
                <button className="px-4 py-2 bg-purple-600 hover:bg-purple-700 rounded-lg text-sm">
                  📤 Use Now
                </button>
                <button className="px-4 py-2 bg-red-600 hover:bg-red-700 rounded-lg text-sm">
                  🗑️ Delete
                </button>
              </div>
            </div>
          ))}
        </div>

        {filteredTemplates.length === 0 && (
          <div className="text-center py-12 text-gray-400">
            <div className="text-6xl mb-4">📭</div>
            <p className="text-xl">No templates found matching your search</p>
          </div>
        )}
      </div>
    </div>
  );
}

