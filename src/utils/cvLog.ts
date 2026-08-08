import type { CVData } from '../data/cv';
import { parsePeriod } from './period';

const q = (s: string) => `"${s.replace(/"/g, '\\"')}"`;
const monthsBetween = (a: Date, b: Date) => (b.getFullYear() - a.getFullYear()) * 12 + (b.getMonth() - a.getMonth());

function line(date: Date, level: string, fields: Record<string, string | number>): string {
  const kv = Object.entries(fields).map(([k, v]) => `${k}=${v}`).join(' ');
  return `${date.toISOString()} level=${level} ${kv}`;
}

// logfmt (key=value per line) — the format Heroku popularized for structured
// logs. One event per job transition + one per bullet, oldest first.
export function cvToLog(data: CVData, lang: 'es' | 'en' | 'lat'): string {
  const { sections } = data;
  const jobs = sections.experience.jobs.slice().reverse();
  const out: string[] = [];

  jobs.forEach((job) => {
    const { start, end } = parsePeriod(job.period, lang);
    out.push(line(start, 'info', {
      event: 'role.started',
      title: q(job.title),
      company: q(job.company),
    }));
    for (const b of job.bullets) {
      out.push(line(start, 'info', { event: 'achievement', role: q(job.title), detail: q(b) }));
    }
    out.push(line(end, 'info', {
      event: 'role.ended',
      title: q(job.title),
      company: q(job.company),
      duration_months: monthsBetween(start, end),
    }));
  });

  return out.join('\n');
}
