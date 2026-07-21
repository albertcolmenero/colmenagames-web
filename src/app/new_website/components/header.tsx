"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import { CalendarDays, Globe, Menu, X } from "lucide-react";
import { cn } from "@/lib/utils";
import { CTAButton } from "./primitives";

const NAV_ITEMS = [
  { label: "Por qué Colmena", href: "#por-que-colmena" },
  { label: "Cómo trabajamos", href: "#como-trabajamos" },
  { label: "Experiencias", href: "#experiencias" },
  { label: "Historias reales", href: "#historias-reales" },
  { label: "Conócenos", href: "#conocenos" },
];

function Languages({ className }: { className?: string }) {
  return (
    <div
      className={cn(
        "flex items-center gap-2.5 font-mono text-[11px] tracking-[0.12em]",
        className
      )}
    >
      <Globe className="h-3.5 w-3.5 opacity-60" aria-hidden="true" />
      <span className="cursor-default opacity-40" title="Properament">
        CAT
      </span>
      <span className="font-bold underline decoration-ember decoration-2 underline-offset-4">
        ESP
      </span>
      <span className="cursor-default opacity-40" title="Coming soon">
        ENG
      </span>
    </div>
  );
}

export function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 transition-all duration-500",
        scrolled
          ? "bg-white/90 shadow-[0_1px_0_rgba(18,17,16,0.07)] backdrop-blur-md"
          : "bg-cream"
      )}
    >
      <div className="mx-auto flex h-[72px] w-full max-w-7xl items-center justify-between gap-6 px-5 sm:px-8">
        {/* Logo */}
        <a href="#empieza-aqui" className="flex shrink-0 items-center gap-3">
          <Image
            src="/new_website/logo-trim.png"
            alt="Colmena Experience"
            width={979}
            height={971}
            sizes="72px"
            className="h-11 w-auto"
            priority
          />
          <span className="hidden flex-col leading-none sm:flex">
            <span className="font-display text-base font-black tracking-[0.08em]">
              COLMENA
            </span>
            <span className="font-mono text-[9px] tracking-[0.42em] text-ember">
              EXPERIENCE
            </span>
          </span>
        </a>

        {/* Desktop nav */}
        <nav className="hidden items-center gap-7 lg:flex">
          {NAV_ITEMS.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="font-mono text-[11px] uppercase tracking-[0.14em] text-ink/70 transition-colors hover:text-ember"
            >
              {item.label}
            </a>
          ))}
        </nav>

        <div className="hidden items-center gap-6 md:flex">
          <Languages className="hidden xl:flex" />
          <CTAButton href="#hablemos" icon={CalendarDays} variant="dark" size="sm">
            ¿Hablamos?
          </CTAButton>
        </div>

        {/* Mobile toggle */}
        <button
          type="button"
          aria-label={open ? "Cerrar menú" : "Abrir menú"}
          onClick={() => setOpen((v) => !v)}
          className="inline-flex h-11 w-11 items-center justify-center rounded-full text-ink transition-colors hover:bg-ink/5 md:hidden"
        >
          {open ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
            className="absolute inset-x-0 top-full overflow-hidden border-t border-ink/10 bg-white shadow-xl shadow-ink/10 md:hidden"
          >
            <nav className="flex flex-col gap-1 px-5 py-6">
              {NAV_ITEMS.map((item, i) => (
                <motion.a
                  key={item.href}
                  href={item.href}
                  onClick={() => setOpen(false)}
                  initial={{ opacity: 0, x: -12 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.05 + i * 0.05 }}
                  className="rounded-xl px-4 py-3.5 font-display text-xl font-bold uppercase tracking-tight transition-colors hover:bg-butter"
                >
                  {item.label}
                </motion.a>
              ))}
              <div className="mt-4 flex items-center justify-between px-4">
                <Languages />
                <CTAButton
                  href="#hablemos"
                  icon={CalendarDays}
                  variant="dark"
                  size="sm"
                  onClick={() => setOpen(false)}
                >
                  ¿Hablamos?
                </CTAButton>
              </div>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
