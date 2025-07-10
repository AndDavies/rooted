"use client";
import { useState, useEffect } from "react";
import Image from "next/image";

export default function GutResetPage() {
  const [email, setEmail] = useState("");
  const [newsletterOptIn, setNewsletterOptIn] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [autoJoinedFromQuery, setAutoJoinedFromQuery] = useState(false);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const e = params.get("e");
    if (e && validateEmail(e)) {
      console.log("🔍 Auto-submitting email from query:", e);
      submitEmail(e, true).then((success) => {
        console.log("🔍 Submit result:", success);
        if (success) {
          console.log("🔍 Setting autoJoinedFromQuery to true");
          setAutoJoinedFromQuery(true);
        } else {
          console.log("🔍 Setting autoJoinedFromQuery to false");
          setAutoJoinedFromQuery(false);
        }
      }).catch((error) => {
        console.error("🔍 Submit failed with error:", error);
        setAutoJoinedFromQuery(false);
      });
    }
  }, []);

  function validateEmail(email: string) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  }

  async function submitEmail(submitEmail: string, fromQuery = false): Promise<boolean> {
    console.log("🔍 submitEmail called with:", submitEmail, "fromQuery:", fromQuery);
    setLoading(true);
    setError("");
    try {
      const res = await fetch("/api/submit", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          firstName: "Guest",
          lastName: "Signup",
          company: "",
          message: "Auto-submitted from gut reset link or form",
          email: submitEmail,
          groups: ["INTERESTED", "GUT_RESET_AUG_15"],
          source: "gut-reset-landing",
          newsletterOptIn: fromQuery ? true : newsletterOptIn,
        }),
      });
      if (!res.ok) {
        console.error("🔍 API response not ok:", res.status, res.statusText);
        throw new Error("Failed to submit");
      }
      console.log("🔍 API response successful, setting submitted to true");
      setSubmitted(true);
      return true;
    } catch (error) {
      console.error("🔍 submitEmail caught error:", error);
      setError("There was an error submitting your email. Please try again.");
      return false;
    } finally {
      setLoading(false);
    }
  }

  function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!validateEmail(email)) {
      setError("Please enter a valid email address.");
      return;
    }
    submitEmail(email);
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="relative py-16 md:py-24 flex items-center justify-center">
        {/* Background Image */}
        <div className="absolute inset-0">
          <Image
            src="/events/gut_reset_bg.jpg"
            alt="Fresh healthy foods for gut reset"
            fill
            sizes="100vw"
            style={{ objectFit: "cover" }}
            className="brightness-75"
            priority
          />
        </div>

        {/* Overlay gradient for text readability */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-black/40"></div>

        {/* Content */}
        <div className="relative z-10 container mx-auto px-4 text-center">
          <div className="max-w-4xl mx-auto">
            {/* Main Headline */}
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-light text-white leading-tight mb-6">
              <span className="block">14-Day Gut Reset:</span>
              <span className="block text-[#D4AF36] font-normal">Restore. Rebalance. Revive.</span>
            </h1>

            {/* Subheading */}
            <p className="text-lg md:text-xl text-white/90 font-light leading-relaxed mb-8 max-w-2xl mx-auto">
              Feeling foggy, tired, or off-track? Your gut holds the key to your energy and clarity.
            </p>

            {/* Quick value prop */}
            <p className="text-md md:text-lg text-white/80 font-light leading-relaxed max-w-3xl mx-auto">
              This isn't another fad diet—it's a science-based protocol to reboot your digestion, energy, and mental clarity in just 14 days.
            </p>
          </div>
        </div>
      </section>

      {/* Confirmation message for auto-joined */}
      {autoJoinedFromQuery && (
        <div className="bg-[#F1F5F9] text-[#4A4A4A] py-6 px-4 md:px-8 text-center">
          <p className="text-base md:text-lg max-w-3xl mx-auto">
            <strong>Thanks for your interest in the 14-Day Gut Reset!</strong> We will be in touch soon and send you more details and resources as the start date approaches. Don’t worry, you can unsubscribe anytime.
          </p>
        </div>
      )}
      
      {/* Debug info - remove in production */}
      {process.env.NODE_ENV === 'development' && (
        <div className="bg-yellow-100 border border-yellow-400 text-yellow-700 px-4 py-3 rounded mx-4 my-2">
          <strong>Debug Info:</strong> autoJoinedFromQuery = {String(autoJoinedFromQuery)}, submitted = {String(submitted)}
        </div>
      )}

      {/* Band 1: Text-Image - What to Expect */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              
              {/* Left - Text Content */}
              <div className="lg:pr-8">
                <h2 className="text-3xl md:text-4xl font-light text-[#4A4A4A] leading-tight mb-6">
                  What to Expect
                </h2>
                
                <p className="text-xl text-[#D4AF37] font-medium mb-8">
                  Transform your relationship with food and energy
                </p>

                <div className="space-y-6 text-[#4A4A4A]">
                  <div className="flex items-start space-x-3">
                    <div className="w-2 h-2 bg-[#D4AF37] rounded-full mt-3 flex-shrink-0"></div>
                    <p className="text-lg">Detoxifying meal plans designed by nutrition experts</p>
                  </div>
                  <div className="flex items-start space-x-3">
                    <div className="w-2 h-2 bg-[#D4AF37] rounded-full mt-3 flex-shrink-0"></div>
                    <p className="text-lg">Anti-inflammatory recipes that taste amazing</p>
                  </div>
                  <div className="flex items-start space-x-3">
                    <div className="w-2 h-2 bg-[#D4AF37] rounded-full mt-3 flex-shrink-0"></div>
                    <p className="text-lg">Daily coaching calls and community support</p>
                  </div>
                  <div className="flex items-start space-x-3">
                    <div className="w-2 h-2 bg-[#D4AF37] rounded-full mt-3 flex-shrink-0"></div>
                    <p className="text-lg">Measurable improvements in energy and mental clarity</p>
                  </div>
                </div>
              </div>

              {/* Right - Image */}
              <div className="relative">
                <div className="aspect-[4/3] relative rounded-2xl overflow-hidden shadow-xl">
                  <Image
                    src="/events/gut_1.jpg"
                    alt="Healthy colorful foods and ingredients for gut reset"
                    fill
                    sizes="(max-width: 768px) 100vw, 50vw"
                    style={{ objectFit: "cover" }}
                    className="transition-transform duration-300 hover:scale-105"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Band 2: Image-Text - 14 Day Protocol */}
      <section className="py-16 bg-slate-50">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              
              {/* Left - Image */}
              <div className="relative lg:order-1">
                <div className="aspect-[4/3] relative rounded-2xl overflow-hidden shadow-xl">
                  <Image
                    src="/events/gut_2.jpg"
                    alt="Fresh vegetables and healthy lifestyle for 14-day gut reset"
                    fill
                    sizes="(max-width: 768px) 100vw, 50vw"
                    style={{ objectFit: "cover" }}
                    className="transition-transform duration-300 hover:scale-105"
                  />
                </div>
              </div>

              {/* Right - Text Content */}
              <div className="lg:pl-8 lg:order-2">
                <h2 className="text-3xl md:text-4xl font-light text-[#4A4A4A] leading-tight mb-6">
                  The Science-Based Protocol
                </h2>
                
                <p className="text-xl text-[#D4AF37] font-medium mb-8">
                  Functional nutrition meets proven results
                </p>

                <div className="space-y-6 text-[#4A4A4A] mb-8">
                  <p className="text-lg leading-relaxed">
                    This isn't a juice cleanse or another fad diet. Our 14-day protocol is built on functional medicine principles and backed by the latest research in gut health.
                  </p>
                  <p className="text-lg leading-relaxed">
                    You'll reset your microbiome, reduce inflammation, and restore the gut-brain connection that governs your energy, mood, and mental clarity.
                  </p>
                </div>

                <div className="bg-[#D4AF37]/10 rounded-xl p-6">
                  <p className="text-lg font-medium text-[#4A4A4A] mb-2">14 Days to Transform</p>
                  <p className="text-[#4A4A4A]/70">Your body's natural healing capacity + our proven protocol = lasting change</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Band 3: Text-Image - Ready to Begin */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              
              {/* Left - Text Content */}
              <div className="lg:pr-8">
                <h2 className="text-3xl md:text-4xl font-light text-[#4A4A4A] leading-tight mb-6">
                  Ready to reclaim your energy?
                </h2>
                
                <p className="text-xl text-[#D4AF37] font-medium mb-8">
                  Your transformation starts with a single step
                </p>

                <div className="space-y-6 text-[#4A4A4A] mb-8">
                  <p className="text-lg leading-relaxed">
                    Join thousands who've broken free from brain fog, digestive issues, and energy crashes. Experience what it feels like when your body works with you, not against you.
                  </p>
                </div>

                <div className="space-y-4 text-[#4A4A4A]">
                  <div className="flex items-center space-x-3">
                    <svg className="w-5 h-5 text-[#D4AF37]" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                    <span>Boost energy and mental clarity</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <svg className="w-5 h-5 text-[#D4AF37]" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                    <span>Reduce inflammation and bloating</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <svg className="w-5 h-5 text-[#D4AF37]" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                    <span>Establish sustainable healthy habits</span>
                  </div>
                </div>
              </div>

              {/* Right - Image */}
              <div className="relative">
                <div className="aspect-[4/3] relative rounded-2xl overflow-hidden shadow-xl">
                  <Image
                    src="/events/gut_3.jpg"
                    alt="Person feeling energized and healthy after gut reset"
                    fill
                    sizes="(max-width: 768px) 100vw, 50vw"
                    style={{ objectFit: "cover" }}
                    className="transition-transform duration-300 hover:scale-105"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Final CTA Section with Form */}
      <section className="py-16 bg-gradient-to-b from-slate-900 via-slate-800 to-slate-900 relative">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl mx-auto text-center">
            
            {submitted ? (
              <div className="bg-white rounded-2xl p-12 shadow-2xl">
                <div className="w-16 h-16 bg-[#D4AF37]/10 rounded-full flex items-center justify-center mx-auto mb-6">
                  <svg className="w-8 h-8 text-[#D4AF37]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <h3 className="text-3xl font-light text-[#4A4A4A] mb-4">Welcome to your transformation!</h3>
                <p className="text-lg text-[#4A4A4A]/80 leading-relaxed">
                  Thank you for joining the 14-Day Gut Reset. Check your email for your welcome package and next steps to begin your journey.
                </p>
              </div>
            ) : (
              <div className="bg-white rounded-2xl p-12 shadow-2xl">
                <div className="text-center mb-8">
                  <h3 className="text-3xl md:text-4xl font-light text-[#4A4A4A] mb-4">
                    Join the Free 14-Day Gut Reset
                  </h3>
                  <p className="text-lg text-[#4A4A4A]/70">
                    Start your transformation today
                  </p>
                </div>

                <form onSubmit={onSubmit} className="space-y-6">
                  <div>
                    <label className="block text-sm font-medium text-[#4A4A4A] mb-2 text-left">
                      Email Address <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="your.email@example.com"
                      required
                      className="w-full px-4 py-3 border-2 border-[#4A4A4A]/20 rounded-lg focus:ring-2 focus:ring-[#D4AF37] focus:border-[#D4AF37] transition-all duration-200 text-[#4A4A4A] placeholder-[#4A4A4A]/50"
                    />
                  </div>

                  <div className="flex items-start gap-3">
                    <input
                      type="checkbox"
                      id="newsletter"
                      checked={newsletterOptIn}
                      onChange={(e) => setNewsletterOptIn(e.target.checked)}
                      className="mt-1"
                    />
                    <label htmlFor="newsletter" className="text-sm text-[#4A4A4A]/80 text-left">
                      Subscribe me to <strong>The ROOTED Weekly</strong> for ongoing wellness insights
                    </label>
                  </div>

                  {error && (
                    <div className="p-4 bg-red-50 border-2 border-red-200 rounded-lg">
                      <p className="text-sm text-red-600">{error}</p>
                    </div>
                  )}

                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full bg-[#4A4A4A] hover:bg-[#333] text-white font-semibold py-4 px-6 rounded-lg transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed focus:ring-2 focus:ring-[#D4AF37] focus:ring-offset-2 text-lg"
                  >
                    {loading ? (
                      <div className="flex items-center justify-center">
                        <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        JOINING...
                      </div>
                    ) : (
                      "JOIN THE GUT RESET"
                    )}
                  </button>
                </form>
              </div>
            )}
          </div>
        </div>
      </section>
    </div>
  );
}
