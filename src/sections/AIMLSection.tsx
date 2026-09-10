import { lazy, Suspense } from 'react';
import SectionHeader from '../components/SectionHeader';
import VisibilityMount from '../components/VisibilityMount';
import { aimlMap } from '../data/aiml';
import { usePrefersReducedMotion } from '../hooks/usePrefersReducedMotion';

const Galaxy = lazy(() => import('../react-bits/Galaxy'));

export default function AIMLSection() {
  const reduced = usePrefersReducedMotion();

  return (
    <section id="aiml" className="section section--galaxy">
      <div className="galaxy-bg" aria-hidden="true">
        {!reduced ? (
          <VisibilityMount className="galaxy-bg__fx">
            <Suspense fallback={null}>
              <Galaxy density={1.1} hueShift={175} saturation={0.4} />
            </Suspense>
          </VisibilityMount>
        ) : null}
      </div>
      <div className="container">
        <SectionHeader
          kicker="05 — Intelligence"
          title="AI / ML knowledge map"
          copy="A living map of concepts I study and apply. Expand nodes in src/data/aiml.ts as new projects land."
        />
        <div className="knowledge-map">
          {aimlMap.map((node) => (
            <article key={node.id} className="knowledge-node">
              <h3>{node.title}</h3>
              <p>{node.summary}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
