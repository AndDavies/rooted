"use client"
import { useState, useEffect } from 'react'

export function ConsentBanner() {
  const [showBanner, setShowBanner] = useState(false)

  useEffect(() => {
    // Check if user has already made a consent choice
    const consentChoice = localStorage.getItem('cookie-consent')
    if (!consentChoice) {
      setShowBanner(true)
    }
  }, [])

  const updateConsent = (consentUpdates: { [key: string]: 'granted' | 'denied' }) => {
    if (typeof window !== 'undefined' && window.gtag) {
      window.gtag('consent', 'update', consentUpdates)
    }
  }

  const handleAcceptAll = () => {
    const consentUpdates = {
      'analytics_storage': 'granted' as const,
      'ad_storage': 'granted' as const,
      'ad_user_data': 'granted' as const,
      'ad_personalization': 'granted' as const,
      'functionality_storage': 'granted' as const,
      'personalization_storage': 'granted' as const
    }
    
    updateConsent(consentUpdates)
    localStorage.setItem('cookie-consent', JSON.stringify({ 
      ...consentUpdates, 
      timestamp: Date.now() 
    }))
    setShowBanner(false)
  }

  const handleRejectAll = () => {
    const consentUpdates = {
      'analytics_storage': 'denied' as const,
      'ad_storage': 'denied' as const,
      'ad_user_data': 'denied' as const,
      'ad_personalization': 'denied' as const,
      'functionality_storage': 'denied' as const,
      'personalization_storage': 'denied' as const
    }
    
    updateConsent(consentUpdates)
    localStorage.setItem('cookie-consent', JSON.stringify({ 
      ...consentUpdates, 
      timestamp: Date.now() 
    }))
    setShowBanner(false)
  }

  if (!showBanner) return null

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 shadow-lg z-50 p-4">
      <div className="container mx-auto max-w-6xl">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="flex-1">
            <p className="text-sm text-[#4A4A4A] pr-4">
              We use cookies to enhance your browsing experience and analyze site traffic. 
              <a href="/privacy" className="text-[#D4AF37] hover:underline ml-1">
                Learn more
              </a>
            </p>
          </div>
          
          <div className="flex gap-3 flex-shrink-0">
            <button
              onClick={handleRejectAll}
              className="px-4 py-2 text-sm border border-gray-300 text-[#4A4A4A] rounded-lg hover:bg-gray-50 transition-colors whitespace-nowrap"
            >
              Reject
            </button>
            <button
              onClick={handleAcceptAll}
              className="px-4 py-2 text-sm bg-[#D4AF37] text-white rounded-lg hover:bg-[#B8941F] transition-colors whitespace-nowrap"
            >
              Accept
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

// Extend Window interface for TypeScript
declare global {
  interface Window {
    gtag: (...args: any[]) => void
  }
} 