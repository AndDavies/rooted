"use client";

import React from "react";

export function Section4() {
  return (
    <section id="reflect" className="grid grid-cols-1 md:grid-cols-2 bg-[#f5f5f0]">
      <div className="p-8 md:p-12 flex flex-col justify-center h-[300px] md:h-[465px]">
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
      <div className="bg-white p-8 md:p-12 h-[300px] md:h-[465px]">
        {/* This appears to be empty or contain content not visible in the image */}
      </div>
    </section>
  );
} 