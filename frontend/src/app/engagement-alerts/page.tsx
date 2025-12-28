'use client';

import { useState } from 'react';
import Link from 'next/link';

interface EngagementAlert {
  id: string;
  type: 'spike' | 'drop' | 'threshold' | 'anomaly';
  platform: string;
  metric: string;
  currentValue: number;
  previousValue: number;
  changePercent: number;
  postTitle: string;
  timestamp: string;
  severity: 'info' | 'warning' | 'critical';
  acknowledged: boolean;
}

interface AlertRule {
  id: string;
  name: string;
  metric: string;
  condition: string;
  threshold: number;
  platforms: string[];
  active: boolean;
  triggeredCount: number;
}

export default function EngagementAlerts() {
  const [alerts] = useState<EngagementAlert[]>([
    {
      id: '1',
      type: 'spike',
      platform: 'Twitter',
      metric: 'Engagement Rate',
      currentValue: 12.5,
      previousValue: 3.2,
      changePercent: 290.6,
      postTitle: 'CSPOC 2026 Main Announcement',
      timestamp: '15 mins ago',
      severity: 'info',
      acknowledged: false,
    },
    {
      id: '2',
      type: 'threshold',
      platform: 'Facebook',
      metric: 'Reach',
      currentValue: 150000,
      previousValue: 145000,
      changePercent: 3.4,
      postTitle: 'Delegate Registration',
      timestamp: '1 hour ago',
      severity: 'info',
      acknowledged: false,
    },
    {
      id: '3',
      type: 'drop',
      platform: 'LinkedIn',
      metric: 'Engagement Rate',
      currentValue: 1.2,
      previousValue: 4.5,
      changePercent: -73.3,
      postTitle: 'Policy Update Post',
      timestamp: '3 hours ago',
      severity: 'warning',
      acknowledged: false,
    },
    {
      id: '4',
      type: 'anomaly',
      platform: 'Instagram',
      metric: 'Comments',
      currentValue: 450,
      previousValue: 50,
      changePercent: 800,
      postTitle: 'Behind the Scenes',
      timestamp: '5 hours ago',
      severity: 'critical',
      acknowledged: true,
    },
  ]);

  const [alertRules] = useState<AlertRule[]>([
    {
      id: '1',
      name: 'High Engagement Spike',
      metric: 'Engagement Rate',
      condition: 'Increases by more than',
      threshold: 200,
      platforms: ['Twitter', 'Facebook', 'LinkedIn', 'Instagram'],
      active: true,
      triggeredCount: 45,
    },
    {
      id: '2',
      name: 'Reach Target Achievement',
      metric: 'Reach',
      condition: 'Exceeds',
      threshold: 100000,
      platforms: ['Facebook', 'Twitter'],
      active: true,
      triggeredCount: 23,
    },
    {
      id: '3',
      name: 'Low Engagement Warning',
      metric: 'Engagement Rate',
      condition: 'Falls below',
      threshold: 2,
      platforms: ['Twitter', 'Facebook', 'LinkedIn'],
      active: true,
      triggeredCount: 12,
    },
  ]);

  const [showCreateForm, setShowCreateForm] = useState(false);

  const getAlertIcon = (type: string) => {
    switch (type) {
      case 'spike': return '📈';
      case 'drop': return '📉';
      case 'threshold': return '🎯';
      case 'anomaly': return '⚠️';
      default: return '📊';
    }
  };

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'info': return 'bg-blue-600/30 text-blue-400 border-blue-500';
      case 'warning': return 'bg-yellow-600/30 text-yellow-400 border-yellow-500';
      case 'critical': return 'bg-red-600/30 text-red-400 border-red-500';
      default: return 'bg-gray-600/30 text-gray-400 border-gray-500';
    }
  };

  const stats = {
    total: alerts.length,
    unacknowledged: alerts.filter(a => !a.acknowledged).length,
    critical: alerts.filter(a => a.severity === 'critical').length,
    activeRules: alertRules.filter(r => r.active).length,
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
              <Link href="/engagement-alerts" className="px-4 py-2 bg-white/10 rounded-lg font-semibold">Alerts</Link>
            </div>
          </div>
        </div>
      </nav>

      <div className="container mx-auto px-6 py-8">
        <div className="mb-8 flex items-center justify-between">
          <div>
            <h1 className="text-5xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent mb-4">
              Engagement Rate Alerts
            </h1>
            <p className="text-xl text-gray-400">Real-time notifications for performance changes</p>
          </div>
          <button
            onClick={() => setShowCreateForm(!showCreateForm)}
            className="px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg font-semibold hover:shadow-lg"
          >
            ➕ New Alert Rule
          </button>
        </div>

        <div className="grid grid-cols-4 gap-6 mb-8">
          <div className="p-6 bg-white/5 backdrop-blur-lg rounded-2xl border border-white/10">
            <div className="text-sm text-gray-400 mb-2">Total Alerts</div>
            <div className="text-3xl font-bold text-blue-400">{stats.total}</div>
          </div>
          <div className="p-6 bg-white/5 backdrop-blur-lg rounded-2xl border border-white/10">
            <div className="text-sm text-gray-400 mb-2">Unacknowledged</div>
            <div className="text-3xl font-bold text-yellow-400">{stats.unacknowledged}</div>
          </div>
          <div className="p-6 bg-white/5 backdrop-blur-lg rounded-2xl border border-white/10">
            <div className="text-sm text-gray-400 mb-2">Critical</div>
            <div className="text-3xl font-bold text-red-400">{stats.critical}</div>
          </div>
          <div className="p-6 bg-white/5 backdrop-blur-lg rounded-2xl border border-white/10">
            <div className="text-sm text-gray-400 mb-2">Active Rules</div>
            <div className="text-3xl font-bold text-green-400">{stats.activeRules}</div>
          </div>
        </div>

        {showCreateForm && (
          <div className="mb-8 p-6 bg-white/5 backdrop-blur-lg rounded-2xl border border-white/10">
            <h2 className="text-2xl font-bold mb-4">Create New Alert Rule</h2>
            <div className="space-y-4">
              <div>
                <label className="block text-sm text-gray-400 mb-2">Rule Name</label>
                <input
                  type="text"
                  className="w-full px-4 py-2 bg-black/30 border border-white/10 rounded-lg"
                  placeholder="e.g., Viral Content Detector"
                />
              </div>
              <div className="grid md:grid-cols-3 gap-4">
                <div>
                  <label className="block text-sm text-gray-400 mb-2">Metric</label>
                  <select className="w-full px-4 py-2 bg-black/30 border border-white/10 rounded-lg">
                    <option>Engagement Rate</option>
                    <option>Reach</option>
                    <option>Impressions</option>
                    <option>Comments</option>
                    <option>Shares</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm text-gray-400 mb-2">Condition</label>
                  <select className="w-full px-4 py-2 bg-black/30 border border-white/10 rounded-lg">
                    <option>Exceeds</option>
                    <option>Falls below</option>
                    <option>Increases by more than</option>
                    <option>Decreases by more than</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm text-gray-400 mb-2">Threshold (%)</label>
                  <input
                    type="number"
                    className="w-full px-4 py-2 bg-black/30 border border-white/10 rounded-lg"
                    placeholder="e.g., 150"
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm text-gray-400 mb-2">Platforms</label>
                <div className="flex flex-wrap gap-2">
                  {['Twitter', 'Facebook', 'LinkedIn', 'Instagram', 'YouTube'].map(platform => (
                    <label key={platform} className="flex items-center space-x-2 px-3 py-2 bg-black/30 rounded-lg cursor-pointer">
                      <input type="checkbox" defaultChecked />
                      <span>{platform}</span>
                    </label>
                  ))}
                </div>
              </div>
              <div className="flex space-x-3">
                <button className="px-6 py-2 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg font-semibold">
                  💾 Create Rule
                </button>
                <button
                  onClick={() => setShowCreateForm(false)}
                  className="px-6 py-2 bg-white/10 rounded-lg"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        )}

        <div className="grid lg:grid-cols-2 gap-6 mb-8">
          <div>
            <h2 className="text-2xl font-bold mb-4">🔔 Recent Alerts</h2>
            <div className="space-y-3">
              {alerts.map(alert => (
                <div key={alert.id} className={`p-5 rounded-2xl border ${getSeverityColor(alert.severity)} backdrop-blur-lg`}>
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex items-center space-x-3">
                      <span className="text-3xl">{getAlertIcon(alert.type)}</span>
                      <div>
                        <div className="flex items-center space-x-2 mb-1">
                          <h4 className="font-bold text-lg">{alert.metric}</h4>
                          <span className="text-xs px-2 py-1 bg-black/30 rounded">{alert.platform}</span>
                        </div>
                        <div className="text-sm text-gray-400">{alert.postTitle}</div>
                      </div>
                    </div>
                    {!alert.acknowledged && (
                      <button className="px-3 py-1 bg-green-600 hover:bg-green-700 rounded text-xs">
                        ✅ Acknowledge
                      </button>
                    )}
                  </div>

                  <div className="grid grid-cols-2 gap-3 mb-3">
                    <div className="p-2 bg-black/30 rounded text-center">
                      <div className="text-xs text-gray-400">Current</div>
                      <div className="text-lg font-bold">{alert.currentValue.toLocaleString()}</div>
                    </div>
                    <div className="p-2 bg-black/30 rounded text-center">
                      <div className="text-xs text-gray-400">Previous</div>
                      <div className="text-lg font-bold">{alert.previousValue.toLocaleString()}</div>
                    </div>
                  </div>

                  <div className="flex items-center justify-between text-sm">
                    <span className={`font-bold ${alert.changePercent > 0 ? 'text-green-400' : 'text-red-400'}`}>
                      {alert.changePercent > 0 ? '↗️' : '↘️'} {Math.abs(alert.changePercent).toFixed(1)}%
                    </span>
                    <span className="text-gray-400">{alert.timestamp}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div>
            <h2 className="text-2xl font-bold mb-4">⚙️ Alert Rules</h2>
            <div className="space-y-3">
              {alertRules.map(rule => (
                <div key={rule.id} className="p-5 bg-white/5 backdrop-blur-lg rounded-2xl border border-white/10">
                  <div className="flex items-start justify-between mb-3">
                    <div>
                      <div className="flex items-center space-x-2 mb-2">
                        <h4 className="font-bold text-lg">{rule.name}</h4>
                        <span className={`text-xs px-2 py-1 rounded ${rule.active ? 'bg-green-600/30 text-green-400' : 'bg-gray-600/30 text-gray-400'}`}>
                          {rule.active ? 'ACTIVE' : 'INACTIVE'}
                        </span>
                      </div>
                      <div className="text-sm text-gray-400 mb-3">
                        <strong>{rule.metric}</strong> {rule.condition} <strong>{rule.threshold}%</strong>
                      </div>
                      <div className="flex flex-wrap gap-2">
                        {rule.platforms.map(platform => (
                          <span key={platform} className="text-xs px-2 py-1 bg-purple-600/30 rounded">
                            {platform}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center justify-between text-sm mt-3">
                    <span className="text-gray-400">Triggered {rule.triggeredCount} times</span>
                    <div className="flex space-x-2">
                      <button className="px-3 py-1 bg-blue-600 hover:bg-blue-700 rounded text-xs">
                        ✏️ Edit
                      </button>
                      <button className="px-3 py-1 bg-red-600 hover:bg-red-700 rounded text-xs">
                        🗑️
                      </button>
                    </div>
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

