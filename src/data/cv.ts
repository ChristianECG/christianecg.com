export interface Job {
  title: string
  period: string
  company: string
  bullets: string[]
  stack: string
}

export interface Project {
  title: string
  url: string
  description: string
  tags: string
}

export interface SkillCategory {
  label: string
  items: string
}

export interface EducationItem {
  title: string
  period: string
  institution: string
}

export interface LanguageItem {
  language: string
  level: string
}

export interface CVData {
  meta: { title: string; lang: string }
  header: {
    name: string
    role: string
    location: string
    availability: string
    contact: string[]
  }
  sections: {
    summary: { title: string; text: string }
    experience: { title: string; jobs: Job[] }
    projects: { title: string; items: Project[] }
    skills: { title: string; categories: SkillCategory[] }
    education: { title: string; items: EducationItem[] }
    languages: { title: string; items: LanguageItem[] }
    activity: { title: string; items: string[] }
  }
}

export const cvData: Record<'es' | 'en' | 'lat', CVData> = {
  es: {
    meta: {
      title: 'CV · Christian Elías Cruz González — Senior Fullstack Engineer',
      lang: 'es',
    },
    header: {
      name: 'Christian Elías Cruz González',
      role: 'Senior Fullstack Engineer',
      location: 'México · CDMX / Hidalgo',
      availability: 'Incorporación: junio 2026 · 100% remoto',
      contact: [
        'christianecg.com',
        'github.com/ChristianECG',
        'linkedin.com/in/christianeliascg',
        'contacto@christianecg.com',
        '+52 772 120 2886',
      ],
    },
    sections: {
      summary: {
        title: 'Perfil Profesional',
        text: 'Senior Fullstack Engineer con más de 5 años entregando sistemas en producción. Ownership técnico end-to-end: construyo, opero y escalo — desde plataformas con más de 150K usuarios hasta productos propios con facturación real. Especializado en agentic workflows, LLM integrations y sistemas diseñados para operar con mínima intervención.',
      },
      experience: {
        title: 'Experiencia',
        jobs: [
          {
            title: 'Senior Software Engineer',
            period: 'Feb 2024 – May 2026',
            company: 'Ubidots · Medellín, Colombia (Remoto)',
            bullets: [
              'Lideré arquitectura y performance de una plataforma IoT SaaS con más de 150K usuarios activos y datos en tiempo real vía WebSockets.',
              'Reduje tiempos de carga de dashboards de 8s a 5s (-37%) y optimicé rendering de widgets ECharts de 30s a menos de 15s (-50%) mediante virtualización, memoization y canvas rendering.',
              'Acorté el ciclo de release de 50 a 20 min (-60%), reduciendo friction de entrega para un equipo de más de 20 desarrolladores.',
              'Establecí estándares de calidad, ESLint plugin interno y guías de code review adoptadas por todo el equipo; mentoreé a 2 ingenieros junior mediante pair programming y revisiones estructuradas.',
            ],
            stack: 'React, TypeScript, ECharts, TanStack Query, WebSockets, Node.js, Python (Django), ESLint (plugin interno), Jest, GitHub Actions.',
          },
          {
            title: 'Mid-Level Software Engineer',
            period: 'Jun 2022 – Feb 2024',
            company: 'Ubidots · Medellín, Colombia (Remoto)',
            bullets: [
              'Implementé módulo de pagos con Stripe y migré el sistema de fetching a TanStack Query, eliminando estados duplicados y habilitando la conversión directa de freemium a pago.',
              'Construí y mantuve la app móvil (iOS + Android) en React Native, entregando nuevas funcionalidades de plataforma directamente a los usuarios finales.',
              'Participé en el diseño e implementación de componentes clave del sistema de dashboards IoT en tiempo real.',
            ],
            stack: 'React, TypeScript, React Native, TanStack Query, Stripe, WebSockets, Node.js, Python (Django), Jest.',
          },
          {
            title: 'Software Developer',
            period: 'Jul 2021 – Jun 2022',
            company: 'Clever Cloud · México (Remoto)',
            bullets: [
              'Desarrollé e integré sitios (e-commerce, landing pages, blogs) sobre el CMS propietario de la empresa, siendo responsable del ciclo completo: toma de requerimientos con el cliente, traducción a specs técnicas para un equipo de 5 devs, implementación y entrega.',
              'Diseñé e implementé pixel-perfect una landing page a partir de mockups de diseñadora gráfica, coordinando entregas directamente con el cliente hasta aprobación final.',
              'Definí los flujos de CI/CD y el pipeline dev – staging – producción, adoptados como estándar del equipo.',
            ],
            stack: 'React, Vue, PHP, MySQL, GitHub Actions, CI/CD.',
          },
        ],
      },
      projects: {
        title: 'Proyectos',
        items: [
          {
            title: 'TuAgenda.digital',
            url: 'tuagenda.digital',
            description: 'SaaS de automatización de citas actualmente en operación, con 5 clientes activos en los primeros 3 meses y facturación recurrente vía Stripe: booking white-label, portal de cliente sin login, recordatorios por email/SMS y agente de IA en WhatsApp con Claude API en producción — atendiendo reservas 24/7 y reduciendo la carga operativa manual en ~80%.',
            tags: 'Next.js 15 · Supabase · Stripe · Twilio · Claude API · OpenAI · Vercel Edge',
          },
          {
            title: 'CatolicMixquia',
            url: 'iOS · Android',
            description: 'App multiplataforma de contenido parroquial con más de 670 usuarios activos: reproductor de audio con background playback, misal con pipeline automatizado vía GitHub Actions, reflexión diaria con scraping, push notifications y caché offline.',
            tags: 'React Native · Expo · GitHub Actions · Push Notifications · AsyncStorage',
          },
          {
            title: 'Avelor',
            url: 'avelor.es',
            description: 'Plataforma self-hosted de 6 microservicios con subdominio independiente por módulo: analytics con heatmap en tiempo real, vault de secretos con AES-256-GCM, deploy webhooks con output logs persistidos, tunnel WebSocket, panel admin detrás de Tailscale VPN y CLI de administración. Reemplaza dependencias de terceros en producción.',
            tags: 'Astro · Node.js · PHP · PostgreSQL · Tailscale · Docker · VPS',
          },
        ],
      },
      skills: {
        title: 'Habilidades',
        categories: [
          { label: 'Frontend & Mobile', items: 'React, Next.js, TypeScript, JavaScript (ES2021+), React Native, HTML5, CSS3, design systems' },
          { label: 'Backend & Infraestructura', items: 'Node.js, Python, FastAPI, Django, PHP, PostgreSQL, MySQL, Supabase (PostgreSQL + real-time), Vercel (Edge Functions, serverless), Docker, VPS (Linux, self-hosted), GitHub Actions (CI/CD), REST APIs, Stripe, Twilio' },
          { label: 'AI / LLM Integration', items: 'Claude API, OpenAI API, agentic workflows, LLM agents en producción, prompt engineering, AI-augmented development' },
          { label: 'Calidad & Tooling', items: 'ESLint (plugins custom), Jest, React Testing Library, Git, code reviews, Claude Code, GitHub Copilot' },
          { label: 'Datos en Tiempo Real', items: 'TanStack Query, WebSockets, REST APIs, ECharts, D3.js, rendering optimization' },
          { label: 'Arquitectura & Prácticas', items: 'Scalable architecture, performance optimization, real-time systems, design systems, state patterns, a11y, Agile methodology, Scrum' },
        ],
      },
      education: {
        title: 'Educación',
        items: [
          {
            title: 'Ing. en Tecnologías de la Información y Comunicaciones',
            period: '2018 - 2022',
            institution: 'ITSOEH · Tecnológico Nacional de México',
          },
          {
            title: 'Platzi Master Program · Cohorte 8',
            period: 'Oct 2021 - Mar 2022',
            institution: 'Platzi · Admisión por proceso de selección',
          },
        ],
      },
      languages: {
        title: 'Idiomas',
        items: [
          { language: 'Español', level: 'Nativo / C2' },
          { language: 'Inglés', level: 'Upper-Intermediate / B2 · EF SET' },
        ],
      },
      activity: {
        title: 'Actividad Técnica',
        items: [
          'Publica en <strong>octa.page</strong> investigaciones de runtime, decisiones de arquitectura y notas de sistemas — un registro público del razonamiento técnico detrás de los proyectos.',
          'Autor publicado en <strong>IEEE Xplore</strong> — "Security Issues of a Decentralized Blockchain-Based Messaging System" (VII CONIITI, Universidad Católica de Colombia, 2021).',
          'Keynote speaker en el <strong>5° Congreso Internacional de Software, UAEH</strong> (2025) y en el <strong>Congreso Internacional de Ingeniería, ITSOEH</strong> (2025).',
          '<strong>Google Developer Student Club Lead</strong> — lideré comunidad de más de 60 estudiantes y organicé más de 20 eventos técnicos (2020-2021).',
          'Apariciones en <strong>Radio y Televisión de Hidalgo</strong> — programas Con Ciencia y Ya es Hora.',
        ],
      },
    },
  },

  en: {
    meta: {
      title: 'CV · Christian Elías Cruz González — Senior Fullstack Engineer',
      lang: 'en',
    },
    header: {
      name: 'Christian Elías Cruz González',
      role: 'Senior Fullstack Engineer — SaaS & Integrations',
      location: 'Mexico · CDMX / Hidalgo',
      availability: 'Available: June 2026 · 100% Remote',
      contact: [
        'christianecg.com',
        'github.com/ChristianECG',
        'linkedin.com/in/christianeliascg',
        'contacto@christianecg.com',
        '+52 772 120 2886',
      ],
    },
    sections: {
      summary: {
        title: 'Professional Profile',
        text: 'Senior Fullstack Engineer with 5+ years delivering production systems. End-to-end technical ownership: I build, operate, and scale — from platforms with 150K+ users to self-funded products with real revenue. Specialized in agentic workflows, LLM integrations, and systems designed for minimal human intervention.',
      },
      experience: {
        title: 'Experience',
        jobs: [
          {
            title: 'Senior Software Engineer',
            period: 'Feb 2024 – May 2026',
            company: 'Ubidots · Medellín, Colombia (Remote)',
            bullets: [
              'Led architecture and performance of an IoT SaaS platform with 150K+ active users and real-time data via WebSockets.',
              'Reduced dashboard load times from 8s to 5s (-37%) and optimized ECharts widget rendering from 30s to under 15s (-50%) through virtualization, memoization, and canvas rendering.',
              'Cut release cycle from 50 to 20 min (-60%), reducing delivery friction for a team of 20+ developers.',
              'Established quality standards, an internal ESLint plugin, and code review guidelines adopted by the whole team; mentored 2 junior engineers through pair programming and structured reviews.',
            ],
            stack: 'React, TypeScript, ECharts, TanStack Query, WebSockets, Node.js, Python (Django), ESLint (custom plugin), Jest, GitHub Actions.',
          },
          {
            title: 'Mid-Level Software Engineer',
            period: 'Jun 2022 – Feb 2024',
            company: 'Ubidots · Medellín, Colombia (Remote)',
            bullets: [
              'Implemented payments module with Stripe and migrated the fetching system to TanStack Query, eliminating duplicated state and enabling direct freemium-to-paid conversion.',
              'Built and maintained the mobile app (iOS + Android) in React Native, shipping new platform features directly to end users.',
              'Contributed to the design and implementation of key components of the real-time IoT dashboard system.',
            ],
            stack: 'React, TypeScript, React Native, TanStack Query, Stripe, WebSockets, Node.js, Python (Django), Jest.',
          },
          {
            title: 'Software Developer',
            period: 'Jul 2021 – Jun 2022',
            company: 'Clever Cloud · Mexico (Remote)',
            bullets: [
              "Developed and integrated sites (e-commerce, landing pages, blogs) on the company's proprietary CMS, owning the full cycle: requirements gathering with clients, translating to technical specs for a team of 5 devs, implementation, and delivery.",
              "Designed and implemented a pixel-perfect landing page from a graphic designer's mockups, coordinating deliveries directly with the client through final approval.",
              'Defined CI/CD flows and the dev–staging–production pipeline, adopted as the team standard.',
            ],
            stack: 'React, Vue, PHP, MySQL, GitHub Actions, CI/CD.',
          },
        ],
      },
      projects: {
        title: 'Projects',
        items: [
          {
            title: 'TuAgenda.digital',
            url: 'tuagenda.digital',
            description: 'Appointment automation SaaS currently in operation, with 5 active clients in the first 3 months and recurring revenue via Stripe: white-label booking, login-free client portal, email/SMS reminders, and an AI agent on WhatsApp with Claude API in production — handling reservations 24/7 and reducing manual operational load by ~80%.',
            tags: 'Next.js 15 · Supabase · Stripe · Twilio · Claude API · OpenAI · Vercel Edge',
          },
          {
            title: 'CatolicMixquia',
            url: 'iOS · Android',
            description: 'Cross-platform parish content app with 670+ active users: audio player with background playback, missal with an automated pipeline via GitHub Actions, daily reflection with scraping, push notifications, and offline cache.',
            tags: 'React Native · Expo · GitHub Actions · Push Notifications · AsyncStorage',
          },
          {
            title: 'Avelor',
            url: 'avelor.es',
            description: 'Self-hosted platform of 6 microservices with an independent subdomain per module: analytics with real-time heatmap, secrets vault with AES-256-GCM, deploy webhooks with persisted output logs, WebSocket tunnel, admin panel behind Tailscale VPN, and an admin CLI. Replaces third-party dependencies in production.',
            tags: 'Astro · Node.js · PHP · PostgreSQL · Tailscale · Docker · VPS',
          },
        ],
      },
      skills: {
        title: 'Skills',
        categories: [
          { label: 'Frontend & Mobile', items: 'React, Next.js, TypeScript, JavaScript (ES2021+), React Native, HTML5, CSS3, design systems' },
          { label: 'Backend & Infrastructure', items: 'Node.js, Python, FastAPI, Django, PHP, PostgreSQL, MySQL, Supabase (PostgreSQL + real-time), Vercel (Edge Functions, serverless), Docker, VPS (Linux, self-hosted), GitHub Actions (CI/CD), REST APIs, Stripe, Twilio' },
          { label: 'AI / LLM Integration', items: 'Claude API, OpenAI API, agentic workflows, LLM agents in production, prompt engineering, AI-augmented development' },
          { label: 'Quality & Tooling', items: 'ESLint (custom plugins), Jest, React Testing Library, Git, code reviews, Claude Code, GitHub Copilot' },
          { label: 'Real-Time Data', items: 'TanStack Query, WebSockets, REST APIs, ECharts, D3.js, rendering optimization' },
          { label: 'Architecture & Practices', items: 'Scalable architecture, performance optimization, real-time systems, design systems, state patterns, a11y, Agile methodology, Scrum' },
        ],
      },
      education: {
        title: 'Education',
        items: [
          {
            title: 'B.S. in Information and Communications Technology Engineering',
            period: '2018 - 2022',
            institution: 'ITSOEH · Tecnológico Nacional de México',
          },
          {
            title: 'Platzi Master Program · Cohort 8',
            period: 'Oct 2021 - Mar 2022',
            institution: 'Platzi · Admission by selection process',
          },
        ],
      },
      languages: {
        title: 'Languages',
        items: [
          { language: 'Spanish', level: 'Native / C2' },
          { language: 'English', level: 'Upper-Intermediate / B2 · EF SET' },
        ],
      },
      activity: {
        title: 'Technical Activity',
        items: [
          'Publishes at <strong>octa.page</strong> — runtime research, architecture decisions, and systems notes — a public record of the technical reasoning behind the projects.',
          'Published author on <strong>IEEE Xplore</strong> — "Security Issues of a Decentralized Blockchain-Based Messaging System" (VII CONIITI, Universidad Católica de Colombia, 2021).',
          'Keynote speaker at the <strong>5th International Software Congress, UAEH</strong> (2025) and at the <strong>International Engineering Congress, ITSOEH</strong> (2025).',
          '<strong>Google Developer Student Club Lead</strong> — led a community of 60+ students and organized 20+ technical events (2020-2021).',
          'Featured on <strong>Hidalgo Radio and Television</strong> — Con Ciencia and Ya es Hora programs.',
        ],
      },
    },
  },

  lat: {
    meta: {
      title: 'Curriculum Vitae · Christian Elías Cruz González — Faber Programmatus Senior',
      lang: 'la',
    },
    header: {
      name: 'Christian Elías Cruz González',
      role: 'Faber Programmatus Senior — SaaS et Integrationes',
      location: 'Mexicum · CDMX / Hidalgo',
      availability: 'Inceptio: Iunio MMXXVI · 100% e longinquo',
      contact: [
        'christianecg.com',
        'github.com/ChristianECG',
        'linkedin.com/in/christianeliascg',
        'contacto@christianecg.com',
        '+52 772 120 2886',
      ],
    },
    sections: {
      summary: {
        title: 'Descriptio Professionalis',
        text: 'Faber Programmatus Senior cum quinque et amplius annis systemata in productione tradendi. Dominium technicum ab initio ad finem: construo, administro et augeo — a suggestibus cum CL milibus utentium usque ad opera propria cum vectigali reali. Peritus in processum agentium, integratione LLM et systematibus ad minimam humanam interventionem designatis.',
      },
      experience: {
        title: 'Experientia',
        jobs: [
          {
            title: 'Faber Programmatus Senior',
            period: 'Feb. MMXXIV – Mai. MMXXVI',
            company: 'Ubidots · Medellín, Columbia (e longinquo)',
            bullets: [
              'Architecturam et celeritatem suggestus IoT SaaS cum CL milibus utentium activorum et data in tempore reali per WebSockets duxi.',
              'Tempora onerationis a 8s ad 5s (-37%) et redditum ECharts a 30s ad 15s (-50%) per virtualizationem, memoizationem et canvas rendering minui.',
              'Cyclum editionis a 50 ad 20 min (-60%) contraxi, frictionem tradendi pro grege XX+ fabricatorum minuens.',
              'Normas qualitatis, pluginum ESLint internum et modos recensionis constitui; duos fabricatores iuniores per programmationem pari et recensiones structuratas mentoravi.',
            ],
            stack: 'React, TypeScript, ECharts, TanStack Query, WebSockets, Node.js, Python (Django), ESLint (pluginum internum), Jest, GitHub Actions.',
          },
          {
            title: 'Faber Programmatus Medius',
            period: 'Iun. MMXXII – Feb. MMXXIV',
            company: 'Ubidots · Medellín, Columbia (e longinquo)',
            bullets: [
              'Modulum solutionis pecuniariae cum Stripe institui et systema petendi ad TanStack Query migravi, status duplicatos delens et conversionem directam a gratuito ad solutum agens.',
              'Applicationem mobilem (iOS et Android) in React Native construxi et sustinui, novas functiones suggestus utentibus tradidi.',
              'In consilio et exsecutione componentium principalium systematis dascifolii IoT in tempore reali participavi.',
            ],
            stack: 'React, TypeScript, React Native, TanStack Query, Stripe, WebSockets, Node.js, Python (Django), Jest.',
          },
          {
            title: 'Fabricator Programmatum',
            period: 'Iul. MMXXI – Iun. MMXXII',
            company: 'Clever Cloud · Mexicum (e longinquo)',
            bullets: [
              'Situs in CMS proprietario societatis fabricavi et integravi, cyclum plenum gerens: requisita a clientibus colligens, in speciificationes technicas pro grege quinque fabricatorum vertens, exsecutionem et traditionem curans.',
              'Paginam introductivam ex imaginibus designatricis graphicae accurate ad pixelem designavi et exsecutioni dedi, traditiones cum cliente directe coordinans usque ad approbationem finalem.',
              'Vias CI/CD et condicionem dev-staging-productionem definivi, in normam gregis adoptatas.',
            ],
            stack: 'React, Vue, PHP, MySQL, GitHub Actions, CI/CD.',
          },
        ],
      },
      projects: {
        title: 'Opera',
        items: [
          {
            title: 'TuAgenda.digital',
            url: 'tuagenda.digital',
            description: 'SaaS automationis temporum nunc in operatione, cum quinque clientibus activis in primis tribus mensibus et vectigali recurrente per Stripe: inscriptio sub nomine alieno, portale clientis sine ingressu, admonitiones per electronicam epistulam et SMS, agensque AI in WhatsApp cum Claude API in productione — curationem vacationum XXIV/VII agens et onus manuale operationale circa 80% minuens.',
            tags: 'Next.js 15 · Supabase · Stripe · Twilio · Claude API · OpenAI · Vercel Edge',
          },
          {
            title: 'CatolicMixquia',
            url: 'iOS · Android',
            description: 'Applicatio multiinstrumentalis contentus paroecialis cum DCLXX+ utentibus activis: lusor soni cum repraesentatione in fundo, missale cum condictione automatica per GitHub Actions, reflexio cotidiana cum raptione, notificationes impulsae et copia sine rete.',
            tags: 'React Native · Expo · GitHub Actions · Notificationes Impulsae · AsyncStorage',
          },
          {
            title: 'Avelor',
            url: 'avelor.es',
            description: 'Suggestus VI microserviciorum in proprio machinarum hospitio, cum subdominio independenti per modulum: analytics cum schemate calidi in tempore reali, thesaurus secretorum cum AES-256-GCM, verriculi deponendi cum productis persistitis, meatus WebSocket, tabella administrativa post Tailscale VPN et CLI administrationis. Dependentias tertiarum partium in productione reponit.',
            tags: 'Astro · Node.js · PHP · PostgreSQL · Tailscale · Docker · VPS',
          },
        ],
      },
      skills: {
        title: 'Peritiae',
        categories: [
          { label: 'Frontend et Mobile', items: 'React, Next.js, TypeScript, JavaScript (ES2021+), React Native, HTML5, CSS3, systemata designationis' },
          { label: 'Backend et Infrastructura', items: 'Node.js, Python, FastAPI, Django, PHP, PostgreSQL, MySQL, Supabase, Vercel, Docker, VPS (Linux), GitHub Actions (CI/CD), REST APIs, Stripe, Twilio' },
          { label: 'AI / Integratio LLM', items: 'Claude API, OpenAI API, processus agentium, agentes LLM in productione, ars prompti, evolutio augmentata AI' },
          { label: 'Qualitas et Instrumenta', items: 'ESLint (plugina propria), Jest, React Testing Library, Git, recensiones codicis, Claude Code, GitHub Copilot' },
          { label: 'Data in Tempore Reali', items: 'TanStack Query, WebSockets, REST APIs, ECharts, D3.js, optimizatio reddendi' },
          { label: 'Architectura et Praxis', items: 'Architectura crescens, optimizatio celeritatis, systemata in tempore reali, systemata designationis, exemplaria status, a11y, methodus Agilis, Scrum' },
        ],
      },
      education: {
        title: 'Educatio',
        items: [
          {
            title: 'Ingeniariae in Technologiis Informationis et Communicationum',
            period: 'MMXVIII – MMXXII',
            institution: 'ITSOEH · Technologicum Nationale Mexici',
          },
          {
            title: 'Programma Magistri Platzi · Cohorte VIII',
            period: 'Oct. MMXXI – Mar. MMXXII',
            institution: 'Platzi · Admissio per processum selectionis',
          },
        ],
      },
      languages: {
        title: 'Linguae',
        items: [
          { language: 'Hispanica', level: 'Nativa / C2' },
          { language: 'Anglica', level: 'Upper-Intermediate / B2 · EF SET' },
          { language: 'Latina', level: 'Satis — dum paginas construo' },
        ],
      },
      activity: {
        title: 'Activitas Technica',
        items: [
          'In <strong>octa.page</strong> scribit — investigationes de tempore reddendi, decisiones architecturae et notas systematum — registrum publicum rationis technicae post opera.',
          'Auctor publicatus in <strong>IEEE Xplore</strong> — "Security Issues of a Decentralized Blockchain-Based Messaging System" (VII CONIITI, Universitas Catholica Columbiae, MMXXI).',
          'Orator in <strong>Quinto Congressu Internationali Programmaticae, UAEH</strong> (MMXXV) et in <strong>Congressu Internationali Ingeniaria, ITSOEH</strong> (MMXXV).',
          '<strong>Dux Collegii Studentium Fabricatorum Google</strong> — communitatem LX+ studentium duxi et XX+ eventus technicos institui (MMXX–MMXXI).',
          'In <strong>Radio et Televisione Hidalgi</strong> apparuit — in programmatibus Con Ciencia et Ya es Hora.',
        ],
      },
    },
  },
}
