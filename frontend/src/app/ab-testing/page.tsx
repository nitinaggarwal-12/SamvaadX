'use client';

import { useState } from 'react';
import Link from 'next/link';

interface ABTest {
  id: string;
  name: string;
  status: 'draft' | 'running' | 'completed';
  startDate: string;
  endDate?: string;
  variants: Array<{
    id: string;
    name: string;
    content: string;
    image?: string;
    impressions: number;
    clicks: number;
    conversions: number;
    ctr: number;
    conversionRate: number;
  }>;
  winner?: string;
}

export default function ABTesting() {
  const [tests, setTests] = useState<ABTest[]>([
    {
      id: '1',
      name: 'CSPOC Registration CTA Test',
      status: 'running',
      startDate: '2025-12-23',
      variants: [
        {
          id: 'a',
          name: 'Variant A - "Register Now"',
          content: '🎉 CSPOC 2026 is coming! Register now to secure your spot at this historic event.',
          impressions: 5420,
          clicks: 287,
          conversions: 52,
          ctr: 5.3,
          conversionRate: 18.1,
        },
        {
          id: 'b',
          name: 'Variant B - "Join Us"',
          content: '🌟 Be part of CSPOC 2026! Join us for this historic gathering of Commonwealth leaders.',
          impressions: 5380,
          clicks: 312,
          conversions: 67,
          ctr: 5.8,
          conversionRate: 21.5,
        },
        {
          id: 'c',
          name: 'Variant C - "Limited Seats"',
          content: '⚡ CSPOC 2026 - Limited seats available! Secure your participation today.',
          impressions: 5405,
          clicks: 398,
          conversions: 89,
          ctr: 7.4,
          conversionRate: 22.4,
        },
      ],
    },
    {
      id: '2',
      name: 'Speaker Announcement Format Test',
      status: 'completed',
      startDate: '2025-12-18',
      endDate: '2025-12-22',
      winner: 'b',
      variants: [
        {
          id: 'a',
          name: 'Text Only',
          content: 'Meet our keynote speaker: [Name], expert in parliamentary democracy...',
          impressions: 8240,
          clicks: 412,
          conversions: 78,
          ctr: 5.0,
          conversionRate: 18.9,
        },
        {
          id: 'b',
          name: 'Image + Text',
          content: 'Professional headshot + bio text',
          impressions: 8310,
          clicks: 623,
          conversions: 142,
          ctr: 7.5,
          conversionRate: 22.8,
        },
      ],
    },
  ]);

  const [showCreateModal, setShowCreateModal] = useState(false);
  const [newTest, setNewTest] = useState({
    name: '',
    variantAContent: '',
    variantBContent: '',
  });

  const handleCreate = () => {
    if (!newTest.name || !newTest.variantAContent || !newTest.variantBContent) {
      alert('Please fill in all fields');
      return;
    }

    const test: ABTest = {
      id: Date.now().toString(),
      name: newTest.name,
      status: 'draft',
      startDate: new Date().toISOString().split('T')[0],
      variants: [
        {
          id: 'a',
          name: 'Variant A',
          content: newTest.variantAContent,
          impressions: 0,
          clicks: 0,
          conversions: 0,
          ctr: 0,
          conversionRate: 0,
        },
        {
          id: 'b',
          name: 'Variant B',
          content: newTest.variantBContent,
          impressions: 0,
          clicks: 0,
          conversions: 0,
          ctr: 0,
          conversionRate: 0,
        },
      ],
    };

    setTests(prev => [test, ...prev]);
    setNewTest({ name: '', variantAContent: '', variantBContent: '' });
    setShowCreateModal(false);
    alert('✅ A/B test created!');
  };

  const getBestVariant = (variants: ABTest['variants']) => {
    return variants.reduce((best, current) => 
      current.conversionRate > best.conversionRate ? current : best
    );
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
              <Link href="/ab-testing" className="px-4 py-2 bg-white/10 rounded-lg font-semibold">A/B Testing</Link>
            </div>
          </div>
        </div>
      </nav>

      <div className="container mx-auto px-6 py-8">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-5xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent mb-4">
              A/B Testing
            </h1>
            <p className="text-xl text-gray-400">Optimize content with data-driven experiments</p>
          </div>
          <button
            onClick={() => setShowCreateModal(true)}
            className="px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl font-bold hover:shadow-lg transition-all"
          >
            + New Test
          </button>
        </div>

        <div className="space-y-6">
          {tests.map(test => {
            const bestVariant = getBestVariant(test.variants);
            
            return (
              <div key={test.id} className="p-6 bg-white/5 backdrop-blur-lg rounded-3xl border border-white/10">
                <div className="flex items-start justify-between mb-6">
                  <div>
                    <div className="flex items-center space-x-3 mb-2">
                      <h3 className="text-2xl font-bold">{test.name}</h3>
                      <span className={`text-xs px-3 py-1 rounded-full ${
                        test.status === 'running' ? 'bg-green-600/30 text-green-400' :
                        test.status === 'completed' ? 'bg-blue-600/30 text-blue-400' :
                        'bg-gray-600/30 text-gray-400'
                      }`}>
                        {test.status.toUpperCase()}
                      </span>
                    </div>
                    <div className="text-sm text-gray-400">
                      {test.status === 'completed' 
                        ? `Ran from ${test.startDate} to ${test.endDate}`
                        : `Started ${test.startDate}`
                      }
                    </div>
                  </div>
                  {test.status === 'running' && (
                    <button className="px-4 py-2 bg-red-600/30 hover:bg-red-600/50 rounded-lg transition-colors">
                      Stop Test
                    </button>
                  )}
                </div>

                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {test.variants.map(variant => (
                    <div 
                      key={variant.id}
                      className={`p-5 rounded-2xl border-2 transition-all ${
                        test.winner === variant.id || bestVariant.id === variant.id
                          ? 'bg-gradient-to-br from-green-900/30 to-blue-900/30 border-green-500/50'
                          : 'bg-white/5 border-white/10'
                      }`}
                    >
                      <div className="flex items-center justify-between mb-3">
                        <h4 className="font-bold">{variant.name}</h4>
                        {(test.winner === variant.id || (test.status === 'running' && bestVariant.id === variant.id)) && (
                          <span className="text-xs px-2 py-1 bg-green-600/50 rounded-full">
                            {test.status === 'completed' ? '👑 Winner' : '🔥 Leading'}
                          </span>
                        )}
                      </div>

                      <div className="p-3 bg-black/30 rounded-lg mb-4 text-sm">
                        {variant.content}
                      </div>

                      <div className="space-y-2">
                        <div className="flex justify-between text-sm">
                          <span className="text-gray-400">Impressions</span>
                          <span className="font-bold">{variant.impressions.toLocaleString()}</span>
                        </div>
                        <div className="flex justify-between text-sm">
                          <span className="text-gray-400">Clicks</span>
                          <span className="font-bold text-blue-400">{variant.clicks.toLocaleString()}</span>
                        </div>
                        <div className="flex justify-between text-sm">
                          <span className="text-gray-400">Conversions</span>
                          <span className="font-bold text-green-400">{variant.conversions}</span>
                        </div>
                        <div className="border-t border-white/10 pt-2 mt-2">
                          <div className="flex justify-between text-sm">
                            <span className="text-gray-400">CTR</span>
                            <span className="font-bold text-purple-400">{variant.ctr}%</span>
                          </div>
                          <div className="flex justify-between text-sm">
                            <span className="text-gray-400">Conv. Rate</span>
                            <span className="font-bold text-green-400">{variant.conversionRate}%</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                {test.status === 'running' && (
                  <div className="mt-6 p-4 bg-blue-600/10 border border-blue-500/30 rounded-xl">
                    <div className="text-sm">
                      💡 <strong>Current Leader:</strong> {bestVariant.name} with {bestVariant.conversionRate}% conversion rate
                      {bestVariant.conversionRate > 20 && ' - Consider declaring winner!'}
                    </div>
                  </div>
                )}

                {test.status === 'completed' && test.winner && (
                  <div className="mt-6 p-4 bg-green-600/10 border border-green-500/30 rounded-xl">
                    <div className="text-sm">
                      ✅ <strong>Winner:</strong> {test.variants.find(v => v.id === test.winner)?.name} 
                      {' '}performed {bestVariant.conversionRate}% better overall
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {showCreateModal && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-6">
          <div className="bg-gradient-to-br from-slate-900 to-purple-900 rounded-3xl border border-white/20 p-8 max-w-3xl w-full">
            <h2 className="text-3xl font-bold mb-6">Create A/B Test</h2>
            <div className="space-y-4">
              <input
                type="text"
                value={newTest.name}
                onChange={(e) => setNewTest(prev => ({ ...prev, name: e.target.value }))}
                placeholder="Test name..."
                className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl focus:outline-none focus:border-purple-500/50"
              />
              
              <div>
                <label className="block text-sm font-semibold mb-2">Variant A Content</label>
                <textarea
                  value={newTest.variantAContent}
                  onChange={(e) => setNewTest(prev => ({ ...prev, variantAContent: e.target.value }))}
                  placeholder="Enter variant A content..."
                  className="w-full h-24 px-4 py-3 bg-white/5 border border-white/10 rounded-xl focus:outline-none focus:border-purple-500/50 resize-none"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold mb-2">Variant B Content</label>
                <textarea
                  value={newTest.variantBContent}
                  onChange={(e) => setNewTest(prev => ({ ...prev, variantBContent: e.target.value }))}
                  placeholder="Enter variant B content..."
                  className="w-full h-24 px-4 py-3 bg-white/5 border border-white/10 rounded-xl focus:outline-none focus:border-purple-500/50 resize-none"
                />
              </div>

              <div className="flex space-x-4">
                <button onClick={handleCreate} className="flex-1 px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl font-bold">
                  Create Test
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

