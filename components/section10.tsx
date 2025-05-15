"use client";

import React from "react";

export function Section10() {
  return (
    <section id="reflect" className="py-16 bg-white max-w-[1440px] mx-auto">
      <div className="container mx-auto px-8 text-center">
        <span className="text-[#c0c0b0] text-lg font-light luxury-type">08</span>
        <h2 className="text-2xl md:text-3xl font-medium mt-4 text-gray-800 elegant-heading">
          Join the Rooted™ Movement
        </h2>
        <p className="text-lg font-light mt-2 text-gray-700">
          Start Your Journey Today
        </p>
        <p className="mt-4 text-sm text-gray-600 max-w-2xl mx-auto font-body">
          Sign up for updates and secure your spot in our pilot program. Be part of a community redefining leadership through wellness and purpose.
        </p>
        <div className="mt-12 max-w-md mx-auto">
            <input
            type="email" 
            placeholder="Enter your email" 
            className="w-full p-3 mb-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-500"
          />
            <button
            className="inline-flex items-center justify-center bg-gray-800 text-white text-sm font-medium px-8 py-3 rounded-full hover:bg-gray-700 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
            >
            Submit
            </button>
        </div>
      </div>
    </section>
  );
}