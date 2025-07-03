"use client";

import React, { useState, useEffect, useCallback } from 'react';
import Image from 'next/image';
import Link from 'next/link'; // Use next/link for client-side navigation
import { useWaitlistPopup } from './WaitlistPopupContext';
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
  { label: "About Us", href: "/#about" },      // Points to AboutUs component
  { label: "The Method", href: "/#program" }, // Points to Program component
  { label: "Upcoming Dates", href: "/#upcoming-events" },    // Points to UpComingEvents component
  { label: "ROOTED Insights", href: "/#featured-blog" },    // Points to FeaturedBlog component
  { label: "The ROOTED Weekly", href: "/blog/archive" },    // Points to Newsletter Archive
];

export function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isMounted, setIsMounted] = useState(false);
  const { openPopup } = useWaitlistPopup();

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
      const elementId = href.substring(1);
      const element = document.getElementById(elementId);
      if (element) {
        const headerOffset = 80;
        const elementPosition = element.getBoundingClientRect().top + window.pageYOffset - headerOffset;
        window.scrollTo({
          top: elementPosition,
          behavior: 'smooth'
        });
      }
      // No need to set isMobileMenuOpen here again, it's handled above
    }
    // If it's a normal page link (e.g., /blog), NextLink handles navigation,
    // and the menu is now closed by the initial check.
  };
  
  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const handleGetRootedClick = (e: React.MouseEvent) => {
    e.preventDefault();
    if (isMobileMenuOpen) {
      setIsMobileMenuOpen(false);
    }
    openPopup('header'); // Pass source as 'header'
  };

  const ctaButton = (
    <button
      onClick={handleGetRootedClick}
      className="font-bold text-sm text-white bg-[#D4AF37] px-4 py-3 rounded-full shadow-sm hover:scale-105 hover:shadow-gold-glow focus:outline-none focus:ring-2 focus:ring-[#D4AF37] focus:ring-offset-2 focus:ring-offset-gray-800 transition-all duration-200 ease-in-out whitespace-nowrap min-h-[44px]"
    >
      Get Rooted
    </button>
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
        <Link href="/" className={`flex items-center gap-2 transition-opacity duration-500 ease-in-out ${isMounted ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-5'}`}>
          {/* Mobile Brand Mark - Always visible on small screens */}
          <div className={`sm:hidden w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm
                          ${isScrolled ? 'bg-[#D4AF37] text-white' : 'bg-white/20 text-white backdrop-blur-sm'}`}>
            R
          </div>
          
          {/* Desktop Logo */}
          <span 
            className={`font-sans text-2xl font-bold text-shadow-gold hidden sm:block 
                        ${isScrolled ? 'text-[#1A1A1A]' : 'text-white'}`}>
            the ROOTED way
          </span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden lg:flex items-center space-x-3 xl:space-x-6">
          {navigationLinks.map((link, index) => (
            <Link
              key={link.label}
              href={link.href}
              onClick={(e) => handleNavLinkClick(e, link.href)}
              className={`font-hk-grotesk uppercase text-sm tracking-[0.03em] relative 
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
        <div className="lg:hidden">
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
          className="lg:hidden fixed inset-x-0 top-[60px] h-[calc(100vh-60px)] bg-gradient-to-b from-white to-[#f5f5f0] overflow-y-auto transition-transform duration-300 ease-in-out transform animate-slideDown"
          // style={{ transform: isMobileMenuOpen ? 'translateY(0)' : 'translateY(-100%)' }} // Using animation class now
        >
          <nav className="flex flex-col items-center justify-center h-full pt-8 pb-20 px-5 space-y-5">
            {navigationLinks.map((link, index) => (
              <Link
                key={link.label}
                href={link.href}
                onClick={(e) => handleNavLinkClick(e, link.href)}
                className="font-hk-grotesk uppercase text-xl tracking-[0.03em] text-[#1A1A1A] hover:text-[#D4AF37] focus:text-[#D4AF37] focus:outline-none transition-colors duration-200 ease-in-out animate-fadeInUp py-2 min-h-[44px] flex items-center"
                style={{ animationDelay: `${index * 100 + 100}ms`}}
              >
                {link.label}
              </Link>
            ))}
            <div className="pt-8 animate-fadeInUp" style={{ animationDelay: `${navigationLinks.length * 100 + 100}ms`}}>
              <button
                onClick={handleGetRootedClick}
                className="font-bold text-sm text-white bg-[#D4AF37] px-4 py-3 rounded-full shadow-sm hover:scale-105 hover:shadow-gold-glow focus:outline-none focus:ring-2 focus:ring-[#D4AF37] focus:ring-offset-2 focus:ring-offset-gray-800 transition-all duration-200 ease-in-out whitespace-nowrap min-h-[44px] min-w-[44px]"
              >
                Get Rooted
              </button>
            </div>
          </nav>
           {/* Fixed CTA at bottom of mobile menu for easier access */}
          <div className="absolute bottom-0 left-0 right-0 p-5 bg-[#f5f5f0] border-t border-gray-200">
             <button
                onClick={handleGetRootedClick}
                className="font-bold text-sm text-white bg-[#D4AF37] px-4 py-3 rounded-full shadow-sm hover:scale-105 hover:shadow-gold-glow focus:outline-none focus:ring-2 focus:ring-[#D4AF37] focus:ring-offset-2 focus:ring-offset-gray-800 transition-all duration-200 ease-in-out whitespace-nowrap w-full min-h-[44px]"
              >
                Get Rooted
              </button>
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
// The scroll functionality uses native scrollIntoView with smooth behavior.
// Ensure Heroicons are installed if you plan to use them: npm install @heroicons/react or yarn add @heroicons/react
// Or replace with your own SVG components.