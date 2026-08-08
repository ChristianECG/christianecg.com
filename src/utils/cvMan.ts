import type { CVData } from '../data/cv';

const stripHtml = (s: string) => s.replace(/<\/?strong>/g, '');
const slugify = (s: string) =>
  s.toLowerCase().normalize('NFD').replace(/[̀-ͯ]/g, '').replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');

// troff/groff: backslash and hyphen are control characters; a line starting
// with "." or "'" is parsed as a macro request unless escaped with "\&".
const esc = (s: string) => s.replace(/\\/g, '\\\\').replace(/-/g, '\\-');
const guard = (s: string) => (s.startsWith('.') || s.startsWith("'") ? `\\&${s}` : s);
const troffLine = (s: string) => guard(esc(s));

export function cvToManPage(data: CVData, date: string, locale: string): string {
  const { header, sections } = data;
  const slug = slugify(header.name);
  const out: string[] = [];

  // ".\"" starts a troff comment line — invisible to man/groff, just a note
  // for whoever opens the raw source before rendering it.
  out.push('.\\" This is real troff (man(7) macros), not plain text shaped like it.');
  out.push('.\\" Render it locally (works on both BSD/macOS and GNU man — a bare');
  out.push('.\\" "-l -" stdin flag is GNU-only and fails on macOS\'s man):');
  out.push(`.\\"   curl -s https://christianecg.com/${locale}/cv.1 -o /tmp/cv.1 && man /tmp/cv.1`);
  out.push('.\\" Generated at build time from src/data/cv.ts — do not edit by hand.');
  out.push(`.TH CV 1 "${date}" "christianecg.com" "User Commands"`);

  out.push('.SH NAME');
  out.push(`${slug} \\- ${esc(header.role)}`);

  out.push('.SH SYNOPSIS');
  out.push(`.B ${slug}`);
  out.push(`[\\-\\-location "${esc(header.location)}"] [\\-\\-remote] [\\-\\-hire]`);

  out.push('.SH DESCRIPTION');
  out.push(troffLine(sections.summary.text));

  out.push('.SH OPTIONS');
  for (const c of sections.skills.categories) {
    out.push('.TP');
    out.push(`.B \\-\\-${slugify(c.label)}`);
    out.push(troffLine(c.items));
  }

  out.push(`.SH ${sections.experience.title.toUpperCase()}`);
  for (const job of sections.experience.jobs) {
    out.push('.TP');
    out.push(`.B ${esc(job.title)}, ${esc(job.company)} (${esc(job.period)})`);
    out.push(troffLine(job.bullets.join(' ')));
    out.push('.br');
    out.push(troffLine(`Stack: ${job.stack}`));
  }

  out.push(`.SH ${sections.projects.title.toUpperCase()}`);
  for (const p of sections.projects.items) {
    out.push('.TP');
    out.push(`.B ${esc(p.title)} (${esc(p.url)})`);
    out.push(troffLine(p.description));
  }

  out.push(`.SH ${sections.education.title.toUpperCase()}`);
  for (const e of sections.education.items) {
    out.push('.TP');
    out.push(`.B ${esc(e.title)}`);
    out.push(troffLine(`${e.institution} (${e.period})`));
  }

  out.push(`.SH ${sections.languages.title.toUpperCase()}`);
  for (const l of sections.languages.items) {
    out.push('.TP');
    out.push(`.B ${esc(l.language)}`);
    out.push(troffLine(l.level));
  }

  out.push(`.SH ${sections.activity.title.toUpperCase()}`);
  out.push('.RS');
  for (const a of sections.activity.items) {
    out.push(troffLine(stripHtml(a)));
    out.push('.br');
  }
  out.push('.RE');

  out.push('.SH SEE ALSO');
  const links = header.contact.filter((c) => !c.includes('@') && !c.startsWith('+'));
  out.push(links.map((c) => `.BR ${esc(c)}`).join(' (1),\n') + ' (1)');

  out.push('.SH AUTHOR');
  const email = header.contact.find((c) => c.includes('@')) ?? '';
  out.push(`Written by ${esc(header.name)} <${email}>.`);

  out.push('.SH BUGS');
  out.push('None known. Reports of overengineered side projects may be filed at the address above.');

  return out.join('\n');
}
