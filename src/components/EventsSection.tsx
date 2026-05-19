'use client';

import { useState, useEffect } from 'react';
import { MusicalNoteIcon, MapPinIcon, TicketIcon } from '@heroicons/react/24/outline';
import { useRouter } from '@/i18n/routing';
import type { Event } from '@/lib/supabase';

export default function EventsSection() {
  const [events, setEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    fetch('/api/events')
      .then(r => r.json())
      .then(json => { setEvents((json.data ?? []).slice(0, 3)); setLoading(false); })
      .catch(() => setLoading(false));
  }, []);

  if (loading) {
    return (
      <section className="py-16 bg-base-200">
        <div className="flex justify-center">
          <div className="w-8 h-8 border-4 border-emerald-500 border-t-transparent rounded-full animate-spin" />
        </div>
      </section>
    );
  }

  if (events.length === 0) {
    return (
      <section className="py-16 bg-base-200">
        <div className="max-w-3xl mx-auto px-4 text-center">
          <MusicalNoteIcon className="h-12 w-12 text-emerald-300 mx-auto mb-4" />
          <h2 className="text-3xl font-bold text-neutral mb-2">Prossime Attività Musicali</h2>
          <p className="text-neutral/60">Nessun evento in programma al momento. Torna presto!</p>
        </div>
      </section>
    );
  }

  return (
    <section className="py-16 bg-base-200">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-10">
          <div className="inline-flex items-center justify-center bg-emerald-100 p-4 rounded-2xl mb-4">
            <MusicalNoteIcon className="h-10 w-10 text-emerald-600" />
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold text-neutral">Prossime Attività Musicali</h2>
          <p className="text-neutral/60 mt-2">I prossimi concerti per famiglie</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {events.map((event) => (
            <div key={event.id} className="bg-white rounded-2xl shadow border border-gray-100 overflow-hidden flex flex-col">
              {/* Date strip */}
              <div className="bg-gradient-to-r from-emerald-600 to-teal-600 px-5 py-3 flex items-center justify-between">
                <span className="text-white font-bold">
                  {new Date(event.date).toLocaleDateString('it-IT', { weekday: 'long', day: 'numeric', month: 'long' })}
                </span>
                <span className="text-emerald-100 text-sm">
                  {event.is_free ? 'Gratuito' : event.price > 0 ? `€${event.price}` : null}
                </span>
              </div>

              <div className="p-5 flex-1 flex flex-col">
                <h3 className="text-lg font-bold text-gray-900 mb-2">{event.title}</h3>
                {event.description && (
                  <p className="text-sm text-gray-500 line-clamp-3 mb-3 flex-1">{event.description}</p>
                )}

                <div className="flex flex-wrap gap-2 text-xs text-gray-500 mb-4">
                  {event.location && (
                    <span className="flex items-center gap-1 bg-gray-50 px-2 py-1 rounded-lg">
                      <MapPinIcon className="h-3.5 w-3.5" />{event.location}
                    </span>
                  )}
                  {event.times && event.times.length > 0 && (
                    <span className="flex items-center gap-1 bg-gray-50 px-2 py-1 rounded-lg">
                      🕒 {event.times[0]}{event.times.length > 1 ? ` +${event.times.length - 1}` : ''}
                    </span>
                  )}
                  <span className="flex items-center gap-1 bg-gray-50 px-2 py-1 rounded-lg">
                    <TicketIcon className="h-3.5 w-3.5" />{event.available_seats} posti
                  </span>
                </div>

                {event.booking_enabled ? (
                  <button
                    onClick={() => router.push(`/eventi/${event.id}`)}
                    className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-semibold py-2.5 rounded-xl text-sm transition"
                  >
                    Prenota ora →
                  </button>
                ) : (
                  <div className="w-full text-center text-xs text-gray-400 bg-gray-100 py-2.5 rounded-xl">
                    Prenotazioni chiuse
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>

        {events.length > 0 && (
          <div className="text-center mt-8">
            <button
              onClick={() => router.push('/eventi')}
              className="text-emerald-600 hover:text-emerald-700 font-semibold text-sm underline underline-offset-4"
            >
              Vedi tutti gli eventi →
            </button>
          </div>
        )}
      </div>
    </section>
  );
}
