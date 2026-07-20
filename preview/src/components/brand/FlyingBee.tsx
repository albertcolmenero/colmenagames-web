"use client";

import { motion, useReducedMotion } from "framer-motion";
import { Bee } from "./icons";
import { cn } from "@/lib/utils";

/**
 * Abeja flotante con micro-recorrido. Decorativa y discreta.
 * Si el usuario prefiere menos movimiento, queda estática.
 */
export function FlyingBee({
  className,
  size = 40,
  delay = 0,
  duration = 9,
  drift = 24,
}: {
  className?: string;
  size?: number;
  delay?: number;
  duration?: number;
  drift?: number;
}) {
  const reduce = useReducedMotion();

  if (reduce) {
    return (
      <span className={cn("pointer-events-none absolute", className)} aria-hidden="true">
        <Bee style={{ width: size, height: size }} />
      </span>
    );
  }

  return (
    <motion.span
      className={cn("pointer-events-none absolute", className)}
      aria-hidden="true"
      initial={{ opacity: 0 }}
      animate={{
        opacity: [0, 1, 1, 1, 0.9],
        x: [0, drift * 0.6, drift, drift * 0.4, 0],
        y: [0, -drift * 0.5, drift * 0.2, drift * 0.5, 0],
        rotate: [6, -5, 9, -3, 6],
      }}
      transition={{
        duration,
        delay,
        repeat: Infinity,
        ease: "easeInOut",
      }}
    >
      <Bee style={{ width: size, height: size }} />
    </motion.span>
  );
}
