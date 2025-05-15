"use client";

import React, { useState, useEffect, useRef } from 'react';
import Image from 'next/image';

const CountdownTimer: React.FC = () => {
  const calculateTimeLeft = () => {
    // Example: Countdown to a fixed future date or a duration
    const difference = +new Date("2024-12-31T23:59:59") - +new Date();
    let timeLeft: { [key: string]: number } = {};

    if (difference > 0) {
      timeLeft = {
        days: Math.floor(difference / (1000 * 60 * 60 * 24)),
        hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((difference / 1000 / 60) % 60),
        seconds: Math.floor((difference / 1000) % 60),
      };
    }
    return timeLeft;
  };

  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());

  useEffect(() => {
    const timer = setTimeout(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);
    return () => clearTimeout(timer);
  });

  return (
    <div className="flex space-x-2 md:space-x-3 items-center justify-center text-gray-700">
      {Object.entries(timeLeft).map(([unit, value]) => (
        <div key={unit} className="text-center">
          <span className="text-2xl md:text-3xl font-semibold tabular-nums">{String(value).padStart(2, '0')}</span>
          <span className="block text-xs uppercase tracking-wider">{unit}</span>
        </div>
      ))}
      {Object.keys(timeLeft).length === 0 && <span className="text-lg">Registrations Closed</span>}
    </div>
  );
};

interface PricingCardProps {
  title: string;
  price: string;
  priceDetails?: string;
  inclusions: string[];
  ctaText: string;
  onCtaClick: () => void;
  isActive: boolean;
}

const PricingCard: React.FC<PricingCardProps> = ({ title, price, priceDetails, inclusions, ctaText, onCtaClick, isActive }) => {
  return (
    <div className={`bg-white rounded-xl shadow-lg p-6 md:p-8 transition-all duration-500 ease-in-out transform 
                    ${isActive ? 'opacity-100 scale-100' : 'opacity-0 scale-95 h-0 overflow-hidden p-0 m-0'}`}>
      {isActive && (
        <>
          <h3 className="text-2xl font-bold text-gray-800 mb-2 font-sans">{title}</h3>
          <p className="text-4xl font-extrabold text-gray-900 mb-1 font-sans">{price}</p>
          {priceDetails && <p className="text-sm text-gray-500 mb-4 font-sans">{priceDetails}</p>}
          <ul className="space-y-2 text-sm text-gray-600 mb-6 font-sans">
            {inclusions.map((item, index) => (
              <li key={index} className="flex items-center">
                <svg className="w-4 h-4 text-green-500 mr-2 shrink-0" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"></path></svg>
                {item}
              </li>
            ))}
          </ul>
          <button 
            onClick={onCtaClick}
            className="w-full px-6 py-3 bg-gray-800 text-white font-semibold rounded-lg shadow-md hover:bg-gray-700 hover:shadow-lg transform hover:scale-105 transition-all duration-300 ease-in-out focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2"
          >
            {ctaText}
          </button>
        </>
      )}
    </div>
  );
};

interface Section6Props {
  id?: string;
}

export function Section6({ id }: Section6Props) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [company, setCompany] = useState('');
  const [bookingType, setBookingType] = useState<'individual' | 'corporate'>('individual');
  const [showStickyCta, setShowStickyCta] = useState(false);
  const formRef = useRef<HTMLDivElement>(null); // Ref for the form or its main CTA area

  const handleSubmit = (e?: React.FormEvent) => {
    e?.preventDefault();
    // TODO: Implement actual form submission logic
    console.log({ name, email, company, bookingType });
    alert('Booking request submitted (simulated)!');
  };

  // Sticky CTA logic
  useEffect(() => {
    if (!formRef.current) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        // Show sticky CTA when the main form/CTA area is NOT visible
        setShowStickyCta(!entry.isIntersecting);
      },
      { rootMargin: "-100px 0px 0px 0px", threshold: 0 } // Adjust rootMargin as needed
    );
    observer.observe(formRef.current);
    return () => observer.disconnect();
  }, []);

  const individualInclusions = [
    "6-Day Luxury Retreat in Madeira",
    "Private or Shared Ocean-View Suite",
    "Chef-Designed Anti-Inflammatory Cuisine",
    "Personalized Biometric Analysis & Coaching",
    "Daily High-Performance Training & Recovery Sessions",
    "1-Year Access to Rooted Tribe™ Platform",
  ];

  return (
    <section id={id} className="relative py-16 md:py-24 bg-gradient-to-br from-white to-[#e5e5e0] font-sans overflow-hidden">
      {/* Subtle background image overlay */}
      <div className="absolute inset-0 z-0 opacity-10">
        <Image 
          src="/images/madeira-subtle-bg.jpg" 
          alt="Subtle background of Madeira landscape"
          fill
          className="object-cover"
          quality={75}
        />
      </div>

      <div className="container mx-auto px-4 md:px-8 relative z-10">
        <div className="max-w-3xl mx-auto text-center mb-12 md:mb-16">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-800 mb-4 text-shadow-md">
            Take Control—Book Your Spot
        </h2>
          <p className="text-md md:text-lg text-gray-700 leading-relaxed">
            Ready to reset? Join our exclusive pilot program and reclaim your energy. Limited spots available for this transformative experience.
        </p>
        </div>

        <div className="max-w-xl mx-auto bg-white/70 backdrop-blur-md p-6 md:p-10 rounded-xl shadow-2xl">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
              <input type="text" name="name" id="name" required value={name} onChange={(e) => setName(e.target.value)} className="w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-gray-500 focus:border-transparent transition-shadow" />
            </div>
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">Email Address</label>
              <input type="email" name="email" id="email" required value={email} onChange={(e) => setEmail(e.target.value)} className="w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-gray-500 focus:border-transparent transition-shadow" />
            </div>
            <div>
              <label htmlFor="company" className="block text-sm font-medium text-gray-700 mb-1">Company (Optional)</label>
              <input type="text" name="company" id="company" value={company} onChange={(e) => setCompany(e.target.value)} className="w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-gray-500 focus:border-transparent transition-shadow" />
            </div>

            <div ref={formRef} className="flex flex-col sm:flex-row gap-3 pt-4">
              <button 
                type="button"
                onClick={() => setBookingType('individual')}
                className={`w-full px-6 py-3 font-semibold rounded-lg border-2 transition-all duration-300 ease-in-out
                            ${bookingType === 'individual' 
                              ? 'bg-gray-800 text-white border-gray-800 shadow-lg' 
                              : 'bg-transparent text-gray-700 border-gray-500 hover:bg-gray-200 hover:border-gray-700'}`}
              >
                Book for Yourself
              </button>
              <button 
                type="button"
                onClick={() => setBookingType('corporate')}
                className={`w-full px-6 py-3 font-semibold rounded-lg border-2 transition-all duration-300 ease-in-out
                            ${bookingType === 'corporate' 
                              ? 'bg-gray-800 text-white border-gray-800 shadow-lg' 
                              : 'bg-transparent text-gray-700 border-gray-500 hover:bg-gray-200 hover:border-gray-700'}`}
              >
                Book for Your Team
              </button>
            </div>
          </form>
        </div>

        {/* Pricing Cards Container - with slide animation based on bookingType */} 
        <div className="max-w-xl mx-auto mt-8 overflow-hidden">
          <PricingCard 
            title="Individual Retreat Package"
            price="$25,000"
            priceDetails="Ocean-view suite upgrade: +$3,000"
            inclusions={individualInclusions}
            ctaText="Proceed with Individual Booking"
            onCtaClick={handleSubmit} // Or a different handler for this step
            isActive={bookingType === 'individual'}
          />
          <PricingCard 
            title="Corporate Team Package"
            price="Custom Quote"
            priceDetails="Tailored programs for leadership teams. Corporations can reduce burnout and save up to 2x salary costs on talent replacement."
            inclusions={["Customized Retreat Duration & Focus", ...individualInclusions.slice(2)]}
            ctaText="Request Corporate Consultation"
            onCtaClick={() => alert('Redirecting to corporate consultation form (simulated)')}
            isActive={bookingType === 'corporate'}
          />
        </div>

        <div className="mt-12 md:mt-16 text-center">
          <p className="text-sm text-gray-600 mb-2 uppercase tracking-wider">Limited Availability</p>
          <CountdownTimer />
          <p className="text-lg font-semibold text-gray-800 mt-4">Only 5 Spots Left for the Pilot Program!</p>
          <p className="mt-4 text-gray-600">
            Questions? <a href="tel:+1234567890" className="text-gray-800 font-semibold hover:underline">Call our concierge</a> or <a href="#" onClick={(e) => {e?.preventDefault(); alert('Opening chat...');}} className="text-gray-800 font-semibold hover:underline">chat with us</a>.
          </p>
        </div>
      </div>

      {/* Sticky Footer CTA for Mobile */} 
      {showStickyCta && (
        <div className="md:hidden fixed bottom-0 left-0 right-0 bg-white/90 backdrop-blur-md p-4 border-t border-gray-200 shadow-top z-40">
          <button 
            onClick={handleSubmit} // Or a function that scrolls to the form and submits
            className="w-full px-6 py-3.5 bg-gray-800 text-white font-semibold rounded-lg shadow-lg hover:bg-gray-700 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2"
          >
            Book Now & Transform
          </button>
        </div>
      )}
      <style jsx global>{`
        .shadow-top {
          box-shadow: 0 -4px 10px -1px rgba(0, 0, 0, 0.07), 0 -2px 6px -2px rgba(0, 0, 0, 0.04);
        }
      `}</style>
    </section>
  );
}