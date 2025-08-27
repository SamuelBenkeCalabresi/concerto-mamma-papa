import { getTranslations } from 'next-intl/server';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import Link from 'next/link';
import { 
  AcademicCapIcon,
  UserGroupIcon,
  CalendarDaysIcon,
  ClockIcon,
  MapPinIcon,
  DocumentTextIcon,
  VideoCameraIcon,
  PresentationChartBarIcon,
  BookOpenIcon,
  ShieldCheckIcon,
  StarIcon,
  CheckCircleIcon
} from '@heroicons/react/24/outline';

export default async function ConvegniPage() {
  const t = await getTranslations();

  const upcomingEvents = [
    {
      id: 1,
      title: "L'Educazione Musicale nella Prima Infanzia",
      subtitle: "Metodi e approcci innovativi per bambini 0-6 anni",
      date: "2024-04-15",
      time: "09:00 - 17:00",
      location: "Auditorium Conservatorio, Milano",
      type: "Convegno",
      speakers: ["Dott.ssa Maria Montessori", "Prof. Zoltán Kodály", "Maestro Carl Orff"],
      price: "150€",
      earlyBird: "120€",
      capacity: "200 partecipanti",
      credits: "8 crediti ECM",
      description: "Una giornata dedicata ai professionisti dell'educazione musicale infantile per esplorare i metodi più efficaci e le ricerche più recenti nel campo.",
      highlights: [
        "Neuroscienze e sviluppo musicale",
        "Il metodo Kodály applicato ai piccoli",
        "Musica e sviluppo emotivo",
        "Workshop pratici con strumenti"
      ],
      status: "Posti disponibili"
    },
    {
      id: 2,
      title: "Musicoterapia per Bambini con Bisogni Speciali",
      subtitle: "Strumenti e tecniche per l'inclusione attraverso la musica",
      date: "2024-05-20",
      time: "14:00 - 18:00",
      location: "Centro Studi Musicali, Roma",
      type: "Seminario",
      speakers: ["Dott. Paul Nordoff", "Dott.ssa Clive Robbins"],
      price: "80€",
      earlyBird: "65€",
      capacity: "50 partecipanti",
      credits: "4 crediti ECM",
      description: "Un seminario specialistico dedicato all'uso della musicoterapia per bambini con esigenze educative speciali.",
      highlights: [
        "Tecniche di musicoterapia attiva",
        "Caso studio: autismo e musica",
        "Strumenti adattivi",
        "Valutazione dei progressi"
      ],
      status: "Ultimi posti"
    },
    {
      id: 3,
      title: "Il Ruolo dei Genitori nell'Educazione Musicale",
      subtitle: "Come supportare lo sviluppo musicale a casa",
      date: "2024-06-10",
      time: "10:00 - 13:00",
      location: "Online - Piattaforma Zoom",
      type: "Webinar",
      speakers: ["Dott.ssa Elena Gordon", "Maestro Shinichi Suzuki"],
      price: "45€",
      earlyBird: "35€",
      capacity: "Illimitato",
      credits: "3 crediti formativi",
      description: "Un webinar per genitori ed educatori su come creare un ambiente musicale stimolante in famiglia.",
      highlights: [
        "Creare routine musicali quotidiane",
        "Scegliere gli strumenti giusti",
        "Musica e sviluppo del linguaggio",
        "Attività pratiche per casa"
      ],
      status: "Aperte le iscrizioni"
    }
  ];

  const pastEvents = [
    {
      title: "Ritmo e Movimento nella Didattica Musicale",
      date: "Marzo 2024",
      participants: "180 partecipanti",
      rating: 4.8,
      materials: "Disponibili"
    },
    {
      title: "Tecnologie Digitali per l'Educazione Musicale",
      date: "Febbraio 2024",
      participants: "95 partecipanti",
      rating: 4.6,
      materials: "Disponibili"
    },
    {
      title: "La Voce del Bambino: Canto e Sviluppo",
      date: "Gennaio 2024",
      participants: "150 partecipanti",
      rating: 4.9,
      materials: "Disponibili"
    }
  ];

  const targets = [
    {
      icon: <AcademicCapIcon className="h-8 w-8" />,
      title: "Educatori Musicali",
      description: "Insegnanti di musica per l'infanzia e professionisti del settore"
    },
    {
      icon: <UserGroupIcon className="h-8 w-8" />,
      title: "Genitori",
      description: "Mamme e papà interessati allo sviluppo musicale dei propri figli"
    },
    {
      icon: <BookOpenIcon className="h-8 w-8" />,
      title: "Studenti",
      description: "Studenti di pedagogia musicale e scienze dell'educazione"
    },
    {
      icon: <ShieldCheckIcon className="h-8 w-8" />,
      title: "Terapisti",
      description: "Musicoterapisti e professionisti della riabilitazione"
    }
  ];

  return (
    <main className="min-h-screen bg-base-100">
      <Header />
      
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-primary/8 to-base-200/60 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="flex justify-center mb-6">
              <div className="bg-primary/10 rounded-full p-4">
                <PresentationChartBarIcon className="h-16 w-16 text-primary" />
              </div>
            </div>
            <h1 className="text-4xl sm:text-5xl font-bold text-neutral mb-6">
              Convegni e Seminari
            </h1>
            <p className="text-xl text-neutral/70 max-w-3xl mx-auto">
              Formazione professionale e aggiornamento per educatori, genitori e professionisti della musica infantile
            </p>
          </div>
        </div>
      </section>

      {/* Target Audience */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-neutral mb-4">A Chi si Rivolgono</h2>
            <p className="text-lg text-neutral/70 max-w-2xl mx-auto">
              I nostri eventi formativi sono pensati per diverse figure professionali e interessati
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {targets.map((target, index) => (
              <div key={index} className="card bg-base-100 shadow-lg hover:shadow-xl transition-shadow text-center">
                <div className="card-body">
                  <div className="bg-primary/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 text-primary">
                    {target.icon}
                  </div>
                  <h3 className="card-title justify-center text-lg mb-2">{target.title}</h3>
                  <p className="text-neutral/70 text-sm">{target.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Upcoming Events */}
      <section className="py-16 bg-base-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-neutral mb-4">Prossimi Eventi</h2>
            <p className="text-lg text-neutral/70 max-w-2xl mx-auto">
              Scopri i nostri prossimi appuntamenti formativi
            </p>
          </div>

          <div className="space-y-8">
            {upcomingEvents.map((event) => (
              <div key={event.id} className="card lg:card-side shadow-xl bg-base-100">
                <figure className="lg:w-80 bg-gradient-to-br from-primary/20 to-accent/20">
                  <div className="flex items-center justify-center h-full p-8">
                    <div className="text-center">
                      <div className="text-6xl mb-4">
                        {event.type === 'Convegno' ? '🎓' : event.type === 'Seminario' ? '📚' : '💻'}
                      </div>
                      <div className="badge badge-primary">{event.type}</div>
                    </div>
                  </div>
                </figure>
                
                <div className="card-body lg:flex-1">
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="card-title text-2xl">{event.title}</h3>
                    <div className={`badge ${
                      event.status === 'Posti disponibili' ? 'badge-success' :
                      event.status === 'Ultimi posti' ? 'badge-warning' : 'badge-info'
                    }`}>
                      {event.status}
                    </div>
                  </div>
                  
                  <p className="text-lg text-primary font-medium mb-2">{event.subtitle}</p>
                  <p className="text-neutral/70 mb-4">{event.description}</p>
                  
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4 text-sm">
                    <div className="flex items-center">
                      <CalendarDaysIcon className="h-4 w-4 text-primary mr-2" />
                      <span>{new Date(event.date).toLocaleDateString('it-IT')}</span>
                    </div>
                    <div className="flex items-center">
                      <ClockIcon className="h-4 w-4 text-primary mr-2" />
                      <span>{event.time}</span>
                    </div>
                    <div className="flex items-center">
                      <MapPinIcon className="h-4 w-4 text-primary mr-2" />
                      <span className="truncate">{event.location}</span>
                    </div>
                    <div className="flex items-center">
                      <UserGroupIcon className="h-4 w-4 text-primary mr-2" />
                      <span>{event.capacity}</span>
                    </div>
                  </div>

                  <div className="mb-4">
                    <h4 className="font-semibold mb-2">Programma:</h4>
                    <ul className="grid grid-cols-1 md:grid-cols-2 gap-1 text-sm">
                      {event.highlights.map((highlight, idx) => (
                        <li key={idx} className="flex items-start">
                          <CheckCircleIcon className="h-4 w-4 text-primary mr-2 mt-0.5 flex-shrink-0" />
                          {highlight}
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="text-sm space-y-1">
                      <div className="flex items-center">
                        <span className="font-semibold text-lg text-primary mr-2">{event.price}</span>
                        <span className="text-neutral/60">({event.earlyBird} early bird)</span>
                      </div>
                      <div className="text-neutral/60">{event.credits}</div>
                    </div>
                    
                    <div className="card-actions">
                      <button className="btn btn-ghost btn-sm">
                        Dettagli
                      </button>
                      <button className="btn btn-primary btn-sm">
                        Iscriviti
                      </button>
                    </div>
                  </div>

                  <div className="mt-3">
                    <p className="text-xs text-neutral/60">
                      <strong>Relatori:</strong> {event.speakers.join(', ')}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Past Events */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-neutral mb-4">Eventi Passati</h2>
            <p className="text-lg text-neutral/70 max-w-2xl mx-auto">
              Guarda cosa abbiamo realizzato e scarica i materiali formativi
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {pastEvents.map((event, index) => (
              <div key={index} className="card bg-base-100 shadow-lg hover:shadow-xl transition-shadow">
                <div className="card-body">
                  <h3 className="card-title text-lg mb-2">{event.title}</h3>
                  <div className="space-y-2 text-sm text-neutral/70 mb-4">
                    <div className="flex justify-between">
                      <span>Data:</span>
                      <span>{event.date}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Partecipanti:</span>
                      <span>{event.participants}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span>Valutazione:</span>
                      <div className="flex items-center">
                        <div className="flex text-primary mr-1">
                          {[...Array(5)].map((_, i) => (
                            <StarIcon key={i} className={`h-3 w-3 ${i < Math.floor(event.rating) ? 'fill-current' : ''}`} />
                          ))}
                        </div>
                        <span className="font-medium">{event.rating}</span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="card-actions justify-between">
                    <div className="badge badge-outline badge-sm">
                      {event.materials}
                    </div>
                    <div className="space-x-2">
                      <button className="btn btn-ghost btn-xs">
                        <DocumentTextIcon className="h-4 w-4 mr-1" />
                        Materiali
                      </button>
                      <button className="btn btn-ghost btn-xs">
                        <VideoCameraIcon className="h-4 w-4 mr-1" />
                        Video
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Newsletter Section */}
      <section className="py-16 bg-primary text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-3xl font-bold mb-4">Rimani Aggiornato</h2>
            <p className="text-xl mb-8 opacity-90">
              Iscriviti alla nostra newsletter per ricevere informazioni sui prossimi eventi formativi
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
              <p className="text-sm opacity-75 mt-2">
                Riceverai massimo 2 email al mese con le novità sui nostri eventi
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Contact for Corporate */}
      <section className="py-16 bg-base-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-neutral mb-4">Formazione Aziendale</h2>
            <p className="text-lg text-neutral/70 max-w-2xl mx-auto mb-8">
              Organizziamo anche corsi di formazione personalizzati per scuole, asili nido e istituzioni educative
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
              <div className="text-center">
                <div className="text-4xl mb-2">🏫</div>
                <h3 className="font-semibold">Scuole dell'Infanzia</h3>
                <p className="text-sm text-neutral/70">Corsi per educatori</p>
              </div>
              <div className="text-center">
                <div className="text-4xl mb-2">👶</div>
                <h3 className="font-semibold">Asili Nido</h3>
                <p className="text-sm text-neutral/70">Formazione specializzata 0-3</p>
              </div>
              <div className="text-center">
                <div className="text-4xl mb-2">🎼</div>
                <h3 className="font-semibold">Conservatori</h3>
                <p className="text-sm text-neutral/70">Didattica musicale infantile</p>
              </div>
            </div>
            
            <Link href="/it/contatti" className="btn btn-primary btn-lg">
              Richiedi Informazioni
            </Link>
          </div>
        </div>
      </section>
      
      <Footer />
    </main>
  );
}