import type { APIContext } from 'astro';
import { getCollection } from 'astro:content';
import satori from 'satori';
import { Resvg } from '@resvg/resvg-js';
import { readFileSync } from 'fs';
import { join } from 'path';

export async function getStaticPaths() {
  const projects = await getCollection('projects');
  return projects.map((project) => ({
    params: { slug: project.id },
    props: { title: project.data.title, tags: project.data.tags },
  }));
}

export async function GET({ props }: APIContext) {
  const { title, tags } = props as { title: string; tags: string[] };

  const fontData = readFileSync(
    join(process.cwd(), 'node_modules/@fontsource/bricolage-grotesque/files/bricolage-grotesque-latin-800-normal.woff')
  );

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
              children: 'Case Study · christianecg.com',
            },
          },
          {
            type: 'div',
            props: {
              style: {
                fontSize: '72px',
                fontWeight: 800,
                color: '#E8EDF5',
                letterSpacing: '-0.03em',
                lineHeight: 1.1,
                marginBottom: '28px',
              },
              children: title,
            },
          },
          {
            type: 'div',
            props: {
              style: {
                display: 'flex',
                gap: '10px',
                flexWrap: 'wrap',
                marginBottom: '40px',
              },
              children: tags.map((tag) => ({
                type: 'span',
                props: {
                  style: {
                    fontSize: '14px',
                    fontWeight: 800,
                    color: '#7E8EAB',
                    backgroundColor: '#161A24',
                    border: '1px solid #252D40',
                    borderRadius: '4px',
                    padding: '4px 10px',
                    letterSpacing: '0.02em',
                  },
                  children: tag,
                },
              })),
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
