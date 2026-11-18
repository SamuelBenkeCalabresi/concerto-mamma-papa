import { NextRequest, NextResponse } from 'next/server';
import { createServiceClient } from '@/lib/supabase';
import { getCurrentLocandina, LOCANDINA_FALLBACK } from '@/lib/locandina';

export const dynamic = 'force-dynamic';

// Public: redirects to the current coupon locandina (or the static fallback).
export async function GET(request: NextRequest) {
  let target = LOCANDINA_FALLBACK;
  try {
    const current = await getCurrentLocandina(createServiceClient());
    if (current) target = current.url;
  } catch (err) {
    console.error('Locandina lookup failed:', err);
  }
  const res = NextResponse.redirect(new URL(target, request.url), 307);
  res.headers.set('Cache-Control', 'no-store');
  return res;
}
