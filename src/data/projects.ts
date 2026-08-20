
export interface CaseStudySection {
  type: 'text' | 'stat-row' | 'image' | 'quote';
  heading?: string;
  body?: string;
  stats?: { label: string; value: string }[];
  image?: { src: string; alt: string; caption?: string };
}

export interface Project {
  id: string;
  title: string;
  description: string;
  image: string;
  category: string;
  year: string;
  featured?: boolean;
  protected?: boolean; // New property for protected projects
  details?: {
    client?: string;
    role?: string;
    duration?: string;
    tools?: string[];
  };
  size?: 'large' | 'medium'; // Adding size property for bento grid
  // Structured case study content. If absent, CaseStudy.tsx falls back to
  // the generic overview/challenge/process/solution/results copy.
  caseStudy?: CaseStudySection[];
  // True when the project is shown as a card (home/work) but has no case study
  // page yet — material pending. Cards render without a link instead of falling
  // back to the generic placeholder copy.
  caseStudyPending?: boolean;
}

export const projects: Project[] = [
  {
    id: "livepro-app",
    title: "LivePRO",
    description: "Real-time video-analysis iPad app used pitch-side during live matches.",
    image: "/livepro-mockup.svg",
    category: "iPad App",
    year: "2022-2025",
    featured: true,
    protected: true, // Making this project protected
    size: "large",
    details: {
      client: "Professional sports analytics suite",
      role: "Lead Product Designer",
      duration: "4 months",
      tools: ["Figma", "Protopie", "Mockups"]
    },
    caseStudy: [
      {
        type: 'text',
        heading: "Diseñé la app que se usa en el banquillo, en directo, durante el partido",
        body: "LivePRO es la app de iPad de una suite de análisis deportivo en tiempo real usada por clubes y selecciones de fútbol profesional. Su trabajo es leer vídeo sin latencia y estadísticas en directo, desde el propio banquillo, mientras el partido está pasando — incluida la selección de España y la de Estados Unidos, dirigida por Mauricio Pochettino, durante el Mundial 2026.\n\nDe los productos de la suite, este es el único que se juega en segundos y no en minutos. Un entrenador no tiene tiempo de leer un dashboard.\n\n· Usada en el banquillo por cuerpos técnicos en la máxima competición del fútbol internacional (Mundial 2026)\n· Parte de un sistema de productos que escaló de 2 a 5 aplicaciones compartiendo el mismo lenguaje visual"
      },
      {
        type: 'text',
        heading: "El problema no era de diseño, era de negocio",
        body: "La suite no vende más datos que la competencia — todos los proveedores de analítica deportiva de élite tienen datos de sobra. Vende quién convierte esos datos en una decisión táctica antes de que acabe la siguiente jugada. Ahí es donde vive LivePRO.\n\nEl resto de la suite (la app de oficina para análisis profundo, el portal web, la versión de escritorio) se usa sin prisa, con tiempo para pensar. LivePRO no tiene ese lujo: banquillo, ruido, luz de estadio de noche, un entrenador que está mirando el partido y de reojo la pantalla. Ningún dashboard convencional aguanta ese contexto.\n\nLa pregunta real nunca fue cuántos datos mostrar. Fue qué necesita ver un entrenador en dos o tres segundos sin dejar de mirar el campo."
      },
      {
        type: 'quote',
        body: "Hubo algo que decidimos no hacer, que cuenta tanto como lo que sí hicimos: no intentamos meter la profundidad analítica de la app de oficina en un iPad de banquillo. Eso habría sido más \"completo\" sobre el papel y un desastre en uso real."
      },
      {
        type: 'text',
        heading: "La misma información, dos velocidades distintas",
        body: "El analista en el banco tiene sesiones largas dentro del propio partido: cruza vídeo con estadísticas, prepara lo que el entrenador va a necesitar en el próximo parón.\n\nEl entrenador tiene tres segundos. No quiere el dato, quiere la conclusión ya masticada.\n\nEse es el problema de diseño de verdad: una sola pantalla que sirva a una lectura profunda y a una lectura instantánea, sin partir la app en dos productos."
      },
      {
        type: 'image',
        image: { src: "/livepro-mockup.svg", alt: "LivePRO — vista de banquillo con vídeo en directo y chips de estadísticas", caption: "Datos ficticios — mockup redibujado, no captura real (NDA)" }
      },
      {
        type: 'text',
        heading: "Decisiones que costaron descartar cosas",
        body: "Jerarquía visual bajo presión de tiempo. La primera versión que se barajó era un dashboard denso, parecido al de la app de análisis diario pero táctil. Se descartó rápido: exige lectura activa, y un entrenador no lee activamente durante un partido. Se optó por resolver visualmente el cambio más relevante antes que cualquier otro dato — el resto queda a un toque, no ocupa pantalla por defecto.\n\nEl vídeo manda, los datos acompañan. \"Sin latencia\" no es solo una ficha técnica de marketing, es una restricción real de diseño: cualquier capa de interfaz que se interponga entre el analista y el vídeo compite contra la razón de ser del producto. Hubo que pelear la convivencia entre overlay de datos y el vídeo sin robarle protagonismo.\n\nUn solo lenguaje visual para toda la suite. El sistema de LivePRO se pensó desde el principio para escalar al resto de productos — escritorio, portal, análisis, móvil — sin que cada módulo pareciera hecho por un equipo distinto. Esto no fue una capa estética añadida al final: definió cómo se construían los componentes desde el primer día."
      },
      {
        type: 'text',
        heading: "De la investigación al partido real",
        body: "Research con analistas y cuerpos técnicos, no solo entrevistas — observación en banquillo y entrenamientos. Prototipado táctil. Testing con gente del dominio deportivo, no con usuarios genéricos. Shipping. Iteración con jornadas reales de competición, no solo en lab."
        // TODO(pendiente): cuántas iteraciones concretas, qué cambió entre la primera versión y la actual — Ivan lo tiene en portátil corporativo
      },
      {
        type: 'stat-row',
        heading: "Impacto",
        stats: [
          { label: "Adopción", value: "Cuerpos técnicos en el Mundial 2026" },
          { label: "Suite", value: "2 → 5 productos" },
          { label: "Reducción de tiempo de tarea (flujos equivalentes de la suite)", value: "hasta 70%" }
        ]
        // TODO(pendiente): adopción/retención específica de LivePRO temporada a temporada, con quién coordiné día a día
      },
      {
        type: 'text',
        heading: "No fue un producto suelto, fue diseñar el sistema entero",
        body: "LivePRO es una pieza de una suite completa. Definí cerca del 95% del diseño funcional de los tres productos nuevos que se añadieron a la suite original, escalando de 2 a 5 aplicaciones — escritorio, portal, LivePRO, análisis, móvil — cada una resolviendo un contexto distinto (oficina, banquillo, análisis diario, sobre la marcha) con el mismo lenguaje de producto detrás."
      }
    ]
  },
  {
    id: "cta-rfef",
    title: "Referee Performance Evaluation System",
    description: "Multi-role workflow for reviewing, evaluating, and confirming refereeing decisions with full traceability.",
    image: "/cta-mockup.svg",
    category: "Web App",
    year: "2026",
    featured: true,
    protected: true, // Making this project protected
    size: "large",
    details: {
      client: "National football refereeing oversight body",
      role: "Lead Product Designer",
      tools: ["Figma", "Mockups"]
      // TODO(pendiente): duration — Ivan lo confirma
    },
    caseStudy: [
      {
        type: 'text',
        heading: "Diseñé el sistema con el que se evalúa el desempeño arbitral, con trazabilidad de quién decidió qué",
        body: "En el fútbol profesional cada jugada dudosa pasa por varios pares de ojos — el árbitro en el campo, el VAR, el AVAR — y después por un comité técnico que evalúa si esas decisiones fueron correctas. Diseñé el sistema que sostiene ese proceso de evaluación para el organismo que audita el arbitraje de una de las principales ligas de fútbol de Europa, con implantación prevista a partir de la próxima temporada.\n\n· Sistema multi-rol: árbitro/VAR/AVAR en campo, evaluador del comité técnico, coordinador del comité\n· Cada decisión queda revisada, justificada y trazable — no es un dashboard de consulta, es un flujo de responsabilidad"
      },
      {
        type: 'text',
        heading: "El problema no era de diseño, era de negocio",
        body: "La credibilidad del arbitraje profesional depende de que el proceso de evaluación sea consistente, auditable y defendible — el escrutinio mediático y federativo sobre cada decisión arbitral es constante e inmediato. Un comité técnico que no pueda demostrar cómo y por qué evaluó una jugada de una manera concreta pierde autoridad, aunque la evaluación en sí sea correcta.\n\nEl constraint diferencial de este proyecto frente a cualquier herramienta de revisión de vídeo genérica: varios roles con responsabilidad distinta tienen que poder revisar, comentar y confirmar la misma jugada sin pisarse el trabajo entre ellos ni perder de vista quién dijo qué y cuándo."
      },
      {
        type: 'quote',
        body: "Hubo algo que decidimos no hacer, que cuenta tanto como lo que sí hicimos: no se trataba de automatizar el juicio arbitral. La herramienta soporta y ordena el criterio humano de los evaluadores, no lo sustituye — automatizar eso habría sido tan más \"eficiente\" sobre el papel como inaceptable en un dominio donde la decisión tiene que seguir siendo humana y defendible como tal."
      },
      {
        type: 'text',
        heading: "Un mismo evento, tres formas distintas de mirarlo",
        body: "El árbitro y el AVAR en campo necesitan input rápido, bajo la presión de tiempo real del partido — no pueden pararse a rellenar un formulario largo.\n\nEl evaluador del comité técnico trabaja después del partido, con tiempo: revisión detallada, comparación entre jugadas y entre jornadas, contexto histórico del árbitro evaluado.\n\nEl coordinador del comité necesita la vista de arriba: consistencia entre evaluadores, detección de sesgos o discrepancias de criterio entre distintos jueces del mismo tipo de jugada.\n\nEl corazón del caso: la misma jugada atraviesa tres flujos de revisión distintos según quién la mira, y el sistema tiene que sostener eso sin duplicar trabajo ni perder el hilo de quién decidió qué en cada paso."
      },
      {
        type: 'image',
        image: { src: "/cta-mockup.svg", alt: "Sistema de evaluación arbitral — flujo multi-rol con trazabilidad", caption: "Datos ficticios — mockup redibujado, no captura real (NDA)" }
      },
      {
        type: 'text',
        heading: "Decisiones de diseño",
        body: "Trazabilidad sin convertir la interfaz en un log. Cada jugada acumula quién la vio, cuándo y qué decisión tomó cada rol implicado. El reto no era guardar ese historial — era mostrarlo sin que la pantalla se convirtiera en una tabla ilegible de eventos. Se resolvió con una capa de estado visible por defecto y el detalle completo a un nivel de profundidad, no en pantalla desde el primer vistazo.\n\nVelocidad de checkeo vs. profundidad de evaluación. Un evaluador tiene muchas jugadas que revisar por jornada, pero cada una necesita poder sostener un análisis defendible si se cuestiona después. El sistema separa un primer paso rápido de checkeo (¿esta jugada necesita revisión profunda o no?) de la evaluación completa, en vez de forzar el mismo nivel de detalle en todas las jugadas por igual.\n\nEstados del flujo como lenguaje compartido entre roles. Revisión → evaluación → checkeo → confirmación. Cada jugada tiene un estado visible y un responsable claro de la siguiente acción, para que ningún rol tenga que preguntar \"¿esto en qué punto está y a quién le toca moverlo?\"."
        // TODO(pendiente): cuál de estas tres decisiones costó más descartar alternativas, qué se midió después de cada una
      },
      {
        type: 'text',
        heading: "Ownership end-to-end",
        body: "Research con perfiles reales del dominio arbitral (árbitros, evaluadores del comité). Prototipado del flujo multi-rol. Testing con usuarios del propio dominio, no usuarios genéricos. Shipping. Iteración prevista sobre jornadas reales de competición a partir de la implantación."
        // TODO(pendiente): perfiles concretos de validación, número de iteraciones, qué cambió entre la primera versión y la actual
      },
      {
        type: 'text',
        heading: "Impacto (proyección)",
        body: "Sistema con implantación prevista a partir de la próxima temporada, sin datos de uso real todavía — lo que sigue es la hipótesis de impacto que el diseño está construido para sostener, no un resultado medido:\n\n· Tiempo de evaluación por jugada/partido, antes y después del sistema\n· Reducción de ambigüedad o disputas sobre quién evaluó/confirmó qué — la trazabilidad como métrica de confianza, no solo como feature técnica\n· Consistencia de criterio entre evaluadores del comité, jornada a jornada\n\nCon quién coordiné: stakeholders de un dominio muy regulado y de alto escrutinio público, equipos técnicos de producto e ingeniería."
      }
      // TODO(pendiente): sección "Por qué me importa este dominio" — nota personal que falta por escribir en el vault (checklist anti-red-flags, punto 4)
    ]
  },
  {
    id: "sony-app",
    title: "Sony 3D Live Replayer",
    description: "Replays like you never saw before.",
    image: "/sony-3d-metrics-replayer.png", // Updated to use the new image
    category: "iPad App",
    year: "2025",
    featured: true,
    caseStudyPending: true, // no case study written yet — material pending
    protected: true, // Making this project protected
    size: "large",
    details: {
      client: "Sony",
      role: "Concept Product Designer",
      duration: "4 days",
      tools: ["Figma", "Spline"]
    }
  },
  {
    id: "desktop-app",
    title: "Mediacoach Desktop",
    description: "The evolution of the Mediacoach video-analysis tool.",
    image: "https://images.unsplash.com/photo-1498050108023-c5249f4df085",
    category: "App Design",
    year: "2022",
    featured: false,
    size: "medium",
    details: {
      client: "LaLiga",
      role: "Senior Product Designer",
      duration: "3 months",
      tools: ["Sketch", "Protopie"]
    }
  },
  {
    id: "portal-app",
    title: "Mediacoach Portal v9",
    description: "Data-driven dashboard for analysts and coaches.",
    image: "/portal_9.jpg",
    category: "Web App",
    year: "2023",
    featured: false,
    protected: true, // Making this project protected
    size: "large",
    details: {
      client: "LaLiga",
      role: "Lead Product Designer",
      duration: "2 months",
      tools: ["Figma", "Protopie", "Mockups"]
    }
  },
  {
    id: "digital-workspace",
    title: "Digital Workspace Platform",
    description: "A collaborative workspace platform that helps remote teams stay connected and productive.",
    image: "https://images.unsplash.com/photo-1518770660439-4636190af475",
    category: "Web Application",
    year: "2023",
    featured: false,
    protected: true, // Making this project protected
    size: "medium",
    details: {
      client: "Enterprise SaaS",
      role: "UX Designer & Researcher",
      duration: "5 months",
      tools: ["Figma", "Miro", "UserTesting"]
    }
  }
];

// Home "Selected Works" order, most recent first: RFEF/CTA (2026) → Sony (2025) → LivePRO (2022).
const featuredOrder = ["cta-rfef", "sony-app", "livepro-app"];

export const getFeaturedProjects = (): Project[] => {
  return projects
    .filter(project => project.featured)
    .sort((a, b) => featuredOrder.indexOf(a.id) - featuredOrder.indexOf(b.id));
};

export const getProjectById = (id: string): Project | undefined => {
  return projects.find(project => project.id === id);
};
