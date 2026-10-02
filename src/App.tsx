import { useEffect, useRef, useState } from 'react';
import { ArrowUpRight, ArrowDown, Code2 as Github, BriefcaseBusiness as Linkedin, Menu, X, Cpu, BrainCircuit, Code2 } from 'lucide-react';
import { profile } from './data/profile';
import { socials, projectLinks } from './config/socials';
import { techStack } from './data/tech';
import { usePrefersReducedMotion } from './hooks/usePrefersReducedMotion';

function IntelligenceCore() {
  const ref = useRef<HTMLCanvasElement>(null);
  const reduced = usePrefersReducedMotion();
  useEffect(() => {
    const canvas = ref.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    let frame = 0, width = 0, height = 0, px = 0, py = 0, visible = true;
    const resize = () => { width = canvas.clientWidth; height = canvas.clientHeight; const dpr = Math.min(devicePixelRatio || 1, 2); canvas.width = width * dpr; canvas.height = height * dpr; ctx.setTransform(dpr, 0, 0, dpr, 0, 0); };
    const pointer = (e: PointerEvent) => { px = (e.clientX / innerWidth - .5) * .5; py = (e.clientY / innerHeight - .5) * .3; };
    const observer = new ResizeObserver(resize); observer.observe(canvas);
    window.addEventListener('pointermove', pointer, { passive: true });
    const draw = (time: number) => {
      ctx.clearRect(0, 0, width, height);
      const scroll = scrollY / Math.max(innerHeight, 1), t = reduced ? .4 : time * .00016;
      const angle = t + (reduced ? 0 : scroll * .65) + (reduced ? 0 : px);
      const tilt = .5 + (reduced ? 0 : py + Math.sin(scroll * .6) * .5);
      const radius = Math.min(width * .32, height * .32, 225);
      const points: { x: number; y: number; z: number; u: number; v: number }[] = [];
      const columns = 90, rows = 30;
      const glow = ctx.createRadialGradient(width / 2, height / 2, 0, width / 2, height / 2, radius * 1.8);
      glow.addColorStop(0, 'rgba(156,240,107,.1)'); glow.addColorStop(1, 'rgba(156,240,107,0)'); ctx.fillStyle = glow; ctx.fillRect(0, 0, width, height);
      for (let u = 0; u < columns; u++) for (let v = 0; v < rows; v++) {
        const a = u / columns * Math.PI * 2, b = v / rows * Math.PI * 2;
        const r = radius * (.68 + (.29 + .06 * Math.sin(a * 3 + b * 2 + t * 4)) * Math.cos(b));
        const x = r * Math.cos(a), y = r * Math.sin(a), z = radius * .35 * Math.sin(b);
        const rx = x * Math.cos(angle) + z * Math.sin(angle), rz = -x * Math.sin(angle) + z * Math.cos(angle);
        const ry = y * Math.cos(tilt) - rz * Math.sin(tilt), depth = y * Math.sin(tilt) + rz * Math.cos(tilt), perspective = 650 / (650 - depth);
        points.push({ x: width / 2 + rx * perspective, y: height / 2 + ry * perspective, z: depth, u, v });
      }
      for (const p of points) {
        const alpha = .14 + (p.z / radius + 1) * .25;
        if (p.u % 3 === 0) { const next = points[p.u * rows + (p.v + 1) % rows]; ctx.beginPath(); ctx.moveTo(p.x, p.y); ctx.lineTo(next.x, next.y); ctx.strokeStyle = `rgba(175,246,136,${alpha * .5})`; ctx.lineWidth = .6; ctx.stroke(); }
        ctx.beginPath(); ctx.arc(p.x, p.y, p.z > 0 ? 1.2 : .7, 0, Math.PI * 2); ctx.fillStyle = `rgba(190,255,155,${alpha})`; ctx.fill();
      }
      if (!reduced && !document.hidden && visible) frame = requestAnimationFrame(draw);
    };
    const visibility = () => { cancelAnimationFrame(frame); if (!document.hidden && visible) frame = requestAnimationFrame(draw); };
    const viewport = new IntersectionObserver(entries => { visible = entries[0].isIntersecting; visibility(); });
    viewport.observe(canvas);
    document.addEventListener('visibilitychange', visibility); resize(); frame = requestAnimationFrame(draw);
    return () => { cancelAnimationFrame(frame); observer.disconnect(); viewport.disconnect(); window.removeEventListener('pointermove', pointer); document.removeEventListener('visibilitychange', visibility); };
  }, [reduced]);
  return <canvas ref={ref} className="intelligence-canvas" aria-hidden="true" />;
}

const works = [
  { id: 'lumora', name: 'Lumora', category: 'EMBEDDED SYSTEMS / IOT', description: 'Making the invisible measurable. An intelligent LPG monitoring system connecting sensors, safety alerts, and real-time insight.', tags: ['ESP32', 'C/C++', 'Sensors', 'IoT'], links: projectLinks.lumora, type: 'circuit' },
  { id: 'iles', name: 'Internship Evaluation', category: 'SOFTWARE / WEB APPLICATION', description: 'Bringing structure to internship login and evaluation workflows through one connected web experience.', tags: ['React', 'JavaScript', 'Web'], links: projectLinks.iles, type: 'interface' },
  { id: 'events', name: 'Event Booking', category: 'SOFTWARE / PRODUCT DEVELOPMENT', description: 'From discovering an event to reserving a place. A web platform for booking and managing events.', tags: ['JavaScript', 'Booking', 'Web'], links: projectLinks.events, type: 'orbit' },
];

export default function App() {
  const [menu, setMenu] = useState(false);
  const [progress, setProgress] = useState(0);
  useEffect(() => {
    let pending = 0;
    const update = () => { pending = 0; setProgress(scrollY / Math.max(1, document.documentElement.scrollHeight - innerHeight)); document.documentElement.style.setProperty('--scroll', String(scrollY / innerHeight)); };
    const scroll = () => { if (!pending) pending = requestAnimationFrame(update); };
    const observer = new IntersectionObserver(entries => entries.forEach(entry => { if (entry.isIntersecting) { entry.target.classList.add('is-visible'); observer.unobserve(entry.target); } }), { threshold: .1 });
    document.querySelectorAll('.reveal').forEach(el => observer.observe(el)); window.addEventListener('scroll', scroll, { passive: true }); update();
    return () => { observer.disconnect(); window.removeEventListener('scroll', scroll); cancelAnimationFrame(pending); };
  }, []);
  return <div className="experience">
    <a className="skip-link" href="#main">Skip to content</a><div className="scroll-progress" style={{ transform: `scaleX(${progress})` }} />
    <header className="site-header"><a href="#home" className="wordmark" aria-label="Akena home">akena<span>®</span></a><nav className={menu ? 'navigation open' : 'navigation'} aria-label="Main navigation">{[['About', 'about'], ['Expertise', 'expertise'], ['Work', 'work']].map(([label, id]) => <a key={id} href={`#${id}`} onClick={() => setMenu(false)}>{label}</a>)}<a className="nav-contact" href="#contact" onClick={() => setMenu(false)}>Let’s talk <ArrowUpRight size={15} /></a></nav><button className="menu-button" aria-label={menu ? 'Close navigation' : 'Open navigation'} aria-expanded={menu} onClick={() => setMenu(!menu)}>{menu ? <X /> : <Menu />}</button></header>
    <main id="main"><section className="hero" id="home"><div className="hero-grid" aria-hidden="true" /><div className="hero-copy"><div className="eyebrow"><span className="status-dot" /> ENGINEER. BUILDER. ALWAYS EVOLVING.</div><h1>Engineering<br />the next<br /><span className="future-word">intelligence<span className="title-dot">.</span></span></h1><p>I’m Akena. Building at the intersection of<br className="desktop-break" /> AI, machine learning, and the physical world.</p><a className="primary-button" href="#work">Explore my work <ArrowUpRight size={19} /></a></div><div className="core-scene"><IntelligenceCore /><span className="scene-label label-top">FIG. 001 — INTELLIGENCE CORE</span><span className="scene-label label-bottom">HARDWARE × SOFTWARE × INTELLIGENCE</span><div className="scene-coordinate">X 0.82<br />Y 1.04<br />Z 0.36</div><span className="scene-cross">+</span></div><div className="hero-bottom"><a href="#about"><span className="scroll-icon"><ArrowDown size={14} /></span> SCROLL TO DISCOVER</a><span>AI / ML / EMBEDDED SYSTEMS</span><span className="hero-edition">PORTFOLIO — 2026</span></div></section>
    <div className="discipline-strip"><span>IDEAS INTO INTELLIGENCE</span><span>✳</span><span>CODE INTO CONNECTION</span><span>✳</span><span>HARDWARE INTO POSSIBILITY</span><span>✳</span></div>
    <section id="about" className="section"><div className="section-kicker reveal"><span>01 / THE ENGINEER</span><span>A LITTLE ABOUT ME</span></div><div className="about-layout"><div className="reveal"><h2>Curiosity is the spark.<br /><span className="muted-heading">Building is the proof.</span></h2><div className="about-text"><p>I’m a growing engineer connecting the world of code with the world around us. I build systems that sense, learn, and act — from embedded hardware to intelligent applications.</p><p>As CEO of Holosion Industries, I’m working toward a future where AI, connected devices, and thoughtful software solve real problems. Learning continuously. Testing ideas. Making things work.</p></div><a className="text-link" href={socials.githubProfile} target="_blank" rel="noreferrer">Follow what I’m building <ArrowUpRight size={18} /></a></div><div className="portrait-panel reveal"><img src={profile.photo.src} alt={profile.photo.alt} loading="lazy" /><div className="portrait-caption"><span>AKENA JONATHAN</span><span>ENGINEER & FOUNDER</span></div><div className="portrait-tag"><span className="status-dot" /> IN CONSTANT DEVELOPMENT</div></div></div></section>
    <section id="expertise" className="section expertise-section"><div className="section-kicker reveal"><span>02 / MY FOCUS</span><span>THREE WORLDS. ONE MINDSET.</span></div><h2 className="reveal">Where intelligence<br /><span className="muted-heading">meets the real world.</span></h2><div className="expertise-grid">{[{ icon: BrainCircuit, name: 'Artificial intelligence', number: '01', description: 'Exploring how data becomes understanding. Building foundations in machine learning, algorithms, and intelligent applications.', tags: 'PYTHON / SCIKIT-LEARN / DATA' }, { icon: Cpu, name: 'Embedded systems', number: '02', description: 'Giving the physical world a digital voice. Connecting microcontrollers, sensors, and firmware into useful, responsive systems.', tags: 'ESP32 / C & C++ / IOT' }, { icon: Code2, name: 'Software engineering', number: '03', description: 'Turning complex workflows into clear experiences. Building web applications and the software that connects the whole system.', tags: 'REACT / JAVASCRIPT / SQL' }].map(({ icon: Icon, ...item }) => <article className="expertise-card reveal" key={item.number}><div className="card-top"><Icon size={28} strokeWidth={1.2} /><span>{item.number}</span></div><h3>{item.name}</h3><p>{item.description}</p><div className="card-tags">{item.tags}</div></article>)}</div></section>
    <section id="work" className="section"><div className="section-kicker reveal"><span>03 / SELECTED WORK</span><span>BUILT WITH INTENT</span></div><div className="work-heading reveal"><h2>Less theory.<br /><span className="muted-heading">More making.</span></h2><a className="text-link" href={socials.githubProfile} target="_blank" rel="noreferrer">All repositories <ArrowUpRight size={18} /></a></div>{works.map((work, index) => <article className="work-card reveal" key={work.id}><div className={`project-art ${work.type}`} aria-hidden="true">{work.type === 'circuit' ? <><div className="circuit-board"><span className="chip"><Cpu size={45} strokeWidth={1} /><small>ESP32</small></span>{Array.from({ length: 8 }, (_, i) => <span className={`trace trace-${i}`} key={i} />)}</div><span className="art-label">LUMORA / SYSTEM ONLINE ●</span></> : work.type === 'interface' ? <div className="mock-interface"><div className="mock-top"><i /><i /><i /></div><div className="mock-body"><span>EVALUATION OVERVIEW</span><div className="mock-stat">ILES<small>CONNECTED WORKFLOWS</small></div><div className="mock-chart">{[35, 65, 45, 85, 58, 95, 75, 100].map((h, i) => <i key={i} style={{ height: `${h}%` }} />)}</div><div className="mock-lines"><i /><i /></div></div></div> : <div className="event-visual"><span className="event-orbit" /><span className="event-orbit second" /><div className="event-ticket"><span>YOUR NEXT EXPERIENCE</span><strong>ADMIT<br />ONE.</strong><div className="barcode" /><span>DISCOVER. BOOK. GO.</span></div></div>}<span className="art-index">0{index + 1}</span></div><div className="project-copy"><span className="eyebrow">{work.category}</span><h3>{work.name}</h3><p>{work.description}</p><div className="project-tags">{work.tags.map(tag => <span key={tag}>{tag}</span>)}</div><div className="project-links"><a href={work.links.demo} target="_blank" rel="noreferrer">Explore project <ArrowUpRight size={18} /></a><a href={work.links.github} target="_blank" rel="noreferrer" aria-label={`${work.name} source code on GitHub`}><Github size={19} /></a></div></div></article>)}</section>
    <section className="section toolkit-section" id="toolkit"><div className="section-kicker reveal"><span>04 / THE TOOLKIT</span><span>ALWAYS ADDING NEW TOOLS</span></div><div className="toolkit-layout"><h2 className="reveal">Built on skills.<br /><span className="muted-heading">Driven by curiosity.</span></h2><div>{techStack.map(group => <div className="toolkit-row reveal" key={group.id}><span>{group.label}</span><div>{group.items.map(item => <span key={item.name}>{item.name}</span>)}</div></div>)}</div></div></section>
    <section id="contact" className="section contact-section"><div className="section-kicker reveal"><span>05 / WHAT’S NEXT?</span><span>LET’S BUILD SOMETHING MEANINGFUL</span></div><div className="reveal"><div className="eyebrow"><span className="status-dot" /> OPEN TO IDEAS & COLLABORATION</div><a className="contact-title" href={`mailto:${socials.email}`}>Great things<br />start with <span>a hello.</span><ArrowUpRight /></a><div className="contact-bottom"><a className="text-link" href={`mailto:${socials.email}`}>{socials.email} <ArrowUpRight size={18} /></a><div className="social-links"><a href={socials.githubProfile} target="_blank" rel="noreferrer"><Github size={17} /> GitHub</a><a href={socials.linkedin} target="_blank" rel="noreferrer"><Linkedin size={17} /> LinkedIn</a><a href={socials.x} target="_blank" rel="noreferrer">X <ArrowUpRight size={17} /></a></div></div></div></section>
    </main><footer><a className="wordmark" href="#home">akena<span>®</span></a><span>© 2026 AKENA. BUILT WITH CURIOSITY.</span><a href="#home">BACK TO TOP ↑</a></footer></div>;
}
