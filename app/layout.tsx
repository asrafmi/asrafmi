import type { Metadata } from 'next';
import './globals.css';
import Atmosphere from '@/components/ui/Atmosphere';
import Dock from '@/components/ui/Dock';

export const metadata: Metadata = {
  title: 'Asraf Muhammad — Programmer & Technology Enthusiast',
  description:
    'Full-stack programmer with 3.5+ years building scalable web apps and AI products with React, Next.js, Node.js & NestJS. Open to work.',
  keywords: ['Asraf Muhammad', 'Full-Stack Developer', 'React', 'Next.js', 'Node.js', 'NestJS', 'JavaScript', 'Indonesia'],
  authors: [{ name: 'Asraf Muhammad', url: 'https://github.com/asrafmi' }],
  openGraph: {
    title: 'Asraf Muhammad — Programmer & Technology Enthusiast',
    description: 'Full-stack programmer with 3.5+ years building scalable web apps and AI products.',
    type: 'website',
    locale: 'en_US',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Asraf Muhammad — Programmer & Technology Enthusiast',
    description: 'Full-stack programmer with 3.5+ years building scalable web apps and AI products.',
  },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body>
        <Atmosphere />
        <main style={{ position: 'relative', zIndex: 1 }}>{children}</main>
        <Dock />
      </body>
    </html>
  );
}
