"use client";

import { ArrowRight, Quote } from "lucide-react";
import { Container, CTAButton, Eyebrow, Reveal } from "./primitives";
import { useCopy } from "@/i18n/context";

export function Stories() {
  const { copy } = useCopy();

  return (
    <section id="historias-reales" className="bg-butter py-24 sm:py-28 lg:py-36">
      <Container>
        <Reveal>
          <Eyebrow>{copy.stories.eyebrow}</Eyebrow>
          <h2 className="mt-6 font-display text-4xl font-black uppercase leading-[1.15] tracking-tight sm:text-5xl lg:text-6xl">
            {copy.stories.h2}
          </h2>
          <p className="mt-5 max-w-2xl text-lg text-ink/70">
            {copy.stories.intro}
          </p>
        </Reveal>

        <div className="mt-14 columns-1 gap-5 md:columns-2 lg:columns-3">
          {copy.stories.testimonials.map((t, i) => (
            <Reveal key={t.name} delay={i * 0.05} className="mb-5 break-inside-avoid">
              <figure className="rounded-2xl bg-white p-7 shadow-sm ring-1 ring-ink/5">
                <Quote className="h-7 w-7 rotate-180 fill-gold text-gold" aria-hidden="true" />
                <blockquote className="mt-4 text-[15px] leading-relaxed text-ink/85 sm:text-base">
                  {t.quote}
                </blockquote>
                <figcaption className="mt-6 flex items-center gap-3.5 border-t border-ink/5 pt-5">
                  <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-ink font-mono text-xs font-bold text-honey">
                    {t.initials}
                  </span>
                  <span className="flex flex-col">
                    <span className="font-display text-sm font-bold uppercase tracking-tight">
                      {t.name}
                    </span>
                    <span className="mt-0.5 font-mono text-[10px] tracking-wide text-graphite">
                      {t.role}
                    </span>
                  </span>
                </figcaption>
              </figure>
            </Reveal>
          ))}
        </div>

        <Reveal delay={0.2}>
          <div className="mt-12 flex justify-center">
            <CTAButton href="#hablemos" icon={ArrowRight} variant="dark" size="lg">
              {copy.stories.cta}
            </CTAButton>
          </div>
        </Reveal>
      </Container>
    </section>
  );
}
