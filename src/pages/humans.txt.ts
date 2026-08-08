export function GET() {
  const today = new Date().toISOString().slice(0, 10);
  const body = `/* TEAM */
Developer & Designer: Christian Elías Cruz González
Contact: contacto [at] christianecg [dot] com
LinkedIn: https://www.linkedin.com/in/christianeliascg/

/* TECHNOLOGY */
Language: HTML, CSS, TypeScript
Framework: Astro
Analytics: Avelor

/* SITE */
Last update: ${today}
Standards: HTML5, CSS3, Schema.org
`;
  return new Response(body, {
    headers: { 'Content-Type': 'text/plain; charset=utf-8' },
  });
}
