'use client';

import { useState } from 'react';
import Link from 'next/link';

interface GeoTarget {
  id: string;
  postTitle: string;
  regions: string[];
  countries: string[];
  cities: string[];
  language: string;
  timezone: string;
  scheduledTime: string;
  status: 'scheduled' | 'active' | 'completed';
  reach: number;
}

export default function GeoTargeting() {
  const [geoTargets] = useState<GeoTarget[]>([
    {
      id: '1',
      postTitle: 'CSPOC 2026 - Asia-Pacific Announcement',
      regions: ['Asia-Pacific'],
      countries: ['India', 'Australia', 'Singapore', 'Malaysia'],
      cities: ['New Delhi', 'Mumbai', 'Sydney', 'Singapore City'],
      language: 'English',
      timezone: 'IST (GMT+5:30)',
      scheduledTime: '2024-12-27 09:00 AM',
      status: 'scheduled',
      reach: 2400000,
    },
    {
      id: '2',
      postTitle: 'Commonwealth Parliamentary Excellence',
      regions: ['Europe', 'Africa'],
      countries: ['UK', 'Canada', 'South Africa', 'Kenya'],
      cities: ['London', 'Toronto', 'Cape Town', 'Nairobi'],
      language: 'English',
      timezone: 'GMT',
      scheduledTime: '2024-12-27 02:00 PM',
      status: 'active',
      reach: 3100000,
    },
    {
      id: '3',
      postTitle: 'Digital Democracy Initiative - North America',
      regions: ['North America'],
      countries: ['USA', 'Canada'],
      cities: ['New York', 'Washington DC', 'Toronto', 'Vancouver'],
      language: 'English',
      timezone: 'EST (GMT-5)',
      scheduledTime: '2024-12-26 08:00 AM',
      status: 'completed',
      reach: 1850000,
    },
  ]);

  const [showCreateForm, setShowCreateForm] = useState(false);

  const allRegions = [
    'Asia-Pacific',
    'Europe',
    'Africa',
    'North America',
    'South America',
    'Middle East',
    'Caribbean',
  ];

  const commonwealthCountries = [
    'India', 'UK', 'Canada', 'Australia', 'New Zealand', 'South Africa',
    'Kenya', 'Nigeria', 'Pakistan', 'Bangladesh', 'Singapore', 'Malaysia',
    'Sri Lanka', 'Jamaica', 'Ghana', 'Uganda', 'Tanzania', 'Cyprus',
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'scheduled': return 'bg-blue-600/30 text-blue-400';
      case 'active': return 'bg-green-600/30 text-green-400';
      case 'completed': return 'bg-gray-600/30 text-gray-400';
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
              <Link href="/campaigns" className="px-4 py-2 hover:bg-white/10 rounded-lg">Campaigns</Link>
              <Link href="/geo-targeting" className="px-4 py-2 bg-white/10 rounded-lg font-semibold">Geo-Targeting</Link>
            </div>
          </div>
        </div>
      </nav>

      <div className="container mx-auto px-6 py-8">
        <div className="mb-8 flex items-center justify-between">
          <div>
            <h1 className="text-5xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent mb-4">
              Geo-Targeting by Region
            </h1>
            <p className="text-xl text-gray-400">Target specific regions, countries, and cities</p>
          </div>
          <button
            onClick={() => setShowCreateForm(!showCreateForm)}
            className="px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg font-semibold hover:shadow-lg"
          >
            🌍 Create Geo-Target
          </button>
        </div>

        <div className="grid grid-cols-3 gap-6 mb-8">
          <div className="p-6 bg-white/5 backdrop-blur-lg rounded-2xl border border-white/10">
            <div className="text-sm text-gray-400 mb-2">Active Campaigns</div>
            <div className="text-3xl font-bold text-green-400">
              {geoTargets.filter(g => g.status === 'active').length}
            </div>
          </div>
          <div className="p-6 bg-white/5 backdrop-blur-lg rounded-2xl border border-white/10">
            <div className="text-sm text-gray-400 mb-2">Total Reach</div>
            <div className="text-3xl font-bold text-blue-400">
              {(geoTargets.reduce((sum, g) => sum + g.reach, 0) / 1000000).toFixed(1)}M
            </div>
          </div>
          <div className="p-6 bg-white/5 backdrop-blur-lg rounded-2xl border border-white/10">
            <div className="text-sm text-gray-400 mb-2">Regions Covered</div>
            <div className="text-3xl font-bold text-purple-400">
              {new Set(geoTargets.flatMap(g => g.regions)).size}
            </div>
          </div>
        </div>

        {showCreateForm && (
          <div className="mb-8 p-6 bg-white/5 backdrop-blur-lg rounded-2xl border border-white/10">
            <h2 className="text-2xl font-bold mb-4">Create Geo-Targeted Campaign</h2>
            <div className="space-y-4">
              <div>
                <label className="block text-sm text-gray-400 mb-2">Post Title</label>
                <input
                  type="text"
                  className="w-full px-4 py-2 bg-black/30 border border-white/10 rounded-lg"
                  placeholder="e.g., CSPOC 2026 Regional Announcement"
                />
              </div>
              
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm text-gray-400 mb-2">Target Regions</label>
                  <div className="space-y-2 max-h-48 overflow-y-auto p-3 bg-black/30 rounded-lg">
                    {allRegions.map(region => (
                      <label key={region} className="flex items-center space-x-2 cursor-pointer">
                        <input type="checkbox" />
                        <span>{region}</span>
                      </label>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="block text-sm text-gray-400 mb-2">Target Countries</label>
                  <div className="space-y-2 max-h-48 overflow-y-auto p-3 bg-black/30 rounded-lg">
                    {commonwealthCountries.map(country => (
                      <label key={country} className="flex items-center space-x-2 cursor-pointer">
                        <input type="checkbox" />
                        <span>{country}</span>
                      </label>
                    ))}
                  </div>
                </div>
              </div>

              <div>
                <label className="block text-sm text-gray-400 mb-2">Specific Cities (comma-separated)</label>
                <input
                  type="text"
                  className="w-full px-4 py-2 bg-black/30 border border-white/10 rounded-lg"
                  placeholder="e.g., New Delhi, London, Toronto"
                />
              </div>

              <div className="grid md:grid-cols-3 gap-4">
                <div>
                  <label className="block text-sm text-gray-400 mb-2">Language</label>
                  <select className="w-full px-4 py-2 bg-black/30 border border-white/10 rounded-lg">
                    <option>English</option>
                    <option>Hindi</option>
                    <option>French</option>
                    <option>Spanish</option>
                    <option>Multi-lingual</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm text-gray-400 mb-2">Timezone</label>
                  <select className="w-full px-4 py-2 bg-black/30 border border-white/10 rounded-lg">
                    <option>IST (GMT+5:30)</option>
                    <option>GMT (GMT+0)</option>
                    <option>EST (GMT-5)</option>
                    <option>PST (GMT-8)</option>
                    <option>AEDT (GMT+11)</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm text-gray-400 mb-2">Schedule Time</label>
                  <input
                    type="datetime-local"
                    className="w-full px-4 py-2 bg-black/30 border border-white/10 rounded-lg"
                  />
                </div>
              </div>

              <div className="flex space-x-3">
                <button className="px-6 py-2 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg font-semibold">
                  🚀 Create Campaign
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

        <div className="space-y-4">
          {geoTargets.map(target => (
            <div key={target.id} className="p-6 bg-white/5 backdrop-blur-lg rounded-2xl border border-white/10">
              <div className="flex items-start justify-between mb-4">
                <div className="flex-1">
                  <div className="flex items-center space-x-3 mb-2">
                    <h3 className="text-2xl font-bold">{target.postTitle}</h3>
                    <span className={`px-3 py-1 rounded-full text-xs ${getStatusColor(target.status)}`}>
                      {target.status.toUpperCase()}
                    </span>
                  </div>
                  
                  <div className="grid md:grid-cols-2 gap-4 mb-4">
                    <div>
                      <div className="text-sm text-gray-400 mb-2">🌍 Regions</div>
                      <div className="flex flex-wrap gap-2">
                        {target.regions.map(region => (
                          <span key={region} className="text-xs px-2 py-1 bg-blue-600/30 rounded">
                            {region}
                          </span>
                        ))}
                      </div>
                    </div>

                    <div>
                      <div className="text-sm text-gray-400 mb-2">🚩 Countries</div>
                      <div className="flex flex-wrap gap-2">
                        {target.countries.map(country => (
                          <span key={country} className="text-xs px-2 py-1 bg-purple-600/30 rounded">
                            {country}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>

                  <div className="grid md:grid-cols-2 gap-4 mb-4">
                    <div>
                      <div className="text-sm text-gray-400 mb-2">📍 Cities</div>
                      <div className="flex flex-wrap gap-2">
                        {target.cities.map(city => (
                          <span key={city} className="text-xs px-2 py-1 bg-green-600/30 rounded">
                            {city}
                          </span>
                        ))}
                      </div>
                    </div>

                    <div className="space-y-1">
                      <div className="text-sm"><span className="text-gray-400">Language:</span> <span className="font-bold">{target.language}</span></div>
                      <div className="text-sm"><span className="text-gray-400">Timezone:</span> <span className="font-bold">{target.timezone}</span></div>
                      <div className="text-sm"><span className="text-gray-400">Scheduled:</span> <span className="font-bold">{target.scheduledTime}</span></div>
                    </div>
                  </div>

                  <div className="flex items-center space-x-4 text-sm">
                    <div className="px-4 py-2 bg-black/30 rounded-lg">
                      <span className="text-gray-400">Est. Reach: </span>
                      <span className="font-bold text-blue-400">{(target.reach / 1000000).toFixed(1)}M</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex space-x-2">
                <button className="px-4 py-2 bg-blue-600 hover:bg-blue-700 rounded-lg text-sm">
                  ✏️ Edit
                </button>
                <button className="px-4 py-2 bg-purple-600 hover:bg-purple-700 rounded-lg text-sm">
                  📊 View Analytics
                </button>
                <button className="px-4 py-2 bg-green-600 hover:bg-green-700 rounded-lg text-sm">
                  📋 Duplicate
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

