'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

interface Message {
  id: string;
  platform: string;
  type: 'comment' | 'mention' | 'dm' | 'reply';
  author: {
    name: string;
    avatar: string;
    handle: string;
  };
  content: string;
  postPreview?: string;
  timestamp: string;
  isRead: boolean;
  sentiment: 'positive' | 'neutral' | 'negative';
}

export default function SocialInbox() {
  // Advanced Filtering State
  const [filterPlatform, setFilterPlatform] = useState<string>('all');
  const [filterType, setFilterType] = useState<string>('all');
  const [filterSentiment, setFilterSentiment] = useState<string>('all');
  const [filterRead, setFilterRead] = useState<string>('all');
  const [searchTerm, setSearchTerm] = useState('');

  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      platform: 'Facebook',
      type: 'comment',
      author: {
        name: 'John Doe',
        avatar: '👤',
        handle: '@johndoe',
      },
      content: 'This is amazing! When will registration open?',
      postPreview: 'Announcing CSPOC 2026...',
      timestamp: '5 mins ago',
      isRead: false,
      sentiment: 'positive',
    },
    {
      id: '2',
      platform: 'Twitter/X',
      type: 'mention',
      author: {
        name: 'Jane Smith',
        avatar: '👩',
        handle: '@janesmith',
      },
      content: '@ParliamentIndia Excited to attend! Will there be live streaming?',
      postPreview: null,
      timestamp: '12 mins ago',
      isRead: false,
      sentiment: 'positive',
    },
    {
      id: '3',
      platform: 'LinkedIn',
      type: 'comment',
      author: {
        name: 'Dr. Rajesh Kumar',
        avatar: '👨‍💼',
        handle: '@drkumar',
      },
      content: 'Wonderful initiative. Looking forward to the speaker lineup.',
      postPreview: 'CSPOC 2026 Speaker Announcement',
      timestamp: '1 hour ago',
      isRead: true,
      sentiment: 'positive',
    },
    {
      id: '4',
      platform: 'Instagram',
      type: 'comment',
      author: {
        name: 'Sarah Johnson',
        avatar: '👩‍🦰',
        handle: '@sarahj',
      },
      content: 'The venue looks amazing! 🤩',
      postPreview: 'Behind the scenes: Venue prep',
      timestamp: '2 hours ago',
      isRead: true,
      sentiment: 'positive',
    },
    {
      id: '5',
      platform: 'Twitter/X',
      type: 'reply',
      author: {
        name: 'Mike Brown',
        avatar: '👨',
        handle: '@mikebrown',
      },
      content: 'Can international delegates attend virtually?',
      postPreview: 'Registration opens today!',
      timestamp: '3 hours ago',
      isRead: false,
      sentiment: 'neutral',
    },
  ]);

  const [filter, setFilter] = useState<'all' | 'unread' | 'positive' | 'negative'>('all');
  const [selectedPlatform, setSelectedPlatform] = useState<string>('all');
  const [selectedMessage, setSelectedMessage] = useState<Message | null>(null);
  const [replyText, setReplyText] = useState('');

  const platforms = ['all', 'Facebook', 'Twitter/X', 'Instagram', 'LinkedIn', 'YouTube'];

  const filteredMessages = messages.filter(msg => {
    if (filter === 'unread' && msg.isRead) return false;
    if (filter === 'positive' && msg.sentiment !== 'positive') return false;
    if (filter === 'negative' && msg.sentiment !== 'negative') return false;
    if (selectedPlatform !== 'all' && msg.platform !== selectedPlatform) return false;
    return true;
  });

  const unreadCount = messages.filter(m => !m.isRead).length;

  const markAsRead = (id: string) => {
    setMessages(prev => prev.map(m => m.id === id ? { ...m, isRead: true } : m));
  };

  const handleReply = () => {
    if (!selectedMessage || !replyText.trim()) return;
    
    alert(`Reply sent to ${selectedMessage.author.name} on ${selectedMessage.platform}:\n\n"${replyText}"`);
    setReplyText('');
    markAsRead(selectedMessage.id);
  };

  const getSentimentColor = (sentiment: string) => {
    switch (sentiment) {
      case 'positive': return 'text-green-400 bg-green-500/20';
      case 'negative': return 'text-red-400 bg-red-500/20';
      default: return 'text-gray-400 bg-gray-500/20';
    }
  };

  const getPlatformIcon = (platform: string) => {
    switch (platform) {
      case 'Facebook': return '📘';
      case 'Twitter/X': return '🐦';
      case 'Instagram': return '📷';
      case 'LinkedIn': return '💼';
      case 'YouTube': return '▶️';
      default: return '📱';
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 text-white">
      {/* Navigation */}
      <nav className="relative z-50 border-b border-white/10 backdrop-blur-lg">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <Link href="/" className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl flex items-center justify-center">
                <span className="text-xl">🏛️</span>
              </div>
              <div>
                <h1 className="text-xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                  Guddu-Project
                </h1>
              </div>
            </Link>

            <div className="flex items-center space-x-4">
              <Link href="/dashboard" className="px-4 py-2 hover:bg-white/10 rounded-lg transition-colors">Dashboard</Link>
              <Link href="/inbox" className="px-4 py-2 bg-white/10 rounded-lg font-semibold">Inbox</Link>
              <Link href="/media-library" className="px-4 py-2 hover:bg-white/10 rounded-lg transition-colors">Media</Link>
              <Link href="/analytics" className="px-4 py-2 hover:bg-white/10 rounded-lg transition-colors">Analytics</Link>
              <Link href="/calendar" className="px-4 py-2 hover:bg-white/10 rounded-lg transition-colors">Calendar</Link>
            </div>
          </div>
        </div>
      </nav>

      <div className="container mx-auto px-6 py-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-5xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent mb-4">
              Social Inbox
            </h1>
            <p className="text-xl text-gray-400">Manage all conversations in one place</p>
          </div>
          
          <div className="flex items-center space-x-4">
            <div className="px-6 py-3 bg-blue-600/20 border border-blue-500/50 rounded-xl">
              <div className="text-3xl font-bold text-blue-400">{unreadCount}</div>
              <div className="text-sm text-gray-400">Unread</div>
            </div>
            <div className="px-6 py-3 bg-green-600/20 border border-green-500/50 rounded-xl">
              <div className="text-3xl font-bold text-green-400">{messages.length}</div>
              <div className="text-sm text-gray-400">Total</div>
            </div>
          </div>
        </div>

        {/* Filters */}
        <div className="flex items-center space-x-4 mb-6">
          <div className="flex items-center space-x-2 bg-white/5 backdrop-blur-lg rounded-xl p-2 border border-white/10">
            {['all', 'unread', 'positive', 'negative'].map((f) => (
              <button
                key={f}
                onClick={() => setFilter(f as any)}
                className={`px-4 py-2 rounded-lg transition-all capitalize ${
                  filter === f
                    ? 'bg-gradient-to-r from-blue-600 to-purple-600 font-semibold'
                    : 'hover:bg-white/10'
                }`}
              >
                {f}
              </button>
            ))}
          </div>

          <select
            value={selectedPlatform}
            onChange={(e) => setSelectedPlatform(e.target.value)}
            className="px-4 py-2 bg-white/5 backdrop-blur-lg rounded-xl border border-white/10 focus:outline-none focus:border-purple-500/50"
          >
            {platforms.map((p) => (
              <option key={p} value={p}>{p === 'all' ? 'All Platforms' : p}</option>
            ))}
          </select>

          <button className="px-6 py-2 bg-white/5 hover:bg-white/10 rounded-xl transition-colors flex items-center space-x-2">
            <span>🔄</span>
            <span>Refresh</span>
          </button>
        </div>

        <div className="grid lg:grid-cols-3 gap-6">
          {/* Messages List */}
          <div className="lg:col-span-2 bg-white/5 backdrop-blur-lg rounded-3xl border border-white/10 p-6">
            <h2 className="text-2xl font-bold mb-6">Messages ({filteredMessages.length})</h2>
            
            <div className="space-y-3">
              {filteredMessages.map((message) => (
                <div
                  key={message.id}
                  onClick={() => {
                    setSelectedMessage(message);
                    markAsRead(message.id);
                  }}
                  className={`p-4 rounded-2xl border transition-all cursor-pointer ${
                    !message.isRead
                      ? 'bg-blue-600/10 border-blue-500/50'
                      : 'bg-white/5 border-white/10 hover:bg-white/10'
                  } ${selectedMessage?.id === message.id ? 'ring-2 ring-purple-500' : ''}`}
                >
                  <div className="flex items-start space-x-4">
                    <div className="text-4xl">{message.author.avatar}</div>
                    
                    <div className="flex-1">
                      <div className="flex items-center space-x-2 mb-2">
                        <span className="font-semibold">{message.author.name}</span>
                        <span className="text-sm text-gray-400">{message.author.handle}</span>
                        <span className="text-xs px-2 py-1 bg-white/10 rounded-full">{getPlatformIcon(message.platform)} {message.platform}</span>
                        <span className={`text-xs px-2 py-1 rounded-full ${getSentimentColor(message.sentiment)}`}>
                          {message.sentiment}
                        </span>
                      </div>
                      
                      <p className="text-gray-300 mb-2">{message.content}</p>
                      
                      {message.postPreview && (
                        <div className="text-sm text-gray-500 italic">
                          On: "{message.postPreview}"
                        </div>
                      )}
                      
                      <div className="flex items-center justify-between mt-2">
                        <span className="text-xs text-gray-400">{message.timestamp}</span>
                        <span className="text-xs px-2 py-1 bg-purple-600/20 text-purple-400 rounded-full capitalize">
                          {message.type}
                        </span>
                      </div>
                    </div>

                    {!message.isRead && (
                      <div className="w-3 h-3 bg-blue-500 rounded-full animate-pulse" />
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Reply Panel */}
          <div className="bg-white/5 backdrop-blur-lg rounded-3xl border border-white/10 p-6">
            {selectedMessage ? (
              <>
                <h2 className="text-2xl font-bold mb-6">Reply</h2>
                
                <div className="space-y-4">
                  <div className="p-4 bg-white/5 rounded-xl border border-white/10">
                    <div className="flex items-center space-x-3 mb-3">
                      <div className="text-3xl">{selectedMessage.author.avatar}</div>
                      <div>
                        <div className="font-semibold">{selectedMessage.author.name}</div>
                        <div className="text-sm text-gray-400">{selectedMessage.author.handle}</div>
                      </div>
                    </div>
                    <p className="text-gray-300">{selectedMessage.content}</p>
                  </div>

                  <textarea
                    value={replyText}
                    onChange={(e) => setReplyText(e.target.value)}
                    placeholder="Type your reply..."
                    className="w-full h-32 px-4 py-3 bg-white/5 border border-white/10 rounded-xl focus:outline-none focus:border-purple-500/50 resize-none"
                  />

                  <div className="flex items-center space-x-2">
                    <button className="p-2 bg-white/5 hover:bg-white/10 rounded-lg transition-colors">
                      📎
                    </button>
                    <button className="p-2 bg-white/5 hover:bg-white/10 rounded-lg transition-colors">
                      😊
                    </button>
                    <button className="p-2 bg-white/5 hover:bg-white/10 rounded-lg transition-colors">
                      🖼️
                    </button>
                  </div>

                  <button
                    onClick={handleReply}
                    disabled={!replyText.trim()}
                    className={`w-full px-6 py-3 rounded-xl font-bold transition-all ${
                      replyText.trim()
                        ? 'bg-gradient-to-r from-blue-600 to-purple-600 hover:shadow-lg hover:shadow-purple-500/50'
                        : 'bg-gray-600 cursor-not-allowed'
                    }`}
                  >
                    Send Reply on {selectedMessage.platform}
                  </button>

                  <div className="grid grid-cols-2 gap-2">
                    <button className="px-4 py-2 bg-white/5 hover:bg-white/10 rounded-lg transition-colors text-sm">
                      Mark Spam
                    </button>
                    <button className="px-4 py-2 bg-white/5 hover:bg-white/10 rounded-lg transition-colors text-sm">
                      Delete
                    </button>
                    <button className="px-4 py-2 bg-white/5 hover:bg-white/10 rounded-lg transition-colors text-sm">
                      Assign
                    </button>
                    <button className="px-4 py-2 bg-white/5 hover:bg-white/10 rounded-lg transition-colors text-sm">
                      Archive
                    </button>
                  </div>
                </div>
              </>
            ) : (
              <div className="text-center py-12">
                <div className="text-6xl mb-4">💬</div>
                <p className="text-xl text-gray-400">Select a message to reply</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

