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
                <strong>Annamaria Diroma</strong>
                {locale === 'en'
                  ? ', musician and educator, has worked for years in the field of education and training, interweaving the artistic and pedagogical dimensions.'
                  : ', musicista e didatta, lavora da anni nel campo dell\'educazione e della formazione, intrecciando la dimensione artistica con quella pedagogica.'}
              </p>

              <p>
                {locale === 'en'
                  ? 'From a very young age she nurtured her passion for music, studying flute with Michel De Bost, Annamaria Morini and Maxence Larrieu, and gaining concert experience in Italy and abroad (Portugal, Syria, France, Switzerland, Poland, Albania, Israel) as well as in orchestral settings, including the Orchestra della Città Metropolitana di Bari and the Orchestra Fedele Fenaroli di Lanciano.'
                  : 'Ha coltivato fin da giovanissima la passione per la musica, studiando flauto con Michel De Bost, Annamaria Morini e Maxence Larrieu e maturando esperienze concertistiche in Italia e all\'estero (Portogallo, Siria, Francia, Svizzera, Polonia, Albania, Israele) e in contesti orchestrali, tra cui l\'Orchestra della Città Metropolitana di Bari e l\'Orchestra Fedele Fenaroli di Lanciano.'}
              </p>

              <p>
                {locale === 'en'
                  ? 'Over time, her artistic sensibility became intertwined with her educational vocation. Holding a degree from DAMS at the University of Bologna in Music Pedagogy, after completing her teaching qualification she began her career as a teacher in nursery, primary and subsequently lower secondary schools, bringing to everyday teaching a perspective that combines creativity, reflection and care for learning processes.'
                  : 'Nel tempo, la sua sensibilità artistica si è intrecciata con la vocazione educativa. Laureata al DAMS dell\'Università di Bologna in Pedagogia della Musica, dopo aver conseguito l\'abilitazione all\'insegnamento, ha intrapreso la professione di insegnante della scuola dell\'infanzia, primaria e successivamente nella scuola secondaria di primo grado portando nella quotidianità didattica uno sguardo che unisce creatività, riflessione e cura dei processi di apprendimento.'}
              </p>

              <p>
                {locale === 'en'
                  ? 'Her professional commitment is grounded in a constant interest in active and genuinely inclusive teaching methodologies, with particular attention to Edwin Gordon\'s Music Learning Theory (MLT), which recognises music as a powerful tool for cognitive, emotional and relational development. This perspective has guided her choices and research, sustaining the idea of learning that arises from direct experience, from listening, and from the shared construction of meaning.'
                  : 'Il suo impegno professionale si fonda su un costante interesse per le metodologie didattiche attive e necessariamente inclusive, con particolare attenzione alla Music Learning Theory di Edwin Gordon (MLT), che riconosce nella musica un potente strumento di sviluppo cognitivo, emotivo e relazionale. Questa prospettiva ha orientato le sue scelte e le sue ricerche, sostenendo l\'idea di un apprendimento che nasce dall\'esperienza diretta, dall\'ascolto e dalla costruzione di senso condiviso.'}
              </p>

              <p>
                {locale === 'en'
                  ? 'She has built solid experience in the training and mentoring of student teachers through participation in various innovation and pedagogical research projects. She collaborates regularly with the Conservatorio Ottorino Respighi in Latina, where she serves as Tutor Coordinator in the training programmes for future music teachers.'
                  : 'Ha maturato una solida esperienza nella formazione e nell\'accompagnamento dei docenti in formazione partecipando a diversi progetti di innovazione e ricerca pedagogica. Collabora stabilmente con il Conservatorio Ottorino Respighi di Latina dove svolge il ruolo di Tutor Coordinatore nei percorsi di Formazione dei futuri docenti di musica.'}
              </p>

              <p>
                {locale === 'en'
                  ? 'In every context, she promotes an idea of musical learning as a space for personal and collective growth, founded on relationship, reflection and aesthetic sense.'
                  : 'In ogni contesto, promuove un\'idea di apprendimento musicale come spazio di crescita personale e collettiva, fondato sulla relazione, sulla riflessione e sul senso estetico.'}
              </p>

              <p>
                {locale === 'en'
                  ? 'Among her professional interests are the early childhood teaching methodologies of Orff, Dalcroze, Kodály, Tomatis and Willems — approaches she considers complementary and in constant dialogue with the Gordonian perspective. From this reflection and from her encounter with Edwin E. Gordon, di Concerto con Mamma e Papà® was born in 2010, a project aimed at children from 0 to 5 years old that offers an experience of listening and active participation together with parents. Active for more than fifteen years, di Concerto con Mamma e Papà® has involved, to date, more than 1,000 families and is based on the importance of early exposure to music with particular attention to the development of Audiation, the exploratory dimension, sound play and children\'s musical behaviours. Over the years, the concerts have been received with great enthusiasm by participants in prestigious national and international settings, including Ghent University on the occasion of MERYC 2019, the Teatro Comunale di Bologna in 2018, the Auditorium Parco della Musica in 2023 and the Conservatorio Licinio Refice in 2026.'
                  : 'Tra i suoi interessi professionali rientrano le metodologie di insegnamento per l\'infanzia di Orff, Dalcroze, Kodály, Tomatis e Willems, percorsi che considera complementari e in dialogo costante con la prospettiva gordoniana. Da questa riflessione e dall\'incontro con Edwin E. Gordon, nasce, nel 2010, di Concerto con Mamma e Papà®, un progetto rivolto alle bambine e ai bambini da 0 a 5 anni che propone un\'esperienza di ascolto e di partecipazione attiva insieme ai genitori. Attivo da oltre quindici anni, di Concerto con Mamma e Papà® ha coinvolto, fino ad oggi, più di 1000 famiglie e si basa sull\'importanza dell\'esposizione precoce alla musica con particolare attenzione allo sviluppo dell\'Audiation, alla dimensione esplorativa, al gioco sonoro e ai comportamenti musicali infantili. Nel corso degli anni, i concerti sono stati accolti con grande consenso dei partecipanti, in prestigiosi contesti nazionali e internazionali, tra cui la Gent University in occasione del MERYC 2019, il Teatro Comunale di Bologna nel 2018, l\'Auditorium Parco della Musica nel 2023 e il Conservatorio Licinio Refice nel 2026.'}
              </p>

              <p>
                {locale === 'en'
                  ? 'Throughout all her work, she continues to nurture the conviction that educating and making music share the same breath: both require deep listening, harmony between thought and emotion, and the capacity to generate beauty through encounter with the other.'
                  : 'In tutto il suo lavoro, continua a coltivare la convinzione che educare e fare musica condividano lo stesso respiro: entrambi richiedono ascolto profondo, armonia tra pensiero ed emozione e la capacità di generare bellezza attraverso l\'incontro con l\'altro.'}
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