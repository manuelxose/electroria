import rawLegacyBlogPosts from "./generated/legacy-blog-posts.json";

export type ContentOrigin =
  | "existing"
  | "inferred"
  | "proposed"
  | "pending_manual_validation";

export interface SeoEntry {
  title: string;
  description: string;
  path: string;
  keywords?: string[];
}

export interface NavEntry {
  label: string;
  path: string;
}

export interface MetricEntry {
  value: string;
  label: string;
  detail: string;
}

export interface FaqEntry {
  question: string;
  answer: string;
}

export interface ServiceEntry {
  key: string;
  slug: string;
  name: string;
  shortName: string;
  summary: string;
  heroTitle: string;
  heroIntro: string;
  badge: string;
  seo: SeoEntry;
  highlights: string[];
  deliverables: string[];
  sectors: string[];
  differentiators: string[];
  faqs: FaqEntry[];
  origin: ContentOrigin;
}

export interface HighlightCard {
  title: string;
  description: string;
}

export interface TestimonialEntry {
  name: string;
  role: string;
  company: string;
  quote: string;
}

export interface ProcessStep {
  title: string;
  description: string;
}

export interface CoverageEntry {
  title: string;
  description: string;
}

export interface ContentSection {
  title: string;
  paragraphs: string[];
  bullets?: string[];
}

export interface InfoPageEntry {
  key: string;
  eyebrow: string;
  title: string;
  intro: string;
  seo: SeoEntry;
  highlights?: HighlightCard[];
  sections: ContentSection[];
  faqs?: FaqEntry[];
  ctaLabel?: string;
  ctaPath?: string;
  origin: ContentOrigin;
}

type LegacyBlogPostRaw = {
  slug: string;
  title: string;
  summary: string;
  category: string;
  author: string;
  publishedAt: string;
  updatedAt: string;
  featuredImage: string;
  contentHtml: string;
  sourceUrl: string;
};

export interface BlogCategoryEntry {
  slug: string;
  label: string;
  description: string;
}

export interface BlogPostEntry {
  slug: string;
  title: string;
  summary: string;
  excerpt: string;
  category: string;
  categorySlug: string;
  author: string;
  publishedAt: string;
  updatedAt: string;
  featuredImage: string;
  contentHtml: string;
  readingTimeMinutes: number;
  seo: SeoEntry;
  sourceUrl: string;
  origin: ContentOrigin;
}

export interface LegacyRedirectEntry {
  from: string;
  to: string;
  statusCode: 301 | 302;
}

export const SITE_URL = "https://electroria.com";
export const SITE_NAME = "Electroria";
export const SITE_LEGAL_NAME = "Electroria";
export const SITE_EMAIL = "oficina@electroria.com";
export const SITE_PHONE = "+34682047802";
export const SITE_PHONE_LABEL = "682 04 78 02";
export const SITE_PHONE_ALT = "+34606992140";
export const SITE_PHONE_ALT_LABEL = "606 99 21 40";
export const SITE_ADDRESS = "Calle Alfonso XIII, 15, 36204 Vigo, Pontevedra";
export const SITE_REGION = "Vigo y Galicia";
export const SITE_CITY = "Vigo";
export const SITE_TAGLINE =
  "Instalaciones eléctricas, cuadros a medida, mantenimiento y respuesta técnica para viviendas, comercio e industria en Galicia.";

export const siteIdentityNotes = [
  {
    label: "Marca pública",
    value: SITE_NAME,
    origin: "existing" as ContentOrigin,
  },
  {
    label: "Dirección canónica",
    value: SITE_ADDRESS,
    origin: "existing" as ContentOrigin,
  },
  {
    label: "Teléfonos canónicos",
    value: `${SITE_PHONE_LABEL} / ${SITE_PHONE_ALT_LABEL}`,
    origin: "existing" as ContentOrigin,
  },
  {
    label: "Email canónico",
    value: SITE_EMAIL,
    origin: "existing" as ContentOrigin,
  },
];

export const primaryNavigation: NavEntry[] = [
  { label: "Servicios", path: "/servicios" },
  { label: "Empresa", path: "/empresa" },
  { label: "Cobertura", path: "/zonas" },
  { label: "Proyectos", path: "/proyectos" },
  { label: "Certificaciones", path: "/certificaciones" },
  { label: "Blog", path: "/blog" },
  { label: "Contacto", path: "/contacto" },
];

export const footerLinks: NavEntry[] = [
  { label: "Inicio", path: "/" },
  { label: "Servicios", path: "/servicios" },
  { label: "Empresa", path: "/empresa" },
  { label: "Cobertura", path: "/zonas" },
  { label: "Blog", path: "/blog" },
  { label: "Contacto", path: "/contacto" },
];

export const legalLinks: NavEntry[] = [
  { label: "Aviso legal", path: "/aviso-legal" },
  { label: "Privacidad", path: "/privacidad" },
  { label: "Cookies", path: "/cookies" },
];

export const heroHighlights = [
  "Instalaciones eléctricas completas para vivienda, local y nave industrial",
  "Cuadros eléctricos a medida, mantenimiento preventivo y soporte de emergencia 24/7",
  "Instaladores autorizados con foco en seguridad, continuidad y cumplimiento normativo",
];

export const trustMetrics: MetricEntry[] = [
  {
    value: "+500",
    label: "proyectos",
    detail: "Instalaciones, cuadros, mantenimientos y asistencias completadas con éxito.",
  },
  {
    value: "24/7",
    label: "servicio de emergencia",
    detail: "Respuesta prioritaria para incidencias eléctricas en servicio continuo.",
  },
  {
    value: "100%",
    label: "instaladores autorizados",
    detail: "Equipo técnico cualificado y trazabilidad documental en cada intervención.",
  },
  {
    value: "2 años",
    label: "de garantía",
    detail: "Cobertura mínima de instalación sobre trabajos ejecutados y materiales acordados.",
  },
];

export const competitiveAdvantages: HighlightCard[] = [
  {
    title: "Diagnóstico claro desde el primer contacto",
    description:
      "No vendemos una intervención estándar por defecto. Revisamos alcance, riesgos y urgencia antes de presupuestar.",
  },
  {
    title: "Ingeniería y ejecución con criterio de continuidad",
    description:
      "Diseñamos la solución para que la instalación soporte uso real, crecimiento y mantenimiento posterior.",
  },
  {
    title: "Normativa, certificación y documentación",
    description:
      "Trabajamos con REBT, boletines, cuadros etiquetados y cierres de trabajo preparados para auditoría o inspección.",
  },
  {
    title: "Cobertura técnica y seguimiento postventa",
    description:
      "Mantenimiento, ajustes y respuesta ante incidencias para que la instalación no dependa de improvisación.",
  },
];

export const coverageHighlights: CoverageEntry[] = [
  {
    title: "Vigo y área metropolitana",
    description:
      "Cobertura prioritaria en Vigo, Mos, Nigrán, Gondomar, Redondela y entorno inmediato.",
  },
  {
    title: "Pontevedra y eje atlántico",
    description:
      "Actuaciones programadas y mantenimientos en Pontevedra, Vilagarcía, Santiago y A Coruña según carga y alcance.",
  },
  {
    title: "Galicia para proyectos planificados",
    description:
      "Instalaciones, cuadros y automatización en el conjunto de Galicia cuando el proyecto lo justifica.",
  },
];

export const processSteps: ProcessStep[] = [
  {
    title: "1. Revisión técnica y toma de datos",
    description:
      "Aterrizamos uso, potencia, normativa, urgencia y condiciones de la instalación antes de definir propuesta.",
  },
  {
    title: "2. Propuesta, alcance y presupuesto",
    description:
      "Planteamos solución, materiales, plazos y documentación necesaria sin dejar ambigüedad operativa.",
  },
  {
    title: "3. Ejecución coordinada",
    description:
      "Trabajamos por fases para reducir impacto en la actividad y asegurar seguridad durante la intervención.",
  },
  {
    title: "4. Verificación, certificación y entrega",
    description:
      "Probamos, etiquetamos, documentamos y cerramos la instalación con la trazabilidad que exige explotación real.",
  },
];

export const testimonials: TestimonialEntry[] = [
  {
    name: "María P.",
    role: "Gerencia",
    company: "Cadena de retail en Vigo",
    quote:
      "Nos resolvieron la reforma eléctrica del local con muy poca ventana de parada y una ejecución limpia.",
  },
  {
    name: "Javier R.",
    role: "Responsable de planta",
    company: "Industria auxiliar",
    quote:
      "Necesitábamos cuadros y mantenimiento con criterio técnico, no un parche. La respuesta fue seria y ordenada.",
  },
  {
    name: "Laura S.",
    role: "Propiedad",
    company: "Reforma residencial",
    quote:
      "Nos explicaron cada decisión, entregaron la instalación legalizada y dejaron margen para futuras ampliaciones.",
  },
];

export const homeFaqs: FaqEntry[] = [
  {
    question: "¿Trabajáis solo en Vigo?",
    answer:
      "Nuestra cobertura principal está en Vigo y Pontevedra, pero asumimos proyectos en Galicia cuando el alcance y la planificación encajan.",
  },
  {
    question: "¿Podéis emitir certificados y boletines?",
    answer:
      "Sí. Ejecutamos instalaciones conforme a normativa y dejamos preparada la documentación técnica necesaria para legalización y entrega.",
  },
  {
    question: "¿Atendéis emergencias fuera de horario?",
    answer:
      "Sí. El servicio 24/7 está orientado a averías eléctricas con impacto operativo o de seguridad y se prioriza por criticidad.",
  },
  {
    question: "¿Ofrecéis mantenimiento preventivo?",
    answer:
      "Sí. Diseñamos revisiones periódicas para viviendas, locales y entornos industriales donde la continuidad eléctrica es crítica.",
  },
];

export const services: ServiceEntry[] = [
  {
    key: "instalaciones-electricas",
    slug: "instalaciones-electricas",
    name: "Instalaciones eléctricas completas",
    shortName: "Instalaciones eléctricas",
    summary:
      "Diseño y ejecución de instalaciones eléctricas para vivienda, comercio, oficinas y pequeña industria en Galicia.",
    heroTitle:
      "Instalaciones eléctricas completas con foco en seguridad, escalabilidad y cumplimiento normativo.",
    heroIntro:
      "Resolvemos altas, reformas, ampliaciones y nuevas instalaciones con criterios técnicos claros, documentación trazable y materiales contrastados.",
    badge: "Servicio principal",
    seo: {
      title: "Instalaciones eléctricas en Vigo y Galicia",
      description:
        "Diseño, reforma y ejecución de instalaciones eléctricas para viviendas, locales y naves con instaladores autorizados en Vigo y Galicia.",
      path: "/servicios/instalaciones-electricas",
      keywords: [
        "instalaciones electricas en vigo",
        "electricistas autorizados galicia",
        "reforma electrica vivienda",
      ],
    },
    highlights: [
      "Nuevas instalaciones y reformas integrales",
      "Distribución interior, iluminación y protecciones",
      "Certificación y adecuación a REBT",
    ],
    deliverables: [
      "Proyecto o replanteo técnico según alcance",
      "Cuadro general y protecciones dimensionadas",
      "Cableado, canalización, pruebas y documentación final",
    ],
    sectors: ["Vivienda", "Locales comerciales", "Oficinas", "Naves y talleres"],
    differentiators: [
      "Dimensionado realista para uso actual y futuras ampliaciones",
      "Coordinación con reforma, climatización y otros gremios",
      "Entrega final preparada para explotación y mantenimiento",
    ],
    faqs: [
      {
        question: "¿Adaptáis instalaciones antiguas a normativa actual?",
        answer:
          "Sí. Auditamos la instalación existente y planteamos la adecuación mínima o integral según riesgo, uso y presupuesto.",
      },
      {
        question: "¿Trabajáis obra nueva y reforma?",
        answer:
          "Sí. Cubrimos desde replanteo inicial hasta reforma parcial o completa de instalaciones existentes.",
      },
    ],
    origin: "existing",
  },
  {
    key: "cuadros-electricos",
    slug: "cuadros-electricos",
    name: "Cuadros eléctricos a medida",
    shortName: "Cuadros a medida",
    summary:
      "Diseño, fabricación, cableado y puesta en marcha de cuadros eléctricos personalizados para instalaciones residenciales, comerciales e industriales.",
    heroTitle:
      "Cuadros eléctricos a medida para proteger, distribuir y ordenar la instalación con criterio técnico real.",
    heroIntro:
      "Diseñamos cuadros domésticos, terciarios e industriales con selección de componentes, etiquetado y documentación preparados para mantenimiento y ampliación.",
    badge: "Especialidad",
    seo: {
      title: "Cuadros eléctricos a medida en Galicia",
      description:
        "Fabricación y montaje de cuadros eléctricos a medida con componentes de primeras marcas, etiquetado y puesta en marcha en Galicia.",
      path: "/servicios/cuadros-electricos",
      keywords: [
        "cuadros electricos a medida",
        "cuadros electricos galicia",
        "montaje cuadro electrico",
      ],
    },
    highlights: [
      "Cuadros generales, secundarios y maniobra",
      "Componentes Schneider, ABB, Siemens o equivalentes",
      "Etiquetado, esquemas y trazabilidad de circuito",
    ],
    deliverables: [
      "Diseño funcional y selección de protecciones",
      "Armario, cableado interno y pruebas previas",
      "Instalación, puesta en marcha y documentación",
    ],
    sectors: ["Residencial", "Terciario", "Pequeña industria", "Automatización"],
    differentiators: [
      "Cuadros preparados para mantenimiento posterior",
      "Separación de circuitos y orden interno orientados a explotación real",
      "Integración con automatización y control cuando aplica",
    ],
    faqs: [
      {
        question: "¿Fabricáis cuadros nuevos o también sustituís existentes?",
        answer:
          "Hacemos ambas cosas. Podemos fabricar desde cero o rehacer cuadros antiguos cuando ya no ofrecen seguridad ni margen de crecimiento.",
      },
      {
        question: "¿Entregáis esquemas y etiquetado?",
        answer:
          "Sí. Es parte del valor del servicio porque reduce tiempos de diagnóstico y facilita futuras intervenciones.",
      },
    ],
    origin: "existing",
  },
  {
    key: "mantenimiento-preventivo",
    slug: "mantenimiento-preventivo",
    name: "Mantenimiento preventivo",
    shortName: "Mantenimiento",
    summary:
      "Planes de revisión periódica para reducir averías, anticipar riesgos y asegurar continuidad eléctrica en instalaciones críticas.",
    heroTitle:
      "Mantenimiento preventivo para evitar paradas, averías recurrentes y costes derivados de una instalación sin control.",
    heroIntro:
      "Revisamos cuadros, protecciones, aprietes, consumos, cableado visible y puntos de degradación para detectar problemas antes de que escalen.",
    badge: "Continuidad",
    seo: {
      title: "Mantenimiento eléctrico preventivo en Vigo",
      description:
        "Revisiones eléctricas periódicas, mantenimiento preventivo y seguimiento técnico para comercio, oficinas e industria en Vigo y Galicia.",
      path: "/servicios/mantenimiento-preventivo",
      keywords: [
        "mantenimiento electrico preventivo",
        "revision instalacion electrica vigo",
        "mantenimiento cuadros electricos",
      ],
    },
    highlights: [
      "Revisiones planificadas y partes de seguimiento",
      "Detección temprana de calentamientos y fallos",
      "Menos incidencias y mejor continuidad operativa",
    ],
    deliverables: [
      "Plan periódico adaptado a criticidad y uso",
      "Informe de incidencias, recomendaciones y prioridades",
      "Histórico técnico para seguimiento y auditoría",
    ],
    sectors: ["Comunidades", "Retail", "Hostelería", "Industria ligera"],
    differentiators: [
      "Mantenimiento orientado a riesgo real, no a visitas vacías",
      "Documentación acumulativa para entender la evolución de la instalación",
      "Capacidad de coordinar correctivos y mejoras detectadas",
    ],
    faqs: [
      {
        question: "¿Cada cuánto recomendáis revisar una instalación?",
        answer:
          "Depende del entorno, la carga y el impacto de una avería. En entornos operativos proponemos periodicidad fija y ajustes según hallazgos.",
      },
      {
        question: "¿Incluís correctivos en el mantenimiento?",
        answer:
          "Podemos separar preventivo y correctivo o trabajar con una bolsa de actuaciones priorizadas según el plan acordado.",
      },
    ],
    origin: "existing",
  },
  {
    key: "automatizacion-industrial",
    slug: "automatizacion-industrial",
    name: "Automatización industrial",
    shortName: "Automatización",
    summary:
      "Automatización de maniobras, control de procesos y modernización de cuadros para mejorar fiabilidad y explotación.",
    heroTitle:
      "Automatización industrial para ordenar maniobras, reducir intervención manual y ganar trazabilidad de proceso.",
    heroIntro:
      "Integramos cuadros, señales, PLC y elementos de control cuando la instalación necesita más fiabilidad, repetibilidad y capacidad de supervisión.",
    badge: "Control",
    seo: {
      title: "Automatización industrial eléctrica en Galicia",
      description:
        "Programación y adaptación de sistemas de automatización industrial, cuadros de control y maniobra eléctrica en Galicia.",
      path: "/servicios/automatizacion-industrial",
      keywords: [
        "automatizacion industrial galicia",
        "cuadros de control electrico",
        "programacion plc vigo",
      ],
    },
    highlights: [
      "Control de maniobras y secuencias",
      "Integración cuadro-sensórica-actuación",
      "Optimización de fiabilidad operativa",
    ],
    deliverables: [
      "Revisión de proceso y puntos de control",
      "Adaptación de cuadro y cableado de señales",
      "Puesta en marcha, pruebas y ajustes de lógica",
    ],
    sectors: ["Industria ligera", "Talleres", "Procesos auxiliares", "Instalaciones técnicas"],
    differentiators: [
      "Automatización aplicada a necesidad real, no a complejidad innecesaria",
      "Documentación de maniobra y puntos de fallo",
      "Compatibilidad con mantenimiento posterior y ampliaciones",
    ],
    faqs: [
      {
        question: "¿Solo trabajáis instalaciones nuevas?",
        answer:
          "No. Muchas actuaciones de automatización parten de cuadros o procesos existentes que necesitan ordenarse o modernizarse.",
      },
      {
        question: "¿Podéis integrar automatización con cuadros a medida?",
        answer:
          "Sí. Es uno de los escenarios más habituales cuando hay que rehacer control y protección al mismo tiempo.",
      },
    ],
    origin: "existing",
  },
  {
    key: "eficiencia-energetica",
    slug: "eficiencia-energetica",
    name: "Eficiencia energética",
    shortName: "Eficiencia energética",
    summary:
      "Medidas de optimización eléctrica para reducir consumo, mejorar reparto de carga y modernizar instalaciones ineficientes.",
    heroTitle:
      "Eficiencia energética con actuaciones medibles, no con recomendaciones genéricas sin impacto técnico.",
    heroIntro:
      "Revisamos consumos, distribución, iluminación, cuadros y hábitos de uso para proponer mejoras aplicables a cada instalación.",
    badge: "Optimización",
    seo: {
      title: "Eficiencia energética para instalaciones eléctricas",
      description:
        "Auditoría básica, mejora de consumo eléctrico, modernización de iluminación y optimización de instalaciones en Galicia.",
      path: "/servicios/eficiencia-energetica",
      keywords: [
        "eficiencia energetica electrica",
        "ahorro consumo electrico empresa",
        "iluminacion led galicia",
      ],
    },
    highlights: [
      "Auditoría básica de instalación y consumo",
      "Mejora de iluminación, protecciones y reparto",
      "Decisiones priorizadas por retorno y seguridad",
    ],
    deliverables: [
      "Diagnóstico de puntos de ineficiencia",
      "Plan de mejoras priorizadas por impacto",
      "Ejecución de actuaciones y validación final",
    ],
    sectors: ["Vivienda", "Retail", "Oficinas", "Instalaciones con consumo intensivo"],
    differentiators: [
      "Enfoque técnico y económico al mismo tiempo",
      "Mejoras compatibles con normativa y mantenimiento",
      "Capacidad de ejecutar lo recomendado sin depender de terceros",
    ],
    faqs: [
      {
        question: "¿La eficiencia energética es solo cambiar a LED?",
        answer:
          "No. La iluminación es una parte, pero también revisamos cuadros, repartos, hábitos de uso y protecciones para encontrar ahorro real.",
      },
      {
        question: "¿Hacéis la auditoría y también la ejecución?",
        answer:
          "Sí. Podemos hacer ambas fases para que el diagnóstico se convierta en una mejora implantada y verificable.",
      },
    ],
    origin: "existing",
  },
  {
    key: "emergencias-24-7",
    slug: "emergencias-24-7",
    name: "Emergencias 24/7",
    shortName: "Emergencias 24/7",
    summary:
      "Respuesta prioritaria ante averías, cortes, disparos recurrentes o incidencias eléctricas con impacto sobre seguridad o continuidad.",
    heroTitle:
      "Emergencias eléctricas 24/7 para recuperar servicio, reducir riesgo y estabilizar la instalación cuanto antes.",
    heroIntro:
      "Actuamos sobre averías urgentes, fallos de cuadro, disparos, pérdida de suministro interno y problemas eléctricos que no admiten espera.",
    badge: "Urgencias",
    seo: {
      title: "Electricista de urgencias 24 horas en Vigo",
      description:
        "Servicio de emergencias eléctricas 24/7 en Vigo y Galicia para averías, fallos de cuadro y cortes con respuesta técnica prioritaria.",
      path: "/servicios/emergencias-24-7",
      keywords: [
        "electricista urgencias vigo",
        "averia electrica 24 horas",
        "emergencia cuadro electrico galicia",
      ],
    },
    highlights: [
      "Averías con impacto operativo o de seguridad",
      "Diagnóstico rápido y estabilización inicial",
      "Seguimiento posterior para corregir causa raíz",
    ],
    deliverables: [
      "Atención prioritaria y diagnóstico en campo",
      "Corrección temporal o definitiva según escenario",
      "Informe de causa probable y recomendación de cierre",
    ],
    sectors: ["Vivienda", "Comercio", "Hostelería", "Pequeña industria"],
    differentiators: [
      "Respuesta pensada para contener el problema y documentarlo",
      "Capacidad de convertir la urgencia en plan correctivo ordenado",
      "Cobertura alineada con criticidad y disponibilidad real",
    ],
    faqs: [
      {
        question: "¿Cubrís cualquier incidencia como emergencia?",
        answer:
          "Priorizamos incidencias con riesgo eléctrico, interrupción de actividad o imposibilidad de uso normal de la instalación.",
      },
      {
        question: "¿La actuación de urgencia incluye reparación definitiva?",
        answer:
          "Cuando es viable sí. Si no, estabilizamos la situación y dejamos un plan claro para la corrección definitiva.",
      },
    ],
    origin: "existing",
  },
];

export const serviceCards = services;

export const serviceGroups = [
  {
    title: "Infraestructura eléctrica",
    description:
      "Servicios nucleares para diseño, ejecución y modernización de instalaciones y cuadros.",
    serviceSlugs: ["instalaciones-electricas", "cuadros-electricos", "mantenimiento-preventivo"],
  },
  {
    title: "Continuidad y mejora",
    description:
      "Líneas orientadas a continuidad operativa, ahorro y respuesta técnica ante incidencia o necesidad de control.",
    serviceSlugs: ["automatizacion-industrial", "eficiencia-energetica", "emergencias-24-7"],
  },
];

export const serviceFaqs: FaqEntry[] = [
  {
    question: "¿Podéis asumir un proyecto completo o solo una parte?",
    answer:
      "Ambas cosas. Podemos encargarnos del proyecto completo o intervenir en una parte muy concreta como cuadros, mantenimiento o urgencias.",
  },
  {
    question: "¿Trabajáis con primeras marcas de material eléctrico?",
    answer:
      "Sí. Priorizamos componentes contrastados y trazables, especialmente en cuadros, protecciones y maniobra.",
  },
  {
    question: "¿Gestionáis tanto vivienda como industria ligera?",
    answer:
      "Sí. El enfoque cambia según el uso, pero cubrimos vivienda, comercio, oficinas, comunidades y pequeña industria.",
  },
];

export const projectHighlights: HighlightCard[] = [
  {
    title: "Reformas residenciales completas",
    description:
      "Sustitución de instalación, cuadro general, circuitos y certificación final en viviendas y comunidades.",
  },
  {
    title: "Locales y entornos de atención al público",
    description:
      "Adecuación eléctrica con minimización de paradas, iluminación, protección y revisión de continuidad.",
  },
  {
    title: "Pequeña industria y talleres",
    description:
      "Cuadros, maniobra, mantenimiento preventivo y actuaciones de automatización para explotación más estable.",
  },
  {
    title: "Incidencias críticas y regularización",
    description:
      "Urgencias, correcciones de instalación y actuaciones para recuperar seguridad y orden documental.",
  },
];

export const infoPages: Record<string, InfoPageEntry> = {
  empresa: {
    key: "empresa",
    eyebrow: "Empresa",
    title: "Instalaciones eléctricas en Vigo con una base técnica pensada para durar.",
    intro:
      "Electroria reordena y ejecuta instalaciones eléctricas para clientes que necesitan seguridad, cumplimiento y continuidad, no solo una reparación puntual.",
    seo: {
      title: "Electroria | Empresa de instalaciones eléctricas en Vigo",
      description:
        "Conoce a Electroria, empresa de instalaciones eléctricas en Vigo especializada en cuadros, mantenimiento, automatización y emergencias 24/7.",
      path: "/empresa",
      keywords: ["empresa instalaciones electricas vigo", "electroria", "electricistas galicia"],
    },
    highlights: [
      {
        title: "+15 años de experiencia",
        description:
          "Experiencia acumulada en instalaciones, adecuaciones, cuadros y soporte técnico para distintos entornos de uso.",
      },
      {
        title: "Cobertura local con criterio operativo",
        description:
          "Vigo como base de respuesta prioritaria y Galicia para proyectos planificados o mantenimientos acordados.",
      },
      {
        title: "Soporte apoyado por ecosistema digital propio",
        description:
          "La nueva web integra atención asistida y una capa editorial profesional para mejorar captación y operación interna.",
      },
    ],
    sections: [
      {
        title: "Qué hacemos",
        paragraphs: [
          "Trabajamos instalaciones eléctricas, cuadros a medida, mantenimiento preventivo, automatización industrial, eficiencia energética y emergencias 24/7.",
          "La prioridad no es cerrar una intervención aislada, sino dejar una instalación entendible, segura y preparada para su explotación posterior.",
        ],
      },
      {
        title: "Cómo trabajamos",
        paragraphs: [
          "Empezamos por entender el uso real de la instalación, la urgencia, la normativa aplicable y el coste de una mala decisión técnica.",
          "A partir de ahí definimos alcance, materiales, plazos y documentación necesaria para ejecutar con trazabilidad y margen de mantenimiento.",
        ],
        bullets: [
          "Diagnóstico inicial con foco en riesgo y continuidad",
          "Presupuesto y alcance sin ambigüedad operativa",
          "Ejecución coordinada y cierre documental",
        ],
      },
      {
        title: "Base digital de la nueva etapa",
        paragraphs: [
          "Electroria ya no depende de una web WordPress frágil ni de páginas rotas. La nueva base Angular SSR organiza mejor el contenido, el SEO y la captación.",
          "La atención comercial incorpora un asistente white-label operado por Talkaris, mientras el blog queda preparado para publicación editorial mediante Auctorio sin exponer dependencias internas al usuario final.",
        ],
      },
    ],
    ctaLabel: "Solicitar presupuesto",
    ctaPath: "/contacto",
    origin: "inferred",
  },
  zonas: {
    key: "zonas",
    eyebrow: "Cobertura",
    title: "Cobertura eléctrica en Vigo y Galicia con prioridad donde el tiempo de respuesta sí importa.",
    intro:
      "Nuestra cobertura principal se concentra en Vigo y Pontevedra, con capacidad para asumir proyectos y mantenimientos en el resto de Galicia.",
    seo: {
      title: "Cobertura de instalaciones eléctricas en Galicia",
      description:
        "Cobertura de Electroria en Vigo, Pontevedra y Galicia para instalaciones eléctricas, cuadros a medida, mantenimiento y emergencias.",
      path: "/zonas",
      keywords: ["electricistas vigo", "instalaciones electricas pontevedra", "electricistas galicia"],
    },
    highlights: [
      {
        title: "Respuesta prioritaria en Vigo",
        description:
          "Atención principal en Vigo y área metropolitana para intervenciones programadas y urgentes.",
      },
      {
        title: "Pontevedra y eje atlántico",
        description:
          "Cobertura recurrente para clientes que necesitan soporte técnico estable en el corredor atlántico.",
      },
      {
        title: "Galicia para proyectos definidos",
        description:
          "Actuaciones planificadas en el resto de Galicia cuando el alcance, la logística y la criticidad lo justifican.",
      },
    ],
    sections: [
      {
        title: "Zonas habituales",
        paragraphs: [
          "Trabajamos de forma prioritaria en Vigo, Redondela, Mos, Nigrán, Gondomar, Porriño y Pontevedra.",
          "También asumimos trabajos programados en Santiago, A Coruña, Ourense y otras ubicaciones gallegas cuando el proyecto requiere una solución técnica concreta.",
        ],
      },
      {
        title: "Cómo priorizamos urgencias",
        paragraphs: [
          "Las emergencias se priorizan por riesgo eléctrico, impacto sobre personas, continuidad de servicio y distancia operativa.",
          "Cuando una urgencia no puede resolverse en una única visita, dejamos estabilización inicial y plan claro de cierre.",
        ],
      },
    ],
    ctaLabel: "Consultar cobertura",
    ctaPath: "/contacto",
    origin: "inferred",
  },
  proyectos: {
    key: "proyectos",
    eyebrow: "Proyectos",
    title: "Tipologías de proyecto que resolvemos con más frecuencia.",
    intro:
      "No publicamos nombres de cliente ni referencias sensibles, pero sí organizamos los escenarios de proyecto donde Electroria aporta más valor técnico.",
    seo: {
      title: "Proyectos eléctricos habituales | Electroria",
      description:
        "Descubre las tipologías de proyecto que Electroria aborda en vivienda, comercio, industria ligera, mantenimiento y urgencias.",
      path: "/proyectos",
      keywords: ["proyectos electricos", "reforma electrica local comercial", "cuadros electricos industriales"],
    },
    highlights: projectHighlights,
    sections: [
      {
        title: "Proyectos de instalación y reforma",
        paragraphs: [
          "Ejecutamos instalaciones nuevas, ampliaciones y reformas completas cuando la instalación existente ya no ofrece seguridad, capacidad o trazabilidad suficiente.",
          "El objetivo es dejar una base ordenada para que futuras actuaciones no se conviertan en sobrecoste técnico.",
        ],
      },
      {
        title: "Proyectos de continuidad operativa",
        paragraphs: [
          "Locales, oficinas y talleres necesitan instalaciones que no fallen en momentos de mayor actividad. Ahí entran mantenimiento, cuadros reordenados y medidas de automatización.",
          "En estos casos la instalación se diseña pensando en continuidad, diagnóstico rápido y capacidad de intervención posterior.",
        ],
        bullets: [
          "Mantenimiento preventivo recurrente",
          "Sustitución o reordenación de cuadros",
          "Corrección de incidencias estructurales detectadas en urgencia",
        ],
      },
    ],
    ctaLabel: "Contarnos el proyecto",
    ctaPath: "/contacto",
    origin: "proposed",
  },
  certificaciones: {
    key: "certificaciones",
    eyebrow: "Certificaciones",
    title: "Trabajo eléctrico ejecutado con criterio normativo y documentación preparada para entrega.",
    intro:
      "La seguridad y la legalización no son un extra. Forman parte del servicio cuando una instalación se quiere explotar con garantías.",
    seo: {
      title: "Certificaciones y cumplimiento eléctrico | Electroria",
      description:
        "Instalaciones eléctricas ejecutadas con cumplimiento REBT, documentación técnica y certificación preparada para entrega y revisión.",
      path: "/certificaciones",
      keywords: ["certificado instalacion electrica", "rebt electrico", "boletin electrico galicia"],
    },
    highlights: [
      {
        title: "REBT y normativa aplicable",
        description:
          "Diseño y ejecución alineados con reglamento de baja tensión y requisitos técnicos del entorno de uso.",
      },
      {
        title: "Documentación y trazabilidad",
        description:
          "Etiquetado, recomendaciones, observaciones de cierre y documentación para explotación y mantenimiento.",
      },
      {
        title: "Materiales y componentes contrastados",
        description:
          "Selección de primeras marcas y protecciones acordes al tipo de instalación y criticidad.",
      },
    ],
    sections: [
      {
        title: "Qué dejamos preparado",
        paragraphs: [
          "Cada instalación o cuadro debe poder entenderse después de la intervención. Por eso entregamos una base documental suficiente para mantenimiento, revisión o inspección.",
        ],
        bullets: [
          "Protecciones dimensionadas y etiquetadas",
          "Identificación de circuitos y recomendaciones",
          "Certificados y documentación según alcance acordado",
        ],
      },
      {
        title: "Qué queda pendiente de validación manual",
        paragraphs: [
          "Los datos registrales completos de la sociedad y cualquier dato legal corporativo no visible hoy en la web legacy se marcarán antes de publicación definitiva.",
        ],
      },
    ],
    ctaLabel: "Solicitar revisión técnica",
    ctaPath: "/contacto",
    origin: "inferred",
  },
  "aviso-legal": {
    key: "aviso-legal",
    eyebrow: "Legal",
    title: "Aviso legal",
    intro:
      "Esta página sustituye a las rutas legales inexistentes del sitio legacy y queda preparada para completar los datos registrales definitivos antes de publicación final.",
    seo: {
      title: "Aviso legal",
      description:
        "Aviso legal de Electroria con identificación del titular, condiciones básicas de uso y responsabilidades sobre la web corporativa.",
      path: "/aviso-legal",
    },
    sections: [
      {
        title: "Titular del sitio",
        paragraphs: [
          `Titular visible: ${SITE_LEGAL_NAME}.`,
          `Dirección de contacto: ${SITE_ADDRESS}.`,
          `Email de contacto: ${SITE_EMAIL}. Teléfonos: ${SITE_PHONE_LABEL} y ${SITE_PHONE_ALT_LABEL}.`,
          "Datos registrales completos y NIF: pendiente de validación manual antes de la publicación definitiva.",
        ],
      },
      {
        title: "Condiciones de uso",
        paragraphs: [
          "El acceso a esta web implica el uso responsable de sus contenidos y formularios. No se autoriza el uso del sitio para actividades ilícitas ni para intentar comprometer su seguridad.",
          "Electroria puede actualizar contenidos, estructura y servicios sin previo aviso cuando sea necesario para mantener la web operativa y correcta.",
        ],
      },
      {
        title: "Propiedad intelectual y responsabilidad",
        paragraphs: [
          "Los textos, diseños, marcas y elementos visibles del sitio pertenecen a Electroria o se usan con autorización suficiente.",
          "Electroria no se responsabiliza de interrupciones temporales derivadas de mantenimiento, ataques externos o incidencias de terceros, aunque adopta medidas razonables para reducirlas.",
        ],
      },
    ],
    ctaLabel: "Ir a contacto",
    ctaPath: "/contacto",
    origin: "proposed",
  },
  privacidad: {
    key: "privacidad",
    eyebrow: "Privacidad",
    title: "Política de privacidad",
    intro:
      "La nueva base web incorpora formularios propios y endpoints dedicados. Esta política resume el tratamiento aplicado a las solicitudes de contacto y presupuesto.",
    seo: {
      title: "Política de privacidad",
      description:
        "Política de privacidad de Electroria para formularios de contacto, solicitudes comerciales y tratamiento de datos.",
      path: "/privacidad",
    },
    sections: [
      {
        title: "Qué datos tratamos",
        paragraphs: [
          "Tratamos los datos facilitados por el usuario en formularios de contacto y presupuesto: nombre, email, teléfono, empresa, tipo de servicio solicitado y mensaje.",
          "También registramos datos técnicos mínimos asociados al envío, como fecha, ruta de origen o agente de usuario, para seguridad y trazabilidad operativa.",
        ],
      },
      {
        title: "Finalidad y legitimación",
        paragraphs: [
          "La finalidad principal es atender solicitudes comerciales, preparar presupuestos, gestionar seguimientos y mantener la seguridad básica de la web.",
          "La base jurídica es el consentimiento del usuario al enviar el formulario y, en su caso, el interés legítimo de Electroria en responder una solicitud iniciada por el propio usuario.",
        ],
      },
      {
        title: "Conservación y derechos",
        paragraphs: [
          "Los datos se conservan durante el tiempo necesario para atender la solicitud, realizar seguimiento comercial razonable y cumplir obligaciones legales aplicables.",
          `El usuario puede solicitar acceso, rectificación, supresión u oposición escribiendo a ${SITE_EMAIL}.`,
        ],
      },
      {
        title: "Encargados y herramientas",
        paragraphs: [
          "La web puede apoyarse en infraestructura de alojamiento, email transaccional, protección anti-spam y asistencia conversacional white-label para operar correctamente.",
          "Cuando se usen terceros, el tratamiento se limitará a la prestación técnica del servicio contratado y bajo medidas de seguridad razonables.",
        ],
      },
    ],
    ctaLabel: "Solicitar información",
    ctaPath: "/contacto",
    origin: "proposed",
  },
  cookies: {
    key: "cookies",
    eyebrow: "Cookies",
    title: "Política de cookies",
    intro:
      "La nueva web reduce dependencias innecesarias y queda preparada para operar con el mínimo de cookies técnicas imprescindibles.",
    seo: {
      title: "Política de cookies",
      description:
        "Política de cookies de Electroria con detalle sobre cookies técnicas, analíticas y opciones de configuración futura.",
      path: "/cookies",
    },
    sections: [
      {
        title: "Cookies técnicas",
        paragraphs: [
          "La web puede utilizar cookies técnicas estrictamente necesarias para seguridad, equilibrio de sesión, protección anti-spam o correcta prestación del formulario y el chat corporativo.",
        ],
      },
      {
        title: "Cookies de medición",
        paragraphs: [
          "La activación de analítica o medición adicional quedará condicionada a la configuración final elegida en producción y al sistema de consentimiento que se implante.",
        ],
      },
      {
        title: "Cómo gestionar cookies",
        paragraphs: [
          "El usuario puede bloquear o eliminar cookies desde su navegador. Si se desactivan ciertas cookies técnicas, algunas funciones del sitio podrían dejar de operar correctamente.",
        ],
      },
    ],
    ctaLabel: "Volver al inicio",
    ctaPath: "/",
    origin: "proposed",
  },
};

export const contactPageFaqs: FaqEntry[] = [
  {
    question: "¿Qué necesitáis para preparar un presupuesto?",
    answer:
      "Ubicación, tipo de instalación, uso previsto, urgencia y una descripción clara del alcance o la incidencia.",
  },
  {
    question: "¿Puedo escribir por una avería urgente?",
    answer:
      "Sí, pero si la incidencia es crítica recomendamos además llamar al teléfono principal para priorizar la atención.",
  },
  {
    question: "¿Atendéis proyectos de comunidades o administradores?",
    answer:
      "Sí. Podemos valorar reformas de zonas comunes, cuadros, alumbrado y mantenimiento periódico.",
  },
];

export const contactServiceOptions = [
  "Instalaciones eléctricas completas",
  "Cuadros eléctricos a medida",
  "Mantenimiento preventivo",
  "Automatización industrial",
  "Eficiencia energética",
  "Emergencias 24/7",
  "No lo tengo claro todavía",
];

export const contactPropertyTypes = [
  "Vivienda",
  "Local comercial",
  "Oficina",
  "Nave o taller",
  "Comunidad de vecinos",
  "Otro",
];

export const contactUrgencyOptions = [
  "Urgente / incidencia en curso",
  "Necesito presupuesto",
  "Proyecto planificado",
  "Mantenimiento o revisión",
];

export const contactBudgetRanges = [
  "Aún no lo sé",
  "Menos de 1.500 EUR",
  "1.500 - 5.000 EUR",
  "5.000 - 15.000 EUR",
  "Más de 15.000 EUR",
];

export const blogCategories: BlogCategoryEntry[] = [
  {
    slug: "cuadros-electricos",
    label: "Cuadros eléctricos",
    description:
      "Contenido técnico y comercial sobre cuadros eléctricos, componentes, normativa e instalaciones vinculadas.",
  },
];

function slugify(value: string): string {
  return value
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, "")
    .trim()
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-");
}

function stripHtml(value: string): string {
  return value.replace(/<[^>]+>/g, " ").replace(/\s+/g, " ").trim();
}

function normalizeLegacySummary(value: string): string {
  return value
    .replace(/\s*\[&hellip;\]\s*$/i, "")
    .replace(/\s+/g, " ")
    .trim();
}

function estimateReadingTimeMinutes(value: string): number {
  const wordCount = stripHtml(value)
    .split(/\s+/)
    .filter(Boolean).length;
  return Math.max(3, Math.ceil(wordCount / 180));
}

function normalizeLegacyPost(raw: LegacyBlogPostRaw): BlogPostEntry {
  const categorySlug = "cuadros-electricos";
  const excerpt = normalizeLegacySummary(raw.summary);

  return {
    slug: raw.slug,
    title: raw.title,
    summary: excerpt,
    excerpt,
    category: raw.category,
    categorySlug,
    author: SITE_NAME,
    publishedAt: raw.publishedAt,
    updatedAt: raw.updatedAt,
    featuredImage: raw.featuredImage,
    contentHtml: raw.contentHtml,
    readingTimeMinutes: estimateReadingTimeMinutes(raw.contentHtml),
    seo: {
      title: raw.title,
      description: excerpt,
      path: `/blog/${raw.slug}`,
      keywords: [
        raw.title,
        "cuadros eléctricos",
        "instalaciones eléctricas",
        "electricistas en Galicia",
      ],
    },
    sourceUrl: raw.sourceUrl,
    origin: "existing",
  };
}

export const legacyBlogPosts: BlogPostEntry[] = (rawLegacyBlogPosts as LegacyBlogPostRaw[]).map(
  normalizeLegacyPost
);

export function getServiceBySlug(slug: string | null | undefined): ServiceEntry | undefined {
  return services.find((service) => service.slug === slug);
}

export function getInfoPageByKey(key: string | null | undefined): InfoPageEntry | undefined {
  if (!key) {
    return undefined;
  }

  return infoPages[key];
}

export function getBlogPostBySlug(slug: string | null | undefined): BlogPostEntry | undefined {
  return legacyBlogPosts.find((post) => post.slug === slug);
}

export function getBlogCategoryBySlug(
  slug: string | null | undefined
): BlogCategoryEntry | undefined {
  return blogCategories.find((category) => category.slug === slug);
}

export function getBlogPostsByCategory(slug: string | null | undefined): BlogPostEntry[] {
  return legacyBlogPosts.filter((post) => post.categorySlug === slug);
}

export const blogListIntro = {
  title: "Blog de Electroria",
  description:
    "Guías y artículos ya publicados en la web actual, preservados y normalizados para la nueva base Angular SSR.",
};

export const legacyRedirects: LegacyRedirectEntry[] = [
  { from: "/instalaciones-electricas/", to: "/servicios/instalaciones-electricas", statusCode: 301 },
  { from: "/diseno-de-cuadros-electricos/", to: "/servicios", statusCode: 301 },
  { from: "/cuadros-electricos-galicia/", to: "/empresa", statusCode: 301 },
  { from: "/cuadros-electricos/", to: "/servicios/cuadros-electricos", statusCode: 301 },
  {
    from: "/instalacion-electrica-en-viviendas-guia-completa/",
    to: "/blog/instalacion-electrica-en-viviendas-guia-completa",
    statusCode: 301,
  },
  {
    from: "/cuadros-electricos-funcionamiento-y-componentes/",
    to: "/blog/cuadros-electricos-funcionamiento-y-componentes",
    statusCode: 301,
  },
  {
    from: "/cuadros-electricos-regulaciones-y-normativa/",
    to: "/blog/cuadros-electricos-regulaciones-y-normativa",
    statusCode: 301,
  },
  { from: "/category/cuadros-electricos/", to: "/blog/categoria/cuadros-electricos", statusCode: 301 },
  { from: "/mantenimiento/", to: "/servicios/mantenimiento-preventivo", statusCode: 301 },
  { from: "/automatizacion-industrial/", to: "/servicios/automatizacion-industrial", statusCode: 301 },
  { from: "/eficiencia-energetica/", to: "/servicios/eficiencia-energetica", statusCode: 301 },
  { from: "/emergencias-24-7/", to: "/servicios/emergencias-24-7", statusCode: 301 },
  { from: "/nosotros/", to: "/empresa", statusCode: 301 },
  { from: "/proyectos/", to: "/proyectos", statusCode: 301 },
  { from: "/certificaciones/", to: "/certificaciones", statusCode: 301 },
  { from: "/zonas-servicio/", to: "/zonas", statusCode: 301 },
  { from: "/aviso-legal/", to: "/aviso-legal", statusCode: 301 },
  { from: "/politica-privacidad/", to: "/privacidad", statusCode: 301 },
  { from: "/cookies/", to: "/cookies", statusCode: 301 },
];

export const goneRoutes = [
  "/area-cliente",
  "/clientes/cuenta",
  "/clientes/facturas",
  "/clientes/consumo",
  "/servicios/suministro",
  "/servicios/tarifas",
  "/servicios/renovable",
  "/sostenibilidad",
  "/empleo",
];

export const publicStaticPaths = [
  "/",
  "/servicios",
  "/empresa",
  "/zonas",
  "/proyectos",
  "/certificaciones",
  "/blog",
  "/blog/categoria/cuadros-electricos",
  "/contacto",
  "/aviso-legal",
  "/privacidad",
  "/cookies",
  ...services.map((service) => service.seo.path),
  ...legacyBlogPosts.map((post) => post.seo.path),
];

export function buildBreadcrumbItems(
  entries: Array<{ name: string; path: string }>
): Array<{ name: string; path: string }> {
  return entries;
}
