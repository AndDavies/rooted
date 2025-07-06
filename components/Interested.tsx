"use client";

import { useState, useEffect } from "react";
import Image from "next/image";

export function Interested() {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    company: "",
    email: "",
    message: ""
  });
  const [addToNewsletter, setAddToNewsletter] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [error, setError] = useState("");
  const [currentSource, setCurrentSource] = useState("I'm Interested");

  useEffect(() => {
    const handleSetEventSource = (event: CustomEvent) => {
      const { source, message } = event.detail;
      console.log("Setting event source:", source, "with message:", message);
      setCurrentSource(source);
      setFormData((prev) => ({ ...prev, message }));
    };

    window.addEventListener("setEventSource", handleSetEventSource as EventListener);
    return () => window.removeEventListener("setEventSource", handleSetEventSource as EventListener);
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError("");

    const groups = ["INTERESTED"];
    if (addToNewsletter) groups.push("NEWSLETTER");

    try {
      const response = await fetch("/api/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...formData,
          source: currentSource,
          groups
        })
      });

      if (response.ok) {
        setShowSuccess(true);
        setFormData({ firstName: "", lastName: "", company: "", email: "", message: "" });
        setCurrentSource("I'm Interested");
        setTimeout(() => setShowSuccess(false), 5000);
      } else {
        const errorData = await response.json();
        setError(errorData.message || "Something went wrong. Please try again.");
      }
    } catch {
      setError("Network error. Please check your connection and try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="interested" className="relative min-h-screen flex items-center justify-center py-20">
      <div className="absolute inset-0">
        <Image
          src="/interested-bg.jpg"
          alt="Scenic landscape with birds flying"
          fill
          sizes="100vw"
          style={{ objectFit: "cover" }}
          className="brightness-75"
        />
      </div>

      <div className="relative z-10 container mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="text-left">
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-light text-white leading-tight">
              ROOTED offers a new way of living: one where performance and wellbeing are not mutually exclusive.
            </h2>
          </div>

          <div className="bg-white/95 backdrop-blur-sm rounded-2xl p-8 shadow-xl">
            {showSuccess ? (
              <div className="text-center py-8">
                <div className="w-16 h-16 bg-amber-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg className="w-8 h-8 text-amber-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <h3 className="text-2xl font-light text-[#4A4A4A] mb-2">Thank you for your interest!</h3>
                <p className="text-base text-[#4A4A4A]/80">Welcome to ROOTED! You've taken a proactive step toward a principle-centered lifestyle. We'll keep you updated on our micro-events and transformative retreats.</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label className="block text-base font-medium text-[#4A4A4A] mb-2">Name</label>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm text-[#4A4A4A]/70 mb-1">First Name</label>
                      <input
                        type="text"
                        name="firstName"
                        value={formData.firstName}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 border border-[#4A4A4A] rounded-lg focus:ring-2 focus:ring-[#D4AF37] focus:border-[#D4AF37] transition-all duration-200 text-[#4A4A4A] placeholder-[#4A4A4A]/50 min-h-[44px] text-base"
                        placeholder="First Name"
                      />
                    </div>
                    <div>
                      <label className="block text-sm text-[#4A4A4A]/70 mb-1">Last Name</label>
                      <input
                        type="text"
                        name="lastName"
                        value={formData.lastName}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 border border-[#4A4A4A] rounded-lg focus:ring-2 focus:ring-[#D4AF37] focus:border-[#D4AF37] transition-all duration-200 text-[#4A4A4A] placeholder-[#4A4A4A]/50 min-h-[44px] text-base"
                        placeholder="Last Name"
                      />
                    </div>
                  </div>
                </div>

                <div>
                  <label className="block text-base font-medium text-[#4A4A4A] mb-2">Company</label>
                  <input
                    type="text"
                    name="company"
                    value={formData.company}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-[#4A4A4A] rounded-lg focus:ring-2 focus:ring-[#D4AF37] focus:border-[#D4AF37] transition-all duration-200 text-[#4A4A4A] placeholder-[#4A4A4A]/50 min-h-[44px] text-base"
                    placeholder="Your Company"
                  />
                </div>

                <div>
                  <label className="block text-base font-medium text-[#4A4A4A] mb-2">
                    Email <span className="text-[#4A4A4A]/50">*</span>
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 border border-[#4A4A4A] rounded-lg focus:ring-2 focus:ring-[#D4AF37] focus:border-[#D4AF37] transition-all duration-200 text-[#4A4A4A] placeholder-[#4A4A4A]/50 min-h-[44px] text-base"
                    placeholder="your.email@company.com"
                  />
                </div>

                <div>
                  <label className="block text-base font-medium text-[#4A4A4A] mb-2">Message</label>
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleInputChange}
                    rows={4}
                    className="w-full px-4 py-3 border border-[#4A4A4A] rounded-lg focus:ring-2 focus:ring-[#D4AF37] focus:border-[#D4AF37] transition-all duration-200 resize-none text-[#4A4A4A] placeholder-[#4A4A4A]/50 min-h-[44px] text-base"
                    placeholder="Tell us about yourself and what interests you about the ROOTED way."
                  />
                </div>

                <div className="flex items-start gap-2">
                  <input
                    type="checkbox"
                    id="newsletter"
                    checked={addToNewsletter}
                    onChange={(e) => setAddToNewsletter(e.target.checked)}
                    className="mt-1"
                  />
                  <label htmlFor="newsletter" className="text-sm text-[#4A4A4A]/80">
                    Subscribe me to <strong>The ROOTED Weekly</strong>
                  </label>
                </div>

                {error && (
                  <div className="p-4 bg-red-50 border border-red-200 rounded-lg">
                    <p className="text-base text-red-600">{error}</p>
                  </div>
                )}

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-[#4A4A4A] hover:bg-[#333] text-white font-semibold py-4 px-6 rounded-lg transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed focus:ring-2 focus:ring-[#D4AF37] focus:ring-offset-2 min-h-[44px] text-base"
                >
                  {isSubmitting ? (
                    <div className="flex items-center justify-center">
                      <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      SUBMITTING...
                    </div>
                  ) : (
                    "EXPLORE WHAT'S POSSIBLE"
                  )}
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
