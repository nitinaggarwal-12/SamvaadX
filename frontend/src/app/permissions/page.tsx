'use client';

import { useState } from 'react';
import Link from 'next/link';

interface Role {
  id: string;
  name: string;
  description: string;
  userCount: number;
  permissions: string[];
  level: number;
}

interface Permission {
  id: string;
  category: string;
  name: string;
  description: string;
  risk: 'low' | 'medium' | 'high';
}

export default function AdvancedPermissions() {
  const [roles] = useState<Role[]>([
    {
      id: '1',
      name: 'Super Admin',
      description: 'Full system access',
      userCount: 2,
      permissions: ['all'],
      level: 100,
    },
    {
      id: '2',
      name: 'Content Director',
      description: 'Oversees all content strategy',
      userCount: 3,
      permissions: ['content.create', 'content.edit', 'content.publish', 'content.delete', 'team.manage', 'analytics.view'],
      level: 80,
    },
    {
      id: '3',
      name: 'Social Media Manager',
      description: 'Manages day-to-day posting',
      userCount: 8,
      permissions: ['content.create', 'content.edit', 'content.schedule', 'media.upload', 'analytics.view'],
      level: 60,
    },
    {
      id: '4',
      name: 'Content Creator',
      description: 'Creates and drafts content',
      userCount: 15,
      permissions: ['content.create', 'content.draft', 'media.upload'],
      level: 40,
    },
    {
      id: '5',
      name: 'Viewer',
      description: 'Read-only access',
      userCount: 25,
      permissions: ['analytics.view', 'content.view'],
      level: 20,
    },
  ]);

  const [permissions] = useState<Permission[]>([
    { id: '1', category: 'Content', name: 'content.create', description: 'Create new posts', risk: 'low' },
    { id: '2', category: 'Content', name: 'content.edit', description: 'Edit existing posts', risk: 'medium' },
    { id: '3', category: 'Content', name: 'content.publish', description: 'Publish posts immediately', risk: 'high' },
    { id: '4', category: 'Content', name: 'content.delete', description: 'Delete posts', risk: 'high' },
    { id: '5', category: 'Team', name: 'team.manage', description: 'Add/remove team members', risk: 'high' },
    { id: '6', category: 'Team', name: 'team.roles', description: 'Assign roles to users', risk: 'high' },
    { id: '7', category: 'Analytics', name: 'analytics.view', description: 'View analytics', risk: 'low' },
    { id: '8', category: 'Analytics', name: 'analytics.export', description: 'Export reports', risk: 'medium' },
    { id: '9', category: 'Settings', name: 'settings.general', description: 'Change general settings', risk: 'medium' },
    { id: '10', category: 'Settings', name: 'settings.integrations', description: 'Manage integrations', risk: 'high' },
    { id: '11', category: 'Billing', name: 'billing.view', description: 'View billing info', risk: 'medium' },
    { id: '12', category: 'Billing', name: 'billing.manage', description: 'Manage payments', risk: 'high' },
  ]);

  const getRiskColor = (risk: string) => {
    switch (risk) {
      case 'high': return 'bg-red-600/30 text-red-400';
      case 'medium': return 'bg-yellow-600/30 text-yellow-400';
      default: return 'bg-green-600/30 text-green-400';
    }
  };

  const groupedPermissions = permissions.reduce((acc, perm) => {
    if (!acc[perm.category]) acc[perm.category] = [];
    acc[perm.category].push(perm);
    return acc;
  }, {} as Record<string, Permission[]>);

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
              <Link href="/permissions" className="px-4 py-2 bg-white/10 rounded-lg font-semibold">Permissions</Link>
            </div>
          </div>
        </div>
      </nav>

      <div className="container mx-auto px-6 py-8">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-5xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent mb-4">
              Advanced Permissions (RBAC)
            </h1>
            <p className="text-xl text-gray-400">Role-based access control for enterprise security</p>
          </div>
          <button className="px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl font-bold hover:shadow-lg transition-all">
            + Create Role
          </button>
        </div>

        <div className="grid lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 space-y-4">
            <h2 className="text-2xl font-bold mb-4">Roles</h2>
            {roles.map(role => (
              <div key={role.id} className="p-6 bg-white/5 backdrop-blur-lg rounded-2xl border border-white/10">
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <h3 className="text-2xl font-bold mb-2">{role.name}</h3>
                    <p className="text-gray-400 mb-3">{role.description}</p>
                    <div className="flex items-center space-x-4 text-sm">
                      <span className="px-3 py-1 bg-blue-600/30 rounded-full">
                        👥 {role.userCount} users
                      </span>
                      <span className="px-3 py-1 bg-purple-600/30 rounded-full">
                        Level {role.level}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="mb-4">
                  <div className="text-sm font-semibold mb-2">Permissions ({role.permissions.length})</div>
                  <div className="flex flex-wrap gap-2">
                    {role.permissions.slice(0, 5).map((perm, i) => (
                      <span key={i} className="text-xs px-2 py-1 bg-white/10 rounded">
                        {perm}
                      </span>
                    ))}
                    {role.permissions.length > 5 && (
                      <span className="text-xs px-2 py-1 bg-white/10 rounded">
                        +{role.permissions.length - 5} more
                      </span>
                    )}
                  </div>
                </div>

                <div className="flex items-center space-x-3">
                  <button className="px-6 py-2 bg-blue-600/30 hover:bg-blue-600/50 rounded-lg transition-colors">
                    ✏️ Edit Role
                  </button>
                  <button className="px-6 py-2 bg-purple-600/30 hover:bg-purple-600/50 rounded-lg transition-colors">
                    👥 Assign Users
                  </button>
                  <button className="px-6 py-2 bg-white/10 hover:bg-white/20 rounded-lg transition-colors">
                    📋 Duplicate
                  </button>
                </div>
              </div>
            ))}
          </div>

          <div className="space-y-6">
            <div className="bg-white/5 backdrop-blur-lg rounded-3xl border border-white/10 p-6">
              <h3 className="text-xl font-bold mb-4">Permission Categories</h3>
              {Object.entries(groupedPermissions).map(([category, perms]) => (
                <div key={category} className="mb-4">
                  <div className="font-semibold mb-2">{category}</div>
                  <div className="space-y-2">
                    {perms.map(perm => (
                      <div key={perm.id} className="flex items-center justify-between text-sm p-2 bg-white/5 rounded">
                        <span className="font-mono text-xs">{perm.name}</span>
                        <span className={`text-xs px-2 py-1 rounded ${getRiskColor(perm.risk)}`}>
                          {perm.risk}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>

            <div className="bg-gradient-to-br from-blue-900/30 to-purple-900/30 backdrop-blur-lg rounded-3xl border border-white/10 p-6">
              <h3 className="text-xl font-bold mb-4">Security Tips</h3>
              <div className="space-y-2 text-sm text-gray-400">
                <div>🔒 Use least privilege principle</div>
                <div>🔒 Regular permission audits</div>
                <div>🔒 Monitor high-risk actions</div>
                <div>🔒 Two-factor authentication</div>
                <div>🔒 Session timeout policies</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

