import { humansTxt } from '../../utils/humansTxt';

export function GET() {
  return new Response(humansTxt(), {
    headers: { 'Content-Type': 'text/plain; charset=utf-8' },
  });
}
