'use client';

import { useState, useEffect } from 'react';

interface VoucherPopupProps {
  onClose: () => void;
}

export default function VoucherPopup({ onClose }: VoucherPopupProps) {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), 500);
    return () => clearTimeout(timer);
  }, []);

  const handleViewFullscreen = () => {
    // Open in new browser tab
    window.open('/images/LOCANDINA-PER-IL-COUPON.jpg', '_blank');
  };


  return (
    <div
      className={`fixed bottom-6 right-6 z-50 transform transition-all duration-500 ${
        isVisible ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'
      }`}
    >
      <div className="bg-white rounded-2xl shadow-2xl border-2 border-blue-200/50 overflow-hidden max-w-sm">
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-gray-400 hover:text-gray-600 transition-colors z-10"
        >
          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        {/* Header with hero gradient */}
        <div className="bg-gradient-to-r from-blue-600 to-purple-600 p-4">
          <div className="flex items-center text-white">
            <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center mr-3">
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v13m0-13V6a2 2 0 112 2h-2zm0 0V5.5A2.5 2.5 0 109.5 8H12zm-7 4h14M5 12a2 2 0 110-4h14a2 2 0 110 4M5 12v7a2 2 0 002 2h10a2 2 0 002-2v-7" />
              </svg>
            </div>
            <div>
              <h3 className="font-bold text-lg leading-tight">Regala un Coupon!</h3>
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="p-4">
          <p className="text-gray-700 text-sm mb-4 leading-relaxed">
            Il regalo perfetto per le famiglie! Partecipa ai nostri concerti musicali per bambini dai 0 ai 5 anni.
          </p>

          <div className="space-y-3">
            <button
              onClick={handleViewFullscreen}
              className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold py-2.5 px-4 rounded-lg hover:from-blue-700 hover:to-purple-700 transition-all duration-300"
            >
              Scopri come partecipare
            </button>
            
            <button
              onClick={onClose}
              className="w-full text-gray-500 text-sm hover:text-gray-700 transition-colors"
            >
              Chiudi
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}