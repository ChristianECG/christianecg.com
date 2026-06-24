import type { APIContext } from 'astro';
import { getCollection } from 'astro:content';
import { C, h, png } from '../_og';

export async function getStaticPaths() {
  const projects = await getCollection('projects');
  return projects.map((project) => ({
    params: { slug: project.id },
    props: { title: project.data.title, tags: project.data.tags },
  }));
}

// Concept — "Terminal window" (kept), restyled with the new teal accent.
export async function GET({ props }: APIContext) {
  const { title, tags } = props as { title: string; tags: string[] };
  const fontSize = title.length <= 30 ? 72 : title.length <= 50 ? 58 : title.length <= 70 ? 46 : 36;

  return png(
    h(
      'div',
      {
        width: '100%',
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        backgroundColor: C.bg,
        fontFamily: 'Bricolage Grotesque',
        overflow: 'hidden',
      },
      [
        // macOS title bar
        h(
          'div',
          {
            display: 'flex',
            alignItems: 'center',
            gap: '10px',
            padding: '0 24px',
            height: '52px',
            backgroundColor: '#111520',
            borderBottom: '1px solid #1e2538',
            flexShrink: 0,
          },
          [
            h('div', { width: '14px', height: '14px', borderRadius: '50%', backgroundColor: '#FF5F56' }),
            h('div', { width: '14px', height: '14px', borderRadius: '50%', backgroundColor: '#FFBD2E' }),
            h('div', { width: '14px', height: '14px', borderRadius: '50%', backgroundColor: '#27C93F' }),
            h('div', { marginLeft: '16px', fontSize: '13px', fontWeight: 800, color: C.text3, letterSpacing: '0.02em' }, '~/projects/'),
            h('div', { fontSize: '13px', fontWeight: 800, color: C.text2, letterSpacing: '0.02em' }, title),
          ]
        ),

        // Terminal content
        h(
          'div',
          { flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'space-between', padding: '52px 72px 56px' },
          [
            // Prompt line
            h('div', { display: 'flex', alignItems: 'center', gap: '10px' }, [
              h('div', { fontSize: '14px', fontWeight: 800, color: C.accent2, letterSpacing: '0.04em' }, '$'),
              h('div', { fontSize: '14px', fontWeight: 800, color: C.text3, letterSpacing: '0.04em' }, 'open project --name'),
              h('div', { fontSize: '14px', fontWeight: 800, color: C.text2, letterSpacing: '0.02em' }, `"${title}"`),
            ]),

            // Title + gradient hairline
            h('div', { display: 'flex', flexDirection: 'column', gap: '22px' }, [
              h('div', { width: '60px', height: '5px', borderRadius: '3px', backgroundImage: `linear-gradient(90deg, ${C.accent}, ${C.accent2})` }),
              h(
                'div',
                { fontSize: `${fontSize}px`, fontWeight: 800, color: C.text, letterSpacing: '-0.03em', lineHeight: 1.1, maxWidth: '1000px' },
                title
              ),
            ]),

            // Tags + status
            h('div', { display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end' }, [
              h(
                'div',
                { display: 'flex', gap: '8px' },
                tags.slice(0, 5).map((tag) =>
                  h(
                    'div',
                    {
                      fontSize: '12px',
                      fontWeight: 800,
                      color: C.accentLight,
                      backgroundColor: '#111520',
                      border: '1px solid #1e2538',
                      borderRadius: '4px',
                      padding: '4px 10px',
                      letterSpacing: '0.04em',
                    },
                    `<${tag}>`
                  )
                )
              ),
              h('div', { display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: '4px' }, [
                h('div', { fontSize: '12px', fontWeight: 800, color: '#27C93F', letterSpacing: '0.06em' }, '● deployed'),
                h('div', { fontSize: '14px', fontWeight: 800, color: C.text3, letterSpacing: '0.02em' }, 'christianecg.com'),
              ]),
            ]),
          ]
        ),
      ]
    )
  );
}
