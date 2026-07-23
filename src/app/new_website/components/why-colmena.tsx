"use client";

import {
  ArrowRight,
  CalendarCheck2,
  PartyPopper,
  SlidersHorizontal,
  Sparkles,
  ShieldCheck,
  Wallet,
} from "lucide-react";
import type { ComponentType } from "react";
import { useCopy } from "../i18n/context";
import { Container, CTAButton, Eyebrow, Reveal } from "./primitives";

const CARD_ICONS: {
  number: string;
  icon: ComponentType<{ className?: string }>;
}[] = [
  { number: "01", icon: CalendarCheck2 },
  { number: "02", icon: PartyPopper },
  { number: "03", icon: SlidersHorizontal },
  { number: "04", icon: Sparkles },
  { number: "05", icon: ShieldCheck },
  { number: "06", icon: Wallet },
];

export function WhyColmena() {
  const { copy } = useCopy();
  const cards = CARD_ICONS.map((item, i) => ({
    ...item,
    ...copy.why.cards[i],
  }));

  return (
    <section
      id="te-lo-ponemos-facil"
      className="bg-fog pb-24 pt-32 sm:pb-28 sm:pt-36 lg:pb-36 lg:pt-44"
    >
      <Container>
        <div className="gap-12 lg:grid lg:grid-cols-12">
          {/* Left — sticky intro */}
          <div className="min-w-0 self-start lg:sticky lg:top-28 lg:col-span-5">
            <Reveal>
              <Eyebrow>{copy.why.eyebrow}</Eyebrow>
              <h2 className="mt-6 font-display text-4xl font-black uppercase leading-[1.15] tracking-tight sm:text-5xl lg:text-6xl">
                {copy.why.h2}
              </h2>
              <p className="mt-6 text-base leading-relaxed text-ink/75 sm:text-lg">
                {copy.why.intro}
              </p>
            </Reveal>

            <Reveal delay={0.1}>
              <div className="relative mt-10 overflow-hidden rounded-2xl bg-white p-8 shadow-sm ring-1 ring-ink/5">
                <span
                  className="absolute inset-y-0 left-0 w-1.5 bg-honey"
                  aria-hidden="true"
                />
                <p className="font-display text-xl font-black uppercase leading-snug tracking-tight sm:text-2xl">
                  {copy.why.promiseQuote}
                </p>
                <p className="mt-4 font-mono text-[11px] uppercase tracking-[0.25em] text-graphite">
                  {copy.why.promiseLabel}
                </p>
              </div>
            </Reveal>
          </div>

          {/* Right — six reason cards */}
          <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:col-span-7 lg:mt-0">
            {cards.map((card, i) => (
              <Reveal key={card.number} delay={i * 0.06}>
                <article className="relative h-full overflow-hidden rounded-2xl bg-white p-7 shadow-sm ring-1 ring-ink/5 transition-all hover:-translate-y-1 hover:shadow-lg">
                  <span
                    className="absolute right-4 top-2 select-none font-display text-[80px] font-black leading-none text-ink/[0.05]"
                    aria-hidden="true"
                  >
                    {card.number}
                  </span>
                  <div className="relative">
                    <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-cream">
                      <card.icon className="h-6 w-6 text-cocoa" />
                    </div>
                    <h3 className="mt-5 font-display text-base font-black uppercase tracking-tight sm:text-lg">
                      {card.title}
                    </h3>
                    <p className="mt-2 text-sm leading-relaxed text-graphite sm:text-[15px]">
                      {card.desc}
                    </p>
                  </div>
                </article>
              </Reveal>
            ))}

            <Reveal delay={0.4} className="sm:col-span-2">
              <div className="mt-4 flex justify-center">
                <CTAButton href="#hablemos" icon={ArrowRight} variant="dark">
                  {copy.why.cta}
                </CTAButton>
              </div>
            </Reveal>
          </div>
        </div>
      </Container>
    </section>
  );
}
