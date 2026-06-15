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
          // Left panel — monogram
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
                      opacity: 0.06,
                      letterSpacing: '-0.06em',
                      lineHeight: 1,
                    },
                    children: 'cecg',
                  },
                },
                // Domain
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
                // Accent bar
                {
                  type: 'div',
                  props: {
                    style: {
                      width: '32px',
                      height: '3px',
                      backgroundColor: '#5B8CF5',
                      borderRadius: '2px',
                      marginBottom: '8px',
                    },
                    children: '',
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

          // Right — identity
          {
            type: 'div',
            props: {
              style: {
                flex: 1,
                height: '100%',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                padding: '56px 64px',
                gap: '16px',
              },
              children: [
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
                {
                  type: 'div',
                  props: {
                    style: {
                      fontSize: '64px',
                      fontWeight: 800,
                      color: '#E8EDF5',
                      letterSpacing: '-0.03em',
                      lineHeight: 1.08,
                    },
                    children: 'Christian Elías Cruz González',
                  },
                },
                {
                  type: 'div',
                  props: {
                    style: {
                      fontSize: '18px',
                      fontWeight: 800,
                      color: '#3E4A60',
                      letterSpacing: '0.02em',
                    },
                    children: 'Hidalgo · México',
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
