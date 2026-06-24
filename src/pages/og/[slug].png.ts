import type { APIContext } from 'astro';
import { getCollection } from 'astro:content';
import { C, h, png, glow } from './_og';

export async function getStaticPaths() {
  const posts = await getCollection('blog');
  return posts.map((post) => ({
    params: { slug: post.id },
    props: { title: post.data.title, date: post.data.date },
  }));
}

// Concept — "Article card": kicker + large headline (white for legibility),
// date, and a gradient hairline; author and domain anchored at the bottom.
export async function GET({ props }: APIContext) {
  const { title, date } = props as { title: string; date: string };

  const fontSize = title.length <= 40 ? 70 : title.length <= 65 ? 56 : title.length <= 85 ? 46 : 38;
  const formattedDate = date
    ? new Date(date).toLocaleDateString('es-MX', { year: 'numeric', month: 'long', day: 'numeric' })
    : '';

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
        padding: '64px 72px',
        position: 'relative',
        overflow: 'hidden',
      },
      [
        glow({ width: '720px', height: '720px', top: '-320px', right: '-220px' }),

        // Top: kicker + date
        h('div', { display: 'flex', alignItems: 'center', justifyContent: 'space-between', position: 'relative' }, [
          h('div', { display: 'flex', alignItems: 'center', gap: '14px' }, [
            h('div', { width: '34px', height: '3px', backgroundColor: C.accent, borderRadius: '2px' }),
            h(
              'div',
              { fontSize: '14px', fontWeight: 800, color: C.accent, letterSpacing: '0.16em', textTransform: 'uppercase' },
              'Artículo'
            ),
          ]),
          formattedDate
            ? h('div', { fontSize: '15px', fontWeight: 700, color: C.text3, letterSpacing: '0.02em' }, formattedDate)
            : h('div', {}),
        ]),

        // Middle: headline
        h('div', { display: 'flex', flexDirection: 'column', gap: '26px', position: 'relative' }, [
          h('div', { width: '64px', height: '5px', borderRadius: '3px', backgroundImage: `linear-gradient(90deg, ${C.accent}, ${C.accent2})` }),
          h(
            'div',
            {
              display: 'flex',
              fontSize: `${fontSize}px`,
              fontWeight: 800,
              color: C.text,
              letterSpacing: '-0.03em',
              lineHeight: 1.1,
              maxWidth: '1000px',
            },
            title
          ),
        ]),

        // Bottom: author + domain
        h('div', { display: 'flex', alignItems: 'center', justifyContent: 'space-between', position: 'relative' }, [
          h('div', { fontSize: '20px', fontWeight: 800, color: C.text2, letterSpacing: '-0.01em' }, 'Christian Elías Cruz González'),
          h('div', { fontSize: '15px', fontWeight: 800, color: C.text3, letterSpacing: '0.1em', textTransform: 'uppercase' }, 'christianecg.com'),
        ]),
      ]
    )
  );
}
