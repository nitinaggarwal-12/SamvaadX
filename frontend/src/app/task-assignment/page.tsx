'use client';

import { useState } from 'react';
import Link from 'next/link';

interface Task {
  id: string;
  title: string;
  description: string;
  assignedTo: string[];
  assignedBy: string;
  dueDate: string;
  priority: 'low' | 'medium' | 'high' | 'urgent';
  status: 'pending' | 'in-progress' | 'review' | 'completed';
  relatedPost?: string;
  comments: number;
  attachments: number;
}

interface TeamMember {
  id: string;
  name: string;
  role: string;
  avatar: string;
}

export default function TaskAssignment() {
  const [tasks] = useState<Task[]>([
    {
      id: '1',
      title: 'Create CSPOC 2026 Announcement Graphics',
      description: 'Design 3 variants of the main announcement graphic for Twitter, Facebook, and LinkedIn',
      assignedTo: ['Sarah Lee', 'Mike Johnson'],
      assignedBy: 'Dr. Sharma',
      dueDate: '2024-12-28',
      priority: 'high',
      status: 'in-progress',
      relatedPost: 'CSPOC 2026 Main Announcement',
      comments: 5,
      attachments: 2,
    },
    {
      id: '2',
      title: 'Draft Delegate Registration Post',
      description: 'Write engaging copy for delegate registration announcement with clear CTA',
      assignedTo: ['John Doe'],
      assignedBy: 'Ms. Patel',
      dueDate: '2024-12-27',
      priority: 'urgent',
      status: 'review',
      relatedPost: 'Delegate Registration',
      comments: 8,
      attachments: 1,
    },
    {
      id: '3',
      title: 'Schedule Social Media Campaign',
      description: 'Set up automated posting schedule for the next 2 weeks',
      assignedTo: ['Jane Smith'],
      assignedBy: 'Dr. Sharma',
      dueDate: '2024-12-29',
      priority: 'medium',
      status: 'pending',
      comments: 2,
      attachments: 0,
    },
    {
      id: '4',
      title: 'Compile Weekly Analytics Report',
      description: 'Gather engagement metrics from all platforms and create comprehensive report',
      assignedTo: ['Mike Johnson', 'Sarah Lee'],
      assignedBy: 'Ms. Patel',
      dueDate: '2024-12-30',
      priority: 'low',
      status: 'completed',
      comments: 12,
      attachments: 3,
    },
  ]);

  const [teamMembers] = useState<TeamMember[]>([
    { id: '1', name: 'Dr. Sharma', role: 'Senior Manager', avatar: '👨‍💼' },
    { id: '2', name: 'Ms. Patel', role: 'Manager', avatar: '👩‍💼' },
    { id: '3', name: 'John Doe', role: 'Content Creator', avatar: '👨‍💻' },
    { id: '4', name: 'Jane Smith', role: 'Content Creator', avatar: '👩‍💻' },
    { id: '5', name: 'Mike Johnson', role: 'Designer', avatar: '🎨' },
    { id: '6', name: 'Sarah Lee', role: 'Social Media Manager', avatar: '📱' },
  ]);

  const [showCreateForm, setShowCreateForm] = useState(false);
  const [filterStatus, setFilterStatus] = useState<string>('all');

  const filteredTasks = tasks.filter(task => {
    if (filterStatus === 'all') return true;
    return task.status === filterStatus;
  });

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'urgent': return 'bg-red-600/30 text-red-400 border-red-500';
      case 'high': return 'bg-orange-600/30 text-orange-400 border-orange-500';
      case 'medium': return 'bg-yellow-600/30 text-yellow-400 border-yellow-500';
      case 'low': return 'bg-green-600/30 text-green-400 border-green-500';
      default: return 'bg-gray-600/30 text-gray-400 border-gray-500';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed': return 'bg-green-600/30 text-green-400';
      case 'in-progress': return 'bg-blue-600/30 text-blue-400';
      case 'review': return 'bg-purple-600/30 text-purple-400';
      case 'pending': return 'bg-yellow-600/30 text-yellow-400';
      default: return 'bg-gray-600/30 text-gray-400';
    }
  };

  const stats = {
    total: tasks.length,
    pending: tasks.filter(t => t.status === 'pending').length,
    inProgress: tasks.filter(t => t.status === 'in-progress').length,
    review: tasks.filter(t => t.status === 'review').length,
    completed: tasks.filter(t => t.status === 'completed').length,
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
              <Link href="/team" className="px-4 py-2 hover:bg-white/10 rounded-lg">Team</Link>
              <Link href="/task-assignment" className="px-4 py-2 bg-white/10 rounded-lg font-semibold">Tasks</Link>
            </div>
          </div>
        </div>
      </nav>

      <div className="container mx-auto px-6 py-8">
        <div className="mb-8 flex items-center justify-between">
          <div>
            <h1 className="text-5xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent mb-4">
              Task Assignment & Collaboration
            </h1>
            <p className="text-xl text-gray-400">Coordinate team efforts and track progress</p>
          </div>
          <button
            onClick={() => setShowCreateForm(!showCreateForm)}
            className="px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg font-semibold hover:shadow-lg"
          >
            ➕ Create Task
          </button>
        </div>

        <div className="grid grid-cols-5 gap-6 mb-8">
          <div className="p-6 bg-white/5 backdrop-blur-lg rounded-2xl border border-white/10">
            <div className="text-sm text-gray-400 mb-2">Total Tasks</div>
            <div className="text-3xl font-bold text-blue-400">{stats.total}</div>
          </div>
          <div className="p-6 bg-white/5 backdrop-blur-lg rounded-2xl border border-white/10">
            <div className="text-sm text-gray-400 mb-2">Pending</div>
            <div className="text-3xl font-bold text-yellow-400">{stats.pending}</div>
          </div>
          <div className="p-6 bg-white/5 backdrop-blur-lg rounded-2xl border border-white/10">
            <div className="text-sm text-gray-400 mb-2">In Progress</div>
            <div className="text-3xl font-bold text-blue-400">{stats.inProgress}</div>
          </div>
          <div className="p-6 bg-white/5 backdrop-blur-lg rounded-2xl border border-white/10">
            <div className="text-sm text-gray-400 mb-2">In Review</div>
            <div className="text-3xl font-bold text-purple-400">{stats.review}</div>
          </div>
          <div className="p-6 bg-white/5 backdrop-blur-lg rounded-2xl border border-white/10">
            <div className="text-sm text-gray-400 mb-2">Completed</div>
            <div className="text-3xl font-bold text-green-400">{stats.completed}</div>
          </div>
        </div>

        {showCreateForm && (
          <div className="mb-8 p-6 bg-white/5 backdrop-blur-lg rounded-2xl border border-white/10">
            <h2 className="text-2xl font-bold mb-4">Create New Task</h2>
            <div className="space-y-4">
              <div>
                <label className="block text-sm text-gray-400 mb-2">Task Title</label>
                <input
                  type="text"
                  className="w-full px-4 py-2 bg-black/30 border border-white/10 rounded-lg"
                  placeholder="e.g., Design event banner"
                />
              </div>
              <div>
                <label className="block text-sm text-gray-400 mb-2">Description</label>
                <textarea
                  className="w-full px-4 py-2 bg-black/30 border border-white/10 rounded-lg h-24"
                  placeholder="Describe the task..."
                />
              </div>
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm text-gray-400 mb-2">Assign To</label>
                  <select multiple className="w-full px-4 py-2 bg-black/30 border border-white/10 rounded-lg h-32">
                    {teamMembers.map(member => (
                      <option key={member.id} value={member.id}>
                        {member.avatar} {member.name} - {member.role}
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <div className="mb-4">
                    <label className="block text-sm text-gray-400 mb-2">Due Date</label>
                    <input
                      type="date"
                      className="w-full px-4 py-2 bg-black/30 border border-white/10 rounded-lg"
                    />
                  </div>
                  <div>
                    <label className="block text-sm text-gray-400 mb-2">Priority</label>
                    <select className="w-full px-4 py-2 bg-black/30 border border-white/10 rounded-lg">
                      <option>Low</option>
                      <option>Medium</option>
                      <option>High</option>
                      <option>Urgent</option>
                    </select>
                  </div>
                </div>
              </div>
              <div className="flex space-x-3">
                <button className="px-6 py-2 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg font-semibold">
                  ✅ Create Task
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
            onClick={() => setFilterStatus('in-progress')}
            className={`px-4 py-2 rounded-lg ${filterStatus === 'in-progress' ? 'bg-blue-600' : 'bg-white/5'}`}
          >
            In Progress ({stats.inProgress})
          </button>
          <button
            onClick={() => setFilterStatus('review')}
            className={`px-4 py-2 rounded-lg ${filterStatus === 'review' ? 'bg-purple-600' : 'bg-white/5'}`}
          >
            Review ({stats.review})
          </button>
          <button
            onClick={() => setFilterStatus('completed')}
            className={`px-4 py-2 rounded-lg ${filterStatus === 'completed' ? 'bg-green-600' : 'bg-white/5'}`}
          >
            Completed ({stats.completed})
          </button>
        </div>

        <div className="space-y-4">
          {filteredTasks.map(task => (
            <div key={task.id} className="p-6 bg-white/5 backdrop-blur-lg rounded-2xl border border-white/10">
              <div className="flex items-start justify-between mb-4">
                <div className="flex-1">
                  <div className="flex items-center space-x-3 mb-2">
                    <h3 className="text-xl font-bold">{task.title}</h3>
                    <span className={`px-3 py-1 rounded-full text-xs border ${getPriorityColor(task.priority)}`}>
                      {task.priority.toUpperCase()}
                    </span>
                    <span className={`px-3 py-1 rounded-full text-xs ${getStatusColor(task.status)}`}>
                      {task.status.toUpperCase().replace('-', ' ')}
                    </span>
                  </div>
                  <p className="text-gray-400 mb-3">{task.description}</p>
                  
                  {task.relatedPost && (
                    <div className="text-sm mb-3">
                      <span className="text-gray-400">Related Post:</span>{' '}
                      <span className="text-blue-400">{task.relatedPost}</span>
                    </div>
                  )}

                  <div className="flex items-center space-x-6 mb-3">
                    <div>
                      <span className="text-sm text-gray-400">Assigned By: </span>
                      <span className="font-bold">{task.assignedBy}</span>
                    </div>
                    <div>
                      <span className="text-sm text-gray-400">Due: </span>
                      <span className="font-bold">{task.dueDate}</span>
                    </div>
                  </div>

                  <div className="mb-3">
                    <div className="text-sm text-gray-400 mb-2">Assigned To:</div>
                    <div className="flex flex-wrap gap-2">
                      {task.assignedTo.map(person => (
                        <span key={person} className="px-3 py-1 bg-purple-600/30 rounded-full text-sm">
                          {person}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="flex items-center space-x-4 text-sm text-gray-400">
                    <span>💬 {task.comments} comments</span>
                    <span>📎 {task.attachments} attachments</span>
                  </div>
                </div>
              </div>

              <div className="flex space-x-2">
                <button className="px-4 py-2 bg-blue-600 hover:bg-blue-700 rounded-lg text-sm">
                  ✏️ Edit
                </button>
                <button className="px-4 py-2 bg-purple-600 hover:bg-purple-700 rounded-lg text-sm">
                  💬 Comment
                </button>
                <button className="px-4 py-2 bg-green-600 hover:bg-green-700 rounded-lg text-sm">
                  ✅ Mark Complete
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

