import { Section, Eyebrow } from "@/components/ui/Section";
import { Reveal } from "@/components/ui/Reveal";
import {
  CalendarCheck,
  ShieldCheck,
  Sparkles,
  SlidersHorizontal,
  PartyPopper,
  Wallet,
} from "lucide-react";
import { porQue } from "@/content/site";

const ICONS = [
  CalendarCheck,
  ShieldCheck,
  Sparkles,
  SlidersHorizontal,
  PartyPopper,
  Wallet,
];

export function PorQue() {
  return (
    <Section id={porQue.id} index="02" label="Por qué Colmena" tone="gray">
      <div className="grid grid-cols-1 gap-10 pt-16 lg:grid-cols-12 lg:pt-24">
        <div className="lg:col-span-5">
          <Reveal>
            <Eyebrow>{porQue.eyebrow}</Eyebrow>
          </Reveal>
          <Reveal delay={0.05}>
            <h2 className="mt-6 text-[clamp(2rem,4.6vw,3.8rem)] uppercase leading-[0.95] text-ink">
              {porQue.title}
            </h2>
          </Reveal>
          <Reveal delay={0.1}>
            <p className="mt-7 max-w-md text-lg leading-relaxed text-ink/75">
              {porQue.lead}
            </p>
          </Reveal>

          {/* Promesa central */}
          <Reveal delay={0.15}>
            <figure className="mt-10 rounded-2xl border border-ink/10 bg-white p-7 shadow-card">
              <blockquote className="font-display text-xl uppercase leading-tight text-ink sm:text-2xl">
                «{porQue.promise}»
              </blockquote>
              <figcaption className="mt-3 font-mono-label uppercase text-cocoa">
                Nuestra promesa
              </figcaption>
            </figure>
          </Reveal>
        </div>

        {/* Grid de beneficios */}
        <div className="lg:col-span-7">
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
            {porQue.benefits.map((b, i) => {
              const Icon = ICONS[i] ?? Sparkles;
              return (
                <Reveal key={b.title} delay={i * 0.05}>
                  <article className="group relative h-full overflow-hidden rounded-2xl border border-ink/10 bg-white p-6 transition-all duration-300 hover:-translate-y-1 hover:border-amber/50 hover:shadow-honey">
                    <span
                      className="absolute -right-2 -top-4 font-display text-7xl text-ink/5 transition-colors group-hover:text-amber/15"
                      aria-hidden="true"
                    >
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <span className="inline-flex h-11 w-11 items-center justify-center rounded-xl bg-honey-soft text-cocoa transition-colors duration-300 group-hover:bg-amber group-hover:text-ink">
                      <Icon className="h-5 w-5" strokeWidth={2} />
                    </span>
                    <h3 className="relative mt-5 font-display text-lg uppercase leading-tight text-ink">
                      {b.title}
                    </h3>
                    <p className="relative mt-2 text-[0.95rem] leading-relaxed text-stone">
                      {b.text}
                    </p>
                  </article>
                </Reveal>
              );
            })}
          </div>
        </div>
      </div>
    </Section>
  );
}
