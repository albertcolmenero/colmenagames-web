"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { CalendarClock } from "lucide-react";
import { nav } from "@/content/site";

/**
 * Píldora flotante "Agenda una llamada" que aparece tras salir el hero
 * y se oculta al llegar al contacto.
 */
export function DockedCTA() {
  const reduce = useReducedMotion();
  const [show, setShow] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY;
      const doc = document.documentElement;
      const nearBottom = y + window.innerHeight > doc.scrollHeight - 900;
      setShow(y > window.innerHeight * 0.9 && !nearBottom);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          initial={{ opacity: 0, y: reduce ? 0 : 24, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: reduce ? 0 : 24, scale: 0.95 }}
          transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
          className="fixed bottom-5 left-1/2 z-40 -translate-x-1/2 lg:bottom-7"
        >
          <Link
            href={nav.cta.href}
            className="group inline-flex items-center gap-2.5 rounded-full bg-ink px-6 py-3.5 font-semibold text-paper shadow-soft ring-1 ring-white/10 transition-colors hover:bg-amber hover:text-ink"
          >
            <CalendarClock className="h-4 w-4 text-amber transition-colors group-hover:text-ink" />
            {nav.cta.label}
          </Link>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
