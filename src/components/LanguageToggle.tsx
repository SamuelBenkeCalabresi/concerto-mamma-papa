'use client';

import { useState } from 'react';
import { useLocale } from 'next-intl';
import { useRouter } from 'next/navigation';
import { usePathname } from 'next/navigation';
import { GlobeAltIcon, XMarkIcon } from '@heroicons/react/24/outline';

export default function LanguageToggle() {
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleLocaleChange = (newLocale: string) => {
    // Get the path without the locale prefix
    const pathWithoutLocale = pathname.replace(/^\/[a-z]{2}/, '') || '/';
    const newPath = `/${newLocale}${pathWithoutLocale}`;
    setIsModalOpen(false);
    router.push(newPath);
  };

  const getCurrentLanguage = () => {
    return locale === 'it' ? { flag: '🇮🇹', code: 'IT' } : { flag: '🇬🇧', code: 'EN' };
  };

  const currentLang = getCurrentLanguage();

  return (
    <>
      {/* Language Toggle Button */}
      <button
        onClick={() => setIsModalOpen(true)}
        className="btn btn-ghost btn-sm gap-1 hover:bg-primary/5 transition-colors"
      >
{/*         <GlobeAltIcon className="h-4 w-4 text-primary" />
 */}        <span className="text-xs font-medium">{currentLang.flag} {currentLang.code}</span>
      </button>

      {/* Language Selection Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-xl p-6 m-4 w-full max-w-sm">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-neutral">
                {locale === 'it' ? 'Seleziona Lingua' : 'Choose Language'}
              </h3>
              <button
                onClick={() => setIsModalOpen(false)}
                className="btn btn-ghost btn-circle btn-sm"
              >
                <XMarkIcon className="h-4 w-4" />
              </button>
            </div>
            
            <div className="space-y-2">
              <button
                onClick={() => handleLocaleChange('it')}
                className={`w-full flex items-center gap-3 p-3 rounded-lg transition-colors ${
                  locale === 'it' 
                    ? 'bg-primary text-white' 
                    : 'hover:bg-gray-100 text-neutral bg-white'
                }`}
              >
                <span className="text-xl">🇮🇹</span>
                <div className="text-left flex-1">
                  <div className={`font-medium text-gray-900`}>
                    Italiano
                  </div>
                  <div className={`text-sm text-gray-600`}>
                    Italian
                  </div>
                </div>
                <div className="ml-auto">
                  {locale === 'it' ? (
                    <div className="w-2 h-2 bg-white rounded-full"></div>
                  ) : (
                    <div className="w-2 h-2"></div>
                  )}
                </div>
              </button>

              <button
                onClick={() => handleLocaleChange('en')}
                className={`w-full flex items-center gap-3 p-3 rounded-lg transition-colors ${
                  locale === 'en' 
                    ? 'bg-primary text-white' 
                    : 'hover:bg-gray-100 text-neutral bg-white'
                }`}
              >
                <span className="text-xl">🇬🇧</span>
                <div className="text-left flex-1">
                  <div className={`font-medium text-gray-900`}>
                    English
                  </div>
                  <div className={`text-sm text-gray-600`}>
                    Inglese
                  </div>
                </div>
                <div className="ml-auto">
                  {locale === 'en' ? (
                    <div className="w-2 h-2 bg-white rounded-full"></div>
                  ) : (
                    <div className="w-2 h-2"></div>
                  )}
                </div>
              </button>
            </div>

            <div className="mt-4 pt-3 border-t border-gray-200">
              <button
                onClick={() => setIsModalOpen(false)}
                className="w-full btn btn-ghost btn-sm"
              >
                {locale === 'it' ? 'Annulla' : 'Cancel'}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}