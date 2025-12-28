'use client';

import { useState } from 'react';
import Link from 'next/link';

interface ApprovalHistoryItem {
  id: string;
  postId: string;
  postTitle: string;
  postContent: string;
  submittedBy: string;
  submittedAt: string;
  approver: string;
  approvedAt?: string;
  rejectedAt?: string;
  status: 'pending' | 'approved' | 'rejected' | 'changes-requested';
  comments?: string;
  level: number;
  totalLevels: number;
}

export default function PostApprovalHistory() {
  const [historyItems] = useState<ApprovalHistoryItem[]>([
    {
      id: '1',
      postId: 'P123',
      postTitle: 'CSPOC 2026 Official Announcement',
      postContent: 'We are thrilled to announce the 28th Conference of Speakers & Presiding Officers of the Commonwealth...',
      submittedBy: 'John Doe (Content Creator)',
      submittedAt: '2024-12-26 09:00 AM',
      approver: 'Dr. Sharma (Senior Manager)',
      approvedAt: '2024-12-26 10:30 AM',
      status: 'approved',
      comments: 'Excellent content. Approved for publishing.',
      level: 2,
      totalLevels: 2,
    },
    {
      id: '2',
      postId: 'P124',
      postTitle: 'Delegate Registration Opening Soon',
      postContent: 'Registration for CSPOC 2026 delegates will open on March 1st, 2025...',
      submittedBy: 'Jane Smith (Content Creator)',
      submittedAt: '2024-12-26 11:00 AM',
      approver: 'Ms. Patel (Manager)',
      status: 'pending',
      level: 1,
      totalLevels: 2,
    },
    {
      id: '3',
      postId: 'P125',
      postTitle: 'Parliamentary Democracy Highlight',
      postContent: 'Did you know? The Westminster system has been adopted by...',
      submittedBy: 'Mike Johnson (Content Creator)',
      submittedAt: '2024-12-25 03:00 PM',
      approver: 'Dr. Sharma (Senior Manager)',
      rejectedAt: '2024-12-25 04:30 PM',
      status: 'rejected',
      comments: 'Content needs fact-checking. Please revise and resubmit.',
      level: 2,
      totalLevels: 2,
    },
    {
      id: '4',
      postId: 'P126',
      postTitle: 'Youth Engagement Initiative',
      postContent: 'We invite young citizens to participate in our democracy awareness program...',
      submittedBy: 'Sarah Lee (Content Creator)',
      submittedAt: '2024-12-26 02:00 PM',
      approver: 'Ms. Patel (Manager)',
      status: 'changes-requested',
      comments: 'Good initiative! Please add specific dates and registration link.',
      level: 1,
      totalLevels: 2,
    },
  ]);

  const [filterStatus, setFilterStatus] = useState<string>('all');

  const filteredHistory = historyItems.filter(item => {
    if (filterStatus === 'all') return true;
    return item.status === filterStatus;
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'approved': return 'bg-green-600/30 text-green-400';
      case 'rejected': return 'bg-red-600/30 text-red-400';
      case 'pending': return 'bg-yellow-600/30 text-yellow-400';
      case 'changes-requested': return 'bg-orange-600/30 text-orange-400';
      default: return 'bg-gray-600/30 text-gray-400';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'approved': return '✅';
      case 'rejected': return '❌';
      case 'pending': return '⏳';
      case 'changes-requested': return '🔄';
      default: return '📝';
    }
  };

  const stats = {
    total: historyItems.length,
    approved: historyItems.filter(i => i.status === 'approved').length,
    rejected: historyItems.filter(i => i.status === 'rejected').length,
    pending: historyItems.filter(i => i.status === 'pending').length,
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
              <Link href="/approvals" className="px-4 py-2 hover:bg-white/10 rounded-lg">Approvals</Link>
              <Link href="/approval-history" className="px-4 py-2 bg-white/10 rounded-lg font-semibold">History</Link>
            </div>
          </div>
        </div>
      </nav>

      <div className="container mx-auto px-6 py-8">
        <div className="mb-8">
          <h1 className="text-5xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent mb-4">
            Post Approval History
          </h1>
          <p className="text-xl text-gray-400">Complete audit trail of all approval workflows</p>
        </div>

        <div className="grid grid-cols-4 gap-6 mb-8">
          <div className="p-6 bg-white/5 backdrop-blur-lg rounded-2xl border border-white/10">
            <div className="text-sm text-gray-400 mb-2">Total Requests</div>
            <div className="text-3xl font-bold text-blue-400">{stats.total}</div>
          </div>
          <div className="p-6 bg-white/5 backdrop-blur-lg rounded-2xl border border-white/10">
            <div className="text-sm text-gray-400 mb-2">Approved</div>
            <div className="text-3xl font-bold text-green-400">{stats.approved}</div>
          </div>
          <div className="p-6 bg-white/5 backdrop-blur-lg rounded-2xl border border-white/10">
            <div className="text-sm text-gray-400 mb-2">Rejected</div>
            <div className="text-3xl font-bold text-red-400">{stats.rejected}</div>
          </div>
          <div className="p-6 bg-white/5 backdrop-blur-lg rounded-2xl border border-white/10">
            <div className="text-sm text-gray-400 mb-2">Pending</div>
            <div className="text-3xl font-bold text-yellow-400">{stats.pending}</div>
          </div>
        </div>

        <div className="mb-6 flex items-center space-x-3">
          <button
            onClick={() => setFilterStatus('all')}
            className={`px-4 py-2 rounded-lg ${filterStatus === 'all' ? 'bg-blue-600' : 'bg-white/5'}`}
          >
            All ({stats.total})
          </button>
          <button
            onClick={() => setFilterStatus('pending')}
            className={`px-4 py-2 rounded-lg ${filterStatus === 'pending' ? 'bg-yellow-600' : 'bg-white/5'}`}
          >
            Pending ({stats.pending})
          </button>
          <button
            onClick={() => setFilterStatus('approved')}
            className={`px-4 py-2 rounded-lg ${filterStatus === 'approved' ? 'bg-green-600' : 'bg-white/5'}`}
          >
            Approved ({stats.approved})
          </button>
          <button
            onClick={() => setFilterStatus('rejected')}
            className={`px-4 py-2 rounded-lg ${filterStatus === 'rejected' ? 'bg-red-600' : 'bg-white/5'}`}
          >
            Rejected ({stats.rejected})
          </button>
        </div>

        <div className="space-y-4">
          {filteredHistory.map(item => (
            <div key={item.id} className="p-6 bg-white/5 backdrop-blur-lg rounded-2xl border border-white/10">
              <div className="flex items-start justify-between mb-4">
                <div className="flex-1">
                  <div className="flex items-center space-x-3 mb-2">
                    <span className="text-2xl">{getStatusIcon(item.status)}</span>
                    <h3 className="text-xl font-bold">{item.postTitle}</h3>
                    <span className={`px-3 py-1 rounded-full text-xs ${getStatusColor(item.status)}`}>
                      {item.status.toUpperCase().replace('-', ' ')}
                    </span>
                  </div>
                  
                  <div className="text-sm text-gray-400 mb-1">
                    Post ID: <span className="font-mono text-blue-400">{item.postId}</span>
                  </div>
                  
                  <div className="p-4 bg-black/30 rounded-lg mb-3">
                    <p className="text-gray-300">{item.postContent}</p>
                  </div>

                  <div className="grid md:grid-cols-2 gap-4 mb-3">
                    <div className="space-y-1">
                      <div className="text-sm">
                        <span className="text-gray-400">Submitted by:</span>{' '}
                        <span className="font-bold">{item.submittedBy}</span>
                      </div>
                      <div className="text-sm text-gray-400">{item.submittedAt}</div>
                    </div>

                    <div className="space-y-1">
                      <div className="text-sm">
                        <span className="text-gray-400">Approver:</span>{' '}
                        <span className="font-bold">{item.approver}</span>
                      </div>
                      {item.approvedAt && (
                        <div className="text-sm text-green-400">{item.approvedAt}</div>
                      )}
                      {item.rejectedAt && (
                        <div className="text-sm text-red-400">{item.rejectedAt}</div>
                      )}
                    </div>
                  </div>

                  <div className="mb-3">
                    <div className="flex items-center space-x-2 mb-2">
                      <span className="text-sm text-gray-400">Approval Level:</span>
                      <div className="flex space-x-1">
                        {[...Array(item.totalLevels)].map((_, idx) => (
                          <div
                            key={idx}
                            className={`w-6 h-6 rounded-full flex items-center justify-center text-xs ${
                              idx < item.level
                                ? 'bg-green-600 text-white'
                                : 'bg-gray-600 text-gray-400'
                            }`}
                          >
                            {idx + 1}
                          </div>
                        ))}
                      </div>
                      <span className="text-xs text-gray-400">
                        (Level {item.level} of {item.totalLevels})
                      </span>
                    </div>
                  </div>

                  {item.comments && (
                    <div className="p-3 bg-blue-900/20 border border-blue-500/30 rounded-lg">
                      <div className="text-xs text-gray-400 mb-1">💬 Comments:</div>
                      <p className="text-sm text-blue-200">{item.comments}</p>
                    </div>
                  )}
                </div>
              </div>

              <div className="flex space-x-2">
                <button className="px-4 py-2 bg-blue-600 hover:bg-blue-700 rounded-lg text-sm">
                  👁️ View Full Details
                </button>
                {item.status === 'changes-requested' && (
                  <button className="px-4 py-2 bg-green-600 hover:bg-green-700 rounded-lg text-sm">
                    ✏️ Edit & Resubmit
                  </button>
                )}
                {item.status === 'approved' && (
                  <button className="px-4 py-2 bg-purple-600 hover:bg-purple-700 rounded-lg text-sm">
                    📊 View Performance
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>

        {filteredHistory.length === 0 && (
          <div className="text-center py-12 text-gray-400">
            <div className="text-6xl mb-4">📭</div>
            <p className="text-xl">No approval history found</p>
          </div>
        )}
      </div>
    </div>
  );
}

