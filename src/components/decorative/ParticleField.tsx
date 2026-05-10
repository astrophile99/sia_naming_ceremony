"use client";

import { useEffect, useRef } from "react";

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  alpha: number;
  size: number;
  color: string;
  life: number;
  maxLife: number;
}

const COLORS = [
  "rgba(244, 143, 177, ",
  "rgba(240, 98, 146, ",
  "rgba(255, 193, 7, ",
  "rgba(165, 214, 167, ",
  "rgba(255, 255, 255, ",
];

// Disable particles on mobile to save battery and improve performance
const isMobileDevice = () =>
  typeof window !== "undefined" && window.innerWidth < 768;

export default function ParticleField() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animRef = useRef<number>(0);
  const particlesRef = useRef<Particle[]>([]);
  const mouseRef = useRef({ x: -1000, y: -1000 });
  const frameRef = useRef(0);

  useEffect(() => {
    if (isMobileDevice()) return; // skip entirely on mobile

    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d", { alpha: true });
    if (!ctx) return;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener("resize", resize, { passive: true });

    const handleMouseMove = (e: MouseEvent) => {
      mouseRef.current = { x: e.clientX, y: e.clientY };
    };
    window.addEventListener("mousemove", handleMouseMove, { passive: true });

    const spawnParticle = (x?: number, y?: number): Particle => ({
      x: x ?? Math.random() * canvas.width,
      y: y ?? Math.random() * canvas.height,
      vx: (Math.random() - 0.5) * 0.5,
      vy: -Math.random() * 0.6 - 0.15,
      alpha: Math.random() * 0.5 + 0.2,
      size: Math.random() * 3 + 1,
      color: COLORS[Math.floor(Math.random() * COLORS.length)],
      life: 0,
      maxLife: 100 + Math.random() * 160,
    });

    // Init with fewer particles
    for (let i = 0; i < 25; i++) {
      particlesRef.current.push(spawnParticle());
    }

    const animate = () => {
      frameRef.current++;
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Spawn less frequently, keep lower cap
      if (frameRef.current % 5 === 0 && particlesRef.current.length < 35) {
        particlesRef.current.push(spawnParticle());
      }
      if (frameRef.current % 15 === 0) {
        particlesRef.current.push(
          spawnParticle(
            mouseRef.current.x + (Math.random() - 0.5) * 30,
            mouseRef.current.y + (Math.random() - 0.5) * 30
          )
        );
      }

      particlesRef.current = particlesRef.current.filter((p) => {
        p.life++;
        p.x += p.vx;
        p.y += p.vy;

        const progress = p.life / p.maxLife;
        const a = p.alpha * (1 - progress) * Math.sin(progress * Math.PI);
        if (p.life >= p.maxLife || a <= 0) return false;

        ctx.save();
        ctx.globalAlpha = a;
        ctx.translate(p.x, p.y);
        ctx.beginPath();
        ctx.arc(0, 0, p.size, 0, Math.PI * 2);
        ctx.fillStyle = `${p.color}${a})`;
        ctx.fill();
        ctx.restore();
        return true;
      });

      animRef.current = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      cancelAnimationFrame(animRef.current);
      window.removeEventListener("resize", resize);
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

  // Don't render canvas on mobile
  if (typeof window !== "undefined" && isMobileDevice()) return null;

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-10"
      aria-hidden="true"
    />
  );
}
