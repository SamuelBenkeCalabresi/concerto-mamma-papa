import { getTranslations } from 'next-intl/server';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import ModernGallerySection from '@/components/ModernGallerySection';
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
  SparklesIcon,
  MapPinIcon,
  PhoneIcon,
  EnvelopeIcon
} from '@heroicons/react/24/outline';

export default async function CorsiPage() {
  const t = await getTranslations('CoursesPage');

  const courseLocations = [
    {
      id: 1,
      name: "Centro Ottava – Il Centro della Formazione Musicale",
      address: "via Francesco dell'Anno 26",
      instructor: "Monserrat Olavarria Balmaceda",
      phone: "3423711750",
      schedule: [
        { day: "Lunedì", times: [
          { time: "h 16.30", age: "(12/36 mesi)" },
          { time: "h 17.30", age: "(3/5 anni)" }
        ]}
      ]
    },
    {
      id: 2,
      name: "Calendula e Zucchero filato",
      address: "via Andrea Meldola 470",
      instructor: "Rui Lopes Ferreira",
      phone: "3478674531",
      schedule: [
        { day: "Martedì", times: [
          { time: "h 10", age: "(0-1 anno)" },
          { time: "h 16.45", age: "(1-3 anni)" },
          { time: "h 17.30", age: "(4-6 anni)" }
        ]}
      ]
    },
    {
      id: 3,
      name: "Ass. Musicale Eschilo",
      address: "Sede in via dei Carpazi 35",
      instructor: "Rui Lopes Ferreira",
      phone: "3396506080",
      schedule: [
        { day: "Sabato", times: [
          { time: "h 17.00", age: "(0-5 anni)" }
        ]}
      ]
    },
    {
      id: 4,
      name: "Scatola Sonora",
      address: "via Ferruccio 32/b",
      instructor: "Sabina Losi",
      phone: "3402753851 – 06.44702991",
      schedule: [
        { day: "Lunedì", times: [
          { time: "h 16.45", age: "(3-5 anni)" }
        ]},
        { day: "Giovedì", times: [
          { time: "h 16.45", age: "(0-3 anni)" }
        ]}
      ]
    },
    {
      id: 5,
      name: "Ass. La Chiave di FA",
      address: "Via Maurizio Quadrio 21/23",
      instructor: "Amanda Malafarina e Davide Di Lecce",
      email: "a.f.lachiavedifa@gmail.com",
      schedule: [
        { day: "Venerdì", times: [
          { time: "h 16.30", age: "(0-3anni)" },
          { time: "h 17.15", age: "(3-6 anni)" }
        ]},
        { day: "Sabato", times: [
          { time: "h 10.45", age: "(0-3 anni)" },
          { time: "h 11.30", age: "(3-6 anni)" }
        ]}
      ]
    }
  ];

  const benefits = [
    {
      icon: <AcademicCapIcon className="h-8 w-8" />,
      title: t('benefits.0.title'),
      description: t('benefits.0.description')
    },
    {
      icon: <HeartIcon className="h-8 w-8" />,
      title: t('benefits.1.title'),
      description: t('benefits.1.description')
    },
    {
      icon: <UserGroupIcon className="h-8 w-8" />,
      title: t('benefits.2.title'),
      description: t('benefits.2.description')
    },
    {
      icon: <SparklesIcon className="h-8 w-8" />,
      title: t('benefits.3.title'),
      description: t('benefits.3.description')
    }
  ];

  const methodology = [
    {
      title: t('methodology.0.title'),
      description: t('methodology.0.description'),
      icon: "🎲"
    },
    {
      title: t('methodology.1.title'), 
      description: t('methodology.1.description'),
      icon: "🌈"
    },
    {
      title: t('methodology.2.title'),
      description: t('methodology.2.description'),
      icon: "⏰"
    },
    {
      title: t('methodology.3.title'),
      description: t('methodology.3.description'),
      icon: "🙋‍♀️"
    }
  ];

  return (
    <main className="min-h-screen bg-base-100">
      <Header />
      
      {/* Hero Section */}
      <section className="relative overflow-hidden">
        <div className="relative min-h-[60vh] bg-gradient-to-br from-blue-900 via-blue-800 to-purple-900">
          <div className="absolute inset-0 bg-gradient-to-r from-black/40 via-black/20 to-black/40"></div>
          
          {/* Decorative Musical Elements */}
          <div className="absolute inset-0 overflow-hidden">
            <div className="absolute top-16 left-8 w-20 h-20 opacity-10">
              <MusicalNoteIcon className="w-full h-full text-white animate-pulse" />
            </div>
            <div className="absolute top-32 right-16 w-16 h-16 opacity-20">
              <svg className="w-full h-full text-white animate-bounce" fill="currentColor" viewBox="0 0 20 20" style={{animationDuration: '3s'}}>
                <path fillRule="evenodd" d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" clipRule="evenodd" />
              </svg>
            </div>
            <div className="absolute bottom-20 left-12 w-24 h-24 opacity-15">
              <AcademicCapIcon className="w-full h-full text-white" />
            </div>
            <div className="absolute top-40 left-1/4 text-white/20 text-3xl animate-bounce">♪</div>
            <div className="absolute top-20 right-1/4 text-white/20 text-4xl animate-pulse">♫</div>
            <div className="absolute bottom-32 right-1/3 text-white/20 text-2xl animate-bounce">♪</div>
          </div>

          <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
            <div className="text-center">
              <div className="inline-flex items-center bg-white/10 backdrop-blur-sm text-white rounded-full px-4 py-2 mb-6">
                <AcademicCapIcon className="w-5 h-5 mr-2" />
                <span className="text-sm font-medium">{t('tag')}</span>
              </div>
              
              <h1 className="text-4xl lg:text-6xl font-bold text-white leading-tight mb-6">
                <span className="block">{t('title')}</span>
                <span className="block text-blue-300">{t('titleHighlight')}</span>
              </h1>
              
              <div className="bg-white/95 backdrop-blur-sm rounded-2xl shadow-2xl p-6 lg:p-8 border border-white/20 max-w-4xl mx-auto">
                <p className="text-lg text-gray-700 leading-relaxed">
                  {t('description')}
                </p>
                <br />
                <p className="text-lg text-gray-700 leading-relaxed">
                  {t('description2')}
                </p>
              </div>
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

      {/* Course Locations Section */}
      <section className="py-16 bg-base-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-neutral mb-4">{t('locationsTitle')}</h2>
            <p className="text-xl text-neutral/70 max-w-3xl mx-auto">
              {t('locationsDescription')}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {courseLocations.map((location, index) => (
              <div key={location.id} className="relative group">
                <div className="bg-gradient-to-br from-blue-50 to-purple-50 rounded-3xl shadow-xl hover:shadow-2xl border border-blue-200/50 hover:border-blue-300/70 overflow-hidden transition-all duration-300 transform group-hover:scale-105 p-6">
                  
                  {/* Header */}
                  <div className="mb-6">
                    <div className="flex items-center justify-center w-16 h-16 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full mb-4 mx-auto">
                      <MusicalNoteIcon className="w-8 h-8 text-white" />
                    </div>
                    <h3 className="text-lg font-bold text-center text-gray-800 mb-2">
                      {location.name}
                    </h3>
                  </div>

                  {/* Address */}
                  <div className="flex items-start mb-4">
                    <MapPinIcon className="w-5 h-5 text-blue-600 mr-3 mt-0.5 flex-shrink-0" />
                    <p className="text-gray-700 text-sm">
                      {location.address}
                    </p>
                  </div>

                  {/* Instructor */}
                  <div className="flex items-start mb-4">
                    <UserGroupIcon className="w-5 h-5 text-blue-600 mr-3 mt-0.5 flex-shrink-0" />
                    <div>
                      <p className="text-gray-600 text-xs mb-1">{t('instructor')}</p>
                      <p className="text-gray-800 text-sm font-medium">
                        {location.instructor}
                      </p>
                    </div>
                  </div>

                  {/* Contact */}
                  <div className="flex items-start mb-6">
                    {location.email ? (
                      <EnvelopeIcon className="w-5 h-5 text-blue-600 mr-3 mt-0.5 flex-shrink-0" />
                    ) : (
                      <PhoneIcon className="w-5 h-5 text-blue-600 mr-3 mt-0.5 flex-shrink-0" />
                    )}
                    <div>
                      <p className="text-gray-600 text-xs mb-1">{t('info')}</p>
                      <p className="text-gray-800 text-sm font-medium">
                        {location.email || location.phone}
                      </p>
                    </div>
                  </div>

                  {/* Schedule */}
                  <div className="space-y-3">
                    {location.schedule.map((scheduleDay, dayIndex) => (
                      <div key={dayIndex}>
                        <p className="text-blue-700 font-semibold text-sm mb-2">
                          {t(`days.${scheduleDay.day}` as any)}:
                        </p>
                        <div className="space-y-1 ml-4">
                          {scheduleDay.times.map((timeSlot, timeIndex) => (
                            <div key={timeIndex} className="flex justify-between items-center">
                              <span className="text-gray-700 text-sm">
                                {timeSlot.time}
                              </span>
                              <span className="text-xs bg-gradient-to-r from-blue-100 to-purple-100 text-blue-700 px-2 py-1 rounded-full">
                                {timeSlot.age}
                              </span>
                            </div>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Floating icon */}
                <div className="absolute -top-3 -right-3 w-10 h-10 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full flex items-center justify-center shadow-lg">
                  <span className="text-white font-bold text-sm">{index + 1}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Gallery Section */}
      <ModernGallerySection />

      {/* CTA Section */}
    {/*   <section className="relative overflow-hidden">
        <div className="relative bg-gradient-to-br from-blue-600 to-purple-600 py-16">
          <div className="absolute inset-0 bg-gradient-to-r from-black/20 via-transparent to-black/20"></div>
          
          <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-4xl font-bold mb-4 text-white">Prova Gratuita Disponibile!</h2>
            <p className="text-xl mb-8 text-white/90 max-w-2xl mx-auto">
              Partecipa a una lezione di prova gratuita e scopri il corso perfetto per il tuo bambino
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="bg-white text-blue-600 font-bold py-4 px-8 rounded-xl hover:bg-gray-100 transition-all duration-300 transform hover:scale-105 shadow-lg">
                Prenota Prova Gratuita
              </button>
              <Link href="/it/contatti" className="bg-transparent border-2 border-white text-white font-semibold py-4 px-8 rounded-xl hover:bg-white hover:text-blue-600 transition-all duration-300">
                Richiedi Informazioni
              </Link>
            </div>
          </div>
        </div>
      </section> */}
      
      <Footer />
    </main>
  );
}