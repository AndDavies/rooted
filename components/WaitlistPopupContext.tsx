"use client";

import React, { createContext, useContext, useState, ReactNode } from 'react';

interface WaitlistPopupContextType {
  isPopupOpen: boolean;
  openPopup: () => void;
  closePopup: () => void;
}

const WaitlistPopupContext = createContext<WaitlistPopupContextType | undefined>(undefined);

export function WaitlistPopupProvider({ children }: { children: ReactNode }) {
  const [isPopupOpen, setIsPopupOpen] = useState(false);

  const openPopup = () => setIsPopupOpen(true);
  const closePopup = () => setIsPopupOpen(false);

  return (
    <WaitlistPopupContext.Provider value={{ isPopupOpen, openPopup, closePopup }}>
      {children}
    </WaitlistPopupContext.Provider>
  );
}

export function useWaitlistPopup() {
  const context = useContext(WaitlistPopupContext);
  if (context === undefined) {
    throw new Error('useWaitlistPopup must be used within a WaitlistPopupProvider');
  }
  return context;
} 