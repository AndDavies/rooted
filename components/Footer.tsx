"use client";

import React from 'react';
import Link from 'next/link';

const navigationLinks = [
  { label: "About Us", href: "/#about" },
  { label: "The Method", href: "/#why-rooted" },
  { label: "Upcoming Dates", href: "/#problem" },
  { label: "Rooted Insights", href: "/blog" },
  { label: "The ROOTED Weekly", href: "/blog/archive" },
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
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 items-start">
          {/* Logo and tagline */}
          <div className="space-y-4">
            <h3 className="text-xl font-sans font-bold">
              the ROOTED way
            </h3>
            <p className="text-white/70 text-base leading-relaxed max-w-xs">
              A systematic approach to wellbeing for high-performing leaders.
            </p>
          </div>

          {/* Navigation Links */}
          <div className="space-y-4">
            <h4 className="text-base font-medium uppercase tracking-wide text-white/90">
              Navigate
            </h4>
            <nav className="space-y-2">
              {navigationLinks.map((link) => (
                <Link
                  key={link.label}
                  href={link.href}
                  onClick={(e) => handleNavLinkClick(e, link.href)}
                  className="block text-white/70 hover:text-white text-base transition-colors duration-200 min-h-[44px] flex items-center"
                >
                  {link.label}
                </Link>
              ))}
            </nav>
          </div>

          {/* Social Media */}
          <div className="space-y-4">
            <h4 className="text-base font-medium uppercase tracking-wide text-white/90">
              Connect
            </h4>
            <nav className="space-y-2">
              <a
                href="https://www.linkedin.com/company/the-rooted-way/posts/?feedView=all"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-white/70 hover:text-white text-base transition-colors duration-200 min-h-[44px]"
              >
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                </svg>
                LinkedIn
              </a>
            </nav>
          </div>

          {/* Legal and Contact */}
          <div className="space-y-4">
            <h4 className="text-base font-medium uppercase tracking-wide text-white/90">
              Legal
            </h4>
            <nav className="space-y-2">
              <Link
                href="/privacy"
                className="block text-white/70 hover:text-white text-base transition-colors duration-200 min-h-[44px] flex items-center"
              >
                Privacy Policy
              </Link>
            </nav>
            <div className="pt-4">
              <p className="text-white/50 text-sm">
                © {currentYear} The ROOTED Way. All rights reserved.
              </p>
            </div>
          </div>
        </div>

        {/* Bottom border accent */}
        <div className="mt-8 pt-6 border-t border-white/20">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <p className="text-white/50 text-sm">
              Transforming leaders through intentional wellbeing.
            </p>
            <div className="flex items-center space-x-2">
              <div className="w-6 h-px bg-[#F1BE49]"></div>
              <span className="text-[#F1BE49] text-sm font-medium tracking-wider">
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