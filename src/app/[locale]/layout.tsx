import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { Analytics } from '@vercel/analytics/next';
import { NextIntlClientProvider } from 'next-intl';
import { getMessages } from 'next-intl/server';
import { routing } from '@/i18n/routing';
import { notFound } from 'next/navigation';
import "../globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export function generateStaticParams() {
  return routing.locales.map((locale) => ({locale}));
}

export const metadata: Metadata = {
  title: "Colmena Experience | Experiències Gamificades que Connecten Persones",
  description: "Creem experiències gamificades a mida per a equips, empreses i celebracions. Especialistes en team-building, dinàmiques grupals i esdeveniments únics que transformen i connecten persones.",
  keywords: "team building, gamificació, experiències grupals, dinàmiques d'equip, esdeveniments corporatius, celebracions, jocs grupals",
  authors: [{ name: "Colmena Experience" }],
  openGraph: {
    title: "Colmena Experience | Experiències Gamificades",
    description: "Juga. Connecta. Transforma el teu equip amb les nostres experiències gamificades úniques.",
    type: "website",
    locale: "ca_ES",
    siteName: "Colmena Experience"
  }
};

export default async function LocaleLayout({
  children,
  params
}: {
  children: React.ReactNode;
  params: Promise<{locale: string}>;
}) {
  const {locale} = await params;
  
  // Ensure that the incoming `locale` is valid
  if (!routing.locales.includes(locale as 'ca' | 'es')) {
    notFound();
  }

  // Providing all messages to the client
  // side is the easiest way to get started
  const messages = await getMessages();

  return (
    <html lang={locale}>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <NextIntlClientProvider messages={messages}>
          {children}
        </NextIntlClientProvider>
        <Analytics />
      </body>
    </html>
  );
}
