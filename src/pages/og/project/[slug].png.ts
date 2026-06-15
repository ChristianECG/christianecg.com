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

  const fontSize =
    title.length <= 30 ? 72 : title.length <= 50 ? 58 : title.length <= 70 ? 46 : 36;

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
          overflow: 'hidden',
        },
        children: [
          // macOS title bar
          {
            type: 'div',
            props: {
              style: {
                display: 'flex',
                flexDirection: 'row',
                alignItems: 'center',
                gap: '10px',
                padding: '0 24px',
                height: '52px',
                backgroundColor: '#111520',
                borderBottom: '1px solid #1e2538',
                flexShrink: 0,
              },
              children: [
                // Traffic lights
                {
                  type: 'div',
                  props: {
                    style: { width: '14px', height: '14px', borderRadius: '50%', backgroundColor: '#FF5F56', flexShrink: 0 },
                    children: '',
                  },
                },
                {
                  type: 'div',
                  props: {
                    style: { width: '14px', height: '14px', borderRadius: '50%', backgroundColor: '#FFBD2E', flexShrink: 0 },
                    children: '',
                  },
                },
                {
                  type: 'div',
                  props: {
                    style: { width: '14px', height: '14px', borderRadius: '50%', backgroundColor: '#27C93F', flexShrink: 0 },
                    children: '',
                  },
                },
                // Path
                {
                  type: 'div',
                  props: {
                    style: {
                      marginLeft: '16px',
                      fontSize: '13px',
                      fontWeight: 800,
                      color: '#3E4A60',
                      letterSpacing: '0.02em',
                    },
                    children: '~/projects/',
                  },
                },
                {
                  type: 'div',
                  props: {
                    style: {
                      fontSize: '13px',
                      fontWeight: 800,
                      color: '#7E8EAB',
                      letterSpacing: '0.02em',
                    },
                    children: title,
                  },
                },
              ],
            },
          },

          // Terminal content
          {
            type: 'div',
            props: {
              style: {
                flex: 1,
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                padding: '52px 72px 56px',
              },
              children: [
                // Prompt line
                {
                  type: 'div',
                  props: {
                    style: {
                      display: 'flex',
                      alignItems: 'center',
                      gap: '10px',
                    },
                    children: [
                      {
                        type: 'div',
                        props: {
                          style: {
                            fontSize: '14px',
                            fontWeight: 800,
                            color: '#5B8CF5',
                            letterSpacing: '0.04em',
                          },
                          children: '$',
                        },
                      },
                      {
                        type: 'div',
                        props: {
                          style: {
                            fontSize: '14px',
                            fontWeight: 800,
                            color: '#3E4A60',
                            letterSpacing: '0.04em',
                          },
                          children: 'open project --name',
                        },
                      },
                      {
                        type: 'div',
                        props: {
                          style: {
                            fontSize: '14px',
                            fontWeight: 800,
                            color: '#7E8EAB',
                            letterSpacing: '0.02em',
                          },
                          children: `"${title}"`,
                        },
                      },
                    ],
                  },
                },

                // Project title
                {
                  type: 'div',
                  props: {
                    style: {
                      fontSize: `${fontSize}px`,
                      fontWeight: 800,
                      color: '#E8EDF5',
                      letterSpacing: '-0.03em',
                      lineHeight: 1.1,
                      maxWidth: '1000px',
                    },
                    children: title,
                  },
                },

                // Tags + author
                {
                  type: 'div',
                  props: {
                    style: {
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'flex-end',
                    },
                    children: [
                      // Tags
                      {
                        type: 'div',
                        props: {
                          style: { display: 'flex', gap: '8px', flexWrap: 'nowrap' },
                          children: tags.slice(0, 5).map((tag) => ({
                            type: 'div',
                            props: {
                              style: {
                                fontSize: '12px',
                                fontWeight: 800,
                                color: '#5B8CF5',
                                backgroundColor: '#111520',
                                border: '1px solid #1e2538',
                                borderRadius: '4px',
                                padding: '4px 10px',
                                letterSpacing: '0.04em',
                              },
                              children: `<${tag}>`,
                            },
                          })),
                        },
                      },
                      // Deploy status + author
                      {
                        type: 'div',
                        props: {
                          style: {
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'flex-end',
                            gap: '4px',
                          },
                          children: [
                            {
                              type: 'div',
                              props: {
                                style: {
                                  fontSize: '12px',
                                  fontWeight: 800,
                                  color: '#27C93F',
                                  letterSpacing: '0.06em',
                                },
                                children: '● deployed',
                              },
                            },
                            {
                              type: 'div',
                              props: {
                                style: {
                                  fontSize: '14px',
                                  fontWeight: 800,
                                  color: '#3E4A60',
                                  letterSpacing: '0.02em',
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
