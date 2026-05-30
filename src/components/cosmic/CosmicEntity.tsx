"use client";

import { motion } from "framer-motion";

export default function CosmicEntity({
  size = 280,
  intensity = 1,
}: {
  size?: number;
  intensity?: number;
}) {
  return (
    <div
      className="relative mx-auto"
      style={{ width: size, height: size * 1.4 }}
    >
      {/* ── OUTER BREATHING GLOW ── */}
      <div
        className="absolute rounded-full"
        style={{
          inset: -size * 0.35,
          background: `radial-gradient(circle, rgba(255,195,0,${0.1 * intensity}) 0%, rgba(29,49,96,${0.06 * intensity}) 35%, transparent 60%)`,
          filter: "blur(30px)",
          animation: "breatheGlow 4s ease-in-out infinite",
        }}
      />

      {/* ── ORBITAL RING 1 ── */}
      <motion.div
        className="absolute rounded-full border pointer-events-none"
        style={{
          inset: -size * 0.12,
          borderColor: "rgba(255,195,0,0.08)",
          borderTopColor: `rgba(255,195,0,${0.35 * intensity})`,
          borderRightColor: `rgba(255,216,77,${0.15 * intensity})`,
          animation: "singularitySpin 18s linear infinite",
        }}
      >
        {/* Orbiting dot */}
        <div
          className="absolute -top-1 left-1/2 -translate-x-1/2 w-2 h-2 rounded-full bg-[#FFC300]"
          style={{
            boxShadow: "0 0 8px rgba(255,195,0,0.6), 0 0 20px rgba(255,195,0,0.3)",
          }}
        />
      </motion.div>

      {/* ── ORBITAL RING 2 ── */}
      <div
        className="absolute rounded-full border pointer-events-none"
        style={{
          inset: -size * 0.06,
          borderColor: "rgba(255,216,77,0.05)",
          borderBottomColor: `rgba(255,216,77,${0.3 * intensity})`,
          animation: "singularitySpin 12s linear infinite reverse",
        }}
      >
        <div
          className="absolute -bottom-0.5 left-1/2 -translate-x-1/2 w-1.5 h-1.5 rounded-full bg-[#FFD84D]"
          style={{ boxShadow: "0 0 6px rgba(255,216,77,0.5)" }}
        />
      </div>

      {/* ── ORBITAL RING 3 ── */}
      <div
        className="absolute rounded-full border pointer-events-none"
        style={{
          inset: size * 0.05,
          borderColor: "rgba(255,195,0,0.03)",
          borderLeftColor: `rgba(255,195,0,${0.2 * intensity})`,
          animation: "singularitySpin 8s linear infinite",
        }}
      />

      {/* ── ENERGY PULSE RINGS ── */}
      {[0, 1, 2].map((i) => (
        <div
          key={i}
          className="absolute rounded-full border border-[#FFC300]/[0.04] pointer-events-none"
          style={{
            inset: size * (0.15 + i * 0.12),
            animation: `goldenPulse ${3 + i * 1.5}s ease-in-out infinite ${i * 0.8}s`,
          }}
        />
      ))}

      {/* ── MAIN IMAGE ── */}
      <img
        src="/cosmic/guardian.png"
        alt="El Guardián del Umbral"
        className="relative z-10 w-full h-full object-contain"
        style={{
          filter: `drop-shadow(0 0 ${40 * intensity}px rgba(255,195,0,${0.15 * intensity})) drop-shadow(0 0 ${80 * intensity}px rgba(255,195,0,${0.06 * intensity}))`,
        }}
      />

      {/* ── NEBULA FACE OVERLAY ── */}
      <div
        className="absolute inset-0 z-20 pointer-events-none mix-blend-screen"
        style={{
          background: `radial-gradient(ellipse at 50% 30%, rgba(255,195,0,${0.05 * intensity}) 0%, rgba(29,49,96,${0.03 * intensity}) 30%, transparent 50%)`,
          animation: "goldenPulse 6s ease-in-out infinite",
        }}
      />
    </div>
  );
}
