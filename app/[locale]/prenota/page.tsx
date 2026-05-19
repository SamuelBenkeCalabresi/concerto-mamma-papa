'use client';

import { useState, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import { useRouter } from '@/i18n/routing';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import SupabaseBookingForm from '@/components/SupabaseBookingForm';
import { MusicalNoteIcon, MapPinIcon, TicketIcon } from '@heroicons/react/24/outline';
import type { Event } from '@/lib/supabase';

export default function PrenotaPage() {
  const searchParams = useSearchParams();
  const eventId = searchParams.get('event');
  const [event, setEvent] = useState<Event | null>(null);
  const [loading, setLoading] = useState(!!eventId);

  useEffect(() => {
    if (!eventId) return;
    fetch('/api/events')
      .then(r => r.json())
      .then(json => {
        const found = (json.data ?? []).find((e: Event) => e.id === eventId);
        setEvent(found ?? null);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, [eventId]);

  return (
    <main className="min-h-screen bg-base-200">
      <Header />

      <section className="bg-gradient-to-br from-emerald-900 via-teal-800 to-blue-900 py-16 text-center px-4">
        <div className="inline-flex items-center justify-center bg-white/10 p-4 rounded-2xl mb-4">
          <MusicalNoteIcon className="h-12 w-12 text-emerald-300" />
        </div>
        <h1 className="text-3xl sm:text-4xl font-bold text-white mb-2">
          Prenota la tua attività musicale
        </h1>
        {event && (
          <p className="text-white/70 text-lg mt-2">{event.title}</p>
        )}
      </section>

      <section className="max-w-2xl mx-auto px-4 py-10">
        {loading ? (
          <div className="flex justify-center py-20">
            <div className="w-10 h-10 border-4 border-emerald-600 border-t-transparent rounded-full animate-spin" />
          </div>
        ) : event ? (
          <SupabaseBookingForm
            event={event}
            disabled={new Date(event.date) < new Date(new Date().toDateString())}
          />
        ) : (
          <EventPicker />
        )}
      </section>

      <Footer />
    </main>
  );
}

function EventPicker() {
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
        <div className="w-10 h-10 border-4 border-emerald-600 border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  if (events.length === 0) {
    return (
      <div className="text-center py-16 text-gray-500">
        <MusicalNoteIcon className="h-12 w-12 mx-auto mb-3 opacity-30" />
        <p className="font-semibold text-lg">Nessun evento in programma al momento.</p>
        <p className="text-sm mt-1">Torna presto per scoprire i prossimi concerti!</p>
      </div>
    );
  }

  const futureEvents = events.filter(e => new Date(e.date) >= new Date(new Date().toDateString()));
  const pastEvents = events.filter(e => new Date(e.date) < new Date(new Date().toDateString()));

  return (
    <div className="space-y-4">
      {futureEvents.length > 0 && (
        <>
          <p className="text-gray-500 text-sm text-center mb-2">Seleziona l'evento per cui vuoi prenotare:</p>
          {futureEvents.map(event => (
            <div key={event.id} className="bg-white rounded-2xl shadow border border-gray-100 overflow-hidden">
              <div className="bg-gradient-to-r from-emerald-600 to-teal-600 px-5 py-2.5 flex items-center justify-between">
                <span className="text-white font-semibold text-sm">
                  {new Date(event.date).toLocaleDateString('it-IT', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' })}
                </span>
                <span className="text-emerald-100 text-sm">
                  {event.is_free ? 'Gratuito' : event.price > 0 ? `€${event.price}` : null}
                </span>
              </div>
              <div className="p-5 flex items-center gap-4">
                <div className="flex-1 min-w-0">
                  <h3 className="font-bold text-gray-900 text-lg">{event.title}</h3>
                  <div className="flex flex-wrap gap-3 mt-1.5 text-xs text-gray-500">
                    {event.location && (
                      <span className="flex items-center gap-1">
                        <MapPinIcon className="h-3.5 w-3.5" />{event.location}
                      </span>
                    )}
                    {event.times && event.times.length > 0 && (
                      <span>🕒 {event.times.join(' · ')}</span>
                    )}
                  </div>
                </div>
                <button
                  onClick={() => router.push(`/prenota?event=${event.id}`)}
                  className="flex-shrink-0 bg-emerald-600 hover:bg-emerald-700 text-white font-semibold px-5 py-2.5 rounded-xl text-sm transition"
                >
                  Prenota →
                </button>
              </div>
            </div>
          ))}
        </>
      )}

      {futureEvents.length === 0 && (
        <div className="text-center py-8 text-gray-500">
          <MusicalNoteIcon className="h-12 w-12 mx-auto mb-3 opacity-30" />
          <p className="font-semibold text-lg">Nessun evento in programma al momento.</p>
          <p className="text-sm mt-1">Torna presto per scoprire i prossimi concerti!</p>
        </div>
      )}

      {pastEvents.length > 0 && (
        <div className="mt-8">
          <p className="text-xs font-semibold text-amber-600 uppercase tracking-wide text-center mb-3">Stagione precedente</p>
          <div className="space-y-3">
            {pastEvents.map(event => (
              <div key={event.id} className="bg-amber-50 rounded-2xl border border-amber-100 overflow-hidden opacity-70">
                <div className="bg-gradient-to-r from-amber-500 to-orange-400 px-5 py-2 flex items-center justify-between">
                  <span className="text-white font-semibold text-sm">
                    {new Date(event.date).toLocaleDateString('it-IT', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' })}
                  </span>
                  <span className="text-amber-100 text-xs font-medium">Scaduto</span>
                </div>
                <div className="p-5 flex items-center gap-4">
                  <div className="flex-1 min-w-0">
                    <h3 className="font-bold text-gray-700 text-base">{event.title}</h3>
                    {event.location && (
                      <p className="text-xs text-gray-400 mt-1 flex items-center gap-1">
                        <MapPinIcon className="h-3 w-3" />{event.location}
                      </p>
                    )}
                  </div>
                  <button
                    onClick={() => router.push(`/eventi/${event.id}`)}
                    className="flex-shrink-0 text-xs text-amber-700 bg-amber-100 hover:bg-amber-200 px-4 py-2 rounded-xl font-medium transition"
                  >
                    Dettagli →
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
