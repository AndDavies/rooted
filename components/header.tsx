"use client";

import React, { useState, useEffect, useCallback } from 'react';
import Image from 'next/image';
import Link from 'next/link'; // Use next/link for client-side navigation
import { scrollToElement } from '@/lib/scroll'; // Assuming this path is correct
import localFont from "next/font/local"; // Import localFont

// Define the Popsies font
const popsiesFont = localFont({
  src: "../public/fonts/LovtonyRegular-YzV5O.ttf",
  display: "swap", // Good practice for font loading
});

// Icons (using Heroicons as placeholders - install @heroicons/react if not already)
const MenuIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" {...props}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
  </svg>
);

const XIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" {...props}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
  </svg>
);

const navigationLinks = [
  { label: "The Method", href: "/#about" },      // Points to AboutUs component
  { label: "The Pillars", href: "/#why-rooted" }, // Points to WhyRooted component
  { label: "The Tribe", href: "/#problem" },    // Points to Section2 component (which uses id="problem")
  { label: "The Blog", href: "/blog" },    // Points to Section2 component (which uses id="problem")
];

export function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true); // For animations on load
  }, []);

  const handleScroll = useCallback(() => {
    // Trigger background change when scrolled past a certain point (e.g., 50px or 100vh)
    // For simplicity, let's use 50px. 100vh might be too much if hero isn't always 100vh.
    const offset = window.scrollY;
    if (offset > 50) { // Adjust this value as needed
      setIsScrolled(true);
    } else {
      setIsScrolled(false);
    }
  }, []);

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [handleScroll]);

  const handleNavLinkClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    // Always close mobile menu on any link click within it
    if (isMobileMenuOpen) {
      setIsMobileMenuOpen(false);
    }

    if (href.startsWith('#')) {
      e.preventDefault();
      scrollToElement(href.substring(1));
      // No need to set isMobileMenuOpen here again, it's handled above
    }
    // If it's a normal page link (e.g., /blog), NextLink handles navigation,
    // and the menu is now closed by the initial check.
  };
  
  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const ctaButton = (
    <Link
      href="#booking" // Section 6
      onClick={(e) => handleNavLinkClick(e, '#booking')}
      className="font-rufina font-bold text-xs text-white bg-[#D4AF37] px-3.5 py-2.5 rounded-md shadow-sm hover:scale-105 hover:shadow-gold-glow focus:outline-none focus:ring-2 focus:ring-[#D4AF37] focus:ring-offset-2 focus:ring-offset-gray-800 transition-all duration-200 ease-in-out whitespace-nowrap"
    >
      Book Now
    </Link>
  );

  return (
    <header 
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ease-in-out 
                  ${isScrolled ? 'bg-white/95 backdrop-blur-md shadow-md border-b border-[#D4AF37]' : 'bg-transparent border-b border-transparent'}
                  ${isMounted ? 'opacity-100' : 'opacity-0'}
                  h-[60px] md:h-[70px]`} // Explicit height for mobile and desktop
    >
      <div className="container mx-auto max-w-[1440px] px-5 h-full flex items-center justify-between">
        {/* Logo and Branding */}
        <Link href="/" onClick={(e) => handleNavLinkClick(e, '#hero')} className={`flex items-center gap-2 transition-opacity duration-500 ease-in-out ${isMounted ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-5'}`}>
          <Image
            src="/rooted_logo_circle.png"
            alt="Rooted Logo"
            width={60}
            height={60}
            className="object-contain transition-transform duration-200 ease-in-out hover:scale-110 md:w-[60px] md:h-[60px] w-[50px] h-[50px]" // Responsive size
            priority
          />
          <span 
            className={`font-sans text-2xl font-bold text-shadow-gold hidden sm:block 
                        ${isScrolled ? 'text-[#1A1A1A]' : 'text-white'}`}>
            Rooted
          </span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-3 lg:space-x-6">
          {navigationLinks.map((link, index) => (
            <Link
              key={link.label}
              href={link.href}
              onClick={(e) => handleNavLinkClick(e, link.href)}
              className={`font-hk-grotesk uppercase text-xs tracking-[0.03em] relative 
                          py-2 group transition-all duration-300 ease-in-out 
                          ${isScrolled ? 'text-[#1A1A1A]' : 'text-white'} 
                          ${isMounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-3'}`}
              style={{ transitionDelay: isMounted ? `${index * 100 + 300}ms` : '0ms' }} // Sequential slide-down
            >
              {link.label}
              <span className="absolute bottom-0 left-0 h-[2px] w-full bg-[#D4AF37] transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 ease-in-out origin-left"></span>
            </Link>
          ))}
           <div 
            className={`transition-opacity duration-300 ease-in-out ${isMounted ? 'opacity-100' : 'opacity-0'}`}
            style={{ transitionDelay: isMounted ? `${navigationLinks.length * 100 + 300}ms` : '0ms' }}
          >
            {ctaButton}
          </div>
        </nav>

        {/* Mobile Menu Button */}
        <div className="md:hidden">
          <button
            onClick={toggleMobileMenu}
            aria-label={isMobileMenuOpen ? "Close Menu" : "Open Menu"}
            aria-expanded={isMobileMenuOpen}
            className="text-[#D4AF37] p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-[#D4AF37]"
          >
            {isMobileMenuOpen ? <XIcon className="w-6 h-6" /> : <MenuIcon className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      {isMobileMenuOpen && (
        <div 
          className="md:hidden fixed inset-x-0 top-[60px] h-[calc(100vh-60px)] bg-gradient-to-b from-white to-[#f5f5f0] overflow-y-auto transition-transform duration-300 ease-in-out transform animate-slideDown"
          // style={{ transform: isMobileMenuOpen ? 'translateY(0)' : 'translateY(-100%)' }} // Using animation class now
        >
          <nav className="flex flex-col items-center justify-center h-full pt-8 pb-20 px-5 space-y-5">
            {navigationLinks.map((link, index) => (
              <Link
                key={link.label}
                href={link.href}
                onClick={(e) => handleNavLinkClick(e, link.href)}
                className="font-hk-grotesk uppercase text-lg tracking-[0.03em] text-[#1A1A1A] hover:text-[#D4AF37] focus:text-[#D4AF37] focus:outline-none transition-colors duration-200 ease-in-out animate-fadeInUp"
                style={{ animationDelay: `${index * 100 + 100}ms`}}
              >
                {link.label}
              </Link>
            ))}
            <div className="pt-8 animate-fadeInUp" style={{ animationDelay: `${navigationLinks.length * 100 + 100}ms`}}>
              {React.cloneElement(ctaButton, { onClick: (e: React.MouseEvent<HTMLAnchorElement>) => handleNavLinkClick(e, '#booking') })}
            </div>
          </nav>
           {/* Fixed CTA at bottom of mobile menu for easier access */}
          <div className="absolute bottom-0 left-0 right-0 p-5 bg-[#f5f5f0] border-t border-gray-200">
             {React.cloneElement(ctaButton, { onClick: (e: React.MouseEvent<HTMLAnchorElement>) => handleNavLinkClick(e, '#booking') })}
          </div>
        </div>
      )}
      <style jsx global>{`
        @keyframes slideDown {
          from { transform: translateY(-20%); opacity: 0; }
          to { transform: translateY(0); opacity: 1; }
        }
        .animate-slideDown { animation: slideDown 0.3s ease-out forwards; }

        @keyframes fadeInUp {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fadeInUp { animation: fadeInUp 0.3s ease-out forwards; opacity: 0; /* Initial state for animation */ }
      `}</style>
    </header>
  );
}

// Note: For the scroll to #hero to work, ensure your Hero component has id="hero"
// The scroll functionality relies on `scrollToElement` from `@/lib/scroll.ts`.
// Ensure Heroicons are installed if you plan to use them: npm install @heroicons/react or yarn add @heroicons/react
// Or replace with your own SVG components.