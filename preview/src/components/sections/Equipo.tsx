import { Section, Eyebrow } from "@/components/ui/Section";
import { Reveal } from "@/components/ui/Reveal";
import { Check } from "lucide-react";
import { Hexagon, Bee } from "@/components/brand/icons";
import { equipo } from "@/content/site";

export function Equipo() {
  return (
    <Section id={equipo.id} index="07" label="Quiénes somos" tone="paper">
      <div className="grid grid-cols-1 items-center gap-12 pt-16 lg:grid-cols-12 lg:pt-24">
        <div className="lg:col-span-7">
          <Reveal>
            <Eyebrow>{equipo.eyebrow}</Eyebrow>
          </Reveal>
          <Reveal delay={0.05}>
            <h2 className="mt-6 max-w-2xl text-[clamp(2rem,4.4vw,3.6rem)] uppercase leading-[0.95] text-ink">
              {equipo.title}
            </h2>
          </Reveal>
          <Reveal delay={0.1}>
            <p className="mt-7 max-w-xl text-lg leading-relaxed text-stone">
              {equipo.lead}
            </p>
          </Reveal>
          <Reveal delay={0.15}>
            <ul className="mt-8 space-y-3">
              {equipo.points.map((p) => (
                <li key={p} className="flex items-start gap-3">
                  <span className="mt-0.5 inline-flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-amber text-ink">
                    <Check className="h-3.5 w-3.5" strokeWidth={3} />
                  </span>
                  <span className="text-[1.02rem] leading-relaxed text-ink/80">{p}</span>
                </li>
              ))}
            </ul>
          </Reveal>
        </div>

        {/* Composición de panal */}
        <div className="lg:col-span-5">
          <Reveal delay={0.1}>
            <div className="relative mx-auto aspect-square w-full max-w-sm">
              <div className="absolute inset-0 bg-honeycomb-gold opacity-90" aria-hidden="true" />
              {[
                { x: "left-[18%] top-[6%]", s: "h-24 w-24", c: "text-amber" },
                { x: "right-[10%] top-[20%]", s: "h-28 w-28", c: "text-ink" },
                { x: "left-[8%] bottom-[18%]", s: "h-32 w-32", c: "text-ink" },
                { x: "right-[16%] bottom-[8%]", s: "h-24 w-24", c: "text-amber" },
              ].map((h, i) => (
                <span key={i} className={`absolute ${h.x} ${h.c}`} aria-hidden="true">
                  <Hexagon className={h.s} />
                </span>
              ))}
              <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
                <span className="relative inline-flex h-32 w-32 items-center justify-center">
                  <Hexagon className="absolute inset-0 h-full w-full text-ink" />
                  <Bee className="relative h-14 w-14 text-ink" />
                </span>
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </Section>
  );
}
