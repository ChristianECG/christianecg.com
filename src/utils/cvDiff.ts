import { createHash } from 'node:crypto';
import type { CVData } from '../data/cv';
import { cvTailMarkdown } from './cvText';
import { parsePeriod } from './period';

const FILE = 'CAREER.md';

function fakeHash(seed: string): string {
  return createHash('sha1').update(seed).digest('hex');
}

function commitHeader(seed: string, date: Date, subject: string): string[] {
  return [
    `commit ${fakeHash(seed)}`,
    'Author: Christian Elías Cruz González <contacto@christianecg.com>',
    `Date:   ${date.toDateString()}`,
    '',
    `    ${subject}`,
    '',
  ];
}

// ponytail: the "before/after" states are built by hand, not diffed with an
// LCS algorithm — we already know exactly which lines change at each step,
// so a generic diff engine would just be re-deriving what we already wrote.
export function cvToDiff(data: CVData, lang: 'es' | 'en' | 'lat'): string {
  const { header, sections } = data;
  const jobs = sections.experience.jobs.slice().reverse(); // oldest first
  const out: string[] = [];

  jobs.forEach((job, i) => {
    const { start } = parsePeriod(job.period, lang);
    const roleLine = `${job.title} @ ${job.company}`;
    const stackLine = `Stack: ${job.stack}`;

    if (i === 0) {
      const hash = fakeHash(job.title + job.company);
      out.push(...commitHeader(job.title + job.company, start, `feat(career): start as ${job.title} @ ${job.company}`));
      out.push(
        `diff --git a/${FILE} b/${FILE}`,
        'new file mode 100644',
        `index 0000000..${hash.slice(0, 7)}`,
        '--- /dev/null',
        `+++ b/${FILE}`,
        '@@ -0,0 +1,6 @@',
        `+# ${header.name}`,
        '+',
        '+## Current Role',
        `+${roleLine}`,
        '+',
        `+${stackLine}`,
        ''
      );
    } else {
      const prev = jobs[i - 1];
      const prevHash = fakeHash(prev.title + prev.company);
      const hash = fakeHash(job.title + job.company);
      out.push(...commitHeader(job.title + job.company, start, `feat(career): ${job.title} @ ${job.company}`));
      out.push(
        `diff --git a/${FILE} b/${FILE}`,
        `index ${prevHash.slice(0, 7)}..${hash.slice(0, 7)} 100644`,
        `--- a/${FILE}`,
        `+++ b/${FILE}`,
        '@@ -3,4 +3,4 @@',
        ' ## Current Role',
        `-${prev.title} @ ${prev.company}`,
        `+${roleLine}`,
        ' ',
        `-Stack: ${prev.stack}`,
        `+${stackLine}`,
        ''
      );
    }
  });

  const last = jobs[jobs.length - 1];
  const lastHash = fakeHash(last.title + last.company);
  const tail = cvTailMarkdown(sections);
  out.push(...commitHeader('docs' + header.name, parsePeriod(last.period, lang).end, 'docs(career): flesh out projects, skills, education, languages, activity'));
  out.push(
    `diff --git a/${FILE} b/${FILE}`,
    `index ${lastHash.slice(0, 7)}..${fakeHash('final' + header.name).slice(0, 7)} 100644`,
    `--- a/${FILE}`,
    `+++ b/${FILE}`,
    `@@ -6,1 +6,${2 + tail.length} @@`,
    ` Stack: ${last.stack}`,
    '+',
    ...tail.map((l) => `+${l}`)
  );

  return out.join('\n');
}
