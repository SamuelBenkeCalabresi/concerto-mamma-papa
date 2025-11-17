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

  // Check if event has expired
  const isExpired = eventDate && new Date(eventDate).toISOString().split('T')[0] < new Date().toISOString().split('T')[0];

  return (
    <main className="min-h-screen bg-base-200">
      <Header />

      <div className="py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Warning banner for expired events */}
          {isExpired && (
            <div className="mb-8 bg-gray-100 border-2 border-gray-400 rounded-xl p-6 shadow-lg">
              <div className="flex items-start">
                <div className="flex-shrink-0">
                  <div className="bg-gray-600 rounded-full p-2">
                    <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                    </svg>
                  </div>
                </div>
                <div className="ml-4 flex-1">
                  <h3 className="text-lg font-bold text-gray-800 mb-2 flex items-center">
                    <span className="bg-gray-600 text-white px-3 py-1 rounded-full text-sm font-bold mr-3">SCADUTO</span>
                    Evento Già Passato
                  </h3>
                  <p className="text-gray-700">
                    Questo evento si è già svolto e non è più possibile effettuare nuove prenotazioni.
                    Puoi comunque visualizzare le informazioni dell'evento qui sotto.
                  </p>
                </div>
              </div>
            </div>
          )}

          <div className="text-center mb-8">
            <h1 className={`text-4xl font-bold mb-4 ${isExpired ? 'text-gray-700' : 'text-neutral'}`}>
              {isExpired ? 'Evento Passato' : isWaitlist ? 'Lista d\'Attesa' : t('Booking.title')}
            </h1>
            <p className={`text-lg ${isExpired ? 'text-gray-600' : 'text-neutral/70'}`}>
              {isExpired
                ? 'Visualizza le informazioni di questo evento già svolto'
                : isWaitlist
                ? 'Iscriviti alla lista d\'attesa per questo evento esaurito. Ti contatteremo se si liberano posti.'
                : 'Compila il modulo sottostante per prenotare i tuoi posti al concerto'}
            </p>
          </div>

          {/* Event Recap Section */}
          {eventId && eventTitle && (
            <div className={`bg-gradient-to-br rounded-xl p-6 mb-8 shadow-md border-2 ${
              isExpired
                ? 'from-gray-50 to-gray-100 border-gray-400 opacity-90'
                : 'from-emerald-50 to-blue-50 border-emerald-200'
            }`}>
              <div className="flex items-center mb-4">
                <div className={`rounded-full p-2 mr-3 ${isExpired ? 'bg-gray-600' : 'bg-emerald-600'}`}>
                  <CalendarDaysIcon className="w-6 h-6 text-white" />
                </div>
                <h2 className={`text-2xl font-bold ${isExpired ? 'text-gray-800' : 'text-emerald-900'}`}>
                  {decodeURIComponent(eventTitle)}
                </h2>
              </div>

              <div className="grid md:grid-cols-2 gap-4 mt-4">
                {eventDate && (
                  <div className="flex items-center text-gray-700">
                    <CalendarDaysIcon className={`w-5 h-5 mr-3 flex-shrink-0 ${isExpired ? 'text-gray-500' : 'text-emerald-600'}`} />
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
                    <ClockIcon className={`w-5 h-5 mr-3 flex-shrink-0 mt-0.5 ${isExpired ? 'text-gray-500' : 'text-emerald-600'}`} />
                    <div>
                      <span className="font-semibold text-sm text-gray-500 block">Orari{isExpired ? '' : ' disponibili'}</span>
                      <div className="flex flex-wrap gap-2 mt-1">
                        {eventTimes.map((time: string, index: number) => (
                          <span key={index} className={`inline-block px-2 py-1 rounded text-sm font-medium ${
                            isExpired
                              ? 'bg-gray-100 text-gray-600'
                              : 'bg-emerald-100 text-emerald-800'
                          }`}>
                            {time}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                )}

                {eventLocation && (
                  <div className="flex items-center text-gray-700 md:col-span-2">
                    <MapPinIcon className={`w-5 h-5 mr-3 flex-shrink-0 ${isExpired ? 'text-gray-500' : 'text-emerald-600'}`} />
                    <div>
                      <span className="font-semibold text-sm text-gray-500 block">Luogo</span>
                      <span className="text-base">{decodeURIComponent(eventLocation)}</span>
                    </div>
                  </div>
                )}
              </div>

              {!isExpired && (
                <div className="mt-4 pt-4 border-t border-emerald-200">
                  <p className="text-sm text-emerald-800 flex items-center">
                    <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                    </svg>
                    Stai prenotando per questo evento. Completa il modulo qui sotto.
                  </p>
                </div>
              )}
            </div>
          )}

          <BookingForm
            preselectedEventId={eventId}
            availableTimes={eventTimes}
            timesSoldOut={timesSoldOut}
            isWaitlist={isWaitlist}
            isExpired={isExpired}
          />
        </div>
      </div>

      <Footer />
    </main>
  );
}