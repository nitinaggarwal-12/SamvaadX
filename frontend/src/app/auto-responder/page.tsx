'use client';

import { useState } from 'react';
import Link from 'next/link';

interface AutoResponder {
  id: string;
  name: string;
  trigger: string;
  response: string;
  platforms: string[];
  active: boolean;
  matches: number;
}

export default function AutoResponder() {
  const [responders, setResponders] = useState<AutoResponder[]>([
    {
      id: '1',
      name: 'Event Registration Query',
      trigger: 'how to register|registration|sign up',
      response: 'Thank you for your interest in CSPOC 2026! Registration opens on March 1st. Visit https://cspoc2026.gov.in/register for more details.',
      platforms: ['Twitter', 'Facebook', 'LinkedIn'],
      active: true,
      matches: 234,
    },
    {
      id: '2',
      name: 'Event Date Query',
      trigger: 'when|date|schedule',
      response: 'CSPOC 2026 will be held from January 14-17, 2026 in New Delhi. Full schedule: https://cspoc2026.gov.in/schedule',
      platforms: ['Twitter', 'Instagram'],
      active: true,
      matches: 189,
    },
    {
      id: '3',
      name: 'Venue Information',
      trigger: 'where|venue|location',
      response: 'The conference will take place at the Parliament House Complex, New Delhi. More details: https://cspoc2026.gov.in/venue',
      platforms: ['Twitter', 'Facebook', 'LinkedIn', 'Instagram'],
      active: true,
      matches: 156,
    },
    {
      id: '4',
      name: 'Contact Support',
      trigger: 'help|support|contact',
      response: 'Our support team is here to help! Email: support@cspoc2026.gov.in or call +91-11-XXXX-XXXX',
      platforms: ['Twitter', 'Facebook'],
      active: false,
      matches: 98,
    },
  ]);

  const [showAddForm, setShowAddForm] = useState(false);
  const [newResponder, setNewResponder] = useState({
    name: '',
    trigger: '',
    response: '',
    platforms: [] as string[],
  });

  const totalMatches = responders.reduce((sum, r) => sum + r.matches, 0);
  const activeResponders = responders.filter(r => r.active).length;

  const toggleActive = (id: string) => {
    setResponders(responders.map(r => 
      r.id === id ? { ...r, active: !r.active } : r
    ));
  };

  const platformOptions = ['Twitter', 'Facebook', 'LinkedIn', 'Instagram', 'YouTube'];

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
              <Link href="/auto-responder" className="px-4 py-2 bg-white/10 rounded-lg font-semibold">Auto-Responder</Link>
            </div>
          </div>
        </div>
      </nav>

      <div className="container mx-auto px-6 py-8">
        <div className="mb-8 flex items-center justify-between">
          <div>
            <h1 className="text-5xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent mb-4">
              Auto-Responder System
            </h1>
            <p className="text-xl text-gray-400">Intelligent automated responses to common queries</p>
          </div>
          <button
            onClick={() => setShowAddForm(!showAddForm)}
            className="px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg font-semibold hover:shadow-lg"
          >
            ➕ Add New Rule
          </button>
        </div>

        <div className="grid grid-cols-3 gap-6 mb-8">
          <div className="p-6 bg-white/5 backdrop-blur-lg rounded-2xl border border-white/10">
            <div className="text-sm text-gray-400 mb-2">Active Rules</div>
            <div className="text-3xl font-bold text-green-400">{activeResponders}/{responders.length}</div>
          </div>
          <div className="p-6 bg-white/5 backdrop-blur-lg rounded-2xl border border-white/10">
            <div className="text-sm text-gray-400 mb-2">Total Matches</div>
            <div className="text-3xl font-bold text-blue-400">{totalMatches}</div>
          </div>
          <div className="p-6 bg-white/5 backdrop-blur-lg rounded-2xl border border-white/10">
            <div className="text-sm text-gray-400 mb-2">Response Rate</div>
            <div className="text-3xl font-bold text-purple-400">94.2%</div>
          </div>
        </div>

        {showAddForm && (
          <div className="mb-8 p-6 bg-white/5 backdrop-blur-lg rounded-2xl border border-white/10">
            <h2 className="text-2xl font-bold mb-4">Create New Auto-Responder</h2>
            <div className="space-y-4">
              <div>
                <label className="block text-sm text-gray-400 mb-2">Rule Name</label>
                <input
                  type="text"
                  className="w-full px-4 py-2 bg-black/30 border border-white/10 rounded-lg"
                  placeholder="e.g., Ticket Pricing Query"
                  value={newResponder.name}
                  onChange={(e) => setNewResponder({...newResponder, name: e.target.value})}
                />
              </div>
              <div>
                <label className="block text-sm text-gray-400 mb-2">Trigger Keywords (regex supported)</label>
                <input
                  type="text"
                  className="w-full px-4 py-2 bg-black/30 border border-white/10 rounded-lg"
                  placeholder="e.g., ticket|price|cost"
                  value={newResponder.trigger}
                  onChange={(e) => setNewResponder({...newResponder, trigger: e.target.value})}
                />
              </div>
              <div>
                <label className="block text-sm text-gray-400 mb-2">Auto Response Message</label>
                <textarea
                  className="w-full px-4 py-2 bg-black/30 border border-white/10 rounded-lg h-24"
                  placeholder="Your automated response..."
                  value={newResponder.response}
                  onChange={(e) => setNewResponder({...newResponder, response: e.target.value})}
                />
              </div>
              <div>
                <label className="block text-sm text-gray-400 mb-2">Active on Platforms</label>
                <div className="flex flex-wrap gap-2">
                  {platformOptions.map(platform => (
                    <label key={platform} className="flex items-center space-x-2 px-3 py-2 bg-black/30 rounded-lg cursor-pointer">
                      <input type="checkbox" />
                      <span>{platform}</span>
                    </label>
                  ))}
                </div>
              </div>
              <div className="flex space-x-3">
                <button className="px-6 py-2 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg font-semibold">
                  💾 Save Rule
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

        <div className="space-y-4">
          {responders.map(responder => (
            <div key={responder.id} className="p-6 bg-white/5 backdrop-blur-lg rounded-2xl border border-white/10">
              <div className="flex items-start justify-between mb-4">
                <div className="flex-1">
                  <div className="flex items-center space-x-3 mb-2">
                    <h3 className="text-xl font-bold">{responder.name}</h3>
                    <button
                      onClick={() => toggleActive(responder.id)}
                      className={`px-3 py-1 rounded-full text-xs ${
                        responder.active
                          ? 'bg-green-600/30 text-green-400'
                          : 'bg-gray-600/30 text-gray-400'
                      }`}
                    >
                      {responder.active ? 'ACTIVE' : 'INACTIVE'}
                    </button>
                  </div>
                  <div className="text-sm text-gray-400 mb-3">
                    <span className="font-mono bg-black/30 px-2 py-1 rounded">Trigger: {responder.trigger}</span>
                  </div>
                  <div className="p-3 bg-black/30 rounded-lg mb-3">
                    <div className="text-sm text-gray-400 mb-1">Response:</div>
                    <div className="text-white">{responder.response}</div>
                  </div>
                  <div className="flex items-center space-x-2">
                    {responder.platforms.map(platform => (
                      <span key={platform} className="text-xs px-2 py-1 bg-blue-600/30 rounded">
                        {platform}
                      </span>
                    ))}
                  </div>
                </div>
                <div className="text-center ml-4">
                  <div className="text-2xl font-bold text-blue-400">{responder.matches}</div>
                  <div className="text-xs text-gray-400">matches</div>
                </div>
              </div>
              <div className="flex space-x-2">
                <button className="px-4 py-2 bg-blue-600 hover:bg-blue-700 rounded-lg text-sm">
                  ✏️ Edit
                </button>
                <button className="px-4 py-2 bg-yellow-600 hover:bg-yellow-700 rounded-lg text-sm">
                  📊 View Logs
                </button>
                <button className="px-4 py-2 bg-red-600 hover:bg-red-700 rounded-lg text-sm">
                  🗑️ Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

