export type Locale = "es" | "ca" | "en";

export type Member = {
  name: string;
  role: string;
  chips: string[];
  bio: string;
};

export type Copy = {
  meta: { title: string; description: string };
  header: {
    nav: {
      porQue: string;
      comoTrabajamos: string;
      experiencias: string;
      historias: string;
      conocenos: string;
    };
    cta: string;
  };
  hero: {
    eyebrow: string;
    h1line1: string;
    h1line2: string;
    /** may contain **bold** segments */
    subtitle: string;
    ctaPrimary: string;
    ctaSecondary: string;
    stats: [string, string, string];
  };
  esencia: {
    eyebrow: string;
    h2line1: string;
    h2line2: string;
    p1: string;
    p2: string;
    cta: string;
    narrativeLabel: string;
    narrativeLine1: string;
    narrativeLine2: string;
    narrativeText: string;
    difTitle: string;
    /** exactly 6 */
    diferenciadores: { title: string; desc: string }[];
  };
  why: {
    eyebrow: string;
    h2: string;
    intro: string;
    promiseQuote: string;
    promiseLabel: string;
    /** exactly 6, same order as icons in component */
    cards: { title: string; desc: string }[];
    cta: string;
  };
  process: {
    eyebrow: string;
    h2: string;
    subtitle: string;
    /** exactly 5, same order as icons in component */
    steps: { title: string; desc: string }[];
    closing1: string;
    closing2: string;
  };
  experiences: {
    eyebrow: string;
    h2: string;
    h3: string;
    intro: string;
    /** exactly 6, same order as icons/images in component */
    cards: { name: string; title: string; desc: string; chips: string[] }[];
    featured: {
      label: string;
      title: string;
      subtitle: string;
      desc: string;
      /** exactly 4 */
      specs: { label: string; value: string }[];
    };
    bandLine1: string;
    bandLine2: string;
    bandCta: string;
  };
  stories: {
    eyebrow: string;
    h2: string;
    intro: string;
    /** exactly 6 */
    testimonials: { quote: string; initials: string; name: string; role: string }[];
    cta: string;
  };
  team: {
    eyebrow: string;
    h2: string;
    lead: string;
    /** exactly 4 story paragraphs */
    paragraphs: string[];
    equipoTitle: string;
    equipoIntro: string;
    /** exactly 6, same order as photos in component */
    members: Member[];
  };
  contact: {
    eyebrow: string;
    h2: string;
    p1: string;
    p2: string;
    directTitle: string;
    channels: { email: string; whatsapp: string; linkedin: string; instagram: string };
    form: {
      name: string;
      namePh: string;
      company: string;
      companyPh: string;
      email: string;
      emailPh: string;
      phone: string;
      phonePh: string;
      participants: string;
      participantsPh: string;
      /** exactly 5 */
      participantOptions: string[];
      message: string;
      messagePh: string;
      submit: string;
      sending: string;
      note: string;
      successTitle: string;
      successText: string;
      errorText: string;
    };
  };
  footer: {
    tagline: string;
    claim: string;
    colExperiencia: string;
    colEmpresa: string;
    colContacto: string;
    linkPorQue: string;
    linkComo: string;
    linkExperiencias: string;
    linkHistorias: string;
    linkConocenos: string;
    linkHablemos: string;
    copyright: string;
    designedFor: string;
  };
};
