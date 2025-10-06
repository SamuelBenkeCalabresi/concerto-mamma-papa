'use client';

import React from 'react';
import { useTranslations } from 'next-intl';
import StrapiBlocksRenderer from './StrapiBlocksRenderer';
// import EventMap from './EventMap'; // Temporarily disabled
import {
  XMarkIcon,
  CalendarDaysIcon,
  ClockIcon,
  MapPinIcon,
  // TicketIcon, // Temporarily disabled
  UserGroupIcon,
  DocumentTextIcon,
  LinkIcon,
  ExclamationTriangleIcon
} from '@heroicons/react/24/outline';

interface EventDetailModalProps {
  event: any;
  isOpen: boolean;
  onClose: () => void;
}

const EventDetailModal: React.FC<EventDetailModalProps> = ({ event, isOpen, onClose }) => {
  const t = useTranslations('EventModal');

  // Disable/enable body scroll
  React.useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  const renderDescription = (description: any) => {
    if (Array.isArray(description)) {
      return <StrapiBlocksRenderer content={description} />;
    }
    if (typeof description === 'string') {
      return <p>{description}</p>;
    }
    return <p>{t('noDescription')}</p>;
  };

  const handleBackdropClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  if (!isOpen || !event) return null;

  // Check if event is sold out (global or all times sold out)
  const isSoldOut = event.soldOut || (event.times && event.timesSoldOut && event.times.length > 0 && event.times.every((time: string) => event.timesSoldOut?.includes(time)));
  const hasSoldOutTimes = event.timesSoldOut && event.timesSoldOut.length > 0;

  const handleLocandinaView = () => {
    if (event.locandina?.url) {
      // Ensure we use the correct Strapi URL
      const strapiUrl = process.env.NEXT_PUBLIC_STRAPI_API_URL || 'http://localhost:1337';
      const fileUrl = event.locandina.url.startsWith('http')
        ? event.locandina.url
        : `${strapiUrl}${event.locandina.url}`;
      window.open(fileUrl, '_blank');
    }
  };

  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-30 flex items-center justify-center z-50 p-0 md:p-4"
      onClick={handleBackdropClick}
    >
      <div className="bg-white w-full h-full md:w-auto md:h-auto md:rounded-2xl shadow-2xl md:max-w-4xl md:max-h-[95vh] overflow-y-auto flex flex-col modal-enter">
        {/* Modal Header */}
        <div className="bg-gradient-to-r from-emerald-600 to-blue-600 text-white p-6 md:rounded-t-2xl flex-shrink-0">
          <div className="flex justify-between items-start">
            <div className="flex-1 pr-4">
              <h2 className="text-xl md:text-2xl font-bold mb-2">
                {event.Title || 'Evento Senza Titolo'}
              </h2>
              <p className="text-emerald-100 text-sm md:text-base">
                Tutti i dettagli dell'evento
              </p>
            </div>
            <button
              onClick={onClose}
              className="text-white hover:text-gray-200 transition-colors p-2 rounded-full hover:bg-white/10 flex-shrink-0"
            >
              <XMarkIcon className="w-6 h-6" />
            </button>
          </div>
        </div>

        {/* Modal Content */}
        <div className="p-4 md:p-6 flex-1 overflow-y-auto">
          {/* SoldOut Warning */}
          {(isSoldOut || hasSoldOutTimes) && (
            <div className={`mb-6 p-4 rounded-lg border-2 ${isSoldOut ? 'bg-red-50 border-red-300' : 'bg-yellow-50 border-yellow-300'}`}>
              <div className="flex items-start">
                <ExclamationTriangleIcon className={`w-6 h-6 mr-3 flex-shrink-0 ${isSoldOut ? 'text-red-600' : 'text-yellow-600'}`} />
                <div>
                  {isSoldOut ? (
                    <>
                      <h4 className="font-bold text-red-900 mb-1">Evento Esaurito</h4>
                      <p className="text-red-800 text-sm">Tutti i posti per questo evento sono esauriti. Puoi iscriverti alla lista d'attesa.</p>
                    </>
                  ) : (
                    <>
                      <h4 className="font-bold text-yellow-900 mb-1">Alcuni Orari Esauriti</h4>
                      <p className="text-yellow-800 text-sm">Alcuni orari per questo evento sono esauriti. Seleziona un orario disponibile.</p>
                    </>
                  )}
                </div>
              </div>
            </div>
          )}

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Left Column - Event Details */}
            <div className="space-y-6">
              {/* Basic Info */}
              <div className="bg-gradient-to-br from-emerald-50 to-blue-50 rounded-xl p-6 border border-emerald-200">
                <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center">
                  <CalendarDaysIcon className="w-5 h-5 mr-2 text-emerald-600" />
                  Informazioni Evento
                </h3>

                <div className="space-y-3">
                  <div className="flex items-center text-gray-700">
                    <CalendarDaysIcon className="w-5 h-5 mr-3 text-emerald-600 flex-shrink-0" />
                    <span className="font-medium">Data:</span>
                    <span className="ml-2">{event.date ? new Date(event.date).toLocaleDateString('it-IT', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' }) : 'Data da definire'}</span>
                  </div>

                  {(event.times && event.times.length > 0) && (
                    <div className="flex items-start text-gray-700">
                      <ClockIcon className="w-5 h-5 mr-3 text-emerald-600 flex-shrink-0 mt-0.5" />
                      <div>
                        <span className="font-medium">Orari disponibili:</span>
                        <div className="ml-2 flex flex-wrap gap-2 mt-1">
                          {event.times.map((time: string, index: number) => {
                            const isTimeSoldOut = event.timesSoldOut?.includes(time);
                            return (
                              <span
                                key={index}
                                className={`inline-block px-3 py-1 rounded-full text-sm font-medium ${
                                  isTimeSoldOut
                                    ? 'bg-red-100 text-red-800 line-through opacity-60'
                                    : 'bg-emerald-100 text-emerald-800'
                                }`}
                              >
                                {time} {isTimeSoldOut && '(Esaurito)'}
                              </span>
                            );
                          })}
                        </div>
                      </div>
                    </div>
                  )}

                  {event.duration && (
                    <div className="flex items-center text-gray-700">
                      <ClockIcon className="w-5 h-5 mr-3 text-emerald-600 flex-shrink-0" />
                      <span className="font-medium">Durata:</span>
                      <span className="ml-2">{event.duration} minuti</span>
                    </div>
                  )}

                  {(event.ageMin !== undefined && event.ageMax !== undefined) && (
                    <div className="flex items-center text-gray-700">
                      <UserGroupIcon className="w-5 h-5 mr-3 text-emerald-600 flex-shrink-0" />
                      <span className="font-medium">{t('recommendedAge')}</span>
                      <span className="ml-2">{event.ageMin}-{event.ageMax} {t('years')}</span>
                    </div>
                  )}

                  {/* Price preview temporarily disabled */}

                  {/* Available seats temporarily disabled */}
                  {/* {event.availableSeats && (
                    <div className="flex items-center text-gray-700">
                      <TicketIcon className="w-5 h-5 mr-3 text-emerald-600 flex-shrink-0" />
                      <span className="font-medium">Posti disponibili:</span>
                      <span className="ml-2">{event.availableSeats}</span>
                    </div>
                  )} */}
                </div>
              </div>

              {/* Description */}
              {event.Description && (
                <div className="bg-gray-50 rounded-xl p-6">
                  <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center">
                    <DocumentTextIcon className="w-5 h-5 mr-2 text-emerald-600" />
                    {t('description')}
                  </h3>
                  <div className="text-gray-700 leading-relaxed prose prose-sm max-w-none">
                    {renderDescription(event.Description)}
                  </div>
                </div>
              )}

              {/* Artists */}
              {event.artists && (
                <div className="bg-gray-50 rounded-xl p-6">
                  <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center">
                    <UserGroupIcon className="w-5 h-5 mr-2 text-emerald-600" />
                    Artisti
                  </h3>
                  <p className="text-gray-700 leading-relaxed whitespace-pre-line">
                    {event.artists}
                  </p>
                </div>
              )}

              {/* Locandina */}
              {event.locandina && (
                <div className="bg-gray-50 rounded-xl p-6">
                  <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center">
                    <LinkIcon className="w-5 h-5 mr-2 text-emerald-600" />
                    Locandina
                  </h3>
                  <button
                    onClick={handleLocandinaView}
                    className="inline-flex items-center px-4 py-2 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 transition-colors"
                  >
                    <DocumentTextIcon className="w-4 h-4 mr-2" />
                    Visualizza Locandina
                  </button>
                </div>
              )}
            </div>

            {/* Right Column - Location & Map */}
            <div className="space-y-6">
              {/* Location Info */}
              {event.location && (
                <div className="bg-gray-50 rounded-xl p-6">
                  <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center">
                    <MapPinIcon className="w-5 h-5 mr-2 text-emerald-600" />
                    {t('location')}
                  </h3>
                  <div className="mb-4">
                    <p className="text-gray-700 mb-2 font-medium">{event.location}</p>
                    <a
                      href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(event.location)}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center text-emerald-600 hover:text-emerald-700 transition-colors duration-200 font-medium text-sm"
                    >
                      <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                      </svg>
                      {t('viewOnGoogleMaps')}
                    </a>
                  </div>

                  {/* Map component hidden for now */}
                  {/* <EventMap
                    latitude={event.latitude}
                    longitude={event.longitude}
                    location={event.location}
                    eventTitle={event.Title}
                  /> */}
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Modal Footer */}
        <div className="bg-gray-50 px-4 md:px-6 py-4 md:rounded-b-2xl flex-shrink-0">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-sm text-gray-600 text-center md:text-left">
              {t('bookNowFooter')}
            </p>
            <div className="flex gap-3 w-full md:w-auto">
              <button
                onClick={onClose}
                className="bg-gray-600 text-white px-6 py-3 md:py-2 rounded-lg hover:bg-gray-700 transition-colors font-medium flex-1 md:flex-initial"
              >
                {t('close')}
              </button>
              {isSoldOut ? (
                <a
                  href={`/booking?eventId=${event.id}&eventTitle=${encodeURIComponent(event.Title || '')}&eventDate=${encodeURIComponent(event.date || '')}&eventLocation=${encodeURIComponent(event.location || '')}&eventTimes=${encodeURIComponent(JSON.stringify(event.times || []))}&waitlist=true&soldOut=true`}
                  className="bg-yellow-600 text-white px-6 py-3 md:py-2 rounded-lg hover:bg-yellow-700 transition-colors font-medium flex-1 md:flex-initial text-center"
                >
                  Lista d'Attesa
                </a>
              ) : (
                <a
                  href={`/booking?eventId=${event.id}&eventTitle=${encodeURIComponent(event.Title || '')}&eventDate=${encodeURIComponent(event.date || '')}&eventLocation=${encodeURIComponent(event.location || '')}&eventTimes=${encodeURIComponent(JSON.stringify(event.times || []))}&timesSoldOut=${encodeURIComponent(JSON.stringify(event.timesSoldOut || []))}`}
                  className="bg-emerald-600 text-white px-6 py-3 md:py-2 rounded-lg hover:bg-emerald-700 transition-colors font-medium flex-1 md:flex-initial text-center"
                >
                  {t('bookNow')}
                </a>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Modal Animation Styles */}
      <style jsx>{`
        .modal-enter {
          animation: modal-fade-in 0.3s ease-out;
        }

        @keyframes modal-fade-in {
          0% {
            opacity: 0;
            transform: scale(0.9);
          }
          100% {
            opacity: 1;
            transform: scale(1);
          }
        }
      `}</style>
    </div>
  );
};

export default EventDetailModal;