'use client';

import { useCallback, useRef } from 'react';
import Hero from '@/components/sections/Hero';
import About from '@/components/sections/About';
import Experience from '@/components/sections/Experience';
import Projects from '@/components/sections/Projects';
import Skills from '@/components/sections/Skills';
import Contact from '@/components/sections/Contact';
import ChatPanel from '@/components/ui/ChatPanel';
import { useReveal } from '@/hooks/useReveal';

export default function Home() {
  useReveal();

  // Bridge: Contact button → ChatPanel open
  const openChatRef = useRef<(() => void) | null>(null);
  const handleChatOpen = useCallback(() => openChatRef.current?.(), []);
  const registerOpen = useCallback((fn: () => void) => { openChatRef.current = fn; }, []);

  return (
    <>
      <Hero onChatOpen={handleChatOpen} />
      <About />
      <Experience />
      <Projects />
      <Skills />
      <Contact onChatOpen={handleChatOpen} />

      <footer style={{ borderTop: '1px solid var(--border)', padding: '34px 0' }}>
        <div className="footer-inner">
          <span>© 2026 Asraf Muhammad</span>
          <span>Built with care · Indonesia</span>
          <span>
            <a href="https://github.com/asrafmi" target="_blank" rel="noopener" style={{ transition: 'color 0.3s' }}>GitHub</a>
            {' · '}
            <a href="https://linkedin.com/in/asrafmi" target="_blank" rel="noopener" style={{ transition: 'color 0.3s' }}>LinkedIn</a>
          </span>
        </div>
      </footer>

      <ChatPanel onOpenRequest={registerOpen} />
    </>
  );
}
