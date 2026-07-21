"use client";

import Image from "next/image";
import {
  ArrowRight,
  Blocks,
  Drama,
  HeartHandshake,
  Puzzle,
  Search,
  Trophy,
} from "lucide-react";
import type { ComponentType } from "react";
import {
  Chip,
  Container,
  CTAButton,
  Eyebrow,
  Hexagon,
  HexIcon,
  Reveal,
} from "./primitives";

type ExperienceCard = {
  number: string;
  icon: ComponentType<{ className?: string }>;
  image: string;
  name: string;
  title: string;
  description: string;
  chips: string[];
};

const CARDS: ExperienceCard[] = [
  {
    number: "01",
    icon: Search,
    image: "/new_website/experiencias/misterio.jpg",
    name: "Royal Velvet Casino",
    title: "MISTERIO E INVESTIGACIÓN",
    description:
      "Retos colaborativos donde los equipos descubren pistas, resuelven enigmas y avanzan juntos hacia una solución.",
    chips: ["Cluedo en vivo", "Murder Mystery", "Robo en el Museo", "CSI"],
  },
  {
    number: "02",
    icon: Trophy,
    image: "/new_website/experiencias/competicion.jpg",
    name: "TV Show Experience",
    title: "COMPETICIÓN POR EQUIPOS",
    description:
      "Formatos dinámicos donde distintos equipos compiten en pruebas diseñadas para fomentar participación, energía y celebración.",
    chips: ["Music Battle", "TV Show Experience", "Olympic Games"],
  },
  {
    number: "03",
    icon: Blocks,
    image: "/new_website/experiencias/creativas.jpg",
    name: "Creation Lab",
    title: "CREATIVAS Y DE CONSTRUCCIÓN COLECTIVA",
    description:
      "Actividades donde el grupo crea algo en conjunto, potenciando creatividad, colaboración y sentimiento de pertenencia.",
    chips: ["Creation Lab", "Identidad de equipo", "Mural colectivo"],
  },
  {
    number: "04",
    icon: Puzzle,
    image: "/new_website/experiencias/retos.jpg",
    name: "Misión Secreta",
    title: "RETOS Y RESOLUCIÓN COLECTIVA",
    description:
      "Dinámicas donde colaboración, comunicación y toma de decisiones son clave para superar desafíos contrarreloj.",
    chips: ["Escape Room", "Misión secreta", "Operación rescate"],
  },
  {
    number: "05",
    icon: HeartHandshake,
    image: "/new_website/experiencias/conectar.jpg",
    name: "Unlock the Team",
    title: "CONECTAR PERSONAS",
    description:
      "Diseñadas para romper el hielo, generar conversaciones y fortalecer relaciones entre personas que apenas se conocen.",
    chips: ["Unlock the Team", "Networking Games", "Afterworks", "Onboarding"],
  },
  {
    number: "06",
    icon: Drama,
    image: "/new_website/experiencias/inmersivas.jpg",
    name: "Inside Out: Historia Interactiva",
    title: "INMERSIVAS CON STORYTELLING",
    description:
      "Historias, personajes y narrativas que convierten a los participantes en protagonistas de una experiencia compartida.",
    chips: ["Viajes en el tiempo", "Misiones futuristas", "Expediciones legendarias"],
  },
];

const FEATURED_SPECS: { label: string; value: string }[] = [
  { label: "FORMATO", value: "Cluedo en vivo inmersivo" },
  { label: "DURACIÓN", value: "90 – 120 min" },
  { label: "PARTICIPANTES", value: "20 – 200 personas" },
  { label: "ESPACIO", value: "Cenas de empresa, hoteles, fincas" },
];

export function Experiences() {
  return (
    <section id="experiencias" className="bg-bone py-24 sm:py-28 lg:py-36">
      <Container>
        {/* Header */}
        <Reveal>
          <Eyebrow>04 / Nuestras experiencias</Eyebrow>
          <h2 className="mt-6 font-display text-4xl font-black uppercase leading-[1.15] tracking-tight text-cocoa sm:text-5xl lg:text-6xl">
            AQUÍ PASAN COSAS
          </h2>
          <h3 className="mt-4 max-w-3xl font-display text-xl font-black uppercase tracking-tight text-ink sm:text-2xl">
            DISEÑAMOS EXPERIENCIAS PARA DISTINTOS FORMATOS, OBJETIVOS Y PERFILES
            DE EQUIPO.
          </h3>
          <p className="mt-4 max-w-2xl text-base leading-relaxed text-graphite sm:text-lg">
            Competición, misterio, creatividad, conexión… Estas son algunas de
            las formas que puede tomar una experiencia Colmena. Después, la
            adaptamos para que encaje con vuestro equipo.
          </p>
        </Reveal>

        {/* Card grid */}
        <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {CARDS.map((card, i) => (
            <Reveal key={card.number} delay={i * 0.06} className="h-full">
              <article className="group flex h-full flex-col overflow-hidden rounded-2xl bg-white shadow-sm ring-1 ring-ink/5 transition-all duration-300 hover:-translate-y-1.5 hover:shadow-xl hover:shadow-ink/10">
                <div className="relative flex h-52 items-center justify-center overflow-hidden bg-ink">
                  <Image
                    src={card.image}
                    alt={card.name}
                    fill
                    sizes="(min-width:1024px) 33vw, (min-width:640px) 50vw, 100vw"
                    className="object-cover brightness-[0.55] saturate-[0.85] transition-transform duration-500 group-hover:scale-105"
                  />
                  <div
                    aria-hidden="true"
                    className="absolute inset-0 bg-gradient-to-b from-ink/45 via-ink/5 to-ink/60"
                  />
                  <span className="absolute left-5 top-4 font-mono text-[11px] uppercase tracking-[0.2em] text-white/70">
                    {card.number}
                  </span>
                  <HexIcon
                    icon={card.icon}
                    variant="outline"
                    className="relative h-[76px] w-[68px] text-white drop-shadow-[0_6px_18px_rgba(0,0,0,0.75)]"
                  />
                  <span className="absolute inset-x-0 bottom-0 bg-ink/60 px-5 py-2.5 font-mono text-[10px] uppercase tracking-[0.22em] text-white backdrop-blur-sm">
                    {card.name}
                  </span>
                </div>
                <div className="flex grow flex-col gap-3 p-6">
                  <h4 className="font-display text-lg font-black uppercase leading-tight tracking-tight text-ink">
                    {card.title}
                  </h4>
                  <p className="grow text-sm leading-relaxed text-graphite">
                    {card.description}
                  </p>
                  <div className="flex flex-wrap gap-2 pt-2">
                    {card.chips.map((chip) => (
                      <Chip key={chip}>{chip}</Chip>
                    ))}
                  </div>
                </div>
              </article>
            </Reveal>
          ))}
        </div>

        {/* Featured experience */}
        <Reveal className="mt-16">
          <div className="grid overflow-hidden rounded-3xl bg-ink ring-1 ring-ink/10 lg:grid-cols-2">
            <div className="relative min-h-[320px] lg:min-h-[460px]">
              <Image
                src="/new_website/casino.png"
                alt="Mesa de casino con escena del crimen iluminada con luz ultravioleta"
                fill
                className="object-cover"
                sizes="(min-width:1024px) 50vw, 100vw"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/40 to-ink/10" />
              <span className="absolute left-6 top-6 z-10 font-mono text-[11px] uppercase tracking-[0.3em] text-honey">
                Experiencia destacada
              </span>
              <div className="absolute inset-0 flex items-center justify-center">
                <HexIcon
                  icon={Search}
                  variant="outline"
                  className="h-24 w-[86px] text-honey"
                />
              </div>
            </div>
            <div className="flex flex-col justify-center p-8 text-white sm:p-12 lg:p-14">
              <h3 className="font-display text-3xl font-black uppercase tracking-tight sm:text-4xl">
                ROYAL VELVET CASINO
              </h3>
              <p className="mt-3 font-mono text-xs uppercase tracking-[0.2em] text-ember">
                Misterio e investigación — Cluedo en vivo
              </p>
              <p className="mt-6 leading-relaxed text-white/80">
                Una cena de gala. Un crimen inesperado. Un casino lleno de
                secretos. Los asistentes se convierten en investigadores y
                colaboran para descubrir al culpable a través de pistas,
                personajes y pruebas repartidas por todo el evento.
              </p>
              <div className="mt-8 border-t border-white/10" />
              <dl className="mt-8 grid grid-cols-2 gap-x-8 gap-y-6">
                {FEATURED_SPECS.map((spec) => (
                  <div key={spec.label}>
                    <dt className="font-mono text-[10px] uppercase tracking-[0.25em] text-graphite">
                      {spec.label}
                    </dt>
                    <dd className="mt-1.5 text-sm font-semibold text-white sm:text-base">
                      {spec.value}
                    </dd>
                  </div>
                ))}
              </dl>
            </div>
          </div>
        </Reveal>

        {/* CTA band */}
        <Reveal className="mt-16">
          <div className="relative flex flex-col items-start justify-between gap-8 overflow-hidden rounded-3xl bg-cream p-8 sm:p-12 lg:flex-row lg:items-center">
            <Hexagon className="absolute -bottom-14 -right-10 h-48 w-auto rotate-12 text-ember/15" />
            <p className="relative max-w-xl font-display text-2xl font-black uppercase tracking-tight text-ink sm:text-3xl">
              ¿TIENES ALGO DISTINTO EN MENTE?
              <br />
              TE ESCUCHAMOS.
            </p>
            <CTAButton
              href="#hablemos"
              variant="dark"
              size="lg"
              icon={ArrowRight}
              className="relative"
            >
              Cuéntanos tu idea
            </CTAButton>
          </div>
        </Reveal>
      </Container>
    </section>
  );
}
