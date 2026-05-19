'use client';

import { useState, useEffect } from 'react';
import { CalendarDaysIcon, MapPinIcon, TicketIcon } from '@heroicons/react/24/outline';
import { useRouter } from '@/i18n/routing';
import type { Event } from '@/lib/supabase';

export default function CalendarioSection() {
  const [events, setEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    fetch('/api/events')
      .then(r => r.json())
      .then(json => { setEvents(json.data ?? []); setLoading(false); })
      .catch(() => setLoading(false));
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center py-12">
        <div className="w-8 h-8 border-4 border-emerald-500 border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  if (events.length === 0) {
    return (
      <div className="max-w-3xl mx-auto px-4 text-center py-12">
        <CalendarDaysIcon className="h-12 w-12 text-emerald-300 mx-auto mb-4" />
        <h2 className="text-2xl font-bold text-neutral mb-2">Calendario Eventi</h2>
        <p className="text-neutral/60">Nessun evento in programma al momento. Torna presto!</p>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="text-center mb-10">
        <div className="inline-flex items-center justify-center bg-emerald-100 p-4 rounded-2xl mb-4">
          <CalendarDaysIcon className="h-10 w-10 text-emerald-600" />
        </div>
        <h2 className="text-3xl sm:text-4xl font-bold text-neutral">Calendario Eventi</h2>
        <p className="text-neutral/60 mt-2">Prossimi concerti per famiglie</p>
      </div>

      <div className="space-y-4">
        {events.map((event) => {
          const isPast = new Date(event.date) < new Date(new Date().toDateString());
          return (
            <div key={event.id} className={`bg-white rounded-2xl shadow border p-6 flex flex-col sm:flex-row sm:items-center gap-4 ${isPast ? 'border-amber-100 opacity-80' : 'border-gray-100'}`}>
              {/* Date badge */}
              <div className={`flex-shrink-0 rounded-xl p-4 text-center min-w-[72px] ${isPast ? 'bg-amber-50 border border-amber-100' : 'bg-emerald-50 border border-emerald-100'}`}>
                <p className={`text-xs font-medium uppercase ${isPast ? 'text-amber-600' : 'text-emerald-600'}`}>
                  {new Date(event.date).toLocaleDateString('it-IT', { month: 'short' })}
                </p>
                <p className={`text-3xl font-bold leading-none ${isPast ? 'text-amber-700' : 'text-emerald-700'}`}>
                  {new Date(event.date).getDate()}
                </p>
                <p className={`text-xs ${isPast ? 'text-amber-500' : 'text-emerald-500'}`}>
                  {new Date(event.date).getFullYear()}
                </p>
              </div>

              {/* Details */}
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-1">
                  <h3 className="text-lg font-bold text-gray-900">{event.title}</h3>
                  {isPast && (
                    <span className="text-xs bg-amber-100 text-amber-700 font-medium px-2 py-0.5 rounded-full">
                      Stagione precedente
                    </span>
                  )}
                </div>
                {event.description && <p className="text-sm text-gray-500 line-clamp-2 mb-2">{event.description}</p>}
                <div className="flex flex-wrap gap-3 text-xs text-gray-500">
                  {event.location && (
                    <span className="flex items-center gap-1">
                      <MapPinIcon className="h-3.5 w-3.5" />
                      {event.location}
                    </span>
                  )}
                  {event.times && event.times.length > 0 && (
                    <span className="flex items-center gap-1">
                      🕒 {event.times.join(' · ')}
                    </span>
                  )}
                  <span className="flex items-center gap-1">
                    <TicketIcon className="h-3.5 w-3.5" />
                    {event.is_free ? 'Gratuito' : event.price > 0 ? `€${event.price}` : null}
                  </span>
                  <span>👶 {event.age_min}–{event.age_max} anni</span>
                </div>
              </div>

              {/* CTA */}
              {!isPast && event.booking_enabled ? (
                <button
                  onClick={() => router.push(`/eventi/${event.id}`)}
                  className="flex-shrink-0 bg-emerald-600 hover:bg-emerald-700 text-white font-semibold px-5 py-2.5 rounded-xl text-sm transition"
                >
                  Prenota →
                </button>
              ) : isPast ? (
                <button
                  onClick={() => router.push(`/eventi/${event.id}`)}
                  className="flex-shrink-0 text-xs text-amber-700 bg-amber-100 hover:bg-amber-200 px-4 py-2.5 rounded-xl font-medium transition"
                >
                  Dettagli →
                </button>
              ) : (
                <span className="flex-shrink-0 text-xs text-gray-400 bg-gray-100 px-4 py-2.5 rounded-xl">
                  Prenotazioni chiuse
                </span>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
