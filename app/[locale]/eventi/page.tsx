import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { ArrowTopRightOnSquareIcon, MusicalNoteIcon, ExclamationTriangleIcon } from '@heroicons/react/24/outline';

export default function EventsPage() {
  return (
    <main className="min-h-screen bg-base-200">
      <Header />

      <section className="relative overflow-hidden">
        <div className="relative min-h-[80vh] bg-gradient-to-br from-emerald-900 via-teal-800 to-blue-900 flex items-center justify-center">
          <div className="absolute inset-0 bg-gradient-to-r from-black/50 via-black/30 to-black/50" />
          <div className="absolute top-20 left-10 text-white/10 text-6xl select-none">🎵</div>
          <div className="absolute bottom-24 right-12 text-white/10 text-5xl select-none">🎶</div>

          <div className="relative z-10 max-w-2xl mx-auto px-4 text-center">
            <div className="inline-flex items-center gap-2 bg-amber-500/20 border border-amber-400/40 text-amber-300 rounded-full px-4 py-2 mb-8">
              <ExclamationTriangleIcon className="w-4 h-4" />
              <span className="text-sm font-medium">Prenotazione temporaneamente offline</span>
            </div>

            <div className="flex justify-center mb-6">
              <div className="bg-white/10 backdrop-blur-sm p-5 rounded-2xl border border-white/20">
                <MusicalNoteIcon className="h-14 w-14 text-emerald-300" />
              </div>
            </div>

            <h1 className="text-3xl sm:text-4xl font-bold text-white mb-4">
              Prossimi eventi
              <span className="block text-emerald-300 mt-1">temporaneamente non disponibili</span>
            </h1>

            <p className="text-white/80 text-lg leading-relaxed mb-10">
              In caso di malfunzionamento del sito, per effettuare la prenotazione compilare il form al seguente link:
            </p>

            <a
              href="https://forms.gle/owDRvY5KQyGPrXHcA"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-3 bg-emerald-500 hover:bg-emerald-400 text-white font-bold text-lg px-8 py-4 rounded-2xl transition-all duration-300 hover:scale-105 shadow-lg shadow-emerald-900/40"
            >
              <span>Prenota con il Form Google</span>
              <ArrowTopRightOnSquareIcon className="h-5 w-5" />
            </a>

            <p className="text-white/40 text-sm mt-8">
              Il sistema tornerà disponibile a breve.
            </p>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
