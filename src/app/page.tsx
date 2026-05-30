"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion";
import CosmicCanvas from "@/components/cosmic/CosmicCanvas";
import CosmicEntity from "@/components/cosmic/CosmicEntity";
import GoldenSingularity from "@/components/cosmic/GoldenSingularity";

const CTA = "https://app.elsabiomanipulador.com/inicio?ref=L106036858P";

/* ══════════════════════════════════════ */
/* FORBIDDEN SYSTEM — HUD                */
/* ══════════════════════════════════════ */

const HUD_MESSAGES = [
  { at: 0.03, text: "SEÑAL INTERCEPTADA" },
  { at: 0.10, text: "ESCANEO NO AUTORIZADO" },
  { at: 0.18, text: "ANÁLISIS CLASIFICADO" },
  { at: 0.28, text: "BRECHA DETECTADA" },
  { at: 0.38, text: "PATRÓN 7-F" },
  { at: 0.48, text: "DECODIFICACIÓN FORZADA" },
  { at: 0.58, text: "FRECUENCIA ANÓMALA" },
  { at: 0.70, text: "NIVEL 3" },
  { at: 0.82, text: "NÚCLEO EXPUESTO" },
  { at: 0.92, text: "PORTAL INESTABLE" },
];

function ConsciousHUD({ text, visible }: { text: string; visible: boolean }) {
  return (
    <AnimatePresence mode="wait">
      {visible && text && (
        <motion.div
          key={text}
          initial={{ opacity: 0, x: -12 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: 12 }}
          transition={{ duration: 0.4 }}
          className="fixed left-3 top-1/2 -translate-y-1/2 z-30 pointer-events-none"
        >
          <div className="flex items-center gap-2">
            <motion.div
              className="w-1 h-1 rounded-full bg-[#FFC300]"
              animate={{ opacity: [0.2, 1, 0.2] }}
              transition={{ duration: 1.2, repeat: Infinity }}
              style={{ boxShadow: "0 0 5px rgba(255,195,0,0.5)" }}
            />
            <span
              className="font-mono-cosmic text-[0.32rem] tracking-[0.2em] text-[#FFC300]/25"
              style={{ writingMode: "vertical-rl", textOrientation: "mixed" }}
            >
              {text}
            </span>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

/* ══════════════════════════════════════ */
/* EXPLORATION PROGRESS                  */
/* ══════════════════════════════════════ */

function ExplorationProgress({ progress }: { progress: number }) {
  const pct = Math.min(100, Math.floor(progress * 100));
  return (
    <div className="fixed right-3 top-1/2 -translate-y-1/2 z-30 flex flex-col items-center gap-2 pointer-events-none">
      <div className="w-[1px] h-24 bg-white/[0.015] rounded-full overflow-hidden relative">
        <motion.div
          className="absolute bottom-0 w-full rounded-full"
          style={{
            height: `${pct}%`,
            background: "linear-gradient(to top, #FFB800, #FFC300, #FFD84D)",
            boxShadow: "0 0 4px rgba(255,195,0,0.2)",
          }}
          transition={{ duration: 0.3 }}
        />
      </div>
      <span className="font-mono-cosmic text-[0.28rem] text-[#FFC300]/18">{pct}%</span>
    </div>
  );
}

/* ══════════════════════════════════════ */
/* SCROLL BAR                            */
/* ══════════════════════════════════════ */

function ScrollBar({ progress }: { progress: number }) {
  return (
    <div className="fixed top-0 left-0 right-0 z-50 h-[1px]">
      <div
        className="h-full"
        style={{
          width: `${progress * 100}%`,
          background: "linear-gradient(90deg, #FFB800, #FFC300, #FFD84D)",
          boxShadow: "0 0 6px rgba(255,195,0,0.25)",
          transition: "width 0.2s ease-out",
        }}
      />
    </div>
  );
}

/* ══════════════════════════════════════ */
/* ARCHIVE MODULE — CLASSIFIED           */
/* ══════════════════════════════════════ */

function ArchiveModule({
  id,
  title,
  text,
  unlocked,
  delay = 0,
}: {
  id: string;
  title: string;
  text: string;
  unlocked: boolean;
  delay?: number;
}) {
  const [revealed, setRevealed] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={unlocked ? { opacity: 1, y: 0 } : { opacity: 0 }}
      transition={{ duration: 0.8, delay: unlocked ? delay : 0, ease: "easeOut" }}
      onClick={() => unlocked && setRevealed(!revealed)}
      className={`relative overflow-hidden cursor-pointer transition-all duration-500 ${
        unlocked ? "hover:opacity-90" : ""
      }`}
    >
      <div className={`py-3 px-3 border-l transition-all duration-500 ${
        unlocked
          ? "border-[#FFC300]/20 bg-gradient-to-r from-[#FFC300]/[0.015] to-transparent"
          : "border-white/[0.015]"
      }`}>
        <div className="flex items-center gap-2 mb-1">
          <div className={`w-0.5 h-0.5 rounded-full transition-all duration-500 ${
            unlocked ? "bg-[#FFC300] shadow-[0_0_4px_rgba(255,195,0,0.35)]" : "bg-white/3"
          }`} />
          <span className={`font-mono-cosmic text-[0.25rem] tracking-[0.3em] transition-colors duration-500 ${
            unlocked ? "text-[#FFC300]/25" : "text-white/3"
          }`}>
            {id}
          </span>
        </div>

        <p className={`font-display text-xs font-bold transition-colors duration-500 ${
          unlocked ? "text-white/70" : "text-white/3"
        }`}>
          {title}
        </p>

        <AnimatePresence>
          {revealed && unlocked && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.5, ease: "easeOut" }}
              className="overflow-hidden"
            >
              <p className="font-body text-[0.65rem] italic text-white/30 leading-relaxed mt-2 pt-2 border-t border-[#FFC300]/[0.03]">
                {text}
              </p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
}

/* ══════════════════════════════════════ */
/* SIGNAL — ACHIEVEMENT                  */
/* ══════════════════════════════════════ */

function Signal({
  icon,
  title,
  unlocked,
  delay = 0,
}: {
  icon: string;
  title: string;
  unlocked: boolean;
  delay?: number;
}) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={unlocked ? { opacity: 1 } : { opacity: 0.03 }}
      transition={{ duration: 0.6, delay: unlocked ? delay : 0 }}
      className="flex items-center gap-2"
    >
      <span className={`text-sm ${unlocked ? "" : "grayscale opacity-20"}`}>{icon}</span>
      <span className={`font-mono-cosmic text-[0.55rem] tracking-[0.08em] transition-colors duration-500 ${
        unlocked ? "text-white/40" : "text-white/2"
      }`}>
        {title}
      </span>
    </motion.div>
  );
}

/* ══════════════════════════════════════ */
/* THE BREACH — CENTRAL EXPLOSION SCENE  */
/* ══════════════════════════════════════ */

function TheBreach({ phase }: { phase: number }) {
  // phase: 0=off, 1=black, 2=singularity, 3=text, 4=explosion, 5=fade
  if (phase === 0) return null;

  return (
    <motion.div
      className="fixed inset-0 z-[90] flex items-center justify-center"
      style={{ backgroundColor: "#050505" }}
      initial={{ opacity: 0 }}
      animate={{ opacity: phase === 5 ? 0 : 1 }}
      transition={{ duration: phase === 5 ? 1.8 : 0.6 }}
    >
      {/* ── SINGULARITY CORE ── */}
      {phase >= 2 && (
        <motion.div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full"
          style={{
            backgroundColor: "#FFC300",
            boxShadow: phase < 4
              ? "0 0 15px rgba(255,195,0,0.5), 0 0 35px rgba(255,195,0,0.25), 0 0 70px rgba(255,195,0,0.1)"
              : "0 0 200px rgba(255,195,0,0.8), 0 0 500px rgba(255,195,0,0.4)",
          }}
          initial={{ width: 0, height: 0, opacity: 0 }}
          animate={{
            width: phase >= 4 ? 4000 : 5,
            height: phase >= 4 ? 4000 : 5,
            opacity: phase >= 4 ? 0 : 1,
          }}
          transition={{
            duration: phase >= 4 ? 1 : 1.5,
            ease: phase >= 4 ? [0.16, 1, 0.3, 1] : "easeInOut",
          }}
        />
      )}

      {/* ── FLASH ── */}
      {phase >= 4 && (
        <motion.div
          className="fixed inset-0"
          style={{ backgroundColor: "#FFD84D" }}
          initial={{ opacity: 0 }}
          animate={{ opacity: [0, 0.5, 0] }}
          transition={{ duration: 0.7 }}
        />
      )}

      {/* ── SEQUENTIAL TEXT ── */}
      {phase >= 3 && (
        <div className="relative z-10 text-center px-8">
          <motion.h1
            initial={{ opacity: 0, y: 25, filter: "blur(12px)" }}
            animate={{ opacity: phase >= 4 ? 0 : 1, y: 0, filter: "blur(0px)" }}
            transition={{ duration: 1.5, ease: "easeOut" }}
            className="font-display text-4xl sm:text-6xl font-black text-white/90"
          >
            OBSERVAR
          </motion.h1>
          <motion.h1
            initial={{ opacity: 0, y: 25, filter: "blur(12px)" }}
            animate={{ opacity: phase >= 4 ? 0 : 1, y: 0, filter: "blur(0px)" }}
            transition={{ duration: 1.5, delay: 0.7, ease: "easeOut" }}
            className="font-display text-4xl sm:text-6xl font-black text-[#FFC300] golden-glow-strong mt-2"
          >
            NO ES LO MISMO
          </motion.h1>
          <motion.h1
            initial={{ opacity: 0, y: 25, filter: "blur(12px)" }}
            animate={{ opacity: phase >= 4 ? 0 : 1, y: 0, filter: "blur(0px)" }}
            transition={{ duration: 1.5, delay: 1.4, ease: "easeOut" }}
            className="font-display text-4xl sm:text-6xl font-black text-white/40 mt-2"
          >
            QUE VER
          </motion.h1>
        </div>
      )}
    </motion.div>
  );
}

/* ══════════════════════════════════════ */
/* MAIN — ANOMALY EXPERIENCE             */
/* ══════════════════════════════════════ */

export default function ElUmbral() {
  const containerRef = useRef(null);
  const [scrollProg, setScrollProg] = useState(0);
  const [perception, setPerception] = useState(0);
  const [achievements, setAchievements] = useState(0);
  const [loaded, setLoaded] = useState(true);
  const [hudText, setHudText] = useState("");
  const [breachPhase, setBreachPhase] = useState(0);
  const hasBreached = useRef(false);

  const { scrollYProgress } = useScroll({ target: containerRef });

  const entityY = useTransform(scrollYProgress, [0.08, 0.25], [80, -100]);
  const entityScale = useTransform(scrollYProgress, [0.08, 0.25], [0.8, 1.15]);
  const singularityGrow = useTransform(scrollYProgress, [0.70, 0.95], [0.3, 2.5]);

  // Loader
  useEffect(() => {
    const t = setTimeout(() => setLoaded(false), 800);
    return () => clearTimeout(t);
  }, []);

  // Breach phase machine
  useEffect(() => {
    if (breachPhase === 1) {
      const t = setTimeout(() => setBreachPhase(2), 800);
      return () => clearTimeout(t);
    }
    if (breachPhase === 2) {
      const t = setTimeout(() => setBreachPhase(3), 1200);
      return () => clearTimeout(t);
    }
    if (breachPhase === 3) {
      const t = setTimeout(() => setBreachPhase(4), 3200);
      return () => clearTimeout(t);
    }
    if (breachPhase === 4) {
      const t = setTimeout(() => setBreachPhase(5), 500);
      return () => clearTimeout(t);
    }
    if (breachPhase === 5) {
      const t = setTimeout(() => setBreachPhase(0), 2000);
      return () => clearTimeout(t);
    }
  }, [breachPhase]);

  // Scroll tracking
  useEffect(() => {
    const unsub = scrollYProgress.on("change", (v) => {
      setScrollProg(v);
      setPerception(Math.min(100, Math.floor(v * 180)));

      if (v > 0.06 && achievements < 1) setAchievements(1);
      if (v > 0.16 && achievements < 2) setAchievements(2);
      if (v > 0.30 && achievements < 3) setAchievements(3);
      if (v > 0.48 && achievements < 4) setAchievements(4);
      if (v > 0.65 && achievements < 5) setAchievements(5);
      if (v > 0.82 && achievements < 6) setAchievements(6);
      if (v > 0.93 && achievements < 7) setAchievements(7);

      // HUD
      let currentMsg = "";
      for (const msg of HUD_MESSAGES) {
        if (v >= msg.at) currentMsg = msg.text;
      }
      setHudText(currentMsg);

      // Breach trigger (once only)
      if (v > 0.22 && v < 0.28 && !hasBreached.current) {
        hasBreached.current = true;
        setBreachPhase(1);
      }
    });
    return () => unsub();
  }, [scrollYProgress, achievements]);

  const vibrate = useCallback(() => {
    if (typeof navigator !== "undefined" && navigator.vibrate) navigator.vibrate(12);
  }, []);

  useEffect(() => {
    if (achievements > 0) vibrate();
  }, [achievements, vibrate]);

  return (
    <>
      {/* ═══════════════ LOADER ═══════════════ */}
      <AnimatePresence>
        {loaded && (
          <motion.div
            className="fixed inset-0 z-[100] bg-[#050505] flex items-center justify-center"
            exit={{ opacity: 0 }}
            transition={{ duration: 3, ease: "easeInOut" }}
          >
            <motion.div
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: [0, 1.3, 1], opacity: [0, 1, 1] }}
              exit={{ scale: 5, opacity: 0 }}
              transition={{ duration: 2 }}
            >
              <GoldenSingularity size={60} intensity={1.5} variant="loader" />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ═══════════════ FIXED LAYERS ═══════════════ */}
      <CosmicCanvas />
      <div className="fixed inset-0 z-[1] scanlines pointer-events-none" />
      <div className="grain-overlay" />
      <div className="scan-sweep" />

      {/* Vignette */}
      <div
        className="fixed inset-0 z-[2] pointer-events-none"
        style={{
          background: "radial-gradient(ellipse at center, transparent 40%, rgba(5,5,5,0.5) 80%, rgba(5,5,5,0.85) 100%)",
        }}
      />

      <ScrollBar progress={scrollProg} />
      <ExplorationProgress progress={scrollProg} />
      <ConsciousHUD text={hudText} visible={!!hudText && breachPhase === 0} />

      {/* ═══════════════ THE BREACH ═══════════════ */}
      <TheBreach phase={breachPhase} />

      {/* ═══════════════ SCROLL JOURNEY ═══════════════ */}
      <main ref={containerRef} className="relative">

        {/* ── VOID ── */}
        <section className="relative min-h-screen flex flex-col items-center justify-center px-6">
          <motion.div
            initial={{ opacity: 0, scale: 0.2 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 5, delay: 2.5 }}
            className="mb-20"
          >
            <GoldenSingularity size={50} intensity={0.5} variant="icon" />
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 25, filter: "blur(10px)" }}
            animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            transition={{ duration: 4, delay: 4 }}
            className="font-display text-[4rem] sm:text-8xl font-black leading-[0.9] text-center text-white/85"
          >
            OBSERVAR
          </motion.h1>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 8 }}
            className="absolute bottom-16 left-1/2 -translate-x-1/2"
          >
            <motion.div
              animate={{ y: [0, 6, 0], opacity: [0.1, 0.35, 0.1] }}
              transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
            >
              <GoldenSingularity size={8} intensity={0.2} variant="loader" />
            </motion.div>
          </motion.div>
        </section>

        {/* ── GUARDIAN ── */}
        <section className="relative min-h-[140vh] flex flex-col items-center justify-center px-6">
          <div className="h-[20vh]" />

          <motion.div
            style={{ y: entityY, scale: entityScale }}
            className="relative z-10"
          >
            <CosmicEntity size={280} intensity={0.8 + scrollProg * 0.6} />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 15, filter: "blur(8px)" }}
            whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 2.5, delay: 0.8 }}
            className="text-center mt-16 relative z-10"
          >
            <h2 className="font-display text-2xl sm:text-4xl font-black">
              <span className="text-[#FFC300] golden-glow-strong">MUY POCOS DETECTAN</span>
            </h2>
          </motion.div>

          <div className="h-[25vh]" />
        </section>

        {/* ── BREACH SPACE ── */}
        <section className="relative h-[25vh]" />

        {/* ── PERCEPTION ── */}
        <section className="relative min-h-screen flex flex-col items-center justify-center px-6">
          <div className="w-full max-w-[180px] mx-auto">
            <div className="relative mb-8">
              <GoldenSingularity
                size={150}
                intensity={0.4 + scrollProg * 0.6}
                variant="meter"
                progress={perception}
              />
              <div className="absolute inset-0 flex flex-col items-center justify-center">
                <motion.span
                  className="font-display text-3xl font-black text-[#FFC300] golden-glow-strong"
                  key={perception}
                  initial={{ scale: 1.06 }}
                  animate={{ scale: 1 }}
                  transition={{ duration: 0.15 }}
                >
                  {perception}
                </motion.span>
                <span className="font-mono-cosmic text-[0.22rem] tracking-[0.3em] text-white/8 mt-0.5">%</span>
              </div>
            </div>

            <div className="space-y-1">
              {[
                Math.min(847, Math.floor(scrollProg * 1500)),
                Math.min(23, Math.floor(scrollProg * 40)),
                `${(7.83 + scrollProg * 12).toFixed(1)}`,
              ].map((v, i) => (
                <div key={i} className="flex justify-end py-0.5 border-b border-[#FFC300]/[0.02]">
                  <span className="font-mono-cosmic text-[0.3rem] text-[#FFC300]/25">{v}{i === 2 ? "Hz" : ""}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── ARCHIVES ── */}
        <section className="relative min-h-screen flex flex-col items-center justify-center px-6 py-24">
          <motion.div
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 rounded-full pointer-events-none"
            style={{
              scale: singularityGrow,
              background: "radial-gradient(circle, rgba(255,195,0,0.03) 0%, transparent 40%)",
              animation: "singularitySpin 45s linear infinite",
            }}
          />

          <div className="w-full max-w-[260px] mx-auto relative z-10">
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 1.5 }}
              className="mb-8"
            >
              <div className="w-6 h-[1px] bg-[#FFC300]/8" />
            </motion.div>

            <div className="space-y-0.5">
              <ArchiveModule id="001" title="Reciprocidad" text="El halago excesivo no es amabilidad — es un mecanismo." unlocked={scrollProg > 0.35} />
              <ArchiveModule id="002" title="Maquiavelismo" text="Cumplir tu palabra cuando se vuelve en tu contra es debilidad, no virtud." unlocked={scrollProg > 0.42} delay={0.12} />
              <ArchiveModule id="003" title="Seducción" text="No comienza con lo que dices, sino con lo que el otro cree que descubrió solo." unlocked={scrollProg > 0.50} delay={0.24} />
              <ArchiveModule id="004" title="Vacío" text="La ausencia calculada genera más poder que la presencia constante." unlocked={scrollProg > 0.58} delay={0.36} />
              <ArchiveModule id="005" title="Anclaje" text="Confían en ti cuando permaneces en silencio en el instante preciso." unlocked={scrollProg > 0.66} delay={0.48} />
            </div>
          </div>
        </section>

        {/* ── SIGNALS ── */}
        <section className="relative min-h-[70vh] flex flex-col items-center justify-center px-6 py-24">
          <div className="w-full max-w-[200px] mx-auto">
            <div className="space-y-3.5">
              <Signal icon="👁️" title="Señal" unlocked={achievements >= 1} />
              <Signal icon="🔮" title="Observador" unlocked={achievements >= 2} delay={0.08} />
              <Signal icon="🔍" title="Descifrador" unlocked={achievements >= 3} delay={0.12} />
              <Signal icon="🧠" title="Arquitecto" unlocked={achievements >= 4} delay={0.16} />
              <Signal icon="⚡" title="Analista" unlocked={achievements >= 5} delay={0.2} />
              <Signal icon="🌟" title="Explorador" unlocked={achievements >= 6} delay={0.24} />
              <Signal icon="🌀" title="Guardián" unlocked={achievements >= 7} delay={0.28} />
            </div>

            <div className="mt-6 h-[1px] bg-white/[0.015] rounded-full overflow-hidden">
              <motion.div
                className="h-full rounded-full"
                style={{
                  width: `${(achievements / 7) * 100}%`,
                  background: "linear-gradient(90deg, #FFB800, #FFC300, #FFD84D)",
                  boxShadow: "0 0 3px rgba(255,195,0,0.15)",
                }}
                transition={{ duration: 0.3 }}
              />
            </div>
          </div>
        </section>

        {/* ── NÚCLEO ── */}
        <section className="relative min-h-screen flex flex-col items-center justify-center px-6">
          <motion.div
            initial={{ opacity: 0, scale: 0.4 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 3 }}
            className="mb-14"
          >
            <GoldenSingularity size={200} intensity={1.8} variant="portal" />
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, filter: "blur(6px)" }}
            whileInView={{ opacity: 1, filter: "blur(0px)" }}
            viewport={{ once: true }}
            transition={{ duration: 2.5, delay: 0.8 }}
            className="font-display text-3xl sm:text-5xl font-black text-[#FFC300] golden-glow-strong"
          >
            NÚCLEO
          </motion.h2>
        </section>

        {/* ── THE CROSSING ── */}
        <section className="relative min-h-screen flex flex-col items-center justify-center px-6 bg-gradient-to-b from-transparent via-[#050505]/60 to-[#050505]">
          <motion.div
            initial={{ scale: 0, opacity: 0 }}
            whileInView={{ scale: 1, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 2.5 }}
            className="relative mb-10"
          >
            <GoldenSingularity size={130} intensity={2.5} variant="cta" />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1.5, delay: 1 }}
            className="text-center relative z-10"
          >
            <p className="font-display text-3xl font-black text-white mb-1">
              <span className="text-[#FFC300] golden-glow-strong">22</span>
            </p>
          </motion.div>

          <motion.a
            href={CTA}
            target="_blank"
            rel="noopener noreferrer"
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 1.8 }}
            className="relative z-10 mt-10 block w-full max-w-[280px] font-mono-cosmic text-[0.5rem] tracking-[0.35em] text-[#050505] bg-gradient-to-r from-[#FFB800] via-[#FFC300] to-[#FFD84D] px-8 py-4 rounded-sm font-bold text-center overflow-hidden"
            style={{
              boxShadow: "0 0 35px rgba(255,195,0,0.12)",
              animation: "breatheGlow 3s ease-in-out infinite",
            }}
            whileHover={{ scale: 1.04, boxShadow: "0 0 55px rgba(255,195,0,0.3)" }}
            whileTap={{ scale: 0.97 }}
          >
            <span className="relative z-10">CRUZAR EL UMBRAL</span>
            <div className="absolute inset-0 holo-shimmer" />
          </motion.a>

          <div className="h-20" />
        </section>
      </main>
    </>
  );
}
