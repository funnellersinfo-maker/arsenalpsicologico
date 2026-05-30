"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import { motion, useScroll, useTransform, useInView, AnimatePresence } from "framer-motion";
import ParticleCanvas from "@/components/cosmic/ParticleCanvas";
import CosmicEntity from "@/components/cosmic/CosmicEntity";

const CTA = "https://app.elsabiomanipulador.com/inicio?ref=L106036858P";

/* ═══════ HUD STATUS ═══════ */
function HUDStatus({ text, visible }: { text: string; visible: boolean }) {
  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: 20 }}
          transition={{ duration: 0.6 }}
          className="fixed left-4 top-1/2 -translate-y-1/2 z-30 pointer-events-none"
        >
          <div className="flex items-center gap-2">
            <div className="w-1 h-1 rounded-full bg-[#FFC300] shadow-[0_0_6px_rgba(255,195,0,0.8)]" />
            <span className="font-mono-cosmic text-[0.45rem] tracking-[0.2em] text-[#FFC300]/40 writing-mode-vertical"
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

/* ═══════ MISSION PROGRESS ═══════ */
function MissionProgress({ progress }: { progress: number }) {
  const pct = Math.min(100, Math.floor(progress * 100));
  return (
    <div className="fixed right-3 top-1/2 -translate-y-1/2 z-30 flex flex-col items-center gap-2 pointer-events-none">
      <span className="font-mono-cosmic text-[0.35rem] tracking-[0.15em] text-[#FFC300]/20">
        EXPLORACIÓN
      </span>
      <div className="w-[2px] h-32 bg-white/[0.03] rounded-full overflow-hidden relative">
        <motion.div
          className="absolute bottom-0 w-full rounded-full"
          style={{
            height: `${pct}%`,
            background: "linear-gradient(to top, #FFB800, #FFC300, #FFD84D)",
            boxShadow: "0 0 8px rgba(255,195,0,0.3)",
          }}
          transition={{ duration: 0.4 }}
        />
      </div>
      <span className="font-mono-cosmic text-[0.4rem] text-[#FFC300]/30">{pct}%</span>
    </div>
  );
}

/* ═══════ SCROLL PROGRESS BAR ═══════ */
function ScrollBar({ progress }: { progress: number }) {
  return (
    <div className="fixed top-0 left-0 right-0 z-50 h-[1px]">
      <div
        className="h-full"
        style={{
          width: `${progress * 100}%`,
          background: "linear-gradient(90deg, #FFB800, #FFC300, #FFD84D)",
          boxShadow: "0 0 8px rgba(255,195,0,0.4)",
          transition: "width 0.3s ease-out",
        }}
      />
    </div>
  );
}

/* ═══════ ARCHIVE MODULE ═══════ */
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
      initial={{ opacity: 0, scale: 0.92 }}
      animate={unlocked ? { opacity: 1, scale: 1 } : { opacity: 0.1, scale: 0.95 }}
      transition={{ duration: 0.9, delay: unlocked ? delay : 0, ease: [0.34, 1.56, 0.64, 1] }}
      onClick={() => unlocked && setRevealed(!revealed)}
      className={`relative overflow-hidden rounded-xl border cursor-pointer transition-all duration-700 ${
        unlocked
          ? "border-[#FFC300]/20 hover:border-[#FFC300]/40"
          : "border-white/[0.03]"
      }`}
    >
      {/* Locked overlay */}
      {!unlocked && (
        <div className="absolute inset-0 bg-[#050505]/60 z-20 flex items-center justify-center">
          <span className="font-mono-cosmic text-[0.4rem] tracking-[0.3em] text-white/10">BLOQUEADO</span>
        </div>
      )}

      {/* Glow effect on unlock */}
      {unlocked && (
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background: "radial-gradient(circle at 50% 0%, rgba(255,195,0,0.08) 0%, transparent 60%)",
          }}
        />
      )}

      <div className={`p-5 transition-all duration-500 ${unlocked ? "bg-gradient-to-b from-[#FFC300]/[0.03] to-transparent" : "bg-white/[0.005]"}`}>
        {/* Archive ID */}
        <div className="flex items-center gap-2 mb-3">
          <div className={`w-1 h-1 rounded-full transition-all duration-500 ${unlocked ? "bg-[#FFC300] shadow-[0_0_6px_rgba(255,195,0,0.5)]" : "bg-white/10"}`} />
          <span className={`font-mono-cosmic text-[0.4rem] tracking-[0.25em] transition-colors duration-500 ${unlocked ? "text-[#FFC300]/50" : "text-white/10"}`}>
            ARCHIVO {id}
          </span>
        </div>

        {/* Title */}
        <h3 className={`font-display text-base font-bold mb-1 transition-colors duration-500 ${unlocked ? "text-white" : "text-white/10"}`}>
          {title}
        </h3>

        {/* Reveal text */}
        <AnimatePresence>
          {revealed && unlocked && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.5, ease: "easeOut" }}
              className="overflow-hidden"
            >
              <p className="font-display text-sm italic text-[#EAEAEA]/70 leading-relaxed mt-3 pt-3 border-t border-[#FFC300]/[0.06]">
                &ldquo;{text}&rdquo;
              </p>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Tap to reveal hint */}
        {unlocked && !revealed && (
          <p className="font-mono-cosmic text-[0.35rem] tracking-[0.15em] text-[#FFC300]/20 mt-2">
            TOCA PARA REVELAR
          </p>
        )}
      </div>
    </motion.div>
  );
}

/* ═══════ ACHIEVEMENT ═══════ */
function Achievement({
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
      initial={{ opacity: 0, scale: 0.5, filter: "brightness(3)" }}
      animate={unlocked ? { opacity: 1, scale: 1, filter: "brightness(1)" } : { opacity: 0.08, scale: 0.9, filter: "brightness(0.3)" }}
      transition={{ duration: 0.8, delay: unlocked ? delay : 0, ease: [0.34, 1.56, 0.64, 1] }}
      className={`relative flex items-center gap-3 rounded-lg border p-3.5 transition-all duration-500 ${
        unlocked
          ? "border-[#FFC300]/20 bg-gradient-to-r from-[#FFC300]/[0.05] to-transparent"
          : "border-white/[0.02]"
      }`}
    >
      {unlocked && <div className="absolute inset-0 holo-shimmer opacity-20 rounded-lg" />}
      <span className={`text-xl relative z-10 ${unlocked ? "" : "grayscale"}`}>{icon}</span>
      <div className="relative z-10">
        <p className={`font-mono-cosmic text-[0.35rem] tracking-[0.2em] ${unlocked ? "text-[#FFC300]/60" : "text-white/5"}`}>
          PATRÓN DETECTADO
        </p>
        <p className={`font-display text-sm font-bold ${unlocked ? "text-white" : "text-white/5"}`}>
          {title}
        </p>
      </div>
    </motion.div>
  );
}

/* ═══════ MAIN ═══════ */
export default function ElUmbral() {
  const containerRef = useRef(null);
  const [scrollProg, setScrollProg] = useState(0);
  const [perception, setPerception] = useState(0);
  const [achievements, setAchievements] = useState(0);
  const [loaded, setLoaded] = useState(true);
  const [hudText, setHudText] = useState("");
  const [showRupture, setShowRupture] = useState(false);

  const { scrollYProgress } = useScroll({ target: containerRef });

  // Parallax
  const entityY = useTransform(scrollYProgress, [0.05, 0.25], [60, -80]);
  const entityScale = useTransform(scrollYProgress, [0.05, 0.25], [0.85, 1.1]);
  const singularityScale = useTransform(scrollYProgress, [0.55, 0.85], [0.2, 1.8]);

  useEffect(() => {
    const t = setTimeout(() => setLoaded(false), 400);
    return () => clearTimeout(t);
  }, []);

  useEffect(() => {
    const unsub = scrollYProgress.on("change", (v) => {
      setScrollProg(v);
      setPerception(Math.min(100, Math.floor(v * 170)));

      // Achievements
      if (v > 0.08 && achievements < 1) setAchievements(1);
      if (v > 0.2 && achievements < 2) setAchievements(2);
      if (v > 0.35 && achievements < 3) setAchievements(3);
      if (v > 0.5 && achievements < 4) setAchievements(4);
      if (v > 0.65 && achievements < 5) setAchievements(5);
      if (v > 0.8 && achievements < 6) setAchievements(6);

      // HUD messages
      if (v < 0.05) setHudText("");
      else if (v < 0.15) setHudText("SEÑAL DETECTADA");
      else if (v < 0.25) setHudText("ESCANEO INICIADO");
      else if (v < 0.4) setHudText("ANALIZANDO PATRONES");
      else if (v < 0.55) setHudText("PATRONES ENCONTRADOS");
      else if (v < 0.7) setHudText("SINCRONIZACIÓN");
      else if (v < 0.85) setHudText("ACCESO PARCIAL");
      else setHudText("NÚCLEO ALCANZADO");

      // Rupture moment
      if (v > 0.18 && v < 0.22 && !showRupture) setShowRupture(true);
      if (v > 0.26 && showRupture) setShowRupture(false);
    });
    return () => unsub();
  }, [scrollYProgress, achievements, showRupture]);

  const vibrate = useCallback(() => {
    if (typeof navigator !== "undefined" && navigator.vibrate) navigator.vibrate(20);
  }, []);

  useEffect(() => {
    if (achievements > 0) vibrate();
  }, [achievements, vibrate]);

  return (
    <>
      {/* ── LOAD SCREEN ── */}
      <AnimatePresence>
        {loaded && (
          <motion.div
            className="fixed inset-0 z-[100] bg-[#050505] flex items-center justify-center"
            exit={{ opacity: 0 }}
            transition={{ duration: 2, ease: "easeInOut" }}
          >
            <motion.div
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: [0, 1.2, 1], opacity: [0, 1, 1] }}
              exit={{ scale: 3, opacity: 0 }}
              transition={{ duration: 1.5 }}
              className="w-2 h-2 rounded-full bg-[#FFC300]"
              style={{ boxShadow: "0 0 40px rgba(255,195,0,0.6), 0 0 80px rgba(255,195,0,0.2)" }}
            />
          </motion.div>
        )}
      </AnimatePresence>

      {/* ── FIXED LAYERS ── */}
      <ParticleCanvas />
      <div className="fixed inset-0 z-[1] scanlines pointer-events-none" />
      <div className="fixed inset-0 z-[1] pointer-events-none opacity-20" style={{
        backgroundImage: "linear-gradient(rgba(255,195,0,0.01) 1px, transparent 1px), linear-gradient(90deg, rgba(255,195,0,0.01) 1px, transparent 1px)",
        backgroundSize: "50px 50px",
        animation: "gridMove 10s linear infinite",
      }} />

      <ScrollBar progress={scrollProg} />
      <MissionProgress progress={scrollProg} />
      <HUDStatus text={hudText} visible={!!hudText} />

      {/* ══════════════════════════════════════ */}
      {/* ── RUPTURE OVERLAY ── */}
      {/* ══════════════════════════════════════ */}
      <AnimatePresence>
        {showRupture && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.8 }}
            className="fixed inset-0 z-[90] bg-[#050505] flex items-center justify-center"
          >
            <motion.h1
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1.5, delay: 0.3 }}
              className="font-display text-3xl sm:text-5xl font-black text-center leading-tight px-6"
            >
              OBSERVAR
              <br />
              <span className="text-[#FFC300] golden-glow-strong">NO ES LO MISMO</span>
              <br />
              QUE VER
            </motion.h1>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ══════════════════════════════════════ */}
      {/* ── MAIN SCROLL CONTAINER ── */}
      {/* ══════════════════════════════════════ */}
      <main ref={containerRef} className="relative">

        {/* ── S1: VOID AWAKENING ── */}
        <section className="relative min-h-screen flex flex-col items-center justify-center px-5">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 3, delay: 1 }}
            className="text-center max-w-sm mx-auto"
          >
            <motion.p
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1.5, delay: 2 }}
              className="font-mono-cosmic text-[0.5rem] tracking-[0.35em] text-[#FFC300]/40 mb-8 inline-block border border-[#FFC300]/10 rounded px-3 py-1.5"
            >
              {"// "}ORIGEN DESCONOCIDO
            </motion.p>

            <motion.h1
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 3, delay: 2.5 }}
              className="font-display text-[2.8rem] sm:text-6xl font-black leading-[1.02] golden-glow-strong"
            >
              <span className="text-white">OBSERVAR</span>
              <br />
              <span className="text-[#FFC300]">NO ES LO MISMO</span>
              <br />
              <span className="text-white/70">QUE VER</span>
            </motion.h1>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 5 }}
              className="mt-16 flex flex-col items-center gap-3"
            >
              <motion.div animate={{ y: [0, 6, 0] }} transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="rgba(255,195,0,0.2)" strokeWidth="1.5"><path d="M7 10l5 5 5-5" /></svg>
              </motion.div>
            </motion.div>
          </motion.div>
        </section>

        {/* ── S2: ENTITY MANIFESTATION ── */}
        <section className="relative min-h-[110vh] flex flex-col items-center justify-center px-5">
          <motion.div style={{ y: entityY, scale: entityScale }} className="relative z-10">
            <CosmicEntity size={260} intensity={0.8 + scrollProg * 0.5} />
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1.5, delay: 0.3 }}
            className="text-center mt-8 relative z-10"
          >
            <h2 className="font-display text-2xl sm:text-3xl font-bold leading-tight">
              LA MAYORÍA <span className="text-white/25 font-light">OBSERVA</span>
              <br />
              <span className="text-[#FFC300] golden-glow-strong">MUY POCOS DETECTAN</span>
            </h2>
          </motion.div>
        </section>

        {/* ── S3: SCAN INTERFACE ── */}
        <section className="relative min-h-[100vh] flex flex-col items-center justify-center px-5">
          <div className="w-full max-w-xs mx-auto">
            {/* Circular perception meter */}
            <div className="relative w-44 h-44 mx-auto mb-8">
              <div className="absolute -inset-3 rounded-full pointer-events-none" style={{
                background: "conic-gradient(from 0deg, transparent, rgba(255,195,0,0.1), transparent, rgba(255,216,77,0.06), transparent)",
                animation: "singularitySpin 5s linear infinite",
                filter: "blur(3px)",
              }} />
              <svg className="w-full h-full -rotate-90" viewBox="0 0 200 200">
                <circle cx="100" cy="100" r="82" fill="none" stroke="rgba(255,195,0,0.05)" strokeWidth="2.5" />
                <circle cx="100" cy="100" r="82" fill="none" stroke="url(#gld)" strokeWidth="2.5" strokeLinecap="round"
                  strokeDasharray={`${(perception / 100) * 515} 515`}
                  style={{ transition: "stroke-dasharray 0.4s ease-out", filter: "drop-shadow(0 0 5px rgba(255,195,0,0.4))" }}
                />
                <circle cx="100" cy="100" r="68" fill="none" stroke="rgba(255,195,0,0.02)" strokeWidth="0.5" strokeDasharray="2 6" />
                <defs><linearGradient id="gld" x1="0%" y1="0%" x2="100%" y2="0%"><stop offset="0%" stopColor="#FFB800" /><stop offset="50%" stopColor="#FFC300" /><stop offset="100%" stopColor="#FFD84D" /></linearGradient></defs>
              </svg>
              <div className="absolute inset-0 flex flex-col items-center justify-center">
                <motion.span className="font-display text-[2.8rem] font-black text-[#FFC300] golden-glow-strong" key={perception}
                  initial={{ scale: 1.1 }} animate={{ scale: 1 }} transition={{ duration: 0.2 }}
                >{perception}</motion.span>
                <span className="font-mono-cosmic text-[0.35rem] tracking-[0.25em] text-white/20">% PERCEPCIÓN</span>
              </div>
            </div>

            {/* HUD Data */}
            <div className="border border-[#FFC300]/[0.05] rounded-lg overflow-hidden">
              {[
                { l: "PATRONES", v: Math.min(847, Math.floor(scrollProg * 1500)) },
                { l: "SEÑALES", v: Math.min(23, Math.floor(scrollProg * 40)) },
                { l: "FRECUENCIA", v: `${(7.83 + scrollProg * 12).toFixed(1)} Hz` },
              ].map((r, i) => (
                <div key={i} className="flex justify-between items-center px-4 py-2 border-b border-[#FFC300]/[0.03] last:border-0">
                  <span className="font-mono-cosmic text-[0.35rem] tracking-[0.15em] text-white/15">{r.l}</span>
                  <span className="font-mono-cosmic text-[0.45rem] text-[#FFC300]/50">{r.v}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── S4: ARCHIVE VAULT ── */}
        <section className="relative min-h-[120vh] flex flex-col items-center justify-center px-5 py-20">
          {/* Singularity bg */}
          <motion.div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-80 h-80 rounded-full pointer-events-none"
            style={{ scale: singularityScale, background: "radial-gradient(circle, rgba(255,195,0,0.06) 0%, transparent 50%)", animation: "singularitySpin 30s linear infinite" }}
          />

          <div className="w-full max-w-sm mx-auto relative z-10">
            <div className="text-center mb-8">
              <p className="font-mono-cosmic text-[0.4rem] tracking-[0.3em] text-[#FFC300]/25 mb-3">{"// "}ARCHIVO RESTRINGIDO</p>
              <h2 className="font-display text-2xl sm:text-3xl font-bold">
                CONOCIMIENTO <span className="text-[#FFC300]">OCULTO</span>
              </h2>
            </div>

            <div className="space-y-3">
              <ArchiveModule
                id="001"
                title="Principio de Reciprocidad"
                text="Cuando alguien te halaga excesivamente en los primeros minutos, no está siendo amable — está activando el principio de reciprocidad para que bajes la guardia."
                unlocked={scrollProg > 0.25}
              />
              <ArchiveModule
                id="002"
                title="Poder Maquiavélico"
                text="Un líder inteligente no puede ni debe cumplir su palabra cuando tal cumplimiento se vuelve en su contra."
                unlocked={scrollProg > 0.35}
                delay={0.15}
              />
              <ArchiveModule
                id="003"
                title="Seducción Psicológica"
                text="La seducción no comienza con lo que dices, sino con lo que la otra persona cree que descubrió por sí misma sobre ti."
                unlocked={scrollProg > 0.45}
                delay={0.3}
              />
              <ArchiveModule
                id="004"
                title="Ley del Vacío Estratégico"
                text="La ausencia calculada genera más poder que la presencia constante. Cuando desapareces en el momento correcto, la otra persona llena ese vacío con pensamientos sobre ti."
                unlocked={scrollProg > 0.55}
                delay={0.45}
              />
            </div>
          </div>
        </section>

        {/* ── S5: ACHIEVEMENTS ── */}
        <section className="relative min-h-[90vh] flex flex-col items-center justify-center px-5 py-20">
          <div className="w-full max-w-sm mx-auto">
            <div className="text-center mb-8">
              <p className="font-mono-cosmic text-[0.4rem] tracking-[0.3em] text-[#FFC300]/25 mb-3">{"// "}LOGROS: {achievements}/6</p>
              <h2 className="font-display text-2xl font-bold">
                PERCEPCIÓN <span className="text-[#FFC300]">EN EXPANSIÓN</span>
              </h2>
            </div>

            <div className="space-y-2.5">
              <Achievement icon="👁️" title="Lector Iniciado" unlocked={achievements >= 1} />
              <Achievement icon="🔮" title="Observador" unlocked={achievements >= 2} delay={0.1} />
              <Achievement icon="🔍" title="Descifrador" unlocked={achievements >= 3} delay={0.2} />
              <Achievement icon="🧠" title="Arquitecto de Percepción" unlocked={achievements >= 4} delay={0.3} />
              <Achievement icon="⚡" title="Analista de Realidad" unlocked={achievements >= 5} delay={0.4} />
              <Achievement icon="🌟" title="Explorador del Umbral" unlocked={achievements >= 6} delay={0.5} />
            </div>

            {/* Progress bar */}
            <div className="mt-8 h-[1px] bg-white/[0.03] rounded-full overflow-hidden">
              <motion.div className="h-full rounded-full"
                style={{ width: `${(achievements / 6) * 100}%`, background: "linear-gradient(90deg, #FFB800, #FFC300, #FFD84D)", boxShadow: "0 0 6px rgba(255,195,0,0.3)" }}
                transition={{ duration: 0.4 }}
              />
            </div>
          </div>
        </section>

        {/* ── S6: ARSENAL ── */}
        <section className="relative min-h-[80vh] flex flex-col items-center justify-center px-5 py-16">
          <ArsenalContent />
        </section>

        {/* ── S7: BONUSES ── */}
        <section className="relative min-h-[70vh] flex flex-col items-center justify-center px-5 py-16">
          <BonusesContent />
        </section>

        {/* ── S8: SINGULARITY CORE ── */}
        <section className="relative min-h-[80vh] flex flex-col items-center justify-center px-5 py-20">
          <div className="text-center relative z-10">
            {/* Animated singularity */}
            <div className="relative w-48 h-48 mx-auto mb-10">
              <div className="absolute -inset-8 rounded-full" style={{
                background: "radial-gradient(circle, rgba(255,195,0,0.2) 0%, rgba(255,184,0,0.05) 40%, transparent 60%)",
                filter: "blur(25px)", animation: "breatheGlow 3s ease-in-out infinite",
              }} />
              <div className="absolute inset-2 rounded-full border border-[#FFC300]/10 pointer-events-none" style={{ animation: "singularitySpin 14s linear infinite", borderTopColor: "rgba(255,195,0,0.4)", borderRightColor: "rgba(255,216,77,0.15)" }} />
              <div className="absolute inset-6 rounded-full border border-[#FFD84D]/8 pointer-events-none" style={{ animation: "singularitySpin 9s linear infinite reverse", borderBottomColor: "rgba(255,216,77,0.3)" }} />
              <div className="absolute inset-12 rounded-full bg-gradient-to-br from-[#FFC300] via-[#FFD84D] to-[#FFB800] shadow-[0_0_60px_rgba(255,195,0,0.35),0_0_120px_rgba(255,195,0,0.1)]" />
              <img src="/cosmic/singularity.png" alt="" className="absolute inset-0 w-full h-full object-contain rounded-full mix-blend-screen opacity-35 pointer-events-none" />
            </div>

            <h2 className="font-display text-2xl sm:text-3xl font-bold mb-3">
              TE ACERCAS <span className="text-[#FFC300] golden-glow-strong">AL NÚCLEO</span>
            </h2>

            <motion.a href={CTA} target="_blank" rel="noopener noreferrer"
              className="inline-block mt-8 font-mono-cosmic text-[0.6rem] tracking-[0.25em] text-[#050505] bg-gradient-to-r from-[#FFB800] via-[#FFC300] to-[#FFD84D] px-8 py-3.5 rounded-sm font-bold relative overflow-hidden"
              style={{ boxShadow: "0 0 25px rgba(255,195,0,0.15)" }}
              whileHover={{ scale: 1.04, boxShadow: "0 0 50px rgba(255,195,0,0.35)" }}
              whileTap={{ scale: 0.97 }}
            >
              <span className="relative z-10">INICIAR EXPLORACIÓN</span>
              <div className="absolute inset-0 holo-shimmer" />
            </motion.a>
          </div>
        </section>

        {/* ── S9: FINAL CONVERGENCE ── */}
        <section className="relative min-h-screen flex flex-col items-center justify-center px-5 py-20 bg-[#050505]">
          <div className="absolute inset-0 bg-[#050505]" />

          {/* Golden core */}
          <motion.div initial={{ scale: 0, opacity: 0 }} whileInView={{ scale: 1, opacity: 1 }} viewport={{ once: true }}
            transition={{ duration: 1.5 }}
            className="relative w-24 h-24 mb-12 z-10"
          >
            <div className="absolute -inset-10 rounded-full" style={{
              background: "radial-gradient(circle, rgba(255,195,0,0.3) 0%, transparent 55%)",
              filter: "blur(25px)", animation: "breatheGlow 3s ease-in-out infinite",
            }} />
            <div className="absolute inset-3 rounded-full bg-gradient-to-br from-[#FFC300] via-[#FFD84D] to-[#FFB800] shadow-[0_0_80px_rgba(255,195,0,0.4),0_0_160px_rgba(255,195,0,0.12)]" />
          </motion.div>

          <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
            transition={{ duration: 1.5 }} className="relative z-10 text-center mb-10"
          >
            <h2 className="font-display text-2xl sm:text-3xl font-bold leading-tight">
              HAS LLEGADO MÁS LEJOS
              <br />
              <span className="text-[#FFC300] golden-glow-strong text-3xl sm:text-4xl">QUE EL 93%</span>
            </h2>
          </motion.div>

          {/* Stats */}
          <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}
            transition={{ delay: 0.5 }} className="relative z-10 flex gap-8 mb-10"
          >
            {[
              { v: "2,400+", l: "COPIAS" },
              { v: "4.8/5", l: "VALORACIÓN" },
              { v: "7 días", l: "GARANTÍA" },
            ].map((s, i) => (
              <div key={i} className="text-center">
                <p className="font-display text-base font-bold text-[#FFC300]">{s.v}</p>
                <p className="font-mono-cosmic text-[0.35rem] tracking-[0.12em] text-white/12 mt-0.5">{s.l}</p>
              </div>
            ))}
          </motion.div>

          {/* Access */}
          <motion.p initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}
            transition={{ delay: 0.8 }}
            className="relative z-10 font-mono-cosmic text-[0.5rem] tracking-[0.3em] text-white/20 mb-5"
          >ACCESO DISPONIBLE</motion.p>

          {/* Price */}
          <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}
            transition={{ delay: 1 }}
            className="relative z-10 text-center mb-8"
          >
            <p className="font-body text-[0.65rem] text-white/12 line-through">DE US$110</p>
            <p className="font-display text-4xl font-black text-white">
              US$ <span className="text-[#FFC300] golden-glow-strong">22</span>
            </p>
            <p className="font-mono-cosmic text-[0.35rem] tracking-[0.12em] text-white/10 mt-1">PAGO ÚNICO · LIBRO + 4 BONOS</p>
          </motion.div>

          {/* CTA */}
          <motion.a href={CTA} target="_blank" rel="noopener noreferrer"
            initial={{ opacity: 0, scale: 0.9 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }}
            transition={{ delay: 1.3 }}
            className="relative z-10 block w-full max-w-xs font-mono-cosmic text-[0.65rem] tracking-[0.25em] text-[#050505] bg-gradient-to-r from-[#FFB800] via-[#FFC300] to-[#FFD84D] px-8 py-4 rounded-sm font-bold text-center overflow-hidden"
            style={{ boxShadow: "0 0 40px rgba(255,195,0,0.2)", animation: "breatheGlow 3s ease-in-out infinite" }}
            whileHover={{ scale: 1.04, boxShadow: "0 0 60px rgba(255,195,0,0.4)" }}
            whileTap={{ scale: 0.97 }}
          >
            <span className="relative z-10">DESBLOQUEAR ARCHIVO</span>
            <div className="absolute inset-0 holo-shimmer" />
          </motion.a>

          {/* Warning */}
          <motion.p initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}
            transition={{ delay: 1.8 }}
            className="relative z-10 font-mono-cosmic text-[0.35rem] tracking-[0.2em] text-[#FFC300]/12 text-center mt-7 max-w-xs"
          >⚠ PRECIO DE LANZAMIENTO — PUEDE CAMBIAR SIN PREVIO AVISO</motion.p>

          {/* Guarantee */}
          <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}
            transition={{ delay: 2.1 }}
            className="relative z-10 mt-6 border border-[#FFC300]/[0.04] rounded-lg p-4 max-w-xs text-center"
          >
            <p className="font-mono-cosmic text-[0.35rem] tracking-[0.12em] text-[#FFC300]/20 mb-1.5">GARANTÍA 7 DÍAS</p>
            <p className="font-body text-[0.65rem] text-white/15 leading-relaxed">
              Si no sientes que tu percepción se expandió, te devolvemos cada centavo.
            </p>
          </motion.div>

          <div className="h-12" />
        </section>
      </main>
    </>
  );
}

/* ═══════ ARSENAL ═══════ */
function ArsenalContent() {
  const ref = useRef(null);
  const inView = useInView(ref, { amount: 0.1, once: true });

  const items = [
    { icon: "👁️", t: "8 Leyes del Comportamiento Humano" },
    { icon: "🧠", t: "Técnicas de persuasión de élite" },
    { icon: "🛡️", t: "Detectar manipulación emocional" },
    { icon: "💘", t: "Seducción psicológica avanzada" },
    { icon: "🎭", t: "Control emocional absoluto" },
    { icon: "⚠️", t: "Identificar narcisistas y psicópatas" },
    { icon: "🔗", t: "Protección de relaciones tóxicas" },
    { icon: "♟️", t: "Influencia sin fuerza" },
  ];

  return (
    <div ref={ref} className="w-full max-w-sm mx-auto">
      <div className="text-center mb-8">
        <p className="font-mono-cosmic text-[0.4rem] tracking-[0.3em] text-[#FFC300]/25 mb-3">{"// "}ARSENAL COGNITIVO</p>
        <h2 className="font-display text-xl font-bold">
          10 CAPÍTULOS · 8 LEYES · <span className="text-[#FFC300]">1 ARSENAL</span>
        </h2>
      </div>

      <div className="grid grid-cols-2 gap-2">
        {items.map((it, i) => (
          <motion.div key={i}
            initial={{ opacity: 0, y: 15 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: i * 0.07 }}
            className="border border-[#FFC300]/[0.05] rounded-lg p-3 text-center hover:border-[#FFC300]/15 transition-colors duration-500"
          >
            <span className="text-lg block mb-1">{it.icon}</span>
            <p className="font-body text-[0.6rem] text-white/40 leading-snug">{it.t}</p>
          </motion.div>
        ))}
      </div>
    </div>
  );
}

/* ═══════ BONUSES ═══════ */
function BonusesContent() {
  const ref = useRef(null);
  const inView = useInView(ref, { amount: 0.1, once: true });

  const bonuses = [
    { n: "01", t: "Detectar Mentiras", p: "~$29" },
    { n: "02", t: "Gestos Corporales", p: "~$19" },
    { n: "03", t: "Seducción Corporal", p: "~$24" },
    { n: "04", t: "Poder de Tu Mente", p: "~$19" },
  ];

  return (
    <div ref={ref} className="w-full max-w-sm mx-auto">
      <div className="text-center mb-8">
        <p className="font-mono-cosmic text-[0.4rem] tracking-[0.3em] text-[#FFC300]/25 mb-3">{"// "}ARCHIVOS ADICIONALES</p>
        <h2 className="font-display text-xl font-bold">
          4 MANUALES <span className="text-[#FFC300]">GRATIS</span>
        </h2>
      </div>

      <div className="grid grid-cols-2 gap-2.5">
        {bonuses.map((b, i) => (
          <motion.div key={i}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={inView ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 0.6, delay: i * 0.1 }}
            className="relative border border-[#FFC300]/[0.06] rounded-lg p-4 text-center overflow-hidden group hover:border-[#FFC300]/15 transition-all duration-500"
          >
            <div className="absolute inset-0 holo-shimmer opacity-15" />
            <div className="relative z-10">
              <span className="font-mono-cosmic text-[0.35rem] tracking-[0.2em] text-[#FFC300]/30 font-bold">BONO {b.n}</span>
              <p className="font-display text-sm font-bold text-white mt-1">{b.t}</p>
              <p className="font-mono-cosmic text-[0.5rem] mt-1.5">
                <span className="text-white/10 line-through">{b.p}</span>{" "}
                <span className="text-[#FFC300] font-bold">GRATIS</span>
              </p>
            </div>
          </motion.div>
        ))}
      </div>

      <motion.p initial={{ opacity: 0 }} animate={inView ? { opacity: 1 } : {}}
        transition={{ delay: 0.7 }}
        className="font-mono-cosmic text-[0.45rem] text-center text-white/10 mt-5"
      >
        Total: <span className="line-through">~$91</span> <span className="text-[#FFC300] font-bold">→ GRATIS</span>
      </motion.p>
    </div>
  );
}
