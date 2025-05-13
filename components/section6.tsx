"use client";

import React from "react";

export function Section6() {
  return (
    <section id="location" className="grid grid-cols-1 md:grid-cols-2 bg-[#f5f5f0]">
      {/* Left Column: Image Placeholder */}
      <div className="relative h-[500px] md:h-[600px] group">
        <div className="w-full h-full bg-gray-200 flex items-center justify-center transition-all duration-300 group-hover:bg-gray-300">
          <span className="text-gray-500 text-lg">Image Placeholder (Madeira Landscape)</span>
        </div>
        <div className="absolute inset-0 bg-black/10 group-hover:bg-black/20 transition-all duration-300" />
      </div>

      {/* Right Column: Location Description */}
      <div className="p-8 md:p-12 flex flex-col justify-center">
        <h2 className="text-xl md:text-2xl font-medium text-gray-800 font-serif">
          Discover Madeira
        </h2>
        <p className="text-lg font-light mt-2 text-gray-700">
          Your Sanctuary for Renewal
        </p>
        <p className="mt-4 text-sm text-gray-600 max-w-md font-body">
          Nestled off the grid on the island of Madeira, Rooted offers a serene escape surrounded by lush forests, dramatic cliffs, and the calming Atlantic. This natural haven is the perfect backdrop for your 6-day journey of self-discovery and recalibration, where you can reconnect with nature and find inner peace.
        </p>
        <p className="mt-4 text-sm text-gray-700 font-body italic">
          "Nature does not hurry, yet everything is accomplished." — Lao Tzu
        </p>
        <div className="mt-6">
          <a
            href="/book"
            className="inline-flex items-center justify-center bg-gray-800 text-white text-sm font-medium px-8 py-3 rounded-full hover:bg-gray-700 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
          >
            Book Your Journey
          </a>
        </div>
      </div>
    </section>
  );
}