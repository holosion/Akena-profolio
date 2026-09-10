import { GitBranch } from 'lucide-react';
import { socials } from '../config/socials';
import { projects } from '../data/projects';

export default function GitHubActivity() {
  const live = projects.filter((p) => p.demo);

  return (
    <section className="section section--compact" aria-labelledby="github-heading">
      <div className="container github-panel">
        <div>
          <p className="kicker">GitHub</p>
          <h2 id="github-heading">Repositories & live systems</h2>
          <p>Project source links are configured in one place. Profile activity stays on GitHub.</p>
        </div>
        <a className="btn btn--primary" href={socials.githubProfile} target="_blank" rel="noreferrer">
          <GitBranch size={16} />
          Open GitHub
        </a>
        <ul className="github-live">
          {live.map((project) => (
            <li key={project.id}>
              <span>{project.title}</span>
              <a href={project.demo} target="_blank" rel="noreferrer">
                Live
              </a>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
