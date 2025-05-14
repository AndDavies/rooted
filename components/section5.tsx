"use client";

import React from "react";

export function Section5() {
  return (
    <section id="pricing" className="py-16 bg-[#f5f5f0] max-w-[1440px] mx-auto">
      <div className="container mx-auto px-8 text-center">
        <span className="text-[#c0c0b0] text-lg font-light luxury-type">05</span>
        <h2 className="text-2xl md:text-3xl font-medium mt-4 text-gray-800 elegant-heading">
          Pricing Options
        </h2>
        <p className="text-lg font-light mt-2 text-gray-700">
          Flexible Plans for Your Transformation
        </p>
        <p className="mt-4 text-sm text-gray-600 max-w-2xl mx-auto font-body">
          Choose the experience that fits your needs, with transparent pricing designed to deliver value. All plans include accommodations, chef-designed meals, and full programming (excludes travel).
        </p>
        <div className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="p-6 bg-white rounded-lg shadow-lg">
            <h3 className="text-xl font-semibold text-gray-800">Core Group Retreat</h3>
            <p className="text-2xl font-bold text-gray-800 mt-4">$4,750</p>
            <p className="text-sm text-gray-600 mt-4">
              Shared accommodations, anti-inflammatory meals, and full access to group programming, including biometrics and coaching.
            </p>
            <button 
              className="mt-6 inline-flex items-center justify-center bg-gray-800 text-white text-sm font-medium px-8 py-3 rounded-full hover:bg-gray-700 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
            >
              Select
            </button>
          </div>
          <div className="p-6 bg-white rounded-lg shadow-lg">
            <h3 className="text-xl font-semibold text-gray-800">Premium Private Module</h3>
            <p className="text-2xl font-bold text-gray-800 mt-4">$7,750</p>
            <p className="text-sm text-gray-600 mt-4">
              Private ocean-front suite, dedicated coach, and exclusive activities, plus all Core Group benefits.
            </p>
            <button 
              className="mt-6 inline-flex items-center justify-center bg-gray-800 text-white text-sm font-medium px-8 py-3 rounded-full hover:bg-gray-700 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
            >
              Select
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}