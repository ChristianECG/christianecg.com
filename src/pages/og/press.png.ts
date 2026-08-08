import { png, type Node } from './_og';
import { pressKits, pressMentions } from '../../data/press';

export async function GET() {
  const kitCount = pressKits.length;
  const mentionCount = pressMentions.length;
  const resourceCount = pressKits.reduce(
    (acc, kit) => acc + kit.documents.length + (kit.links?.length ?? 0) + kit.photos.length,
    0
  );

  const tree: Node = {
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
          // Left panel — watermark typographic
          {
            type: 'div',
            props: {
              style: {
                width: '420px',
                height: '100%',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'flex-start',
                justifyContent: 'flex-end',
                padding: '56px 48px',
                position: 'relative',
                backgroundColor: '#0d1018',
                overflow: 'hidden',
              },
              children: [
                // PRESS watermark
                {
                  type: 'div',
                  props: {
                    style: {
                      position: 'absolute',
                      bottom: '-20px',
                      left: '-16px',
                      fontSize: '196px',
                      fontWeight: 800,
                      color: '#5B8CF5',
                      opacity: 0.07,
                      letterSpacing: '-0.04em',
                      lineHeight: 1,
                      userSelect: 'none',
                    },
                    children: 'PRESS',
                  },
                },
                // Top label
                {
                  type: 'div',
                  props: {
                    style: {
                      position: 'absolute',
                      top: '52px',
                      left: '48px',
                      display: 'flex',
                      flexDirection: 'column',
                      gap: '8px',
                    },
                    children: [
                      {
                        type: 'div',
                        props: {
                          style: {
                            width: '32px',
                            height: '3px',
                            backgroundColor: '#5B8CF5',
                            borderRadius: '2px',
                          },
                          children: '',
                        },
                      },
                      {
                        type: 'div',
                        props: {
                          style: {
                            fontSize: '11px',
                            color: '#5B8CF5',
                            fontWeight: 800,
                            letterSpacing: '0.14em',
                            textTransform: 'uppercase',
                          },
                          children: 'Sala de prensa',
                        },
                      },
                    ],
                  },
                },
                // Bottom credential number
                {
                  type: 'div',
                  props: {
                    style: {
                      fontSize: '11px',
                      color: '#3E4A60',
                      fontWeight: 800,
                      letterSpacing: '0.12em',
                      textTransform: 'uppercase',
                    },
                    children: 'christianecg.com',
                  },
                },
              ],
            },
          },

          // Accent divider
          {
            type: 'div',
            props: {
              style: {
                width: '3px',
                height: '100%',
                backgroundColor: '#5B8CF5',
                opacity: 0.6,
                flexShrink: 0,
              },
              children: '',
            },
          },

          // Right panel — content
          {
            type: 'div',
            props: {
              style: {
                flex: 1,
                height: '100%',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                padding: '60px 64px',
              },
              children: [
                // Top: credential tag
                {
                  type: 'div',
                  props: {
                    style: {
                      display: 'flex',
                      alignItems: 'center',
                      gap: '10px',
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
                            letterSpacing: '0.1em',
                            textTransform: 'uppercase',
                          },
                          children: 'Press kit',
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
                          children: '· Menciones · Recursos',
                        },
                      },
                    ],
                  },
                },

                // Center: main title
                {
                  type: 'div',
                  props: {
                    style: {
                      display: 'flex',
                      flexDirection: 'column',
                      gap: '16px',
                    },
                    children: [
                      {
                        type: 'div',
                        props: {
                          style: {
                            fontSize: '58px',
                            fontWeight: 800,
                            color: '#E8EDF5',
                            letterSpacing: '-0.03em',
                            lineHeight: 1.1,
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

                // Bottom: three stats
                {
                  type: 'div',
                  props: {
                    style: {
                      display: 'flex',
                      gap: '32px',
                    },
                    children: [
                      {
                        type: 'div',
                        props: {
                          style: { display: 'flex', flexDirection: 'column', gap: '4px' },
                          children: [
                            {
                              type: 'div',
                              props: {
                                style: { fontSize: '22px', fontWeight: 800, color: '#5B8CF5', letterSpacing: '-0.02em' },
                                children: String(kitCount),
                              },
                            },
                            {
                              type: 'div',
                              props: {
                                style: { fontSize: '11px', fontWeight: 800, color: '#3E4A60', letterSpacing: '0.08em', textTransform: 'uppercase' },
                                children: 'Press kits',
                              },
                            },
                          ],
                        },
                      },
                      {
                        type: 'div',
                        props: {
                          style: { display: 'flex', flexDirection: 'column', gap: '4px' },
                          children: [
                            {
                              type: 'div',
                              props: {
                                style: { fontSize: '22px', fontWeight: 800, color: '#5B8CF5', letterSpacing: '-0.02em' },
                                children: String(mentionCount),
                              },
                            },
                            {
                              type: 'div',
                              props: {
                                style: { fontSize: '11px', fontWeight: 800, color: '#3E4A60', letterSpacing: '0.08em', textTransform: 'uppercase' },
                                children: 'Menciones',
                              },
                            },
                          ],
                        },
                      },
                      {
                        type: 'div',
                        props: {
                          style: { display: 'flex', flexDirection: 'column', gap: '4px' },
                          children: [
                            {
                              type: 'div',
                              props: {
                                style: { fontSize: '22px', fontWeight: 800, color: '#5B8CF5', letterSpacing: '-0.02em' },
                                children: String(resourceCount),
                              },
                            },
                            {
                              type: 'div',
                              props: {
                                style: { fontSize: '11px', fontWeight: 800, color: '#3E4A60', letterSpacing: '0.08em', textTransform: 'uppercase' },
                                children: 'Recursos',
                              },
                            },
                          ],
                        },
                      },
                    ],
                  },
                },
              ],
            },
          },
        ],
      },
    };

  return png(tree);
}
