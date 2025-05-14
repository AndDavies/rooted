"use client";

import React from "react";

export function Section4() {
  return (
    <section id="tribe" className="py-16 bg-white max-w-[1440px] mx-auto">
      <div className="container mx-auto px-8 text-center">
        <span className="text-[#c0c0b0] text-lg font-light luxury-type">04</span>
        <h2 className="text-2xl md:text-3xl font-medium mt-4 text-gray-800 elegant-heading">
          The Rooted Tribe™
        </h2>
        <p className="text-lg font-light mt-2 text-gray-700">
          A Lifelong Community for Sustained Growth
        </p>
        <p className="mt-4 text-sm text-gray-600 max-w-2xl mx-auto font-body">
          Your transformation doesn't end on day six. The Rooted Tribe™ offers a digital platform with performance coaching, biometric tracking, and a global community of like-minded leaders. Stay connected, accountable, and inspired with scalable support tailored to your needs.
        </p>
        <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="p-6 bg-[#f5f5f0] rounded-lg">
            <h3 className="text-xl font-semibold text-gray-800">Performance Coaching</h3>
            <p className="text-sm text-gray-600 mt-4">
              Weekly group sessions and personalized feedback to maintain your progress and achieve long-term goals.
            </p>
          </div>
          <div className="p-6 bg-[#f5f5f0] rounded-lg">
            <h3 className="text-xl font-semibold text-gray-800">Biometric Tracking</h3>
            <p className="text-sm text-gray-600 mt-4">
              Monitor HRV, sleep, and metabolic health via our app, with data-driven insights to optimize performance.
            </p>
          </div>
          <div className="p-6 bg-[#f5f5f0] rounded-lg">
            <h3 className="text-xl font-semibold text-gray-800">Global Community</h3>
            <p className="text-sm text-gray-600 mt-4">
              Join exclusive expeditions, mentorship programs, and events to connect with visionary leaders worldwide.
            </p>
          </div>
        </div>
        <div className="mt-8 flex justify-center">
          <button 
            className="inline-flex items-center justify-center bg-gray-800 text-white text-sm font-medium px-8 py-3 rounded-full hover:bg-gray-700 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
          >
            Learn More
          </button>
        </div>
      </div>
    </section>
  );
}