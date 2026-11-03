import type { Metadata } from "next";
import { Archivo, Figtree, Space_Mono } from "next/font/google";
import { GoogleAnalytics } from "@next/third-parties/google";
import { Analytics } from "@vercel/analytics/next";
import { SITE_ORIGIN } from "@/lib/blog.mjs";
import es from "@/i18n/es";
import "./globals.css";

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
  metadataBase: new URL(SITE_ORIGIN),
  title: es.meta.title,
  description: es.meta.description,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es">
      <body
        className={`${archivo.variable} ${figtree.variable} ${spaceMono.variable} nw-root font-body text-ink antialiased`}
      >
        <script
          // Deterministic rendering for visual-QA captures (?noanim)
          dangerouslySetInnerHTML={{
            __html: `if(location.search.indexOf('noanim')>-1)document.documentElement.classList.add('nw-noanim');`,
          }}
        />
        {children}
        <Analytics />
        <GoogleAnalytics gaId="G-JY174GZ57Y" />
      </body>
    </html>
  );
}
