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
} from "lucide-react";
import type { ComponentType, FormEvent } from "react";
import { Container, CTAButton, Eyebrow, Reveal } from "./primitives";
import { useCopy } from "../i18n/context";

function WhatsAppIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden="true">
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
    </svg>
  );
}

type Status = "idle" | "sending" | "success" | "error";

const CONTACT_CHANNELS: {
  icon: ComponentType<{ className?: string }>;
  key: "email" | "whatsapp" | "linkedin" | "instagram";
  value: string;
  href: string;
  external?: boolean;
}[] = [
  {
    icon: Mail,
    key: "email",
    value: "hola@colmena-experience.com",
    href: "mailto:hola@colmena-experience.com",
  },
  {
    icon: WhatsAppIcon,
    key: "whatsapp",
    value: "+34 623 286 976",
    href: "https://wa.me/34623286976",
    external: true,
  },
  {
    icon: Linkedin,
    key: "linkedin",
    value: "Colmena Experience",
    href: "https://www.linkedin.com/company/colmena-experience",
    external: true,
  },
  {
    icon: Instagram,
    key: "instagram",
    value: "@colmena_experience",
    href: "https://www.instagram.com/colmena_experience/",
    external: true,
  },
];

const labelStyles =
  "mb-1.5 block font-mono text-[10px] uppercase tracking-[0.2em] text-graphite";

const inputStyles =
  "w-full rounded-xl border border-ink/10 bg-bone px-4 py-3 text-sm outline-none transition-all focus:border-transparent focus:ring-2 focus:ring-honey placeholder:text-ink/30";

export function Contact() {
  const { copy } = useCopy();
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
        <Reveal>
          <Eyebrow>{copy.contact.eyebrow}</Eyebrow>
          <h2 className="mt-5 font-display text-4xl font-black uppercase leading-[1.15] tracking-tight sm:text-5xl lg:text-6xl">
            {copy.contact.h2}
          </h2>
        </Reveal>

        <div className="mt-8 lg:grid lg:grid-cols-2 lg:items-start lg:gap-14">
          {/* Left column */}
          <div>
            <Reveal delay={0.12}>
              <p className="mt-6 text-lg leading-relaxed text-ink/80">
                {copy.contact.p1}
              </p>
              <p className="mt-4 leading-relaxed text-ink/70">
                {copy.contact.p2}
              </p>
            </Reveal>

            <Reveal delay={0.18}>
              <h3 className="mt-10 font-mono text-xs uppercase tracking-[0.25em] text-cocoa">
                {copy.contact.directTitle}
              </h3>

              <div className="mt-5 grid gap-3 sm:grid-cols-2">
                {CONTACT_CHANNELS.map(
                  ({ icon: Icon, key, value, href, external }) => (
                    <a
                      key={key}
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
                          {copy.contact.channels[key]}
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
                className="mt-2 h-auto w-full max-w-xl"
              />
            </Reveal>
          </div>

          {/* Right column — form card */}
          <Reveal delay={0.1} className="mt-14 lg:mt-0">
            <div className="mt-7 rounded-3xl bg-white p-7 shadow-xl shadow-ink/10 ring-1 ring-ink/5 sm:p-10">
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
                      {copy.contact.form.successTitle}
                    </p>
                    <p className="mt-2 text-sm text-ink/70">
                      {copy.contact.form.successText}
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
                          {copy.contact.form.name}
                        </label>
                        <input
                          id="contact-name"
                          name="name"
                          type="text"
                          required
                          placeholder={copy.contact.form.namePh}
                          className={inputStyles}
                        />
                      </div>
                      <div>
                        <label
                          htmlFor="contact-company"
                          className={labelStyles}
                        >
                          {copy.contact.form.company}
                        </label>
                        <input
                          id="contact-company"
                          name="company"
                          type="text"
                          placeholder={copy.contact.form.companyPh}
                          className={inputStyles}
                        />
                      </div>
                    </div>

                    <div className="mt-4 grid gap-4 sm:grid-cols-2">
                      <div>
                        <label htmlFor="contact-email" className={labelStyles}>
                          {copy.contact.form.email}
                        </label>
                        <input
                          id="contact-email"
                          name="email"
                          type="email"
                          required
                          placeholder={copy.contact.form.emailPh}
                          className={inputStyles}
                        />
                      </div>
                      <div>
                        <label htmlFor="contact-phone" className={labelStyles}>
                          {copy.contact.form.phone}
                        </label>
                        <input
                          id="contact-phone"
                          name="phone"
                          type="tel"
                          placeholder={copy.contact.form.phonePh}
                          className={inputStyles}
                        />
                      </div>
                    </div>

                    <div className="mt-4">
                      <label
                        htmlFor="contact-participants"
                        className={labelStyles}
                      >
                        {copy.contact.form.participants}
                      </label>
                      <select
                        id="contact-participants"
                        name="participants"
                        defaultValue=""
                        className={inputStyles}
                      >
                        <option value="" disabled>
                          {copy.contact.form.participantsPh}
                        </option>
                        {copy.contact.form.participantOptions.map((option) => (
                          <option key={option} value={option}>
                            {option}
                          </option>
                        ))}
                      </select>
                    </div>

                    <div className="mt-4">
                      <label htmlFor="contact-message" className={labelStyles}>
                        {copy.contact.form.message}
                      </label>
                      <textarea
                        id="contact-message"
                        name="message"
                        rows={4}
                        required
                        placeholder={copy.contact.form.messagePh}
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
                        {status === "sending"
                          ? copy.contact.form.sending
                          : copy.contact.form.submit}
                      </CTAButton>
                    </div>

                    {status === "error" && (
                      <p className="mt-3 text-sm text-red-600">
                        {copy.contact.form.errorText}
                      </p>
                    )}

                    <p className="mt-4 text-center text-xs font-light italic text-graphite">
                      {copy.contact.form.note}
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
