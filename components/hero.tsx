"use client";

import React from "react";
import Image from "next/image";

export function Hero() {
  return (
    <div className="relative h-screen w-full">
      {/* Background video */}
      <div className="absolute inset-0 z-0">
        <video
          src="/madeira_hero_bg.mp4"
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
                width={60}
                height={60}
                className="object-contain"
              />
            </div>
            <h1 className="font-serif text-6xl md:text-8xl font-bold text-white italic text-shadow-lg">
              Rooted
            </h1>
          </div>
          <div className="text-white text-left mt-8">
            <p className="font-body text-base md:text-xl leading-relaxed tracking-tight">
              A 6-day retreat and guidebook for self-discovery, mindful living, and authentic growth. 
              This journey draws inspiration from the timeless principles teaching you how to live with 
              more flow, presence, and balance.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
} 