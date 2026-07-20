import { cn } from "@/lib/utils";

/**
 * Logotipo Colmena Experience.
 * Marca = dado con cara de panal (juego + colmena) + wordmark.
 * `variant` controla el color del texto según el fondo.
 */
export function Logo({
  className,
  variant = "dark",
  showTagline = false,
}: {
  className?: string;
  variant?: "dark" | "light";
  showTagline?: boolean;
}) {
  const textColor = variant === "light" ? "text-paper" : "text-ink";
  return (
    <span className={cn("inline-flex items-center gap-2.5 select-none", className)}>
      <DiceMark className="h-9 w-9 shrink-0" />
      <span className="flex flex-col leading-none">
        <span
          className={cn(
            "font-display font-extrabold tracking-tight text-[1.18rem] leading-none",
            textColor
          )}
        >
          Colmena
        </span>
        <span
          className={cn(
            "eyebrow text-[0.58rem] tracking-[0.34em] mt-0.5",
            variant === "light" ? "text-honey-soft" : "text-cocoa"
          )}
        >
          {showTagline ? "Diversión con propósito" : "Experience"}
        </span>
      </span>
    </span>
  );
}

/** Marca aislada (dado de panal) */
export function DiceMark({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 100 100" fill="none" aria-hidden="true" className={className}>
      <rect x="6" y="6" width="88" height="88" rx="22" fill="var(--color-amber)" />
      <rect x="6" y="6" width="88" height="88" rx="22" fill="url(#lg)" />
      <defs>
        <linearGradient id="lg" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#fff" stopOpacity="0.3" />
          <stop offset="1" stopColor="#5a3e2b" stopOpacity="0.18" />
        </linearGradient>
      </defs>
      {/* cara de panal: 5 hexágonos como pips */}
      {[
        [33, 33],
        [67, 33],
        [50, 50],
        [33, 67],
        [67, 67],
      ].map(([cx, cy], i) => (
        <path
          key={i}
          d={hexAt(cx, cy, 9)}
          fill="var(--color-ink)"
        />
      ))}
    </svg>
  );
}

/** Genera un path hexagonal centrado en (cx,cy) con radio r */
function hexAt(cx: number, cy: number, r: number) {
  const pts = Array.from({ length: 6 }, (_, i) => {
    const a = (Math.PI / 3) * i - Math.PI / 6;
    return `${(cx + r * Math.cos(a)).toFixed(2)},${(cy + r * Math.sin(a)).toFixed(2)}`;
  });
  return `M${pts.join("L")}Z`;
}
