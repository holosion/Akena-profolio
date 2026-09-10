import { useEffect, useRef } from 'react';
import './AeroShards.css';

type AeroShardsProps = {
  shardColor?: string;
  accentColor?: string;
  className?: string;
};

type Shard = {
  x: number;
  y: number;
  vx: number;
  vy: number;
  r: number;
  rot: number;
  vr: number;
  sides: number;
};

export default function AeroShards({
  shardColor = '#7dd3c7',
  accentColor = '#c4b5a0',
  className = '',
}: AeroShardsProps) {
  const wrapRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const wrap = wrapRef.current;
    const canvas = canvasRef.current;
    if (!wrap || !canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const pointer = { x: 0.5, y: 0.5, active: 0 };
    let shards: Shard[] = [];
    let raf = 0;
    let visible = true;

    function resize() {
      const dpr = Math.min(window.devicePixelRatio || 1, 1.5);
      canvas.width = wrap.clientWidth * dpr;
      canvas.height = wrap.clientHeight * dpr;
      canvas.style.width = `${wrap.clientWidth}px`;
      canvas.style.height = `${wrap.clientHeight}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      const count = Math.min(48, Math.floor((wrap.clientWidth * wrap.clientHeight) / 18000));
      shards = Array.from({ length: count }, (_, i) => ({
        x: Math.random() * wrap.clientWidth,
        y: Math.random() * wrap.clientHeight,
        vx: (Math.random() - 0.5) * 0.35,
        vy: (Math.random() - 0.5) * 0.35,
        r: 6 + (i % 7) * 2.2,
        rot: Math.random() * Math.PI,
        vr: (Math.random() - 0.5) * 0.01,
        sides: 3 + (i % 3),
      }));
    }

    function draw() {
      raf = requestAnimationFrame(draw);
      if (!visible || document.hidden) return;
      const w = wrap.clientWidth;
      const h = wrap.clientHeight;
      ctx.clearRect(0, 0, w, h);
      const mx = pointer.x * w;
      const my = pointer.y * h;
      for (const s of shards) {
        if (!reduce) {
          const dx = s.x - mx;
          const dy = s.y - my;
          const dist = Math.hypot(dx, dy) + 8;
          const force = pointer.active * 420 / (dist * dist);
          s.vx += (dx / dist) * force;
          s.vy += (dy / dist) * force;
          s.vx += 0.04;
          s.x += s.vx;
          s.y += s.vy;
          s.rot += s.vr;
          s.vx *= 0.96;
          s.vy *= 0.96;
          if (s.x < -20) s.x = w + 20;
          if (s.x > w + 20) s.x = -20;
          if (s.y < -20) s.y = h + 20;
          if (s.y > h + 20) s.y = -20;
        }
        ctx.save();
        ctx.translate(s.x, s.y);
        ctx.rotate(s.rot);
        ctx.beginPath();
        for (let i = 0; i < s.sides; i++) {
          const a = (i / s.sides) * Math.PI * 2;
          const px = Math.cos(a) * s.r;
          const py = Math.sin(a) * s.r * 0.55;
          if (i === 0) ctx.moveTo(px, py);
          else ctx.lineTo(px, py);
        }
        ctx.closePath();
        ctx.fillStyle = s.sides === 3 ? shardColor : accentColor;
        ctx.globalAlpha = 0.22;
        ctx.fill();
        ctx.globalAlpha = 0.55;
        ctx.strokeStyle = shardColor;
        ctx.lineWidth = 1;
        ctx.stroke();
        ctx.restore();
      }
    }

    resize();
    wrap.dataset.ready = 'true';
    const ro = new ResizeObserver(resize);
    ro.observe(wrap);
    const io = new IntersectionObserver((e) => {
      visible = e[0]?.isIntersecting ?? false;
    });
    io.observe(wrap);
    function onMove(e: PointerEvent) {
      const r = wrap.getBoundingClientRect();
      pointer.x = (e.clientX - r.left) / r.width;
      pointer.y = (e.clientY - r.top) / r.height;
      pointer.active = 1;
    }
    function onLeave() {
      pointer.active = 0;
    }
    wrap.addEventListener('pointermove', onMove);
    wrap.addEventListener('pointerleave', onLeave);
    raf = requestAnimationFrame(draw);

    return () => {
      cancelAnimationFrame(raf);
      ro.disconnect();
      io.disconnect();
      wrap.removeEventListener('pointermove', onMove);
      wrap.removeEventListener('pointerleave', onLeave);
    };
  }, [accentColor, shardColor]);

  return (
    <div ref={wrapRef} className={`aero-shards ${className}`}>
      <canvas ref={canvasRef} className="aero-shards__canvas" />
    </div>
  );
}
