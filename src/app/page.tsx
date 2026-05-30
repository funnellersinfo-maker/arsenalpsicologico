"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion";
import CosmicCanvas from "@/components/cosmic/CosmicCanvas";
import CosmicEntity from "@/components/cosmic/CosmicEntity";
import GoldenSingularity from "@/components/cosmic/GoldenSingularity";

const CTA = "https://app.elsabiomanipulador.com/inicio?ref=L106036858P";

/* ══════════════════════════════════════════════ */
/* CONSCIOUS SYSTEM — HUD MESSAGES               */
/* ══════════════════════════════════════════════ */

const HUD_MESSAGES = [
  { at: 0.03, text: "SEÑAL DETECTADA" },
  { at: 0.10, text: "ESCANEO INICIADO" },
  { at: 0.18, text: "ANALIZANDO PATRONES" },
  { at: 0.28, text: "ACCESO DETECTADO" },
  { at: 0.38, text: "PATRONES ENCONTRADOS" },
  { at: 0.48, text: "DECODIFICANDO" },
  { at: 0.58, text: "SINCRONIZACIÓN" },
  { at: 0.70, text: "FRECUENCIA CALIBRADA" },
  { at: 0.82, text: "NÚCLEO ALCANZADO" },
  { at: 0.92, text: "PORTAL DISPONIBLE" },
];

function ConsciousHUD({ text, visible }: { text: string; visible: boolean }) {
  return (
    <AnimatePresence mode="wait">
      {visible && text && (
        <motion.div
          key={text}
          initial={{ opacity: 0, x: -15 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: 15 }}
          transition={{ duration: 0.5 }}
          className="fixed left-3 top-1/2 -translate-y-1/2 z-30 pointer-events-none"
        >
          <div className="flex items-center gap-2">
            <motion.div
              className="w-1 h-1 rounded-full bg-[#FFC300]"
              animate={{ opacity: [0.3, 1, 0.3] }}
              transition={{ duration: 1.5, repeat: Infinity }}
              style={{ boxShadow: "0 0 6px rgba(255,195,0,0.6)" }}
            />
            <span
              className="font-mono-cosmic text-[0.38rem] tracking-[0.22em] text-[#FFC300]/30"
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

/* ══════════════════════════════════════════════ */
/* EXPLORATION PROGRESS — VERTICAL               */
/* ══════════════════════════════════════════════ */

function ExplorationProgress({ progress }: { progress: number }) {
  const pct = Math.min(100, Math.floor(progress * 100));
  return (
    <div className="fixed right-3 top-1/2 -translate-y-1/2 z-30 flex flex-col items-center gap-2 pointer-events-none">
      <span className="font-mono-cosmic text-[0.3rem] tracking-[0.18em] text-[#FFC300]/15">
        EXPLORACIÓN
      </span>
      <div className="w-[1.5px] h-28 bg-white/[0.02] rounded-full overflow-hidden relative">
        <motion.div
          className="absolute bottom-0 w-full rounded-full"
          style={{
            height: `${pct}%`,
            background: "linear-gradient(to top, #FFB800, #FFC300, #FFD84D)",
            boxShadow: "0 0 6px rgba(255,195,0,0.25)",
          }}
          transition={{ duration: 0.3 }}
        />
      </div>
      <span className="font-mono-cosmic text-[0.35rem] text-[#FFC300]/25">{pct}%</span>
    </div>
  );
}

/* ══════════════════════════════════════════════ */
/* SCROLL PROGRESS BAR                           */
/* ══════════════════════════════════════════════ */

function ScrollBar({ progress }: { progress: number }) {
  return (
    <div className="fixed top-0 left-0 right-0 z-50 h-[1px]">
      <div
        className="h-full"
        style={{
          width: `${progress * 100}%`,
          background: "linear-gradient(90deg, #FFB800, #FFC300, #FFD84D)",
          boxShadow: "0 0 8px rgba(255,195,0,0.3)",
          transition: "width 0.2s ease-out",
        }}
      />
    </div>
  );
}

/* ══════════════════════════════════════════════ */
/* ARCHIVE MODULE — DECRYPTED SIGNAL             */
/* ══════════════════════════════════════════════ */

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
      initial={{ opacity: 0, y: 20 }}
      animate={unlocked ? { opacity: 1, y: 0 } : { opacity: 0 }}
      transition={{ duration: 1, delay: unlocked ? delay : 0, ease: "easeOut" }}
      onClick={() => unlocked && setRevealed(!revealed)}
      className={`relative overflow-hidden cursor-pointer transition-all duration-700 ${
        unlocked ? "hover:border-[#FFC300]/20" : ""
      }`}
    >
      {/* Unlock glow */}
      {unlocked && (
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background: "radial-gradient(circle at 50% 0%, rgba(255,195,0,0.04) 0%, transparent 50%)",
          }}
        />
      )}

      <div className={`py-4 px-3 border-l-2 transition-all duration-700 ${
        unlocked
          ? "border-[#FFC300]/25 bg-gradient-to-r from-[#FFC300]/[0.02] to-transparent"
          : "border-white/[0.02]"
      }`}>
        {/* Archive ID */}
        <div className="flex items-center gap-2 mb-1.5">
          <div className={`w-1 h-1 rounded-full transition-all duration-500 ${
            unlocked ? "bg-[#FFC300] shadow-[0_0_5px_rgba(255,195,0,0.4)]" : "bg-white/5"
          }`} />
          <span className={`font-mono-cosmic text-[0.32rem] tracking-[0.28em] transition-colors duration-500 ${
            unlocked ? "text-[#FFC300]/35" : "text-white/5"
          }`}>
            ARCHIVO {id}
          </span>
        </div>

        {/* Title */}
        <p className={`font-display text-sm font-bold transition-colors duration-500 ${
          unlocked ? "text-white/80" : "text-white/5"
        }`}>
          {title}
        </p>

        {/* Reveal */}
        <AnimatePresence>
          {revealed && unlocked && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.6, ease: "easeOut" }}
              className="overflow-hidden"
            >
              <p className="font-body text-xs italic text-white/40 leading-relaxed mt-2.5 pt-2.5 border-t border-[#FFC300]/[0.04]">
                &ldquo;{text}&rdquo;
              </p>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Tap hint */}
        {unlocked && !revealed && (
          <p className="font-mono-cosmic text-[0.28rem] tracking-[0.18em] text-[#FFC300]/12 mt-1.5">
            TOCA PARA DECODIFICAR
          </p>
        )}
      </div>
    </motion.div>
  );
}

/* ══════════════════════════════════════════════ */
/* ACHIEVEMENT — SIGNAL WHISPER                  */
/* ══════════════════════════════════════════════ */

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
      initial={{ opacity: 0 }}
      animate={unlocked ? { opacity: 1 } : { opacity: 0.04 }}
      transition={{ duration: 0.8, delay: unlocked ? delay : 0 }}
      className="flex items-center gap-2.5"
    >
      <span className={`text-base ${unlocked ? "" : "grayscale opacity-30"}`}>{icon}</span>
      <span className={`font-display text-xs font-bold transition-colors duration-500 ${
        unlocked ? "text-white/60" : "text-white/3"
      }`}>
        {title}
      </span>
      {unlocked && (
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          className="w-1 h-1 rounded-full bg-[#FFC300]/40"
          style={{ boxShadow: "0 0 4px rgba(255,195,0,0.3)" }}
        />
      )}
    </motion.div>
  );
}

/* ══════════════════════════════════════════════ */
/* MAIN — CINEMATIC EXPERIENCE                   */
/* ══════════════════════════════════════════════ */

export default function ElUmbral() {
  const containerRef = useRef(null);
  const [scrollProg, setScrollProg] = useState(0);
  const [perception, setPerception] = useState(0);
  const [achievements, setAchievements] = useState(0);
  const [loaded, setLoaded] = useState(true);
  const [hudText, setHudText] = useState("");
  const [showRupture, setShowRupture] = useState(false);

  const { scrollYProgress } = useScroll({ target: containerRef });

  // Parallax transforms
  const entityY = useTransform(scrollYProgress, [0.08, 0.25], [80, -100]);
  const entityScale = useTransform(scrollYProgress, [0.08, 0.25], [0.8, 1.15]);
  const singularityGrow = useTransform(scrollYProgress, [0.75, 0.95], [0.4, 2.2]);

  // Loader
  useEffect(() => {
    const t = setTimeout(() => setLoaded(false), 600);
    return () => clearTimeout(t);
  }, []);

  // Scroll tracking
  useEffect(() => {
    const unsub = scrollYProgress.on("change", (v) => {
      setScrollProg(v);
      setPerception(Math.min(100, Math.floor(v * 180)));

      // Achievements
      if (v > 0.06 && achievements < 1) setAchievements(1);
      if (v > 0.16 && achievements < 2) setAchievements(2);
      if (v > 0.30 && achievements < 3) setAchievements(3);
      if (v > 0.48 && achievements < 4) setAchievements(4);
      if (v > 0.65 && achievements < 5) setAchievements(5);
      if (v > 0.82 && achievements < 6) setAchievements(6);
      if (v > 0.93 && achievements < 7) setAchievements(7);

      // HUD messages
      let currentMsg = "";
      for (const msg of HUD_MESSAGES) {
        if (v >= msg.at) currentMsg = msg.text;
      }
      setHudText(currentMsg);

      // Rupture moment
      if (v > 0.22 && v < 0.28 && !showRupture) setShowRupture(true);
      if ((v < 0.20 || v > 0.30) && showRupture) setShowRupture(false);
    });
    return () => unsub();
  }, [scrollYProgress, achievements, showRupture]);

  // Haptic feedback
  const vibrate = useCallback(() => {
    if (typeof navigator !== "undefined" && navigator.vibrate) navigator.vibrate(15);
  }, []);

  useEffect(() => {
    if (achievements > 0) vibrate();
  }, [achievements, vibrate]);

  return (
    <>
      {/* ══════════════════════════════════════════ */}
      {/* LOADER — SINGULARITY BIRTH                */}
      {/* ══════════════════════════════════════════ */}
      <AnimatePresence>
        {loaded && (
          <motion.div
            className="fixed inset-0 z-[100] bg-[#050505] flex flex-col items-center justify-center gap-6"
            exit={{ opacity: 0 }}
            transition={{ duration: 2.5, ease: "easeInOut" }}
          >
            <motion.div
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: [0, 1.5, 1], opacity: [0, 1, 1] }}
              exit={{ scale: 4, opacity: 0 }}
              transition={{ duration: 1.8 }}
            >
              <GoldenSingularity size={80} intensity={1.2} variant="portal" />
            </motion.div>
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: [0, 0.5, 0.3] }}
              exit={{ opacity: 0 }}
              transition={{ duration: 1.5, delay: 0.8 }}
              className="font-mono-cosmic text-[0.4rem] tracking-[0.4em] text-[#FFC300]/25"
            >
              CARGANDO SISTEMA
            </motion.p>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ══════════════════════════════════════════ */}
      {/* FIXED LAYERS — COSMOS + HUD               */}
      {/* ══════════════════════════════════════════ */}
      <CosmicCanvas />
      <div className="fixed inset-0 z-[1] scanlines pointer-events-none" />

      {/* Subtle grid */}
      <div
        className="fixed inset-0 z-[1] pointer-events-none opacity-[0.015]"
        style={{
          backgroundImage: "linear-gradient(rgba(255,195,0,0.8) 1px, transparent 1px), linear-gradient(90deg, rgba(255,195,0,0.8) 1px, transparent 1px)",
          backgroundSize: "60px 60px",
          animation: "gridMove 15s linear infinite",
        }}
      />

      <ScrollBar progress={scrollProg} />
      <ExplorationProgress progress={scrollProg} />
      <ConsciousHUD text={hudText} visible={!!hudText} />

      {/* ══════════════════════════════════════════ */}
      {/* RUPTURE — VISUAL PAUSE                    */}
      {/* ══════════════════════════════════════════ */}
      <AnimatePresence>
        {showRupture && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1.2 }}
            className="fixed inset-0 z-[90] bg-[#050505] flex items-center justify-center"
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.85, filter: "blur(10px)" }}
              animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
              exit={{ opacity: 0, scale: 1.1 }}
              transition={{ duration: 2, delay: 0.5 }}
              className="text-center px-8"
            >
              <h1 className="font-display text-4xl sm:text-6xl font-black leading-[1.05]">
                <span className="text-white/90">OBSERVAR</span>
                <br />
                <span className="text-[#FFC300] golden-glow-strong">NO ES LO MISMO</span>
                <br />
                <span className="text-white/50">QUE VER</span>
              </h1>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ══════════════════════════════════════════ */}
      {/* MAIN SCROLL — CINEMATIC JOURNEY            */}
      {/* ══════════════════════════════════════════ */}
      <main ref={containerRef} className="relative">

        {/* ── MOMENT 1: VOID AWAKENING ── */}
        <section className="relative min-h-screen flex flex-col items-center justify-center px-6">
          {/* Distant singularity */}
          <motion.div
            initial={{ opacity: 0, scale: 0.3 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 4, delay: 2 }}
            className="mb-16"
          >
            <GoldenSingularity size={60} intensity={0.6} variant="icon" />
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 30, filter: "blur(8px)" }}
            animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            transition={{ duration: 3, delay: 3.5 }}
            className="font-display text-[3.5rem] sm:text-7xl font-black leading-[0.95] text-center"
          >
            <span className="text-white/90">OBSERVAR</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 3, delay: 5.5 }}
            className="font-mono-cosmic text-[0.4rem] tracking-[0.5em] text-[#FFC300]/15 mt-20"
          >
            ORIGEN DESCONOCIDO
          </motion.p>

          {/* Scroll indicator */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 7 }}
            className="absolute bottom-12 left-1/2 -translate-x-1/2"
          >
            <motion.div
              animate={{ y: [0, 8, 0], opacity: [0.15, 0.4, 0.15] }}
              transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
            >
              <GoldenSingularity size={12} intensity={0.3} variant="loader" />
            </motion.div>
          </motion.div>
        </section>

        {/* ── MOMENT 2: ENTITY REVELATION ── */}
        <section className="relative min-h-[130vh] flex flex-col items-center justify-center px-6">
          {/* Massive negative space above */}
          <div className="h-[15vh]" />

          <motion.div
            style={{ y: entityY, scale: entityScale }}
            className="relative z-10"
          >
            <CosmicEntity size={280} intensity={0.8 + scrollProg * 0.6} />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20, filter: "blur(6px)" }}
            whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 2, delay: 0.5 }}
            className="text-center mt-14 relative z-10"
          >
            <h2 className="font-display text-2xl sm:text-4xl font-black leading-tight">
              <span className="text-white/20 font-light">LA MAYORÍA</span>
              <br />
              <span className="text-white/70">OBSERVA</span>
            </h2>
            <h2 className="font-display text-2xl sm:text-4xl font-black mt-3">
              <span className="text-[#FFC300] golden-glow-strong">MUY POCOS DETECTAN</span>
            </h2>
          </motion.div>

          {/* Space below */}
          <div className="h-[20vh]" />
        </section>

        {/* ── MOMENT 3: BLACK VOID (rupture handled by overlay) ── */}
        <section className="relative h-[30vh]" />

        {/* ── MOMENT 4: SCAN INTERFACE ── */}
        <section className="relative min-h-screen flex flex-col items-center justify-center px-6">
          <div className="w-full max-w-[200px] mx-auto">
            {/* Singularity as meter */}
            <div className="relative mb-6">
              <GoldenSingularity
                size={160}
                intensity={0.5 + scrollProg * 0.5}
                variant="meter"
                progress={perception}
              />
              <div className="absolute inset-0 flex flex-col items-center justify-center">
                <motion.span
                  className="font-display text-3xl font-black text-[#FFC300] golden-glow-strong"
                  key={perception}
                  initial={{ scale: 1.08 }}
                  animate={{ scale: 1 }}
                  transition={{ duration: 0.2 }}
                >
                  {perception}
                </motion.span>
                <span className="font-mono-cosmic text-[0.28rem] tracking-[0.25em] text-white/12 mt-0.5">
                  % PERCEPCIÓN
                </span>
              </div>
            </div>

            {/* Minimal HUD data */}
            <div className="space-y-1.5">
              {[
                { l: "PATRONES", v: Math.min(847, Math.floor(scrollProg * 1500)).toString() },
                { l: "SEÑALES", v: Math.min(23, Math.floor(scrollProg * 40)).toString() },
                { l: "FREQ", v: `${(7.83 + scrollProg * 12).toFixed(1)} Hz` },
              ].map((r, i) => (
                <div key={i} className="flex justify-between items-center py-1 border-b border-[#FFC300]/[0.03]">
                  <span className="font-mono-cosmic text-[0.28rem] tracking-[0.15em] text-white/10">{r.l}</span>
                  <span className="font-mono-cosmic text-[0.35rem] text-[#FFC300]/35">{r.v}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── MOMENT 5: ARCHIVE VAULT ── */}
        <section className="relative min-h-screen flex flex-col items-center justify-center px-6 py-24">
          {/* Background singularity glow */}
          <motion.div
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 rounded-full pointer-events-none"
            style={{
              scale: singularityGrow,
              background: "radial-gradient(circle, rgba(255,195,0,0.04) 0%, transparent 45%)",
              animation: "singularitySpin 40s linear infinite",
            }}
          />

          <div className="w-full max-w-xs mx-auto relative z-10">
            {/* Section marker */}
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 1.5 }}
              className="mb-8"
            >
              <p className="font-mono-cosmic text-[0.3rem] tracking-[0.35em] text-[#FFC300]/15 mb-2">
                {"// "}ARCHIVO RESTRINGIDO
              </p>
              <div className="w-8 h-[1px] bg-[#FFC300]/10" />
            </motion.div>

            <div className="space-y-1">
              <ArchiveModule
                id="001"
                title="Reciprocidad Oculta"
                text="Cuando alguien te halaga excesivamente, no está siendo amable — está activando reciprocidad para que bajes la guardia."
                unlocked={scrollProg > 0.35}
              />
              <ArchiveModule
                id="002"
                title="Poder Maquiavélico"
                text="Un líder inteligente no puede cumplir su palabra cuando tal cumplimiento se vuelve en su contra."
                unlocked={scrollProg > 0.42}
                delay={0.15}
              />
              <ArchiveModule
                id="003"
                title="Seducción Invisible"
                text="La seducción no comienza con lo que dices, sino con lo que la otra persona cree que descubrió por sí misma."
                unlocked={scrollProg > 0.50}
                delay={0.3}
              />
              <ArchiveModule
                id="004"
                title="Vacío Estratégico"
                text="La ausencia calculada genera más poder que la presencia constante."
                unlocked={scrollProg > 0.58}
                delay={0.45}
              />
              <ArchiveModule
                id="005"
                title="Anclaje Emocional"
                text="El momento en que alguien decide confiarte no es cuando hablas — es cuando permaneces en silencio en el instante preciso."
                unlocked={scrollProg > 0.66}
                delay={0.6}
              />
            </div>
          </div>
        </section>

        {/* ── MOMENT 6: COSMIC DRIFT — ACHIEVEMENTS ── */}
        <section className="relative min-h-[80vh] flex flex-col items-center justify-center px-6 py-24">
          <div className="w-full max-w-xs mx-auto">
            {/* Section marker */}
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 1.5 }}
              className="mb-10"
            >
              <p className="font-mono-cosmic text-[0.3rem] tracking-[0.35em] text-[#FFC300]/15 mb-1">
                {"// "}PATRONES: {achievements}/7
              </p>
              <div className="w-8 h-[1px] bg-[#FFC300]/10" />
            </motion.div>

            <div className="space-y-4">
              <Achievement icon="👁️" title="Señal Detectada" unlocked={achievements >= 1} />
              <Achievement icon="🔮" title="Observador" unlocked={achievements >= 2} delay={0.1} />
              <Achievement icon="🔍" title="Descifrador" unlocked={achievements >= 3} delay={0.15} />
              <Achievement icon="🧠" title="Arquitecto" unlocked={achievements >= 4} delay={0.2} />
              <Achievement icon="⚡" title="Analista" unlocked={achievements >= 5} delay={0.25} />
              <Achievement icon="🌟" title="Explorador" unlocked={achievements >= 6} delay={0.3} />
              <Achievement icon="🌀" title="Guardián" unlocked={achievements >= 7} delay={0.35} />
            </div>

            {/* Minimal progress */}
            <div className="mt-8 h-[1px] bg-white/[0.02] rounded-full overflow-hidden">
              <motion.div
                className="h-full rounded-full"
                style={{
                  width: `${(achievements / 7) * 100}%`,
                  background: "linear-gradient(90deg, #FFB800, #FFC300, #FFD84D)",
                  boxShadow: "0 0 4px rgba(255,195,0,0.2)",
                }}
                transition={{ duration: 0.3 }}
              />
            </div>
          </div>
        </section>

        {/* ── MOMENT 7: SINGULARITY APPROACH ── */}
        <section className="relative min-h-screen flex flex-col items-center justify-center px-6">
          <motion.div
            initial={{ opacity: 0, scale: 0.5 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 2.5 }}
            className="mb-12"
          >
            <GoldenSingularity size={200} intensity={1.5} variant="portal" />
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 20, filter: "blur(4px)" }}
            whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            viewport={{ once: true }}
            transition={{ duration: 2, delay: 0.5 }}
            className="font-display text-2xl sm:text-4xl font-black text-center"
          >
            <span className="text-white/40">TE ACERCAS</span>
            <br />
            <span className="text-[#FFC300] golden-glow-strong">AL NÚCLEO</span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 1.5 }}
            className="font-mono-cosmic text-[0.32rem] tracking-[0.3em] text-[#FFC300]/10 mt-6"
          >
            PORTAL DETECTADO
          </motion.p>
        </section>

        {/* ── MOMENT 8: THE CROSSING ── */}
        <section className="relative min-h-screen flex flex-col items-center justify-center px-6 bg-gradient-to-b from-transparent via-[#050505]/50 to-[#050505]">
          {/* Singularity portal */}
          <motion.div
            initial={{ scale: 0, opacity: 0 }}
            whileInView={{ scale: 1, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 2 }}
            className="relative mb-12"
          >
            <GoldenSingularity size={140} intensity={2} variant="cta" />
          </motion.div>

          {/* Minimal conversion */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1.5, delay: 0.8 }}
            className="text-center relative z-10"
          >
            <p className="font-mono-cosmic text-[0.32rem] tracking-[0.35em] text-[#FFC300]/15 mb-4">
              ACCESO DISPONIBLE
            </p>

            <p className="font-display text-3xl font-black text-white mb-1">
              US$ <span className="text-[#FFC300] golden-glow-strong">22</span>
            </p>
            <p className="font-mono-cosmic text-[0.25rem] tracking-[0.15em] text-white/8">
              PAGO ÚNICO
            </p>
          </motion.div>

          {/* CTA — The Portal */}
          <motion.a
            href={CTA}
            target="_blank"
            rel="noopener noreferrer"
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 1.5 }}
            className="relative z-10 mt-10 block w-full max-w-xs font-mono-cosmic text-[0.55rem] tracking-[0.3em] text-[#050505] bg-gradient-to-r from-[#FFB800] via-[#FFC300] to-[#FFD84D] px-8 py-4 rounded-sm font-bold text-center overflow-hidden"
            style={{
              boxShadow: "0 0 40px rgba(255,195,0,0.15)",
              animation: "breatheGlow 3s ease-in-out infinite",
            }}
            whileHover={{ scale: 1.04, boxShadow: "0 0 60px rgba(255,195,0,0.35)" }}
            whileTap={{ scale: 0.97 }}
          >
            <span className="relative z-10">CRUZAR EL UMBRAL</span>
            <div className="absolute inset-0 holo-shimmer" />
          </motion.a>

          {/* Guarantee whisper */}
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 2.5 }}
            className="relative z-10 font-mono-cosmic text-[0.22rem] tracking-[0.15em] text-white/6 text-center mt-6 max-w-[200px]"
          >
            7 DÍAS · DEVOLUCIÓN COMPLETA
          </motion.p>

          <div className="h-16" />
        </section>
      </main>
    </>
  );
}
