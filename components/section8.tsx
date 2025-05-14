"use client";

import React, { useEffect, useRef } from "react";
// Image and Link imports are not strictly needed by this component anymore
// import Image from "next/image";
// import Link from "next/link";

export function Section8() {
  const scrollRef = useRef<HTMLDivElement>(null);

  const programs = [
    {
      mainText: "Science-Backed Nervous-System Reboot + Executive Performance Lab",
      title: "Precision Reset for Peak Performance",
      description: "Experience a science-driven reboot to optimize your body and mind for lasting leadership excellence.",
    },
    {
      mainText: "Daily Flow Respecting Energy Rhythms",
      title: "A Rhythm for Renewal",
      description: "Align with your natural energy: morning breathwork, mid-day metabolic lunch and siesta, and evening skill sessions with a ceremonial close.",
    },
    {
      mainText: "Clear Monday-Morning Playbook",
      title: "Habits That Stick",
      description: "Leave with a 'Monday-Morning Playbook'—three micro-habits, a calendar anchor, and an accountability buddy for seamless integration.",
    },
    {
      mainText: "Reclaim Two Peak-Energy Hours Per Day",
      title: "Reclaim Your Time",
      description: "Gain two peak-energy hours daily within 30 days—unlocking more time, clarity, and joy in your leadership journey.",
    },
  ];

  useEffect(() => {
    const scrollContainer = scrollRef.current;
    if (!scrollContainer) return;

    let scrollAmount = 0;
    const scrollSpeed = 0.5;
    let containerScrollWidth = 0;

    // Debounce or use a ResizeObserver for robust scrollWidth calculation if layout shifts
    const calculateScrollWidth = () => {
      if (scrollContainer.children.length > 0) {
        containerScrollWidth = scrollContainer.scrollWidth / 2; // For duplicated items
      }
      if (containerScrollWidth <= 0) {
        console.warn("Scroll container width for auto-scroll is not valid or not yet available.");
      }
    };

    calculateScrollWidth(); // Initial calculation
    // Consider recalculating on window resize if layout is responsive

    const autoScroll = () => {
      if (!scrollContainer || containerScrollWidth <= 0) return;
      scrollAmount += scrollSpeed;
      if (scrollAmount >= containerScrollWidth) {
        scrollAmount = 0;
      }
      scrollContainer.scrollLeft = scrollAmount;
    };

    const intervalId = setInterval(autoScroll, 20);
    return () => clearInterval(intervalId);
  }, [programs]);

  const scrollByAmount = 350; 

  const scrollLeftHandler = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({ left: -scrollByAmount, behavior: "smooth" });
    }
  };

  const scrollRightHandler = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({ left: scrollByAmount, behavior: "smooth" });
    }
  };

  return (
    <section id="programs" className="py-16 bg-[#f5f5f0] max-w-[1440px] mx-auto overflow-hidden">
      <div className="container mx-auto px-4 md:px-8 text-center">
        <span className="block text-[#c0c0b0] text-lg font-light luxury-type">08</span>
        <h2 className="text-2xl md:text-3xl font-medium mt-4 text-gray-800 elegant-heading">
          Discover Rooted™ Programs
        </h2>
        <p className="text-lg font-light mt-2 mb-8 text-gray-700">
          Tailored Solutions for Lasting Transformation
        </p>
        <div className="flex justify-center space-x-4">
          <button
            onClick={scrollLeftHandler}
            className="p-2 bg-gray-800 text-white rounded-full hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-500 transition-colors duration-150"
            aria-label="Scroll left"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M15 18l-6-6 6-6" />
            </svg>
          </button>
          <button
            onClick={scrollRightHandler}
            className="p-2 bg-gray-800 text-white rounded-full hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-500 transition-colors duration-150"
            aria-label="Scroll right"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M9 18l6-6-6-6" />
            </svg>
          </button>
        </div>
      </div>

      <div className="relative mt-12">
        <div
          ref={scrollRef}
          className="flex overflow-x-auto scrollbar-hide snap-x snap-mandatory"
          style={{ scrollBehavior: "smooth" }}
        >
          {[...programs, ...programs].map((program, index) => (
            <div
              key={index}
              className="flex-none w-[350px] snap-center p-2" // Added p-2 to parent of card for small gap if desired instead of m-2 on card
            >
              <div className="bg-white rounded-lg shadow-lg overflow-hidden h-full flex flex-col">
                <div className="p-6 flex-grow flex flex-col">
                  <div className="mb-auto"> 
                    <p className="font-hk-grotesk text-xs text-gray-500 uppercase tracking-wider mb-3 leading-tight">
                      {program.mainText}
                    </p>
                    <h3 className="text-xl font-semibold font-rufina text-gray-800 mb-4 leading-snug">
                      {program.title}
                    </h3>
                  </div>
                  <p className="text-sm text-gray-600 font-body leading-relaxed">
                    {program.description}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}