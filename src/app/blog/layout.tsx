import es from "@/i18n/es";
import { LocaleProvider } from "@/i18n/context";
import { Header } from "@/components/header";
import { Contact } from "@/components/contact";
import { Footer } from "@/components/footer";

export default function BlogLayout({ children }: { children: React.ReactNode }) {
  return (
    <LocaleProvider copy={es} locale="es">
      <Header linkPrefix="/" onPageContact />
      {children}
      <Contact />
      <Footer linkPrefix="/" onPageContact />
    </LocaleProvider>
  );
}
