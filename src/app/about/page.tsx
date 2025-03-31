'use client'

import { motion } from 'framer-motion'
import Navigation from '@/components/Navigation'
import SmoothScroll from '@/components/SmoothScroll'

export default function About() {
  return (
    <SmoothScroll>
      <Navigation />
      <section className="min-h-screen w-full bg-black text-white pt-32 px-6">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="max-w-4xl mx-auto"
        >
          <h1 className="text-5xl font-bold mb-8">About REC Hacks</h1>
          <p className="text-xl text-gray-300">
            REC Hacks is a national level hackathon that brings together the brightest minds
            to solve real-world problems through technology and innovation.
          </p>
        </motion.div>
      </section>
    </SmoothScroll>
  )
}