'use client';

import { useState } from 'react';
import Link from 'next/link';

export default function Reports() {
  const [reportType, setReportType] = useState<'overview' | 'platform' | 'campaign' | 'custom'>('overview');
  const [dateRange, setDateRange] = useState('30days');
  const [selectedPlatforms, setSelectedPlatforms] = useState<string[]>(['all']);
  const [exportFormat, setExportFormat] = useState<'pdf' | 'excel' | 'csv' | 'pptx'>('pdf');

  const platforms = ['all', 'Facebook', 'Twitter/X', 'Instagram', 'LinkedIn', 'YouTube'];

  const handleExport = () => {
    const formatNames = {
      pdf: 'PDF Report',
      excel: 'Excel Spreadsheet',
      csv: 'CSV Data',
      pptx: 'PowerPoint Presentation',
    };

    alert(`📊 Generating ${formatNames[exportFormat]}...\n\nYour report will include:\n✓ ${dateRange === '7days' ? 'Last 7 days' : dateRange === '30days' ? 'Last 30 days' : dateRange === '90days' ? 'Last 90 days' : 'This year'} data\n✓ ${selectedPlatforms.includes('all') ? 'All platforms' : selectedPlatforms.join(', ')}\n✓ ${reportType.charAt(0).toUpperCase() + reportType.slice(1)} metrics\n\nDownload will start shortly...`);
  };

  const sampleData = {
    totalReach: '1.2M',
    totalEngagement: '89.4K',
    totalPosts: 156,
    avgEngagementRate: '7.45%',
    topPost: 'Announcing CSPOC 2026',
    topPlatform: 'Facebook',
    growthRate: '+15.3%',
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
              <Link href="/analytics" className="px-4 py-2 hover:bg-white/10 rounded-lg">Analytics</Link>
              <Link href="/reports" className="px-4 py-2 bg-white/10 rounded-lg font-semibold">Reports</Link>
            </div>
          </div>
        </div>
      </nav>

      <div className="container mx-auto px-6 py-8">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-5xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent mb-4">
              Custom Reports
            </h1>
            <p className="text-xl text-gray-400">Export analytics and performance data</p>
          </div>
        </div>

        <div className="grid lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 space-y-6">
            <div className="bg-white/5 backdrop-blur-lg rounded-3xl border border-white/10 p-8">
              <h2 className="text-2xl font-bold mb-6">Report Builder</h2>

              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-semibold mb-3">Report Type</label>
                  <div className="grid grid-cols-2 gap-3">
                    {[
                      { value: 'overview', label: 'Overview Report', icon: '📊' },
                      { value: 'platform', label: 'Platform Breakdown', icon: '📱' },
                      { value: 'campaign', label: 'Campaign Performance', icon: '🎯' },
                      { value: 'custom', label: 'Custom Report', icon: '⚙️' },
                    ].map((type) => (
                      <button
                        key={type.value}
                        onClick={() => setReportType(type.value as any)}
                        className={`p-4 rounded-xl border-2 transition-all ${
                          reportType === type.value
                            ? 'bg-purple-600 border-purple-400'
                            : 'bg-white/5 border-white/10 hover:border-purple-500/50'
                        }`}
                      >
                        <div className="text-3xl mb-2">{type.icon}</div>
                        <div className="font-semibold">{type.label}</div>
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-semibold mb-3">Date Range</label>
                  <select
                    value={dateRange}
                    onChange={(e) => setDateRange(e.target.value)}
                    className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl focus:outline-none focus:border-purple-500/50"
                  >
                    <option value="7days">Last 7 Days</option>
                    <option value="30days">Last 30 Days</option>
                    <option value="90days">Last 90 Days</option>
                    <option value="year">This Year</option>
                    <option value="custom">Custom Range</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-semibold mb-3">Platforms</label>
                  <div className="flex flex-wrap gap-2">
                    {platforms.map((platform) => (
                      <button
                        key={platform}
                        onClick={() => {
                          if (platform === 'all') {
                            setSelectedPlatforms(['all']);
                          } else {
                            setSelectedPlatforms(prev => {
                              const filtered = prev.filter(p => p !== 'all');
                              return filtered.includes(platform)
                                ? filtered.filter(p => p !== platform)
                                : [...filtered, platform];
                            });
                          }
                        }}
                        className={`px-4 py-2 rounded-xl border-2 transition-all ${
                          selectedPlatforms.includes(platform) || selectedPlatforms.includes('all')
                            ? 'bg-blue-600 border-blue-400'
                            : 'bg-white/5 border-white/10 hover:border-blue-500/50'
                        }`}
                      >
                        {platform}
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-semibold mb-3">Export Format</label>
                  <div className="grid grid-cols-4 gap-3">
                    {[
                      { value: 'pdf', label: 'PDF', icon: '📄' },
                      { value: 'excel', label: 'Excel', icon: '📊' },
                      { value: 'csv', label: 'CSV', icon: '📑' },
                      { value: 'pptx', label: 'PowerPoint', icon: '📽️' },
                    ].map((format) => (
                      <button
                        key={format.value}
                        onClick={() => setExportFormat(format.value as any)}
                        className={`p-4 rounded-xl border-2 transition-all ${
                          exportFormat === format.value
                            ? 'bg-green-600 border-green-400'
                            : 'bg-white/5 border-white/10 hover:border-green-500/50'
                        }`}
                      >
                        <div className="text-3xl mb-1">{format.icon}</div>
                        <div className="text-sm font-semibold">{format.label}</div>
                      </button>
                    ))}
                  </div>
                </div>

                <button
                  onClick={handleExport}
                  className="w-full px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl font-bold text-lg hover:shadow-lg hover:shadow-purple-500/50 transition-all"
                >
                  📥 Generate & Download Report
                </button>
              </div>
            </div>

            <div className="bg-white/5 backdrop-blur-lg rounded-3xl border border-white/10 p-8">
              <h2 className="text-2xl font-bold mb-6">Report Preview</h2>
              
              <div className="grid grid-cols-2 gap-4">
                {Object.entries(sampleData).map(([key, value]) => (
                  <div key={key} className="p-4 bg-white/5 rounded-xl">
                    <div className="text-sm text-gray-400 mb-1 capitalize">
                      {key.replace(/([A-Z])/g, ' $1').trim()}
                    </div>
                    <div className="text-2xl font-bold text-blue-400">{value}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="space-y-6">
            <div className="bg-gradient-to-br from-blue-900/30 to-purple-900/30 backdrop-blur-lg rounded-3xl border border-white/10 p-6">
              <h3 className="text-xl font-bold mb-4">Scheduled Reports</h3>
              <div className="space-y-3">
                <div className="p-3 bg-white/5 rounded-lg">
                  <div className="font-semibold">Weekly Overview</div>
                  <div className="text-sm text-gray-400">Every Monday @ 9:00 AM</div>
                </div>
                <div className="p-3 bg-white/5 rounded-lg">
                  <div className="font-semibold">Monthly Report</div>
                  <div className="text-sm text-gray-400">1st of each month</div>
                </div>
              </div>
              <button className="w-full mt-4 px-4 py-2 bg-white/10 hover:bg-white/20 rounded-lg transition-colors">
                + Schedule Report
              </button>
            </div>

            <div className="bg-white/5 backdrop-blur-lg rounded-3xl border border-white/10 p-6">
              <h3 className="text-xl font-bold mb-4">Recent Reports</h3>
              <div className="space-y-2 text-sm">
                <div className="p-2 bg-white/5 rounded">📄 Overview Report - Today</div>
                <div className="p-2 bg-white/5 rounded">📊 Platform Report - Yesterday</div>
                <div className="p-2 bg-white/5 rounded">🎯 Campaign Report - 3 days ago</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

