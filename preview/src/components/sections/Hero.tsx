"use client";

import { motion, useReducedMotion } from "framer-motion";
import { ArrowDown } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Eyebrow } from "@/components/ui/Section";
import { BracketTagline, HiAmber, HiBlue } from "@/components/ui/BracketTagline";
import { FlyingBee } from "@/components/brand/FlyingBee";
import { hero } from "@/content/site";

const EASE = [0.16, 1, 0.3, 1] as const;

export function Hero() {
  const reduce = useReducedMotion();

  const Line = ({ children, delay }: { children: string; delay: number }) => (
    // pt + -mt da aire para las tildes (Í) sin alterar el ritmo vertical
    <span className="block overflow-hidden pt-[0.16em] pb-[0.08em] -mt-[0.16em]">
      <motion.span
        className="block"
        initial={{ y: reduce ? 0 : "120%" }}
        animate={{ y: 0 }}
        transition={{ duration: reduce ? 0.3 : 0.9, delay, ease: EASE }}
      >
        {children}
      </motion.span>
    </span>
  );

  return (
    <section
      id="top"
      className="relative min-h-[100svh] overflow-hidden bg-honey-soft text-ink"
    >
      {/* Lattice de panal sutil */}
      <div className="absolute inset-0 bg-honeycomb opacity-70" aria-hidden="true" />
      {/* Resplandor cálido */}
      <div
        className="absolute -right-40 -top-40 h-[36rem] w-[36rem] rounded-full bg-honey-light/40 blur-3xl"
        aria-hidden="true"
      />

      {/* Abejas (máx. 3, discretas) */}
      <FlyingBee className="left-[8%] top-[24%] hidden md:block text-ink" size={34} delay={0.6} />
      <FlyingBee className="right-[14%] top-[30%] text-ink" size={42} delay={1.1} duration={11} drift={30} />
      <FlyingBee className="right-[40%] bottom-[16%] hidden lg:block text-ink" size={28} delay={1.6} duration={8} />

      <div className="container-edge relative flex min-h-[100svh] flex-col justify-center pt-28 pb-16">
        <div className="grid grid-cols-1 items-center gap-10 lg:grid-cols-12">
          {/* Columna de texto */}
          <div className="lg:col-span-8">
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
            >
              <Eyebrow>{hero.eyebrow}</Eyebrow>
            </motion.div>

            <h1 className="mt-5 font-display uppercase text-ink leading-[0.86] tracking-[-0.03em] text-[clamp(3.6rem,13vw,10.5rem)]">
              <Line delay={0.15}>{hero.titleLine1}</Line>
              <Line delay={0.28}>{hero.titleLine2}</Line>
            </h1>

            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.7, ease: EASE }}
              className="mt-8 max-w-2xl"
            >
              <BracketTagline className="text-left">
                <p className="text-[0.98rem] leading-relaxed text-ink/85 sm:text-lg">
                  {hero.framedLead.before}
                  <HiAmber>{hero.framedLead.h1}</HiAmber>
                  {hero.framedLead.mid}
                  <HiBlue>{hero.framedLead.h2}</HiBlue>
                  {hero.framedLead.mid2}
                  <HiAmber>{hero.framedLead.h3}</HiAmber>
                  {hero.framedLead.after}
                </p>
              </BracketTagline>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.85, ease: EASE }}
              className="mt-9 flex flex-wrap items-center gap-3"
            >
              <Button href={hero.ctaPrimary.href} variant="amber" size="lg">
                {hero.ctaPrimary.label}
              </Button>
              <Button href={hero.ctaSecondary.href} variant="ghost" size="lg" icon={false}>
                {hero.ctaSecondary.label}
              </Button>
            </motion.div>
          </div>

          {/* Columna del dado (logo en 3D) — solo en pantallas grandes */}
          <div className="hidden lg:col-span-4 lg:flex lg:justify-end">
            <TumblingDice />
          </div>
        </div>

        {/* Banda de confianza */}
        <motion.ul
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 1 }}
          className="mt-14 flex flex-wrap items-center gap-x-8 gap-y-3 border-t border-ink/15 pt-6"
        >
          {hero.trust.map((t) => (
            <li key={t} className="font-mono-label uppercase text-ink/70">
              {t}
            </li>
          ))}
        </motion.ul>
      </div>

      {/* Indicador de scroll */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.3 }}
        className="pointer-events-none absolute bottom-6 left-1/2 hidden -translate-x-1/2 flex-col items-center gap-1 md:flex"
        aria-hidden="true"
      >
        <span className="font-mono-label uppercase text-ink/50">{hero.scrollHint}</span>
        <motion.span
          animate={reduce ? {} : { y: [0, 6, 0] }}
          transition={{ duration: 1.6, repeat: Infinity, ease: "easeInOut" }}
        >
          <ArrowDown className="h-4 w-4 text-ink/50" />
        </motion.span>
      </motion.div>
    </section>
  );
}

/** Dado de marca que cae rotando y se asienta */
function TumblingDice() {
  const reduce = useReducedMotion();
  const pips = [
    [30, 30],
    [70, 30],
    [50, 50],
    [30, 70],
    [70, 70],
  ];

  return (
    <motion.div
      className="relative"
      style={{ perspective: 800 }}
      initial={reduce ? { opacity: 0 } : { opacity: 0, rotateX: -60, rotateY: 45, y: -80, scale: 0.7 }}
      animate={{ opacity: 1, rotateX: 0, rotateY: 0, y: 0, scale: 1 }}
      transition={
        reduce
          ? { duration: 0.4 }
          : { type: "spring", stiffness: 60, damping: 12, delay: 0.5, mass: 1.1 }
      }
    >
      <motion.div
        animate={reduce ? {} : { y: [0, -10, 0], rotate: [0, 1.5, 0] }}
        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
        className="drop-shadow-[0_30px_40px_rgba(90,62,43,0.35)]"
      >
        <svg viewBox="0 0 100 100" className="h-44 w-44 sm:h-56 sm:w-56" aria-hidden="true">
          <rect x="6" y="6" width="88" height="88" rx="20" fill="#fff" />
          <rect x="6" y="6" width="88" height="88" rx="20" fill="var(--color-amber)" opacity="0.95" />
          <rect x="6" y="6" width="88" height="88" rx="20" fill="url(#heroDice)" />
          <defs>
            <linearGradient id="heroDice" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0" stopColor="#fff" stopOpacity="0.45" />
              <stop offset="0.55" stopColor="#fff" stopOpacity="0" />
              <stop offset="1" stopColor="#5a3e2b" stopOpacity="0.22" />
            </linearGradient>
          </defs>
          {pips.map(([cx, cy], i) => (
            <motion.circle
              key={i}
              cx={cx}
              cy={cy}
              r="7.5"
              fill="var(--color-ink)"
              initial={reduce ? { scale: 1 } : { scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 1.1 + i * 0.07, type: "spring", stiffness: 400, damping: 14 }}
              style={{ transformOrigin: `${cx}px ${cy}px` }}
            />
          ))}
        </svg>
      </motion.div>
      <span className="absolute -bottom-2 left-1/2 -translate-x-1/2 font-mono-label uppercase tracking-[0.4em] text-ink/60">
        Colmena
      </span>
    </motion.div>
  );
}
