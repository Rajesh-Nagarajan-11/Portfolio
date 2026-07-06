'use client';

import { useEffect, useRef, useCallback } from 'react';
import { cormorant, jetbrains, libreBaskerville, merryWeather } from '@/app/fonts';
import { useGsapReveal } from '../use-gsap-reveal';

/* ─── types ─────────────────────────────────────────────────────────────── */
interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  radius: number;
  alpha: number;
  decay: number;
  hue: number; // slight hue shift around green
}

/* ─── data ───────────────────────────────────────────────────────────────── */
const SOCIALS = [
  {
    id: 'contact-github',
    label: 'GitHub',
    href: 'https://github.com/Rajesh-Nagarajan-11',
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="w-8 h-8">
        <path d="M12 0C5.37 0 0 5.37 0 12c0 5.3 3.438 9.8 8.207 11.387.6.113.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.09-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.108-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.51 11.51 0 0 1 12 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.91 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.63-5.37-12-12-12z" />
      </svg>
    ),
  },
  {
    id: 'contact-linkedin',
    label: 'LinkedIn',
    href: 'https://www.linkedin.com/in/rajesh-nagarajan-51098a245/',
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="w-8 h-8">
        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
      </svg>
    ),
  },
  {
    id: 'contact-twitter',
    label: 'Twitter / X',
    href: 'https://x.com/rajesh_wtf',
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="w-8 h-8">
        <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
      </svg>
    ),
  },
  {
    id: 'contact-instagram',
    label: 'Instagram',
    href: 'https://www.instagram.com/_rajesh.nagarajan_/',
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="w-8 h-8">
        <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 1 0 0 12.324 6.162 6.162 0 0 0 0-12.324zM12 16a4 4 0 1 1 0-8 4 4 0 0 1 0 8zm6.406-11.845a1.44 1.44 0 1 0 0 2.881 1.44 1.44 0 0 0 0-2.881z" />
      </svg>
    ),
  },
  {
    id: 'contact-email',
    label: 'Email',
    href: 'mailto:rajeshnagarajan36@gmail.com',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.7} className="w-8 h-8">
        <path strokeLinecap="round" strokeLinejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
      </svg>
    ),
  },
];

const TAGS = [
  { id: 'tag-freelance', label: 'Available for Freelance Work' },
  { id: 'tag-collab', label: 'Open to Building Real-World Projects' },
  { id: 'tag-opensource', label: 'Passionate Open Source Contributor' },
];

/* ─── splash canvas ──────────────────────────────────────────────────────── */
function SplashCanvas({ sectionRef }: { sectionRef: React.RefObject<HTMLElement | null> }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const particles = useRef<Particle[]>([]);
  const animId = useRef<number>(0);
  const lastPos = useRef<{ x: number; y: number } | null>(null);

  const spawnParticles = useCallback((x: number, y: number, dx: number, dy: number) => {
    const speed = Math.sqrt(dx * dx + dy * dy);
    const count = Math.min(Math.floor(speed * 0.4) + 1, 8);
    for (let i = 0; i < count; i++) {
      const angle = Math.random() * Math.PI * 2;
      const mag = (Math.random() * 1.8 + 0.4) * (1 + speed * 0.04);
      particles.current.push({
        x,
        y,
        vx: Math.cos(angle) * mag + dx * 0.08,
        vy: Math.sin(angle) * mag + dy * 0.08,
        radius: Math.random() * 3.5 + 1.2,
        alpha: Math.random() * 0.6 + 0.4,
        decay: Math.random() * 0.018 + 0.012,
        hue: Math.random() * 30 - 15, // ±15° around green (120°)
      });
    }
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    const section = sectionRef.current;
    if (!canvas || !section) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const resize = () => {
      canvas.width = section.offsetWidth;
      canvas.height = section.offsetHeight;
    };
    resize();
    const ro = new ResizeObserver(resize);
    ro.observe(section);

    const onMove = (e: MouseEvent) => {
      const rect = section.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      if (lastPos.current) {
        const dx = x - lastPos.current.x;
        const dy = y - lastPos.current.y;
        spawnParticles(x, y, dx, dy);
      }
      lastPos.current = { x, y };
    };
    section.addEventListener('mousemove', onMove);

    const draw = () => {
      animId.current = requestAnimationFrame(draw);
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      particles.current = particles.current.filter((p) => p.alpha > 0.01);

      for (const p of particles.current) {
        // radial gradient per particle — soft green glow blob
        const grd = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, p.radius * 3);
        grd.addColorStop(0, `hsla(${120 + p.hue}, 85%, 55%, ${p.alpha})`);
        grd.addColorStop(0.5, `hsla(${120 + p.hue}, 80%, 45%, ${p.alpha * 0.5})`);
        grd.addColorStop(1, `hsla(${120 + p.hue}, 70%, 40%, 0)`);

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius * 3, 0, Math.PI * 2);
        ctx.fillStyle = grd;
        ctx.fill();

        // solid core dot
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius * 0.55, 0, Math.PI * 2);
        ctx.fillStyle = `hsla(${120 + p.hue}, 90%, 70%, ${p.alpha * 0.9})`;
        ctx.fill();

        p.x += p.vx;
        p.y += p.vy;
        p.vy += 0.06; // gentle gravity
        p.vx *= 0.96;
        p.vy *= 0.96;
        p.alpha -= p.decay;
        p.radius *= 0.985;
      }
    };
    draw();

    return () => {
      cancelAnimationFrame(animId.current);
      section.removeEventListener('mousemove', onMove);
      ro.disconnect();
    };
  }, [sectionRef, spawnParticles]);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 z-[1] pointer-events-none"
      style={{ mixBlendMode: 'screen' }}
    />
  );
}

/* ─── main component ─────────────────────────────────────────────────────── */
export default function Footer() {
  const sectionRef = useRef<HTMLElement>(null);

  /* GSAP stagger reveals */
  const headingGroupRef = useGsapReveal<HTMLDivElement>('[data-h]', {
    stagger: 0.14,
    duration: 1,
    y: 35,
    blur: true,
    start: 'top 88%',
  });
  const tagsRef = useGsapReveal<HTMLDivElement>('[data-tag]', {
    stagger: 0.1,
    duration: 0.8,
    y: 25,
    start: 'top 88%',
  });
  const socialsRef = useGsapReveal<HTMLDivElement>('[data-social]', {
    stagger: 0.08,
    duration: 0.75,
    y: 30,
    blur: true,
    start: 'top 90%',
  });

  return (
    <section
      id="contact"
      ref={sectionRef}
      className={`relative w-full bg-black flex flex-col items-center justify-center pt-14 pb-10 px-6 overflow-hidden ${cormorant.className}`}
    >
      {/* splash canvas */}
      <SplashCanvas sectionRef={sectionRef} />

      {/* ── ambient green glow orb ────────────────────────────────────────── */}
      <div
        aria-hidden="true"
        className="absolute bottom-[-120px] left-1/2 -translate-x-1/2 w-[600px] h-[300px] rounded-full blur-[120px] pointer-events-none z-0"
        style={{ background: 'radial-gradient(ellipse, rgba(57,211,83,0.12) 0%, transparent 70%)' }}
      />

      {/* ── heading ──────────────────────────────────────────────────────── */}
      <div ref={headingGroupRef} className="relative z-10 flex flex-col items-center gap-5 text-center mb-14">
        <span data-h className={`${jetbrains.className} text-[10px] tracking-[0.4em] uppercase text-[#39D353] opacity-70`}>
          Say Hello
        </span>

        <h2 data-h className="text-white text-5xl sm:text-6xl md:text-7xl font-light tracking-tight">
          Let&apos;s Connect
        </h2>

        <span data-h className="block h-[2px] w-10 bg-[#39D353] shadow-[0_0_12px_#39D353]" />

        <p data-h className={`${merryWeather.className} text-zinc-500 text-sm sm:text-base font-light max-w-md leading-relaxed mt-1`}>
          Always open to interesting conversations, collaborations and new ideas.
        </p>
      </div>

      {/* ── availability tags ─────────────────────────────────────────────── */}
      <div ref={tagsRef} className="relative z-10 flex flex-wrap items-center justify-center gap-3 mb-16">
        {TAGS.map((tag) => (
          <span
            data-tag
            key={tag.id}
            id={tag.id}
            className={`${merryWeather.className} inline-flex items-center gap-2 text-[10px] tracking-[0.25em] uppercase text-zinc-400 border border-zinc-800 rounded-full px-4 py-1.5 bg-zinc-950/60`}
          >
            <span className="w-1.5 h-1.5 rounded-full bg-[#39D353] shadow-[0_0_6px_#39D353]" />
            {tag.label}
          </span>
        ))}
      </div>

      {/* ── social logo icons ─────────────────────────────────────────────── */}
      <div ref={socialsRef} className="relative z-10 flex flex-wrap items-center justify-center gap-6 sm:gap-8">
        {SOCIALS.map((s) => (
          <a
            data-social
            key={s.id}
            id={s.id}
            href={s.href || '#'}
            aria-label={s.label}
            target={s.href.startsWith('http') ? '_blank' : undefined}
            rel="noopener noreferrer"
            className="group flex flex-col items-center gap-3"
          >
            <div className="
              w-16 h-16 rounded-2xl
              flex items-center justify-center
              border border-zinc-800/80 bg-zinc-950/60
              text-zinc-500
              group-hover:text-[#39D353]
              group-hover:border-[#39D353]/50
              group-hover:bg-[#39D353]/[0.06]
              group-hover:shadow-[0_0_24px_rgba(57,211,83,0.22),0_0_6px_rgba(57,211,83,0.12)_inset]
              group-hover:-translate-y-1
              transition-all duration-300 ease-out
            ">
              {s.icon}
            </div>
            <span className={`${libreBaskerville.className} text-[10px] tracking-widest uppercase text-zinc-700 group-hover:text-[#39D353]/80 transition-colors duration-300`}>
              {s.label}
            </span>
          </a>
        ))}
      </div>
    </section>
  );
}
