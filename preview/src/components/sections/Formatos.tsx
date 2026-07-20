import { Section, Eyebrow } from "@/components/ui/Section";
import { Reveal } from "@/components/ui/Reveal";
import { Button } from "@/components/ui/Button";
import { Info } from "lucide-react";
import { formatos } from "@/content/site";

export function Formatos() {
  return (
    <Section id={formatos.id} index="06" label="Formatos y presupuestos" tone="ink">
      <div className="relative grain pt-16 lg:pt-24">
        <div className="absolute inset-0 bg-honeycomb-dark opacity-50" aria-hidden="true" />
        <div className="relative">
          <div className="grid grid-cols-1 gap-8 lg:grid-cols-12 lg:items-end">
            <div className="lg:col-span-7">
              <Reveal>
                <Eyebrow tone="light">{formatos.eyebrow}</Eyebrow>
              </Reveal>
              <Reveal delay={0.05}>
                <h2 className="mt-6 max-w-2xl text-[clamp(2rem,4.6vw,3.8rem)] uppercase leading-[0.95] text-paper">
                  {formatos.title}
                </h2>
              </Reveal>
            </div>
            <div className="lg:col-span-5">
              <Reveal delay={0.1}>
                <p className="text-[1.02rem] leading-relaxed text-paper/70">
                  {formatos.lead}
                </p>
              </Reveal>
            </div>
          </div>

          {/* Tabla de tiers */}
          <div className="mt-14 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {formatos.tiers.map((tier, i) => (
              <Reveal key={tier.range} delay={i * 0.06}>
                <div className="group flex h-full flex-col rounded-2xl border border-white/12 bg-white/[0.03] p-6 transition-all duration-300 hover:border-amber/50 hover:bg-white/[0.06]">
                  <span className="font-mono-label uppercase text-paper/50">
                    {tier.range}
                  </span>
                  <div className="mt-auto pt-8">
                    <span className="block font-display text-3xl uppercase leading-none text-amber sm:text-4xl">
                      {tier.price}
                    </span>
                    <span className="mt-2 block font-mono-label uppercase text-paper/55">
                      {tier.unit}
                    </span>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>

          {/* Nota + CTA */}
          <Reveal>
            <div className="mt-10 flex flex-col gap-6 rounded-2xl border border-white/10 bg-white/[0.03] p-7 lg:flex-row lg:items-center lg:justify-between">
              <p className="flex max-w-2xl items-start gap-3 text-sm leading-relaxed text-paper/60">
                <Info className="mt-0.5 h-4 w-4 shrink-0 text-amber" aria-hidden="true" />
                {formatos.note}
              </p>
              <Button href={formatos.cta.href} variant="amber" size="lg" className="shrink-0">
                {formatos.cta.label}
              </Button>
            </div>
          </Reveal>
        </div>
      </div>
    </Section>
  );
}
