'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

export default function AdminDashboard() {
  const router = useRouter();
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check authentication
    const token = localStorage.getItem('accessToken');
    const userData = localStorage.getItem('user');

    if (!token || !userData) {
      router.push('/login');
      return;
    }

    const parsedUser = JSON.parse(userData);
    
    // Check if user has ADMIN role
    if (parsedUser.role !== 'ADMIN') {
      alert('Access Denied: Admin privileges required');
      router.push('/dashboard');
      return;
    }

    setUser(parsedUser);
    setLoading(false);
  }, [router]);

  const handleLogout = () => {
    localStorage.removeItem('accessToken');
    localStorage.removeItem('user');
    router.push('/login');
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 flex items-center justify-center">
        <div className="text-white text-xl">Loading...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 text-white">
      {/* Navigation */}
      <nav className="border-b border-white/10 bg-black/20 backdrop-blur-lg">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="w-10 h-10 bg-gradient-to-br from-red-500 to-pink-600 rounded-xl flex items-center justify-center">
                <span className="text-2xl">🔐</span>
              </div>
              <div>
                <h1 className="text-xl font-bold">Admin Dashboard</h1>
                <p className="text-xs text-gray-400">Full System Control</p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <div className="text-right">
                <p className="text-sm font-semibold">{user?.firstName} {user?.lastName}</p>
                <p className="text-xs text-gray-400">Administrator</p>
              </div>
              <button
                onClick={handleLogout}
                className="px-4 py-2 bg-red-600 hover:bg-red-700 rounded-lg transition-colors"
              >
                Logout
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <div className="container mx-auto px-6 py-12">
        {/* Welcome Section */}
        <div className="mb-12">
          <h2 className="text-4xl font-bold mb-4">
            Welcome back, <span className="bg-gradient-to-r from-red-400 to-pink-400 bg-clip-text text-transparent">{user?.firstName}</span>! 👋
          </h2>
          <p className="text-gray-300 text-lg">You have full administrative control over the platform.</p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-12">
          <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 border border-white/20">
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 bg-blue-500/20 rounded-xl flex items-center justify-center">
                <span className="text-2xl">👥</span>
              </div>
              <span className="text-xs text-green-400">+12%</span>
            </div>
            <p className="text-3xl font-bold mb-2">1,234</p>
            <p className="text-gray-400 text-sm">Total Users</p>
          </div>

          <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 border border-white/20">
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 bg-purple-500/20 rounded-xl flex items-center justify-center">
                <span className="text-2xl">📝</span>
              </div>
              <span className="text-xs text-green-400">+23%</span>
            </div>
            <p className="text-3xl font-bold mb-2">5,678</p>
            <p className="text-gray-400 text-sm">Total Posts</p>
          </div>

          <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 border border-white/20">
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 bg-green-500/20 rounded-xl flex items-center justify-center">
                <span className="text-2xl">📊</span>
              </div>
              <span className="text-xs text-green-400">+18%</span>
            </div>
            <p className="text-3xl font-bold mb-2">89.5%</p>
            <p className="text-gray-400 text-sm">System Health</p>
          </div>

          <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 border border-white/20">
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 bg-orange-500/20 rounded-xl flex items-center justify-center">
                <span className="text-2xl">⚡</span>
              </div>
              <span className="text-xs text-yellow-400">Alert</span>
            </div>
            <p className="text-3xl font-bold mb-2">3</p>
            <p className="text-gray-400 text-sm">Pending Actions</p>
          </div>
        </div>

        {/* Admin Actions Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Link href="/admin/users" className="bg-gradient-to-br from-blue-500/20 to-cyan-500/20 backdrop-blur-lg rounded-2xl p-6 border border-white/20 hover:scale-105 transition-transform">
            <div className="w-16 h-16 bg-blue-500 rounded-2xl flex items-center justify-center mb-4">
              <span className="text-3xl">👥</span>
            </div>
            <h3 className="text-2xl font-bold mb-2">User Management</h3>
            <p className="text-gray-300">Manage users, roles, and permissions</p>
          </Link>

          <Link href="/admin/content" className="bg-gradient-to-br from-purple-500/20 to-pink-500/20 backdrop-blur-lg rounded-2xl p-6 border border-white/20 hover:scale-105 transition-transform">
            <div className="w-16 h-16 bg-purple-500 rounded-2xl flex items-center justify-center mb-4">
              <span className="text-3xl">📝</span>
            </div>
            <h3 className="text-2xl font-bold mb-2">Content Moderation</h3>
            <p className="text-gray-300">Review and moderate all content</p>
          </Link>

          <Link href="/admin/analytics" className="bg-gradient-to-br from-green-500/20 to-emerald-500/20 backdrop-blur-lg rounded-2xl p-6 border border-white/20 hover:scale-105 transition-transform">
            <div className="w-16 h-16 bg-green-500 rounded-2xl flex items-center justify-center mb-4">
              <span className="text-3xl">📊</span>
            </div>
            <h3 className="text-2xl font-bold mb-2">System Analytics</h3>
            <p className="text-gray-300">View detailed system metrics</p>
          </Link>

          <Link href="/admin/settings" className="bg-gradient-to-br from-orange-500/20 to-red-500/20 backdrop-blur-lg rounded-2xl p-6 border border-white/20 hover:scale-105 transition-transform">
            <div className="w-16 h-16 bg-orange-500 rounded-2xl flex items-center justify-center mb-4">
              <span className="text-3xl">⚙️</span>
            </div>
            <h3 className="text-2xl font-bold mb-2">System Settings</h3>
            <p className="text-gray-300">Configure platform settings</p>
          </Link>

          <Link href="/admin/security" className="bg-gradient-to-br from-red-500/20 to-pink-500/20 backdrop-blur-lg rounded-2xl p-6 border border-white/20 hover:scale-105 transition-transform">
            <div className="w-16 h-16 bg-red-500 rounded-2xl flex items-center justify-center mb-4">
              <span className="text-3xl">🔒</span>
            </div>
            <h3 className="text-2xl font-bold mb-2">Security & Audit</h3>
            <p className="text-gray-300">Monitor security and audit logs</p>
          </Link>

          <Link href="/admin/integrations" className="bg-gradient-to-br from-indigo-500/20 to-purple-500/20 backdrop-blur-lg rounded-2xl p-6 border border-white/20 hover:scale-105 transition-transform">
            <div className="w-16 h-16 bg-indigo-500 rounded-2xl flex items-center justify-center mb-4">
              <span className="text-3xl">🔗</span>
            </div>
            <h3 className="text-2xl font-bold mb-2">Integrations</h3>
            <p className="text-gray-300">Manage API keys and connections</p>
          </Link>
        </div>

        {/* Recent Activity */}
        <div className="mt-12">
          <h3 className="text-2xl font-bold mb-6">Recent Activity</h3>
          <div className="bg-white/10 backdrop-blur-lg rounded-2xl border border-white/20 divide-y divide-white/10">
            {[
              { action: 'New user registered', user: 'john.doe@example.com', time: '2 minutes ago', icon: '👤' },
              { action: 'Content published', user: 'author@example.com', time: '15 minutes ago', icon: '📝' },
              { action: 'System settings updated', user: 'admin@example.com', time: '1 hour ago', icon: '⚙️' },
              { action: 'Security scan completed', user: 'System', time: '2 hours ago', icon: '🔒' },
            ].map((activity, index) => (
              <div key={index} className="p-4 hover:bg-white/5 transition-colors">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    <span className="text-2xl">{activity.icon}</span>
                    <div>
                      <p className="font-semibold">{activity.action}</p>
                      <p className="text-sm text-gray-400">{activity.user}</p>
                    </div>
                  </div>
                  <span className="text-sm text-gray-400">{activity.time}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

