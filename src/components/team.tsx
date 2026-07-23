"use client";

import Image from "next/image";
import { Chip, Container, Eyebrow, Reveal } from "./primitives";
import { useCopy } from "@/i18n/context";

const PHOTOS = [
  "/team/maria.png",
  "/team/marta.png",
  "/team/mireia.png",
  "/team/alberto.png",
  "/team/laia.png",
  "/team/judith.png",
];

export function Team() {
  const { copy } = useCopy();

  return (
    <section
      id="conocenos"
      className="relative overflow-hidden bg-white py-24 sm:py-28 lg:py-36"
    >
      <Image
        src="/pattern-dice.png"
        alt=""
        width={2000}
        height={2000}
        sizes="480px"
        aria-hidden="true"
        className="pointer-events-none absolute -right-40 -top-40 hidden h-[480px] w-[480px] opacity-[0.05] lg:block"
      />

      <Container className="relative">
        {/* Part 1 — Nuestra historia  */}
        <Reveal>
          <Eyebrow>{copy.team.eyebrow}</Eyebrow>
          <h2 className="mt-6 font-display text-4xl font-black uppercase leading-[1.15] tracking-tight sm:text-5xl lg:text-6xl">
            {copy.team.h2}
          </h2>
        </Reveal>

        <Reveal delay={0.08}>
          <p className="mt-8 font-display text-xl font-bold normal-case tracking-tight sm:text-2xl">
            {copy.team.lead}
          </p>
        </Reveal>

        <Reveal delay={0.14}>
          <div className="mt-6 gap-12 text-[15px] leading-relaxed text-ink/75 sm:text-base lg:columns-2">
            {copy.team.paragraphs.map((paragraph) => (
              <p key={paragraph.slice(0, 24)} className="mb-5">
                {paragraph}
              </p>
            ))}
          </div>
        </Reveal>

        {/* Part 2 — El equipo */}
        <div className="mt-24">
          <Reveal>
            <h3 className="font-display text-2xl font-black uppercase tracking-tight sm:text-3xl">
              {copy.team.equipoTitle}
            </h3>
            <p className="mt-5 max-w-3xl text-base leading-relaxed text-ink/70 sm:text-lg">
              {copy.team.equipoIntro}
            </p>
          </Reveal>

          <div className="mt-14 grid gap-x-8 gap-y-14 sm:grid-cols-2 lg:grid-cols-3">
            {copy.team.members.map((member, i) => (
              <Reveal key={member.name} delay={(i % 3) * 0.06}>
                <div className="relative">
                  <div
                    className="absolute inset-0 translate-x-2.5 translate-y-2.5 rounded-2xl bg-honey"
                    aria-hidden="true"
                  />
                  <div className="relative z-10 aspect-[4/5] overflow-hidden rounded-2xl border-[3px] border-ink">
                    <Image
                      src={PHOTOS[i]}
                      alt={member.name}
                      fill
                      sizes="(min-width:1024px) 33vw, (min-width:640px) 50vw, 100vw"
                      className="object-cover object-top"
                    />
                  </div>
                </div>
                <h4 className="mt-6 font-display text-xl font-black uppercase tracking-tight">
                  {member.name}
                </h4>
                <p className="mt-1 text-sm font-medium text-graphite">
                  {member.role}
                </p>
                <div className="mt-3 flex flex-wrap gap-2">
                  {member.chips.map((chip) => (
                    <Chip key={chip}>{chip}</Chip>
                  ))}
                </div>
                <p className="mt-4 text-sm leading-relaxed text-ink/70">
                  {member.bio}
                </p>
              </Reveal>
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
}
