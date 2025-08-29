"use client";

import React, { useState, useEffect, useRef, useCallback } from 'react';
import Image from 'next/image';

const daysData = [
  { 
    dayLabel: "Day 1", 
    title: "Day 1: Ground in Nature", 
    description: "Ground with a nature walk and breathwork.", 
    imageSrc: "/images/timeline-day1.jpg", 
    imageAlt: "Lush forest path for nature walk"
  },
  { 
    dayLabel: "Day 2", 
    title: "Day 2: Reconnect", 
    description: "Reconnect through reflective practices.", 
    imageSrc: "/images/timeline-day2.jpg", 
    imageAlt: "Serene coastal view for reflection"
  },
  { 
    dayLabel: "Day 3", 
    title: "Day 3: Define Your Vision", 
    description: "Define your vision with biometric insights.", 
    imageSrc: "/images/timeline-day3.jpg", 
    imageAlt: "Expansive vista point symbolizing vision"
  },
  { 
    dayLabel: "Day 4", 
    title: "Day 4: Unplug & Reset", 
    description: "Unplug, reset with a sound bath.", 
    imageSrc: "/images/timeline-day4.jpg", 
    imageAlt: "Calm and inviting sound bath setting"
  },
  { 
    dayLabel: "Day 5", 
    title: "Day 5: Flow & Integrate", 
    description: "Flow with meditative hikes and coaching.", 
    imageSrc: "/images/timeline-day5.jpg", 
    imageAlt: "Scenic meditative hiking trail"
  },
  { 
    dayLabel: "Day 6", 
    title: "Day 6: Depart with Purpose", 
    description: "Depart with a roadmap and micro-habits.", 
    imageSrc: "/images/timeline-day6.jpg", 
    imageAlt: "Inspiring sunrise symbolizing a new purposeful start"
  },
];

interface DayContentPanelProps {
  day: typeof daysData[0];
  isActive: boolean;
  observerRef?: (node: HTMLDivElement | null) => void;
}

const DayContentPanel: React.FC<DayContentPanelProps> = ({ day, isActive, observerRef }) => {
  return (
    <div ref={observerRef} id={`day-${day.dayLabel.replace(' ', '').toLowerCase()}`} className="min-h-[70vh] md:min-h-screen flex flex-col justify-center py-10 md:py-20 snap-start">
      <div className={`transition-opacity duration-700 ease-in-out ${isActive ? 'opacity-100' : 'opacity-30 md:opacity-100'}`}>
        <div className="relative w-full h-[30vh] md:h-[50vh] mb-6 rounded-lg overflow-hidden shadow-xl">
          <Image 
            src={day.imageSrc} 
            alt={day.imageAlt}
            fill
            className={`object-cover transition-transform duration-1000 ease-out ${isActive ? 'scale-100' : 'scale-110'}`}
            sizes="(max-width: 768px) 100vw, 50vw"
          />
        </div>
        <div className={`bg-white p-6 md:p-8 rounded-lg shadow-2xl transition-all duration-700 ease-in-out 
                        ${isActive ? 'opacity-100 translate-x-0' : 'opacity-0 md:translate-x-10'}`}>
          <h3 className="text-2xl md:text-3xl font-bold text-gray-800 mb-3 font-sans">
            {day.title}
          </h3>
          <p className="text-gray-700 leading-relaxed font-sans">
            {day.description}
          </p>
        </div>
      </div>
    </div>
  );
};

const ItineraryModal: React.FC<{ isOpen: boolean; onClose: () => void }> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl shadow-2xl max-w-2xl w-full max-h-[80vh] flex flex-col">
        <div className="p-6 border-b border-gray-200">
          <h2 className="text-2xl font-bold text-gray-800 font-sans">Full Itinerary</h2>
        </div>
        <div className="p-6 overflow-y-auto scrollbar-hide flex-grow">
          {daysData.map((day, index) => (
            <div key={index} className="mb-6 pb-6 border-b border-gray-100 last:border-b-0 last:pb-0 last:mb-0">
              <h3 className="text-xl font-semibold text-gray-700 mb-2 font-sans">{day.title}</h3>
              <p className="text-gray-600 text-sm font-sans leading-relaxed">{day.description}</p>
            </div>
          ))}
        </div>
        <div className="p-4 bg-gray-50 border-t border-gray-200 text-right rounded-b-xl">
          <button 
            onClick={onClose}
            className="px-6 py-2 bg-gray-700 text-white font-semibold rounded-lg hover:bg-gray-600 transition-colors duration-200"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

interface Section4Props {
  id?: string; 
}

export function Section4({ id }: Section4Props) { 
  const [activeDayIndex, setActiveDayIndex] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const contentRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    contentRefs.current = contentRefs.current.slice(0, daysData.length);
  }, []);

  const handleTimelineClick = (index: number) => {
    setActiveDayIndex(index);
    const targetId = `day-${daysData[index].dayLabel.replace(' ', '').toLowerCase()}`;
    document.getElementById(targetId)?.scrollIntoView({
      behavior: 'smooth',
      block: 'center' 
    });
  };
  
  useEffect(() => {
    const observerOptions = {
      root: null, 
      rootMargin: '0px',
      threshold: 0.5 
    };

    const observerCallback = (entries: IntersectionObserverEntry[]) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const index = contentRefs.current.findIndex(ref => ref === entry.target);
          if (index !== -1) {
            setActiveDayIndex(index);
          }
        }
      });
    };

    const observer = new IntersectionObserver(observerCallback, observerOptions);
    contentRefs.current.forEach(ref => ref && observer.observe(ref));

    return () => observer.disconnect();
  }, []); 

  return (
    <section id={id} className="py-16 md:py-24 bg-gray-100 font-sans">
      <div className="container mx-auto px-4 md:px-8 text-center mb-12 md:mb-16">
        <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-gray-800 mb-4 text-shadow-md leading-tight px-2">
          6 Days to Redefine Your Leadership
        </h2>
        <p className="text-md md:text-lg text-gray-700 max-w-2xl mx-auto leading-relaxed">
          Each day in Madeira restores your body and mind:
        </p>
      </div>

      {/* Mobile Carousel View */} 
      <div className="md:hidden px-4">
        <div className="flex overflow-x-auto snap-x snap-mandatory scrollbar-hide space-x-4 pb-4">
          {daysData.map((day, index) => (
            <div key={index} className="snap-center flex-none w-[85vw] max-w-md">
              <DayContentPanel day={day} isActive={true} />
            </div>
          ))}
        </div>
      </div>

      {/* Desktop Timeline View */} 
      <div className="hidden md:grid md:grid-cols-12 gap-8 container mx-auto px-4 md:px-8 relative">
        <div className="md:col-span-3 lg:col-span-2 sticky top-24 h-screen-minus-header self-start overflow-y-auto scrollbar-hide pt-10">
          <nav>
            <ul>
              {daysData.map((day, index) => (
                <li key={index} className="mb-3">
                  <button 
                    onClick={() => handleTimelineClick(index)}
                    className={`w-full text-left px-4 py-3 rounded-md transition-all duration-300 ease-in-out font-semibold 
                                ${activeDayIndex === index 
                                  ? 'bg-gray-800 text-white shadow-lg scale-105 ring-2 ring-gray-500 ring-offset-2 ring-offset-gray-100'
                                  : 'bg-white text-gray-600 hover:bg-gray-200 hover:text-gray-800'}`}
                  >
                    {day.dayLabel}: {day.title.split(': ')[1]}
                  </button>
                </li>
              ))}
            </ul>
          </nav>
        </div>

        <div className="md:col-span-9 lg:col-span-10">
          {daysData.map((day, index) => (
            <DayContentPanel 
              key={index} 
              day={day} 
              isActive={activeDayIndex === index}
              observerRef={(el) => contentRefs.current[index] = el}
            />
          ))}
        </div>
      </div>

      <div className="text-center mt-12 md:mt-16">
         <p className="text-lg text-gray-700 mb-6 max-w-xl mx-auto">
            Leave refreshed, focused, and ready to lead.
          </p>
        <button 
          onClick={() => setIsModalOpen(true)}
          className="px-8 py-3 bg-transparent border-2 border-gray-700 text-gray-700 font-semibold rounded-lg hover:bg-gray-700 hover:text-white transition-all duration-300 ease-in-out transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2"
        >
          See Full Itinerary
        </button>
      </div>

      <ItineraryModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
      
      <style jsx global>{`
        .h-screen-minus-header {
          height: calc(100vh - 8rem); 
        }
      `}</style>
    </section>
  );
}