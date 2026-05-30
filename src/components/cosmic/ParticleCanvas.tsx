"use client";

import { useEffect, useRef } from "react";

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  opacity: number;
  type: "star" | "dust" | "gold";
}

interface Nebula {
  x: number;
  y: number;
  radius: number;
  color: string;
  opacity: number;
  phase: number;
  speed: number;
}

export default function ParticleCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const particlesRef = useRef<Particle[]>([]);
  const nebulasRef = useRef<Nebula[]>([]);
  const mouseRef = useRef({ x: 0, y: 0 });
  const animFrameRef = useRef<number>(0);
  const timeRef = useRef(0);

  function createParticles(width: number, height: number): Particle[] {
    const particles: Particle[] = [];
    for (let i = 0; i < 120; i++) {
      particles.push({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 0.15,
        vy: (Math.random() - 0.5) * 0.1,
        size: Math.random() * 1.5 + 0.3,
        opacity: Math.random() * 0.6 + 0.1,
        type: "star",
      });
    }
    for (let i = 0; i < 40; i++) {
      particles.push({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 0.3,
        vy: (Math.random() - 0.5) * 0.2,
        size: Math.random() * 2 + 0.5,
        opacity: Math.random() * 0.15 + 0.03,
        type: "dust",
      });
    }
    for (let i = 0; i < 15; i++) {
      particles.push({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 0.2,
        vy: -Math.random() * 0.3 - 0.1,
        size: Math.random() * 2 + 1,
        opacity: Math.random() * 0.5 + 0.1,
        type: "gold",
      });
    }
    return particles;
  }

  function createNebulas(width: number, height: number): Nebula[] {
    return [
      {
        x: width * 0.3,
        y: height * 0.2,
        radius: 200,
        color: "#1B2A4E",
        opacity: 0.04,
        phase: 0,
        speed: 0.002,
      },
      {
        x: width * 0.7,
        y: height * 0.6,
        radius: 250,
        color: "#263C7A",
        opacity: 0.03,
        phase: 1.5,
        speed: 0.0015,
      },
      {
        x: width * 0.5,
        y: height * 0.8,
        radius: 180,
        color: "#0D1835",
        opacity: 0.05,
        phase: 3,
        speed: 0.001,
      },
    ];
  }

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let width = window.innerWidth;
    let height = window.innerHeight;
    canvas.width = width;
    canvas.height = height;

    particlesRef.current = createParticles(width, height);
    nebulasRef.current = createNebulas(width, height);

    const handleResize = () => {
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = width;
      canvas.height = height;
      particlesRef.current = createParticles(width, height);
      nebulasRef.current = createNebulas(width, height);
    };

    const handleMouseMove = (e: MouseEvent) => {
      mouseRef.current = { x: e.clientX, y: e.clientY };
    };

    const handleTouchMove = (e: TouchEvent) => {
      if (e.touches[0]) {
        mouseRef.current = {
          x: e.touches[0].clientX,
          y: e.touches[0].clientY,
        };
      }
    };

    window.addEventListener("resize", handleResize);
    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("touchmove", handleTouchMove, { passive: true });

    function drawFrame() {
      if (!canvas || !ctx) return;

      timeRef.current += 0.01;

      ctx.fillStyle = "rgba(5, 5, 5, 0.15)";
      ctx.fillRect(0, 0, width, height);

      // Draw nebulas
      nebulasRef.current.forEach((nebula) => {
        nebula.phase += nebula.speed;
        const currentOpacity =
          nebula.opacity * (0.5 + 0.5 * Math.sin(nebula.phase));
        const gradient = ctx.createRadialGradient(
          nebula.x,
          nebula.y,
          0,
          nebula.x,
          nebula.y,
          nebula.radius
        );
        const hexOpacity = Math.floor(currentOpacity * 255)
          .toString(16)
          .padStart(2, "0");
        const hexHalf = Math.floor(currentOpacity * 128)
          .toString(16)
          .padStart(2, "0");
        gradient.addColorStop(0, nebula.color + hexOpacity);
        gradient.addColorStop(0.5, nebula.color + hexHalf);
        gradient.addColorStop(1, "transparent");
        ctx.fillStyle = gradient;
        ctx.fillRect(0, 0, width, height);
      });

      // Draw particles
      particlesRef.current.forEach((p) => {
        p.x += p.vx;
        p.y += p.vy;

        const dx = mouseRef.current.x - p.x;
        const dy = mouseRef.current.y - p.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < 150 && p.type === "gold") {
          p.vx += dx * 0.00005;
          p.vy += dy * 0.00005;
        }

        if (p.x < 0) p.x = width;
        if (p.x > width) p.x = 0;
        if (p.y < 0) p.y = height;
        if (p.y > height) p.y = 0;

        const flicker =
          p.type === "star"
            ? 0.7 + 0.3 * Math.sin(timeRef.current * 2 + p.x)
            : 1;
        const currentOpacity = p.opacity * flicker;

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);

        if (p.type === "gold") {
          ctx.fillStyle = `rgba(255, 195, 0, ${currentOpacity})`;
          ctx.shadowBlur = 8;
          ctx.shadowColor = "rgba(255, 195, 0, 0.4)";
        } else if (p.type === "dust") {
          ctx.fillStyle = `rgba(27, 42, 78, ${currentOpacity})`;
          ctx.shadowBlur = 0;
        } else {
          ctx.fillStyle = `rgba(255, 255, 255, ${currentOpacity})`;
          ctx.shadowBlur = 2;
          ctx.shadowColor = "rgba(255, 255, 255, 0.2)";
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
