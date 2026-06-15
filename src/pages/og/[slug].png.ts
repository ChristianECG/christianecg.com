import type { APIContext } from 'astro';
import { getCollection } from 'astro:content';
import satori from 'satori';
import { Resvg } from '@resvg/resvg-js';
import { readFileSync } from 'fs';
import { join } from 'path';

export async function getStaticPaths() {
  const posts = await getCollection('blog');
  return posts.map((post) => ({
    params: { slug: post.id },
    props: { title: post.data.title, date: post.data.date },
  }));
}

export async function GET({ props }: APIContext) {
  const { title, date } = props as { title: string; date: string };

  const fontData = readFileSync(
    join(process.cwd(), 'node_modules/@fontsource/bricolage-grotesque/files/bricolage-grotesque-latin-800-normal.woff')
  );

  const fontSize =
    title.length <= 40 ? 68 : title.length <= 65 ? 52 : title.length <= 85 ? 42 : 34;

  const formattedDate = date
    ? new Date(date).toLocaleDateString('es-MX', { year: 'numeric', month: 'long', day: 'numeric' })
    : '';

  const svg = await satori(
    {
      type: 'div',
      props: {
        style: {
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'row',
          backgroundColor: '#0B0D12',
          fontFamily: 'Bricolage Grotesque',
          overflow: 'hidden',
        },
        children: [
          // Left accent bar
          {
            type: 'div',
            props: {
              style: {
                width: '8px',
                height: '100%',
                backgroundColor: '#5B8CF5',
                flexShrink: 0,
              },
              children: '',
            },
          },

          // Content
          {
            type: 'div',
            props: {
              style: {
                flex: 1,
                height: '100%',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                padding: '60px 80px',
              },
              children: [
                // Top: badge + date
                {
                  type: 'div',
                  props: {
                    style: {
                      display: 'flex',
                      alignItems: 'center',
                      gap: '14px',
                    },
                    children: [
                      {
                        type: 'div',
                        props: {
                          style: {
                            fontSize: '11px',
                            fontWeight: 800,
                            color: '#0B0D12',
                            backgroundColor: '#5B8CF5',
                            padding: '4px 12px',
                            borderRadius: '4px',
                            letterSpacing: '0.12em',
                            textTransform: 'uppercase',
                          },
                          children: 'Artículo',
                        },
                      },
                      {
                        type: 'div',
                        props: {
                          style: {
                            fontSize: '13px',
                            fontWeight: 800,
                            color: '#3E4A60',
                            letterSpacing: '0.06em',
                          },
                          children: formattedDate,
                        },
                      },
                    ],
                  },
                },

                // Title
                {
                  type: 'div',
                  props: {
                    style: {
                      fontSize: `${fontSize}px`,
                      fontWeight: 800,
                      color: '#E8EDF5',
                      letterSpacing: '-0.03em',
                      lineHeight: 1.12,
                      maxWidth: '980px',
                    },
                    children: title,
                  },
                },

                // Bottom: author + domain
                {
                  type: 'div',
                  props: {
                    style: {
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                    },
                    children: [
                      {
                        type: 'div',
                        props: {
                          style: {
                            fontSize: '16px',
                            fontWeight: 800,
                            color: '#7E8EAB',
                            letterSpacing: '-0.01em',
                          },
                          children: 'Christian Elías Cruz González',
                        },
                      },
                      {
                        type: 'div',
                        props: {
                          style: {
                            fontSize: '13px',
                            fontWeight: 800,
                            color: '#3E4A60',
                            letterSpacing: '0.08em',
                            textTransform: 'uppercase',
                          },
                          children: 'christianecg.com',
                        },
                      },
                    ],
                  },
                },
              ],
            },
          },
        ],
      },
    },
    {
      width: 1200,
      height: 630,
      fonts: [{ name: 'Bricolage Grotesque', data: fontData, weight: 800, style: 'normal' }],
    }
  );

  const resvg = new Resvg(svg);
  const png = resvg.render().asPng();
  return new Response(new Uint8Array(png), { headers: { 'Content-Type': 'image/png' } });
}
