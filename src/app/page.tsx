import type { Metadata } from "next";
import es from "@/i18n/es";
import { Site } from "@/components/site";

export const metadata: Metadata = {
  title: es.meta.title,
  description: es.meta.description,
  alternates: {
    languages: {
      es: "/",
      ca: "/ca",
      en: "/en",
    },
  },
};

export default function HomePage() {
  return <Site copy={es} locale="es" />;
}
