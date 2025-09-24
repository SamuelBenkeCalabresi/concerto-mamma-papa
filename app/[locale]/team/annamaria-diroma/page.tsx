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
              {locale === 'en' ? 'Back to Team' : 'Torna al Team'}
            </Link>
          </div>
          
          <div className="max-w-3xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div className="text-center lg:text-left">
                <h1 className="text-4xl sm:text-5xl font-bold text-neutral mb-6">
                  Annamaria Diroma
                </h1>
                <p className="text-xl text-primary font-medium mb-4">
                  {locale === 'en' ? 'Flutist and Music Educator' : 'Flautista e Educatrice Musicale'}
                </p>
                <div className="flex items-center justify-center lg:justify-start gap-4 text-neutral/70 mb-6">
                  <div className="flex items-center gap-2">
                    <MapPinIcon className="h-4 w-4" />
                    <span className="text-sm">{locale === 'en' ? 'Rome, Italy' : 'Roma, Italia'}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CalendarDaysIcon className="h-4 w-4" />
                    <span className="text-sm">{locale === 'en' ? '15+ years of experience' : '15+ anni di esperienza'}</span>
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
            <h2 className="text-3xl font-bold text-neutral mb-8">{locale === 'en' ? 'Biography' : 'Biografia'}</h2>
            
            <div className="text-lg text-neutral/80 leading-relaxed space-y-6">
              <p>
                <strong>Annamaria Diroma</strong>{locale === 'en' ? ', musician and educator, has been involved in musical propaedeutics for children since 1999.' : ', musicista e didatta, si occupa di propedeutica musicale per bambini dal 1999.'}
              </p>
              
              <p>
              {locale === 'en' ? 
                'She earned her Diploma in Transverse Flute and Music Education at the Music Conservatory of Monopoli and her Degree in DAMS (Art, Music and Performance Studies) at the University of Bologna with a thesis in Musical Pedagogy titled "Musical Learning in Preschool Age according to Gordon\'s MLT" included in the Gordon Archive of the University of South Carolina.' :
                'Consegue il Diploma di Flauto traverso e Didattica della Musica presso il Conservatorio di Musica di Monopoli e la Laurea in DAMS (Discipline dell\'Arte, della Musica e dello Spettacolo) presso l\'Università di Bologna con Tesi in Pedagogia Musicale dal titolo " L\'Apprendimento musicale in età prescolare secondo la MLT di Gordon" confluita nel Gordon Archive dell\'Università del South Caroline'
              }
              </p>
              
              <p>
              {locale === 'en' ? 
                'She specializes in Music Learning Theory by E. E. Gordon, acquiring the qualification of AIGAM Associate Teacher (Rome) and to enrich her musical background on the methodological level, she has also studied the Orff, Dalcroze and Kodaly teaching methods, developing her specific musical didactics for childhood.' :
                'Si specializza in Music Learning Theory di E. E. Gordon acquisendo la qualifica di Insegnante Associato AIGAM (Roma) e per arricchire il suo bagaglio musicale sul piano metodologico musicale ha approfondito anche i metodi di insegnamento Orff, Dalcroize e Kodaly elaborando una sua specifica didattica musicale per l\'infanzia.'
              }
              </p>
              
              <p>
              {locale === 'en' ? 
                'At a very young age she began her teaching activity teaching in a state-recognized school in kindergarten and primary school and since 2000 she has been assiduously conducting music courses and projects at nurseries, kindergartens and elementary schools in Rome and province.' :
                'Giovanissima si cimenta con l\'attività didattica insegnando in una scuola paritaria nella scuola dell\'Infanzia e nella scuola Primaria e dal 2000 svolge assiduamente corsi e progetti di musica presso gli asili nido, le scuole dell\'infanzia ed elementari di Roma e provincia.'
              }
              </p>
              
              <p>
              {locale === 'en' ? 
                'Currently she is a tenured professor of transverse flute at the Secondary School with Musical Orientation of Campagnano and conducts musical training courses for educators, teachers and leisure operators with recognition from the Ministry of Education for the Associations Musica Nova Roma, Uisp di Roma and for the Blind Society of Hebron in the West Bank. She holds a specialization seminar within the "Biennial Integrated Training Course Fatti di musica" for musical operators who approach didactics for early childhood.' :
                'Attualmente è docente titolare della cattedra di flauto traverso presso la Scuola Secondaria a Indirizzo Musicale di Campagnano e conduce corsi di formazione musicale per educatori, insegnanti e operatori del tempo libero con riconoscimento del MIUR per le Associazioni Musica Nova Roma, Uisp di Roma e per la Blind Society di Hebron in Cisgiordania. Svolge un seminario di approfondimento all\'interno del "Corso biennale di Formazione integrato Fatti di musica" per operatori musicali che si affacciano alla didattica per la primissima infanzia.'
              }
              </p>

              <p>
              {locale === 'en' ? 
                'As a concert flutist she has carried out intense concert activity in Italy and abroad (Portugal, Poland, Albania, Syria, Israel, France, Switzerland) both as a soloist and in chamber music formations.' :
                'In qualità di flautista concertista ha svolto un\'intensa attività concertistica in Italia e all\'estero (Portogallo, Polonia, Albania, Siria, Israele, Francia, Svizzera) sia in qualità di solista sia in formazioni cameristiche.'
              }
              </p>

              <p>
              {locale === 'en' ? 
                'For nine editions she has held the position of artistic director of the National Competition Città di Campagnano which has seen a growing success of participation.' :
                'Per nove edizioni ha svolto l\'incarico di direttore artistico del Concorso Nazionale Città di Campagnano che ha visto un crescente successo di partecipazione.'
              }
              </p>

              <p>
              {locale === 'en' ? 
                'In 2012 she founded Concerts with Mom and Dad, a musical initiative dedicated to children from zero to five years old collaborating with Organizations and Associations of Rome (Roma Capitale, Cultural Department of the Municipality of Campagnano, XV Municipality of Rome, Nota Bene Association, Musica Nova Association) and in Apulia (Cultural Department and Municipal Library of Monopoli).' :
                'Nel 2012 ha fondato Di Concerto con Mamma e Papà, un\'iniziativa musicale dedicata ai bambini da zero a cinque anni collaborando con Enti e Associazioni di Roma (Roma Capitale, Assessorato alla Cultura del Comune di Campagnano, XV Municipio di Roma, Associazione Nota Bene, Associazione Musica Nova) e in Puglia (Assessorato alla Cultura e Biblioteca comunale di Monopoli).'
              }
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Specializations Section */}
      <section className="relative py-16 bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-neutral mb-4">{locale === 'en' ? 'Her Specializations' : 'Le Sue Specializzazioni'}</h2>
            <p className="text-lg text-neutral/70 max-w-2xl mx-auto">
              {locale === 'en' ? 'A path of musical excellence dedicated to the growth of the little ones' : 'Un percorso di eccellenza musicale dedicato alla crescita dei più piccoli'}
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
                <h3 className="text-xl font-bold text-center text-neutral mb-3">{locale === 'en' ? 'Transverse Flute' : 'Flauto Traverso'}</h3>
                <p className="text-neutral/70 text-center leading-relaxed">
                  {locale === 'en' ? 'Graduate of the Monopoli Conservatory in Transverse Flute and Music Education. Concert performer with international experience.' : 'Diplomata al Conservatorio di Monopoli in Flauto traverso e Didattica della Musica. Concertista con esperienza internazionale.'}
                </p>
                <div className="mt-4 flex justify-center">
                  <span className="inline-block bg-blue-100 text-blue-800 text-xs font-medium px-3 py-1 rounded-full">
                    {locale === 'en' ? 'Monopoli Conservatory' : 'Conservatorio di Monopoli'}
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
                <h3 className="text-xl font-bold text-center text-neutral mb-3">{locale === 'en' ? 'Gordon Method' : 'Metodo Gordon'}</h3>
                <p className="text-neutral/70 text-center leading-relaxed">
                  {locale === 'en' ? 'Certified in Edwin Gordon\'s Music Learning Theory. Scientific approach to childhood musical learning.' : 'Certificata nella Music Learning Theory di Edwin Gordon. Approccio scientifico all\'apprendimento musicale infantile.'}
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
                <h3 className="text-xl font-bold text-center text-neutral mb-3">{locale === 'en' ? 'Early Childhood' : 'Prima Infanzia'}</h3>
                <p className="text-neutral/70 text-center leading-relaxed">
                  {locale === 'en' ? '15+ years of experience with children from 0 to 5 years old. Expert in the development of musical listening in young children.' : '15+ anni di esperienza con bambini da 0 a 5 anni. Esperta nello sviluppo dell\'ascolto musicale nei più piccoli.'}
                </p>
                <div className="mt-4 flex justify-center">
                  <span className="inline-block bg-pink-100 text-pink-800 text-xs font-medium px-3 py-1 rounded-full">
                    {locale === 'en' ? '0-5 years' : '0-5 anni'}
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Additional Info Cards */}
          <div className="mt-16 grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-gradient-to-br from-blue-600 to-purple-700 rounded-3xl p-8 text-white">
              <h3 className="text-2xl font-bold mb-4">{locale === 'en' ? 'Continuous Training' : 'Formazione Continua'}</h3>
              <ul className="space-y-3">
                <li className="flex items-center gap-3">
                  <div className="w-2 h-2 bg-white rounded-full"></div>
                  <span>{locale === 'en' ? 'International seminars in music education' : 'Seminari internazionali di educazione musicale'}</span>
                </li>
                <li className="flex items-center gap-3">
                  <div className="w-2 h-2 bg-white rounded-full"></div>
                  <span>{locale === 'en' ? 'Advanced flute courses' : 'Corsi di perfezionamento flautistico'}</span>
                </li>
                <li className="flex items-center gap-3">
                  <div className="w-2 h-2 bg-white rounded-full"></div>
                  <span>{locale === 'en' ? 'Research in musical pedagogy' : 'Ricerca in ambito pedagogico musicale'}</span>
                </li>
              </ul>
            </div>

            <div className="bg-gradient-to-br from-pink-500 to-purple-600 rounded-3xl p-8 text-white">
              <h3 className="text-2xl font-bold mb-4">{locale === 'en' ? 'Achievements' : 'Risultati Raggiunti'}</h3>
              <div className="grid grid-cols-3 gap-4 text-center">
                <div>
                  <div className="text-3xl font-bold mb-1">500+</div>
                  <div className="text-sm opacity-90">{locale === 'en' ? 'Children trained' : 'Bambini formati'}</div>
                </div>
                <div>
                  <div className="text-3xl font-bold mb-1">15</div>
                  <div className="text-sm opacity-90">{locale === 'en' ? 'Years experience' : 'Anni esperienza'}</div>
                </div>
                <div>
                  <div className="text-3xl font-bold mb-1">50+</div>
                  <div className="text-sm opacity-90">{locale === 'en' ? 'Concerts performed' : 'Concerti realizzati'}</div>
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
            {locale === 'en' ? 'Come Meet ' : 'Vieni a Conoscere '}<span className="text-blue-300">Annamaria</span>
          </h2>
          <p className="text-xl text-white/90 mb-10 max-w-2xl mx-auto leading-relaxed">
            {locale === 'en' ? 
              'Join our concerts and discover the magic of music education through the transverse flute and Annamaria\'s experience' :
              'Partecipa ai nostri concerti e scopri la magia dell\'educazione musicale attraverso il flauto traverso e l\'esperienza di Annamaria'
            }
          </p>
          <div className="flex flex-col sm:flex-row gap-6 justify-center">
            <Link 
              href={`/${locale}/calendario`} 
              className="bg-blue-500 hover:bg-blue-400 text-white font-bold py-4 px-8 rounded-2xl transition-all duration-300 hover:shadow-2xl hover:-translate-y-1 text-lg"
            >
              🎵 {locale === 'en' ? 'See Upcoming Concerts' : 'Vedi i Prossimi Concerti'}
            </Link>
            <Link 
              href={`/${locale}/chi-siamo`} 
              className="bg-white/10 backdrop-blur-sm border border-white/30 text-white font-bold py-4 px-8 rounded-2xl transition-all duration-300 hover:bg-white/20 hover:shadow-2xl hover:-translate-y-1 text-lg"
            >
              👥 {locale === 'en' ? 'Meet the Full Team' : 'Conosci tutto il Team'}
            </Link>
          </div>
        </div>
      </section>
      
      <Footer />
    </main>
  );
}