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
  GlobeAltIcon,
  HeartIcon,
  UsersIcon
} from '@heroicons/react/24/outline';
import Image from 'next/image';

export default async function MonserratPage() {
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
          
          <div className="max-w-4xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div className="text-center lg:text-left">
                <h1 className="text-4xl sm:text-5xl font-bold text-neutral mb-6">
                  Monserrat Olavarria Balmaceda
                </h1>
                <p className="text-xl text-primary font-medium mb-4">
                  Musicista e Specialista in Educazione Interculturale
                </p>
                <div className="flex items-center justify-center lg:justify-start gap-4 text-neutral/70 mb-6">
                  <div className="flex items-center gap-2">
                    <MapPinIcon className="h-4 w-4" />
                    <span className="text-sm">Cile / Roma, Italia</span>
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
                    src="/images/monserrat_curr.jpg"
                    alt="Monserrat Olavarria Balmaceda"
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
                <strong>Monserrat Olavarria Balmaceda</strong> è nata in Cile e vive in Italia dall'età di 5 anni, è cantante, educatrice musicale, insegnante accreditato Audiation Institute, educatrice Cemea, mediatrice culturale, formatrice, si dedica alla scrittura, all'illustrazione e al teatro; in sintesi alla promozione del benessere delle persone di qualsiasi età attraverso la pratica dei linguaggi artistici.
              </p>
              
              <p>
                Si è formata presso il Liceo Classico P. Albertelli, l'Istito Jean Piaget, entrambi a Roma, presso il Conservatorio Licino Refice di Frosinone ed ha frequentato corsi di specializzazione in didattica musicale per l'infanzia e numerosi seminari di approfondimento in ambito musicale, artistico ed educativo.
              </p>
              
              <p>
                Ha studiato tecnica vocale con le docenti Susan Long, Elisabeth Aubrie, Katarina Krueger e Sara Della Porta. Ha studiato sassofono con il maestro Francesco Marini.
              </p>
              
              <p>
                Presso il Conservatorio Licino Refice ha studiato canto jazz con le docenti Carla Marcotulli e Giuppi Paone, arrangiamento con il maestri Marco Tiso e Roberto Spadoni, pianoforte complementare con il maestro Alberto Girardi, storia del Jazz con il professor Luigi Onori, improvvisazione con il maestro Paolo Tombolesi, armonia con il maestro Stefano Caturelli.
              </p>
              
              <p>
                Ha frequentato i corsi di formazione per insegnanti di musica "L'Educazione musicale del bambino da 0 a 6 anni, secondo la Music Learnin Theory del prof. E. Gordon", ass. Aigam e "L'Educazione musicale dai 6 ai 12 anni – l'istruzione formale secondo la M.T.L.", ass. Aigam, entrambi riconosciuti dal MIUR.
              </p>
              
              <p>
                Ha seguito presso il Conservatorio Licino Refice i seminari di Didattica del Canto Corale – Lucio Ivaldi; Songwriting – Stefano Scatozza; Vocal Summit – Susanna Stivali; Tecnica Vocale ed Improvvisazione non idiomatica – Gianna Montecalvo.
              </p>
              
              <p>
                Ha frequentato in varie sedi i seguenti seminari: Rimica Dalcroze – Luisa Disegni, SIEM; Espressione Corporea nell'ambito della didattica Dalcroze – Susanne Martinet, SIEM; Improvvisazione Scat – Bob Stoloff, Umbria Jazz; Improvvisazione Jazz – Sara della Porta, Susanna Stivali, Elisabetta Antonini, Roma Summer Jazz Worhshop 2017, Centro Ottava;
              </p>
              
              <p>
                Ha studiato teatro-danza con la coreografa Flavia della Lunga e con la regista Cristine Cibils (Living Theatre).
              </p>
              
              <p>
                E' Assistente di Comunità Infantili, ha seguito il percorso di Educatrice Cemea, si è formata ed ha lavorato come Assistente al Puerperio presso l'ass. Il Melograno e nel reparto di patologia neonatale dell'Ospedale San Camillo di Roma nell'ambito del progetto dalla Regione Lazio "Raggiungere gli irraggiungibili", finalizzato all'assistenza domiciliare dei nuclei con neonati prematuri ed a rischio psicosociale.
              </p>
              
              <p>
                Ha frequentato il corso di formazione "Fondamenti della pedagogia interculturale e modalità di comunicazione ed integrazione nel gruppo", ass. Suamox.
              </p>
              
              <h3 className="text-xl font-semibold text-neutral mt-8 mb-4">ATTIVITÀ PROFESSIONALE</h3>
              
              <p>
                Da 20 anni tiene laboratori di educazione musicale e dirige cori infantili presso asili nido, scuole dell'infanzia, scuole primarie e scuole di musica di Roma e provincia.
              </p>
              
              <p>
                Attualmente insegna canto e proedeutica musicale presso la Scuola Popolare di Musica del Tiburtino, propedeutica musicale presso il Centro Ottava, le scuole dell'infanzia In crescendo, Il paese delle meraviglie, Il Carosello e gli asili nido Cocchi di mamma e Il Girotondo (Roma e provincia).
              </p>
              
              <p>
                E' un'insegnante accreditato Audiation Institute, associazione che si occupa di promuovere la ricerca scientifica, lo studio e la diffusione sia del modello teorico della Music Learning Theory di Edwin E. Gordon sia degli approcci educativi e delle pratiche didattiche che si fondano su di essa.
              </p>
              
              <p>
                E' membro di ESCOM-Italy, European Society for the Cognitive Sciences of Music.
              </p>
              
              <p>
                Fa stabilmente parte del trio "Di concerto con Mamma e Papà", ensemble vocale e strumentale che realizza da anni una stagione di lezioni-concerto a Roma per i bambini da 0 a 5 anni, si è esibito al convegno Musica Presto, Bologna, ed alla Meryc Conference 2019, Ghent, Belgio.
              </p>
              
              <p>
                Monserrat scrive canzoni, poesie e favole per grandi e piccini ed utilizza questi materiali originali per i propri laboratori e performances.
              </p>
              
              <p>
                Ha recentemente prodotto il disco per bambini "l'Isola di Tiritinlallà", per il quale ha scritto la storia, le canzoni e realizzato le illustrazioni.
              </p>
              
              <p>
                E' stata membro del gruppo vocale "Gordon Ensemble", ed ha cantato nei concerti per l'infanzia "Che grandi orecchie che ho", ass. Aigam, Auditorium Parco della Musica.
              </p>
              
              <p>
                Ha fatto parte di diverse formazioni musicali con le quali ha approfondito il repertorio della canzone d'autore e del folklore cileni e latino americani.
              </p>
              
              <p>
                Ha fondato e dirige "Avenidamerica", quartetto a cavallo tra latin-folk, jazz e musica classica, con il quale ha pubblicato l'album "Avenidamerica, dedicado a Violeta" con il patrocinio dell'Ambasciata del Cile in Italia e dell'istituto IILA; il quartetto si è esibito nei musei romani Pietro Canova, Bilotti e Palazzo Braschi, all'Istituto IILA, presso la Casa delle Culture di Velletri – rassegna "Chi ti ha toccato il corpo con la mente", nel Palazzo Baronale di Sipicciano – mostra "Neruda-Italia", presso l'Auditorium Parco della Musica, ospite durante la presentazione del volume "20 anni di 68", Club Tenco – Squilibri Editore.
              </p>
              
              <p>
                Ha collaborato come cantante con l'artista Fernanda Pessolano nel contesto dell'installazione STRAP, e in performances di tetro-natura realizzate per il sistema bibliotecario ceretano sabatino.
              </p>
              
              <p>
                Attualmente porta avanti il monologo teatrale "Amancay, una donna con la guerra dentro", scritto da Ermanno Dodaro.
              </p>
              
              <p>
                Ha fatto parte della compagnia di teatro urbano, "Teatro della Contaminazione", diretta dalla regista argentina Cristine Cibils (Living Theatre).
              </p>
              
              <p>
                Collabora con i Cemea del Mezzogiorno (Centri di Esercitazione dell'Educazione Attiva) operando nei corsi di formazione permanente rivolti ai docenti degli asili nido e delle scuole dell'infanzia e lavorando presso le "Case delle Arti e del Gioco"; con i Cemea ha progettato e realizzato interventi ludico-didattici presso l'Auditorium Parco della Musica in occasione del Festival Russo, Festival Scandinavo, la mostra "Universi Sensibili" e nella stessa sede durante le attività promosse dal Comune di Roma nell'ambito del progetto "Città come Scuola".
              </p>
              
              <p>
                Ha lavorato per Caritas (Forum per l'Intercultura) portando nelle Scuole dell'infanzia e nelle Scuole primarie, "Volando sulle ali del racconto", laboratorio di musica e cultura latino americane.
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
              Un ponte tra culture diverse attraverso l&apos;educazione musicale interculturale
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Educazione Interculturale */}
            <div className="group">
              <div className="bg-white/80 backdrop-blur-sm border border-white/50 rounded-3xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-2">
                <div className="relative mb-6">
                  <div className="bg-gradient-to-br from-blue-400 to-blue-600 w-20 h-20 rounded-2xl flex items-center justify-center mx-auto group-hover:scale-110 transition-transform duration-300">
                    <GlobeAltIcon className="h-10 w-10 text-white" />
                  </div>
                  <div className="absolute -top-2 -right-2 w-6 h-6 bg-gradient-to-r from-pink-400 to-purple-400 rounded-full opacity-80"></div>
                </div>
                <h3 className="text-xl font-bold text-center text-neutral mb-3">Canto e Vocalità</h3>
                <p className="text-neutral/70 text-center leading-relaxed">
                  Formata al Conservatorio Licino Refice in canto jazz. Esperta in tecnica vocale e improvvisazione con docenti internazionali.
                </p>
                <div className="mt-4 flex justify-center">
                  <span className="inline-block bg-blue-100 text-blue-800 text-xs font-medium px-3 py-1 rounded-full">
                    Conservatorio Licino Refice
                  </span>
                </div>
              </div>
            </div>

            {/* Folklore Sudamericano */}
            <div className="group">
              <div className="bg-white/80 backdrop-blur-sm border border-white/50 rounded-3xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-2">
                <div className="relative mb-6">
                  <div className="bg-gradient-to-br from-purple-400 to-purple-600 w-20 h-20 rounded-2xl flex items-center justify-center mx-auto group-hover:scale-110 transition-transform duration-300">
                    <MusicalNoteIcon className="h-10 w-10 text-white" />
                  </div>
                  <div className="absolute -top-2 -right-2 w-6 h-6 bg-gradient-to-r from-blue-400 to-cyan-400 rounded-full opacity-80"></div>
                </div>
                <h3 className="text-xl font-bold text-center text-neutral mb-3">Educazione Musicale</h3>
                <p className="text-neutral/70 text-center leading-relaxed">
                  Insegnante accreditato Audiation Institute e membro ESCOM-Italy. Specializzata in Music Learning Theory di Gordon.
                </p>
                <div className="mt-4 flex justify-center">
                  <span className="inline-block bg-purple-100 text-purple-800 text-xs font-medium px-3 py-1 rounded-full">
                    Audiation Institute
                  </span>
                </div>
              </div>
            </div>

            {/* Etnomusicologia */}
            <div className="group">
              <div className="bg-white/80 backdrop-blur-sm border border-white/50 rounded-3xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-2">
                <div className="relative mb-6">
                  <div className="bg-gradient-to-br from-pink-400 to-pink-600 w-20 h-20 rounded-2xl flex items-center justify-center mx-auto group-hover:scale-110 transition-transform duration-300">
                    <AcademicCapIcon className="h-10 w-10 text-white" />
                  </div>
                  <div className="absolute -top-2 -right-2 w-6 h-6 bg-gradient-to-r from-yellow-400 to-orange-400 rounded-full opacity-80"></div>
                </div>
                <h3 className="text-xl font-bold text-center text-neutral mb-3">Arte e Teatro</h3>
                <p className="text-neutral/70 text-center leading-relaxed">
                  Art Counselor, scrittrice e illustratrice. Esperta in linguaggi artistici integrati per il benessere delle persone.
                </p>
                <div className="mt-4 flex justify-center">
                  <span className="inline-block bg-pink-100 text-pink-800 text-xs font-medium px-3 py-1 rounded-full">
                    Multidisciplinare
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Additional Info Cards */}
          <div className="mt-16 grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-gradient-to-br from-blue-600 to-purple-700 rounded-3xl p-8 text-white">
              <h3 className="text-2xl font-bold mb-4">Collaborazioni Internazionali</h3>
              <ul className="space-y-3">
                <li className="flex items-center gap-3">
                  <div className="w-2 h-2 bg-white rounded-full"></div>
                  <span>Progetti educativi con organizzazioni internazionali</span>
                </li>
                <li className="flex items-center gap-3">
                  <div className="w-2 h-2 bg-white rounded-full"></div>
                  <span>Formazione sulla diversità culturale nella musica</span>
                </li>
                <li className="flex items-center gap-3">
                  <div className="w-2 h-2 bg-white rounded-full"></div>
                  <span>Ricerca su tradizioni musicali sudamericane</span>
                </li>
              </ul>
            </div>

            <div className="bg-gradient-to-br from-pink-500 to-purple-600 rounded-3xl p-8 text-white">
              <h3 className="text-2xl font-bold mb-4">Risultati Raggiunti</h3>
              <div className="grid grid-cols-3 gap-4 text-center">
                <div>
                  <div className="text-3xl font-bold mb-1">20+</div>
                  <div className="text-sm opacity-90">Anni esperienza</div>
                </div>
                <div>
                  <div className="text-3xl font-bold mb-1">500+</div>
                  <div className="text-sm opacity-90">Bambini coinvolti</div>
                </div>
                <div>
                  <div className="text-3xl font-bold mb-1">5+</div>
                  <div className="text-sm opacity-90">Album prodotti</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Cultural Heritage Section */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-neutral mb-4">Patrimonio Culturale</h2>
            <p className="text-lg text-neutral/70 max-w-2xl mx-auto">
              Monserrat porta nei concerti la ricchezza della tradizione musicale sudamericana
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
            <div className="space-y-4">
              <h3 className="text-xl font-semibold text-neutral">Strumenti Tradizionali</h3>
              <ul className="space-y-2 text-neutral/70">
                <li className="flex items-center gap-2">
                  <span className="w-2 h-2 bg-primary rounded-full"></span>
                  Charango - piccola chitarra andina
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-2 h-2 bg-primary rounded-full"></span>
                  Quena - flauto tradizionale delle Ande
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-2 h-2 bg-primary rounded-full"></span>
                  Bombo Legüero - tamburo folkloristico argentino
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-2 h-2 bg-primary rounded-full"></span>
                  Claves e shaker per ritmi caraibici
                </li>
              </ul>
            </div>
            <div className="space-y-4">
              <h3 className="text-xl font-semibold text-neutral">Tradizioni Musicali</h3>
              <ul className="space-y-2 text-neutral/70">
                <li className="flex items-center gap-2">
                  <span className="w-2 h-2 bg-primary rounded-full"></span>
                  Musica andina tradizionale
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-2 h-2 bg-primary rounded-full"></span>
                  Folklore cileno per bambini
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-2 h-2 bg-primary rounded-full"></span>
                  Ritmi caraibici adaptati per la prima infanzia
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-2 h-2 bg-primary rounded-full"></span>
                  Canti tradizionali sudamericani
                </li>
              </ul>
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
            <GlobeAltIcon className="w-full h-full text-white animate-pulse" />
          </div>
          <div className="absolute bottom-10 right-10 w-20 h-20 opacity-15">
            <HeartIcon className="w-full h-full text-white animate-bounce" style={{animationDuration: '4s'}} />
          </div>
          <div className="absolute top-32 right-1/4 text-white/10 text-3xl animate-bounce">♪</div>
          <div className="absolute bottom-20 left-1/3 text-white/10 text-2xl animate-pulse">♫</div>
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl sm:text-5xl font-bold text-white mb-6">
            Vieni a Conoscere <span className="text-blue-300">Monserrat</span>
          </h2>
          <p className="text-xl text-white/90 mb-10 max-w-2xl mx-auto leading-relaxed">
            Scopri la magia dell&apos;educazione musicale interculturale attraverso le tradizioni sudamericane e l&apos;esperienza di Monserrat
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