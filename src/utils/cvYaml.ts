import type { CVData } from '../data/cv';
import { parsePeriod } from './period';

const stripHtml = (s: string) => s.replace(/<\/?strong>/g, '');
const slugify = (s: string) =>
  s.toLowerCase().normalize('NFD').replace(/[̀-ͯ]/g, '').replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');

// ponytail: JSON is valid YAML flow-scalar syntax, so JSON.stringify gives
// correct quoting/escaping for free — no need for a hand-rolled YAML escaper
// or a js-yaml dependency for a document we only ever emit, never parse.
const scalar = (v: string) => JSON.stringify(v);
const iso = (d: Date) => d.toISOString().slice(0, 10);

export function cvToK8sYaml(data: CVData, lang: 'es' | 'en' | 'lat'): string {
  const { header, sections } = data;
  const out: string[] = [];

  out.push('apiVersion: careers.christianecg.com/v1');
  out.push('kind: SoftwareEngineer');
  out.push('metadata:');
  out.push(`  name: ${slugify(header.name)}`);
  out.push('  labels:');
  out.push(`    role: ${slugify(header.role)}`);
  out.push(`    location: ${slugify(header.location)}`);
  out.push('  annotations:');
  for (const c of header.contact) {
    const key = c.includes('@') ? 'contact/email' : c.startsWith('+') ? 'contact/phone' : c.includes('github')
      ? 'contact/github' : c.includes('linkedin') ? 'contact/linkedin' : 'contact/site';
    out.push(`    ${key}: ${scalar(c)}`);
  }

  out.push('spec:');
  out.push(`  summary: ${scalar(sections.summary.text)}`);

  out.push('  containers:');
  for (const job of sections.experience.jobs) {
    const { start, end } = parsePeriod(job.period, lang);
    const org = slugify(job.company.split('·')[0]);
    out.push(`    - name: ${slugify(`${org}-${job.title}`)}`);
    out.push(`      image: ${scalar(`${org}:${slugify(job.title)}`)}`);
    out.push('      env:');
    out.push(`        - { name: TITLE, value: ${scalar(job.title)} }`);
    out.push(`        - { name: COMPANY, value: ${scalar(job.company)} }`);
    out.push(`        - { name: START_DATE, value: ${scalar(iso(start))} }`);
    out.push(`        - { name: END_DATE, value: ${scalar(iso(end))} }`);
    out.push(`        - { name: STACK, value: ${scalar(job.stack)} }`);
    out.push(`      command: [${job.bullets.map(scalar).join(', ')}]`);
  }

  out.push('  volumes:');
  for (const p of sections.projects.items) {
    out.push(`    - name: ${slugify(p.title)}`);
    out.push(`      mountPath: ${scalar(p.url)}`);
    out.push(`      description: ${scalar(p.description)}`);
    out.push(`      tags: [${p.tags.split('·').map((t) => scalar(t.trim())).join(', ')}]`);
  }

  out.push('  nodeSelector:');
  sections.languages.items.forEach((l, i) => {
    out.push(`    language-${i === 0 ? 'native' : 'secondary'}: ${scalar(`${l.language} (${l.level})`)}`);
  });

  out.push('  education:');
  for (const e of sections.education.items) {
    out.push(`    - institution: ${scalar(e.institution)}`);
    out.push(`      area: ${scalar(e.title)}`);
    out.push(`      period: ${scalar(e.period)}`);
  }

  out.push('  activity:');
  for (const a of sections.activity.items) out.push(`    - ${scalar(stripHtml(a))}`);

  return out.join('\n') + '\n';
}
