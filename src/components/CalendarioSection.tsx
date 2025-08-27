'use client';

import { useState } from 'react';
import { getTranslations } from 'next-intl/server';
import EventCard from './EventCard';
import { mockEvents } from '@/data/mockEvents';

export default function CalendarioSection() {
  const [selectedMonth, setSelectedMonth] = useState('');
  const [selectedAge, setSelectedAge] = useState('');
  const [selectedPrice, setSelectedPrice] = useState('');
  const [availableOnly, setAvailableOnly] = useState(true);

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
        <aside className="lg:w-64 flex-shrink-0">
          <div className="bg-white rounded-lg shadow-lg border-2 border-primary/10 p-6 sticky top-24">
            <h3 className="font-semibold text-lg mb-4 text-primary">Filtra Concerti</h3>
            
            <div className="space-y-4">
              <div>
                <label className="label">
                  <span className="label-text font-medium">Mese</span>
                </label>
                <select 
                  className="select select-bordered select-primary w-full select-sm"
                  value={selectedMonth}
                  onChange={(e) => setSelectedMonth(e.target.value)}
                >
                  <option value="">Tutti i mesi</option>
                  <option value="2024-03">Marzo 2024</option>
                  <option value="2024-04">Aprile 2024</option>
                  <option value="2024-05">Maggio 2024</option>
                </select>
              </div>

              <div>
                <label className="label">
                  <span className="label-text font-medium">Età</span>
                </label>
                <select 
                  className="select select-bordered select-primary w-full select-sm"
                  value={selectedAge}
                  onChange={(e) => setSelectedAge(e.target.value)}
                >
                  <option value="">Tutte le età</option>
                  <option value="0-2">0-2 anni</option>
                  <option value="3-4">3-4 anni</option>
                  <option value="5">5 anni</option>
                </select>
              </div>

              <div>
                <label className="label">
                  <span className="label-text font-medium">Prezzo</span>
                </label>
                <select 
                  className="select select-bordered select-primary w-full select-sm"
                  value={selectedPrice}
                  onChange={(e) => setSelectedPrice(e.target.value)}
                >
                  <option value="">Tutti i prezzi</option>
                  <option value="free">Gratuiti</option>
                  <option value="0-15">0-15€</option>
                  <option value="15-25">15-25€</option>
                </select>
              </div>

              <div>
                <label className="label">
                  <span className="label-text font-medium">Disponibilità</span>
                </label>
                <div className="form-control">
                  <label className="label cursor-pointer">
                    <span className="label-text">Solo posti disponibili</span>
                    <input 
                      type="checkbox" 
                      className="checkbox checkbox-primary checkbox-sm" 
                      checked={availableOnly}
                      onChange={(e) => setAvailableOnly(e.target.checked)}
                    />
                  </label>
                </div>
              </div>
            </div>

            <button className="btn btn-primary w-full mt-6 btn-sm bg-primary hover:bg-primary/80 border-primary">
              Applica Filtri
            </button>
          </div>
        </aside>

        {/* Events Grid */}
        <div className="flex-1">
          <div className="flex justify-between items-center mb-6">
            <p className="text-neutral/70">
              Trovati {mockEvents.length} concerti
            </p>
            <select className="select select-bordered select-primary select-sm">
              <option>Ordina per data</option>
              <option>Ordina per prezzo</option>
              <option>Ordina per nome</option>
            </select>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
            {mockEvents.map((event) => (
              <div key={event.id} className="transform hover:scale-105 transition-transform duration-300">
                <div className="bg-gradient-to-br from-primary/5 to-primary/10 rounded-2xl shadow-lg border border-primary/20 overflow-hidden">
                  <EventCard event={event} />
                </div>
              </div>
            ))}
          </div>

          {/* Pagination */}
          <div className="flex justify-center mt-12">
            <div className="join">
              <button className="join-item btn btn-disabled">«</button>
              <button className="join-item btn btn-primary">1</button>
              <button className="join-item btn hover:btn-primary">2</button>
              <button className="join-item btn hover:btn-primary">»</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}