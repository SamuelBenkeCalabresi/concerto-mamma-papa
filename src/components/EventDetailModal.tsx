'use client';

import React from 'react';
import EventMap from './EventMap';
import {
  XMarkIcon,
  CalendarDaysIcon,
  ClockIcon,
  MapPinIcon,
  TicketIcon,
  CurrencyEuroIcon,
  UserGroupIcon,
  DocumentTextIcon,
  LinkIcon
} from '@heroicons/react/24/outline';

interface EventDetailModalProps {
  event: any;
  isOpen: boolean;
  onClose: () => void;
}

const EventDetailModal: React.FC<EventDetailModalProps> = ({ event, isOpen, onClose }) => {
  if (!isOpen || !event) return null;

  const getDescriptionText = (description: any) => {
    if (Array.isArray(description)) {
      return description.map(block =>
        block.children?.map((child: any) => child.text).join('') || ''
      ).join(' ');
    }
    return description || 'Nessuna descrizione disponibile';
  };

  const handleBackdropClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  // Disable/enable body scroll
  React.useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

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

                  {event.time && (
                    <div className="flex items-center text-gray-700">
                      <ClockIcon className="w-5 h-5 mr-3 text-emerald-600 flex-shrink-0" />
                      <span className="font-medium">Orario:</span>
                      <span className="ml-2">{event.time}</span>
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
                      <span className="font-medium">Età consigliata:</span>
                      <span className="ml-2">{event.ageMin}-{event.ageMax} anni</span>
                    </div>
                  )}

                  {event.price !== undefined && (
                    <div className="flex items-center text-gray-700">
                      <CurrencyEuroIcon className="w-5 h-5 mr-3 text-emerald-600 flex-shrink-0" />
                      <span className="font-medium">Prezzo:</span>
                      <span className="ml-2">{event.isFree ? 'Gratuito' : `€${event.price}`}</span>
                    </div>
                  )}

                  {event.availableSeats && (
                    <div className="flex items-center text-gray-700">
                      <TicketIcon className="w-5 h-5 mr-3 text-emerald-600 flex-shrink-0" />
                      <span className="font-medium">Posti disponibili:</span>
                      <span className="ml-2">{event.availableSeats}</span>
                    </div>
                  )}
                </div>
              </div>

              {/* Description */}
              {event.Description && (
                <div className="bg-gray-50 rounded-xl p-6">
                  <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center">
                    <DocumentTextIcon className="w-5 h-5 mr-2 text-emerald-600" />
                    Descrizione
                  </h3>
                  <p className="text-gray-700 leading-relaxed whitespace-pre-line">
                    {getDescriptionText(event.Description)}
                  </p>
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
                    Luogo
                  </h3>
                  <p className="text-gray-700 mb-4">{event.location}</p>

                  {/* OpenStreetMap with Leaflet */}
                  <EventMap
                    latitude={event.latitude}
                    longitude={event.longitude}
                    location={event.location}
                    eventTitle={event.Title}
                  />
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Modal Footer */}
        <div className="bg-gray-50 px-4 md:px-6 py-4 md:rounded-b-2xl flex-shrink-0">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-sm text-gray-600 text-center md:text-left">
              Prenota ora per non perdere questo evento speciale!
            </p>
            <div className="flex gap-3 w-full md:w-auto">
              <button
                onClick={onClose}
                className="bg-gray-600 text-white px-6 py-3 md:py-2 rounded-lg hover:bg-gray-700 transition-colors font-medium flex-1 md:flex-initial"
              >
                Chiudi
              </button>
              <a
                href="/prenota"
                className="bg-emerald-600 text-white px-6 py-3 md:py-2 rounded-lg hover:bg-emerald-700 transition-colors font-medium flex-1 md:flex-initial text-center"
              >
                Prenota Evento
              </a>
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