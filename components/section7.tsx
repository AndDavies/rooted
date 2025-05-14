"use client";

import React from "react";

export function Section7() {
  return (
    <section id="testimonials" className="py-16 bg-[#f5f5f0] max-w-[1440px] mx-auto">
      <div className="container mx-auto px-8 text-center">
        <span className="text-[#c0c0b0] text-lg font-light luxury-type">07</span>
        <h2 className="text-2xl md:text-3xl font-medium mt-4 text-gray-800 elegant-heading">
          What Leaders Say
        </h2>
        <p className="text-lg font-light mt-2 text-gray-700">
          Real Stories of Transformation
        </p>
        <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="p-6 bg-white rounded-lg shadow-lg">
            <p className="text-sm text-gray-600 italic">
              “Rooted™ gave me tools to manage my energy and lead with clarity. The Tribe keeps me accountable.”
            </p>
            <p className="text-sm text-gray-800 mt-4 font-semibold">— Sarah, CEO</p>
          </div>
          <div className="p-6 bg-white rounded-lg shadow-lg">
            <p className="text-sm text-gray-600 italic">
              “The retreat was a game-changer. I reclaimed two hours of peak energy daily.”
            </p>
            <p className="text-sm text-gray-800 mt-4 font-semibold">— Michael, Founder</p>
          </div>
          <div className="p-6 bg-white rounded-lg shadow-lg">
            <p className="text-sm text-gray-600 italic">
              “The science and community make Rooted™ unique. I'm sharper and more aligned.”
            </p>
            <p className="text-sm text-gray-800 mt-4 font-semibold">— Priya, Director</p>
          </div>
        </div>
      </div>
    </section>
  );
}