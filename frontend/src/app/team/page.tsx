'use client';

import { useState } from 'react';
import Link from 'next/link';

interface TeamMember {
  id: string;
  name: string;
  role: string;
  avatar: string;
  status: 'online' | 'offline' | 'busy';
}

interface Task {
  id: string;
  title: string;
  description: string;
  assignedTo: string;
  assignedBy: string;
  priority: 'low' | 'medium' | 'high' | 'urgent';
  status: 'todo' | 'in_progress' | 'review' | 'done';
  dueDate: string;
  createdAt: string;
  comments: number;
}

export default function TeamCollaboration() {
  const [teamMembers] = useState<TeamMember[]>([
    { id: '1', name: 'Priya Sharma', role: 'Content Manager', avatar: '👩‍💼', status: 'online' },
    { id: '2', name: 'Rajesh Kumar', role: 'Graphic Designer', avatar: '👨‍🎨', status: 'online' },
    { id: '3', name: 'Anita Patel', role: 'Social Media Strategist', avatar: '👩‍💻', status: 'busy' },
    { id: '4', name: 'Vikram Singh', role: 'Video Editor', avatar: '👨‍🎬', status: 'offline' },
    { id: '5', name: 'Neha Gupta', role: 'Analytics Lead', avatar: '👩‍🔬', status: 'online' },
  ]);

  const [tasks, setTasks] = useState<Task[]>([
    {
      id: '1',
      title: 'Design CSPOC 2026 opening ceremony graphics',
      description: 'Create 5 graphics for opening ceremony announcement',
      assignedTo: 'Rajesh Kumar',
      assignedBy: 'Priya Sharma',
      priority: 'high',
      status: 'in_progress',
      dueDate: '2025-12-27',
      createdAt: '2025-12-24',
      comments: 3,
    },
    {
      id: '2',
      title: 'Draft welcome posts for keynote speakers',
      description: 'Write engaging posts introducing each speaker',
      assignedTo: 'Priya Sharma',
      assignedBy: 'Anita Patel',
      priority: 'urgent',
      status: 'in_progress',
      dueDate: '2025-12-26',
      createdAt: '2025-12-23',
      comments: 7,
    },
    {
      id: '3',
      title: 'Edit highlight reel from Day 1',
      description: '2-minute highlight video for social media',
      assignedTo: 'Vikram Singh',
      assignedBy: 'Priya Sharma',
      priority: 'medium',
      status: 'todo',
      dueDate: '2025-12-28',
      createdAt: '2025-12-24',
      comments: 1,
    },
    {
      id: '4',
      title: 'Analyze engagement metrics for December',
      description: 'Prepare monthly report with insights',
      assignedTo: 'Neha Gupta',
      assignedBy: 'Anita Patel',
      priority: 'medium',
      status: 'review',
      dueDate: '2025-12-30',
      createdAt: '2025-12-20',
      comments: 5,
    },
  ]);

  const [showCreateModal, setShowCreateModal] = useState(false);
  const [newTask, setNewTask] = useState({
    title: '',
    description: '',
    assignedTo: '',
    priority: 'medium' as const,
    dueDate: '',
  });

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'urgent': return 'bg-red-600/30 border-red-500/50 text-red-400';
      case 'high': return 'bg-orange-600/30 border-orange-500/50 text-orange-400';
      case 'medium': return 'bg-yellow-600/30 border-yellow-500/50 text-yellow-400';
      case 'low': return 'bg-green-600/30 border-green-500/50 text-green-400';
      default: return 'bg-gray-600/30 border-gray-500/50 text-gray-400';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'done': return 'bg-green-600/30 text-green-400';
      case 'in_progress': return 'bg-blue-600/30 text-blue-400';
      case 'review': return 'bg-purple-600/30 text-purple-400';
      default: return 'bg-gray-600/30 text-gray-400';
    }
  };

  const handleCreateTask = () => {
    if (!newTask.title || !newTask.assignedTo) {
      alert('Please fill in required fields');
      return;
    }

    const task: Task = {
      id: Date.now().toString(),
      ...newTask,
      assignedBy: 'Current User',
      status: 'todo',
      createdAt: new Date().toISOString().split('T')[0],
      comments: 0,
    };

    setTasks(prev => [task, ...prev]);
    setNewTask({ title: '', description: '', assignedTo: '', priority: 'medium', dueDate: '' });
    setShowCreateModal(false);
    alert('✅ Task assigned!');
  };

  const tasksByStatus = {
    todo: tasks.filter(t => t.status === 'todo'),
    in_progress: tasks.filter(t => t.status === 'in_progress'),
    review: tasks.filter(t => t.status === 'review'),
    done: tasks.filter(t => t.status === 'done'),
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
              <Link href="/team" className="px-4 py-2 bg-white/10 rounded-lg font-semibold">Team</Link>
            </div>
          </div>
        </div>
      </nav>

      <div className="container mx-auto px-6 py-8">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-5xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent mb-4">
              Team Collaboration
            </h1>
            <p className="text-xl text-gray-400">Assign tasks and manage team workflow</p>
          </div>
          <button
            onClick={() => setShowCreateModal(true)}
            className="px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl font-bold hover:shadow-lg transition-all"
          >
            + New Task
          </button>
        </div>

        <div className="grid lg:grid-cols-4 gap-6 mb-8">
          <div className="bg-white/5 backdrop-blur-lg rounded-2xl border border-white/10 p-6">
            <h3 className="text-xl font-bold mb-4">Team Members</h3>
            <div className="space-y-3">
              {teamMembers.map(member => (
                <div key={member.id} className="flex items-center space-x-3 p-3 bg-white/5 rounded-lg">
                  <div className="relative">
                    <span className="text-3xl">{member.avatar}</span>
                    <div className={`absolute bottom-0 right-0 w-3 h-3 rounded-full border-2 border-slate-900 ${
                      member.status === 'online' ? 'bg-green-500' :
                      member.status === 'busy' ? 'bg-yellow-500' : 'bg-gray-500'
                    }`} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="font-semibold truncate">{member.name}</div>
                    <div className="text-xs text-gray-400 truncate">{member.role}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="lg:col-span-3">
            <div className="grid grid-cols-4 gap-4">
              {Object.entries(tasksByStatus).map(([status, statusTasks]) => (
                <div key={status} className="space-y-3">
                  <div className="flex items-center justify-between p-4 bg-white/5 backdrop-blur-lg rounded-xl border border-white/10">
                    <h3 className="font-bold capitalize">{status.replace('_', ' ')}</h3>
                    <span className="px-2 py-1 bg-white/10 rounded-full text-sm">{statusTasks.length}</span>
                  </div>

                  {statusTasks.map(task => (
                    <div key={task.id} className="p-4 bg-white/5 backdrop-blur-lg rounded-xl border border-white/10 hover:border-purple-500/50 transition-colors cursor-pointer">
                      <div className={`inline-block text-xs px-2 py-1 rounded border mb-2 ${getPriorityColor(task.priority)}`}>
                        {task.priority.toUpperCase()}
                      </div>
                      <h4 className="font-bold mb-2 text-sm">{task.title}</h4>
                      <p className="text-xs text-gray-400 mb-3 line-clamp-2">{task.description}</p>
                      
                      <div className="flex items-center justify-between text-xs">
                        <div className="text-gray-400">
                          📅 {task.dueDate}
                        </div>
                        <div className="text-gray-400">
                          💬 {task.comments}
                        </div>
                      </div>

                      <div className="mt-3 pt-3 border-t border-white/10 text-xs text-gray-400">
                        👤 {task.assignedTo}
                      </div>
                    </div>
                  ))}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {showCreateModal && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-6">
          <div className="bg-gradient-to-br from-slate-900 to-purple-900 rounded-3xl border border-white/20 p-8 max-w-2xl w-full">
            <h2 className="text-3xl font-bold mb-6">Create New Task</h2>
            <div className="space-y-4">
              <input
                type="text"
                value={newTask.title}
                onChange={(e) => setNewTask(prev => ({ ...prev, title: e.target.value }))}
                placeholder="Task title..."
                className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl focus:outline-none focus:border-purple-500/50"
              />
              <textarea
                value={newTask.description}
                onChange={(e) => setNewTask(prev => ({ ...prev, description: e.target.value }))}
                placeholder="Task description..."
                className="w-full h-24 px-4 py-3 bg-white/5 border border-white/10 rounded-xl focus:outline-none focus:border-purple-500/50 resize-none"
              />
              <select
                value={newTask.assignedTo}
                onChange={(e) => setNewTask(prev => ({ ...prev, assignedTo: e.target.value }))}
                className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl focus:outline-none focus:border-purple-500/50"
              >
                <option value="">Assign to...</option>
                {teamMembers.map(member => (
                  <option key={member.id} value={member.name}>{member.name} - {member.role}</option>
                ))}
              </select>
              <div className="grid grid-cols-2 gap-4">
                <select
                  value={newTask.priority}
                  onChange={(e) => setNewTask(prev => ({ ...prev, priority: e.target.value as any }))}
                  className="px-4 py-3 bg-white/5 border border-white/10 rounded-xl focus:outline-none focus:border-purple-500/50"
                >
                  <option value="low">Low Priority</option>
                  <option value="medium">Medium Priority</option>
                  <option value="high">High Priority</option>
                  <option value="urgent">Urgent</option>
                </select>
                <input
                  type="date"
                  value={newTask.dueDate}
                  onChange={(e) => setNewTask(prev => ({ ...prev, dueDate: e.target.value }))}
                  className="px-4 py-3 bg-white/5 border border-white/10 rounded-xl focus:outline-none focus:border-purple-500/50"
                />
              </div>
              <div className="flex space-x-4">
                <button onClick={handleCreateTask} className="flex-1 px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl font-bold">
                  Create Task
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

