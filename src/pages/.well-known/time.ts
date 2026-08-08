export function GET() {
  return new Response(`${new Date().toUTCString()}\n`, {
    status: 200,
    headers: { 'Content-Type': 'text/plain; charset=utf-8' },
  });
}
