

"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import clsx from "clsx";

const images = [
  "/estrella/1.jpg",
  "/estrella/2.jpg",
  "/estrella/3.jpg",
  "/estrella/6.jpg",
  "/estrella/5.jpg",
  "/estrella/4.jpg",
  "/estrella/7.jpg",
  "/estrella/8.jpg",
  "/estrella/9.jpg",
  "/estrella/10.jpg",
  "/estrella/11.jpg",
  "/estrella/12.jpg",
  "/estrella/13.jpg",
  "/estrella/14.jpg",
  "/estrella/15.jpg",
];

export default function Gallery() {
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);

  // Handle Escape key to close
  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setSelectedIndex(null);
      if (e.key === "ArrowLeft") setSelectedIndex((i) => (i !== null && i > 0 ? i - 1 : i));
      if (e.key === "ArrowRight") setSelectedIndex((i) => (i !== null && i < images.length - 1 ? i + 1 : i));
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, []);

  // Prevent background scroll when lightbox is open
  useEffect(() => {
    document.body.style.overflow = selectedIndex !== null ? "hidden" : "";
  }, [selectedIndex]);

  return (
    <div className="w-full">
      {/* Columns Layout */}
      <div className="columns-1 sm:columns-2 md:columns-3 gap-4 space-y-4">
        {images.map((src, idx) => (
          <div
            key={idx}
            className="break-inside-avoid cursor-pointer"
            onClick={() => setSelectedIndex(idx)}
          >
            <Image
              src={src}
              alt={`Estrela image ${idx + 1}`}
              width={800}
              height={600}
              className="rounded-lg w-full h-auto object-cover shadow-md hover:brightness-110 transition"
            />
          </div>
        ))}
      </div>

      {/* Lightbox Overlay */}
      {selectedIndex !== null && (
        <div
          className="fixed inset-0 z-50 bg-black bg-opacity-90 flex items-center justify-center px-4"
          onClick={() => setSelectedIndex(null)}
        >
          <button
            onClick={(e) => {
              e.stopPropagation();
              setSelectedIndex(null);
            }}
            className="absolute top-4 right-4 text-white text-2xl font-bold"
          >
            &times;
          </button>

          {/* Prev Button */}
          {selectedIndex > 0 && (
            <button
              onClick={(e) => {
                e.stopPropagation();
                setSelectedIndex((i) => (i !== null ? i - 1 : null));
              }}
              className="absolute left-4 text-white text-3xl font-bold"
            >
              &#8592;
            </button>
          )}

          {/* Image */}
          <Image
            src={images[selectedIndex]}
            alt={`Estrela image ${selectedIndex + 1}`}
            width={1200}
            height={800}
            className="max-h-[90vh] w-auto rounded-lg"
            onClick={(e) => e.stopPropagation()}
          />

          {/* Next Button */}
          {selectedIndex < images.length - 1 && (
            <button
              onClick={(e) => {
                e.stopPropagation();
                setSelectedIndex((i) => (i !== null ? i + 1 : null));
              }}
              className="absolute right-4 text-white text-3xl font-bold"
            >
              &#8594;
            </button>
          )}
        </div>
      )}
    </div>
  );
}