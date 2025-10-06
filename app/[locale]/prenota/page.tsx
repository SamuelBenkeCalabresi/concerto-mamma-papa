'use client';

import { useTranslations } from 'next-intl';
import { useEffect, useState } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import BookingForm from '@/components/BookingForm';
import EventDetailModal from '@/components/EventDetailModal';
import { getOpenEvents } from '@/lib/strapi';
import {
  CalendarDaysIcon,
  MusicalNoteIcon,
  UserGroupIcon,
  ClipboardDocumentListIcon,
  ArrowLeftIcon
} from '@heroicons/react/24/outline';

export default function PrenotaPage() {
  const t = useTranslations('Booking');
  const [selectedEvent, setSelectedEvent] = useState<any>(null);
  const [showEventModal, setShowEventModal] = useState(false);
  const [modalEvent, setModalEvent] = useState<any>(null);
  const [events, setEvents] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    async function fetchEvents() {
      try {
        setLoading(true);
        const data = await getOpenEvents();
        console.log('Events fetched in prenota:', data);
        setEvents(data.data || []);
      } catch (err) {
        console.error('Failed to fetch events:', err);
        setError('Error loading events. Please try again later.');
      } finally {
        setLoading(false);
      }
    }
    
    fetchEvents();
  }, []);

  const handleEventSelect = (event: any) => {
    setSelectedEvent(event);
  };

  const handleBackToEvents = () => {
    setSelectedEvent(null);
  };

  const handleEventClick = (event: any) => {
    setModalEvent(event);
    setShowEventModal(true);
  };

  const handleCloseModal = () => {
    setShowEventModal(false);
    setModalEvent(null);
  };
  
  return (
    <main className="min-h-screen bg-base-100">
      <Header />
      
      {/* Hero Section */}
      <section className="relative overflow-hidden">
        <div className="relative min-h-[60vh] bg-gradient-to-br from-emerald-900 via-teal-800 to-blue-900">
          <div className="absolute inset-0 bg-gradient-to-r from-black/40 via-black/20 to-black/40"></div>
          
          {/* Decorative Elements */}
          <div className="absolute inset-0 overflow-hidden px-4">
            <div className="absolute top-16 left-8 w-20 h-20 opacity-10">
              <ClipboardDocumentListIcon className="w-full h-full text-white animate-pulse" />
            </div>
            <div className="absolute top-32 right-16 w-16 h-16 opacity-20">
              <UserGroupIcon className="w-full h-full text-white animate-bounce" />
            </div>
            <div className="absolute bottom-20 left-12 w-24 h-24 opacity-15">
              <CalendarDaysIcon className="w-full h-full text-white" />
            </div>
            <div className="absolute top-40 left-1/4 ml-8 text-white/20 text-3xl animate-bounce">📅</div>
            <div className="absolute top-20 right-1/4 mr-8 text-white/20 text-4xl animate-pulse">👨‍👩‍👧‍👦</div>
            <div className="absolute bottom-32 right-1/3 mr-4 text-white/20 text-2xl animate-bounce">✍️</div>
          </div>

          <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
            <div className="text-center">
              <div className="inline-flex items-center bg-white/10 backdrop-blur-sm text-white rounded-full px-4 py-2 mb-6">
                <ClipboardDocumentListIcon className="w-5 h-5 mr-2" />
                <span className="text-sm font-medium">{t('form.bookingForm')}</span>
              </div>
              
              <h1 className="text-4xl lg:text-6xl font-bold text-white leading-tight mb-6">
                <span className="block">{t('title')}</span>
                <span className="block text-emerald-300">{t('subtitle').split(' ').slice(-2).join(' ')}</span>
              </h1>
              
              <div className="max-w-4xl mx-auto text-white/90 space-y-4 mb-8">
                <p className="text-lg leading-relaxed">
                  {t('warning')}
                </p>
                <p className="text-base text-white/80">
                  {t('requiredNote')}
                </p>
              </div>

              {/* Features */}
              <div className="grid grid-cols-3 gap-6 text-center max-w-md mx-auto">
                <div className="flex flex-col items-center">
                  <div className="bg-white/10 backdrop-blur-sm p-3 rounded-xl mb-2">
                    <CalendarDaysIcon className="h-6 w-6 text-white" />
                  </div>
                  <span className="text-xs font-medium text-white">{t('features.chooseDate')}</span>
                </div>
                <div className="flex flex-col items-center">
                  <div className="bg-white/10 backdrop-blur-sm p-3 rounded-xl mb-2">
                    <UserGroupIcon className="h-6 w-6 text-white" />
                  </div>
                  <span className="text-xs font-medium text-white">{t('features.addFamily')}</span>
                </div>
                <div className="flex flex-col items-center">
                  <div className="bg-white/10 backdrop-blur-sm p-3 rounded-xl mb-2">
                    <MusicalNoteIcon className="h-6 w-6 text-white" />
                  </div>
                  <span className="text-xs font-medium text-white">{t('features.enjoyConcert')}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Bottom Wave */}
          <div className="absolute bottom-0 left-0 w-full overflow-hidden leading-none">
            <svg className="relative block w-full h-20" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 120" preserveAspectRatio="none">
              <path d="M985.66,92.83C906.67,72,823.78,31,743.84,14.19c-82.26-17.34-168.06-16.33-250.45.39-57.84,11.73-114,31.07-172,41.86A600.21,600.21,0,0,1,0,27.35V120H1200V95.8C1132.19,118.92,1055.71,111.31,985.66,92.83Z" className="fill-base-100"></path>
            </svg>
          </div>
        </div>
      </section>

      {/* Events List or Booking Form Section */}
      <section className="py-16 bg-base-100">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          {selectedEvent ? (
            // Show Booking Form for selected event
            <div className="max-w-4xl mx-auto">
              <button 
                onClick={handleBackToEvents}
                className="flex items-center text-emerald-600 hover:text-emerald-700 mb-6 font-medium transition-colors"
              >
                <ArrowLeftIcon className="w-4 h-4 mr-2" />
                {t('eventsSection.backToEvents')}
              </button>
              <div className="bg-emerald-50 border border-emerald-200 rounded-lg p-6 mb-8">
                <h2 className="text-2xl font-bold text-emerald-800 mb-2">
                  {selectedEvent.Title || 'Event'}
                </h2>
                <div className="flex items-center text-emerald-700">
                  <CalendarDaysIcon className="w-5 h-5 mr-2" />
                  <span>
                    {new Date(selectedEvent.createdAt).toLocaleDateString()}
                  </span>
                </div>
              </div>
              <BookingForm preSelectedEvent={selectedEvent} />
            </div>
          ) : (
            // Show Events List
            <>
              <div className="text-center mb-12">
                <h2 className="text-3xl font-bold text-gray-900 mb-4">
                  {t('eventsSection.selectTitle')}
                </h2>
                <p className="text-lg text-gray-600">
                  {t('eventsSection.selectDescription')}
                </p>
              </div>

              {loading && (
                <div className="text-center py-12">
                  <div className="flex justify-center mb-4">
                    <svg className="animate-spin h-8 w-8 text-emerald-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                  </div>
                  <p className="text-gray-600">{t('eventsSection.loading')}</p>
                </div>
              )}

              {error && (
                <div className="text-center py-12">
                  <p className="text-xl text-red-600">{error}</p>
                </div>
              )}

              {!loading && !error && events.length === 0 && (
                <div className="text-center py-12">
                  <p className="text-xl text-gray-500">
                    {t('eventsSection.noEvents')}
                  </p>
                </div>
              )}

              {!loading && !error && events.length > 0 && (
                <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                  {events.map((event: any) => {
                    const getDescriptionText = (description: any) => {
                      if (Array.isArray(description)) {
                        return description.map(block => 
                          block.children?.map((child: any) => child.text).join('') || ''
                        ).join(' ');
                      }
                      return description || 'No description available';
                    };

                    return (
                      <div
                        key={event.id}
                        className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-all duration-300 hover:scale-105 border border-gray-200 cursor-pointer group"
                        onClick={() => handleEventClick(event)}
                      >
                        <div className="p-6">
                          <h3 className="text-xl font-semibold text-gray-900 mb-2 group-hover:text-emerald-600 transition-colors">
                            {event.Title || 'Untitled Event'}
                          </h3>
                          <p className="text-gray-600 mb-4 line-clamp-3">
                            {getDescriptionText(event.Description)}
                          </p>
                          <div className="space-y-2 mb-4">
                            <div className="flex items-center text-sm text-gray-500">
                              <CalendarDaysIcon className="w-4 h-4 mr-2 text-emerald-600" />
                              <span>{event.date ? new Date(event.date).toLocaleDateString('it-IT') : 'Data da definire'}</span>
                            </div>
                          </div>
                          <div className="text-center">
                            <span className="text-emerald-600 text-sm font-medium group-hover:text-emerald-700">
                              Clicca per vedere i dettagli →
                            </span>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </>
          )}
        </div>
      </section>

      {/* Event Detail Modal */}
      <EventDetailModal
        event={modalEvent}
        isOpen={showEventModal}
        onClose={handleCloseModal}
      />

      <Footer />
    </main>
  );
}