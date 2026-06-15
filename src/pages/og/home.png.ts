import satori from 'satori';
import { Resvg } from '@resvg/resvg-js';
import { readFileSync } from 'fs';
import { join } from 'path';

export async function GET() {
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
          flexDirection: 'row',
          backgroundColor: '#0B0D12',
          fontFamily: 'Bricolage Grotesque',
          overflow: 'hidden',
        },
        children: [
          // Left — monogram panel
          {
            type: 'div',
            props: {
              style: {
                width: '380px',
                height: '100%',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'flex-end',
                alignItems: 'flex-start',
                padding: '52px 44px',
                backgroundColor: '#0d1018',
                position: 'relative',
                overflow: 'hidden',
              },
              children: [
                // Monogram watermark
                {
                  type: 'div',
                  props: {
                    style: {
                      position: 'absolute',
                      bottom: '-32px',
                      left: '-12px',
                      fontSize: '220px',
                      fontWeight: 800,
                      color: '#5B8CF5',
                      opacity: 0.08,
                      letterSpacing: '-0.06em',
                      lineHeight: 1,
                    },
                    children: 'cecg',
                  },
                },
                // Domain label top
                {
                  type: 'div',
                  props: {
                    style: {
                      position: 'absolute',
                      top: '52px',
                      left: '44px',
                      fontSize: '11px',
                      fontWeight: 800,
                      color: '#3E4A60',
                      letterSpacing: '0.14em',
                      textTransform: 'uppercase',
                    },
                    children: 'christianecg.com',
                  },
                },
                // Location
                {
                  type: 'div',
                  props: {
                    style: {
                      fontSize: '13px',
                      fontWeight: 800,
                      color: '#5B8CF5',
                      letterSpacing: '0.06em',
                      textTransform: 'uppercase',
                    },
                    children: 'Hidalgo · México',
                  },
                },
              ],
            },
          },

          // Divider
          {
            type: 'div',
            props: {
              style: {
                width: '3px',
                height: '100%',
                backgroundColor: '#5B8CF5',
                opacity: 0.5,
                flexShrink: 0,
              },
              children: '',
            },
          },

          // Right — identity content
          {
            type: 'div',
            props: {
              style: {
                flex: 1,
                height: '100%',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                padding: '56px 64px',
              },
              children: [
                // Role
                {
                  type: 'div',
                  props: {
                    style: {
                      fontSize: '13px',
                      fontWeight: 800,
                      color: '#5B8CF5',
                      letterSpacing: '0.1em',
                      textTransform: 'uppercase',
                    },
                    children: 'Senior Software Engineer',
                  },
                },

                // Name
                {
                  type: 'div',
                  props: {
                    style: {
                      fontSize: '62px',
                      fontWeight: 800,
                      color: '#E8EDF5',
                      letterSpacing: '-0.03em',
                      lineHeight: 1.1,
                    },
                    children: 'Christian Elías Cruz González',
                  },
                },

                // Credential pills
                {
                  type: 'div',
                  props: {
                    style: {
                      display: 'flex',
                      gap: '10px',
                    },
                    children: [
                      { label: 'IEEE Xplore', sub: 'Publicación' },
                      { label: 'Keynote', sub: '3 congresos' },
                      { label: 'TV Nacional', sub: '2 apariciones' },
                    ].map(({ label, sub }) => ({
                      type: 'div',
                      props: {
                        style: {
                          display: 'flex',
                          flexDirection: 'column',
                          gap: '3px',
                          padding: '10px 16px',
                          backgroundColor: '#111520',
                          borderRadius: '8px',
                          border: '1px solid #1e2538',
                        },
                        children: [
                          {
                            type: 'div',
                            props: {
                              style: { fontSize: '13px', fontWeight: 800, color: '#E8EDF5', letterSpacing: '-0.01em' },
                              children: label,
                            },
                          },
                          {
                            type: 'div',
                            props: {
                              style: { fontSize: '11px', fontWeight: 800, color: '#3E4A60', letterSpacing: '0.04em' },
                              children: sub,
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
