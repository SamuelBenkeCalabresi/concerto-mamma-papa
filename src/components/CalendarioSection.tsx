'use client';

import { useState, useEffect } from 'react';
import { useTranslations } from 'next-intl';
import { getOpenEvents } from '@/lib/strapi';
import EventDetailModal from './EventDetailModal';
import {
  CalendarDaysIcon,
  MagnifyingGlassIcon,
  FunnelIcon,
  MapPinIcon
} from '@heroicons/react/24/outline';

export default function CalendarioSection() {
  const t = useTranslations('CalendarioSection');
  const [events, setEvents] = useState<any[]>([]);
  const [filteredEvents, setFilteredEvents] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [selectedMonth, setSelectedMonth] = useState('');
  const [selectedAge, setSelectedAge] = useState('');
  const [selectedPrice, setSelectedPrice] = useState('');
  const [availableOnly, setAvailableOnly] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedEvent, setSelectedEvent] = useState<any>(null);
  const [showEventModal, setShowEventModal] = useState(false);

  useEffect(() => {
    async function fetchEvents() {
      try {
        setLoading(true);
        const data = await getOpenEvents();
        console.log('Events fetched in calendario:', data);
        setEvents(data.data || []);
        setFilteredEvents(data.data || []);
      } catch (err) {
        console.error('Failed to fetch events:', err);
        setError('Error loading events. Please try again later.');
      } finally {
        setLoading(false);
      }
    }

    fetchEvents();
  }, []);

  // Filter events based on selected criteria
  useEffect(() => {
    let filtered = [...events];

    // Filter by search term
    if (searchTerm) {
      filtered = filtered.filter(event =>
        event.Title?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        getDescriptionText(event.Description)?.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Filter by availability
    if (availableOnly) {
      filtered = filtered.filter(event => event.availableSeats > 0);
    }

    // Filter by age range
    if (selectedAge) {
      const [minAge, maxAge] = selectedAge.split('-').map(Number);
      filtered = filtered.filter(event => {
        const eventMinAge = event.ageMin || 0;
        const eventMaxAge = event.ageMax || 5;
        if (maxAge) {
          return eventMinAge <= maxAge && eventMaxAge >= minAge;
        } else {
          return eventMinAge <= minAge && eventMaxAge >= minAge;
        }
      });
    }

    // COMMENTED OUT - Price filtering temporarily disabled
    // Filter by price
    // if (selectedPrice) {
    //   if (selectedPrice === 'free') {
    //     filtered = filtered.filter(event => event.isFree || event.price === 0);
    //   } else {
    //     const [minPrice, maxPrice] = selectedPrice.split('-').map(Number);
    //     filtered = filtered.filter(event => {
    //       const price = event.price || 0;
    //       return price >= minPrice && price <= maxPrice;
    //     });
    //   }
    // }

    setFilteredEvents(filtered);
  }, [events, searchTerm, selectedAge, /* selectedPrice, */ availableOnly]); // selectedPrice removed - price filtering disabled

  const getDescriptionText = (description: any) => {
    if (Array.isArray(description)) {
      return description.map(block =>
        block.children?.map((child: any) => child.text).join('') || ''
      ).join(' ');
    }
    return description || 'No description available';
  };

  const handleEventClick = (event: any) => {
    setSelectedEvent(event);
    setShowEventModal(true);
  };

  const handleCloseModal = () => {
    setShowEventModal(false);
    setSelectedEvent(null);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="text-center mb-12">
        <h2 className="text-4xl font-bold text-neutral mb-4">
          Calendario Eventi
        </h2>
        <p className="text-lg text-neutral/70 max-w-2xl mx-auto">
          Scopri tutti i nostri concerti e attività musicali per famiglie con bambini dai 0 ai 5 anni
        </p>
      </div>

      <div className="flex flex-col lg:flex-row gap-8">
        {/* Filters Sidebar */}
        <aside className="lg:w-80 flex-shrink-0">
          <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-6 sticky top-24">
            <div className="flex items-center mb-6">
              <FunnelIcon className="w-5 h-5 mr-2 text-emerald-600" />
              <h3 className="font-semibold text-lg text-gray-900">Filtra Eventi</h3>
            </div>

            {/* Search Bar */}
            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 mb-2">Cerca</label>
              <div className="relative">
                <MagnifyingGlassIcon className="w-4 h-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <input
                  type="text"
                  placeholder="Cerca eventi..."
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
            </div>

            <div className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Età</label>
                <select
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                  value={selectedAge}
                  onChange={(e) => setSelectedAge(e.target.value)}
                >
                  <option value="">Tutte le età</option>
                  <option value="0-2">0-2 anni</option>
                  <option value="3-4">3-4 anni</option>
                  <option value="5">5 anni</option>
                </select>
              </div>

              {/* Price filtering temporarily disabled - was here */}

              <div>
                <label className="flex items-center">
                  <input
                    type="checkbox"
                    className="w-4 h-4 text-emerald-600 border-gray-300 rounded focus:ring-emerald-500"
                    checked={availableOnly}
                    onChange={(e) => setAvailableOnly(e.target.checked)}
                  />
                  <span className="ml-2 text-sm text-gray-700">Solo posti disponibili</span>
                </label>
              </div>
            </div>

            <button
              onClick={() => {
                setSearchTerm('');
                setSelectedAge('');
                // setSelectedPrice(''); // COMMENTED OUT - Price filtering disabled
                setAvailableOnly(true);
              }}
              className="w-full mt-6 px-4 py-2 text-sm text-gray-600 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors"
            >
              Reset Filtri
            </button>
          </div>
        </aside>

        {/* Events Grid */}
        <div className="flex-1">
          <div className="flex justify-between items-center mb-6">
            <p className="text-gray-600">
              {loading ? 'Caricamento...' : `Trovati ${filteredEvents.length} eventi`}
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
              <p className="text-gray-600">Caricamento eventi...</p>
            </div>
          )}

          {error && (
            <div className="text-center py-12">
              <p className="text-xl text-red-600">{error}</p>
            </div>
          )}

          {!loading && !error && filteredEvents.length === 0 && (
            <div className="text-center py-12">
              <p className="text-xl text-gray-500">
                Nessun evento trovato con i filtri selezionati.
              </p>
            </div>
          )}

          {!loading && !error && filteredEvents.length > 0 && (
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3">
              {filteredEvents.map((event: any) => (
                <div key={event.id} className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-all duration-300 hover:scale-105 border border-gray-200 cursor-pointer group">
                  <div className="p-6" onClick={() => handleEventClick(event)}>
                    <h3 className="text-xl font-semibold text-gray-900 mb-2 group-hover:text-emerald-600 transition-colors">
                      {event.Title || 'Untitled Event'}
                    </h3>
                    <p className="text-gray-600 mb-4 line-clamp-2">
                      {getDescriptionText(event.Description)}
                    </p>
                    <div className="space-y-2 mb-4">
                      <div className="flex items-center text-sm text-gray-500">
                        <CalendarDaysIcon className="w-4 h-4 mr-2 text-emerald-600" />
                        <span>{event.date ? new Date(event.date).toLocaleDateString('it-IT') : 'Data da definire'}</span>
                      </div>
                      {event.location && (
                        <div className="flex items-center text-sm text-gray-500">
                          <MapPinIcon className="w-4 h-4 mr-2 text-emerald-600" />
                          <span className="truncate">{event.location}</span>
                        </div>
                      )}
                      {/* Price preview temporarily disabled - was here */}
                    </div>
                    <div className="text-center">
                      <span className="text-emerald-600 text-sm font-medium group-hover:text-emerald-700">
                        Clicca per vedere i dettagli →
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Event Detail Modal */}
      <EventDetailModal
        event={selectedEvent}
        isOpen={showEventModal}
        onClose={handleCloseModal}
      />
    </div>
  );
}