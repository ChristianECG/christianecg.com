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
    availability?: string
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
      role: 'Senior Fullstack Engineer — SaaS & Integrations',
      location: 'México · CDMX / Hidalgo',
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
            description: 'SaaS de automatización de citas actualmente en operación, con 5 clientes activos en los primeros 3 meses y facturación recurrente vía Stripe: booking white-label, portal de cliente sin login, recordatorios por email/SMS y agente de IA en WhatsApp con OpenAI en producción — atendiendo reservas 24/7 y reduciendo la carga operativa manual en ~80%.',
            tags: 'Next.js 15 · Supabase · Stripe · Twilio · OpenAI · Vercel Edge',
          },
          {
            title: 'Squawk',
            url: 'squawk.creu.cat',
            description: 'Dashboard de aviación global en tiempo real: datos ADS-B vía OpenSky Network, worker Node.js con SQLite (WAL mode), mapa de densidad con deck.gl + MapLibre, 6 gráficas en vivo con ECharts y alertas de squawks de emergencia (7700/7600/7500) sobre streaming SSE cada 5s.',
            tags: 'Next.js 15 · TypeScript · deck.gl · MapLibre · ECharts · SQLite · SSE',
          },
          {
            title: 'Avelor',
            url: 'pkg.avelor.es',
            description: 'Ecosistema de 17 herramientas CLI publicadas en npm bajo @avelor. Destacan: mesh (proxy local con HTTPS y fault injection), floo (deployment agent SSH con GitHub Action y Homebrew tap), bifrost (WebSocket tunnel autoalojado) y mira (uptime monitor con página de estado estática). Cada herramienta elimina una dependencia de tercero en producción.',
            tags: 'Node.js · CLI · npm · WebSocket · SSH · self-hosted',
          },
          {
            title: 'Stratum',
            url: 'stratum.creu.cat',
            description: 'Herramienta de arte generativo que convierte 75 años de datos meteorológicos históricos en visualizaciones de franjas de color por ciudad. Temperatura diaria, precipitación y horas de sol se codifican como grosor, tono y superposición; exportable en SVG, PNG y PDF sin servidor.',
            tags: 'React · TypeScript · Vite · ECharts · Open-Meteo',
          },
          {
            title: 'Loft',
            url: 'loft.creu.cat',
            description: 'Implementación de referencia de RFC 1149 (IP sobre portadores aviares): rastreo en tiempo real de paquetes IP transportados por palomas. Física de vuelo modelada con datos meteorológicos reales, mapa global con rutas de gran círculo, streaming SSE y soporte en tres idiomas incluyendo latín.',
            tags: 'Next.js · SQLite · MapLibre · SSE · i18n',
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
            description: 'Appointment automation SaaS currently in operation, with 5 active clients in the first 3 months and recurring revenue via Stripe: white-label booking, login-free client portal, email/SMS reminders, and an AI agent on WhatsApp with OpenAI in production — handling reservations 24/7 and reducing manual operational load by ~80%.',
            tags: 'Next.js 15 · Supabase · Stripe · Twilio · OpenAI · Vercel Edge',
          },
          {
            title: 'Squawk',
            url: 'squawk.creu.cat',
            description: 'Real-time global aviation dashboard: ADS-B transponder data via OpenSky Network, Node.js worker with SQLite WAL mode, density heatmap via deck.gl + MapLibre, 6 live ECharts charts, and emergency squawk alerts (7700/7600/7500) over SSE streaming every 5s.',
            tags: 'Next.js 15 · TypeScript · deck.gl · MapLibre · ECharts · SQLite · SSE',
          },
          {
            title: 'Avelor',
            url: 'pkg.avelor.es',
            description: 'Ecosystem of 17 CLI tools published on npm under @avelor. Highlights: mesh (local dev proxy with HTTPS and fault injection), floo (SSH deployment agent with GitHub Action and Homebrew tap), bifrost (self-hosted WebSocket tunnel relay), and mira (uptime monitor with auto-generated static status page). Each tool eliminates a third-party dependency in production.',
            tags: 'Node.js · CLI · npm · WebSocket · SSH · self-hosted',
          },
          {
            title: 'Stratum',
            url: 'stratum.creu.cat',
            description: 'Generative art tool that converts 75 years of historical weather data into color-coded stripe visualizations per city. Daily temperature range, precipitation, and sunshine hours are encoded as stripe width, hue, and overlay. Exportable as SVG, PNG, and PDF with no server required.',
            tags: 'React · TypeScript · Vite · ECharts · Open-Meteo',
          },
          {
            title: 'Loft',
            url: 'loft.creu.cat',
            description: 'Reference implementation of RFC 1149 (IP over Avian Carriers): real-time tracking of IP datagrams transported by homing pigeons. Flight physics modeled with live meteorological data, global map with great-circle routes, SSE streaming, and three-language support including Latin.',
            tags: 'Next.js · SQLite · MapLibre · SSE · i18n',
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
            description: 'SaaS automationis temporum nunc in operatione, cum quinque clientibus activis in primis tribus mensibus et vectigali recurrente per Stripe: inscriptio sub nomine alieno, portale clientis sine ingressu, admonitiones per electronicam epistulam et SMS, agensque AI in WhatsApp cum OpenAI in productione — curationem vacationum XXIV/VII agens et onus manuale operationale circa 80% minuens.',
            tags: 'Next.js 15 · Supabase · Stripe · Twilio · OpenAI · Vercel Edge',
          },
          {
            title: 'Squawk',
            url: 'squawk.creu.cat',
            description: 'Tabula navigationis aereae globalis in tempore reali: data ADS-B per OpenSky Network, operarius Node.js cum SQLite (modus WAL), mappa densitatis per deck.gl + MapLibre, VI tabulae vivae per ECharts et monitus squawkorum urgentium (7700/7600/7500) per fluxum SSE quinto quoque secundo.',
            tags: 'Next.js 15 · TypeScript · deck.gl · MapLibre · ECharts · SQLite · SSE',
          },
          {
            title: 'Avelor',
            url: 'pkg.avelor.es',
            description: 'Systema XVII instrumentorum CLI in npm sub @avelor editorum. Praecipua: mesh (procurator localis cum HTTPS et iniectione defectionis), floo (agens dispositionis SSH cum actione GitHub et tabula Homebrew), bifrost (translactor WebSocket se-hospitatus) et mira (monitor stabilitatis cum pagina status statice generata). Quodque instrumentum dependentiam tertiae partis in productione tollit.',
            tags: 'Node.js · CLI · npm · WebSocket · SSH · self-hosted',
          },
          {
            title: 'Stratum',
            url: 'stratum.creu.cat',
            description: 'Instrumentum artis generativae quod LXXV annos datorum meteorologicorum historicorum in visualizationes viarum coloratarum per urbem convertit. Temperatura diurna, imber et horae solis in latitudinem, colorem et stratum transformantur; in SVG, PNG et PDF sine ministro exportabilia.',
            tags: 'React · TypeScript · Vite · ECharts · Open-Meteo',
          },
          {
            title: 'Loft',
            url: 'loft.creu.cat',
            description: 'Exsecutio referentiae RFC 1149 (IP per portitores aviares): observatio in tempore reali datagrammatum IP per columbas nuntias. Physica volatus cum datis meteorologicis veris simulatur, mappa globalis cum viis circuli magni, fluxus SSE et subsidium trium linguarum, Latinae inclusae.',
            tags: 'Next.js · SQLite · MapLibre · SSE · i18n',
          },
        ],
      },
      skills: {
        title: 'Peritiae',
        categories: [
          { label: 'Frontend et Mobile', items: 'React, Next.js, TypeScript, JavaScript (ES2021+), React Native, HTML5, CSS3, systemata designationis' },
          { label: 'Backend et Infrastructura', items: 'Node.js, Python, FastAPI, Django, PHP, PostgreSQL, MySQL, Supabase (PostgreSQL + tempus reale), Vercel (Edge Functions, serverless), Docker, VPS (Linux, self-hosted), GitHub Actions (CI/CD), REST APIs, Stripe, Twilio' },
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
