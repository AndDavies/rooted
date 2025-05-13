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
          width={760}
          height={760}
          className="object-cover"
        />
        <div className="absolute inset-0 flex flex-col items-center justify-start pt-8">
          <div className="bg-black/30 px-6 py-4 rounded-md">
            <blockquote className="text-xl md:text-2xl font-serif italic text-white text-center">
              "When I let go of what I am, I become what I might be"
            </blockquote>
            <cite className="mt-4 text-sm text-gray-200 font-body block text-center">
              - Lao Tzu
            </cite>
          </div>
        </div>
      </div>

      {/* Right Column: Wu Wei Content */}
      <div className="p-8 md:p-12 flex flex-col justify-center">
        <h2 className="text-xl md:text-2xl font-medium text-gray-800">Wu Wei</h2>
        <p className="text-lg font-light mt-2 text-gray-700">
          The art of
          <br />
          effortless living
        </p>
        <p className="mt-4 text-sm text-gray-600 max-w-md font-body">
          Wu Wei teaches us to align with the natural flow of life. When we stop forcing and start flowing, we
          discover a profound sense of peace and purpose.
        </p>
      </div>
    </section>
  );
}