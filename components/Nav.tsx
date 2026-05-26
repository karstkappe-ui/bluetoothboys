'use client';

import { useState, useEffect } from 'react';

const navLinks = [
  { label: 'Music', href: '#single' },
  { label: 'About', href: '#about' },
  { label: 'Shows', href: '#shows' },
  { label: 'Gallery', href: '#gallery' },
  { label: 'Contact', href: '#contact' },
];

export default function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled
          ? 'bg-[#080808]/92 backdrop-blur-md border-b border-[#1e1e1e]'
          : 'bg-transparent'
      }`}
    >
      <nav className="max-w-7xl mx-auto px-6 py-5 flex items-center justify-between">
        {/* Logo */}
        <a
          href="#"
          className="display-font text-xl tracking-[0.25em] text-white hover:text-[#00A3FF] transition-colors duration-300"
        >
          BTB
        </a>

        {/* Desktop links */}
        <div className="hidden md:flex items-center gap-9">
          {navLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              className="text-xs uppercase tracking-[0.25em] text-gray-400 hover:text-[#00A3FF] transition-colors duration-300"
            >
              {link.label}
            </a>
          ))}
          <a
            href="#contact"
            className="px-5 py-2.5 border border-[#00A3FF] text-[#00A3FF] text-xs uppercase tracking-[0.25em] hover:bg-[#00A3FF] hover:text-black transition-all duration-300"
          >
            Book us
          </a>
        </div>

        {/* Mobile hamburger */}
        <button
          className="md:hidden flex flex-col justify-center gap-1.5 p-2 -mr-2"
          onClick={() => setMenuOpen((o) => !o)}
          aria-label="Toggle navigation"
        >
          <span
            className={`block w-6 h-[1.5px] bg-white transition-all duration-300 origin-center ${
              menuOpen ? 'rotate-45 translate-y-[6px]' : ''
            }`}
          />
          <span
            className={`block w-6 h-[1.5px] bg-white transition-all duration-300 ${
              menuOpen ? 'opacity-0 scale-x-0' : ''
            }`}
          />
          <span
            className={`block w-6 h-[1.5px] bg-white transition-all duration-300 origin-center ${
              menuOpen ? '-rotate-45 -translate-y-[6px]' : ''
            }`}
          />
        </button>
      </nav>

      {/* Mobile drawer */}
      <div
        className={`md:hidden overflow-hidden transition-all duration-400 ease-in-out ${
          menuOpen ? 'max-h-80' : 'max-h-0'
        }`}
      >
        <div className="bg-[#080808]/96 backdrop-blur-md border-t border-[#1e1e1e] px-6 py-5 flex flex-col gap-5">
          {navLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              className="text-xs uppercase tracking-[0.3em] text-gray-400 hover:text-[#00A3FF] transition-colors duration-300 py-1"
              onClick={() => setMenuOpen(false)}
            >
              {link.label}
            </a>
          ))}
          <a
            href="#contact"
            className="mt-2 px-5 py-3 border border-[#00A3FF] text-[#00A3FF] text-xs uppercase tracking-[0.3em] text-center hover:bg-[#00A3FF] hover:text-black transition-all duration-300"
            onClick={() => setMenuOpen(false)}
          >
            Book us
          </a>
        </div>
      </div>
    </header>
  );
}
