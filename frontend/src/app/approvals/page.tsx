'use client';

import { useState } from 'react';
import Link from 'next/link';

interface ApprovalRequest {
  id: string;
  contentType: 'post' | 'campaign' | 'reel' | 'story';
  title: string;
  content: string;
  platforms: string[];
  createdBy: string;
  createdAt: string;
  currentLevel: number;
  totalLevels: number;
  status: 'pending' | 'approved' | 'rejected' | 'revision_requested';
  approvers: Array<{
    level: number;
    name: string;
    role: string;
    status: 'pending' | 'approved' | 'rejected' | 'revision';
    comment?: string;
    timestamp?: string;
  }>;
}

export default function ApprovalWorkflow() {
  const [requests, setRequests] = useState<ApprovalRequest[]>([
    {
      id: '1',
      contentType: 'post',
      title: 'CSPOC 2026 Opening Ceremony Announcement',
      content: '🎉 Historic moment! The 28th Conference of Speakers and Presiding Officers of the Commonwealth (CSPOC 2026) begins January 14th at the Parliament of India. Join us as world leaders unite for democracy! #CSPOC2026 #Parliament #Democracy',
      platforms: ['Facebook', 'Twitter/X', 'LinkedIn'],
      createdBy: 'Priya Sharma',
      createdAt: '2025-12-25 10:30',
      currentLevel: 2,
      totalLevels: 3,
      status: 'pending',
      approvers: [
        { level: 1, name: 'Anita Patel', role: 'Content Manager', status: 'approved', comment: 'Looks great!', timestamp: '2025-12-25 11:00' },
        { level: 2, name: 'Rajesh Mehta', role: 'Communications Director', status: 'pending' },
        { level: 3, name: 'Dr. Vikram Singh', role: 'Secretary General', status: 'pending' },
      ],
    },
    {
      id: '2',
      contentType: 'campaign',
      title: 'Speaker Spotlight Campaign',
      content: 'Multi-post campaign highlighting each keynote speaker with bio, achievements, and interview snippets.',
      platforms: ['Instagram', 'Facebook', 'LinkedIn'],
      createdBy: 'Rajesh Kumar',
      createdAt: '2025-12-24 15:20',
      currentLevel: 1,
      totalLevels: 2,
      status: 'revision_requested',
      approvers: [
        { level: 1, name: 'Anita Patel', role: 'Content Manager', status: 'revision', comment: 'Please add more emphasis on Commonwealth unity theme', timestamp: '2025-12-25 09:15' },
        { level: 2, name: 'Rajesh Mehta', role: 'Communications Director', status: 'pending' },
      ],
    },
    {
      id: '3',
      contentType: 'reel',
      title: 'Behind the Scenes Setup',
      content: '60-second reel showing parliament hall preparation, security briefing, and tech setup',
      platforms: ['Instagram', 'YouTube'],
      createdBy: 'Vikram Singh',
      createdAt: '2025-12-25 14:00',
      currentLevel: 3,
      totalLevels: 3,
      status: 'approved',
      approvers: [
        { level: 1, name: 'Anita Patel', role: 'Content Manager', status: 'approved', timestamp: '2025-12-25 14:30' },
        { level: 2, name: 'Rajesh Mehta', role: 'Communications Director', status: 'approved', timestamp: '2025-12-25 15:00' },
        { level: 3, name: 'Dr. Vikram Singh', role: 'Secretary General', status: 'approved', timestamp: '2025-12-25 16:00' },
      ],
    },
  ]);

  const [selectedRequest, setSelectedRequest] = useState<ApprovalRequest | null>(null);
  const [actionComment, setActionComment] = useState('');

  const handleAction = (action: 'approve' | 'reject' | 'revision') => {
    if (!selectedRequest) return;
    
    const actionText = action === 'approve' ? 'approved' : action === 'reject' ? 'rejected' : 'requested revisions for';
    alert(`✅ You have ${actionText} "${selectedRequest.title}"\n\n${actionComment ? `Comment: ${actionComment}` : ''}`);
    setSelectedRequest(null);
    setActionComment('');
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'approved': return 'bg-green-600/30 border-green-500/50 text-green-400';
      case 'rejected': return 'bg-red-600/30 border-red-500/50 text-red-400';
      case 'revision_requested': return 'bg-yellow-600/30 border-yellow-500/50 text-yellow-400';
      default: return 'bg-blue-600/30 border-blue-500/50 text-blue-400';
    }
  };

  const getApproverStatusIcon = (status: string) => {
    switch (status) {
      case 'approved': return '✅';
      case 'rejected': return '❌';
      case 'revision': return '🔄';
      default: return '⏳';
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
              <Link href="/dashboard" className="px-4 py-2 hover:bg-white/10 rounded-lg">Dashboard</Link>
              <Link href="/approvals" className="px-4 py-2 bg-white/10 rounded-lg font-semibold">Approvals</Link>
            </div>
          </div>
        </div>
      </nav>

      <div className="container mx-auto px-6 py-8">
        <div className="mb-8">
          <h1 className="text-5xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent mb-4">
            Approval Workflow
          </h1>
          <p className="text-xl text-gray-400">Multi-level content review and approval</p>
        </div>

        <div className="grid grid-cols-3 gap-6 mb-8">
          <div className="p-6 bg-white/5 backdrop-blur-lg rounded-2xl border border-white/10">
            <div className="text-4xl font-bold text-blue-400">{requests.filter(r => r.status === 'pending').length}</div>
            <div className="text-gray-400">Pending Review</div>
          </div>
          <div className="p-6 bg-white/5 backdrop-blur-lg rounded-2xl border border-white/10">
            <div className="text-4xl font-bold text-green-400">{requests.filter(r => r.status === 'approved').length}</div>
            <div className="text-gray-400">Approved</div>
          </div>
          <div className="p-6 bg-white/5 backdrop-blur-lg rounded-2xl border border-white/10">
            <div className="text-4xl font-bold text-yellow-400">{requests.filter(r => r.status === 'revision_requested').length}</div>
            <div className="text-gray-400">Revision Requested</div>
          </div>
        </div>

        <div className="space-y-4">
          {requests.map(request => (
            <div key={request.id} className="p-6 bg-white/5 backdrop-blur-lg rounded-2xl border border-white/10">
              <div className="flex items-start justify-between mb-4">
                <div className="flex-1">
                  <div className="flex items-center space-x-3 mb-2">
                    <h3 className="text-2xl font-bold">{request.title}</h3>
                    <span className={`text-xs px-3 py-1 rounded-full border ${getStatusColor(request.status)}`}>
                      {request.status.replace('_', ' ').toUpperCase()}
                    </span>
                  </div>
                  <p className="text-gray-400 mb-3">{request.content}</p>
                  <div className="flex items-center space-x-4 text-sm text-gray-400">
                    <span>📝 {request.contentType}</span>
                    <span>👤 {request.createdBy}</span>
                    <span>🕐 {request.createdAt}</span>
                    <span>📱 {request.platforms.join(', ')}</span>
                  </div>
                </div>
              </div>

              <div className="mb-4">
                <div className="text-sm font-semibold mb-3">Approval Progress ({request.currentLevel}/{request.totalLevels})</div>
                <div className="space-y-2">
                  {request.approvers.map((approver, i) => (
                    <div key={i} className={`p-3 rounded-lg ${
                      approver.status === 'approved' ? 'bg-green-600/10' :
                      approver.status === 'rejected' ? 'bg-red-600/10' :
                      approver.status === 'revision' ? 'bg-yellow-600/10' : 'bg-white/5'
                    }`}>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-3">
                          <span className="text-2xl">{getApproverStatusIcon(approver.status)}</span>
                          <div>
                            <div className="font-semibold">Level {approver.level}: {approver.name}</div>
                            <div className="text-xs text-gray-400">{approver.role}</div>
                          </div>
                        </div>
                        <div className="text-right text-xs text-gray-400">
                          {approver.timestamp && <div>{approver.timestamp}</div>}
                        </div>
                      </div>
                      {approver.comment && (
                        <div className="mt-2 text-sm text-gray-300 pl-11">
                          💬 {approver.comment}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>

              <div className="flex items-center space-x-3">
                <button
                  onClick={() => setSelectedRequest(request)}
                  className="px-6 py-2 bg-blue-600/30 hover:bg-blue-600/50 rounded-lg transition-colors"
                >
                  Review
                </button>
                {request.status === 'approved' && (
                  <button className="px-6 py-2 bg-green-600/30 hover:bg-green-600/50 rounded-lg transition-colors">
                    📤 Publish Now
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      {selectedRequest && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-6">
          <div className="bg-gradient-to-br from-slate-900 to-purple-900 rounded-3xl border border-white/20 p-8 max-w-3xl w-full max-h-[90vh] overflow-y-auto">
            <h2 className="text-3xl font-bold mb-6">Review: {selectedRequest.title}</h2>
            
            <div className="p-4 bg-white/5 rounded-xl mb-6">
              <div className="font-semibold mb-2">Content:</div>
              <p className="text-gray-300">{selectedRequest.content}</p>
            </div>

            <div className="mb-6">
              <label className="block text-sm font-semibold mb-2">Your Comment (optional)</label>
              <textarea
                value={actionComment}
                onChange={(e) => setActionComment(e.target.value)}
                placeholder="Add feedback or instructions..."
                className="w-full h-24 px-4 py-3 bg-white/5 border border-white/10 rounded-xl focus:outline-none focus:border-purple-500/50 resize-none"
              />
            </div>

            <div className="grid grid-cols-3 gap-4">
              <button
                onClick={() => handleAction('approve')}
                className="px-6 py-3 bg-green-600 hover:bg-green-700 rounded-xl font-bold transition-colors"
              >
                ✅ Approve
              </button>
              <button
                onClick={() => handleAction('revision')}
                className="px-6 py-3 bg-yellow-600 hover:bg-yellow-700 rounded-xl font-bold transition-colors"
              >
                🔄 Request Revision
              </button>
              <button
                onClick={() => handleAction('reject')}
                className="px-6 py-3 bg-red-600 hover:bg-red-700 rounded-xl font-bold transition-colors"
              >
                ❌ Reject
              </button>
            </div>

            <button
              onClick={() => { setSelectedRequest(null); setActionComment(''); }}
              className="w-full mt-4 px-6 py-3 bg-white/5 hover:bg-white/10 rounded-xl transition-colors"
            >
              Cancel
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

