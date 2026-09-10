import { GitBranch, ArrowDownRight } from 'lucide-react';
import { lazy, Suspense } from 'react';
import { socials } from '../config/socials';
import { profile } from '../data/profile';
import Hero3D from '../components/Hero3D';
import PortraitCard from '../components/PortraitCard';
import { usePrefersReducedMotion } from '../hooks/usePrefersReducedMotion';

const Threads = lazy(() => import('../react-bits/Threads'));

export default function Hero() {
  const reduced = usePrefersReducedMotion();

  return (
    <section id="home" className="hero">
      <div className="hero__bg" aria-hidden="true">
        {!reduced ? (
          <Suspense fallback={null}>
            <Threads amplitude={1.15} distance={0.25} enableMouseInteraction />
          </Suspense>
        ) : null}
      </div>
      <div className="hero__grid" />
      <div className="container hero__layout">
        <div className="hero__copy">
          <p className="kicker">Intelligent systems · Holosion Industries</p>
          <h1>{profile.name}</h1>
          <p className="hero__titles">
            <span>{profile.titlePrimary}</span>
            <span>{profile.titleSecondary}</span>
          </p>
          <p className="lede">{profile.heroIntro}</p>
          <div className="hero__cta">
            <a className="btn btn--primary" href="#projects">
              View Projects
              <ArrowDownRight size={16} />
            </a>
            <a className="btn btn--ghost" href={socials.githubProfile} target="_blank" rel="noreferrer">
              <GitBranch size={16} />
              GitHub
            </a>
          </div>
        </div>
        <PortraitCard />
        <Hero3D />
      </div>
    </section>
  );
}
