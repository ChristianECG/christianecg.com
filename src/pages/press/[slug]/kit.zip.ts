export const prerender = true;

import type { APIRoute, GetStaticPaths } from 'astro';
import JSZip from 'jszip';
import { readFile } from 'node:fs/promises';
import { resolve } from 'node:path';
import { pressKits } from '../../../data/press';

export const getStaticPaths: GetStaticPaths = () => {
  return pressKits
    .filter((kit) => kit.documents.some((doc) => doc.url.startsWith('/')))
    .map((kit) => ({ params: { slug: kit.slug }, props: { kit } }));
};

export const GET: APIRoute = async ({ props }) => {
  const { kit } = props as { kit: (typeof pressKits)[number] };
  const zipFilename = kit.title_en.replace(/[^a-zA-Z0-9 -]/g, '').replace(/\s+/g, '_').replace(/_-_/g, '-') + '_press_kit.zip';
  const publicDir = resolve('public');
  const zip = new JSZip();

  for (const doc of kit.documents) {
    if (!doc.url.startsWith('/')) continue;
    const filePath = resolve(publicDir, doc.url.slice(1));
    try {
      const data = await readFile(filePath);
      zip.file(`docs/${doc.url.split('/').pop()!}`, data);
    } catch { /* file not yet available, skip */ }
  }

  for (const photo of kit.photos) {
    if (!photo.url.startsWith('/')) continue;
    const filePath = resolve(publicDir, photo.url.slice(1));
    try {
      const data = await readFile(filePath);
      zip.file(`photos/${photo.url.split('/').pop()!}`, data);
    } catch { /* file not yet available, skip */ }
  }

  const buffer = await zip.generateAsync({ type: 'nodebuffer', compression: 'DEFLATE' });

  return new Response(buffer, {
    headers: {
      'Content-Type': 'application/zip',
      'Content-Disposition': `attachment; filename="${zipFilename}"`,
    },
  });
};
