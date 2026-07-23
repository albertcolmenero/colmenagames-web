"use client";

import Image from "next/image";
import { ArrowRight } from "lucide-react";
import { Container, CTAButton, Eyebrow, Hexagon, Reveal } from "./primitives";
import { useCopy } from "@/i18n/context";

export function Esencia() {
  const { copy } = useCopy();

  return (
    <section
      id="esencia"
      className="relative bg-white pb-36 pt-24 sm:pt-28 lg:pb-44 lg:pt-36"
    >
      <Container>
        {/* Header */}
        <Reveal>
          <Eyebrow>{copy.esencia.eyebrow}</Eyebrow>
          <h2 className="mt-6 font-display text-4xl font-black uppercase leading-[1.15] tracking-tight sm:text-5xl lg:text-6xl">
            <span className="text-ink">{copy.esencia.h2line1}</span>
            <br />
            <span className="text-graphite">{copy.esencia.h2line2}</span>
          </h2>
        </Reveal>

        {/* Intro paragraphs */}
        <div className="mt-12 grid max-w-5xl gap-10 lg:grid-cols-2">
          <Reveal delay={0.06}>
            <div className="h-1 w-16 bg-honey" aria-hidden="true" />
            <p className="mt-6 text-base leading-relaxed text-ink/75 sm:text-lg">
              {copy.esencia.p1}
            </p>
          </Reveal>
          <Reveal delay={0.12}>
            <div className="h-1 w-16 bg-honey" aria-hidden="true" />
            <p className="mt-6 text-base leading-relaxed text-ink/75 sm:text-lg">
              {copy.esencia.p2}
            </p>
          </Reveal>
        </div>

        <Reveal delay={0.18} className="mt-10">
          <CTAButton href="#hablemos" icon={ArrowRight} variant="gold">
            {copy.esencia.cta}
          </CTAButton>
        </Reveal>

        {/* Narrative panel */}
        <Reveal delay={0.1}>
          <div className="hex-texture relative mt-16 overflow-hidden rounded-3xl bg-ink p-8 text-white sm:p-12 lg:p-16">
            <Hexagon
              className="pointer-events-none absolute -right-16 -top-16 h-64 w-56 rotate-12 text-honey/10"
              strokeWidth={3}
            />
            <Hexagon
              className="pointer-events-none absolute -bottom-14 -left-12 h-44 w-40 -rotate-6 text-honey/10"
              strokeWidth={3}
            />
            <div className="relative">
              <p className="font-mono text-[11px] uppercase tracking-[0.3em] text-ember sm:text-xs">
                {copy.esencia.narrativeLabel}
              </p>
              <h3 className="mt-4 font-display text-3xl font-black uppercase leading-[1.15] tracking-tight sm:text-4xl lg:text-5xl">
                {copy.esencia.narrativeLine1}
                <br />
                <span className="text-honey">{copy.esencia.narrativeLine2}</span>
              </h3>
              <p className="mt-6 max-w-2xl text-base leading-relaxed text-white/70 sm:text-lg">
                {copy.esencia.narrativeText}
              </p>
            </div>
          </div>
        </Reveal>

        {/* Differentiators — menu anchor: Por qué Colmena */}
        <div id="por-que-colmena" className="mt-20">
          <Reveal>
            <h3 className="font-display text-2xl font-black uppercase leading-[1.15] tracking-tight sm:text-3xl">
              {copy.esencia.difTitle}
            </h3>
          </Reveal>
        </div>
        <div className="mt-10 overflow-hidden rounded-2xl bg-bone">
          <div className="grid border-l border-t border-ink/10 sm:grid-cols-2 lg:grid-cols-3">
            {copy.esencia.diferenciadores.map((item, i) => {
              const number = String(i + 1).padStart(2, "0");
              return (
                <div key={number} className="border-b border-r border-ink/10 p-8">
                  <Reveal delay={i * 0.06}>
                    <span className="relative inline-flex h-10 w-9 items-center justify-center">
                      <Hexagon
                        className="absolute inset-0 h-full w-full text-amber"
                        strokeWidth={6}
                      />
                      <span className="relative font-mono text-[11px] text-ink">
                        {number}
                      </span>
                    </span>
                    <h4 className="mt-5 font-display text-base font-black uppercase tracking-tight sm:text-lg">
                      {item.title}
                    </h4>
                    <p className="mt-2 text-sm leading-relaxed text-graphite sm:text-[15px]">
                      {item.desc}
                    </p>
                  </Reveal>
                </div>
              );
            })}
          </div>
        </div>
      </Container>

      {/* Bee flight-path divider, straddling the white → gray boundary */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 bottom-0 z-10 flex justify-center"
      >
        <Image
          src="/que-oferim.png"
          alt=""
          width={1078}
          height={596}
          sizes="400px"
          className="h-32 w-auto translate-y-1/2 sm:h-40"
        />
      </div>
    </section>
  );
}
