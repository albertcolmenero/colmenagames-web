import type { Metadata } from "next";
import en from "@/i18n/en";
import { Site } from "@/components/site";

export const metadata: Metadata = {
  title: en.meta.title,
  description: en.meta.description,
  alternates: {
    languages: {
      es: "/",
      ca: "/ca",
      en: "/en",
    },
  },
};

export default function EnglishPage() {
  return <Site copy={en} locale="en" />;
}
