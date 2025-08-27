import { getTranslations } from 'next-intl/server';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import Link from 'next/link';
import { 
  CalendarDaysIcon,
  ClockIcon,
  MapPinIcon,
  UserGroupIcon,
  TicketIcon,
  MagnifyingGlassIcon,
  FunnelIcon,
  PhotoIcon,
  VideoCameraIcon,
  StarIcon,
  HeartIcon,
  EyeIcon
} from '@heroicons/react/24/outline';
import { HeartIcon as HeartIconSolid } from '@heroicons/react/24/solid';

export default async function ArchivioPage() {
  const t = await getTranslations();

  const archivedEvents = [
    {
      id: 1,
      title: "Natale in Musica - Concerto Speciale",
      description: "Un magico concerto natalizio con le più belle melodie della tradizione",
      date: "2023-12-15",
      time: "16:00",
      location: "Teatro alla Scala, Milano",
      duration: "75 min",
      ageRange: { min: 0, max: 6 },
      price: 25,
      attendees: 180,
      rating: 4.9,
      category: "Concerto",
      season: "2023-2024",
      featured: true,
      hasPhotos: true,
      hasVideo: true,
      tags: ["Natale", "Tradizionale", "Famiglia", "Coro"]
    },
    {
      id: 2,
      title: "Primavera Musicale - I Suoni della Natura",
      description: "Un viaggio sonoro attraverso i suoni della primavera e della natura",
      date: "2023-04-20",
      time: "10:30",
      location: "Parco Sempione, Milano",
      duration: "60 min",
      ageRange: { min: 1, max: 5 },
      price: 0,
      attendees: 95,
      rating: 4.7,
      category: "Concerto all'aperto",
      season: "2023",
      featured: false,
      hasPhotos: true,
      hasVideo: false,
      tags: ["Primavera", "Natura", "All'aperto", "Gratuito"]
    },
    {
      id: 3,
      title: "Halloween Musicale - Mostri Gentili",
      description: "Un concerto divertente con mostri musicali amichevoli",
      date: "2023-10-31",
      time: "15:00",
      location: "Auditorium San Fedele, Milano",
      duration: "50 min",
      ageRange: { min: 2, max: 6 },
      price: 18,
      attendees: 120,
      rating: 4.8,
      category: "Concerto Tematico",
      season: "2023-2024",
      featured: false,
      hasPhotos: true,
      hasVideo: true,
      tags: ["Halloween", "Divertente", "Costumi", "Interattivo"]
    },
    {
      id: 4,
      title: "Estate Musicale - Concerti al Tramonto",
      description: "Serie di concerti estivi nel verde per tutta la famiglia",
      date: "2023-07-10",
      time: "19:00",
      location: "Giardini Indro Montanelli, Milano",
      duration: "45 min",
      ageRange: { min: 0, max: 8 },
      price: 12,
      attendees: 85,
      rating: 4.6,
      category: "Concerto all'aperto",
      season: "2023",
      featured: false,
      hasPhotos: true,
      hasVideo: false,
      tags: ["Estate", "Tramonto", "All'aperto", "Rilassante"]
    },
    {
      id: 5,
      title: "Carnevale in Musica",
      description: "Maschere, colori e tanta musica per festeggiare il carnevale",
      date: "2023-02-18",
      time: "16:30",
      location: "Teatro Franco Parenti, Milano",
      duration: "55 min",
      ageRange: { min: 1, max: 6 },
      price: 20,
      attendees: 140,
      rating: 4.8,
      category: "Concerto Tematico",
      season: "2022-2023",
      featured: true,
      hasPhotos: true,
      hasVideo: true,
      tags: ["Carnevale", "Maschere", "Colorato", "Festa"]
    },
    {
      id: 6,
      title: "Piccoli Mozart - Concerto Classico",
      description: "I capolavori di Mozart adattati per i più piccoli",
      date: "2023-01-25",
      time: "11:00",
      location: "Conservatorio Giuseppe Verdi, Milano",
      duration: "40 min",
      ageRange: { min: 3, max: 7 },
      price: 22,
      attendees: 75,
      rating: 4.9,
      category: "Concerto Classico",
      season: "2022-2023",
      featured: false,
      hasPhotos: true,
      hasVideo: true,
      tags: ["Mozart", "Classico", "Educativo", "Strumentale"]
    }
  ];

  const categories = ["Tutti", "Concerto", "Concerto all'aperto", "Concerto Tematico", "Concerto Classico"];
  const seasons = ["Tutte", "2023-2024", "2023", "2022-2023"];
  const tags = ["Natale", "Primavera", "Estate", "Halloween", "Carnevale", "Mozart", "All'aperto", "Gratuito", "Famiglia", "Educativo"];

  const stats = {
    totalEvents: archivedEvents.length,
    totalAttendees: archivedEvents.reduce((sum, event) => sum + event.attendees, 0),
    averageRating: (archivedEvents.reduce((sum, event) => sum + event.rating, 0) / archivedEvents.length).toFixed(1),
    totalSeasons: 3
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('it-IT', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  return (
    <main className="min-h-screen bg-base-100">
      <Header />
      
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-primary/8 to-base-200/60 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="flex justify-center mb-6">
              <div className="bg-primary/10 rounded-full p-4">
                <CalendarDaysIcon className="h-16 w-16 text-primary" />
              </div>
            </div>
            <h1 className="text-4xl sm:text-5xl font-bold text-neutral mb-6">
              Archivio Eventi
            </h1>
            <p className="text-xl text-neutral/70 max-w-3xl mx-auto">
              Rivivi i momenti più belli dei nostri concerti passati e scopri la storia della nostra famiglia musicale
            </p>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-12 bg-base-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="text-center">
              <div className="text-3xl font-bold text-primary mb-1">{stats.totalEvents}</div>
              <div className="text-sm text-neutral/70">Eventi Realizzati</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-primary mb-1">{stats.totalAttendees.toLocaleString()}</div>
              <div className="text-sm text-neutral/70">Partecipanti Totali</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-primary mb-1">{stats.averageRating}</div>
              <div className="text-sm text-neutral/70">Valutazione Media</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-primary mb-1">{stats.totalSeasons}</div>
              <div className="text-sm text-neutral/70">Stagioni</div>
            </div>
          </div>
        </div>
      </section>

      {/* Filters Section */}
      <section className="py-8 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row gap-4 items-center">
            <div className="flex items-center gap-2 flex-1">
              <MagnifyingGlassIcon className="h-5 w-5 text-primary" />
              <input 
                type="text" 
                placeholder="Cerca eventi..." 
                className="input input-bordered input-sm flex-1 max-w-xs"
              />
            </div>
            
            <div className="flex flex-wrap gap-2 items-center">
              <FunnelIcon className="h-5 w-5 text-primary" />
              <select className="select select-bordered select-sm">
                <option>Tutte le categorie</option>
                {categories.slice(1).map(cat => (
                  <option key={cat}>{cat}</option>
                ))}
              </select>
              
              <select className="select select-bordered select-sm">
                <option>Tutte le stagioni</option>
                {seasons.slice(1).map(season => (
                  <option key={season}>{season}</option>
                ))}
              </select>

              <button className="btn btn-primary btn-sm">
                Applica Filtri
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Events Grid */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-2xl font-bold text-neutral">
              Eventi Realizzati ({archivedEvents.length})
            </h2>
            <div className="flex gap-2">
              <select className="select select-bordered select-sm">
                <option>Ordina per data</option>
                <option>Ordina per rating</option>
                <option>Ordina per partecipanti</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
            {archivedEvents.map((event) => (
              <div key={event.id} className="card bg-base-100 shadow-xl hover:shadow-2xl transition-shadow">
                <figure className="relative aspect-video bg-gradient-to-br from-primary/20 to-accent/20">
                  <div className="flex items-center justify-center h-full">
                    <div className="text-center p-4">
                      <div className="text-4xl mb-2">🎼</div>
                      <h4 className="font-semibold text-sm">{event.title}</h4>
                    </div>
                  </div>
                  
                  {event.featured && (
                    <div className="absolute top-2 left-2 badge badge-secondary gap-1">
                      <HeartIconSolid className="h-3 w-3" />
                      In Evidenza
                    </div>
                  )}
                  
                  {event.price === 0 && (
                    <div className="absolute top-2 right-2 badge badge-success">
                      Gratuito
                    </div>
                  )}

                  <div className="absolute bottom-2 right-2 flex gap-1">
                    {event.hasPhotos && (
                      <div className="badge badge-info badge-sm">
                        <PhotoIcon className="h-3 w-3 mr-1" />
                        Foto
                      </div>
                    )}
                    {event.hasVideo && (
                      <div className="badge badge-warning badge-sm">
                        <VideoCameraIcon className="h-3 w-3 mr-1" />
                        Video
                      </div>
                    )}
                  </div>
                </figure>
                
                <div className="card-body">
                  <h3 className="card-title text-lg font-bold text-neutral line-clamp-2">
                    {event.title}
                  </h3>
                  
                  <p className="text-neutral/70 text-sm mb-3 line-clamp-2">
                    {event.description}
                  </p>
                  
                  <div className="space-y-2 text-xs">
                    <div className="flex items-center text-neutral/70">
                      <CalendarDaysIcon className="h-4 w-4 mr-2 text-primary" />
                      <span className="capitalize">{formatDate(event.date)}</span>
                    </div>
                    
                    <div className="flex items-center text-neutral/70">
                      <MapPinIcon className="h-4 w-4 mr-2 text-primary" />
                      <span className="truncate">{event.location}</span>
                    </div>
                    
                    <div className="flex items-center justify-between text-neutral/70">
                      <div className="flex items-center">
                        <UserGroupIcon className="h-4 w-4 mr-1 text-primary" />
                        <span>{event.attendees} partecipanti</span>
                      </div>
                      <div className="flex items-center">
                        <StarIcon className="h-4 w-4 mr-1 text-primary fill-current" />
                        <span className="font-medium">{event.rating}</span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="divider my-3"></div>
                  
                  <div className="flex items-center justify-between mb-3">
                    <span className="badge badge-outline badge-sm">{event.category}</span>
                    <span className="text-xs text-neutral/60">{event.season}</span>
                  </div>

                  <div className="card-actions justify-between">
                    <div className="flex gap-1">
                      {event.hasPhotos && (
                        <button className="btn btn-ghost btn-xs">
                          <PhotoIcon className="h-3 w-3 mr-1" />
                          Foto
                        </button>
                      )}
                      {event.hasVideo && (
                        <button className="btn btn-ghost btn-xs">
                          <VideoCameraIcon className="h-3 w-3 mr-1" />
                          Video
                        </button>
                      )}
                    </div>
                    <button className="btn btn-primary btn-xs">
                      <EyeIcon className="h-3 w-3 mr-1" />
                      Dettagli
                    </button>
                  </div>
                  
                  {event.tags && event.tags.length > 0 && (
                    <div className="mt-3">
                      <div className="flex flex-wrap gap-1">
                        {event.tags.slice(0, 3).map((tag, index) => (
                          <span key={index} className="badge badge-outline badge-xs">
                            {tag}
                          </span>
                        ))}
                        {event.tags.length > 3 && (
                          <span className="badge badge-outline badge-xs">
                            +{event.tags.length - 3}
                          </span>
                        )}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>

          {/* Load More */}
          <div className="text-center mt-12">
            <button className="btn btn-outline">
              Carica Altri Eventi
            </button>
          </div>
        </div>
      </section>

      {/* Popular Tags */}
      <section className="py-12 bg-base-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h3 className="text-xl font-bold text-neutral mb-6 text-center">Esplora per Tema</h3>
          <div className="flex flex-wrap justify-center gap-2">
            {tags.map((tag, index) => (
              <button key={index} className="badge badge-lg badge-outline hover:badge-primary transition-colors">
                {tag}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Newsletter CTA */}
      <section className="py-16 bg-primary text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold mb-4">Non Perdere i Prossimi Eventi</h2>
          <p className="text-xl mb-8 opacity-90">
            Iscriviti alla newsletter per essere sempre aggiornato sui nostri concerti
          </p>
          <div className="max-w-md mx-auto">
            <div className="join w-full">
              <input 
                className="input input-bordered join-item flex-1 text-neutral" 
                placeholder="La tua email"
                type="email"
              />
              <button className="btn btn-secondary join-item">Iscriviti</button>
            </div>
          </div>
        </div>
      </section>
      
      <Footer />
    </main>
  );
}