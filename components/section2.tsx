"use client";

import React from "react";
import Image from "next/image";

export function Section2() {
  return (
    <section id="method" className="bg-[#f5f5f0] p-8 md:p-12">
      <span className="text-[#c0c0b0] text-lg font-light">02</span>
      <h2 className="text-xl md:text-2xl font-medium mt-4 text-gray-800">
        The Foundation
        <br />
        of Rooted
      </h2>
      <p className="mt-6 text-lg text-gray-500 max-w-6xl font-body">
        Finding something for the first time is a "return." We've been on a journey to discover what makes us whole.
        Through it all, we've found that the simplest practices are often the most profound. Join us as we explore the
        elements that connect us to ourselves and to nature.
      </p>
      {/* Four Elements Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 mt-8">
        <div className="relative group overflow-hidden">
          <Image
            src="/2.jpg"
            alt="Wood element"
            width={500}
            height={500}
            className="object-cover transition-transform duration-300 group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-black/20 group-hover:bg-black/30 transition-all duration-300" />
          <div className="absolute bottom-4 left-4 text-white font-medium">Wood</div>
        </div>

        <div className="relative group overflow-hidden">
          <Image
            src="/3.jpg"
            alt="Earth element"
            width={500}
            height={500}
            className="object-cover transition-transform duration-300 group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-black/20 group-hover:bg-black/30 transition-all duration-300" />
          <div className="absolute bottom-4 left-4 text-white font-medium">Earth</div>
        </div>

        <div className="relative group overflow-hidden">
          <Image
            src="/4.jpg"
            alt="Metal element"
            width={500}
            height={500}
            className="object-cover transition-transform duration-300 group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-black/20 group-hover:bg-black/30 transition-all duration-300" />
          <div className="absolute bottom-4 left-4 text-white font-medium">Metal</div>
        </div>

        <div className="relative group overflow-hidden">
          <Image
            src="/5.jpg"
            alt="Water element"
            width={500}
            height={500}
            className="object-cover transition-transform duration-300 group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-black/20 group-hover:bg-black/30 transition-all duration-300" />
          <div className="absolute bottom-4 left-4 text-white font-medium">Water</div>
        </div>
      </div>
    </section>
  );
}