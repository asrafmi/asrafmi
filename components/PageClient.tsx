'use client';

import { useCallback, useRef } from 'react';
import Hero from '@/components/sections/Hero';
import About from '@/components/sections/About';
import Experience from '@/components/sections/Experience';
import Projects from '@/components/sections/Projects';
import Skills from '@/components/sections/Skills';
import Contact from '@/components/sections/Contact';
import Marquee from '@/components/motion/Marquee';
import ChatPanel from '@/components/ui/ChatPanel';
import { scrollToSection } from '@/lib/motion';

const STACK = ['React', 'Next.js', 'NestJS', 'TypeScript', 'Node.js', 'PostgreSQL', 'Elasticsearch', 'Kubernetes'];
const CTA = ['Open to work', 'Full stack', 'AI products', 'Let’s talk'];

export default function PageClient({ articles }: { articles: React.ReactNode }) {
  const openChatRef = useRef<(() => void) | null>(null);
  const handleChatOpen = useCallback(() => openChatRef.current?.(), []);
  const registerOpen = useCallback((fn: () => void) => { openChatRef.current = fn; }, []);

  return (
    <>
      <Hero />
      <div style={{ borderTop: '1px solid var(--border)', borderBottom: '1px solid var(--border)' }}>
        <Marquee items={STACK} icons />
      </div>
      <About />
      <Experience />
      <Projects />
      <Skills />
      {articles}
      <div style={{ borderTop: '1px solid var(--border)', borderBottom: '1px solid var(--border)' }}>
        <Marquee items={CTA} reverse outline speed={30} />
      </div>
      <Contact onChatOpen={handleChatOpen} />

      <footer style={{ borderTop: '1px solid var(--border)', padding: '32px 0 110px' }}>
        <div className="wrap footer-inner">
          <span>© 2026 Asraf Muhammad</span>
          <span>Made with too much coffee · Indonesia</span>
          <span style={{ display: 'flex', gap: 20 }}>
            <a href="https://github.com/asrafmi" target="_blank" rel="noopener" className="ulink">GitHub</a>
            <a href="https://linkedin.com/in/asrafmi" target="_blank" rel="noopener" className="ulink">LinkedIn</a>
            <button onClick={() => scrollToSection('home')} className="ulink" style={{ fontSize: 'inherit', letterSpacing: 'inherit' }}>Back to top ↑</button>
          </span>
        </div>
      </footer>

      <ChatPanel onOpenRequest={registerOpen} />
    </>
  );
}
