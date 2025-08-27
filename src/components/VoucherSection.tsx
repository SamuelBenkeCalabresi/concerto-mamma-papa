'use client';

import React from 'react';

export default function VoucherSection() {
  const handleViewFullscreen = () => {
    window.open('/images/LOCANDINA-PER-IL-COUPON.jpg', '_blank');
  };

  return (
    <>
      <section className="relative overflow-hidden">
        {/* Hero-style background with gradient */}
        <div className="relative min-h-[70vh] bg-gradient-to-br from-blue-900 via-blue-800 to-purple-900">
          {/* Background overlay for readability */}
          <div className="absolute inset-0 bg-gradient-to-r from-black/40 via-black/20 to-black/40"></div>
          
          {/* Decorative Musical Elements */}
          <div className="absolute inset-0 overflow-hidden">
            <div className="absolute top-16 left-8 w-20 h-20 opacity-10">
              <svg className="w-full h-full text-white animate-pulse" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v13m0-13V6a2 2 0 112 2h-2zm0 0V5.5A2.5 2.5 0 109.5 8H12zm-7 4h14M5 12a2 2 0 110-4h14a2 2 0 110 4M5 12v7a2 2 0 002 2h10a2 2 0 002-2v-7" />
              </svg>
            </div>
            <div className="absolute top-32 right-16 w-16 h-16 opacity-20">
              <svg className="w-full h-full text-white animate-bounce" fill="currentColor" viewBox="0 0 20 20" style={{animationDuration: '3s'}}>
                <path fillRule="evenodd" d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" clipRule="evenodd" />
              </svg>
            </div>
            <div className="absolute bottom-20 left-12 w-24 h-24 opacity-15">
              <svg className="w-full h-full text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
              </svg>
            </div>
            {/* Musical notes scattered */}
            <div className="absolute top-40 left-1/4 text-white/20 text-3xl animate-float">♪</div>
            <div className="absolute top-20 right-1/4 text-white/20 text-4xl animate-float-delayed">♫</div>
            <div className="absolute bottom-32 right-1/3 text-white/20 text-2xl animate-float">♪</div>
          </div>

          {/* Content with white background section */}
          <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
            <div className="bg-white/95 backdrop-blur-sm rounded-3xl shadow-2xl p-8 lg:p-12 border border-white/20">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                
                {/* Left side - Content */}
                <div className="order-2 lg:order-1">
                  <div className="mb-8">
                    <div className="inline-flex items-center bg-gradient-to-r from-blue-100 to-purple-100 text-blue-800 rounded-full px-4 py-2 mb-6">
                      <svg className="w-5 h-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v13m0-13V6a2 2 0 112 2h-2zm0 0V5.5A2.5 2.5 0 109.5 8H12zm-7 4h14M5 12a2 2 0 110-4h14a2 2 0 110 4M5 12v7a2 2 0 002 2h10a2 2 0 002-2v-7" />
                      </svg>
                      <span className="text-sm font-medium">Regalo Perfetto</span>
                    </div>
                    
                    <h2 className="text-4xl lg:text-5xl font-bold mb-4 leading-tight">
                      Regala un <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">Coupon</span>
                    </h2>
                    
                    <p className="text-xl lg:text-2xl text-gray-600 mb-6 leading-relaxed">
                      Come partecipare a <em className="font-ms-madi bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">di Concerto con Mamma e Papà</em>
                    </p>
                  </div>

                  <div className="space-y-4 mb-8">
                    <div className="flex items-center">
                      <div className="w-8 h-8 bg-gradient-to-r from-blue-100 to-purple-100 rounded-full flex items-center justify-center mr-4 flex-shrink-0">
                        <svg className="w-4 h-4 text-blue-600" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                        </svg>
                      </div>
                      <span className="text-lg text-gray-700">Concerti per famiglie con bambini 0-5 anni</span>
                    </div>
                    
                    <div className="flex items-center">
                      <div className="w-8 h-8 bg-gradient-to-r from-blue-100 to-purple-100 rounded-full flex items-center justify-center mr-4 flex-shrink-0">
                        <svg className="w-4 h-4 text-blue-600" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                        </svg>
                      </div>
                      <span className="text-lg text-gray-700">Esperienze musicali interattive uniche</span>
                    </div>
                    
                    <div className="flex items-center">
                      <div className="w-8 h-8 bg-gradient-to-r from-blue-100 to-purple-100 rounded-full flex items-center justify-center mr-4 flex-shrink-0">
                        <svg className="w-4 h-4 text-blue-600" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                        </svg>
                      </div>
                      <span className="text-lg text-gray-700">Momenti speciali da condividere insieme</span>
                    </div>
                  </div>

                  <div className="flex flex-col sm:flex-row gap-4">
                    <button
                      onClick={handleViewFullscreen}
                      className="bg-gradient-to-r from-blue-600 to-purple-600 text-white font-bold py-4 px-8 rounded-xl hover:from-blue-700 hover:to-purple-700 transition-all duration-300 transform hover:scale-105 shadow-lg"
                    >
                      Scopri Come Partecipare
                    </button>
                    
                    <button 
                      onClick={() => document.getElementById('contatti')?.scrollIntoView({ behavior: 'smooth' })}
                      className="bg-white text-blue-600 font-semibold py-4 px-8 rounded-xl hover:bg-gray-50 transition-all duration-300 border-2 border-blue-200 hover:border-blue-300"
                    >
                      Contattaci per Info
                    </button>
                  </div>
                </div>

                {/* Right side - Visual */}
                <div className="order-1 lg:order-2 flex justify-center">
                  <div className="relative group cursor-pointer" onClick={handleViewFullscreen}>
                    <div className="bg-gradient-to-br from-blue-50 to-purple-50 rounded-3xl shadow-xl hover:shadow-2xl border border-blue-200/50 hover:border-blue-300/70 overflow-hidden transition-all duration-300 transform group-hover:scale-105 p-6">
                      
                      {/* Locandina preview */}
                      <div className="relative w-72 h-80 bg-gradient-to-br from-blue-100 to-purple-100 rounded-2xl shadow-inner overflow-hidden">
                        <div className="w-full h-full flex flex-col items-center justify-center">
                          <div className="text-center p-6">
                            <div className="w-16 h-16 bg-gradient-to-r from-blue-200 to-purple-200 rounded-full flex items-center justify-center mx-auto mb-4">
                              <svg className="w-8 h-8 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                              </svg>
                            </div>
                            <h3 className="font-bold text-lg mb-2 text-blue-800">Locandina Coupon</h3>
                            <p className="text-sm text-blue-600">Clicca per visualizzare</p>
                          </div>
                        </div>
                      </div>
                      
                      {/* Hover effect overlay */}
                      <div className="absolute inset-0 bg-gradient-to-br from-blue-500/20 to-purple-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center rounded-3xl">
                        <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-4 py-2 rounded-lg font-semibold">
                          Visualizza Locandina
                        </div>
                      </div>
                    </div>

                    {/* Gift icon */}
                    <div className="absolute -top-4 -right-4 w-12 h-12 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full flex items-center justify-center shadow-lg">
                      <span className="text-white font-bold text-lg">🎁</span>
                    </div>
                  </div>
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