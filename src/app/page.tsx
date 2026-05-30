"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion";
import CosmicCanvas from "@/components/cosmic/CosmicCanvas";
import CosmicEntity from "@/components/cosmic/CosmicEntity";
import GoldenSingularity from "@/components/cosmic/GoldenSingularity";

const CTA = "https://app.elsabiomanipulador.com/inicio?ref=L106036858P";

/* ══════════════════════════════════════ */
/* SCROLL PROGRESS BAR                    */
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
/* THE BREACH — CENTRAL EXPLOSION SCENE  */
/* ══════════════════════════════════════ */

function TheBreach({ phase }: { phase: number }) {
  if (phase === 0) return null;

  return (
    <motion.div
      className="fixed inset-0 z-[90] flex items-center justify-center"
      style={{ backgroundColor: "#050505" }}
      initial={{ opacity: 0 }}
      animate={{ opacity: phase === 5 ? 0 : 1 }}
      transition={{ duration: phase === 5 ? 1.8 : 0.6 }}
    >
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

      {phase >= 4 && (
        <motion.div
          className="fixed inset-0"
          style={{ backgroundColor: "#FFD84D" }}
          initial={{ opacity: 0 }}
          animate={{ opacity: [0, 0.5, 0] }}
          transition={{ duration: 0.7 }}
        />
      )}

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
/* CTA BUTTON — GOLDEN PORTAL            */
/* ══════════════════════════════════════ */

function CtaButton({ text, href, size = "lg" }: { text: string; href: string; size?: "lg" | "md" | "sm" }) {
  const sizeClasses = {
    lg: "w-full max-w-[300px] text-[0.55rem] tracking-[0.35em] px-8 py-4",
    md: "w-full max-w-[260px] text-[0.5rem] tracking-[0.3em] px-6 py-3.5",
    sm: "w-full max-w-[220px] text-[0.45rem] tracking-[0.25em] px-5 py-3",
  };

  return (
    <motion.a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className={`relative z-10 block font-mono-cosmic font-bold text-center overflow-hidden rounded-sm text-[#050505] bg-gradient-to-r from-[#FFB800] via-[#FFC300] to-[#FFD84D] ${sizeClasses[size]}`}
      style={{
        boxShadow: "0 0 35px rgba(255,195,0,0.12)",
        animation: "breatheGlow 3s ease-in-out infinite",
      }}
      whileHover={{ scale: 1.04, boxShadow: "0 0 55px rgba(255,195,0,0.3)" }}
      whileTap={{ scale: 0.97 }}
    >
      <span className="relative z-10">{text}</span>
      <div className="absolute inset-0 holo-shimmer" />
    </motion.a>
  );
}

/* ══════════════════════════════════════ */
/* PATTERN CARD — BENEFIT REVEAL         */
/* ══════════════════════════════════════ */

function PatternCard({
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
      <div className={`py-3 px-4 border-l transition-all duration-500 ${
        unlocked
          ? "border-[#FFC300]/25 bg-gradient-to-r from-[#FFC300]/[0.02] to-transparent"
          : "border-white/[0.015]"
      }`}>
        <div className="flex items-center gap-2 mb-1.5">
          <div className={`w-1 h-1 rounded-full transition-all duration-500 ${
            unlocked ? "bg-[#FFC300] shadow-[0_0_4px_rgba(255,195,0,0.35)]" : "bg-white/3"
          }`} />
          <span className={`font-mono-cosmic text-[0.3rem] tracking-[0.3em] transition-colors duration-500 ${
            unlocked ? "text-[#FFC300]/30" : "text-white/3"
          }`}>
            PATRÓN {id}
          </span>
        </div>

        <p className={`font-display text-sm font-bold transition-colors duration-500 ${
          unlocked ? "text-white/80" : "text-white/3"
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
              <p className="font-body text-xs text-white/40 leading-relaxed mt-2 pt-2 border-t border-[#FFC300]/[0.05]">
                {text}
              </p>
            </motion.div>
          )}
        </AnimatePresence>

        {unlocked && !revealed && (
          <p className="font-mono-cosmic text-[0.35rem] text-[#FFC300]/20 mt-1 tracking-[0.2em]">
            TOCA PARA DECODIFICAR
          </p>
        )}
      </div>
    </motion.div>
  );
}

/* ══════════════════════════════════════ */
/* SOCIAL PROOF COUNTER                  */
/* ══════════════════════════════════════ */

function ProofCounter({ value, label, visible }: { value: string; label: string; visible: boolean }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={visible ? { opacity: 1, y: 0 } : { opacity: 0 }}
      transition={{ duration: 0.8 }}
      className="text-center"
    >
      <p className="font-display text-2xl sm:text-3xl font-black text-[#FFC300] golden-glow-strong">
        {value}
      </p>
      <p className="font-body text-[0.6rem] text-white/30 mt-1 tracking-wide">
        {label}
      </p>
    </motion.div>
  );
}

/* ══════════════════════════════════════ */
/* TESTIMONIAL                           */
/* ══════════════════════════════════════ */

function Testimonial({ text, author, visible, delay = 0 }: { text: string; author: string; visible: boolean; delay?: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={visible ? { opacity: 1, y: 0 } : { opacity: 0 }}
      transition={{ duration: 0.8, delay }}
      className="border-l border-[#FFC300]/10 pl-4 py-2"
    >
      <p className="font-body text-xs text-white/35 italic leading-relaxed">
        &ldquo;{text}&rdquo;
      </p>
      <p className="font-mono-cosmic text-[0.3rem] text-[#FFC300]/20 mt-1.5 tracking-[0.15em]">
        — {author}
      </p>
    </motion.div>
  );
}

/* ══════════════════════════════════════ */
/* MAIN — CONVERSION LANDING             */
/* ══════════════════════════════════════ */

export default function ElUmbral() {
  const containerRef = useRef(null);
  const [scrollProg, setScrollProg] = useState(0);
  const [loaded, setLoaded] = useState(true);
  const [breachPhase, setBreachPhase] = useState(0);
  const hasBreached = useRef(false);

  const { scrollYProgress } = useScroll({ target: containerRef });

  const entityY = useTransform(scrollYProgress, [0.08, 0.22], [80, -100]);
  const entityScale = useTransform(scrollYProgress, [0.08, 0.22], [0.8, 1.15]);

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

      // Breach trigger (once only)
      if (v > 0.18 && v < 0.24 && !hasBreached.current) {
        hasBreached.current = true;
        setBreachPhase(1);
      }
    });
    return () => unsub();
  }, [scrollYProgress]);

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

      {/* ═══════════════ THE BREACH ═══════════════ */}
      <TheBreach phase={breachPhase} />

      {/* ═══════════════ SCROLL JOURNEY ═══════════════ */}
      <main ref={containerRef} className="relative">

        {/* ── SECTION 1: HERO — THE HOOK ── */}
        <section className="relative min-h-screen flex flex-col items-center justify-center px-6">
          <motion.div
            initial={{ opacity: 0, scale: 0.2 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 5, delay: 2.5 }}
            className="mb-16"
          >
            <GoldenSingularity size={45} intensity={0.5} variant="icon" />
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 25, filter: "blur(10px)" }}
            animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            transition={{ duration: 4, delay: 3.5 }}
            className="font-display text-[3.5rem] sm:text-7xl font-black leading-[0.9] text-center text-white/85"
          >
            ALGUNOS VEN
          </motion.h1>
          <motion.h1
            initial={{ opacity: 0, y: 25, filter: "blur(10px)" }}
            animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            transition={{ duration: 4, delay: 4.2 }}
            className="font-display text-[3.5rem] sm:text-7xl font-black leading-[0.9] text-center"
          >
            <span className="text-[#FFC300] golden-glow-strong">OTROS OBSERVAN</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 2, delay: 5.5 }}
            className="font-body text-sm text-white/30 text-center mt-6 max-w-[300px]"
          >
            Tu mente no ve lo que cree ver. Hay patrones invisibles controlando cada conversación, cada decisión, cada relación.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.5, delay: 6.5 }}
            className="mt-10"
          >
            <CtaButton text="CRUZAR EL UMBRAL" href={CTA} size="lg" />
          </motion.div>

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

        {/* ── SECTION 2: GUARDIAN — THE PROBLEM ── */}
        <section className="relative min-h-[130vh] flex flex-col items-center justify-center px-6">
          <div className="h-[15vh]" />

          <motion.div
            style={{ y: entityY, scale: entityScale }}
            className="relative z-10"
          >
            <CosmicEntity size={260} intensity={0.8 + scrollProg * 0.6} />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 15, filter: "blur(8px)" }}
            whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 2.5, delay: 0.8 }}
            className="text-center mt-14 relative z-10 max-w-[320px]"
          >
            <h2 className="font-display text-2xl sm:text-4xl font-black">
              <span className="text-[#FFC300] golden-glow-strong">MUY POCOS DETECTAN</span>
            </h2>
            <p className="font-body text-xs text-white/25 mt-4 leading-relaxed">
              Las personas creen que pierden oportunidades por lo que dicen. En realidad, las pierden por los patrones invisibles que proyectan sin saberlo.
            </p>
          </motion.div>

          <div className="h-[20vh]" />
        </section>

        {/* ── SECTION 3: BREACH SPACE ── */}
        <section className="relative h-[20vh]" />

        {/* ── SECTION 4: THE AWAKENING — PAIN POINTS ── */}
        <section className="relative min-h-screen flex flex-col items-center justify-center px-6 py-20">
          <motion.div
            initial={{ opacity: 0, filter: "blur(6px)" }}
            whileInView={{ opacity: 1, filter: "blur(0px)" }}
            viewport={{ once: true }}
            transition={{ duration: 2 }}
            className="text-center mb-12 max-w-[340px]"
          >
            <p className="font-mono-cosmic text-[0.35rem] tracking-[0.3em] text-[#FFC300]/25 mb-3">
              SEÑAL INTERCEPTADA
            </p>
            <h2 className="font-display text-2xl sm:text-4xl font-black text-white/80">
              Vives rodeado de patrones que <span className="text-[#FFC300] golden-glow-strong">no puedes ver</span>
            </h2>
          </motion.div>

          <div className="w-full max-w-[320px] mx-auto space-y-4">
            {[
              { icon: "👁️", text: "Alguien te lee mejor de lo que tú te lees a ti mismo" },
              { icon: "🎭", text: "Confundes manipulación con carisma, sumisión con amabilidad" },
              { icon: "🕳️", text: "Tus decisiones ya fueron influenciadas antes de que las tomaras" },
              { icon: "⚡", text: "El silencio de los demás dice más que sus palabras — y no lo escuchas" },
            ].map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: -15 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: i * 0.2 }}
                className="flex items-start gap-3 py-2"
              >
                <span className="text-lg mt-0.5">{item.icon}</span>
                <p className="font-body text-sm text-white/35 leading-relaxed">{item.text}</p>
              </motion.div>
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1, delay: 1.2 }}
            className="mt-12"
          >
            <CtaButton text="DESBLOQUEAR ACCESO" href={CTA} size="md" />
          </motion.div>
        </section>

        {/* ── SECTION 5: SINGULARITY METER — PERCEPTION ── */}
        <section className="relative min-h-[80vh] flex flex-col items-center justify-center px-6">
          <div className="w-full max-w-[180px] mx-auto">
            <div className="relative mb-6">
              <GoldenSingularity
                size={150}
                intensity={0.4 + scrollProg * 0.6}
                variant="meter"
                progress={Math.min(100, Math.floor(scrollProg * 180))}
              />
              <div className="absolute inset-0 flex flex-col items-center justify-center">
                <motion.span
                  className="font-display text-3xl font-black text-[#FFC300] golden-glow-strong"
                  key={Math.min(100, Math.floor(scrollProg * 180))}
                  initial={{ scale: 1.06 }}
                  animate={{ scale: 1 }}
                  transition={{ duration: 0.15 }}
                >
                  {Math.min(100, Math.floor(scrollProg * 180))}
                </motion.span>
                <span className="font-mono-cosmic text-[0.22rem] tracking-[0.3em] text-white/8 mt-0.5">NIVEL DE PERCEPCIÓN</span>
              </div>
            </div>
          </div>

          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 2, delay: 0.5 }}
            className="font-body text-xs text-white/20 text-center max-w-[280px] mt-4"
          >
            Mientras lees esto, tu nivel de percepción aumenta. Pero saber que existe el patrón no es lo mismo que verlo.
          </motion.p>
        </section>

        {/* ── SECTION 6: SOLUTION REVEAL — EL SABIO MANIPULADOR ── */}
        <section className="relative min-h-screen flex flex-col items-center justify-center px-6 py-20">
          <motion.div
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-80 h-80 rounded-full pointer-events-none"
            style={{
              background: "radial-gradient(circle, rgba(255,195,0,0.04) 0%, transparent 40%)",
              animation: "singularitySpin 45s linear infinite",
            }}
          />

          <motion.div
            initial={{ opacity: 0, scale: 0.5 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 3 }}
            className="mb-8 relative z-10"
          >
            <GoldenSingularity size={120} intensity={1.5} variant="portal" />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1.5, delay: 0.5 }}
            className="text-center relative z-10 max-w-[340px]"
          >
            <p className="font-mono-cosmic text-[0.3rem] tracking-[0.3em] text-[#FFC300]/20 mb-2">
              ARCHIVO DESBLOQUEADO
            </p>
            <h2 className="font-display text-3xl sm:text-5xl font-black">
              <span className="text-[#FFC300] golden-glow-strong">EL SABIO</span>
            </h2>
            <h2 className="font-display text-3xl sm:text-5xl font-black text-white/70 mt-1">
              MANIPULADOR
            </h2>
            <p className="font-body text-xs text-white/25 mt-5 leading-relaxed">
              El sistema que descodifica los patrones ocultos detrás de cada interacción humana. No es teoría. Es un mapa que la mayoría nunca tendrá en sus manos.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1, delay: 1.5 }}
            className="mt-10 relative z-10"
          >
            <CtaButton text="ACCEDER AL SISTEMA" href={CTA} size="md" />
          </motion.div>
        </section>

        {/* ── SECTION 7: DECODED PATTERNS — BENEFITS ── */}
        <section className="relative min-h-screen flex flex-col items-center justify-center px-6 py-20">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1.5 }}
            className="mb-8"
          >
            <p className="font-mono-cosmic text-[0.3rem] tracking-[0.3em] text-[#FFC300]/20 text-center">
              PATRONES DECODIFICADOS
            </p>
            <h2 className="font-display text-xl sm:text-2xl font-black text-white/60 text-center mt-2">
              Lo que descubrirás dentro
            </h2>
          </motion.div>

          <div className="w-full max-w-[300px] mx-auto relative z-10">
            <div className="space-y-1">
              <PatternCard
                id="001"
                title="Reciprocidad Oculta"
                text="El halago excesivo no es amabilidad — es un mecanismo de deuda emocional. Aprende a detectar cuándo alguien está creando una obligación invisible contigo."
                unlocked={scrollProg > 0.45}
              />
              <PatternCard
                id="002"
                title="Control Maquiavélico"
                text="Quien cumple su palabra cuando se vuelve en su contra muestra debilidad, no virtud. Descubre por qué los verdaderos operadores nunca juegan con las reglas de los demás."
                unlocked={scrollProg > 0.50}
                delay={0.12}
              />
              <PatternCard
                id="003"
                title="Seducción Silenciosa"
                text="No comienza con lo que dices, sino con lo que el otro cree que descubrió solo. El mejor influencer es el que nunca parece estar influyendo."
                unlocked={scrollProg > 0.55}
                delay={0.24}
              />
              <PatternCard
                id="004"
                title="Poder del Vacío"
                text="La ausencia calculada genera más poder que la presencia constante. Aprende el arte de desaparecer en el momento exacto para multiplicar tu impacto."
                unlocked={scrollProg > 0.60}
                delay={0.36}
              />
              <PatternCard
                id="005"
                title="Anclaje de Confianza"
                text="Confían en ti cuando permaneces en silencio en el instante preciso. El silencio estratégico es la herramienta más subestimada de influencia."
                unlocked={scrollProg > 0.65}
                delay={0.48}
              />
            </div>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1, delay: 1 }}
            className="mt-10"
          >
            <CtaButton text="DESBLOQUEAR TODO" href={CTA} size="md" />
          </motion.div>
        </section>

        {/* ── SECTION 8: SOCIAL PROOF ── */}
        <section className="relative min-h-[80vh] flex flex-col items-center justify-center px-6 py-20">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1.5 }}
            className="mb-10"
          >
            <p className="font-mono-cosmic text-[0.3rem] tracking-[0.3em] text-[#FFC300]/20 text-center">
              SEÑALES CONFIRMADAS
            </p>
            <h2 className="font-display text-xl sm:text-2xl font-black text-white/60 text-center mt-2">
              Ya cruzaron el umbral
            </h2>
          </motion.div>

          <div className="w-full max-w-[320px] mx-auto">
            <div className="grid grid-cols-3 gap-4 mb-10">
              <ProofCounter value="47K+" label="Mentes activas" visible={scrollProg > 0.72} />
              <ProofCounter value="22" label="Patrones" visible={scrollProg > 0.72} />
              <ProofCounter value="97%" label="Retención" visible={scrollProg > 0.72} />
            </div>

            <div className="space-y-5">
              <Testimonial
                text="Empecé a ver patrones en conversaciones que antes me parecían normales. Ahora no puedo dejar de verlos."
                author="Mente Despierta — México"
                visible={scrollProg > 0.74}
              />
              <Testimonial
                text="Esto no es lo que esperaba. Es mucho más profundo. Cada página te hace cuestionar todo."
                author="Observador Silencioso — España"
                visible={scrollProg > 0.74}
                delay={0.3}
              />
              <Testimonial
                text="Pensé que era otro libro de autoayuda. Me equivoqué. Esto es otra categoría completamente."
                author="El Despierto — Argentina"
                visible={scrollProg > 0.74}
                delay={0.6}
              />
            </div>
          </div>
        </section>

        {/* ── SECTION 9: URGENCY + FINAL CTA ── */}
        <section className="relative min-h-screen flex flex-col items-center justify-center px-6 bg-gradient-to-b from-transparent via-[#050505]/60 to-[#050505]">
          <motion.div
            initial={{ scale: 0, opacity: 0 }}
            whileInView={{ scale: 1, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 2.5 }}
            className="relative mb-8"
          >
            <GoldenSingularity size={160} intensity={2.5} variant="cta" />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1.5, delay: 0.5 }}
            className="text-center relative z-10 max-w-[340px]"
          >
            <p className="font-mono-cosmic text-[0.35rem] tracking-[0.3em] text-[#FFC300]/25 mb-3">
              PORTAL ACTIVO
            </p>
            <h2 className="font-display text-3xl sm:text-5xl font-black">
              <span className="text-[#FFC300] golden-glow-strong">EL UMBRAL</span>
            </h2>
            <h2 className="font-display text-xl sm:text-3xl font-black text-white/50 mt-2">
              SE ABRE
            </h2>
            <p className="font-body text-xs text-white/25 mt-5 leading-relaxed">
              La mayoría ignorará esta señal. Volverá a scroll. Volverá a su vida. Pero tú ya no eres la mayoría — ya puedes ver el patrón.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1, delay: 1.2 }}
            className="mt-10 relative z-10"
          >
            <CtaButton text="CRUZAR EL UMBRAL" href={CTA} size="lg" />
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1, delay: 2 }}
            className="mt-6 text-center"
          >
            <p className="font-mono-cosmic text-[0.3rem] tracking-[0.2em] text-white/10">
              ACCESO INMEDIATO · CONTENIDO EXCLUSIVO
            </p>
          </motion.div>

          <div className="h-20" />
        </section>

        {/* ── FOOTER ── */}
        <footer className="relative bg-[#050505] py-8 px-6 text-center">
          <div className="mb-4">
            <GoldenSingularity size={20} intensity={0.3} variant="icon" />
          </div>
          <p className="font-mono-cosmic text-[0.25rem] tracking-[0.3em] text-white/8">
            EL UMBRAL — 2025
          </p>
        </footer>
      </main>
    </>
  );
}
