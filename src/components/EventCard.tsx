'use client';

import { useTranslations } from 'next-intl';
import Link from 'next/link';
import { useLocale } from 'next-intl';
import { Event } from '@/types/event';
import { 
  CalendarDaysIcon, 
  ClockIcon, 
  MapPinIcon, 
  UserGroupIcon,
  TicketIcon
} from '@heroicons/react/24/outline';
import { HeartIcon } from '@heroicons/react/24/solid';

interface EventCardProps {
  event: Event;
  className?: string;
}

export default function EventCard({ event, className = '' }: EventCardProps) {
  const t = useTranslations('Events');
  const locale = useLocale();
  
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('it-IT', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const isAvailable = event.availableSeats > 0;
  const isSoldOut = !isAvailable;

  return (
    <div className={`card bg-base-100 shadow-xl card-hover ${className}`}>
      <figure className="relative">
        <div className="aspect-video w-full bg-gradient-to-br from-primary/20 to-accent/20 flex items-center justify-center">
          <div className="text-center p-8">
            <div className="text-primary mb-2">
              🎼
            </div>
            <h4 className="font-semibold text-lg">{event.title}</h4>
          </div>
        </div>
        
        {event.featured && (
          <div className="absolute top-2 left-2 badge badge-secondary gap-1">
            <HeartIcon className="h-3 w-3" />
            In Evidenza
          </div>
        )}
        
        {event.isFree && (
          <div className="absolute top-2 right-2 badge badge-success">
            {t('freeEntry')}
          </div>
        )}
        
        {isSoldOut && (
          <div className="absolute top-2 right-2 badge badge-error">
            {t('soldOut')}
          </div>
        )}
      </figure>
      
      <div className="card-body">
        <h3 className="card-title text-lg font-bold text-neutral">
          {event.title}
        </h3>
        
        <p className="text-neutral/70 text-sm mb-4 line-clamp-3">
          {event.description}
        </p>
        
        <div className="space-y-2 text-sm">
          <div className="flex items-center text-neutral/70">
            <CalendarDaysIcon className="h-4 w-4 mr-2 text-primary" />
            <span className="capitalize">{formatDate(event.date)}</span>
          </div>
          
          <div className="flex items-center text-neutral/70">
            <ClockIcon className="h-4 w-4 mr-2 text-primary" />
            <span>
              {event.time} - {t('duration', { duration: event.duration })}
            </span>
          </div>
          
          <div className="flex items-center text-neutral/70">
            <MapPinIcon className="h-4 w-4 mr-2 text-primary" />
            <a
              href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(event.location)}`}
              target="_blank"
              rel="noopener noreferrer"
              className="truncate hover:text-primary transition-colors duration-200"
              onClick={(e) => e.stopPropagation()} // Prevent card click when clicking location
            >
              {event.location}
            </a>
          </div>
          
          <div className="flex items-center text-neutral/70">
            <UserGroupIcon className="h-4 w-4 mr-2 text-primary" />
            <span>
              {t('ageRange', { min: event.ageRange.min, max: event.ageRange.max })}
            </span>
          </div>
        </div>
        
        <div className="divider my-4"></div>
        
        <div className="flex items-center justify-between">
          {/* COMMENTED OUT - Price preview temporarily disabled */}
          {/* <div className="flex items-center">
            {event.isFree ? (
              <span className="text-success font-bold text-lg">
                Gratuito
              </span>
            ) : (
              <div className="flex items-center">
                <TicketIcon className="h-4 w-4 mr-1 text-primary" />
                <span className="font-bold text-lg">€{event.price}</span>
              </div>
            )}
          </div> */}

          <div className="text-right text-xs text-neutral/60">
            {isAvailable ? (
              <span>
                {event.availableSeats} posti disponibili
              </span>
            ) : (
              <span className="text-error font-medium">
                Tutto esaurito
              </span>
            )}
          </div>
        </div>
        
        <div className="card-actions justify-end mt-4">
          <Link 
            href={`/${locale}/concerts/${event.id}`}
            className="btn btn-ghost btn-sm"
          >
            Dettagli
          </Link>
          
          {isAvailable ? (
            <Link 
              href={`/${locale}/booking?eventId=${event.id}`}
              className="btn btn-primary btn-sm"
            >
              {t('bookNow')}
            </Link>
          ) : (
            <button className="btn btn-disabled btn-sm">
              {t('soldOut')}
            </button>
          )}
        </div>
        
        {event.tags && event.tags.length > 0 && (
          <div className="mt-3">
            <div className="flex flex-wrap gap-1">
              {event.tags.slice(0, 3).map((tag, index) => (
                <span key={index} className="badge badge-outline badge-xs">
                  {tag}
                </span>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}