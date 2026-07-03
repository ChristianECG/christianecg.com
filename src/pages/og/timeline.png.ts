import { C, h, png, gradientText, glow, color } from './_og';

// Concept — "The line itself": a horizontal timeline crossing the whole card,
// with year-labeled nodes ending in a pulsing "hoy" dot. The page in miniature.
const YEARS = [
  { year: '2018', label: 'ITSOEH' },
  { year: '2020', label: 'GDSC Lead' },
  { year: '2021', label: 'IEEE Xplore' },
  { year: '2022', label: 'Ubidots' },
  { year: '2024', label: 'Senior' },
  { year: '2026', label: 'IETF · SaaS' },
];

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
        padding: '64px 72px 72px',
        position: 'relative',
        overflow: 'hidden',
      },
      [
        glow({ width: '720px', height: '720px', top: '-360px', left: '-220px' }),
        glow({ width: '600px', height: '600px', bottom: '-300px', right: '-160px' }),

        // Top — site mark + title block
        h('div', { display: 'flex', flexDirection: 'column', gap: '18px', position: 'relative' }, [
          h('div', { display: 'flex', alignItems: 'center', gap: '14px' }, [
            h('div', { width: '34px', height: '3px', backgroundColor: C.accent, borderRadius: '2px' }),
            h(
              'div',
              { fontSize: '14px', fontWeight: 800, color: C.accent, letterSpacing: '0.16em', textTransform: 'uppercase' },
              'christianecg.com'
            ),
          ]),
          gradientText('Trayectoria', { fontSize: '108px', fontWeight: 800, letterSpacing: '-0.04em', lineHeight: 1 }),
          h(
            'div',
            { fontSize: '24px', fontWeight: 700, color: C.text2, maxWidth: '760px', lineHeight: 1.4 },
            'De estudiante en Hidalgo a senior engineer con productos propios — de 2018 a hoy.'
          ),
        ]),

        // Bottom — the horizontal timeline
        h('div', { display: 'flex', flexDirection: 'column', gap: '0px', position: 'relative' }, [
          // Track with gradient
          h('div', {
            height: '3px',
            width: '100%',
            borderRadius: '2px',
            backgroundImage: `linear-gradient(90deg, ${color(C.accent, 0.25)} 0%, ${C.accent} 55%, ${C.accent2} 100%)`,
          }),
          // Nodes
          h(
            'div',
            { display: 'flex', justifyContent: 'space-between', marginTop: '-10px' },
            YEARS.map((n, i) =>
              h('div', { display: 'flex', flexDirection: 'column', alignItems: i === YEARS.length - 1 ? 'flex-end' : i === 0 ? 'flex-start' : 'center', gap: '14px' }, [
                h('div', {
                  width: i === YEARS.length - 1 ? '17px' : '13px',
                  height: i === YEARS.length - 1 ? '17px' : '13px',
                  borderRadius: '50%',
                  backgroundColor: i === YEARS.length - 1 ? C.accent2 : C.bg,
                  border: `3px solid ${i === YEARS.length - 1 ? C.accent2 : C.accent}`,
                  boxShadow: i === YEARS.length - 1 ? `0 0 24px ${color(C.accent2, 0.65)}` : `0 0 12px ${color(C.accent, 0.35)}`,
                  marginTop: i === YEARS.length - 1 ? '-2px' : '0px',
                }),
                h('div', { display: 'flex', flexDirection: 'column', alignItems: i === YEARS.length - 1 ? 'flex-end' : i === 0 ? 'flex-start' : 'center', gap: '2px' }, [
                  h('div', { fontSize: '22px', fontWeight: 800, color: C.text, letterSpacing: '-0.01em' }, n.year),
                  h('div', { fontSize: '15px', fontWeight: 700, color: C.text3, letterSpacing: '0.02em' }, n.label),
                ]),
              ])
            )
          ),
        ]),
      ]
    )
  );
}
