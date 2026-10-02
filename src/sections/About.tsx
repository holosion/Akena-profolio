import { lazy, Suspense } from 'react';
import SectionHeader from '../components/SectionHeader';
import VisibilityMount from '../components/VisibilityMount';
import { profile } from '../data/profile';
import { usePrefersReducedMotion } from '../hooks/usePrefersReducedMotion';

const Waves = lazy(() => import('../react-bits/Waves'));

export default function About() {
  const reduced = usePrefersReducedMotion();

  return (
    <section id="about" className="section section--about">
      <div className="about-bg" aria-hidden="true">
        {!reduced ? (
          <VisibilityMount className="about-bg__fx">
            <Suspense fallback={null}>
              <Waves
                lineColor="rgba(126, 160, 255, 0.55)"
                backgroundColor="transparent"
                waveSpeedX={0.018}
                waveSpeedY={0.008}
                waveAmpX={46}
                waveAmpY={24}
                xGap={10}
                yGap={30}
                tension={0.008}
                maxCursorMove={150}
              />
            </Suspense>
          </VisibilityMount>
        ) : null}
      </div>
      <div className="section__accent section__accent--purple" aria-hidden="true" />
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
