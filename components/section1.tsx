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
          A Science-Backed Reset for Visionary Leaders
        </h2>
        <p className="text-lg font-light mt-2 text-gray-700">
          Rooted™: Beyond a Retreat, a Holistic Transformation
        </p>
        <p className="mt-4 text-sm text-gray-600 max-w-md font-body">
          Rooted™ is a 6-day executive reset on Madeira, Portugal, designed for high-performing leaders battling burnout or seeking alignment. Combining science-backed biometrics, nervous-system recalibration, and nature immersion, it’s the start of a lifelong journey. Our digital platform and Rooted Tribe™ community ensure sustained growth, with elite coaches guiding you every step.
        </p>
        <ul className="mt-4 text-sm text-gray-600 font-body list-disc list-inside">
          <li>12% average HRV increase in 6 days</li>
          <li>97% report enhanced clarity and decision-making</li>
          <li>90%+ stay engaged with Tribe coaching</li>
        </ul>
        <p className="mt-4 text-sm text-gray-700 font-body italic">
          “The greatest leaders thrive not by pushing harder, but by rooting deeper.” — Rooted Philosophy
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