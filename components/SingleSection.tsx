import Image from 'next/image';
import AnimateIn from './AnimateIn';

const streamingLinks = [
  { label: 'Spotify', href: '#' },
  { label: 'Apple Music', href: '#' },
  { label: 'YouTube', href: '#' },
];

export default function SingleSection() {
  return (
    <section
      id="single"
      className="relative py-28 md:py-40 overflow-hidden"
      style={{ background: '#080808' }}
    >
      {/* Top border */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#00A3FF]/40 to-transparent" />

      {/* Background glow — right side */}
      <div
        className="absolute right-0 top-1/2 -translate-y-1/2 pointer-events-none"
        style={{
          width: '50vw',
          height: '50vw',
          background: 'radial-gradient(circle, rgba(0,163,255,0.09) 0%, transparent 65%)',
          filter: 'blur(60px)',
        }}
      />

      <div className="max-w-7xl mx-auto px-6">
        <div className="grid md:grid-cols-2 gap-12 md:gap-20 items-center">
          {/* Left: Single artwork */}
          <AnimateIn>
            <div className="relative aspect-square w-full max-w-sm mx-auto md:mx-0 overflow-hidden">
              <Image
                src="/single-cover.jpg"
                alt="bluetoothboys — Ready to Pair single cover"
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 384px"
                priority
              />
            </div>
          </AnimateIn>

          {/* Right: Info */}
          <AnimateIn delay={100}>
            <div>
              <div className="section-label mb-4">New single</div>
              <h2
                className="display-font text-white leading-none mb-4"
                style={{ fontSize: 'clamp(3rem, 8vw, 7rem)' }}
              >
                READY<br />
                <span style={{ color: '#00A3FF' }}>TO PAIR</span>
              </h2>
              <p className="text-gray-400 text-sm leading-relaxed mb-8 max-w-md">
                Our debut single is almost connected. High-voltage energy, raw frequency, and a hook that
                doesn&apos;t let go. Pair up before everyone else does.
              </p>

              {/* Release pill */}
              <div className="inline-flex items-center gap-2 px-4 py-2 border border-[#00A3FF]/30 text-[#00A3FF] text-[0.65rem] uppercase tracking-[0.35em] mb-8">
                <span
                  className="w-1.5 h-1.5 rounded-full bg-[#00A3FF] animate-pulse"
                  style={{ animationDuration: '1.5s' }}
                />
                Coming soon
              </div>

              {/* CTA button */}
              <div className="mb-10">
                <a
                  href="#"
                  className="inline-block px-10 py-4 bg-[#00A3FF] text-black text-xs font-bold uppercase tracking-[0.35em] hover:bg-white transition-all duration-300"
                >
                  Pre-save now
                </a>
              </div>

              {/* Streaming links */}
              <div>
                <p className="text-gray-600 text-[0.6rem] uppercase tracking-[0.3em] mb-4">
                  Also available on
                </p>
                <div className="flex gap-5 flex-wrap">
                  {streamingLinks.map((s) => (
                    <a
                      key={s.label}
                      href={s.href}
                      className="text-gray-600 text-xs uppercase tracking-[0.2em] hover:text-[#00A3FF] transition-colors duration-300 border-b border-gray-700 hover:border-[#00A3FF] pb-0.5"
                    >
                      {s.label}
                    </a>
                  ))}
                </div>
              </div>
            </div>
          </AnimateIn>
        </div>
      </div>

      {/* Bottom border */}
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#1e1e1e] to-transparent" />
    </section>
  );
}
