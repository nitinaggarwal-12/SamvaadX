'use client';

import { useState } from 'react';
import Link from 'next/link';

interface Story {
  id: string;
  platform: string;
  type: 'image' | 'video' | 'text';
  content: string;
  mediaUrl?: string;
  backgroundColor?: string;
  textColor?: string;
  duration: number; // seconds
  status: 'draft' | 'scheduled' | 'published' | 'expired';
  scheduledTime?: string;
  publishedTime?: string;
  expiresAt?: string;
  views: number;
  replies: number;
  shares: number;
}

export default function StoriesManager() {
  const [stories, setStories] = useState<Story[]>([
    {
      id: '1',
      platform: 'Instagram',
      type: 'image',
      content: 'CSPOC 2026 - 10 days to go! 🎉',
      mediaUrl: '/story-img-1.jpg',
      duration: 5,
      status: 'published',
      publishedTime: '2 hours ago',
      expiresAt: '22 hours',
      views: 4523,
      replies: 89,
      shares: 234,
    },
    {
      id: '2',
      platform: 'Facebook',
      type: 'video',
      content: 'Behind the scenes: Parliament preparation',
      mediaUrl: '/story-video-1.mp4',
      duration: 15,
      status: 'published',
      publishedTime: '5 hours ago',
      expiresAt: '19 hours',
      views: 8912,
      replies: 156,
      shares: 445,
    },
    {
      id: '3',
      platform: 'Instagram',
      type: 'text',
      content: 'Did you know? The Commonwealth unites 2.5 billion people across 56 nations! 🌍 #CSPOC2026',
      backgroundColor: '#7c3aed',
      textColor: '#ffffff',
      duration: 7,
      status: 'scheduled',
      scheduledTime: '2025-12-27 10:00',
      views: 0,
      replies: 0,
      shares: 0,
    },
    {
      id: '4',
      platform: 'Instagram',
      type: 'image',
      content: 'Speaker Spotlight: Introducing our keynote speakers',
      mediaUrl: '/story-img-2.jpg',
      duration: 6,
      status: 'draft',
      views: 0,
      replies: 0,
      shares: 0,
    },
  ]);

  const [showCreateModal, setShowCreateModal] = useState(false);
  const [newStory, setNewStory] = useState({
    platform: 'Instagram',
    type: 'text' as const,
    content: '',
    backgroundColor: '#7c3aed',
  });

  const handleCreate = () => {
    if (!newStory.content) {
      alert('Please enter content');
      return;
    }

    const story: Story = {
      id: Date.now().toString(),
      platform: newStory.platform,
      type: newStory.type,
      content: newStory.content,
      backgroundColor: newStory.backgroundColor,
      textColor: '#ffffff',
      duration: 5,
      status: 'draft',
      views: 0,
      replies: 0,
      shares: 0,
    };

    setStories(prev => [story, ...prev]);
    setNewStory({ platform: 'Instagram', type: 'text', content: '', backgroundColor: '#7c3aed' });
    setShowCreateModal(false);
    alert('✅ Story created as draft!');
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'published': return 'bg-green-600/30 text-green-400';
      case 'scheduled': return 'bg-blue-600/30 text-blue-400';
      case 'expired': return 'bg-gray-600/30 text-gray-400';
      default: return 'bg-yellow-600/30 text-yellow-400';
    }
  };

  const getPlatformIcon = (platform: string) => {
    switch (platform) {
      case 'Instagram': return '📸';
      case 'Facebook': return '👥';
      case 'LinkedIn': return '💼';
      default: return '🌐';
    }
  };

  const publishedStories = stories.filter(s => s.status === 'published');
  const scheduledStories = stories.filter(s => s.status === 'scheduled');
  const draftStories = stories.filter(s => s.status === 'draft');

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
              <Link href="/stories" className="px-4 py-2 bg-white/10 rounded-lg font-semibold">Stories</Link>
            </div>
          </div>
        </div>
      </nav>

      <div className="container mx-auto px-6 py-8">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-5xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent mb-4">
              Stories Manager
            </h1>
            <p className="text-xl text-gray-400">Create and manage ephemeral 24-hour content</p>
          </div>
          <button
            onClick={() => setShowCreateModal(true)}
            className="px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl font-bold hover:shadow-lg transition-all"
          >
            + Create Story
          </button>
        </div>

        <div className="grid grid-cols-4 gap-6 mb-8">
          <div className="p-6 bg-white/5 backdrop-blur-lg rounded-2xl border border-white/10">
            <div className="text-4xl font-bold text-green-400">{publishedStories.length}</div>
            <div className="text-gray-400">Live Stories</div>
          </div>
          <div className="p-6 bg-white/5 backdrop-blur-lg rounded-2xl border border-white/10">
            <div className="text-4xl font-bold text-blue-400">{scheduledStories.length}</div>
            <div className="text-gray-400">Scheduled</div>
          </div>
          <div className="p-6 bg-white/5 backdrop-blur-lg rounded-2xl border border-white/10">
            <div className="text-4xl font-bold text-purple-400">
              {publishedStories.reduce((sum, s) => sum + s.views, 0).toLocaleString()}
            </div>
            <div className="text-gray-400">Total Views</div>
          </div>
          <div className="p-6 bg-white/5 backdrop-blur-lg rounded-2xl border border-white/10">
            <div className="text-4xl font-bold text-yellow-400">{draftStories.length}</div>
            <div className="text-gray-400">Drafts</div>
          </div>
        </div>

        <div className="space-y-6">
          {['published', 'scheduled', 'draft'].map(status => {
            const filteredStories = stories.filter(s => s.status === status);
            if (filteredStories.length === 0) return null;

            return (
              <div key={status}>
                <h2 className="text-2xl font-bold mb-4 capitalize">{status} Stories</h2>
                <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
                  {filteredStories.map(story => (
                    <div key={story.id} className="bg-white/5 backdrop-blur-lg rounded-2xl border border-white/10 overflow-hidden">
                      <div 
                        className="aspect-[9/16] p-6 flex flex-col justify-between"
                        style={{ 
                          backgroundColor: story.backgroundColor || '#1e293b',
                          backgroundImage: story.mediaUrl ? `url(${story.mediaUrl})` : 'none',
                          backgroundSize: 'cover',
                          backgroundPosition: 'center',
                        }}
                      >
                        <div className="flex items-center justify-between">
                          <span className="text-2xl">{getPlatformIcon(story.platform)}</span>
                          <span className={`text-xs px-2 py-1 rounded-full ${getStatusColor(story.status)}`}>
                            {story.status.toUpperCase()}
                          </span>
                        </div>
                        
                        <div>
                          <p className="font-bold text-lg mb-2" style={{ color: story.textColor || '#ffffff' }}>
                            {story.content}
                          </p>
                          {story.expiresAt && (
                            <div className="text-xs opacity-75">⏰ Expires in {story.expiresAt}</div>
                          )}
                        </div>
                      </div>

                      <div className="p-4 bg-black/30">
                        <div className="grid grid-cols-3 gap-2 text-xs mb-3">
                          <div>
                            <div className="text-gray-400">Views</div>
                            <div className="font-bold">{story.views.toLocaleString()}</div>
                          </div>
                          <div>
                            <div className="text-gray-400">Replies</div>
                            <div className="font-bold">{story.replies}</div>
                          </div>
                          <div>
                            <div className="text-gray-400">Shares</div>
                            <div className="font-bold">{story.shares}</div>
                          </div>
                        </div>
                        
                        <div className="flex items-center space-x-2">
                          {story.status === 'draft' && (
                            <>
                              <button className="flex-1 px-3 py-1 bg-blue-600/30 hover:bg-blue-600/50 rounded text-xs transition-colors">
                                Edit
                              </button>
                              <button className="flex-1 px-3 py-1 bg-green-600/30 hover:bg-green-600/50 rounded text-xs transition-colors">
                                Publish
                              </button>
                            </>
                          )}
                          {story.status === 'published' && (
                            <button className="flex-1 px-3 py-1 bg-purple-600/30 hover:bg-purple-600/50 rounded text-xs transition-colors">
                              View Insights
                            </button>
                          )}
                          {story.status === 'scheduled' && (
                            <>
                              <div className="flex-1 text-xs text-gray-400">
                                📅 {story.scheduledTime}
                              </div>
                              <button className="px-3 py-1 bg-red-600/30 hover:bg-red-600/50 rounded text-xs transition-colors">
                                Cancel
                              </button>
                            </>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {showCreateModal && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-6">
          <div className="bg-gradient-to-br from-slate-900 to-purple-900 rounded-3xl border border-white/20 p-8 max-w-2xl w-full">
            <h2 className="text-3xl font-bold mb-6">Create Story</h2>
            <div className="space-y-4">
              <select
                value={newStory.platform}
                onChange={(e) => setNewStory(prev => ({ ...prev, platform: e.target.value }))}
                className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl focus:outline-none focus:border-purple-500/50"
              >
                <option value="Instagram">Instagram</option>
                <option value="Facebook">Facebook</option>
                <option value="LinkedIn">LinkedIn</option>
              </select>

              <select
                value={newStory.type}
                onChange={(e) => setNewStory(prev => ({ ...prev, type: e.target.value as any }))}
                className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl focus:outline-none focus:border-purple-500/50"
              >
                <option value="text">Text Story</option>
                <option value="image">Image Story</option>
                <option value="video">Video Story</option>
              </select>

              <textarea
                value={newStory.content}
                onChange={(e) => setNewStory(prev => ({ ...prev, content: e.target.value }))}
                placeholder="Story content..."
                className="w-full h-32 px-4 py-3 bg-white/5 border border-white/10 rounded-xl focus:outline-none focus:border-purple-500/50 resize-none"
              />

              {newStory.type === 'text' && (
                <div>
                  <label className="block text-sm mb-2">Background Color</label>
                  <div className="grid grid-cols-6 gap-2">
                    {['#7c3aed', '#3b82f6', '#10b981', '#f59e0b', '#ef4444', '#8b5cf6'].map(color => (
                      <button
                        key={color}
                        onClick={() => setNewStory(prev => ({ ...prev, backgroundColor: color }))}
                        className={`w-full h-12 rounded-lg border-2 ${newStory.backgroundColor === color ? 'border-white' : 'border-transparent'}`}
                        style={{ backgroundColor: color }}
                      />
                    ))}
                  </div>
                </div>
              )}

              <div className="flex space-x-4">
                <button onClick={handleCreate} className="flex-1 px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl font-bold">
                  Create Story
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

