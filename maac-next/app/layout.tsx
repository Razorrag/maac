import type { Metadata } from 'next';
import { Anton, Inter } from 'next/font/google';
import './globals.css';
import LenisProvider from '@/components/LenisProvider';

// Anton font for headings (DNEG/Lando style aggressive typography)
const anton = Anton({
  weight: '400',
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-anton',
  preload: true,
});

// Inter for body text (clean, readable)
const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-inter',
  preload: true,
});

export const metadata: Metadata = {
  title: 'MAAC India | Animation, VFX & Gaming Courses',
  description: 'MAAC (Maya Academy of Advanced Creativity) is India\'s premier training institute for Animation, VFX, Gaming, and Multimedia. Enter the new age of creative excellence.',
  keywords: ['MAAC', 'Animation', 'VFX', 'Gaming', 'Multimedia', 'India', 'CareerX', 'CreatorX'],
  authors: [{ name: 'MAAC India' }],
  openGraph: {
    title: 'MAAC India | Excellence in Media & Entertainment',
    description: 'Premier training institute for Animation, VFX, and Gaming.',
    type: 'website',
    locale: 'en_IN',
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
      <body className="font-body antialiased bg-background text-foreground scroll-smooth">
        <LenisProvider>
          {children}
        </LenisProvider>
      </body>
    </html>
  );
}
