"use client";

import React from "react";
import Image from "next/image";

export function Section1() {
  return (
    <section id="foundation" className="grid grid-cols-1 md:grid-cols-[auto_600px] max-w-[1440px] mx-auto">
      {/* Left Column: Introduction */}
      <div className="bg-gradient-to-b from-[#f5f5f0] to-[#e5e5e0] p-8 md:p-12 flex flex-col justify-center">
        <span className="text-[#c0c0b0] text-lg font-light">01</span>
        <h2 className="text-xl md:text-2xl font-medium mt-4 text-gray-800 font-serif">
          A Playground of Wellbeing
        </h2>
        <p className="text-lg font-light mt-2 text-gray-700">
          The Rooted™ Executive Reset
        </p>
        <p className="mt-4 text-sm text-gray-600 max-w-md font-body">
          Join us on the island of Madeira for a 6-day retreat designed to nurture your wellbeing and recalibrate your energy. Whether you’re a high-performing leader facing burnout or seeking mindful growth, Rooted combines ancient wisdom with modern practices to help you reclaim your focus, health, and inner peace.
        </p>
        <ul className="mt-4 text-sm text-gray-600 font-body list-disc list-inside">
          <li>Lower cortisol and recalibrate your nervous system</li>
          <li>Boost sleep quality, focus, and recovery</li>
          <li>Optimize energy and mental clarity</li>
        </ul>
        <p className="mt-4 text-sm text-gray-700 font-body italic">
          “Nature does not hurry, yet everything is accomplished.” — Lao Tzu
        </p>
        <div className="mt-8 flex justify-center">
          <button 
            className="inline-flex items-center justify-center bg-gray-800 text-white text-sm font-medium px-8 py-3 rounded-full hover:bg-gray-700 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
          >
            Stay Connected
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