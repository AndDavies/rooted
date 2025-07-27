

'use client'

import Link from 'next/link'
import Image from 'next/image'
import { motion, useScroll, useTransform, useSpring } from 'framer-motion'
import { useRef } from 'react'

export function RetreatShowcase() {
  const ref = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start start', 'end start'],
  })

  const y = useTransform(scrollYProgress, [0, 1], ['0%', '20%'])
  const ySpring = useSpring(y, { stiffness: 60, damping: 20 })

  return (
    <section ref={ref} className="relative w-full h-[90vh] overflow-hidden">
      <motion.div
        style={{ y: ySpring }}
        className="absolute inset-0 z-0"
      >
        <Image
          src="/estrella/19.jpg"
          alt="Serra da Estrela retreat view"
          fill
          className="object-cover object-center brightness-[0.75]"
          priority
        />
      </motion.div>

      <div className="absolute inset-0 px-8 sm:px-16 md:px-24 lg:px-32 flex items-start justify-start pt-20 z-10">
        <motion.div
          className="max-w-xl text-white"
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, ease: 'easeOut' }}
        >
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-heading leading-tight drop-shadow-md">
            We're thrilled to announce The ROOTED Fall Retreat.
          </h2>
          <p className="mt-4 text-lg sm:text-xl leading-relaxed drop-shadow-sm">
            Join us in the mountains of Serra da Estrela for an immersive week of guided breathwork, ice baths, hiking, daily rituals, movement sessions, and expert coaching. 
          </p>
          <p className="mt-4 text-lg sm:text-xl leading-relaxed drop-shadow-sm">
          Plus a personal <a href="https://choosemuse.com/" target="_blank" rel="noopener noreferrer" className="underline hover:text-gray-200 transition">Muse</a> headset and platform access that integrates data from Muse, Garmin, and Whoop for 30 days of personalized guidance after the retreat.
          </p>
          <p className="mt-2 text-lg sm:text-xl font-medium drop-shadow-sm">
            Reconnect to your body. Restore your energy. Return home with a new rhythm.
          </p>
          <Link
            href="/experiences/reset"
            className="inline-block mt-6 bg-white text-black text-lg font-semibold px-8 py-3 rounded-full shadow-lg hover:shadow-xl hover:bg-gray-100 transition-all duration-300"
          >
            Explore the Retreat →
          </Link>
        </motion.div>
      </div>
    </section>
  )
}