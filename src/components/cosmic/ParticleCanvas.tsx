"use client";

import { useEffect, useRef } from "react";

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  opacity: number;
  type: "star" | "dust" | "gold" | "holo" | "orbit";
  angle?: number;
  radius?: number;
  centerX?: number;
  centerY?: number;
  rotSpeed?: number;
}

interface NebulaCloud {
  x: number;
  y: number;
  radius: number;
  color: string;
  opacity: number;
  phase: number;
  speed: number;
}

interface FloatingFrag {
  x: number;
  y: number;
  size: number;
  rotation: number;
  rotSpeed: number;
  opacity: number;
  sides: number;
  drift: number;
}

interface DistantPlanet {
  x: number;
  y: number;
  radius: number;
  color: string;
  glowColor: string;
  opacity: number;
  speed: number;
  orbitAngle: number;
  orbitRadius: number;
  orbitCenterX: number;
  orbitCenterY: number;
}

export default function ParticleCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const particlesRef = useRef<Particle[]>([]);
  const nebulasRef = useRef<NebulaCloud[]>([]);
  const fragsRef = useRef<FloatingFrag[]>([]);
  const planetsRef = useRef<DistantPlanet[]>([]);
  const mouseRef = useRef({ x: 0, y: 0 });
  const animFrameRef = useRef<number>(0);
  const timeRef = useRef(0);
  const scrollRef = useRef(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let width = window.innerWidth;
    let height = window.innerHeight;
    canvas.width = width;
    canvas.height = height;

    // ── LAYER 1: Distant Stars ──
    const stars: Particle[] = [];
    for (let i = 0; i < 160; i++) {
      stars.push({
        x: Math.random() * width,
        y: Math.random() * height * 5, // tall for scroll
        vx: (Math.random() - 0.5) * 0.05,
        vy: 0,
        size: Math.random() * 1.2 + 0.2,
        opacity: Math.random() * 0.5 + 0.05,
        type: "star",
      });
    }

    // ── LAYER 2: Nebula Clouds ──
    const nebulas: NebulaCloud[] = [
      { x: width * 0.25, y: height * 0.15, radius: 220, color: "#14203D", opacity: 0.045, phase: 0, speed: 0.002 },
      { x: width * 0.75, y: height * 0.45, radius: 280, color: "#1D3160", opacity: 0.035, phase: 1.5, speed: 0.0015 },
      { x: width * 0.5, y: height * 0.75, radius: 200, color: "#263C7A", opacity: 0.025, phase: 3, speed: 0.001 },
      { x: width * 0.15, y: height * 0.6, radius: 160, color: "#0D1835", opacity: 0.04, phase: 4.5, speed: 0.0018 },
    ];

    // ── LAYER 3: Cosmic Dust ──
    const dust: Particle[] = [];
    for (let i = 0; i < 50; i++) {
      dust.push({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 0.2,
        vy: (Math.random() - 0.5) * 0.15,
        size: Math.random() * 1.5 + 0.3,
        opacity: Math.random() * 0.1 + 0.02,
        type: "dust",
      });
    }

    // ── LAYER 4: Holographic Fragments ──
    const frags: FloatingFrag[] = [];
    for (let i = 0; i < 8; i++) {
      frags.push({
        x: Math.random() * width,
        y: Math.random() * height,
        size: Math.random() * 8 + 3,
        rotation: Math.random() * Math.PI * 2,
        rotSpeed: (Math.random() - 0.5) * 0.008,
        opacity: Math.random() * 0.06 + 0.01,
        sides: Math.random() > 0.5 ? 3 : 4,
        drift: (Math.random() - 0.5) * 0.3,
      });
    }

    // ── LAYER 5: Distant Planets ──
    const planets: DistantPlanet[] = [
      {
        x: 0, y: 0,
        radius: 6, color: "#1D3160", glowColor: "rgba(29,49,96,0.15)",
        opacity: 0.4, speed: 0.0003, orbitAngle: 0,
        orbitRadius: 120, orbitCenterX: width * 0.7, orbitCenterY: height * 0.25,
      },
      {
        x: 0, y: 0,
        radius: 3, color: "#263C7A", glowColor: "rgba(38,60,122,0.1)",
        opacity: 0.25, speed: 0.0005, orbitAngle: 2,
        orbitRadius: 80, orbitCenterX: width * 0.3, orbitCenterY: height * 0.65,
      },
    ];

    // ── LAYER 6: Golden Orbiting Particles ──
    const goldOrbs: Particle[] = [];
    for (let i = 0; i < 25; i++) {
      goldOrbs.push({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 0.15,
        vy: -Math.random() * 0.25 - 0.05,
        size: Math.random() * 1.8 + 0.5,
        opacity: Math.random() * 0.4 + 0.05,
        type: "gold",
      });
    }

    particlesRef.current = [...stars, ...dust, ...goldOrbs];
    nebulasRef.current = nebulas;
    fragsRef.current = frags;
    planetsRef.current = planets;

    const handleResize = () => {
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = width;
      canvas.height = height;
    };
    const handleMouseMove = (e: MouseEvent) => { mouseRef.current = { x: e.clientX, y: e.clientY }; };
    const handleTouchMove = (e: TouchEvent) => { if (e.touches[0]) mouseRef.current = { x: e.touches[0].clientX, y: e.touches[0].clientY }; };
    const handleScroll = () => { scrollRef.current = window.scrollY; };

    window.addEventListener("resize", handleResize);
    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("touchmove", handleTouchMove, { passive: true });
    window.addEventListener("scroll", handleScroll, { passive: true });

    function drawPolygon(cx: number, cy: number, r: number, sides: number, rot: number) {
      if (!ctx) return;
      ctx.beginPath();
      for (let i = 0; i <= sides; i++) {
        const angle = (i * 2 * Math.PI) / sides + rot;
        const px = cx + r * Math.cos(angle);
        const py = cy + r * Math.sin(angle);
        if (i === 0) ctx.moveTo(px, py);
        else ctx.lineTo(px, py);
      }
      ctx.closePath();
    }

    function drawFrame() {
      if (!canvas || !ctx) return;
      timeRef.current += 0.01;

      // Clear
      ctx.fillStyle = "rgba(5, 5, 5, 0.18)";
      ctx.fillRect(0, 0, width, height);

      // ── Draw LAYER 2: Nebulas ──
      nebulasRef.current.forEach((n) => {
        n.phase += n.speed;
        const op = n.opacity * (0.5 + 0.5 * Math.sin(n.phase));
        const g = ctx.createRadialGradient(n.x, n.y, 0, n.x, n.y, n.radius);
        const h1 = Math.floor(op * 255).toString(16).padStart(2, "0");
        const h2 = Math.floor(op * 128).toString(16).padStart(2, "0");
        g.addColorStop(0, n.color + h1);
        g.addColorStop(0.5, n.color + h2);
        g.addColorStop(1, "transparent");
        ctx.fillStyle = g;
        ctx.fillRect(0, 0, width, height);
      });

      // ── Draw LAYER 5: Planets ──
      planetsRef.current.forEach((p) => {
        p.orbitAngle += p.speed;
        p.x = p.orbitCenterX + Math.cos(p.orbitAngle) * p.orbitRadius;
        p.y = p.orbitCenterY + Math.sin(p.orbitAngle) * p.orbitRadius;
        // Glow
        const pg = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, p.radius * 3);
        pg.addColorStop(0, p.glowColor);
        pg.addColorStop(1, "transparent");
        ctx.fillStyle = pg;
        ctx.fillRect(p.x - p.radius * 3, p.y - p.radius * 3, p.radius * 6, p.radius * 6);
        // Body
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fillStyle = p.color;
        ctx.globalAlpha = p.opacity;
        ctx.fill();
        ctx.globalAlpha = 1;
      });

      // ── Draw LAYER 4: Holographic Fragments ──
      fragsRef.current.forEach((f) => {
        f.rotation += f.rotSpeed;
        f.y += f.drift * 0.3;
        f.x += Math.sin(timeRef.current + f.x * 0.01) * 0.1;
        if (f.y > height + 20) { f.y = -20; f.x = Math.random() * width; }
        if (f.y < -20) { f.y = height + 20; f.x = Math.random() * width; }
        drawPolygon(f.x, f.y, f.size, f.sides, f.rotation);
        ctx.strokeStyle = `rgba(255, 195, 0, ${f.opacity})`;
        ctx.lineWidth = 0.5;
        ctx.stroke();
      });

      // ── Draw ALL Particles (Layers 1, 3, 6) ──
      particlesRef.current.forEach((p) => {
        p.x += p.vx;
        p.y += p.vy;

        // Mouse influence for gold
        if (p.type === "gold") {
          const dx = mouseRef.current.x - p.x;
          const dy = mouseRef.current.y - p.y;
          const d = Math.sqrt(dx * dx + dy * dy);
          if (d < 120) { p.vx += dx * 0.00004; p.vy += dy * 0.00004; }
        }

        if (p.x < -10) p.x = width + 10;
        if (p.x > width + 10) p.x = -10;
        if (p.y < -10) p.y = height + 10;
        if (p.y > height + 10) p.y = -10;

        const flicker = p.type === "star" ? 0.6 + 0.4 * Math.sin(timeRef.current * 1.5 + p.x * 0.3) : 1;
        const op = p.opacity * flicker;

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);

        if (p.type === "gold") {
          ctx.fillStyle = `rgba(255, 195, 0, ${op})`;
          ctx.shadowBlur = 10;
          ctx.shadowColor = "rgba(255,195,0,0.35)";
        } else if (p.type === "dust") {
          ctx.fillStyle = `rgba(20, 32, 61, ${op})`;
          ctx.shadowBlur = 0;
        } else {
          ctx.fillStyle = `rgba(255, 255, 255, ${op})`;
          ctx.shadowBlur = 1;
          ctx.shadowColor = "rgba(255,255,255,0.15)";
        }
        ctx.fill();
        ctx.shadowBlur = 0;
      });

      animFrameRef.current = requestAnimationFrame(drawFrame);
    }

    animFrameRef.current = requestAnimationFrame(drawFrame);

    return () => {
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("touchmove", handleTouchMove);
      window.removeEventListener("scroll", handleScroll);
      cancelAnimationFrame(animFrameRef.current);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 z-0 pointer-events-none"
      style={{ background: "#050505" }}
    />
  );
}
