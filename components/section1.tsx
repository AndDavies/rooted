"use client";

import React from "react";
import Image from "next/image";

export function Section1() {
  return (
    <section id="foundation" className="grid grid-cols-1 md:grid-cols-[auto_600px] max-w-[1440px] mx-auto">
      {/* Left Column: Introduction */}
      <div className="bg-gradient-to-b from-[#f5f5f0] to-[#e5e5e0] p-8 md:p-12 flex flex-col justify-center">
        <span className="text-[#c0c0b0] text-lg font-light luxury-type">01</span>
        <h2 className="text-xl md:text-2xl font-medium mt-4 text-gray-800 elegant-heading">
        Ignite Your Leadership Potential
        </h2>
        <p className="text-lg font-light mt-2 text-gray-700">
        Rooted™: A Journey Beyond the Ordinary
        </p>
        <p className="mt-4 text-sm text-gray-600 max-w-md font-body">
        Escape to Madeira for a 6-day reset crafted for leaders like you—driven visionaries craving clarity amidst burnout. Rooted™ fuses cutting-edge biometrics, nervous-system renewal, and nature’s embrace to spark a lifelong transformation. With our digital platform and Rooted Tribe™, elite coaches empower your growth every step of the way.
        </p>
        <ul className="mt-4 text-sm text-gray-600 font-body list-disc list-inside">
          <li>Boost HRV by 12% in just 6 days</li>
          <li>97% unlock sharper clarity and decisions</li>
          <li>90%+ stay engaged with Tribe coaching</li>
        </ul>
        <p className="mt-4 text-sm text-gray-700 font-body italic">
          "True leadership blooms from deep roots, not endless hustle." — Rooted Philosophy
        </p>
        <div className="mt-8 flex justify-center">
          <button 
            className="inline-flex items-center justify-center bg-gray-800 text-white text-sm font-medium px-8 py-3 rounded-full hover:bg-gray-700 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
          >
            Join the Waitlist
          </button>
        </div>
      </div>

      {/* Right Column: Image */}
      <div className="w-[600px]">
        <Image
          src="/wellbeing.jpg"
          alt="Hands holding a small plant"
          width={600}
          height={465}
          className="object-cover"
        />
        <div className="absolute inset-0 bg-black/10" />
      </div>
    </section>
  );
}