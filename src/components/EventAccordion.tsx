'use client';

import { useState } from 'react';
import { 
  CalendarDaysIcon, 
  ClockIcon, 
  MapPinIcon, 
  UserGroupIcon,
  TicketIcon,
  ChevronDownIcon,
  LinkIcon,
  PhoneIcon,
  EnvelopeIcon,
  StarIcon,
  MusicalNoteIcon,
  UserIcon
} from '@heroicons/react/24/outline';

interface EventLocation {
  name: string;
  street: string;
}

interface Event {
  title: string;
  date: string;
  time: string;
  location: EventLocation;
  description: string;
  ageGroups: string[];
  prenotazione: string;
  link?: string | null;
  eventType: string;
  specialGuests?: string[];
  specialOffer?: string;
  phone?: string;
  email?: string;
  price?: string;
  specialTitle?: string;
  teachers?: string[];
  performers?: string[];
  covidRequirements?: string;
}

interface EventAccordionProps {
  event: Event;
}

export default function EventAccordion({ event }: EventAccordionProps) {
  const [isOpen, setIsOpen] = useState(false);

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('it-IT', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const getEventTypeLabel = (type: string) => {
    const types: { [key: string]: string } = {
      'regular': 'Concerto Regolare',
      'special': 'Evento Speciale',
      'private': 'Evento Privato',
      'openday': 'Open Day',
      'yoga': 'Yoga Musicale',
      'christmas': 'Concerto di Natale',
      'international': 'Tour Internazionale',
      'webinar': 'Webinar',
      'educational': 'Evento Educativo',
      'charity': 'Evento di Beneficenza'
    };
    return types[type] || type;
  };

  const getEventTypeBadgeClass = (type: string) => {
    const classes: { [key: string]: string } = {
      'regular': 'badge-primary',
      'special': 'badge-secondary',
      'private': 'badge-ghost',
      'openday': 'badge-info',
      'yoga': 'badge-success',
      'christmas': 'badge-error',
      'international': 'badge-warning',
      'webinar': 'badge-accent',
      'educational': 'badge-info',
      'charity': 'badge-success'
    };
    return classes[type] || 'badge-outline';
  };

  const isSpecialEvent = event.specialTitle || event.specialGuests || event.specialOffer;

  return (
    <div className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-200">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full p-6 text-left focus:outline-none focus:ring-2 focus:ring-primary/20 rounded-lg"
      >
        <div className="flex items-center justify-between">
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-3 mb-2">
              <span className={`badge ${getEventTypeBadgeClass(event.eventType)} text-xs`}>
                {getEventTypeLabel(event.eventType)}
              </span>
              {event.price === "EVENTO GRATUITO!" && (
                <span className="badge badge-success text-xs">Gratuito</span>
              )}
              {isSpecialEvent && (
                <span className="badge badge-accent text-xs">Speciale</span>
              )}
            </div>
            
            <h3 className="text-lg font-semibold text-neutral mb-1 pr-4">
              {event.specialTitle || event.title}
            </h3>
            
            <div className="flex flex-col sm:flex-row sm:items-center gap-2 text-sm text-neutral/70">
              <div className="flex items-center">
                <CalendarDaysIcon className="h-4 w-4 mr-1 text-primary" />
                <span className="capitalize">{formatDate(event.date)}</span>
              </div>
              <div className="flex items-center">
                <ClockIcon className="h-4 w-4 mr-1 text-primary" />
                <span>{event.time}</span>
              </div>
              <div className="flex items-center">
                <MapPinIcon className="h-4 w-4 mr-1 text-primary" />
                <span className="truncate">{event.location.name}</span>
              </div>
            </div>
          </div>
          
          <ChevronDownIcon 
            className={`h-5 w-5 text-neutral/50 transition-transform duration-200 ${
              isOpen ? 'transform rotate-180' : ''
            }`}
          />
        </div>
      </button>
      
      {isOpen && (
        <div className="px-6 pb-6 border-t border-base-200">
          <div className="pt-4 space-y-4">
            
            {/* Description */}
            <div>
              <p className="text-neutral/80 leading-relaxed">
                {event.description}
              </p>
            </div>

            {/* Special Offer */}
            {event.specialOffer && (
              <div className="bg-success/10 border border-success/20 rounded-lg p-3">
                <div className="flex items-center gap-2 text-success font-medium">
                  <StarIcon className="h-4 w-4" />
                  <span>{event.specialOffer}</span>
                </div>
              </div>
            )}

            {/* Event Details Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              
              {/* Left Column */}
              <div className="space-y-3">
                <div>
                  <h4 className="font-medium text-neutral mb-2 flex items-center">
                    <MapPinIcon className="h-4 w-4 mr-2 text-primary" />
                    Località
                  </h4>
                  <div className="text-sm text-neutral/70 ml-6">
                    <div className="font-medium">{event.location.name}</div>
                    <div>{event.location.street}</div>
                  </div>
                </div>

                <div>
                  <h4 className="font-medium text-neutral mb-2 flex items-center">
                    <UserGroupIcon className="h-4 w-4 mr-2 text-primary" />
                    Età
                  </h4>
                  <div className="text-sm text-neutral/70 ml-6">
                    {event.ageGroups.join(', ')}
                  </div>
                </div>

                <div>
                  <h4 className="font-medium text-neutral mb-2 flex items-center">
                    <TicketIcon className="h-4 w-4 mr-2 text-primary" />
                    Prenotazione
                  </h4>
                  <div className="text-sm text-neutral/70 ml-6">
                    {event.prenotazione}
                  </div>
                </div>
              </div>

              {/* Right Column */}
              <div className="space-y-3">
                
                {/* Special Guests */}
                {event.specialGuests && event.specialGuests.length > 0 && (
                  <div>
                    <h4 className="font-medium text-neutral mb-2 flex items-center">
                      <MusicalNoteIcon className="h-4 w-4 mr-2 text-primary" />
                      Ospiti Speciali
                    </h4>
                    <div className="text-sm text-neutral/70 ml-6">
                      {event.specialGuests.map((guest, index) => (
                        <div key={index}>{guest}</div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Teachers */}
                {event.teachers && event.teachers.length > 0 && (
                  <div>
                    <h4 className="font-medium text-neutral mb-2 flex items-center">
                      <UserIcon className="h-4 w-4 mr-2 text-primary" />
                      Docenti
                    </h4>
                    <div className="text-sm text-neutral/70 ml-6">
                      {event.teachers.map((teacher, index) => (
                        <div key={index}>{teacher}</div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Performers */}
                {event.performers && event.performers.length > 0 && (
                  <div>
                    <h4 className="font-medium text-neutral mb-2 flex items-center">
                      <MusicalNoteIcon className="h-4 w-4 mr-2 text-primary" />
                      Interpreti
                    </h4>
                    <div className="text-sm text-neutral/70 ml-6">
                      {event.performers.map((performer, index) => (
                        <div key={index}>{performer}</div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Price */}
                {event.price && (
                  <div>
                    <h4 className="font-medium text-neutral mb-2 flex items-center">
                      <TicketIcon className="h-4 w-4 mr-2 text-primary" />
                      Costo
                    </h4>
                    <div className="text-sm text-neutral/70 ml-6">
                      <span className={event.price.includes("GRATUITO") ? "text-success font-medium" : ""}>
                        {event.price}
                      </span>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* COVID Requirements */}
            {event.covidRequirements && (
              <div className="bg-info/10 border border-info/20 rounded-lg p-3">
                <div className="flex items-center gap-2 text-info text-sm">
                  <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <span className="font-medium">Requisiti sanitari: </span>
                  <span>{event.covidRequirements}</span>
                </div>
              </div>
            )}

            {/* Contact Information */}
            <div className="flex flex-wrap gap-3 pt-2">
              {event.link && (
                <a 
                  href={event.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn-primary btn-sm"
                >
                  <LinkIcon className="h-4 w-4 mr-1" />
                  Prenota Online
                </a>
              )}
              
              {event.phone && (
                <a 
                  href={`tel:${event.phone}`}
                  className="btn btn-ghost btn-sm"
                >
                  <PhoneIcon className="h-4 w-4 mr-1" />
                  {event.phone}
                </a>
              )}
              
              {event.email && (
                <a 
                  href={`mailto:${event.email}`}
                  className="btn btn-ghost btn-sm"
                >
                  <EnvelopeIcon className="h-4 w-4 mr-1" />
                  Email
                </a>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}