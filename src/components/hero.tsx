"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { CalendarDays, FileText } from "lucide-react";
import { Container, CTAButton, HexBullet } from "./primitives";
import { RichText, useCopy } from "@/i18n/context";

export function Hero() {
  const { copy } = useCopy();

  return (
    <section
      id="empieza-aqui"
      className="relative overflow-hidden bg-cream pb-20 pt-36 sm:pb-24 sm:pt-40 lg:pt-44"
    >
      {/* Dice pattern halves hugging the edges, per brand brief */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -left-[240px] top-1/2 hidden -translate-y-1/2 opacity-[0.16] mix-blend-multiply sm:block lg:-left-[200px]"
      >
        <Image
          src="/pattern-dice.png"
          alt=""
          width={2000}
          height={2000}
          sizes="640px"
          className="h-[520px] w-[520px] lg:h-[640px] lg:w-[640px]"
          priority
        />
      </div>
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-[240px] top-1/2 hidden -translate-y-1/2 opacity-[0.16] mix-blend-multiply sm:block lg:-right-[200px]"
      >
        <Image
          src="/pattern-dice.png"
          alt=""
          width={2000}
          height={2000}
          sizes="640px"
          className="h-[520px] w-[520px] scale-x-[-1] lg:h-[640px] lg:w-[640px]"
          priority
        />
      </div>

      <Container className="relative">
        <div className="mx-auto flex max-w-3xl flex-col items-center text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.85 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          >
            <Image
              src="/logo-trim.png"
              alt="Colmena Experience — dados y abejas"
              width={979}
              height={971}
              sizes="160px"
              className="h-24 w-auto sm:h-28"
              priority
            />
          </motion.div>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
            className="mt-8 flex items-center gap-3 font-mono text-[11px] uppercase tracking-[0.3em] text-cocoa sm:text-xs"
          >
            <HexBullet className="h-2.5 w-2.5 text-ember" />
            {copy.hero.eyebrow}
            <HexBullet className="h-2.5 w-2.5 text-ember" />
          </motion.p>

          <motion.h1
            initial={{ opacity: 0, y: 26 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.25, ease: [0.22, 1, 0.36, 1] }}
            className="mt-5 font-display text-[13vw] font-black uppercase leading-[1.12] tracking-tight text-ink sm:text-6xl lg:text-7xl"
          >
            {copy.hero.h1line1}
            <br />
            <span className="relative inline-block">
              {copy.hero.h1line2}
              <motion.span
                aria-hidden="true"
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{ duration: 0.9, delay: 1, ease: [0.22, 1, 0.36, 1] }}
                className="absolute -bottom-1.5 left-0 h-[0.09em] w-full origin-left bg-ember sm:-bottom-2"
              />
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4, ease: [0.22, 1, 0.36, 1] }}
            className="mt-7 max-w-2xl text-lg leading-relaxed text-ink/75 sm:text-xl"
          >
            <RichText text={copy.hero.subtitle} strongClassName="text-ink" />
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.55, ease: [0.22, 1, 0.36, 1] }}
            className="mt-10 flex flex-col items-center gap-4 sm:flex-row"
          >
            <CTAButton href="#hablemos" icon={CalendarDays} variant="gold" size="lg">
              {copy.hero.ctaPrimary}
            </CTAButton>
            <CTAButton href="#hablemos" icon={FileText} variant="outline" size="lg">
              {copy.hero.ctaSecondary}
            </CTAButton>
          </motion.div>

          <motion.ul
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.85 }}
            className="mt-14 flex flex-col items-center gap-3 font-mono text-[11px] uppercase tracking-[0.18em] text-cocoa sm:flex-row sm:gap-0 sm:text-xs"
          >
            {copy.hero.stats.map((stat, i) => (
              <li key={stat} className="flex items-center">
                {i > 0 && (
                  <span
                    aria-hidden="true"
                    className="mx-5 hidden h-4 w-px bg-cocoa/30 sm:block"
                  />
                )}
                {stat}
              </li>
            ))}
          </motion.ul>
        </div>
      </Container>
    </section>
  );
}
