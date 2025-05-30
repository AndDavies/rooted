"use client";

import React from "react";
import Image from "next/image";
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
      <div className="relative z-20 container mx-auto h-full flex flex-col justify-center items-start px-4">
        <div className="max-w-xl">
          <div className="flex items-center mb-6">

            {/* Removed popsiesFont.className and font-bold, font applied globally */}
            <h1
              className={`text-5xl sm:text-8xl md:text-5xl text-white tracking-tighter text-shadow-hero-h1`}
            >
              reclaim your energy
            </h1>
          </div>
          {/* Ensure paragraph also uses a globally available font, like font-sans (Geist) or font-body if it were different */}
          <div className="text-white text-left mt-8">
            <p className="font-sans text-sm antialiased md:text-xl leading-relaxed tracking-tight">
            ROOTED is for leaders who are done pushing through the exhaustion, done chasing wealth at the cost of their health, and are ready to redefine success from the inside out.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}