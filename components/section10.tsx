"use client";

import React, { useState } from "react";

// Define the type for gratitude message entries
interface GratitudeEntry {
  id: number;
  name: string;
  message: string;
}

export function Section10() {
  const [gratitudeMessages, setGratitudeMessages] = useState<GratitudeEntry[]>([]);
  const [name, setName] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (message.trim()) {
      setGratitudeMessages([
        ...gratitudeMessages,
        { name: name.trim() || "Anonymous", message: message.trim(), id: Date.now() },
      ]);
      setName("");
      setMessage("");
    }
  };

  return (
    <section id="gratitude-wall" className="py-12 px-8 md:px-12 bg-[#f5f5f0]">
      <div className="max-w-5xl mx-auto">
        <h2 className="text-xl md:text-2xl font-medium text-gray-800 font-serif text-center">
          Community Gratitude Wall
        </h2>
        <p className="mt-4 text-sm text-gray-600 font-body text-center">
          Share what you're grateful for and join the Rooted™ Tribe in cultivating positivity.
        </p>

        {/* Form */}
        <form onSubmit={handleSubmit} className="mt-8 max-w-md mx-auto">
          <div className="mb-4">
            <label htmlFor="name" className="block text-sm text-gray-700 font-body">
              Your Name (Optional)
            </label>
            <input
              type="text"
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full mt-1 p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-500"
              placeholder="Anonymous"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="message" className="block text-sm text-gray-700 font-body">
              What Are You Grateful For?
            </label>
            <textarea
              id="message"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              className="w-full mt-1 p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-500"
              rows={3}
              placeholder="I'm grateful for..."
              required
            />
          </div>
          <div className="text-center">
            <button
              type="submit"
              className="bg-gray-800 text-white px-4 py-2 rounded-full hover:bg-gray-700"
            >
              Share Your Gratitude
            </button>
          </div>
        </form>

        {/* Gratitude Messages */}
        <div className="mt-12 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {gratitudeMessages.map((entry) => (
            <div
              key={entry.id}
              className="p-4 bg-white rounded-lg shadow-sm transition-opacity duration-500 opacity-0 animate-fadeIn"
            >
              <p className="text-sm text-gray-600 font-body italic">
                "{entry.message}"
              </p>
              <p className="mt-2 text-xs text-gray-500 font-body">
                — {entry.name}
              </p>
            </div>
          ))}
        </div>

        <p className="mt-8 text-sm text-gray-700 font-body italic text-center">
          "You, yourself, as much as anybody in the entire universe, deserve your love and affection." — Buddha
        </p>
      </div>

      {/* CSS for Fade-In Animation */}
      <style jsx>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-fadeIn {
          animation: fadeIn 0.5s ease-out forwards;
        }
      `}</style>
    </section>
  );
}