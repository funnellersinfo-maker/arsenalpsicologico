"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import { motion, useScroll, useTransform, useInView, AnimatePresence } from "framer-motion";
import ParticleCanvas from "@/components/cosmic/ParticleCanvas";

/* ─────────── CONSTANTS ─────────── */
const CTA_LINK = "https://app.elsabiomanipulador.com/inicio?ref=L106036858P";

/* ─────────── ANIMATED SECTION WRAPPER ─────────── */
function CosmicSection({
  children,
  className = "",
  id,
  threshold = 0.15,
}: {
  children: React.ReactNode;
  className?: string;
  id?: string;
  threshold?: number;
}) {
  const ref = useRef(null);
  const isInView = useInView(ref, { amount: threshold, once: false });

  return (
    <section
      ref={ref}
      id={id}
      className={`relative flex flex-col items-center justify-center px-5 py-16 ${className}`}
    >
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
        transition={{ duration: 1.4, ease: [0.22, 1, 0.36, 1] }}
        className="relative z-10 w-full max-w-lg mx-auto"
      >
        {children}
      </motion.div>
    </section>
  );
}

/* ─────────── ACHIEVEMENT BADGE ─────────── */
function AchievementBadge({
  title,
  subtitle,
  icon,
  unlocked,
  delay = 0,
}: {
  title: string;
  subtitle: string;
  icon: string;
  unlocked: boolean;
  delay?: number;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.5 }}
      animate={
        unlocked
          ? { opacity: 1, scale: 1 }
          : { opacity: 0.15, scale: 0.95 }
      }
      transition={{
        duration: 0.9,
        delay: unlocked ? delay : 0,
        ease: [0.34, 1.56, 0.64, 1],
      }}
      className={`relative overflow-hidden rounded-xl border p-5 text-center transition-all duration-700 ${
        unlocked
          ? "border-[#FFC300]/30 bg-gradient-to-b from-[#FFC300]/[0.08] via-[#FFC300]/[0.03] to-transparent"
          : "border-white/[0.03] bg-white/[0.01]"
      }`}
      style={
        unlocked
          ? {
              boxShadow:
                "0 0 30px rgba(255,195,0,0.1), inset 0 1px 0 rgba(255,195,0,0.15)",
            }
          : undefined
      }
    >
      {unlocked && (
        <>
          <div className="absolute inset-0 holo-shimmer opacity-40" />
          <div
            className="absolute -inset-1 opacity-20"
            style={{
              background:
                "radial-gradient(circle at 50% 0%, rgba(255,195,0,0.3) 0%, transparent 60%)",
            }}
          />
        </>
      )}
      <div className="relative z-10">
        <motion.span
          className="text-3xl mb-2 block"
          animate={unlocked ? { scale: [1, 1.2, 1] } : {}}
          transition={{ duration: 0.5, delay: unlocked ? delay + 0.1 : 0 }}
        >
          {icon}
        </motion.span>
        <p
          className={`font-mono-cosmic text-[0.55rem] tracking-[0.25em] mb-1.5 transition-colors duration-500 ${
            unlocked ? "text-[#FFC300]" : "text-white/10"
          }`}
        >
          PATRÓN DETECTADO
        </p>
        <h3
          className={`font-display text-lg font-bold transition-colors duration-500 ${
            unlocked ? "text-white" : "text-white/15"
          }`}
        >
          {title}
        </h3>
        <p
          className={`font-body text-[0.7rem] mt-1 transition-colors duration-500 ${
            unlocked ? "text-[#FFD84D]/60" : "text-white/[0.06]"
          }`}
        >
          {subtitle}
        </p>
      </div>
    </motion.div>
  );
}

/* ─────────── KNOWLEDGE RELIC ─────────── */
function KnowledgeRelic({
  chapter,
  text,
  source,
  index,
  isVisible,
}: {
  chapter: string;
  text: string;
  source: string;
  index: number;
  isVisible: boolean;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, x: index % 2 === 0 ? -30 : 30, scale: 0.95 }}
      animate={
        isVisible ? { opacity: 1, x: 0, scale: 1 } : { opacity: 0 }
      }
      transition={{ duration: 1, delay: index * 0.2, ease: "easeOut" }}
      className="relative group"
    >
      <div className="relative border border-[#FFC300]/10 bg-gradient-to-r from-[#FFC300]/[0.03] to-transparent rounded-lg p-5 overflow-hidden transition-all duration-700 group-hover:border-[#FFC300]/25 group-hover:shadow-[0_0_30px_rgba(255,195,0,0.08)]">
        {/* Glow line */}
        <div className="absolute left-0 top-0 bottom-0 w-[2px] bg-gradient-to-b from-[#FFC300] via-[#FFD84D]/50 to-transparent shadow-[0_0_10px_#FFC300AA]" />
        {/* Hover glow */}
        <div className="absolute inset-0 bg-gradient-to-r from-[#FFC300]/[0.02] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
        <div className="relative z-10">
          <span className="font-mono-cosmic text-[0.5rem] tracking-[0.2em] text-[#FFC300]/50 block mb-2.5">
            {"// "}{chapter}
          </span>
          <p className="font-display text-sm md:text-base italic text-[#EAEAEA]/85 leading-relaxed">
            &ldquo;{text}&rdquo;
          </p>
          <p className="font-mono-cosmic text-[0.55rem] tracking-[0.08em] text-[#FFC300]/40 mt-3">
            — {source}
          </p>
        </div>
      </div>
    </motion.div>
  );
}

/* ─────────── SCROLL PROGRESS INDICATOR ─────────── */
function ScrollProgress({ progress }: { progress: number }) {
  return (
    <div className="fixed top-0 left-0 right-0 z-50 h-[2px]">
      <div
        className="h-full transition-all duration-300 ease-out"
        style={{
          width: `${progress * 100}%`,
          background: "linear-gradient(90deg, #FFB800, #FFC300, #FFD84D)",
          boxShadow: "0 0 10px rgba(255,195,0,0.5), 0 0 20px rgba(255,195,0,0.2)",
        }}
      />
    </div>
  );
}

/* ─────────── FLOATING ACCESS TIMER ─────────── */
function AccessTimer({ visible }: { visible: boolean }) {
  const [time, setTime] = useState({ m: 14, s: 59 });

  useEffect(() => {
    const interval = setInterval(() => {
      setTime((prev) => {
        if (prev.s === 0) {
          if (prev.m === 0) return { m: 14, s: 59 };
          return { m: prev.m - 1, s: 59 };
        }
        return { m: prev.m, s: prev.s - 1 };
      });
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ y: -60, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: -60, opacity: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="fixed top-0 left-0 right-0 z-40 flex items-center justify-center gap-2 py-2.5 px-4 border-b border-[#FFC300]/10"
          style={{
            background:
              "linear-gradient(90deg, #050505 0%, #0A0A12 50%, #050505 100%)",
          }}
        >
          <span className="text-[#FFC300] text-xs">⚡</span>
          <span className="font-body text-[0.65rem] text-white/40 tracking-wide">
            VENTANA DE ACCESO — Este precio desaparece en
          </span>
          <span
            className="font-mono-cosmic text-[0.7rem] font-bold text-[#FFC300] bg-[#FFC300]/[0.06] px-2 py-0.5 rounded tracking-wider"
          >
            {String(time.m).padStart(2, "0")}:{String(time.s).padStart(2, "0")}
          </span>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

/* ─────────── MAIN PAGE ─────────── */
export default function ElUmbral() {
  const containerRef = useRef(null);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [perceptionLevel, setPerceptionLevel] = useState(0);
  const [achievementsUnlocked, setAchievementsUnlocked] = useState(0);
  const [hoverCTA, setHoverCTA] = useState(false);
  const [showTimer, setShowTimer] = useState(false);
  const [initialLoad, setInitialLoad] = useState(true);

  const { scrollYProgress } = useScroll({ target: containerRef });

  // Initial load animation
  useEffect(() => {
    const timer = setTimeout(() => setInitialLoad(false), 300);
    const timerTimer = setTimeout(() => setShowTimer(true), 2500);
    return () => {
      clearTimeout(timer);
      clearTimeout(timerTimer);
    };
  }, []);

  // Track scroll progress
  useEffect(() => {
    const unsubscribe = scrollYProgress.on("change", (v) => {
      setScrollProgress(v);
      setPerceptionLevel(Math.min(100, Math.floor(v * 180)));
      if (v > 0.12 && achievementsUnlocked < 1) setAchievementsUnlocked(1);
      if (v > 0.28 && achievementsUnlocked < 2) setAchievementsUnlocked(2);
      if (v > 0.42 && achievementsUnlocked < 3) setAchievementsUnlocked(3);
      if (v > 0.58 && achievementsUnlocked < 4) setAchievementsUnlocked(4);
      if (v > 0.78 && achievementsUnlocked < 5) setAchievementsUnlocked(5);
    });
    return () => unsubscribe();
  }, [scrollYProgress, achievementsUnlocked]);

  // Parallax transforms
  const guardianY = useTransform(scrollYProgress, [0.1, 0.35], [100, -100]);
  const guardianScale = useTransform(scrollYProgress, [0.1, 0.35], [0.85, 1.15]);
  const nebulaOpacity = useTransform(scrollYProgress, [0, 0.3], [0.2, 0.9]);
  const singularityScale = useTransform(scrollYProgress, [0.5, 0.85], [0.3, 1.5]);

  // Vibration on mobile for achievements
  const vibrate = useCallback(() => {
    if (typeof navigator !== "undefined" && navigator.vibrate) {
      navigator.vibrate(25);
    }
  }, []);

  useEffect(() => {
    if (achievementsUnlocked > 0) vibrate();
  }, [achievementsUnlocked, vibrate]);

  return (
    <>
      {/* Initial load overlay */}
      <AnimatePresence>
        {initialLoad && (
          <motion.div
            className="fixed inset-0 z-[100] bg-[#050505] flex items-center justify-center"
            exit={{ opacity: 0 }}
            transition={{ duration: 1.5, ease: "easeInOut" }}
          >
            <motion.div
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 1.5, opacity: 0 }}
              transition={{ duration: 1 }}
              className="w-3 h-3 rounded-full bg-[#FFC300]"
              style={{
                boxShadow:
                  "0 0 30px rgba(255,195,0,0.6), 0 0 60px rgba(255,195,0,0.3)",
              }}
            />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Fixed elements */}
      <ScrollProgress progress={scrollProgress} />
      <AccessTimer visible={showTimer} />

      <main ref={containerRef} className="relative" style={{ paddingTop: showTimer ? "36px" : "0" }}>
        {/* Fixed Particle Background */}
        <ParticleCanvas />

        {/* Fixed Scanline Overlay */}
        <div className="fixed inset-0 z-[1] scanlines pointer-events-none" />

        {/* Fixed Grid Background */}
        <div
          className="fixed inset-0 z-[1] pointer-events-none opacity-30"
          style={{
            backgroundImage:
              "linear-gradient(rgba(255,195,0,0.015) 1px, transparent 1px), linear-gradient(90deg, rgba(255,195,0,0.015) 1px, transparent 1px)",
            backgroundSize: "40px 40px",
            animation: "gridMove 8s linear infinite",
          }}
        />

        {/* ─────────── SECTION 1: OPENING PORTAL ─────────── */}
        <CosmicSection
          id="portal"
          className="min-h-[120vh]"
          threshold={0.05}
        >
          {/* Central nebula glow */}
          <motion.div
            className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] rounded-full pointer-events-none"
            style={{
              background:
                "radial-gradient(circle, rgba(255,195,0,0.08) 0%, rgba(27,42,78,0.05) 35%, transparent 65%)",
              opacity: nebulaOpacity,
            }}
          />

          <div className="text-center relative z-10">
            {/* Top tag */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1.8, delay: 0.8 }}
              className="font-mono-cosmic text-[0.55rem] tracking-[0.3em] text-[#FFC300]/50 mb-10 border border-[#FFC300]/10 rounded px-4 py-2 inline-block"
              style={{
                boxShadow: "0 0 20px rgba(255,195,0,0.05)",
              }}
            >
              {"// "}SEÑAL DETECTADA — ORIGEN: DESCONOCIDO
            </motion.p>

            {/* Main opening text */}
            <motion.h1
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 3, delay: 1.5, ease: "easeOut" }}
              className="font-display text-[2.5rem] sm:text-5xl md:text-6xl font-black leading-[1.05] mb-8"
            >
              <span className="text-white">OBSERVAR</span>
              <br />
              <span className="text-[#FFC300] golden-glow-strong">
                NO ES LO MISMO
              </span>
              <br />
              <span className="text-white/80">QUE VER</span>
            </motion.h1>

            {/* Subtitle */}
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 2.5, delay: 3 }}
              className="font-body text-sm text-white/30 max-w-xs mx-auto leading-relaxed"
            >
              Existe una dimensión de la mente humana que el 97% de las personas
              jamás percibe. Estás a punto de cruzar el umbral.
            </motion.p>

            {/* Scroll indicator */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1, delay: 5 }}
              className="mt-16 flex flex-col items-center gap-3"
            >
              <span className="font-mono-cosmic text-[0.5rem] tracking-[0.4em] text-white/15 uppercase">
                Desliza para avanzar
              </span>
              <motion.div
                animate={{ y: [0, 8, 0] }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              >
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="rgba(255,195,0,0.25)"
                  strokeWidth="1.5"
                >
                  <path d="M7 10l5 5 5-5" />
                </svg>
              </motion.div>
            </motion.div>
          </div>
        </CosmicSection>

        {/* ─────────── SECTION 2: COSMIC GUARDIAN ─────────── */}
        <CosmicSection id="guardian" className="min-h-[130vh]">
          {/* Guardian image with parallax */}
          <motion.div
            style={{ y: guardianY, scale: guardianScale }}
            className="relative w-full max-w-[280px] mx-auto mb-12"
          >
            {/* Outer glow */}
            <div
              className="absolute -inset-10 rounded-full pointer-events-none"
              style={{
                background:
                  "radial-gradient(circle, rgba(255,195,0,0.12) 0%, rgba(27,42,78,0.08) 35%, transparent 60%)",
                filter: "blur(30px)",
                animation: "goldenPulse 5s ease-in-out infinite",
              }}
            />
            {/* Orbital ring */}
            <div
              className="absolute -inset-6 rounded-full border border-[#FFC300]/[0.06]"
              style={{ animation: "singularitySpin 20s linear infinite" }}
            >
              <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 w-1.5 h-1.5 rounded-full bg-[#FFC300]/40 shadow-[0_0_8px_rgba(255,195,0,0.5)]" />
            </div>
            <img
              src="/cosmic/guardian.png"
              alt="El Guardián del Umbral"
              className="relative z-10 w-full object-contain"
              style={{
                filter: "drop-shadow(0 0 50px rgba(255,195,0,0.15))",
              }}
            />
          </motion.div>

          {/* Text */}
          <div className="text-center">
            <p className="font-mono-cosmic text-[0.5rem] tracking-[0.3em] text-[#263C7A] mb-5">
              {"// "}ENTIDAD DETECTADA — GUARDIÁN DEL UMBRAL
            </p>
            <h2 className="font-display text-2xl sm:text-3xl md:text-4xl font-bold leading-[1.1] mb-5">
              LA MAYORÍA
              <span className="text-white/30 font-light"> OBSERVA.</span>
              <br />
              <span className="text-[#FFC300] golden-glow-strong">
                MUY POCOS DETECTAN
              </span>
              <br />
              <span className="text-white/30 font-light">LOS PATRONES.</span>
            </h2>
            <p className="font-body text-xs text-white/25 max-w-sm mx-auto leading-[1.8]">
              Cada conversación oculta patrones invisibles. Cada gesto revela una
              verdad que la mayoría no puede leer. El Guardián observa lo que
              otros no pueden ver.
            </p>
          </div>
        </CosmicSection>

        {/* ─────────── SECTION 3: SCAN SYSTEM ─────────── */}
        <CosmicSection id="scan" className="min-h-[110vh]">
          <div className="w-full">
            {/* Header */}
            <div className="text-center mb-10">
              <p className="font-mono-cosmic text-[0.5rem] tracking-[0.3em] text-[#FFC300]/40 mb-4">
                {"// "}ESCANEANDO NIVEL COGNITIVO
              </p>
              <h2 className="font-display text-xl sm:text-2xl md:text-3xl font-bold mb-1">
                NIVEL DE PERCEPCIÓN
              </h2>
              <p className="font-display text-xl sm:text-2xl md:text-3xl font-bold text-[#FFC300] golden-glow">
                DETECTADO
              </p>
            </div>

            {/* Circular progress */}
            <div className="relative w-52 h-52 mx-auto mb-10">
              {/* Outer spinning glow */}
              <div
                className="absolute inset-[-8px] rounded-full pointer-events-none"
                style={{
                  background:
                    "conic-gradient(from 0deg, transparent, rgba(255,195,0,0.15), transparent, rgba(255,216,77,0.1), transparent)",
                  animation: "singularitySpin 6s linear infinite",
                  filter: "blur(4px)",
                }}
              />
              {/* Progress ring SVG */}
              <svg
                className="relative z-10 w-full h-full -rotate-90"
                viewBox="0 0 200 200"
              >
                {/* Background ring */}
                <circle
                  cx="100"
                  cy="100"
                  r="85"
                  fill="none"
                  stroke="rgba(255,195,0,0.06)"
                  strokeWidth="3"
                />
                {/* Progress ring */}
                <circle
                  cx="100"
                  cy="100"
                  r="85"
                  fill="none"
                  stroke="url(#goldGradient)"
                  strokeWidth="3"
                  strokeLinecap="round"
                  strokeDasharray={`${(perceptionLevel / 100) * 534} 534`}
                  style={{
                    transition: "stroke-dasharray 0.5s ease-out",
                    filter: "drop-shadow(0 0 6px rgba(255,195,0,0.5))",
                  }}
                />
                {/* Decorative rings */}
                <circle
                  cx="100"
                  cy="100"
                  r="72"
                  fill="none"
                  stroke="rgba(255,195,0,0.03)"
                  strokeWidth="0.5"
                  strokeDasharray="3 8"
                />
                <circle
                  cx="100"
                  cy="100"
                  r="95"
                  fill="none"
                  stroke="rgba(255,195,0,0.02)"
                  strokeWidth="0.5"
                  strokeDasharray="1 12"
                />
                <defs>
                  <linearGradient id="goldGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%" stopColor="#FFB800" />
                    <stop offset="50%" stopColor="#FFC300" />
                    <stop offset="100%" stopColor="#FFD84D" />
                  </linearGradient>
                </defs>
              </svg>
              {/* Center content */}
              <div className="absolute inset-0 flex flex-col items-center justify-center z-20">
                <motion.span
                  className="font-display text-[3.2rem] font-black golden-glow-strong"
                  style={{ color: "#FFC300" }}
                  key={perceptionLevel}
                  initial={{ scale: 1.1 }}
                  animate={{ scale: 1 }}
                  transition={{ duration: 0.3 }}
                >
                  {perceptionLevel}
                </motion.span>
                <span className="font-mono-cosmic text-[0.45rem] tracking-[0.25em] text-white/25 mt-0.5">
                  % PERCEPCIÓN
                </span>
              </div>
            </div>

            {/* Scan data readout */}
            <div className="space-y-0 max-w-xs mx-auto border border-[#FFC300]/[0.06] rounded-lg overflow-hidden">
              {[
                {
                  label: "PATRONES DETECTADOS",
                  value: Math.min(847, Math.floor(scrollProgress * 1500)),
                },
                {
                  label: "SEÑALES OCULTAS",
                  value: Math.min(23, Math.floor(scrollProgress * 40)),
                },
                {
                  label: "FRECUENCIA MENTAL",
                  value: `${(7.83 + scrollProgress * 12).toFixed(1)} Hz`,
                },
              ].map((item, i) => (
                <div
                  key={i}
                  className="flex justify-between items-center px-4 py-2.5 border-b border-[#FFC300]/[0.04] last:border-b-0"
                >
                  <span className="font-mono-cosmic text-[0.45rem] tracking-[0.15em] text-white/20">
                    {item.label}
                  </span>
                  <span className="font-mono-cosmic text-[0.55rem] text-[#FFC300]/60">
                    {item.value}
                  </span>
                </div>
              ))}
            </div>

            {/* Continue prompt */}
            <p className="text-center font-mono-cosmic text-[0.45rem] tracking-[0.25em] text-white/10 mt-8">
              CONTINÚA DESLIZANDO PARA AUMENTAR TU PERCEPCIÓN
            </p>
          </div>
        </CosmicSection>

        {/* ─────────── SECTION 4: KNOWLEDGE VAULT ─────────── */}
        <CosmicSection id="vault" className="min-h-[140vh]">
          <div className="w-full">
            <div className="text-center mb-10">
              <p className="font-mono-cosmic text-[0.5rem] tracking-[0.3em] text-[#1B2A4E] mb-4">
                {"// "}ARCHIVO DESBLOQUEADO — CONTENIDO RESTRINGIDO
              </p>
              <h2 className="font-display text-2xl sm:text-3xl font-bold mb-2">
                CONOCIMIENTO
              </h2>
              <p className="font-display text-2xl sm:text-3xl font-bold text-[#FFC300] golden-glow">
                QUE NO SE ENSEÑA
              </p>
              <p className="font-body text-xs text-white/20 mt-4 max-w-xs mx-auto leading-[1.8]">
                Cada fragmento es una reliquia de un sistema de comprensión
                reservado para pocos. Desliza para revelar.
              </p>
            </div>

            {/* Singularity background */}
            <motion.div
              className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-72 h-72 rounded-full pointer-events-none"
              style={{
                scale: singularityScale,
                background:
                  "radial-gradient(circle, rgba(255,195,0,0.08) 0%, rgba(255,184,0,0.03) 35%, transparent 55%)",
                animation: "singularitySpin 25s linear infinite",
              }}
            />

            {/* Knowledge relics */}
            <VaultContent />
          </div>
        </CosmicSection>

        {/* ─────────── SECTION 5: ACHIEVEMENTS ─────────── */}
        <CosmicSection id="achievements" className="min-h-[120vh]">
          <div className="w-full">
            <div className="text-center mb-10">
              <p className="font-mono-cosmic text-[0.5rem] tracking-[0.3em] text-[#FFC300]/30 mb-4">
                {"// "}LOGROS DESBLOQUEADOS: {achievementsUnlocked}/5
              </p>
              <h2 className="font-display text-2xl sm:text-3xl font-bold mb-1">
                TU PERCEPCIÓN
              </h2>
              <p className="font-display text-2xl sm:text-3xl font-bold text-[#FFC300] golden-glow">
                SE EXPANDE
              </p>
              <p className="font-body text-xs text-white/20 mt-3 max-w-xs mx-auto">
                Cada patrón que reconoces eleva tu nivel de consciencia.
                Continúa para desbloquear más.
              </p>
            </div>

            {/* Achievement grid */}
            <div className="grid grid-cols-2 gap-3">
              <AchievementBadge
                icon="👁️"
                title="Lector Iniciado"
                subtitle="Has cruzado el primer umbral"
                unlocked={achievementsUnlocked >= 1}
                delay={0}
              />
              <AchievementBadge
                icon="🔮"
                title="Observador"
                subtitle="Detectas patrones invisibles"
                unlocked={achievementsUnlocked >= 2}
                delay={0.15}
              />
              <AchievementBadge
                icon="🧠"
                title="Arquitecto"
                subtitle="Comprendes la mente humana"
                unlocked={achievementsUnlocked >= 3}
                delay={0.3}
              />
              <AchievementBadge
                icon="⚡"
                title="Analista"
                subtitle="Ves más allá de la superficie"
                unlocked={achievementsUnlocked >= 4}
                delay={0.45}
              />
              <div className="col-span-2">
                <AchievementBadge
                  icon="🌟"
                  title="Guardián del Umbral"
                  subtitle="Has alcanzado el nivel máximo de percepción"
                  unlocked={achievementsUnlocked >= 5}
                  delay={0.6}
                />
              </div>
            </div>

            {/* Progress bar */}
            <div className="mt-10 relative">
              <div className="h-[1px] bg-white/[0.04] rounded-full overflow-hidden">
                <motion.div
                  className="h-full rounded-full"
                  style={{
                    width: `${(achievementsUnlocked / 5) * 100}%`,
                    background:
                      "linear-gradient(90deg, #FFB800, #FFC300, #FFD84D)",
                    boxShadow: "0 0 8px rgba(255,195,0,0.4)",
                  }}
                  transition={{ duration: 0.5 }}
                />
              </div>
              <p className="font-mono-cosmic text-[0.4rem] tracking-[0.2em] text-white/10 text-center mt-3">
                PROGRESO DE PERCEPCIÓN: {achievementsUnlocked}/5 LOGROS
              </p>
            </div>
          </div>
        </CosmicSection>

        {/* ─────────── SECTION 6: GOLDEN SINGULARITY ─────────── */}
        <CosmicSection id="singularity" className="min-h-[110vh]">
          <div className="w-full text-center">
            {/* Golden singularity visual */}
            <div className="relative w-56 h-56 mx-auto mb-12">
              {/* Outer glow */}
              <div
                className="absolute -inset-8 rounded-full pointer-events-none"
                style={{
                  background:
                    "radial-gradient(circle, rgba(255,195,0,0.15) 0%, rgba(255,184,0,0.05) 40%, transparent 60%)",
                  filter: "blur(25px)",
                  animation: "breatheGlow 3s ease-in-out infinite",
                }}
              />
              {/* Accretion disk 1 */}
              <div
                className="absolute inset-2 rounded-full border border-[#FFC300]/15 pointer-events-none"
                style={{
                  animation: "singularitySpin 15s linear infinite",
                  borderTopColor: "rgba(255,195,0,0.5)",
                  borderRightColor: "rgba(255,216,77,0.2)",
                }}
              />
              {/* Accretion disk 2 */}
              <div
                className="absolute inset-6 rounded-full border border-[#FFD84D]/10 pointer-events-none"
                style={{
                  animation: "singularitySpin 10s linear infinite reverse",
                  borderBottomColor: "rgba(255,216,77,0.4)",
                }}
              />
              {/* Accretion disk 3 */}
              <div
                className="absolute inset-10 rounded-full border border-[#FFC300]/[0.06] pointer-events-none"
                style={{
                  animation: "singularitySpin 7s linear infinite",
                  borderLeftColor: "rgba(255,195,0,0.3)",
                }}
              />
              {/* Core */}
              <div className="absolute inset-14 rounded-full bg-gradient-to-br from-[#FFC300] via-[#FFD84D] to-[#FFB800] shadow-[0_0_60px_rgba(255,195,0,0.4),0_0_120px_rgba(255,195,0,0.12)]" />
              {/* Image overlay */}
              <img
                src="/cosmic/singularity.png"
                alt="Singularidad dorada"
                className="absolute inset-0 w-full h-full object-contain rounded-full mix-blend-screen opacity-40 pointer-events-none"
              />
            </div>

            <p className="font-mono-cosmic text-[0.5rem] tracking-[0.3em] text-[#FFC300]/30 mb-5">
              {"// "}SINGULARIDAD EXPANDIÉNDOSE
            </p>
            <h2 className="font-display text-2xl sm:text-3xl md:text-4xl font-bold leading-[1.1] mb-5">
              TE ACERCAS
              <br />
              <span className="text-[#FFC300] golden-glow-strong">
                AL NÚCLEO
              </span>
            </h2>
            <p className="font-body text-xs text-white/25 max-w-xs mx-auto leading-[1.8]">
              El conocimiento reservado está a un paso. Lo que descubras aquí
              cambiará la forma en que percibes cada interacción humana.
            </p>

            {/* Mini CTA */}
            <motion.a
              href={CTA_LINK}
              target="_blank"
              rel="noopener noreferrer"
              onHoverStart={() => setHoverCTA(true)}
              onHoverEnd={() => setHoverCTA(false)}
              className="inline-block mt-10 font-mono-cosmic text-[0.65rem] tracking-[0.25em] text-[#050505] bg-gradient-to-r from-[#FFB800] via-[#FFC300] to-[#FFD84D] px-8 py-3.5 rounded-sm relative overflow-hidden font-bold"
              style={{
                boxShadow: hoverCTA
                  ? "0 0 50px rgba(255,195,0,0.35), 0 0 100px rgba(255,195,0,0.1)"
                  : "0 0 25px rgba(255,195,0,0.15)",
                transition: "box-shadow 0.5s ease",
              }}
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.97 }}
            >
              <span className="relative z-10">INICIAR EXPLORACIÓN</span>
              <div className="absolute inset-0 holo-shimmer" />
            </motion.a>
          </div>
        </CosmicSection>

        {/* ─────────── SECTION 7: THE KNOWLEDGE ─────────── */}
        <CosmicSection id="knowledge" className="min-h-[150vh]">
          <KnowledgeContent />
        </CosmicSection>

        {/* ─────────── SECTION 8: BONUSES ─────────── */}
        <CosmicSection id="bonuses" className="min-h-[130vh]">
          <BonusesContent />
        </CosmicSection>

        {/* ─────────── FINAL CTA ─────────── */}
        <section className="relative min-h-screen flex flex-col items-center justify-center px-5 py-20">
          {/* Absolute darkness */}
          <div className="absolute inset-0 bg-[#050505]" />

          {/* Central golden singularity */}
          <motion.div
            initial={{ scale: 0, opacity: 0 }}
            whileInView={{ scale: 1, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1.5 }}
            className="relative w-28 h-28 mb-14 z-10"
          >
            <div
              className="absolute -inset-10 rounded-full pointer-events-none"
              style={{
                background:
                  "radial-gradient(circle, rgba(255,195,0,0.3) 0%, rgba(255,184,0,0.1) 40%, transparent 60%)",
                filter: "blur(30px)",
                animation: "breatheGlow 3s ease-in-out infinite",
              }}
            />
            <div className="absolute inset-4 rounded-full bg-gradient-to-br from-[#FFC300] via-[#FFD84D] to-[#FFB800] shadow-[0_0_80px_rgba(255,195,0,0.4),0_0_160px_rgba(255,195,0,0.15)]" />
          </motion.div>

          {/* Stats */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1.5 }}
            className="relative z-10 text-center mb-8"
          >
            <p className="font-mono-cosmic text-[0.5rem] tracking-[0.3em] text-[#FFC300]/25 mb-6">
              {"// "}ANÁLISIS COMPLETADO
            </p>
            <h2 className="font-display text-2xl sm:text-3xl md:text-4xl font-bold leading-[1.1] mb-2">
              HAS LLEGADO MÁS LEJOS
            </h2>
            <p className="font-display text-3xl sm:text-4xl md:text-5xl font-black text-[#FFC300] golden-glow-strong mb-1">
              QUE EL 93%
            </p>
            <p className="font-display text-lg text-white/30 font-light">
              DE LOS VISITANTES
            </p>
          </motion.div>

          {/* Social proof */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1, delay: 0.5 }}
            className="relative z-10 flex flex-wrap justify-center gap-6 mb-12"
          >
            {[
              { val: "2,400+", label: "COPIAS" },
              { val: "4.8/5", label: "VALORACIÓN" },
              { val: "7 días", label: "GARANTÍA" },
            ].map((s, i) => (
              <div key={i} className="text-center">
                <p className="font-display text-lg font-bold text-[#FFC300]">
                  {s.val}
                </p>
                <p className="font-mono-cosmic text-[0.4rem] tracking-[0.15em] text-white/15 mt-0.5">
                  {s.label}
                </p>
              </div>
            ))}
          </motion.div>

          {/* Access label */}
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1, delay: 0.8 }}
            className="relative z-10 font-mono-cosmic text-[0.55rem] tracking-[0.35em] text-white/25 mb-5"
          >
            ACCESO DISPONIBLE
          </motion.p>

          {/* Price */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1, delay: 1 }}
            className="relative z-10 text-center mb-8"
          >
            <p className="font-body text-xs text-white/15 line-through mb-1">
              DE US$110
            </p>
            <p className="font-display text-5xl font-black text-white">
              US${" "}
              <span className="text-[#FFC300] golden-glow-strong">22</span>
            </p>
            <p className="font-mono-cosmic text-[0.45rem] tracking-[0.15em] text-white/12 mt-2">
              PAGO ÚNICO · ACCESO INMEDIATO · LIBRO + 4 BONOS
            </p>
          </motion.div>

          {/* Final CTA Button */}
          <motion.a
            href={CTA_LINK}
            target="_blank"
            rel="noopener noreferrer"
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 1.3 }}
            className="relative z-10 block w-full max-w-xs font-mono-cosmic text-[0.7rem] tracking-[0.25em] text-[#050505] bg-gradient-to-r from-[#FFB800] via-[#FFC300] to-[#FFD84D] px-8 py-4 rounded-sm font-bold text-center overflow-hidden cursor-pointer"
            style={{
              boxShadow:
                "0 0 40px rgba(255,195,0,0.25), 0 0 80px rgba(255,195,0,0.08)",
              animation: "breatheGlow 3s ease-in-out infinite",
            }}
            whileHover={{
              scale: 1.04,
              boxShadow:
                "0 0 60px rgba(255,195,0,0.45), 0 0 120px rgba(255,195,0,0.15)",
            }}
            whileTap={{ scale: 0.97 }}
          >
            <span className="relative z-10">DESBLOQUEAR ACCESO</span>
            <div className="absolute inset-0 holo-shimmer" />
          </motion.a>

          {/* Warning */}
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1, delay: 1.8 }}
            className="relative z-10 font-mono-cosmic text-[0.4rem] tracking-[0.2em] text-[#FFC300]/15 text-center mt-7 max-w-xs"
          >
            ⚠ PRECIO DE LANZAMIENTO — PUEDE CAMBIAR SIN PREVIO AVISO
          </motion.p>

          {/* Guarantee */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1, delay: 2.2 }}
            className="relative z-10 mt-8 border border-[#FFC300]/[0.06] rounded-lg p-5 max-w-xs text-center bg-[#FFC300]/[0.015]"
          >
            <p className="font-mono-cosmic text-[0.45rem] tracking-[0.15em] text-[#FFC300]/30 mb-2">
              GARANTÍA ABSOLUTA
            </p>
            <p className="font-body text-xs text-white/20 leading-[1.8]">
              Si dentro de 7 días no sientes que tu percepción se ha expandido,
              te devolvemos cada centavo. Sin preguntas.
            </p>
          </motion.div>

          {/* Bottom spacer */}
          <div className="h-16" />
        </section>
      </main>
    </>
  );
}

/* ─────────── VAULT CONTENT SUBCOMPONENT ─────────── */
function VaultContent() {
  const ref = useRef(null);
  const isInView = useInView(ref, { amount: 0.1, once: true });

  const relics = [
    {
      chapter: "CAP. 5 — DOMINANDO LA MENTE HUMANA",
      text: "Cuando alguien te halaga excesivamente en los primeros minutos de conocerte, no está siendo amable — está activando el principio de reciprocidad para que bajes la guardia.",
      source: "Cap. 5 — Dominando la Mente Humana",
    },
    {
      chapter: "CAP. 2 — EL PODER MAQUIAVÉLICO",
      text: "Un líder inteligente no puede ni debe cumplir su palabra cuando tal cumplimiento se vuelve en su contra. Si todos los hombres fueran buenos, este precepto no sería válido.",
      source: "Cap. 2 — El Poder Maquiavélico",
    },
    {
      chapter: "CAP. 6 — SEDUCCIÓN PSICOLÓGICA",
      text: "La seducción no comienza con lo que dices, sino con lo que la otra persona cree que descubrió por sí misma sobre ti. El misterio calculado es tu arma más poderosa.",
      source: "Cap. 6 — El Arte de la Seducción Psicológica",
    },
    {
      chapter: "CAP. 3 — LEY DEL VACÍO ESTRATÉGICO",
      text: "La ausencia calculada genera más poder que la presencia constante. Cuando desapareces en el momento correcto, la otra persona llena ese vacío con pensamientos sobre ti.",
      source: "Cap. 3 — Ley #4: El Vacío Estratégico",
    },
  ];

  return (
    <div ref={ref} className="space-y-4 mt-4">
      {relics.map((relic, i) => (
        <KnowledgeRelic
          key={i}
          chapter={relic.chapter}
          text={relic.text}
          source={relic.source}
          index={i}
          isVisible={isInView}
        />
      ))}
    </div>
  );
}

/* ─────────── KNOWLEDGE CONTENT ─────────── */
function KnowledgeContent() {
  const ref = useRef(null);
  const isInView = useInView(ref, { amount: 0.1, once: true });

  const items = [
    {
      icon: "👁️",
      text: "Las 8 Leyes del Comportamiento Humano — predice lo que cualquiera hará antes de que lo haga",
    },
    {
      icon: "🧠",
      text: "Técnicas de persuasión oscura que usan negociadores de élite",
    },
    {
      icon: "🛡️",
      text: "Cómo detectar manipulación emocional en relaciones y trabajo",
    },
    {
      icon: "💘",
      text: "El arte de la seducción psicológica — sin trucos baratos",
    },
    {
      icon: "🎭",
      text: "Control emocional absoluto — que nadie vea lo que sientes",
    },
    {
      icon: "⚠️",
      text: "Identificar narcisistas, maquiavélicos y psicópatas antes de que te dañen",
    },
    {
      icon: "🔗",
      text: "Protegerte de relaciones tóxicas con ciencia",
    },
    {
      icon: "♟️",
      text: "El camino al poder absoluto — influencia sin fuerza",
    },
  ];

  return (
    <div ref={ref} className="w-full">
      <div className="text-center mb-10">
        <p className="font-mono-cosmic text-[0.5rem] tracking-[0.3em] text-[#FFC300]/30 mb-4">
          {"// "}ARSENAL COGNITIVO DESBLOQUEADO
        </p>
        <h2 className="font-display text-2xl sm:text-3xl font-bold mb-1">
          10 CAPÍTULOS. 8 LEYES.
        </h2>
        <p className="font-display text-xl sm:text-2xl font-bold text-[#FFC300] golden-glow">
          UN ARSENAL COMPLETO.
        </p>
      </div>

      <div className="space-y-2.5">
        {items.map((item, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, x: -25 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7, delay: i * 0.1 }}
            className="flex items-start gap-3.5 border border-[#FFC300]/[0.06] bg-gradient-to-r from-[#FFC300]/[0.02] to-transparent rounded-lg p-4 group hover:border-[#FFC300]/15 transition-all duration-500"
          >
            <span className="text-lg flex-shrink-0 mt-0.5 group-hover:scale-110 transition-transform duration-300">
              {item.icon}
            </span>
            <p className="font-body text-xs text-white/50 leading-[1.7] group-hover:text-white/70 transition-colors duration-500">
              {item.text}
            </p>
          </motion.div>
        ))}
      </div>
    </div>
  );
}

/* ─────────── BONUSES CONTENT ─────────── */
function BonusesContent() {
  const ref = useRef(null);
  const isInView = useInView(ref, { amount: 0.1, once: true });

  const bonuses = [
    {
      num: "01",
      title: "Cómo Detectar Mentiras",
      subtitle: "Desenmascara el Engaño",
      price: "~$29",
    },
    {
      num: "02",
      title: "Gestos Corporales en la Vida Diaria",
      subtitle: "Lectura Corporal Avanzada",
      price: "~$19",
    },
    {
      num: "03",
      title: "Gestos Corporales en la Seducción",
      subtitle: "Citas, Atracción y Conexión",
      price: "~$24",
    },
    {
      num: "04",
      title: "Activa el Poder de Tu Mente",
      subtitle: "Desbloquea tu Don Oculto",
      price: "~$19",
    },
  ];

  return (
    <div ref={ref} className="w-full">
      <div className="text-center mb-10">
        <p className="font-mono-cosmic text-[0.5rem] tracking-[0.3em] text-[#FFC300]/30 mb-4">
          {"// "}ARCHIVOS ADICIONALES DESBLOQUEADOS
        </p>
        <h2 className="font-display text-2xl sm:text-3xl font-bold mb-1">
          4 MANUALES DE PODER
        </h2>
        <p className="font-display text-lg italic text-[#FFC300]/50">
          Incluidos con tu acceso
        </p>
      </div>

      <div className="space-y-3">
        {bonuses.map((bonus, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 25 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, delay: i * 0.12 }}
            className="relative border border-[#FFC300]/[0.08] bg-gradient-to-b from-[#FFC300]/[0.03] to-transparent rounded-lg p-5 overflow-hidden group hover:border-[#FFC300]/20 transition-all duration-500"
          >
            <div className="absolute inset-0 holo-shimmer opacity-20" />
            <div className="relative z-10">
              <div className="flex items-center gap-2.5 mb-3">
                <span className="w-1.5 h-1.5 rounded-full bg-[#FFC300] shadow-[0_0_6px_rgba(255,195,0,0.5)]" />
                <span className="font-mono-cosmic text-[0.45rem] tracking-[0.25em] text-[#FFC300]/40 font-bold">
                  BONO {bonus.num}
                </span>
              </div>
              <h3 className="font-display text-base font-bold text-white mb-0.5 group-hover:text-[#FFD84D] transition-colors duration-300">
                {bonus.title}
              </h3>
              <p className="font-body text-xs text-white/25 italic mb-3">
                {bonus.subtitle}
              </p>
              <p className="font-mono-cosmic text-[0.6rem]">
                <span className="text-white/15 line-through">{bonus.price}</span>{" "}
                <span className="text-[#FFC300] font-bold">GRATIS</span>
              </p>
            </div>
          </motion.div>
        ))}
      </div>

      <motion.p
        initial={{ opacity: 0 }}
        animate={isInView ? { opacity: 1 } : {}}
        transition={{ duration: 0.8, delay: 0.8 }}
        className="font-mono-cosmic text-[0.55rem] text-center text-white/15 mt-6"
      >
        Total en bonos: <span className="line-through text-white/10">~$91</span>{" "}
        <span className="text-[#FFC300] font-bold">→ Incluidos GRATIS</span>
      </motion.p>
    </div>
  );
}
