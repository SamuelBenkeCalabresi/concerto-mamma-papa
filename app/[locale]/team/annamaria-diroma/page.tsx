import { getTranslations, getLocale } from 'next-intl/server';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import Link from 'next/link';
import { 
  MusicalNoteIcon, 
  AcademicCapIcon,
  ArrowLeftIcon,
  MapPinIcon,
  CalendarDaysIcon,
  HeartIcon,
  UsersIcon
} from '@heroicons/react/24/outline';
import Image from 'next/image';

export default async function AnnamariaPage() {
  const t = await getTranslations();
  const locale = await getLocale();

  return (
    <main className="min-h-screen bg-base-100">
      <Header />
      
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-primary/8 to-base-200/60 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-6">
            <Link 
              href={`/${locale}#chi-siamo`}
              className="inline-flex items-center gap-2 text-primary hover:text-primary/80 transition-colors"
            >
              <ArrowLeftIcon className="h-4 w-4" />
              Torna al Team
            </Link>
          </div>
          
          <div className="max-w-3xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div className="text-center lg:text-left">
                <h1 className="text-4xl sm:text-5xl font-bold text-neutral mb-6">
                  Annamaria Diroma
                </h1>
                <p className="text-xl text-primary font-medium mb-4">
                  Flautista e Educatrice Musicale
                </p>
                <div className="flex items-center justify-center lg:justify-start gap-4 text-neutral/70 mb-6">
                  <div className="flex items-center gap-2">
                    <MapPinIcon className="h-4 w-4" />
                    <span className="text-sm">Roma, Italia</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CalendarDaysIcon className="h-4 w-4" />
                    <span className="text-sm">15+ anni di esperienza</span>
                  </div>
                </div>
              </div>
              <div className="flex justify-center">
                <div className="relative w-[400px] h-[375px]">
                  <Image
                    src="/images/annamaria_curr2.jpg"
                    alt="Annamaria Diroma"
                    fill
                    className="object-cover rounded-2xl shadow-xl"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Biography Section */}
      <section className="pt-8 pb-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="prose max-w-none">
            <h2 className="text-3xl font-bold text-neutral mb-8">Biografia</h2>
            
            <div className="text-lg text-neutral/80 leading-relaxed space-y-6">
              <p>
                <strong>Annamaria Diroma</strong>, musicista e didatta, si occupa di propedeutica musicale per bambini dal 1999.
              </p>
              
              <p>
              Consegue il Diploma di Flauto traverso e Didattica della Musica presso il Conservatorio di Musica di Monopoli e la Laurea in DAMS (Discipline dell’Arte, della Musica e dello Spettacolo) presso l’Università di Bologna con Tesi in Pedagogia Musicale dal titolo “ L’Apprendimento musicale in età prescolare secondo la MLT di Gordon” confluita nel Gordon Archive dell’Università del South Caroline
              </p>
              
              <p>
              Si specializza in Music Learning Theory di E. E. Gordon acquisendo la qualifica di Insegnante Associato AIGAM (Roma) e per arricchire il suo bagaglio musicale sul piano metodologico musicale ha approfondito anche i metodi di insegnamento Orff, Dalcroize e Kodaly elaborando una sua specifica didattica musicale per l’infanzia.
              </p>
              
              <p>
              Giovanissima si cimenta con l’attività didattica insegnando in una scuola paritaria nella scuola dell’Infanzia e nella scuola Primaria e dal 2000 svolge assiduamente corsi e progetti di musica presso gli asili nido, le scuole dell’infanzia ed elementari di Roma e provincia.
              </p>
              
              <p>
              Attualmente è docente titolare della cattedra di flauto traverso presso la Scuola Secondaria a Indirizzo Musicale di Campagnano e conduce corsi di formazione musicale per educatori, insegnanti e operatori del tempo libero con riconoscimento del MIUR per le Associazioni Musica Nova Roma, Uisp di Roma e per la Blind Society di Hebron in Cisgiordania. Svolge un seminario di approfondimento all’interno del “Corso biennale di Formazione integrato Fatti di musica” per operatori musicali che si affacciano alla didattica per la primissima infanzia.
              </p>

              <p>
              In qualità di flautista concertista ha svolto un’intensa attività concertistica in Italia e all’estero (Portogallo, Polonia, Albania, Siria, Israele, Francia, Svizzera) sia in qualità di solista sia in formazioni cameristiche.
              </p>

              <p>
              Per nove edizioni ha svolto l’incarico di direttore artistico del Concorso Nazionale Città di Campagnano che ha visto un crescente successo di partecipazione.
              </p>

              <p>
              Nel 2012 ha fondato <b>Di Concerto con Mamma e Papà</b>, un’iniziativa musicale dedicata ai bambini da zero a cinque anni collaborando con Enti e Associazioni di Roma (Roma Capitale, Assessorato alla Cultura del Comune di Campagnano, XV Municipio di Roma, Associazione Nota Bene, Associazione Musica Nova) e in Puglia (Assessorato alla Cultura e Biblioteca comunale di Monopoli).
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Specializations Section */}
      <section className="relative py-16 bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-neutral mb-4">Le Sue Specializzazioni</h2>
            <p className="text-lg text-neutral/70 max-w-2xl mx-auto">
              Un percorso di eccellenza musicale dedicato alla crescita dei più piccoli
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Violino */}
            <div className="group">
              <div className="bg-white/80 backdrop-blur-sm border border-white/50 rounded-3xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-2">
                <div className="relative mb-6">
                  <div className="bg-gradient-to-br from-blue-400 to-blue-600 w-20 h-20 rounded-2xl flex items-center justify-center mx-auto group-hover:scale-110 transition-transform duration-300">
                    <MusicalNoteIcon className="h-10 w-10 text-white" />
                  </div>
                  <div className="absolute -top-2 -right-2 w-6 h-6 bg-gradient-to-r from-pink-400 to-purple-400 rounded-full opacity-80"></div>
                </div>
                <h3 className="text-xl font-bold text-center text-neutral mb-3">Flauto Traverso</h3>
                <p className="text-neutral/70 text-center leading-relaxed">
                  Diplomata al Conservatorio di Monopoli in Flauto traverso e Didattica della Musica. Concertista con esperienza internazionale.
                </p>
                <div className="mt-4 flex justify-center">
                  <span className="inline-block bg-blue-100 text-blue-800 text-xs font-medium px-3 py-1 rounded-full">
                    Conservatorio di Monopoli
                  </span>
                </div>
              </div>
            </div>

            {/* Gordon Method */}
            <div className="group">
              <div className="bg-white/80 backdrop-blur-sm border border-white/50 rounded-3xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-2">
                <div className="relative mb-6">
                  <div className="bg-gradient-to-br from-purple-400 to-purple-600 w-20 h-20 rounded-2xl flex items-center justify-center mx-auto group-hover:scale-110 transition-transform duration-300">
                    <AcademicCapIcon className="h-10 w-10 text-white" />
                  </div>
                  <div className="absolute -top-2 -right-2 w-6 h-6 bg-gradient-to-r from-blue-400 to-cyan-400 rounded-full opacity-80"></div>
                </div>
                <h3 className="text-xl font-bold text-center text-neutral mb-3">Metodo Gordon</h3>
                <p className="text-neutral/70 text-center leading-relaxed">
                  Certificata nella Music Learning Theory di Edwin Gordon. Approccio scientifico all&apos;apprendimento musicale infantile.
                </p>
                <div className="mt-4 flex justify-center">
                  <span className="inline-block bg-purple-100 text-purple-800 text-xs font-medium px-3 py-1 rounded-full">
                    MLT Certified
                  </span>
                </div>
              </div>
            </div>

            {/* Prima Infanzia */}
            <div className="group">
              <div className="bg-white/80 backdrop-blur-sm border border-white/50 rounded-3xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-2">
                <div className="relative mb-6">
                  <div className="bg-gradient-to-br from-pink-400 to-pink-600 w-20 h-20 rounded-2xl flex items-center justify-center mx-auto group-hover:scale-110 transition-transform duration-300">
                    <HeartIcon className="h-10 w-10 text-white" />
                  </div>
                  <div className="absolute -top-2 -right-2 w-6 h-6 bg-gradient-to-r from-yellow-400 to-orange-400 rounded-full opacity-80"></div>
                </div>
                <h3 className="text-xl font-bold text-center text-neutral mb-3">Prima Infanzia</h3>
                <p className="text-neutral/70 text-center leading-relaxed">
                  15+ anni di esperienza con bambini da 0 a 5 anni. Esperta nello sviluppo dell&apos;ascolto musicale nei più piccoli.
                </p>
                <div className="mt-4 flex justify-center">
                  <span className="inline-block bg-pink-100 text-pink-800 text-xs font-medium px-3 py-1 rounded-full">
                    0-5 anni
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Additional Info Cards */}
          <div className="mt-16 grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-gradient-to-br from-blue-600 to-purple-700 rounded-3xl p-8 text-white">
              <h3 className="text-2xl font-bold mb-4">Formazione Continua</h3>
              <ul className="space-y-3">
                <li className="flex items-center gap-3">
                  <div className="w-2 h-2 bg-white rounded-full"></div>
                  <span>Seminari internazionali di educazione musicale</span>
                </li>
                <li className="flex items-center gap-3">
                  <div className="w-2 h-2 bg-white rounded-full"></div>
                  <span>Corsi di perfezionamento flautistico</span>
                </li>
                <li className="flex items-center gap-3">
                  <div className="w-2 h-2 bg-white rounded-full"></div>
                  <span>Ricerca in ambito pedagogico musicale</span>
                </li>
              </ul>
            </div>

            <div className="bg-gradient-to-br from-pink-500 to-purple-600 rounded-3xl p-8 text-white">
              <h3 className="text-2xl font-bold mb-4">Risultati Raggiunti</h3>
              <div className="grid grid-cols-3 gap-4 text-center">
                <div>
                  <div className="text-3xl font-bold mb-1">500+</div>
                  <div className="text-sm opacity-90">Bambini formati</div>
                </div>
                <div>
                  <div className="text-3xl font-bold mb-1">15</div>
                  <div className="text-sm opacity-90">Anni esperienza</div>
                </div>
                <div>
                  <div className="text-3xl font-bold mb-1">50+</div>
                  <div className="text-sm opacity-90">Concerti realizzati</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-blue-900 via-blue-800 to-purple-900 py-20">
        <div className="absolute inset-0 bg-gradient-to-r from-black/50 via-black/30 to-black/50"></div>
        
        {/* Decorative elements */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-10 left-10 w-24 h-24 opacity-10">
            <MusicalNoteIcon className="w-full h-full text-white animate-pulse" />
          </div>
          <div className="absolute bottom-10 right-10 w-20 h-20 opacity-15">
            <HeartIcon className="w-full h-full text-white animate-bounce" style={{animationDuration: '4s'}} />
          </div>
          <div className="absolute top-32 right-1/4 text-white/10 text-3xl animate-bounce">♪</div>
          <div className="absolute bottom-20 left-1/3 text-white/10 text-2xl animate-pulse">♫</div>
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl sm:text-5xl font-bold text-white mb-6">
            Vieni a Conoscere <span className="text-blue-300">Annamaria</span>
          </h2>
          <p className="text-xl text-white/90 mb-10 max-w-2xl mx-auto leading-relaxed">
            Partecipa ai nostri concerti e scopri la magia dell&apos;educazione musicale attraverso il flauto traverso e l&apos;esperienza di Annamaria
          </p>
          <div className="flex flex-col sm:flex-row gap-6 justify-center">
            <Link 
              href={`/${locale}/calendario`} 
              className="bg-blue-500 hover:bg-blue-400 text-white font-bold py-4 px-8 rounded-2xl transition-all duration-300 hover:shadow-2xl hover:-translate-y-1 text-lg"
            >
              🎵 Vedi i Prossimi Concerti
            </Link>
            <Link 
              href={`/${locale}/chi-siamo`} 
              className="bg-white/10 backdrop-blur-sm border border-white/30 text-white font-bold py-4 px-8 rounded-2xl transition-all duration-300 hover:bg-white/20 hover:shadow-2xl hover:-translate-y-1 text-lg"
            >
              👥 Conosci tutto il Team
            </Link>
          </div>
        </div>
      </section>
      
      <Footer />
    </main>
  );
}