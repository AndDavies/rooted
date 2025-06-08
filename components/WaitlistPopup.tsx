"use client";

import React, { useState } from 'react';
import Image from 'next/image';
import { X, Check } from 'lucide-react';
import { useWaitlistPopup } from './WaitlistPopupContext';
import { createClient } from '@/lib/supabase-client';

export function WaitlistPopup() {
  const { isPopupOpen, source, closePopup } = useWaitlistPopup();
  const [isClosing, setIsClosing] = useState(false);
  const [email, setEmail] = useState('');
  const [agreedToPrivacy, setAgreedToPrivacy] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [error, setError] = useState('');

  const handleClose = () => {
    setIsClosing(true);
    setTimeout(() => {
      closePopup();
      setIsClosing(false);
      // Reset form state when closing
      setEmail('');
      setAgreedToPrivacy(false);
      setIsSuccess(false);
      setError('');
    }, 300);
  };

  const handleBackdropClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      handleClose();
    }
  };

  const validateEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    // Validation
    if (!email.trim()) {
      setError('Please enter your email address');
      return;
    }

    if (!validateEmail(email)) {
      setError('Please enter a valid email address');
      return;
    }

    if (!agreedToPrivacy) {
      setError('Please agree to the Privacy Policy');
      return;
    }

    setIsSubmitting(true);

    try {
      const supabase = createClient();
      if (!supabase) {
        throw new Error('Unable to connect to database');
      }

      const { data, error: supabaseError } = await supabase
        .from('waitlist_emails')
        .insert([
          {
            email: email.toLowerCase().trim(),
            agreed_to_privacy: agreedToPrivacy,
            source: source || 'unknown'
          }
        ]);

      if (supabaseError) {
        if (supabaseError.code === '23505') { // Unique constraint violation
          setError('This email is already on our waitlist!');
        } else {
          setError('Something went wrong. Please try again.');
        }
        return;
      }

      setIsSuccess(true);
    } catch (err) {
      console.error('Error submitting email:', err);
      setError('Something went wrong. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!isPopupOpen) return null;

  return (
    <div 
      className={`fixed inset-0 bg-black/50 flex items-center justify-center z-[9999] p-4 transition-opacity duration-300 ${
        isClosing ? 'opacity-0' : 'opacity-100'
      }`}
      onClick={handleBackdropClick}
    >
      <div 
        className={`bg-white rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto shadow-2xl transform transition-all duration-300 ${
          isClosing ? 'scale-95 opacity-0' : 'scale-100 opacity-100'
        }`}
      >
        {/* Close button */}
        <button
          onClick={handleClose}
          className="absolute top-4 right-4 z-10 bg-white/80 hover:bg-white rounded-full p-2 transition-colors duration-200 shadow-lg"
          aria-label="Close popup"
        >
          <X className="w-6 h-6 text-gray-600" />
        </button>

        <div className="flex flex-col lg:flex-row">
          {/* Left side - Image */}
          <div className="lg:w-1/2 relative h-64 lg:h-auto">
            <Image
              src="/pop_up_wait_list.jpg"
              alt="Join the waitlist for ROOTED"
              fill
              className="object-cover rounded-t-2xl lg:rounded-l-2xl lg:rounded-tr-none"
              priority
            />
          </div>

          {/* Right side - Content and Form */}
          <div className="lg:w-1/2 p-6 lg:p-8 flex flex-col justify-center">
            <div className="mb-6">
              <h2 className="text-3xl lg:text-4xl text-[#4A4A4A] mb-4 leading-tight">
                Sign up for exclusive offers and transformational insights.
              </h2>
              <p className="text-[#4A4A4A]/80 text-base lg:text-lg leading-relaxed">
              be a part of the movement – find out about upcoming health and wellness challenges and help us shape the future of healthy modern leadership. 
              </p>
            </div>

            {/* Success State */}
            {isSuccess ? (
              <div className="text-center py-8">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-green-100 rounded-full mb-4">
                  <Check className="w-8 h-8 text-green-600" />
                </div>
                <h3 className="text-2xl font-semibold text-[#4A4A4A] mb-2">
                  Welcome to the waitlist!
                </h3>
                <p className="text-[#4A4A4A]/80">
                  We'll be in touch with exclusive updates and early access opportunities.
                </p>
              </div>
            ) : (
              /* Email Form */
              <form onSubmit={handleSubmit} className="space-y-4">
                {/* Email Input with Button */}
                <div className="relative">
                  <div className="flex border-2 border-[#4A4A4A] rounded-lg overflow-hidden">
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="Email Addresss"
                      className="flex-1 px-4 py-3 text-[#4A4A4A] placeholder-[#4A4A4A]/50 bg-white focus:outline-none"
                      disabled={isSubmitting}
                    />
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="px-6 py-3 bg-[#4A4A4A] text-white font-semibold hover:bg-[#333] disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-200"
                    >
                      {isSubmitting ? 'CONFIRMING...' : 'CONFIRM'}
                    </button>
                  </div>
                </div>

                {/* Privacy Policy Checkbox */}
                <div className="flex items-start space-x-3">
                  <input
                    type="checkbox"
                    id="privacy-policy"
                    checked={agreedToPrivacy}
                    onChange={(e) => setAgreedToPrivacy(e.target.checked)}
                    className="mt-1 w-4 h-4 text-[#4A4A4A] border-[#4A4A4A] rounded focus:ring-[#4A4A4A]"
                    disabled={isSubmitting}
                  />
                  <label htmlFor="privacy-policy" className="text-sm text-[#4A4A4A] leading-tight">
                    I agree with the{' '}
                    <a 
                      href="/privacy" 
                      target="_blank" 
                      className="underline hover:text-[#CC4824] transition-colors"
                    >
                      Privacy Policy
                    </a>
                    .
                  </label>
                </div>

                {/* Error Message */}
                {error && (
                  <div className="text-red-600 text-sm bg-red-50 p-3 rounded-lg">
                    {error}
                  </div>
                )}
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  );
} 