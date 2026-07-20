"use client";

import Image from "next/image";
import { Instagram, Linkedin } from "lucide-react";
import { Container, Reveal } from "./primitives";

const NAV_COLUMNS = [
  {
    title: "EXPERIENCIA",
    links: [
      { label: "Empieza aquí", href: "#empieza-aqui" },
      { label: "Nuestra esencia", href: "#esencia" },
      { label: "Por qué Colmena", href: "#por-que-colmena" },
      { label: "Cómo trabajamos", href: "#como-trabajamos" },
      { label: "Experiencias", href: "#experiencias" },
    ],
  },
  {
    title: "EMPRESA",
    links: [
      { label: "Historias reales", href: "#historias-reales" },
      { label: "Conócenos", href: "#conocenos" },
      { label: "Hablemos", href: "#hablemos" },
    ],
  },
];

export function Footer() {
  return (
    <footer
      id="contacto"
      className="hex-texture relative overflow-hidden bg-ink text-white"
    >
      <Container className="py-16 sm:py-20">
        <div className="grid gap-12 lg:grid-cols-12">
          {/* Brand */}
          <Reveal className="lg:col-span-5">
            <div className="flex items-center gap-3.5">
              <Image
                src="/new_website/logo-white-trim.png"
                alt="Colmena Experience"
                width={1162}
                height={1225}
                sizes="96px"
                className="h-16 w-auto"
              />
              <div className="flex flex-col">
                <span className="font-display text-lg font-black tracking-[0.08em]">
                  COLMENA
                </span>
                <span className="font-mono text-[9px] tracking-[0.42em] text-honey">
                  EXPERIENCE
                </span>
              </div>
            </div>
            <p className="mt-6 max-w-sm text-sm leading-relaxed text-white/55">
              Team buildings flexibles y adaptados para empresas que quieren
              fortalecer equipos, fomentar la participación y disfrutar
              compartiendo experiencias.
            </p>
            <p className="mt-5 font-display text-xl font-black uppercase tracking-tight text-honey">
              DIVERSIÓN CON PROPÓSITO.
            </p>
          </Reveal>

          {/* Navigation */}
          <Reveal delay={0.1} className="lg:col-span-7">
            <div className="grid grid-cols-2 gap-10 sm:grid-cols-3">
              {NAV_COLUMNS.map((column) => (
                <div key={column.title}>
                  <p className="mb-5 font-mono text-[10px] uppercase tracking-[0.3em] text-white/40">
                    {column.title}
                  </p>
                  <nav>
                    {column.links.map((link) => (
                      <a
                        key={link.href}
                        href={link.href}
                        className="block py-1.5 text-sm text-white/75 transition-colors hover:text-honey"
                      >
                        {link.label}
                      </a>
                    ))}
                  </nav>
                </div>
              ))}

              <div>
                <p className="mb-5 font-mono text-[10px] uppercase tracking-[0.3em] text-white/40">
                  CONTACTO
                </p>
                <a
                  href="mailto:hola@colmena-experience.com"
                  className="block py-1.5 text-sm text-white/75 transition-colors hover:text-honey"
                >
                  hola@colmena-experience.com
                </a>
                <a
                  href="tel:+34623286976"
                  className="block py-1.5 text-sm text-white/75 transition-colors hover:text-honey"
                >
                  +34 623 286 976
                </a>
                <div className="mt-4 flex gap-3">
                  <a
                    href="https://www.linkedin.com/company/colmena-experience"
                    target="_blank"
                    rel="noopener"
                    aria-label="LinkedIn de Colmena Experience"
                    className="flex h-10 w-10 items-center justify-center rounded-full border border-white/15 transition-all hover:border-honey hover:text-honey"
                  >
                    <Linkedin className="h-4 w-4" />
                  </a>
                  <a
                    href="https://www.instagram.com/colmena_experience/"
                    target="_blank"
                    rel="noopener"
                    aria-label="Instagram de Colmena Experience"
                    className="flex h-10 w-10 items-center justify-center rounded-full border border-white/15 transition-all hover:border-honey hover:text-honey"
                  >
                    <Instagram className="h-4 w-4" />
                  </a>
                </div>
              </div>
            </div>
          </Reveal>
        </div>

        {/* Bottom bar */}
        <div className="mt-16 flex flex-col items-center justify-between gap-4 border-t border-white/10 pt-7 font-mono text-[10px] uppercase tracking-[0.18em] text-white/35 sm:flex-row">
          <p>© 2026 Colmena Experience. Todos los derechos reservados.</p>
          <p>Diseñado para equipos que quieren repetir.</p>
        </div>
      </Container>
    </footer>
  );
}
