'use client';

export default function ContactPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-violet-900">
      <div className="container mx-auto px-6 py-20">
        <h1 className="text-5xl font-bold text-white mb-8">Contact Us</h1>
        <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-8 text-white">
          <p className="text-xl mb-4">Get in touch with our team</p>
          <p className="text-lg mb-2">Email: contact@samvaadx.com</p>
          <p className="text-lg">Phone: +91-XXX-XXX-XXXX</p>
        </div>
      </div>
    </div>
  );
}

