'use client';

export default function SimpleTest() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 text-white p-20">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-6xl font-bold mb-8 bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
          Guddu-Project Test Page
        </h1>
        
        <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-8 border border-white/20 mb-8">
          <h2 className="text-3xl font-bold mb-4">✅ If you can see this styled:</h2>
          <ul className="text-xl space-y-2">
            <li>✅ Next.js is working</li>
            <li>✅ Tailwind CSS is working</li>
            <li>✅ Gradients are working</li>
            <li>✅ Glassmorphism is working</li>
          </ul>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="bg-gradient-to-r from-blue-500 to-cyan-500 p-6 rounded-xl">
            <p className="text-2xl font-bold">Blue Card</p>
          </div>
          <div className="bg-gradient-to-r from-purple-500 to-pink-500 p-6 rounded-xl">
            <p className="text-2xl font-bold">Purple Card</p>
          </div>
          <div className="bg-gradient-to-r from-green-500 to-emerald-500 p-6 rounded-xl">
            <p className="text-2xl font-bold">Green Card</p>
          </div>
          <div className="bg-gradient-to-r from-orange-500 to-red-500 p-6 rounded-xl">
            <p className="text-2xl font-bold">Orange Card</p>
          </div>
        </div>

        <div className="mt-8 p-6 bg-yellow-500/20 border-l-4 border-yellow-500 rounded">
          <p className="text-lg">
            <strong>If you DON'T see colors and styling above:</strong>
            <br />
            There's likely a browser extension blocking styles, or a caching issue.
          </p>
        </div>

        <div className="mt-8">
          <a 
            href="/" 
            className="inline-block px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full font-bold text-xl hover:shadow-lg hover:shadow-purple-500/50 transition-all"
          >
            Go to Main Page
          </a>
        </div>
      </div>
    </div>
  );
}

