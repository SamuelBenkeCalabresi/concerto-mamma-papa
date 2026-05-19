'use client';

import { useState, useEffect } from 'react';
import { useRouter } from '@/i18n/routing';
import { MapPinIcon, TicketIcon, CalendarDaysIcon } from '@heroicons/react/24/outline';
import type { Event } from '@/lib/supabase';

export default function EventsList() {
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
      <div className="flex justify-center py-20">
        <div className="w-10 h-10 border-4 border-emerald-500 border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  if (events.length === 0) {
    return (
      <div className="text-center py-20">
        <CalendarDaysIcon className="h-16 w-16 text-gray-300 mx-auto mb-4" />
        <h2 className="text-xl font-semibold text-gray-600">Nessun evento in programma</h2>
        <p className="text-gray-400 mt-2">Torna presto per scoprire i prossimi concerti!</p>
      </div>
    );
  }

  return (
    <div className="space-y-5">
      {events.map((event) => (
        <div key={event.id} className="bg-white rounded-2xl shadow border border-gray-100 overflow-hidden">
          <div className="bg-gradient-to-r from-emerald-600 to-teal-600 px-6 py-3 flex items-center justify-between">
            <span className="text-white font-bold">
              {new Date(event.date).toLocaleDateString('it-IT', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' })}
            </span>
            <span className="text-emerald-100 text-sm font-medium">
              {event.is_free ? 'Gratuito' : event.price > 0 ? `€${event.price}` : null}
            </span>
          </div>

          <div className="p-6 flex flex-col sm:flex-row sm:items-center gap-4">
            <div className="flex-1">
              <h3 className="text-xl font-bold text-gray-900 mb-2">{event.title}</h3>
              {event.description && <p className="text-gray-500 text-sm mb-3 line-clamp-2">{event.description}</p>}
              <div className="flex flex-wrap gap-3 text-sm text-gray-500">
                {event.location && (
                  <span className="flex items-center gap-1.5">
                    <MapPinIcon className="h-4 w-4 text-emerald-500" />{event.location}
                  </span>
                )}
                {event.times && event.times.length > 0 && (
                  <span className="flex items-center gap-1.5">
                    🕒 {event.times.join(' · ')}
                  </span>
                )}
                <span className="flex items-center gap-1.5">
                  <TicketIcon className="h-4 w-4 text-emerald-500" />{event.available_seats} posti disponibili
                </span>
                <span>👶 {event.age_min}–{event.age_max} anni</span>
              </div>
            </div>

            {event.booking_enabled ? (
              <button
                onClick={() => router.push(`/eventi/${event.id}`)}
                className="flex-shrink-0 bg-emerald-600 hover:bg-emerald-700 text-white font-bold px-6 py-3 rounded-xl transition text-sm"
              >
                Prenota →
              </button>
            ) : (
              <span className="flex-shrink-0 text-sm text-gray-400 bg-gray-100 px-5 py-3 rounded-xl">
                Prenotazioni chiuse
              </span>
            )}
          </div>
        </div>
      ))}
    </div>
  );
}
