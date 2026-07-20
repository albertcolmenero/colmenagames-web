import type { Metadata } from "next";
import { Archivo, Figtree, Space_Mono } from "next/font/google";
import "./new-website.css";

const archivo = Archivo({
  subsets: ["latin"],
  variable: "--font-archivo",
});

const figtree = Figtree({
  subsets: ["latin"],
  variable: "--font-figtree",
});

const spaceMono = Space_Mono({
  subsets: ["latin"],
  weight: ["400", "700"],
  variable: "--font-space-mono",
});

export const metadata: Metadata = {
  title: "Team building para empresas en Barcelona y alrededores | Colmena Experience",
  description:
    "Diseñamos experiencias de team building para empresas en Barcelona, Madrid y alrededores. Actividades flexibles, divertidas y fáciles de organizar, siempre con propósito.",
};

export default function NewWebsiteLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div
      className={`${archivo.variable} ${figtree.variable} ${spaceMono.variable} nw-root font-body text-ink antialiased`}
    >
      {children}
    </div>
  );
}
