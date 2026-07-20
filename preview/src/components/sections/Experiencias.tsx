import { Section, Eyebrow } from "@/components/ui/Section";
import { Reveal } from "@/components/ui/Reveal";
import { Button } from "@/components/ui/Button";
import { Hexagon } from "@/components/brand/icons";
import { experiencias } from "@/content/site";
import {
  Search,
  Trophy,
  Blocks,
  Puzzle,
  HeartHandshake,
  Drama,
} from "lucide-react";

const TYPE_ICONS = [Search, Trophy, Blocks, Puzzle, HeartHandshake, Drama];

// Tratamientos "duotono" cálidos (sin fotos: composición gráfica de marca)
const SCENES = [
  "from-ink via-ink-700 to-cocoa",
  "from-cocoa via-honey-800 to-amber",
  "from-honey-700 via-amber to-honey-500",
  "from-ink via-cocoa to-honey-800",
  "from-honey-800 via-amber to-honey-light",
  "from-ink-700 via-cocoa to-amber",
];

export function Experiencias() {
  return (
    <Section id={experiencias.id} index="04" label="Nuestras experiencias" tone="white">
      <div className="pt-16 lg:pt-24">
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-12 lg:items-end">
          <div className="lg:col-span-8">
            <Reveal>
              <Eyebrow>{experiencias.eyebrow}</Eyebrow>
            </Reveal>
            <Reveal delay={0.05}>
              <h2 className="mt-6 max-w-3xl text-[clamp(2rem,4.6vw,3.8rem)] uppercase leading-[0.95] text-ink">
                {experiencias.title}
              </h2>
            </Reveal>
          </div>
          <div className="lg:col-span-4">
            <Reveal delay={0.1}>
              <p className="text-[1.02rem] leading-relaxed text-stone">
                {experiencias.lead}
              </p>
            </Reveal>
          </div>
        </div>

        {/* Mosaico tipo panal (escalonado) */}
        <div className="mt-14 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {experiencias.types.map((type, i) => {
            const Icon = TYPE_ICONS[i] ?? Search;
            return (
              <Reveal key={type.title} delay={(i % 3) * 0.07} className={i % 2 === 1 ? "lg:mt-10" : ""}>
                <article className="group flex h-full flex-col overflow-hidden rounded-3xl border border-ink/10 bg-white transition-all duration-400 hover:-translate-y-1.5 hover:border-amber/40 hover:shadow-soft">
                  {/* Escena gráfica */}
                  <div className={`relative aspect-[16/10] overflow-hidden bg-gradient-to-br ${SCENES[i]}`}>
                    <div className="absolute inset-0 bg-honeycomb-dark opacity-60" aria-hidden="true" />
                    <div
                      className="absolute -right-6 -top-6 text-white/10 transition-transform duration-500 group-hover:scale-110 group-hover:rotate-6"
                      aria-hidden="true"
                    >
                      <Hexagon className="h-40 w-40" />
                    </div>
                    <div className="absolute inset-0 flex items-center justify-center">
                      <span className="relative inline-flex h-20 w-20 items-center justify-center">
                        <Hexagon className="absolute inset-0 h-full w-full text-amber" />
                        <Icon className="relative h-8 w-8 text-paper" strokeWidth={1.8} />
                      </span>
                    </div>
                    <span className="absolute left-4 top-4 font-mono-label uppercase text-paper/70">
                      {type.tag}
                    </span>
                    <span className="absolute bottom-4 left-4 right-4 truncate font-mono-label uppercase text-paper/80">
                      {type.featured}
                    </span>
                  </div>

                  {/* Contenido */}
                  <div className="flex flex-1 flex-col p-6">
                    <h3 className="font-display text-xl uppercase leading-tight text-ink">
                      {type.title}
                    </h3>
                    <p className="mt-3 flex-1 text-[0.95rem] leading-relaxed text-stone">
                      {type.text}
                    </p>
                    <ul className="mt-5 flex flex-wrap gap-2">
                      {type.examples.map((ex) => (
                        <li
                          key={ex}
                          className="rounded-full bg-honey-soft/50 px-3 py-1 font-mono-label text-cocoa"
                        >
                          {ex}
                        </li>
                      ))}
                    </ul>
                  </div>
                </article>
              </Reveal>
            );
          })}
        </div>

        {/* Experiencia destacada (spotlight) */}
        <Reveal>
          <div className="mt-12 overflow-hidden rounded-3xl bg-ink text-paper grain">
            <div className="grid grid-cols-1 lg:grid-cols-2">
              {/* Visual */}
              <div className="relative min-h-[16rem] overflow-hidden bg-gradient-to-br from-cocoa via-ink-700 to-ink">
                <div className="absolute inset-0 bg-honeycomb-gold opacity-70" aria-hidden="true" />
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="relative inline-flex h-32 w-32 items-center justify-center">
                    <Hexagon className="absolute inset-0 h-full w-full text-amber" />
                    <Search className="relative h-12 w-12 text-paper" strokeWidth={1.6} />
                  </span>
                </div>
                <span className="absolute left-6 top-6 font-mono-label uppercase text-amber">
                  {experiencias.spotlight.eyebrow}
                </span>
              </div>
              {/* Texto */}
              <div className="p-8 sm:p-12">
                <h3 className="font-display text-[clamp(1.8rem,3.5vw,2.8rem)] uppercase leading-[0.95] text-paper">
                  {experiencias.spotlight.title}
                </h3>
                <p className="mt-2 font-mono-label uppercase text-amber">
                  {experiencias.spotlight.subtitle}
                </p>
                <p className="mt-5 text-[1.02rem] leading-relaxed text-paper/75">
                  {experiencias.spotlight.text}
                </p>
                <dl className="mt-7 grid grid-cols-2 gap-x-6 gap-y-4 border-t border-white/10 pt-6">
                  {experiencias.spotlight.specs.map((s) => (
                    <div key={s.label}>
                      <dt className="font-mono-label uppercase text-paper/50">{s.label}</dt>
                      <dd className="mt-1 text-sm font-semibold text-paper">{s.value}</dd>
                    </div>
                  ))}
                </dl>
              </div>
            </div>
          </div>
        </Reveal>

        {/* CTA cierre de sección */}
        <Reveal>
          <div className="mt-12 flex flex-col items-start gap-5 rounded-3xl border border-dashed border-ink/20 bg-honey-soft/30 p-8 sm:flex-row sm:items-center sm:justify-between">
            <p className="max-w-xl font-display text-xl uppercase leading-tight text-ink sm:text-2xl">
              ¿Tienes algo distinto en mente? Te escuchamos.
            </p>
            <Button href={experiencias.cta.href} variant="ink" size="lg">
              {experiencias.cta.label}
            </Button>
          </div>
        </Reveal>
      </div>
    </Section>
  );
}
