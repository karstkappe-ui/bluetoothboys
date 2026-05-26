'use client';

import { useState, FormEvent } from 'react';
import AnimateIn from './AnimateIn';

const socials = [
  { label: 'Instagram', href: '#' },
  { label: 'TikTok', href: '#' },
  { label: 'Spotify', href: '#' },
  { label: 'YouTube', href: '#' },
];

export default function Contact() {
  const [sent, setSent] = useState(false);
  const [form, setForm] = useState({ name: '', email: '', message: '' });

  function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setSent(true);
  }

  const inputClass =
    'w-full bg-transparent border border-[#1e1e1e] text-white text-sm px-4 py-3.5 placeholder-gray-700 focus:outline-none focus:border-[#00A3FF] transition-colors duration-300 resize-none';

  return (
    <section
      id="contact"
      className="relative py-28 md:py-40 overflow-hidden"
      style={{ background: '#080808' }}
    >
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#00A3FF]/25 to-transparent" />

      {/* Background glow */}
      <div
        className="absolute left-1/2 bottom-0 -translate-x-1/2 pointer-events-none"
        style={{
          width: '70vw',
          height: '40vw',
          background: 'radial-gradient(ellipse, rgba(0,163,255,0.07) 0%, transparent 70%)',
          filter: 'blur(50px)',
        }}
      />

      <div className="max-w-7xl mx-auto px-6">
        <div className="grid md:grid-cols-[1fr_1.4fr] gap-14 md:gap-24">
          {/* Left: Info */}
          <AnimateIn>
            <div>
              <div className="section-label mb-4">Get in touch</div>
              <h2
                className="display-font text-white leading-none mb-8"
                style={{ fontSize: 'clamp(3rem, 7vw, 5.5rem)' }}
              >
                BOOK<br />
                <span style={{ color: '#00A3FF' }}>US</span>
              </h2>

              <div className="space-y-6 mb-12">
                <div>
                  <div className="text-[0.6rem] uppercase tracking-[0.35em] text-gray-600 mb-1">
                    Booking
                  </div>
                  <a
                    href="mailto:booking@bluetoothboys.nl"
                    className="text-white text-sm hover:text-[#00A3FF] transition-colors duration-300"
                  >
                    booking@bluetoothboys.nl
                  </a>
                </div>
                <div>
                  <div className="text-[0.6rem] uppercase tracking-[0.35em] text-gray-600 mb-3">
                    Follow the signal
                  </div>
                  <div className="flex flex-wrap gap-4">
                    {socials.map((s) => (
                      <a
                        key={s.label}
                        href={s.href}
                        className="text-gray-500 text-xs uppercase tracking-[0.25em] hover:text-[#00A3FF] transition-colors duration-300 border-b border-transparent hover:border-[#00A3FF] pb-0.5"
                      >
                        {s.label}
                      </a>
                    ))}
                  </div>
                </div>
              </div>

              {/* Decorative element */}
              <div className="hidden md:block space-y-2">
                {[100, 70, 45, 25].map((w) => (
                  <div
                    key={w}
                    className="h-px bg-gradient-to-r from-[#00A3FF]/40 to-transparent"
                    style={{ width: `${w}%` }}
                  />
                ))}
              </div>
            </div>
          </AnimateIn>

          {/* Right: Form */}
          <AnimateIn delay={100}>
            {sent ? (
              <div className="flex flex-col items-start justify-center h-full gap-4 py-12">
                <div className="w-12 h-12 border border-[#00A3FF] flex items-center justify-center">
                  <svg viewBox="0 0 24 24" fill="none" className="w-6 h-6 text-[#00A3FF]">
                    <polyline points="20 6 9 17 4 12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </div>
                <h3
                  className="display-font text-white"
                  style={{ fontSize: '2.5rem' }}
                >
                  Signal received.
                </h3>
                <p className="text-gray-500 text-sm">
                  We&apos;ll get back to you within 48 hours.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block text-[0.6rem] uppercase tracking-[0.35em] text-gray-600 mb-2">
                    Name
                  </label>
                  <input
                    type="text"
                    required
                    className={inputClass}
                    placeholder="Your name"
                    value={form.name}
                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                  />
                </div>
                <div>
                  <label className="block text-[0.6rem] uppercase tracking-[0.35em] text-gray-600 mb-2">
                    Email
                  </label>
                  <input
                    type="email"
                    required
                    className={inputClass}
                    placeholder="your@email.com"
                    value={form.email}
                    onChange={(e) => setForm({ ...form, email: e.target.value })}
                  />
                </div>
                <div>
                  <label className="block text-[0.6rem] uppercase tracking-[0.35em] text-gray-600 mb-2">
                    Message
                  </label>
                  <textarea
                    required
                    rows={5}
                    className={inputClass}
                    placeholder="Tell us about your event, festival, venue..."
                    value={form.message}
                    onChange={(e) => setForm({ ...form, message: e.target.value })}
                  />
                </div>
                <button
                  type="submit"
                  className="w-full py-4 bg-[#00A3FF] text-black text-xs font-bold uppercase tracking-[0.35em] hover:bg-white transition-all duration-300 mt-2"
                >
                  Send message →
                </button>
                <p className="text-gray-700 text-[0.6rem] text-center tracking-wider">
                  We respond within 48 hours
                </p>
              </form>
            )}
          </AnimateIn>
        </div>
      </div>
    </section>
  );
}
