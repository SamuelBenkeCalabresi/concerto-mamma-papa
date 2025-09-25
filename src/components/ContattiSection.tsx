'use client';

import { useTranslations } from 'next-intl';
import { useState } from 'react';
import {
  PhoneIcon,
  EnvelopeIcon,
  UserIcon
} from '@heroicons/react/24/outline';

export default function ContattiSection() {
  const t = useTranslations('ContattiSection');
  const [formData, setFormData] = useState({
    name: '',
    email: ''
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="text-center mb-16">
        <h2 className="text-4xl font-bold text-neutral mb-4">
          <span>{t('title')}</span>
          <span className="text-primary">{t('titleHighlight')}</span>
        </h2>
        <p className="text-lg text-neutral/70 max-w-3xl mx-auto">
          {t('description')}
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
        {/* Contact Information */}
        <div>
          <div className="bg-white rounded-2xl shadow-xl border border-gray-100 p-8">
            <div className="mb-8 text-center">
              <div className="inline-flex items-center bg-emerald-100 text-emerald-800 rounded-full px-4 py-2 mb-4">
                <PhoneIcon className="w-5 h-5 mr-2" />
                <span className="text-sm font-medium">Contatti</span>
              </div>
              <h3 className="text-2xl font-bold text-gray-800 mb-2">
                Come Contattarci
              </h3>
              <p className="text-gray-600">
                Siamo qui per rispondere a tutte le tue domande
              </p>
            </div>

            <div className="space-y-6">
              <div className="bg-gray-50 rounded-lg p-6">
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-emerald-100 rounded-full flex items-center justify-center">
                    <PhoneIcon className="w-6 h-6 text-emerald-600" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-800 mb-2">Telefono</h4>
                    <div className="space-y-1">
                      <div>
                        <a
                          href="tel:+393423711750"
                          className="text-emerald-600 hover:text-emerald-700 transition-colors font-medium"
                        >
                          +39 342 3711750
                        </a>
                      </div>
                      <div>
                        <a
                          href="tel:+393470960533"
                          className="text-emerald-600 hover:text-emerald-700 transition-colors font-medium"
                        >
                          +39 347 0960533
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-gray-50 rounded-lg p-6">
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-emerald-100 rounded-full flex items-center justify-center">
                    <EnvelopeIcon className="w-6 h-6 text-emerald-600" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-800 mb-2">Email</h4>
                    <a
                      href="mailto:info@concertoconmammaepapa.it"
                      className="text-emerald-600 hover:text-emerald-700 transition-colors font-medium text-sm sm:text-base break-words"
                    >
                      info@concertoconmammaepapa.it
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Newsletter Form */}
        <div>
          <div className="bg-white rounded-2xl shadow-xl border border-gray-100 p-8">
            <div className="mb-8 text-center">
              <div className="inline-flex items-center bg-emerald-100 text-emerald-800 rounded-full px-4 py-2 mb-4">
                <EnvelopeIcon className="w-5 h-5 mr-2" />
                <span className="text-sm font-medium">Newsletter</span>
              </div>
              <h3 className="text-2xl font-bold text-gray-800 mb-2">
                Iscriviti alla Newsletter
              </h3>
              <p className="text-gray-600">
                Rimani aggiornato sui nostri concerti, eventi speciali e novità per le famiglie.
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  <UserIcon className="w-4 h-4 inline mr-1" />
                  Nome
                </label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-colors"
                  placeholder="Il tuo nome"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  <EnvelopeIcon className="w-4 h-4 inline mr-1" />
                  Email
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-colors"
                  placeholder="la.tua.email@esempio.com"
                  required
                />
              </div>

              <div className="flex items-start space-x-3">
                <input
                  type="checkbox"
                  id="privacy"
                  className="w-4 h-4 text-emerald-600 border-gray-300 rounded focus:ring-emerald-500 mt-1"
                  required
                />
                <label htmlFor="privacy" className="text-sm text-gray-700">
                  Accetto di ricevere comunicazioni via email e dichiaro di aver letto e accettato la{' '}
                  <a href="#" className="text-emerald-600 hover:text-emerald-700 underline">privacy policy</a>.
                </label>
              </div>

              <div className="pt-4">
                <button
                  type="submit"
                  className="w-full py-4 px-6 bg-emerald-600 text-white font-medium rounded-lg hover:bg-emerald-700 focus:ring-4 focus:ring-emerald-600/20 transition-all duration-200 shadow-lg hover:transform hover:scale-[1.02] active:scale-[0.98] flex items-center justify-center"
                >
                  <EnvelopeIcon className="w-5 h-5 mr-2" />
                  Iscriviti alla Newsletter
                </button>
              </div>

              <div className="text-center">
                <p className="text-xs text-gray-500">
                  Potrai disiscriverti in qualsiasi momento. Non condivideremo mai i tuoi dati.
                </p>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}