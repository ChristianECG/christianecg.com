export function GET() {
  const body = `418 I'm a teapot

This endpoint is IPoAC-compliant (RFC 1149 / RFC 6214) but no pigeon is
currently roosted at this loft. Average round-trip time when one is: ~3000s.
Packet loss: acceptable, given the circumstances.

See draft-cruzgonzalez-ipoac-dns for name resolution over this transport.
`;
  return new Response(body, {
    status: 418,
    headers: { 'Content-Type': 'text/plain; charset=utf-8' },
  });
}
