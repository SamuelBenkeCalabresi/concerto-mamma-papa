import { getTranslations } from 'next-intl/server';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import Link from 'next/link';
import { 
  MusicalNoteIcon, 
  UserGroupIcon,
  ClockIcon,
  CalendarDaysIcon,
  AcademicCapIcon,
  HeartIcon,
  PlayIcon,
  HandRaisedIcon,
  SparklesIcon
} from '@heroicons/react/24/outline';

export default async function CorsiPage() {
  const t = await getTranslations();

  const courses = [
    {
      id: 1,
      title: "Piccoli Musicisti (0-12 mesi)",
      description: "Prime esperienze musicali per neonati e genitori attraverso ninne nanne, filastrocche e movimenti dolci",
      age: "0-12 mesi",
      duration: "30 min",
      frequency: "1 volta/settimana",
      price: "60€/mese",
      capacity: "6 coppie",
      features: [
        "Sviluppo del legame genitore-bambino",
        "Stimolazione sensoriale attraverso la musica",
        "Rilassamento e benessere",
        "Introduzione ai ritmi naturali"
      ],
      color: "primary"
    },
    {
      id: 2,
      title: "Musicainfasce (1-2 anni)",
      description: "Esplorazione musicale per i più piccoli con strumenti semplici, movimento e scoperta dei suoni",
      age: "1-2 anni",
      duration: "45 min",
      frequency: "1 volta/settimana",
      price: "70€/mese",
      capacity: "8 coppie",
      features: [
        "Esplorazione libera degli strumenti",
        "Sviluppo della coordinazione",
        "Socializzazione con altri bambini",
        "Giochi musicali interattivi"
      ],
      color: "secondary"
    },
    {
      id: 3,
      title: "Piccola Orchestra (2-3 anni)",
      description: "Primi approcci all'ascolto guidato e alla partecipazione attiva con strumenti a percussione",
      age: "2-3 anni",
      duration: "45 min",
      frequency: "1 volta/settimana",
      price: "75€/mese",
      capacity: "10 bambini",
      features: [
        "Utilizzo di strumenti a percussione",
        "Prime canzoncine da memorizzare",
        "Sviluppo dell'ascolto attivo",
        "Coordinazione ritmo-movimento"
      ],
      color: "accent"
    },
    {
      id: 4,
      title: "Musicalmente Crescendo (3-4 anni)",
      description: "Sviluppo delle competenze musicali di base attraverso giochi, canti e primi elementi di teoria",
      age: "3-4 anni",
      duration: "50 min",
      frequency: "1 volta/settimana",
      price: "80€/mese",
      capacity: "12 bambini",
      features: [
        "Riconoscimento di suoni alti e bassi",
        "Prime nozioni di forte e piano",
        "Canti corali semplici",
        "Giochi di imitazione musicale"
      ],
      color: "success"
    },
    {
      id: 5,
      title: "Piccoli Compositori (4-5 anni)",
      description: "Creatività musicale attraverso l'improvvisazione, primi elementi di composizione e uso di strumenti",
      age: "4-5 anni",
      duration: "60 min",
      frequency: "1 volta/settimana",
      price: "85€/mese",
      capacity: "12 bambini",
      features: [
        "Creazione di piccole melodie",
        "Uso di strumenti melodici semplici",
        "Primi elementi di lettura musicale",
        "Sviluppo della creatività personale"
      ],
      color: "warning"
    }
  ];

  const benefits = [
    {
      icon: <AcademicCapIcon className="h-8 w-8" />,
      title: "Sviluppo Cognitivo",
      description: "La musica stimola le connessioni neurali e favorisce l'apprendimento"
    },
    {
      icon: <HeartIcon className="h-8 w-8" />,
      title: "Benessere Emotivo",
      description: "Espressione delle emozioni e sviluppo dell'equilibrio interiore"
    },
    {
      icon: <UserGroupIcon className="h-8 w-8" />,
      title: "Socializzazione",
      description: "Interazione con altri bambini in un ambiente stimolante e sicuro"
    },
    {
      icon: <SparklesIcon className="h-8 w-8" />,
      title: "Creatività",
      description: "Sviluppo della fantasia e della capacità espressiva personale"
    }
  ];

  const methodology = [
    {
      title: "Apprendimento Ludico",
      description: "Ogni attività è proposta come gioco per mantenere alta l'attenzione e il divertimento",
      icon: "🎲"
    },
    {
      title: "Approccio Multisensoriale", 
      description: "Coinvolgiamo tutti i sensi per un'esperienza di apprendimento completa e duratura",
      icon: "🌈"
    },
    {
      title: "Rispetto dei Tempi",
      description: "Ogni bambino ha i suoi ritmi di apprendimento che vengono rispettati e valorizzati",
      icon: "⏰"
    },
    {
      title: "Partecipazione Attiva",
      description: "I bambini sono sempre protagonisti delle attività, mai spettatori passivi",
      icon: "🙋‍♀️"
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
                <MusicalNoteIcon className="h-16 w-16 text-primary" />
              </div>
            </div>
            <h1 className="text-4xl sm:text-5xl font-bold text-neutral mb-6">
              Corsi Musicali 0-5 Anni
            </h1>
            <p className="text-xl text-neutral/70 max-w-3xl mx-auto">
              Percorsi musicali pensati per ogni fase di crescita del tuo bambino, dalla nascita ai 5 anni
            </p>
          </div>
        </div>
      </section>

      {/* Courses Section */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-neutral mb-4">I Nostri Corsi</h2>
            <p className="text-lg text-neutral/70 max-w-2xl mx-auto">
              Scopri il corso perfetto per l'età del tuo bambino
            </p>
          </div>

          <div className="space-y-8">
            {courses.map((course, index) => (
              <div key={course.id} className={`card lg:card-side shadow-xl ${index % 2 === 0 ? 'bg-base-100' : 'bg-base-200'}`}>
                <figure className={`lg:w-80 bg-gradient-to-br from-${course.color}/20 to-${course.color}/10`}>
                  <div className="flex items-center justify-center h-full p-8">
                    <div className="text-center">
                      <div className="text-6xl mb-4">🎵</div>
                      <div className={`text-${course.color} font-bold text-lg`}>
                        {course.age}
                      </div>
                    </div>
                  </div>
                </figure>
                
                <div className="card-body lg:flex-1">
                  <h3 className="card-title text-2xl mb-2">{course.title}</h3>
                  <p className="text-neutral/70 mb-4">{course.description}</p>
                  
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4 text-sm">
                    <div className="flex items-center">
                      <UserGroupIcon className="h-4 w-4 text-primary mr-2" />
                      <span>{course.age}</span>
                    </div>
                    <div className="flex items-center">
                      <ClockIcon className="h-4 w-4 text-primary mr-2" />
                      <span>{course.duration}</span>
                    </div>
                    <div className="flex items-center">
                      <CalendarDaysIcon className="h-4 w-4 text-primary mr-2" />
                      <span>{course.frequency}</span>
                    </div>
                    <div className="flex items-center font-semibold text-primary">
                      <span>{course.price}</span>
                    </div>
                  </div>

                  <div className="mb-4">
                    <h4 className="font-semibold mb-2">Cosa faremo:</h4>
                    <ul className="grid grid-cols-1 md:grid-cols-2 gap-1 text-sm">
                      {course.features.map((feature, idx) => (
                        <li key={idx} className="flex items-start">
                          <span className="text-primary mr-2">•</span>
                          {feature}
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="flex items-center justify-between">
                    <span className="text-sm text-neutral/60">
                      Max {course.capacity}
                    </span>
                    <div className="card-actions">
                      <button className={`btn btn-${course.color} btn-sm`}>
                        Prenota Prova Gratuita
                      </button>
                      <button className="btn btn-ghost btn-sm">
                        Info e Orari
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-16 bg-base-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-neutral mb-4">Perché Scegliere i Nostri Corsi</h2>
            <p className="text-lg text-neutral/70 max-w-2xl mx-auto">
              I benefici della musica per lo sviluppo del bambino
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {benefits.map((benefit, index) => (
              <div key={index} className="card bg-base-100 shadow-lg hover:shadow-xl transition-shadow text-center">
                <div className="card-body">
                  <div className="bg-primary/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 text-primary">
                    {benefit.icon}
                  </div>
                  <h3 className="card-title justify-center text-lg mb-2">{benefit.title}</h3>
                  <p className="text-neutral/70 text-sm">{benefit.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Methodology Section */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-neutral mb-4">La Nostra Metodologia</h2>
            <p className="text-lg text-neutral/70 max-w-2xl mx-auto">
              Un approccio pedagogico studiato per valorizzare ogni bambino
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {methodology.map((method, index) => (
              <div key={index} className="flex items-start space-x-4 p-6 bg-base-100 rounded-lg shadow-md">
                <div className="text-4xl flex-shrink-0">{method.icon}</div>
                <div>
                  <h3 className="text-xl font-semibold mb-2">{method.title}</h3>
                  <p className="text-neutral/70">{method.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Schedule Section */}
      <section className="py-16 bg-base-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-neutral mb-4">Orari e Sedi</h2>
            <p className="text-lg text-neutral/70 max-w-2xl mx-auto">
              Trova la sede più comoda per te
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="card bg-base-100 shadow-lg">
              <div className="card-body">
                <h3 className="card-title mb-4">📍 Sede Milano Centro</h3>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span>Piccoli Musicisti (0-12m)</span>
                    <span className="font-medium">Mar 10:00 - Gio 11:00</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Musicainfasce (1-2a)</span>
                    <span className="font-medium">Lun 16:00 - Mer 10:30</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Piccola Orchestra (2-3a)</span>
                    <span className="font-medium">Mar 16:30 - Ven 10:00</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Musicalmente Crescendo (3-4a)</span>
                    <span className="font-medium">Lun 17:30 - Gio 16:00</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Piccoli Compositori (4-5a)</span>
                    <span className="font-medium">Mer 17:00 - Ven 16:30</span>
                  </div>
                </div>
                <div className="divider"></div>
                <p className="text-xs text-neutral/60">Via Roma 15, Milano</p>
              </div>
            </div>

            <div className="card bg-base-100 shadow-lg">
              <div className="card-body">
                <h3 className="card-title mb-4">📍 Sede Milano Nord</h3>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span>Piccoli Musicisti (0-12m)</span>
                    <span className="font-medium">Lun 11:00 - Mer 10:00</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Musicainfasce (1-2a)</span>
                    <span className="font-medium">Mar 10:30 - Gio 16:00</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Piccola Orchestra (2-3a)</span>
                    <span className="font-medium">Lun 16:30 - Ven 11:00</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Musicalmente Crescendo (3-4a)</span>
                    <span className="font-medium">Mar 17:00 - Ven 16:00</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Piccoli Compositori (4-5a)</span>
                    <span className="font-medium">Mer 16:30 - Gio 17:30</span>
                  </div>
                </div>
                <div className="divider"></div>
                <p className="text-xs text-neutral/60">Via Garibaldi 42, Milano</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-primary text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold mb-4">Prova Gratuita Disponibile!</h2>
          <p className="text-xl mb-8 opacity-90">
            Partecipa a una lezione di prova gratuita e scopri il corso perfetto per il tuo bambino
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="btn btn-secondary btn-lg">
              Prenota Prova Gratuita
            </button>
            <Link href="/it/contatti" className="btn btn-outline btn-lg text-white border-white hover:bg-white hover:text-primary">
              Richiedi Informazioni
            </Link>
          </div>
        </div>
      </section>
      
      <Footer />
    </main>
  );
}