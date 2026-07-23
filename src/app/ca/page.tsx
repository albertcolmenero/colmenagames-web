import type { Metadata } from "next";
import ca from "@/i18n/ca";
import { Site } from "@/components/site";

export const metadata: Metadata = {
  title: ca.meta.title,
  description: ca.meta.description,
  alternates: {
    languages: {
      es: "/",
      ca: "/ca",
      en: "/en",
    },
  },
};

export default function CatalanPage() {
  return <Site copy={ca} locale="ca" />;
}
