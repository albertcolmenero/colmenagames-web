import { LocaleProvider } from "../i18n/context";
import type { Copy, Locale } from "../i18n/types";
import { Header } from "./header";
import { Hero } from "./hero";
import { Esencia } from "./esencia";
import { WhyColmena } from "./why-colmena";
import { Process } from "./process";
import { Experiences } from "./experiences";
import { Stories } from "./stories";
import { Team } from "./team";
import { Contact } from "./contact";
import { Footer } from "./footer";

export function Site({ copy, locale }: { copy: Copy; locale: Locale }) {
  return (
    <LocaleProvider copy={copy} locale={locale}>
      <main>
        <Header />
        <Hero />
        <Esencia />
        <WhyColmena />
        <Process />
        <Experiences />
        <Stories />
        <Team />
        <Contact />
        <Footer />
      </main>
    </LocaleProvider>
  );
}
