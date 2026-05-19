'use client';

import { useState, useEffect, useCallback } from 'react';
import { useRouter, useParams } from 'next/navigation';
import { useLocale } from 'next-intl';
import { ArrowLeftIcon, ArrowDownTrayIcon, CheckCircleIcon, XCircleIcon, ClockIcon } from '@heroicons/react/24/outline';
import type { Booking, Event } from '@/lib/supabase';

export default function RegistrationsPage() {
  const router = useRouter();
  const { id } = useParams<{ id: string }>();
  const locale = useLocale();
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [event, setEvent] = useState<Event | null>(null);
  const [loading, setLoading] = useState(true);
  const [statusFilter, setStatusFilter] = useState('all');
  const [exporting, setExporting] = useState(false);

  const loadData = useCallback(async () => {
    setLoading(true);
    const [bookingsRes, eventsRes] = await Promise.all([
      fetch(`/api/admin/bookings?event_id=${id}`),
      fetch('/api/admin/events'),
    ]);
    const bookingsJson = await bookingsRes.json();
    const eventsJson = await eventsRes.json();
    setBookings(bookingsJson.data ?? []);
    const found: Event = (eventsJson.data ?? []).find((e: Event) => e.id === id);
    setEvent(found ?? null);
    setLoading(false);
  }, [id]);

  useEffect(() => { loadData(); }, [loadData]);

  const updateStatus = async (bookingId: string, status: string) => {
    await fetch('/api/admin/bookings', {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id: bookingId, status }),
    });
    await loadData();
  };

  const handleExport = async () => {
    setExporting(true);
    const res = await fetch(`/api/admin/bookings/export?event_id=${id}`);
    const blob = await res.blob();
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = res.headers.get('Content-Disposition')?.split('filename=')[1]?.replace(/"/g, '') ?? 'export.xlsx';
    a.click();
    URL.revokeObjectURL(url);
    setExporting(false);
  };

  const filtered = bookings.filter(b => statusFilter === 'all' || b.status === statusFilter);

  const statusBadge = (status: string) => {
    if (status === 'confirmed') return <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800"><CheckCircleIcon className="h-3.5 w-3.5" />Confermata</span>;
    if (status === 'cancelled') return <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-medium bg-red-100 text-red-800"><XCircleIcon className="h-3.5 w-3.5" />Annullata</span>;
    return <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800"><ClockIcon className="h-3.5 w-3.5" />In attesa</span>;
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <button onClick={() => router.push(`/${locale}/admin`)} className="p-2 hover:bg-gray-100 rounded-lg">
            <ArrowLeftIcon className="h-5 w-5" />
          </button>
          <div>
            <h1 className="text-xl font-bold text-gray-900">Prenotazioni</h1>
            {event && <p className="text-sm text-gray-500">{event.title} — {new Date(event.date).toLocaleDateString('it-IT', { day: '2-digit', month: 'long', year: 'numeric' })}</p>}
          </div>
        </div>
        <button
          onClick={handleExport}
          disabled={exporting || bookings.length === 0}
          className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400 text-white font-semibold px-4 py-2 rounded-lg transition text-sm"
        >
          <ArrowDownTrayIcon className="h-4 w-4" />
          {exporting ? 'Esportazione...' : 'Esporta Excel'}
        </button>
      </header>

      <main className="max-w-7xl mx-auto px-4 py-8">
        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
          {[
            { label: 'Totale', value: bookings.length, color: 'text-gray-900' },
            { label: 'In attesa', value: bookings.filter(b => b.status === 'pending').length, color: 'text-yellow-600' },
            { label: 'Confermate', value: bookings.filter(b => b.status === 'confirmed').length, color: 'text-green-600' },
            { label: 'Annullate', value: bookings.filter(b => b.status === 'cancelled').length, color: 'text-red-600' },
          ].map(stat => (
            <div key={stat.label} className="bg-white rounded-xl shadow p-5">
              <p className="text-sm text-gray-500">{stat.label}</p>
              <p className={`text-3xl font-bold mt-1 ${stat.color}`}>{stat.value}</p>
            </div>
          ))}
        </div>

        {/* Filters */}
        <div className="mb-4 flex gap-3">
          {['all', 'pending', 'confirmed', 'cancelled'].map(s => (
            <button
              key={s}
              onClick={() => setStatusFilter(s)}
              className={`px-4 py-1.5 rounded-full text-sm font-medium transition ${statusFilter === s ? 'bg-emerald-600 text-white' : 'bg-white text-gray-600 border border-gray-200 hover:bg-gray-50'}`}
            >
              {s === 'all' ? 'Tutti' : s === 'pending' ? 'In attesa' : s === 'confirmed' ? 'Confermate' : 'Annullate'}
            </button>
          ))}
        </div>

        {loading ? (
          <div className="text-center py-20">
            <div className="w-10 h-10 border-4 border-emerald-600 border-t-transparent rounded-full animate-spin mx-auto" />
          </div>
        ) : filtered.length === 0 ? (
          <div className="text-center py-20 text-gray-500">
            <p>Nessuna prenotazione trovata.</p>
          </div>
        ) : (
          <div className="bg-white rounded-xl shadow overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead className="bg-gray-50 border-b border-gray-200">
                  <tr>
                    <th className="px-5 py-3 text-left font-semibold text-gray-600">Genitore</th>
                    <th className="px-5 py-3 text-left font-semibold text-gray-600">Contatti</th>
                    <th className="px-5 py-3 text-left font-semibold text-gray-600">Bambini</th>
                    <th className="px-5 py-3 text-left font-semibold text-gray-600">Orario</th>
                    <th className="px-5 py-3 text-left font-semibold text-gray-600">Pagamento</th>
                    <th className="px-5 py-3 text-left font-semibold text-gray-600">Stato</th>
                    <th className="px-5 py-3 text-left font-semibold text-gray-600">Data prenotazione</th>
                    <th className="px-5 py-3 text-right font-semibold text-gray-600">Azioni</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {filtered.map((b) => (
                    <tr key={b.id} className="hover:bg-gray-50">
                      <td className="px-5 py-4">
                        <p className="font-medium text-gray-900">{b.parent_name}</p>
                        {b.cognome && <p className="text-xs text-gray-400">{b.cognome} {b.nome}</p>}
                      </td>
                      <td className="px-5 py-4 text-gray-600">
                        <p>{b.email}</p>
                        <p className="text-xs">{b.phone}</p>
                      </td>
                      <td className="px-5 py-4 text-gray-600">
                        <p>{b.number_kids} bamb., {b.number_adults} adulti</p>
                        {b.kid_names && <p className="text-xs text-gray-400">{b.kid_names}</p>}
                      </td>
                      <td className="px-5 py-4 text-gray-600">{b.selected_time ?? '—'}</td>
                      <td className="px-5 py-4 text-gray-600 capitalize">{b.payment_method}</td>
                      <td className="px-5 py-4">{statusBadge(b.status)}</td>
                      <td className="px-5 py-4 text-gray-500 text-xs">
                        {new Date(b.created_at).toLocaleString('it-IT', { day: '2-digit', month: '2-digit', year: '2-digit', hour: '2-digit', minute: '2-digit' })}
                      </td>
                      <td className="px-5 py-4">
                        <div className="flex items-center justify-end gap-2">
                          {b.status !== 'confirmed' && (
                            <button onClick={() => updateStatus(b.id, 'confirmed')}
                              className="text-xs bg-green-100 text-green-700 px-2 py-1 rounded-md hover:bg-green-200 transition">
                              Conferma
                            </button>
                          )}
                          {b.status !== 'cancelled' && (
                            <button onClick={() => updateStatus(b.id, 'cancelled')}
                              className="text-xs bg-red-100 text-red-700 px-2 py-1 rounded-md hover:bg-red-200 transition">
                              Annulla
                            </button>
                          )}
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
