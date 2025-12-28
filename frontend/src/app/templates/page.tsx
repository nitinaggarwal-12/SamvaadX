'use client';

import { useState } from 'react';
import Link from 'next/link';

interface Template {
  id: string;
  name: string;
  category: 'post' | 'story' | 'reel' | 'banner' | 'infographic';
  platform: string[];
  thumbnail: string;
  dimensions: string;
  style: string;
  uses: number;
  rating: number;
}

export default function TemplateLibrary() {
  const [templates] = useState<Template[]>([
    {
      id: '1',
      name: 'Event Announcement',
      category: 'post',
      platform: ['Facebook', 'Instagram', 'LinkedIn'],
      thumbnail: '/template-1.jpg',
      dimensions: '1080x1080',
      style: 'Professional',
      uses: 234,
      rating: 4.8,
    },
    {
      id: '2',
      name: 'Speaker Spotlight',
      category: 'post',
      platform: ['Instagram', 'Facebook'],
      thumbnail: '/template-2.jpg',
      dimensions: '1080x1080',
      style: 'Modern',
      uses: 189,
      rating: 4.9,
    },
    {
      id: '3',
      name: 'Behind the Scenes Story',
      category: 'story',
      platform: ['Instagram', 'Facebook'],
      thumbnail: '/template-3.jpg',
      dimensions: '1080x1920',
      style: 'Casual',
      uses: 456,
      rating: 4.7,
    },
    {
      id: '4',
      name: 'Countdown Reel',
      category: 'reel',
      platform: ['Instagram', 'YouTube'],
      thumbnail: '/template-4.jpg',
      dimensions: '1080x1920',
      style: 'Energetic',
      uses: 312,
      rating: 4.9,
    },
    {
      id: '5',
      name: 'Stats Infographic',
      category: 'infographic',
      platform: ['LinkedIn', 'Twitter/X'],
      thumbnail: '/template-5.jpg',
      dimensions: '1200x628',
      style: 'Data-Driven',
      uses: 156,
      rating: 4.6,
    },
    {
      id: '6',
      name: 'Event Banner',
      category: 'banner',
      platform: ['Facebook', 'LinkedIn'],
      thumbnail: '/template-6.jpg',
      dimensions: '1920x1080',
      style: 'Premium',
      uses: 287,
      rating: 4.8,
    },
  ]);

  const [filterCategory, setFilterCategory] = useState<string>('all');
  const [selectedTemplate, setSelectedTemplate] = useState<Template | null>(null);

  const filteredTemplates = filterCategory === 'all' 
    ? templates 
    : templates.filter(t => t.category === filterCategory);

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'post': return '📱';
      case 'story': return '📸';
      case 'reel': return '🎬';
      case 'banner': return '🖼️';
      case 'infographic': return '📊';
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
              <Link href="/dashboard" className="px-4 py-2 hover:bg-white/10 rounded-lg">Dashboard</Link>
              <Link href="/templates" className="px-4 py-2 bg-white/10 rounded-lg font-semibold">Templates</Link>
            </div>
          </div>
        </div>
      </nav>

      <div className="container mx-auto px-6 py-8">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-5xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent mb-4">
              Template Library
            </h1>
            <p className="text-xl text-gray-400">Professional designs ready to customize</p>
          </div>
          <button className="px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl font-bold hover:shadow-lg transition-all">
            + Upload Template
          </button>
        </div>

        <div className="flex items-center space-x-3 mb-8">
          <button
            onClick={() => setFilterCategory('all')}
            className={`px-4 py-2 rounded-lg transition-colors ${filterCategory === 'all' ? 'bg-purple-600' : 'bg-white/5 hover:bg-white/10'}`}
          >
            All Templates
          </button>
          {['post', 'story', 'reel', 'banner', 'infographic'].map(category => (
            <button
              key={category}
              onClick={() => setFilterCategory(category)}
              className={`px-4 py-2 rounded-lg transition-colors capitalize ${filterCategory === category ? 'bg-purple-600' : 'bg-white/5 hover:bg-white/10'}`}
            >
              {getCategoryIcon(category)} {category}
            </button>
          ))}
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredTemplates.map(template => (
            <div key={template.id} className="bg-white/5 backdrop-blur-lg rounded-2xl border border-white/10 overflow-hidden group">
              <div 
                className="aspect-square bg-gradient-to-br from-slate-800 to-purple-900 flex items-center justify-center text-8xl cursor-pointer hover:opacity-80 transition-opacity relative"
                onClick={() => setSelectedTemplate(template)}
              >
                {getCategoryIcon(template.category)}
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/50 transition-all flex items-center justify-center opacity-0 group-hover:opacity-100">
                  <button className="px-6 py-3 bg-white/20 backdrop-blur-sm rounded-xl font-bold">
                    Preview Template
                  </button>
                </div>
              </div>

              <div className="p-6">
                <div className="flex items-start justify-between mb-3">
                  <h3 className="font-bold text-lg">{template.name}</h3>
                  <div className="flex items-center space-x-1">
                    <span className="text-yellow-400">⭐</span>
                    <span className="text-sm">{template.rating}</span>
                  </div>
                </div>

                <div className="flex flex-wrap gap-2 mb-4">
                  {template.platform.map((p, i) => (
                    <span key={i} className="text-xs px-2 py-1 bg-blue-600/30 rounded">
                      {p}
                    </span>
                  ))}
                </div>

                <div className="space-y-2 text-sm text-gray-400 mb-4">
                  <div className="flex justify-between">
                    <span>Dimensions</span>
                    <span className="font-semibold">{template.dimensions}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Style</span>
                    <span className="font-semibold">{template.style}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Used</span>
                    <span className="font-semibold">{template.uses} times</span>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-2">
                  <button 
                    onClick={() => setSelectedTemplate(template)}
                    className="px-4 py-2 bg-blue-600/30 hover:bg-blue-600/50 rounded-lg transition-colors"
                  >
                    Use Template
                  </button>
                  <button className="px-4 py-2 bg-white/10 hover:bg-white/20 rounded-lg transition-colors">
                    Customize
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {selectedTemplate && (
        <div className="fixed inset-0 bg-black/90 backdrop-blur-sm z-50 flex items-center justify-center p-6">
          <div className="bg-gradient-to-br from-slate-900 to-purple-900 rounded-3xl border border-white/20 p-8 max-w-4xl w-full">
            <h2 className="text-3xl font-bold mb-6">{selectedTemplate.name}</h2>

            <div className="grid md:grid-cols-2 gap-6 mb-6">
              <div className="aspect-square bg-gradient-to-br from-slate-800 to-purple-900 rounded-2xl flex items-center justify-center text-9xl">
                {getCategoryIcon(selectedTemplate.category)}
              </div>

              <div className="space-y-4">
                <div>
                  <div className="text-sm text-gray-400 mb-1">Category</div>
                  <div className="text-lg capitalize">{selectedTemplate.category}</div>
                </div>
                <div>
                  <div className="text-sm text-gray-400 mb-1">Dimensions</div>
                  <div className="text-lg">{selectedTemplate.dimensions}</div>
                </div>
                <div>
                  <div className="text-sm text-gray-400 mb-1">Style</div>
                  <div className="text-lg">{selectedTemplate.style}</div>
                </div>
                <div>
                  <div className="text-sm text-gray-400 mb-1">Platforms</div>
                  <div className="flex flex-wrap gap-2">
                    {selectedTemplate.platform.map((p, i) => (
                      <span key={i} className="px-3 py-1 bg-blue-600/30 rounded-lg">
                        {p}
                      </span>
                    ))}
                  </div>
                </div>
                <div>
                  <div className="text-sm text-gray-400 mb-1">Rating</div>
                  <div className="flex items-center space-x-2">
                    <span className="text-2xl text-yellow-400">⭐</span>
                    <span className="text-xl font-bold">{selectedTemplate.rating}</span>
                    <span className="text-gray-400">({selectedTemplate.uses} uses)</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="flex space-x-4">
              <button className="flex-1 px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl font-bold text-lg">
                ✨ Use This Template
              </button>
              <button
                onClick={() => setSelectedTemplate(null)}
                className="px-6 py-4 bg-white/5 hover:bg-white/10 rounded-xl transition-colors"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

