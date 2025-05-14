"use client";

import React from "react";
import Image from "next/image";
// localFont import is no longer needed here if Geist is globally defined
// import localFont from "next/font/local"; 

// Geist font definition removed as it's now global

export function Hero() {
  return (
    <div className="relative h-screen w-full">
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
            <div className="mr-3">
              <Image
                src="/rooted_logo_circle.png"
                alt="Rooted logo"
                width={100}
                height={100}
                className="object-contain"
              />
            </div>
            {/* Apply font-sans (which is Geist) and specific styling for Hero H1 */}
            <h1
              className="font-sans text-6xl md:text-8xl font-bold text-white tracking-[-0.06em] text-shadow-hero-h1"
            >
              Rooted
            </h1>
          </div>
          {/* Ensure paragraph also uses a globally available font, like font-sans (Geist) or font-body if it were different */}
          <div className="text-white text-left mt-8">
            <p className="font-sans text-sm antialiased md:text-xl leading-relaxed tracking-tight">
              A 6-day retreat for self-discovery, mindful living, and authentic growth. 
              This journey draws inspiration from the timeless principles teaching you how to live with 
              more flow, presence, and balance.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}