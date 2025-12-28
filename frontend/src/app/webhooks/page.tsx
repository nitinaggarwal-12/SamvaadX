'use client';

import { useState } from 'react';
import Link from 'next/link';

interface Webhook {
  id: string;
  name: string;
  url: string;
  events: string[];
  status: 'active' | 'inactive' | 'failed';
  lastTriggered?: string;
  successRate: number;
  totalCalls: number;
  secret: string;
}

export default function Webhooks() {
  const [webhooks, setWebhooks] = useState<Webhook[]>([
    {
      id: '1',
      name: 'Analytics Pipeline',
      url: 'https://analytics.gov.in/api/webhook',
      events: ['post.published', 'post.deleted', 'comment.received'],
      status: 'active',
      lastTriggered: '5 minutes ago',
      successRate: 99.8,
      totalCalls: 4523,
      secret: 'whsec_8x9...',
    },
    {
      id: '2',
      name: 'Backup System',
      url: 'https://backup.parliament.gov.in/webhook',
      events: ['media.uploaded', 'post.created'],
      status: 'active',
      lastTriggered: '1 hour ago',
      successRate: 100,
      totalCalls: 1289,
      secret: 'whsec_2a7...',
    },
    {
      id: '3',
      name: 'Compliance Monitor',
      url: 'https://compliance.internal/receive',
      events: ['post.published', 'approval.completed'],
      status: 'failed',
      lastTriggered: '2 days ago',
      successRate: 87.3,
      totalCalls: 892,
      secret: 'whsec_9k3...',
    },
  ]);

  const [showCreateModal, setShowCreateModal] = useState(false);
  const [testingWebhook, setTestingWebhook] = useState<string | null>(null);

  const availableEvents = [
    'post.created',
    'post.published',
    'post.scheduled',
    'post.deleted',
    'comment.received',
    'comment.replied',
    'media.uploaded',
    'media.deleted',
    'approval.requested',
    'approval.completed',
    'campaign.started',
    'campaign.completed',
    'alert.triggered',
    'user.added',
    'user.removed',
  ];

  const handleTestWebhook = (webhookId: string) => {
    setTestingWebhook(webhookId);
    setTimeout(() => {
      alert(`✅ Test event sent successfully!\n\nStatus: 200 OK\nResponse time: 234ms`);
      setTestingWebhook(null);
    }, 1500);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-green-600/30 text-green-400';
      case 'failed': return 'bg-red-600/30 text-red-400';
      default: return 'bg-gray-600/30 text-gray-400';
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
              <Link href="/webhooks" className="px-4 py-2 bg-white/10 rounded-lg font-semibold">Webhooks</Link>
            </div>
          </div>
        </div>
      </nav>

      <div className="container mx-auto px-6 py-8">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-5xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent mb-4">
              Webhooks & Events
            </h1>
            <p className="text-xl text-gray-400">Integrate with external systems in real-time</p>
          </div>
          <button
            onClick={() => setShowCreateModal(true)}
            className="px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl font-bold hover:shadow-lg transition-all"
          >
            + Create Webhook
          </button>
        </div>

        <div className="grid grid-cols-3 gap-6 mb-8">
          <div className="p-6 bg-white/5 backdrop-blur-lg rounded-2xl border border-white/10">
            <div className="text-4xl font-bold text-blue-400">{webhooks.length}</div>
            <div className="text-gray-400">Total Webhooks</div>
          </div>
          <div className="p-6 bg-white/5 backdrop-blur-lg rounded-2xl border border-white/10">
            <div className="text-4xl font-bold text-green-400">{webhooks.filter(w => w.status === 'active').length}</div>
            <div className="text-gray-400">Active</div>
          </div>
          <div className="p-6 bg-white/5 backdrop-blur-lg rounded-2xl border border-white/10">
            <div className="text-4xl font-bold text-purple-400">{webhooks.reduce((sum, w) => sum + w.totalCalls, 0).toLocaleString()}</div>
            <div className="text-gray-400">Total Events</div>
          </div>
        </div>

        <div className="space-y-4">
          {webhooks.map(webhook => (
            <div key={webhook.id} className="p-6 bg-white/5 backdrop-blur-lg rounded-2xl border border-white/10">
              <div className="flex items-start justify-between mb-4">
                <div>
                  <div className="flex items-center space-x-3 mb-2">
                    <h3 className="text-2xl font-bold">{webhook.name}</h3>
                    <span className={`text-xs px-3 py-1 rounded-full ${getStatusColor(webhook.status)}`}>
                      {webhook.status.toUpperCase()}
                    </span>
                  </div>
                  <div className="font-mono text-sm text-gray-400">{webhook.url}</div>
                </div>
              </div>

              <div className="mb-4">
                <div className="text-sm text-gray-400 mb-2">Events:</div>
                <div className="flex flex-wrap gap-2">
                  {webhook.events.map((event, i) => (
                    <span key={i} className="text-xs px-3 py-1 bg-purple-600/30 rounded-full">
                      {event}
                    </span>
                  ))}
                </div>
              </div>

              <div className="grid grid-cols-4 gap-4 mb-4">
                <div className="p-3 bg-black/30 rounded-lg">
                  <div className="text-xs text-gray-400 mb-1">Success Rate</div>
                  <div className="text-xl font-bold text-green-400">{webhook.successRate}%</div>
                </div>
                <div className="p-3 bg-black/30 rounded-lg">
                  <div className="text-xs text-gray-400 mb-1">Total Calls</div>
                  <div className="text-xl font-bold">{webhook.totalCalls.toLocaleString()}</div>
                </div>
                <div className="p-3 bg-black/30 rounded-lg">
                  <div className="text-xs text-gray-400 mb-1">Last Triggered</div>
                  <div className="text-sm font-bold">{webhook.lastTriggered || 'Never'}</div>
                </div>
                <div className="p-3 bg-black/30 rounded-lg">
                  <div className="text-xs text-gray-400 mb-1">Secret</div>
                  <div className="text-sm font-mono">{webhook.secret}</div>
                </div>
              </div>

              <div className="flex items-center space-x-3">
                <button
                  onClick={() => handleTestWebhook(webhook.id)}
                  disabled={testingWebhook === webhook.id}
                  className="px-6 py-2 bg-blue-600/30 hover:bg-blue-600/50 rounded-lg transition-colors disabled:opacity-50"
                >
                  {testingWebhook === webhook.id ? '🔄 Testing...' : '🧪 Test Webhook'}
                </button>
                <button className="px-6 py-2 bg-purple-600/30 hover:bg-purple-600/50 rounded-lg transition-colors">
                  📊 View Logs
                </button>
                <button className="px-6 py-2 bg-white/10 hover:bg-white/20 rounded-lg transition-colors">
                  ✏️ Edit
                </button>
                <button className="px-6 py-2 bg-red-600/30 hover:bg-red-600/50 rounded-lg transition-colors">
                  🗑️ Delete
                </button>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-8 bg-white/5 backdrop-blur-lg rounded-3xl border border-white/10 p-8">
          <h2 className="text-2xl font-bold mb-6">Available Events</h2>
          <div className="grid md:grid-cols-3 gap-3">
            {availableEvents.map((event, i) => (
              <div key={i} className="p-3 bg-white/5 rounded-lg text-sm font-mono">
                {event}
              </div>
            ))}
          </div>
        </div>
      </div>

      {showCreateModal && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-6">
          <div className="bg-gradient-to-br from-slate-900 to-purple-900 rounded-3xl border border-white/20 p-8 max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <h2 className="text-3xl font-bold mb-6">Create Webhook</h2>
            <div className="space-y-4">
              <input
                type="text"
                placeholder="Webhook name..."
                className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl focus:outline-none focus:border-purple-500/50"
              />
              <input
                type="url"
                placeholder="Endpoint URL (https://...)..."
                className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl focus:outline-none focus:border-purple-500/50"
              />
              
              <div>
                <label className="block text-sm font-semibold mb-2">Select Events</label>
                <div className="max-h-48 overflow-y-auto space-y-2 p-4 bg-white/5 rounded-xl">
                  {availableEvents.map((event, i) => (
                    <label key={i} className="flex items-center space-x-2 cursor-pointer hover:bg-white/5 p-2 rounded">
                      <input type="checkbox" className="w-4 h-4" />
                      <span className="text-sm font-mono">{event}</span>
                    </label>
                  ))}
                </div>
              </div>

              <div className="flex space-x-4">
                <button className="flex-1 px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl font-bold">
                  Create Webhook
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

