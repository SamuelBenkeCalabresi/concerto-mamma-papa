import { NextRequest, NextResponse } from 'next/server';
import { createServiceClient } from '@/lib/supabase';
import { createServerClient } from '@supabase/ssr';
import { cookies } from 'next/headers';
import {
  LOCANDINA_ALLOWED_TYPES,
  LOCANDINA_BUCKET,
  LOCANDINA_FOLDER,
  LOCANDINA_MAX_BYTES,
  ensureLocandinaBucket,
  getCurrentLocandina,
} from '@/lib/locandina';

export const dynamic = 'force-dynamic';

async function getSession() {
  const cookieStore = await cookies();
  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY!,
    {
      cookies: {
        getAll() { return cookieStore.getAll(); },
        setAll() {},
      },
    }
  );
  const { data: { session } } = await supabase.auth.getSession();
  return session;
}

const EXT: Record<string, string> = {
  'application/pdf': 'pdf',
  'image/png': 'png',
  'image/jpeg': 'jpg',
  'image/webp': 'webp',
};

// Current locandina info
export async function GET() {
  const session = await getSession();
  if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  const current = await getCurrentLocandina(createServiceClient());
  return NextResponse.json({ data: current });
}

// Step 1: get a signed upload URL (file goes straight from browser to Supabase,
// avoiding Vercel's ~4.5MB request body limit).
export async function POST(request: NextRequest) {
  const session = await getSession();
  if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  const { contentType, size } = await request.json();
  if (!LOCANDINA_ALLOWED_TYPES.includes(contentType)) {
    return NextResponse.json({ error: 'Formato non supportato (PDF, PNG, JPG, WEBP)' }, { status: 400 });
  }
  if (typeof size !== 'number' || size > LOCANDINA_MAX_BYTES) {
    return NextResponse.json({ error: 'File troppo grande (max 20MB)' }, { status: 400 });
  }

  const db = createServiceClient();
  try {
    await ensureLocandinaBucket(db);
  } catch (err) {
    return NextResponse.json({ error: `Storage non disponibile: ${(err as Error).message}` }, { status: 500 });
  }

  const path = `${LOCANDINA_FOLDER}/locandina-${Date.now()}.${EXT[contentType]}`;
  const { data, error } = await db.storage.from(LOCANDINA_BUCKET).createSignedUploadUrl(path);
  if (error) return NextResponse.json({ error: error.message }, { status: 500 });

  return NextResponse.json({ data: { path, token: data.token, bucket: LOCANDINA_BUCKET } });
}

// Step 2: after a successful upload, remove older versions.
export async function PUT(request: NextRequest) {
  const session = await getSession();
  if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  const { path } = await request.json();
  const db = createServiceClient();
  const current = await getCurrentLocandina(db);
  if (!current || current.path !== path) {
    return NextResponse.json({ error: 'Upload non trovato' }, { status: 400 });
  }

  const { data: files } = await db.storage.from(LOCANDINA_BUCKET).list(LOCANDINA_FOLDER, { limit: 100 });
  const old = (files ?? [])
    .filter(f => f.id && `${LOCANDINA_FOLDER}/${f.name}` !== path)
    .map(f => `${LOCANDINA_FOLDER}/${f.name}`);
  if (old.length) await db.storage.from(LOCANDINA_BUCKET).remove(old);

  return NextResponse.json({ data: current });
}
