import type { Metadata } from 'next';
import './globals.css';
import Atmosphere from '@/components/ui/Atmosphere';
import Dock from '@/components/ui/Dock';

const BASE_URL = 'https://asrafmi.vercel.app';

export const metadata: Metadata = {
  metadataBase: new URL(BASE_URL),
  title: {
    default: 'Asraf Muhammad — Programmer & Technology Enthusiast',
    template: '%s | Asraf Muhammad',
  },
  description:
    'Portfolio of Asraf Muhammad Izzudin — full-stack programmer with 3.5+ years building scalable web apps and AI products with React, Next.js, Node.js & NestJS. Based in Indonesia. Open to work.',
  keywords: [
    'Asraf Muhammad',
    'Asraf',
    'asraf muhammad izzudin',
    'asrafmi',
    'Full-Stack Developer',
    'Full-Stack Programmer',
    'Web Developer Indonesia',
    'Software Engineer Indonesia',
    'React Developer',
    'Next.js Developer',
    'Node.js Developer',
    'NestJS Developer',
    'TypeScript Developer',
    'AI Product Developer',
    'Portfolio',
    'Indonesia',
  ],
  authors: [{ name: 'Asraf Muhammad', url: 'https://github.com/asrafmi' }],
  creator: 'Asraf Muhammad',
  publisher: 'Asraf Muhammad',
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  alternates: {
    canonical: BASE_URL,
  },
  openGraph: {
    title: 'Asraf Muhammad — Programmer & Technology Enthusiast',
    description:
      'Portfolio of Asraf Muhammad Izzudin — full-stack programmer with 3.5+ years building scalable web apps and AI products. Based in Indonesia.',
    type: 'website',
    locale: 'en_US',
    url: BASE_URL,
    siteName: 'Asraf Muhammad Portfolio',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Asraf Muhammad — Programmer & Technology Enthusiast',
    description:
      'Portfolio of Asraf Muhammad Izzudin — full-stack programmer with 3.5+ years building scalable web apps and AI products. Based in Indonesia.',
    creator: '@asrafmi',
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
