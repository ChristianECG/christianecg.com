import type { APIContext } from 'astro';
import { getCollection } from 'astro:content';
import satori from 'satori';
import { Resvg } from '@resvg/resvg-js';
import { readFileSync } from 'fs';
import { fileURLToPath } from 'url';

export async function getStaticPaths() {
  const posts = await getCollection('blog');
  return posts.map((post) => ({
    params: { slug: post.id },
    props: { title: post.data.title },
  }));
}

export async function GET({ props }: APIContext) {
  const { title } = props as { title: string };

  const fontURL = new URL(
    '../../../node_modules/@fontsource/bricolage-grotesque/files/bricolage-grotesque-latin-800-normal.woff',
    import.meta.url
  );
  const fontData = readFileSync(fileURLToPath(fontURL));

  const fontSize =
    title.length <= 40 ? 68 : title.length <= 65 ? 52 : title.length <= 85 ? 42 : 34;

  const svg = await satori(
    {
      type: 'div',
      props: {
        style: {
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          backgroundColor: '#0B0D12',
          padding: '72px 80px',
          fontFamily: 'Bricolage Grotesque',
          borderTop: '4px solid #5B8CF5',
        },
        children: [
          {
            type: 'div',
            props: {
              style: {
                fontSize: '14px',
                color: '#5B8CF5',
                letterSpacing: '0.1em',
                textTransform: 'uppercase',
                fontWeight: 800,
                marginBottom: 'auto',
              },
              children: 'christianecg.com',
            },
          },
          {
            type: 'div',
            props: {
              style: {
                fontSize: `${fontSize}px`,
                fontWeight: 800,
                color: '#E8EDF5',
                letterSpacing: '-0.03em',
                lineHeight: 1.15,
                maxWidth: '980px',
                marginBottom: '40px',
              },
              children: title,
            },
          },
          {
            type: 'div',
            props: {
              style: {
                fontSize: '18px',
                color: '#7E8EAB',
                fontWeight: 800,
              },
              children: 'Christian Elías Cruz González',
            },
          },
        ],
      },
    },
    {
      width: 1200,
      height: 630,
      fonts: [
        {
          name: 'Bricolage Grotesque',
          data: fontData,
          weight: 800,
          style: 'normal',
        },
      ],
    }
  );

  const resvg = new Resvg(svg);
  const png = resvg.render().asPng();

  return new Response(new Uint8Array(png), {
    headers: { 'Content-Type': 'image/png' },
  });
}
