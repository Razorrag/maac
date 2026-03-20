'use client';

import { useState, useEffect } from 'react';

const NAV_LINKS = [
  { label: 'COURSES', href: '#courses' },
  { label: "STUDENT'S WORLD", href: '#student-world' },
  { label: 'EVENTS', href: '#events' },
  { label: 'ABOUT US', href: '#about' },
];

export default function Navigation({ transparent = false }: { transparent?: boolean }) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav
      className="fixed top-0 w-full z-50 transition-all duration-300"
      style={{
        background: scrolled ? 'rgba(10,10,10,0.95)' : 'transparent',
        backdropFilter: scrolled ? 'blur(20px)' : 'none',
        borderBottom: scrolled ? '1px solid #2a2a2a' : 'none',
        padding: scrolled ? '1rem 0' : '1.5rem 0',
      }}
    >
      <div className="max-w-7xl mx-auto px-4 md:px-8 flex justify-between items-center">
        {/* Logo */}
        <a href="/" className="font-display text-2xl md:text-3xl tracking-wider" style={{ color: '#F5EFE0' }}>
          MAAC<span style={{ color: '#E8281C' }}>X</span>
        </a>

        {/* Desktop Links */}
        <div className="hidden md:flex items-center gap-8">
          {NAV_LINKS.map((link) => (
            <a
              key={link.label}
              href={link.href}
              className="font-display text-sm uppercase tracking-widest relative group"
              style={{ color: '#8A7F72' }}
              onMouseEnter={e => (e.currentTarget as HTMLElement).style.color = '#F5EFE0'}
              onMouseLeave={e => (e.currentTarget as HTMLElement).style.color = '#8A7F72'}
            >
              {link.label}
              <span
                className="absolute -bottom-2 left-0 w-0 h-[2px] transition-all duration-300 group-hover:w-full"
                style={{ background: '#22C55E' }}
              />
            </a>
          ))}
          <button
            className="btn-primary text-sm"
            style={{ fontSize: '0.75rem', padding: '0.6rem 1.25rem' }}
          >
            ENQUIRE NOW
          </button>
        </div>

        {/* Mobile menu toggle */}
        <button
          className="md:hidden p-2"
          style={{ color: '#F5EFE0' }}
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          aria-label="Toggle menu"
        >
          <div className="w-6 h-5 relative flex flex-col justify-between">
            <span className={`w-full h-[2px] bg-current transition-all duration-300 ${mobileMenuOpen ? 'rotate-45 translate-y-[9px]' : ''}`} />
            <span className={`w-full h-[2px] bg-current transition-all duration-300 ${mobileMenuOpen ? 'opacity-0' : ''}`} />
            <span className={`w-full h-[2px] bg-current transition-all duration-300 ${mobileMenuOpen ? '-rotate-45 -translate-y-[9px]' : ''}`} />
          </div>
        </button>
      </div>

      {/* Mobile Drawer */}
      <div
        className={`md:hidden fixed inset-0 top-[72px] z-40 transition-transform duration-500`}
        style={{
          background: 'rgba(10,10,10,0.97)',
          backdropFilter: 'blur(20px)',
          transform: mobileMenuOpen ? 'translateX(0)' : 'translateX(100%)',
        }}
      >
        <div className="flex flex-col p-8 gap-6">
          {NAV_LINKS.map((link) => (
            <a
              key={link.label}
              href={link.href}
              onClick={() => setMobileMenuOpen(false)}
              className="font-display text-3xl uppercase tracking-wider pb-4"
              style={{ color: '#F5EFE0', borderBottom: '1px solid #2a2a2a' }}
            >
              {link.label}
            </a>
          ))}
          <button className="btn-primary mt-8 text-xl" style={{ padding: '1rem 2rem' }}>
            ENQUIRE NOW
          </button>
        </div>
      </div>
    </nav>
  );
}
