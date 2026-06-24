import { getAllArticles } from '../../utils/blogData';
import { C, h, png, gradientText, glow } from './_og';

// Concept — "Editorial index": big gradient "Blog" wordmark on the left, a
// numbered list of the latest articles on the right, like a magazine contents
// page. Uses the same source as /blog (local posts + octa.page RSS).
export async function GET() {
  const articles = await getAllArticles();
  const recent = articles.slice(0, 3);

  return png(
    h(
      'div',
      {
        width: '100%',
        height: '100%',
        display: 'flex',
        backgroundColor: C.bg,
        fontFamily: 'Bricolage Grotesque',
        padding: '64px 72px',
        position: 'relative',
        overflow: 'hidden',
      },
      [
        glow({ width: '700px', height: '700px', bottom: '-320px', right: '-180px' }),

        // Left — wordmark
        h(
          'div',
          {
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
            width: '470px',
            position: 'relative',
          },
          [
            h('div', { display: 'flex', alignItems: 'center', gap: '14px' }, [
              h('div', { width: '34px', height: '3px', backgroundColor: C.accent, borderRadius: '2px' }),
              h(
                'div',
                { fontSize: '14px', fontWeight: 800, color: C.accent, letterSpacing: '0.16em', textTransform: 'uppercase' },
                'christianecg.com'
              ),
            ]),
            h('div', { display: 'flex', flexDirection: 'column', gap: '14px' }, [
              gradientText('Blog', { fontSize: '150px', fontWeight: 800, letterSpacing: '-0.04em', lineHeight: 0.95 }),
              h(
                'div',
                { fontSize: '22px', fontWeight: 700, color: C.text2, maxWidth: '420px', lineHeight: 1.35 },
                'Ensayos sobre desarrollo, web y carrera.'
              ),
            ]),
            h(
              'div',
              { fontSize: '15px', fontWeight: 800, color: C.text3, letterSpacing: '0.1em', textTransform: 'uppercase' },
              `${articles.length} artículos`
            ),
          ]
        ),

        // Right — latest posts
        h(
          'div',
          {
            display: 'flex',
            flexDirection: 'column',
            flex: 1,
            justifyContent: 'center',
            gap: '22px',
            paddingLeft: '56px',
            borderLeft: `1px solid ${C.surface}`,
            marginLeft: '32px',
          },
          recent.map((article, i) =>
            h('div', { display: 'flex', alignItems: 'flex-start', gap: '18px' }, [
              h(
                'div',
                { fontSize: '20px', fontWeight: 800, color: C.accent2, width: '34px', flexShrink: 0 },
                String(i + 1).padStart(2, '0')
              ),
              h('div', { display: 'flex', flexDirection: 'column', gap: '6px' }, [
                h(
                  'div',
                  {
                    display: 'flex',
                    fontSize: article.title.length > 48 ? '24px' : '28px',
                    fontWeight: 800,
                    color: C.text,
                    letterSpacing: '-0.02em',
                    lineHeight: 1.18,
                  },
                  article.title
                ),
                h(
                  'div',
                  { fontSize: '13px', fontWeight: 800, color: C.text3, letterSpacing: '0.06em', textTransform: 'uppercase' },
                  article.source
                ),
              ]),
            ])
          )
        ),
      ]
    )
  );
}
