'use client';

import { useTranslations } from 'next-intl';
import Link from 'next/link';
import { useLocale } from 'next-intl';
import EventCard from './EventCard';
import { mockEvents } from '@/data/mockEvents';

export default function EventsSection() {
  const t = useTranslations('Events');
  const locale = useLocale();
  
  const featuredEvents = mockEvents.filter(event => event.featured).slice(0, 3);
  const upcomingEvents = mockEvents.slice(0, 6);

  return (
    <section className="py-16 bg-base-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl font-bold text-neutral mb-4">
            {t('title')}
          </h2>
          <p className="text-lg text-neutral/70 max-w-2xl mx-auto">
            {t('subtitle')}
          </p>
        </div>

        {/* Featured Events */}
        {featuredEvents.length > 0 && (
          <div className="mb-16">
            <div className="flex items-center justify-between mb-8">
              <h3 className="text-2xl font-semibold text-neutral">
                Eventi in Evidenza
              </h3>
              <Link 
                href={`/${locale}/concerts`}
                className="btn btn-ghost btn-sm text-primary hover:text-primary"
              >
                Vedi tutti →
              </Link>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {featuredEvents.map((event) => (
                <EventCard 
                  key={event.id} 
                  event={event}
                  className="animate-fade-in"
                />
              ))}
            </div>
          </div>
        )}

        {/* All Upcoming Events */}
        <div>
          <div className="flex items-center justify-between mb-8">
            <h3 className="text-2xl font-semibold text-neutral">
              Tutti i Prossimi Concerti
            </h3>
            <div className="flex gap-2">
              <select className="select select-bordered select-sm">
                <option>Tutti i mesi</option>
                <option>Marzo 2024</option>
                <option>Aprile 2024</option>
                <option>Maggio 2024</option>
              </select>
              <select className="select select-bordered select-sm">
                <option>Tutte le età</option>
                <option>0-2 anni</option>
                <option>3-4 anni</option>
                <option>5-6 anni</option>
              </select>
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {upcomingEvents.map((event) => (
              <EventCard 
                key={event.id} 
                event={event}
              />
            ))}
          </div>
        </div>

        <div className="text-center mt-12">
          <Link href={`/${locale}/concerts`} className="btn btn-primary btn-lg">
            Vedi Tutti i Concerti
          </Link>
        </div>
      </div>
    </section>
  );
}