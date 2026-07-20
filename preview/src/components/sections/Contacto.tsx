"use client";

import { useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { ArrowUpRight, Check, Loader2 } from "lucide-react";
import { Eyebrow } from "@/components/ui/Section";
import { Bee } from "@/components/brand/icons";
import { contacto } from "@/content/site";
import { cn } from "@/lib/utils";

export function Contacto() {
  return (
    <section id={contacto.id} className="relative overflow-hidden bg-honey-soft text-ink">
      <div className="absolute inset-0 bg-honeycomb opacity-60" aria-hidden="true" />
      <div className="container-edge relative py-20 lg:py-28">
        <div className="grid grid-cols-1 gap-14 lg:grid-cols-12 lg:gap-16">
          {/* Lado izquierdo: swarm + invitación + canales */}
          <div className="lg:col-span-5">
            <Eyebrow>{contacto.eyebrow}</Eyebrow>
            <SwarmTitle />
            <p className="mt-6 max-w-md text-lg leading-relaxed text-ink/80">
              {contacto.lead}
            </p>
            <p className="mt-4 max-w-md text-[0.98rem] leading-relaxed text-ink/65">
              {contacto.subLead}
            </p>

            {/* Canales directos */}
            <div className="mt-10">
              <p className="font-mono-label uppercase text-cocoa">
                {contacto.directTitle}
              </p>
              <ul className="mt-4 grid grid-cols-1 gap-2.5 sm:grid-cols-2">
                {contacto.channels.map((c) => (
                  <li key={c.label}>
                    <a
                      href={c.href}
                      target={c.href.startsWith("http") ? "_blank" : undefined}
                      rel={c.href.startsWith("http") ? "noopener noreferrer" : undefined}
                      className="group flex items-center justify-between gap-3 rounded-xl border border-ink/15 bg-white/40 px-4 py-3 transition-all hover:border-ink hover:bg-white"
                    >
                      <span className="leading-tight">
                        <span className="block font-mono-label uppercase text-stone">
                          {c.label}
                        </span>
                        <span className="block text-sm font-semibold text-ink">
                          {c.value}
                        </span>
                      </span>
                      <ArrowUpRight className="h-4 w-4 text-ink/50 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Lado derecho: formulario */}
          <div className="lg:col-span-7">
            <ContactForm />
          </div>
        </div>
      </div>
    </section>
  );
}

/** Título con enjambre de abejas que converge formando un hexágono */
function SwarmTitle() {
  const reduce = useReducedMotion();
  // Vértices de un hexágono alrededor del título
  const vertices = [
    { x: "8%", y: "-12%" },
    { x: "92%", y: "-8%" },
    { x: "102%", y: "55%" },
    { x: "85%", y: "108%" },
    { x: "10%", y: "112%" },
    { x: "-6%", y: "50%" },
  ];

  return (
    <div className="relative mt-5 inline-block">
      {vertices.map((v, i) => (
        <motion.span
          key={i}
          className="pointer-events-none absolute"
          style={{ left: v.x, top: v.y }}
          aria-hidden="true"
          initial={
            reduce
              ? { opacity: 0.9 }
              : { opacity: 0, x: (i % 2 ? 120 : -120) - 40, y: i < 3 ? -100 : 100 }
          }
          whileInView={{ opacity: 0.95, x: 0, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{
            duration: reduce ? 0.3 : 1,
            delay: reduce ? 0 : 0.2 + i * 0.12,
            ease: [0.16, 1, 0.3, 1],
          }}
        >
          <motion.span
            animate={reduce ? {} : { y: [0, -5, 0], rotate: [0, 6, 0] }}
            transition={{ duration: 4 + i, repeat: Infinity, ease: "easeInOut" }}
            className="block"
          >
            <Bee className="h-7 w-7 text-ink" />
          </motion.span>
        </motion.span>
      ))}
      <h2 className="font-display text-[clamp(3rem,9vw,6rem)] uppercase leading-[0.9] text-ink">
        {contacto.title}
      </h2>
    </div>
  );
}

/** Formulario de contacto (controlado, con estado de envío) */
function ContactForm() {
  const f = contacto.form;
  const [status, setStatus] = useState<"idle" | "sending" | "done">("idle");

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setStatus("sending");
    // NOTA: conectar aquí el endpoint real (Formcarry, Resend, Calendly...).
    // De momento simulamos el envío para la preview.
    setTimeout(() => setStatus("done"), 900);
  };

  if (status === "done") {
    return (
      <div className="flex h-full min-h-[24rem] flex-col items-center justify-center rounded-3xl border border-ink/10 bg-white p-10 text-center shadow-soft">
        <span className="inline-flex h-16 w-16 items-center justify-center rounded-full bg-amber text-ink">
          <Check className="h-8 w-8" strokeWidth={3} />
        </span>
        <p className="mt-6 max-w-sm font-display text-2xl uppercase leading-tight text-ink">
          {f.success}
        </p>
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="rounded-3xl border border-ink/10 bg-white p-7 shadow-soft sm:p-9"
    >
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
        <Field id="name" label={f.name.label}>
          <input
            id="name"
            name="name"
            type="text"
            required
            placeholder={f.name.placeholder}
            className={inputCls}
          />
        </Field>
        <Field id="company" label={f.company.label}>
          <input
            id="company"
            name="company"
            type="text"
            required
            placeholder={f.company.placeholder}
            className={inputCls}
          />
        </Field>
        <Field id="email" label={f.email.label}>
          <input
            id="email"
            name="email"
            type="email"
            required
            placeholder={f.email.placeholder}
            className={inputCls}
          />
        </Field>
        <Field id="phone" label={f.phone.label}>
          <input
            id="phone"
            name="phone"
            type="tel"
            placeholder={f.phone.placeholder}
            className={inputCls}
          />
        </Field>
        <Field id="people" label={f.people.label} className="sm:col-span-2">
          <select id="people" name="people" defaultValue="" required className={cn(inputCls, "appearance-none")}>
            <option value="" disabled>
              {f.people.placeholder}
            </option>
            {f.people.options.map((o) => (
              <option key={o} value={o}>
                {o}
              </option>
            ))}
          </select>
        </Field>
        <Field id="message" label={f.message.label} className="sm:col-span-2">
          <textarea
            id="message"
            name="message"
            rows={4}
            placeholder={f.message.placeholder}
            className={cn(inputCls, "resize-none")}
          />
        </Field>
      </div>

      <button
        type="submit"
        disabled={status === "sending"}
        className="mt-7 inline-flex w-full items-center justify-center gap-2 rounded-full bg-ink px-8 py-4 font-semibold text-paper transition-all duration-300 hover:bg-amber hover:text-ink disabled:opacity-70 sm:w-auto"
      >
        {status === "sending" ? (
          <>
            <Loader2 className="h-4 w-4 animate-spin" /> Enviando…
          </>
        ) : (
          <>
            {f.submit} <ArrowUpRight className="h-4 w-4" />
          </>
        )}
      </button>
      <p className="mt-4 text-sm text-stone">{f.disclaimer}</p>
    </form>
  );
}

const inputCls =
  "w-full rounded-xl border border-ink/15 bg-paper/60 px-4 py-3 text-ink placeholder:text-stone/60 transition-colors focus:border-amber focus:bg-white focus:outline-none";

function Field({
  id,
  label,
  className,
  children,
}: {
  id: string;
  label: string;
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <div className={className}>
      <label htmlFor={id} className="mb-1.5 block font-mono-label uppercase text-stone">
        {label}
      </label>
      {children}
    </div>
  );
}
