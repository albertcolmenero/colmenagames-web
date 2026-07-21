"use client";

import { useState } from "react";
import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import {
  ArrowRight,
  CheckCircle2,
  Instagram,
  Linkedin,
  Mail,
  Phone,
} from "lucide-react";
import type { ComponentType, FormEvent } from "react";
import { Container, CTAButton, Eyebrow, Reveal } from "./primitives";

type Status = "idle" | "sending" | "success" | "error";

const CONTACT_CHANNELS: {
  icon: ComponentType<{ className?: string }>;
  label: string;
  value: string;
  href: string;
  external?: boolean;
}[] = [
  {
    icon: Mail,
    label: "Email",
    value: "hola@colmena-experience.com",
    href: "mailto:hola@colmena-experience.com",
  },
  {
    icon: Phone,
    label: "Teléfono",
    value: "+34 623 286 976",
    href: "tel:+34623286976",
  },
  {
    icon: Linkedin,
    label: "LinkedIn",
    value: "Colmena Experience",
    href: "https://www.linkedin.com/company/colmena-experience",
    external: true,
  },
  {
    icon: Instagram,
    label: "Instagram",
    value: "@colmena_experience",
    href: "https://www.instagram.com/colmena_experience/",
    external: true,
  },
];

const PARTICIPANT_OPTIONS = [
  "10 – 25 personas",
  "26 – 50 personas",
  "51 – 100 personas",
  "+100 personas",
  "Aún no lo sé",
];

const labelStyles =
  "mb-1.5 block font-mono text-[10px] uppercase tracking-[0.2em] text-graphite";

const inputStyles =
  "w-full rounded-xl border border-ink/10 bg-bone px-4 py-3 text-sm outline-none transition-all focus:border-transparent focus:ring-2 focus:ring-honey placeholder:text-ink/30";

export function Contact() {
  const [status, setStatus] = useState<Status>("idle");

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    setStatus("sending");

    const payload = Object.fromEntries(new FormData(form).entries());

    try {
      const res = await fetch("https://formcarry.com/s/hTf-YiYRND_", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify(payload),
      });

      if (res.ok) {
        form.reset();
        setStatus("success");
      } else {
        setStatus("error");
      }
    } catch {
      setStatus("error");
    }
  }

  return (
    <section
      id="hablemos"
      className="relative overflow-hidden bg-cream py-24 sm:py-28 lg:py-36"
    >
      <Container>
        <div className="lg:grid lg:grid-cols-2 lg:items-start lg:gap-14">
          {/* Left column */}
          <div>
            <Reveal>
              <Eyebrow>07 / Hablemos</Eyebrow>
            </Reveal>

            <Reveal delay={0.06}>
              <h2 className="mt-5 font-display text-4xl font-black uppercase leading-[1.15] tracking-tight sm:text-5xl lg:text-6xl">
                Todo empieza aquí
              </h2>
            </Reveal>

            <Reveal delay={0.12}>
              <p className="mt-6 text-lg leading-relaxed text-ink/80">
                Cuéntanos qué tienes en mente y pensamos juntos la mejor forma
                de convertirlo en una experiencia que realmente funcione para tu
                equipo.
              </p>
              <p className="mt-4 leading-relaxed text-ink/70">
                Agenda una llamada de 30 minutos sin compromiso. Nos servirá
                para entender vuestro contexto, resolver dudas y proponeros
                ideas adaptadas a vuestro equipo.
              </p>
            </Reveal>

            <Reveal delay={0.18}>
              <h3 className="mt-10 font-mono text-xs uppercase tracking-[0.25em] text-cocoa">
                O escríbenos directamente
              </h3>

              <div className="mt-5 grid gap-3 sm:grid-cols-2">
                {CONTACT_CHANNELS.map(
                  ({ icon: Icon, label, value, href, external }) => (
                    <a
                      key={label}
                      href={href}
                      {...(external
                        ? { target: "_blank", rel: "noopener" }
                        : {})}
                      className="flex items-center gap-3.5 rounded-xl bg-white/70 px-4 py-3.5 ring-1 ring-ink/5 backdrop-blur transition-all hover:-translate-y-0.5 hover:bg-white hover:shadow-md"
                    >
                      <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-cream">
                        <Icon className="h-[18px] w-[18px] text-cocoa" />
                      </span>
                      <span className="flex flex-col">
                        <span className="font-mono text-[9px] uppercase tracking-[0.2em] text-graphite">
                          {label}
                        </span>
                        <span className="text-sm font-semibold text-ink">
                          {value}
                        </span>
                      </span>
                    </a>
                  )
                )}
              </div>
            </Reveal>

            <Reveal delay={0.24} className="hidden lg:block">
              <Image
                src="/new_website/bees-office.png"
                alt="Abejas trabajando en una oficina con forma de dado"
                width={1920}
                height={1080}
                sizes="576px"
                className="mt-10 h-auto w-full max-w-xl"
              />
            </Reveal>
          </div>

          {/* Right column — form card */}
          <Reveal delay={0.1} className="mt-14 lg:mt-0">
            <div className="rounded-3xl bg-white p-7 shadow-xl shadow-ink/10 ring-1 ring-ink/5 sm:p-10">
              <AnimatePresence mode="wait" initial={false}>
                {status === "success" ? (
                  <motion.div
                    key="success"
                    initial={{ opacity: 0, scale: 0.96 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.96 }}
                    transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                    className="rounded-2xl bg-butter p-6 text-center"
                  >
                    <CheckCircle2 className="mx-auto h-10 w-10 text-ember" />
                    <p className="mt-4 font-display text-xl font-black uppercase tracking-tight text-ink">
                      ¡Mensaje enviado!
                    </p>
                    <p className="mt-2 text-sm text-ink/70">
                      Te responderemos en menos de 24 h laborables.
                    </p>
                  </motion.div>
                ) : (
                  <motion.form
                    key="form"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    onSubmit={handleSubmit}
                  >
                    <div className="grid gap-4 sm:grid-cols-2">
                      <div>
                        <label htmlFor="contact-name" className={labelStyles}>
                          Nombre
                        </label>
                        <input
                          id="contact-name"
                          name="name"
                          type="text"
                          required
                          placeholder="Tu nombre"
                          className={inputStyles}
                        />
                      </div>
                      <div>
                        <label
                          htmlFor="contact-company"
                          className={labelStyles}
                        >
                          Empresa
                        </label>
                        <input
                          id="contact-company"
                          name="company"
                          type="text"
                          placeholder="Nombre de tu empresa"
                          className={inputStyles}
                        />
                      </div>
                    </div>

                    <div className="mt-4 grid gap-4 sm:grid-cols-2">
                      <div>
                        <label htmlFor="contact-email" className={labelStyles}>
                          Email
                        </label>
                        <input
                          id="contact-email"
                          name="email"
                          type="email"
                          required
                          placeholder="tu@empresa.com"
                          className={inputStyles}
                        />
                      </div>
                      <div>
                        <label htmlFor="contact-phone" className={labelStyles}>
                          Teléfono
                        </label>
                        <input
                          id="contact-phone"
                          name="phone"
                          type="tel"
                          placeholder="Opcional"
                          className={inputStyles}
                        />
                      </div>
                    </div>

                    <div className="mt-4">
                      <label
                        htmlFor="contact-participants"
                        className={labelStyles}
                      >
                        Nº de participantes
                      </label>
                      <select
                        id="contact-participants"
                        name="participants"
                        defaultValue=""
                        className={inputStyles}
                      >
                        <option value="" disabled>
                          Selecciona un rango
                        </option>
                        {PARTICIPANT_OPTIONS.map((option) => (
                          <option key={option} value={option}>
                            {option}
                          </option>
                        ))}
                      </select>
                    </div>

                    <div className="mt-4">
                      <label htmlFor="contact-message" className={labelStyles}>
                        Cuéntanos qué tienes en mente
                      </label>
                      <textarea
                        id="contact-message"
                        name="message"
                        rows={4}
                        required
                        placeholder="Tipo de evento, fecha aproximada, objetivo del equipo…"
                        className={inputStyles}
                      />
                    </div>

                    <div className="mt-6">
                      <CTAButton
                        type="submit"
                        variant="dark"
                        size="lg"
                        icon={ArrowRight}
                        className="w-full"
                        disabled={status === "sending"}
                      >
                        {status === "sending" ? "Enviando…" : "Enviar"}
                      </CTAButton>
                    </div>

                    {status === "error" && (
                      <p className="mt-3 text-sm text-red-600">
                        Algo ha fallado al enviar. Escríbenos a
                        hola@colmena-experience.com y te respondemos enseguida.
                      </p>
                    )}

                    <p className="mt-4 text-center text-xs font-light italic text-graphite">
                      Te responderemos en menos de 24 h laborables. Sin
                      compromiso y sin spam.
                    </p>
                  </motion.form>
                )}
              </AnimatePresence>
            </div>
          </Reveal>
        </div>
      </Container>
    </section>
  );
}
