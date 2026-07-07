import ExperienceSection from './components/experience/experience-section';
import Hero from './components/hero/hero';
import ProjectsSection from './components/projects/projects-section';
import TechRadarSection from './components/tech-radar/tech-radar-section';
import GithubActivity from './components/github-activity';
import Footer from './components/footer/footer';

export default function Home() {
  return (
    <div>
      <Hero />
      <ExperienceSection />
      <TechRadarSection />
      <ProjectsSection />
      <GithubActivity />
      <Footer />
    </div>
  );
}
