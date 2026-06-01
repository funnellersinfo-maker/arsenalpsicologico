"use client";

type SingularityVariant = "loader" | "portal" | "meter" | "cta" | "icon";

interface GoldenSingularityProps {
  size?: number;
  intensity?: number;
  variant?: SingularityVariant;
  progress?: number;
  pulse?: boolean;
}

export default function GoldenSingularity({
  size = 120,
  intensity = 1,
  variant = "portal",
  progress = 0,
  pulse = true,
}: GoldenSingularityProps) {
  const coreSize = variant === "loader" ? 4 : variant === "icon" ? 8 : size * 0.18;
  const showRings = variant !== "loader" && variant !== "icon";
  const showAccretion = variant === "portal" || variant === "cta";
  const showProgress = variant === "meter";
  const circum = 2 * Math.PI * (size * 0.42);

  return (
    <div
      className="relative mx-auto"
      style={{ width: size, height: size }}
    >
      {/* ── OUTER BREATHING GLOW ── */}
      <div
        className="absolute rounded-full pointer-events-none"
        style={{
          inset: -size * 0.4,
          background: `radial-gradient(circle, rgba(255,195,0,${0.12 * intensity}) 0%, rgba(255,184,0,${0.04 * intensity}) 30%, transparent 55%)`,
          filter: "blur(30px)",
          animation: pulse ? "breatheGlow 4s ease-in-out infinite" : "none",
        }}
      />

      {/* ── ACCRETION DISK (portal/cta) ── */}
      {showAccretion && (
        <>
          <div
            className="absolute rounded-full border pointer-events-none"
            style={{
              inset: -size * 0.15,
              borderColor: "rgba(255,195,0,0.06)",
              borderTopColor: `rgba(255,195,0,${0.4 * intensity})`,
              borderRightColor: `rgba(255,216,77,${0.15 * intensity})`,
              animation: "singularitySpin 20s linear infinite",
            }}
          >
            <div
              className="absolute -top-1 left-1/2 -translate-x-1/2 w-2 h-2 rounded-full bg-[#FFC300]"
              style={{ boxShadow: "0 0 10px rgba(255,195,0,0.7), 0 0 25px rgba(255,195,0,0.3)" }}
            />
          </div>
          <div
            className="absolute rounded-full border pointer-events-none"
            style={{
              inset: -size * 0.07,
              borderColor: "rgba(255,216,77,0.04)",
              borderBottomColor: `rgba(255,216,77,${0.3 * intensity})`,
              borderLeftColor: `rgba(255,195,0,${0.12 * intensity})`,
              animation: "singularitySpin 14s linear infinite reverse",
            }}
          >
            <div
              className="absolute -bottom-0.5 left-1/2 -translate-x-1/2 w-1.5 h-1.5 rounded-full bg-[#FFD84D]"
              style={{ boxShadow: "0 0 8px rgba(255,216,77,0.6)" }}
            />
          </div>
          <div
            className="absolute rounded-full border pointer-events-none"
            style={{
              inset: size * 0.03,
              borderColor: "rgba(255,195,0,0.03)",
              borderLeftColor: `rgba(255,195,0,${0.18 * intensity})`,
              animation: "singularitySpin 9s linear infinite",
            }}
          />
        </>
      )}

      {/* ── ORBITAL RINGS (meter) ── */}
      {showRings && !showAccretion && (
        <>
          <div
            className="absolute rounded-full border pointer-events-none"
            style={{
              inset: -size * 0.08,
              borderColor: "rgba(255,195,0,0.05)",
              borderTopColor: `rgba(255,195,0,${0.25 * intensity})`,
              animation: "singularitySpin 16s linear infinite",
            }}
          />
          <div
            className="absolute rounded-full border pointer-events-none"
            style={{
              inset: size * 0.05,
              borderColor: "rgba(255,216,77,0.03)",
              borderBottomColor: `rgba(255,216,77,${0.18 * intensity})`,
              animation: "singularitySpin 10s linear infinite reverse",
            }}
          />
        </>
      )}

      {/* ── ENERGY PULSE RINGS ── */}
      {showRings && [0, 1, 2].map((i) => (
        <div
          key={i}
          className="absolute rounded-full border border-[#FFC300]/[0.03] pointer-events-none"
          style={{
            inset: size * (0.12 + i * 0.1),
            animation: `goldenPulse ${3.5 + i * 1.8}s ease-in-out infinite ${i * 0.7}s`,
          }}
        />
      ))}

      {/* ── PROGRESS RING (meter variant) ── */}
      {showProgress && (
        <svg className="absolute inset-0 w-full h-full -rotate-90" viewBox={`0 0 ${size} ${size}`}>
          <circle
            cx={size / 2}
            cy={size / 2}
            r={size * 0.42}
            fill="none"
            stroke="rgba(255,195,0,0.04)"
            strokeWidth="2"
          />
          <circle
            cx={size / 2}
            cy={size / 2}
            r={size * 0.42}
            fill="none"
            stroke="url(#singGrad)"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeDasharray={`${(progress / 100) * circum} ${circum}`}
            style={{
              transition: "stroke-dasharray 0.5s ease-out",
              filter: "drop-shadow(0 0 6px rgba(255,195,0,0.4))",
            }}
          />
          <circle
            cx={size / 2}
            cy={size / 2}
            r={size * 0.35}
            fill="none"
            stroke="rgba(255,195,0,0.015)"
            strokeWidth="0.5"
            strokeDasharray="2 8"
          />
          <defs>
            <linearGradient id="singGrad" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#FFB800" />
              <stop offset="50%" stopColor="#FFC300" />
              <stop offset="100%" stopColor="#FFD84D" />
            </linearGradient>
          </defs>
        </svg>
      )}

      {/* ── CORE ── */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <div
          className="rounded-full"
          style={{
            width: coreSize,
            height: coreSize,
            background: "linear-gradient(135deg, #FFC300, #FFD84D, #FFB800)",
            boxShadow: `0 0 ${20 * intensity}px rgba(255,195,0,0.4), 0 0 ${50 * intensity}px rgba(255,195,0,0.15), 0 0 ${100 * intensity}px rgba(255,195,0,0.05)`,
            animation: pulse ? "breatheGlow 3s ease-in-out infinite" : "none",
          }}
        />
      </div>

      {/* ── INTERNAL LIGHT (portal/cta) ── */}
      {(variant === "portal" || variant === "cta") && (
        <div
          className="absolute rounded-full pointer-events-none"
          style={{
            inset: size * 0.25,
            background: "radial-gradient(circle, rgba(255,216,77,0.08) 0%, transparent 70%)",
            animation: "pulseGlow 4s ease-in-out infinite",
          }}
        />
      )}
    </div>
  );
}
