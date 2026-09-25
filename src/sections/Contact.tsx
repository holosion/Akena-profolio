import { BriefcaseBusiness, GitBranch, Mail } from 'lucide-react';
import { socials } from '../config/socials';
import SectionHeader from '../components/SectionHeader';

const InstagramIcon = ({ size = 18 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <rect width="20" height="20" x="2" y="2" rx="5" ry="5"></rect>
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
    <line x1="17.5" x2="17.51" y1="6.5" y2="6.5"></line>
  </svg>
);

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
            <InstagramIcon size={18} />
            <a href={socials.instagram} target="_blank" rel="noreferrer">
              instagram.com/holo.sion
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
                @AkenaJonat2240
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
