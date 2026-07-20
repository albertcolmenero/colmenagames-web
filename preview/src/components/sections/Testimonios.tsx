import { Section, Eyebrow } from "@/components/ui/Section";
import { Reveal } from "@/components/ui/Reveal";
import { Quote } from "lucide-react";
import { testimonios } from "@/content/site";

export function Testimonios() {
  return (
    <Section id={testimonios.id} index="05" label="Casos reales" tone="gold">
      <div className="pt-16 lg:pt-24">
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-12 lg:items-end">
          <div className="lg:col-span-8">
            <Reveal>
              <Eyebrow>{testimonios.eyebrow}</Eyebrow>
            </Reveal>
            <Reveal delay={0.05}>
              <h2 className="mt-6 max-w-2xl text-[clamp(2rem,4.6vw,3.8rem)] uppercase leading-[0.95] text-ink">
                {testimonios.title}
              </h2>
            </Reveal>
          </div>
          <div className="lg:col-span-4">
            <Reveal delay={0.1}>
              <p className="text-[1.02rem] leading-relaxed text-ink/70">
                {testimonios.lead}
              </p>
            </Reveal>
          </div>
        </div>

        {/* Masonry de testimonios */}
        <div className="mt-14 columns-1 gap-6 sm:columns-2 lg:columns-3 [&>*]:mb-6">
          {testimonios.items.map((t, i) => (
            <Reveal key={t.author} delay={(i % 3) * 0.06}>
              <figure className="break-inside-avoid rounded-3xl border border-ink/10 bg-white p-7 shadow-card">
                <Quote className="h-7 w-7 text-amber" aria-hidden="true" />
                <blockquote className="mt-4 text-[1.05rem] leading-relaxed text-ink/85">
                  {t.quote}
                </blockquote>
                <figcaption className="mt-6 flex items-center gap-3 border-t border-ink/10 pt-5">
                  <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-ink font-display text-sm uppercase text-amber">
                    {t.author.replace(/[^A-Za-zÀ-ÿ]/g, "").slice(0, 2)}
                  </span>
                  <span className="leading-tight">
                    <span className="block font-semibold text-ink">{t.author}</span>
                    <span className="block text-sm text-stone">
                      {t.role} · {t.org}
                    </span>
                  </span>
                </figcaption>
              </figure>
            </Reveal>
          ))}
        </div>
      </div>
    </Section>
  );
}
