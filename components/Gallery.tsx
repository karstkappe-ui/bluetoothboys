import AnimateIn from './AnimateIn';

const photos = [
  { id: 1, label: 'Live at rehearsal', aspect: 'aspect-video', span: 'md:col-span-2' },
  { id: 2, label: 'Studio session', aspect: 'aspect-[3/4]', span: '' },
  { id: 3, label: 'Behind the scenes', aspect: 'aspect-square', span: '' },
  { id: 4, label: 'Sound check', aspect: 'aspect-square', span: '' },
  { id: 5, label: 'Portrait', aspect: 'aspect-[3/4]', span: '' },
  { id: 6, label: 'Stage prep', aspect: 'aspect-video', span: 'md:col-span-2' },
];

function PhotoPlaceholder({ label, index }: { label: string; index: number }) {
  return (
    <div
      className="relative w-full h-full overflow-hidden border border-[#1a1a1a] group cursor-pointer"
      style={{ background: '#0c0c0c' }}
    >
      {/* Diagonal stripe pattern */}
      <div
        className="absolute inset-0 transition-opacity duration-500 group-hover:opacity-60"
        style={{
          backgroundImage:
            'repeating-linear-gradient(45deg, #131313 0px, #131313 1px, transparent 1px, transparent 24px)',
        }}
      />

      {/* Hover: blue overlay */}
      <div className="absolute inset-0 bg-[#00A3FF]/0 group-hover:bg-[#00A3FF]/5 transition-all duration-500" />

      {/* Corner accents that appear on hover */}
      <div className="absolute top-3 left-3 w-5 h-5 border-t border-l border-[#00A3FF]/0 group-hover:border-[#00A3FF]/60 transition-all duration-500" />
      <div className="absolute top-3 right-3 w-5 h-5 border-t border-r border-[#00A3FF]/0 group-hover:border-[#00A3FF]/60 transition-all duration-500" />
      <div className="absolute bottom-3 left-3 w-5 h-5 border-b border-l border-[#00A3FF]/0 group-hover:border-[#00A3FF]/60 transition-all duration-500" />
      <div className="absolute bottom-3 right-3 w-5 h-5 border-b border-r border-[#00A3FF]/0 group-hover:border-[#00A3FF]/60 transition-all duration-500" />

      {/* Center content */}
      <div className="absolute inset-0 flex flex-col items-center justify-center gap-2">
        <div
          className="display-font text-[#1e1e1e] group-hover:text-[#252525] transition-colors duration-500"
          style={{ fontSize: '4rem', lineHeight: 1 }}
        >
          {String(index).padStart(2, '0')}
        </div>
        <div className="text-[0.55rem] uppercase tracking-[0.4em] text-[#333] group-hover:text-[#00A3FF]/50 transition-colors duration-500">
          {label}
        </div>
      </div>
    </div>
  );
}

export default function Gallery() {
  return (
    <section
      id="gallery"
      className="relative py-28 md:py-40"
      style={{ background: '#0a0a0a' }}
    >
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#00A3FF]/20 to-transparent" />

      <div className="max-w-7xl mx-auto px-6">
        <AnimateIn>
          <div className="mb-16">
            <div className="section-label mb-4">Gallery</div>
            <h2
              className="display-font text-white leading-none"
              style={{ fontSize: 'clamp(3rem, 8vw, 6rem)' }}
            >
              BEHIND<br />
              <span style={{ color: '#00A3FF' }}>THE LENS</span>
            </h2>
          </div>
        </AnimateIn>

        {/* Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
          {photos.map((photo, i) => (
            <AnimateIn key={photo.id} delay={i * 50} className={photo.span}>
              <div className={`w-full ${photo.aspect}`}>
                <PhotoPlaceholder label={photo.label} index={photo.id} />
              </div>
            </AnimateIn>
          ))}
        </div>

        <AnimateIn delay={350}>
          <p className="text-center text-gray-700 text-[0.6rem] uppercase tracking-[0.4em] mt-10">
            Real photos coming soon · Placeholder grid
          </p>
        </AnimateIn>
      </div>

      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#1e1e1e] to-transparent" />
    </section>
  );
}
