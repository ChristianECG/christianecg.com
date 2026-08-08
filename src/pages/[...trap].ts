import type { APIRoute, GetStaticPaths } from 'astro';

// ponytail: curated list of the paths bots scan most, not a catch-all —
// add more here if a new favorite shows up in the logs.
const TRAPS = ['.env', '.git/config', 'wp-login.php', 'wp-admin', 'xmlrpc.php', 'phpmyadmin'];

export const getStaticPaths: GetStaticPaths = () => TRAPS.map((trap) => ({ params: { trap } }));

export const GET: APIRoute = () => {
  const body = `404 Not Found

Nice try. This is a static Astro site: no WordPress, no PHP, no database,
no .env to leak. Try /.well-known/carrier-pigeon instead.
`;
  return new Response(body, {
    status: 404,
    headers: { 'Content-Type': 'text/plain; charset=utf-8' },
  });
};
