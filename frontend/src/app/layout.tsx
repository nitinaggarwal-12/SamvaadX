import type { Metadata } from 'next';
import { Inter, Poppins } from 'next/font/google';
import './globals.css';

const inter = Inter({ subsets: ['latin'] });
const poppins = Poppins({ 
  weight: ['300', '400', '500', '600', '700', '800'],
  subsets: ['latin'],
  variable: '--font-poppins'
});

export const metadata: Metadata = {
  title: 'Guddu-Project | World\'s Most Advanced Social Media Marketing Platform',
  description: 'Government-grade social media marketing command center trusted by parliaments and international organizations worldwide. Powered by AI, built for scale.',
  keywords: 'social media, marketing, government, events, CSPOC, parliament, AI, analytics',
  manifest: '/manifest.json',
  themeColor: '#7c3aed',
  viewport: {
    width: 'device-width',
    initialScale: 1,
    maximumScale: 5,
    userScalable: true,
  },
  appleWebApp: {
    capable: true,
    statusBarStyle: 'black-translucent',
    title: 'Guddu-Project',
  },
  openGraph: {
    title: 'Guddu-Project - Enterprise Social Media Marketing Platform',
    description: 'When world leaders speak to the world, they use Guddu-Project',
    images: ['/og-image.png'],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning className={poppins.variable}>
      <head>
        <link rel="icon" href="/favicon.ico" />
      </head>
      <body className={`${inter.className} antialiased`}>
        {children}
      </body>
    </html>
  );
}
