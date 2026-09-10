import SectionHeader from '../components/SectionHeader';
import { profile } from '../data/profile';

export default function About() {
  return (
    <section id="about" className="section">
      <div className="container about">
        <SectionHeader
          kicker="01 — Profile"
          title="About"
          copy="Building at the intersection of embedded systems, AI, machine learning, software, cloud, and automation."
        />
        <div className="about__grid">
          {profile.about.map((paragraph) => (
            <p key={paragraph}>{paragraph}</p>
          ))}
          <dl className="about__facts">
            <div>
              <dt>Role</dt>
              <dd>
                {profile.organization.role}, {profile.organization.name}
              </dd>
            </div>
            <div>
              <dt>Focus</dt>
              <dd>Software → AI → ML → Embedded → Intelligent systems</dd>
            </div>
          </dl>
        </div>
      </div>
    </section>
  );
}
