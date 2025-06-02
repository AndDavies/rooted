"use client";

import React, { useState, useEffect } from 'react';
import { X, Cookie } from 'lucide-react';

export function CookieConsent() {
  const [isVisible, setIsVisible] = useState(false);
  const [isClosing, setIsClosing] = useState(false);

  useEffect(() => {
    // Check if user has already accepted cookies
    const hasAccepted = localStorage.getItem('rooted-cookie-consent');
    if (!hasAccepted) {
      // Show banner after a short delay for better UX
      const timer = setTimeout(() => {
        setIsVisible(true);
      }, 2000);
      return () => clearTimeout(timer);
    }
  }, []);

  const handleAccept = () => {
    localStorage.setItem('rooted-cookie-consent', 'accepted');
    handleClose();
  };

  const handleClose = () => {
    setIsClosing(true);
    setTimeout(() => {
      setIsVisible(false);
      setIsClosing(false);
    }, 300);
  };

  if (!isVisible) return null;

  return (
    <div 
      className={`fixed bottom-0 left-0 right-0 z-[9998] bg-white border-t border-gray-200 shadow-lg transition-all duration-300 ${
        isClosing ? 'transform translate-y-full opacity-0' : 'transform translate-y-0 opacity-100'
      }`}
    >
      <div className="container mx-auto px-4 py-4">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          {/* Content */}
          <div className="flex items-start gap-3 flex-1">
            <Cookie className="w-5 h-5 text-[#F1BE49] mt-0.5 flex-shrink-0" />
            <div className="text-sm text-[#4A4A4A] leading-relaxed">
              <p>
                We use cookies to enhance your experience and analyze site traffic. 
                By continuing to use our site, you accept our use of cookies.{' '}
                <a 
                  href="/privacy" 
                  className="text-[#CC4824] hover:text-[#317039] underline transition-colors"
                >
                  Learn more
                </a>
              </p>
            </div>
          </div>

          {/* Actions */}
          <div className="flex items-center gap-3 flex-shrink-0">
            <button
              onClick={handleAccept}
              className="bg-[#F1BE49] hover:bg-[#D4AF37] text-[#4A4A4A] px-4 py-2 rounded-md font-medium text-sm transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-[#F1BE49] focus:ring-offset-2"
            >
              Accept All
            </button>
            <button
              onClick={handleClose}
              className="text-[#4A4A4A] hover:text-[#CC4824] p-1 rounded-md transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-gray-300"
              aria-label="Close cookie notice"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
} 