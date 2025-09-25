'use client';

import { useTranslations, useLocale } from 'next-intl';
import { Link } from '@/i18n/routing';
import { MusicalNoteIcon, HeartIcon, UsersIcon, PlayIcon, CalendarDaysIcon, MapPinIcon } from '@heroicons/react/24/outline';

export default function Hero() {
  const t = useTranslations('Hero');
  const locale = useLocale();

  return (
    <section className="relative overflow-hidden">
      {/* Hero Image Background */}
      <div className="relative min-h-[95vh] bg-gradient-to-br from-emerald-900 via-teal-800 to-blue-900">
        {/* Background Image Overlay - Using CSS for a music/family concert scene */}
        <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-black/40 to-black/60"></div>
        
        {/* Decorative Musical Elements */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-20 left-10 w-32 h-32 opacity-10">
            <MusicalNoteIcon className="w-full h-full text-white animate-pulse" />
          </div>
          <div className="absolute top-40 right-20 w-24 h-24 opacity-20">
            <HeartIcon className="w-full h-full text-white animate-bounce" style={{animationDuration: '3s'}} />
          </div>
          <div className="absolute bottom-32 left-16 w-28 h-28 opacity-15">
            <UsersIcon className="w-full h-full text-white" />
          </div>
          {/* Musical notes scattered */}
          <div className="absolute top-60 left-1/3 text-white/20 text-4xl animate-float">♪</div>
          <div className="absolute top-32 right-1/3 text-white/20 text-5xl animate-float-delayed">♫</div>
          <div className="absolute bottom-40 right-1/4 text-white/20 text-3xl animate-float">♪</div>
        </div>

        {/* Hero Content */}
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:py-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center min-h-[60vh]">
            {/* Text Content */}
            <div className="text-center lg:text-left">
              <div className="inline-block bg-primary/20 backdrop-blur-sm rounded-full px-4 py-2 mb-6">
                <span className="text-white text-sm font-medium flex items-center gap-2">
                  <MusicalNoteIcon className="h-4 w-4" />
                  {t('tag')}
                </span>
              </div>

              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-tight mb-8">
                <span className="bg-gradient-to-r from-green-300 to-blue-400 bg-clip-text text-transparent">
                  Di Concerto
                </span>{' '}
                <span className="bg-gradient-to-r from-emerald-300 to-teal-300 bg-clip-text text-transparent">
                  con Mamma
                </span>{' '}
                <span className="bg-gradient-to-r from-teal-300 to-blue-300 bg-clip-text text-transparent">
                  e Papà
                </span>
              </h1>

              <p className="text-base text-white/80 mb-10 max-w-3xl leading-relaxed">
                {t('description')}
              </p>
              
              {/* Features */}
              <div className="grid grid-cols-3 gap-6 text-center lg:text-left">
                <div className="flex flex-col items-center lg:items-start">
                  <div className="bg-white/10 backdrop-blur-sm p-4 rounded-xl mb-3">
                    <MusicalNoteIcon className="h-8 w-8 text-white" />
                  </div>
                  <span className="text-sm font-medium text-white">{t('features.interactive.title')}</span>
                  <span className="text-xs text-white/70">{t('features.interactive.subtitle')}</span>
                </div>
                <div className="flex flex-col items-center lg:items-start">
                  <div className="bg-white/10 backdrop-blur-sm p-4 rounded-xl mb-3">
                    <HeartIcon className="h-8 w-8 text-white" />
                  </div>
                  <span className="text-sm font-medium text-white">{t('features.family.title')}</span>
                  <span className="text-xs text-white/70">{t('features.family.subtitle')}</span>
                </div>
                <div className="flex flex-col items-center lg:items-start">
                  <div className="bg-white/10 backdrop-blur-sm p-4 rounded-xl mb-3">
                    <UsersIcon className="h-8 w-8 text-white" />
                  </div>
                  <span className="text-sm font-medium text-white">{t('features.age.title')}</span>
                  <span className="text-xs text-white/70">{t('features.age.subtitle')}</span>
                </div>
              </div>
            </div>
            
            {/* Image/Video Section */}
            <div className="relative">
              {/* Main Hero Image/Video Card */}
              <div className="bg-white/10 backdrop-blur-lg rounded-3xl shadow-2xl p-8 max-w-md mx-auto lg:max-w-none border border-white/20">
                {/* Hero Video */}
                <div className="aspect-[4/3] rounded-2xl mb-6 relative overflow-hidden group">
                  <video 
                    ref={(video) => {
                      if (video) {
                        video.addEventListener('play', () => {
                          const overlay = video.parentElement?.querySelector('.video-overlay') as HTMLElement;
                          if (overlay) {
                            overlay.style.display = 'none';
                          }
                        });
                        video.addEventListener('pause', () => {
                          const overlay = video.parentElement?.querySelector('.video-overlay') as HTMLElement;
                          if (overlay && video.currentTime === 0) {
                            overlay.style.display = 'flex';
                          }
                        });
                      }
                    }}
                    className="w-full h-full object-cover rounded-2xl bg-gradient-to-br from-emerald-400 via-teal-400 to-blue-400"
                    preload="metadata"
                    controls
                    playsInline
                    onLoadStart={(e) => {
                      // Ensure the video shows a nice background while loading
                      e.currentTarget.style.backgroundColor = 'transparent';
                    }}
                  >
                    <source src="/images/hero-video.mp4" type="video/mp4" />
                    {/* Fallback content */}
                    <div className="absolute inset-0 bg-gradient-to-br from-emerald-400 via-teal-400 to-blue-400 flex items-center justify-center">
                      <div className="text-center text-white">
                        <div className="bg-white/20 backdrop-blur-sm rounded-full p-6 mb-4 mx-auto w-24 h-24 flex items-center justify-center">
                          <PlayIcon className="h-12 w-12 text-white" />
                        </div>
                        <p className="font-semibold text-lg mb-2">{t('video.notAvailable')}</p>
                        <p className="text-sm opacity-80">{t('video.browserNotSupported')}</p>
                      </div>
                    </div>
                  </video>
                  
                  {/* Video Preview Overlay - Clickable */}
                  <div 
                    className="video-overlay absolute inset-0 bg-gradient-to-br from-emerald-400/90 via-teal-400/85 to-blue-400/90 rounded-2xl flex items-center justify-center cursor-pointer hover:opacity-95 transition-all duration-300"
                    onClick={(e) => {
                      const video = e.currentTarget.previousElementSibling as HTMLVideoElement;
                      if (video) {
                        video.play();
                      }
                    }}
                  >
                    <div className="text-center text-white p-6">
                      <div className="bg-white/20 backdrop-blur-sm rounded-full p-6 mb-6 mx-auto w-24 h-24 flex items-center justify-center hover:scale-110 transition-transform duration-300">
                        <PlayIcon className="h-12 w-12 text-white" />
                      </div>
                      <h3 className="text-xl font-bold mb-3">{t('video.watchTitle')}</h3>
                      <p className="text-white/90 text-sm mb-4 leading-relaxed max-w-xs mx-auto">
                        {t('video.watchDescription')}
                      </p>
                      <div className="flex items-center justify-center gap-2 text-white/80 text-xs">
                        <div className="w-2 h-2 bg-white/60 rounded-full"></div>
                        <span>{t('video.liveExamples')}</span>
                        <div className="w-2 h-2 bg-white/60 rounded-full"></div>
                      </div>
                    </div>
                  </div>
                  
                  {/* Decorative musical notes */}
                  <div className="absolute top-4 left-4 text-white/30 text-2xl pointer-events-none animate-pulse">♪</div>
                  <div className="absolute bottom-4 right-4 text-white/30 text-xl pointer-events-none animate-pulse" style={{animationDelay: '1s'}}>♫</div>
                  <div className="absolute top-1/2 right-6 text-white/20 text-lg pointer-events-none animate-pulse" style={{animationDelay: '2s'}}>♪</div>
                </div>
                
                {/* Next Concert Info */}
                <div className="text-center">
                  <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 mb-4">
                    <h3 className="font-semibold text-white mb-3 flex items-center justify-center gap-2">
                      <CalendarDaysIcon className="h-5 w-5" />
                      {t('nextConcert.title')}
                    </h3>
                    <p className="text-blue-200 font-bold text-xl mb-1">{t('nextConcert.event')}</p>
                    <p className="text-white/90 font-medium mb-1">{t('nextConcert.date')}</p>
                    <p className="text-white/70 text-sm flex items-center justify-center gap-1 mb-3">
                      <MapPinIcon className="h-4 w-4" />
                      {t('nextConcert.location')}
                    </p>
                    <Link href="/calendario" className="btn btn-primary btn-sm w-full">
                      {t('nextConcert.bookNow')}
                    </Link>
                  </div>
                </div>
              </div>
              
              {/* Floating decorative elements */}
              <div className="absolute -top-6 -right-6 w-32 h-32 bg-emerald-400/20 rounded-full blur-xl animate-pulse"></div>
              <div className="absolute -bottom-6 -left-6 w-40 h-40 bg-teal-400/20 rounded-full blur-xl animate-pulse" style={{animationDelay: '1s'}}></div>
              <div className="absolute top-1/2 -right-8 w-24 h-24 bg-blue-400/30 rounded-full blur-lg animate-bounce" style={{animationDuration: '4s'}}></div>
            </div>
          </div>
        </div>

        {/* Top Wave - connecting from slider */}
        <div className="absolute top-0 left-0 w-full overflow-hidden leading-none">
          <svg className="relative block w-full h-20 rotate-180" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 120" preserveAspectRatio="none">
            <path d="M985.66,92.83C906.67,72,823.78,31,743.84,14.19c-82.26-17.34-168.06-16.33-250.45.39-57.84,11.73-114,31.07-172,41.86A600.21,600.21,0,0,1,0,27.35V120H1200V95.8C1132.19,118.92,1055.71,111.31,985.66,92.83Z" className="fill-emerald-900"></path>
          </svg>
        </div>

        {/* Bottom Wave */}
        <div className="absolute bottom-0 left-0 w-full overflow-hidden leading-none">
          <svg className="relative block w-full h-20" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 120" preserveAspectRatio="none">
            <path d="M985.66,92.83C906.67,72,823.78,31,743.84,14.19c-82.26-17.34-168.06-16.33-250.45.39-57.84,11.73-114,31.07-172,41.86A600.21,600.21,0,0,1,0,27.35V120H1200V95.8C1132.19,118.92,1055.71,111.31,985.66,92.83Z" className="fill-base-100"></path>
          </svg>
        </div>
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
    </section>
  );
}