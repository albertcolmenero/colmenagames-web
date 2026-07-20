/**
 * ============================================================================
 *  COLMENA EXPERIENCE — FUENTE ÚNICA DE CONTENIDO
 * ============================================================================
 *  Todo el texto visible de la web vive aquí. Edita este archivo para
 *  cambiar cualquier copy, dato de contacto o etiqueta SEO sin tocar los
 *  componentes. Idioma: español (España).
 * ============================================================================
 */

export const company = {
  name: "Colmena Experience",
  legalName: "Colmena Experience",
  domain: "colmena-experience.com",
  url: "https://www.colmena-experience.com",
  email: "hola@colmenaexperience.com",
  phone: "+34 623 286 976",
  phoneHref: "+34623286976",
  whatsappHref: "https://wa.me/34623286976",
  instagram: "https://www.instagram.com/colmena_experience",
  instagramHandle: "@colmena_experience",
  linkedin: "https://www.linkedin.com/company/colmena-experience",
  city: "Barcelona",
  region: "Cataluña",
  country: "España",
  // Idiomas en los que se facilitan las experiencias
  languages: ["Catalán", "Castellano", "Inglés"],
} as const;

/** Metadatos para SEO, Open Graph y datos estructurados */
export const seo = {
  title: "Colmena Experience | Team building flexible para empresas",
  titleTemplate: "%s | Colmena Experience",
  description:
    "Team buildings flexibles y adaptados para empresas que quieren fortalecer equipos, fomentar la participación y disfrutar compartiendo experiencias. Diversión con propósito, sin complicaciones para RR. HH.",
  keywords: [
    "team building empresas",
    "team building Barcelona",
    "dinámicas de equipo",
    "actividades de empresa",
    "eventos corporativos",
    "experiencias para equipos",
    "team building flexible",
    "escape room empresas",
    "cohesión de equipos",
    "RRHH team building",
  ],
  ogImageAlt:
    "Colmena Experience — Aquí pasan cosas. Team buildings flexibles para empresas.",
  locale: "es_ES",
  twitterHandle: "@colmena_experience",
} as const;

/** Navegación principal. Los href apuntan a anclas de las secciones. */
export const nav = {
  ariaLabel: "Navegación principal",
  links: [
    { label: "Esencia", href: "#esencia" },
    { label: "Experiencias", href: "#experiencias" },
    { label: "Cómo trabajamos", href: "#proceso" },
    { label: "Casos reales", href: "#casos" },
    { label: "Formatos", href: "#formatos" },
  ],
  cta: { label: "Agenda una llamada", href: "#contacto" },
} as const;

export const hero = {
  eyebrow: "Team building para empresas",
  // Titular en dos líneas para el impacto tipográfico
  titleLine1: "Aquí",
  titleLine2: "pasan cosas",
  // Frase encuadrada (estilo dossier) con palabras destacadas
  framedLead: {
    before: "Team buildings ",
    h1: "flexibles",
    mid: " y adaptados para empresas que quieren fortalecer ",
    h2: "equipos",
    mid2: ", fomentar la participación y disfrutar ",
    h3: "compartiendo experiencias",
    after: ".",
  },
  ctaPrimary: { label: "Agenda una llamada de 30 min", href: "#contacto" },
  ctaSecondary: { label: "Ver experiencias", href: "#experiencias" },
  // Mini-pruebas de confianza bajo el hero
  trust: [
    "+50 experiencias facilitadas",
    "Equipos de 10 a 300 personas",
    "Catalán · Castellano · Inglés",
  ],
  scrollHint: "Desliza",
} as const;

/** Marquesina de logos / sectores (prueba social ligera, sin saturar) */
export const clientsStrip = {
  label: "Equipos que ya han vivido la experiencia",
  names: [
    "Decathlon",
    "Zegna",
    "Gameloft",
    "Checkpoint Systems",
    "Change Lingerie",
    "Escola Lola Anglada",
  ],
} as const;

export const esencia = {
  id: "esencia",
  eyebrow: "Nuestra esencia",
  title: "Cada equipo es distinto.",
  titleAccent: "La experiencia también debería serlo.",
  lead: "Seleccionamos y adaptamos nuestras experiencias para que encajen con las personas, el momento y los objetivos de cada empresa. De forma sencilla, ágil y sin generar más trabajo para tu equipo.",
  paragraphs: [
    "No vendemos juegos sueltos ni packs rígidos. Partimos de formatos y mecánicas que sabemos que funcionan, los combinamos y los adaptamos al perfil real del grupo, al contexto de la organización y al mood del día.",
    "El resultado: una experiencia fácil de organizar, fluida de vivir y difícil de olvidar.",
  ],
  // La metáfora de la colmena
  metaphor: {
    title: "Distintos talentos. Un resultado común.",
    text: "En una colmena, ninguna abeja trabaja para sí misma. Cientos de acciones individuales, coordinadas y alineadas, logran un objetivo común. Así funcionan los mejores equipos.",
  },
  // Lo que nos diferencia (chips)
  diferenciadores: {
    title: "Lo que nos diferencia",
    items: [
      {
        title: "Experiencias que enganchan",
        text: "Curiosidad, participación y energía de principio a fin.",
      },
      {
        title: "Flexibilidad real",
        text: "Diseñamos una estructura, pero sabemos leer la sala y adaptar el ritmo al grupo.",
      },
      {
        title: "Diseño cuidado y ejecución impecable",
        text: "Estética, materiales y facilitación al servicio de la experiencia.",
      },
      {
        title: "Criterio, intención y propósito",
        text: "Nada está ahí por casualidad. Cada dinámica tiene un motivo.",
      },
      {
        title: "Entendemos los equipos",
        text: "Porque los hemos liderado. Facilitadores con experiencia real en empresa.",
      },
      {
        title: "Diversión sin infantilizar",
        text: "Propuestas dinámicas y participativas, pensadas para equipos adultos.",
      },
    ],
  },
} as const;

export const porQue = {
  id: "por-que",
  eyebrow: "Por qué Colmena",
  title: "Te lo ponemos fácil para que el evento funcione.",
  lead: "Quien contrata no compra solo una dinámica. Compra tranquilidad. Por eso acompañamos a RR. HH. antes, durante y después para que todo salga bien.",
  // Promesa central destacada
  promise: "Prometemos dos cosas: pocas complicaciones y muchas sonrisas.",
  benefits: [
    {
      title: "Pocas complicaciones",
      text: "Un proceso ágil y claro. Tú nos cuentas la fecha y el objetivo; nosotros nos ocupamos del resto.",
    },
    {
      title: "Cero riesgo de que salga mal",
      text: "Criterio, ensayo y ejecución cuidada. Sabemos llevar grupos y leer el momento.",
    },
    {
      title: "Participación real",
      text: "Dinámicas que enganchan a todos los perfiles, incluso a los que dicen que no van a participar.",
    },
    {
      title: "Adaptado a tu equipo",
      text: "Ajustamos ritmo, dinámicas y energía según el grupo, no al revés.",
    },
    {
      title: "Diversión con propósito",
      text: "Se trata de pasarlo bien juntos y que, además, algo se mueva en el equipo.",
    },
    {
      title: "Presupuesto bien invertido",
      text: "Equipos más conectados, recuerdos compartidos y la sensación clara de haber acertado.",
    },
  ],
} as const;

export const proceso = {
  id: "proceso",
  eyebrow: "Cómo trabajamos",
  title: "Un proceso simple y sencillo.",
  lead: "Porque una buena experiencia debería ser fácil de organizar y difícil de olvidar.",
  steps: [
    {
      num: "01",
      title: "Escuchamos",
      text: "Conocemos el perfil del equipo, el momento que vive la organización y qué se quiere conseguir con la experiencia.",
    },
    {
      num: "02",
      title: "Diseñamos",
      text: "Creamos la propuesta adecuada. Seleccionamos y adaptamos las dinámicas, formatos y actividades que mejor encajan con el grupo.",
    },
    {
      num: "03",
      title: "Coordinamos",
      text: "Nos ocupamos de todos los detalles: materiales, timings, logística y coordinación con el venue o la empresa.",
    },
    {
      num: "04",
      title: "Facilitamos",
      text: "Damos vida a la experiencia. Guiamos la actividad con dinamización profesional, cuidando el ritmo y la participación.",
    },
    {
      num: "05",
      title: "Feedback y aprendizajes",
      text: "Analizamos la experiencia e identificamos los principales aprendizajes y conclusiones cuando el formato lo requiere.",
    },
  ],
  closing: "Tú te ocupas de la fecha. Nosotros de que todo el mundo quiera repetir.",
} as const;

export const experiencias = {
  id: "experiencias",
  eyebrow: "Nuestras experiencias",
  title: "Diseñamos experiencias para distintos formatos, objetivos y perfiles de equipo.",
  lead: "Seis tipologías para imaginar posibilidades. ¿Tienes algo distinto en mente? Te escuchamos: nos encanta crear nuevos retos.",
  types: [
    {
      tag: "01",
      title: "Misterio e investigación",
      text: "Retos colaborativos donde los equipos descubren pistas, resuelven enigmas y avanzan juntos hacia una solución.",
      examples: ["Cluedo en vivo", "Murder Mystery", "Robo en el Museo", "CSI"],
      featured: "Royal Velvet Casino",
    },
    {
      tag: "02",
      title: "Competición por equipos",
      text: "Formatos dinámicos donde distintos equipos compiten en pruebas diseñadas para fomentar participación, energía y celebración.",
      examples: ["Music Battle", "TV Show Experience", "Olympic Games"],
      featured: "Music Battle",
    },
    {
      tag: "03",
      title: "Creativas y de construcción colectiva",
      text: "Actividades donde el grupo crea algo en conjunto, potenciando creatividad, colaboración y sentimiento de pertenencia.",
      examples: ["Creation Lab", "Identidad de equipo", "Mural colectivo"],
      featured: "Character Creation Lab",
    },
    {
      tag: "04",
      title: "Retos y resolución de problemas",
      text: "Dinámicas donde colaboración, comunicación y toma de decisiones son clave para superar desafíos contrarreloj.",
      examples: ["Escape Room", "Misión secreta", "Operación rescate"],
      featured: "Escape Room: Protocolo Cassette",
    },
    {
      tag: "05",
      title: "Conectar personas",
      text: "Diseñadas para romper el hielo, generar conversaciones y fortalecer relaciones entre personas que apenas se conocen.",
      examples: ["Unlock the Team", "Networking Games", "Afterworks", "Onboarding"],
      featured: "Unlock the Team",
    },
    {
      tag: "06",
      title: "Inmersivas con storytelling",
      text: "Historias, personajes y narrativas que convierten a los participantes en protagonistas de una experiencia compartida.",
      examples: ["Viajes en el tiempo", "Misiones futuristas", "Expediciones legendarias"],
      featured: "Inside Out: Historia Interactiva",
    },
  ],
  // Experiencia destacada (caso de ejemplo)
  spotlight: {
    eyebrow: "Experiencia destacada",
    title: "Royal Velvet Casino",
    subtitle: "Misterio e investigación — Cluedo en vivo",
    text: "Una cena de gala. Un crimen inesperado. Un casino lleno de secretos. Los asistentes se convierten en investigadores y colaboran para descubrir al culpable a través de pistas, personajes y pruebas repartidas por todo el evento.",
    specs: [
      { label: "Formato", value: "Cluedo en vivo inmersivo" },
      { label: "Duración", value: "90 – 120 min" },
      { label: "Participantes", value: "20 – 200 personas" },
      { label: "Espacio", value: "Cenas de empresa, hoteles, fincas" },
    ],
  },
  cta: { label: "Pídenos una recomendación", href: "#contacto" },
} as const;

export const testimonios = {
  id: "casos",
  eyebrow: "Casos reales",
  title: "Equipos que ya confiaron en nosotros.",
  lead: "Esto es lo que dicen las personas que organizaron la experiencia y los equipos que la vivieron.",
  items: [
    {
      quote:
        "Todo el proceso fue ágil y facilísimo de gestionar. Desde el primer momento sentimos que podíamos despreocuparnos de todo porque lo tenían completamente controlado. El día del evento salió perfecto y el equipo lo disfrutó muchísimo.",
      author: "C. García",
      role: "Director de Tienda",
      org: "Decathlon",
    },
    {
      quote:
        "Un acierto total. Sabíamos la temática que buscábamos y la llevaron al siguiente nivel: vídeos, actuaciones durante toda la noche, decoración, juegos… Una experiencia muy inmersiva y divertida. Sin duda, un 10.",
      author: "P. Martí",
      role: "People & Culture",
      org: "Checkpoint Systems",
    },
    {
      quote:
        "Consiguieron que personas que apenas se conocían acabaran interactuando de forma natural durante toda la tarde.",
      author: "M. Franco",
      role: "HR Manager",
      org: "Gameloft",
    },
    {
      quote:
        "Una dinámica personalizada que nos ha enganchado desde el minuto uno.",
      author: "G. Arienzo",
      role: "Store Manager",
      org: "Zegna",
    },
    {
      quote:
        "Dinamización de alto nivel, nos lo hemos pasado muy bien. La gente siguió hablando de la experiencia durante semanas.",
      author: "A. Armanani",
      role: "General Manager",
      org: "Change Lingerie",
    },
    {
      quote:
        "Se nota muchísimo cuando una experiencia está pensada específicamente para tu empresa.",
      author: "A. Trujillo",
      role: "Directora",
      org: "Escola Lola Anglada",
    },
  ],
} as const;

export const formatos = {
  id: "formatos",
  eyebrow: "Formatos y presupuestos",
  title: "Porque no todos los equipos necesitan lo mismo.",
  lead: "Cada propuesta se ajusta al formato, las necesidades y los objetivos del evento. Estas cifras son orientativas para dimensionar la inversión.",
  tiers: [
    { range: "10 – 25 personas", price: "desde 45 €", unit: "/ persona" },
    { range: "26 – 50 personas", price: "desde 35 €", unit: "/ persona" },
    { range: "51 – 100 personas", price: "desde 30 €", unit: "/ persona" },
    { range: "+100 personas", price: "Consultar", unit: "formato" },
  ],
  note: "El presupuesto final se define según el grado de personalización, la duración, los materiales, el número de facilitadores o actores, el espacio, la producción, el merchandising y los recursos técnicos necesarios.",
  cta: { label: "Pide tu propuesta a medida", href: "#contacto" },
} as const;

export const equipo = {
  id: "equipo",
  eyebrow: "Quiénes somos",
  title: "Entendemos los equipos porque los hemos liderado.",
  lead: "Detrás de Colmena hay personas con trayectoria real diseñando experiencias, dinamizando grupos y liderando equipos en entornos de empresa. Esa experiencia es la que convierte una buena idea en un evento que funciona.",
  points: [
    "Facilitadores con experiencia liderando equipos en entornos corporativos.",
    "Diseño de experiencias y dinamización profesional.",
    "Criterio para leer el grupo y adaptar el ritmo en tiempo real.",
  ],
} as const;

export const contacto = {
  id: "contacto",
  eyebrow: "Hablemos",
  title: "¿Hablamos?",
  lead: "Cuéntanos qué tienes en mente y pensamos juntos la mejor forma de convertirlo en una experiencia que realmente funcione para tu equipo.",
  subLead:
    "Agenda una llamada de 30 minutos sin compromiso. Nos servirá para entender vuestro contexto, resolver dudas y proponeros ideas adaptadas a vuestro equipo.",
  form: {
    name: { label: "Nombre", placeholder: "Tu nombre" },
    company: { label: "Empresa", placeholder: "Nombre de tu empresa" },
    email: { label: "Email", placeholder: "tu@empresa.com" },
    phone: { label: "Teléfono", placeholder: "Opcional" },
    people: {
      label: "Nº de participantes",
      placeholder: "Selecciona un rango",
      options: ["10 – 25", "26 – 50", "51 – 100", "+100", "Aún no lo sé"],
    },
    message: {
      label: "Cuéntanos qué tienes en mente",
      placeholder: "Tipo de evento, fecha aproximada, objetivo del equipo…",
    },
    submit: "Enviar y agendar llamada",
    disclaimer:
      "Te responderemos en menos de 24 h laborables. Sin compromiso y sin spam.",
    success: "¡Gracias! Hemos recibido tu mensaje. Te contactamos en menos de 24 h.",
  },
  // Datos de contacto directos
  directTitle: "O escríbenos directamente",
  channels: [
    { label: "Email", value: company.email, href: `mailto:${company.email}` },
    { label: "Teléfono", value: company.phone, href: `tel:${company.phoneHref}` },
    { label: "LinkedIn", value: "Colmena Experience", href: company.linkedin },
    {
      label: "Instagram",
      value: company.instagramHandle,
      href: company.instagram,
    },
  ],
} as const;

export const footer = {
  tagline: "Diversión con propósito.",
  description:
    "Team buildings flexibles y adaptados para empresas que quieren fortalecer equipos, fomentar la participación y disfrutar compartiendo experiencias.",
  columns: [
    {
      title: "Experiencia",
      links: [
        { label: "Nuestra esencia", href: "#esencia" },
        { label: "Experiencias", href: "#experiencias" },
        { label: "Cómo trabajamos", href: "#proceso" },
      ],
    },
    {
      title: "Empresa",
      links: [
        { label: "Casos reales", href: "#casos" },
        { label: "Formatos y precios", href: "#formatos" },
        { label: "Contacto", href: "#contacto" },
      ],
    },
  ],
  cta: { label: "Agenda una llamada", href: "#contacto" },
  legal: `© ${new Date().getFullYear()} Colmena Experience. Todos los derechos reservados.`,
  madeWith: "Diseñado para equipos que quieren repetir.",
} as const;
