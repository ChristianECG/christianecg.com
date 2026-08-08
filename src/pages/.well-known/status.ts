import { buildSha, buildTime } from '../../utils/buildInfo';

// ponytail: static build, no request-time clock — flips only if a build
// happens to land on April 1st (see the deploy.yml cron that forces one).
const buildDate = new Date(buildTime);
const isAprilFools = buildDate.getUTCMonth() === 3 && buildDate.getUTCDate() === 1;

export function GET() {
  const loft = isAprilFools
    ? 'pigeon en route, ETA ~3000s'
    : 'operational, no pigeon currently roosted';
  const pot = isAprilFools ? 'BREWING' : 'idle, no BREW requested';
  const body = `200 OK

STATUS

Loft (RFC 1149 / RFC 6214): ${loft}.
Coffee pot (RFC 2324 / RFC 7168): ${pot}.
DNS TXT record: propagated.
Build: ${buildSha} @ ${buildTime}
`;
  return new Response(body, {
    status: 200,
    headers: { 'Content-Type': 'text/plain; charset=utf-8' },
  });
}
