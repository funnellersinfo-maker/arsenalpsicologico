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
/* COUNTDOWN TIMER                        */
/* ══════════════════════════════════════ */
function CountdownTimer({ compact = false }: { compact?: boolean }) {
  const [time, setTime] = useState({ m: 14, s: 59 });
  useEffect(() => {
    const iv = setInterval(() => {
      setTime((p) => {
        if (p.s > 0) return { ...p, s: p.s - 1 };
        if (p.m > 0) return { m: p.m - 1, s: 59 };
        return { m: 14, s: 59 };
      });
    }, 1000);
    return () => clearInterval(iv);
  }, []);
  if (compact) {
    return (
      <span className="font-mono-cosmic text-sm font-bold text-[#FFC300] golden-glow-strong">
        {String(time.m).padStart(2, "0")}:{String(time.s).padStart(2, "0")}
      </span>
    );
  }
  return (
    <div className="fixed top-0 left-0 right-0 z-[60] bg-[#0A0A0A]/95 backdrop-blur-sm border-b border-[#FFC300]/[0.06] py-2 px-4">
      <div className="max-w-lg mx-auto flex items-center justify-center gap-2">
        <span className="text-[0.4rem] sm:text-[0.5rem] font-mono-cosmic tracking-[0.2em] text-[#FFC300]/50 uppercase">
          Oferta limitada — Este precio desaparece en
        </span>
        <span className="font-mono-cosmic text-sm sm:text-base font-bold text-[#FFC300] golden-glow-strong">
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
          animate={{
            y: [0, -30, -60],
            opacity: [0, 1, 0],
            scale: [0, 1.2, 0],
          }}
          transition={{
            duration: s.duration,
            delay: s.delay,
            repeat: Infinity,
            ease: "easeOut",
          }}
        />
      ))}
    </div>
  );
}

/* ══════════════════════════════════════ */
/* CTA BUTTON                             */
/* ══════════════════════════════════════ */
function CtaButton({
  text,
  href,
  size = "lg",
  sameWindow = false,
  onClick,
}: {
  text: string;
  href?: string;
  size?: "lg" | "md" | "sm";
  sameWindow?: boolean;
  onClick?: () => void;
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
      <motion.button
        onClick={onClick}
        className={shared}
        style={style}
        whileHover={{ scale: 1.04, boxShadow: "0 0 55px rgba(255,195,0,0.3)" }}
        whileTap={{ scale: 0.97 }}
      >
        <span className="relative z-10">{text}</span>
        <div className="absolute inset-0 holo-shimmer" />
      </motion.button>
    );
  }
  return (
    <motion.a
      href={href}
      target={sameWindow ? "_self" : "_blank"}
      rel="noopener noreferrer"
      className={shared}
      style={style}
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
/* STICKY BOTTOM BAR                      */
/* ══════════════════════════════════════ */
function StickyBar({ page, onCta }: { page: "main" | "pack"; onCta: () => void }) {
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const handleScroll = () => {
      setVisible(window.scrollY > window.innerHeight * 0.8);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const ctaHref = page === "main" ? CTA_BASIC : CTA_PACK;
  const offerText = page === "main"
    ? "Acceso Básico $27 USD"
    : "3 PACKS EN 1 — Solo $57 USD";

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 100, opacity: 0 }}
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
              href={page === "main" ? ctaHref : undefined}
              onClick={page === "pack" ? onCta : undefined}
              target={page === "main" ? "_blank" : undefined}
              rel={page === "main" ? "noopener noreferrer" : undefined}
              className="flex-shrink-0 font-mono-cosmic text-[0.5rem] tracking-[0.2em] font-bold px-5 py-2.5 rounded-sm bg-gradient-to-r from-[#FFB800] via-[#FFC300] to-[#FFD84D] text-[#050505]"
              style={{ boxShadow: "0 0 20px rgba(255,195,0,0.2)" }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.96 }}
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
      href={link}
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-20 right-4 z-[56] w-14 h-14 rounded-full bg-[#25D366] flex items-center justify-center shadow-lg shadow-[#25D366]/30"
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.95 }}
      initial={{ scale: 0 }}
      animate={{ scale: 1 }}
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
      <main ref={containerRef} className="relative" style={{ paddingTop: "32px" }}>

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

        {/* 7. TWO OFFERS */}
        <section className="relative min-h-screen flex flex-col items-center justify-center px-6 py-20">
          <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ duration: 1.5 }} className="text-center mb-8 max-w-[360px]">
            <SectionTag text="ELIGE TU ACCESO" />
            <h2 className="font-display text-2xl sm:text-3xl font-black text-white/80">Dos formas de <span className="text-[#FFC300] golden-glow-strong">cruzar el umbral</span></h2>
          </motion.div>

          <div className="w-full max-w-[380px] mx-auto space-y-6">
            {/* OFFER 1: Basic $27 */}
            <MagicSparkles>
              <motion.div initial={{ opacity: 0, scale: 0.9 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} transition={{ duration: 1.5 }} className="w-full border border-[#FFC300]/[0.1] rounded-sm overflow-hidden" style={{ background: "linear-gradient(180deg, rgba(255,195,0,0.03) 0%, rgba(5,5,5,0.95) 100%)" }}>
                <div className="py-5 px-6 text-center border-b border-[#FFC300]/[0.06]">
                  <h3 className="font-display text-lg font-black text-white/80">LOTE 1 — ACCESO BÁSICO</h3>
                  <p className="font-body text-xs text-white/30 mt-1">EL LIBRO + 4 BONOS</p>
                </div>
                <div className="py-4 px-6 space-y-2.5">
                  {[
                    "El Sabio Oscuro de la Psicología — El libro",
                    "BONO 01 · Detectar Mentiras (~$29)",
                    "BONO 02 · Gestos Corporales (~$19)",
                    "BONO 03 · Gestos en Seducción (~$24)",
                    "BONO 04 · Poder de Tu Mente (~$19)",
                  ].map((t, i) => (
                    <div key={i} className="flex items-start gap-2.5">
                      <span className="text-[#FFC300] text-xs mt-0.5 flex-shrink-0">✓</span>
                      <p className="font-body text-xs text-white/50">{t}</p>
                    </div>
                  ))}
                </div>
                <div className="py-5 px-6 text-center border-t border-[#FFC300]/[0.06]">
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

            {/* OFFER 2: PACK COMPLETO $57 */}
            <MagicSparkles>
              <motion.div initial={{ opacity: 0, scale: 0.9 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} transition={{ duration: 1.5, delay: 0.3 }} className="w-full border-2 border-[#FFC300]/[0.25] rounded-sm overflow-hidden relative" style={{ background: "linear-gradient(180deg, rgba(255,195,0,0.06) 0%, rgba(5,5,5,0.98) 100%)" }}>
                {/* Badge */}
                <div className="absolute top-0 right-0 bg-gradient-to-r from-[#FFB800] to-[#FFD84D] px-3 py-1">
                  <span className="font-mono-cosmic text-[0.4rem] tracking-[0.15em] font-bold text-[#050505]">3 PACKS EN 1</span>
                </div>
                <div className="py-5 px-6 text-center border-b border-[#FFC300]/[0.08]">
                  <h3 className="font-display text-lg font-black text-[#FFC300] golden-glow-strong">PACK COMPLETO — 3 EN 1</h3>
                  <p className="font-body text-xs text-white/30 mt-1">3 LIBROS + 12 BONOS + TODO</p>
                </div>
                <div className="py-4 px-6 space-y-2">
                  {[
                    "📖 El Sabio Oscuro de la Psicología — Manipulación & Poder",
                    "🔥 El Domador Encantador — Seducción & Dominio Emocional",
                    "♟️ Jaque Mate Oscuro — Psicología en Negocios & Ventas",
                    "🎁 12 Bonos Exclusivos (valorados en $261)",
                    "🔒 Garantía 7 días · Acceso inmediato · PDF",
                  ].map((t, i) => (
                    <div key={i} className="flex items-start gap-2.5">
                      <span className="text-[#FFC300] text-xs mt-0.5 flex-shrink-0">✓</span>
                      <p className="font-body text-xs text-white/50">{t}</p>
                    </div>
                  ))}
                </div>
                <div className="py-5 px-6 text-center border-t border-[#FFC300]/[0.08]">
                  <p className="font-body text-sm text-white/20 line-through">DE US$ 456</p>
                  <div className="flex items-baseline justify-center gap-1 mt-1">
                    <span className="font-body text-sm text-white/30">US$</span>
                    <span className="font-display text-5xl font-black text-[#FFC300] golden-glow-strong">57</span>
                  </div>
                  <p className="font-mono-cosmic text-[0.35rem] tracking-[0.25em] text-[#FFC300]/40 mt-2 font-bold">AHORRAS $399 · 87% DESCUENTO</p>
                  <div className="mt-4">
                    <CtaButton text="🔥 VER PACK COMPLETO →" onClick={onGoToPack} size="lg" />
                  </div>
                </div>
              </motion.div>
            </MagicSparkles>
          </div>
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
            <FaqItem q="¿Qué incluye el pack completo de $57?" a="Incluye 3 libros digitales completos + 12 bonos exclusivos: El Sabio Oscuro de la Psicología, El Domador Encantador y Jaque Mate Oscuro. Todo por un solo pago de $57." />
          </div>
        </section>

        {/* 10. FINAL CTA */}
        <section className="relative min-h-screen flex flex-col items-center justify-center px-6 bg-gradient-to-b from-transparent via-[#050505]/60 to-[#050505] pb-24">
          <motion.div initial={{ scale: 0, opacity: 0 }} whileInView={{ scale: 1, opacity: 1 }} viewport={{ once: true }} transition={{ duration: 2.5 }} className="relative mb-8">
            <GoldenSingularity size={160} intensity={2.5} variant="cta" />
          </motion.div>
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 1.5, delay: 0.5 }} className="text-center relative z-10 max-w-[340px]">
            <p className="font-display text-2xl sm:text-4xl font-black text-white/80">El conocimiento que no tienes</p>
            <p className="font-display text-2xl sm:text-4xl font-black mt-1"><span className="text-[#FFC300] golden-glow-strong">es el arma que usan contra ti.</span></p>
          </motion.div>
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 1, delay: 1.2 }} className="mt-10 relative z-10 flex flex-col items-center gap-4">
            <CtaButton text="🔓 ACCESO BÁSICO $27" href={CTA_BASIC} size="lg" sameWindow />
            <CtaButton text="🔥 PACK COMPLETO $57 → 3 EN 1" onClick={onGoToPack} size="lg" />
          </motion.div>
        </section>
      </main>
    </>
  );
}

/* ══════════════════════════════════════ */
/* PAGE 2: PACK COMPLETO DETAIL           */
/* ══════════════════════════════════════ */
function PackPage({ onBack }: { onBack: () => void }) {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({ target: containerRef });
  const [scrollProg, setScrollProg] = useState(0);

  useEffect(() => {
    const unsub = scrollYProgress.on("change", (v) => setScrollProg(v));
    return () => unsub();
  }, [scrollYProgress]);

  return (
    <>
      <CosmicCanvas />
      <div className="fixed inset-0 z-[1] scanlines pointer-events-none" />
      <div className="grain-overlay" />
      <div className="scan-sweep" />
      <div className="fixed inset-0 z-[2] pointer-events-none" style={{ background: "radial-gradient(ellipse at center, transparent 40%, rgba(5,5,5,0.5) 80%, rgba(5,5,5,0.85) 100%)" }} />
      <ScrollBar progress={scrollProg} />

      {/* BACK BUTTON */}
      <motion.button
        onClick={onBack}
        className="fixed top-4 left-4 z-[65] flex items-center gap-2 px-4 py-2 bg-[#0A0A0A]/90 border border-[#FFC300]/[0.08] rounded-sm backdrop-blur-sm"
        whileHover={{ scale: 1.05, borderColor: "rgba(255,195,0,0.2)" }}
        whileTap={{ scale: 0.95 }}
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.5 }}
      >
        <span className="text-[#FFC300]/60">←</span>
        <span className="font-mono-cosmic text-[0.4rem] tracking-[0.2em] text-[#FFC300]/50">VOLVER</span>
      </motion.button>

      <main ref={containerRef} className="relative" style={{ paddingTop: "0" }}>

        {/* PACK HERO */}
        <section className="relative min-h-screen flex flex-col items-center justify-center px-6 py-20">
          <MagicSparkles />
          <motion.div initial={{ opacity: 0, scale: 0.2 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 3 }} className="mb-8">
            <GoldenSingularity size={80} intensity={1.5} variant="portal" />
          </motion.div>
          <motion.div initial={{ opacity: 0, y: 25, filter: "blur(10px)" }} animate={{ opacity: 1, y: 0, filter: "blur(0px)" }} transition={{ duration: 3, delay: 0.5 }} className="text-center max-w-[380px]">
            <p className="font-mono-cosmic text-[0.35rem] tracking-[0.3em] text-[#FFC300]/30 mb-3">3 PACKS EN 1 — OFERTA EXCLUSIVA</p>
            <h1 className="font-display text-3xl sm:text-5xl font-black text-white/85">3 Libros.</h1>
            <h1 className="font-display text-3xl sm:text-5xl font-black text-[#FFC300] golden-glow-strong mt-1">12 Bonos.</h1>
            <h1 className="font-display text-3xl sm:text-5xl font-black text-white/50 mt-1">1 Precio.</h1>
          </motion.div>
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 2 }} className="mt-6 text-center">
            <p className="font-body text-sm text-white/30 max-w-[340px]">
              Tres programas completos de psicología oscura, seducción y ventas. Todo lo que necesitas para dominar cualquier situación.
            </p>
          </motion.div>
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 2.5 }} className="mt-8">
            <div className="flex items-baseline justify-center gap-1">
              <span className="font-body text-base text-white/25 line-through">US$ 456</span>
              <span className="font-body text-base text-white/20 mx-2">→</span>
              <span className="font-body text-sm text-white/40">US$</span>
              <span className="font-display text-5xl font-black text-[#FFC300] golden-glow-strong">57</span>
            </div>
            <p className="font-mono-cosmic text-[0.4rem] tracking-[0.25em] text-[#FFC300]/40 mt-2 text-center font-bold">87% DESCUENTO · PAGO ÚNICO</p>
          </motion.div>
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 3 }} className="mt-8">
            <CtaButton text="🔥 OBTENER LOS 3 PACKS POR $57" href={CTA_PACK} size="lg" sameWindow />
          </motion.div>
        </section>

        {/* PACK 1: EL SABIO OSCURO */}
        <section className="relative px-6 py-16">
          <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ duration: 1.5 }} className="max-w-[380px] mx-auto">
            <SectionTag text="PACK 1 — PSICOLOGÍA OSCURA" />
            <div className="flex items-center gap-3 mb-4">
              <span className="text-2xl">👁️</span>
              <div>
                <h2 className="font-display text-xl sm:text-2xl font-black text-[#FFC300] golden-glow-strong">El Sabio Oscuro de la Psicología</h2>
                <p className="font-body text-xs text-white/30">Domina la Mente Humana · 10 Capítulos · 8 Leyes</p>
              </div>
            </div>
            <div className="border border-[#FFC300]/[0.06] rounded-sm p-5 mb-4" style={{ background: "linear-gradient(180deg, rgba(255,195,0,0.02) 0%, transparent 100%)" }}>
              <p className="font-body text-xs text-white/40 leading-relaxed mb-4">
                El 97% de las personas son manipuladas a diario sin saberlo. Este libro te pone del otro lado. Descubre los principios de la psicología oscura que usan líderes, negociadores y estrategas para controlar cualquier situación — y aprende a detectar cuando alguien los usa contra ti.
              </p>
              <p className="font-mono-cosmic text-[0.35rem] tracking-[0.2em] text-[#FFC300]/20 mb-3">LO QUE DESCUBRIRÁS:</p>
              <div className="space-y-2">
                {[
                  "👁️ Las 8 Leyes del Comportamiento Humano — predice lo que cualquiera hará antes de que lo haga",
                  "🧠 Técnicas de persuasión oscura que usan negociadores de élite",
                  "🛡️ Cómo detectar manipulación emocional en relaciones y trabajo",
                  "💘 El arte de la seducción psicológica (sin trucos baratos)",
                  "🎭 Control emocional absoluto — que nadie vea lo que sientes",
                  "⚠️ Identificar narcisistas, maquiavélicos y psicópatas antes de que te dañen",
                  "🔗 Protegerte de relaciones tóxicas con ciencia",
                  "♟️ El camino al poder absoluto — influencia sin fuerza",
                ].map((t, i) => (
                  <p key={i} className="font-body text-[0.7rem] text-white/35 leading-relaxed">{t}</p>
                ))}
              </div>
            </div>
            {/* Pack 1 Extracts */}
            <div className="space-y-4 mb-4">
              {[
                { quote: "La ausencia calculada genera más poder que la presencia constante. Cuando desapareces en el momento correcto, la otra persona llena ese vacío con pensamientos sobre ti. Es la base de toda obsesión.", cap: "Ley #4: La Ley del Vacío Estratégico" },
                { quote: "Cuando alguien te halaga excesivamente en los primeros minutos de conocerte, no está siendo amable — está activando el principio de reciprocidad para que bajes la guardia.", cap: "Cap. 5 — Dominando la Mente Humana" },
              ].map((item, i) => (
                <div key={i} className="border-l-2 border-[#FFC300]/10 pl-4">
                  <p className="font-body text-xs text-white/35 italic leading-relaxed">&ldquo;{item.quote}&rdquo;</p>
                  <p className="font-mono-cosmic text-[0.25rem] text-[#FFC300]/20 mt-1.5 tracking-[0.15em]">— {item.cap}</p>
                </div>
              ))}
            </div>
            {/* Pack 1 Bonuses */}
            <p className="font-mono-cosmic text-[0.3rem] tracking-[0.2em] text-[#FFC300]/25 mb-3">🎁 4 BONOS EXCLUSIVOS — VALOR $91</p>
            <div className="space-y-2">
              {[
                { title: "Cómo Detectar Mentiras", sub: "Desenmascara el Engaño", value: "$29" },
                { title: "Gestos Corporales en la Vida Diaria", sub: "Lectura Corporal Avanzada", value: "$19" },
                { title: "Gestos Corporales en la Seducción", sub: "Citas, Atracción y Manipulación", value: "$24" },
                { title: "Activa el Poder de Tu Mente", sub: "Desbloquea tu Don Oculto", value: "$19" },
              ].map((b, i) => (
                <div key={i} className="flex items-center justify-between py-2 px-3 border border-[#FFC300]/[0.03] rounded-sm">
                  <div>
                    <p className="font-display text-[0.7rem] font-bold text-white/55">{b.title}</p>
                    <p className="font-body text-[0.5rem] text-white/20">{b.sub}</p>
                  </div>
                  <div className="text-right flex-shrink-0 ml-2">
                    <p className="font-mono-cosmic text-[0.3rem] text-white/15 line-through">{b.value}</p>
                    <p className="font-mono-cosmic text-[0.35rem] text-[#FFC300]/50 font-bold">GRATIS</p>
                  </div>
                </div>
              ))}
            </div>
            <div className="mt-3 flex items-center justify-between py-2 px-3 bg-[#FFC300]/[0.02] rounded-sm">
              <p className="font-display text-xs font-bold text-white/50">Valor del Pack 1</p>
              <div className="flex items-center gap-2">
                <span className="font-mono-cosmic text-[0.4rem] text-white/20 line-through">$201</span>
                <span className="font-mono-cosmic text-[0.5rem] text-[#FFC300]/50 font-bold">INCLUIDO</span>
              </div>
            </div>
          </motion.div>
        </section>

        {/* PACK 2: EL DOMADOR ENCANTADOR */}
        <section className="relative px-6 py-16">
          <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ duration: 1.5 }} className="max-w-[380px] mx-auto">
            <SectionTag text="PACK 2 — SEDUCCIÓN & DOMINIO" />
            <div className="flex items-center gap-3 mb-4">
              <span className="text-2xl">🫦</span>
              <div>
                <h2 className="font-display text-xl sm:text-2xl font-black text-[#FFC300] golden-glow-strong">El Domador Encantador</h2>
                <p className="font-body text-xs text-white/30">Seducción · Dominio Emocional · Magnetismo</p>
              </div>
            </div>
            <div className="border border-[#FFC300]/[0.06] rounded-sm p-5 mb-4" style={{ background: "linear-gradient(180deg, rgba(255,195,0,0.02) 0%, transparent 100%)" }}>
              <p className="font-body text-xs text-white/40 leading-relaxed mb-4">
                ¿Qué pasaría si pudieras domar su deseo... controlar sus impulsos, leer sus reacciones? Este no es el camino fácil, pero sí el que transforma radicalmente tu realidad. Un manual de transformación para quienes están listos para dejar de ser invisibles y comenzar a ser irresistibles.
              </p>
              <p className="font-mono-cosmic text-[0.35rem] tracking-[0.2em] text-[#FFC300]/20 mb-3">LO QUE DESCUBRIRÁS:</p>
              <div className="space-y-2">
                {[
                  "🫦 Cómo construir una presencia magnética que capture la atención sin necesidad de hablar demasiado",
                  "🔥 Técnicas psicológicas secretas para leer y reprogramar los deseos de los demás",
                  "💫 Estrategias prácticas para convertir cada interacción en una oportunidad de conquista y dominio emocional",
                  "🧠 Estrategias de dominio emocional — transforma tu energía interna en magnetismo irresistible",
                  "🛡️ Aprende a dominar las emociones de los demás con una simple mirada",
                  "⚡ Cómo activar el deseo, la confianza y la atracción a voluntad",
                ].map((t, i) => (
                  <p key={i} className="font-body text-[0.7rem] text-white/35 leading-relaxed">{t}</p>
                ))}
              </div>
            </div>
            {/* Pack 2 Bonuses */}
            <p className="font-mono-cosmic text-[0.3rem] tracking-[0.2em] text-[#FFC300]/25 mb-3">🎁 4 BONOS EXCLUSIVOS — VALOR $100</p>
            <div className="space-y-2">
              {[
                { title: "Como Crear Tensión Sexual en 5 Minutos", sub: "Técnicas rápidas para generar tensión sexual intensa", value: "$25" },
                { title: "De la Pantalla a la Cama", sub: "Seducir por mensajes y llevar la interacción del chat al encuentro íntimo", value: "$25" },
                { title: "Técnicas de Control de Conversación", sub: "Domina cualquier conversación, guíala hacia donde tú quieras", value: "$25" },
                { title: "Dominación Mental & Emocional", sub: "Técnicas psicológicas avanzadas para influir en decisiones y crear dependencia emocional", value: "$25" },
              ].map((b, i) => (
                <div key={i} className="flex items-center justify-between py-2 px-3 border border-[#FFC300]/[0.03] rounded-sm">
                  <div>
                    <p className="font-display text-[0.7rem] font-bold text-white/55">{b.title}</p>
                    <p className="font-body text-[0.5rem] text-white/20">{b.sub}</p>
                  </div>
                  <div className="text-right flex-shrink-0 ml-2">
                    <p className="font-mono-cosmic text-[0.3rem] text-white/15 line-through">{b.value}</p>
                    <p className="font-mono-cosmic text-[0.35rem] text-[#FFC300]/50 font-bold">GRATIS</p>
                  </div>
                </div>
              ))}
            </div>
            <div className="mt-3 flex items-center justify-between py-2 px-3 bg-[#FFC300]/[0.02] rounded-sm">
              <p className="font-display text-xs font-bold text-white/50">Valor del Pack 2</p>
              <div className="flex items-center gap-2">
                <span className="font-mono-cosmic text-[0.4rem] text-white/20 line-through">$145</span>
                <span className="font-mono-cosmic text-[0.5rem] text-[#FFC300]/50 font-bold">INCLUIDO</span>
              </div>
            </div>
          </motion.div>
        </section>

        {/* PACK 3: JAQUE MATE OSCURO */}
        <section className="relative px-6 py-16">
          <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ duration: 1.5 }} className="max-w-[380px] mx-auto">
            <SectionTag text="PACK 3 — NEGOCIOS & VENTAS" />
            <div className="flex items-center gap-3 mb-4">
              <span className="text-2xl">♟️</span>
              <div>
                <h2 className="font-display text-xl sm:text-2xl font-black text-[#FFC300] golden-glow-strong">Jaque Mate Oscuro</h2>
                <p className="font-body text-xs text-white/30">Psicología Oscura Aplicada a Negocios y Ventas</p>
              </div>
            </div>
            <div className="border border-[#FFC300]/[0.06] rounded-sm p-5 mb-4" style={{ background: "linear-gradient(180deg, rgba(255,195,0,0.02) 0%, transparent 100%)" }}>
              <p className="font-body text-xs text-white/40 leading-relaxed mb-4">
                Si no sabes vender, no es porque no tengas algo valioso, es porque estás intentando convencer cuando deberías estar influyendo. Descubre cómo funcionan los mecanismos psicológicos que activan decisiones reales, para que vender deje de ser una lucha y se convierta en una consecuencia natural.
              </p>
              <p className="font-mono-cosmic text-[0.35rem] tracking-[0.2em] text-[#FFC300]/20 mb-3">LO QUE LOGRARÁS:</p>
              <div className="space-y-2">
                {[
                  "👁️ Empezarás a notar gestos, silencios, contradicciones que antes pasaban desapercibidas",
                  "🧠 Descubrirás que muchas decisiones nunca fueron tuyas — ideas sembradas, opiniones inducidas",
                  "♟️ Aprenderás a leer juegos mentales antes de que empiecen",
                  "🎯 Entender cómo se mueven las personas cuando creen tener el control",
                  "💰 Vender con psicología oscura — no empujas, no convences, haces que la persona se venda sola",
                  "🛡️ Accedes a información que no suele enseñarse abiertamente",
                ].map((t, i) => (
                  <p key={i} className="font-body text-[0.7rem] text-white/35 leading-relaxed">{t}</p>
                ))}
              </div>
            </div>
            {/* Jaque Mate Example */}
            <div className="border-l-2 border-[#FFC300]/10 pl-4 mb-4">
              <p className="font-mono-cosmic text-[0.25rem] text-[#FFC300]/15 mb-1 tracking-[0.2em]">{"// EJEMPLO REAL"}</p>
              <p className="font-body text-xs text-white/35 italic leading-relaxed">
                &ldquo;Un cliente entró sin intención de comprar. No lo abordé. Silencio incómodo — lo obligó a mirarme. &ldquo;¿Ese es el nuevo?&rdquo; — Solo asentí: &ldquo;No es para todo el mundo.&rdquo; Exclusión. Cuando algo no es para todos, el ego pide pertenecer. Salió convencido de que había tomado una decisión inteligente por sí mismo. Eso es vender con psicología oscura.&rdquo;
              </p>
              <p className="font-mono-cosmic text-[0.25rem] text-[#FFC300]/20 mt-1.5 tracking-[0.15em]">— El Cliente Que Se Convenció Solo</p>
            </div>
            {/* Pack 3 Bonuses */}
            <p className="font-mono-cosmic text-[0.3rem] tracking-[0.2em] text-[#FFC300]/25 mb-3">🎁 4 BONOS EXCLUSIVOS — VALOR $70</p>
            <div className="space-y-2">
              {[
                { title: "12 Técnicas Psicológicas para Guiar Decisiones sin Resistencia", sub: "Influir sin presionar, conducir decisiones sin confrontación", value: "$30" },
                { title: "7 Errores Psicológicos que Matan las Ventas Silenciosamente", sub: "Identificar fallos mentales que bloquean cierres", value: "$10" },
                { title: "Cómo Detectar Manipulación, Trampas y Juegos Psicológicos en Negocios", sub: "Leer intenciones ocultas, detectar juegos de poder", value: "$20" },
                { title: "Cómo Eliminar el Miedo al Rechazo y a Perder Oportunidades", sub: "Reprogramar tu respuesta mental al rechazo", value: "$10" },
              ].map((b, i) => (
                <div key={i} className="flex items-center justify-between py-2 px-3 border border-[#FFC300]/[0.03] rounded-sm">
                  <div>
                    <p className="font-display text-[0.7rem] font-bold text-white/55">{b.title}</p>
                    <p className="font-body text-[0.5rem] text-white/20">{b.sub}</p>
                  </div>
                  <div className="text-right flex-shrink-0 ml-2">
                    <p className="font-mono-cosmic text-[0.3rem] text-white/15 line-through">{b.value}</p>
                    <p className="font-mono-cosmic text-[0.35rem] text-[#FFC300]/50 font-bold">GRATIS</p>
                  </div>
                </div>
              ))}
            </div>
            <div className="mt-3 flex items-center justify-between py-2 px-3 bg-[#FFC300]/[0.02] rounded-sm">
              <p className="font-display text-xs font-bold text-white/50">Valor del Pack 3</p>
              <div className="flex items-center gap-2">
                <span className="font-mono-cosmic text-[0.4rem] text-white/20 line-through">$110</span>
                <span className="font-mono-cosmic text-[0.5rem] text-[#FFC300]/50 font-bold">INCLUIDO</span>
              </div>
            </div>
          </motion.div>
        </section>

        {/* PRICING BREAKDOWN */}
        <section className="relative px-6 py-16">
          <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ duration: 1.5 }} className="max-w-[380px] mx-auto">
            <SectionTag text="DESGLOSE DE PRECIOS" />
            <h2 className="font-display text-2xl sm:text-3xl font-black text-white/80 text-center mb-6">Esto es lo que <span className="text-[#FFC300] golden-glow-strong">pagarías por separado</span></h2>
            <MagicSparkles>
              <div className="border border-[#FFC300]/[0.1] rounded-sm overflow-hidden" style={{ background: "linear-gradient(180deg, rgba(255,195,0,0.04) 0%, rgba(5,5,5,0.95) 100%)" }}>
                <div className="py-4 px-5 space-y-3">
                  {[
                    { label: "El Sabio Oscuro de la Psicología", sub: "Libro + 4 bonos", value: "$201" },
                    { label: "El Domador Encantador", sub: "Libro + 4 bonos", value: "$145" },
                    { label: "Jaque Mate Oscuro", sub: "Libro + 4 bonos", value: "$110" },
                  ].map((item, i) => (
                    <div key={i} className="flex items-center justify-between py-2 border-b border-white/[0.03]">
                      <div>
                        <p className="font-display text-xs font-bold text-white/60">{item.label}</p>
                        <p className="font-body text-[0.5rem] text-white/25">{item.sub}</p>
                      </div>
                      <p className="font-mono-cosmic text-sm font-bold text-white/20 line-through">{item.value}</p>
                    </div>
                  ))}
                </div>
                <div className="py-4 px-5 text-center border-t border-[#FFC300]/[0.08]" style={{ background: "linear-gradient(180deg, rgba(255,195,0,0.03) 0%, transparent 100%)" }}>
                  <div className="flex items-center justify-between mb-3">
                    <p className="font-display text-sm font-bold text-white/40">VALOR TOTAL</p>
                    <p className="font-mono-cosmic text-xl font-black text-white/25 line-through">$456</p>
                  </div>
                  <div className="h-[1px] bg-[#FFC300]/[0.06] my-3" />
                  <div className="flex items-center justify-between mb-2">
                    <p className="font-display text-sm font-bold text-white/40">HOY PAGAS</p>
                    <div className="flex items-baseline gap-1">
                      <span className="font-body text-sm text-white/30">US$</span>
                      <span className="font-display text-4xl font-black text-[#FFC300] golden-glow-strong">57</span>
                    </div>
                  </div>
                  <p className="font-mono-cosmic text-[0.4rem] tracking-[0.25em] text-[#FFC300]/40 font-bold mb-4">AHORRAS $399 · 87% DESCUENTO · PAGO ÚNICO</p>
                  <CtaButton text="🔥 OBTENER TODO POR $57" href={CTA_PACK} size="lg" sameWindow />
                </div>
              </div>
            </MagicSparkles>
          </motion.div>
        </section>

        {/* TESTIMONIOS */}
        <section className="relative px-6 py-16">
          <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ duration: 1.5 }} className="max-w-[380px] mx-auto">
            <SectionTag text="EVIDENCIA" />
            <h2 className="font-display text-2xl sm:text-3xl font-black text-white/70 text-center mb-6">No es promesa.<br /><span className="text-[#FFC300] golden-glow-strong">Es evidencia.</span></h2>
            <div className="grid grid-cols-3 gap-4 mb-8">
              {[
                { value: "+2,400", label: "Copias" },
                { value: "4.8/5", label: "Valoración" },
                { value: "97%", label: "Retención" },
              ].map((item, i) => (
                <motion.div key={i} initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.8, delay: i * 0.15 }} className="text-center">
                  <p className="font-display text-2xl font-black text-[#FFC300] golden-glow-strong">{item.value}</p>
                  <p className="font-body text-[0.5rem] text-white/30 mt-1">{item.label}</p>
                </motion.div>
              ))}
            </div>
            <div className="space-y-4">
              {[
                { text: "Empecé a ver patrones en conversaciones que antes me parecían normales. Ahora no puedo dejar de verlos.", author: "Mente Despierta — México" },
                { text: "Esto no es lo que esperaba. Es mucho más profundo. Cada capítulo te hace cuestionar todo lo que creías saber.", author: "Observador Silencioso — España" },
                { text: "Pensé que era otro libro de autoayuda. Me equivoqué. Esto es otra categoría completamente.", author: "El Despierto — Argentina" },
                { text: "El Domador Encantador cambió mi forma de ver las relaciones. Ahora entiendo por qué antes no funcionaban.", author: "Observador Despierto — Colombia" },
                { text: "Jaque Mate me enseñó que vender no es convencer, es influir. Mis cierres subieron 40% en 2 semanas.", author: "Vendedor Invisible — México" },
                { text: "Los 3 libros se complementan perfecto. Manipulación + Seducción + Ventas = poder total.", author: "Estratega Digital — Perú" },
              ].map((item, i) => (
                <motion.div key={i} initial={{ opacity: 0, y: 12 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6, delay: i * 0.1 }} className="border-l border-[#FFC300]/10 pl-4 py-2">
                  <p className="font-body text-xs text-white/35 italic leading-relaxed">&ldquo;{item.text}&rdquo;</p>
                  <p className="font-mono-cosmic text-[0.25rem] text-[#FFC300]/20 mt-1.5 tracking-[0.15em]">— {item.author}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </section>

        {/* GUARANTÍAS */}
        <section className="relative px-6 py-16">
          <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ duration: 1.5 }} className="max-w-[380px] mx-auto">
            <SectionTag text="GARANTÍAS" />
            <div className="space-y-6">
              {[
                { num: "01", title: "Garantía Incondicional de 7 días", desc: "Si dentro de 7 días después de la inversión sientes que el material no es para ti, solo contacta al soporte y devolvemos el 100% de tu inversión. RIESGO CERO." },
                { num: "02", title: "Soporte Online Exclusivo", desc: "Resuelve tus dudas directamente con nuestro equipo. business.crossdigital@gmail.com" },
                { num: "03", title: "Acceso Inmediato", desc: "Después del pago recibes el acceso por correo en menos de 5 minutos. Desde cualquier dispositivo: celular, tablet o computadora." },
                { num: "04", title: "Actualizaciones Sin Costo", desc: "Acceso a nuevas ediciones y material complementario sin gastar más dinero." },
              ].map((item, i) => (
                <motion.div key={i} initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.8, delay: i * 0.2 }} className="flex items-start gap-4">
                  <span className="font-mono-cosmic text-2xl font-black text-[#FFC300]/15 flex-shrink-0">{item.num}</span>
                  <div>
                    <p className="font-display text-sm font-bold text-white/60">{item.title}</p>
                    <p className="font-body text-xs text-white/30 leading-relaxed mt-1">{item.desc}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </section>

        {/* FAQ PACK */}
        <section className="relative px-6 py-16">
          <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ duration: 1.5 }} className="max-w-[380px] mx-auto">
            <SectionTag text="PREGUNTAS FRECUENTES" />
            <h2 className="font-display text-2xl font-black text-white/60 text-center mb-6">Tienes preguntas<br /><span className="text-[#FFC300] golden-glow-strong">tenemos respuestas.</span></h2>
            <FaqItem q="¿Los libros son físicos o digitales?" a="Los tres libros son digitales en formato PDF. Puedes descargarlos desde cualquier dispositivo: celular, computadora o tablet. No se encuentran en ninguna tienda física." />
            <FaqItem q="¿Cómo descargo los libros y bonos?" a="Después del pago recibirás un correo de Hotmart con los datos de acceso para descargar inmediatamente. Son 3 simples pasos." />
            <FaqItem q="¿Qué métodos de pago hay disponibles?" a="Puedes pagar con Tarjeta de Crédito, PayPal y Efectivo. Colombia: Efecty o PSE. México: OXXO. UE: SEPA. Chile: Sencillito." />
            <FaqItem q="¿Necesito algún conocimiento especial?" a="No. Los libros están diseñados para ser fáciles de entender y aplicar. No necesitas ninguna habilidad o conocimiento previo." />
            <FaqItem q="¿Es legal aprender esto?" a="Sí. El conocimiento es neutral — lo que importa es cómo lo uses. Estas técnicas se enseñan en universidades de psicología, negocios y comunicación en todo el mundo." />
            <FaqItem q="¿Tiene garantía?" a="Sí. 7 días de garantía total. Si no te convence por cualquier motivo, solicitas reembolso en Hotmart con un solo clic. Sin preguntas." />
            <FaqItem q="¿Cuánto tiempo tardaré en ver resultados?" a="El tiempo varía. Algunos ven cambios significativos en unas pocas semanas, mientras que otros pueden necesitar más tiempo." />
            <FaqItem q="¿Es seguro pagar en línea?" a="Sí. Utilizamos Hotmart, plataforma reconocida mundialmente con más de 20 millones de usuarios. No almacenamos información de tu tarjeta y tu información personal está protegida." />
            <FaqItem q="¿Y si aplico lo que dice y no me funciona?" a="Si sientes que esto no es para ti, aprovecha la garantía de 7 días y solicita un reembolso completo. Sin complicaciones." />
          </motion.div>
        </section>

        {/* FINAL CTA PACK */}
        <section className="relative min-h-screen flex flex-col items-center justify-center px-6 bg-gradient-to-b from-transparent via-[#050505]/60 to-[#050505] pb-24">
          <MagicSparkles />
          <motion.div initial={{ scale: 0, opacity: 0 }} whileInView={{ scale: 1, opacity: 1 }} viewport={{ once: true }} transition={{ duration: 2.5 }} className="relative mb-8">
            <GoldenSingularity size={160} intensity={2.5} variant="cta" />
          </motion.div>
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 1.5, delay: 0.5 }} className="text-center relative z-10 max-w-[360px]">
            <p className="font-display text-2xl sm:text-4xl font-black text-white/80">3 Libros. 12 Bonos.</p>
            <p className="font-display text-2xl sm:text-4xl font-black mt-1"><span className="text-[#FFC300] golden-glow-strong">1 Solo pago de $57.</span></p>
            <div className="mt-4 flex items-center justify-center gap-2">
              <span className="font-mono-cosmic text-sm text-white/20 line-through">US$ 456</span>
              <span className="font-body text-xs text-white/15">→</span>
              <span className="font-display text-3xl font-black text-[#FFC300] golden-glow-strong">$57</span>
            </div>
          </motion.div>
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 1, delay: 1.2 }} className="mt-8 relative z-10">
            <CtaButton text="🔥 OBTENER LOS 3 PACKS POR $57" href={CTA_PACK} size="lg" sameWindow />
          </motion.div>
          <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ delay: 1.8 }} className="mt-6 text-center max-w-[320px]">
            <p className="font-body text-xs text-white/20 leading-relaxed">
              Garantía de 7 días · Acceso inmediato · Pago seguro vía Hotmart · Desde cualquier dispositivo
            </p>
          </motion.div>
        </section>
      </main>
    </>
  );
}

/* ══════════════════════════════════════ */
/* MAIN EXPORT                            */
/* ══════════════════════════════════════ */
export default function ElUmbral() {
  const [page, setPage] = useState<"main" | "pack">("main");

  const handleGoToPack = useCallback(() => {
    setPage("pack");
    window.scrollTo({ top: 0, behavior: "instant" });
  }, []);

  const handleGoBack = useCallback(() => {
    setPage("main");
    window.scrollTo({ top: 0, behavior: "instant" });
  }, []);

  const waLink = page === "main" ? WA_MAIN : WA_PACK;
  const handleStickyCta = useCallback(() => {
    if (page === "pack") {
      window.open(CTA_PACK, "_self");
    }
  }, [page]);

  return (
    <div className="min-h-screen flex flex-col bg-[#050505]">
      <AnimatePresence mode="wait">
        {page === "main" ? (
          <motion.div key="main" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.5 }}>
            <MainPage onGoToPack={handleGoToPack} />
          </motion.div>
        ) : (
          <motion.div key="pack" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.5 }}>
            <PackPage onBack={handleGoBack} />
          </motion.div>
        )}
      </AnimatePresence>

      <StickyBar page={page} onCta={handleStickyCta} />
      <WhatsAppButton link={waLink} />
    </div>
  );
}
