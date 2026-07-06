'use client';

import { useState, useEffect } from 'react';
import type { CSSProperties } from 'react';
import { cormorant } from '@/app/fonts';

const techItems = [
  { name: 'React', src: '/react.svg' },
  { name: 'Next.js', src: '/next.svg' },
  { name: 'Gatsby', src: '/Hugo.svg' },
  { name: 'Node.js', src: '/node.svg' },
  { name: 'MongoDB', src: '/mongodb.svg' },
  { name: 'Go', src: '/go.svg' },
  { name: 'AWS', src: '/aws-icon.svg' },
  { name: 'Python', src: '/python.svg' },
  { name: 'Java', src: '/Java.svg' },
  { name: 'Android Studio', src: '/Android.svg' },
  { name: 'Artificial Intelligence', src: '/ai-svgrepo-com.svg' },
  { name: 'GitHub', src: '/GitHubCodespaces.svg' },
  { name: 'Claude AI', src: '/claude-ai-icon.svg' },
  { name: 'Tailwind CSS', src: '/tailwind.svg' },
  { name: 'TypeScript', src: '/Typescript.svg' },
  { name: 'Vite', src: '/vite.svg' },
  { name: 'Supabase', src: '/supabase.svg' },
  { name: 'Postman', src: '/postman.svg' },
];

const allIcons = techItems.map(i => i.src);

const fireflyParticles = [
  { left: '41%', size: '4px', delay: '0s', duration: '4.8s', drift: '-18px' },
  { left: '47%', size: '6px', delay: '-1.1s', duration: '5.6s', drift: '14px' },
  { left: '52%', size: '3px', delay: '-2.4s', duration: '4.4s', drift: '-10px' },
  { left: '58%', size: '5px', delay: '-0.7s', duration: '5.2s', drift: '20px' },
  { left: '38%', size: '3px', delay: '-3.2s', duration: '5.8s', drift: '9px' },
  { left: '62%', size: '4px', delay: '-1.8s', duration: '4.9s', drift: '-16px' },
  { left: '45%', size: '7px', delay: '-3.8s', duration: '6.1s', drift: '24px' },
  { left: '55%', size: '4px', delay: '-2.9s', duration: '5.4s', drift: '-22px' },
  { left: '50%', size: '5px', delay: '-4.5s', duration: '6.4s', drift: '8px' },
  { left: '35%', size: '4px', delay: '-5.2s', duration: '5.7s', drift: '-12px' },
  { left: '65%', size: '3px', delay: '-0.3s', duration: '4.6s', drift: '12px' },
  { left: '43%', size: '5px', delay: '-4.1s', duration: '5.1s', drift: '-26px' },
  { left: '31%', size: '3px', delay: '-1.5s', duration: '6.7s', drift: '18px' },
  { left: '69%', size: '4px', delay: '-2.1s', duration: '5.9s', drift: '-20px' },
  { left: '48%', size: '3px', delay: '-5.7s', duration: '4.7s', drift: '28px' },
  { left: '57%', size: '6px', delay: '-6.4s', duration: '6.2s', drift: '-30px' },
  { left: '39%', size: '5px', delay: '-6.9s', duration: '5.3s', drift: '32px' },
  { left: '60%', size: '3px', delay: '-7.3s', duration: '4.5s', drift: '-8px' },
  { left: '44%', size: '4px', delay: '-7.8s', duration: '6.8s', drift: '-34px' },
  { left: '54%', size: '7px', delay: '-8.5s', duration: '5.6s', drift: '26px' },
  { left: '33%', size: '5px', delay: '-8.9s', duration: '6.4s', drift: '6px' },
  { left: '67%', size: '5px', delay: '-9.4s', duration: '5.1s', drift: '-28px' },
  { left: '50%', size: '3px', delay: '-9.9s', duration: '4.9s', drift: '36px' },
  { left: '46%', size: '6px', delay: '-10.6s', duration: '6s', drift: '-14px' },
];

const PUBLIC_BASE = process.env.NEXT_PUBLIC_BASE_PATH
  ? (process.env.NEXT_PUBLIC_BASE_PATH.startsWith('/')
    ? process.env.NEXT_PUBLIC_BASE_PATH
    : '/' + process.env.NEXT_PUBLIC_BASE_PATH)
  : '';

const resolvePublic = (p: string) => PUBLIC_BASE + (p.startsWith('/') ? p : '/' + p);

export default function TechRadarSection() {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % allIcons.length);
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section
      id='tech-stack'
      className={`relative w-full min-h-screen flex items-center justify-center py-16 px-4 md:px-8 xl:px-16 overflow-hidden bg-black ${cormorant.className}`}
    >
      <div className='relative z-10 w-full max-w-7xl flex flex-col lg:flex-row items-center justify-center gap-12 xl:gap-20'>


        <div className='w-full lg:w-[60%] max-w-3xl rounded-xl border border-zinc-800 bg-black overflow-hidden'>

          <div className='h-10 px-4 flex items-center justify-between bg-[#16171a] border-b border-zinc-800/80 select-none'>
            <div className='flex items-center gap-2'>
              <div className='w-3 h-3 rounded-full bg-[#ff5f56] border border-[#e0443e]' />
              <div className='w-3 h-3 rounded-full bg-[#ffbd2e] border border-[#dfa123]' />
              <div className='w-3 h-3 rounded-full bg-[#27c93f] border border-[#1aab29]' />
            </div>
            <div className='text-zinc-400 text-xs tracking-wide'>
              rajesh@macbook: ~/portfolio
            </div>
            <div className='w-12' />
          </div>

          <div className='p-5 sm:p-6 text-zinc-300 text-base sm:text-lg md:text-xl leading-relaxed'>
            <div className='flex items-center gap-2 text-[#39D353] font-bold mb-4'>
              <span>rajesh@portfolio:~$</span>
              <span className='text-white'>npx view-skills</span>
              <span className='animate-pulse bg-[#39D353] w-2.5 h-4.5 inline-block align-middle'></span>
            </div>

            <div className='grid grid-cols-2 sm:grid-cols-3 gap-3 mt-6'>
              {techItems.map((item, idx) => {
                const isActive = index === idx;
                return (
                  <div
                    key={item.name}
                    onClick={() => setIndex(idx)}
                    className={`flex items-center gap-3 p-3 rounded-lg border transition-all duration-300 cursor-pointer group ${isActive
                      ? 'bg-zinc-900/50 border-[#39D353] text-[#39D353] scale-105'
                      : 'bg-zinc-950/30 border-zinc-800/80 text-zinc-400 hover:border-zinc-700 hover:bg-zinc-900/40 hover:text-white'
                      }`}
                  >
                    <div className={`w-8 h-8 flex-shrink-0 flex items-center justify-center rounded bg-black/60 p-1 border transition-all ${isActive ? 'border-[#39D353]/40' : 'border-zinc-800/80 group-hover:border-zinc-700'
                      }`}>
                      <img
                        src={resolvePublic(item.src)}
                        alt={item.name}
                        className={`w-full h-full object-contain filter transition-transform duration-300 ${isActive
                          ? 'scale-110 drop-shadow-[0_0_8px_rgba(57,211,83,0.4)]'
                          : 'drop-shadow-[0_0_6px_rgba(255,255,255,0.06)]'
                          }`}
                      />
                    </div>
                    <span className={`text-base sm:text-lg md:text-xl tracking-wide transition-colors ${isActive ? 'font-semibold text-emerald-300' : ''
                      }`}>
                      {item.name}
                    </span>
                  </div>
                );
              })}
            </div>

            <div className='mt-8 text-zinc-500 text-base sm:text-lg md:text-xl flex items-center gap-2'>
              <span>rajesh@portfolio:~$</span>
              <span className='animate-pulse bg-[#39D353] w-2.5 h-4.5 inline-block align-middle'></span>
            </div>
          </div>
        </div>

        <div className='relative flex-shrink-0 flex items-center justify-center select-none pointer-events-none'>
          <div
            aria-hidden='true'
            className='absolute inset-x-[-18%] top-[10%] bottom-[34%] z-0 overflow-visible'
          >
            <div className='absolute bottom-[18%] left-1/2 h-40 w-52 -translate-x-1/2 rounded-full bg-emerald-400/25 blur-3xl' />
            <div className='absolute bottom-[28%] left-1/2 h-56 w-36 -translate-x-1/2 rounded-full bg-lime-300/12 blur-2xl' />
            {fireflyParticles.map((particle, particleIndex) => (
              <span
                key={`${particle.left}-${particleIndex}`}
                className='ben-firefly absolute bottom-[20%] rounded-full bg-lime-200 shadow-[0_0_12px_rgba(217,249,157,1),0_0_28px_rgba(16,185,129,0.85),0_0_46px_rgba(132,204,22,0.35)]'
                style={{
                  left: particle.left,
                  width: particle.size,
                  height: particle.size,
                  animationDelay: particle.delay,
                  animationDuration: particle.duration,
                  '--drift': particle.drift,
                } as CSSProperties}
              />
            ))}
          </div>

          <img
            src={resolvePublic('/Ben10-removebg.png')}
            alt='Ben 10'
            className='relative z-10 h-[40vh] md:h-[55vh] lg:h-[75vh] w-auto object-contain display:block'
          />

          <img
            src={resolvePublic(allIcons[index])}
            alt='Cycling Tech Icon'
            className='absolute w-[48px] h-[48px] md:w-[62px] md:h-[62px] lg:w-[76px] lg:h-[76px] object-contain z-10 transition-all duration-300'
            style={{
              top: '60%',
              left: '48.5%',
              transform: 'translateX(-50%)',
            }}
          />
        </div>

      </div>
    </section>
  );
}
