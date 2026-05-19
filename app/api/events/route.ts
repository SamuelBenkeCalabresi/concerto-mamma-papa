import { NextResponse } from 'next/server';
import { createServiceClient } from '@/lib/supabase';

export const dynamic = 'force-dynamic';

export async function GET() {
  const db = createServiceClient();
  const today = new Date().toISOString().split('T')[0];

  const [{ data: futureEvents, error: e1 }, { data: pastShowEvents, error: e2 }] = await Promise.all([
    db.from('events').select('*').eq('active', true).gte('date', today).order('date', { ascending: true }),
    db.from('events').select('*').eq('show_in_calendar', true).lt('date', today).order('date', { ascending: false }),
  ]);

  if (e1 || e2) {
    console.error('Supabase error fetching events:', e1 ?? e2);
    return NextResponse.json({ data: [] });
  }

  const data = [
    ...(futureEvents ?? []),
    // Past events are shown but never bookable
    ...(pastShowEvents ?? []).map(e => ({ ...e, booking_enabled: false })),
  ];

  return NextResponse.json({ data });
}
