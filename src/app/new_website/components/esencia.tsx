"use client";

import { Container, Eyebrow, Hexagon, Reveal } from "./primitives";

const DIFERENCIADORES = [
  {
    number: "01",
    title: "EXPERIENCIAS QUE ENGANCHAN",
    description: "Curiosidad, participación y energía de principio a fin.",
  },
  {
    number: "02",
    title: "FLEXIBILIDAD REAL",
    description:
      "Diseñamos una estructura, pero sabemos leer la sala y adaptar el ritmo al grupo.",
  },
  {
    number: "03",
    title: "DISEÑO CUIDADO Y EJECUCIÓN IMPECABLE",
    description:
      "Estética, materiales y facilitación al servicio de la experiencia.",
  },
  {
    number: "04",
    title: "CRITERIO, INTENCIÓN Y PROPÓSITO",
    description:
      "Nada está ahí por casualidad. Cada dinámica, cada sección, cada momento, tiene un motivo.",
  },
  {
    number: "05",
    title: "ENTENDEMOS LOS EQUIPOS",
    description:
      "Porque hemos formado parte de ellos, porque los hemos liderado y porque los hemos dinamizado. Facilitadores con experiencia real en empresa.",
  },
  {
    number: "06",
    title: "DIVERSIÓN SIN INFANTILIZAR",
    description:
      "Propuestas dinámicas y participativas, pensadas para equipos adultos y para distintas personalidades.",
  },
];

export function Esencia() {
  return (
    <section id="esencia" className="bg-white py-24 sm:py-28 lg:py-36">
      <Container>
        {/* Header */}
        <Reveal>
          <Eyebrow>01 / Nuestra esencia</Eyebrow>
          <h2 className="mt-6 font-display text-4xl font-black uppercase leading-[0.95] tracking-tight sm:text-5xl lg:text-6xl">
            <span className="text-ink">CADA EQUIPO ES DISTINTO.</span>
            <br />
            <span className="text-graphite">
              LA EXPERIENCIA TAMBIÉN DEBERÍA SERLO.
            </span>
          </h2>
        </Reveal>

        {/* Intro paragraphs */}
        <div className="mt-12 grid max-w-5xl gap-10 lg:grid-cols-2">
          <Reveal delay={0.06}>
            <div className="h-1 w-16 bg-honey" aria-hidden="true" />
            <p className="mt-6 text-base leading-relaxed text-ink/75 sm:text-lg">
              Seleccionamos y adaptamos nuestras experiencias para que encajen
              con las personas, el momento y los objetivos de cada empresa. De
              forma sencilla, ágil y sin generar más trabajo para tu equipo.
            </p>
          </Reveal>
          <Reveal delay={0.12}>
            <div className="h-1 w-16 bg-honey" aria-hidden="true" />
            <p className="mt-6 text-base leading-relaxed text-ink/75 sm:text-lg">
              No vendemos juegos sueltos ni packs rígidos. Partimos de formatos
              y mecánicas que sabemos que funcionan, los combinamos y los
              adaptamos al perfil real del grupo, al contexto de la organización
              y al mood del día. El resultado: una experiencia fácil de
              organizar, fluida de vivir y difícil de olvidar.
            </p>
          </Reveal>
        </div>

        {/* Narrative panel */}
        <Reveal delay={0.1}>
          <div className="hex-texture relative mt-16 overflow-hidden rounded-3xl bg-ink p-8 text-white sm:p-12 lg:p-16">
            <Hexagon
              className="pointer-events-none absolute -right-16 -top-16 h-64 w-56 rotate-12 text-honey/10"
              strokeWidth={3}
            />
            <Hexagon
              className="pointer-events-none absolute -bottom-14 -left-12 h-44 w-40 -rotate-6 text-honey/10"
              strokeWidth={3}
            />
            <div className="relative">
              <p className="font-mono text-[11px] uppercase tracking-[0.3em] text-ember sm:text-xs">
                La narrativa Colmena
              </p>
              <h3 className="mt-4 font-display text-3xl font-black uppercase leading-[0.95] tracking-tight sm:text-4xl lg:text-5xl">
                DISTINTOS TALENTOS.
                <br />
                <span className="text-honey">UN RESULTADO COMÚN.</span>
              </h3>
              <p className="mt-6 max-w-2xl text-base leading-relaxed text-white/70 sm:text-lg">
                En una colmena, ninguna abeja trabaja para sí misma. Cientos de
                acciones individuales, coordinadas y alineadas, logran un
                objetivo común. Así funcionan los mejores equipos.
              </p>
            </div>
          </div>
        </Reveal>

        {/* Differentiators */}
        <Reveal className="mt-20">
          <h3 className="font-display text-2xl font-black uppercase tracking-tight sm:text-3xl">
            LO QUE NOS DIFERENCIA
          </h3>
        </Reveal>
        <div className="mt-10 overflow-hidden rounded-2xl bg-bone">
          <div className="grid border-l border-t border-ink/10 sm:grid-cols-2 lg:grid-cols-3">
            {DIFERENCIADORES.map((item, i) => (
              <div key={item.number} className="border-b border-r border-ink/10 p-8">
                <Reveal delay={i * 0.06}>
                  <span className="relative inline-flex h-10 w-9 items-center justify-center">
                    <Hexagon
                      className="absolute inset-0 h-full w-full text-amber"
                      strokeWidth={6}
                    />
                    <span className="relative font-mono text-[11px] text-ink">
                      {item.number}
                    </span>
                  </span>
                  <h4 className="mt-5 font-display text-base font-black uppercase tracking-tight sm:text-lg">
                    {item.title}
                  </h4>
                  <p className="mt-2 text-sm leading-relaxed text-graphite sm:text-[15px]">
                    {item.description}
                  </p>
                </Reveal>
              </div>
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
}
