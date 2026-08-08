// Runs after `astro build` (pnpm's postbuild convention). @astrojs/sitemap
// generates its XML with no hook for custom comments, so this just appends
// one to whatever sitemap-*.xml files it produced.
import { readdir, readFile, writeFile } from 'node:fs/promises';

const dir = new URL('../dist/', import.meta.url);
const files = (await readdir(dir)).filter((f) => /^sitemap.*\.xml$/.test(f));

for (const file of files) {
  const path = new URL(file, dir);
  const xml = await readFile(path, 'utf-8');
  if (xml.includes('dig TXT')) continue;
  await writeFile(path, xml.replace('?>', '?>\n<!-- dig TXT cv.christianecg.com -->'));
}
