import BluetoothIcon from './BluetoothIcon';

export default function Footer() {
  return (
    <footer
      className="relative py-12 border-t border-[#1a1a1a]"
      style={{ background: '#050505' }}
    >
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          {/* Logo + tagline */}
          <div className="flex items-center gap-3">
            <div className="w-5 h-5 text-[#00A3FF]/50">
              <BluetoothIcon />
            </div>
            <span className="display-font text-lg tracking-[0.2em] text-white/40">
              bluetoothboys
            </span>
          </div>

          {/* Tagline */}
          <p className="text-[0.6rem] uppercase tracking-[0.4em] text-gray-700">
            New band. Same frequency.
          </p>

          {/* Right */}
          <p className="text-[0.6rem] uppercase tracking-[0.3em] text-gray-700">
            © {new Date().getFullYear()} bluetoothboys
          </p>
        </div>
      </div>
    </footer>
  );
}
