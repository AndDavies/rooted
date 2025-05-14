"use client";

import React from "react";

export function Section6() {
  return (
    <section id="experience" className="py-16 bg-white max-w-[1440px] mx-auto">
      <div className="container mx-auto px-8 text-center">
        <span className="text-[#c0c0b0] text-lg font-light luxury-type">06</span>
        <h2 className="text-2xl md:text-3xl font-medium mt-4 text-gray-800 elegant-heading">
          The Retreat Experience
        </h2>
        <p className="text-lg font-light mt-2 text-gray-700">
          A 6-Day Journey in Madeira, Portugal
        </p>
        <p className="mt-4 text-sm text-gray-600 max-w-2xl mx-auto font-body">
          Immerse yourself in a high-impact reset designed to restore energy, clarity, and resilience. From breathwork and HIIT to chef-designed meals and nature immersion, every moment is crafted to align body, mind, and purpose.
        </p>
        <div className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="p-6 bg-[#f5f5f0] rounded-lg">
            <h3 className="text-xl font-semibold text-gray-800">Daily Flow</h3>
            <ul className="text-sm text-gray-600 mt-4 text-left list-disc list-inside">
              <li>AM: Breathwork, mobility, and high-performance training</li>
              <li>Mid-Day: Anti-inflammatory meals and siesta</li>
              <li>PM: Skill sessions, nature hikes, and evening rituals</li>
            </ul>
          </div>
          <div className="p-6 bg-[#f5f5f0] rounded-lg">
            <h3 className="text-xl font-semibold text-gray-800">Key Outcomes</h3>
            <ul className="text-sm text-gray-600 mt-4 text-left list-disc list-inside">
              <li>Lower cortisol and improved sleep quality</li>
              <li>Enhanced mental clarity and decision-making</li>
              <li>Personalized "Monday-morning playbook" for lasting habits</li>
            </ul>
          </div>
        </div>
        <div className="mt-8 flex justify-center">
          <button 
            className="inline-flex items-center justify-center bg-gray-800 text-white text-sm font-medium px-8 py-3 rounded-full hover:bg-gray-700 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
          >
            Explore the Retreat
          </button>
        </div>
      </div>
    </section>
  );
}