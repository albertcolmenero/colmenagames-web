import Link from "next/link";
import { Linkedin, Instagram, Mail, Phone } from "lucide-react";
import { Logo } from "@/components/brand/Logo";
import { footer, company } from "@/content/site";

export function Footer() {
  return (
    <footer className="relative overflow-hidden bg-ink text-paper grain">
      <div className="absolute inset-0 bg-honeycomb-dark opacity-60" aria-hidden="true" />
      <div className="container-edge relative py-16">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-12">
          {/* Marca */}
          <div className="lg:col-span-5">
            <Logo variant="light" />
            <p className="mt-6 max-w-sm text-[1.02rem] leading-relaxed text-paper/70">
              {footer.description}
            </p>
            <p className="mt-6 font-display text-2xl uppercase text-amber">
              {footer.tagline}
            </p>
          </div>

          {/* Columnas de enlaces */}
          {footer.columns.map((col) => (
            <nav key={col.title} aria-label={col.title} className="lg:col-span-2">
              <h2 className="font-mono-label uppercase text-paper/50">{col.title}</h2>
              <ul className="mt-4 space-y-2.5">
                {col.links.map((l) => (
                  <li key={l.href}>
                    <Link
                      href={l.href}
                      className="text-paper/80 transition-colors hover:text-amber"
                    >
                      {l.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          ))}

          {/* Contacto */}
          <div className="lg:col-span-3">
            <h2 className="font-mono-label uppercase text-paper/50">Contacto</h2>
            <ul className="mt-4 space-y-3">
              <li>
                <a href={`mailto:${company.email}`} className="flex items-center gap-2.5 text-paper/80 transition-colors hover:text-amber">
                  <Mail className="h-4 w-4" /> {company.email}
                </a>
              </li>
              <li>
                <a href={`tel:${company.phoneHref}`} className="flex items-center gap-2.5 text-paper/80 transition-colors hover:text-amber">
                  <Phone className="h-4 w-4" /> {company.phone}
                </a>
              </li>
            </ul>
            <div className="mt-5 flex gap-3">
              <a
                href={company.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="LinkedIn de Colmena Experience"
                className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-white/15 text-paper transition-colors hover:border-amber hover:bg-amber hover:text-ink"
              >
                <Linkedin className="h-4 w-4" />
              </a>
              <a
                href={company.instagram}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram de Colmena Experience"
                className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-white/15 text-paper transition-colors hover:border-amber hover:bg-amber hover:text-ink"
              >
                <Instagram className="h-4 w-4" />
              </a>
            </div>
          </div>
        </div>

        {/* Barra legal */}
        <div className="mt-14 flex flex-col gap-3 border-t border-white/10 pt-6 sm:flex-row sm:items-center sm:justify-between">
          <p className="font-mono-label uppercase text-paper/45">{footer.legal}</p>
          <p className="font-mono-label uppercase text-paper/45">{footer.madeWith}</p>
        </div>
      </div>
    </footer>
  );
}
