import { apiResponse, SITE } from './_json';

export function GET() {
  return apiResponse('/api/profile.json', [
    {
      name: 'Christian Elías Cruz González',
      role: {
        es: 'Ingeniero de Software Senior',
        en: 'Senior Software Engineer',
        lat: 'Faber Programmatus Senior',
      },
      location: { country: 'Mexico', region: 'Hidalgo / CDMX', remote_since: 2021 },
      email: 'contacto@christianecg.com',
      website: SITE,
      links: {
        github: 'https://github.com/ChristianECG',
        linkedin: 'https://www.linkedin.com/in/christianeliascg/',
        octa: 'https://octa.page',
        ieee: 'https://ieeexplore.ieee.org/author/37089182389',
        ietf: 'https://datatracker.ietf.org/person/Christian%20El%C3%ADas%20Cruz%20Gonz%C3%A1lez',
      },
      languages: ['es', 'en', 'lat'],
      cv: {
        es: `${SITE}/Christian_Elias_Cruz_Gonzalez_esp.pdf`,
        en: `${SITE}/Christian_Elias_Cruz_Gonzalez_eng.pdf`,
        lat: `${SITE}/Christian_Elias_Cruz_Gonzalez_lat.pdf`,
      },
    },
  ]);
}
