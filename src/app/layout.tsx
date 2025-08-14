import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { Analytics } from '@vercel/analytics/next';
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Colmena Experience | Experiencias Gamificadas que Conectan Personas",
  description: "Creamos experiencias gamificadas a medida para equipos, empresas y celebraciones. Especialistas en team-building, dinámicas grupales y eventos únicos que transforman y conectan personas.",
  keywords: "team building, gamificación, experiencias grupales, dinámicas de equipo, eventos corporativos, celebraciones, juegos grupales",
  authors: [{ name: "Colmena Experience" }],
  openGraph: {
    title: "Colmena Experience | Experiencias Gamificadas",
    description: "Juega. Conecta. Transforma tu equipo con nuestras experiencias gamificadas únicas.",
    type: "website",
    locale: "es_ES",
    siteName: "Colmena Experience"
  }
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
        <Analytics />
      </body>
    </html>
  );
}
