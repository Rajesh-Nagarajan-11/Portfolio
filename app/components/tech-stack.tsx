'use client';

import { useState, useEffect } from 'react';

const techItems = [
  { name: 'React', src: '/techstack/React.svg' },
  { name: 'Next.js', src: '/techstack/Next.js.svg' },
  { name: 'Node.js', src: '/techstack/Node.js.svg' },
  { name: 'MongoDB', src: '/techstack/MongoDB.svg' },
  { name: 'Go', src: '/techstack/Go.svg' },
  { name: 'AWS', src: '/techstack/AWS.svg' },
  { name: 'Python', src: '/techstack/Python.svg' },
  { name: 'scikit-learn', src: '/techstack/scikit-learn.svg' },
  { name: 'Java', src: '/techstack/Java.svg' },
  { name: 'Android Studio', src: '/techstack/AndroidStudio.svg' },
  { name: 'GitHub', src: '/techstack/GitHubCodespaces.svg' },
  { name: 'Ubuntu', src: '/techstack/Ubuntu.svg' },
  { name: 'TypeScript', src: '/techstack/TypeScript.svg' },
  { name: 'JavaScript', src: '/techstack/JavaScript.svg' },
];

const allIcons = techItems.map(i => i.src);

// Resolve public asset path when deploying with a `basePath` (e.g. GitHub Pages)
const PUBLIC_BASE = process.env.NEXT_PUBLIC_BASE_PATH
  ? (process.env.NEXT_PUBLIC_BASE_PATH.startsWith('/')
      ? process.env.NEXT_PUBLIC_BASE_PATH
      : '/' + process.env.NEXT_PUBLIC_BASE_PATH)
  : '';

const resolvePublic = (p: string) => PUBLIC_BASE + (p.startsWith('/') ? p : '/' + p);

export default function TechStack() {
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
      className='relative w-full min-h-screen flex items-center justify-center py-16 px-4 md:px-8 xl:px-16 overflow-hidden bg-black'
    >
      <div className='relative z-10 w-full max-w-7xl flex flex-col lg:flex-row items-center justify-center gap-12 xl:gap-20'>

        {/* Left Side: Apple Terminal Window */}
        <div className='w-full lg:w-[60%] max-w-3xl rounded-xl border border-zinc-800 bg-zinc-950/80 backdrop-blur-md shadow-2xl overflow-hidden font-mono'>
          {/* macOS Title Bar */}
          <div className='h-10 px-4 flex items-center justify-between bg-zinc-900/90 border-b border-zinc-800/80 select-none'>
            <div className='flex items-center gap-2'>
              <div className='w-3 h-3 rounded-full bg-[#ff5f56] border border-[#e0443e]' />
              <div className='w-3 h-3 rounded-full bg-[#ffbd2e] border border-[#dfa123]' />
              <div className='w-3 h-3 rounded-full bg-[#27c93f] border border-[#1aab29]' />
            </div>
            <div className='text-zinc-400 text-xs font-sans tracking-wide'>
              rajesh@macbook: ~/portfolio
            </div>
            <div className='w-12' /> {/* spacer to balance the flex layout */}
          </div>

          {/* Terminal Console Body */}
          <div className='p-5 sm:p-6 text-zinc-300 text-sm sm:text-base leading-relaxed'>
            <div className='flex items-center gap-2 text-zinc-500 text-xs sm:text-sm mb-2'>
              Last login: {new Date().toDateString()} on ttys001
            </div>

            <div className='flex items-center gap-2 text-emerald-400 font-bold mb-4'>
              <span>rajesh@portfolio:~$</span>
              <span className='text-white'>npx view-skills</span>
              <span className='animate-pulse bg-emerald-500 w-2 h-4 inline-block align-middle'></span>
            </div>

            {/* Grid of Tech Stacks inside Terminal */}
            <div className='grid grid-cols-2 sm:grid-cols-3 gap-3 mt-6'>
              {techItems.map((item, idx) => {
                const isActive = index === idx;
                return (
                  <div
                    key={item.name}
                    onClick={() => setIndex(idx)}
                    className={`flex items-center gap-3 p-3 rounded-lg border transition-all duration-300 cursor-pointer ${isActive
                        ? 'bg-emerald-950/40 border-emerald-500/60 text-emerald-400 shadow-[0_0_15px_rgba(16,185,129,0.15)] scale-105'
                        : 'bg-zinc-900/30 border-zinc-800/60 text-zinc-400 hover:border-zinc-700 hover:bg-zinc-900/50 hover:text-zinc-200'
                      }`}
                  >
                    <div className={`w-8 h-8 flex-shrink-0 flex items-center justify-center rounded bg-black/40 p-1 border transition-all ${isActive ? 'border-emerald-500/40' : 'border-zinc-800/40 group-hover:border-zinc-700'
                      }`}>
                      <img
                        src={resolvePublic(item.src)}
                        alt={item.name}
                        className={`w-full h-full object-contain filter transition-transform duration-300 ${isActive
                            ? 'scale-110 drop-shadow-[0_0_8px_rgba(16,185,129,0.4)]'
                            : 'drop-shadow-[0_0_6px_rgba(255,255,255,0.06)]'
                          }`}
                      />
                    </div>
                    <span className={`text-xs sm:text-sm tracking-wide transition-colors ${isActive ? 'font-semibold text-emerald-300' : ''
                      }`}>
                      {item.name}
                    </span>
                  </div>
                );
              })}
            </div>

            <div className='mt-6 text-zinc-500 text-xs sm:text-sm flex items-center gap-2'>
              <span>rajesh@portfolio:~$</span>
              <span className='animate-pulse bg-emerald-500 w-2 h-4 inline-block align-middle'></span>
            </div>
          </div>
        </div>

        {/* Right Side: Ben 10 Image + Cycling Tech icon with neon shape glow */}
        <div className='relative flex-shrink-0 flex items-center justify-center select-none pointer-events-none'>
          <img
            src={resolvePublic('/Ben10-removebg.png')}
            alt='Ben 10'
            className='h-[40vh] md:h-[55vh] lg:h-[75vh] w-auto object-contain display:block'
          />

          <img
            src={resolvePublic(allIcons[index])}
            alt='Cycling Tech Icon'
            className='absolute w-[55px] h-[55px] md:w-[70px] md:h-[70px] lg:w-[85px] lg:h-[85px] object-contain z-10 transition-all duration-300'
            style={{
              top: '60%',
              left: '48.5%',
              transform: 'translateX(-50%)',
              filter: 'drop-shadow(0 0 15px rgba(16, 185, 129, 0.95)) drop-shadow(0 0 4px rgba(16, 185, 129, 0.6))',
            }}
          />
        </div>

      </div>
    </section>
  );
}