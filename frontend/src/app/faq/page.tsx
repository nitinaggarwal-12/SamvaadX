'use client';

import { useState } from 'react';
import Link from 'next/link';

interface FAQItem {
  question: string;
  answer: string;
  category: string;
}

export default function FAQPage() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);
  const [selectedCategory, setSelectedCategory] = useState<string>('All');

  const faqs: FAQItem[] = [
    // Getting Started (1-5)
    {
      category: 'Getting Started',
      question: 'What is SamvaadX and who is it designed for?',
      answer: 'SamvaadX is the world\'s most advanced social media marketing platform specifically designed for governments, parliaments, ministries, and international organizations. It provides enterprise-grade tools for managing high-stakes global events with unparalleled reach, intelligence, and security.',
    },
    {
      category: 'Getting Started',
      question: 'How quickly can we get started with SamvaadX?',
      answer: 'Organizations can be up and running within 24-48 hours. Our onboarding process includes account setup, team training, social media account connections, and customization of your dashboard. We assign a dedicated customer success manager to ensure a smooth transition.',
    },
    {
      category: 'Getting Started',
      question: 'What makes SamvaadX different from other social media management tools?',
      answer: 'SamvaadX is purpose-built for government and institutional communications with government-grade security (SOC 2 Type II compliant), AI-powered content generation and sentiment analysis, support for 100+ languages, specialized features for diplomatic events, and 24/7 dedicated support with SLA guarantees.',
    },
    {
      category: 'Getting Started',
      question: 'Do we need technical expertise to use SamvaadX?',
      answer: 'No technical expertise is required. SamvaadX features an intuitive interface designed for communication professionals. We provide comprehensive training, detailed documentation, video tutorials, and ongoing support to ensure your team can leverage all features effectively.',
    },
    {
      category: 'Getting Started',
      question: 'Can we try SamvaadX before committing?',
      answer: 'Yes! We offer personalized demos tailored to your organization\'s needs and a 30-day pilot program for qualified government and institutional clients. Contact our team to schedule a demonstration and discuss trial options.',
    },

    // Features & Functionality (6-12)
    {
      category: 'Features',
      question: 'Which social media platforms does SamvaadX support?',
      answer: 'SamvaadX supports all major platforms: Facebook, X/Twitter, Instagram, YouTube, LinkedIn, TikTok, Pinterest, Snapchat, Reddit, Telegram, WhatsApp Business, Medium, Quora, and Vimeo. We continuously add new platforms based on client needs.',
    },
    {
      category: 'Features',
      question: 'Can we schedule posts in advance across multiple platforms?',
      answer: 'Absolutely! SamvaadX offers advanced scheduling with bulk scheduling for hundreds of posts, calendar view with drag-and-drop, timezone-specific publishing, best time to post AI recommendations, recurring post automation, and queue management.',
    },
    {
      category: 'Features',
      question: 'How does the AI content generation work?',
      answer: 'Our AI-powered system uses GPT-4 to generate captions in 100+ languages, suggest hashtags based on engagement data, create post variations for A/B testing, optimize content for each platform, analyze sentiment in real-time, and provide content improvement suggestions.',
    },
    {
      category: 'Features',
      question: 'What analytics and reporting capabilities are available?',
      answer: 'SamvaadX provides comprehensive analytics including real-time engagement metrics, audience demographics and insights, sentiment analysis, competitor benchmarking, custom report builder, automated weekly/monthly reports, ROI tracking, and predictive analytics for campaign performance.',
    },
    {
      category: 'Features',
      question: 'Can multiple team members collaborate on content?',
      answer: 'Yes! SamvaadX includes robust collaboration features: role-based access control (Admin, Author, Consumer), approval workflows with multi-level review, task assignment and tracking, comment threads on drafts, version history, and real-time notifications.',
    },
    {
      category: 'Features',
      question: 'Does SamvaadX support live event coverage?',
      answer: 'Yes! Our Live Control Room feature enables real-time content publishing to all platforms simultaneously, live hashtag tracking and trending alerts, automated VIP mention tagging, engagement heatmaps, crisis management tools, and rapid response capabilities.',
    },
    {
      category: 'Features',
      question: 'Can we manage multiple organizations from one account?',
      answer: 'Yes! SamvaadX supports multi-tenant white-label configurations, allowing you to manage multiple departments, regions, or organizations from a single dashboard with custom branding per entity and centralized billing.',
    },

    // Security & Compliance (13-16)
    {
      category: 'Security',
      question: 'How secure is SamvaadX for government use?',
      answer: 'SamvaadX is built with government-grade security: SOC 2 Type II certified, end-to-end encryption for all data, GDPR and CCPA compliant, regular third-party security audits, role-based access controls, comprehensive audit logs, and secure cloud infrastructure with 99.99% uptime SLA.',
    },
    {
      category: 'Security',
      question: 'Where is our data stored and who has access?',
      answer: 'Data is stored in enterprise-grade cloud servers with redundancy across multiple regions. You maintain full ownership of your data. Access is strictly limited to your authorized team members based on role permissions. Our staff never accesses your data without explicit permission and audit trails.',
    },
    {
      category: 'Security',
      question: 'Is SamvaadX compliant with data protection regulations?',
      answer: 'Yes, SamvaadX is fully compliant with GDPR (Europe), CCPA (California), PIPEDA (Canada), and other major data protection regulations. We can accommodate specific compliance requirements for government entities.',
    },
    {
      category: 'Security',
      question: 'What happens if there\'s a security incident or data breach?',
      answer: 'We have comprehensive incident response protocols including immediate notification within 24 hours, dedicated security team investigation, detailed incident reports, remediation support, and transparency throughout the process. We maintain cybersecurity insurance and have never experienced a data breach.',
    },

    // Pricing & Plans (17-19)
    {
      category: 'Pricing',
      question: 'How is SamvaadX priced?',
      answer: 'SamvaadX offers flexible enterprise pricing based on organization size, number of users, social media accounts, and required features. We provide custom quotes tailored to your specific needs. Contact our sales team for detailed pricing information.',
    },
    {
      category: 'Pricing',
      question: 'What\'s included in the Enterprise plan?',
      answer: 'The Enterprise plan includes unlimited users and social accounts, all features and integrations, dedicated customer success manager, 24/7 priority support, custom training programs, white-label options, API access, and 99.99% uptime SLA.',
    },
    {
      category: 'Pricing',
      question: 'Are there any hidden fees or additional costs?',
      answer: 'No hidden fees. Our pricing is transparent and includes all core features. Optional add-ons include custom integrations, advanced training workshops, on-premise deployment, and dedicated infrastructure. All costs are discussed upfront.',
    },

    // Integration & Technical (20-22)
    {
      category: 'Technical',
      question: 'Does SamvaadX integrate with our existing systems?',
      answer: 'Yes! SamvaadX offers REST and GraphQL APIs for custom integrations, webhooks for real-time events, SSO (Single Sign-On) integration, CRM and workflow tools integration (Salesforce, HubSpot), and DAM (Digital Asset Management) system connections. Our team can build custom integrations as needed.',
    },
    {
      category: 'Technical',
      question: 'What are the browser and device requirements?',
      answer: 'SamvaadX works on all modern browsers (Chrome, Firefox, Safari, Edge) and is fully responsive. We also offer iOS and Android mobile apps (PWA) for on-the-go management. No special software installation required.',
    },
    {
      category: 'Technical',
      question: 'Can we export our data if we decide to leave?',
      answer: 'Absolutely. You maintain full ownership of your data and can export everything at any time in standard formats (CSV, JSON, PDF). We provide comprehensive data export tools and support to ensure smooth transitions if needed.',
    },

    // Support & Training (23-25)
    {
      category: 'Support',
      question: 'What support options are available?',
      answer: 'Enterprise clients receive 24/7 priority support via phone, email, and live chat, dedicated customer success manager, regular check-ins and strategy sessions, comprehensive knowledge base and documentation, video tutorials and webinars, and emergency response team for critical events.',
    },
    {
      category: 'Support',
      question: 'Do you provide training for our team?',
      answer: 'Yes! We provide customized training programs including initial onboarding sessions for all team members, role-specific training (administrators, content creators, analysts), advanced feature workshops, best practices seminars, ongoing webinars, and certification programs.',
    },
    {
      category: 'Support',
      question: 'What if we need help during a major event or crisis?',
      answer: 'We offer dedicated event support packages with on-site or virtual support staff, real-time monitoring and assistance, crisis management protocols, rapid response team (15-minute response time), and post-event analysis and reporting. Contact us in advance to schedule event support.',
    },
  ];

  const categories = ['All', ...Array.from(new Set(faqs.map(faq => faq.category)))];
  
  const filteredFAQs = selectedCategory === 'All' 
    ? faqs 
    : faqs.filter(faq => faq.category === selectedCategory);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 text-white">
      {/* Background Effects */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-1/2 -left-1/2 w-full h-full bg-gradient-to-br from-blue-500/10 to-purple-500/10 rounded-full blur-3xl animate-pulse" />
        <div className="absolute -bottom-1/2 -right-1/2 w-full h-full bg-gradient-to-tl from-pink-500/10 to-orange-500/10 rounded-full blur-3xl animate-pulse delay-1000" />
      </div>

      {/* Navigation */}
      <nav className="relative z-50 border-b border-white/10 bg-black/20 backdrop-blur-lg">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <Link href="/" className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl flex items-center justify-center">
                <span className="text-2xl">🏛️</span>
              </div>
              <div>
                <h1 className="text-xl font-bold">SamvaadX</h1>
                <p className="text-xs text-gray-400">Frequently Asked Questions</p>
              </div>
            </Link>
            <Link href="/" className="text-gray-300 hover:text-white transition-colors">
              ← Back to Home
            </Link>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <div className="relative z-10 container mx-auto px-6 py-12">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-5xl md:text-6xl font-bold mb-6">
            <span className="bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
              Frequently Asked Questions
            </span>
          </h1>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Everything you need to know about SamvaadX, the world's most advanced social media marketing platform for governments and institutions.
          </p>
        </div>

        {/* Category Filter */}
        <div className="flex flex-wrap justify-center gap-3 mb-12">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`px-6 py-3 rounded-full font-semibold transition-all ${
                selectedCategory === category
                  ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg shadow-purple-500/50'
                  : 'bg-white/10 text-gray-300 hover:bg-white/20'
              }`}
            >
              {category}
            </button>
          ))}
        </div>

        {/* FAQ Accordion */}
        <div className="max-w-4xl mx-auto space-y-4">
          {filteredFAQs.map((faq, index) => (
            <div
              key={index}
              className="bg-white/10 backdrop-blur-lg rounded-2xl border border-white/20 overflow-hidden transition-all hover:bg-white/15"
            >
              <button
                onClick={() => setOpenIndex(openIndex === index ? null : index)}
                className="w-full px-6 py-5 flex items-center justify-between text-left"
              >
                <div className="flex-1 pr-4">
                  <div className="flex items-center space-x-3 mb-2">
                    <span className="px-3 py-1 bg-purple-500/20 text-purple-300 rounded-full text-xs font-semibold">
                      {faq.category}
                    </span>
                    <span className="text-gray-400 text-sm">Q{index + 1}</span>
                  </div>
                  <h3 className="text-lg font-semibold">{faq.question}</h3>
                </div>
                <div className={`transition-transform ${openIndex === index ? 'rotate-180' : ''}`}>
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </div>
              </button>
              
              {openIndex === index && (
                <div className="px-6 pb-5 animate-slide-down">
                  <div className="pt-4 border-t border-white/10 text-gray-300 leading-relaxed">
                    {faq.answer}
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* CTA Section */}
        <div className="mt-16 text-center">
          <div className="bg-gradient-to-r from-blue-600/20 to-purple-600/20 backdrop-blur-lg rounded-3xl border border-white/20 p-12">
            <h2 className="text-3xl font-bold mb-4">Still have questions?</h2>
            <p className="text-gray-300 mb-8 max-w-2xl mx-auto">
              Our team is here to help! Schedule a personalized demo or speak with our experts to learn how SamvaadX can transform your organization's social media strategy.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/contact"
                className="px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl font-bold text-lg hover:shadow-lg hover:shadow-purple-500/50 transition-all transform hover:scale-105"
              >
                Contact Us
              </Link>
              <Link
                href="/register"
                className="px-8 py-4 bg-white/10 backdrop-blur-lg border border-white/30 rounded-2xl font-bold text-lg hover:bg-white/20 transition-all"
              >
                Get Started
              </Link>
            </div>
          </div>
        </div>

        {/* Quick Links */}
        <div className="mt-12 grid md:grid-cols-3 gap-6">
          <Link
            href="/docs"
            className="bg-white/5 backdrop-blur-lg rounded-2xl border border-white/10 p-6 hover:bg-white/10 transition-all group"
          >
            <div className="text-3xl mb-3">📚</div>
            <h3 className="text-lg font-semibold mb-2 group-hover:text-purple-400 transition-colors">
              Documentation
            </h3>
            <p className="text-gray-400 text-sm">
              Comprehensive guides and API documentation
            </p>
          </Link>

          <Link
            href="/support"
            className="bg-white/5 backdrop-blur-lg rounded-2xl border border-white/10 p-6 hover:bg-white/10 transition-all group"
          >
            <div className="text-3xl mb-3">💬</div>
            <h3 className="text-lg font-semibold mb-2 group-hover:text-purple-400 transition-colors">
              Support Center
            </h3>
            <p className="text-gray-400 text-sm">
              Get help from our 24/7 support team
            </p>
          </Link>

          <Link
            href="/guides"
            className="bg-white/5 backdrop-blur-lg rounded-2xl border border-white/10 p-6 hover:bg-white/10 transition-all group"
          >
            <div className="text-3xl mb-3">🎓</div>
            <h3 className="text-lg font-semibold mb-2 group-hover:text-purple-400 transition-colors">
              Learning Center
            </h3>
            <p className="text-gray-400 text-sm">
              Video tutorials and best practices
            </p>
          </Link>
        </div>
      </div>
    </div>
  );
}

