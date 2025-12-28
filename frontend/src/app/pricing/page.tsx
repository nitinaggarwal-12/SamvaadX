'use client';

export default function PricingPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-violet-900">
      <div className="container mx-auto px-6 py-20">
        <h1 className="text-5xl font-bold text-white mb-8 text-center">Pricing</h1>
        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {['Enterprise', 'Government', 'Custom'].map((plan) => (
            <div key={plan} className="bg-white/10 backdrop-blur-lg rounded-2xl p-8 text-white">
              <h3 className="text-2xl font-bold mb-4">{plan}</h3>
              <p className="text-3xl font-bold mb-6">Contact Us</p>
              <ul className="space-y-3 mb-8">
                <li>✅ All Features</li>
                <li>✅ Unlimited Users</li>
                <li>✅ 24/7 Support</li>
                <li>✅ Custom Integration</li>
              </ul>
              <button className="w-full bg-purple-600 hover:bg-purple-700 py-3 rounded-lg font-semibold">
                Get Started
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

