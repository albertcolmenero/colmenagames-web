import type { Metadata, Viewport } from "next";
import { Archivo_Black, Hanken_Grotesk, Geist_Mono } from "next/font/google";
import { company, seo } from "@/content/site";
import "./globals.css";

// Display: grotesca pesada (titulares póster, mayúsculas) — fiel a la marca
const archivoBlack = Archivo_Black({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-archivo",
  display: "swap",
});

// Texto/UI: grotesca cálida y legible
const hanken = Hanken_Grotesk({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  variable: "--font-hanken",
  display: "swap",
});

// Monoespaciada: índices editoriales, paginadores, unidades
const geistMono = Geist_Mono({
  subsets: ["latin"],
  weight: ["400", "500"],
  variable: "--font-geist-mono",
  display: "swap",
});

export const viewport: Viewport = {
  themeColor: "#1a1917",
  width: "device-width",
  initialScale: 1,
};

export const metadata: Metadata = {
  metadataBase: new URL(company.url),
  title: {
    default: seo.title,
    template: seo.titleTemplate,
  },
  description: seo.description,
  keywords: [...seo.keywords],
  authors: [{ name: company.name }],
  creator: company.name,
  publisher: company.name,
  applicationName: company.name,
  alternates: {
    canonical: company.url,
  },
  category: "business",
  formatDetection: { telephone: true, email: true, address: true },
  openGraph: {
    type: "website",
    locale: seo.locale,
    url: company.url,
    siteName: company.name,
    title: seo.title,
    description: seo.description,
    // La imagen OG se genera dinámicamente en src/app/opengraph-image.tsx
  },
  twitter: {
    card: "summary_large_image",
    title: seo.title,
    description: seo.description,
    site: seo.twitterHandle,
    creator: seo.twitterHandle,
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
  // El icono se detecta automáticamente desde src/app/icon.svg
};

/** Datos estructurados (Schema.org) para rich snippets */
function StructuredData() {
  const json = {
    "@context": "https://schema.org",
    "@type": "ProfessionalService",
    "@id": `${company.url}/#organization`,
    name: company.name,
    description: seo.description,
    url: company.url,
    email: company.email,
    telephone: company.phone,
    image: `${company.url}/opengraph-image`,
    logo: `${company.url}/icon.svg`,
    priceRange: "€€",
    areaServed: { "@type": "Country", name: "España" },
    address: {
      "@type": "PostalAddress",
      addressLocality: company.city,
      addressRegion: company.region,
      addressCountry: "ES",
    },
    sameAs: [company.linkedin, company.instagram],
    knowsLanguage: ["es", "ca", "en"],
    slogan: "Diversión con propósito",
    makesOffer: {
      "@type": "Offer",
      itemOffered: {
        "@type": "Service",
        name: "Team building para empresas",
        serviceType: "Experiencias de team building y eventos corporativos",
      },
    },
  };
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(json) }}
    />
  );
}

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="es"
      className={`${archivoBlack.variable} ${hanken.variable} ${geistMono.variable}`}
    >
      <head>
        <StructuredData />
      </head>
      <body className="antialiased">{children}</body>
    </html>
  );
}
