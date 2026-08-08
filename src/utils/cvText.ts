import type { CVData } from '../data/cv';

const WIDTH = 72;

// ponytail: HTML in activity items is just <strong> — a regex swap is enough,
// upgrade to a real sanitizer if richer markup shows up in cv.ts.
const stripHtml = (s: string) => s.replace(/<\/?strong>/g, '');
const toMdBold = (s: string) => s.replace(/<strong>/g, '**').replace(/<\/strong>/g, '**');

/** Projects/Skills/Education/Languages/Activity, in markdown — shared by cvToMarkdown and cvToDiff's final "commit". */
export function cvTailMarkdown(sections: CVData['sections']): string[] {
  const lines: string[] = [];

  lines.push(`## ${sections.projects.title}`, '');
  for (const p of sections.projects.items) {
    lines.push(`### ${p.title} (${p.url})`, p.description, `*${p.tags}*`, '');
  }

  lines.push(`## ${sections.skills.title}`, '');
  for (const c of sections.skills.categories) lines.push(`- **${c.label}:** ${c.items}`);
  lines.push('');

  lines.push(`## ${sections.education.title}`, '');
  for (const e of sections.education.items) lines.push(`- **${e.title}** — ${e.institution} (${e.period})`);
  lines.push('');

  lines.push(`## ${sections.languages.title}`, '');
  for (const l of sections.languages.items) lines.push(`- ${l.language} — ${l.level}`);
  lines.push('');

  lines.push(`## ${sections.activity.title}`, '');
  for (const a of sections.activity.items) lines.push(`- ${toMdBold(a)}`);
  lines.push('');

  return lines;
}

export function cvToMarkdown(data: CVData): string {
  const { header, sections } = data;
  const lines: string[] = [`# ${header.name}`, '', `**${header.role}**`, header.location, ''];
  lines.push(header.contact.join(' · '), '');

  lines.push(`## ${sections.summary.title}`, '', sections.summary.text, '');

  lines.push(`## ${sections.experience.title}`, '');
  for (const job of sections.experience.jobs) {
    lines.push(`### ${job.title} — ${job.company}`, `*${job.period}*`, '');
    for (const b of job.bullets) lines.push(`- ${b}`);
    lines.push('', `**Stack:** ${job.stack}`, '');
  }

  lines.push(...cvTailMarkdown(sections));

  return lines.join('\n');
}

// ponytail: greedy word-wrap, no hyphenation — good enough for RFC-style prose
function wrapPara(text: string, indent = '   ', width = WIDTH): string[] {
  const words = text.split(/\s+/);
  const out: string[] = [];
  let line = indent;
  for (const word of words) {
    const next = line === indent ? indent + word : `${line} ${word}`;
    if (next.length > width) {
      out.push(line);
      line = indent + word;
    } else {
      line = next;
    }
  }
  out.push(line);
  return out;
}

function wrapBullet(text: string, indent = '   ', width = WIDTH): string[] {
  const prefix = `${indent}o  `;
  const cont = ' '.repeat(prefix.length);
  const words = text.split(/\s+/);
  const out: string[] = [];
  let line = prefix;
  for (const word of words) {
    const next = line === prefix || line === cont ? line + word : `${line} ${word}`;
    if (next.length > width) {
      out.push(line);
      line = cont + word;
    } else {
      line = next;
    }
  }
  out.push(line);
  return out;
}

function wrapHeading(num: string, text: string, width = WIDTH): string[] {
  const prefix = `   ${num}  `;
  const cont = ' '.repeat(prefix.length);
  const words = text.split(/\s+/);
  const out: string[] = [];
  let line = prefix;
  for (const word of words) {
    const next = line === prefix || line === cont ? line + word : `${line} ${word}`;
    if (next.length > width) {
      out.push(line);
      line = cont + word;
    } else {
      line = next;
    }
  }
  out.push(line);
  return out;
}

function headerLine(left: string, right: string, width = WIDTH): string {
  return left + ' '.repeat(Math.max(1, width - left.length - right.length)) + right;
}

export function cvToRfc(data: CVData, opts: { canonicalUrl: string; mdUrl: string; date: string }): string {
  const { header, sections } = data;
  const out: string[] = [];

  out.push(headerLine(header.name, 'christianecg.com'));
  out.push(headerLine('Request for Comments: CV', opts.date));
  out.push('Category: Informational', '', '');

  const pad = Math.max(0, Math.floor((WIDTH - header.role.length) / 2));
  out.push(' '.repeat(pad) + header.role, '');

  out.push('Abstract', '', ...wrapPara(sections.summary.text), '');

  out.push('Status of This Memo', '', ...wrapPara(
    `This memo documents the professional experience of the author for the Internet community. It does not specify an Internet standard of any kind. The canonical version lives at ${opts.canonicalUrl} and the machine-readable source at ${opts.mdUrl}.`
  ), '');

  const toc = [sections.experience, sections.projects, sections.skills, sections.education, sections.languages, sections.activity];
  out.push('Table of Contents', '');
  toc.forEach((s, i) => out.push(`   ${i + 1}.  ${s.title}`));
  out.push('');

  out.push(`1.  ${sections.experience.title}`, '');
  sections.experience.jobs.forEach((job, i) => {
    out.push(...wrapHeading(`1.${i + 1}.`, `${job.title} -- ${job.company} (${job.period})`), '');
    for (const b of job.bullets) out.push(...wrapBullet(b, '      '), '');
    out.push(...wrapPara(`Stack: ${job.stack}`, '      '), '');
  });

  out.push(`2.  ${sections.projects.title}`, '');
  sections.projects.items.forEach((p, i) => {
    out.push(...wrapHeading(`2.${i + 1}.`, `${p.title} (${p.url})`), '');
    out.push(...wrapPara(p.description), '');
    out.push(...wrapPara(`Tags: ${p.tags}`), '');
  });

  out.push(`3.  ${sections.skills.title}`, '');
  for (const c of sections.skills.categories) out.push(...wrapBullet(`${c.label}: ${c.items}`), '');

  out.push(`4.  ${sections.education.title}`, '');
  for (const e of sections.education.items) out.push(...wrapBullet(`${e.title} -- ${e.institution} (${e.period})`), '');

  out.push(`5.  ${sections.languages.title}`, '');
  for (const l of sections.languages.items) out.push(...wrapBullet(`${l.language} -- ${l.level}`), '');

  out.push(`6.  ${sections.activity.title}`, '');
  for (const a of sections.activity.items) out.push(...wrapBullet(stripHtml(a)), '');

  const email = header.contact.find((c) => c.includes('@')) ?? '';
  out.push("Author's Address", '', ...wrapPara(header.name), ...wrapPara(`Email: ${email}`), ...wrapPara('URI:   https://christianecg.com'));

  return out.join('\n');
}
