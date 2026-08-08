import { C, h, png, gradientText, glow } from './_og';

// Concept — "CV sheet": a document-like card with the name, role and a few
// résumé facts, plus the available formats as a download chip.
const facts: [string, string][] = [
  ['Enfoque', 'Frontend · Mobile · IoT'],
  ['Ubicación', 'Hidalgo, México'],
  ['Modalidad', 'Remoto desde 2021'],
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
        glow({ width: '700px', height: '700px', bottom: '-320px', left: '-200px' }),

        // Only visible if someone zooms into the shared preview image.
        h(
          'div',
          { position: 'absolute', bottom: '18px', right: '22px', fontSize: '10px', fontWeight: 700, color: C.text3, letterSpacing: '0.04em' },
          'psst — dig TXT cv.christianecg.com'
        ),

        // Document card
        h(
          'div',
          {
            display: 'flex',
            flex: 1,
            backgroundColor: C.panel,
            border: `1px solid ${C.surface}`,
            borderRadius: '18px',
            overflow: 'hidden',
            position: 'relative',
          },
          [
            // Accent spine
            h('div', { width: '10px', height: '100%', backgroundImage: `linear-gradient(180deg, ${C.accent}, ${C.accent2})` }),

            // Sheet body
            h(
              'div',
              { display: 'flex', flexDirection: 'column', justifyContent: 'space-between', flex: 1, padding: '56px 60px' },
              [
                // Header
                h('div', { display: 'flex', flexDirection: 'column', gap: '16px' }, [
                  h('div', { display: 'flex', alignItems: 'center', gap: '14px' }, [
                    h('div', { width: '34px', height: '3px', backgroundColor: C.accent, borderRadius: '2px' }),
                    h(
                      'div',
                      { fontSize: '14px', fontWeight: 800, color: C.accent, letterSpacing: '0.16em', textTransform: 'uppercase' },
                      'Curriculum Vitae'
                    ),
                  ]),
                  gradientText('Christian Elías Cruz González', {
                    fontSize: '58px',
                    fontWeight: 800,
                    letterSpacing: '-0.03em',
                    lineHeight: 1.05,
                  }),
                  h('div', { fontSize: '24px', fontWeight: 700, color: C.text2 }, 'Senior Software Engineer'),
                ]),

                // Facts row
                h(
                  'div',
                  { display: 'flex', gap: '48px' },
                  facts.map(([label, value]) =>
                    h('div', { display: 'flex', flexDirection: 'column', gap: '6px' }, [
                      h(
                        'div',
                        { fontSize: '12px', fontWeight: 800, color: C.accent2, letterSpacing: '0.1em', textTransform: 'uppercase' },
                        label
                      ),
                      h('div', { fontSize: '19px', fontWeight: 700, color: C.text }, value),
                    ])
                  )
                ),

                // Footer: format chip + domain
                h('div', { display: 'flex', alignItems: 'center', justifyContent: 'space-between' }, [
                  h(
                    'div',
                    {
                      display: 'flex',
                      fontSize: '14px',
                      fontWeight: 800,
                      color: C.accentLight,
                      backgroundColor: C.bg,
                      border: `1px solid ${C.surface}`,
                      borderRadius: '8px',
                      padding: '8px 16px',
                      letterSpacing: '0.04em',
                    },
                    'PDF · Español · English'
                  ),
                  h('div', { fontSize: '15px', fontWeight: 800, color: C.text3, letterSpacing: '0.1em', textTransform: 'uppercase' }, 'christianecg.com'),
                ]),
              ]
            ),
          ]
        ),
      ]
    )
  );
}
