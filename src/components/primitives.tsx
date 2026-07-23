"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import type { ComponentType, ReactNode } from "react";

/* ---------------------------------- Layout --------------------------------- */

export function Container({
  className,
  children,
}: {
  className?: string;
  children: ReactNode;
}) {
  return (
    <div className={cn("mx-auto w-full max-w-6xl px-5 sm:px-8 lg:px-10", className)}>
      {children}
    </div>
  );
}

/* --------------------------------- Motion ---------------------------------- */

export function Reveal({
  children,
  delay = 0,
  y = 28,
  className,
}: {
  children: ReactNode;
  delay?: number;
  y?: number;
  className?: string;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.7, delay, ease: [0.22, 1, 0.36, 1] }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

/* -------------------------------- Typography -------------------------------- */

export function Eyebrow({
  children,
  light = false,
  className,
}: {
  children: ReactNode;
  light?: boolean;
  className?: string;
}) {
  return (
    <p
      className={cn(
        "flex items-center gap-3 font-mono text-[11px] uppercase tracking-[0.25em] sm:text-xs",
        light ? "text-honey" : "text-ember",
        className
      )}
    >
      <HexBullet className={cn("h-2.5 w-2.5 shrink-0", light ? "text-honey" : "text-ember")} />
      <span>{children}</span>
    </p>
  );
}

/* -------------------------------- Hexagons ---------------------------------- */

const HEX_PATH = "M50 2 L95 27.5 L95 84.5 L50 110 L5 84.5 L5 27.5 Z";

export function HexBullet({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 100 112" className={className} aria-hidden="true">
      <path d={HEX_PATH} fill="currentColor" />
    </svg>
  );
}

export function Hexagon({
  className,
  filled = false,
  strokeWidth = 5,
}: {
  className?: string;
  filled?: boolean;
  strokeWidth?: number;
}) {
  return (
    <svg viewBox="0 0 100 112" className={className} aria-hidden="true">
      <path
        d={HEX_PATH}
        fill={filled ? "currentColor" : "none"}
        stroke="currentColor"
        strokeWidth={filled ? 0 : strokeWidth}
        strokeLinejoin="round"
      />
    </svg>
  );
}

/**
 * Icon centered inside a hexagon.
 * variant "solid": honey-filled hexagon, ink icon (process steps).
 * variant "outline": stroked hexagon in currentColor, icon in currentColor.
 */
export function HexIcon({
  icon: Icon,
  variant = "solid",
  className,
  iconClassName,
}: {
  icon: ComponentType<{ className?: string }>;
  variant?: "solid" | "outline";
  className?: string;
  iconClassName?: string;
}) {
  return (
    <span className={cn("relative inline-flex items-center justify-center", className)}>
      <Hexagon
        filled={variant === "solid"}
        className={cn("absolute inset-0 h-full w-full", variant === "solid" && "text-honey")}
      />
      <Icon
        className={cn(
          "relative h-[38%] w-[38%]",
          variant === "solid" ? "text-ink" : "text-current",
          iconClassName
        )}
      />
    </span>
  );
}

/* ---------------------------------- Chips ----------------------------------- */

export function Chip({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full bg-cream px-3 py-1 font-mono text-[11px] leading-relaxed text-cocoa",
        className
      )}
    >
      {children}
    </span>
  );
}

/* --------------------------------- Buttons ----------------------------------- */

type CTAVariant = "gold" | "dark" | "outline" | "light";

const CTA_STYLES: Record<CTAVariant, string> = {
  gold: "bg-gold text-ink hover:bg-ink hover:text-white",
  dark: "bg-ink text-white hover:bg-gold hover:text-ink",
  outline:
    "border-2 border-ink bg-transparent text-ink hover:bg-ink hover:text-white",
  light: "bg-white text-ink hover:bg-honey hover:text-ink",
};

export function CTAButton({
  href,
  children,
  icon: Icon,
  variant = "gold",
  size = "md",
  className,
  onClick,
  type,
  disabled,
}: {
  href?: string;
  children: ReactNode;
  icon?: ComponentType<{ className?: string }>;
  variant?: CTAVariant;
  size?: "sm" | "md" | "lg";
  className?: string;
  onClick?: () => void;
  type?: "button" | "submit";
  disabled?: boolean;
}) {
  const classes = cn(
    "group inline-flex items-center justify-center gap-2.5 rounded-full font-semibold transition-all duration-300",
    "hover:-translate-y-0.5 hover:shadow-lg hover:shadow-ink/15 active:translate-y-0",
    size === "sm" && "px-5 py-2.5 text-sm",
    size === "md" && "px-7 py-3.5 text-sm sm:text-base",
    size === "lg" && "px-9 py-4 text-base sm:text-lg",
    CTA_STYLES[variant],
    disabled && "pointer-events-none opacity-60",
    className
  );

  const content = (
    <>
      {Icon && <Icon className="h-[1.15em] w-[1.15em] shrink-0" />}
      <span>{children}</span>
    </>
  );

  if (href) {
    return (
      <a href={href} className={classes} onClick={onClick}>
        {content}
      </a>
    );
  }
  return (
    <button type={type ?? "button"} className={classes} onClick={onClick} disabled={disabled}>
      {content}
    </button>
  );
}
