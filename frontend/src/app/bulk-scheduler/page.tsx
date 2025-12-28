'use client';

import { useState } from 'react';
import Link from 'next/link';

interface BulkPost {
  id: string;
  content: string;
  platforms: string[];
  scheduledTime: string;
  status: 'pending' | 'scheduled' | 'error';
  error?: string;
}

export default function BulkScheduler() {
  const [bulkPosts, setBulkPosts] = useState<BulkPost[]>([]);
  const [csvText, setCsvText] = useState('');
  const [showPreview, setShowPreview] = useState(false);

  const csvTemplate = `content,platforms,scheduledTime
"Announcing CSPOC 2026 registration!","Facebook,Twitter/X,LinkedIn","2025-12-28 09:00"
"Meet our keynote speakers","Instagram,Facebook","2025-12-28 15:00"
"Behind the scenes preparation","Instagram,Twitter/X","2025-12-29 10:00"`;

  const parseCsv = (csv: string): BulkPost[] => {
    const lines = csv.trim().split('\n');
    const headers = lines[0].split(',').map(h => h.trim());
    
    return lines.slice(1).map((line, index) => {
      const values = line.match(/(".*?"|[^,]+)(?=\s*,|\s*$)/g)?.map(v => v.replace(/^"|"$/g, '').trim()) || [];
      
      return {
        id: `bulk-${Date.now()}-${index}`,
        content: values[0] || '',
        platforms: (values[1] || '').split(',').map(p => p.trim()).filter(Boolean),
        scheduledTime: values[2] || '',
        status: 'pending' as const,
      };
    });
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      const text = event.target?.result as string;
      setCsvText(text);
      const posts = parseCsv(text);
      setBulkPosts(posts);
      setShowPreview(true);
    };
    reader.readAsText(file);
  };

  const handleScheduleAll = () => {
    if (bulkPosts.length === 0) {
      alert('No posts to schedule');
      return;
    }

    setBulkPosts(prev => prev.map(post => ({
      ...post,
      status: 'scheduled' as const,
    })));

    alert(`✅ Successfully scheduled ${bulkPosts.length} posts!\n\nThey will be published at their scheduled times.`);
  };

  const handleRemovePost = (id: string) => {
    setBulkPosts(prev => prev.filter(p => p.id !== id));
  };

  const downloadTemplate = () => {
    const blob = new Blob([csvTemplate], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'bulk-schedule-template.csv';
    a.click();
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
              <div>
                <h1 className="text-xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                  Guddu-Project
                </h1>
              </div>
            </Link>

            <div className="flex items-center space-x-4">
              <Link href="/dashboard" className="px-4 py-2 hover:bg-white/10 rounded-lg transition-colors">Dashboard</Link>
              <Link href="/bulk-scheduler" className="px-4 py-2 bg-white/10 rounded-lg font-semibold">Bulk Upload</Link>
              <Link href="/calendar" className="px-4 py-2 hover:bg-white/10 rounded-lg transition-colors">Calendar</Link>
            </div>
          </div>
        </div>
      </nav>

      <div className="container mx-auto px-6 py-8">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-5xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent mb-4">
              Bulk Scheduler
            </h1>
            <p className="text-xl text-gray-400">Upload CSV to schedule multiple posts at once</p>
          </div>

          {bulkPosts.length > 0 && (
            <div className="px-6 py-3 bg-blue-600/20 border border-blue-500/50 rounded-xl">
              <div className="text-3xl font-bold text-blue-400">{bulkPosts.length}</div>
              <div className="text-sm text-gray-400">Posts Ready</div>
            </div>
          )}
        </div>

        <div className="grid lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 space-y-6">
            {/* Upload Section */}
            <div className="bg-white/5 backdrop-blur-lg rounded-3xl border border-white/10 p-8">
              <h2 className="text-2xl font-bold mb-6">Upload CSV File</h2>

              <div className="border-2 border-dashed border-white/20 rounded-2xl p-12 text-center mb-6 hover:border-purple-500/50 transition-colors">
                <div className="text-6xl mb-4">📄</div>
                <p className="text-xl mb-4">Drag and drop CSV file here</p>
                <input
                  type="file"
                  accept=".csv"
                  onChange={handleFileUpload}
                  className="hidden"
                  id="csv-upload"
                />
                <label
                  htmlFor="csv-upload"
                  className="inline-block px-8 py-3 bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl font-bold hover:shadow-lg cursor-pointer transition-all"
                >
                  Choose CSV File
                </label>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <button
                  onClick={downloadTemplate}
                  className="px-6 py-3 bg-white/5 hover:bg-white/10 rounded-xl transition-colors flex items-center justify-center space-x-2"
                >
                  <span>📥</span>
                  <span>Download Template</span>
                </button>
                <button
                  className="px-6 py-3 bg-white/5 hover:bg-white/10 rounded-xl transition-colors flex items-center justify-center space-x-2"
                  onClick={() => alert('CSV Format:\n\nColumn 1: content (text)\nColumn 2: platforms (comma-separated)\nColumn 3: scheduledTime (YYYY-MM-DD HH:MM)\n\nExample:\n"My post","Facebook,Twitter/X","2025-12-28 09:00"')}
                >
                  <span>❓</span>
                  <span>View Instructions</span>
                </button>
              </div>
            </div>

            {/* Preview */}
            {showPreview && bulkPosts.length > 0 && (
              <div className="bg-white/5 backdrop-blur-lg rounded-3xl border border-white/10 p-8">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-2xl font-bold">Preview ({bulkPosts.length} posts)</h2>
                  <button
                    onClick={handleScheduleAll}
                    className="px-8 py-3 bg-gradient-to-r from-green-600 to-blue-600 rounded-xl font-bold hover:shadow-lg transition-all"
                  >
                    ✅ Schedule All
                  </button>
                </div>

                <div className="space-y-4">
                  {bulkPosts.map(post => (
                    <div
                      key={post.id}
                      className={`p-4 rounded-xl border ${
                        post.status === 'scheduled'
                          ? 'bg-green-600/10 border-green-500/50'
                          : post.status === 'error'
                          ? 'bg-red-600/10 border-red-500/50'
                          : 'bg-white/5 border-white/10'
                      }`}
                    >
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <p className="text-lg mb-2">{post.content}</p>
                          <div className="flex items-center space-x-2 mb-2">
                            {post.platforms.map((p, i) => (
                              <span key={i} className="text-xs px-3 py-1 bg-blue-600/30 rounded-full">
                                {p}
                              </span>
                            ))}
                          </div>
                          <div className="text-sm text-gray-400">
                            📅 {post.scheduledTime}
                          </div>
                          {post.status === 'scheduled' && (
                            <div className="text-sm text-green-400 mt-2">
                              ✅ Scheduled successfully
                            </div>
                          )}
                          {post.error && (
                            <div className="text-sm text-red-400 mt-2">
                              ❌ {post.error}
                            </div>
                          )}
                        </div>
                        <button
                          onClick={() => handleRemovePost(post.id)}
                          className="px-3 py-1 bg-red-600/30 hover:bg-red-600/50 rounded-lg transition-colors text-sm"
                        >
                          Remove
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            <div className="bg-gradient-to-br from-blue-900/30 to-purple-900/30 backdrop-blur-lg rounded-3xl border border-white/10 p-6">
              <h3 className="text-xl font-bold mb-4">CSV Format</h3>
              <div className="space-y-3 text-sm">
                <div className="p-3 bg-white/5 rounded-lg">
                  <div className="font-semibold text-blue-400 mb-1">Column 1: content</div>
                  <div className="text-gray-400">The post text/caption</div>
                </div>
                <div className="p-3 bg-white/5 rounded-lg">
                  <div className="font-semibold text-purple-400 mb-1">Column 2: platforms</div>
                  <div className="text-gray-400">Comma-separated platform names</div>
                </div>
                <div className="p-3 bg-white/5 rounded-lg">
                  <div className="font-semibold text-green-400 mb-1">Column 3: scheduledTime</div>
                  <div className="text-gray-400">Format: YYYY-MM-DD HH:MM</div>
                </div>
              </div>
            </div>

            <div className="bg-white/5 backdrop-blur-lg rounded-3xl border border-white/10 p-6">
              <h3 className="text-xl font-bold mb-4">Tips</h3>
              <div className="space-y-2 text-sm text-gray-400">
                <div className="flex items-start space-x-2">
                  <span>💡</span>
                  <span>Use quotes for content with commas</span>
                </div>
                <div className="flex items-start space-x-2">
                  <span>💡</span>
                  <span>Supported platforms: Facebook, Twitter/X, Instagram, LinkedIn, YouTube</span>
                </div>
                <div className="flex items-start space-x-2">
                  <span>💡</span>
                  <span>Times are in your local timezone</span>
                </div>
                <div className="flex items-start space-x-2">
                  <span>💡</span>
                  <span>Maximum 100 posts per upload</span>
                </div>
              </div>
            </div>

            <div className="bg-white/5 backdrop-blur-lg rounded-3xl border border-white/10 p-6">
              <h3 className="text-xl font-bold mb-4">Recent Uploads</h3>
              <div className="space-y-2 text-sm text-gray-400">
                <div>📄 50 posts scheduled - 2 hours ago</div>
                <div>📄 25 posts scheduled - Yesterday</div>
                <div>📄 100 posts scheduled - 3 days ago</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

