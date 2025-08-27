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

export default async function FrancescaPage() {
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
              href={`/${locale}/chi-siamo`}
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
                  Francesca Scaglione
                </h1>
                <p className="text-xl text-primary font-medium mb-4">
                  Pianista e Didatta Musicale
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
                    src="/images/francesca_curr.jpg"
                    alt="Francesca Scaglione"
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
                <strong>Francesca Scaglione</strong> - Musicista: pianista, cantante, musicologa, esperta di pedagogia e didattica della musica, Art Counselor.
              </p>
              
              <h3 className="text-xl font-semibold text-neutral mt-8 mb-4">FORMAZIONE</h3>
              
              <p>
                Si diploma in pianoforte al Conservatorio Santa Cecilia di Roma con P. Biondi e parallelamente integra la sua formazione, seguendo corsi teorico esperienziali, sulla Didattica pianistica con A. Rebaudengo  sul repertorio da camera dell'Ottocento e del Novecento con D. Baldwin, sulla vocalità gregoriana con G. B. Baroffio, sulla vocalità barocca con S. Ryden, sulla filologia musicale con F. Luisi, presso il Pontificio Istituto di Musica Sacra e laureandosi in Musicologia all'Università  La Sapienza di Roma con P. Petrobelli e una tesi di laurea sulla produzione vocale profana del XVI secolo.
              </p>
              
              <p>
                Questo considerevole bagaglio formativo la inserisce con immediatezza nel mondo del lavoro, tanto che dal 1989 inizia a fare concerti (partecipando a festival per lo più di musica classica da camera), a svolgere attività musicologica (scrivendo articoli e partecipando a convegni sulla musica del Cinquecento) e attività didattica, nella consapevolezza che la formazione di un musicista non si esaurisca che alla fine della sua esistenza, semmai nel tempo assume forme via via diverse, non limitandosi a quelle accademiche.
              </p>
              
              <p>
                Consegue il diploma di Didattica musicale biennale, presso l'Università Tor Vergata di Roma e la nascita della prima dei suoi tre figli la avvicina alla Music Learning Theory di E. Gordon, seguendo numerosi seminari con B. M. Bolton e P. Anselmi.
              </p>
              
              <p>
                Convinta che sia molto importante cosa si insegna, ma ancor più come si insegna e la qualità della relazione che si instaura nell'atto educativo, approfondisce lo studio dei meccanismi di apprendimento dei linguaggi espressivi presso la facoltà di medicina e psicologia dell'Università La Sapienza di Roma (prof. F. Orzi e F.E. Pontieri) e consegue il Master triennale di Art Counselor presso la Scuola di Specializzazione in Psicoterapia Aspic (Associazione per lo Sviluppo Psicologico dell'Individuo e della Comunità) con una tesi sul "sostegno alla genitorialità" attraverso i linguaggi espressivi artistici con la dott.ssa E. Spalletta.
              </p>

              <h3 className="text-xl font-semibold text-neutral mt-8 mb-4">ATTIVITÀ PROFESSIONALE</h3>
              
              <p>
                Dal 1989 a oggi alterna concerti all'attività musicologica e didattica concentrandosi in particolar modo su questa negli ultimi 9 anni.
              </p>
              
              <p>
                Collabora con numerose associazioni come docente di pianoforte e musica da camera, tra queste la S. P. di musica Donna Olimpia, la S. di musica Diocesana, La Libera Scuola Janua, l'Ass. Sing, l'Ass. Musica Nova, l'Ass. Eschilo.
              </p>
              
              <p>
                Nel 2001, con l'arrivo della sua prima figlia si avvicina alla Music Learning Theory e inizia un percorso di specializzazione nella didattica dedicata ai bambini da 0 a 5 anni, che le fa riscoprire la potenza della musica innanzi tutto come linguaggio espressivo, un immenso luogo di relazione, non solo per i bambini, ma per tutti gli individui.
              </p>
              
              <p>
                Inizia così a tenere corsi per bambini e genitori, presso la S.p. di musica D. Olimpia, in qualità di operatore certificato della rete Musica in culla in sede e presso numerose scuole pubbliche e private.
              </p>
              
              <p>
                Dal 2004, accanto all'attività con i bambini affianca quella di formatore in corsi di formazione e aggiornamento riconosciuti dal Miur, per conto di varie istituzioni: la rete Musica in Culla, il Comune di Roma, il Comune di Terni, il Comune di Tolentino, la Scuola di didattica musicale di Fiesole, l'Ass. Casa della musica di Palermo, la Scuola Sintonie di Terni, l'Opera Nazionale Montessori, l'Ass. Musica Nova.
              </p>
              
              <p>
                Questa attività la porta a scrivere musica e ideare attività didattiche che vengono diffuse e pubblicazioni didattiche (Collana dell'Osi).
              </p>
              
              <p>
                Ormai la musica per Francesca Scaglione non è luogo didattico o performante, ma luogo dell'anima, un intreccio di profonde relazioni. E sulla base di questo sentire si susseguono una serie di esperienze professionali di lavoro, di ricerca, di vita.
              </p>
              
              <p>
                Nel 2004 e nel 2005, partecipa al progetto Note di pace del comune di Roma, quale rappresentante della S.p.m. Donna Olimpia, nell'ambito del programma di scambio culturale tra Italia, Israele e Palestina, lavorando in asili nido di Gerusalemme e Bethlemme, e in corsi di formazione per operatori musicali ed educatori palestinesi (Cultural Center di Bethlemme, Sabrine Center) e Israeliani (Tel Aviv).
              </p>
              
              <p>
                Nel 2009, muovendo dall'idea che l'evento musicale sia esso evento didattico, performance o di natura altra, è un evento di musica insieme, fonda il gruppo Musicullando con A. Turrisi e P. Anselmi. Più che un gruppo spettacolo, l'idea che muove questa officina musicale è creare un evento di musica in parte performance, in parte evento didattico, in parte interazione creativa e improvvisativa tra musicisti e spettatori-bambini. Tutto questo fondendo elementi espressivi del linguaggio musicale, teatrale e figurativo, dove la musica fa da elemento di coesione, unica nel suo essere espressione originalissima, irripetibile, un'avventura che, come dice D.Levitin, non si ripete mai uguale due volte.
              </p>
              
              <p>
                Questa esperienza la porta a maturare una forma a lei ancora più congeniale che nel 2015 trova il giusto respiro in Di Concerto con mamma e papà, il gruppo spettacolo con il quale attualmente svolge una intensa attività musicale.
              </p>
              
              <p>
                Nel 2010 svolge attività musicale nell'ambito di un progetto di ricerca da lei ideato nel reparto di Neonatologia dell'ospedale G.B. Grassi di Ostia con bambini neonati prematuri o affetti da lievi patologie.
              </p>
              
              <p>
                Nel 2012 e 2013 attiva un progetto di musicoterapia presso l'Onlus Home in Hospital con sede all'interno dell'ospedale G.B. Grassi di Ostia.
              </p>
              
              <p>
                Dal 2010 e al presente tiene Seminari di educazione all'ascolto, rivolti a quanti vogliano migliorare le loro capacità di ricezione corporea e di vocalità.
              </p>
              
              <p>
                In tali ambiti promuove progetti didattici nelle strutture mediche e scolastiche, pubbliche e private.
              </p>
              
              <p>
                Dal 2013 è il coordinatore didattico dell'attività 0-4 presso l'Ass. Musica Nova, per la quale tiene corsi per bambini e genitori (Musica per i piccolissimi), percorsi da lei ideati rivolti alle mamme e i papà in attesa, che vogliano fare della musica un canale privilegiato di comunicazione con il loro futuro figlio (Vuoi cantare con me?), incontri di preparazione alla nascita presso il consultorio di via della Consolata nel territorio della Asl Roma D e il corso Gravidanza in Ascolto, presso la sede dell'Associazione.
              </p>
              
              <p>
                Dirige, inoltre il Corso biennale di Formazione integrato Fatti di musica per operatori musicali che si affacciano alla didattica per la primissima infanzia.
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
              Un percorso di eccellenza pianistica e didattica dedicato alla crescita musicale dei bambini
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Pianoforte */}
            <div className="group">
              <div className="bg-white/80 backdrop-blur-sm border border-white/50 rounded-3xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-2">
                <div className="relative mb-6">
                  <div className="bg-gradient-to-br from-blue-400 to-blue-600 w-20 h-20 rounded-2xl flex items-center justify-center mx-auto group-hover:scale-110 transition-transform duration-300">
                    <span className="text-3xl">🎹</span>
                  </div>
                  <div className="absolute -top-2 -right-2 w-6 h-6 bg-gradient-to-r from-pink-400 to-purple-400 rounded-full opacity-80"></div>
                </div>
                <h3 className="text-xl font-bold text-center text-neutral mb-3">Pianoforte e Musicologia</h3>
                <p className="text-neutral/70 text-center leading-relaxed">
                  Diplomata al Conservatorio Santa Cecilia di Roma. Laureata in Musicologia all'Università La Sapienza con specializzazione nel XVI secolo.
                </p>
                <div className="mt-4 flex justify-center">
                  <span className="inline-block bg-blue-100 text-blue-800 text-xs font-medium px-3 py-1 rounded-full">
                    Conservatorio Santa Cecilia
                  </span>
                </div>
              </div>
            </div>

            {/* Metodi Didattici */}
            <div className="group">
              <div className="bg-white/80 backdrop-blur-sm border border-white/50 rounded-3xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-2">
                <div className="relative mb-6">
                  <div className="bg-gradient-to-br from-purple-400 to-purple-600 w-20 h-20 rounded-2xl flex items-center justify-center mx-auto group-hover:scale-110 transition-transform duration-300">
                    <AcademicCapIcon className="h-10 w-10 text-white" />
                  </div>
                  <div className="absolute -top-2 -right-2 w-6 h-6 bg-gradient-to-r from-blue-400 to-cyan-400 rounded-full opacity-80"></div>
                </div>
                <h3 className="text-xl font-bold text-center text-neutral mb-3">Metodi Pedagogici</h3>
                <p className="text-neutral/70 text-center leading-relaxed">
                  Esperta nei metodi Orff-Schulwerk, Kodály e Music Learning Theory di Gordon. Approccio multimetodologico all'educazione musicale.
                </p>
                <div className="mt-4 flex justify-center">
                  <span className="inline-block bg-purple-100 text-purple-800 text-xs font-medium px-3 py-1 rounded-full">
                    Multi-Method Expert
                  </span>
                </div>
              </div>
            </div>

            {/* Arrangiamenti */}
            <div className="group">
              <div className="bg-white/80 backdrop-blur-sm border border-white/50 rounded-3xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-2">
                <div className="relative mb-6">
                  <div className="bg-gradient-to-br from-pink-400 to-pink-600 w-20 h-20 rounded-2xl flex items-center justify-center mx-auto group-hover:scale-110 transition-transform duration-300">
                    <MusicalNoteIcon className="h-10 w-10 text-white" />
                  </div>
                  <div className="absolute -top-2 -right-2 w-6 h-6 bg-gradient-to-r from-yellow-400 to-orange-400 rounded-full opacity-80"></div>
                </div>
                <h3 className="text-xl font-bold text-center text-neutral mb-3">Composizione Didattica</h3>
                <p className="text-neutral/70 text-center leading-relaxed">
                  Creatrice di arrangiamenti musicali originali per bambini e famiglie. Autrice di materiale didattico innovativo.
                </p>
                <div className="mt-4 flex justify-center">
                  <span className="inline-block bg-pink-100 text-pink-800 text-xs font-medium px-3 py-1 rounded-full">
                    Compositrice
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Additional Info Cards */}
          <div className="mt-16 grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-gradient-to-br from-blue-600 to-purple-700 rounded-3xl p-8 text-white">
              <h3 className="text-2xl font-bold mb-4">Pubblicazioni</h3>
              <ul className="space-y-3">
                <li className="flex items-center gap-3">
                  <div className="w-2 h-2 bg-white rounded-full"></div>
                  <span>Articoli sulla didattica musicale infantile</span>
                </li>
                <li className="flex items-center gap-3">
                  <div className="w-2 h-2 bg-white rounded-full"></div>
                  <span>Materiale didattico per l&apos;educazione musicale</span>
                </li>
                <li className="flex items-center gap-3">
                  <div className="w-2 h-2 bg-white rounded-full"></div>
                  <span>Corsi di formazione per educatori</span>
                </li>
              </ul>
            </div>

            <div className="bg-gradient-to-br from-pink-500 to-purple-600 rounded-3xl p-8 text-white">
              <h3 className="text-2xl font-bold mb-4">Risultati Raggiunti</h3>
              <div className="grid grid-cols-3 gap-4 text-center">
                <div>
                  <div className="text-3xl font-bold mb-1">35+</div>
                  <div className="text-sm opacity-90">Anni carriera</div>
                </div>
                <div>
                  <div className="text-3xl font-bold mb-1">1000+</div>
                  <div className="text-sm opacity-90">Famiglie coinvolte</div>
                </div>
                <div>
                  <div className="text-3xl font-bold mb-1">50+</div>
                  <div className="text-sm opacity-90">Corsi MIUR</div>
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
            Vieni a Conoscere <span className="text-blue-300">Francesca</span>
          </h2>
          <p className="text-xl text-white/90 mb-10 max-w-2xl mx-auto leading-relaxed">
            Partecipa ai nostri concerti e scopri la bellezza della didattica musicale attraverso l&apos;esperienza pianistica di Francesca
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