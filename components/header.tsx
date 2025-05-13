"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { scrollToElement } from "@/lib/scroll";

export function Header() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const isScrolled = window.scrollY > 10;
      if (isScrolled !== scrolled) {
        setScrolled(isScrolled);
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [scrolled]);

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, targetId: string) => {
    e.preventDefault();
    scrollToElement(targetId);
  };

  return (
    <header
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300 ease-in-out",
        scrolled
          ? "bg-white border-b border-gray-300"
          : "bg-black/30 backdrop-blur-sm"
      )}
    >
      <div className="container mx-auto px-6 py-7">
        <nav className="flex justify-center">
          <div className="hidden md:flex items-center space-x-10">
            <Link 
              href="#foundation" 
              onClick={(e) => handleNavClick(e, "foundation")}
              className={cn(
                "transition-colors px-4 font-light tracking-[0.03em] text-xs uppercase font-heading",
                scrolled ? "text-gray-700" : "text-white"
              )}
            >
              THE FOUNDATION
            </Link>
            <Link 
              href="#method" 
              onClick={(e) => handleNavClick(e, "method")}
              className={cn(
                "transition-colors px-4 font-light tracking-[0.03em] text-xs uppercase font-heading",
                scrolled ? "text-gray-700" : "text-white"
              )}
            >
              THE METHOD
            </Link>
            <Link 
              href="#who" 
              onClick={(e) => handleNavClick(e, "who")}
              className={cn(
                "transition-colors px-4 font-light tracking-[0.03em] text-xs uppercase font-heading",
                scrolled ? "text-gray-700" : "text-white"
              )}
            >
              WHO ARE WE
            </Link>
            <Link 
              href="#reflect" 
              onClick={(e) => handleNavClick(e, "reflect")}
              className={cn(
                "transition-colors px-4 font-light tracking-[0.03em] text-xs uppercase font-heading",
                scrolled ? "text-gray-700" : "text-white"
              )}
            >
              REFLECT
            </Link>
          </div>
          <div className="md:hidden">
            <button className={scrolled ? "text-gray-700" : "text-white"}>
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <line x1="3" y1="12" x2="21" y2="12"></line>
                <line x1="3" y1="6" x2="21" y2="6"></line>
                <line x1="3" y1="18" x2="21" y2="18"></line>
              </svg>
            </button>
          </div>
        </nav>
      </div>
    </header>
  );
} 