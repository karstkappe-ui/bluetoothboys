import BluetoothIcon from './BluetoothIcon';

const floatingIcons = [
  { top: '8%',  left: '4%',   size: 64,  opacity: 0.1,  animClass: 'animate-float-1', delay: '0s' },
  { top: '12%', right: '6%',  size: 88,  opacity: 0.07, animClass: 'animate-float-2', delay: '2s' },
  { top: '45%', left: '1.5%', size: 44,  opacity: 0.09, animClass: 'animate-float-3', delay: '5s' },
  { top: '60%', right: '2%',  size: 56,  opacity: 0.08, animClass: 'animate-float-1', delay: '3s' },
  { bottom: '22%', left: '12%', size: 36, opacity: 0.12, animClass: 'animate-float-2', delay: '7s' },
  { bottom: '10%', right: '10%', size: 72, opacity: 0.06, animClass: 'animate-float-3', delay: '1s' },
  { top: '30%', right: '15%', size: 28,  opacity: 0.1,  animClass: 'animate-float-1', delay: '4s' },
];

export default function Hero() {
  return (
    <section
      id="home"
      className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden"
      style={{ background: '#080808' }}
    >
      {/* Central radial glow */}
      <div
        className="absolute inset-0 flex items-center justify-center pointer-events-none animate-glow-pulse"
      >
        <div
          style={{
            width: 'min(90vw, 820px)',
            height: 'min(90vw, 820px)',
            borderRadius: '50%',
            background:
              'radial-gradient(circle, rgba(0,163,255,0.13) 0%, rgba(0,163,255,0.05) 40%, transparent 70%)',
            filter: 'blur(48px)',
          }}
        />
      </div>

      {/* Scanline texture */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage:
            'repeating-linear-gradient(0deg, transparent, transparent 3px, rgba(0,163,255,0.012) 3px, rgba(0,163,255,0.012) 4px)',
        }}
      />

      {/* Corner accent lines */}
      <div className="absolute top-28 left-6 w-16 h-16 border-t border-l border-[#00A3FF]/20 pointer-events-none" />
      <div className="absolute top-28 right-6 w-16 h-16 border-t border-r border-[#00A3FF]/20 pointer-events-none" />
      <div className="absolute bottom-16 left-6 w-16 h-16 border-b border-l border-[#00A3FF]/20 pointer-events-none" />
      <div className="absolute bottom-16 right-6 w-16 h-16 border-b border-r border-[#00A3FF]/20 pointer-events-none" />

      {/* Floating Bluetooth icons */}
      {floatingIcons.map((icon, i) => (
        <div
          key={i}
          className={`absolute pointer-events-none ${icon.animClass}`}
          style={{
            top: icon.top,
            bottom: icon.bottom,
            left: icon.left,
            right: icon.right,
            width: icon.size,
            height: icon.size,
            opacity: icon.opacity,
            color: '#00A3FF',
            animationDelay: icon.delay,
          }}
        >
          <BluetoothIcon />
        </div>
      ))}

      {/* Content */}
      <div className="relative z-10 text-center px-6 w-full max-w-7xl mx-auto">
        {/* Genre tag */}
        <div
          className="flex items-center justify-center gap-3 mb-8 animate-fade-up"
          style={{ animationDelay: '0ms' }}
        >
          <div className="h-px w-10 bg-[#00A3FF]" />
          <span className="text-[#00A3FF] text-[0.6rem] uppercase tracking-[0.45em]">
            Electronic · Rock · Pop
          </span>
          <div className="h-px w-10 bg-[#00A3FF]" />
        </div>

        {/* Main title */}
        <h1
          className="display-font leading-none text-white animate-fade-up"
          style={{
            fontSize: 'clamp(4.5rem, 14vw, 15rem)',
            letterSpacing: '-0.01em',
            animationDelay: '80ms',
          }}
        >
          blue<span style={{ color: '#00A3FF' }}>tooth</span>
          <br />
          <span
            style={{
              WebkitTextStroke: '2px rgba(255,255,255,0.55)',
              color: 'transparent',
            }}
          >
            boys
          </span>
        </h1>

        {/* Subtitle */}
        <p
          className="text-gray-500 text-sm md:text-base uppercase tracking-[0.45em] mt-6 animate-fade-up"
          style={{ animationDelay: '200ms' }}
        >
          New band.&nbsp;&nbsp;Same frequency.
        </p>

        {/* CTAs */}
        <div
          className="flex flex-col sm:flex-row items-center justify-center gap-4 mt-12 animate-fade-up"
          style={{ animationDelay: '340ms' }}
        >
          <a
            href="#single"
            className="px-10 py-4 bg-[#00A3FF] text-black text-xs font-bold uppercase tracking-[0.35em] hover:bg-white transition-all duration-300 min-w-[200px] text-center"
          >
            Listen now
          </a>
          <a
            href="#contact"
            className="px-10 py-4 border border-white/30 text-white text-xs font-bold uppercase tracking-[0.35em] hover:border-[#00A3FF] hover:text-[#00A3FF] transition-all duration-300 min-w-[200px] text-center"
          >
            Book us
          </a>
        </div>
      </div>

      {/* Scroll indicator */}
      <div
        className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 animate-fade-in"
        style={{ animationDelay: '1000ms' }}
      >
        <span className="text-[0.6rem] uppercase tracking-[0.4em] text-gray-600">Scroll</span>
        <div
          className="w-px h-10 animate-glow-pulse"
          style={{ background: 'linear-gradient(to bottom, #00A3FF55, transparent)' }}
        />
      </div>
    </section>
  );
}
