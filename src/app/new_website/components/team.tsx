"use client";

import Image from "next/image";
import { Chip, Container, Eyebrow, Reveal } from "./primitives";

const STORY_PARAGRAPHS = [
  "Nació con María, una persona que siempre encontraba una excusa para reunir a la gente. Era quien preparaba las fiestas de cumpleaños de sus amigos, quien diseñaba los juegos para las cenas de Navidad y quien disfrutaba viendo cómo personas muy diferentes acababan riendo, colaborando y creando recuerdos juntas.",
  "Con el tiempo comprendió que aquello no era solo una afición, sino la forma en la que quería aportar valor a los demás. Después de darle muchas vueltas, decidió convertir su pasión en su profesión y pidió ayuda a las personas que más confiaban en ese sueño.",
  "Así nació Colmena Experience: un proyecto construido por emprendedores, docentes, especialistas en gestión de proyectos, marketing y finanzas unidos por una misma idea: crear experiencias con propósito, capaces de conectar a personas de una forma auténtica.",
  "Hoy seguimos creciendo con la misma ilusión con la que empezamos. Adaptamos cada experiencia a las personas, al momento y a los objetivos de cada equipo. Porque creemos que cuando una experiencia está pensada con intención, no solo se disfruta: se recuerda, se comparte y deja huella.",
];

const MEMBERS: {
  photo: string;
  name: string;
  role: string;
  chips: string[];
  bio: string;
}[] = [
  {
    photo: "/new_website/team/maria.png",
    name: "Maria Colmenero",
    role: "CEO & Founder",
    chips: ["Liderazgo", "Desarrollo", "Propósito"],
    bio: "María encuentra el propósito detrás de cada experiencia. Cree que una gran experiencia empieza mucho antes del día del evento: empieza escuchando. Su experiencia de más de una década liderando equipos le permite comprender la realidad de tu equipo, detectar sus necesidades y encontrar el propósito que dará sentido a la experiencia. A partir de ahí, lidera el diseño de cada propuesta y coordina con el resto del equipo creativo todo el proceso para que solo tengáis que hacer una cosa: disfrutar de una experiencia creada especialmente para vosotros.",
  },
  {
    photo: "/new_website/team/marta.png",
    name: "Marta Forés",
    role: "Business Strategy & Coaching",
    chips: ["Estrategia", "Liderazgo", "Coaching"],
    bio: "Marta aporta la visión estratégica que da dirección y coherencia a Colmena Experience. Cree que un gran proyecto necesita mucho más que una buena idea: necesita comprender a las personas, responder a una necesidad real y construirse sobre una base sólida. Con más de 15 años de experiencia en estrategia, finanzas, liderazgo y coaching, aporta una mirada que combina visión empresarial y desarrollo humano. Como Coach acreditada por la International Coaching Federation (ICF), acompaña a Colmena para mantener el equilibrio entre los objetivos del cliente, la experiencia de las personas y la esencia de cada proyecto.",
  },
  {
    photo: "/new_website/team/laia.png",
    name: "Laia Ferrandis",
    role: "Creative Experience Designer",
    chips: ["Creatividad", "Innovación", "Dinamización"],
    bio: "Laia aporta una mirada fresca y creativa a cada experiencia. Forma parte del equipo creativo junto a María y Mireia, colaborando en el diseño de propuestas capaces de sorprender, emocionar y conectar con las personas. Además, con más de 10 años de experiencia dinamizando grupos, sabe cómo conseguir que las personas se impliquen desde el primer momento. Su capacidad para leer al grupo, adaptar el ritmo de cada dinámica y contagiar su entusiasmo hace que cada experiencia fluya de forma natural y se viva con intensidad.",
  },
  {
    photo: "/new_website/team/alberto.png",
    name: "Alberto Ruiz",
    role: "Identidad visual & Producción de eventos",
    chips: ["Diseño de marca", "Diseño gráfico", "Escenografía"],
    bio: "Beto transforma las ideas en una identidad visual que da personalidad a cada experiencia. Como creador de la imagen de la marca, es quien consigue que cada experiencia mantenga la personalidad y el cuidado por el detalle que nos caracteriza. Además, coordina la producción de los eventos para que todo funcione exactamente como fue diseñado. Su experiencia en el diseño gráfico y la producción de experiencias le permite convertir cada idea en un espacio, una imagen y una puesta en escena que refuerzan el propósito de cada evento.",
  },
  {
    photo: "/new_website/team/mireia.png",
    name: "Mireia Nagel",
    role: "Event Manager",
    chips: ["Creatividad", "Storytelling", "Diseño de experiencias"],
    bio: "Mireia convierte las ideas en experiencias con intención. Trabaja mano a mano con María para transformar cada concepto en una propuesta única, adaptándola a las necesidades, los objetivos y la personalidad de cada equipo. Diseña las historias que dan sentido a cada experiencia, desarrolla dinámicas con propósito y coordina cada detalle para que el evento fluya de principio a fin. Graduada en Educación, aporta una mirada que combina creatividad, narrativa y aprendizaje para crear experiencias que conectan con las personas y dejan huella.",
  },
  {
    photo: "/new_website/team/judith.png",
    name: "Judith Aluja",
    role: "Head de Comunicación",
    chips: ["Atención al cliente", "Dinamización", "Comunicación"],
    bio: "Judith cree que las mejores experiencias empiezan cuando las personas se sienten cómodas. Por eso acompaña cada dinámica con naturalidad, cercanía y una energía contagiosa, creando un ambiente donde participar resulta fácil y conectar con los demás surge de forma espontánea. Su pasión por las personas y su capacidad para crear conexiones y hacer que todos se sientan parte del grupo convierten cada experiencia en un recuerdo auténtico y compartido.",
  },
  

];

export function Team() {
  return (
    <section
      id="conocenos"
      className="relative overflow-hidden bg-white py-24 sm:py-28 lg:py-36"
    >
      <Image
        src="/new_website/pattern-dice.png"
        alt=""
        width={2000}
        height={2000}
        sizes="480px"
        aria-hidden="true"
        className="pointer-events-none absolute -right-40 -top-40 hidden h-[480px] w-[480px] opacity-[0.05] lg:block"
      />

      <Container className="relative">
        {/* Part 1 — Nuestra historia */}
        <Reveal>
          <Eyebrow>06 / Conócenos</Eyebrow>
          <h2 className="mt-6 font-display text-4xl font-black uppercase leading-[1.15] tracking-tight sm:text-5xl lg:text-6xl">
            Nuestra historia
          </h2>
        </Reveal>

        <Reveal delay={0.08}>
          <p className="mt-8 font-display text-xl font-bold normal-case tracking-tight sm:text-2xl">
            Colmena Experience nació mucho antes de organizar su primer evento.
          </p>
        </Reveal>

        <Reveal delay={0.14}>
          <div className="mt-6 gap-12 text-[15px] leading-relaxed text-ink/75 sm:text-base lg:columns-2">
            {STORY_PARAGRAPHS.map((paragraph) => (
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
              Conoce al equipo detrás de cada experiencia
            </h3>
            <p className="mt-5 max-w-3xl text-base leading-relaxed text-ink/70 sm:text-lg">
              Cada experiencia que creamos nace con un propósito. No diseñamos
              actividades porque sí, sino momentos pensados para acercar
              personas, despertar emociones y crear recuerdos que permanezcan
              mucho después de que el evento termine. Detrás de cada experiencia
              hay un equipo apasionado que escucha, imagina y cuida cada detalle
              para transformar una idea en algo único.
            </p>
          </Reveal>

          <div className="mt-14 grid gap-x-8 gap-y-14 sm:grid-cols-2 lg:grid-cols-3">
            {MEMBERS.map((member, i) => (
              <Reveal key={member.name} delay={(i % 3) * 0.06}>
                <div className="relative">
                  <div
                    className="absolute inset-0 translate-x-2.5 translate-y-2.5 rounded-2xl bg-honey"
                    aria-hidden="true"
                  />
                  <div className="relative z-10 aspect-[4/5] overflow-hidden rounded-2xl border-[3px] border-ink">
                    <Image
                      src={member.photo}
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
