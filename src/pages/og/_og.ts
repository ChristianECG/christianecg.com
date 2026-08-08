// Shared OG-image helpers: palette, fonts, a tiny hyperscript and the
// satori → PNG render step. Files starting with "_" are not routes.
import satori from 'satori';
import { Resvg } from '@resvg/resvg-js';
import sharp from 'sharp';
import { readFileSync } from 'node:fs';
import { join } from 'node:path';

export const C = {
  bg: '#0B0D12',
  panel: '#0d1018',
  surface: '#191E2D',
  text: '#E8EDF5',
  text2: '#7E8EAB',
  text3: '#3E4A60',
  accent: '#5B8CF5',
  accentLight: '#82AAFF',
  accent2: '#46E0BE',
};

const fontFile = (weight: 700 | 800) =>
  join(
    process.cwd(),
    `node_modules/@fontsource/bricolage-grotesque/files/bricolage-grotesque-latin-${weight}-normal.woff`
  );

const fonts = [
  { name: 'Bricolage Grotesque', data: readFileSync(fontFile(700)), weight: 700 as const, style: 'normal' as const },
  { name: 'Bricolage Grotesque', data: readFileSync(fontFile(800)), weight: 800 as const, style: 'normal' as const },
];

export interface Node {
  type: string;
  props: { style?: Record<string, unknown>; children?: unknown };
}

/** Tiny hyperscript so OG layouts read as h(tag, style, children) instead of nested objects. */
export function h(type: string, style: Record<string, unknown> = {}, children?: unknown): Node {
  return { type, props: { style, ...(children !== undefined ? { children } : {}) } };
}

/** A blue→teal gradient text run (the site's signature treatment). */
export function gradientText(text: string, style: Record<string, unknown> = {}): Node {
  return h(
    'div',
    {
      backgroundImage: `linear-gradient(110deg, ${C.accent} 0%, ${C.accentLight} 38%, ${C.accent2} 92%)`,
      backgroundClip: 'text',
      color: 'transparent',
      ...style,
    },
    text
  );
}

/** A soft radial glow blob, absolutely positioned. */
export function glow(style: Record<string, unknown>): Node {
  return h('div', {
    position: 'absolute',
    backgroundImage: `radial-gradient(circle, ${color(C.accent, 0.18)} 0%, transparent 70%)`,
    ...style,
  });
}

export function color(hex: string, alpha: number): string {
  const n = parseInt(hex.slice(1), 16);
  return `rgba(${(n >> 16) & 255}, ${(n >> 8) & 255}, ${n & 255}, ${alpha})`;
}

export async function png(tree: Node): Promise<Response> {
  const svg = await satori(tree as never, { width: 1200, height: 630, fonts });
  const raw = new Resvg(svg).render().asPng();

  // Easter egg: EXIF only visible via exiftool / "get info" on the shared image.
  const data = await sharp(raw)
    .withMetadata({
      exif: {
        IFD0: {
          Artist: 'Christian Elías Cruz González',
          Copyright: 'christianecg.com',
          ImageDescription: 'If you read image metadata, hi. dig TXT cv.christianecg.com',
        },
      },
    })
    .png()
    .toBuffer();

  return new Response(new Uint8Array(data), { headers: { 'Content-Type': 'image/png' } });
}
