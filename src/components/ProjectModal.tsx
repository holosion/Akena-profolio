import { ExternalLink, GitBranch, X } from 'lucide-react';
import { useEffect } from 'react';
import type { Project } from '../data/projects';
import LumoraDiagram from './LumoraDiagram';

type Props = {
  project: Project;
  onClose: () => void;
};

export default function ProjectModal({ project, onClose }: Props) {
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', onKey);
    document.body.style.overflow = 'hidden';
    return () => {
      window.removeEventListener('keydown', onKey);
      document.body.style.overflow = '';
    };
  }, [onClose]);

  return (
    <div className="modal-backdrop" onClick={onClose} role="presentation">
      <div
        className="modal"
        role="dialog"
        aria-modal="true"
        aria-labelledby="project-modal-title"
        onClick={(e) => e.stopPropagation()}
      >
        <button type="button" className="modal__close" onClick={onClose} aria-label="Close project details">
          <X size={18} />
        </button>
        <p className="kicker">{project.category}</p>
        <h2 id="project-modal-title">{project.title}</h2>
        {project.id === 'lumora' ? <LumoraDiagram /> : null}
        <div className="modal__grid">
          <section>
            <h3>Problem</h3>
            <p>{project.details.problem}</p>
          </section>
          <section>
            <h3>Solution</h3>
            <p>{project.details.solution}</p>
          </section>
          <section>
            <h3>Architecture</h3>
            <p>{project.details.architecture}</p>
          </section>
          <section>
            <h3>Technologies</h3>
            <ul className="tags">
              {project.details.technologies.map((tech) => (
                <li key={tech}>{tech}</li>
              ))}
            </ul>
          </section>
          <section>
            <h3>Engineering challenges</h3>
            <ul>
              {project.details.challenges.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </section>
          <section>
            <h3>What I learned</h3>
            <ul>
              {project.details.learned.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </section>
        </div>
        <div className="project-card__actions">
          {project.github ? (
            <a className="btn btn--primary" href={project.github} target="_blank" rel="noreferrer">
              <GitBranch size={16} />
              GitHub repository
            </a>
          ) : null}
          {project.demo ? (
            <a className="btn btn--ghost" href={project.demo} target="_blank" rel="noreferrer">
              <ExternalLink size={16} />
              Live demo
            </a>
          ) : null}
        </div>
      </div>
    </div>
  );
}
