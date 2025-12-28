'use client';

import { useState } from 'react';
import Link from 'next/link';

interface VideoProject {
  id: string;
  name: string;
  duration: number;
  resolution: string;
  status: 'editing' | 'rendering' | 'complete';
  thumbnail: string;
  createdAt: string;
  lastModified: string;
}

export default function VideoEditor() {
  const [projects, setProjects] = useState<VideoProject[]>([
    {
      id: '1',
      name: 'CSPOC 2026 Opening Ceremony Highlights',
      duration: 120,
      resolution: '1920x1080',
      status: 'editing',
      thumbnail: '/video-thumb-1.jpg',
      createdAt: '2025-12-25',
      lastModified: '2 hours ago',
    },
    {
      id: '2',
      name: 'Speaker Spotlight - Day 1',
      duration: 45,
      resolution: '1080x1920',
      status: 'complete',
      thumbnail: '/video-thumb-2.jpg',
      createdAt: '2025-12-24',
      lastModified: 'Yesterday',
    },
    {
      id: '3',
      name: 'Behind the Scenes Setup',
      duration: 60,
      resolution: '1920x1080',
      status: 'rendering',
      thumbnail: '/video-thumb-3.jpg',
      createdAt: '2025-12-26',
      lastModified: '30 minutes ago',
    },
  ]);

  const [showCreateModal, setShowCreateModal] = useState(false);
  const [selectedProject, setSelectedProject] = useState<VideoProject | null>(null);

  const formatDuration = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'complete': return 'bg-green-600/30 text-green-400';
      case 'rendering': return 'bg-blue-600/30 text-blue-400';
      default: return 'bg-yellow-600/30 text-yellow-400';
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
              <Link href="/video-editor" className="px-4 py-2 bg-white/10 rounded-lg font-semibold">Video Editor</Link>
            </div>
          </div>
        </div>
      </nav>

      <div className="container mx-auto px-6 py-8">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-5xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent mb-4">
              Video Editor
            </h1>
            <p className="text-xl text-gray-400">Professional in-platform video editing</p>
          </div>
          <button
            onClick={() => setShowCreateModal(true)}
            className="px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl font-bold hover:shadow-lg transition-all"
          >
            + New Project
          </button>
        </div>

        <div className="grid lg:grid-cols-3 gap-6 mb-8">
          {projects.map(project => (
            <div key={project.id} className="bg-white/5 backdrop-blur-lg rounded-2xl border border-white/10 overflow-hidden">
              <div 
                className="aspect-video bg-gradient-to-br from-slate-800 to-purple-900 flex items-center justify-center text-6xl cursor-pointer hover:opacity-80 transition-opacity"
                onClick={() => setSelectedProject(project)}
              >
                🎬
              </div>

              <div className="p-6">
                <div className="flex items-start justify-between mb-3">
                  <h3 className="font-bold text-lg">{project.name}</h3>
                  <span className={`text-xs px-2 py-1 rounded-full ${getStatusColor(project.status)}`}>
                    {project.status.toUpperCase()}
                  </span>
                </div>

                <div className="space-y-2 text-sm text-gray-400 mb-4">
                  <div className="flex justify-between">
                    <span>Duration</span>
                    <span className="font-semibold">{formatDuration(project.duration)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Resolution</span>
                    <span className="font-semibold">{project.resolution}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Last Modified</span>
                    <span className="font-semibold">{project.lastModified}</span>
                  </div>
                </div>

                <div className="flex items-center space-x-2">
                  {project.status === 'editing' && (
                    <>
                      <button 
                        onClick={() => setSelectedProject(project)}
                        className="flex-1 px-4 py-2 bg-blue-600/30 hover:bg-blue-600/50 rounded-lg transition-colors"
                      >
                        ✏️ Edit
                      </button>
                      <button className="flex-1 px-4 py-2 bg-green-600/30 hover:bg-green-600/50 rounded-lg transition-colors">
                        ▶️ Preview
                      </button>
                    </>
                  )}
                  {project.status === 'complete' && (
                    <>
                      <button className="flex-1 px-4 py-2 bg-purple-600/30 hover:bg-purple-600/50 rounded-lg transition-colors">
                        📥 Download
                      </button>
                      <button className="flex-1 px-4 py-2 bg-blue-600/30 hover:bg-blue-600/50 rounded-lg transition-colors">
                        📤 Share
                      </button>
                    </>
                  )}
                  {project.status === 'rendering' && (
                    <div className="flex-1 px-4 py-2 bg-blue-600/30 rounded-lg text-center">
                      <div className="flex items-center justify-center space-x-2">
                        <div className="w-4 h-4 border-2 border-blue-400 border-t-transparent rounded-full animate-spin"></div>
                        <span>Rendering...</span>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="bg-white/5 backdrop-blur-lg rounded-3xl border border-white/10 p-8">
          <h2 className="text-2xl font-bold mb-6">Editor Features</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { icon: '✂️', title: 'Trim & Cut', desc: 'Precise frame-by-frame editing' },
              { icon: '🎨', title: 'Filters & Effects', desc: 'Professional color grading' },
              { icon: '🎵', title: 'Audio Mixing', desc: 'Multi-track audio editing' },
              { icon: '📝', title: 'Text & Captions', desc: 'Animated text overlays' },
              { icon: '🔄', title: 'Transitions', desc: 'Smooth scene transitions' },
              { icon: '📐', title: 'Aspect Ratios', desc: 'Export for any platform' },
            ].map((feature, i) => (
              <div key={i} className="p-4 bg-white/5 rounded-xl">
                <div className="text-3xl mb-2">{feature.icon}</div>
                <div className="font-bold mb-1">{feature.title}</div>
                <div className="text-sm text-gray-400">{feature.desc}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {selectedProject && (
        <div className="fixed inset-0 bg-black/90 backdrop-blur-sm z-50 flex items-center justify-center p-6">
          <div className="bg-gradient-to-br from-slate-900 to-purple-900 rounded-3xl border border-white/20 p-8 max-w-6xl w-full max-h-[90vh] overflow-y-auto">
            <h2 className="text-3xl font-bold mb-6">{selectedProject.name}</h2>

            <div className="aspect-video bg-black rounded-2xl mb-6 flex items-center justify-center text-8xl">
              🎬
            </div>

            <div className="grid grid-cols-4 gap-4 mb-6">
              <button className="p-4 bg-white/5 hover:bg-white/10 rounded-xl transition-colors">
                <div className="text-2xl mb-2">✂️</div>
                <div className="text-sm">Trim</div>
              </button>
              <button className="p-4 bg-white/5 hover:bg-white/10 rounded-xl transition-colors">
                <div className="text-2xl mb-2">🎨</div>
                <div className="text-sm">Filters</div>
              </button>
              <button className="p-4 bg-white/5 hover:bg-white/10 rounded-xl transition-colors">
                <div className="text-2xl mb-2">📝</div>
                <div className="text-sm">Text</div>
              </button>
              <button className="p-4 bg-white/5 hover:bg-white/10 rounded-xl transition-colors">
                <div className="text-2xl mb-2">🎵</div>
                <div className="text-sm">Audio</div>
              </button>
            </div>

            <div className="bg-white/5 rounded-xl p-4 mb-6">
              <div className="h-20 bg-gradient-to-r from-blue-600/30 via-purple-600/30 to-pink-600/30 rounded"></div>
              <div className="text-xs text-gray-400 mt-2">Timeline: 00:00 / {formatDuration(selectedProject.duration)}</div>
            </div>

            <div className="flex space-x-4">
              <button className="flex-1 px-6 py-3 bg-gradient-to-r from-green-600 to-blue-600 rounded-xl font-bold">
                💾 Save Changes
              </button>
              <button className="flex-1 px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl font-bold">
                📤 Export Video
              </button>
              <button
                onClick={() => setSelectedProject(null)}
                className="px-6 py-3 bg-white/5 hover:bg-white/10 rounded-xl transition-colors"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      {showCreateModal && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-6">
          <div className="bg-gradient-to-br from-slate-900 to-purple-900 rounded-3xl border border-white/20 p-8 max-w-2xl w-full">
            <h2 className="text-3xl font-bold mb-6">New Video Project</h2>
            <div className="space-y-4">
              <input
                type="text"
                placeholder="Project name..."
                className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl focus:outline-none focus:border-purple-500/50"
              />
              <select className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl focus:outline-none focus:border-purple-500/50">
                <option>1920x1080 (Landscape)</option>
                <option>1080x1920 (Portrait/Stories)</option>
                <option>1080x1080 (Square)</option>
              </select>
              <div className="flex space-x-4">
                <button className="flex-1 px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl font-bold">
                  Create Project
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

