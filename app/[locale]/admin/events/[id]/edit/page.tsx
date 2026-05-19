'use client';

import { useState, useEffect } from 'react';
import { useRouter, useParams } from 'next/navigation';
import { useLocale } from 'next-intl';
import { ArrowLeftIcon } from '@heroicons/react/24/outline';
import type { Event } from '@/lib/supabase';

export default function EditEventPage() {
  const router = useRouter();
  const { id } = useParams<{ id: string }>();
  const locale = useLocale();
  const [form, setForm] = useState<Partial<Event & { timesText: string }> | null>(null);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    fetch('/api/admin/events')
      .then(r => r.json())
      .then(json => {
        const event: Event = (json.data ?? []).find((e: Event) => e.id === id);
        if (event) {
          setForm({ ...event, timesText: (event.times ?? []).join('\n') });
        }
      });
  }, [id]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form) return;
    setSaving(true);
    setError('');

    const { timesText, ...rest } = form;
    const payload = {
      ...rest,
      times: timesText ? timesText.split('\n').map(t => t.trim()).filter(Boolean) : [],
    };

    const res = await fetch(`/api/admin/events/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    });

    if (!res.ok) {
      const json = await res.json();
      setError(json.error ?? 'Errore durante il salvataggio');
      setSaving(false);
      return;
    }

    router.push(`/${locale}/admin`);
  };

  if (!form) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="w-10 h-10 border-4 border-emerald-600 border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white border-b border-gray-200 px-6 py-4 flex items-center gap-4">
        <button onClick={() => router.back()} className="p-2 hover:bg-gray-100 rounded-lg">
          <ArrowLeftIcon className="h-5 w-5" />
        </button>
        <h1 className="text-xl font-bold text-gray-900">Modifica Evento</h1>
      </header>

      <main className="max-w-2xl mx-auto px-4 py-8">
        <form onSubmit={handleSubmit} className="bg-white rounded-xl shadow p-8 space-y-5">
          {error && (
            <p className="text-sm text-red-600 bg-red-50 border border-red-200 rounded-lg px-4 py-3">{error}</p>
          )}

          <Field label="Titolo *">
            <input required value={form.title ?? ''} onChange={e => setForm({ ...form, title: e.target.value })}
              className="input-field" />
          </Field>

          <Field label="Descrizione">
            <textarea rows={4} value={form.description ?? ''} onChange={e => setForm({ ...form, description: e.target.value })}
              className="input-field resize-y" />
          </Field>

          <Field label="Data *">
            <input required type="date" value={form.date ?? ''} onChange={e => setForm({ ...form, date: e.target.value })}
              className="input-field" />
          </Field>

          <Field label="Orari disponibili (uno per riga)">
            <textarea rows={3} value={form.timesText ?? ''} onChange={e => setForm({ ...form, timesText: e.target.value })}
              className="input-field resize-y font-mono text-sm" />
          </Field>

          <Field label="Luogo">
            <input value={form.location ?? ''} onChange={e => setForm({ ...form, location: e.target.value })}
              className="input-field" />
          </Field>

          <div className="grid grid-cols-2 gap-4">
            <Field label="Età min">
              <input type="number" min={0} value={form.age_min ?? 0} onChange={e => setForm({ ...form, age_min: +e.target.value })}
                className="input-field" />
            </Field>
            <Field label="Età max">
              <input type="number" min={0} value={form.age_max ?? 5} onChange={e => setForm({ ...form, age_max: +e.target.value })}
                className="input-field" />
            </Field>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <Field label="Posti disponibili">
              <input type="number" min={1} value={form.available_seats ?? 20} onChange={e => setForm({ ...form, available_seats: +e.target.value })}
                className="input-field" />
            </Field>
            <Field label="Prezzo (€)">
              <input type="number" min={0} step="any" value={form.price || ''} onChange={e => setForm({ ...form, price: e.target.value === '' ? 0 : parseFloat(e.target.value) || 0 })}
                className="input-field" placeholder="0" />
            </Field>
          </div>

          <div className="flex flex-wrap gap-6">
            <label className="flex items-center gap-2 cursor-pointer">
              <input type="checkbox" checked={form.is_free ?? false} onChange={e => setForm({ ...form, is_free: e.target.checked })}
                className="h-4 w-4 text-emerald-600 rounded" />
              <span className="text-sm font-medium text-gray-700">Gratuito</span>
            </label>
            <label className="flex items-center gap-2 cursor-pointer">
              <input type="checkbox" checked={form.booking_enabled ?? true} onChange={e => setForm({ ...form, booking_enabled: e.target.checked })}
                className="h-4 w-4 text-emerald-600 rounded" />
              <span className="text-sm font-medium text-gray-700">Prenotazioni aperte</span>
            </label>
            <label className="flex items-center gap-2 cursor-pointer">
              <input type="checkbox" checked={form.active ?? true} onChange={e => setForm({ ...form, active: e.target.checked })}
                className="h-4 w-4 text-emerald-600 rounded" />
              <span className="text-sm font-medium text-gray-700">Visibile sul sito</span>
            </label>
            <label className="flex items-center gap-2 cursor-pointer">
              <input type="checkbox" checked={form.show_in_calendar ?? false} onChange={e => setForm({ ...form, show_in_calendar: e.target.checked })}
                className="h-4 w-4 text-amber-500 rounded" />
              <span className="text-sm font-medium text-gray-700">Mostra nel calendario (stagione passata)</span>
            </label>
          </div>

          <div className="pt-4 flex gap-3">
            <button type="button" onClick={() => router.back()}
              className="flex-1 border border-gray-300 text-gray-700 font-semibold py-3 rounded-lg hover:bg-gray-50 transition">
              Annulla
            </button>
            <button type="submit" disabled={saving}
              className="flex-1 bg-emerald-600 hover:bg-emerald-700 disabled:bg-gray-400 text-white font-semibold py-3 rounded-lg transition">
              {saving ? 'Salvataggio...' : 'Salva Modifiche'}
            </button>
          </div>
        </form>
      </main>

      <style jsx global>{`
        .input-field {
          width: 100%;
          padding: 10px 14px;
          border: 1px solid #d1d5db;
          border-radius: 8px;
          font-size: 14px;
          outline: none;
          transition: border-color 0.15s, box-shadow 0.15s;
        }
        .input-field:focus {
          border-color: #059669;
          box-shadow: 0 0 0 3px rgba(5, 150, 105, 0.1);
        }
      `}</style>
    </div>
  );
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-1.5">{label}</label>
      {children}
    </div>
  );
}
