// Shared helper for the public JSON API. Files starting with "_" are not routes.
// Every endpoint is statically generated at build time from the same data
// sources that feed the HTML pages.

export const SITE = 'https://christianecg.com';

export function apiResponse(endpoint: string, data: unknown[]): Response {
  const body = {
    api: 'christianecg.com',
    version: 1,
    endpoint,
    docs: `${SITE}/es/api`,
    generated_at: new Date().toISOString(),
    count: data.length,
    data,
  };
  return new Response(JSON.stringify(body, null, 2), {
    headers: { 'Content-Type': 'application/json; charset=utf-8' },
  });
}

/** Prefix site-relative paths with the canonical origin; pass through absolute URLs. */
export function abs(path: string | null | undefined): string | null {
  if (!path) return null;
  return path.startsWith('http') ? path : `${SITE}${path}`;
}
