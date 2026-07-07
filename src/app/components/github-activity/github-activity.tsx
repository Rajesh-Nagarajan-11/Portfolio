'use client';

import { useGsapReveal } from '../use-gsap-reveal';

export default function GithubActivity() {
  const revealRef = useGsapReveal<HTMLDivElement>('[data-reveal]', {
    duration: 0.6,
    y: 25,
    blur: true,
    start: 'top 85%',
  });

  return (
    <section className="relative w-full bg-black py-4 md:py-6 overflow-hidden">
      <div
        ref={revealRef}
        className="relative z-10 w-full max-w-7xl mx-auto px-6 sm:px-8 md:px-10 flex items-center justify-center"
      >
        <a
          data-reveal
          href="https://github.com/Rajesh-Nagarajan-11"
          target="_blank"
          rel="noopener noreferrer"
          className="flex flex-col items-center gap-4 md:gap-5 w-full max-w-5xl transition-all duration-300 hover:opacity-90 cursor-pointer group"
        >
          <div className="text-zinc-600 group-hover:text-[#39D353] group-hover:drop-shadow-[0_0_15px_rgba(57,211,83,0.5)] transition-all duration-300">
            <svg
              viewBox="0 0 24 24"
              fill="currentColor"
              className="w-9 h-9 md:w-11 md:h-11"
            >
              <path d="M12 0C5.37 0 0 5.37 0 12c0 5.3 3.438 9.8 8.207 11.387.6.113.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.09-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.108-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.51 11.51 0 0 1 12 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.91 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.63-5.37-12-12-12z" />
            </svg>
          </div>
          <div className="w-full overflow-hidden">
            <img
              src="/github-snake-dark.svg"
              alt="GitHub Contribution Snake"
              className="w-full h-auto select-none"
            />
          </div>
        </a>
      </div>
    </section>
  );
}
