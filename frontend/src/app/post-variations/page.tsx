'use client';

import { useState } from 'react';
import Link from 'next/link';

interface PostVariation {
  platform: string;
  content: string;
  hashtags: string[];
  characterCount: number;
  mediaUrl?: string;
  firstComment?: string;
}

export default function PostVariations() {
  const [baseContent, setBaseContent] = useState('Exciting announcement! The 28th CSPOC will be held in New Delhi from January 14-17, 2026. Join us for this historic parliamentary event!');
  
  const [variations, setVariations] = useState<PostVariation[]>([
    {
      platform: 'Twitter/X',
      content: '🗳️ BREAKING: 28th #CSPOC2026 coming to New Delhi! Jan 14-17, 2026\n\nJoin parliamentary leaders from 56 Commonwealth nations.\n\n#Parliamentary #Democracy #India',
      hashtags: ['CSPOC2026', 'Parliamentary', 'Democracy', 'India'],
      characterCount: 167,
    },
    {
      platform: 'Facebook',
      content: 'Exciting announcement! 🎉\n\nThe 28th Conference of Speakers and Presiding Officers of the Commonwealth (CSPOC 2026) will be held in New Delhi from January 14-17, 2026.\n\nThis historic event will bring together parliamentary leaders from across the Commonwealth to discuss:\n✅ Democratic strengthening\n✅ Digital transformation\n✅ Climate action\n✅ Youth engagement\n\nStay tuned for registration details!\n\n#CSPOC2026 #CommonwealthParliament #NewDelhi',
      hashtags: ['CSPOC2026', 'CommonwealthParliament', 'NewDelhi'],
      characterCount: 412,
    },
    {
      platform: 'LinkedIn',
      content: 'We are pleased to announce that the 28th Conference of Speakers and Presiding Officers of the Commonwealth (CSPOC 2026) will take place in New Delhi, India, from January 14-17, 2026.\n\nThis distinguished gathering will convene parliamentary leaders and presiding officers from Commonwealth member nations to address critical issues in democratic governance, institutional strengthening, and inter-parliamentary cooperation.\n\nKey Discussion Areas:\n• Parliamentary best practices and innovation\n• Digital democracy and e-governance\n• Climate policy and sustainable development\n• Youth participation in democratic processes\n• Gender equality in parliamentary institutions\n\nRegistration details and the full agenda will be shared soon.\n\n#CSPOC2026 #ParliamentaryDiplomacy #Commonwealth #DemocraticGovernance',
      hashtags: ['CSPOC2026', 'ParliamentaryDiplomacy', 'Commonwealth', 'DemocraticGovernance'],
      characterCount: 712,
    },
    {
      platform: 'Instagram',
      content: '🏛️ Historic Announcement!\n\nCSPOC 2026 is coming to New Delhi! 🇮🇳\n\nJan 14-17, 2026 📅\n\nParliamentary leaders from 56 nations will gather for the biggest Commonwealth event of the year! ✨\n\nSwipe to learn more 👉\n\n#CSPOC2026 #Parliament #NewDelhi #Commonwealth #Democracy #India #PoliticalLeadership #InternationalEvent',
      hashtags: ['CSPOC2026', 'Parliament', 'NewDelhi', 'Commonwealth', 'Democracy', 'India', 'PoliticalLeadership', 'InternationalEvent'],
      characterCount: 289,
      firstComment: 'Tag someone who should attend this historic event! 👇',
    },
  ]);

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
              <Link href="/post-variations" className="px-4 py-2 bg-white/10 rounded-lg font-semibold">Variations</Link>
            </div>
          </div>
        </div>
      </nav>

      <div className="container mx-auto px-6 py-8">
        <div className="mb-8">
          <h1 className="text-5xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent mb-4">
            Platform-Specific Post Variations
          </h1>
          <p className="text-xl text-gray-400">AI-optimized content for each social platform</p>
        </div>

        <div className="mb-8 p-6 bg-white/5 backdrop-blur-lg rounded-2xl border border-white/10">
          <h2 className="text-2xl font-bold mb-4">📝 Base Content</h2>
          <textarea
            className="w-full px-4 py-3 bg-black/30 border border-white/10 rounded-lg h-32 resize-none"
            value={baseContent}
            onChange={(e) => setBaseContent(e.target.value)}
            placeholder="Enter your base message..."
          />
          <div className="mt-4 flex space-x-3">
            <button className="px-6 py-2 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg font-semibold">
              🤖 Generate Variations
            </button>
            <button className="px-4 py-2 bg-white/10 rounded-lg">
              ⚙️ Customize Rules
            </button>
          </div>
        </div>

        <div className="grid lg:grid-cols-2 gap-6">
          {variations.map(variation => (
            <div key={variation.platform} className="p-6 bg-white/5 backdrop-blur-lg rounded-2xl border border-white/10">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-2xl font-bold">{variation.platform}</h3>
                <span className={`text-sm px-3 py-1 rounded ${
                  variation.characterCount > 280 && variation.platform === 'Twitter/X' ? 'bg-red-600/30 text-red-400' : 'bg-green-600/30 text-green-400'
                }`}>
                  {variation.characterCount} chars
                </span>
              </div>

              <div className="p-4 bg-black/30 rounded-lg mb-4">
                <p className="whitespace-pre-wrap">{variation.content}</p>
              </div>

              {variation.hashtags.length > 0 && (
                <div className="mb-4">
                  <div className="text-sm text-gray-400 mb-2">Hashtags:</div>
                  <div className="flex flex-wrap gap-2">
                    {variation.hashtags.map(tag => (
                      <span key={tag} className="text-xs px-2 py-1 bg-blue-600/30 rounded">
                        #{tag}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {variation.firstComment && (
                <div className="mb-4 p-3 bg-purple-900/30 border border-purple-500/30 rounded-lg">
                  <div className="text-xs text-gray-400 mb-1">First Comment:</div>
                  <p className="text-sm">{variation.firstComment}</p>
                </div>
              )}

              <div className="flex space-x-2">
                <button className="flex-1 px-4 py-2 bg-blue-600 hover:bg-blue-700 rounded-lg text-sm">
                  ✏️ Edit
                </button>
                <button className="px-4 py-2 bg-green-600 hover:bg-green-700 rounded-lg text-sm">
                  📤 Publish
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

