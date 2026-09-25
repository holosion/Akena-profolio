import { BriefcaseBusiness, GitBranch } from 'lucide-react';
import { socials } from '../config/socials';
import { profile } from '../data/profile';

const InstagramIcon = ({ size = 16 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <rect width="20" height="20" x="2" y="2" rx="5" ry="5"></rect>
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
    <line x1="17.5" x2="17.51" y1="6.5" y2="6.5"></line>
  </svg>
);

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
        <a href={socials.instagram} target="_blank" rel="noreferrer">
          <InstagramIcon size={16} /> Instagram
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
