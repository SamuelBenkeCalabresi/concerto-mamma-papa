import { getTranslations, getLocale } from 'next-intl/server';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import Link from 'next/link';
import { 
  MusicalNoteIcon, 
  HeartIcon, 
  AcademicCapIcon,
  UsersIcon,
  SparklesIcon,
  HandRaisedIcon
} from '@heroicons/react/24/outline';

export default async function AboutPage() {
  const t = await getTranslations();
  const locale = await getLocale();

  return (
    <main className="min-h-screen bg-base-100">
      <Header />
      
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-primary/8 to-base-200/60 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h1 className="text-4xl sm:text-5xl font-bold text-neutral mb-6">
              {t('About.title')}
            </h1>
            <p className="text-xl text-neutral/70 max-w-3xl mx-auto">
              {t('About.description')}
            </p>
          </div>
        </div>
      </section>

      {/* Mission Section */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold text-neutral mb-6">La Nostra Missione</h2>
              <p className="text-lg text-neutral/70 mb-6">
                {t('About.mission')}
              </p>
              <p className="text-neutral/70 mb-8">
                Crediamo che la musica sia un linguaggio universale che può arricchire la vita dei bambini fin dalla più tenera età. 
                I nostri concerti sono progettati per essere accessibili, coinvolgenti e educativi, creando momenti speciali 
                di condivisione tra genitori e figli.
              </p>
              <Link href={`/${locale}/calendario`} className="btn btn-primary">
                Scopri i Nostri Concerti
              </Link>
            </div>
            <div className="relative">
              <div className="bg-white rounded-2xl shadow-xl p-8">
                <div className="aspect-square bg-gradient-to-br from-primary/20 to-accent/20 rounded-xl flex items-center justify-center mb-6">
                  <MusicalNoteIcon className="h-24 w-24 text-primary" />
                </div>
                <h3 className="text-xl font-semibold text-center text-neutral">
                  Musica per Crescere Insieme
                </h3>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="bg-base-200 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-neutral mb-4">Perché Scegliere i Nostri Concerti</h2>
            <p className="text-lg text-neutral/70 max-w-2xl mx-auto">
              Ogni dettaglio è pensato per creare un&apos;esperienza magica e formativa per tutta la famiglia
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="card bg-base-100 shadow-lg hover:shadow-xl transition-shadow">
              <div className="card-body text-center">
                <div className="bg-primary/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <AcademicCapIcon className="h-8 w-8 text-primary" />
                </div>
                <h3 className="card-title justify-center text-lg">Educativo</h3>
                <p className="text-neutral/70">
                  Approccio pedagogico studiato per l&apos;apprendimento musicale dei bambini
                </p>
              </div>
            </div>

            <div className="card bg-base-100 shadow-lg hover:shadow-xl transition-shadow">
              <div className="card-body text-center">
                <div className="bg-primary/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <HandRaisedIcon className="h-8 w-8 text-primary" />
                </div>
                <h3 className="card-title justify-center text-lg">Interattivo</h3>
                <p className="text-neutral/70">
                  Partecipazione attiva dei bambini con movimenti, canti e giochi musicali
                </p>
              </div>
            </div>

            <div className="card bg-base-100 shadow-lg hover:shadow-xl transition-shadow">
              <div className="card-body text-center">
                <div className="bg-primary/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <UsersIcon className="h-8 w-8 text-primary" />
                </div>
                <h3 className="card-title justify-center text-lg">Per Famiglie</h3>
                <p className="text-neutral/70">
                  Momenti di condivisione speciali tra genitori e figli attraverso la musica
                </p>
              </div>
            </div>

            <div className="card bg-base-100 shadow-lg hover:shadow-xl transition-shadow">
              <div className="card-body text-center">
                <div className="bg-primary/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <SparklesIcon className="h-8 w-8 text-primary" />
                </div>
                <h3 className="card-title justify-center text-lg">Magico</h3>
                <p className="text-neutral/70">
                  Atmosfera incantata con scenografie colorate e costumi che catturano l&apos;immaginazione
                </p>
              </div>
            </div>

            <div className="card bg-base-100 shadow-lg hover:shadow-xl transition-shadow">
              <div className="card-body text-center">
                <div className="bg-primary/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <HeartIcon className="h-8 w-8 text-primary" />
                </div>
                <h3 className="card-title justify-center text-lg">Con Amore</h3>
                <p className="text-neutral/70">
                  Ogni concerto è preparato con passione e dedizione da musicisti professionisti
                </p>
              </div>
            </div>

            <div className="card bg-base-100 shadow-lg hover:shadow-xl transition-shadow">
              <div className="card-body text-center">
                <div className="bg-primary/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <MusicalNoteIcon className="h-8 w-8 text-primary" />
                </div>
                <h3 className="card-title justify-center text-lg">Professionale</h3>
                <p className="text-neutral/70">
                  Musicisti qualificati con esperienza nell&apos;educazione musicale infantile
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-neutral mb-4">Il Nostro Team</h2>
            <p className="text-lg text-neutral/70 max-w-2xl mx-auto">
              Un gruppo di musicisti e educatori appassionati dedicati alla crescita musicale dei bambini
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="card bg-base-100 shadow-lg">
              <div className="card-body text-center">
                <div className="avatar mb-4">
                  <div className="w-24 rounded-full bg-primary/10 flex items-center justify-center mx-auto">
                    <span className="text-2xl">🎼</span>
                  </div>
                </div>
                <h3 className="card-title justify-center">Maestro Alessandro</h3>
                <p className="text-sm text-primary">Direttore Artistico</p>
                <p className="text-neutral/70 text-sm mt-2">
                  Violinista professionista con 15 anni di esperienza nell&apos;educazione musicale infantile
                </p>
              </div>
            </div>

            <div className="card bg-base-100 shadow-lg">
              <div className="card-body text-center">
                <div className="avatar mb-4">
                  <div className="w-24 rounded-full bg-primary/10 flex items-center justify-center mx-auto">
                    <span className="text-2xl">🎹</span>
                  </div>
                </div>
                <h3 className="card-title justify-center">Maestra Giulia</h3>
                <p className="text-sm text-primary">Pianista e Educatrice</p>
                <p className="text-neutral/70 text-sm mt-2">
                  Specializzata in didattica musicale per la prima infanzia e metodo Kodály
                </p>
              </div>
            </div>

            <div className="card bg-base-100 shadow-lg">
              <div className="card-body text-center">
                <div className="avatar mb-4">
                  <div className="w-24 rounded-full bg-primary/10 flex items-center justify-center mx-auto">
                    <span className="text-2xl">🎭</span>
                  </div>
                </div>
                <h3 className="card-title justify-center">Marco</h3>
                <p className="text-sm text-primary">Narratore e Animatore</p>
                <p className="text-neutral/70 text-sm mt-2">
                  Attore e musicista esperto nell&apos;intrattenimento educativo per bambini
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-primary text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold mb-4">Pronto a Vivere la Magia della Musica?</h2>
          <p className="text-xl mb-8 opacity-90">
            Unisciti a noi per un&apos;esperienza musicale indimenticabile con i tuoi bambini
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href={`/${locale}/concerts`} className="btn btn-secondary btn-lg">
              Vedi i Prossimi Concerti
            </Link>
            <Link href={`/${locale}/contact`} className="btn btn-outline btn-lg text-white border-white hover:bg-white hover:text-primary">
              Contattaci
            </Link>
          </div>
        </div>
      </section>
      
      <Footer />
    </main>
  );
}