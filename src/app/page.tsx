"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion";
import CosmicCanvas from "@/components/cosmic/CosmicCanvas";
import CosmicEntity from "@/components/cosmic/CosmicEntity";
import GoldenSingularity from "@/components/cosmic/GoldenSingularity";

/* ══════════════════════════════════════ */
/* LINKS                                  */
/* ══════════════════════════════════════ */
const CTA_BASIC = "https://go.hotmart.com/L106036858P?ap=b35a";
const CTA_PACK = "https://go.hotmart.com/B106072937O?ap=efe9";
const WA_MAIN = "https://wa.link/pdjzt0";
const WA_PACK = "https://wa.link/94fe07";

/* ══════════════════════════════════════ */
/* 15 BOOKS DATA                          */
/* ══════════════════════════════════════ */
const PACK1_BOOKS = [
  { title: "El Sabio Oscuro de la Psicología", sub: "Manipulación & Poder", price: "$37" },
  { title: "Cómo Detectar Mentiras", sub: "Desenmascara el Engaño", price: "$29" },
  { title: "Gestos Corporales en la Vida Diaria", sub: "Lectura Corporal Avanzada", price: "$19" },
  { title: "Gestos Corporales en la Seducción", sub: "Citas, Atracción y Manipulación", price: "$24" },
  { title: "Activa el Poder de Tu Mente", sub: "Desbloquea tu Don Oculto", price: "$19" },
];
const PACK2_BOOKS = [
  { title: "El Domador Encantador", sub: "Seducción & Dominio Emocional", price: "$37" },
  { title: "Dominación Mental y Emocional", sub: "Control Total de la Mente", price: "$29" },
  { title: "De la Pantalla a la Cama", sub: "Seducción Digital Avanzada", price: "$24" },
  { title: "Cómo Crear Tensión Sexual en 5 Minutos", sub: "Atracción Instantánea", price: "$19" },
  { title: "Crónicas de Control de Inversión", sub: "Maestría en Relaciones", price: "$24" },
];
const PACK3_BOOKS = [
  { title: "Jaque Mate Oscuro", sub: "Psicología en Negocios & Ventas", price: "$37" },
  { title: "Psicología Oscura en las Ventas", sub: "Cierra Cualquier Negocio", price: "$29" },
  { title: "Influencia Silenciosa", sub: "Persuasión sin Palabras", price: "$24" },
  { title: "El Arte de la Negociación Oscura", sub: "Gana Cada Negociación", price: "$19" },
  { title: "Poder y Estrategia", sub: "Domina Cualquier Escenario", price: "$24" },
];

/* ══════════════════════════════════════ */
/* COUNTDOWN TIMER (15 min, redirects)    */
/* ══════════════════════════════════════ */
function CountdownTimer({ compact = false }: { compact?: boolean }) {
  const [time, setTime] = useState({ m: 14, s: 59 });
  const expiredRef = useRef(false);
  useEffect(() => {
    const iv = setInterval(() => {
      setTime((p) => {
        if (p.s > 0) return { ...p, s: p.s - 1 };
        if (p.m > 0) return { m: p.m - 1, s: 59 };
        if (!expiredRef.current) {
          expiredRef.current = true;
          window.open(CTA_BASIC, "_self");
        }
        return { m: 0, s: 0 };
      });
    }, 1000);
    return () => clearInterval(iv);
  }, []);

  const isExpired = time.m === 0 && time.s === 0;
  if (compact) {
    return (
      <span className={`font-mono-cosmic text-sm font-bold ${isExpired ? "text-red-400 animate-pulse" : "text-[#FFC300] golden-glow-strong"}`}>
        {String(time.m).padStart(2, "0")}:{String(time.s).padStart(2, "0")}
      </span>
    );
  }
  return (
    <div className="fixed top-0 left-0 right-0 z-[60] bg-[#0A0A0A]/95 backdrop-blur-sm border-b border-[#FFC300]/[0.06] py-2.5 px-4">
      <div className="max-w-2xl mx-auto flex items-center justify-center gap-2">
        <span className="text-[0.5rem] sm:text-[0.6rem]">⚡</span>
        <span className="text-[0.35rem] sm:text-[0.5rem] font-mono-cosmic tracking-[0.2em] text-[#FFC300]/50 uppercase">
          OFERTA LIMITADA — Este precio desaparece en
        </span>
        <span className={`font-mono-cosmic text-sm sm:text-base font-bold ${isExpired ? "text-red-400 animate-pulse" : "text-[#FFC300] golden-glow-strong"}`}>
          {String(time.m).padStart(2, "0")}:{String(time.s).padStart(2, "0")}
        </span>
      </div>
    </div>
  );
}

/* ══════════════════════════════════════ */
/* MAGIC SPARKLES                         */
/* ══════════════════════════════════════ */
function MagicSparkles() {
  const sparkles = Array.from({ length: 12 }, (_, i) => ({
    id: i,
    left: Math.random() * 100,
    delay: Math.random() * 5,
    duration: 2 + Math.random() * 3,
    size: 2 + Math.random() * 4,
  }));
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none z-20">
      {sparkles.map((s) => (
        <motion.div
          key={s.id}
          className="absolute rounded-full bg-[#FFC300]"
          style={{ left: `${s.left}%`, width: s.size, height: s.size }}
          animate={{ y: [0, -30, -60], opacity: [0, 1, 0], scale: [0, 1.2, 0] }}
          transition={{ duration: s.duration, delay: s.delay, repeat: Infinity, ease: "easeOut" }}
        />
      ))}
    </div>
  );
}

/* ══════════════════════════════════════ */
/* CTA BUTTON                             */
/* ══════════════════════════════════════ */
function CtaButton({ text, href, size = "lg", sameWindow = false, onClick }: {
  text: string; href?: string; size?: "lg" | "md" | "sm"; sameWindow?: boolean; onClick?: () => void;
}) {
  const sizeClasses = {
    lg: "w-full max-w-[340px] text-[0.6rem] tracking-[0.3em] px-8 py-4",
    md: "w-full max-w-[300px] text-[0.55rem] tracking-[0.25em] px-7 py-3.5",
    sm: "w-full max-w-[260px] text-[0.5rem] tracking-[0.2em] px-5 py-3",
  };
  const shared = `relative z-10 block font-mono-cosmic font-bold text-center overflow-hidden rounded-sm text-[#050505] bg-gradient-to-r from-[#FFB800] via-[#FFC300] to-[#FFD84D] ${sizeClasses[size]}`;
  const style = { boxShadow: "0 0 35px rgba(255,195,0,0.12)", animation: "breatheGlow 3s ease-in-out infinite" };

  if (onClick) {
    return (
      <motion.button onClick={onClick} className={shared} style={style}
        whileHover={{ scale: 1.04, boxShadow: "0 0 55px rgba(255,195,0,0.3)" }} whileTap={{ scale: 0.97 }}>
        <span className="relative z-10">{text}</span>
        <div className="absolute inset-0 holo-shimmer" />
      </motion.button>
    );
  }
  return (
    <motion.a href={href} target={sameWindow ? "_self" : "_blank"} rel="noopener noreferrer" className={shared} style={style}
      whileHover={{ scale: 1.04, boxShadow: "0 0 55px rgba(255,195,0,0.3)" }} whileTap={{ scale: 0.97 }}>
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

function SectionTag({ text }: { text: string }) {
  return <p className="font-mono-cosmic text-[0.3rem] tracking-[0.3em] text-[#FFC300]/20 text-center mb-3">{text}</p>;
}

/* ══════════════════════════════════════ */
/* STICKY BOTTOM BAR                      */
/* ══════════════════════════════════════ */
function StickyBar({ page }: { page: "main" | "pack" }) {
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const handleScroll = () => setVisible(window.scrollY > window.innerHeight * 0.8);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const ctaHref = page === "main" ? CTA_BASIC : CTA_PACK;
  const offerText = page === "main" ? "Acceso Básico $27 USD" : "15 LIBROS — Solo $57 USD";

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ y: 100, opacity: 0 }} animate={{ y: 0, opacity: 1 }} exit={{ y: 100, opacity: 0 }}
          transition={{ duration: 0.4, ease: "easeOut" }}
          className="fixed bottom-0 left-0 right-0 z-[55] bg-[#0A0A0A]/98 backdrop-blur-md border-t border-[#FFC300]/[0.08] px-4 py-3"
        >
          <div className="max-w-lg mx-auto flex items-center justify-between gap-3">
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2">
                <CountdownTimer compact />
                <span className="font-mono-cosmic text-[0.35rem] tracking-[0.15em] text-white/25">|</span>
                <span className="font-body text-[0.6rem] text-[#FFC300]/60 font-bold truncate">{offerText}</span>
              </div>
            </div>
            <motion.a
              href={ctaHref} target="_blank" rel="noopener noreferrer"
              className="flex-shrink-0 font-mono-cosmic text-[0.5rem] tracking-[0.2em] font-bold px-5 py-2.5 rounded-sm bg-gradient-to-r from-[#FFB800] via-[#FFC300] to-[#FFD84D] text-[#050505]"
              style={{ boxShadow: "0 0 20px rgba(255,195,0,0.2)" }}
              whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.96 }}
            >
              {page === "main" ? "COMPRAR $27" : "COMPRAR $57"}
            </motion.a>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

/* ══════════════════════════════════════ */
/* WHATSAPP FLOATING BUTTON               */
/* ══════════════════════════════════════ */
function WhatsAppButton({ link }: { link: string }) {
  return (
    <motion.a
      href={link} target="_blank" rel="noopener noreferrer"
      className="fixed bottom-20 right-4 z-[56] w-14 h-14 rounded-full bg-[#25D366] flex items-center justify-center shadow-lg shadow-[#25D366]/30"
      whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.95 }}
      initial={{ scale: 0 }} animate={{ scale: 1 }}
      transition={{ delay: 3, type: "spring", stiffness: 200 }}
      aria-label="Contactar por WhatsApp"
    >
      <svg width="28" height="28" viewBox="0 0 24 24" fill="white">
        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
      </svg>
    </motion.a>
  );
}

/* ══════════════════════════════════════ */
/* SCROLL PROGRESS BAR                    */
/* ══════════════════════════════════════ */
function ScrollBar({ progress }: { progress: number }) {
  return (
    <div className="fixed top-[36px] left-0 right-0 z-50 h-[1px]">
      <div className="h-full" style={{
        width: `${progress * 100}%`,
        background: "linear-gradient(90deg, #FFB800, #FFC300, #FFD84D)",
        boxShadow: "0 0 6px rgba(255,195,0,0.25)",
        transition: "width 0.2s ease-out",
      }} />
    </div>
  );
}

/* ══════════════════════════════════════ */
/* PAGE 1: LANDING PRINCIPAL              */
/* ══════════════════════════════════════ */
function MainPage({ onGoToPack }: { onGoToPack: () => void }) {
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
      {/* LOADER */}
      <AnimatePresence>
        {loaded && (
          <motion.div className="fixed inset-0 z-[100] bg-[#050505] flex items-center justify-center" exit={{ opacity: 0 }} transition={{ duration: 3, ease: "easeInOut" }}>
            <motion.div initial={{ scale: 0, opacity: 0 }} animate={{ scale: [0, 1.3, 1], opacity: [0, 1, 1] }} exit={{ scale: 5, opacity: 0 }} transition={{ duration: 2 }}>
              <GoldenSingularity size={60} intensity={1.5} variant="loader" />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <CountdownTimer />
      <CosmicCanvas />
      <div className="fixed inset-0 z-[1] scanlines pointer-events-none" />
      <div className="grain-overlay" />
      <div className="scan-sweep" />
      <div className="fixed inset-0 z-[2] pointer-events-none" style={{ background: "radial-gradient(ellipse at center, transparent 40%, rgba(5,5,5,0.5) 80%, rgba(5,5,5,0.85) 100%)" }} />
      <ScrollBar progress={scrollProg} />

      {/* BREACH */}
      {breachPhase > 0 && (
        <motion.div className="fixed inset-0 z-[90] flex items-center justify-center" style={{ backgroundColor: "#050505" }} initial={{ opacity: 0 }} animate={{ opacity: breachPhase === 5 ? 0 : 1 }} transition={{ duration: breachPhase === 5 ? 1.8 : 0.6 }}>
          {breachPhase >= 2 && (
            <motion.div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full" style={{ backgroundColor: "#FFC300", boxShadow: breachPhase < 4 ? "0 0 15px rgba(255,195,0,0.5), 0 0 35px rgba(255,195,0,0.25)" : "0 0 200px rgba(255,195,0,0.8), 0 0 500px rgba(255,195,0,0.4)" }} initial={{ width: 0, height: 0, opacity: 0 }} animate={{ width: breachPhase >= 4 ? 4000 : 5, height: breachPhase >= 4 ? 4000 : 5, opacity: breachPhase >= 4 ? 0 : 1 }} transition={{ duration: breachPhase >= 4 ? 1 : 1.5, ease: breachPhase >= 4 ? [0.16, 1, 0.3, 1] : "easeInOut" }} />
          )}
          {breachPhase >= 4 && (
            <motion.div className="fixed inset-0" style={{ backgroundColor: "#FFD84D" }} initial={{ opacity: 0 }} animate={{ opacity: [0, 0.5, 0] }} transition={{ duration: 0.7 }} />
          )}
          {breachPhase >= 3 && (
            <div className="relative z-10 text-center px-8">
              <motion.h1 initial={{ opacity: 0, y: 25, filter: "blur(12px)" }} animate={{ opacity: breachPhase >= 4 ? 0 : 1, y: 0, filter: "blur(0px)" }} transition={{ duration: 1.5, ease: "easeOut" }} className="font-display text-4xl sm:text-6xl font-black text-white/90">OBSERVAR</motion.h1>
              <motion.h1 initial={{ opacity: 0, y: 25, filter: "blur(12px)" }} animate={{ opacity: breachPhase >= 4 ? 0 : 1, y: 0, filter: "blur(0px)" }} transition={{ duration: 1.5, delay: 0.7, ease: "easeOut" }} className="font-display text-4xl sm:text-6xl font-black text-[#FFC300] golden-glow-strong mt-2">NO ES LO MISMO</motion.h1>
              <motion.h1 initial={{ opacity: 0, y: 25, filter: "blur(12px)" }} animate={{ opacity: breachPhase >= 4 ? 0 : 1, y: 0, filter: "blur(0px)" }} transition={{ duration: 1.5, delay: 1.4, ease: "easeOut" }} className="font-display text-4xl sm:text-6xl font-black text-white/40 mt-2">QUE VER</motion.h1>
            </div>
          )}
        </motion.div>
      )}

      {/* SCROLL JOURNEY */}
      <main ref={containerRef} className="relative" style={{ paddingTop: "36px" }}>

        {/* 1. HERO */}
        <section className="relative min-h-screen flex flex-col items-center justify-center px-6">
          <motion.div initial={{ opacity: 0, scale: 0.2 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 5, delay: 2.5 }} className="mb-12">
            <GoldenSingularity size={45} intensity={0.5} variant="icon" />
          </motion.div>
          <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 3 }} className="font-mono-cosmic text-[0.3rem] tracking-[0.3em] text-[#FFC300]/15 mb-4">
            {"// ARCHIVO RESTRINGIDO — NIVEL DE ACCESO: ABSOLUTO"}
          </motion.p>
          <motion.div initial={{ opacity: 0, y: 25, filter: "blur(10px)" }} animate={{ opacity: 1, y: 0, filter: "blur(0px)" }} transition={{ duration: 4, delay: 3.5 }} className="text-center">
            <h1 className="font-display text-[2.8rem] sm:text-6xl font-black leading-[0.95] text-white/85">El 97% de las personas son</h1>
            <h1 className="font-display text-[2.8rem] sm:text-6xl font-black leading-[0.95] mt-1"><span className="text-[#FFC300] golden-glow-strong">manipuladas a diario</span></h1>
            <h1 className="font-display text-[2.8rem] sm:text-6xl font-black leading-[0.95] mt-1 text-white/85">sin saberlo.</h1>
          </motion.div>
          <motion.p initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 2, delay: 4.5 }} className="font-body text-sm text-white/30 text-center mt-5 max-w-[320px]">Este libro te pone del otro lado.</motion.p>
          <motion.p initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 2, delay: 5 }} className="font-body text-xs text-white/20 text-center mt-3 max-w-[340px]">
            Descubre los principios de la psicología oscura que usan líderes, negociadores y estrategas para controlar cualquier situación — y aprende a detectar cuando alguien los usa contra ti.
          </motion.p>
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1.5, delay: 5.8 }} className="mt-8">
            <CtaButton text="🔓 DESBLOQUEAR ACCESO AHORA" href={CTA_BASIC} size="lg" sameWindow />
          </motion.div>
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 6.5 }} className="flex items-center gap-4 mt-5">
            <span className="font-mono-cosmic text-[0.3rem] text-[#FFC300]/25 tracking-[0.12em]">📥 +2,400 copias</span>
            <span className="font-mono-cosmic text-[0.3rem] text-[#FFC300]/25 tracking-[0.12em]">⭐ 4.8/5 valoración</span>
            <span className="font-mono-cosmic text-[0.3rem] text-[#FFC300]/25 tracking-[0.12em]">🔒 Garantía 7 días</span>
          </motion.div>
        </section>

        {/* 2. GUARDIAN */}
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

        <section className="relative h-[16vh]" />

        {/* 3. EXTRACTOS */}
        <section className="relative min-h-screen flex flex-col items-center justify-center px-6 py-20">
          <motion.div initial={{ opacity: 0, filter: "blur(6px)" }} whileInView={{ opacity: 1, filter: "blur(0px)" }} viewport={{ once: true }} transition={{ duration: 2 }} className="text-center mb-10 max-w-[340px]">
            <SectionTag text="CONTENIDO CLASIFICADO" />
            <h2 className="font-display text-2xl sm:text-3xl font-black text-white/80">Lo que vas a descubrir no se enseña <span className="text-[#FFC300] golden-glow-strong">en ninguna universidad</span></h2>
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

        {/* 4. ARSENAL PSICOLÓGICO */}
        <section className="relative min-h-screen flex flex-col items-center justify-center px-6 py-20">
          <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ duration: 1.5 }} className="text-center mb-8 max-w-[340px]">
            <SectionTag text="ARSENAL PSICOLÓGICO" />
            <h2 className="font-display text-2xl sm:text-3xl font-black text-white/80">10 capítulos. 8 leyes.</h2>
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
        </section>

        {/* 5. BONOS */}
        <section className="relative min-h-screen flex flex-col items-center justify-center px-6 py-20">
          <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ duration: 1.5 }} className="text-center mb-6 max-w-[340px]">
            <SectionTag text="🎁 BONOS EXCLUSIVOS" />
            <h2 className="font-display text-xl sm:text-2xl font-black text-white/70">Además del libro, recibes estos <span className="text-[#FFC300] golden-glow-strong">4 manuales de poder</span></h2>
          </motion.div>
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
            <p className="font-mono-cosmic text-[0.4rem] tracking-[0.2em] text-white/15">Total en bonos: ~$91 → Incluidos <span className="text-[#FFC300]/50 font-bold">GRATIS</span></p>
          </motion.div>
        </section>

        {/* 6. EVIDENCIA */}
        <section className="relative min-h-screen flex flex-col items-center justify-center px-6 py-20">
          <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ duration: 1.5 }} className="mb-8 text-center">
            <SectionTag text="EVIDENCIA" />
            <h2 className="font-display text-2xl sm:text-3xl font-black text-white/70">No es promesa.<br /><span className="text-[#FFC300] golden-glow-strong">Es evidencia.</span></h2>
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
        </section>

        {/* ═══════════════════════════════════════ */}
        {/* 7. TWO OFFERS — SIDE BY SIDE           */}
        {/* ═══════════════════════════════════════ */}
        <section className="relative px-4 sm:px-6 py-20">
          <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ duration: 1.5 }} className="text-center mb-8 max-w-[500px] mx-auto">
            <SectionTag text="ELIGE TU ACCESO" />
            <h2 className="font-display text-2xl sm:text-3xl font-black text-white/80">Dos formas de <span className="text-[#FFC300] golden-glow-strong">cruzar el umbral</span></h2>
          </motion.div>

          {/* Side by side grid */}
          <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-5 items-start">

            {/* ─── OFFER 1: Basic $27 ─── */}
            <MagicSparkles>
              <motion.div
                initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
                transition={{ duration: 0.8 }}
                className="w-full border border-[#FFC300]/[0.1] rounded-lg overflow-hidden"
                style={{ background: "linear-gradient(180deg, rgba(255,195,0,0.03) 0%, rgba(5,5,5,0.95) 100%)" }}
              >
                {/* Header */}
                <div className="py-4 px-5 text-center border-b border-[#FFC300]/[0.06]">
                  <div className="flex items-center justify-center gap-2 mb-1">
                    <span className="w-2 h-2 rounded-full bg-[#FFC300]/50 animate-pulse" />
                    <span className="font-mono-cosmic text-[0.45rem] tracking-[0.2em] text-[#FFC300]/40 uppercase">LOTE 1 — Acceso Básico</span>
                  </div>
                  <h3 className="font-display text-xl font-black text-white/80">EL LIBRO + BONOS</h3>
                  <p className="font-body text-xs text-white/30 mt-1">1 LIBRO · 4 BONOS</p>
                </div>
                {/* Cover image */}
                <div className="px-5 pt-4">
                  <img src="/cosmic/pack-sabio.png" alt="El Sabio Oscuro — Libro + 4 Bonos" className="w-full rounded" style={{ filter: "drop-shadow(0 0 20px rgba(255,195,0,0.1))" }} />
                </div>
                {/* Features */}
                <div className="py-4 px-5 space-y-2">
                  {[
                    "El Sabio Oscuro de la Psicología — El libro",
                    "BONO 01 · Detectar Mentiras (~$29)",
                    "BONO 02 · Gestos Corporales (~$19)",
                    "BONO 03 · Gestos en Seducción (~$24)",
                    "BONO 04 · Poder de Tu Mente (~$19)",
                  ].map((t, i) => (
                    <div key={i} className="flex items-start gap-2">
                      <span className="text-[#FFC300] text-xs mt-0.5 flex-shrink-0">✓</span>
                      <p className="font-body text-[0.7rem] text-white/50">{t}</p>
                    </div>
                  ))}
                </div>
                {/* Price */}
                <div className="py-5 px-5 text-center border-t border-[#FFC300]/[0.06]">
                  <p className="font-body text-sm text-white/20 line-through">DE US$ 201</p>
                  <div className="flex items-baseline justify-center gap-1 mt-1">
                    <span className="font-body text-sm text-white/30">US$</span>
                    <span className="font-display text-5xl font-black text-[#FFC300] golden-glow-strong">27</span>
                  </div>
                  <p className="font-mono-cosmic text-[0.35rem] tracking-[0.25em] text-white/15 mt-2">PAGO ÚNICO · ACCESO INMEDIATO</p>
                  <div className="mt-4">
                    <CtaButton text="QUIERO ESTE →" href={CTA_BASIC} size="lg" sameWindow />
                  </div>
                </div>
              </motion.div>
            </MagicSparkles>

            {/* ─── OFFER 2: MEGAPACK $57 ─── */}
            <MagicSparkles>
              <motion.div
                initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 0.15 }}
                className="w-full border-2 border-[#FFC300]/[0.3] rounded-lg overflow-hidden relative"
                style={{ background: "linear-gradient(180deg, rgba(255,195,0,0.06) 0%, rgba(5,5,5,0.98) 100%)" }}
              >
                {/* MÁS POPULAR Badge */}
                <div className="absolute top-0 right-0 z-30">
                  <div className="bg-gradient-to-r from-[#FFB800] to-[#FFD84D] px-4 py-1.5 rounded-bl-lg">
                    <span className="font-mono-cosmic text-[0.45rem] tracking-[0.15em] font-bold text-[#050505]">⭐ MÁS POPULAR</span>
                  </div>
                </div>
                {/* Header */}
                <div className="py-4 px-5 text-center border-b border-[#FFC300]/[0.08]">
                  <div className="flex items-center justify-center gap-2 mb-1">
                    <span className="w-2 h-2 rounded-full bg-[#FFC300] animate-pulse" />
                    <span className="font-mono-cosmic text-[0.45rem] tracking-[0.2em] text-[#FFC300]/60 uppercase">LOTE 2 — Acceso Total</span>
                  </div>
                  <h3 className="font-display text-xl font-black text-[#FFC300] golden-glow-strong">MEGAPACK COMPLETO</h3>
                  <p className="font-body text-xs text-white/30 mt-1">3 PACKS · 15 LIBROS · TODO INCLUIDO</p>
                </div>
                {/* 3 Pack Covers */}
                <div className="px-4 pt-4 space-y-3">
                  <div>
                    <p className="font-mono-cosmic text-[0.35rem] tracking-[0.2em] text-[#FFC300]/30 text-center mb-1.5">PACK 1 · EL SABIO OSCURO</p>
                    <img src="/cosmic/pack-sabio.png" alt="Pack 1 — El Sabio Oscuro" className="w-full rounded" style={{ filter: "drop-shadow(0 0 15px rgba(255,195,0,0.08))" }} />
                  </div>
                  <div>
                    <p className="font-mono-cosmic text-[0.35rem] tracking-[0.2em] text-[#FFC300]/30 text-center mb-1.5">PACK 2 · EL DOMADOR ENCANTADOR</p>
                    <img src="/cosmic/pack-domador.png" alt="Pack 2 — El Domador Encantador" className="w-full rounded" style={{ filter: "drop-shadow(0 0 15px rgba(255,195,0,0.08))" }} />
                  </div>
                  <div>
                    <p className="font-mono-cosmic text-[0.35rem] tracking-[0.2em] text-[#FFC300]/30 text-center mb-1.5">PACK 3 · JAQUE MATE OSCURO</p>
                    <img src="/cosmic/pack-jaque-mate.png" alt="Pack 3 — Jaque Mate Oscuro" className="w-full rounded" style={{ filter: "drop-shadow(0 0 15px rgba(255,195,0,0.08))" }} />
                  </div>
                </div>
                {/* Features */}
                <div className="py-4 px-5 space-y-2">
                  {[
                    "📖 El Sabio Oscuro — Manipulación & Poder (5 libros)",
                    "🔥 El Domador Encantador — Seducción & Dominio (5 libros)",
                    "♟️ Jaque Mate Oscuro — Negocios & Ventas (5 libros)",
                    "🎁 15 LIBROS digitales · Acceso inmediato · PDF",
                    "🔒 Garantía 7 días · Soporte · Actualizaciones",
                  ].map((t, i) => (
                    <div key={i} className="flex items-start gap-2">
                      <span className="text-[#FFC300] text-xs mt-0.5 flex-shrink-0">✓</span>
                      <p className="font-body text-[0.7rem] text-white/50">{t}</p>
                    </div>
                  ))}
                </div>
                {/* Price */}
                <div className="py-5 px-5 text-center border-t border-[#FFC300]/[0.08]">
                  <p className="font-body text-sm text-white/20 line-through">DE US$ 684</p>
                  <div className="flex items-baseline justify-center gap-1 mt-1">
                    <span className="font-body text-sm text-white/30">US$</span>
                    <span className="font-display text-5xl font-black text-[#FFC300] golden-glow-strong">57</span>
                  </div>
                  <p className="font-mono-cosmic text-[0.35rem] tracking-[0.25em] text-[#FFC300]/40 mt-2 font-bold">AHORRAS $627 · 92% DESCUENTO</p>
                  <div className="mt-4">
                    <CtaButton text="🔥 VER PACK COMPLETO →" onClick={onGoToPack} size="lg" />
                  </div>
                </div>
              </motion.div>
            </MagicSparkles>
          </div>

          {/* Launch pricing notice */}
          <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ duration: 1, delay: 0.5 }}
            className="max-w-2xl mx-auto mt-6 border border-[#FFC300]/[0.08] rounded-sm p-4 text-center"
            style={{ background: "linear-gradient(135deg, rgba(255,195,0,0.02), rgba(5,5,5,0.9))" }}
          >
            <p className="font-mono-cosmic text-[0.4rem] tracking-[0.2em] text-[#FFC300]/40">⚠ ATENCIÓN</p>
            <p className="font-body text-xs text-white/35 mt-1.5">Este precio es de <span className="text-[#FFC300]/60 font-bold">lanzamiento</span> y puede subir en cualquier momento sin previo aviso.</p>
          </motion.div>
        </section>

        {/* 8. GUARANTÍAS */}
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

        {/* 9. FAQ */}
        <section className="relative min-h-screen flex flex-col items-center justify-center px-6 py-20">
          <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ duration: 1.5 }} className="text-center mb-8 max-w-[340px]">
            <SectionTag text="DUDAS" />
            <h2 className="font-display text-2xl sm:text-3xl font-black text-white/60">Tienes preguntas<br /><span className="text-[#FFC300] golden-glow-strong">tenemos respuestas.</span></h2>
          </motion.div>
          <div className="w-full max-w-[350px] mx-auto">
            <FaqItem q="¿Para quién es este libro?" a="Para cualquier persona que quiera entender cómo funciona la mente humana: vendedores, emprendedores, personas que quieren mejorar sus relaciones, o simplemente quienes sienten que siempre los manipulan y quieren cambiar eso." />
            <FaqItem q="¿En qué formato recibo el libro?" a="En formato digital (PDF/ePub). Acceso inmediato después del pago, desde cualquier dispositivo: celular, tablet o computadora." />
            <FaqItem q="¿Es legal aprender esto?" a="Sí. El conocimiento es neutral — lo que importa es cómo lo uses. Estas técnicas se enseñan en universidades de psicología, negocios y comunicación en todo el mundo." />
            <FaqItem q="¿Tiene garantía?" a="Sí. 7 días de garantía total. Si no te convence por cualquier motivo, te devolvemos el dinero sin preguntas." />
            <FaqItem q="¿Cuánto tiempo tarda en llegar?" a="Instantáneo. Después del pago recibes el acceso por correo en menos de 5 minutos." />
            <FaqItem q="¿Puedo pagar con tarjeta de crédito o débito?" a="Sí. Aceptamos todas las tarjetas, PayPal y otros métodos según tu país. El pago es procesado por Hotmart, plataforma segura con más de 20 millones de usuarios." />
            <FaqItem q="¿Qué incluye el pack completo de $57?" a="Incluye 3 packs completos con 15 libros digitales: El Sabio Oscuro de la Psicología (5 libros), El Domador Encantador (5 libros) y Jaque Mate Oscuro (5 libros). Todo por un solo pago de $57." />
          </div>
        </section>

        {/* 10. FINAL CTA */}
        <section className="relative min-h-[80vh] flex flex-col items-center justify-center px-6 bg-gradient-to-b from-transparent via-[#050505]/60 to-[#050505] pb-24">
          <motion.div initial={{ scale: 0, opacity: 0 }} whileInView={{ scale: 1, opacity: 1 }} viewport={{ once: true }} transition={{ duration: 2 }}>
            <GoldenSingularity size={30} intensity={0.3} variant="icon" />
          </motion.div>
          <motion.h2 initial={{ opacity: 0, y: 20, filter: "blur(8px)" }} whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }} viewport={{ once: true }} transition={{ duration: 2 }} className="font-display text-2xl sm:text-4xl font-black text-center mt-6 text-white/80">
            Tu vida cambia cuando <span className="text-[#FFC300] golden-glow-strong">decides ver</span>
          </motion.h2>
          <motion.p initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ duration: 1.5, delay: 0.5 }} className="font-body text-xs text-white/25 text-center mt-3 max-w-[300px]">
            No dejes que otro día pase sin entender lo que realmente ocurre en cada conversación, decisión y relación de tu vida.
          </motion.p>
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 1, delay: 1 }} className="mt-8 space-y-3 flex flex-col items-center">
            <CtaButton text="🔓 DESBLOQUEAR ACCESO — $27" href={CTA_BASIC} size="lg" sameWindow />
            <CtaButton text="🔥 MEGAPACK COMPLETO — $57" onClick={onGoToPack} size="lg" />
          </motion.div>
        </section>

        {/* FOOTER */}
        <footer className="relative py-8 text-center border-t border-white/[0.03]">
          <p className="font-mono-cosmic text-[0.3rem] tracking-[0.2em] text-white/10">EL SABIO MANIPULADOR © {new Date().getFullYear()} — Todos los derechos reservados</p>
          <p className="font-mono-cosmic text-[0.25rem] tracking-[0.15em] text-white/[0.06] mt-1">Este producto se vende a través de Hotmart. La plataforma no hace control editorial previo de los productos comercializados, ni evalúa la tecnicidad y experiencia de quienes los producen.</p>
        </footer>
      </main>
    </>
  );
}

/* ══════════════════════════════════════ */
/* PAGE 2: COMBO PACK LANDING             */
/* ══════════════════════════════════════ */
function PackPage({ onBack }: { onBack: () => void }) {
  return (
    <>
      <CountdownTimer />
      <CosmicCanvas />
      <div className="fixed inset-0 z-[1] scanlines pointer-events-none" />
      <div className="grain-overlay" />
      <div className="scan-sweep" />
      <div className="fixed inset-0 z-[2] pointer-events-none" style={{ background: "radial-gradient(ellipse at center, transparent 40%, rgba(5,5,5,0.5) 80%, rgba(5,5,5,0.85) 100%)" }} />

      <main className="relative" style={{ paddingTop: "36px" }}>

        {/* BACK BUTTON */}
        <div className="sticky top-10 z-20 px-4 py-3">
          <motion.button
            onClick={onBack}
            initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.5 }}
            className="flex items-center gap-2 font-mono-cosmic text-[0.4rem] tracking-[0.2em] text-[#FFC300]/50 hover:text-[#FFC300] transition-colors"
          >
            <span>←</span> VOLVER A OFERTAS
          </motion.button>
        </div>

        {/* HERO COMBO */}
        <section className="relative min-h-[80vh] flex flex-col items-center justify-center px-6 py-20">
          <motion.div initial={{ scale: 0, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} transition={{ duration: 2 }}>
            <GoldenSingularity size={35} intensity={0.4} variant="icon" />
          </motion.div>
          <motion.div initial={{ opacity: 0, y: 25, filter: "blur(10px)" }} animate={{ opacity: 1, y: 0, filter: "blur(0px)" }} transition={{ duration: 3, delay: 0.5 }} className="text-center mt-8">
            <div className="inline-block px-3 py-1 rounded-sm border border-[#FFC300]/[0.15] mb-4">
              <span className="font-mono-cosmic text-[0.35rem] tracking-[0.2em] text-[#FFC300]/60">⭐ MÁS POPULAR · 3 PACKS EN 1</span>
            </div>
            <h1 className="font-display text-3xl sm:text-5xl font-black text-white/90">MEGAPACK</h1>
            <h1 className="font-display text-3xl sm:text-5xl font-black text-[#FFC300] golden-glow-strong mt-1">COMPLETO</h1>
            <p className="font-body text-sm text-white/30 mt-4 max-w-[350px] mx-auto">3 packs. 15 libros. Todo el conocimiento oscura que necesitas para dominar cualquier situación.</p>
          </motion.div>
        </section>

        {/* 3 PACKS WITH COVERS */}
        <section className="px-4 sm:px-6 py-10">
          {/* PACK 1 */}
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.8 }}
            className="max-w-lg mx-auto mb-12 border border-[#FFC300]/[0.06] rounded-lg overflow-hidden"
            style={{ background: "linear-gradient(180deg, rgba(255,195,0,0.02) 0%, rgba(5,5,5,0.95) 100%)" }}
          >
            <div className="py-3 px-5 border-b border-[#FFC300]/[0.06] flex items-center justify-between">
              <div>
                <p className="font-mono-cosmic text-[0.35rem] tracking-[0.2em] text-[#FFC300]/30">PACK 1</p>
                <h3 className="font-display text-lg font-black text-white/80">El Sabio Oscuro de la Psicología</h3>
                <p className="font-body text-[0.6rem] text-white/25">Manipulación & Poder</p>
              </div>
              <span className="font-mono-cosmic text-xs text-white/15 line-through">$128</span>
            </div>
            <div className="p-4">
              <img src="/cosmic/pack-sabio.png" alt="Pack 1 — El Sabio Oscuro" className="w-full rounded" style={{ filter: "drop-shadow(0 0 20px rgba(255,195,0,0.08))" }} />
            </div>
            <div className="px-5 pb-4 space-y-1.5">
              {PACK1_BOOKS.map((b, i) => (
                <div key={i} className="flex items-start justify-between gap-2">
                  <div className="flex items-start gap-1.5">
                    <span className="text-[#FFC300] text-[0.6rem] mt-0.5">✓</span>
                    <div>
                      <p className="font-body text-[0.65rem] text-white/50">{b.title}</p>
                      <p className="font-body text-[0.5rem] text-white/20">{b.sub}</p>
                    </div>
                  </div>
                  <span className="font-mono-cosmic text-[0.35rem] text-white/15 line-through flex-shrink-0">{b.price}</span>
                </div>
              ))}
            </div>
          </motion.div>

          {/* PACK 2 */}
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.8 }}
            className="max-w-lg mx-auto mb-12 border border-[#FFC300]/[0.06] rounded-lg overflow-hidden"
            style={{ background: "linear-gradient(180deg, rgba(255,195,0,0.02) 0%, rgba(5,5,5,0.95) 100%)" }}
          >
            <div className="py-3 px-5 border-b border-[#FFC300]/[0.06] flex items-center justify-between">
              <div>
                <p className="font-mono-cosmic text-[0.35rem] tracking-[0.2em] text-[#FFC300]/30">PACK 2</p>
                <h3 className="font-display text-lg font-black text-white/80">El Domador Encantador</h3>
                <p className="font-body text-[0.6rem] text-white/25">Seducción & Dominio Emocional</p>
              </div>
              <span className="font-mono-cosmic text-xs text-white/15 line-through">$133</span>
            </div>
            <div className="p-4">
              <img src="/cosmic/pack-domador.png" alt="Pack 2 — El Domador Encantador" className="w-full rounded" style={{ filter: "drop-shadow(0 0 20px rgba(255,195,0,0.08))" }} />
            </div>
            <div className="px-5 pb-4 space-y-1.5">
              {PACK2_BOOKS.map((b, i) => (
                <div key={i} className="flex items-start justify-between gap-2">
                  <div className="flex items-start gap-1.5">
                    <span className="text-[#FFC300] text-[0.6rem] mt-0.5">✓</span>
                    <div>
                      <p className="font-body text-[0.65rem] text-white/50">{b.title}</p>
                      <p className="font-body text-[0.5rem] text-white/20">{b.sub}</p>
                    </div>
                  </div>
                  <span className="font-mono-cosmic text-[0.35rem] text-white/15 line-through flex-shrink-0">{b.price}</span>
                </div>
              ))}
            </div>
          </motion.div>

          {/* PACK 3 */}
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.8 }}
            className="max-w-lg mx-auto mb-12 border border-[#FFC300]/[0.06] rounded-lg overflow-hidden"
            style={{ background: "linear-gradient(180deg, rgba(255,195,0,0.02) 0%, rgba(5,5,5,0.95) 100%)" }}
          >
            <div className="py-3 px-5 border-b border-[#FFC300]/[0.06] flex items-center justify-between">
              <div>
                <p className="font-mono-cosmic text-[0.35rem] tracking-[0.2em] text-[#FFC300]/30">PACK 3</p>
                <h3 className="font-display text-lg font-black text-white/80">Jaque Mate Oscuro</h3>
                <p className="font-body text-[0.6rem] text-white/25">Psicología en Negocios & Ventas</p>
              </div>
              <span className="font-mono-cosmic text-xs text-white/15 line-through">$133</span>
            </div>
            <div className="p-4">
              <img src="/cosmic/pack-jaque-mate.png" alt="Pack 3 — Jaque Mate Oscuro" className="w-full rounded" style={{ filter: "drop-shadow(0 0 20px rgba(255,195,0,0.08))" }} />
            </div>
            <div className="px-5 pb-4 space-y-1.5">
              {PACK3_BOOKS.map((b, i) => (
                <div key={i} className="flex items-start justify-between gap-2">
                  <div className="flex items-start gap-1.5">
                    <span className="text-[#FFC300] text-[0.6rem] mt-0.5">✓</span>
                    <div>
                      <p className="font-body text-[0.65rem] text-white/50">{b.title}</p>
                      <p className="font-body text-[0.5rem] text-white/20">{b.sub}</p>
                    </div>
                  </div>
                  <span className="font-mono-cosmic text-[0.35rem] text-white/15 line-through flex-shrink-0">{b.price}</span>
                </div>
              ))}
            </div>
          </motion.div>
        </section>

        {/* PRICE SUMMARY */}
        <section className="px-4 sm:px-6 py-10">
          <div className="max-w-lg mx-auto border-2 border-[#FFC300]/[0.25] rounded-lg overflow-hidden"
            style={{ background: "linear-gradient(180deg, rgba(255,195,0,0.06) 0%, rgba(5,5,5,0.98) 100%)" }}
          >
            <div className="py-5 px-6 text-center border-b border-[#FFC300]/[0.08]">
              <p className="font-mono-cosmic text-[0.4rem] tracking-[0.25em] text-[#FFC300]/40">RESUMEN DE PRECIOS</p>
            </div>
            <div className="py-4 px-6 space-y-2">
              <div className="flex justify-between">
                <span className="font-body text-xs text-white/40">Pack 1 · El Sabio Oscuro (5 libros)</span>
                <span className="font-mono-cosmic text-xs text-white/20 line-through">$128</span>
              </div>
              <div className="flex justify-between">
                <span className="font-body text-xs text-white/40">Pack 2 · El Domador Encantador (5 libros)</span>
                <span className="font-mono-cosmic text-xs text-white/20 line-through">$133</span>
              </div>
              <div className="flex justify-between">
                <span className="font-body text-xs text-white/40">Pack 3 · Jaque Mate Oscuro (5 libros)</span>
                <span className="font-mono-cosmic text-xs text-white/20 line-through">$133</span>
              </div>
              <div className="border-t border-[#FFC300]/[0.06] pt-2 mt-2 flex justify-between">
                <span className="font-body text-xs text-white/30">Valor total real</span>
                <span className="font-mono-cosmic text-xs text-white/20 line-through">$394</span>
              </div>
              <div className="flex justify-between">
                <span className="font-body text-xs text-white/30">Precio de lanzamiento</span>
                <span className="font-mono-cosmic text-xs text-white/20 line-through">$684</span>
              </div>
            </div>
            <div className="py-6 px-6 text-center border-t border-[#FFC300]/[0.08]" style={{ background: "linear-gradient(180deg, rgba(255,195,0,0.04) 0%, rgba(5,5,5,0.95) 100%)" }}>
              <p className="font-body text-sm text-white/20 line-through">DE US$ 684</p>
              <div className="flex items-baseline justify-center gap-1 mt-1">
                <span className="font-body text-sm text-white/30">US$</span>
                <span className="font-display text-6xl font-black text-[#FFC300] golden-glow-strong">57</span>
              </div>
              <p className="font-mono-cosmic text-[0.4rem] tracking-[0.25em] text-[#FFC300]/50 mt-2 font-bold">15 LIBROS · 92% DESCUENTO · PAGO ÚNICO</p>
              <div className="mt-5">
                <CtaButton text="🔥 ACTIVAR ACCESO TOTAL →" href={CTA_PACK} size="lg" sameWindow />
              </div>
              <p className="font-mono-cosmic text-[0.3rem] tracking-[0.2em] text-white/10 mt-3">ACCESO INMEDIATO · GARANTÍA 7 DÍAS · PDF</p>
            </div>
          </div>
        </section>

        {/* GUARANTEES */}
        <section className="px-4 sm:px-6 py-10">
          <div className="max-w-lg mx-auto space-y-6">
            {[
              { icon: "🛡️", title: "Garantía Incondicional de 7 días", desc: "Si dentro de 7 días sientes que el material no es para ti, devolvemos el 100% de tu inversión. Sin preguntas." },
              { icon: "⚡", title: "Acceso Inmediato", desc: "Después del pago recibes acceso instantáneo a los 15 libros desde cualquier dispositivo." },
              { icon: "💬", title: "Soporte Online", desc: "Resuelve tus dudas directamente con nuestro equipo en cualquier momento." },
            ].map((item, i) => (
              <motion.div key={i} initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.8, delay: i * 0.15 }}
                className="flex items-start gap-4 p-4 border border-[#FFC300]/[0.04] rounded-sm"
              >
                <span className="text-2xl flex-shrink-0">{item.icon}</span>
                <div>
                  <p className="font-display text-sm font-bold text-white/60">{item.title}</p>
                  <p className="font-body text-xs text-white/30 leading-relaxed mt-1">{item.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </section>

        {/* FINAL CTA PACK */}
        <section className="min-h-[60vh] flex flex-col items-center justify-center px-6 bg-gradient-to-b from-transparent via-[#050505]/60 to-[#050505] pb-24">
          <motion.div initial={{ scale: 0, opacity: 0 }} whileInView={{ scale: 1, opacity: 1 }} viewport={{ once: true }} transition={{ duration: 2 }}>
            <GoldenSingularity size={25} intensity={0.3} variant="icon" />
          </motion.div>
          <motion.h2 initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 2 }}
            className="font-display text-2xl sm:text-4xl font-black text-center mt-6 text-white/80"
          >
            15 libros. <span className="text-[#FFC300] golden-glow-strong">Un precio.</span>
          </motion.h2>
          <motion.p initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ duration: 1.5, delay: 0.5 }}
            className="font-body text-xs text-white/25 text-center mt-3 max-w-[300px]"
          >
            No dejes pasar esta oportunidad. El precio de lanzamiento puede subir en cualquier momento.
          </motion.p>
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 1, delay: 1 }} className="mt-8">
            <CtaButton text="🔥 COMPRAR MEGAPACK — $57 USD" href={CTA_PACK} size="lg" sameWindow />
          </motion.div>
        </section>

        {/* FOOTER */}
        <footer className="relative py-8 text-center border-t border-white/[0.03]">
          <p className="font-mono-cosmic text-[0.3rem] tracking-[0.2em] text-white/10">EL SABIO MANIPULADOR © {new Date().getFullYear()} — Todos los derechos reservados</p>
          <p className="font-mono-cosmic text-[0.25rem] tracking-[0.15em] text-white/[0.06] mt-1">Este producto se vende a través de Hotmart. La plataforma no hace control editorial previo de los productos comercializados, ni evalúa la tecnicidad y experiencia de quienes los producen.</p>
        </footer>
      </main>
    </>
  );
}

/* ══════════════════════════════════════ */
/* ROOT COMPONENT                         */
/* ══════════════════════════════════════ */
export default function ElUmbral() {
  const [page, setPage] = useState<"main" | "pack">("main");

  const handleGoToPack = useCallback(() => {
    setPage("pack");
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  const handleBack = useCallback(() => {
    setPage("main");
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  return (
    <div className="min-h-screen bg-[#050505]">
      <AnimatePresence mode="wait">
        {page === "main" ? (
          <motion.div key="main" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.5 }}>
            <MainPage onGoToPack={handleGoToPack} />
            <StickyBar page="main" />
            <WhatsAppButton link={WA_MAIN} />
          </motion.div>
        ) : (
          <motion.div key="pack" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.5 }}>
            <PackPage onBack={handleBack} />
            <StickyBar page="pack" />
            <WhatsAppButton link={WA_PACK} />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
