'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

export default function Home() {
  const [isLoaded, setIsLoaded] = useState(false);
  const [activeFeature, setActiveFeature] = useState(0);
  const [chatOpen, setChatOpen] = useState(false);
  const [chatMessage, setChatMessage] = useState('');
  const [chatMessages, setChatMessages] = useState<Array<{role: 'user' | 'assistant', content: string}>>([]);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [particles, setParticles] = useState<Array<{left: number, top: number, delay: number, duration: number}>>([]);

  useEffect(() => {
    setIsLoaded(true);
    // Generate particles only on client side to avoid hydration mismatch
    const newParticles = [...Array(20)].map(() => ({
      left: Math.random() * 100,
      top: Math.random() * 100,
      delay: Math.random() * 5,
      duration: 5 + Math.random() * 10,
    }));
    setParticles(newParticles);
    
    const interval = setInterval(() => {
      setActiveFeature((prev) => (prev + 1) % 6);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  const handleSendMessage = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!chatMessage.trim()) return;

    // Add user message
    const newMessages = [...chatMessages, { role: 'user' as const, content: chatMessage }];
    setChatMessages(newMessages);
    setChatMessage('');

    // Simulate AI response
    setTimeout(() => {
      const responses = [
        "Thanks for reaching out! I can help you schedule a demo, answer questions about features, or connect you with our team. What would you like to know?",
        "SamvaadX is trusted by governments worldwide for secure, AI-powered social media marketing. Would you like to see a demo?",
        "I'd be happy to help! You can also explore our features, check pricing, or contact our team directly. What interests you most?",
        "Great question! SamvaadX offers enterprise-grade security, multi-platform publishing, and real-time analytics. Want to learn more about a specific feature?",
      ];
      setChatMessages([...newMessages, { 
        role: 'assistant' as const, 
        content: responses[Math.floor(Math.random() * responses.length)] 
      }]);
    }, 1000);
  };

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveFeature((prev) => (prev + 1) % 6);
    }, 3000);
    
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  const features = [
    {
      icon: '🚀',
      title: 'Real-Time Publishing',
      description: 'Publish to all platforms in under 3 seconds',
      color: 'from-blue-500 to-cyan-500',
    },
    {
      icon: '🤖',
      title: 'AI-Powered Intelligence',
      description: 'GPT-4 driven content generation and sentiment analysis',
      color: 'from-purple-500 to-pink-500',
    },
    {
      icon: '🔒',
      title: 'Government-Grade Security',
      description: 'SOC 2 Type II compliant with end-to-end encryption',
      color: 'from-green-500 to-emerald-500',
    },
    {
      icon: '📊',
      title: 'Advanced Analytics',
      description: 'Real-time insights with predictive modeling',
      color: 'from-orange-500 to-red-500',
    },
    {
      icon: '🎪',
      title: 'Live Control Room',
      description: 'Mission-critical event management dashboard',
      color: 'from-indigo-500 to-purple-500',
    },
    {
      icon: '🌍',
      title: 'Global Reach',
      description: '100+ languages, 190+ countries supported',
      color: 'from-teal-500 to-blue-500',
    },
  ];

  const stats = [
    { value: '500M+', label: 'Target Reach' },
    { value: '50M+', label: 'Engagements' },
    { value: '99.99%', label: 'Uptime SLA' },
    { value: '<3s', label: 'Publish Time' },
  ];

  const platforms = ['Facebook', 'Twitter/X', 'Instagram', 'YouTube', 'LinkedIn'];

  const handlePlatformConnect = (platform: string) => {
    // In production, this would initiate OAuth flow
    const platformUrls: { [key: string]: string } = {
      'Facebook': 'https://www.facebook.com/v18.0/dialog/oauth',
      'Twitter/X': 'https://twitter.com/i/oauth2/authorize',
      'Instagram': 'https://api.instagram.com/oauth/authorize',
      'YouTube': 'https://accounts.google.com/o/oauth2/v2/auth',
      'LinkedIn': 'https://www.linkedin.com/oauth/v2/authorization',
    };

    // For demo, show connection modal
    alert(`🔗 Connecting to ${platform}...\n\nIn production, this would:\n✓ Initiate OAuth 2.0 flow\n✓ Request necessary permissions\n✓ Store access tokens securely\n✓ Enable publishing to ${platform}\n\nRedirecting to: ${platformUrls[platform]}`);
    
    // Simulate successful connection
    setTimeout(() => {
      console.log(`✅ ${platform} connected successfully`);
    }, 1000);
  };

  return (
    <div className="relative min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 text-white overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-1/2 -left-1/2 w-full h-full bg-gradient-to-br from-blue-500/10 to-purple-500/10 rounded-full blur-3xl animate-pulse" />
        <div className="absolute -bottom-1/2 -right-1/2 w-full h-full bg-gradient-to-tl from-pink-500/10 to-orange-500/10 rounded-full blur-3xl animate-pulse delay-1000" />
        
        {/* Grid Pattern */}
        <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-10" />
        
        {/* Floating Particles */}
        {particles.map((particle, i) => (
          <div
            key={i}
            className="absolute w-2 h-2 bg-white/20 rounded-full animate-float"
            style={{
              left: `${particle.left}%`,
              top: `${particle.top}%`,
              animationDelay: `${particle.delay}s`,
              animationDuration: `${particle.duration}s`,
            }}
          />
        ))}
      </div>

      {/* Navigation */}
      <nav className={`relative z-50 transition-all duration-1000 ${isLoaded ? 'translate-y-0 opacity-100' : '-translate-y-full opacity-0'}`}>
        <div className="container mx-auto px-6 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="relative">
                <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl flex items-center justify-center shadow-2xl shadow-purple-500/50 animate-pulse-slow">
                  <span className="text-2xl">🏛️</span>
                </div>
                <div className="absolute -top-1 -right-1 w-4 h-4 bg-green-500 rounded-full border-2 border-slate-900 animate-ping" />
              </div>
              <div>
                <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                  SamvaadX
                </h1>
                <p className="text-xs text-gray-400">Trusted by Governments Worldwide</p>
              </div>
            </div>
            
            <div className="hidden md:flex items-center space-x-8">
              <Link href="#features" className="text-gray-300 hover:text-white transition-colors">Features</Link>
              <Link href="#platforms" className="text-gray-300 hover:text-white transition-colors">Platforms</Link>
              <Link href="#security" className="text-gray-300 hover:text-white transition-colors">Security</Link>
              <Link href="/api/docs" className="text-gray-300 hover:text-white transition-colors">API Docs</Link>
              <Link href="/login" className="text-gray-300 hover:text-white transition-colors">Login</Link>
              <Link href="/register" className="px-6 py-2 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full font-semibold hover:shadow-lg hover:shadow-purple-500/50 transition-all transform hover:scale-105">
                Get Started
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <main className="relative z-10">
        <div className="container mx-auto px-6 pt-20 pb-32">
          <div className={`text-center max-w-5xl mx-auto transition-all duration-1000 delay-300 ${isLoaded ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
            {/* Badge */}
            <div className="inline-flex items-center space-x-2 px-4 py-2 bg-white/10 backdrop-blur-lg rounded-full border border-white/20 mb-8 animate-fade-in">
              <span className="relative flex h-3 w-3">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-3 w-3 bg-green-500"></span>
              </span>
              <span className="text-sm">Powering CSPOC 2026 • Parliament of India</span>
            </div>

            <h1 className="text-6xl md:text-8xl font-bold mb-6 leading-tight">
              <span className="bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent animate-gradient">
                World's Most Advanced
              </span>
              <br />
              <span className="bg-gradient-to-r from-purple-400 via-pink-400 to-blue-400 bg-clip-text text-transparent">
                Social Media Platform
              </span>
            </h1>

            <p className="text-xl md:text-2xl text-gray-300 mb-12 max-w-3xl mx-auto leading-relaxed">
              When world leaders speak to the world, they use SamvaadX. 
              <br />
              <span className="text-purple-400 font-semibold">Government-grade. AI-powered. Globally trusted.</span>
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-16">
              <Link href="/connections" className="group relative px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl font-bold text-lg hover:shadow-2xl hover:shadow-purple-500/50 transition-all transform hover:scale-105 overflow-hidden">
                <span className="relative z-10 flex items-center justify-center space-x-2">
                  <span>Launch Control Room</span>
                  <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                  </svg>
                </span>
                <div className="absolute inset-0 bg-gradient-to-r from-purple-600 to-pink-600 opacity-0 group-hover:opacity-100 transition-opacity" />
              </Link>

              <Link href="/dashboard" className="px-8 py-4 bg-white/10 backdrop-blur-lg border border-white/20 rounded-2xl font-bold text-lg hover:bg-white/20 transition-all transform hover:scale-105 inline-block text-center">
                Watch Demo
                <span className="ml-2">▶️</span>
              </Link>
            </div>

            {/* Stats Bar */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {stats.map((stat, index) => (
                <div
                  key={index}
                  className="p-6 bg-white/5 backdrop-blur-lg rounded-2xl border border-white/10 hover:bg-white/10 transition-all transform hover:scale-105"
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <div className="text-3xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent mb-2">
                    {stat.value}
                  </div>
                  <div className="text-sm text-gray-400">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Features Grid */}
        <div id="features" className="container mx-auto px-6 py-20">
          <div className="text-center mb-16">
            <h2 className="text-5xl font-bold mb-4">
              <span className="bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                Enterprise-Grade Features
              </span>
            </h2>
            <p className="text-xl text-gray-400">Built for governments. Designed for scale.</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((feature, index) => (
              <div
                key={index}
                className={`group relative p-8 bg-white/5 backdrop-blur-lg rounded-3xl border border-white/10 hover:bg-white/10 transition-all duration-500 transform hover:scale-105 cursor-pointer ${
                  activeFeature === index ? 'ring-2 ring-purple-500' : ''
                }`}
                onMouseEnter={() => setActiveFeature(index)}
              >
                <div className={`absolute inset-0 bg-gradient-to-br ${feature.color} opacity-0 group-hover:opacity-10 rounded-3xl transition-opacity duration-500`} />
                
                <div className="relative">
                  <div className="text-6xl mb-4 transform group-hover:scale-110 transition-transform duration-300">
                    {feature.icon}
                  </div>
                  <h3 className="text-2xl font-bold mb-3">{feature.title}</h3>
                  <p className="text-gray-400">{feature.description}</p>
                  
                  <div className="mt-6 flex items-center text-purple-400 font-semibold group-hover:translate-x-2 transition-transform">
                    <span>Learn more</span>
                    <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Platforms Section */}
        <div id="platforms" className="container mx-auto px-6 py-20">
          <div className="bg-gradient-to-br from-blue-900/30 to-purple-900/30 backdrop-blur-lg rounded-3xl p-12 border border-white/10">
            <div className="text-center mb-12">
              <h2 className="text-4xl font-bold mb-4">Multi-Platform Publishing</h2>
              <p className="text-xl text-gray-400">One click. Five platforms. Instant reach.</p>
            </div>
            
            <div className="flex flex-wrap justify-center gap-6">
              {platforms.map((platform, index) => (
                <button
                  key={index}
                  onClick={() => handlePlatformConnect(platform)}
                  className="px-8 py-4 bg-white/5 backdrop-blur-lg rounded-2xl border border-white/20 hover:bg-white/10 hover:border-purple-500/50 transition-all transform hover:scale-110 cursor-pointer group"
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <div className="text-xl font-semibold group-hover:text-purple-400 transition-colors">
                    {platform}
                  </div>
                </button>
              ))}
            </div>

            <div className="mt-12 grid md:grid-cols-3 gap-8">
              <div className="text-center">
                <div className="text-4xl mb-3">⚡</div>
                <div className="text-2xl font-bold text-purple-400 mb-2">Instant</div>
                <div className="text-gray-400">Cross-platform publishing in seconds</div>
              </div>
              <div className="text-center">
                <div className="text-4xl mb-3">🎯</div>
                <div className="text-2xl font-bold text-blue-400 mb-2">Optimized</div>
                <div className="text-gray-400">Platform-specific content variants</div>
              </div>
              <div className="text-center">
                <div className="text-4xl mb-3">📈</div>
                <div className="text-2xl font-bold text-green-400 mb-2">Tracked</div>
                <div className="text-gray-400">Real-time analytics across all channels</div>
              </div>
            </div>
          </div>
        </div>

        {/* Trusted By Section */}
        <div className="container mx-auto px-6 py-20">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold mb-4">Trusted by Governments Worldwide</h2>
            <p className="text-xl text-gray-400">Powering the world's most important communications</p>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 items-center justify-items-center opacity-60">
            {['🇮🇳 India', '🇬🇧 UK', '🇦🇺 Australia', '🇨🇦 Canada'].map((country, i) => (
              <div key={i} className="text-4xl hover:opacity-100 transition-opacity cursor-pointer">
                {country}
              </div>
            ))}
          </div>
        </div>

        {/* CTA Section */}
        <div className="container mx-auto px-6 py-20">
          <div className="relative bg-gradient-to-r from-blue-600 to-purple-600 rounded-3xl p-12 overflow-hidden">
            <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-10" />
            <div className="relative text-center">
              <h2 className="text-5xl font-bold mb-6">Ready to Transform Your Communications?</h2>
              <p className="text-xl mb-8 opacity-90">Join governments and organizations using Guddu-Project</p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <button className="px-8 py-4 bg-white text-purple-600 rounded-2xl font-bold text-lg hover:shadow-2xl transition-all transform hover:scale-105">
                  Schedule Demo
                </button>
                <button className="px-8 py-4 bg-white/10 backdrop-blur-lg border border-white/30 rounded-2xl font-bold text-lg hover:bg-white/20 transition-all">
                  Contact Sales
                </button>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* AI Chatbot */}
      <div className="fixed bottom-6 right-6 z-50">
        {chatOpen && (
          <div className="mb-4 w-96 h-[500px] bg-slate-900/95 backdrop-blur-xl rounded-3xl border border-white/20 shadow-2xl animate-slide-up overflow-hidden">
            <div className="bg-gradient-to-r from-blue-600 to-purple-600 p-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center">
                    <span className="text-2xl">🤖</span>
                  </div>
                  <div>
                    <div className="font-bold">Guddu AI Assistant</div>
                    <div className="text-xs opacity-75">Always here to help</div>
                  </div>
                </div>
                <button onClick={() => setChatOpen(false)} className="text-white/75 hover:text-white">
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
            </div>
            
            <div className="p-6 h-[350px] overflow-y-auto space-y-4">
              {chatMessages.length === 0 ? (
                <div className="flex items-start space-x-3">
                  <div className="w-8 h-8 bg-purple-600 rounded-full flex items-center justify-center flex-shrink-0">
                    🤖
                  </div>
                  <div className="bg-white/10 rounded-2xl rounded-tl-none p-4">
                    <p>Hi! I'm your AI assistant. I can help you:</p>
                    <ul className="mt-2 space-y-1 text-sm">
                      <li>• Schedule a demo</li>
                      <li>• Answer questions about features</li>
                      <li>• Provide pricing information</li>
                      <li>• Connect you with our team</li>
                    </ul>
                  </div>
                </div>
              ) : (
                chatMessages.map((msg, idx) => (
                  <div key={idx} className={`flex items-start space-x-3 ${msg.role === 'user' ? 'flex-row-reverse space-x-reverse' : ''}`}>
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${
                      msg.role === 'user' ? 'bg-blue-600' : 'bg-purple-600'
                    }`}>
                      {msg.role === 'user' ? '👤' : '🤖'}
                    </div>
                    <div className={`rounded-2xl p-4 max-w-[75%] ${
                      msg.role === 'user' 
                        ? 'bg-gradient-to-r from-blue-600 to-purple-600 rounded-tr-none' 
                        : 'bg-white/10 rounded-tl-none'
                    }`}>
                      {msg.content}
                    </div>
                  </div>
                ))
              )}
            </div>
            
            <div className="p-4 border-t border-white/10">
              <form onSubmit={handleSendMessage} className="flex items-center space-x-2">
                <input
                  type="text"
                  value={chatMessage}
                  onChange={(e) => setChatMessage(e.target.value)}
                  placeholder="Type your message..."
                  className="flex-1 px-4 py-3 bg-white/5 border border-white/10 rounded-full focus:outline-none focus:ring-2 focus:ring-purple-500 text-white placeholder-gray-400"
                />
                <button 
                  type="submit"
                  className="w-12 h-12 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full flex items-center justify-center hover:shadow-lg transition-all"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                  </svg>
                </button>
              </form>
            </div>
          </div>
        )}
        
        <button
          onClick={() => setChatOpen(!chatOpen)}
          className="w-16 h-16 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full shadow-2xl shadow-purple-500/50 flex items-center justify-center hover:scale-110 transition-transform animate-bounce-slow"
        >
          <span className="text-3xl">💬</span>
        </button>
      </div>

      {/* Footer */}
      <footer className="relative z-10 border-t border-white/10 py-12">
        <div className="container mx-auto px-6">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <h3 className="font-bold text-xl mb-4">Guddu-Project</h3>
              <p className="text-gray-400 text-sm">
                The world's most advanced social media marketing platform for governments and international organizations.
              </p>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Product</h4>
              <ul className="space-y-2 text-gray-400 text-sm">
                <li><Link href="#features" className="hover:text-white transition-colors">Features</Link></li>
                <li><Link href="#platforms" className="hover:text-white transition-colors">Platforms</Link></li>
                <li><Link href="#security" className="hover:text-white transition-colors">Security</Link></li>
                <li><Link href="/pricing" className="hover:text-white transition-colors">Pricing</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Resources</h4>
              <ul className="space-y-2 text-gray-400 text-sm">
                <li><Link href="/docs" className="hover:text-white transition-colors">Documentation</Link></li>
                <li><Link href="/api/docs" className="hover:text-white transition-colors">API Reference</Link></li>
                <li><Link href="/guides" className="hover:text-white transition-colors">Guides</Link></li>
                <li><Link href="/faq" className="hover:text-white transition-colors">FAQ</Link></li>
                <li><Link href="/support" className="hover:text-white transition-colors">Support</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Company</h4>
              <ul className="space-y-2 text-gray-400 text-sm">
                <li><Link href="/about" className="hover:text-white transition-colors">About</Link></li>
                <li><Link href="/blog" className="hover:text-white transition-colors">Blog</Link></li>
                <li><Link href="/careers" className="hover:text-white transition-colors">Careers</Link></li>
                <li><Link href="/contact" className="hover:text-white transition-colors">Contact</Link></li>
              </ul>
            </div>
          </div>
          <div className="mt-12 pt-8 border-t border-white/10 flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-400 text-sm">© 2025 Guddu-Project. All rights reserved.</p>
            <div className="flex space-x-6 mt-4 md:mt-0">
              <Link href="/privacy" className="text-gray-400 hover:text-white text-sm transition-colors">Privacy</Link>
              <Link href="/terms" className="text-gray-400 hover:text-white text-sm transition-colors">Terms</Link>
              <Link href="/security" className="text-gray-400 hover:text-white text-sm transition-colors">Security</Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
