"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion";
import CosmicCanvas from "@/components/cosmic/CosmicCanvas";
import CosmicEntity from "@/components/cosmic/CosmicEntity";
import GoldenSingularity from "@/components/cosmic/GoldenSingularity";

const CTA = "https://app.elsabiomanipulador.com/inicio?ref=L106036858P";

/* ══════════════════════════════════════ */
/* COUNTDOWN TIMER                        */
/* ══════════════════════════════════════ */

function CountdownTimer() {
  const [time, setTime] = useState({ m: 14, s: 59 });

  useEffect(() => {
    const interval = setInterval(() => {
      setTime((prev) => {
        if (prev.s > 0) return { ...prev, s: prev.s - 1 };
        if (prev.m > 0) return { m: prev.m - 1, s: 59 };
        return { m: 14, s: 59 };
      });
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="fixed top-0 left-0 right-0 z-[60] bg-[#0A0A0A]/95 backdrop-blur-sm border-b border-[#FFC300]/[0.06] py-2 px-4">
      <div className="max-w-lg mx-auto flex items-center justify-center gap-2">
        <span className="text-[0.4rem] sm:text-[0.5rem] font-mono-cosmic tracking-[0.2em] text-[#FFC300]/50 uppercase">⚡ Oferta limitada — Este precio desaparece en</span>
        <span className="font-mono-cosmic text-sm sm:text-base font-bold text-[#FFC300] golden-glow-strong">
          {String(time.m).padStart(2, "0")}:{String(time.s).padStart(2, "0")}
        </span>
      </div>
    </div>
  );
}

/* ══════════════════════════════════════ */
/* SCROLL PROGRESS BAR                    */
/* ══════════════════════════════════════ */

function ScrollBar({ progress }: { progress: number }) {
  return (
    <div className="fixed top-[32px] left-0 right-0 z-50 h-[1px]">
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
/* THE BREACH                             */
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
          style={{ backgroundColor: "#FFC300", boxShadow: phase < 4 ? "0 0 15px rgba(255,195,0,0.5), 0 0 35px rgba(255,195,0,0.25)" : "0 0 200px rgba(255,195,0,0.8), 0 0 500px rgba(255,195,0,0.4)" }}
          initial={{ width: 0, height: 0, opacity: 0 }}
          animate={{ width: phase >= 4 ? 4000 : 5, height: phase >= 4 ? 4000 : 5, opacity: phase >= 4 ? 0 : 1 }}
          transition={{ duration: phase >= 4 ? 1 : 1.5, ease: phase >= 4 ? [0.16, 1, 0.3, 1] : "easeInOut" }}
        />
      )}
      {phase >= 4 && (
        <motion.div className="fixed inset-0" style={{ backgroundColor: "#FFD84D" }} initial={{ opacity: 0 }} animate={{ opacity: [0, 0.5, 0] }} transition={{ duration: 0.7 }} />
      )}
      {phase >= 3 && (
        <div className="relative z-10 text-center px-8">
          <motion.h1 initial={{ opacity: 0, y: 25, filter: "blur(12px)" }} animate={{ opacity: phase >= 4 ? 0 : 1, y: 0, filter: "blur(0px)" }} transition={{ duration: 1.5, ease: "easeOut" }} className="font-display text-4xl sm:text-6xl font-black text-white/90">OBSERVAR</motion.h1>
          <motion.h1 initial={{ opacity: 0, y: 25, filter: "blur(12px)" }} animate={{ opacity: phase >= 4 ? 0 : 1, y: 0, filter: "blur(0px)" }} transition={{ duration: 1.5, delay: 0.7, ease: "easeOut" }} className="font-display text-4xl sm:text-6xl font-black text-[#FFC300] golden-glow-strong mt-2">NO ES LO MISMO</motion.h1>
          <motion.h1 initial={{ opacity: 0, y: 25, filter: "blur(12px)" }} animate={{ opacity: phase >= 4 ? 0 : 1, y: 0, filter: "blur(0px)" }} transition={{ duration: 1.5, delay: 1.4, ease: "easeOut" }} className="font-display text-4xl sm:text-6xl font-black text-white/40 mt-2">QUE VER</motion.h1>
        </div>
      )}
    </motion.div>
  );
}

/* ══════════════════════════════════════ */
/* CTA BUTTON                             */
/* ══════════════════════════════════════ */

function CtaButton({ text, href, size = "lg" }: { text: string; href: string; size?: "lg" | "md" | "sm" }) {
  const sizeClasses = {
    lg: "w-full max-w-[340px] text-[0.6rem] tracking-[0.3em] px-8 py-4",
    md: "w-full max-w-[300px] text-[0.55rem] tracking-[0.25em] px-7 py-3.5",
    sm: "w-full max-w-[260px] text-[0.5rem] tracking-[0.2em] px-5 py-3",
  };
  return (
    <motion.a
      href={href} target="_blank" rel="noopener noreferrer"
      className={`relative z-10 block font-mono-cosmic font-bold text-center overflow-hidden rounded-sm text-[#050505] bg-gradient-to-r from-[#FFB800] via-[#FFC300] to-[#FFD84D] ${sizeClasses[size]}`}
      style={{ boxShadow: "0 0 35px rgba(255,195,0,0.12)", animation: "breatheGlow 3s ease-in-out infinite" }}
      whileHover={{ scale: 1.04, boxShadow: "0 0 55px rgba(255,195,0,0.3)" }}
      whileTap={{ scale: 0.97 }}
    >
      <span className="relative z-10">{text}</span>
      <div className="absolute inset-0 holo-shimmer" />
    </motion.a>
  );
}

/* ══════════════════════════════════════ */
/* FAQ ITEM                               */
/* ══════════════════════════════════════ */

function FaqItem({ q, a }: { q: string; a: string }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="border-b border-white/[0.04] py-4">
      <button onClick={() => setOpen(!open)} className="w-full flex items-start justify-between gap-3 text-left">
        <span className="font-display text-sm font-bold text-white/70">{q}</span>
        <motion.span animate={{ rotate: open ? 45 : 0 }} transition={{ duration: 0.3 }} className="text-[#FFC300] text-lg leading-none flex-shrink-0 mt-0.5">+</motion.span>
      </button>
      <AnimatePresence>
        {open && (
          <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.4 }} className="overflow-hidden">
            <p className="font-body text-xs text-white/35 leading-relaxed pt-3">{a}</p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

/* ══════════════════════════════════════ */
/* SECTION TAG                            */
/* ══════════════════════════════════════ */

function SectionTag({ text }: { text: string }) {
  return <p className="font-mono-cosmic text-[0.3rem] tracking-[0.3em] text-[#FFC300]/20 text-center mb-3">{text}</p>;
}

/* ══════════════════════════════════════ */
/* MAIN LANDING                           */
/* ══════════════════════════════════════ */

export default function ElUmbral() {
  const containerRef = useRef(null);
  const [scrollProg, setScrollProg] = useState(0);
  const [loaded, setLoaded] = useState(true);
  const [breachPhase, setBreachPhase] = useState(0);
  const hasBreached = useRef(false);

  const { scrollYProgress } = useScroll({ target: containerRef });
  const entityY = useTransform(scrollYProgress, [0.05, 0.16], [80, -100]);
  const entityScale = useTransform(scrollYProgress, [0.05, 0.16], [0.8, 1.15]);

  useEffect(() => { const t = setTimeout(() => setLoaded(false), 800); return () => clearTimeout(t); }, []);

  useEffect(() => {
    if (breachPhase === 1) { const t = setTimeout(() => setBreachPhase(2), 800); return () => clearTimeout(t); }
    if (breachPhase === 2) { const t = setTimeout(() => setBreachPhase(3), 1200); return () => clearTimeout(t); }
    if (breachPhase === 3) { const t = setTimeout(() => setBreachPhase(4), 3200); return () => clearTimeout(t); }
    if (breachPhase === 4) { const t = setTimeout(() => setBreachPhase(5), 500); return () => clearTimeout(t); }
    if (breachPhase === 5) { const t = setTimeout(() => setBreachPhase(0), 2000); return () => clearTimeout(t); }
  }, [breachPhase]);

  useEffect(() => {
    const unsub = scrollYProgress.on("change", (v) => {
      setScrollProg(v);
      if (v > 0.13 && v < 0.19 && !hasBreached.current) { hasBreached.current = true; setBreachPhase(1); }
    });
    return () => unsub();
  }, [scrollYProgress]);

  return (
    <>
      {/* ═══════════════ LOADER ═══════════════ */}
      <AnimatePresence>
        {loaded && (
          <motion.div className="fixed inset-0 z-[100] bg-[#050505] flex items-center justify-center" exit={{ opacity: 0 }} transition={{ duration: 3, ease: "easeInOut" }}>
            <motion.div initial={{ scale: 0, opacity: 0 }} animate={{ scale: [0, 1.3, 1], opacity: [0, 1, 1] }} exit={{ scale: 5, opacity: 0 }} transition={{ duration: 2 }}>
              <GoldenSingularity size={60} intensity={1.5} variant="loader" />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ═══════════════ COUNTDOWN ═══════════════ */}
      <CountdownTimer />

      {/* ═══════════════ FIXED LAYERS ═══════════════ */}
      <CosmicCanvas />
      <div className="fixed inset-0 z-[1] scanlines pointer-events-none" />
      <div className="grain-overlay" />
      <div className="scan-sweep" />
      <div className="fixed inset-0 z-[2] pointer-events-none" style={{ background: "radial-gradient(ellipse at center, transparent 40%, rgba(5,5,5,0.5) 80%, rgba(5,5,5,0.85) 100%)" }} />
      <ScrollBar progress={scrollProg} />
      <TheBreach phase={breachPhase} />

      {/* ═══════════════ SCROLL JOURNEY ═══════════════ */}
      <main ref={containerRef} className="relative" style={{ paddingTop: "32px" }}>

        {/* ══════════════════════════════════════════════════════════ */}
        {/* 1. HERO — Exact copy from original                      */}
        {/* ══════════════════════════════════════════════════════════ */}
        <section className="relative min-h-screen flex flex-col items-center justify-center px-6">
          <motion.div initial={{ opacity: 0, scale: 0.2 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 5, delay: 2.5 }} className="mb-12">
            <GoldenSingularity size={45} intensity={0.5} variant="icon" />
          </motion.div>

          {/* ARCHIVO RESTRINGIDO tag */}
          <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 3 }} className="font-mono-cosmic text-[0.3rem] tracking-[0.3em] text-[#FFC300]/15 mb-4">
            {"// ARCHIVO RESTRINGIDO — NIVEL DE ACCESO: ABSOLUTO"}
          </motion.p>

          <motion.div initial={{ opacity: 0, y: 25, filter: "blur(10px)" }} animate={{ opacity: 1, y: 0, filter: "blur(0px)" }} transition={{ duration: 4, delay: 3.5 }} className="text-center">
            <h1 className="font-display text-[2.8rem] sm:text-6xl font-black leading-[0.95] text-white/85">
              El 97% de las personas son
            </h1>
            <h1 className="font-display text-[2.8rem] sm:text-6xl font-black leading-[0.95] mt-1">
              <span className="text-[#FFC300] golden-glow-strong">manipuladas a diario</span>
            </h1>
            <h1 className="font-display text-[2.8rem] sm:text-6xl font-black leading-[0.95] mt-1 text-white/85">
              sin saberlo.
            </h1>
          </motion.div>

          <motion.p initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 2, delay: 4.5 }} className="font-body text-sm text-white/30 text-center mt-5 max-w-[320px]">
            Este libro te pone del otro lado.
          </motion.p>
          <motion.p initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 2, delay: 5 }} className="font-body text-xs text-white/20 text-center mt-3 max-w-[340px]">
            Descubre los principios de la psicología oscura que usan líderes, negociadores y estrategas para controlar cualquier situación — y aprende a detectar cuando alguien los usa contra ti.
          </motion.p>

          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1.5, delay: 5.8 }} className="mt-8">
            <CtaButton text="🔓 DESBLOQUEAR ACCESO AHORA" href={CTA} size="lg" />
          </motion.div>

          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 6.5 }} className="flex items-center gap-4 mt-5">
            <span className="font-mono-cosmic text-[0.3rem] text-[#FFC300]/25 tracking-[0.12em]">📥 +2,400 copias</span>
            <span className="font-mono-cosmic text-[0.3rem] text-[#FFC300]/25 tracking-[0.12em]">⭐ 4.8/5 valoración</span>
            <span className="font-mono-cosmic text-[0.3rem] text-[#FFC300]/25 tracking-[0.12em]">🔒 Garantía 7 días</span>
          </motion.div>

          <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 8 }} className="absolute bottom-16 left-1/2 -translate-x-1/2 font-mono-cosmic text-[0.35rem] tracking-[0.2em] text-white/10">
            Sigue deslizando
          </motion.p>
        </section>

        {/* ══════════════════════════════════════════════════════════ */}
        {/* 2. GUARDIAN — ENTITY REVEAL                              */}
        {/* ══════════════════════════════════════════════════════════ */}
        <section className="relative min-h-[110vh] flex flex-col items-center justify-center px-6">
          <div className="h-[10vh]" />
          <motion.div style={{ y: entityY, scale: entityScale }} className="relative z-10">
            <CosmicEntity size={230} intensity={0.8 + scrollProg * 0.6} />
          </motion.div>
          <motion.div initial={{ opacity: 0, y: 15, filter: "blur(8px)" }} whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }} viewport={{ once: true, amount: 0.2 }} transition={{ duration: 2.5, delay: 0.8 }} className="text-center mt-10 relative z-10 max-w-[320px]">
            <p className="font-display text-2xl sm:text-3xl font-black text-[#FFC300] golden-glow-strong">Domina la Mente Humana</p>
          </motion.div>
          <div className="h-[15vh]" />
        </section>

        {/* 3. BREACH SPACE */}
        <section className="relative h-[16vh]" />

        {/* ══════════════════════════════════════════════════════════ */}
        {/* 4. CONTENIDO CLASIFICADO — EXTRACTOS                     */}
        {/* ══════════════════════════════════════════════════════════ */}
        <section className="relative min-h-screen flex flex-col items-center justify-center px-6 py-20">
          <motion.div initial={{ opacity: 0, filter: "blur(6px)" }} whileInView={{ opacity: 1, filter: "blur(0px)" }} viewport={{ once: true }} transition={{ duration: 2 }} className="text-center mb-10 max-w-[340px]">
            <SectionTag text="CONTENIDO CLASIFICADO" />
            <h2 className="font-display text-2xl sm:text-3xl font-black text-white/80">
              Lo que vas a descubrir no se enseña <span className="text-[#FFC300] golden-glow-strong">en ninguna universidad</span>
            </h2>
          </motion.div>

          <div className="w-full max-w-[340px] mx-auto space-y-7">
            {[
              { quote: "Cuando alguien te halaga excesivamente en los primeros minutos de conocerte, no está siendo amable — está activando el principio de reciprocidad para que bajes la guardia.", cap: "Cap. 5 — Dominando la Mente Humana" },
              { quote: "Un líder inteligente no puede ni debe cumplir su palabra cuando tal cumplimiento se vuelve en su contra. Si todos los hombres fueran buenos, este precepto no sería válido...", cap: "Cap. 2 — El Poder Maquiavélico" },
              { quote: "La seducción no comienza con lo que dices, sino con lo que la otra persona cree que descubrió por sí misma sobre ti. El misterio calculado es tu arma más poderosa.", cap: "Cap. 6 — El Arte de la Seducción Psicológica" },
            ].map((item, i) => (
              <motion.div key={i} initial={{ opacity: 0, y: 12 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.8, delay: i * 0.25 }} className="border-l-2 border-[#FFC300]/15 pl-4">
                <p className="font-mono-cosmic text-[0.25rem] text-[#FFC300]/15 mb-1 tracking-[0.2em]">{"// EXTRACTO"}</p>
                <p className="font-body text-xs text-white/40 italic leading-relaxed">&ldquo;{item.quote}&rdquo;</p>
                <p className="font-mono-cosmic text-[0.3rem] text-[#FFC300]/25 mt-2 tracking-[0.15em]">— {item.cap}</p>
              </motion.div>
            ))}
          </div>
        </section>

        {/* ══════════════════════════════════════════════════════════ */}
        {/* 5. ARSENAL PSICOLÓGICO — 10 CAPS + 8 LEYES              */}
        {/* ══════════════════════════════════════════════════════════ */}
        <section className="relative min-h-screen flex flex-col items-center justify-center px-6 py-20">
          <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ duration: 1.5 }} className="text-center mb-8 max-w-[340px]">
            <SectionTag text="ARSENAL PSICOLÓGICO" />
            <h2 className="font-display text-2xl sm:text-3xl font-black text-white/80">
              10 capítulos. 8 leyes.
            </h2>
            <p className="font-display text-lg text-[#FFC300]/60 mt-1">Un arsenal psicológico completo.</p>
          </motion.div>

          <div className="w-full max-w-[350px] mx-auto space-y-3">
            {[
              { icon: "👁️", text: "Las 8 Leyes del Comportamiento Humano — predice lo que cualquiera hará antes de que lo haga" },
              { icon: "🧠", text: "Técnicas de persuasión oscura que usan negociadores de élite" },
              { icon: "🛡️", text: "Cómo detectar manipulación emocional en relaciones y trabajo" },
              { icon: "💘", text: "El arte de la seducción psicológica (sin trucos baratos)" },
              { icon: "🎭", text: "Control emocional absoluto — que nadie vea lo que sientes" },
              { icon: "⚠️", text: "Identificar narcisistas, maquiavélicos y psicópatas antes de que te dañen" },
              { icon: "🔗", text: "Protegerte de relaciones tóxicas con ciencia" },
              { icon: "♟️", text: "El camino al poder absoluto — influencia sin fuerza" },
            ].map((item, i) => (
              <motion.div key={i} initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6, delay: i * 0.1 }} className="flex items-start gap-3 py-2.5 border-b border-white/[0.03]">
                <span className="text-base flex-shrink-0 mt-0.5">{item.icon}</span>
                <p className="font-body text-xs text-white/40 leading-relaxed">{item.text}</p>
              </motion.div>
            ))}
          </div>

          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 1, delay: 1 }} className="mt-10">
            <CtaButton text="🔓 DESBLOQUEAR ACCESO AHORA" href={CTA} size="md" />
          </motion.div>
        </section>

        {/* ══════════════════════════════════════════════════════════ */}
        {/* 6. PERFIL DE ACCESO — 3 PERFILES                         */}
        {/* ══════════════════════════════════════════════════════════ */}
        <section className="relative min-h-screen flex flex-col items-center justify-center px-6 py-20">
          <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ duration: 1.5 }} className="text-center mb-10 max-w-[340px]">
            <SectionTag text="PERFIL DE ACCESO" />
            <h2 className="font-display text-2xl sm:text-3xl font-black text-white/70">
              ¿Para quién es <span className="text-[#FFC300] golden-glow-strong">este conocimiento?</span>
            </h2>
          </motion.div>

          <div className="w-full max-w-[340px] mx-auto space-y-5">
            {[
              { icon: "♟️", title: "El Estratega", desc: "Quieres entender cómo funciona la mente humana para tomar mejores decisiones en negocios, relaciones y vida." },
              { icon: "🛡️", title: "El Protegido", desc: "Sospechas que alguien te manipula — jefe, pareja, \"amigo\" — y quieres aprender a detectarlo y frenarlo." },
              { icon: "🎯", title: "El Ambicioso", desc: "Sabes que hay un nivel de influencia que no se aprende en libros comunes. Quieres esas herramientas." },
            ].map((item, i) => (
              <motion.div key={i} initial={{ opacity: 0, y: 12 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.8, delay: i * 0.2 }} className="border border-[#FFC300]/[0.06] rounded-sm p-5 bg-gradient-to-r from-[#FFC300]/[0.02] to-transparent">
                <div className="flex items-center gap-2.5 mb-2.5">
                  <span className="text-xl">{item.icon}</span>
                  <p className="font-display text-base font-bold text-[#FFC300]/70">{item.title}</p>
                </div>
                <p className="font-body text-xs text-white/35 leading-relaxed">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </section>

        {/* ══════════════════════════════════════════════════════════ */}
        {/* 7. FRAGMENTO REAL — CAPÍTULO 3, LEY #4                   */}
        {/* ══════════════════════════════════════════════════════════ */}
        <section className="relative min-h-[70vh] flex flex-col items-center justify-center px-6 py-20">
          <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ duration: 2 }} className="w-full max-w-[340px] mx-auto">
            <SectionTag text="FRAGMENTO REAL — CAPÍTULO 3" />
            <motion.div initial={{ scale: 0.8, opacity: 0 }} whileInView={{ scale: 1, opacity: 1 }} viewport={{ once: true }} transition={{ duration: 2 }} className="text-center mb-6">
              <GoldenSingularity size={60} intensity={1} variant="icon" />
            </motion.div>
            <h3 className="font-display text-xl sm:text-2xl font-black text-[#FFC300] golden-glow-strong text-center mb-5">
              Ley #4: La Ley del Vacío Estratégico
            </h3>
            <p className="font-body text-sm text-white/40 italic leading-relaxed text-center">
              &ldquo;La ausencia calculada genera más poder que la presencia constante. Cuando desapareces en el momento correcto, la otra persona llena ese vacío con pensamientos sobre ti. Es la base de toda obsesión.&rdquo;
            </p>
            <p className="font-mono-cosmic text-[0.35rem] text-[#FFC300]/25 mt-5 tracking-[0.2em] text-center">
              Esto es solo 1 de las 8 leyes. Las otras 7 están en el libro.
            </p>
          </motion.div>
        </section>

        {/* ══════════════════════════════════════════════════════════ */}
        {/* 8. 🎁 BONOS EXCLUSIVOS — 4 MANUALES                      */}
        {/* ══════════════════════════════════════════════════════════ */}
        <section className="relative min-h-screen flex flex-col items-center justify-center px-6 py-20">
          <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ duration: 1.5 }} className="text-center mb-6 max-w-[340px]">
            <SectionTag text="🎁 BONOS EXCLUSIVOS" />
            <h2 className="font-display text-xl sm:text-2xl font-black text-white/70">
              Además del libro, recibes estos <span className="text-[#FFC300] golden-glow-strong">4 manuales de poder</span>
            </h2>
          </motion.div>

          {/* Product Image — All 5 Books */}
          <motion.div initial={{ opacity: 0, scale: 0.9 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} transition={{ duration: 2 }} className="mb-6 max-w-[340px]">
            <img src="/cosmic/portadas.png" alt="El Sabio Manipulador — Libro + 4 Bonos" className="w-full rounded-sm" style={{ filter: "drop-shadow(0 0 30px rgba(255,195,0,0.12))" }} />
          </motion.div>

          <div className="w-full max-w-[350px] mx-auto space-y-3">
            {[
              { id: "01", title: "Cómo Detectar Mentiras", subtitle: "Desenmascara el Engaño", value: "$29" },
              { id: "02", title: "Gestos Corporales en la Vida Diaria", subtitle: "Lectura Corporal Avanzada", value: "$19" },
              { id: "03", title: "Gestos Corporales en la Seducción", subtitle: "Citas, Atracción y Manipulación", value: "$24" },
              { id: "04", title: "Activa el Poder de Tu Mente", subtitle: "Desbloquea tu Don Oculto", value: "$19" },
            ].map((item, i) => (
              <motion.div key={i} initial={{ opacity: 0, x: -10 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.6, delay: i * 0.12 }} className="flex items-center justify-between py-3 px-3 border border-[#FFC300]/[0.04] rounded-sm bg-gradient-to-r from-[#FFC300]/[0.01] to-transparent">
                <div className="flex items-center gap-3">
                  <span className="font-mono-cosmic text-[0.4rem] text-[#FFC300]/30 tracking-[0.2em]">BONO {item.id}</span>
                  <div>
                    <p className="font-display text-xs font-bold text-white/65">{item.title}</p>
                    <p className="font-body text-[0.6rem] text-white/25">{item.subtitle}</p>
                  </div>
                </div>
                <div className="text-right flex-shrink-0 ml-2">
                  <p className="font-mono-cosmic text-[0.35rem] text-white/15 line-through">~{item.value}</p>
                  <p className="font-mono-cosmic text-[0.4rem] text-[#FFC300]/60 font-bold">GRATIS</p>
                </div>
              </motion.div>
            ))}
          </div>

          <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ duration: 1, delay: 0.8 }} className="mt-5 text-center">
            <p className="font-mono-cosmic text-[0.4rem] tracking-[0.2em] text-white/15">
              Total en bonos: ~$91 → Incluidos <span className="text-[#FFC300]/50 font-bold">GRATIS</span>
            </p>
          </motion.div>
        </section>

        {/* ══════════════════════════════════════════════════════════ */}
        {/* 9. EVIDENCIA — TESTIMONIOS                               */}
        {/* ══════════════════════════════════════════════════════════ */}
        <section className="relative min-h-screen flex flex-col items-center justify-center px-6 py-20">
          <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ duration: 1.5 }} className="mb-8 text-center">
            <SectionTag text="EVIDENCIA" />
            <h2 className="font-display text-2xl sm:text-3xl font-black text-white/70">
              No es promesa.<br /><span className="text-[#FFC300] golden-glow-strong">Es evidencia.</span>
            </h2>
          </motion.div>

          <div className="w-full max-w-[340px] mx-auto">
            <div className="grid grid-cols-3 gap-4 mb-10">
              {[
                { value: "+2,400", label: "Copias" },
                { value: "4.8/5", label: "Valoración" },
                { value: "97%", label: "Retención" },
              ].map((item, i) => (
                <motion.div key={i} initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.8, delay: i * 0.15 }} className="text-center">
                  <p className="font-display text-2xl sm:text-3xl font-black text-[#FFC300] golden-glow-strong">{item.value}</p>
                  <p className="font-body text-[0.6rem] text-white/30 mt-1 tracking-wide">{item.label}</p>
                </motion.div>
              ))}
            </div>

            <div className="space-y-5">
              {[
                { text: "Empecé a ver patrones en conversaciones que antes me parecían normales. Ahora no puedo dejar de verlos.", author: "Mente Despierta — México" },
                { text: "Esto no es lo que esperaba. Es mucho más profundo. Cada capítulo te hace cuestionar todo lo que creías saber.", author: "Observador Silencioso — España" },
                { text: "Pensé que era otro libro de autoayuda. Me equivoqué. Esto es otra categoría completamente.", author: "El Despierto — Argentina" },
                { text: "El capítulo de las 8 leyes me voló la cabeza. Lo he leído 3 veces y sigo encontrando capas nuevas.", author: "Analista Nocturno — Colombia" },
                { text: "Mi relación cambió completamente cuando aprendí a detectar los patrones de manipulación. Imprescindible.", author: "Despierta Ya — Chile" },
                { text: "Lo compré por curiosidad y terminé devorándolo en una noche. Los bonos son increíblemente útiles.", author: "Estratega Digital — Perú" },
              ].map((item, i) => (
                <motion.div key={i} initial={{ opacity: 0, y: 12 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6, delay: i * 0.1 }} className="border-l border-[#FFC300]/10 pl-4 py-2">
                  <p className="font-body text-xs text-white/35 italic leading-relaxed">&ldquo;{item.text}&rdquo;</p>
                  <p className="font-mono-cosmic text-[0.3rem] text-[#FFC300]/20 mt-1.5 tracking-[0.15em]">— {item.author}</p>
                </motion.div>
              ))}
            </div>
          </div>

          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 1, delay: 0.8 }} className="mt-10">
            <CtaButton text="🔓 DESBLOQUEAR ACCESO AHORA" href={CTA} size="md" />
          </motion.div>
        </section>

        {/* ══════════════════════════════════════════════════════════ */}
        {/* 10. INVERSIÓN — PRICING CARD (exact from original)        */}
        {/* ══════════════════════════════════════════════════════════ */}
        <section className="relative min-h-[90vh] flex flex-col items-center justify-center px-6 py-20">
          <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ duration: 1.5 }} className="text-center mb-6">
            <SectionTag text="INVERSIÓN" />
          </motion.div>

          <motion.div initial={{ opacity: 0, scale: 0.9 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} transition={{ duration: 1.5 }} className="w-full max-w-[360px] mx-auto border border-[#FFC300]/[0.1] rounded-sm overflow-hidden" style={{ background: "linear-gradient(180deg, rgba(255,195,0,0.03) 0%, rgba(5,5,5,0.95) 100%)" }}>
            {/* Header */}
            <div className="py-5 px-6 text-center border-b border-[#FFC300]/[0.06]">
              <h3 className="font-display text-lg font-black text-white/80">LOTE 1 — ACCESO BÁSICO</h3>
              <p className="font-body text-xs text-white/30 mt-1">EL LIBRO + BONOS</p>
              <p className="font-mono-cosmic text-[0.35rem] tracking-[0.2em] text-[#FFC300]/25 mt-1">1 LIBRO · 4 BONOS</p>
            </div>

            {/* Checklist */}
            <div className="py-5 px-6 space-y-3">
              {[
                { text: "El Sabio Oscuro de la Psicología", sub: "El libro" },
                { text: "BONO 01 · Detectar Mentiras", sub: "" },
                { text: "BONO 02 · Gestos Corporales", sub: "" },
                { text: "BONO 03 · Gestos en Seducción", sub: "" },
                { text: "BONO 04 · Poder de Tu Mente", sub: "" },
              ].map((item, i) => (
                <motion.div key={i} initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ delay: 0.2 + i * 0.1 }} className="flex items-start gap-2.5">
                  <span className="text-[#FFC300] text-xs mt-0.5 flex-shrink-0">✓</span>
                  <div>
                    <p className="font-body text-xs text-white/50">{item.text}</p>
                    {item.sub && <p className="font-body text-[0.6rem] text-white/20">{item.sub}</p>}
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Price */}
            <div className="py-6 px-6 text-center border-t border-[#FFC300]/[0.06]">
              <p className="font-body text-sm text-white/20 line-through">DE US$ 110</p>
              <div className="flex items-baseline justify-center gap-1 mt-1">
                <span className="font-body text-sm text-white/30">US$</span>
                <span className="font-display text-5xl font-black text-[#FFC300] golden-glow-strong">22</span>
              </div>
              <p className="font-mono-cosmic text-[0.35rem] tracking-[0.25em] text-white/15 mt-2">PAGO ÚNICO · ACCESO INMEDIATO</p>

              <div className="mt-5">
                <CtaButton text="QUIERO ESTE →" href={CTA} size="lg" />
              </div>
            </div>
          </motion.div>

          {/* Urgency Warning */}
          <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ duration: 1, delay: 0.8 }} className="mt-6 text-center max-w-[340px]">
            <div className="border border-[#FFC300]/[0.06] rounded-sm p-4 bg-[#FFC300]/[0.01]">
              <p className="font-mono-cosmic text-[0.35rem] tracking-[0.2em] text-[#FFC300]/30 mb-1">⚠ ATENCIÓN</p>
              <p className="font-body text-xs text-white/30 leading-relaxed">
                Este precio es de <span className="text-[#FFC300]/60 font-bold">lanzamiento</span> y puede subir en cualquier momento sin previo aviso. <span className="text-white/50 font-bold">Lo que ves hoy no estará garantizado mañana.</span>
              </p>
            </div>
          </motion.div>
        </section>

        {/* ══════════════════════════════════════════════════════════ */}
        {/* 11. GARANTÍAS                                            */}
        {/* ══════════════════════════════════════════════════════════ */}
        <section className="relative min-h-[60vh] flex flex-col items-center justify-center px-6 py-20">
          <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ duration: 1.5 }} className="text-center mb-8">
            <SectionTag text="GARANTÍAS" />
          </motion.div>

          <div className="w-full max-w-[340px] mx-auto space-y-6">
            {[
              { num: "01", title: "Garantía Incondicional de 7 días", desc: "Si dentro de 7 días después de la inversión sientes que el material no es para ti, solo contacta al soporte y devolvemos el 100% de tu inversión.", highlight: "RIESGO CERO." },
              { num: "02", title: "Soporte Online", desc: "Resuelve tus dudas directamente con nuestro equipo.", highlight: "Acceso inmediato después del pago, desde cualquier dispositivo." },
            ].map((item, i) => (
              <motion.div key={i} initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.8, delay: i * 0.2 }} className="flex items-start gap-4">
                <span className="font-mono-cosmic text-2xl font-black text-[#FFC300]/15 flex-shrink-0">{item.num}</span>
                <div>
                  <p className="font-display text-sm font-bold text-white/60">{item.title}</p>
                  <p className="font-body text-xs text-white/30 leading-relaxed mt-1">{item.desc}</p>
                  <p className="font-body text-xs text-[#FFC300]/40 font-bold mt-1">{item.highlight}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </section>

        {/* ══════════════════════════════════════════════════════════ */}
        {/* 12. DUDAS — FAQ HOTMART (7 preguntas exactas)            */}
        {/* ══════════════════════════════════════════════════════════ */}
        <section className="relative min-h-screen flex flex-col items-center justify-center px-6 py-20">
          <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ duration: 1.5 }} className="text-center mb-8 max-w-[340px]">
            <SectionTag text="DUDAS" />
            <h2 className="font-display text-2xl sm:text-3xl font-black text-white/60">
              Tienes preguntas<br /><span className="text-[#FFC300] golden-glow-strong">tenemos respuestas.</span>
            </h2>
          </motion.div>

          <div className="w-full max-w-[350px] mx-auto">
            <FaqItem q="¿Para quién es este libro?" a="Para cualquier persona que quiera entender cómo funciona la mente humana: vendedores, emprendedores, personas que quieren mejorar sus relaciones, o simplemente quienes sienten que siempre los manipulan y quieren cambiar eso." />
            <FaqItem q="¿En qué formato recibo el libro?" a="En formato digital (PDF/ePub). Acceso inmediato después del pago, desde cualquier dispositivo: celular, tablet o computadora." />
            <FaqItem q="¿Es legal aprender esto?" a="Sí. El conocimiento es neutral — lo que importa es cómo lo uses. Estas técnicas se enseñan en universidades de psicología, negocios y comunicación en todo el mundo." />
            <FaqItem q="¿Tiene garantía?" a="Sí. 7 días de garantía total. Si no te convence por cualquier motivo, te devolvemos el dinero sin preguntas." />
            <FaqItem q="¿Cuánto tiempo tarda en llegar?" a="Instantáneo. Después del pago recibes el acceso por correo en menos de 5 minutos." />
            <FaqItem q="¿Puedo pagar con tarjeta de crédito o débito?" a="Sí. Aceptamos todas las tarjetas, PayPal y otros métodos según tu país. El pago es procesado por Hotmart, plataforma segura con más de 20 millones de usuarios." />
            <FaqItem q="¿Qué incluye el libro?" a="Incluye El Sabio Oscuro de la Psicología en formato digital + 4 bonos exclusivos de acceso inmediato. Todo lo que necesitas para dominar los principios de la psicología oscura." />
          </div>
        </section>

        {/* ══════════════════════════════════════════════════════════ */}
        {/* 13. FINAL CTA — exact copy from original                  */}
        {/* ══════════════════════════════════════════════════════════ */}
        <section className="relative min-h-screen flex flex-col items-center justify-center px-6 bg-gradient-to-b from-transparent via-[#050505]/60 to-[#050505]">
          <motion.div initial={{ scale: 0, opacity: 0 }} whileInView={{ scale: 1, opacity: 1 }} viewport={{ once: true }} transition={{ duration: 2.5 }} className="relative mb-8">
            <GoldenSingularity size={160} intensity={2.5} variant="cta" />
          </motion.div>

          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 1.5, delay: 0.5 }} className="text-center relative z-10 max-w-[340px]">
            <p className="font-display text-2xl sm:text-4xl font-black text-white/80">
              El conocimiento que no tienes
            </p>
            <p className="font-display text-2xl sm:text-4xl font-black mt-1">
              <span className="text-[#FFC300] golden-glow-strong">es el arma que usan contra ti.</span>
            </p>
          </motion.div>

          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 1, delay: 1.2 }} className="mt-10 relative z-10">
            <CtaButton text="🔓 DESBLOQUEAR EL SABIO OSCURO AHORA" href={CTA} size="lg" />
          </motion.div>

          <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ duration: 1, delay: 2 }} className="mt-4 text-center space-y-1">
            <p className="font-mono-cosmic text-[0.3rem] tracking-[0.2em] text-white/10">
              ACCESO INMEDIATO · PAGO ÚNICO · GARANTÍA 7 DÍAS
            </p>
            <p className="font-mono-cosmic text-[0.3rem] tracking-[0.2em] text-[#FFC300]/15">
              PROCESADO POR HOTMART · +20M USUARIOS
            </p>
          </motion.div>

          <div className="h-20" />
        </section>

        {/* ── FOOTER ── */}
        <footer className="relative bg-[#050505] py-8 px-6 text-center">
          <div className="mb-4"><GoldenSingularity size={20} intensity={0.3} variant="icon" /></div>
          <p className="font-mono-cosmic text-[0.25rem] tracking-[0.3em] text-white/8">EL UMBRAL — 2025</p>
          <p className="font-mono-cosmic text-[0.2rem] tracking-[0.2em] text-white/5 mt-1">Este producto es comercializado a través de Hotmart</p>
        </footer>
      </main>
    </>
  );
}
