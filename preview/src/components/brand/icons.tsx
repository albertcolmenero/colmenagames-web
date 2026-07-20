/**
 * Sistema gráfico de marca: hexágonos, abejas, dados y panales.
 * SVGs ligeros, currentColor-friendly y decorativos (aria-hidden por defecto).
 */
import { cn } from "@/lib/utils";

type SvgProps = React.SVGProps<SVGSVGElement> & { className?: string };

/** Hexágono base (panal) */
export function Hexagon({ className, ...props }: SvgProps) {
  return (
    <svg
      viewBox="0 0 100 115"
      fill="none"
      aria-hidden="true"
      className={className}
      {...props}
    >
      <path
        d="M50 2L93.3 27v50L50 113 6.7 88V27L50 2Z"
        stroke="currentColor"
        strokeWidth="3"
        fill="none"
      />
    </svg>
  );
}

/** Hexágono relleno */
export function HexagonSolid({ className, ...props }: SvgProps) {
  return (
    <svg
      viewBox="0 0 100 115"
      fill="currentColor"
      aria-hidden="true"
      className={className}
      {...props}
    >
      <path d="M50 2L93.3 27v50L50 113 6.7 88V27L50 2Z" />
    </svg>
  );
}

/** Abeja adulta con toque divertido, no infantil */
export function Bee({ className, ...props }: SvgProps) {
  return (
    <svg
      viewBox="0 0 64 64"
      fill="none"
      aria-hidden="true"
      className={cn("text-ink", className)}
      {...props}
    >
      {/* alas */}
      <ellipse cx="24" cy="20" rx="11" ry="7" transform="rotate(-22 24 20)" fill="currentColor" opacity="0.16" />
      <ellipse cx="40" cy="20" rx="11" ry="7" transform="rotate(22 40 20)" fill="currentColor" opacity="0.16" />
      <ellipse cx="24" cy="20" rx="11" ry="7" transform="rotate(-22 24 20)" stroke="currentColor" strokeWidth="2" />
      <ellipse cx="40" cy="20" rx="11" ry="7" transform="rotate(22 40 20)" stroke="currentColor" strokeWidth="2" />
      {/* cuerpo */}
      <ellipse cx="32" cy="38" rx="13" ry="16" fill="var(--color-amber)" stroke="currentColor" strokeWidth="2.4" />
      {/* franjas */}
      <path d="M21 33c7 3 15 3 22 0" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" />
      <path d="M20 41c8 3.5 16 3.5 24 0" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" />
      <path d="M23 49c6 2.5 12 2.5 18 0" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" />
      {/* antenas */}
      <path d="M27 23c-2-5-5-7-8-7M37 23c2-5 5-7 8-7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
      <circle cx="18.5" cy="15.5" r="2" fill="currentColor" />
      <circle cx="45.5" cy="15.5" r="2" fill="currentColor" />
    </svg>
  );
}

/** Dado con caras de panal (elemento de marca: juego + colmena) */
export function Dice({ className, pips = 5, ...props }: SvgProps & { pips?: number }) {
  const layouts: Record<number, [number, number][]> = {
    1: [[50, 50]],
    2: [[32, 32], [68, 68]],
    3: [[30, 30], [50, 50], [70, 70]],
    4: [[32, 32], [68, 32], [32, 68], [68, 68]],
    5: [[30, 30], [70, 30], [50, 50], [30, 70], [70, 70]],
    6: [[32, 28], [68, 28], [32, 50], [68, 50], [32, 72], [68, 72]],
  };
  const dots = layouts[pips] ?? layouts[5];
  return (
    <svg
      viewBox="0 0 100 100"
      fill="none"
      aria-hidden="true"
      className={className}
      {...props}
    >
      <rect x="8" y="8" width="84" height="84" rx="18" fill="var(--color-amber)" stroke="var(--color-ink)" strokeWidth="3.5" />
      <rect x="8" y="8" width="84" height="84" rx="18" fill="url(#diceShade)" />
      <defs>
        <linearGradient id="diceShade" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#fff" stopOpacity="0.25" />
          <stop offset="1" stopColor="#000" stopOpacity="0.12" />
        </linearGradient>
      </defs>
      {dots.map(([cx, cy], i) => (
        <circle key={i} cx={cx} cy={cy} r="7" fill="var(--color-ink)" />
      ))}
    </svg>
  );
}

/** Línea de recorrido punteada (journey) */
export function DottedPath({ className, ...props }: SvgProps) {
  return (
    <svg
      viewBox="0 0 600 60"
      fill="none"
      aria-hidden="true"
      preserveAspectRatio="none"
      className={className}
      {...props}
    >
      <path
        d="M0 30C120 -6 200 66 300 30C400 -6 480 66 600 30"
        stroke="currentColor"
        strokeWidth="2.5"
        strokeDasharray="2 12"
        strokeLinecap="round"
      />
    </svg>
  );
}
