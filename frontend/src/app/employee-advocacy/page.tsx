'use client';

import { useState } from 'react';
import Link from 'next/link';

interface Employee {
  id: string;
  name: string;
  department: string;
  sharesCount: number;
  reach: number;
  engagement: number;
  active: boolean;
}

interface ContentItem {
  id: string;
  title: string;
  content: string;
  shares: number;
  reach: number;
  category: string;
}

export default function EmployeeAdvocacy() {
  const [employees] = useState<Employee[]>([
    { id: '1', name: 'Dr. Sharma', department: 'Communications', sharesCount: 45, reach: 125000, engagement: 8.2, active: true },
    { id: '2', name: 'Ms. Patel', department: 'Public Relations', sharesCount: 38, reach: 98000, engagement: 7.5, active: true },
    { id: '3', name: 'Mr. Kumar', department: 'Digital Media', sharesCount: 52, reach: 156000, engagement: 9.1, active: true },
    { id: '4', name: 'Mrs. Singh', department: 'Policy', sharesCount: 28, reach: 76000, engagement: 6.8, active: false },
  ]);

  const [contentLibrary] = useState<ContentItem[]>([
    {
      id: '1',
      title: 'CSPOC 2026 Announcement',
      content: 'Share the exciting news about the upcoming Commonwealth conference...',
      shares: 145,
      reach: 487000,
      category: 'Event',
    },
    {
      id: '2',
      title: 'Parliamentary Democracy Facts',
      content: 'Interesting facts about parliamentary systems around the world...',
      shares: 89,
      reach: 234000,
      category: 'Education',
    },
    {
      id: '3',
      title: 'Team Achievement Highlight',
      content: 'Celebrating our team\'s success in digital engagement...',
      shares: 67,
      reach: 178000,
      category: 'Internal',
    },
  ]);

  const totalReach = employees.reduce((sum, e) => sum + e.reach, 0);
  const totalShares = employees.reduce((sum, e) => sum + e.sharesCount, 0);

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
              <Link href="/team" className="px-4 py-2 hover:bg-white/10 rounded-lg">Team</Link>
              <Link href="/employee-advocacy" className="px-4 py-2 bg-white/10 rounded-lg font-semibold">Employee Advocacy</Link>
            </div>
          </div>
        </div>
      </nav>

      <div className="container mx-auto px-6 py-8">
        <div className="mb-8">
          <h1 className="text-5xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent mb-4">
            Employee Advocacy Platform
          </h1>
          <p className="text-xl text-gray-400">Amplify your message through your team's networks</p>
        </div>

        <div className="grid grid-cols-4 gap-6 mb-8">
          <div className="p-6 bg-white/5 backdrop-blur-lg rounded-2xl border border-white/10">
            <div className="text-sm text-gray-400 mb-2">Active Advocates</div>
            <div className="text-3xl font-bold text-green-400">{employees.filter(e => e.active).length}</div>
          </div>
          <div className="p-6 bg-white/5 backdrop-blur-lg rounded-2xl border border-white/10">
            <div className="text-sm text-gray-400 mb-2">Total Shares</div>
            <div className="text-3xl font-bold text-blue-400">{totalShares}</div>
          </div>
          <div className="p-6 bg-white/5 backdrop-blur-lg rounded-2xl border border-white/10">
            <div className="text-sm text-gray-400 mb-2">Total Reach</div>
            <div className="text-3xl font-bold text-purple-400">{(totalReach / 1000).toFixed(0)}K</div>
          </div>
          <div className="p-6 bg-white/5 backdrop-blur-lg rounded-2xl border border-white/10">
            <div className="text-sm text-gray-400 mb-2">Avg Engagement</div>
            <div className="text-3xl font-bold text-yellow-400">
              {(employees.reduce((sum, e) => sum + e.engagement, 0) / employees.length).toFixed(1)}%
            </div>
          </div>
        </div>

        <div className="grid lg:grid-cols-2 gap-6">
          <div>
            <h2 className="text-2xl font-bold mb-4">Top Advocates</h2>
            <div className="space-y-3">
              {employees.map(employee => (
                <div key={employee.id} className="p-5 bg-white/5 backdrop-blur-lg rounded-2xl border border-white/10">
                  <div className="flex items-center justify-between mb-3">
                    <div>
                      <div className="font-bold text-lg">{employee.name}</div>
                      <div className="text-sm text-gray-400">{employee.department}</div>
                    </div>
                    <div className={`px-3 py-1 rounded-full text-xs ${
                      employee.active ? 'bg-green-600/30 text-green-400' : 'bg-gray-600/30 text-gray-400'
                    }`}>
                      {employee.active ? 'ACTIVE' : 'INACTIVE'}
                    </div>
                  </div>

                  <div className="grid grid-cols-3 gap-3">
                    <div className="p-2 bg-black/30 rounded text-center">
                      <div className="text-xs text-gray-400">Shares</div>
                      <div className="text-lg font-bold text-blue-400">{employee.sharesCount}</div>
                    </div>
                    <div className="p-2 bg-black/30 rounded text-center">
                      <div className="text-xs text-gray-400">Reach</div>
                      <div className="text-lg font-bold text-purple-400">{(employee.reach / 1000).toFixed(0)}K</div>
                    </div>
                    <div className="p-2 bg-black/30 rounded text-center">
                      <div className="text-xs text-gray-400">Engagement</div>
                      <div className="text-lg font-bold text-green-400">{employee.engagement}%</div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div>
            <h2 className="text-2xl font-bold mb-4">Share-Ready Content</h2>
            <div className="space-y-3">
              {contentLibrary.map(item => (
                <div key={item.id} className="p-5 bg-white/5 backdrop-blur-lg rounded-2xl border border-white/10">
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex-1">
                      <h3 className="font-bold text-lg mb-1">{item.title}</h3>
                      <p className="text-sm text-gray-400 mb-2">{item.content}</p>
                      <span className="text-xs px-2 py-1 bg-purple-600/30 rounded">{item.category}</span>
                    </div>
                  </div>

                  <div className="flex items-center justify-between text-sm mb-3">
                    <div>
                      <span className="text-gray-400">Shares: </span>
                      <span className="font-bold text-blue-400">{item.shares}</span>
                    </div>
                    <div>
                      <span className="text-gray-400">Reach: </span>
                      <span className="font-bold text-purple-400">{(item.reach / 1000).toFixed(0)}K</span>
                    </div>
                  </div>

                  <button className="w-full px-4 py-2 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg font-semibold hover:shadow-lg transition-all">
                    📤 Share to My Network
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

