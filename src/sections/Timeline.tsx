import { lazy, Suspense } from 'react';
import SectionHeader from '../components/SectionHeader';
import VisibilityMount from '../components/VisibilityMount';
import { journey } from '../data/timeline';
import { usePrefersReducedMotion } from '../hooks/usePrefersReducedMotion';

const Waves = lazy(() => import('../react-bits/Waves'));

export default function Timeline() {
  const reduced = usePrefersReducedMotion();

  return (
    <section id="journey" className="section section--timeline">
      <div className="timeline-bg" aria-hidden="true">
        {!reduced ? (
          <VisibilityMount className="timeline-bg__fx">
            <Suspense fallback={null}>
              <Waves
                lineColor="rgba(109, 255, 201, 0.55)"
                backgroundColor="transparent"
                waveSpeedX={0.016}
                waveSpeedY={0.009}
                waveAmpX={50}
                waveAmpY={26}
                xGap={10}
                yGap={28}
                friction={0.9}
                tension={0.007}
                maxCursorMove={160}
              />
            </Suspense>
          </VisibilityMount>
        ) : null}
      </div>
      <div className="section__accent section__accent--mint" aria-hidden="true" />
      <div className="container">
        <SectionHeader
          kicker="06 — Path"
          title="Engineering journey"
          copy="A progression toward combining fields, not treating them as isolated skills. Edit entries in src/data/timeline.ts — no invented dates."
        />
        <ol className="timeline">
          {journey.map((entry, index) => (
            <li key={entry.id}>
              <span className="timeline__index">{String(index + 1).padStart(2, '0')}</span>
              <div>
                <h3>{entry.title}</h3>
                <p>{entry.summary}</p>
              </div>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
