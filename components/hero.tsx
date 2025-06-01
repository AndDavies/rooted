"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
// localFont import and popsiesFont definition are no longer needed here
// import localFont from "next/font/local"; 
// const popsiesFont = localFont(...);

// Geist font definition removed as it's now global

export function Hero() {
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
              Lead with clarity. Live with alignment.
            </h1>
            <h2 className="text-2xl sm:text-3xl md:text-4xl text-white/90 tracking-tight text-shadow-hero-h1">
              ROOTED is your return to what matters.
            </h2>
          </div>
          
          {/* Description paragraph */}
          <div className="text-white text-center mb-8">
            <p className="font-sans text-base md:text-lg lg:text-xl leading-relaxed tracking-tight max-w-3xl mx-auto">
              Success often comes with a silent price. Running full steam on adrenaline, digital overload, and a "push-through" mentality. Maybe outwardly thriving, but inwardly drained, afraid of what will happen if we step off the treadmill. At ROOTED we believe there is another way.
            </p>
          </div>

          {/* CTA Button */}
          <div className="flex justify-center">
            <Link
              href="#booking" // You can update this to your actual waitlist signup section
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
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}