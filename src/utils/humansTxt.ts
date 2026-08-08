export function humansTxt(): string {
  const today = new Date().toISOString().slice(0, 10);
  // BOM: static hosts (GitHub Pages included) don't reliably forward our
  // charset=utf-8 header for prerendered routes, so without it browsers
  // fall back to Latin-1 and mangle the accents in the name below.
  return `﻿/* TEAM */
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
}
