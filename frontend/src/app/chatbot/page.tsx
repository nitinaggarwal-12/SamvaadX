'use client';

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';

interface Message {
  id: string;
  type: 'user' | 'bot';
  content: string;
  timestamp: string;
  quickReplies?: string[];
}

export default function AIChatbot() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      type: 'bot',
      content: 'Hello! I\'m the Guddu-Project AI assistant. I can help you with content creation, scheduling, analytics insights, and answering questions about CSPOC 2026. How can I assist you today?',
      timestamp: new Date().toLocaleTimeString(),
      quickReplies: [
        'Generate post ideas',
        'Schedule content',
        'Analytics summary',
        'Best posting times',
      ],
    },
  ]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const generateBotResponse = (userMessage: string): string => {
    const lowerMsg = userMessage.toLowerCase();
    
    if (lowerMsg.includes('post idea') || lowerMsg.includes('generate')) {
      return '🎯 Here are 3 post ideas for CSPOC 2026:\n\n1. "🏛️ Countdown: 10 days until CSPOC 2026! Join world leaders in celebrating parliamentary democracy. #CSPOC2026 #Democracy"\n\n2. "🌍 Meet our speakers: Distinguished parliamentarians from 56 Commonwealth nations share insights on governance. [Speaker carousel]"\n\n3. "📸 Behind the scenes: Parliament House preparations for the historic CSPOC 2026 gathering. [Video snippet]"\n\nWould you like me to refine any of these?';
    }
    
    if (lowerMsg.includes('schedule') || lowerMsg.includes('timing')) {
      return '📅 Based on your audience analytics, the best times to post are:\n\n• Facebook: 1-3 PM IST (highest engagement)\n• Twitter/X: 9-11 AM IST (peak activity)\n• LinkedIn: 8-10 AM IST (B2B audience)\n• Instagram: 6-8 PM IST (evening engagement)\n\nWould you like to schedule a post now?';
    }
    
    if (lowerMsg.includes('analytics') || lowerMsg.includes('performance')) {
      return '📊 Here\'s your quick analytics summary:\n\n✅ Total Reach: 1.2M (↑15% vs last week)\n✅ Engagement Rate: 7.4% (above industry avg)\n✅ Top Platform: Facebook (450K reach)\n✅ Top Post: CSPOC Opening Ceremony announcement\n\nYour CSPOC 2026 campaign is performing exceptionally well! Want detailed insights?';
    }
    
    if (lowerMsg.includes('hashtag')) {
      return '# Recommended hashtags for CSPOC 2026:\n\n🔥 Primary: #CSPOC2026 #Parliament #Commonwealth\n📱 Trending: #Democracy #Governance #IndiaParliament\n🌍 Geo-tags: #NewDelhi #India\n\nCombine 5-7 hashtags per post for optimal reach.';
    }
    
    if (lowerMsg.includes('best time') || lowerMsg.includes('when to post')) {
      return '⏰ Best posting times for maximum engagement:\n\n• Monday-Friday: 9 AM - 3 PM IST\n• Weekends: 11 AM - 2 PM IST\n• Avoid: Late nights (11 PM - 6 AM)\n\nYour audience is most active during business hours!';
    }
    
    if (lowerMsg.includes('content') || lowerMsg.includes('caption')) {
      return '✍️ I can help create engaging captions! What type of content?\n\n1. Event announcement\n2. Speaker introduction\n3. Behind-the-scenes\n4. Educational/Info\n5. Call-to-action\n\nJust tell me the type and key details!';
    }
    
    return '🤖 I understand you\'re asking about "' + userMessage + '". I can help with:\n\n• Generating post ideas and captions\n• Scheduling and timing recommendations\n• Analytics and performance insights\n• Hashtag suggestions\n• Content strategy tips\n\nWhat would you like to know more about?';
  };

  const handleSend = (messageText?: string) => {
    const textToSend = messageText || input.trim();
    if (!textToSend) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      type: 'user',
      content: textToSend,
      timestamp: new Date().toLocaleTimeString(),
    };

    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsTyping(true);

    setTimeout(() => {
      const botResponse: Message = {
        id: (Date.now() + 1).toString(),
        type: 'bot',
        content: generateBotResponse(textToSend),
        timestamp: new Date().toLocaleTimeString(),
        quickReplies: ['Create post', 'More ideas', 'Schedule now', 'Show analytics'],
      };
      
      setMessages(prev => [...prev, botResponse]);
      setIsTyping(false);
    }, 1500);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
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
              <Link href="/chatbot" className="px-4 py-2 bg-white/10 rounded-lg font-semibold">AI Assistant</Link>
            </div>
          </div>
        </div>
      </nav>

      <div className="container mx-auto px-6 py-8 max-w-5xl">
        <div className="mb-6 text-center">
          <h1 className="text-5xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent mb-4">
            AI Assistant
          </h1>
          <p className="text-xl text-gray-400">Get instant help with content, analytics, and strategy</p>
        </div>

        <div className="bg-white/5 backdrop-blur-lg rounded-3xl border border-white/10 overflow-hidden flex flex-col" style={{ height: '70vh' }}>
          <div className="flex-1 overflow-y-auto p-6 space-y-4">
            {messages.map(message => (
              <div
                key={message.id}
                className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div className={`max-w-[80%] ${message.type === 'user' ? 'order-2' : 'order-1'}`}>
                  <div className={`p-4 rounded-2xl ${
                    message.type === 'user'
                      ? 'bg-gradient-to-r from-blue-600 to-purple-600'
                      : 'bg-white/10'
                  }`}>
                    <p className="whitespace-pre-wrap">{message.content}</p>
                  </div>
                  <div className={`text-xs text-gray-400 mt-1 ${message.type === 'user' ? 'text-right' : 'text-left'}`}>
                    {message.timestamp}
                  </div>
                  
                  {message.quickReplies && (
                    <div className="flex flex-wrap gap-2 mt-3">
                      {message.quickReplies.map((reply, i) => (
                        <button
                          key={i}
                          onClick={() => handleSend(reply)}
                          className="px-3 py-1 bg-white/10 hover:bg-white/20 rounded-full text-sm transition-colors"
                        >
                          {reply}
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            ))}
            
            {isTyping && (
              <div className="flex justify-start">
                <div className="p-4 bg-white/10 rounded-2xl">
                  <div className="flex space-x-2">
                    <div className="w-2 h-2 bg-blue-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></div>
                    <div className="w-2 h-2 bg-blue-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></div>
                    <div className="w-2 h-2 bg-blue-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></div>
                  </div>
                </div>
              </div>
            )}
            
            <div ref={messagesEndRef} />
          </div>

          <div className="p-6 border-t border-white/10">
            <div className="flex items-end space-x-3">
              <textarea
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Ask me anything... (Press Enter to send)"
                className="flex-1 px-4 py-3 bg-white/5 border border-white/10 rounded-xl focus:outline-none focus:border-purple-500/50 resize-none"
                rows={1}
              />
              <button
                onClick={() => handleSend()}
                disabled={!input.trim()}
                className="px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl font-bold hover:shadow-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Send
              </button>
            </div>
            <div className="mt-3 text-xs text-gray-400 text-center">
              💡 Try: "Generate post ideas", "Best posting times", "Analytics summary"
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

