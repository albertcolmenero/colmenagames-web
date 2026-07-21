"use client";

import { ArrowRight, Quote } from "lucide-react";
import { Container, CTAButton, Eyebrow, Reveal } from "./primitives";

const TESTIMONIALS = [
  {
    quote:
      "Todo el proceso fue ágil y facilísimo de gestionar. Desde el primer momento sentimos que podíamos despreocuparnos de todo porque lo tenían completamente controlado. El día del evento salió perfecto y el equipo lo disfrutó muchísimo.",
    initials: "CG",
    name: "C. García",
    role: "Director de Tienda · Decathlon",
  },  
  {
    quote: "Una dinámica personalizada que nos ha enganchado desde el minuto uno.",
    initials: "GA",
    name: "G. Arienzo",
    role: "Store Manager · Zegna",
  },
  {
    quote:
      "Consiguieron que personas que apenas se conocían acabaran interactuando de forma natural durante toda la tarde.",
    initials: "MF",
    name: "M. Franco",
    role: "HR Manager · Gameloft",
  },
  {
    quote:
      "Un acierto total. Sabíamos la temática que buscábamos y la llevaron al siguiente nivel: vídeos, actuaciones durante toda la noche, decoración, juegos… Una experiencia muy inmersiva y divertida. Sin duda, un 10.",
    initials: "PM",
    name: "P. Martí",
    role: "People & Culture · Checkpoint Systems",
  },
  {
    quote:
      "Dinamización de alto nivel, nos lo hemos pasado muy bien. La gente siguió hablando de la experiencia durante semanas.",
    initials: "AA",
    name: "A. Armanani",
    role: "General Manager · Change Lingerie",
  },
  {
    quote:
      "Se nota muchísimo cuando una experiencia está pensada específicamente para tu empresa.",
    initials: "AT",
    name: "A. Trujillo",
    role: "Directora · Escola Lola Anglada",
  },
];

export function Stories() {
  return (
    <section id="historias-reales" className="bg-butter py-24 sm:py-28 lg:py-36">
      <Container>
        <Reveal>
          <Eyebrow>05 / Historias reales</Eyebrow>
          <h2 className="mt-6 font-display text-4xl font-black uppercase leading-[1.15] tracking-tight sm:text-5xl lg:text-6xl">
            Equipos que ya han confiado en nosotros
          </h2>
          <p className="mt-5 max-w-2xl text-lg text-ink/70">
            Esto es lo que dicen las personas que organizaron la experiencia y
            los equipos que la vivieron.
          </p>
        </Reveal>

        <div className="mt-14 columns-1 gap-5 md:columns-2 lg:columns-3">
          {TESTIMONIALS.map((t, i) => (
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
              ¿Queréis ser los siguientes?
            </CTAButton>
          </div>
        </Reveal>
      </Container>
    </section>
  );
}
