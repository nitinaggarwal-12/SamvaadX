'use client';

import { useState } from 'react';
import Link from 'next/link';

interface Client {
  id: string;
  name: string;
  logo?: string;
  primaryColor: string;
  secondaryColor: string;
  fontFamily: string;
  customDomain?: string;
  active: boolean;
}

export default function CustomBranding() {
  const [clients, setClients] = useState<Client[]>([
    {
      id: '1',
      name: 'Parliament of India',
      primaryColor: '#FF9933',
      secondaryColor: '#138808',
      fontFamily: 'Poppins',
      customDomain: 'cspoc2026.gov.in',
      active: true,
    },
    {
      id: '2',
      name: 'UK House of Commons',
      primaryColor: '#012169',
      secondaryColor: '#C8102E',
      fontFamily: 'Inter',
      customDomain: 'parliament.uk',
      active: true,
    },
    {
      id: '3',
      name: 'Canadian Parliament',
      primaryColor: '#FF0000',
      secondaryColor: '#FFFFFF',
      fontFamily: 'Roboto',
      active: false,
    },
  ]);

  const [selectedClient, setSelectedClient] = useState<string | null>('1');
  const [showAddForm, setShowAddForm] = useState(false);

  const currentClient = clients.find(c => c.id === selectedClient);

  const fontOptions = [
    'Poppins', 'Inter', 'Roboto', 'Open Sans', 'Lato', 'Montserrat', 'Raleway', 'PT Sans'
  ];

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
              <Link href="/white-label" className="px-4 py-2 hover:bg-white/10 rounded-lg">White-label</Link>
              <Link href="/custom-branding" className="px-4 py-2 bg-white/10 rounded-lg font-semibold">Custom Branding</Link>
            </div>
          </div>
        </div>
      </nav>

      <div className="container mx-auto px-6 py-8">
        <div className="mb-8 flex items-center justify-between">
          <div>
            <h1 className="text-5xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent mb-4">
              Custom Branding per Client
            </h1>
            <p className="text-xl text-gray-400">White-label experience for each organization</p>
          </div>
          <button
            onClick={() => setShowAddForm(!showAddForm)}
            className="px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg font-semibold hover:shadow-lg"
          >
            ➕ Add Client
          </button>
        </div>

        <div className="grid grid-cols-3 gap-6 mb-8">
          <div className="p-6 bg-white/5 backdrop-blur-lg rounded-2xl border border-white/10">
            <div className="text-sm text-gray-400 mb-2">Total Clients</div>
            <div className="text-3xl font-bold text-blue-400">{clients.length}</div>
          </div>
          <div className="p-6 bg-white/5 backdrop-blur-lg rounded-2xl border border-white/10">
            <div className="text-sm text-gray-400 mb-2">Active Brands</div>
            <div className="text-3xl font-bold text-green-400">{clients.filter(c => c.active).length}</div>
          </div>
          <div className="p-6 bg-white/5 backdrop-blur-lg rounded-2xl border border-white/10">
            <div className="text-sm text-gray-400 mb-2">Custom Domains</div>
            <div className="text-3xl font-bold text-purple-400">{clients.filter(c => c.customDomain).length}</div>
          </div>
        </div>

        {showAddForm && (
          <div className="mb-8 p-6 bg-white/5 backdrop-blur-lg rounded-2xl border border-white/10">
            <h2 className="text-2xl font-bold mb-4">Add New Client Brand</h2>
            <div className="space-y-4">
              <div>
                <label className="block text-sm text-gray-400 mb-2">Client Name</label>
                <input
                  type="text"
                  className="w-full px-4 py-2 bg-black/30 border border-white/10 rounded-lg"
                  placeholder="e.g., Australian Parliament"
                />
              </div>

              <div>
                <label className="block text-sm text-gray-400 mb-2">Upload Logo</label>
                <input
                  type="file"
                  accept="image/*"
                  className="w-full px-4 py-2 bg-black/30 border border-white/10 rounded-lg"
                />
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm text-gray-400 mb-2">Primary Color</label>
                  <div className="flex space-x-2">
                    <input
                      type="color"
                      className="w-16 h-10 bg-black/30 border border-white/10 rounded-lg"
                    />
                    <input
                      type="text"
                      className="flex-1 px-4 py-2 bg-black/30 border border-white/10 rounded-lg"
                      placeholder="#0066CC"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm text-gray-400 mb-2">Secondary Color</label>
                  <div className="flex space-x-2">
                    <input
                      type="color"
                      className="w-16 h-10 bg-black/30 border border-white/10 rounded-lg"
                    />
                    <input
                      type="text"
                      className="flex-1 px-4 py-2 bg-black/30 border border-white/10 rounded-lg"
                      placeholder="#FF6600"
                    />
                  </div>
                </div>
              </div>

              <div>
                <label className="block text-sm text-gray-400 mb-2">Font Family</label>
                <select className="w-full px-4 py-2 bg-black/30 border border-white/10 rounded-lg">
                  {fontOptions.map(font => (
                    <option key={font} value={font}>{font}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm text-gray-400 mb-2">Custom Domain (optional)</label>
                <input
                  type="text"
                  className="w-full px-4 py-2 bg-black/30 border border-white/10 rounded-lg"
                  placeholder="e.g., parliament.gov.au"
                />
              </div>

              <div className="flex space-x-3">
                <button className="px-6 py-2 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg font-semibold">
                  💾 Save Brand
                </button>
                <button
                  onClick={() => setShowAddForm(false)}
                  className="px-6 py-2 bg-white/10 rounded-lg"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        )}

        <div className="grid lg:grid-cols-3 gap-6">
          <div className="space-y-3">
            <h2 className="text-xl font-bold mb-4">🎨 Client List</h2>
            {clients.map(client => (
              <div
                key={client.id}
                onClick={() => setSelectedClient(client.id)}
                className={`p-4 rounded-xl cursor-pointer transition-all ${
                  selectedClient === client.id
                    ? 'bg-gradient-to-r from-blue-600 to-purple-600'
                    : 'bg-white/5 hover:bg-white/10'
                } backdrop-blur-lg border border-white/10`}
              >
                <div className="flex items-center justify-between mb-2">
                  <h3 className="font-bold">{client.name}</h3>
                  <span className={`text-xs px-2 py-1 rounded ${
                    client.active ? 'bg-green-600/30 text-green-400' : 'bg-gray-600/30 text-gray-400'
                  }`}>
                    {client.active ? 'ACTIVE' : 'INACTIVE'}
                  </span>
                </div>
                {client.customDomain && (
                  <div className="text-xs text-gray-400">🌐 {client.customDomain}</div>
                )}
              </div>
            ))}
          </div>

          {currentClient && (
            <div className="lg:col-span-2">
              <h2 className="text-2xl font-bold mb-4">Brand Configuration</h2>
              
              <div className="mb-6 p-6 bg-white/5 backdrop-blur-lg rounded-2xl border border-white/10">
                <h3 className="text-xl font-bold mb-4">{currentClient.name}</h3>
                
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm text-gray-400 mb-2">Logo</label>
                    <div className="w-32 h-32 bg-black/30 rounded-lg flex items-center justify-center">
                      <span className="text-4xl">🏛️</span>
                    </div>
                    <button className="mt-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 rounded-lg text-sm">
                      📤 Upload New Logo
                    </button>
                  </div>

                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm text-gray-400 mb-2">Primary Color</label>
                      <div className="flex items-center space-x-3">
                        <div
                          className="w-16 h-10 rounded-lg border border-white/20"
                          style={{ backgroundColor: currentClient.primaryColor }}
                        />
                        <input
                          type="text"
                          className="flex-1 px-4 py-2 bg-black/30 border border-white/10 rounded-lg"
                          value={currentClient.primaryColor}
                          readOnly
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm text-gray-400 mb-2">Secondary Color</label>
                      <div className="flex items-center space-x-3">
                        <div
                          className="w-16 h-10 rounded-lg border border-white/20"
                          style={{ backgroundColor: currentClient.secondaryColor }}
                        />
                        <input
                          type="text"
                          className="flex-1 px-4 py-2 bg-black/30 border border-white/10 rounded-lg"
                          value={currentClient.secondaryColor}
                          readOnly
                        />
                      </div>
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm text-gray-400 mb-2">Font Family</label>
                    <input
                      type="text"
                      className="w-full px-4 py-2 bg-black/30 border border-white/10 rounded-lg"
                      value={currentClient.fontFamily}
                      readOnly
                    />
                  </div>

                  <div>
                    <label className="block text-sm text-gray-400 mb-2">Custom Domain</label>
                    <input
                      type="text"
                      className="w-full px-4 py-2 bg-black/30 border border-white/10 rounded-lg"
                      value={currentClient.customDomain || 'Not configured'}
                      readOnly
                    />
                  </div>
                </div>

                <div className="flex space-x-2 mt-6">
                  <button className="px-4 py-2 bg-blue-600 hover:bg-blue-700 rounded-lg">
                    ✏️ Edit Brand
                  </button>
                  <button className="px-4 py-2 bg-purple-600 hover:bg-purple-700 rounded-lg">
                    👁️ Preview
                  </button>
                  <button className="px-4 py-2 bg-red-600 hover:bg-red-700 rounded-lg">
                    🗑️ Delete
                  </button>
                </div>
              </div>

              <div className="p-6 bg-white/5 backdrop-blur-lg rounded-2xl border border-white/10">
                <h3 className="text-xl font-bold mb-4">Live Preview</h3>
                <div 
                  className="p-8 rounded-xl"
                  style={{
                    background: `linear-gradient(135deg, ${currentClient.primaryColor}, ${currentClient.secondaryColor})`,
                    fontFamily: currentClient.fontFamily,
                  }}
                >
                  <div className="bg-white/90 backdrop-blur-lg rounded-lg p-6 text-gray-900">
                    <div className="flex items-center space-x-3 mb-4">
                      <div className="w-12 h-12 bg-gray-200 rounded-full flex items-center justify-center text-2xl">
                        🏛️
                      </div>
                      <div>
                        <h4 className="font-bold text-xl">{currentClient.name}</h4>
                        <p className="text-sm text-gray-600">Social Media Command Center</p>
                      </div>
                    </div>
                    <button 
                      className="w-full py-3 rounded-lg font-bold text-white"
                      style={{ backgroundColor: currentClient.primaryColor }}
                    >
                      Create New Post
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

