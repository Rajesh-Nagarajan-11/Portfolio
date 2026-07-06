'use client';

import { cormorant, libreBaskerville, jetbrains, merryWeather } from '@/app/fonts';

interface Project {
  title: string;
  subtitle: string;
  description: string;
  tech: string[];
  github: string;
}

const PROJECTS: Project[] = [
  {
    title: 'CheckMate',
    subtitle: 'IoT Smart Assistant',
    description: 'A real-time IoT-powered smart assistant designed to enhance operator safety and productivity in heavy vehicles. Won the CAT Hackathon 2025 for its innovative approach to industrial vehicle monitoring.',
    tech: ['React.js', 'Node.js', 'Express.js', 'MongoDB', 'IoT', 'AI/ML', 'Python'],
    github: 'https://github.com/Rajesh-Nagarajan-11/CheckMate'
  },
  {
    title: 'SkillSense.AI',
    subtitle: 'AI Learning Tracker',
    description: 'A web-based application and a browser extension that track learning and general browser activity across YouTube, LeetCode, GeeksforGeeks, GitHub, and other educational sites, converting collected activities into SWOT analyses and providing actionable, multi-faceted insights to help learners improve their skills and learning strategies.',
    tech: ['Spring Boot', 'SQL', 'React.js', 'Manifest v3'],
    github: 'https://github.com/Rajesh-Nagarajan-11/SkillSense'
  },
  {
    title: 'CodeAlly',
    subtitle: 'DSA & AI Practice Hub',
    description: 'A comprehensive platform for programmers, integrating practice, progress tracking, and DSA prep. Integrated with LeetCode, GeeksforGeeks, and Codeforces for activity analysis and personalized upskilling recommendations. Features performance dashboards and AI tools for code optimization and complexity feedback.',
    tech: ['React.js', 'Node.js', 'Express.js', 'MongoDB', 'Open-source API'],
    github: 'https://github.com/Rajesh-Nagarajan-11/CodeAlly.inc'
  },
  {
    title: 'EAD-DAWMS',
    subtitle: 'IT Asset Management',
    description: 'An IT Asset Warranty Management System helping organizations track hardware warranties. Offers asset registration, automated warranty alerts, and reporting to minimize downtime and costs.',
    tech: ['Node.js', 'React.js', 'Express.js', 'Supabase'],
    github: 'https://github.com/Rajesh-Nagarajan-11/EAD-DAWMS'
  }
];

export default function ProjectsSection() {
  return (
    <>
      <section className="relative w-full bg-black py-20 md:py-28 overflow-hidden">
      <div className="relative z-10 w-full max-w-7xl mx-auto px-6 sm:px-8 md:px-10">
        {/* Centered Section Heading */}
        <div className="flex flex-col items-center justify-center mb-16 md:mb-20">
          <h2 className={`${cormorant.className} text-white text-4xl sm:text-5xl md:text-6xl font-medium tracking-tight text-center`}>
            Projects
          </h2>
          <span className="block h-[2px] w-12 bg-[#39D353] mt-4 shadow-[0_0_10px_#39D353]" />
        </div>

        {/* 4 Interactive Glassmorphic Project Cards with Glow and Tech Stack */}
        <style>{`
          @keyframes crown-bob {0%{transform:translateY(0)}50%{transform:translateY(-6px)}100%{transform:translateY(0)}}
          @keyframes crown-glow {0%{filter:drop-shadow(0 0 0 rgba(57,211,83,0))}100%{filter:drop-shadow(0 8px 26px rgba(57,211,83,0.16))}}
          .crown-anim { animation: crown-bob 3s ease-in-out infinite, crown-glow 2.5s ease-in-out infinite alternate; }
        `}</style>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 w-full">
          {PROJECTS.map((project) => (
            <div
              key={project.title}
              className="relative flex flex-col justify-between w-full rounded-2xl border border-zinc-800/80 bg-zinc-950/20 backdrop-blur-md p-6 md:p-8 hover:-translate-y-1.5 hover:border-[#39D353]/45 hover:bg-zinc-900/10 hover:shadow-[0_12px_40px_rgba(57,211,83,0.12)] group overflow-hidden transition-all duration-500 ease-out min-h-[380px] sm:min-h-[400px] md:min-h-[420px] lg:min-h-[440px]"
            >
              <div className="relative z-10 flex-grow flex flex-col justify-start">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-3">
                    {project.title === 'CheckMate' && (
                      <svg
                        aria-hidden="true"
                        className="w-6 h-6 text-[#39D353] crown-anim"
                        viewBox="0 0 24 24"
                        fill="currentColor"
                      >
                        <path d="M12 3l2.2 4.9L19 8l-3.6 3L17 18l-5-3-5 3 1.6-7L5 8l4.8-.1L12 3z" />
                      </svg>
                    )}
                    <h3 className={`${cormorant.className} text-white text-2xl md:text-3xl font-medium tracking-tight group-hover:text-[#39D353] transition-colors duration-300`}>
                      {project.title}
                    </h3>
                  </div>
                  <a
                    href={project.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group/github"
                  >
                    <svg
                      className="w-5 h-5 md:w-6 md:h-6 text-zinc-500 group-hover/github:text-[#39D353] transition-colors duration-300"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v 3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                    </svg>
                  </a>
                </div>
                <p className={`${libreBaskerville.className} text-xs font-light text-zinc-500 italic mt-1 group-hover:text-emerald-400/80 transition-colors duration-300`}>
                  {project.subtitle}
                </p>
                <p className={`${merryWeather.className} text-xs md:text-sm text-zinc-400 mt-4 leading-relaxed font-light`}>
                  {project.description}
                </p>
              </div>

              {/* Tech Stack Badges */}
              <div className="relative z-10 flex flex-wrap gap-1.5 mt-6 pt-4 border-t border-zinc-900/80 group-hover:border-[#39D353]/10 transition-colors duration-500">
                {project.tech.map((techItem) => (
                  <span
                    key={techItem}
                    className={`${libreBaskerville.className} text-xs tracking-wider text-zinc-500 bg-zinc-900/30 border border-zinc-900 px-2 py-0.5 rounded transition-all duration-300 group-hover:border-[#39D353]/25 group-hover:text-[#39D353]/90`}
                  >
                    {techItem}
                  </span>
                ))}
              </div>

              {/* Ambient inner radial glow on hover */}
              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none bg-[radial-gradient(circle_at_center,rgba(57,211,83,0.06)_0%,transparent_70%)]" />

              {/* Bottom line scanning light beam effect on hover */}
              <div className="absolute bottom-0 left-0 w-full h-[1.5px] bg-gradient-to-r from-transparent via-[#39D353]/40 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000 ease-out" />
            </div>
          ))}
        </div>
      </div>
    </section>
    </>
  );
}
