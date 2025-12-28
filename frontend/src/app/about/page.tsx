'use client';

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-violet-900">
      <div className="container mx-auto px-6 py-20">
        <h1 className="text-5xl font-bold text-white mb-8">About SamvaadX</h1>
        <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-8 text-white">
          <p className="text-xl mb-6">
            SamvaadX is a world-class social media marketing portal designed for governments, 
            international organizations, and enterprises.
          </p>
          <p className="text-lg mb-4">
            Built with cutting-edge technology, we provide the most advanced social media 
            management platform trusted by top governments worldwide.
          </p>
          <p className="text-lg">
            Our first customer: Parliament of India for CSPOC 2026.
          </p>
        </div>
      </div>
    </div>
  );
}

