'use client';

import { useTranslations } from 'next-intl';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import BookingForm from '@/components/BookingForm';
import { 
  CalendarDaysIcon,
  MusicalNoteIcon,
  UserGroupIcon,
  ClipboardDocumentListIcon
} from '@heroicons/react/24/outline';

export default function PrenotaPage() {
  const t = useTranslations('Booking');
  
  return (
    <main className="min-h-screen bg-base-100">
      <Header />
      
      {/* Hero Section */}
      <section className="relative overflow-hidden">
        <div className="relative min-h-[60vh] bg-gradient-to-br from-emerald-900 via-teal-800 to-blue-900">
          <div className="absolute inset-0 bg-gradient-to-r from-black/40 via-black/20 to-black/40"></div>
          
          {/* Decorative Elements */}
          <div className="absolute inset-0 overflow-hidden px-4">
            <div className="absolute top-16 left-8 w-20 h-20 opacity-10">
              <ClipboardDocumentListIcon className="w-full h-full text-white animate-pulse" />
            </div>
            <div className="absolute top-32 right-16 w-16 h-16 opacity-20">
              <UserGroupIcon className="w-full h-full text-white animate-bounce" />
            </div>
            <div className="absolute bottom-20 left-12 w-24 h-24 opacity-15">
              <CalendarDaysIcon className="w-full h-full text-white" />
            </div>
            <div className="absolute top-40 left-1/4 ml-8 text-white/20 text-3xl animate-bounce">📅</div>
            <div className="absolute top-20 right-1/4 mr-8 text-white/20 text-4xl animate-pulse">👨‍👩‍👧‍👦</div>
            <div className="absolute bottom-32 right-1/3 mr-4 text-white/20 text-2xl animate-bounce">✍️</div>
          </div>

          <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
            <div className="text-center">
              <div className="inline-flex items-center bg-white/10 backdrop-blur-sm text-white rounded-full px-4 py-2 mb-6">
                <ClipboardDocumentListIcon className="w-5 h-5 mr-2" />
                <span className="text-sm font-medium">{t('form.bookingForm')}</span>
              </div>
              
              <h1 className="text-4xl lg:text-6xl font-bold text-white leading-tight mb-6">
                <span className="block">{t('title')}</span>
                <span className="block text-emerald-300">{t('subtitle').split(' ').slice(-2).join(' ')}</span>
              </h1>
              
              <div className="max-w-4xl mx-auto text-white/90 space-y-4 mb-8">
                <p className="text-lg leading-relaxed">
                  {t('warning')}
                </p>
                <p className="text-base text-white/80">
                  {t('requiredNote')}
                </p>
              </div>

              {/* Features */}
              <div className="grid grid-cols-3 gap-6 text-center max-w-md mx-auto">
                <div className="flex flex-col items-center">
                  <div className="bg-white/10 backdrop-blur-sm p-3 rounded-xl mb-2">
                    <CalendarDaysIcon className="h-6 w-6 text-white" />
                  </div>
                  <span className="text-xs font-medium text-white">{t('features.chooseDate')}</span>
                </div>
                <div className="flex flex-col items-center">
                  <div className="bg-white/10 backdrop-blur-sm p-3 rounded-xl mb-2">
                    <UserGroupIcon className="h-6 w-6 text-white" />
                  </div>
                  <span className="text-xs font-medium text-white">{t('features.addFamily')}</span>
                </div>
                <div className="flex flex-col items-center">
                  <div className="bg-white/10 backdrop-blur-sm p-3 rounded-xl mb-2">
                    <MusicalNoteIcon className="h-6 w-6 text-white" />
                  </div>
                  <span className="text-xs font-medium text-white">{t('features.enjoyConcert')}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Bottom Wave */}
          <div className="absolute bottom-0 left-0 w-full overflow-hidden leading-none">
            <svg className="relative block w-full h-20" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 120" preserveAspectRatio="none">
              <path d="M985.66,92.83C906.67,72,823.78,31,743.84,14.19c-82.26-17.34-168.06-16.33-250.45.39-57.84,11.73-114,31.07-172,41.86A600.21,600.21,0,0,1,0,27.35V120H1200V95.8C1132.19,118.92,1055.71,111.31,985.66,92.83Z" className="fill-base-100"></path>
            </svg>
          </div>
        </div>
      </section>

      {/* Booking Form Section */}
      <section className="py-16 bg-base-100">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <BookingForm />
        </div>
      </section>
      
      <Footer />
    </main>
  );
}