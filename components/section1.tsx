"use client";

import React from "react";
import Image from "next/image";

export function Section1() {
  return (
    <section id="foundation" className="grid grid-cols-1 md:grid-cols-2 h-[465px]">
      <div className="bg-[#f5f5f0] p-8 md:p-12 flex flex-col justify-center">
        <span className="text-[#c0c0b0] text-lg font-light">01</span>
        <h2 className="text-xl md:text-2xl font-medium mt-4 text-gray-800">
          A Playground
          <br />
          of wellbeing
        </h2>
        <p className="mt-4 text-sm text-gray-600 max-w-md font-body">
          We believe in creating spaces where individuals can explore and nurture their wellbeing in a natural,
          supportive environment. Our approach combines ancient wisdom with modern practices.
        </p>
      </div>
      <div className="relative h-[465px] md:h-full">
        <Image
          src="/wellbeing.jpg"
          alt="Hands holding a small plant"
          fill
          className="object-cover"
        />
      </div>
    </section>
  );
} 