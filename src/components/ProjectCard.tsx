import { ExternalLink, GitBranch } from 'lucide-react';
import type { Project } from '../data/projects';

type Props = {
  project: Project;
  onOpen: (project: Project) => void;
};

export default function ProjectCard({ project, onOpen }: Props) {
  return (
    <article className={`project-card ${project.featured ? 'project-card--featured' : ''}`}>
      <div className={`project-visual project-visual--${project.image}`} aria-hidden="true">
        <span />
      </div>
      <div className="project-card__body">
        <p className="kicker">{project.category}</p>
        <h3>{project.title}</h3>
        <p>{project.description}</p>
        <ul className="tags">
          {project.technologies.map((tech) => (
            <li key={tech}>{tech}</li>
          ))}
        </ul>
        <ul className="feature-list">
          {project.features.slice(0, 4).map((feature) => (
            <li key={feature}>{feature}</li>
          ))}
        </ul>
        <div className="project-card__actions">
          <button type="button" className="btn btn--ghost" onClick={() => onOpen(project)}>
            View Details
          </button>
          {project.github ? (
            <a className="btn btn--icon" href={project.github} target="_blank" rel="noreferrer">
              <GitBranch size={16} />
              GitHub
            </a>
          ) : (
            <span className="btn btn--disabled">GitHub</span>
          )}
          {project.demo ? (
            <a className="btn btn--icon" href={project.demo} target="_blank" rel="noreferrer">
              <ExternalLink size={16} />
              Live Demo
            </a>
          ) : (
            <span className="btn btn--disabled">Live Demo</span>
          )}
        </div>
      </div>
    </article>
  );
}
