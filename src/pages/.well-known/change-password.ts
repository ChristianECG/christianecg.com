export function GET() {
  const body = `404 Not Found

No accounts, no passwords. Static site, no backend, nothing to change.
`;
  return new Response(body, {
    status: 404,
    headers: { 'Content-Type': 'text/plain; charset=utf-8' },
  });
}
