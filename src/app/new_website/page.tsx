import { Header } from "./components/header";
import { Hero } from "./components/hero";
import { Esencia } from "./components/esencia";
import { WhyColmena } from "./components/why-colmena";
import { Process } from "./components/process";
import { Experiences } from "./components/experiences";
import { Stories } from "./components/stories";
import { Team } from "./components/team";
import { Contact } from "./components/contact";
import { Footer } from "./components/footer";

export default function NewWebsitePage() {
  return (
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
  );
}
