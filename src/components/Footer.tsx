'use client';

import { useTranslations } from 'next-intl';
import Link from 'next/link';
import { useLocale } from 'next-intl';
import { 
  MapPinIcon, 
  EnvelopeIcon, 
  PhoneIcon,
  MusicalNoteIcon
} from '@heroicons/react/24/outline';

export default function Footer() {
  const t = useTranslations('Footer');
  const tNav = useTranslations('Navigation');
  const locale = useLocale();

  return (
    <footer className="bg-neutral text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Brand Section */}
          <div className="lg:col-span-2">
            <div className="flex items-center mb-4">
              <MusicalNoteIcon className="h-8 w-8 text-primary mr-3" />
              <h3 className="text-xl font-bold">Concerti con Mamma e Papà</h3>
            </div>
            <p className="text-gray-600 mb-6 max-w-md">
              Attività musicale interattiva per tutta la famiglia. Concerti pensati appositamente per famiglie con bambini dai 0 ai 5 anni.
            </p>
            <div className="flex space-x-4">
              <a href="https://www.facebook.com/diconcertoconmammaepapa" target="_blank" rel="noopener noreferrer" className="text-gray-600 hover:text-primary transition-colors">
                <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                  <path fillRule="evenodd" d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" clipRule="evenodd" />
                </svg>
              </a>
              
              
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-semibold mb-4">{t('quickLinks')}</h4>
            <ul className="space-y-2">
              <li>
                <Link href={`/${locale}`} className="text-gray-600 hover:text-primary transition-colors">
                  {tNav('home')}
                </Link>
              </li>
              <li>
                <Link href={`/${locale}/concerts`} className="text-gray-600 hover:text-primary transition-colors">
                  {tNav('concerts')}
                </Link>
              </li>
              <li>
                <Link href={`/${locale}/about`} className="text-gray-600 hover:text-primary transition-colors">
                  {tNav('about')}
                </Link>
              </li>
              <li>
                <Link href={`/${locale}/booking`} className="text-gray-600 hover:text-primary transition-colors">
                  {tNav('booking')}
                </Link>
              </li>
              <li>
                <Link href={`/${locale}/contact`} className="text-gray-600 hover:text-primary transition-colors">
                  {tNav('contact')}
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="text-lg font-semibold mb-4">{t('contact')}</h4>
            <div className="space-y-3">
              <div className="flex items-start">
                <MapPinIcon className="h-5 w-5 text-primary mr-3 mt-0.5 flex-shrink-0" />
                <span className="text-gray-600 text-sm whitespace-pre-line">
                  {t('address')}
                </span>
              </div>
              <div className="flex items-center">
                <EnvelopeIcon className="h-5 w-5 text-primary mr-3 flex-shrink-0" />
                <a 
                  href={`mailto:${t('email')}`} 
                  className="text-gray-600 hover:text-primary transition-colors text-sm"
                >
                  {t('email')}
                </a>
              </div>
              <div className="flex items-center">
                <PhoneIcon className="h-5 w-5 text-primary mr-3 flex-shrink-0" />
                <a 
                  href={`tel:${t('phone')}`} 
                  className="text-gray-600 hover:text-primary transition-colors text-sm"
                >
                  {t('phone')}
                </a>
              </div>
              <div className="flex items-center">
                <PhoneIcon className="h-5 w-5 text-primary mr-3 flex-shrink-0" />
                <a 
                  href={`tel:${t('phone')}`} 
                  className="text-gray-600 hover:text-primary transition-colors text-sm"
                >
                  {t('phone2')}
                </a>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-700 mt-12 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-600 text-sm">
              {t('copyright')}
            </p>
            <div className="flex items-center mt-4 md:mt-0">
              <span className="text-gray-600 text-sm mr-4">{t('followUs')}</span>
              <div className="flex space-x-3">
                <a href="https://www.facebook.com/diconcertoconmammaepapa" target="_blank" className="text-gray-600 hover:text-primary transition-colors">
                  Facebook
                </a>
                <a href="#" className="text-gray-600 hover:text-primary transition-colors">
                  Instagram
                </a>
                <a href="#" className="text-gray-600 hover:text-primary transition-colors">
                  YouTube
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}