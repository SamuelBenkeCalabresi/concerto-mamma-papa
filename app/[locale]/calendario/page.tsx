import { getTranslations } from 'next-intl/server';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import EventCard from '@/components/EventCard';
import { mockEvents } from '@/data/mockEvents';

export default async function ConcertsPage() {
  const t = await getTranslations();

  return (
    <main className="min-h-screen bg-base-100">
      <Header />
      
      <div className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold text-neutral mb-4">
              {t('Events.title')}
            </h1>
            <p className="text-lg text-neutral/70 max-w-2xl mx-auto">
              {t('Events.subtitle')}
            </p>
          </div>

          <div className="flex flex-col lg:flex-row gap-8">
            {/* Filters Sidebar */}
            <aside className="lg:w-64 flex-shrink-0">
              <div className="bg-white rounded-lg shadow-md p-6 sticky top-24">
                <h3 className="font-semibold text-lg mb-4">Filtra Concerti</h3>
                
                <div className="space-y-4">
                  <div>
                    <label className="label">
                      <span className="label-text font-medium">Mese</span>
                    </label>
                    <select className="select select-bordered w-full select-sm">
                      <option>Tutti i mesi</option>
                      <option>Marzo 2024</option>
                      <option>Aprile 2024</option>
                      <option>Maggio 2024</option>
                    </select>
                  </div>

                  <div>
                    <label className="label">
                      <span className="label-text font-medium">Età</span>
                    </label>
                    <select className="select select-bordered w-full select-sm">
                      <option>Tutte le età</option>
                      <option>0-2 anni</option>
                      <option>3-4 anni</option>
                      <option>5-6 anni</option>
                    </select>
                  </div>

                  <div>
                    <label className="label">
                      <span className="label-text font-medium">Prezzo</span>
                    </label>
                    <select className="select select-bordered w-full select-sm">
                      <option>Tutti i prezzi</option>
                      <option>Gratuiti</option>
                      <option>0-15€</option>
                      <option>15-25€</option>
                    </select>
                  </div>

                  <div>
                    <label className="label">
                      <span className="label-text font-medium">Disponibilità</span>
                    </label>
                    <div className="form-control">
                      <label className="label cursor-pointer">
                        <span className="label-text">Solo posti disponibili</span>
                        <input type="checkbox" className="checkbox checkbox-primary checkbox-sm" defaultChecked />
                      </label>
                    </div>
                  </div>
                </div>

                <button className="btn btn-primary w-full mt-6 btn-sm">
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
                <select className="select select-bordered select-sm">
                  <option>Ordina per data</option>
                  <option>Ordina per prezzo</option>
                  <option>Ordina per nome</option>
                </select>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                {mockEvents.map((event) => (
                  <EventCard key={event.id} event={event} />
                ))}
              </div>

              {/* Pagination */}
              <div className="flex justify-center mt-12">
                <div className="join">
                  <button className="join-item btn btn-disabled">«</button>
                  <button className="join-item btn btn-active">1</button>
                  <button className="join-item btn">2</button>
                  <button className="join-item btn">»</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <Footer />
    </main>
  );
}