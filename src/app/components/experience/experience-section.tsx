'use client';

import ContributionGrid from './contribution-grid';
import ExperienceTimeline from './experience-timeline';
import { useGsapReveal } from '../use-gsap-reveal';

export default function ExperienceSection() {
  const ref = useGsapReveal<HTMLElement>('[data-reveal]', {
    stagger: 0.15,
    duration: 1,
    y: 50,
    blur: true,
    start: 'top 82%',
  });

  return (
    <section
      ref={ref}
      className="relative w-full min-h-[500px] md:min-h-[600px] bg-black overflow-hidden"
    >
      <div
        data-reveal
        className="relative z-10 flex items-center w-full h-full min-h-[500px] md:min-h-[600px] px-6 sm:px-8 md:px-10"
      >
        <div className="flex-1 max-w-full md:max-w-2xl">
          <ExperienceTimeline />
        </div>
      </div>

      <div
        data-reveal
        className="hidden md:flex absolute inset-0 z-0 items-center justify-end overflow-hidden"
        style={{ opacity: 0 }}
      >
        <ContributionGrid />
      </div>
    </section>
  );
}