'use client';

import { MapPinIcon, CalendarDaysIcon, TicketIcon, UserGroupIcon } from '@heroicons/react/24/outline';
import type { Event } from '@/lib/supabase';
import SupabaseBookingForm from '@/components/SupabaseBookingForm';

export default function EventDetailClient({ event }: { event: Event }) {
  const isPast = new Date(event.date) < new Date(new Date().toDateString());

  return (
    <>
      {/* Event hero */}
      <section className="bg-gradient-to-br from-emerald-900 via-teal-800 to-blue-900 py-16 px-4">
        <div className="max-w-3xl mx-auto text-center">
          <div className="inline-block bg-emerald-500/20 text-emerald-200 text-sm font-medium px-4 py-1.5 rounded-full mb-4">
            {new Date(event.date).toLocaleDateString('it-IT', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' })}
          </div>
          <h1 className="text-3xl sm:text-4xl font-bold text-white mb-4">{event.title}</h1>
          {event.description && <p className="text-white/80 text-lg leading-relaxed">{event.description}</p>}
        </div>
      </section>

      <section className="max-w-3xl mx-auto px-4 py-10">
        {/* Info card */}
        <div className="bg-white rounded-2xl shadow border border-gray-100 p-6 mb-8">
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-center">
            {event.location && (
              <div className="flex flex-col items-center gap-1">
                <MapPinIcon className="h-6 w-6 text-emerald-500" />
                <p className="text-xs text-gray-500">Luogo</p>
                <p className="text-sm font-semibold text-gray-800">{event.location}</p>
              </div>
            )}
            {event.times && event.times.length > 0 && (
              <div className="flex flex-col items-center gap-1">
                <span className="text-xl">🕒</span>
                <p className="text-xs text-gray-500">Orari</p>
                <p className="text-sm font-semibold text-gray-800">{event.times.join(' · ')}</p>
              </div>
            )}
            {(event.is_free || event.price > 0) && (
              <div className="flex flex-col items-center gap-1">
                <TicketIcon className="h-6 w-6 text-emerald-500" />
                <p className="text-xs text-gray-500">Costo</p>
                <p className="text-sm font-semibold text-gray-800">
                  {event.is_free ? 'Gratuito' : `€${event.price}`}
                </p>
              </div>
            )}
            <div className="flex flex-col items-center gap-1">
              <UserGroupIcon className="h-6 w-6 text-emerald-500" />
              <p className="text-xs text-gray-500">Età</p>
              <p className="text-sm font-semibold text-gray-800">{event.age_min}–{event.age_max} anni</p>
            </div>
          </div>
        </div>

        {/* Booking form / state */}
        {event.booking_url && !isPast ? (
          <div className="text-center py-8">
            <p className="text-gray-600 mb-4">Le prenotazioni per questo evento si effettuano tramite link esterno.</p>
            <a
              href={event.booking_url}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block bg-emerald-600 hover:bg-emerald-700 text-white font-bold px-8 py-4 rounded-xl transition text-lg"
            >
              Prenota qui →
            </a>
          </div>
        ) : !event.booking_enabled && !isPast ? (
          <div className="text-center py-8 text-gray-500 bg-gray-100 rounded-2xl">
            <p className="font-semibold">Prenotazioni chiuse per questo evento.</p>
          </div>
        ) : (
          <SupabaseBookingForm event={event} disabled={isPast} />
        )}
      </section>
    </>
  );
}
