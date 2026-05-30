"use client";

import { useEffect, useRef } from "react";

interface Particle {
  x: number;
  y: number;
  baseY: number;
  vx: number;
  vy: number;
  size: number;
  opacity: number;
  type: "star" | "dust" | "gold";
  flickerSpeed?: number;
  flickerOffset?: number;
  parallaxFactor?: number;
}

interface NebulaCloud {
  x: number;
  y: number;
  baseY: number;
  radius: number;
  r: number;
  g: number;
  b: number;
  opacity: number;
  phase: number;
  speed: number;
  parallaxFactor: number;
}

interface FloatingFrag {
  x: number;
  y: number;
  baseY: number;
  size: number;
  rotation: number;
  rotSpeed: number;
  opacity: number;
  sides: number;
  drift: number;
  parallaxFactor: number;
}

interface ShootingStar {
  x: number;
  y: number;
  vx: number;
  vy: number;
  length: number;
  opacity: number;
  life: number;
  maxLife: number;
  active: boolean;
}

interface SingularityCluster {
  x: number;
  baseY: number;
  radius: number;
  particles: { angle: number; dist: number; speed: number; size: number; opacity: number }[];
  pulsePhase: number;
  parallaxFactor: number;
}

export default function CosmicCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const particlesRef = useRef<Particle[]>([]);
  const nebulasRef = useRef<NebulaCloud[]>([]);
  const fragsRef = useRef<FloatingFrag[]>([]);
  const shootingRef = useRef<ShootingStar[]>([]);
  const clusterRef = useRef<SingularityCluster[]>([]);
  const mouseRef = useRef({ x: 0, y: 0 });
  const animFrameRef = useRef<number>(0);
  const timeRef = useRef(0);
  const scrollRef = useRef(0);
  const lastShootRef = useRef(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let width = window.innerWidth;
    let height = window.innerHeight;
    canvas.width = width;
    canvas.height = height;

    // ── LAYER 1: Deep Stars ──
    const stars: Particle[] = [];
    for (let i = 0; i < 250; i++) {
      const y = Math.random() * height;
      stars.push({
        x: Math.random() * width,
        y,
        baseY: y,
        vx: (Math.random() - 0.5) * 0.02,
        vy: 0,
        size: Math.random() * 1.3 + 0.15,
        opacity: Math.random() * 0.55 + 0.03,
        type: "star",
        flickerSpeed: 0.4 + Math.random() * 1.8,
        flickerOffset: Math.random() * Math.PI * 2,
        parallaxFactor: 0.02 + Math.random() * 0.06,
      });
    }

    // ── LAYER 2: Enhanced Nebula Clouds ──
    const nebulas: NebulaCloud[] = [
      { x: width * 0.2, y: height * 0.15, baseY: height * 0.15, radius: 280, r: 20, g: 32, b: 61, opacity: 0.05, phase: 0, speed: 0.002, parallaxFactor: 0.08 },
      { x: width * 0.8, y: height * 0.4, baseY: height * 0.4, radius: 320, r: 29, g: 49, b: 96, opacity: 0.04, phase: 1.5, speed: 0.0015, parallaxFactor: 0.06 },
      { x: width * 0.5, y: height * 0.7, baseY: height * 0.7, radius: 240, r: 38, g: 60, b: 122, opacity: 0.025, phase: 3, speed: 0.001, parallaxFactor: 0.05 },
      { x: width * 0.15, y: height * 0.55, baseY: height * 0.55, radius: 180, r: 13, g: 24, b: 53, opacity: 0.045, phase: 4.5, speed: 0.0018, parallaxFactor: 0.07 },
      { x: width * 0.7, y: height * 0.85, baseY: height * 0.85, radius: 200, r: 26, g: 44, b: 90, opacity: 0.03, phase: 2.2, speed: 0.0012, parallaxFactor: 0.04 },
    ];

    // ── LAYER 3: Cosmic Dust ──
    const dust: Particle[] = [];
    for (let i = 0; i < 55; i++) {
      const y = Math.random() * height;
      dust.push({
        x: Math.random() * width,
        y,
        baseY: y,
        vx: (Math.random() - 0.5) * 0.15,
        vy: (Math.random() - 0.5) * 0.1,
        size: Math.random() * 1.6 + 0.2,
        opacity: Math.random() * 0.07 + 0.012,
        type: "dust",
        parallaxFactor: 0.03,
      });
    }

    // ── LAYER 4: Holographic Fragments ──
    const frags: FloatingFrag[] = [];
    for (let i = 0; i < 10; i++) {
      const y = Math.random() * height;
      frags.push({
        x: Math.random() * width,
        y,
        baseY: y,
        size: Math.random() * 10 + 2,
        rotation: Math.random() * Math.PI * 2,
        rotSpeed: (Math.random() - 0.5) * 0.005,
        opacity: Math.random() * 0.035 + 0.006,
        sides: Math.random() > 0.6 ? 3 : Math.random() > 0.3 ? 4 : 6,
        drift: (Math.random() - 0.5) * 0.15,
        parallaxFactor: 0.04 + Math.random() * 0.03,
      });
    }

    // ── LAYER 5: Shooting Stars ──
    const shootingStars: ShootingStar[] = [];
    for (let i = 0; i < 3; i++) {
      shootingStars.push({
        x: 0, y: 0, vx: 0, vy: 0, length: 0,
        opacity: 0, life: 0, maxLife: 0, active: false,
      });
    }

    // ── LAYER 6: Golden Singularity Clusters ──
    const clusters: SingularityCluster[] = [
      {
        x: width * 0.5, baseY: height * 0.5, radius: 35,
        particles: Array.from({ length: 16 }, () => ({
          angle: Math.random() * Math.PI * 2,
          dist: 12 + Math.random() * 50,
          speed: 0.003 + Math.random() * 0.007,
          size: Math.random() * 1.3 + 0.3,
          opacity: Math.random() * 0.4 + 0.08,
        })),
        pulsePhase: 0,
        parallaxFactor: 0.1,
      },
    ];

    // ── LAYER 7: Golden Particles ──
    const gold: Particle[] = [];
    for (let i = 0; i < 40; i++) {
      const y = Math.random() * height;
      gold.push({
        x: Math.random() * width,
        y,
        baseY: y,
        vx: (Math.random() - 0.5) * 0.1,
        vy: -Math.random() * 0.18 - 0.02,
        size: Math.random() * 1.8 + 0.4,
        opacity: Math.random() * 0.3 + 0.03,
        type: "gold",
        parallaxFactor: 0.05 + Math.random() * 0.04,
      });
    }

    particlesRef.current = [...stars, ...dust, ...gold];
    nebulasRef.current = nebulas;
    fragsRef.current = frags;
    shootingRef.current = shootingStars;
    clusterRef.current = clusters;

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

    // Wrap Y coordinate within viewport with parallax
    function wrapY(baseY: number, parallaxFactor: number): number {
      const offset = scrollRef.current * parallaxFactor;
      const y = baseY - offset;
      // Wrap within viewport
      return ((y % height) + height) % height;
    }

    function spawnShootingStar() {
      const star = shootingRef.current.find(s => !s.active);
      if (!star) return;
      const angle = Math.PI * 0.15 + Math.random() * Math.PI * 0.2;
      const speed = 4 + Math.random() * 6;
      star.x = Math.random() * width;
      star.y = Math.random() * height * 0.5;
      star.vx = Math.cos(angle) * speed;
      star.vy = Math.sin(angle) * speed;
      star.length = 40 + Math.random() * 80;
      star.opacity = 0.5 + Math.random() * 0.4;
      star.life = 0;
      star.maxLife = 30 + Math.random() * 40;
      star.active = true;
    }

    function drawFrame() {
      if (!canvas || !ctx) return;
      timeRef.current += 0.01;

      // Clear with trail effect
      ctx.fillStyle = "rgba(5, 5, 5, 0.2)";
      ctx.fillRect(0, 0, width, height);

      // ── LAYER 2: Nebulas ──
      nebulasRef.current.forEach((n) => {
        n.phase += n.speed;
        const op = n.opacity * (0.5 + 0.5 * Math.sin(n.phase));
        const ny = wrapY(n.baseY, n.parallaxFactor);
        const g = ctx.createRadialGradient(n.x, ny, 0, n.x, ny, n.radius);
        g.addColorStop(0, `rgba(${n.r}, ${n.g}, ${n.b}, ${op})`);
        g.addColorStop(0.5, `rgba(${n.r}, ${n.g}, ${n.b}, ${op * 0.4})`);
        g.addColorStop(1, "transparent");
        ctx.fillStyle = g;
        ctx.fillRect(0, 0, width, height);
      });

      // ── LAYER 5: Shooting Stars ──
      if (timeRef.current - lastShootRef.current > 4 + Math.random() * 6) {
        spawnShootingStar();
        lastShootRef.current = timeRef.current;
      }
      shootingRef.current.forEach((s) => {
        if (!s.active) return;
        s.x += s.vx;
        s.y += s.vy;
        s.life++;
        const progress = s.life / s.maxLife;
        const fadeOut = progress > 0.7 ? 1 - (progress - 0.7) / 0.3 : 1;
        const fadeIn = Math.min(s.life / 5, 1);
        const op = s.opacity * fadeOut * fadeIn;

        ctx.beginPath();
        ctx.moveTo(s.x, s.y);
        ctx.lineTo(s.x - s.vx * (s.length / 10), s.y - s.vy * (s.length / 10));
        const grad = ctx.createLinearGradient(s.x, s.y, s.x - s.vx * (s.length / 10), s.y - s.vy * (s.length / 10));
        grad.addColorStop(0, `rgba(255, 220, 130, ${op})`);
        grad.addColorStop(1, "rgba(255, 195, 0, 0)");
        ctx.strokeStyle = grad;
        ctx.lineWidth = 1.5;
        ctx.stroke();

        ctx.beginPath();
        ctx.arc(s.x, s.y, 2, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255, 235, 180, ${op})`;
        ctx.shadowBlur = 8;
        ctx.shadowColor = `rgba(255, 195, 0, ${op * 0.5})`;
        ctx.fill();
        ctx.shadowBlur = 0;

        if (s.life >= s.maxLife) s.active = false;
      });

      // ── LAYER 4: Holographic Fragments ──
      fragsRef.current.forEach((f) => {
        f.rotation += f.rotSpeed;
        f.y += f.drift * 0.2;
        f.x += Math.sin(timeRef.current + f.x * 0.008) * 0.06;

        // Keep fragment within viewport
        if (f.y > height + 20) { f.y = -20; f.baseY = -20; f.x = Math.random() * width; }
        if (f.y < -20) { f.y = height + 20; f.baseY = height + 20; f.x = Math.random() * width; }

        const fy = wrapY(f.baseY, f.parallaxFactor);
        drawPolygon(f.x, fy, f.size, f.sides, f.rotation);
        ctx.strokeStyle = `rgba(255, 195, 0, ${f.opacity})`;
        ctx.lineWidth = 0.4;
        ctx.stroke();
      });

      // ── LAYER 6: Singularity Clusters ──
      clusterRef.current.forEach((cl) => {
        cl.pulsePhase += 0.012;
        const cy = wrapY(cl.baseY, cl.parallaxFactor);
        const pulse = 0.7 + 0.3 * Math.sin(cl.pulsePhase);

        const cg = ctx.createRadialGradient(cl.x, cy, 0, cl.x, cy, cl.radius * 1.5);
        cg.addColorStop(0, `rgba(255, 195, 0, ${0.05 * pulse})`);
        cg.addColorStop(0.3, `rgba(255, 195, 0, ${0.015 * pulse})`);
        cg.addColorStop(1, "transparent");
        ctx.fillStyle = cg;
        ctx.fillRect(cl.x - cl.radius * 2, cy - cl.radius * 2, cl.radius * 4, cl.radius * 4);

        cl.particles.forEach((p) => {
          p.angle += p.speed;
          const px = cl.x + Math.cos(p.angle) * p.dist;
          const py = cy + Math.sin(p.angle) * p.dist * 0.6;
          ctx.beginPath();
          ctx.arc(px, py, p.size, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(255, 195, 0, ${p.opacity * pulse})`;
          ctx.shadowBlur = 3;
          ctx.shadowColor = `rgba(255, 195, 0, ${p.opacity * 0.25})`;
          ctx.fill();
          ctx.shadowBlur = 0;
        });
      });

      // ── LAYERS 1, 3, 7: All Particles ──
      particlesRef.current.forEach((p) => {
        p.x += p.vx;
        p.y += p.vy;

        // Mouse influence for gold
        if (p.type === "gold") {
          const dx = mouseRef.current.x - p.x;
          const dy = mouseRef.current.y - p.y;
          const d = Math.sqrt(dx * dx + dy * dy);
          if (d < 120) { p.vx += dx * 0.000025; p.vy += dy * 0.000025; }
        }

        // Wrap within viewport
        if (p.x < -10) p.x = width + 10;
        if (p.x > width + 10) p.x = -10;
        if (p.y < -10) { p.y = height + 10; p.baseY = p.y; }
        if (p.y > height + 10) { p.y = -10; p.baseY = p.y; }
        p.baseY += p.vy;

        let flicker = 1;
        if (p.type === "star" && p.flickerSpeed) {
          flicker = 0.5 + 0.5 * Math.sin(timeRef.current * p.flickerSpeed + (p.flickerOffset || 0));
        }
        const op = p.opacity * flicker;

        const renderY = p.type === "star"
          ? wrapY(p.baseY, p.parallaxFactor || 0.04)
          : p.y;

        ctx.beginPath();
        ctx.arc(p.x, renderY, p.size, 0, Math.PI * 2);

        if (p.type === "gold") {
          ctx.fillStyle = `rgba(255, 195, 0, ${op})`;
          ctx.shadowBlur = 6;
          ctx.shadowColor = "rgba(255,195,0,0.25)";
        } else if (p.type === "dust") {
          ctx.fillStyle = `rgba(20, 32, 61, ${op})`;
          ctx.shadowBlur = 0;
        } else {
          ctx.fillStyle = `rgba(255, 255, 255, ${op})`;
          ctx.shadowBlur = p.size > 0.8 ? 1.5 : 0;
          ctx.shadowColor = "rgba(255,255,255,0.08)";
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
