import AnimateIn from './AnimateIn';

export default function About() {
  return (
    <section
      id="about"
      className="relative py-28 md:py-40 overflow-hidden"
      style={{ background: '#0a0a0a' }}
    >
      {/* Left glow */}
      <div
        className="absolute left-0 top-1/2 -translate-y-1/2 pointer-events-none"
        style={{
          width: '40vw',
          height: '40vw',
          background: 'radial-gradient(circle, rgba(0,163,255,0.07) 0%, transparent 70%)',
          filter: 'blur(60px)',
        }}
      />

      <div className="max-w-7xl mx-auto px-6">
        <div className="grid md:grid-cols-[1fr_2fr] gap-12 md:gap-24 items-center">
          {/* Left: Label and accent */}
          <AnimateIn>
            <div>
              <div className="section-label mb-6">About</div>
              <div
                className="display-font text-white leading-none"
                style={{ fontSize: 'clamp(3.5rem, 8vw, 6rem)' }}
              >
                WHO<br />WE<br />
                <span style={{ color: '#00A3FF' }}>ARE</span>
              </div>
              {/* Decorative line */}
              <div className="mt-8 flex items-center gap-4">
                <div className="h-px w-16 bg-[#00A3FF]" />
                <div className="h-px w-8 bg-[#00A3FF]/30" />
                <div className="h-px w-4 bg-[#00A3FF]/15" />
              </div>
            </div>
          </AnimateIn>

          {/* Right: Text */}
          <AnimateIn delay={120}>
            <div className="space-y-6">
              <p
                className="text-white/90 leading-relaxed"
                style={{ fontSize: 'clamp(1.1rem, 2.5vw, 1.5rem)' }}
              >
                bluetoothboys is a new band built on good vibes, loud sound
                and full energy. Three friends, one frequency.
              </p>
              <p className="text-gray-500 text-sm leading-loose">
                Born from late nights, studio sessions and the kind of restless energy you can&apos;t
                explain. We bridge the gap between electronic and rock — raw but polished, underground
                but made for the main stage. Signal locked. Volume maxed.
              </p>

              {/* Stats row */}
              <div className="grid grid-cols-3 gap-4 pt-6 border-t border-[#1e1e1e]">
                {[
                  { num: '3', label: 'Members' },
                  { num: '1', label: 'Frequency' },
                  { num: '∞', label: 'Energy' },
                ].map((stat) => (
                  <div key={stat.label}>
                    <div
                      className="display-font text-[#00A3FF] leading-none"
                      style={{ fontSize: 'clamp(2rem, 5vw, 3.5rem)' }}
                    >
                      {stat.num}
                    </div>
                    <div className="text-gray-600 text-[0.65rem] uppercase tracking-[0.3em] mt-1">
                      {stat.label}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </AnimateIn>
        </div>
      </div>
    </section>
  );
}
