"use client";

import { motion } from "framer-motion";

interface CosmicEntityProps {
  size?: number;
  intensity?: number;
}

export default function CosmicEntity({
  size = 300,
  intensity = 1,
}: CosmicEntityProps) {
  return (
    <div
      className="relative mx-auto"
      style={{ width: size, height: size * 1.35 }}
    >
      {/* ── DEEP OUTER BREATHING ── */}
      <div
        className="absolute rounded-full pointer-events-none"
        style={{
          inset: -size * 0.5,
          background: `radial-gradient(circle, rgba(255,195,0,${0.06 * intensity}) 0%, rgba(27,42,78,${0.05 * intensity}) 30%, transparent 55%)`,
          filter: "blur(40px)",
          animation: "entityBreathe 5s ease-in-out infinite",
        }}
      />

      {/* ── ORBITAL RING 1 (outermost) ── */}
      <motion.div
        className="absolute rounded-full border pointer-events-none"
        style={{
          inset: -size * 0.18,
          borderColor: "rgba(255,195,0,0.06)",
          borderTopColor: `rgba(255,195,0,${0.35 * intensity})`,
          borderRightColor: `rgba(255,216,77,${0.12 * intensity})`,
          animation: "singularitySpin 22s linear infinite",
        }}
      >
        <div
          className="absolute -top-1 left-1/2 -translate-x-1/2 w-2.5 h-2.5 rounded-full bg-[#FFC300]"
          style={{ boxShadow: "0 0 12px rgba(255,195,0,0.7), 0 0 30px rgba(255,195,0,0.25)" }}
        />
      </motion.div>

      {/* ── ORBITAL RING 2 ── */}
      <div
        className="absolute rounded-full border pointer-events-none"
        style={{
          inset: -size * 0.1,
          borderColor: "rgba(255,216,77,0.04)",
          borderBottomColor: `rgba(255,216,77,${0.28 * intensity})`,
          borderLeftColor: `rgba(255,195,0,${0.1 * intensity})`,
          animation: "singularitySpin 15s linear infinite reverse",
        }}
      >
        <div
          className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-2 h-2 rounded-full bg-[#FFD84D]"
          style={{ boxShadow: "0 0 10px rgba(255,216,77,0.6), 0 0 25px rgba(255,216,77,0.2)" }}
        />
      </div>

      {/* ── ORBITAL RING 3 ── */}
      <div
        className="absolute rounded-full border pointer-events-none"
        style={{
          inset: -size * 0.03,
          borderColor: "rgba(255,195,0,0.025)",
          borderLeftColor: `rgba(255,195,0,${0.2 * intensity})`,
          animation: "singularitySpin 10s linear infinite",
        }}
      >
        <div
          className="absolute top-1/2 -right-1 -translate-y-1/2 w-1.5 h-1.5 rounded-full bg-[#FFC300]"
          style={{ boxShadow: "0 0 6px rgba(255,195,0,0.5)" }}
        />
      </div>

      {/* ── ORBITAL RING 4 (innermost) ── */}
      <div
        className="absolute rounded-full border pointer-events-none"
        style={{
          inset: size * 0.08,
          borderColor: "rgba(255,216,77,0.02)",
          borderTopColor: `rgba(255,216,77,${0.15 * intensity})`,
          animation: "singularitySpin 7s linear infinite reverse",
        }}
      >
        <div
          className="absolute -top-0.5 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full bg-[#FFD84D]"
          style={{ boxShadow: "0 0 4px rgba(255,216,77,0.4)" }}
        />
      </div>

      {/* ── ENERGY PULSE RINGS ── */}
      {[0, 1, 2, 3].map((i) => (
        <div
          key={i}
          className="absolute rounded-full border border-[#FFC300]/[0.03] pointer-events-none"
          style={{
            inset: size * (0.1 + i * 0.09),
            animation: `goldenPulse ${3 + i * 1.5}s ease-in-out infinite ${i * 0.6}s`,
          }}
        />
      ))}

      {/* ── MAIN IMAGE ── */}
      <img
        src="/cosmic/sabio-figure.png"
        alt="El Sabio Oscuro — Figura Cósmica"
        loading="lazy"
        className="relative z-10 w-full h-full object-contain"
        style={{
          filter: `drop-shadow(0 0 ${50 * intensity}px rgba(255,195,0,${0.15 * intensity})) drop-shadow(0 0 ${100 * intensity}px rgba(255,195,0,${0.06 * intensity}))`,
          animation: "entityBreathe 5s ease-in-out infinite",
        }}
      />

      {/* ── NEBULA FACE OVERLAY ── */}
      <div
        className="absolute inset-0 z-20 pointer-events-none mix-blend-screen"
        style={{
          background: `radial-gradient(ellipse at 50% 28%, rgba(255,195,0,${0.06 * intensity}) 0%, rgba(27,42,78,${0.03 * intensity}) 25%, transparent 45%)`,
          animation: "goldenPulse 7s ease-in-out infinite",
        }}
      />

      {/* ── LIVING SINGULARITY IN FACE ── */}
      <div
        className="absolute z-30 pointer-events-none"
        style={{
          top: "22%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: size * 0.12,
          height: size * 0.12,
        }}
      >
        <div
          className="w-full h-full rounded-full"
          style={{
            background: "radial-gradient(circle, rgba(255,216,77,0.3) 0%, rgba(255,195,0,0.1) 40%, transparent 70%)",
            boxShadow: `0 0 ${20 * intensity}px rgba(255,195,0,${0.2 * intensity}), 0 0 ${40 * intensity}px rgba(255,195,0,${0.08 * intensity})`,
            animation: "breatheGlow 3s ease-in-out infinite",
          }}
        />
      </div>

      {/* ── SCATTERED ORBITING PARTICLES ── */}
      {[
        { angle: 30, dist: 0.48, speed: 18, size: 2.5, color: "#FFC300" },
        { angle: 140, dist: 0.52, speed: 14, size: 2, color: "#FFD84D" },
        { angle: 210, dist: 0.44, speed: 22, size: 1.5, color: "#FFC300" },
        { angle: 320, dist: 0.55, speed: 16, size: 2, color: "#FFB800" },
        { angle: 80, dist: 0.38, speed: 12, size: 1.5, color: "#FFD84D" },
        { angle: 260, dist: 0.5, speed: 20, size: 1.8, color: "#FFC300" },
      ].map((orb, i) => (
        <motion.div
          key={i}
          className="absolute rounded-full pointer-events-none z-20"
          style={{
            width: orb.size,
            height: orb.size,
            background: orb.color,
            boxShadow: `0 0 ${orb.size * 3}px ${orb.color}66, 0 0 ${orb.size * 6}px ${orb.color}22`,
          }}
          animate={{
            x: [
              Math.cos((orb.angle * Math.PI) / 180) * size * orb.dist,
              Math.cos(((orb.angle + 360) * Math.PI) / 180) * size * orb.dist,
            ],
            y: [
              Math.sin((orb.angle * Math.PI) / 180) * size * orb.dist * 0.7,
              Math.sin(((orb.angle + 360) * Math.PI) / 180) * size * orb.dist * 0.7,
            ],
            opacity: [0.3, 0.8, 0.3],
          }}
          transition={{
            duration: orb.speed,
            repeat: Infinity,
            ease: "linear",
            opacity: { duration: 3, repeat: Infinity, ease: "easeInOut" },
          }}
        />
      ))}

      {/* ── INTERNAL ENERGY FLOW ── */}
      <motion.div
        className="absolute inset-0 z-[15] pointer-events-none"
        style={{
          background: `conic-gradient(from 0deg at 50% 35%, transparent 0%, rgba(255,195,0,${0.02 * intensity}) 10%, transparent 20%, rgba(255,216,77,${0.015 * intensity}) 35%, transparent 50%)`,
        }}
        animate={{ rotate: 360 }}
        transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
      />
    </div>
  );
}
