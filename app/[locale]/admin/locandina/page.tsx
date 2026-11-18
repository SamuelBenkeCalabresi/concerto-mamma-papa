'use client';

import { useState, useEffect, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import { useLocale } from 'next-intl';
import { getBrowserClient } from '@/lib/supabase';
import { LOCANDINA_ALLOWED_TYPES, LOCANDINA_FALLBACK, LOCANDINA_MAX_BYTES } from '@/lib/locandina';
import { ArrowLeftIcon, ArrowUpTrayIcon, DocumentIcon } from '@heroicons/react/24/outline';

type Current = { path: string; url: string; name: string; createdAt: string } | null;

export default function AdminLocandinaPage() {
  const router = useRouter();
  const locale = useLocale();
  const [current, setCurrent] = useState<Current>(null);
  const [loading, setLoading] = useState(true);
  const [file, setFile] = useState<File | null>(null);
  const [uploading, setUploading] = useState(false);
  const [message, setMessage] = useState<{ type: 'ok' | 'error'; text: string } | null>(null);

  const load = useCallback(async () => {
    setLoading(true);
    const res = await fetch('/api/admin/locandina');
    if (res.status === 401) { router.push(`/${locale}/admin/login`); return; }
    const json = await res.json();
    setCurrent(json.data ?? null);
    setLoading(false);
  }, [router, locale]);

  useEffect(() => { load(); }, [load]);

  const handleUpload = async () => {
    if (!file) return;
    setMessage(null);
    if (!LOCANDINA_ALLOWED_TYPES.includes(file.type)) {
      setMessage({ type: 'error', text: 'Formato non supportato. Usa PDF, PNG, JPG o WEBP.' });
      return;
    }
    if (file.size > LOCANDINA_MAX_BYTES) {
      setMessage({ type: 'error', text: 'File troppo grande (max 20MB).' });
      return;
    }

    setUploading(true);
    try {
      const signRes = await fetch('/api/admin/locandina', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ contentType: file.type, size: file.size }),
      });
      const signJson = await signRes.json();
      if (!signRes.ok) throw new Error(signJson.error ?? 'Errore');
      const { path, token, bucket } = signJson.data;

      const { error } = await getBrowserClient()
        .storage.from(bucket)
        .uploadToSignedUrl(path, token, file, { contentType: file.type });
      if (error) throw error;

      const confirmRes = await fetch('/api/admin/locandina', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ path }),
      });
      if (!confirmRes.ok) throw new Error((await confirmRes.json()).error ?? 'Errore');

      setFile(null);
      setMessage({ type: 'ok', text: 'Locandina aggiornata! È già visibile sul sito.' });
      await load();
    } catch (err) {
      setMessage({ type: 'error', text: `Caricamento fallito: ${(err as Error).message}` });
    } finally {
      setUploading(false);
    }
  };

  const previewUrl = current?.url ?? LOCANDINA_FALLBACK;
  const isPdf = previewUrl.toLowerCase().split('?')[0].endsWith('.pdf');

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white border-b border-gray-200 px-6 py-4 flex items-center gap-3">
        <button
          onClick={() => router.push(`/${locale}/admin`)}
          className="p-1.5 text-gray-500 hover:bg-gray-100 rounded-lg transition"
          title="Indietro"
        >
          <ArrowLeftIcon className="h-5 w-5" />
        </button>
        <h1 className="text-xl font-bold text-gray-900">Locandina Coupon</h1>
      </header>

      <main className="max-w-3xl mx-auto px-4 py-8 space-y-6">
        <section className="bg-white rounded-xl shadow p-6">
          <h2 className="font-semibold text-gray-900 mb-1">Locandina attuale</h2>
          <p className="text-sm text-gray-500 mb-4">
            {loading
              ? 'Caricamento…'
              : current
                ? `Caricata il ${new Date(current.createdAt).toLocaleString('it-IT')}`
                : 'Nessun file caricato: viene mostrata la locandina predefinita.'}
          </p>
          {!loading && (
            isPdf ? (
              <a href={previewUrl} target="_blank" rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-emerald-700 hover:underline">
                <DocumentIcon className="h-5 w-5" /> Apri PDF
              </a>
            ) : (
              <a href={previewUrl} target="_blank" rel="noopener noreferrer">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={previewUrl} alt="Locandina attuale" className="max-h-96 rounded-lg border border-gray-200" />
              </a>
            )
          )}
        </section>

        <section className="bg-white rounded-xl shadow p-6">
          <h2 className="font-semibold text-gray-900 mb-1">Sostituisci locandina</h2>
          <p className="text-sm text-gray-500 mb-4">PDF, PNG, JPG o WEBP — max 20MB.</p>
          <input
            type="file"
            accept={LOCANDINA_ALLOWED_TYPES.join(',')}
            onChange={e => { setFile(e.target.files?.[0] ?? null); setMessage(null); }}
            className="block w-full text-sm text-gray-700 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:bg-emerald-50 file:text-emerald-700 hover:file:bg-emerald-100"
          />
          <button
            onClick={handleUpload}
            disabled={!file || uploading}
            className="mt-4 flex items-center gap-2 bg-emerald-600 hover:bg-emerald-700 text-white font-semibold px-4 py-2 rounded-lg transition disabled:opacity-50"
          >
            <ArrowUpTrayIcon className="h-5 w-5" />
            {uploading ? 'Caricamento…' : 'Carica'}
          </button>
          {message && (
            <p className={`mt-4 text-sm ${message.type === 'ok' ? 'text-emerald-700' : 'text-red-600'}`}>
              {message.text}
            </p>
          )}
        </section>
      </main>
    </div>
  );
}
