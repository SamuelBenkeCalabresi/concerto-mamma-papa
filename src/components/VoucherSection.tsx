'use client';

import React from 'react';
import { useTranslations } from 'next-intl';

export default function VoucherSection() {
  const t = useTranslations('VoucherSection');
  
  const handleViewFullscreen = () => {
    window.open('/images/LOCANDINA-PER-IL-COUPON.jpg', '_blank');
  };

  return (
    <>
      <section className="relative overflow-hidden">
        {/* Hero-style background with gradient */}
        <div className="">
       

          {/* Content with white background section */}
          <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
            <div className="bg-white/95 backdrop-blur-sm rounded-3xl shadow-2xl p-8 lg:p-12 border border-white/20">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                
                {/* Left side - Content */}
                <div className="order-2 lg:order-1">
                  <div className="mb-8">
                    <div className="inline-flex items-center bg-gradient-to-r from-emerald-100 to-blue-100 text-emerald-800 rounded-full px-4 py-2 mb-6">
                      <svg className="w-5 h-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v13m0-13V6a2 2 0 112 2h-2zm0 0V5.5A2.5 2.5 0 109.5 8H12zm-7 4h14M5 12a2 2 0 110-4h14a2 2 0 110 4M5 12v7a2 2 0 002 2h10a2 2 0 002-2v-7" />
                      </svg>
                      <span className="text-sm font-medium">{t('tag')}</span>
                    </div>
                    
                    <h2 className="text-4xl lg:text-5xl font-bold mb-4 leading-tight">
                      {t('title')} <span className="bg-gradient-to-r from-emerald-600 to-blue-600 bg-clip-text text-transparent">{t('titleHighlight')}</span>
                    </h2>
                    
                    <p className="text-xl lg:text-2xl text-gray-600 mb-6 leading-relaxed">
                      {t('subtitle')}
                    </p>
                  </div>

                  <div className="space-y-4 mb-8">
                    {[0, 1, 2].map((index) => (
                      <div key={index} className="flex items-center">
                        <div className="w-8 h-8 bg-gradient-to-r from-emerald-100 to-blue-100 rounded-full flex items-center justify-center mr-4 flex-shrink-0">
                          <svg className="w-4 h-4 text-emerald-600" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                          </svg>
                        </div>
                        <span className="text-lg text-gray-700">{t(`features.${index}`)}</span>
                      </div>
                    ))}
                  </div>

                  <div className="flex flex-col sm:flex-row gap-4">
                    <button
                      onClick={handleViewFullscreen}
                      className="bg-gradient-to-r from-emerald-600 to-blue-600 text-white font-bold py-4 px-8 rounded-xl hover:from-emerald-700 hover:to-blue-700 transition-all duration-300 transform hover:scale-105 shadow-lg"
                    >
                      {t('buttons.discover')}
                    </button>
                    
                    <button 
                      onClick={() => document.getElementById('contatti')?.scrollIntoView({ behavior: 'smooth' })}
                      className="bg-white text-emerald-600 font-semibold py-4 px-8 rounded-xl hover:bg-gray-50 transition-all duration-300 border-2 border-emerald-200 hover:border-emerald-300"
                    >
                      {t('buttons.contact')}
                    </button>
                  </div>
                </div>

                {/* Right side - Visual */}
                <div className="order-1 lg:order-2 flex justify-center">
                  <div className="relative group cursor-pointer" onClick={handleViewFullscreen}>
                    <div className="bg-gradient-to-br from-blue-50 to-purple-50 rounded-3xl shadow-xl hover:shadow-2xl border border-blue-200/50 hover:border-blue-300/70 overflow-hidden transition-all duration-300 transform group-hover:scale-105 p-6">
                      
                      {/* Locandina preview */}
                      <div className="relative w-72 h-80 bg-gradient-to-br from-emerald-100 to-blue-100 rounded-2xl shadow-inner overflow-hidden">
                        <div className="w-full h-full flex flex-col items-center justify-center">
                          <div className="text-center p-6">
                            <div className="w-16 h-16 bg-gradient-to-r from-emerald-200 to-blue-200 rounded-full flex items-center justify-center mx-auto mb-4">
                              <svg className="w-8 h-8 text-emerald-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                              </svg>
                            </div>
                            <h3 className="font-bold text-lg mb-2 text-emerald-800">Locandina Coupon</h3>
                            <p className="text-sm text-emerald-600">Clicca per visualizzare</p>
                          </div>
                        </div>
                      </div>
                      
                      {/* Hover effect overlay */}
                      <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/20 to-blue-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center rounded-3xl">
                        <div className="bg-gradient-to-r from-emerald-600 to-blue-600 text-white px-4 py-2 rounded-lg font-semibold">
                          Visualizza Locandina
                        </div>
                      </div>
                    </div>

                    {/* Gift icon */}
                    <div className="absolute -top-4 -right-4 w-12 h-12 bg-gradient-to-r from-emerald-600 to-blue-600 rounded-full flex items-center justify-center shadow-lg">
                      <span className="text-white font-bold text-lg">🎁</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

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
    </>
  );
}