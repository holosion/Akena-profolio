import { useEffect, useRef, useState } from "react";
import { ArrowDown, BrainCircuit, Cpu, Network } from "lucide-react";
import SpatialScene from "./SpatialScene";
import { usePrefersReducedMotion } from "../hooks/usePrefersReducedMotion";

const chapters = [
  {
    number: "01",
    title: "It starts with intelligence.",
    accent: "intelligence.",
    label: "ARTIFICIAL INTELLIGENCE",
    description:
      "Finding patterns. Asking better questions. Exploring how data and machine learning turn information into understanding.",
    tools: "PYTHON · SCIKIT-LEARN · DATA",
    icon: BrainCircuit,
  },
  {
    number: "02",
    title: "Then it touches the world.",
    accent: "the world.",
    label: "EMBEDDED ENGINEERING",
    description:
      "Taking intelligence beyond the screen. Connecting sensors, microcontrollers, and firmware to the things that matter.",
    tools: "ESP32 · C/C++ · SENSORS",
    icon: Cpu,
  },
  {
    number: "03",
    title: "And everything connects.",
    accent: "connects.",
    label: "CONNECTED SOFTWARE",
    description:
      "Bringing the whole system together. Building software experiences that make complex technology useful to people.",
    tools: "REACT · SQL · IOT",
    icon: Network,
  },
];

export default function ScrollJourney() {
  const ref = useRef<HTMLElement>(null);
  const [chapter, setChapter] = useState(0);
  const reduced = usePrefersReducedMotion();
  useEffect(() => {
    let frame = 0;
    const update = () => {
      frame = 0;
      const section = ref.current;
      if (!section) return;
      const p = Math.max(
        0,
        Math.min(
          1,
          -section.getBoundingClientRect().top /
            Math.max(1, section.offsetHeight - innerHeight),
        ),
      );
      section.style.setProperty("--journey-progress", String(p));
      setChapter(p < 0.32 ? 0 : p < 0.68 ? 1 : 2);
    };
    const scroll = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };
    window.addEventListener("scroll", scroll, { passive: true });
    window.addEventListener("resize", scroll);
    update();
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("scroll", scroll);
      window.removeEventListener("resize", scroll);
    };
  }, []);
  return (
    <section
      className={`journey-section chapter-${chapter}`}
      id="experience"
      ref={ref}
      aria-label="Scroll through my engineering disciplines"
    >
      <div className="journey-sticky">
        <div className="journey-heading">
          <span className="eyebrow">
            THE INTERSECTION / AN INTERACTIVE JOURNEY
          </span>
          <span className="journey-scroll">
            KEEP SCROLLING <ArrowDown size={14} />
          </span>
        </div>
        <div className="journey-visual">
          <div className="journey-orbit" />
          <SpatialScene mode="journey" />
          <span className="journey-coordinates">IDEA → PROTOTYPE → SYSTEM</span>
        </div>
        <div className="journey-copy">
          {chapters.map((item, i) => {
            const Icon = item.icon;
            const prefix = item.title.slice(0, item.title.indexOf(item.accent));
            return (
              <div
                className={`journey-chapter ${i === chapter ? "active" : ""}`}
                key={item.number}
                aria-hidden={!reduced && i !== chapter}
              >
                <div className="eyebrow">
                  <Icon size={16} /> {item.label}
                </div>
                <h2>
                  {prefix}
                  <span>{item.accent}</span>
                </h2>
                <p>{item.description}</p>
                <span className="journey-tools">{item.tools}</span>
              </div>
            );
          })}
        </div>
        <div className="chapter-track">
          {chapters.map((item, i) => (
            <div className={chapter === i ? "current" : ""} key={item.number}>
              <span>{item.number}</span>
              <span>{item.label}</span>
            </div>
          ))}
          <div className="chapter-progress">
            <i />
          </div>
        </div>
      </div>
    </section>
  );
}
