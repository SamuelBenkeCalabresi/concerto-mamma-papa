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
  const [searchByZone, setSearchByZone] = useState(true);
  const [selectedZone, setSelectedZone] = useState('');
  const [selectedDate, setSelectedDate] = useState('');

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

    // Filter by search term (Comune or general search)
    if (searchTerm) {
      filtered = filtered.filter(event =>
        event.Title?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        event.location?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        getDescriptionText(event.Description)?.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Filter by zone
    if (selectedZone) {
      filtered = filtered.filter(event =>
        event.location?.toLowerCase().includes(selectedZone.toLowerCase())
      );
    }

    // Filter by date
    if (selectedDate) {
      filtered = filtered.filter(event => {
        if (!event.date) return false;
        const eventDate = new Date(event.date).toISOString().split('T')[0];
        return eventDate === selectedDate;
      });
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

    setFilteredEvents(filtered);
  }, [events, searchTerm, selectedZone, selectedDate, selectedAge, availableOnly]);

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

            {/* Search Mode Toggle */}
            <div className="mb-6">
              <div className="grid grid-cols-2 gap-2 mb-4">
                <button
                  onClick={() => {
                    setSearchByZone(true);
                    setSearchTerm('');
                  }}
                  className={`px-4 py-2 text-sm font-medium rounded-lg transition-all ${
                    searchByZone
                      ? 'bg-emerald-600 text-white shadow-md'
                      : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                  }`}
                >
                  Ricerca per Zona
                </button>
                <button
                  onClick={() => {
                    setSearchByZone(false);
                    setSelectedZone('');
                  }}
                  className={`px-4 py-2 text-sm font-medium rounded-lg transition-all ${
                    !searchByZone
                      ? 'bg-emerald-600 text-white shadow-md'
                      : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                  }`}
                >
                  Ricerca Libera
                </button>
              </div>

              {/* Label and Toggle Link on Same Row */}
              <div className="flex justify-between items-center mb-2">
                <label className="text-sm font-medium text-gray-700">
                  {searchByZone ? 'Zona di Ricerca' : 'Comune'}
                </label>
                <button
                  onClick={() => {
                    setSearchByZone(!searchByZone);
                    setSearchTerm('');
                    setSelectedZone('');
                  }}
                  className="text-xs text-emerald-600 hover:text-emerald-700 font-medium"
                >
                  {searchByZone ? 'Passa a Ricerca per Comune →' : '← Passa a Ricerca per Zona'}
                </button>
              </div>

              {/* Search Fields with Same Size */}
              <div className="grid grid-cols-1 gap-3">
                {searchByZone ? (
                  <div className="flex items-center px-4 py-3 bg-emerald-50 border-2 border-emerald-300 rounded-lg min-h-[48px]">
                    <MapPinIcon className="w-5 h-5 mr-2 text-emerald-600 flex-shrink-0" />
                    <select
                      className="flex-1 bg-transparent border-none focus:ring-0 focus:outline-none text-gray-700 font-medium cursor-pointer"
                      value={selectedZone}
                      onChange={(e) => setSelectedZone(e.target.value)}
                    >
                      <option value="">Seleziona una zona</option>
                      <option value="Milano">Milano</option>
                      <option value="Monza">Monza</option>
                      <option value="Brianza">Brianza</option>
                      <option value="Como">Como</option>
                      <option value="Lecco">Lecco</option>
                    </select>
                  </div>
                ) : (
                  <div className="relative min-h-[48px]">
                    <MagnifyingGlassIcon className="w-5 h-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                    <input
                      type="text"
                      placeholder="Cerca per comune..."
                      className="w-full h-full pl-10 pr-4 py-3 border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                    />
                  </div>
                )}
              </div>
            </div>

            {/* Date Filter */}
            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 mb-2">Data</label>
              <input
                type="date"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                value={selectedDate}
                onChange={(e) => setSelectedDate(e.target.value)}
              />
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
                setSelectedZone('');
                setSelectedDate('');
                setSelectedAge('');
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
            <div className="grid gap-8 md:grid-cols-1 lg:grid-cols-2 xl:grid-cols-2">
              {filteredEvents.map((event: any) => {
                const isSoldOut = event.soldOut || (event.times && event.timesSoldOut && event.times.length > 0 && event.times.every((time: string) => event.timesSoldOut?.includes(time)));
                return (
                  <div key={event.id} className={`bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-300 hover:scale-[1.02] border-2 ${isSoldOut ? 'border-red-300' : 'border-gray-200'} cursor-pointer group relative`}>
                    {isSoldOut && (
                      <div className="absolute top-4 right-4 z-10">
                        <span className="bg-red-600 text-white px-4 py-2 rounded-full text-sm font-bold shadow-lg">
                          ESAURITO
                        </span>
                      </div>
                    )}
                    <div className="p-8" onClick={() => handleEventClick(event)}>
                      <h3 className="text-2xl font-bold text-gray-900 mb-4 group-hover:text-emerald-600 transition-colors">
                        {event.Title || 'Untitled Event'}
                      </h3>
                      <p className="text-gray-600 mb-6 line-clamp-3 text-base leading-relaxed">
                        {getDescriptionText(event.Description)}
                      </p>
                      <div className="space-y-3 mb-6">
                        <div className="flex items-center text-base text-gray-700 bg-emerald-50 p-3 rounded-lg">
                          <CalendarDaysIcon className="w-5 h-5 mr-3 text-emerald-600 flex-shrink-0" />
                          <span className="font-medium">{event.date ? new Date(event.date).toLocaleDateString('it-IT', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' }) : 'Data da definire'}</span>
                        </div>
                        {event.location && (
                          <div className="flex items-center text-base text-gray-700 bg-blue-50 p-3 rounded-lg">
                            <MapPinIcon className="w-5 h-5 mr-3 text-blue-600 flex-shrink-0" />
                            <span className="font-medium">{event.location}</span>
                          </div>
                        )}
                      </div>
                      <div className="text-center pt-4 border-t border-gray-200">
                        <span className={`text-base font-semibold inline-flex items-center gap-2 ${isSoldOut ? 'text-red-600' : 'text-emerald-600 group-hover:text-emerald-700'}`}>
                          {isSoldOut ? 'Evento Esaurito - Lista d\'Attesa' : 'Clicca per vedere i dettagli'}
                          <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                          </svg>
                        </span>
                      </div>
                    </div>
                  </div>
                );
              })}
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