import { NextResponse } from 'next/server';

const STRAPI_URL = process.env.NEXT_PUBLIC_STRAPI_URL || process.env.NEXT_PUBLIC_STRAPI_API_URL || 'http://localhost:1337';

export const revalidate = 300; // Cache for 5 minutes (ISR)

export async function GET() {
  // Strapi temporarily unavailable — return empty list
  return NextResponse.json({ data: [], meta: {} });
}
