'use client';

import { useState } from 'react';
import { CalendarDaysIcon, ArrowTopRightOnSquareIcon, ClipboardDocumentIcon, CheckIcon } from '@heroicons/react/24/outline';

const FORM_URL = 'https://forms.gle/owDRvY5KQyGPrXHcA';

export default function CalendarioSection() {
  const [copied, setCopied] = useState(false);

  const copyLink = () => {
    navigator.clipboard.writeText(FORM_URL);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
      <div className="flex justify-center mb-6">
        <div className="bg-emerald-100 p-4 rounded-2xl">
          <CalendarDaysIcon className="h-12 w-12 text-emerald-600" />
        </div>
      </div>

      <h2 className="text-3xl sm:text-4xl font-bold text-neutral mb-4">
        Calendario Eventi
      </h2>

      <p className="text-lg text-neutral/70 max-w-xl mx-auto mb-10">
        Le prenotazioni online sono temporaneamente sospese. Per prenotare il tuo posto compila il form dedicato:
      </p>

      <a
        href={FORM_URL}
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex items-center gap-3 bg-emerald-500 hover:bg-emerald-400 text-white font-bold text-lg px-8 py-4 rounded-2xl transition-all duration-300 hover:scale-105 shadow-lg shadow-emerald-200 mb-8"
      >
        <span>Prenota con il Form Google</span>
        <ArrowTopRightOnSquareIcon className="h-5 w-5" />
      </a>

      {/* Copyable link */}
      <div className="mt-4">
        <p className="text-sm text-neutral/50 mb-3">oppure copia il link:</p>
        <div className="flex items-center justify-center gap-2 bg-white border border-gray-200 rounded-xl px-4 py-3 max-w-md mx-auto shadow-sm">
          <span className="text-sm text-neutral/70 truncate flex-1 text-left font-mono">{FORM_URL}</span>
          <button
            onClick={copyLink}
            className="flex-shrink-0 flex items-center gap-1.5 bg-emerald-50 hover:bg-emerald-100 text-emerald-700 text-sm font-medium px-3 py-1.5 rounded-lg transition-all"
          >
            {copied ? <CheckIcon className="h-4 w-4" /> : <ClipboardDocumentIcon className="h-4 w-4" />}
            {copied ? 'Copiato!' : 'Copia'}
          </button>
        </div>
      </div>
    </div>
  );
}
