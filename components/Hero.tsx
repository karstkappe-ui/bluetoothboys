'use client';

import { useEffect, useRef, useCallback } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import gsap from 'gsap';
import Image from 'next/image';
import BluetoothIcon from './BluetoothIcon';

// ─── Static data (no Math.random at module scope → no SSR/hydration mismatch) ───

const BT_SYMBOLS = [
  { left: '6%',  top: '11%', size: 54, dur: 5.2, delay: 0,   op: 0.07 },
  { left: '84%', top: '8%',  size: 70, dur: 6.8, delay: 1.9, op: 0.05 },
  { left: '2%',  top: '50%', size: 40, dur: 5.6, delay: 3.4, op: 0.08 },
  { left: '91%', top: '47%', size: 58, dur: 4.4, delay: 2.2, op: 0.06 },
  { left: '13%', top: '79%', size: 32, dur: 7.2, delay: 4.8, op: 0.09 },
  { left: '79%', top: '74%', size: 46, dur: 6.0, delay: 0.9, op: 0.07 },
  { left: '47%', top: '4%',  size: 26, dur: 4.6, delay: 5.8, op: 0.05 },
];

const WAVE_DATA: [number, number][] = [
  [20, 0.82], [58, 1.1], [82, 0.62], [38, 0.95], [68, 1.28], [44, 0.72],
  [92, 0.54], [32, 1.05], [72, 0.84], [52, 1.18], [86, 0.64], [28, 0.92],
  [62, 1.12], [42, 0.74], [78, 1.38], [18, 0.86],
];

// ─── Component ───────────────────────────────────────────────────────────────

export default function Hero() {
  const heroRef   = useRef<HTMLElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  // Mouse parallax motion values
  const mX = useMotionValue(0.5);
  const mY = useMotionValue(0.5);
  const sX = useSpring(mX, { damping: 52, stiffness: 105 });
  const sY = useSpring(mY, { damping: 52, stiffness: 105 });

  const imgX   = useTransform(sX, [0, 1], [-22, 22]);
  const imgY   = useTransform(sY, [0, 1], [-14, 14]);
  const glowX  = useTransform(sX, [0, 1], ['-12%', '12%']);
  const glowY  = useTransform(sY, [0, 1], ['-9%',  '9%']);
  const btX    = useTransform(sX, [0, 1], [-32, 32]);
  const btY    = useTransform(sY, [0, 1], [-22, 22]);

  const onMouseMove = useCallback((e: MouseEvent) => {
    mX.set(e.clientX / window.innerWidth);
    mY.set(e.clientY / window.innerHeight);
  }, [mX, mY]);

  useEffect(() => {
    window.addEventListener('mousemove', onMouseMove, { passive: true });
    return () => window.removeEventListener('mousemove', onMouseMove);
  }, [onMouseMove]);

  // ── Canvas: smoke + dust particles ──────────────────────────────────────
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animId: number;
    let frame  = 0;

    const resize = () => {
      canvas.width  = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener('resize', resize, { passive: true });

    // Smoke
    type SP = { x:number; y:number; r:number; vx:number; vy:number; life:number; max:number; blue:boolean };
    const smoke: SP[] = [];

    const spawnSmoke = () => {
      smoke.push({
        x:    Math.random() * canvas.width,
        y:    canvas.height + 80,
        r:    Math.random() * 100 + 55,
        vx:   (Math.random() - 0.5) * 0.38,
        vy:   -(Math.random() * 0.58 + 0.12),
        life: 0,
        max:  Math.random() * 320 + 180,
        blue: Math.random() > 0.62,
      });
    };

    // Dust — initialised once client-side (no SSR)
    type DP = { x:number; y:number; r:number; vx:number; vy:number; op:number; t:number };
    const dust: DP[] = Array.from({ length: 60 }, () => ({
      x:  Math.random() * canvas.width,
      y:  Math.random() * canvas.height,
      r:  Math.random() * 1.3 + 0.3,
      vx: (Math.random() - 0.5) * 0.28,
      vy: -(Math.random() * 0.13 + 0.04),
      op: Math.random() * 0.45 + 0.12,
      t:  Math.random() * Math.PI * 2,
    }));

    const draw = () => {
      animId = requestAnimationFrame(draw);
      frame++;
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Spawn smoke every ~10 frames
      if (frame % 10 === 0 && smoke.length < 18) spawnSmoke();

      // Draw smoke
      for (let i = smoke.length - 1; i >= 0; i--) {
        const p = smoke[i];
        p.x += p.vx; p.y += p.vy; p.life++;
        const lr = p.life / p.max;
        const a  = lr < 0.2 ? (lr / 0.2) * 0.11
                 : lr > 0.7 ? ((1 - lr) / 0.3) * 0.11
                 : 0.11;
        const g = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, p.r);
        g.addColorStop(0, p.blue ? `rgba(0,90,200,${a})` : `rgba(12,12,22,${a * 0.8})`);
        g.addColorStop(1, 'rgba(0,0,0,0)');
        ctx.fillStyle = g;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fill();
        if (p.life >= p.max) smoke.splice(i, 1);
      }

      // Draw dust
      for (const p of dust) {
        p.x += p.vx; p.y += p.vy; p.t += 0.018;
        if (p.y < -6) p.y = canvas.height + 6;
        if (p.x < -6) p.x = canvas.width  + 6;
        if (p.x > canvas.width  + 6) p.x = -6;
        const flicker = Math.sin(p.t) * 0.28 + 0.72;
        ctx.fillStyle = `rgba(0,163,255,${p.op * flicker * 0.7})`;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fill();
      }
    };

    draw();
    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('resize', resize);
    };
  }, []);

  // ── GSAP cinematic reveal timeline ───────────────────────────────────────
  useEffect(() => {
    if (!heroRef.current) return;

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ delay: 0.1 });

      tl
        // Band photo rises from darkness
        .fromTo('[data-g="image"]',
          { opacity: 0, scale: 1.14 },
          { opacity: 1, scale: 1.07, duration: 2.8, ease: 'power2.out' })

        // Blue glow blooms
        .fromTo('[data-g="glow-wrap"]',
          { opacity: 0 },
          { opacity: 1, duration: 1.8, ease: 'power2.out' }, '-=2.2')

        // Genre tag
        .fromTo('[data-g="tag"]',
          { opacity: 0, y: 22 },
          { opacity: 1, y: 0, duration: 0.9, ease: 'power3.out' }, '-=0.9')

        // "bluetooth" line
        .fromTo('[data-g="title-1"]',
          { opacity: 0, y: 80, skewY: 2 },
          { opacity: 1, y: 0, skewY: 0, duration: 1.5, ease: 'power4.out' }, '-=0.5')

        // "boys" line
        .fromTo('[data-g="title-2"]',
          { opacity: 1, y: 60, skewY: -1 },
          { opacity: 1, y: 0, skewY: 0, duration: 1.3, ease: 'power4.out' }, '-=1.1')

        // Subtitle
        .fromTo('[data-g="sub"]',
          { opacity: 0, y: 30 },
          { opacity: 1, y: 0, duration: 1.0, ease: 'power3.out' }, '-=0.8')

        // CTAs
        .fromTo('[data-g="cta"]',
          { opacity: 0, y: 22 },
          { opacity: 1, y: 0, duration: 0.8, ease: 'power3.out' }, '-=0.7');
    }, heroRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={heroRef}
      id="home"
      className="relative min-h-screen flex flex-col items-center justify-end pb-28 overflow-hidden"
      style={{ background: '#040404' }}
    >

      {/* ── LAYER 1 · Band photo ──────────────────────────────────────── */}
      <div
        data-g="image"
        className="absolute inset-0"
        style={{ opacity: 0 }}
      >
        <motion.div
          className="absolute inset-0"
          style={{ x: imgX, y: imgY, scale: 1.07, willChange: 'transform' }}
        >
          <Image
            src="/single-cover.jpg.png"
            alt="bluetoothboys"
            fill
            priority
            className="object-cover object-center"
            style={{ opacity: 0.52, filter: 'brightness(0.62) saturate(1.5) contrast(1.08)' }}
          />
        </motion.div>
      </div>

      {/* ── LAYER 2 · Cinematic gradient overlays ────────────────────── */}
      {/* top & bottom vignette */}
      <div className="absolute inset-0 pointer-events-none" style={{
        background: 'linear-gradient(to bottom, rgba(4,4,4,0.6) 0%, rgba(4,4,4,0.0) 30%, rgba(4,4,4,0.0) 52%, rgba(4,4,4,0.96) 100%)',
      }} />
      {/* radial side vignette */}
      <div className="absolute inset-0 pointer-events-none" style={{
        background: 'radial-gradient(ellipse 75% 90% at 50% 48%, transparent 32%, rgba(4,4,4,0.72) 100%)',
      }} />

      {/* ── LAYER 3 · Mouse-reactive glow ───────────────────────────── */}
      <div data-g="glow-wrap" style={{ opacity: 0, position: 'absolute', inset: 0, pointerEvents: 'none' }}>
        <motion.div
          className="absolute inset-0"
          style={{ x: glowX, y: glowY, willChange: 'transform' }}
        >
          <div style={{
            position: 'absolute', top: '12%', left: '12%', width: '76%', height: '68%',
            background: 'radial-gradient(ellipse, rgba(0,163,255,0.22) 0%, rgba(0,60,140,0.08) 45%, transparent 70%)',
            filter: 'blur(65px)',
          }} />
          {/* secondary tight glow dead centre */}
          <div style={{
            position: 'absolute', top: '30%', left: '30%', width: '40%', height: '35%',
            background: 'radial-gradient(circle, rgba(0,163,255,0.12) 0%, transparent 60%)',
            filter: 'blur(30px)',
          }} />
        </motion.div>
      </div>

      {/* ── LAYER 4 · Canvas: smoke + floating dust ──────────────────── */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 pointer-events-none"
        style={{ opacity: 0.88 }}
      />

      {/* ── LAYER 5 · Pulsing Bluetooth symbols ──────────────────────── */}
      <motion.div
        className="absolute inset-0 pointer-events-none overflow-hidden"
        style={{ x: btX, y: btY, willChange: 'transform' }}
      >
        {BT_SYMBOLS.map((s, i) => (
          <motion.div
            key={i}
            className="absolute text-[#00A3FF]"
            style={{ left: s.left, top: s.top, width: s.size, height: s.size }}
            animate={{
              opacity: [s.op * 0.25, s.op, s.op * 0.4, s.op * 0.7, s.op * 0.25],
              scale:   [1, 1.1, 1.02, 1.07, 1],
            }}
            transition={{ duration: s.dur, repeat: Infinity, delay: s.delay, ease: 'easeInOut' }}
          >
            <BluetoothIcon />
          </motion.div>
        ))}
      </motion.div>

      {/* ── LAYER 6 · Concert strobe flicker ─────────────────────────── */}
      <motion.div
        className="absolute inset-0 pointer-events-none"
        style={{ background: '#00A3FF' }}
        animate={{ opacity: [0,0,0,0.06,0,0,0.09,0,0.04,0,0.07,0,0,0] }}
        transition={{ duration: 0.65, repeat: Infinity, repeatDelay: 16 }}
      />

      {/* ── LAYER 7 · Scanlines ──────────────────────────────────────── */}
      <div className="absolute inset-0 pointer-events-none" style={{
        backgroundImage: 'repeating-linear-gradient(0deg, transparent, transparent 3px, rgba(0,163,255,0.013) 3px, rgba(0,163,255,0.013) 4px)',
      }} />

      {/* ── LAYER 8 · Audio wave bars ────────────────────────────────── */}
      <div className="absolute bottom-24 left-8 hidden lg:flex items-end gap-[3px] h-14">
        {WAVE_DATA.map(([h, d], i) => (
          <motion.div key={i}
            className="w-[2px] rounded-full bg-[#00A3FF]"
            style={{ transformOrigin: 'bottom', height: '3px', opacity: 0.38 }}
            animate={{ scaleY: [0.4, h / 17, 0.25, h / 30, 0.4] }}
            transition={{ duration: d, repeat: Infinity, delay: i * 0.055, ease: 'easeInOut' }}
          />
        ))}
      </div>
      <div className="absolute bottom-24 right-8 hidden lg:flex items-end gap-[3px] h-14">
        {[...WAVE_DATA].reverse().map(([h, d], i) => (
          <motion.div key={i}
            className="w-[2px] rounded-full bg-[#00A3FF]"
            style={{ transformOrigin: 'bottom', height: '3px', opacity: 0.38 }}
            animate={{ scaleY: [0.3, h / 21, 0.5, h / 38, 0.3] }}
            transition={{ duration: d * 0.88, repeat: Infinity, delay: i * 0.045, ease: 'easeInOut' }}
          />
        ))}
      </div>

      {/* ── LAYER 9 · Text content (GSAP-driven reveal) ──────────────── */}
      <div className="relative z-10 text-center px-6 w-full max-w-5xl mx-auto">

        {/* Genre tag + pulsing BT icon */}
        <div data-g="tag" className="flex items-center justify-center gap-3 mb-8" style={{ opacity: 0 }}>
          {/* Pulsing BT icon with ring */}
          <div className="relative w-5 h-5 mr-1 shrink-0">
            <motion.div
              className="absolute inset-0 rounded-full border border-[#00A3FF]/70"
              animate={{ scale: [1, 2.8], opacity: [0.8, 0] }}
              transition={{ duration: 2.2, repeat: Infinity, ease: 'easeOut', repeatDelay: 1.2 }}
            />
            <motion.div
              className="absolute inset-0 rounded-full border border-[#00A3FF]/40"
              animate={{ scale: [1, 2.0], opacity: [0.5, 0] }}
              transition={{ duration: 2.2, repeat: Infinity, ease: 'easeOut', repeatDelay: 1.2, delay: 0.3 }}
            />
            <div className="w-5 h-5 text-[#00A3FF]"><BluetoothIcon /></div>
          </div>
          <div className="h-px w-8 bg-[#00A3FF]/50" />
          <span className="text-[#00A3FF] text-[0.58rem] uppercase tracking-[0.48em]">
            Electronic · Rock · Pop
          </span>
          <div className="h-px w-8 bg-[#00A3FF]/50" />
        </div>

        {/* Title — two lines animated separately */}
        <div className="overflow-hidden">
          <div data-g="title-1" style={{ opacity: 0 }}>
            <span
              className="display-font block leading-none text-white"
              style={{ fontSize: 'clamp(4.5rem, 13.5vw, 13.5rem)', letterSpacing: '-0.015em' }}
            >
              blue<span style={{ color: '#00A3FF' }}>tooth</span>
            </span>
          </div>
          <div data-g="title-2">
            <span
              className="display-font block leading-none"
              style={{
                fontSize: 'clamp(4.5rem, 13.5vw, 13.5rem)',
                letterSpacing: '-0.015em',
                WebkitTextStroke: '2px rgba(255,255,255,0.48)',
                color: 'transparent',
              }}
            >
              boys
            </span>
          </div>
        </div>

        {/* Subtitle */}
        <p
          data-g="sub"
          className="text-gray-500 text-sm md:text-[0.9rem] uppercase tracking-[0.5em] mt-7"
          style={{ opacity: 0 }}
        >
          New band.&nbsp;&nbsp;&nbsp;Same frequency.
        </p>

        {/* CTA buttons */}
        <div
          data-g="cta"
          className="flex flex-col sm:flex-row items-center justify-center gap-4 mt-11"
          style={{ opacity: 0 }}
        >
          <a
            href="#single"
            className="group relative px-10 py-4 bg-[#00A3FF] text-black text-xs font-bold uppercase tracking-[0.38em] min-w-[210px] text-center overflow-hidden transition-all duration-300 hover:bg-white"
          >
            {/* hover shimmer */}
            <motion.span
              className="absolute inset-0 bg-white/20"
              initial={{ x: '-100%' }}
              whileHover={{ x: '100%' }}
              transition={{ duration: 0.4, ease: 'easeInOut' }}
            />
            <span className="relative z-10">Listen Now</span>
          </a>

          <a
            href="#single"
            className="group relative px-10 py-4 border border-[#00A3FF]/45 text-[#00A3FF] text-xs font-bold uppercase tracking-[0.38em] min-w-[210px] text-center hover:border-[#00A3FF] hover:bg-[#00A3FF]/10 transition-all duration-300"
          >
            Ready to Pair
          </a>
        </div>
      </div>

      {/* ── Scroll indicator ─────────────────────────────────────────── */}
      <motion.div
        className="absolute bottom-7 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 3.5, duration: 1 }}
      >
        <span className="text-[0.52rem] uppercase tracking-[0.45em] text-gray-700">Scroll</span>
        <motion.div
          className="w-px h-9"
          style={{ background: 'linear-gradient(to bottom, rgba(0,163,255,0.55), transparent)' }}
          animate={{ scaleY: [1, 0.3, 1], opacity: [0.55, 1, 0.55] }}
          transition={{ duration: 2.1, repeat: Infinity, ease: 'easeInOut' }}
        />
      </motion.div>

    </section>
  );
}
