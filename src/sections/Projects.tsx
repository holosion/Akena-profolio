import { useState } from 'react';
import InteractiveSystem from '../components/InteractiveSystem';
import LumoraDiagram from '../components/LumoraDiagram';
import ProjectCard from '../components/ProjectCard';
import ProjectModal from '../components/ProjectModal';
import SectionHeader from '../components/SectionHeader';
import { projects, type Project } from '../data/projects';

export default function Projects() {
  const [active, setActive] = useState<Project | null>(null);
  const featured = projects.find((p) => p.featured);
  const rest = projects.filter((p) => !p.featured);

  return (
    <section id="projects" className="section">
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
