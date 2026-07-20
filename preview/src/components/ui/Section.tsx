import { cn } from "@/lib/utils";

/**
 * Envoltorio de sección con "chrome" editorial estilo dossier:
 * - regla superior fina + eyebrow a dos partes (nombre · dominio)
 * - índice mono "01 / NUESTRA ESENCIA"
 * - paginador inferior "04 / 09"
 */
export function Section({
  id,
  index,
  total = "09",
  label,
  tone = "paper",
  className,
  children,
}: {
  id?: string;
  index: string;
  total?: string;
  label: string;
  tone?: "paper" | "gold" | "ink" | "gray" | "white";
  className?: string;
  children: React.ReactNode;
}) {
  const tones: Record<string, string> = {
    paper: "bg-paper text-ink",
    white: "bg-white text-ink",
    gold: "bg-honey-soft text-ink",
    gray: "bg-line/60 text-ink",
    ink: "bg-ink text-paper",
  };
  const ruleColor =
    tone === "ink" ? "border-white/15" : "border-ink/15";
  const metaColor = tone === "ink" ? "text-paper/55" : "text-stone";

  return (
    <section
      id={id}
      className={cn("relative overflow-hidden", tones[tone], className)}
    >
      <div className="container-edge">
        {/* Eyebrow runner */}
        <div
          className={cn(
            "flex items-center justify-between border-t pt-4",
            ruleColor
          )}
        >
          <span className={cn("font-mono-label uppercase", metaColor)}>
            {index} / {label}
          </span>
          <span
            className={cn(
              "font-mono-label uppercase tracking-[0.16em] hidden sm:block",
              metaColor
            )}
          >
            colmena-experience.com
          </span>
        </div>

        {children}

        {/* Paginador inferior */}
        <div
          className={cn(
            "flex items-center justify-between border-t pt-4 pb-6 mt-12",
            ruleColor
          )}
        >
          <span className={cn("font-mono-label", metaColor)}>
            {index} / {total}
          </span>
          <span className={cn("font-mono-label uppercase", metaColor)}>
            Aquí pasan cosas
          </span>
        </div>
      </div>
    </section>
  );
}

/** Eyebrow de marca (etiqueta de sección con punto ámbar) */
export function Eyebrow({
  children,
  tone = "dark",
  className,
}: {
  children: React.ReactNode;
  tone?: "dark" | "light";
  className?: string;
}) {
  return (
    <span
      className={cn(
        "eyebrow inline-flex items-center gap-2.5",
        tone === "light" ? "text-paper/70" : "text-cocoa",
        className
      )}
    >
      <span className="h-2 w-2 rotate-45 bg-amber" aria-hidden="true" />
      {children}
    </span>
  );
}
