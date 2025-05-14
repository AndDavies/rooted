"use client";

import React, { useState, useEffect, useRef } from 'react';
import Image from 'next/image';

// Simple placeholder for an animated statistic component
// In a real app, this would have count-up animation logic
interface AnimatedStatisticProps {
  label: string;
  value: string; // e.g., "49%" or "2x"
  description: string;
  className?: string;
}

const AnimatedStatistic: React.FC<AnimatedStatisticProps> = ({ label, value, description, className }) => {
  // Placeholder for animation - actual animation would update the displayed value
  const [displayValue, setDisplayValue] = useState("0"); // Or initial value like "0%"

  useEffect(() => {
    // Simulate fetching and then count-up animation
    // For now, just set the final value for display
    // Actual implementation would use a counter with requestAnimationFrame or a library
    setDisplayValue(value.match(/\d+/)?.[0] || "0"); // Extract number part for potential animation start
  }, [value]);

  return (
    <div className={`mb-8 p-4 rounded-lg bg-white/10 backdrop-blur-sm ${className}`}>
      <div className="text-5xl font-bold text-white text-shadow-lg">
        {/* This is where the animated number would go. For now, showing target. */}
        {value.replace(displayValue, '')} {/* Show prefix like % or x */}
        <span className="inline-block min-w-[60px] text-left">{displayValue}</span>
        {value.substring(value.indexOf(displayValue) + displayValue.length)} {/* Show suffix */}
      </div>
      <p className="mt-2 text-sm text-gray-200 text-shadow-sm">{label}</p>
      <p className="mt-1 text-xs text-gray-300">{description}</p>
    </div>
  );
};

export function Section2() {
  const [imageIsColored, setImageIsColored] = useState(false);
  const imageRef = useRef<HTMLDivElement>(null);

  // TODO: Implement scroll-triggered animation for image and stats
  // e.g., using Intersection Observer to set `imageIsColored` to true
  // and to trigger animations for statistics when they scroll into view.
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setImageIsColored(true);
          // Potentially trigger stat animations here
        } else {
          // Optional: Reset when scrolling out of view
          // setImageIsColored(false);
        }
      },
      { threshold: 0.5 } // Adjust threshold as needed
    );
    if (imageRef.current) {
      observer.observe(imageRef.current);
    }
    return () => {
      if (imageRef.current) {
        observer.unobserve(imageRef.current);
      }
    };
  }, []);

  return (
    <section 
      id="problem" 
      className="min-h-screen py-16 md:py-24 bg-gradient-to-br from-[#f5f5f0] to-[#e5e5e0] text-gray-800 font-sans"
    >
      <div className="container mx-auto px-4 md:px-8">
        <div className="grid md:grid-cols-2 gap-8 md:gap-12 items-center">
          {/* Left Column: Image */} 
          <div ref={imageRef} className="relative h-[400px] md:h-[600px] lg:h-[700px] rounded-lg overflow-hidden shadow-2xl">
            {/* Grayscale Image (Base) */}
            <Image 
              src="/images/stressed-executive-bw.jpg" 
              alt="Stressed Executive in Grayscale"
              fill
              className={`object-cover transition-opacity duration-1000 ease-in-out ${imageIsColored ? 'opacity-0' : 'opacity-100'}`}
              sizes="(max-width: 768px) 100vw, 50vw"
            />
            {/* Color Image (Revealed on scroll/interaction) */}
            <Image 
              src="/images/stressed-executive-color.jpg" 
              alt="Executive transformed and vibrant"
              fill
              className={`object-cover transition-opacity duration-1000 ease-in-out ${imageIsColored ? 'opacity-100' : 'opacity-0'}`}
              sizes="(max-width: 768px) 100vw, 50vw"
            />
             <div className="absolute inset-0 bg-black/30 group-hover:bg-black/10 transition-colors duration-300"></div>
          </div>

          {/* Right Column: Content & Statistics */} 
          <div className="py-8 relative z-10">
            <span className="block text-gray-500 text-sm font-medium tracking-wider uppercase mb-2 text-shadow-sm">
              The Unseen Toll
            </span>
            <h2 className="text-4xl md:text-5xl font-bold text-gray-800 mb-6 text-shadow-md">
              The High Cost of Always-On Leadership
            </h2>
            <p className="text-lg text-gray-700 mb-8 leading-relaxed text-shadow-sm">
              You're a top leader, but the pressure is relentless. Sleepless nights leave you foggy. Mid-day fatigue kills your focus. Stress strains your health and clarity. Quick getaways don't fix the root issue. You need a deeper reset to lead at your peak—without losing yourself.
            </p>
            
            {/* Animated Statistics */}
            <div className="space-y-6 md:space-y-8">
              <AnimatedStatistic 
                value="49%" 
                label="Report Sleep Struggles"
                description="Nearly half of leaders face persistent sleep issues, impacting cognitive function and decision-making."
                className="transition-all duration-500 ease-out opacity-0 animate-fadeInUp" // Placeholder for actual animation trigger
              />
              <AnimatedStatistic 
                value="2x"
                label="Cost to Replace Talent"
                description="Burnout-driven turnover can cost up to double an executive's salary, beyond the loss of crucial expertise."
                className="transition-all duration-500 ease-out opacity-0 animate-fadeInUp delay-200" // Placeholder for actual animation trigger
              />
              {/* Add more statistics as needed */}
            </div>
          </div>
        </div>
      </div>
      {/* Basic CSS for fadeInUp animation - ideally use Tailwind keyframes or a library */}
      <style jsx global>{`
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-fadeInUp {
          animation: fadeInUp 0.8s ease-out forwards;
        }
        .delay-200 { animation-delay: 0.2s; }
      `}</style>
    </section>
  );
}