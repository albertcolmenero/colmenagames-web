import type { Metadata } from "next";
import en from "../i18n/en";
import { Site } from "../components/site";

export const metadata: Metadata = {
  title: en.meta.title,
  description: en.meta.description,
  alternates: {
    languages: {
      es: "/new_website",
      ca: "/new_website/ca",
      en: "/new_website/en",
    },
  },
};

export default function NewWebsiteEnglishPage() {
  return <Site copy={en} locale="en" />;
}
