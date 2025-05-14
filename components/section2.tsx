"use client";

import React from "react";

export function Section2() {
  return (
    <section id="method" className="py-16 bg-white max-w-[1440px] mx-auto">
      <div className="container mx-auto px-8 text-center">
        <span className="text-[#c0c0b0] text-lg font-light luxury-type">02</span>
        <h2 className="text-2xl md:text-3xl font-medium mt-4 text-gray-800 elegant-heading">
          The Rooted™ Method
        </h2>
        <p className="text-lg font-light mt-2 text-gray-700">
          A Framework for Sustainable Vitality
        </p>
        <p className="mt-4 text-sm text-gray-600 max-w-2xl mx-auto font-body">
          The Rooted™ Method blends ancient wisdom with modern science to recalibrate your body, mind, and purpose. Our six-part framework—Resilience, Optimization, Observation, Training, Equilibrium, Deep Connection—guides you through physical challenges, deep rest, and intentional growth.
        </p>
        <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="p-6 bg-[#f5f5f0] rounded-lg">
            <h3 className="text-xl font-semibold text-gray-800">Unleash</h3>
            <p className="text-sm text-gray-600 mt-4">
              High-performance training like trail running, HIIT, and ice baths to activate energy and resilience.
            </p>
          </div>
          <div className="p-6 bg-[#f5f5f0] rounded-lg">
            <h3 className="text-xl font-semibold text-gray-800">Release</h3>
            <p className="text-sm text-gray-600 mt-4">
              Yoga, breathwork, and meditation to reset your nervous system and foster deep calm.
            </p>
          </div>
          <div className="p-6 bg-[#f5f5f0] rounded-lg">
            <h3 className="text-xl font-semibold text-gray-800">Integrate</h3>
            <p className="text-sm text-gray-600 mt-4">
              Personalized biometrics and coaching to sustain clarity and alignment post-retreat.
            </p>
          </div>
        </div>
        <div className="mt-8 flex justify-center">
          <button 
            className="inline-flex items-center justify-center bg-gray-800 text-white text-sm font-medium px-8 py-3 rounded-full hover:bg-gray-700 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
          >
            Discover the Method
          </button>
        </div>
      </div>
    </section>
  );
}