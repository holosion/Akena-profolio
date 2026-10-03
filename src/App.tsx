import { useEffect, useRef, useState } from "react";
import type { PointerEvent as ReactPointerEvent } from "react";
import {
  ArrowUpRight,
  ArrowDown,
  Menu,
  X,
  Cpu,
  BrainCircuit,
  Code2,
  Sparkles,
  MoveUpRight,
} from "lucide-react";
import { profile } from "./data/profile";
import { socials, projectLinks } from "./config/socials";
import { techStack } from "./data/tech";
import SpatialScene from "./components/SpatialScene";
import ScrollJourney from "./components/ScrollJourney";
import BrandIcon from "./components/BrandIcon";
import ContactForm from "./components/ContactForm";

type PortfolioWork = {
  id: string; name: string; subtitle: string; category: string; description: string;
  tags: string[]; features: string[]; links: { github: string; demo?: string };
  image: string; alt: string; color: string; status?: string;
};

const works: PortfolioWork[] = [
  {
    id: "mario",
    name: "Super Mario AI",
    subtitle: "Learning to play, one experience at a time.",
    category: "ARTIFICIAL INTELLIGENCE · REINFORCEMENT LEARNING",
    description: "An ongoing reinforcement learning project training a PPO agent to play Super Mario Bros. Exploring how an agent learns from gameplay, rewards, and repeated experience, with training and evaluation still in progress.",
    tags: ["Python", "PPO", "Stable-Baselines3", "Gymnasium"],
    features: ["PPO training with stacked gameplay frames", "Curriculum from a single level toward the full game", "Model checkpoints, evaluation, and TensorBoard logging"],
    links: projectLinks.mario,
    image: "/images/super-mario-ai.jpg",
    alt: "Concept illustration of Mario surrounded by neural networks and AI training displays",
    color: "cyan",
    status: "Training in progress",
  },
  {
    id: "lumora",
    name: "Lumora",
    subtitle: "Intelligence, built into the everyday.",
    category: "EMBEDDED ENGINEERING · IOT",
    description:
      "An LPG monitoring and leakage detection system that connects real-world sensing with useful information and local safety alerts.",
    tags: ["ESP32", "C/C++", "HX711", "IoT"],
    features: [
      "Cylinder weight & gas-level monitoring",
      "Gas sensing with audible and visual warnings",
      "Connected monitoring interface",
    ],
    links: projectLinks.lumora,
    image: "/images/lumora-hardware.webp",
    alt: "Concept render of LPG monitoring electronics, sensors, and a gas cylinder",
    color: "cyan",
  },
  {
    id: "iles",
    name: "Internship Evaluation",
    subtitle: "A clearer path from learning to progress.",
    category: "SOFTWARE ENGINEERING · WEB",
    description:
      "A deployed web application bringing internship login and evaluation workflows together in a structured experience.",
    tags: ["React", "JavaScript", "Web application"],
    features: [
      "Centralized internship workflows",
      "Structured login and evaluation experience",
      "Deployed web application",
    ],
    links: projectLinks.iles,
    image: "/images/iles-workspace.webp",
    alt: "Concept render of a modern digital learning workspace and evaluation dashboard",
    color: "violet",
  },
  {
    id: "events",
    name: "Event Booking",
    subtitle: "Good experiences start with connection.",
    category: "PRODUCT DEVELOPMENT · WEB",
    description:
      "A web-based booking and management system that brings event discovery and reservations into one application.",
    tags: ["JavaScript", "Booking", "Web"],
    features: [
      "Event booking and management",
      "Web-based reservation flow",
      "Deployed application",
    ],
    links: projectLinks.events,
    image: "/images/events-experience.webp",
    alt: "Concept artwork of a colorful evening event with an illuminated stage",
    color: "pink",
  },
];

function tiltCard(event: ReactPointerEvent<HTMLElement>) {
  if (
    event.pointerType !== "mouse" ||
    matchMedia("(prefers-reduced-motion: reduce)").matches
  )
    return;
  const rect = event.currentTarget.getBoundingClientRect();
  event.currentTarget.style.setProperty(
    "--tilt-x",
    `${((event.clientY - rect.top) / rect.height - 0.5) * -5}deg`,
  );
  event.currentTarget.style.setProperty(
    "--tilt-y",
    `${((event.clientX - rect.left) / rect.width - 0.5) * 5}deg`,
  );
}
function resetTilt(event: ReactPointerEvent<HTMLElement>) {
  event.currentTarget.style.setProperty("--tilt-x", "0deg");
  event.currentTarget.style.setProperty("--tilt-y", "0deg");
}

export default function App() {
  const [menu, setMenu] = useState(false);
  const progress = useRef<HTMLDivElement>(null);
  useEffect(() => {
    let frame = 0;
    const update = () => {
      frame = 0;
      const fraction =
        scrollY /
        Math.max(1, document.documentElement.scrollHeight - innerHeight);
      if (progress.current)
        progress.current.style.transform = `scaleX(${fraction})`;
      document.documentElement.style.setProperty(
        "--hero-scroll",
        String(Math.min(1, scrollY / innerHeight)),
      );
    };
    const scroll = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };
    const observer = new IntersectionObserver(
      (entries) =>
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            observer.unobserve(entry.target);
          }
        }),
      { threshold: 0.08 },
    );
    document.querySelectorAll(".reveal").forEach((el) => observer.observe(el));
    window.addEventListener("scroll", scroll, { passive: true });
    window.addEventListener("resize", scroll);
    update();
    return () => {
      observer.disconnect();
      window.removeEventListener("scroll", scroll);
      window.removeEventListener("resize", scroll);
      cancelAnimationFrame(frame);
    };
  }, []);
  useEffect(() => {
    if (!menu) return;
    const close = (event: KeyboardEvent) => {
      if (event.key === "Escape") setMenu(false);
    };
    window.addEventListener("keydown", close);
    return () => window.removeEventListener("keydown", close);
  }, [menu]);

  return (
    <div className="experience">
      <a className="skip-link" href="#main">
        Skip to content
      </a>
      <div className="scroll-progress" ref={progress} />
      <header className="site-header">
        <a href="#home" className="wordmark" aria-label="Akena home">
          akena<span className="logo-spark">✳</span>
        </a>
        <nav
          className={menu ? "navigation open" : "navigation"}
          id="main-navigation"
          aria-label="Main navigation"
        >
          {[
            ["The experience", "experience"],
            ["Selected work", "work"],
            ["About me", "about"],
          ].map(([label, id]) => (
            <a key={id} href={`#${id}`} onClick={() => setMenu(false)}>
              {label}
            </a>
          ))}
          <a
            className="nav-contact"
            href="#contact"
            onClick={() => setMenu(false)}
          >
            Let’s build <ArrowUpRight size={15} />
          </a>
        </nav>
        <button
          className="menu-button"
          aria-label={menu ? "Close navigation" : "Open navigation"}
          aria-expanded={menu}
          aria-controls="main-navigation"
          onClick={() => setMenu(!menu)}
        >
          {menu ? <X /> : <Menu />}
        </button>
      </header>
      <main id="main">
        <section className="hero" id="home">
          <img
            className="hero-background"
            src="/images/intelligence-core.webp"
            alt=""
            fetchPriority="high"
          />
          <div className="hero-aurora" aria-hidden="true" />
          <div className="hero-grid" aria-hidden="true" />
          <div className="hero-copy">
            <div className="eyebrow hero-eyebrow">
              <span className="status-dot" /> AKENA JONATHAN / ENGINEER &
              BUILDER
            </div>
            <h1>
              Turning ideas
              <br />
              into <span className="gradient-text">intelligence.</span>
            </h1>
            <p>
              AI. Machine learning. Embedded systems.
              <br />
              I’m building a future where code meets the real world.
            </p>
            <div className="hero-actions">
              <a className="primary-button" href="#work">
                Discover my work <ArrowUpRight size={18} />
              </a>
              <a
                className="hero-social"
                href={socials.instagram}
                target="_blank"
                rel="noreferrer"
              >
                <BrandIcon brand="instagram" /> @holosion
              </a>
            </div>
            <div className="hero-signature">
              <span>CURIOUS BY NATURE.</span>
              <span>ENGINEER BY PRACTICE.</span>
            </div>
          </div>
          <div className="hero-sculpture">
            <SpatialScene />
            <span className="sculpture-label">
              A MIND IN MOTION <span>FIG. 001</span>
            </span>
            <span className="floating-tag tag-ai">
              <BrainCircuit size={15} /> INTELLIGENCE
            </span>
            <span className="floating-tag tag-hardware">
              <Cpu size={15} /> REAL-WORLD SYSTEMS
            </span>
          </div>
          <div className="hero-bottom">
            <a href="#experience">
              <span className="scroll-icon">
                <ArrowDown size={15} />
              </span>{" "}
              SCROLL INTO MY WORLD
            </a>
            <span className="hero-bottom-center">
              IDEAS. EXPERIMENTS. POSSIBILITIES.
            </span>
            <span>PORTFOLIO / 2026</span>
          </div>
        </section>
        <div
          className="discipline-strip"
          aria-label="AI, machine learning, embedded systems, and creative engineering"
        >
          <div>
            {[0, 1].map((copy) => (
              <div className="marquee-copy" key={copy} aria-hidden={copy === 1}>
                {[
                  "ARTIFICIAL INTELLIGENCE",
                  "MACHINE LEARNING",
                  "EMBEDDED SYSTEMS",
                  "CREATIVE ENGINEERING",
                ].map((label) => (
                  <span key={label}>
                    {label}
                    <i>✳</i>
                  </span>
                ))}
              </div>
            ))}
          </div>
        </div>
        <ScrollJourney />
        <section id="work" className="section work-section">
          <div className="section-kicker reveal">
            <span>01 / SELECTED WORK</span>
            <span>REAL PROJECTS. REAL CURIOSITY.</span>
          </div>
          <div className="work-heading reveal">
            <div>
              <div className="eyebrow">
                <Sparkles size={14} /> FROM MY WORKBENCH
              </div>
              <h2>
                Built to do more
                <br />
                than <span className="gradient-text">look good.</span>
              </h2>
            </div>
            <a
              className="text-link"
              href={socials.githubProfile}
              target="_blank"
              rel="noreferrer"
            >
              Explore GitHub <ArrowUpRight size={18} />
            </a>
          </div>
          <div className="projects-list">
            {works.map((work, index) => (
              <article
                className={`work-card ${work.color} reveal`}
                key={work.id}
                onPointerMove={tiltCard}
                onPointerLeave={resetTilt}
              >
                <a
                  className="project-art"
                  href={work.links.demo || work.links.github}
                  target="_blank"
                  rel="noreferrer"
                  aria-label={`Open ${work.name} ${work.links.demo ? 'live project' : 'repository'}`}
                >
                  <img src={work.image} alt={work.alt} loading="lazy" />
                  <span className="art-index">PROJECT / 0{index + 1}</span>
                  <span className="concept-label">CONCEPT VISUAL</span>
                  <span className="art-open">
                    <ArrowUpRight size={24} />
                  </span>
                </a>
                <div className="project-copy">
                  <span className="eyebrow">{work.category}</span>
                  {work.status && <span className="project-status"><span className="status-dot" />{work.status}</span>}
                  <h3>{work.name}</h3>
                  <p className="project-subtitle">{work.subtitle}</p>
                  <p>{work.description}</p>
                  <ul className="project-features">
                    {work.features.map((feature) => (
                      <li key={feature}>{feature}</li>
                    ))}
                  </ul>
                  <div className="project-tags">
                    {work.tags.map((tag) => (
                      <span key={tag}>{tag}</span>
                    ))}
                  </div>
                  <div className="project-links">
                    {work.links.demo && <a href={work.links.demo} target="_blank" rel="noreferrer">
                      View live project <ArrowUpRight size={17} />
                    </a>}
                    <a
                      href={work.links.github}
                      target="_blank"
                      rel="noreferrer"
                      aria-label={`${work.name} source code on GitHub`}
                    >
                      <BrandIcon brand="github" /> Source
                    </a>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </section>
        <section className="possibility-section">
          <img src="/images/intelligence-core.webp" alt="" loading="lazy" />
          <div className="possibility-content reveal">
            <span className="eyebrow">
              A LITTLE CODE. A LOT OF POSSIBILITY.
            </span>
            <h2>
              The next big thing
              <br />
              starts with a<br />
              <span>curious mind.</span>
            </h2>
            <span className="possibility-note">
              ALWAYS LEARNING. ALWAYS BUILDING.
            </span>
          </div>
          <span className="possibility-star" aria-hidden="true">
            ✳
          </span>
        </section>
        <section id="about" className="section about-section">
          <div className="section-kicker reveal">
            <span>02 / THE PERSON BEHIND THE CODE</span>
            <span>IN CONSTANT DEVELOPMENT</span>
          </div>
          <div className="about-layout">
            <div className="about-copy reveal">
              <div className="eyebrow">HELLO, I’M AKENA.</div>
              <h2>
                A growing engineer.
                <br />
                <span className="gradient-text">An endless curiosity.</span>
              </h2>
              <p>
                I work where software, hardware, and intelligence meet. My
                interest is simple: building systems that sense the world,
                process information, and make something useful happen.
              </p>
              <p>
                As CEO of Holosion Industries, I’m building toward products that
                combine embedded engineering, AI, and connected software. My
                current work spans IoT monitoring, web applications, and machine
                learning foundations.
              </p>
              <p className="about-highlight">
                Not finished learning. Never finished building.
              </p>
              <div className="about-links">
                <a
                  className="text-link"
                  href={socials.linkedin}
                  target="_blank"
                  rel="noreferrer"
                >
                  Connect on LinkedIn <ArrowUpRight size={17} />
                </a>
                <a
                  className="instagram-pill"
                  href={socials.instagram}
                  target="_blank"
                  rel="noreferrer"
                >
                  <BrandIcon brand="instagram" /> @holosion
                </a>
              </div>
            </div>
            <div
              className="portrait-panel reveal"
              onPointerMove={tiltCard}
              onPointerLeave={resetTilt}
            >
              <div className="portrait-frame">
                <img
                  src={profile.photo.src}
                  alt={profile.photo.alt}
                  loading="lazy"
                />
                <div className="portrait-color" />
              </div>
              <span className="portrait-tag">
                <span className="status-dot" /> OPEN TO OPPORTUNITIES
              </span>
              <div className="portrait-caption">
                <strong>AKENA JONATHAN</strong>
                <span>ENGINEER / FOUNDER / EXPLORER</span>
              </div>
              <span className="portrait-spark" aria-hidden="true">
                ✳
              </span>
            </div>
          </div>
        </section>
        <section id="expertise" className="section expertise-section">
          <div className="section-kicker reveal">
            <span>03 / WHAT I BRING</span>
            <span>THINK. CONNECT. BUILD.</span>
          </div>
          <h2 className="reveal">
            Different disciplines.
            <br />
            <span className="gradient-text">One connected vision.</span>
          </h2>
          <div className="expertise-grid">
            {[
              {
                icon: BrainCircuit,
                name: "AI & machine learning",
                number: "01",
                description:
                  "Developing foundations in data analysis, model building, and algorithms. Exploring how intelligent software can solve practical problems.",
                tags: "PYTHON / SCIKIT-LEARN / NUMPY",
                color: "violet",
              },
              {
                icon: Cpu,
                name: "Embedded systems",
                number: "02",
                description:
                  "Connecting microcontrollers, sensors, and firmware. Building responsive hardware that brings real-world information into digital systems.",
                tags: "ESP32 / C & C++ / IOT",
                color: "cyan",
              },
              {
                icon: Code2,
                name: "Software engineering",
                number: "03",
                description:
                  "Turning workflows into usable applications. Building web interfaces and the software layers that connect people, data, and devices.",
                tags: "REACT / JAVASCRIPT / SQL",
                color: "pink",
              },
            ].map(({ icon: Icon, ...item }) => (
              <article
                className={`expertise-card ${item.color} reveal`}
                key={item.number}
                onPointerMove={tiltCard}
                onPointerLeave={resetTilt}
              >
                <div className="card-top">
                  <span className="expertise-icon">
                    <Icon size={30} strokeWidth={1.4} />
                  </span>
                  <span>{item.number}</span>
                </div>
                <h3>{item.name}</h3>
                <p>{item.description}</p>
                <div className="card-tags">{item.tags}</div>
              </article>
            ))}
          </div>
        </section>
        <section className="section toolkit-section" id="toolkit">
          <div className="section-kicker reveal">
            <span>04 / MY TOOLKIT</span>
            <span>LEARNING IS PART OF THE PROCESS</span>
          </div>
          <div className="toolkit-layout">
            <div className="reveal">
              <h2>
                Tools for ideas.
                <br />
                <span className="gradient-text">Skills for impact.</span>
              </h2>
              <p className="toolkit-intro">
                The technologies I work with and keep exploring, from low-level
                firmware to connected applications.
              </p>
            </div>
            <div className="toolkit-list">
              {techStack.map((group) => (
                <div className="toolkit-row reveal" key={group.id}>
                  <span>{group.label}</span>
                  <div>
                    {group.items.map((item) => (
                      <span key={item.name}>{item.name}</span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
        <section id="contact" className="section contact-section">
          <div className="contact-glow" aria-hidden="true" />
          <div className="section-kicker reveal">
            <span>05 / THE NEXT CHAPTER</span>
            <span>LET’S MAKE IT A GOOD ONE</span>
          </div>
          <div className="contact-content reveal">
            <div className="eyebrow">
              <span className="status-dot" /> OPEN TO ROLES, IDEAS &
              COLLABORATION
            </div>
            <a className="contact-title" href={`mailto:${socials.email}`}>
              Have something
              <br />
              in <span className="gradient-text">mind?</span>
              <MoveUpRight />
            </a>
            <p>Let’s turn a good conversation into something worth building.</p>
            <ContactForm />
            <div className="contact-bottom">
              <a className="primary-button" href={`mailto:${socials.email}`}>
                Say hello <ArrowUpRight size={18} />
              </a>
              <a className="email-link" href={`mailto:${socials.email}`}>
                {socials.email}
              </a>
            </div>
            <div className="social-links">
              <a href={socials.githubProfile} target="_blank" rel="noreferrer">
                <BrandIcon brand="github" /> GitHub <ArrowUpRight size={14} />
              </a>
              <a href={socials.linkedin} target="_blank" rel="noreferrer">
                <BrandIcon brand="linkedin" /> LinkedIn{" "}
                <ArrowUpRight size={14} />
              </a>
              <a href={socials.instagram} target="_blank" rel="noreferrer">
                <BrandIcon brand="instagram" /> Instagram / @holosion{" "}
                <ArrowUpRight size={14} />
              </a>
              <a href={socials.x} target="_blank" rel="noreferrer">
                X <ArrowUpRight size={14} />
              </a>
            </div>
          </div>
        </section>
      </main>
      <footer>
        <a className="wordmark" href="#home">
          akena<span className="logo-spark">✳</span>
        </a>
        <span>© 2026 AKENA. BUILT WITH CURIOSITY.</span>
        <a href="#home">
          BACK TO TOP <ArrowUpRight size={14} />
        </a>
      </footer>
    </div>
  );
}
