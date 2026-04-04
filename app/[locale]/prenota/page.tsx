'use client';

import { useState } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { ArrowTopRightOnSquareIcon, MusicalNoteIcon, ClipboardDocumentIcon, CheckIcon } from '@heroicons/react/24/outline';

const FORM_URL = 'https://forms.gle/owDRvY5KQyGPrXHcA';

export default function PrenotaPage() {
  const [copied, setCopied] = useState(false);

  const copyLink = () => {
    navigator.clipboard.writeText(FORM_URL);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <main className="min-h-screen bg-base-200">
      <Header />

      <section className="relative overflow-hidden">
        <div className="relative min-h-[80vh] bg-gradient-to-br from-emerald-900 via-teal-800 to-blue-900 flex items-center justify-center">
          <div className="absolute inset-0 bg-gradient-to-r from-black/50 via-black/30 to-black/50" />
          <div className="absolute top-20 left-10 text-white/10 text-6xl select-none">🎵</div>
          <div className="absolute bottom-24 right-12 text-white/10 text-5xl select-none">🎶</div>
          <div className="absolute top-1/3 right-1/4 text-white/10 text-4xl select-none">🎼</div>

          <div className="relative z-10 max-w-2xl mx-auto px-4 text-center">
            <div className="flex justify-center mb-6">
              <div className="bg-white/10 backdrop-blur-sm p-5 rounded-2xl border border-white/20">
                <MusicalNoteIcon className="h-14 w-14 text-emerald-300" />
              </div>
            </div>

            <h1 className="text-3xl sm:text-4xl font-bold text-white mb-4">
              Prenota la tua
              <span className="block text-emerald-300 mt-1">attività musicale</span>
            </h1>

            <p className="text-white/80 text-lg leading-relaxed mb-8">
              Per prenotare il tuo posto compila il form dedicato:
            </p>

            <a
              href={FORM_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-3 bg-emerald-500 hover:bg-emerald-400 text-white font-bold text-lg px-8 py-4 rounded-2xl transition-all duration-300 hover:scale-105 shadow-lg shadow-emerald-900/40 mb-8"
            >
              <span>Prenota con il Form Google</span>
              <ArrowTopRightOnSquareIcon className="h-5 w-5" />
            </a>

            <div className="mt-2">
              <p className="text-white/50 text-sm mb-3">oppure copia il link:</p>
              <div className="flex items-center gap-2 bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl px-4 py-3">
                <span className="text-white/80 text-sm truncate flex-1 text-left font-mono">{FORM_URL}</span>
                <button
                  onClick={copyLink}
                  className="flex-shrink-0 flex items-center gap-1.5 bg-white/20 hover:bg-white/30 text-white text-sm font-medium px-3 py-1.5 rounded-lg transition-all"
                >
                  {copied ? <CheckIcon className="h-4 w-4" /> : <ClipboardDocumentIcon className="h-4 w-4" />}
                  {copied ? 'Copiato!' : 'Copia'}
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
