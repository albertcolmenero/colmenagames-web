"use client";

import { motion, useReducedMotion } from "framer-motion";
import { Ear, PencilRuler, ListChecks, Sparkles, MessageSquareQuote } from "lucide-react";
import { Section, Eyebrow } from "@/components/ui/Section";
import { Reveal } from "@/components/ui/Reveal";
import { proceso } from "@/content/site";

const STEP_ICONS = [Ear, PencilRuler, ListChecks, Sparkles, MessageSquareQuote];
const EASE = [0.16, 1, 0.3, 1] as const;

export function Proceso() {
  const reduce = useReducedMotion();

  return (
    <Section id={proceso.id} index="03" label="Cómo trabajamos" tone="ink">
      <div className="relative grain pt-16 lg:pt-24">
        <div className="absolute inset-0 bg-honeycomb-dark opacity-60" aria-hidden="true" />

        <div className="relative">
          <Reveal>
            <Eyebrow tone="light">{proceso.eyebrow}</Eyebrow>
          </Reveal>
          <div className="mt-6 flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
            <Reveal delay={0.05}>
              <h2 className="max-w-2xl text-[clamp(2rem,4.8vw,4rem)] uppercase leading-[0.92] text-paper">
                {proceso.title}
              </h2>
            </Reveal>
            <Reveal delay={0.1}>
              <p className="max-w-sm text-lg leading-relaxed text-paper/70">
                {proceso.lead}
              </p>
            </Reveal>
          </div>

          {/* Camino de pasos */}
          <div className="relative mt-16">
            {/* Línea punteada que se dibuja */}
            <svg
              className="pointer-events-none absolute left-0 top-9 hidden h-2 w-full lg:block"
              viewBox="0 0 1000 8"
              preserveAspectRatio="none"
              fill="none"
              aria-hidden="true"
            >
              <motion.path
                d="M40 4 L960 4"
                stroke="var(--color-amber)"
                strokeWidth="2"
                strokeDasharray="2 10"
                strokeLinecap="round"
                initial={{ pathLength: reduce ? 1 : 0 }}
                whileInView={{ pathLength: 1 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: reduce ? 0.3 : 1.8, ease: "easeInOut" }}
              />
            </svg>

            <ol className="grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-5 lg:gap-5">
              {proceso.steps.map((step, i) => {
                const Icon = STEP_ICONS[i] ?? Sparkles;
                return (
                  <motion.li
                    key={step.num}
                    initial={{ opacity: 0, y: 24 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-60px" }}
                    transition={{
                      duration: reduce ? 0.2 : 0.6,
                      delay: reduce ? 0 : 0.3 + i * 0.18,
                      ease: EASE,
                    }}
                    className="relative"
                  >
                    {/* Nodo hexagonal que se enciende */}
                    <div className="relative inline-flex h-[4.5rem] w-[4.5rem] items-center justify-center">
                      <HexNode delay={reduce ? 0 : 0.45 + i * 0.18} reduce={!!reduce} />
                      <Icon className="relative h-6 w-6 text-ink" strokeWidth={2.2} />
                    </div>

                    <div className="mt-5 flex items-baseline gap-2">
                      <span className="font-mono-label text-amber">{step.num}</span>
                      <h3 className="font-display text-lg uppercase text-paper">
                        {step.title}
                      </h3>
                    </div>
                    <p className="mt-2 text-[0.92rem] leading-relaxed text-paper/65">
                      {step.text}
                    </p>
                  </motion.li>
                );
              })}
            </ol>
          </div>

          {/* Cierre */}
          <Reveal>
            <div className="mt-16 border-t border-white/10 pt-10">
              <p className="max-w-3xl text-[clamp(1.5rem,3.4vw,2.6rem)] uppercase leading-[1.05] text-paper">
                Tú te ocupas de la fecha.{" "}
                <span className="text-amber">
                  Nosotros de que todo el mundo quiera repetir.
                </span>
              </p>
            </div>
          </Reveal>
        </div>
      </div>
    </Section>
  );
}

/** Hexágono que pasa de "fantasma" a ámbar al entrar en viewport */
function HexNode({ delay, reduce }: { delay: number; reduce: boolean }) {
  return (
    <svg viewBox="0 0 100 115" className="absolute inset-0 h-full w-full" aria-hidden="true">
      <path
        d="M50 2L93.3 27v50L50 113 6.7 88V27L50 2Z"
        fill="var(--color-amber)"
        opacity="0.12"
      />
      <motion.path
        d="M50 2L93.3 27v50L50 113 6.7 88V27L50 2Z"
        fill="var(--color-amber)"
        initial={{ opacity: reduce ? 1 : 0, scale: reduce ? 1 : 0.7 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, delay, ease: EASE }}
        style={{ transformOrigin: "50px 57px" }}
      />
    </svg>
  );
}
