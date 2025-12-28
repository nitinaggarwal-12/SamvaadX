'use client';

import { useState } from 'react';
import Link from 'next/link';

interface Campaign {
  id: string;
  name: string;
  budget: number;
  spent: number;
  startDate: string;
  endDate: string;
  status: 'active' | 'paused' | 'completed';
}

interface BudgetAlert {
  id: string;
  campaignId: string;
  threshold: number;
  triggered: boolean;
  message: string;
}

export default function BudgetTracking() {
  const [campaigns] = useState<Campaign[]>([
    {
      id: '1',
      name: 'CSPOC 2026 Main Campaign',
      budget: 500000,
      spent: 387450,
      startDate: '2025-12-01',
      endDate: '2026-01-17',
      status: 'active',
    },
    {
      id: '2',
      name: 'Speaker Spotlight Series',
      budget: 150000,
      spent: 89230,
      startDate: '2025-12-15',
      endDate: '2026-01-10',
      status: 'active',
    },
    {
      id: '3',
      name: 'Post-Event Engagement',
      budget: 200000,
      spent: 0,
      startDate: '2026-01-18',
      endDate: '2026-02-28',
      status: 'paused',
    },
  ]);

  const [alerts] = useState<BudgetAlert[]>([
    {
      id: '1',
      campaignId: '1',
      threshold: 75,
      triggered: true,
      message: 'CSPOC Main Campaign has spent 77% of budget',
    },
    {
      id: '2',
      campaignId: '2',
      threshold: 90,
      triggered: false,
      message: 'Alert at 90% spending',
    },
  ]);

  const totalBudget = campaigns.reduce((sum, c) => sum + c.budget, 0);
  const totalSpent = campaigns.reduce((sum, c) => sum + c.spent, 0);
  const spendingRate = (totalSpent / totalBudget) * 100;

  const getCampaignSpendingPercent = (campaign: Campaign) => {
    return (campaign.spent / campaign.budget) * 100;
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-green-600/30 text-green-400';
      case 'paused': return 'bg-yellow-600/30 text-yellow-400';
      case 'completed': return 'bg-blue-600/30 text-blue-400';
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
              <Link href="/budget" className="px-4 py-2 bg-white/10 rounded-lg font-semibold">Budget</Link>
            </div>
          </div>
        </div>
      </nav>

      <div className="container mx-auto px-6 py-8">
        <div className="mb-8">
          <h1 className="text-5xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent mb-4">
            Budget Tracking
          </h1>
          <p className="text-xl text-gray-400">Monitor campaign spending and set alerts</p>
        </div>

        <div className="grid grid-cols-4 gap-6 mb-8">
          <div className="p-6 bg-white/5 backdrop-blur-lg rounded-2xl border border-white/10">
            <div className="text-sm text-gray-400 mb-2">Total Budget</div>
            <div className="text-3xl font-bold text-blue-400">₹{(totalBudget / 1000).toFixed(0)}K</div>
          </div>
          <div className="p-6 bg-white/5 backdrop-blur-lg rounded-2xl border border-white/10">
            <div className="text-sm text-gray-400 mb-2">Total Spent</div>
            <div className="text-3xl font-bold text-orange-400">₹{(totalSpent / 1000).toFixed(0)}K</div>
          </div>
          <div className="p-6 bg-white/5 backdrop-blur-lg rounded-2xl border border-white/10">
            <div className="text-sm text-gray-400 mb-2">Remaining</div>
            <div className="text-3xl font-bold text-green-400">₹{((totalBudget - totalSpent) / 1000).toFixed(0)}K</div>
          </div>
          <div className="p-6 bg-white/5 backdrop-blur-lg rounded-2xl border border-white/10">
            <div className="text-sm text-gray-400 mb-2">Spending Rate</div>
            <div className="text-3xl font-bold text-purple-400">{spendingRate.toFixed(1)}%</div>
          </div>
        </div>

        {alerts.filter(a => a.triggered).length > 0 && (
          <div className="mb-8 p-6 bg-red-600/20 border border-red-500/50 rounded-2xl">
            <div className="flex items-center space-x-3 mb-4">
              <span className="text-3xl">⚠️</span>
              <h2 className="text-2xl font-bold">Budget Alerts</h2>
            </div>
            <div className="space-y-2">
              {alerts.filter(a => a.triggered).map(alert => (
                <div key={alert.id} className="p-3 bg-black/30 rounded-lg">
                  {alert.message}
                </div>
              ))}
            </div>
          </div>
        )}

        <div className="space-y-4">
          {campaigns.map(campaign => {
            const spendingPercent = getCampaignSpendingPercent(campaign);
            const remaining = campaign.budget - campaign.spent;

            return (
              <div key={campaign.id} className="p-6 bg-white/5 backdrop-blur-lg rounded-2xl border border-white/10">
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <div className="flex items-center space-x-3 mb-2">
                      <h3 className="text-2xl font-bold">{campaign.name}</h3>
                      <span className={`text-xs px-3 py-1 rounded-full ${getStatusColor(campaign.status)}`}>
                        {campaign.status.toUpperCase()}
                      </span>
                    </div>
                    <div className="text-sm text-gray-400">
                      {campaign.startDate} → {campaign.endDate}
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-4 gap-4 mb-4">
                  <div className="p-3 bg-black/30 rounded-lg">
                    <div className="text-xs text-gray-400 mb-1">Budget</div>
                    <div className="text-xl font-bold">₹{campaign.budget.toLocaleString()}</div>
                  </div>
                  <div className="p-3 bg-black/30 rounded-lg">
                    <div className="text-xs text-gray-400 mb-1">Spent</div>
                    <div className="text-xl font-bold text-orange-400">₹{campaign.spent.toLocaleString()}</div>
                  </div>
                  <div className="p-3 bg-black/30 rounded-lg">
                    <div className="text-xs text-gray-400 mb-1">Remaining</div>
                    <div className="text-xl font-bold text-green-400">₹{remaining.toLocaleString()}</div>
                  </div>
                  <div className="p-3 bg-black/30 rounded-lg">
                    <div className="text-xs text-gray-400 mb-1">Spent %</div>
                    <div className={`text-xl font-bold ${
                      spendingPercent > 90 ? 'text-red-400' :
                      spendingPercent > 75 ? 'text-orange-400' :
                      'text-green-400'
                    }`}>
                      {spendingPercent.toFixed(1)}%
                    </div>
                  </div>
                </div>

                <div className="mb-4">
                  <div className="flex justify-between text-sm mb-2">
                    <span className="text-gray-400">Budget Usage</span>
                    <span className="font-semibold">{spendingPercent.toFixed(1)}%</span>
                  </div>
                  <div className="h-3 bg-black/30 rounded-full overflow-hidden">
                    <div 
                      className={`h-full transition-all ${
                        spendingPercent > 90 ? 'bg-red-500' :
                        spendingPercent > 75 ? 'bg-orange-500' :
                        'bg-green-500'
                      }`}
                      style={{ width: `${Math.min(spendingPercent, 100)}%` }}
                    />
                  </div>
                </div>

                <div className="flex items-center space-x-3">
                  <button className="px-6 py-2 bg-blue-600/30 hover:bg-blue-600/50 rounded-lg transition-colors">
                    📊 View Details
                  </button>
                  <button className="px-6 py-2 bg-purple-600/30 hover:bg-purple-600/50 rounded-lg transition-colors">
                    🔔 Set Alert
                  </button>
                  <button className="px-6 py-2 bg-white/10 hover:bg-white/20 rounded-lg transition-colors">
                    📈 Export Report
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

