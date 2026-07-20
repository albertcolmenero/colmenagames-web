import { clientsStrip } from "@/content/site";

/** Banda de confianza B2B justo bajo el hero (wordmarks monocromos). */
export function ClientsStrip() {
  return (
    <section aria-label={clientsStrip.label} className="border-y border-ink/10 bg-white">
      <div className="container-edge py-7">
        <div className="flex flex-col items-center gap-6 lg:flex-row lg:gap-12">
          <p className="shrink-0 font-mono-label uppercase text-stone text-center lg:text-left">
            {clientsStrip.label}
          </p>
          <ul className="flex flex-1 flex-wrap items-center justify-center gap-x-10 gap-y-4 lg:justify-between">
            {clientsStrip.names.map((name) => (
              <li
                key={name}
                className="font-display text-lg uppercase tracking-tight text-ink/35 transition-colors duration-300 hover:text-ink/70 sm:text-xl"
              >
                {name}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
