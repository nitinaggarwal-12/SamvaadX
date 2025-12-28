'use client';

import { useState } from 'react';
import Link from 'next/link';

interface Review {
  id: string;
  platform: string;
  author: string;
  rating: number;
  content: string;
  timestamp: string;
  status: 'pending' | 'responded' | 'archived';
  sentiment: 'positive' | 'neutral' | 'negative';
  response?: string;
}

export default function ReviewManagement() {
  const [reviews, setReviews] = useState<Review[]>([
    {
      id: '1',
      platform: 'Facebook',
      author: 'Raj Kumar',
      rating: 5,
      content: 'Excellent organization of CSPOC 2026! The registration process was smooth and the information provided is comprehensive. Looking forward to the event!',
      timestamp: '2 hours ago',
      status: 'responded',
      sentiment: 'positive',
      response: 'Thank you for your kind words! We\'re excited to have you join us at CSPOC 2026.',
    },
    {
      id: '2',
      platform: 'Google',
      author: 'Priya Sharma',
      rating: 4,
      content: 'Great initiative by Parliament of India. Website could be more user-friendly but overall good experience.',
      timestamp: '5 hours ago',
      status: 'pending',
      sentiment: 'positive',
    },
    {
      id: '3',
      platform: 'LinkedIn',
      author: 'Amit Patel',
      rating: 2,
      content: 'Had trouble with the registration portal. Customer support was slow to respond. Hope the event itself is better organized.',
      timestamp: '1 day ago',
      status: 'pending',
      sentiment: 'negative',
    },
    {
      id: '4',
      platform: 'Facebook',
      author: 'Anita Desai',
      rating: 5,
      content: 'Wonderful to see such transparency and engagement from Parliament! CSPOC 2026 will be historic.',
      timestamp: '2 days ago',
      status: 'responded',
      sentiment: 'positive',
      response: 'We appreciate your support! Transparency and engagement are our priorities.',
    },
  ]);

  const [selectedReview, setSelectedReview] = useState<Review | null>(null);
  const [responseText, setResponseText] = useState('');

  const avgRating = reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length;
  const pendingCount = reviews.filter(r => r.status === 'pending').length;

  const getRatingColor = (rating: number) => {
    if (rating >= 4) return 'text-green-400';
    if (rating >= 3) return 'text-yellow-400';
    return 'text-red-400';
  };

  const getSentimentColor = (sentiment: string) => {
    switch (sentiment) {
      case 'positive': return 'bg-green-600/30 text-green-400';
      case 'negative': return 'bg-red-600/30 text-red-400';
      default: return 'bg-gray-600/30 text-gray-400';
    }
  };

  const handleRespond = () => {
    if (!selectedReview || !responseText) {
      alert('Please enter a response');
      return;
    }

    setReviews(prev => prev.map(r => 
      r.id === selectedReview.id 
        ? { ...r, status: 'responded' as const, response: responseText }
        : r
    ));

    alert('✅ Response posted successfully!');
    setSelectedReview(null);
    setResponseText('');
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
              <Link href="/inbox" className="px-4 py-2 hover:bg-white/10 rounded-lg">Inbox</Link>
              <Link href="/reviews" className="px-4 py-2 bg-white/10 rounded-lg font-semibold">Reviews</Link>
            </div>
          </div>
        </div>
      </nav>

      <div className="container mx-auto px-6 py-8">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-5xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent mb-4">
              Review Management
            </h1>
            <p className="text-xl text-gray-400">Monitor and respond to reviews across platforms</p>
          </div>
        </div>

        <div className="grid grid-cols-4 gap-6 mb-8">
          <div className="p-6 bg-white/5 backdrop-blur-lg rounded-2xl border border-white/10">
            <div className="text-sm text-gray-400 mb-2">Average Rating</div>
            <div className={`text-3xl font-bold ${getRatingColor(avgRating)}`}>
              ⭐ {avgRating.toFixed(1)}
            </div>
          </div>
          <div className="p-6 bg-white/5 backdrop-blur-lg rounded-2xl border border-white/10">
            <div className="text-sm text-gray-400 mb-2">Total Reviews</div>
            <div className="text-3xl font-bold text-blue-400">{reviews.length}</div>
          </div>
          <div className="p-6 bg-white/5 backdrop-blur-lg rounded-2xl border border-white/10">
            <div className="text-sm text-gray-400 mb-2">Pending</div>
            <div className="text-3xl font-bold text-yellow-400">{pendingCount}</div>
          </div>
          <div className="p-6 bg-white/5 backdrop-blur-lg rounded-2xl border border-white/10">
            <div className="text-sm text-gray-400 mb-2">Response Rate</div>
            <div className="text-3xl font-bold text-green-400">
              {((reviews.filter(r => r.status === 'responded').length / reviews.length) * 100).toFixed(0)}%
            </div>
          </div>
        </div>

        <div className="space-y-4">
          {reviews.map(review => (
            <div key={review.id} className="p-6 bg-white/5 backdrop-blur-lg rounded-2xl border border-white/10">
              <div className="flex items-start justify-between mb-4">
                <div>
                  <div className="flex items-center space-x-3 mb-2">
                    <h3 className="text-xl font-bold">{review.author}</h3>
                    <span className="text-xs px-2 py-1 bg-purple-600/30 rounded">{review.platform}</span>
                    <span className={`text-xs px-3 py-1 rounded-full ${getSentimentColor(review.sentiment)}`}>
                      {review.sentiment.toUpperCase()}
                    </span>
                  </div>
                  <div className="flex items-center space-x-3 mb-2">
                    <div className={`text-2xl ${getRatingColor(review.rating)}`}>
                      {'⭐'.repeat(review.rating)}
                    </div>
                    <span className="text-sm text-gray-400">{review.timestamp}</span>
                  </div>
                </div>
              </div>

              <p className="mb-4">{review.content}</p>

              {review.response && (
                <div className="p-4 bg-blue-600/10 border border-blue-500/30 rounded-xl mb-4">
                  <div className="text-sm font-semibold text-blue-400 mb-2">Your Response:</div>
                  <p className="text-sm">{review.response}</p>
                </div>
              )}

              <div className="flex items-center space-x-3">
                {review.status === 'pending' ? (
                  <button
                    onClick={() => { setSelectedReview(review); setResponseText(''); }}
                    className="px-6 py-2 bg-green-600/30 hover:bg-green-600/50 rounded-lg transition-colors"
                  >
                    ✏️ Respond
                  </button>
                ) : (
                  <div className="px-6 py-2 bg-green-600/30 rounded-lg text-sm">
                    ✅ Responded
                  </div>
                )}
                <button className="px-6 py-2 bg-white/10 hover:bg-white/20 rounded-lg transition-colors">
                  📊 View Profile
                </button>
                <button className="px-6 py-2 bg-white/10 hover:bg-white/20 rounded-lg transition-colors">
                  🗄️ Archive
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {selectedReview && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-6">
          <div className="bg-gradient-to-br from-slate-900 to-purple-900 rounded-3xl border border-white/20 p-8 max-w-3xl w-full">
            <h2 className="text-3xl font-bold mb-6">Respond to Review</h2>

            <div className="p-4 bg-white/5 rounded-xl mb-6">
              <div className="flex items-center space-x-3 mb-3">
                <div className="font-bold">{selectedReview.author}</div>
                <div className={`text-lg ${getRatingColor(selectedReview.rating)}`}>
                  {'⭐'.repeat(selectedReview.rating)}
                </div>
              </div>
              <p className="text-gray-300">{selectedReview.content}</p>
            </div>

            <div className="mb-6">
              <label className="block text-sm font-semibold mb-2">Your Response</label>
              <textarea
                value={responseText}
                onChange={(e) => setResponseText(e.target.value)}
                placeholder="Write a professional response..."
                className="w-full h-32 px-4 py-3 bg-white/5 border border-white/10 rounded-xl focus:outline-none focus:border-purple-500/50 resize-none"
              />
            </div>

            <div className="flex space-x-4">
              <button onClick={handleRespond} className="flex-1 px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl font-bold">
                📤 Post Response
              </button>
              <button onClick={() => { setSelectedReview(null); setResponseText(''); }} className="px-6 py-3 bg-white/5 rounded-xl">
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

