"use client";

import React from 'react';
import Link from 'next/link';

const navigationLinks = [
  { label: "About Us", href: "/#about" },
  { label: "The Method", href: "/#why-rooted" },
  { label: "Upcoming Dates", href: "/#problem" },
  { label: "Rooted Insights", href: "/blog" },
];

export function Footer() {
  const currentYear = new Date().getFullYear();

  const handleNavLinkClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
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
    }
    // For normal page links (e.g., /blog), NextLink handles navigation
  };

  return (
    <footer className="bg-[#4A4A4A] text-white py-12">
      <div className="container mx-auto px-4 max-w-6xl">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-start">
          {/* Logo and tagline */}
          <div className="space-y-4">
            <h3 className="text-xl font-sans font-bold">
              the ROOTED way
            </h3>
            <p className="text-white/70 text-sm leading-relaxed max-w-xs">
              A systematic approach to wellbeing for high-performing leaders.
            </p>
          </div>

          {/* Navigation Links */}
          <div className="space-y-4">
            <h4 className="text-sm font-medium uppercase tracking-wide text-white/90">
              Navigate
            </h4>
            <nav className="space-y-2">
              {navigationLinks.map((link) => (
                <Link
                  key={link.label}
                  href={link.href}
                  onClick={(e) => handleNavLinkClick(e, link.href)}
                  className="block text-white/70 hover:text-white text-sm transition-colors duration-200"
                >
                  {link.label}
                </Link>
              ))}
            </nav>
          </div>

          {/* Legal and Contact */}
          <div className="space-y-4">
            <h4 className="text-sm font-medium uppercase tracking-wide text-white/90">
              Legal
            </h4>
            <nav className="space-y-2">
              <Link
                href="/privacy"
                className="block text-white/70 hover:text-white text-sm transition-colors duration-200"
              >
                Privacy Policy
              </Link>
            </nav>
            <div className="pt-4">
              <p className="text-white/50 text-xs">
                © {currentYear} The ROOTED Way. All rights reserved.
              </p>
            </div>
          </div>
        </div>

        {/* Bottom border accent */}
        <div className="mt-8 pt-6 border-t border-white/20">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <p className="text-white/50 text-xs">
              Transforming leaders through intentional wellbeing.
            </p>
            <div className="flex items-center space-x-2">
              <div className="w-6 h-px bg-[#F1BE49]"></div>
              <span className="text-[#F1BE49] text-xs font-medium tracking-wider">
                ROOTED
              </span>
              <div className="w-6 h-px bg-[#F1BE49]"></div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
} 