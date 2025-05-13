"use client";

import React from "react";
import Image from "next/image";

export function Section3() {
  return (
    <section id="who-reflect" className="grid grid-cols-1 md:grid-cols-2 bg-[#f5f5f0]">
      {/* Left Column: Image with Quote Overlay */}
      <div className="relative">
        <Image
          src="/6.jpg"
          alt="Person with arms raised"
          width={500}
          height={500}
          className="object-cover"
        />
      </div>

      {/* Right Column: Wu Wei Content */}
      <div className="bg-white p-8 md:p-12 flex flex-col justify-center">
        <h3 className="text-lg font-medium text-gray-800 font-serif">
          What to Expect
        </h3>
        <ul className="mt-4 text-sm text-gray-600 font-body list-disc list-inside">
          <li>Lower cortisol and recalibrate your nervous system</li>
          <li>Reset metabolism with expert-led training and precision nutrition</li>
          <li>Boost sleep quality, focus, and recovery with bio-behavioral protocols</li>
          <li>Optimize energy, body composition, and mental clarity</li>
          <li>Train with performance coaches and wellness experts</li>
          <li>Enjoy chef-designed, anti-inflammatory meals tailored to your goals</li>
        </ul>
        <h3 className="text-lg font-medium text-gray-800 font-serif mt-6">
          Beyond the Retreat
        </h3>
        <p className="mt-2 text-sm text-gray-600 font-body">
          Join the Rooted™ Tribe—a private community with a dedicated performance coach, customized training plan, biometric tracking, and optional challenge-based experiences like alpine expeditions and endurance hikes.
        </p>
        <p className="mt-4 text-sm text-gray-700 font-body italic">
          “Nature does not hurry, yet everything is accomplished.” — Lao Tzu
        </p>
      </div>
    </section>
  );
}