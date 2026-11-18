import type { SupabaseClient } from '@supabase/supabase-js';

// Coupon locandina (poster) is stored in Supabase Storage so admins can replace it.
export const LOCANDINA_BUCKET = 'site-assets';
export const LOCANDINA_FOLDER = 'coupon';
// Used until an admin uploads the first file.
export const LOCANDINA_FALLBACK = '/images/LOCANDINA-PER-IL-COUPON-NATALE.png?v=2';

export const LOCANDINA_ALLOWED_TYPES = ['application/pdf', 'image/png', 'image/jpeg', 'image/webp'];
export const LOCANDINA_MAX_BYTES = 20 * 1024 * 1024;

export async function ensureLocandinaBucket(db: SupabaseClient) {
  const { data } = await db.storage.getBucket(LOCANDINA_BUCKET);
  if (data) return;
  const { error } = await db.storage.createBucket(LOCANDINA_BUCKET, { public: true });
  if (error && !/already exists/i.test(error.message)) throw error;
}

/** Returns { path, url } of the most recently uploaded locandina, or null. */
export async function getCurrentLocandina(db: SupabaseClient) {
  const { data, error } = await db.storage
    .from(LOCANDINA_BUCKET)
    .list(LOCANDINA_FOLDER, { limit: 5, sortBy: { column: 'created_at', order: 'desc' } });
  if (error || !data?.length) return null;
  const file = data.find(f => f.id); // skip folder placeholders
  if (!file) return null;
  const path = `${LOCANDINA_FOLDER}/${file.name}`;
  const { data: pub } = db.storage.from(LOCANDINA_BUCKET).getPublicUrl(path);
  return { path, url: pub.publicUrl, name: file.name, createdAt: file.created_at };
}
