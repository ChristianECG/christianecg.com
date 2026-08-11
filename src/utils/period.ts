const ROMAN: Record<string, number> = { I: 1, V: 5, X: 10, L: 50, C: 100, D: 500, M: 1000 };

export function romanToInt(s: string): number {
  let total = 0;
  for (let i = 0; i < s.length; i++) {
    const cur = ROMAN[s[i]] ?? 0;
    const next = ROMAN[s[i + 1]] ?? 0;
    total += cur < next ? -cur : cur;
  }
  return total;
}

const MONTHS_EN: Record<string, number> = { jan: 1, feb: 2, mar: 3, apr: 4, may: 5, jun: 6, jul: 7, aug: 8, sep: 9, oct: 10, nov: 11, dec: 12 };
const MONTHS_LAT: Record<string, number> = { ian: 1, feb: 2, mar: 3, apr: 4, mai: 5, iun: 6, iul: 7, aug: 8, sep: 9, oct: 10, nov: 11, dec: 12 };

// ponytail: cv.ts only ever uses "Mon YYYY" or bare "YYYY" per side of the
// range, separated by "-" or "–" — a full date-parsing library is overkill.
const PRESENT = new Set(['presente', 'present', 'praesens']);

function parseOne(token: string, lang: 'es' | 'en' | 'lat'): Date {
  const trimmed = token.trim();
  if (PRESENT.has(trimmed.toLowerCase())) return new Date();
  const parts = trimmed.split(/\s+/);
  const [monthTok, yearTok] = parts.length === 1 ? [null, parts[0]] : parts;
  const months = lang === 'lat' ? MONTHS_LAT : MONTHS_EN;
  const month = monthTok ? (months[monthTok.replace('.', '').slice(0, 3).toLowerCase()] ?? 1) : 1;
  const year = lang === 'lat' ? romanToInt(yearTok.toUpperCase()) : parseInt(yearTok, 10);
  return new Date(year, month - 1, 1);
}

export function parsePeriod(period: string, lang: 'es' | 'en' | 'lat'): { start: Date; end: Date } {
  const [rawStart, rawEnd] = period.split(/[–-]/);
  return { start: parseOne(rawStart, lang), end: parseOne(rawEnd, lang) };
}
