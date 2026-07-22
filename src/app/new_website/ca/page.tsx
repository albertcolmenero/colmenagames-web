import type { Metadata } from "next";
import ca from "../i18n/ca";
import { Site } from "../components/site";

export const metadata: Metadata = {
  title: ca.meta.title,
  description: ca.meta.description,
  alternates: {
    languages: {
      es: "/new_website",
      ca: "/new_website/ca",
      en: "/new_website/en",
    },
  },
};

export default function NewWebsiteCatalanPage() {
  return <Site copy={ca} locale="ca" />;
}
