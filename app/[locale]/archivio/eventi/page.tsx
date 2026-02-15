import Header from '@/components/Header';
import Footer from '@/components/Footer';
import EventAccordion from '@/components/EventAccordion';
import { getTranslations } from 'next-intl/server';
import { STRAPI_CONFIG } from '@/lib/strapi';
import {
  CalendarDaysIcon,
  MusicalNoteIcon,
  MicrophoneIcon
} from '@heroicons/react/24/outline';
import eventsIt from '@/data/events.json';
import eventsEn from '@/data/events-en.json';

interface Event {
  title: string;
  date: string;
  time: string;
  location: {
    name: string;
    street: string;
  };
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

function loadArchivedEvents(locale: string): Event[] {
  const events = locale === 'en' ? eventsEn : eventsIt;
  return events as Event[];
}

function getDescriptionText(description: any): string {
  if (Array.isArray(description)) {
    return description.map(block =>
      block.children?.map((child: any) => child.text).join('') || ''
    ).join(' ');
  }
  return description || '';
}

function transformStrapiEvent(strapiEvent: any): Event {
  const times = Array.isArray(strapiEvent.times)
    ? strapiEvent.times.join('; ')
    : strapiEvent.times || '';

  return {
    title: strapiEvent.Title || '',
    date: strapiEvent.date || '',
    time: times,
    location: {
      name: strapiEvent.location || '',
      street: '',
    },
    description: getDescriptionText(strapiEvent.Description),
    ageGroups: [`${strapiEvent.ageMin || 0}-${strapiEvent.ageMax || 18} anni`],
    prenotazione: strapiEvent.bookingEnabled ? 'prenotazione on line' : '',
    eventType: 'regular',
    price: strapiEvent.isFree ? 'Gratuito' : strapiEvent.price ? `€${strapiEvent.price}` : undefined,
  };
}

async function loadStrapiEvents(): Promise<Event[]> {
  try {
    const url = `${STRAPI_CONFIG.API_URL}/api/events?populate=*&pagination[pageSize]=100`;
    const res = await fetch(url, {
      headers: { 'Content-Type': 'application/json' },
      next: { revalidate: 300 },
    });

    if (!res.ok) {
      console.error('Strapi API error:', res.status, res.statusText);
      return [];
    }

    const data = await res.json();
    const strapiEvents = data.data || [];
    return strapiEvents.map(transformStrapiEvent);
  } catch (error) {
    console.error('Error loading Strapi events:', error);
    return [];
  }
}

export default async function EventiPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const [archivedEvents, strapiEvents] = await Promise.all([
    loadArchivedEvents(locale),
    loadStrapiEvents(),
  ]);

  // Merge and sort by date (most recent first)
  const events: Event[] = [...strapiEvents, ...archivedEvents].sort((a, b) => {
    return new Date(b.date).getTime() - new Date(a.date).getTime();
  });

  const t = await getTranslations('EventsPage');

  return (
    <main className="min-h-screen bg-base-100">
      <Header />
      
      {/* Hero Section */}
      <section className="relative overflow-hidden">
        <div className="relative min-h-[60vh] bg-gradient-to-br from-purple-900 via-pink-800 to-orange-900">
          <div className="absolute inset-0 bg-gradient-to-r from-black/40 via-black/20 to-black/40"></div>
          
          {/* Decorative Elements */}
          <div className="absolute inset-0 overflow-hidden px-4">
            <div className="absolute top-16 left-8 w-20 h-20 opacity-10">
              <MusicalNoteIcon className="w-full h-full text-white animate-pulse" />
            </div>
            <div className="absolute top-32 right-16 w-16 h-16 opacity-20">
              <MicrophoneIcon className="w-full h-full text-white animate-bounce" />
            </div>
            <div className="absolute bottom-20 left-12 w-24 h-24 opacity-15">
              <CalendarDaysIcon className="w-full h-full text-white" />
            </div>
            <div className="absolute top-40 left-1/4 ml-8 text-white/20 text-3xl animate-bounce">🎼</div>
            <div className="absolute top-20 right-1/4 mr-8 text-white/20 text-4xl animate-pulse">🎵</div>
            <div className="absolute bottom-32 right-1/3 mr-4 text-white/20 text-2xl animate-bounce">🎶</div>
          </div>

          <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
            <div className="text-center">
              <div className="inline-flex items-center bg-white/10 backdrop-blur-sm text-white rounded-full px-4 py-2 mb-6">
                <MusicalNoteIcon className="w-5 h-5 mr-2" />
                <span className="text-sm font-medium">{t('tag')}</span>
              </div>
              
              <h1 className="text-4xl lg:text-6xl font-bold text-white leading-tight mb-6">
                <span className="block">{t('title')}</span>
                <span className="block text-pink-300">{t('titleHighlight')}</span>
              </h1>
              
              <p className="text-xl text-white/90 max-w-3xl mx-auto">
                {t('description')}
              </p>
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

      {/* Events Section */}
      <section className="py-16 bg-base-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-12 text-center">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-800 mb-4">
              {t('sectionTitle')}
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              {t('sectionDescription', { count: events.length })}
            </p>
          </div>

          <div className="space-y-6">
            {events.map((event, index) => (
              <EventAccordion key={index} event={event} />
            ))}
          </div>

          {events.length === 0 && (
            <div className="text-center py-12">
              <CalendarDaysIcon className="h-16 w-16 text-neutral/30 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-neutral/70 mb-2">
                {t('noEvents.title')}
              </h3>
              <p className="text-neutral/50">
                {t('noEvents.description')}
              </p>
            </div>
          )}
        </div>
      </section>
      
      <Footer />
    </main>
  );
}