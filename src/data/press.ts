export interface PressDocument {
  label_es: string;
  label_en: string;
  label_lat?: string;
  url: string;
}

export interface PressPhoto {
  url: string;
  alt_es: string;
  alt_en: string;
  alt_lat?: string;
}

export interface PressKit {
  slug: string;
  date: string; // ISO YYYY-MM-DD for sorting
  date_es: string;
  date_en: string;
  date_lat?: string;
  title_es: string;
  title_en: string;
  title_lat?: string;
  event_es: string;
  event_en: string;
  event_lat?: string;
  description_es: string;
  description_en: string;
  description_lat?: string;
  photos: PressPhoto[];
  documents: PressDocument[];
  links?: { label: string; url: string }[];
}

export interface PressMention {
  date: string; // ISO YYYY-MM-DD for sorting
  date_es: string;
  date_en: string;
  outlet: string;
  lang: 'es' | 'en' | 'lat'; // original language of the article
  title: string; // always in the original language
  url: string;
}

export const pressKits: PressKit[] = [
  {
    slug: 'ipoac-dns',
    date: '2027-04-01',
    date_es: 'Abr 2027',
    date_en: 'Apr 2027',
    title_es: 'DNS over Avian Carriers (DoAC)',
    title_en: 'DNS over Avian Carriers (DoAC)',
    title_lat: 'DNS super Vectores Aviarios (DoAC)',
    event_es: 'IETF Internet-Draft · draft-cruzgonzalez-ipoac-dns',
    event_en: 'IETF Internet-Draft · draft-cruzgonzalez-ipoac-dns',
    event_lat: 'IETF Epistula Interretialis · draft-cruzgonzalez-ipoac-dns',
    description_es:
      'Internet-Draft presentado ante el IETF que especifica un mecanismo para resolver nombres de dominio sobre redes de palomas mensajeras. Cierra la brecha crítica que el RFC 1149 dejó abierta durante más de tres décadas: ¿cómo resuelve un hostname un nodo en una red aviar? El documento sigue el formato técnico completo de los RFC de 1 de abril — tan riguroso en su revisión como cualquier estándar de internet, tan honesto en su propósito.',
    description_en:
      'Internet-Draft submitted to the IETF specifying a mechanism for resolving domain names over carrier pigeon networks. It closes the critical gap left open by RFC 1149 for over three decades: how does a host on an avian-carrier network resolve a hostname? The document follows the complete technical format of April 1st RFCs — as rigorous in its review as any internet standard, as honest in its purpose.',
    photos: [],
    documents: [
      {
        label_es: 'Resumen para prensa (PDF · ES)',
        label_en: 'Resumen para prensa (PDF · ES)',
        url: '/press/ipoac-dns/resumen-prensa-es.pdf',
      },
      {
        label_es: 'Press summary (PDF · EN)',
        label_en: 'Press summary (PDF · EN)',
        url: '/press/ipoac-dns/press-summary-en.pdf',
      },
      {
        label_es: 'Contexto y citas (PDF · ES)',
        label_en: 'Contexto y citas (PDF · ES)',
        url: '/press/ipoac-dns/contexto-es.pdf',
      },
      {
        label_es: 'Context & quotes (PDF · EN)',
        label_en: 'Context & quotes (PDF · EN)',
        url: '/press/ipoac-dns/context-en.pdf',
      },
    ],
    links: [
      {
        label: 'IETF Datatracker',
        url: 'https://datatracker.ietf.org/doc/draft-cruzgonzalez-ipoac-dns/',
      },
      {
        label: 'RFC 1149',
        url: 'https://datatracker.ietf.org/doc/html/rfc1149',
      },
    ],
  },
  {
    slug: 'coniiti-2021',
    date: '2021-10-05',
    date_es: 'Oct 2021',
    date_en: 'Oct 2021',
    date_lat: 'Oct 2021',
    title_es: 'Security Issues of a Decentralized BlockChain-Based Messaging System',
    title_en: 'Security Issues of a Decentralized BlockChain-Based Messaging System',
    title_lat: 'Security Issues of a Decentralized BlockChain-Based Messaging System',
    event_es: 'VII CONIITI · Universidad Católica de Colombia · IEEE Xplore',
    event_en: 'VII CONIITI · Universidad Católica de Colombia · IEEE Xplore',
    event_lat: 'VII CONIITI · Universitas Catholica Columbiae · IEEE Xplore',
    description_es:
      'Artículo de investigación presentado en el VII Congreso Internacional de Innovación y Tendencias en Ingeniería (CONIITI) de la Universidad Católica de Colombia, y posteriormente aceptado para publicación en IEEE Xplore. Propone un sistema de mensajería descentralizado basado en blockchain como alternativa a los servicios centralizados, siguiendo los principios del white paper de Satoshi Nakamoto.',
    description_en:
      'Research paper presented at the VII International Congress on Innovation and Trends in Engineering (CONIITI) at Universidad Católica de Colombia, subsequently accepted for publication in IEEE Xplore. Proposes a decentralized blockchain-based messaging system as an alternative to centralized services, following the principles of Satoshi Nakamoto\'s white paper.',
    description_lat:
      'Dissertatio investigationis in VII Congressu Internationali Innovationis et Tendentiarum in Ingenieria (CONIITI) apud Universitatem Catholicam Columbiae praesentation, postea in IEEE Xplore edita. Systema nuntiorum decentralizatum in nexu nexuum proponitur ut alternativa servitiis centralibus.',
    photos: [
      {
        url: '/press/coniiti-2021/foto-autor.jpg',
        alt_es: 'Christian Elías Cruz González — CONIITI 2021',
        alt_en: 'Christian Elías Cruz González — CONIITI 2021',
      },
    ],
    documents: [
      {
        label_es: 'Paper completo (PDF)',
        label_en: 'Full paper (PDF)',
        label_lat: 'Dissertatio plena (PDF)',
        url: '/papers/blockchain-messaging-security.pdf',
      },
      {
        label_es: 'Resumen para prensa (PDF · ES)',
        label_en: 'Resumen para prensa (PDF · ES)',
        url: '/press/coniiti-2021/resumen-prensa-es.pdf',
      },
      {
        label_es: 'Press summary (PDF · EN)',
        label_en: 'Press summary (PDF · EN)',
        url: '/press/coniiti-2021/press-summary-en.pdf',
      },
    ],
    links: [],
  },
];

export const pressMentions: PressMention[] = [
  {
    date: '2021-10-05',
    date_es: '5 Oct 2021',
    date_en: 'Oct 5, 2021',
    lang: 'es',
    outlet: 'ITSOEH',
    title: 'El ITSOEH reconoce a Christian Elías Cruz González por la presentación de su artículo en el VII CONIITI de la Universidad Católica de Colombia',
    url: 'https://www.facebook.com/permalink.php?story_fbid=pfbid036rLM3Xc9dKymqpyv5JTw2bxjoFNYVWQ5p7DvAw9hRzzVJ5v8QAwYE3fA42ekn2TGl&id=100069473374138',
  },
  {
    date: '2021-12-13',
    date_es: '13 Dic 2021',
    date_en: 'Dec 13, 2021',
    lang: 'es',
    outlet: 'ITSOEH',
    title: 'El ITSOEH felicita a Christian Elías Cruz González por la incorporación de su artículo a la base de datos IEEE Xplore',
    url: 'https://www.facebook.com/permalink.php?story_fbid=pfbid026zR7QWiXvGkKgRJyeFJJd2nKcp8qYGeFzQnLXoBDQt559ZEkP5K79kDDjZjEumzal&id=100069473374138',
  },
  {
    date: '2022-03-01',
    date_es: 'Mar 2022',
    date_en: 'Mar 2022',
    lang: 'es',
    outlet: 'Horizontes ANUIES',
    title: 'Estudiante del ITSOEH publica artículo en la plataforma científica más importante del mundo «IEEE Xplore»',
    url: 'https://uttehuacan.edu.mx/media/files/HORIZONTES%20MARZO.pdf',
  },
  {
    date: '2022-01-07',
    date_es: '7 Ene 2022',
    date_en: 'Jan 7, 2022',
    lang: 'es',
    outlet: 'Hidalgo en Línea',
    title: 'Estudiante del ITSOEH publica artículo en «IEEE Xplore», la plataforma científica más importante del mundo',
    url: 'https://www.facebook.com/hgolinea/posts/pfbid02XDjSmgHY1v7zKozg5XcJAft8TstnZTGSaiNPMTfBdLorJcYRSBnKFTLorQ8Hiuidl',
  },
  {
    date: '2022-01-17',
    date_es: '17 Ene 2022',
    date_en: 'Jan 17, 2022',
    lang: 'es',
    outlet: 'TecNM',
    title: 'Christian Elías Cruz González publica artículo sobre seguridad en sistemas de mensajería descentralizada',
    url: 'https://www.tecnm.mx/index.php?vista=noticia&id=2146&pn=91',
  },
];
