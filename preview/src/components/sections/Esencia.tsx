import { Section, Eyebrow } from "@/components/ui/Section";
import { Reveal } from "@/components/ui/Reveal";
import { Hexagon, Bee } from "@/components/brand/icons";
import { esencia } from "@/content/site";

export function Esencia() {
  return (
    <Section id={esencia.id} index="01" label="Nuestra esencia" tone="paper">
      <div className="grid grid-cols-1 gap-12 pt-16 lg:grid-cols-12 lg:gap-16 lg:pt-24">
        {/* Manifiesto */}
        <div className="lg:col-span-7">
          <Reveal>
            <Eyebrow>{esencia.eyebrow}</Eyebrow>
          </Reveal>
          <Reveal delay={0.05}>
            <h2 className="mt-6 text-[clamp(2.2rem,5.2vw,4.4rem)] uppercase leading-[0.92]">
              <span className="text-ink">{esencia.title}</span>
              <br />
              <span className="text-ink/45 italic">{esencia.titleAccent}</span>
            </h2>
          </Reveal>
          <Reveal delay={0.1}>
            <p className="mt-8 max-w-xl text-lg leading-relaxed text-ink/80">
              {esencia.lead}
            </p>
          </Reveal>
        </div>

        {/* Párrafos de apoyo */}
        <div className="lg:col-span-5 lg:pt-24">
          <Reveal delay={0.15}>
            <div className="space-y-5 border-l-2 border-amber pl-6">
              {esencia.paragraphs.map((p, i) => (
                <p key={i} className="text-[1.02rem] leading-relaxed text-stone">
                  {p}
                </p>
              ))}
            </div>
          </Reveal>
        </div>
      </div>

      {/* Metáfora de la colmena — bloque de impacto */}
      <Reveal>
        <div className="relative mt-16 overflow-hidden rounded-3xl bg-ink px-8 py-12 text-paper grain sm:px-14 sm:py-16">
          <div className="absolute inset-0 bg-honeycomb-dark opacity-80" aria-hidden="true" />
          <div
            className="absolute -right-10 -top-10 text-amber/15"
            aria-hidden="true"
          >
            <Hexagon className="h-56 w-56" />
          </div>
          <Bee className="absolute right-10 bottom-8 hidden h-12 w-12 text-paper sm:block animate-float-slow" />
          <div className="relative max-w-3xl">
            <span className="font-mono-label uppercase text-amber">
              La narrativa Colmena
            </span>
            <h3 className="mt-4 text-[clamp(1.8rem,4vw,3.2rem)] uppercase leading-[0.95] text-paper">
              {esencia.metaphor.title}
            </h3>
            <p className="mt-6 text-lg leading-relaxed text-paper/75">
              {esencia.metaphor.text}
            </p>
          </div>
        </div>
      </Reveal>

      {/* Lo que nos diferencia */}
      <div className="mt-20">
        <Reveal>
          <h3 className="text-[clamp(1.5rem,3vw,2.4rem)] uppercase text-ink">
            {esencia.diferenciadores.title}
          </h3>
        </Reveal>
        <div className="mt-8 grid grid-cols-1 gap-px overflow-hidden rounded-2xl border border-ink/10 bg-ink/10 sm:grid-cols-2 lg:grid-cols-3">
          {esencia.diferenciadores.items.map((item, i) => (
            <Reveal key={item.title} delay={i * 0.05}>
              <article className="group h-full bg-paper p-7 transition-colors duration-300 hover:bg-white">
                <div className="flex items-center gap-3">
                  <span className="relative inline-flex h-9 w-9 items-center justify-center text-amber">
                    <Hexagon className="absolute inset-0 h-full w-full" />
                    <span className="font-mono-label text-ink">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                  </span>
                </div>
                <h4 className="mt-5 font-display text-lg uppercase leading-tight text-ink">
                  {item.title}
                </h4>
                <p className="mt-2.5 text-[0.95rem] leading-relaxed text-stone">
                  {item.text}
                </p>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </Section>
  );
}
