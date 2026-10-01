import type { Metadata } from 'next';
import './globals.css';
import Atmosphere from '@/components/ui/Atmosphere';
import Dock from '@/components/ui/Dock';
import Header from '@/components/ui/Header';
import Preloader from '@/components/ui/Preloader';
import Cursor from '@/components/ui/Cursor';
import SmoothScroll from '@/components/motion/SmoothScroll';
import { themeScript } from '@/lib/theme';

const BASE_URL = 'https://asrafmi.vercel.app';

export const metadata: Metadata = {
  metadataBase: new URL(BASE_URL),
  title: {
    default: 'Asraf Muhammad · Programmer & Tech Enthusiast',
    template: '%s | Asraf Muhammad',
  },
  description:
    'Portfolio of Asraf Muhammad Izzuddin, a full stack programmer with 4+ years building scalable web apps and AI products with React, Next.js, Node.js and NestJS. Based in Indonesia and open to work.',
  keywords: [
    'Asraf Muhammad',
    'Asraf',
    'asraf muhammad izzuddin',
    'asrafmi',
    '@asrafmi',
    'asraf m. izzuddin',
    'asraf m izzuddin',
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
    title: 'Asraf Muhammad · Programmer & Tech Enthusiast',
    description:
      'Portfolio of Asraf Muhammad Izzuddin, a full stack programmer with 4+ years building scalable web apps and AI products. Based in Indonesia.',
    type: 'website',
    locale: 'en_US',
    url: BASE_URL,
    siteName: 'Asraf Muhammad Portfolio',
    images: [
      {
        url: `${BASE_URL}/opengraph-image.png`,
        width: 1200,
        height: 630,
        alt: 'Asraf Muhammad · Programmer & Tech Enthusiast',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Asraf Muhammad · Programmer & Tech Enthusiast',
    description:
      'Portfolio of Asraf Muhammad Izzuddin, a full stack programmer with 4+ years building scalable web apps and AI products. Based in Indonesia.',
    creator: '@asrafmi',
  },
  verification: {
    google: '_KZdaRZxMWdYrNNyZp4ZFp4LaDKpNsZZ-Mz3dkBwwQo',
  },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" data-theme="dark" suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
      </head>
      <body>
        <SmoothScroll />
        <Preloader />
        <Atmosphere />
        <Header />
        <main style={{ position: 'relative', zIndex: 1 }}>{children}</main>
        <Dock />
        <Cursor />
      </body>
    </html>
  );
}
