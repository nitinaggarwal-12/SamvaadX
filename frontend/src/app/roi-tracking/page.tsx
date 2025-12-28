'use client';

import { useState } from 'react';
import Link from 'next/link';

interface Campaign {
  id: string;
  name: string;
  spend: number;
  revenue: number;
  roi: number;
  conversions: number;
  cpa: number;
  roas: number;
}

export default function ROITracking() {
  const [campaigns] = useState<Campaign[]>([
    {
      id: '1',
      name: 'CSPOC Registration Drive',
      spend: 125000,
      revenue: 487500,
      roi: 290,
      conversions: 892,
      cpa: 140,
      roas: 3.9,
    },
    {
      id: '2',
      name: 'Speaker Awareness Campaign',
      spend: 75000,
      revenue: 195000,
      roi: 160,
      conversions: 445,
      cpa: 168,
      roas: 2.6,
    },
    {
      id: '3',
      name: 'Event Live stream Promo',
      spend: 45000,
      revenue: 156000,
      roi: 247,
      conversions: 234,
      cpa: 192,
      roas: 3.5,
    },
  ]);

  const totalSpend = campaigns.reduce((sum, c) => sum + c.spend, 0);
  const totalRevenue = campaigns.reduce((sum, c) => sum + c.revenue, 0);
  const overallROI = ((totalRevenue - totalSpend) / totalSpend) * 100;

  const getRoiColor = (roi: number) => {
    if (roi > 200) return 'text-green-400';
    if (roi > 100) return 'text-yellow-400';
    return 'text-red-400';
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
              <Link href="/budget" className="px-4 py-2 hover:bg-white/10 rounded-lg">Budget</Link>
              <Link href="/roi-tracking" className="px-4 py-2 bg-white/10 rounded-lg font-semibold">ROI</Link>
            </div>
          </div>
        </div>
      </nav>

      <div className="container mx-auto px-6 py-8">
        <div className="mb-8">
          <h1 className="text-5xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent mb-4">
            ROI Tracking & Attribution
          </h1>
          <p className="text-xl text-gray-400">Measure return on investment across all campaigns</p>
        </div>

        <div className="grid grid-cols-4 gap-6 mb-8">
          <div className="p-6 bg-gradient-to-br from-green-900/30 to-green-600/20 backdrop-blur-lg rounded-2xl border border-green-500/30">
            <div className="text-sm text-gray-300 mb-2">Overall ROI</div>
            <div className="text-4xl font-bold text-green-400 mb-1">{overallROI.toFixed(0)}%</div>
            <div className="text-xs text-green-400">Highly profitable</div>
          </div>
          <div className="p-6 bg-white/5 backdrop-blur-lg rounded-2xl border border-white/10">
            <div className="text-sm text-gray-400 mb-2">Total Spend</div>
            <div className="text-3xl font-bold text-orange-400">₹{(totalSpend / 1000).toFixed(0)}K</div>
          </div>
          <div className="p-6 bg-white/5 backdrop-blur-lg rounded-2xl border border-white/10">
            <div className="text-sm text-gray-400 mb-2">Total Revenue</div>
            <div className="text-3xl font-bold text-green-400">₹{(totalRevenue / 1000).toFixed(0)}K</div>
          </div>
          <div className="p-6 bg-white/5 backdrop-blur-lg rounded-2xl border border-white/10">
            <div className="text-sm text-gray-400 mb-2">Net Profit</div>
            <div className="text-3xl font-bold text-blue-400">₹{((totalRevenue - totalSpend) / 1000).toFixed(0)}K</div>
          </div>
        </div>

        <div className="space-y-4">
          {campaigns.map(campaign => (
            <div key={campaign.id} className="p-6 bg-white/5 backdrop-blur-lg rounded-2xl border border-white/10">
              <div className="flex items-start justify-between mb-6">
                <div>
                  <h3 className="text-2xl font-bold mb-2">{campaign.name}</h3>
                  <div className={`text-5xl font-bold ${getRoiColor(campaign.roi)}`}>
                    {campaign.roi}% ROI
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-6 gap-4">
                <div className="p-4 bg-black/30 rounded-xl text-center">
                  <div className="text-xs text-gray-400 mb-1">Spend</div>
                  <div className="text-xl font-bold text-orange-400">₹{(campaign.spend / 1000).toFixed(0)}K</div>
                </div>
                <div className="p-4 bg-black/30 rounded-xl text-center">
                  <div className="text-xs text-gray-400 mb-1">Revenue</div>
                  <div className="text-xl font-bold text-green-400">₹{(campaign.revenue / 1000).toFixed(0)}K</div>
                </div>
                <div className="p-4 bg-black/30 rounded-xl text-center">
                  <div className="text-xs text-gray-400 mb-1">Conversions</div>
                  <div className="text-xl font-bold text-blue-400">{campaign.conversions}</div>
                </div>
                <div className="p-4 bg-black/30 rounded-xl text-center">
                  <div className="text-xs text-gray-400 mb-1">CPA</div>
                  <div className="text-xl font-bold text-purple-400">₹{campaign.cpa}</div>
                </div>
                <div className="p-4 bg-black/30 rounded-xl text-center">
                  <div className="text-xs text-gray-400 mb-1">ROAS</div>
                  <div className="text-xl font-bold text-yellow-400">{campaign.roas}x</div>
                </div>
                <div className="p-4 bg-black/30 rounded-xl text-center">
                  <div className="text-xs text-gray-400 mb-1">Profit</div>
                  <div className="text-xl font-bold text-green-400">₹{((campaign.revenue - campaign.spend) / 1000).toFixed(0)}K</div>
                </div>
              </div>

              <div className="mt-4 flex items-center space-x-3">
                <button className="px-6 py-2 bg-blue-600/30 hover:bg-blue-600/50 rounded-lg transition-colors">
                  📊 Full Report
                </button>
                <button className="px-6 py-2 bg-purple-600/30 hover:bg-purple-600/50 rounded-lg transition-colors">
                  📈 Attribution Model
                </button>
                <button className="px-6 py-2 bg-white/10 hover:bg-white/20 rounded-lg transition-colors">
                  📥 Export
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

