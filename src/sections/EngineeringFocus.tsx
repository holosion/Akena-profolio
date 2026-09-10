import { lazy, Suspense } from 'react';
import SectionHeader from '../components/SectionHeader';
import VisibilityMount from '../components/VisibilityMount';
import { engineeringDomains } from '../data/engineering';
import { usePrefersReducedMotion } from '../hooks/usePrefersReducedMotion';

const AeroShards = lazy(() => import('../react-bits/AeroShards'));

export default function EngineeringFocus() {
  const reduced = usePrefersReducedMotion();

  return (
    <section id="engineering" className="section section--engineer">
      <div className="engineer-bg" aria-hidden="true">
        {!reduced ? (
          <VisibilityMount className="engineer-bg__fx">
            <Suspense fallback={null}>
              <AeroShards />
            </Suspense>
          </VisibilityMount>
        ) : null}
      </div>
      <div className="container">
        <SectionHeader
          kicker="02 — Domains"
          title="Engineering focus"
          copy="Areas I work in and continue to deepen. Add cybersecurity, robotics, vision, or IoT as dedicated domains in src/data/engineering.ts."
        />
        <div className="domain-grid">
          {engineeringDomains.map((domain) => (
            <article key={domain.id} className="domain-card">
              <h3>{domain.title}</h3>
              <p>{domain.summary}</p>
              <ul className="tags">
                {domain.topics.map((topic) => (
                  <li key={topic}>{topic}</li>
                ))}
              </ul>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
