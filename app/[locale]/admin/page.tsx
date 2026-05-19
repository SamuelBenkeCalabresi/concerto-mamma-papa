'use client';

import { useState, useEffect, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import { useLocale } from 'next-intl';
import { getBrowserClient, type Event } from '@/lib/supabase';
import {
  PlusIcon,
  PencilIcon,
  TrashIcon,
  UsersIcon,
  CalendarDaysIcon,
  ArrowRightOnRectangleIcon,
  CheckCircleIcon,
  XCircleIcon,
} from '@heroicons/react/24/outline';

export default function AdminDashboard() {
  const router = useRouter();
  const locale = useLocale();
  const [events, setEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState(true);
  const [deleting, setDeleting] = useState<string | null>(null);

  const loadEvents = useCallback(async () => {
    setLoading(true);
    const res = await fetch('/api/admin/events');
    if (res.status === 401) { router.push(`/${locale}/admin/login`); return; }
    const json = await res.json();
    setEvents(json.data ?? []);
    setLoading(false);
  }, [router, locale]);

  useEffect(() => { loadEvents(); }, [loadEvents]);

  const handleLogout = async () => {
    await getBrowserClient().auth.signOut();
    router.push(`/${locale}/admin/login`);
  };

  const handleDelete = async (id: string, title: string) => {
    if (!confirm(`Eliminare l'evento "${title}"?`)) return;
    setDeleting(id);
    await fetch(`/api/admin/events/${id}`, { method: 'DELETE' });
    await loadEvents();
    setDeleting(null);
  };

  const toggleActive = async (event: Event) => {
    await fetch(`/api/admin/events/${event.id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ active: !event.active }),
    });
    await loadEvents();
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <CalendarDaysIcon className="h-7 w-7 text-emerald-600" />
          <h1 className="text-xl font-bold text-gray-900">Gestione Eventi</h1>
        </div>
        <button
          onClick={handleLogout}
          className="flex items-center gap-2 text-sm text-gray-500 hover:text-gray-700 transition"
        >
          <ArrowRightOnRectangleIcon className="h-5 w-5" />
          Esci
        </button>
      </header>

      <main className="max-w-6xl mx-auto px-4 py-8">
        <div className="flex items-center justify-between mb-6">
          <p className="text-gray-600">{events.length} eventi totali</p>
          <button
            onClick={() => router.push(`/${locale}/admin/events/new`)}
            className="flex items-center gap-2 bg-emerald-600 hover:bg-emerald-700 text-white font-semibold px-4 py-2 rounded-lg transition"
          >
            <PlusIcon className="h-5 w-5" />
            Nuovo Evento
          </button>
        </div>

        {loading ? (
          <div className="text-center py-20">
            <div className="w-10 h-10 border-4 border-emerald-600 border-t-transparent rounded-full animate-spin mx-auto" />
          </div>
        ) : events.length === 0 ? (
          <div className="text-center py-20 text-gray-500">
            <CalendarDaysIcon className="h-12 w-12 mx-auto mb-3 opacity-40" />
            <p>Nessun evento. Crea il primo!</p>
          </div>
        ) : (
          <div className="bg-white rounded-xl shadow overflow-hidden">
            <table className="w-full text-sm">
              <thead className="bg-gray-50 border-b border-gray-200">
                <tr>
                  <th className="px-5 py-3 text-left font-semibold text-gray-600">Evento</th>
                  <th className="px-5 py-3 text-left font-semibold text-gray-600">Data</th>
                  <th className="px-5 py-3 text-left font-semibold text-gray-600">Luogo</th>
                  <th className="px-5 py-3 text-center font-semibold text-gray-600">Attivo</th>
                  <th className="px-5 py-3 text-right font-semibold text-gray-600">Azioni</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {events.map((event) => (
                  <tr key={event.id} className="hover:bg-gray-50">
                    <td className="px-5 py-4">
                      <p className="font-medium text-gray-900">{event.title}</p>
                      <p className="text-xs text-gray-400 mt-0.5">
                        {event.price === 0 || event.is_free ? 'Gratuito' : `€${event.price}`}
                        {' · '}
                        {event.age_min}–{event.age_max} anni
                        {' · '}
                        {event.available_seats} posti
                      </p>
                    </td>
                    <td className="px-5 py-4 text-gray-600">
                      {new Date(event.date).toLocaleDateString('it-IT', { day: '2-digit', month: 'short', year: 'numeric' })}
                    </td>
                    <td className="px-5 py-4 text-gray-600 max-w-[180px] truncate">
                      {event.location ?? '—'}
                    </td>
                    <td className="px-5 py-4 text-center">
                      <button onClick={() => toggleActive(event)} title="Attiva/disattiva">
                        {event.active
                          ? <CheckCircleIcon className="h-5 w-5 text-emerald-500 mx-auto" />
                          : <XCircleIcon className="h-5 w-5 text-gray-300 mx-auto" />
                        }
                      </button>
                    </td>
                    <td className="px-5 py-4">
                      <div className="flex items-center justify-end gap-2">
                        <button
                          onClick={() => router.push(`/${locale}/admin/events/${event.id}/registrations`)}
                          className="p-1.5 text-blue-600 hover:bg-blue-50 rounded-lg transition"
                          title="Prenotazioni"
                        >
                          <UsersIcon className="h-5 w-5" />
                        </button>
                        <button
                          onClick={() => router.push(`/${locale}/admin/events/${event.id}/edit`)}
                          className="p-1.5 text-gray-600 hover:bg-gray-100 rounded-lg transition"
                          title="Modifica"
                        >
                          <PencilIcon className="h-5 w-5" />
                        </button>
                        <button
                          onClick={() => handleDelete(event.id, event.title)}
                          disabled={deleting === event.id}
                          className="p-1.5 text-red-600 hover:bg-red-50 rounded-lg transition disabled:opacity-50"
                          title="Elimina"
                        >
                          <TrashIcon className="h-5 w-5" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </main>
    </div>
  );
}
