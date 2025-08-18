import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Colmena Experience",
};

// The root layout is minimal since we use [locale] routing
export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html>
      <body>
        {children}
      </body>
    </html>
  );
}
