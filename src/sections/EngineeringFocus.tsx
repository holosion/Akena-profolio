import { lazy, Suspense } from 'react';
import SectionHeader from '../components/SectionHeader';
import VisibilityMount from '../components/VisibilityMount';
import { engineeringDomains } from '../data/engineering';
import { usePrefersReducedMotion } from '../hooks/usePrefersReducedMotion';

const Ballpit = lazy(() => import('../react-bits/Ballpit'));

export default function EngineeringFocus() {
  const reduced = usePrefersReducedMotion();

  return (
    <section id="engineering" className="section section--engineer">
      <div className="engineer-bg" aria-hidden="true">
        {!reduced ? (
          <VisibilityMount className="engineer-bg__fx">
            <Suspense fallback={null}>
              <Ballpit
                count={24}
                followCursor
                colors={['#ec4899', '#8b5cf6', '#06b6d4', '#f59e0b', '#84cc16']}
              />
            </Suspense>
          </VisibilityMount>
        ) : null}
      </div>
      <div className="section__accent section__accent--cyan" aria-hidden="true" />
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
