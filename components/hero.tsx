"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { useWaitlistPopup } from "./WaitlistPopupContext";
// localFont import and popsiesFont definition are no longer needed here
// import localFont from "next/font/local"; 
// const popsiesFont = localFont(...);

// Geist font definition removed as it's now global

export function Hero() {
  const { openPopup } = useWaitlistPopup();

  const handleWaitlistClick = (e: React.MouseEvent) => {
    e.preventDefault();
    openPopup('hero');
  };

  return (
    <div id="hero" className="relative h-screen w-full">
      {/* Background video */}
      <div className="absolute inset-0 z-0">
        <video
          src="/madeira_hero.mp4"
          autoPlay
          muted
          loop
          playsInline
          className="object-cover w-full h-full"
        />
        {/* Semi-transparent overlay */}
        <div className="absolute inset-0 bg-black/30 z-10"></div>
      </div>
      
      {/* Content */}
      <div className="relative z-20 container mx-auto h-full flex flex-col justify-center items-center px-4 text-center">
        <div className="max-w-7xl w-full">
          <div className="mb-8">
            {/* Removed popsiesFont.className and font-bold, font applied globally */}
            <h1
              className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl text-white tracking-tighter text-shadow-hero-h1 mb-6 whitespace-nowrap"
            >
              Live with alignment. Lead with clarity.
            </h1>
            <h2 className="text-2xl sm:text-3xl md:text-4xl text-white/90 tracking-tight text-shadow-hero-h1">
              ROOTED is your return to what matters.
            </h2>
          </div>
          
          {/* Description paragraph */}
          <div className="text-white text-center mb-8 space-y-2 max-w-3xl mx-auto">
            
            <p className="text-base md:text-lg ">
              We were taught to push through. To always aim higher.  But no one warned us about the cost: our bodies, our energy, our emotional and mental health, our joy.
            
              ROOTED exists to help high achievers reclaim their health and vitality before <strong>burnout</strong> demands it.
            </p>
            
          </div>

          {/* CTA Button */}
          <div className="flex justify-center">
            <button
              onClick={handleWaitlistClick}
              className="inline-flex items-center px-8 py-4 bg-[#F1BE49] text-[#4A4A4A] font-semibold text-lg rounded-full hover:bg-[#D4AF37] hover:scale-105 transition-all duration-300 ease-in-out shadow-lg hover:shadow-xl focus:outline-none focus:ring-4 focus:ring-[#F1BE49]/50 group"
            >
              Join the Waitlist
              <svg 
                className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" 
                fill="none" 
                stroke="currentColor" 
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
              </svg>
            </button>
          </div>
        </div>

        {/* Subtle Continue Reading */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex flex-col items-center">
          <span className="text-white/60 text-sm mb-2">Continue reading</span>
          <svg 
            className="w-5 h-5 text-white/60" 
            fill="none" 
            stroke="currentColor" 
            viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
          </svg>
        </div>
      </div>
    </div>
  );
}