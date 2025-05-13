"use client";

import React, { useState } from "react";

export function Section7() {
  const [physical, setPhysical] = useState(50);
  const [emotional, setEmotional] = useState(50);
  const [mental, setMental] = useState(50);

  const getEnergySuggestion = () => {
    const avgEnergy = (physical + emotional + mental) / 3;
    if (avgEnergy < 40) {
      return "Your energy levels seem low. Consider grounding yourself with a nature walk or a few minutes of conscious breathing.";
    } else if (avgEnergy < 70) {
      return "Your energy could use a boost. Try a short meditation or reflect on what brings you joy.";
    } else {
      return "Your energy levels are strong! Keep nurturing yourself with mindful practices.";
    }
  };

  return (
    <section id="energy-checkin" className="bg-white py-12 px-8 md:px-12">
      <div className="max-w-3xl mx-auto">
        <h2 className="text-xl md:text-2xl font-medium text-gray-800 font-serif text-center">
          Energy Check-In
        </h2>
        <p className="mt-4 text-sm text-gray-600 font-body text-center">
          Take a moment to assess your current state. How are you feeling physically, emotionally, and mentally?
        </p>

        {/* Sliders */}
        <div className="mt-8 space-y-6">
          <div>
            <label className="block text-sm text-gray-700 font-body">Physical Energy: {physical}%</label>
            <input
              type="range"
              min="0"
              max="100"
              value={physical}
              onChange={(e) => setPhysical(Number(e.target.value))}
              className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
              style={{
                background: `linear-gradient(to right, #a3c1ad ${physical}%, #e5e5e0 ${physical}%)`,
              }}
            />
          </div>
          <div>
            <label className="block text-sm text-gray-700 font-body">Emotional Energy: {emotional}%</label>
            <input
              type="range"
              min="0"
              max="100"
              value={emotional}
              onChange={(e) => setEmotional(Number(e.target.value))}
              className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
              style={{
                background: `linear-gradient(to right, #a3c1ad ${emotional}%, #e5e5e0 ${emotional}%)`,
              }}
            />
          </div>
          <div>
            <label className="block text-sm text-gray-700 font-body">Mental Energy: {mental}%</label>
            <input
              type="range"
              min="0"
              max="100"
              value={mental}
              onChange={(e) => setMental(Number(e.target.value))}
              className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
              style={{
                background: `linear-gradient(to right, #a3c1ad ${mental}%, #e5e5e0 ${mental}%)`,
              }}
            />
          </div>
        </div>

        {/* Result */}
        <div className="mt-8 p-4 bg-[#f5f5f0] rounded-md">
          <p className="text-sm text-gray-600 font-body text-center">{getEnergySuggestion()}</p>
        </div>

        <p className="mt-6 text-sm text-gray-700 font-body italic text-center">
          "Peace comes from within. Do not seek it without." — Buddha
        </p>

        {/* Pill Button */}
        <div className="mt-8 flex justify-center">
          <button 
            className="inline-flex items-center justify-center bg-gray-800 text-white text-sm font-medium px-8 py-3 rounded-full hover:bg-gray-700 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
          >
            Save Your Reflection
          </button>
        </div>
      </div>
    </section>
  );
}