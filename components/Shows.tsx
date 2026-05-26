import AnimateIn from './AnimateIn';

const shows = [
  {
    date: '12 JUN',
    day: 'FRI',
    year: '2026',
    venue: 'Ekko',
    city: 'Utrecht, NL',
    tickets: '#',
    status: 'available',
  },
  {
    date: '27 JUN',
    day: 'SAT',
    year: '2026',
    venue: 'Paradiso',
    city: 'Amsterdam, NL',
    tickets: '#',
    status: 'available',
  },
  {
    date: '04 JUL',
    day: 'SAT',
    year: '2026',
    venue: 'Tivoli Redd',
    city: 'Utrecht, NL',
    tickets: '#',
    status: 'available',
  },
  {
    date: '16 JUL',
    day: 'THU',
    year: '2026',
    venue: 'Shelter',
    city: 'Amsterdam, NL',
    tickets: '#',
    status: 'sold-out',
  },
  {
    date: '07 AUG',
    day: 'FRI',
    year: '2026',
    venue: 'Melkweg',
    city: 'Amsterdam, NL',
    tickets: '#',
    status: 'available',
  },
];

export default function Shows() {
  return (
    <section
      id="shows"
      className="relative py-28 md:py-40"
      style={{ background: '#080808' }}
    >
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#1e1e1e] to-transparent" />

      <div className="max-w-7xl mx-auto px-6">
        <AnimateIn>
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-16">
            <div>
              <div className="section-label mb-4">Tour 2026</div>
              <h2
                className="display-font text-white leading-none"
                style={{ fontSize: 'clamp(3rem, 8vw, 6rem)' }}
              >
                UPCOMING<br />
                <span style={{ color: '#00A3FF' }}>SHOWS</span>
              </h2>
            </div>
            <p className="text-gray-600 text-xs uppercase tracking-[0.3em] max-w-xs">
              Catch us live — before we outgrow the venues.
            </p>
          </div>
        </AnimateIn>

        {/* Show list */}
        <div className="divide-y divide-[#1a1a1a]">
          {shows.map((show, i) => (
            <AnimateIn key={i} delay={i * 60}>
              <div
                className="group flex flex-col sm:flex-row sm:items-center justify-between gap-4 py-6 hover:bg-[#0d0d0d] transition-colors duration-300 px-0 sm:px-2 -mx-0 sm:-mx-2 rounded"
              >
                {/* Date */}
                <div className="flex items-center gap-6">
                  <div className="w-16 text-center shrink-0">
                    <div
                      className="display-font text-[#00A3FF] leading-none"
                      style={{ fontSize: '1.9rem' }}
                    >
                      {show.date.split(' ')[0]}
                    </div>
                    <div className="text-gray-600 text-[0.6rem] uppercase tracking-[0.3em]">
                      {show.date.split(' ')[1]}
                    </div>
                  </div>

                  {/* Divider */}
                  <div className="w-px h-10 bg-[#1e1e1e] shrink-0 hidden sm:block" />

                  {/* Venue */}
                  <div>
                    <div className="text-white text-sm font-medium tracking-wide">{show.venue}</div>
                    <div className="text-gray-600 text-xs mt-0.5 tracking-wider">{show.city}</div>
                  </div>
                </div>

                {/* Right: day + status + ticket */}
                <div className="flex items-center gap-4 sm:gap-6">
                  <div className="text-gray-700 text-[0.6rem] uppercase tracking-[0.3em]">
                    {show.day} · {show.year}
                  </div>
                  {show.status === 'sold-out' ? (
                    <span className="px-3 py-1 text-[0.6rem] uppercase tracking-[0.3em] text-gray-600 border border-gray-800">
                      Sold out
                    </span>
                  ) : (
                    <a
                      href={show.tickets}
                      className="px-4 py-2 border border-white/20 text-white text-[0.6rem] uppercase tracking-[0.3em] hover:border-[#00A3FF] hover:text-[#00A3FF] transition-all duration-300"
                    >
                      Tickets →
                    </a>
                  )}
                </div>
              </div>
            </AnimateIn>
          ))}
        </div>

        {/* More shows line */}
        <AnimateIn delay={400}>
          <div className="mt-14 flex items-center gap-4">
            <div className="h-px flex-1 bg-[#1a1a1a]" />
            <span className="text-gray-700 text-[0.6rem] uppercase tracking-[0.35em]">
              More dates coming soon
            </span>
            <div className="h-px flex-1 bg-[#1a1a1a]" />
          </div>
        </AnimateIn>
      </div>

      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#1e1e1e] to-transparent" />
    </section>
  );
}
