"use client";

import { motion, useReducedMotion, type Variants } from "framer-motion";
import { cn } from "@/lib/utils";

/**
 * Tagline encuadrada por corchetes (estilo dossier).
 * Los corchetes se "dibujan" al entrar en viewport.
 */
export function BracketTagline({
  children,
  tone = "dark",
  className,
}: {
  children: React.ReactNode;
  tone?: "dark" | "light";
  className?: string;
}) {
  const reduce = useReducedMotion();
  const color = tone === "light" ? "var(--color-paper)" : "var(--color-ink)";

  const draw: Variants = {
    hidden: { pathLength: 0, opacity: 0 },
    show: {
      pathLength: 1,
      opacity: 1,
      transition: {
        duration: reduce ? 0.2 : 0.9,
        ease: [0.16, 1, 0.3, 1] as [number, number, number, number],
      },
    },
  };

  return (
    <div className={cn("relative inline-block px-7 py-5", className)}>
      <motion.svg
        className="pointer-events-none absolute inset-0 h-full w-full"
        viewBox="0 0 100 100"
        preserveAspectRatio="none"
        fill="none"
        aria-hidden="true"
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, margin: "-60px" }}
      >
        {/* corchete izquierdo */}
        <motion.path
          d="M14 2 L2 2 L2 98 L14 98"
          stroke={color}
          strokeWidth="0.9"
          vectorEffect="non-scaling-stroke"
          variants={draw}
        />
        {/* corchete derecho */}
        <motion.path
          d="M86 2 L98 2 L98 98 L86 98"
          stroke={color}
          strokeWidth="0.9"
          vectorEffect="non-scaling-stroke"
          variants={draw}
        />
      </motion.svg>
      <div className="relative">{children}</div>
    </div>
  );
}

/** Palabra resaltada con barra ámbar (acción) que se dibuja al entrar */
export function HiAmber({ children }: { children: React.ReactNode }) {
  return <span className="mark-highlight font-semibold">{children}</span>;
}

/** Palabra resaltada con barra azul (valor) — fiel al dossier */
export function HiBlue({ children }: { children: React.ReactNode }) {
  return <span className="mark-blue font-semibold">{children}</span>;
}
