import type { Metadata } from "next";
import es from "./i18n/es";
import { Site } from "./components/site";

export const metadata: Metadata = {
  title: es.meta.title,
  description: es.meta.description,
  alternates: {
    languages: {
      es: "/new_website",
      ca: "/new_website/ca",
      en: "/new_website/en",
    },
  },
};

export default function NewWebsitePage() {
  return <Site copy={es} locale="es" />;
}
