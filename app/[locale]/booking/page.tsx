import { getTranslations } from 'next-intl/server';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import BookingForm from '@/components/BookingForm';
import {
  CalendarDaysIcon,
  ClockIcon,
  MapPinIcon,
  UserGroupIcon
} from '@heroicons/react/24/outline';

export default async function BookingPage({ searchParams }: any) {
  const t = await getTranslations();

  // Extract event details from URL params
  const eventId = searchParams.eventId;
  const eventTitle = searchParams.eventTitle || '';
  const eventDate = searchParams.eventDate || '';
  const eventLocation = searchParams.eventLocation || '';
  const eventTimes = searchParams.eventTimes ? JSON.parse(searchParams.eventTimes) : [];
  const timesSoldOut = searchParams.timesSoldOut ? JSON.parse(searchParams.timesSoldOut) : [];
  const isWaitlist = searchParams.waitlist === 'true';
  const isSoldOut = searchParams.soldOut === 'true';

  return (
    <main className="min-h-screen bg-base-200">
      <Header />

      <div className="py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold text-neutral mb-4">
              {isWaitlist ? 'Lista d\'Attesa' : t('Booking.title')}
            </h1>
            <p className="text-lg text-neutral/70">
              {isWaitlist
                ? 'Iscriviti alla lista d\'attesa per questo evento esaurito. Ti contatteremo se si liberano posti.'
                : 'Compila il modulo sottostante per prenotare i tuoi posti al concerto'}
            </p>
          </div>

          {/* Event Recap Section */}
          {eventId && eventTitle && (
            <div className="bg-gradient-to-br from-emerald-50 to-blue-50 border-2 border-emerald-200 rounded-xl p-6 mb-8 shadow-md">
              <div className="flex items-center mb-4">
                <div className="bg-emerald-600 rounded-full p-2 mr-3">
                  <CalendarDaysIcon className="w-6 h-6 text-white" />
                </div>
                <h2 className="text-2xl font-bold text-emerald-900">
                  {decodeURIComponent(eventTitle)}
                </h2>
              </div>

              <div className="grid md:grid-cols-2 gap-4 mt-4">
                {eventDate && (
                  <div className="flex items-center text-gray-700">
                    <CalendarDaysIcon className="w-5 h-5 mr-3 text-emerald-600 flex-shrink-0" />
                    <div>
                      <span className="font-semibold text-sm text-gray-500 block">Data</span>
                      <span className="text-base">
                        {new Date(decodeURIComponent(eventDate)).toLocaleDateString('it-IT', {
                          weekday: 'long',
                          year: 'numeric',
                          month: 'long',
                          day: 'numeric'
                        })}
                      </span>
                    </div>
                  </div>
                )}

                {eventTimes && eventTimes.length > 0 && (
                  <div className="flex items-start text-gray-700">
                    <ClockIcon className="w-5 h-5 mr-3 text-emerald-600 flex-shrink-0 mt-0.5" />
                    <div>
                      <span className="font-semibold text-sm text-gray-500 block">Orari disponibili</span>
                      <div className="flex flex-wrap gap-2 mt-1">
                        {eventTimes.map((time: string, index: number) => (
                          <span key={index} className="inline-block bg-emerald-100 text-emerald-800 px-2 py-1 rounded text-sm font-medium">
                            {time}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                )}

                {eventLocation && (
                  <div className="flex items-center text-gray-700 md:col-span-2">
                    <MapPinIcon className="w-5 h-5 mr-3 text-emerald-600 flex-shrink-0" />
                    <div>
                      <span className="font-semibold text-sm text-gray-500 block">Luogo</span>
                      <span className="text-base">{decodeURIComponent(eventLocation)}</span>
                    </div>
                  </div>
                )}
              </div>

              <div className="mt-4 pt-4 border-t border-emerald-200">
                <p className="text-sm text-emerald-800 flex items-center">
                  <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                  </svg>
                  Stai prenotando per questo evento. Completa il modulo qui sotto.
                </p>
              </div>
            </div>
          )}

          <BookingForm
            preselectedEventId={eventId}
            availableTimes={eventTimes}
            timesSoldOut={timesSoldOut}
            isWaitlist={isWaitlist}
          />
        </div>
      </div>

      <Footer />
    </main>
  );
}