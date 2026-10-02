import { lazy, Suspense, useState } from 'react';
import InteractiveSystem from '../components/InteractiveSystem';
import LumoraDiagram from '../components/LumoraDiagram';
import ProjectCard from '../components/ProjectCard';
import ProjectModal from '../components/ProjectModal';
import SectionHeader from '../components/SectionHeader';
import VisibilityMount from '../components/VisibilityMount';
import { projects, type Project } from '../data/projects';
import { usePrefersReducedMotion } from '../hooks/usePrefersReducedMotion';

const Waves = lazy(() => import('../react-bits/Waves'));

export default function Projects() {
  const [active, setActive] = useState<Project | null>(null);
  const featured = projects.find((p) => p.featured);
  const rest = projects.filter((p) => !p.featured);
  const reduced = usePrefersReducedMotion();

  return (
    <section id="projects" className="section section--projects">
      <div className="projects-bg" aria-hidden="true">
        {!reduced ? (
          <VisibilityMount className="projects-bg__fx">
            <Suspense fallback={null}>
              <Waves
                lineColor="rgba(255, 133, 173, 0.6)"
                backgroundColor="transparent"
                waveSpeedX={0.022}
                waveSpeedY={0.011}
                waveAmpX={54}
                waveAmpY={30}
                xGap={11}
                yGap={26}
                friction={0.91}
                tension={0.009}
                maxCursorMove={180}
              />
            </Suspense>
          </VisibilityMount>
        ) : null}
      </div>
      <div className="section__accent section__accent--pink" aria-hidden="true" />
      <div className="container">
        <SectionHeader
          kicker="03 — Systems"
          title="Featured projects"
          copy="Software platforms and an embedded monitoring system. Details live in src/data/projects.ts."
        />
        {featured ? (
          <div className="featured-project">
            <ProjectCard project={featured} onOpen={setActive} />
            <LumoraDiagram />
            <InteractiveSystem />
          </div>
        ) : null}
        <div className="project-grid">
          {rest.map((project) => (
            <ProjectCard key={project.id} project={project} onOpen={setActive} />
          ))}
        </div>
      </div>
      {active ? <ProjectModal project={active} onClose={() => setActive(null)} /> : null}
    </section>
  );
}
