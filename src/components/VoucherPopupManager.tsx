'use client';

import { useState, useEffect } from 'react';
import VoucherPopup from './VoucherPopup';

export default function VoucherPopupManager() {
  const [showPopup, setShowPopup] = useState(false);
  const [hasShownOnce, setHasShownOnce] = useState(false);

  useEffect(() => {
    // Check if popup has been shown in this session
    const popupShown = sessionStorage.getItem('voucherPopupShown');
    
    if (!popupShown) {
      // Show popup after 15 seconds on first visit
      const initialTimer = setTimeout(() => {
        setShowPopup(true);
        setHasShownOnce(true);
        sessionStorage.setItem('voucherPopupShown', 'true');
      }, 15000);

      return () => clearTimeout(initialTimer);
    } else {
      setHasShownOnce(true);
    }
  }, []);

  useEffect(() => {
    if (hasShownOnce && !showPopup) {
      // Show popup every 3 minutes after first dismissal
      const recurringTimer = setInterval(() => {
        setShowPopup(true);
      }, 180000); // 3 minutes

      return () => clearInterval(recurringTimer);
    }
  }, [hasShownOnce, showPopup]);

  const handleClosePopup = () => {
    setShowPopup(false);
  };

  if (!showPopup) {
    return null;
  }

  return (
    <VoucherPopup
      onClose={handleClosePopup}
    />
  );
}