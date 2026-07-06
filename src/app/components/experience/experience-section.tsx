import ContributionGrid from './contribution-grid';
import ExperienceTimeline from './experience-timeline';

export default function ExperienceSection() {
  return (
    <section className="relative w-full min-h-[500px] md:min-h-[600px] bg-black overflow-hidden">
      <div className="relative z-10 flex items-center w-full h-full min-h-[500px] md:min-h-[600px] px-6 sm:px-8 md:px-10">
        <div className="flex-1 max-w-full md:max-w-2xl">
          <ExperienceTimeline />
        </div>
      </div>

      <div className="hidden md:flex absolute inset-0 z-0 items-center justify-end overflow-hidden">
        <ContributionGrid />
      </div>
    </section>
  );
}