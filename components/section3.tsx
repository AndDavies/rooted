"use client";

import React from "react";
import Image from "next/image";

export function Section3() {
  return (
    <section id="who" className="py-16 bg-[#f5f5f0] max-w-[1440px] mx-auto">
      <div className="container mx-auto px-8 text-center">
        <span className="text-[#c0c0b0] text-lg font-light luxury-type">03</span>
        <h2 className="text-2xl md:text-3xl font-medium mt-4 text-gray-800 elegant-heading">
          Meet Our Organizers
        </h2>
        <p className="text-lg font-light mt-2 text-gray-700">
          A Team of Experts Guiding Your Transformation
        </p>
        <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="bg-white rounded-lg shadow-lg overflow-hidden">
            <Image
              src="/zeger-placeholder.jpg"
              alt="Zeger, Wellness Coach in natural setting"
              width={400}
              height={400}
              className="w-full h-64 object-cover"
            />
            <div className="p-6">
              <h3 className="text-xl font-semibold text-gray-800">Zeger</h3>
              <p className="text-sm text-gray-600 mt-2">Wellness Coach</p>
              <p className="text-sm text-gray-600 mt-4">
                With over 20 years in fitness and nervous-system regulation, Zeger designs programs that restore energy and resilience, tailored to high-performing leaders.
              </p>
            </div>
          </div>
          <div className="bg-white rounded-lg shadow-lg overflow-hidden">
            <Image
              src="/ash-placeholder.jpg"
              alt="Ash, Executive Coach in natural setting"
              width={400}
              height={400}
              className="w-full h-64 object-cover"
            />
            <div className="p-6">
              <h3 className="text-xl font-semibold text-gray-800">Ash</h3>
              <p className="text-sm text-gray-600 mt-2">Executive Coach</p>
              <p className="text-sm text-gray-600 mt-4">
                Specializing in leadership development and burnout recovery, Ash empowers executives to align their personal and professional lives with purpose.
              </p>
            </div>
          </div>
          <div className="bg-white rounded-lg shadow-lg overflow-hidden">
            <Image
              src="/andrew-placeholder.jpg"
              alt="Andrew, Biometric Expert in natural setting"
              width={400}
              height={400}
              className="w-full h-64 object-cover"
            />
            <div className="p-6">
              <h3 className="text-xl font-semibold text-gray-800">Andrew</h3>
              <p className="text-sm text-gray-600 mt-2">Biometric Expert</p>
              <p className="text-sm text-gray-600 mt-4">
                Andrew leverages HRV and metabolic data to optimize performance, ensuring measurable outcomes for every Rooted™ participant.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}