'use client';

import React from 'react';
import { cormorant, libreBaskerville, jetbrains } from '@/app/fonts';
import { useGsapReveal } from '../use-gsap-reveal';

interface ExperienceItem {
  role: string;
  org: string;
  location: string;
  period: string;
}

const EXPERIENCE: ExperienceItem[] = [
  {
    role: 'LFX Mentee',
    org: 'The Linux Foundation',
    location: 'Remote',
    period: 'March 2026 – May 2026',
  },
  {
    role: 'Open Source Maintainer',
    org: 'Layer5',
    location: 'Remote (Texas, USA)',
    period: 'October 2025 – May 2026',
  },
];

export default function ExperienceTimeline() {
  const ref = useGsapReveal<HTMLDivElement>('[data-item]', {
    stagger: 0.2,
    duration: 1.1,
    y: 60,
    blur: true,
    start: 'top 80%',
  });

  return (
    <div ref={ref} className="flex flex-col gap-12 sm:gap-16 md:gap-20 pl-2">
      {EXPERIENCE.map((item, idx) => (
        <div key={idx} data-item className="relative pl-6 sm:pl-8 md:pl-10">
          {idx !== EXPERIENCE.length - 1 && (
            <span className="absolute left-[5px] sm:left-[6px] md:left-[7px] top-4 md:top-5 h-[calc(100%+3rem)] sm:h-[calc(100%+4rem)] md:h-[calc(100%+5rem)] w-[2px] bg-[#1b3a2a]" />
          )}
          <span className="absolute left-0 top-2 md:top-2.5 h-3 w-3 md:h-4 md:w-4 rounded-full bg-[#39D353] shadow-[0_0_14px_#39D353]" />

          <h3 className={`${cormorant.className} text-white text-3xl sm:text-4xl md:text-5xl font-medium tracking-tight leading-tight`}>
            {item.role}
          </h3>
          <p className={`${libreBaskerville.className} text-xs sm:text-sm md:text-lg lg:text-xl mt-2 md:mt-1 text-[#39D353] font-light uppercase tracking-[0.15em] sm:tracking-[0.2em] md:tracking-[0.28em] break-words`}>
            {item.org} · {item.location}
          </p>
          <p className={`${jetbrains.className} text-gray-500 text-xs sm:text-sm md:text-base lg:text-lg mt-2 md:mt-1 tracking-wide`}>
            {item.period}
          </p>
        </div>
      ))}
    </div>
  );
}