import { useEffect, useRef } from 'react';
import './Ballpit.css';

type BallpitProps = {
  className?: string;
  followCursor?: boolean;
  count?: number;
  colors?: string[];
};

type Ball = {
  x: number;
  y: number;
  vx: number;
  vy: number;
  r: number;
  color: string;
};

const DEFAULT_COLORS = ['#4ee4c8', '#2a9d8f', '#c4b5a0', '#7aa2c4', '#1b3a4b'];

export default function Ballpit({
  className = '',
  followCursor = true,
  count = 18,
  colors = DEFAULT_COLORS,
}: BallpitProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    const parent = canvas.parentElement;
    if (!parent) return;

    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const pointer = { x: 0, y: 0, active: false };
    let balls: Ball[] = [];
    let raf = 0;
    let visible = true;

    function resize() {
      const dpr = Math.min(window.devicePixelRatio || 1, 1.5);
      canvas.width = parent.clientWidth * dpr;
      canvas.height = parent.clientHeight * dpr;
      canvas.style.width = `${parent.clientWidth}px`;
      canvas.style.height = `${parent.clientHeight}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      const w = parent.clientWidth;
      const h = parent.clientHeight;
      balls = Array.from({ length: count }, (_, i) => ({
        x: Math.random() * w,
        y: Math.random() * h,
        vx: (Math.random() - 0.5) * 1.2,
        vy: (Math.random() - 0.5) * 1.2,
        r: 8 + (i % 5) * 3.5,
        color: colors[i % colors.length],
      }));
    }

    function step() {
      raf = requestAnimationFrame(step);
      if (!visible || document.hidden) return;
      const w = parent.clientWidth;
      const h = parent.clientHeight;
      ctx.clearRect(0, 0, w, h);
      for (const b of balls) {
        if (!reduce) {
          b.vy += 0.12;
          if (followCursor && pointer.active) {
            const dx = pointer.x - b.x;
            const dy = pointer.y - b.y;
            const d = Math.hypot(dx, dy) || 1;
            b.vx += (dx / d) * 0.08;
            b.vy += (dy / d) * 0.08;
          }
          b.x += b.vx;
          b.y += b.vy;
          if (b.x < b.r) {
            b.x = b.r;
            b.vx *= -0.78;
          }
          if (b.x > w - b.r) {
            b.x = w - b.r;
            b.vx *= -0.78;
          }
          if (b.y < b.r) {
            b.y = b.r;
            b.vy *= -0.7;
          }
          if (b.y > h - b.r) {
            b.y = h - b.r;
            b.vy *= -0.72;
            b.vx *= 0.98;
          }
        }
        const g = ctx.createRadialGradient(b.x - b.r * 0.3, b.y - b.r * 0.35, 2, b.x, b.y, b.r);
        g.addColorStop(0, '#e8fff8');
        g.addColorStop(0.45, b.color);
        g.addColorStop(1, '#0b1c22');
        ctx.beginPath();
        ctx.arc(b.x, b.y, b.r, 0, Math.PI * 2);
        ctx.fillStyle = g;
        ctx.globalAlpha = 0.9;
        ctx.fill();
      }
    }

    resize();
    const ro = new ResizeObserver(resize);
    ro.observe(parent);
    const io = new IntersectionObserver((e) => {
      visible = e[0]?.isIntersecting ?? false;
    });
    io.observe(parent);
    function onMove(e: PointerEvent) {
      const r = parent.getBoundingClientRect();
      pointer.x = e.clientX - r.left;
      pointer.y = e.clientY - r.top;
      pointer.active = true;
    }
    function onLeave() {
      pointer.active = false;
    }
    parent.addEventListener('pointermove', onMove);
    parent.addEventListener('pointerleave', onLeave);
    raf = requestAnimationFrame(step);

    return () => {
      cancelAnimationFrame(raf);
      ro.disconnect();
      io.disconnect();
      parent.removeEventListener('pointermove', onMove);
      parent.removeEventListener('pointerleave', onLeave);
    };
  }, [colors, count, followCursor]);

  return <canvas ref={canvasRef} className={`ballpit-canvas ${className}`} />;
}
