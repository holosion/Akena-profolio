import { BriefcaseBusiness, GitBranch, Mail } from 'lucide-react';
import { socials } from '../config/socials';
import SectionHeader from '../components/SectionHeader';

export default function Contact() {
  return (
    <section id="contact" className="section">
      <div className="container contact">
        <SectionHeader kicker="07 — Signal" title="Let's build intelligent systems." />
        <p className="lede">
          Open to technical conversations around embedded systems, AI/ML, and software that ships.
        </p>
        <ul className="contact-list">
          <li>
            <GitBranch size={18} />
            <a href={socials.githubProfile} target="_blank" rel="noreferrer">
              github.com/holosion
            </a>
          </li>
          <li>
            <Mail size={18} />
            {socials.email ? (
              <a href={`mailto:${socials.email}`}>{socials.email}</a>
            ) : (
              <span>Email — set in src/config/socials.ts</span>
            )}
          </li>
          <li>
            <BriefcaseBusiness size={18} />
            {socials.linkedin ? (
              <a href={socials.linkedin} target="_blank" rel="noreferrer">
                LinkedIn
              </a>
            ) : (
              <span>LinkedIn — set in src/config/socials.ts</span>
            )}
          </li>
          <li>
            <span className="contact-x" aria-hidden="true">
              𝕏
            </span>
            {socials.x ? (
              <a href={socials.x} target="_blank" rel="noreferrer">
                X
              </a>
            ) : (
              <span>X — set in src/config/socials.ts</span>
            )}
          </li>
        </ul>
      </div>
    </section>
  );
}
