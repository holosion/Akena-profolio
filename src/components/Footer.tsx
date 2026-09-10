import { BriefcaseBusiness, GitBranch } from 'lucide-react';
import { socials } from '../config/socials';
import { profile } from '../data/profile';

export default function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="site-footer">
      <div>
        <strong>{profile.name}</strong>
        <p>Embedded Systems • AI • Machine Learning</p>
      </div>
      <nav aria-label="Footer social">
        <a href={socials.githubProfile} target="_blank" rel="noreferrer">
          <GitBranch size={16} /> GitHub
        </a>
        {socials.linkedin ? (
          <a href={socials.linkedin} target="_blank" rel="noreferrer">
            <BriefcaseBusiness size={16} /> LinkedIn
          </a>
        ) : (
          <span>LinkedIn</span>
        )}
        {socials.x ? (
          <a href={socials.x} target="_blank" rel="noreferrer">
            X
          </a>
        ) : (
          <span>X</span>
        )}
      </nav>
      <p className="copyright">© {year} {profile.name}. Holosion Industries.</p>
    </footer>
  );
}
