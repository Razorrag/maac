import type { Metadata } from 'next';
import { Anton, Inter } from 'next/font/google';
import './globals.css';

// Anton font for headings (DNEG style)
// display: optional - don't block render for non-critical font
const anton = Anton({
  weight: '400',
  subsets: ['latin'],
  display: 'optional',
  variable: '--font-anton',
  preload: false,
});

// Inter for body text (clean, readable)
// display: swap - show fallback immediately, swap when loaded
const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-inter',
  preload: true,
});

export const metadata: Metadata = {
  title: 'MAAC | Moving Arts Academy California',
  description: 'Moving Arts Academy California - Excellence in performing arts education',
  keywords: ['MAAC', 'performing arts', 'dance', 'theatre', 'education', 'California'],
  authors: [{ name: 'MAAC' }],
  openGraph: {
    title: 'MAAC | Moving Arts Academy California',
    description: 'Excellence in performing arts education',
    type: 'website',
    locale: 'en_US',
  },
};

export const viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${anton.variable} ${inter.variable}`}>
      <body className="font-body antialiased bg-dneg-white text-dneg-black">
        {children}
      </body>
    </html>
  );
}
