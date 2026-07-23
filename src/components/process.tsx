"use client";

import {
  Ear,
  ListChecks,
  MessageSquareQuote,
  Mic,
  PencilRuler,
} from "lucide-react";
import type { ComponentType } from "react";

import { useCopy } from "@/i18n/context";
import { Container, Eyebrow, HexIcon, Reveal } from "./primitives";

type StepVisual = {
  number: string;
  icon: ComponentType<{ className?: string }>;
};

const STEP_VISUALS: StepVisual[] = [
  { number: "01", icon: Ear },
  { number: "02", icon: PencilRuler },
  { number: "03", icon: ListChecks },
  { number: "04", icon: Mic },
  { number: "05", icon: MessageSquareQuote },
];

export function Process() {
  const { copy } = useCopy();

  const steps = STEP_VISUALS.map((visual, i) => ({
    ...visual,
    title: copy.process.steps[i]?.title ?? "",
    description: copy.process.steps[i]?.desc ?? "",
  }));

  return (
    <section
      id="como-trabajamos"
      className="relative overflow-hidden bg-ink hex-texture py-24 text-white sm:py-28 lg:py-36"
    >
      <Container>
        {/* Header */}
        <div className="mx-auto max-w-3xl text-center">
          <Reveal>
            <Eyebrow light className="justify-center">
              {copy.process.eyebrow}
            </Eyebrow>
            <h2 className="mt-4 font-display text-4xl font-black uppercase leading-[1.15] tracking-tight text-white sm:text-5xl lg:text-6xl">
              {copy.process.h2}
            </h2>
            <p className="mt-5 text-lg font-light italic text-mist/80 sm:text-xl">
              {copy.process.subtitle}
            </p>
          </Reveal>
        </div>

        {/* Steps */}
        <div className="relative mt-20">
          {/* Horizontal connecting line (desktop) */}
          <div
            aria-hidden="true"
            className="absolute left-[10%] right-[10%] top-[36px] hidden h-px bg-gradient-to-r from-honey/0 via-honey/60 to-honey/0 lg:block"
          />

          <div className="flex flex-col gap-10 lg:grid lg:grid-cols-5 lg:gap-6">
            {steps.map((step, i) => (
              <Reveal key={step.number} delay={i * 0.1}>
                <div className="relative flex items-start gap-5 lg:flex-col lg:items-center lg:gap-0 lg:text-center">
                  {/* Vertical dashed connector (mobile/tablet) */}
                  {i < steps.length - 1 && (
                    <span
                      aria-hidden="true"
                      className="absolute -bottom-10 left-[32px] top-[72px] border-l border-dashed border-honey/30 lg:hidden"
                    />
                  )}

                  <HexIcon
                    icon={step.icon}
                    variant="solid"
                    className="relative z-10 h-[72px] w-[65px] shrink-0"
                  />

                  <div className="min-w-0 pt-1 lg:pt-0">
                    <p className="font-mono text-xs tracking-[0.3em] text-ember lg:mt-6">
                      {step.number}
                    </p>
                    <h3 className="mt-2 font-display text-lg font-black uppercase tracking-tight text-white">
                      {step.title}
                    </h3>
                    <p className="mt-3 max-w-[26ch] text-sm leading-relaxed text-mist/75 lg:mx-auto">
                      {step.description}
                    </p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>

        {/* Closing statement */}
        <div className="mx-auto mt-24 max-w-4xl text-center">
          <Reveal>
            <p className="font-display text-2xl font-black uppercase leading-[1.15] tracking-tight sm:text-4xl lg:text-[44px]">
              <span className="block text-white">{copy.process.closing1}</span>
              <span className="block text-honey">{copy.process.closing2}</span>
            </p>
          </Reveal>
        </div>
      </Container>
    </section>
  );
}
