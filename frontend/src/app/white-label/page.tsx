'use client';

import { useState } from 'react';
import Link from 'next/link';

interface Tenant {
  id: string;
  name: string;
  domain: string;
  logo: string;
  status: 'active' | 'inactive' | 'trial';
  users: number;
  plan: string;
  createdAt: string;
  billingStatus: string;
}

export default function WhiteLabel() {
  const [tenants] = useState<Tenant[]>([
    {
      id: '1',
      name: 'Ministry of External Affairs',
      domain: 'mea.guddu.gov.in',
      logo: '🏛️',
      status: 'active',
      users: 45,
      plan: 'Enterprise',
      createdAt: '2025-01-15',
      billingStatus: 'Paid',
    },
    {
      id: '2',
      name: 'Ministry of Home Affairs',
      domain: 'mha.guddu.gov.in',
      logo: '🛡️',
      status: 'active',
      users: 32,
      plan: 'Enterprise',
      createdAt: '2025-02-01',
      billingStatus: 'Paid',
    },
    {
      id: '3',
      name: 'Parliament Communications',
      domain: 'parliament.guddu.gov.in',
      logo: '⚖️',
      status: 'trial',
      users: 12,
      plan: 'Trial',
      createdAt: '2025-12-20',
      billingStatus: 'Trial (14 days left)',
    },
  ]);

  const [showCreateModal, setShowCreateModal] = useState(false);

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
                Guddu-Project Admin
              </h1>
            </Link>
            <div className="flex items-center space-x-4">
              <Link href="/dashboard" className="px-4 py-2 hover:bg-white/10 rounded-lg">Dashboard</Link>
              <Link href="/white-label" className="px-4 py-2 bg-white/10 rounded-lg font-semibold">Tenants</Link>
            </div>
          </div>
        </div>
      </nav>

      <div className="container mx-auto px-6 py-8">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-5xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent mb-4">
              Multi-Tenant Management
            </h1>
            <p className="text-xl text-gray-400">White-label instances for government organizations</p>
          </div>
          <button
            onClick={() => setShowCreateModal(true)}
            className="px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl font-bold hover:shadow-lg transition-all"
          >
            + New Tenant
          </button>
        </div>

        <div className="grid grid-cols-3 gap-6 mb-8">
          <div className="p-6 bg-white/5 backdrop-blur-lg rounded-2xl border border-white/10">
            <div className="text-4xl font-bold text-blue-400">{tenants.length}</div>
            <div className="text-gray-400">Total Tenants</div>
          </div>
          <div className="p-6 bg-white/5 backdrop-blur-lg rounded-2xl border border-white/10">
            <div className="text-4xl font-bold text-green-400">{tenants.filter(t => t.status === 'active').length}</div>
            <div className="text-gray-400">Active</div>
          </div>
          <div className="p-6 bg-white/5 backdrop-blur-lg rounded-2xl border border-white/10">
            <div className="text-4xl font-bold text-purple-400">{tenants.reduce((sum, t) => sum + t.users, 0)}</div>
            <div className="text-gray-400">Total Users</div>
          </div>
        </div>

        <div className="space-y-4">
          {tenants.map(tenant => (
            <div key={tenant.id} className="p-6 bg-white/5 backdrop-blur-lg rounded-2xl border border-white/10">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl flex items-center justify-center text-3xl">
                    {tenant.logo}
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold">{tenant.name}</h3>
                    <div className="text-sm text-gray-400">🌐 {tenant.domain}</div>
                  </div>
                </div>
                <span className={`px-4 py-2 rounded-lg ${
                  tenant.status === 'active' ? 'bg-green-600/30 text-green-400' :
                  tenant.status === 'trial' ? 'bg-yellow-600/30 text-yellow-400' :
                  'bg-gray-600/30 text-gray-400'
                }`}>
                  {tenant.status.toUpperCase()}
                </span>
              </div>

              <div className="grid grid-cols-4 gap-4 mt-6">
                <div className="p-3 bg-black/30 rounded-lg">
                  <div className="text-xs text-gray-400 mb-1">Users</div>
                  <div className="text-xl font-bold">{tenant.users}</div>
                </div>
                <div className="p-3 bg-black/30 rounded-lg">
                  <div className="text-xs text-gray-400 mb-1">Plan</div>
                  <div className="text-xl font-bold">{tenant.plan}</div>
                </div>
                <div className="p-3 bg-black/30 rounded-lg">
                  <div className="text-xs text-gray-400 mb-1">Created</div>
                  <div className="text-xl font-bold">{tenant.createdAt}</div>
                </div>
                <div className="p-3 bg-black/30 rounded-lg">
                  <div className="text-xs text-gray-400 mb-1">Billing</div>
                  <div className="text-sm font-bold">{tenant.billingStatus}</div>
                </div>
              </div>

              <div className="flex items-center space-x-3 mt-4">
                <button className="px-6 py-2 bg-blue-600/30 hover:bg-blue-600/50 rounded-lg transition-colors">
                  🔧 Configure
                </button>
                <button className="px-6 py-2 bg-purple-600/30 hover:bg-purple-600/50 rounded-lg transition-colors">
                  👥 Manage Users
                </button>
                <button className="px-6 py-2 bg-green-600/30 hover:bg-green-600/50 rounded-lg transition-colors">
                  📊 View Analytics
                </button>
                <button className="px-6 py-2 bg-white/10 hover:bg-white/20 rounded-lg transition-colors">
                  🔑 API Keys
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {showCreateModal && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-6">
          <div className="bg-gradient-to-br from-slate-900 to-purple-900 rounded-3xl border border-white/20 p-8 max-w-2xl w-full">
            <h2 className="text-3xl font-bold mb-6">Create New Tenant</h2>
            <div className="space-y-4">
              <input
                type="text"
                placeholder="Organization name..."
                className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl focus:outline-none focus:border-purple-500/50"
              />
              <input
                type="text"
                placeholder="Subdomain (e.g., mea)..."
                className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl focus:outline-none focus:border-purple-500/50"
              />
              <select className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl focus:outline-none focus:border-purple-500/50">
                <option>Enterprise Plan</option>
                <option>Professional Plan</option>
                <option>Trial (14 days)</option>
              </select>
              <div className="flex space-x-4">
                <button className="flex-1 px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl font-bold">
                  Create Tenant
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

