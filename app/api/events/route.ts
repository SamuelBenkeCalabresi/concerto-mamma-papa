import { NextResponse } from 'next/server';

const STRAPI_URL = process.env.NEXT_PUBLIC_STRAPI_URL || process.env.NEXT_PUBLIC_STRAPI_API_URL || 'http://localhost:1337';

export const revalidate = 300; // Cache for 5 minutes (ISR)

export async function GET() {
  try {
    const res = await fetch(`${STRAPI_URL}/api/events?populate=*&pagination[pageSize]=100`, {
      headers: { 'Content-Type': 'application/json' },
      next: { revalidate: 300 },
    });

    if (!res.ok) {
      console.error('Strapi API error:', res.status, res.statusText);
      return NextResponse.json(
        { data: [], meta: {}, error: 'Strapi unavailable' },
        { status: 503 }
      );
    }

    const data = await res.json();
    return NextResponse.json(data);
  } catch (error) {
    console.error('Error fetching events from Strapi:', error);
    return NextResponse.json(
      { data: [], meta: {}, error: 'Failed to fetch events' },
      { status: 503 }
    );
  }
}
