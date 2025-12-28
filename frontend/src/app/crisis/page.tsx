'use client';

import { useState } from 'react';
import Link from 'next/link';

interface CrisisAlert {
  id: string;
  title: string;
  severity: 'low' | 'medium' | 'high' | 'critical';
  platform: string;
  description: string;
  detectedAt: string;
  status: 'active' | 'monitoring' | 'resolved';
  sentiment: number; // negative sentiment score
  mentions: number;
  trending: boolean;
}

interface ResponseTemplate {
  id: string;
  name: string;
  content: string;
  tone: string;
}

export default function CrisisManagement() {
  const [alerts, setAlerts] = useState<CrisisAlert[]>([
    {
      id: '1',
      title: 'Negative Sentiment Spike on Venue Change',
      severity: 'high',
      platform: 'Twitter/X',
      description: 'Rapid increase in negative comments about venue change announcement. 234 mentions in last hour.',
      detectedAt: '15 minutes ago',
      status: 'active',
      sentiment: -0.72,
      mentions: 234,
      trending: true,
    },
    {
      id: '2',
      title: 'Misinformation About Registration',
      severity: 'critical',
      platform: 'Facebook',
      description: 'False claims spreading about registration requirements. Needs immediate clarification.',
      detectedAt: '32 minutes ago',
      status: 'active',
      sentiment: -0.85,
      mentions: 567,
      trending: true,
    },
    {
      id: '3',
      title: 'Event Timing Confusion',
      severity: 'medium',
      platform: 'LinkedIn',
      description: 'Multiple inquiries about event timing due to timezone confusion in promotional materials.',
      detectedAt: '2 hours ago',
      status: 'monitoring',
      sentiment: -0.45,
      mentions: 89,
      trending: false,
    },
  ]);

  const [templates] = useState<ResponseTemplate[]>([
    {
      id: '1',
      name: 'Clarification Statement',
      content: 'Thank you for bringing this to our attention. We would like to clarify that [specific clarification]. For accurate information, please visit [official source].',
      tone: 'Professional & Clear',
    },
    {
      id: '2',
      name: 'Apology & Fix',
      content: 'We sincerely apologize for [specific issue]. We are taking immediate steps to [corrective action]. We appreciate your patience and understanding.',
      tone: 'Empathetic & Accountable',
    },
    {
      id: '3',
      name: 'Misinformation Counter',
      content: 'We have become aware of incorrect information circulating about [topic]. The facts are: [accurate information]. Please refer to our official channels for verified updates.',
      tone: 'Authoritative & Factual',
    },
  ]);

  const [selectedAlert, setSelectedAlert] = useState<CrisisAlert | null>(null);
  const [response, setResponse] = useState('');

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'critical': return 'bg-red-600 text-white';
      case 'high': return 'bg-orange-600 text-white';
      case 'medium': return 'bg-yellow-600 text-black';
      case 'low': return 'bg-green-600 text-white';
      default: return 'bg-gray-600 text-white';
    }
  };

  const handleQuickResponse = (templateContent: string) => {
    setResponse(templateContent);
  };

  const handlePublishResponse = () => {
    if (!selectedAlert || !response) {
      alert('Please enter a response');
      return;
    }

    alert(`✅ Response published to ${selectedAlert.platform}!\n\nThe crisis alert has been updated to "Monitoring" status.`);
    
    setAlerts(prev => prev.map(a => 
      a.id === selectedAlert.id 
        ? { ...a, status: 'monitoring' as const }
        : a
    ));
    
    setSelectedAlert(null);
    setResponse('');
  };

  const activeCount = alerts.filter(a => a.status === 'active').length;
  const criticalCount = alerts.filter(a => a.severity === 'critical').length;

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
              <Link href="/crisis" className="px-4 py-2 bg-white/10 rounded-lg font-semibold relative">
                Crisis
                {criticalCount > 0 && (
                  <span className="absolute -top-1 -right-1 w-5 h-5 bg-red-600 rounded-full text-xs flex items-center justify-center animate-pulse">
                    {criticalCount}
                  </span>
                )}
              </Link>
            </div>
          </div>
        </div>
      </nav>

      <div className="container mx-auto px-6 py-8">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-5xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent mb-4">
              Crisis Management
            </h1>
            <p className="text-xl text-gray-400">Real-time monitoring and rapid response</p>
          </div>
          {activeCount > 0 && (
            <div className="px-6 py-3 bg-red-600 rounded-xl animate-pulse">
              <div className="text-3xl font-bold">{activeCount}</div>
              <div className="text-sm">Active Alerts</div>
            </div>
          )}
        </div>

        <div className="grid grid-cols-3 gap-6 mb-8">
          <div className="p-6 bg-white/5 backdrop-blur-lg rounded-2xl border border-white/10">
            <div className="text-4xl font-bold text-red-400">{criticalCount}</div>
            <div className="text-gray-400">Critical Issues</div>
          </div>
          <div className="p-6 bg-white/5 backdrop-blur-lg rounded-2xl border border-white/10">
            <div className="text-4xl font-bold text-yellow-400">{alerts.filter(a => a.trending).length}</div>
            <div className="text-gray-400">Trending Alerts</div>
          </div>
          <div className="p-6 bg-white/5 backdrop-blur-lg rounded-2xl border border-white/10">
            <div className="text-4xl font-bold text-green-400">{alerts.filter(a => a.status === 'resolved').length}</div>
            <div className="text-gray-400">Resolved Today</div>
          </div>
        </div>

        <div className="space-y-4">
          {alerts.map(alert => (
            <div key={alert.id} className={`p-6 bg-white/5 backdrop-blur-lg rounded-2xl border-2 ${
              alert.severity === 'critical' ? 'border-red-500/50 animate-pulse' :
              alert.severity === 'high' ? 'border-orange-500/50' :
              'border-white/10'
            }`}>
              <div className="flex items-start justify-between mb-4">
                <div className="flex-1">
                  <div className="flex items-center space-x-3 mb-2">
                    <h3 className="text-2xl font-bold">{alert.title}</h3>
                    <span className={`text-xs px-3 py-1 rounded-full ${getSeverityColor(alert.severity)}`}>
                      {alert.severity.toUpperCase()}
                    </span>
                    {alert.trending && (
                      <span className="text-xs px-3 py-1 bg-red-600/30 rounded-full text-red-400 flex items-center space-x-1">
                        <span>🔥</span>
                        <span>TRENDING</span>
                      </span>
                    )}
                  </div>
                  <p className="text-gray-300 mb-3">{alert.description}</p>
                </div>
              </div>

              <div className="grid grid-cols-4 gap-4 mb-4">
                <div className="p-3 bg-black/30 rounded-lg">
                  <div className="text-xs text-gray-400 mb-1">Platform</div>
                  <div className="font-semibold">{alert.platform}</div>
                </div>
                <div className="p-3 bg-black/30 rounded-lg">
                  <div className="text-xs text-gray-400 mb-1">Mentions</div>
                  <div className="font-semibold text-red-400">{alert.mentions}</div>
                </div>
                <div className="p-3 bg-black/30 rounded-lg">
                  <div className="text-xs text-gray-400 mb-1">Sentiment</div>
                  <div className="font-semibold text-red-400">{(alert.sentiment * 100).toFixed(0)}%</div>
                </div>
                <div className="p-3 bg-black/30 rounded-lg">
                  <div className="text-xs text-gray-400 mb-1">Status</div>
                  <div className={`font-semibold ${
                    alert.status === 'active' ? 'text-red-400' :
                    alert.status === 'monitoring' ? 'text-yellow-400' :
                    'text-green-400'
                  }`}>
                    {alert.status.toUpperCase()}
                  </div>
                </div>
              </div>

              <div className="flex items-center justify-between">
                <div className="text-sm text-gray-400">
                  Detected {alert.detectedAt}
                </div>
                <div className="flex items-center space-x-3">
                  <button
                    onClick={() => setSelectedAlert(alert)}
                    className="px-6 py-2 bg-blue-600 hover:bg-blue-700 rounded-lg font-semibold transition-colors"
                  >
                    🚨 Respond Now
                  </button>
                  <button className="px-6 py-2 bg-white/10 hover:bg-white/20 rounded-lg transition-colors">
                    📊 View Details
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {selectedAlert && (
        <div className="fixed inset-0 bg-black/90 backdrop-blur-sm z-50 flex items-center justify-center p-6">
          <div className="bg-gradient-to-br from-slate-900 to-purple-900 rounded-3xl border border-white/20 p-8 max-w-4xl w-full max-h-[90vh] overflow-y-auto">
            <h2 className="text-3xl font-bold mb-6">Crisis Response: {selectedAlert.title}</h2>

            <div className="mb-6 p-4 bg-red-600/20 border border-red-500/50 rounded-xl">
              <div className="font-semibold mb-2">⚠️ Alert Details</div>
              <p>{selectedAlert.description}</p>
              <div className="mt-3 grid grid-cols-3 gap-3 text-sm">
                <div>Platform: <strong>{selectedAlert.platform}</strong></div>
                <div>Mentions: <strong>{selectedAlert.mentions}</strong></div>
                <div>Sentiment: <strong className="text-red-400">{(selectedAlert.sentiment * 100).toFixed(0)}%</strong></div>
              </div>
            </div>

            <div className="mb-6">
              <h3 className="text-xl font-bold mb-4">Quick Response Templates</h3>
              <div className="grid grid-cols-3 gap-3">
                {templates.map(template => (
                  <button
                    key={template.id}
                    onClick={() => handleQuickResponse(template.content)}
                    className="p-4 bg-white/5 hover:bg-white/10 rounded-xl border border-white/10 transition-colors text-left"
                  >
                    <div className="font-semibold mb-1">{template.name}</div>
                    <div className="text-xs text-gray-400">{template.tone}</div>
                  </button>
                ))}
              </div>
            </div>

            <div className="mb-6">
              <label className="block text-sm font-semibold mb-2">Your Response</label>
              <textarea
                value={response}
                onChange={(e) => setResponse(e.target.value)}
                placeholder="Craft your response..."
                className="w-full h-32 px-4 py-3 bg-white/5 border border-white/10 rounded-xl focus:outline-none focus:border-purple-500/50 resize-none"
              />
            </div>

            <div className="flex space-x-4">
              <button
                onClick={handlePublishResponse}
                className="flex-1 px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl font-bold text-lg hover:shadow-lg transition-all"
              >
                📤 Publish Response
              </button>
              <button
                onClick={() => { setSelectedAlert(null); setResponse(''); }}
                className="px-6 py-4 bg-white/5 hover:bg-white/10 rounded-xl transition-colors"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

