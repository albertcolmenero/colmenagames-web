import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { cn } from "@/lib/utils";

type ButtonProps = {
  href: string;
  children: React.ReactNode;
  variant?: "amber" | "ink" | "ghost" | "light";
  size?: "md" | "lg";
  className?: string;
  icon?: boolean;
};

/**
 * CTA de marca. El ámbar se reserva para la acción principal.
 * Texto sobre ámbar siempre en tinta (contraste AA en tamaño grande).
 */
export function Button({
  href,
  children,
  variant = "amber",
  size = "md",
  className,
  icon = true,
}: ButtonProps) {
  const variants: Record<string, string> = {
    amber:
      "bg-amber text-ink hover:bg-amber-bright shadow-[0_10px_30px_-12px_rgba(246,166,2,0.7)]",
    ink: "bg-ink text-paper hover:bg-ink-700",
    light: "bg-paper text-ink hover:bg-white",
    ghost:
      "bg-transparent text-ink border border-ink/25 hover:border-ink hover:bg-ink hover:text-paper",
  };
  const sizes: Record<string, string> = {
    md: "px-6 py-3 text-[0.95rem]",
    lg: "px-8 py-4 text-base",
  };

  return (
    <Link
      href={href}
      className={cn(
        "group inline-flex items-center justify-center gap-2 rounded-full font-semibold tracking-tight transition-all duration-300 ease-out will-change-transform hover:-translate-y-0.5",
        variants[variant],
        sizes[size],
        className
      )}
    >
      {children}
      {icon && (
        <ArrowUpRight
          className="h-[1.05em] w-[1.05em] transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
          aria-hidden="true"
        />
      )}
    </Link>
  );
}
