'use client';

import { useTranslations, useLocale } from 'next-intl';
import { Link } from '@/i18n/routing';
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
    <footer className="relative overflow-hidden">
      {/* Hero-style Background */}
      <div className="relative bg-gradient-to-br from-emerald-900 via-teal-800 to-blue-900">
        {/* Background Overlay */}
        <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-black/40 to-black/60"></div>
        
        {/* Decorative Musical Elements */}
        <div className="absolute inset-0 overflow-hidden px-4">
          <div className="absolute top-16 left-10 w-24 h-24 opacity-10">
            <MusicalNoteIcon className="w-full h-full text-white animate-pulse" />
          </div>
          <div className="absolute top-32 right-20 w-20 h-20 opacity-20">
            <EnvelopeIcon className="w-full h-full text-white animate-bounce" style={{animationDuration: '3s'}} />
          </div>
          <div className="absolute bottom-32 left-16 w-28 h-28 opacity-15">
            <PhoneIcon className="w-full h-full text-white" />
          </div>
          {/* Musical notes scattered */}
          <div className="absolute top-40 left-1/4 ml-8 text-white/20 text-3xl animate-float">♪</div>
          <div className="absolute top-20 right-1/4 mr-8 text-white/20 text-4xl animate-float-delayed">♫</div>
          <div className="absolute bottom-40 right-1/3 mr-4 text-white/20 text-2xl animate-float">♪</div>
        </div>

        {/* Top Wave */}
        <div className="absolute top-0 left-0 w-full overflow-hidden leading-none">
          <svg className="relative block w-full h-20 rotate-180" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 120" preserveAspectRatio="none">
            <path d="M985.66,92.83C906.67,72,823.78,31,743.84,14.19c-82.26-17.34-168.06-16.33-250.45.39-57.84,11.73-114,31.07-172,41.86A600.21,600.21,0,0,1,0,27.35V120H1200V95.8C1132.19,118.92,1055.71,111.31,985.66,92.83Z" className="fill-base-100"></path>
          </svg>
        </div>

        {/* Footer Content */}
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {/* Brand Section */}
            <div className="lg:col-span-2">
              <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20">
                <div className="flex items-center mb-4">
                  <div className="bg-emerald-600/80 backdrop-blur-sm p-3 rounded-xl mr-4">
                    <MusicalNoteIcon className="h-8 w-8 text-white" />
                  </div>
                  <h3 className="text-xl font-bold text-white">{t('brandTitle')}</h3>
                </div>
                <p className="text-white/80 mb-6 max-w-md leading-relaxed">
                  {t('brandDescription')}
                </p>
                <div className="flex space-x-4">
                  <a href="https://www.facebook.com/diconcertoconmammaepapa" target="_blank" rel="noopener noreferrer" className="bg-blue-600 hover:bg-blue-700 p-3 rounded-xl text-white transition-all duration-300">
                    <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                      <path fillRule="evenodd" d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" clipRule="evenodd" />
                    </svg>
                  </a>
                </div>
              </div>
            </div>

            {/* Quick Links */}
            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20">
              <h4 className="text-lg font-semibold mb-4 text-white flex items-center gap-2">
                <div className="w-2 h-2 bg-emerald-300 rounded-full"></div>
                {t('quickLinks')}
              </h4>
              <ul className="space-y-3">
                <li>
                  <Link href="/" className="text-white/80 hover:text-white transition-colors flex items-center gap-2 p-2 rounded-lg hover:bg-white/10">
                    <div className="w-1 h-1 bg-white/50 rounded-full"></div>
                    {tNav('home')}
                  </Link>
                </li>
                <li>
                  <Link href="/corsi" className="text-white/80 hover:text-white transition-colors flex items-center gap-2 p-2 rounded-lg hover:bg-white/10">
                    <div className="w-1 h-1 bg-white/50 rounded-full"></div>
                    {tNav('courses')}
                  </Link>
                </li>
                <li>
                  <Link href="/about" className="text-white/80 hover:text-white transition-colors flex items-center gap-2 p-2 rounded-lg hover:bg-white/10">
                    <div className="w-1 h-1 bg-white/50 rounded-full"></div>
                    {tNav('about')}
                  </Link>
                </li>
                <li>
                  <Link href="/prenota" className="text-white/80 hover:text-white transition-colors flex items-center gap-2 p-2 rounded-lg hover:bg-white/10">
                    <div className="w-1 h-1 bg-white/50 rounded-full"></div>
                    {tNav('booking')}
                  </Link>
                </li>
                <li>
                  <Link href="/contact" className="text-white/80 hover:text-white transition-colors flex items-center gap-2 p-2 rounded-lg hover:bg-white/10">
                    <div className="w-1 h-1 bg-white/50 rounded-full"></div>
                    {tNav('contact')}
                  </Link>
                </li>
              </ul>
            </div>

            {/* Contact Info */}
            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20">
              <h4 className="text-lg font-semibold mb-4 text-white flex items-center gap-2">
                <div className="w-2 h-2 bg-teal-300 rounded-full"></div>
                {t('contact')}
              </h4>
              <div className="space-y-4">
                <div className="flex items-start">
                  <div className="bg-white/20 backdrop-blur-sm p-2 rounded-lg mr-3 mt-0.5 flex-shrink-0">
                    <EnvelopeIcon className="h-4 w-4 text-white" />
                  </div>
                  <a
                    href={`mailto:${t('email')}`}
                    className="text-white/80 hover:text-white transition-colors text-sm break-all"
                  >
                    {t('email')}
                  </a>
                </div>
                <div className="flex items-center">
                  <div className="bg-white/20 backdrop-blur-sm p-2 rounded-lg mr-3 flex-shrink-0">
                    <PhoneIcon className="h-4 w-4 text-white" />
                  </div>
                  <a
                    href={`tel:${t('phone')}`}
                    className="text-white/80 hover:text-white transition-colors text-sm"
                  >
                    {t('phone')}
                  </a>
                </div>
                <div className="flex items-center">
                  <div className="bg-white/20 backdrop-blur-sm p-2 rounded-lg mr-3 flex-shrink-0">
                    <PhoneIcon className="h-4 w-4 text-white" />
                  </div>
                  <a
                    href={`tel:${t('phone')}`}
                    className="text-white/80 hover:text-white transition-colors text-sm"
                  >
                    {t('phone2')}
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* Bottom Copyright Section */}
          <div className="border-t border-white/20 mt-12 pt-8">
            <div className="bg-white/5 backdrop-blur-sm rounded-xl p-6 border border-white/10">
              <div className="flex flex-col md:flex-row justify-between items-center">
                <p className="text-white/70 text-sm">
                  {t('copyright')}
                </p>
                <div className="flex items-center mt-4 md:mt-0">
                  <span className="text-white/70 text-sm mr-4">{t('followUs')}</span>
                  <div className="flex space-x-3">
                    <a href="https://www.facebook.com/diconcertoconmammaepapa" target="_blank" className="text-white/70 hover:text-white transition-colors bg-white/10 px-3 py-1 rounded-lg hover:bg-white/20">
                      Facebook
                    </a>
                  {/*   <a href="#" className="text-white/70 hover:text-white transition-colors bg-white/10 px-3 py-1 rounded-lg hover:bg-white/20">
                      Instagram
                    </a> */}
                  {/*   <a href="#" className="text-white/70 hover:text-white transition-colors bg-white/10 px-3 py-1 rounded-lg hover:bg-white/20">
                      YouTube
                    </a> */}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Floating decorative elements */}
        <div className="absolute -bottom-6 -right-6 w-32 h-32 bg-emerald-400/20 rounded-full blur-xl animate-pulse"></div>
        <div className="absolute -top-6 -left-6 w-40 h-40 bg-teal-400/20 rounded-full blur-xl animate-pulse" style={{animationDelay: '1s'}}></div>
        <div className="absolute top-1/2 -right-8 w-24 h-24 bg-blue-400/30 rounded-full blur-lg animate-bounce" style={{animationDuration: '4s'}}></div>
      </div>

      {/* Custom animations */}
      <style jsx>{`
        @keyframes float {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-20px); }
        }
        @keyframes float-delayed {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-15px); }
        }
        .animate-float {
          animation: float 4s ease-in-out infinite;
        }
        .animate-float-delayed {
          animation: float-delayed 3s ease-in-out infinite 1.5s;
        }
      `}</style>
    </footer>
  );
}