import satori from 'satori';
import { Resvg } from '@resvg/resvg-js';
import { readFileSync } from 'fs';
import { join } from 'path';

export async function GET() {
  const fontData = readFileSync(
    join(process.cwd(), 'node_modules/@fontsource/bricolage-grotesque/files/bricolage-grotesque-latin-800-normal.woff')
  );

  const milestones = [
    { year: '2021', label: 'IEEE Xplore', active: true },
    { year: '2022', label: 'Keynote Speaker', active: true },
    { year: '2024', label: 'TV Nacional', active: true },
    { year: '2025', label: 'IETF · IPoAC', active: false },
  ];

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
          // Timeline column
          {
            type: 'div',
            props: {
              style: {
                width: '96px',
                height: '100%',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                backgroundColor: '#0d1018',
                gap: '0px',
                position: 'relative',
              },
              children: [
                // Vertical line connecting dots
                {
                  type: 'div',
                  props: {
                    style: {
                      position: 'absolute',
                      top: '130px',
                      bottom: '130px',
                      left: '47px',
                      width: '2px',
                      backgroundColor: '#1e2538',
                    },
                    children: '',
                  },
                },
                // Dots
                ...milestones.map((m, i) => ({
                  type: 'div',
                  props: {
                    style: {
                      width: '14px',
                      height: '14px',
                      borderRadius: '50%',
                      backgroundColor: m.active ? '#5B8CF5' : '#1e2538',
                      border: m.active ? '0' : '2px solid #252D40',
                      flexShrink: 0,
                      marginTop: i === 0 ? '0' : '60px',
                    },
                    children: '',
                  },
                })),
              ],
            },
          },

          // Thin vertical rule
          {
            type: 'div',
            props: {
              style: {
                width: '1px',
                height: '100%',
                backgroundColor: '#1e2538',
                flexShrink: 0,
              },
              children: '',
            },
          },

          // Main content
          {
            type: 'div',
            props: {
              style: {
                flex: 1,
                height: '100%',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                padding: '56px 72px',
              },
              children: [
                // Top badge
                {
                  type: 'div',
                  props: {
                    style: {
                      display: 'flex',
                      alignItems: 'center',
                      gap: '12px',
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
                          children: 'Curriculum Vitae',
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

                // Name + role
                {
                  type: 'div',
                  props: {
                    style: {
                      display: 'flex',
                      flexDirection: 'column',
                      gap: '12px',
                    },
                    children: [
                      {
                        type: 'div',
                        props: {
                          style: {
                            fontSize: '62px',
                            fontWeight: 800,
                            color: '#E8EDF5',
                            letterSpacing: '-0.03em',
                            lineHeight: 1.05,
                          },
                          children: 'Christian Elías Cruz González',
                        },
                      },
                      {
                        type: 'div',
                        props: {
                          style: {
                            fontSize: '20px',
                            fontWeight: 800,
                            color: '#7E8EAB',
                            letterSpacing: '-0.01em',
                          },
                          children: 'Senior Software Engineer',
                        },
                      },
                    ],
                  },
                },

                // Milestone list
                {
                  type: 'div',
                  props: {
                    style: {
                      display: 'flex',
                      gap: '24px',
                    },
                    children: milestones.slice(0, 4).map((m) => ({
                      type: 'div',
                      props: {
                        style: {
                          display: 'flex',
                          flexDirection: 'column',
                          gap: '4px',
                        },
                        children: [
                          {
                            type: 'div',
                            props: {
                              style: {
                                fontSize: '11px',
                                fontWeight: 800,
                                color: m.active ? '#5B8CF5' : '#3E4A60',
                                letterSpacing: '0.08em',
                                textTransform: 'uppercase',
                              },
                              children: m.year,
                            },
                          },
                          {
                            type: 'div',
                            props: {
                              style: {
                                fontSize: '13px',
                                fontWeight: 800,
                                color: m.active ? '#E8EDF5' : '#7E8EAB',
                                letterSpacing: '-0.01em',
                              },
                              children: m.label,
                            },
                          },
                        ],
                      },
                    })),
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
