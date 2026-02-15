import { NextResponse } from 'next/server';

const STRAPI_URL = process.env.NEXT_PUBLIC_STRAPI_URL || process.env.NEXT_PUBLIC_STRAPI_API_URL || 'http://localhost:1337';

export const dynamic = 'force-dynamic';

export async function GET(request: Request) {
  // Optional: verify cron secret to prevent abuse
  const authHeader = request.headers.get('authorization');
  const cronSecret = process.env.CRON_SECRET;
  if (cronSecret && authHeader !== `Bearer ${cronSecret}`) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    // Ping Strapi to keep it warm
    const strapiRes = await fetch(`${STRAPI_URL}/api/events?pagination[pageSize]=1`, {
      headers: { 'Content-Type': 'application/json' },
    });

    const strapiOk = strapiRes.ok;

    // Also pre-warm our own events cache by calling our API route
    const selfUrl = process.env.VERCEL_URL
      ? `https://${process.env.VERCEL_URL}/api/events`
      : 'http://localhost:4000/api/events';

    await fetch(selfUrl).catch(() => {});

    return NextResponse.json({
      ok: true,
      strapi: strapiOk ? 'warm' : 'cold',
      timestamp: new Date().toISOString(),
    });
  } catch (error) {
    console.error('Warmup error:', error);
    return NextResponse.json({
      ok: false,
      strapi: 'unreachable',
      timestamp: new Date().toISOString(),
    });
  }
}
