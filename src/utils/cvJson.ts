import type { CVData } from '../data/cv';
import { parsePeriod } from './period';

const stripHtml = (s: string) => s.replace(/<\/?strong>/g, '');
const iso = (d: Date) => d.toISOString().slice(0, 10);
const findContact = (contact: string[], pred: (c: string) => boolean) => contact.find(pred) ?? '';

// JSON Resume (https://jsonresume.org) — an open, tool-agnostic résumé schema.
export function cvToJsonResume(data: CVData, lang: 'es' | 'en' | 'lat', locale: string) {
  const { header, sections } = data;

  return {
    $schema: 'https://raw.githubusercontent.com/jsonresume/resume-schema/master/schema.json',
    basics: {
      name: header.name,
      label: header.role,
      email: findContact(header.contact, (c) => c.includes('@')),
      phone: findContact(header.contact, (c) => c.startsWith('+')),
      url: 'https://christianecg.com',
      summary: sections.summary.text,
      location: { address: header.location },
      profiles: [
        { network: 'GitHub', url: `https://${findContact(header.contact, (c) => c.includes('github.com'))}` },
        { network: 'LinkedIn', url: `https://${findContact(header.contact, (c) => c.includes('linkedin.com'))}` },
      ],
    },
    work: sections.experience.jobs
      .slice()
      .reverse()
      .map((job) => {
        const { start, end } = parsePeriod(job.period, lang);
        return {
          name: job.company,
          position: job.title,
          startDate: iso(start),
          endDate: iso(end),
          highlights: job.bullets,
          summary: `Stack: ${job.stack}`,
        };
      }),
    projects: sections.projects.items.map((p) => ({
      name: p.title,
      description: p.description,
      url: p.url.startsWith('http') ? p.url : `https://${p.url}`,
      keywords: p.tags.split('·').map((t) => t.trim()),
    })),
    skills: sections.skills.categories.map((c) => ({
      name: c.label,
      keywords: c.items.split(',').map((s) => s.trim()),
    })),
    education: sections.education.items.map((e) => {
      const { start, end } = parsePeriod(e.period, lang);
      return { institution: e.institution, area: e.title, startDate: iso(start), endDate: iso(end) };
    }),
    languages: sections.languages.items.map((l) => ({ language: l.language, fluency: l.level })),
    interests: [{ name: sections.activity.title, keywords: sections.activity.items.map(stripHtml) }],
    meta: {
      canonical: `https://christianecg.com/${locale}/cv.json`,
      version: 'v1.0.0',
      lastModified: new Date().toISOString(),
    },
  };
}
