'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import { useState, useEffect } from 'react'

export default function Navigation() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isMobile, setIsMobile] = useState(false)
  const [activeLink, setActiveLink] = useState('/')

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768)
    }
    
    // Initial check
    checkMobile()
    
    // Add event listener for window resize
    window.addEventListener('resize', checkMobile)
    
    // Set active link based on current path
    setActiveLink(window.location.pathname)
    
    // Cleanup
    return () => window.removeEventListener('resize', checkMobile)
  }, [])

  return (
    <motion.nav 
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.8 }}
      className="fixed top-0 left-0 w-full z-50 p-4 mt-4"
    >
      <div className="max-w-7xl mx-auto backdrop-blur-lg bg-black/30 rounded-none md:rounded-md border border-white/10 px-4 py-3 md:px-6 md:py-4">
        <div className="flex justify-between items-center">
          <Link 
            href="/" 
            className="relative group"
          >
            <div className="flex items-center">
              <div className="w-3 h-12 bg-red-500 mr-3"></div>
              <span className="text-white text-xl md:text-2xl font-bold tracking-tighter uppercase">REC HACKS</span>
            </div>
            <motion.div 
              className="absolute bottom-0 left-0 h-0.5 bg-white" 
              initial={{ width: 0 }}
              whileHover={{ width: '100%' }}
              transition={{ duration: 0.3 }}
            />
          </Link>
          
          {isMobile ? (
            <>
              <button 
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="text-white focus:outline-none relative"
              >
                <div className="w-8 h-8 flex flex-col justify-center items-end">
                  <motion.div 
                    className="w-8 h-0.5 bg-white mb-2"
                    animate={{ width: isMenuOpen ? '100%' : '60%' }}
                  />
                  <motion.div 
                    className="w-8 h-0.5 bg-white"
                    animate={{ width: isMenuOpen ? '100%' : '80%' }}
                  />
                </div>
              </button>
              
              {isMenuOpen && (
                <motion.div 
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  className="absolute top-16 left-0 right-0 backdrop-blur-lg bg-black/80 border-t border-white/10"
                >
                  <div className="flex flex-col">
                    {['About', 'Schedule', 'Tracks', 'Register'].map((item, index) => (
                      <Link
                        key={item}
                        href={`/${item.toLowerCase()}`}
                        className={`py-4 px-6 text-left text-lg uppercase font-light tracking-wider ${
                          activeLink === `/${item.toLowerCase()}` ? 'text-white bg-white/10' : 'text-white/70'
                        } border-b border-white/5 flex items-center`}
                        onClick={() => setIsMenuOpen(false)}
                      >
                        <span className="text-xs mr-3 text-red-500">{(index + 1).toString().padStart(2, '0')}</span>
                        {item}
                      </Link>
                    ))}
                  </div>
                </motion.div>
              )}
            </>
          ) : (
            <div className="flex items-center">
              {['About', 'Schedule', 'Tracks', 'Register'].map((item, index) => (
                <Link
                  key={item}
                  href={`/${item.toLowerCase()}`}
                  className="relative group mx-5 py-2"
                >
                  <div className="flex items-center">
                    <span className="text-xs mr-2 text-red-500 opacity-70 group-hover:opacity-100 transition-opacity">
                      {(index + 1).toString().padStart(2, '0')}
                    </span>
                    <span className={`uppercase tracking-wide text-sm font-medium ${
                      activeLink === `/${item.toLowerCase()}` ? 'text-white' : 'text-white/70'
                    } group-hover:text-white transition-colors`}>
                      {item}
                    </span>
                  </div>
                  <motion.div 
                    className="absolute bottom-0 left-0 h-0.5 bg-red-500" 
                    initial={{ width: activeLink === `/${item.toLowerCase()}` ? '100%' : 0 }}
                    whileHover={{ width: '100%' }}
                    transition={{ duration: 0.3 }}
                  />
                </Link>
              ))}
              <Link
                href="/register"
                className="ml-6 px-5 py-2 bg-red-500 text-white text-sm uppercase tracking-wider font-medium hover:bg-red-600 transition-colors"
              >
                Join
              </Link>
            </div>
          )}
        </div>
      </div>
    </motion.nav>
  )
}