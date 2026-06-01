'use client';

import { useState, useRef, useEffect, useCallback } from 'react';
import Image from 'next/image';

type Role = 'user' | 'assistant';
type Message = { role: Role; content: string };

const SUGGESTIONS = [
  { q: "What's your experience?", icon: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" width={17} height={17}><rect x="2" y="7" width="20" height="14" rx="2"/><path d="M8 7V5a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/></svg> },
  { q: 'What skills and tech do you use?', icon: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" width={17} height={17}><path d="m12 2 2.8 6.6L22 9.2l-5.5 4.7L18.2 21 12 17.3 5.8 21l1.7-7.1L2 9.2l7.2-.6z"/></svg> },
  { q: 'What have you built?', icon: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" width={17} height={17}><path d="m16 18 6-6-6-6M8 6l-6 6 6 6"/></svg> },
  { q: 'Are you open to work, and how do I reach you?', icon: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" width={17} height={17}><circle cx="12" cy="8" r="4"/><path d="M4 21a8 8 0 0 1 16 0"/></svg> },
];

function fmt(text: string) {
  return text
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>')
    .replace(/\n/g, '<br>');
}

export default function ChatPanel({ onOpenRequest }: { onOpenRequest?: (open: () => void) => void }) {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [busy, setBusy] = useState(false);
  const bodyRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);

  const openChat = useCallback(() => setIsOpen(true), []);
  const closeChat = useCallback(() => setIsOpen(false), []);

  useEffect(() => {
    onOpenRequest?.(openChat);
  }, [onOpenRequest, openChat]);

  useEffect(() => {
    if (isOpen) setTimeout(() => inputRef.current?.focus(), 300);
  }, [isOpen]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) closeChat();
    };
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, [isOpen, closeChat]);

  const scrollBottom = () => {
    if (bodyRef.current) bodyRef.current.scrollTop = bodyRef.current.scrollHeight;
  };

  const ask = useCallback(
    async (q: string) => {
      if (busy || !q.trim()) return;
      setBusy(true);

      const userMsg: Message = { role: 'user', content: q };
      const nextMessages = [...messages, userMsg];
      setMessages(nextMessages);
      scrollBottom();

      // Placeholder for streaming AI message
      setMessages((prev) => [...prev, { role: 'assistant', content: '' }]);

      try {
        const res = await fetch('/api/chat', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ messages: nextMessages }),
        });

        const reader = res.body?.getReader();
        const decoder = new TextDecoder();
        let accumulated = '';

        while (reader) {
          const { done, value } = await reader.read();
          if (done) break;

          const raw = decoder.decode(value, { stream: true });
          for (const line of raw.split('\n')) {
            if (!line.startsWith('data: ')) continue;
            const payload = line.slice(6);
            if (payload === '[DONE]' || payload === '[ERROR]') break;
            try {
              accumulated += JSON.parse(payload) as string;
              setMessages((prev) => {
                const copy = [...prev];
                copy[copy.length - 1] = { role: 'assistant', content: accumulated };
                return copy;
              });
              scrollBottom();
            } catch {
              // malformed chunk, skip
            }
          }
        }

        if (!accumulated) {
          setMessages((prev) => {
            const copy = [...prev];
            copy[copy.length - 1] = {
              role: 'assistant',
              content: "Sorry, I didn't catch that — mind rephrasing?",
            };
            return copy;
          });
        }
      } catch {
        setMessages((prev) => {
          const copy = [...prev];
          copy[copy.length - 1] = {
            role: 'assistant',
            content: 'Hmm, my AI brain hit a snag. You can always reach me directly at **asraf.muhammad07@gmail.com**.',
          };
          return copy;
        });
      } finally {
        setBusy(false);
        inputRef.current?.focus();
        scrollBottom();
      }
    },
    [busy, messages]
  );

  const handleSend = () => {
    const val = input.trim();
    setInput('');
    ask(val);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const autosize = () => {
    const el = inputRef.current;
    if (!el) return;
    el.style.height = 'auto';
    el.style.height = `${Math.min(el.scrollHeight, 120)}px`;
  };

  return (
    <>
      {/* FAB */}
      <button
        onClick={openChat}
        aria-label="Chat with Asraf"
        style={{
          position: 'fixed',
          bottom: 26,
          right: 26,
          zIndex: 70,
          display: isOpen ? 'none' : 'inline-flex',
          alignItems: 'center',
          gap: 11,
          padding: '13px 20px 13px 14px',
          background: 'var(--accent)',
          color: '#1a1205',
          borderRadius: 100,
          fontWeight: 600,
          fontSize: 14.5,
          boxShadow: '0 14px 40px -10px var(--accent-glow)',
          transition: 'transform 0.3s var(--ease), box-shadow 0.3s',
          border: 'none',
          cursor: 'pointer',
          fontFamily: 'inherit',
        }}
      >
        <span style={{ width: 30, height: 30, borderRadius: '50%', overflow: 'hidden', border: '2px solid rgba(0,0,0,0.2)', flexShrink: 0 }}>
          <Image src="/assets/asraf.jpeg" alt="Asraf" width={30} height={30} style={{ objectFit: 'cover', objectPosition: '50% 20%' }} />
        </span>
        <span>Chat with Asraf</span>
        <span style={{ width: 8, height: 8, borderRadius: '50%', background: '#0d3b1f' }} />
      </button>

      {/* Backdrop */}
      {isOpen && (
        <div
          onClick={closeChat}
          style={{
            position: 'fixed',
            inset: 0,
            background: 'rgba(0,0,0,0.4)',
            zIndex: 75,
            animation: 'fadeIn 0.3s ease forwards',
          }}
        />
      )}

      {/* Panel */}
      <aside
        aria-hidden={!isOpen}
        style={{
          position: 'fixed',
          top: 0,
          right: 0,
          height: '100vh',
          width: 420,
          maxWidth: '92vw',
          zIndex: 80,
          background: 'rgba(8,8,10,0.86)',
          backdropFilter: 'blur(24px) saturate(1.3)',
          borderLeft: '1px solid var(--border-2)',
          display: 'flex',
          flexDirection: 'column',
          transform: isOpen ? 'none' : 'translateX(100%)',
          transition: 'transform 0.55s cubic-bezier(0.16,1,0.3,1)',
          boxShadow: '-30px 0 80px -20px rgba(0,0,0,0.7)',
        }}
      >
        {/* Header */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '18px 20px', borderBottom: '1px solid var(--border)' }}>
          <div style={{ position: 'relative', width: 38, height: 38, borderRadius: '50%', overflow: 'hidden', border: '1px solid var(--border-2)', flexShrink: 0 }}>
            <Image src="/assets/asraf.jpeg" alt="Asraf" fill style={{ objectFit: 'cover', objectPosition: '50% 20%' }} />
            <span style={{ position: 'absolute', bottom: 0, right: 0, width: 11, height: 11, borderRadius: '50%', background: 'var(--green)', border: '2px solid #08080a' }} />
          </div>
          <div style={{ flex: 1 }}>
            <div style={{ fontWeight: 600, fontSize: 15 }}>Chat with Asraf</div>
            <div style={{ fontSize: 12, color: 'var(--green)', fontFamily: 'var(--ff-mono)' }}>● AI twin · online</div>
          </div>
          <button
            onClick={() => { setMessages([]); }}
            aria-label="Reset chat"
            title="New chat"
            style={{ width: 34, height: 34, borderRadius: 9, display: 'grid', placeItems: 'center', color: 'var(--muted)', transition: 'all 0.3s', border: 'none', background: 'none', cursor: 'pointer' }}
          >
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" width={18} height={18}><path d="M3 12a9 9 0 1 0 3-6.7L3 8"/><path d="M3 3v5h5"/></svg>
          </button>
          <button
            onClick={closeChat}
            aria-label="Close chat"
            style={{ width: 34, height: 34, borderRadius: 9, display: 'grid', placeItems: 'center', color: 'var(--muted)', transition: 'all 0.3s', border: 'none', background: 'none', cursor: 'pointer' }}
          >
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.9" width={18} height={18}><path d="M18 6 6 18M6 6l12 12"/></svg>
          </button>
        </div>

        {/* Body */}
        <div
          ref={bodyRef}
          style={{
            flex: 1,
            overflowY: 'auto',
            padding: '22px 20px',
            display: 'flex',
            flexDirection: 'column',
            gap: 16,
            scrollbarWidth: 'thin',
            scrollbarColor: 'var(--border-2) transparent',
          }}
        >
          {messages.length === 0 && (
            <div>
              <h3 style={{ fontSize: 24, fontWeight: 700, letterSpacing: '-0.02em', lineHeight: 1.2, marginBottom: 8 }}>
                Hi! I&apos;m Asraf. Ask me anything about my work, experience, or projects.
              </h3>
              <p style={{ color: 'var(--muted)', fontSize: 14.5, lineHeight: 1.6 }}>
                This is my AI-powered twin — it answers in my voice using my real CV. Pick a question or type your own.
              </p>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 8, marginTop: 16 }}>
                {SUGGESTIONS.map((s) => (
                  <button
                    key={s.q}
                    onClick={() => ask(s.q)}
                    style={{
                      textAlign: 'left',
                      display: 'flex',
                      alignItems: 'center',
                      gap: 11,
                      padding: '13px 15px',
                      border: '1px solid var(--border)',
                      borderRadius: 13,
                      background: 'var(--surface)',
                      color: 'var(--text)',
                      fontSize: 14,
                      transition: 'all 0.35s var(--ease)',
                      cursor: 'pointer',
                      fontFamily: 'inherit',
                    }}
                  >
                    <span style={{ color: 'var(--accent)', flexShrink: 0 }}>{s.icon}</span>
                    {s.q}
                    <span style={{ marginLeft: 'auto', color: 'var(--muted-2)' }}>→</span>
                  </button>
                ))}
              </div>
            </div>
          )}

          {messages.map((m, i) => (
            <div
              key={i}
              style={{
                display: 'flex',
                gap: 10,
                flexDirection: m.role === 'user' ? 'row-reverse' : 'row',
                animation: 'msgIn 0.5s cubic-bezier(0.16,1,0.3,1)',
              }}
            >
              {m.role === 'assistant' && (
                <div style={{ width: 28, height: 28, borderRadius: '50%', overflow: 'hidden', flexShrink: 0, border: '1px solid var(--border-2)', position: 'relative' }}>
                  <Image src="/assets/asraf.jpeg" alt="" fill style={{ objectFit: 'cover', objectPosition: '50% 20%' }} />
                </div>
              )}
              <div
                style={{
                  padding: '12px 15px',
                  borderRadius: 15,
                  fontSize: 14.5,
                  lineHeight: 1.6,
                  maxWidth: '78%',
                  border: m.role === 'user' ? 'none' : '1px solid var(--border)',
                  background: m.role === 'user' ? 'var(--accent)' : 'var(--surface)',
                  color: m.role === 'user' ? '#1a1205' : 'var(--text)',
                  fontWeight: m.role === 'user' ? 500 : 400,
                  borderTopLeftRadius: m.role === 'assistant' ? 4 : 15,
                  borderTopRightRadius: m.role === 'user' ? 4 : 15,
                }}
                dangerouslySetInnerHTML={
                  m.role === 'assistant'
                    ? { __html: m.content === '' ? '<span class="typing-indicator"><i></i><i></i><i></i></span>' : fmt(m.content) }
                    : { __html: fmt(m.content) }
                }
              />
            </div>
          ))}
        </div>

        {/* Footer */}
        <div style={{ padding: '14px 16px 18px', borderTop: '1px solid var(--border)' }}>
          <div
            style={{
              display: 'flex',
              alignItems: 'flex-end',
              gap: 8,
              background: 'var(--surface)',
              border: '1px solid var(--border)',
              borderRadius: 15,
              padding: '8px 8px 8px 16px',
            }}
          >
            <textarea
              ref={inputRef}
              rows={1}
              value={input}
              placeholder="Message Asraf's AI…"
              disabled={busy}
              onChange={(e) => { setInput(e.target.value); autosize(); }}
              onKeyDown={handleKeyDown}
              style={{
                flex: 1,
                background: 'none',
                border: 'none',
                outline: 'none',
                resize: 'none',
                color: 'var(--text)',
                fontFamily: 'inherit',
                fontSize: 14.5,
                lineHeight: 1.5,
                maxHeight: 120,
                padding: '6px 0',
              }}
            />
            <button
              onClick={handleSend}
              disabled={!input.trim() || busy}
              aria-label="Send"
              style={{
                width: 38,
                height: 38,
                borderRadius: 11,
                background: 'var(--accent)',
                color: '#1a1205',
                display: 'grid',
                placeItems: 'center',
                flexShrink: 0,
                border: 'none',
                cursor: 'pointer',
                opacity: !input.trim() || busy ? 0.4 : 1,
                transition: 'all 0.3s var(--ease)',
              }}
            >
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width={17} height={17}>
                <path d="M22 2 11 13M22 2l-7 20-4-9-9-4z" />
              </svg>
            </button>
          </div>
          <p style={{ fontSize: 11, color: 'var(--muted-2)', textAlign: 'center', marginTop: 11, lineHeight: 1.4 }}>
            This is my AI-powered twin. It may not be 100% accurate — verify anything important.
          </p>
        </div>
      </aside>

      <style>{`
        .typing-indicator { display: inline-flex; gap: 4px; align-items: center; }
        .typing-indicator i { width: 6px; height: 6px; border-radius: 50%; background: var(--muted); animation: typb 1.2s infinite; display: block; }
        .typing-indicator i:nth-child(2) { animation-delay: 0.2s; }
        .typing-indicator i:nth-child(3) { animation-delay: 0.4s; }
      `}</style>
    </>
  );
}
