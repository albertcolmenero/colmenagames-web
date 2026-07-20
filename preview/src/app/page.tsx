import { Header } from "@/components/sections/Header";
import { Hero } from "@/components/sections/Hero";
import { ClientsStrip } from "@/components/sections/ClientsStrip";
import { Esencia } from "@/components/sections/Esencia";
import { PorQue } from "@/components/sections/PorQue";
import { Proceso } from "@/components/sections/Proceso";
import { Experiencias } from "@/components/sections/Experiencias";
import { Testimonios } from "@/components/sections/Testimonios";
import { Formatos } from "@/components/sections/Formatos";
import { Equipo } from "@/components/sections/Equipo";
import { Contacto } from "@/components/sections/Contacto";
import { Footer } from "@/components/sections/Footer";
import { DockedCTA } from "@/components/sections/DockedCTA";

export default function Home() {
  return (
    <>
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:rounded-full focus:bg-ink focus:px-5 focus:py-2.5 focus:text-paper"
      >
        Saltar al contenido
      </a>
      <Header />
      <main id="main" tabIndex={-1} className="outline-none">
        <Hero />
        <ClientsStrip />
        <Esencia />
        <PorQue />
        <Proceso />
        <Experiencias />
        <Testimonios />
        <Formatos />
        <Equipo />
        <Contacto />
      </main>
      <Footer />
      <DockedCTA />
    </>
  );
}
