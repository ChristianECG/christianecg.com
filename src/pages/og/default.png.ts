import { C, h, png, gradientText, glow } from './_og';

// Concept — "Gradient monogram": the cecg mark as the hero, in the site's
// blue→teal gradient, over a dark field with a corner glow.
export async function GET() {
  return png(
    h(
      'div',
      {
        width: '100%',
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        backgroundColor: C.bg,
        fontFamily: 'Bricolage Grotesque',
        padding: '72px 80px',
        position: 'relative',
        overflow: 'hidden',
      },
      [
        glow({ width: '760px', height: '760px', top: '-280px', right: '-220px' }),

        // Top: domain label with accent bar
        h('div', { display: 'flex', alignItems: 'center', gap: '14px', position: 'relative' }, [
          h('div', { width: '34px', height: '3px', backgroundColor: C.accent, borderRadius: '2px' }),
          h(
            'div',
            { fontSize: '14px', fontWeight: 800, color: C.accent, letterSpacing: '0.16em', textTransform: 'uppercase' },
            'christianecg.com'
          ),
        ]),

        // Center: the monogram
        h('div', { display: 'flex', flexDirection: 'column', gap: '8px', position: 'relative' }, [
          gradientText('cecg', { fontSize: '230px', fontWeight: 800, letterSpacing: '-0.05em', lineHeight: 1 }),
        ]),

        // Bottom: name + role
        h('div', { display: 'flex', flexDirection: 'column', gap: '10px', position: 'relative' }, [
          h(
            'div',
            { fontSize: '46px', fontWeight: 800, color: C.text, letterSpacing: '-0.03em' },
            'Christian Elías Cruz González'
          ),
          h(
            'div',
            { fontSize: '22px', fontWeight: 700, color: C.text2, letterSpacing: '-0.01em' },
            'Senior Software Engineer · Hidalgo, México'
          ),
        ]),
      ]
    )
  );
}
