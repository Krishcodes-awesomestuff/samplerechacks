'use client'

import SmoothScroll from '@/components/SmoothScroll'
import Navigation from '@/components/Navigation'
import Link from 'next/link'

export default function Home() {
  return (
    <SmoothScroll>
      <Navigation />
      
      <section className="min-h-screen w-full relative bg-black">
        {/* Grid overlay */}
        <div className="absolute inset-0 grid grid-cols-12 pointer-events-none">
          {[...Array(12)].map((_, i) => (
            <div key={i} className="h-full border-l border-white/5" />
          ))}
        </div>

        {/* Main content */}
        <div className="container mx-auto px-8 pl-16 pt-48">
          <div className="space-y-6">
            <span className="text-red-500 text-sm tracking-widest">2025</span>
            
            <div className="space-y-2">
              <h1 className="text-white text-[120px] md:text-[180px] font-bold leading-none tracking-tighter">
                REC<br />HACKS
              </h1>
              <p className="text-white/70 text-xl tracking-wide">
                NATIONAL LEVEL TECHNICAL HACKATHON @REC - Chennai.
              </p>
            </div>

            <div className="flex items-center gap-8 pt-4">
              <Link
                href="/register"
                className="px-8 py-3 bg-red-500 text-white text-sm tracking-wider hover:bg-red-600 transition-colors"
              >
                REGISTER NOW
              </Link>
            </div>
          </div>
        </div>
      </section>
    </SmoothScroll>
  )
}
