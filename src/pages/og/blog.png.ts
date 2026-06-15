import satori from 'satori';
import { Resvg } from '@resvg/resvg-js';
import { readFileSync } from 'fs';
import { join } from 'path';
import { getAllArticles } from '../../utils/blogData';

export async function GET() {
  const articles = await getAllArticles();
  const total = articles.length;

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
          fontFamily: 'Bricolage Grotesque',
          padding: '48px 72px 44px',
        },
        children: [
          // Header row
          {
            type: 'div',
            props: {
              style: {
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                marginBottom: '20px',
              },
              children: [
                // Left: Blog label + domain
                {
                  type: 'div',
                  props: {
                    style: { display: 'flex', alignItems: 'center', gap: '12px' },
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
                          children: 'Blog',
                        },
                      },
                      {
                        type: 'div',
                        props: {
                          style: {
                            fontSize: '11px',
                            fontWeight: 800,
                            color: '#3E4A60',
                            letterSpacing: '0.1em',
                            textTransform: 'uppercase',
                          },
                          children: '· christianecg.com',
                        },
                      },
                    ],
                  },
                },
                {
                  type: 'div',
                  props: {
                    style: {
                      fontSize: '11px',
                      fontWeight: 800,
                      color: '#3E4A60',
                      letterSpacing: '0.1em',
                      textTransform: 'uppercase',
                    },
                    children: `${total} artículos`,
                  },
                },
              ],
            },
          },

          // Accent rule
          {
            type: 'div',
            props: {
              style: { height: '3px', backgroundColor: '#5B8CF5', marginBottom: '0' },
              children: '',
            },
          },

          // Title — fills available space
          {
            type: 'div',
            props: {
              style: {
                flex: 1,
                display: 'flex',
                alignItems: 'center',
              },
              children: [
                {
                  type: 'div',
                  props: {
                    style: {
                      fontSize: '160px',
                      fontWeight: 800,
                      color: '#E8EDF5',
                      letterSpacing: '-0.05em',
                      lineHeight: 1,
                    },
                    children: 'Blog',
                  },
                },
              ],
            },
          },

          // Footer
          {
            type: 'div',
            props: {
              style: { display: 'flex', flexDirection: 'column', gap: '14px' },
              children: [
                {
                  type: 'div',
                  props: {
                    style: { height: '1px', backgroundColor: '#1e2538' },
                    children: '',
                  },
                },
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
                            fontSize: '14px',
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
                          children: 'Desarrollo · Frontend · Comunidad',
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
