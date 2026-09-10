import { lazy, Suspense } from 'react';
import SectionHeader from '../components/SectionHeader';
import VisibilityMount from '../components/VisibilityMount';
import { techStack } from '../data/tech';
import { usePrefersReducedMotion } from '../hooks/usePrefersReducedMotion';

const Ballpit = lazy(() => import('../react-bits/Ballpit'));

export default function TechStack() {
  const reduced = usePrefersReducedMotion();

  return (
    <section id="stack" className="section">
      <div className="container">
        <SectionHeader
          kicker="04 — Toolkit"
          title="Technologies"
          copy="Tools I work with or am learning. This is a working map, not a claim of expert-level proficiency in every item."
        />
        <div className="stack-layout">
          <div className="stack-groups">
            {techStack.map((group) => (
              <article key={group.id} className="stack-group">
                <h3>{group.label}</h3>
                <ul className="tags">
                  {group.items.map((item) => (
                    <li key={item.name}>{item.name}</li>
                  ))}
                </ul>
              </article>
            ))}
          </div>
          <div className="stack-visual" aria-hidden="true">
            {!reduced ? (
              <VisibilityMount className="stack-visual__fx">
                <Suspense fallback={null}>
                  <Ballpit count={16} followCursor />
                </Suspense>
              </VisibilityMount>
            ) : (
              <div className="stack-visual__static" />
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
