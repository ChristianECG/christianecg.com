import { C, h, png, gradientText, glow } from './_og';

// Concept — "Browser window": the site framed as a window, with the name in
// the signature gradient and the three real credentials as a stat row.
const creds: [string, string][] = [
  ['IEEE Xplore', '1 paper publicado'],
  ['Keynote', '3 congresos internacionales'],
  ['Televisión', '2 apariciones nacionales'],
];

export async function GET() {
  return png(
    h(
      'div',
      {
        width: '100%',
        height: '100%',
        display: 'flex',
        backgroundColor: C.bg,
        fontFamily: 'Bricolage Grotesque',
        padding: '54px',
        position: 'relative',
        overflow: 'hidden',
      },
      [
        glow({ width: '720px', height: '720px', top: '-300px', left: '-200px' }),

        // Window card
        h(
          'div',
          {
            display: 'flex',
            flexDirection: 'column',
            flex: 1,
            backgroundColor: C.panel,
            border: `1px solid ${C.surface}`,
            borderRadius: '18px',
            position: 'relative',
            overflow: 'hidden',
          },
          [
            // Title bar
            h(
              'div',
              {
                display: 'flex',
                alignItems: 'center',
                gap: '16px',
                padding: '20px 26px',
                borderBottom: `1px solid ${C.surface}`,
              },
              [
                h('div', { display: 'flex', gap: '9px' }, [
                  h('div', { width: '13px', height: '13px', borderRadius: '50%', backgroundColor: '#ff5f57' }),
                  h('div', { width: '13px', height: '13px', borderRadius: '50%', backgroundColor: '#febc2e' }),
                  h('div', { width: '13px', height: '13px', borderRadius: '50%', backgroundColor: '#28c840' }),
                ]),
                h(
                  'div',
                  {
                    display: 'flex',
                    fontSize: '15px',
                    fontWeight: 700,
                    color: C.text3,
                    letterSpacing: '0.04em',
                    backgroundColor: C.bg,
                    padding: '6px 16px',
                    borderRadius: '7px',
                  },
                  'christianecg.com'
                ),
              ]
            ),

            // Body
            h(
              'div',
              {
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                flex: 1,
                padding: '0 54px',
                gap: '20px',
              },
              [
                h(
                  'div',
                  { fontSize: '13px', fontWeight: 800, color: C.accent, letterSpacing: '0.14em', textTransform: 'uppercase' },
                  'Senior Software Engineer'
                ),
                gradientText('Christian Elías\nCruz González', {
                  display: 'flex',
                  fontSize: '76px',
                  fontWeight: 800,
                  letterSpacing: '-0.035em',
                  lineHeight: 1.02,
                  whiteSpace: 'pre-wrap',
                }),

                // Credentials row
                h(
                  'div',
                  { display: 'flex', gap: '40px', marginTop: '14px' },
                  creds.map(([label, detail]) =>
                    h('div', { display: 'flex', flexDirection: 'column', gap: '5px' }, [
                      h(
                        'div',
                        { fontSize: '13px', fontWeight: 800, color: C.accent2, letterSpacing: '0.08em', textTransform: 'uppercase' },
                        label
                      ),
                      h('div', { fontSize: '17px', fontWeight: 700, color: C.text2 }, detail),
                    ])
                  )
                ),
              ]
            ),
          ]
        ),
      ]
    )
  );
}
