'use client'

import { useRef, useEffect } from 'react'
import { motion } from 'framer-motion'

const GalaxyBackground = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    let animationFrameId: number
    let stars: Star[] = []
    let mouseX = 0
    let mouseY = 0

    // Set canvas dimensions
    const setCanvasDimensions = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }

    // Initialize stars
    const initStars = () => {
      stars = []
      const starCount = Math.floor(window.innerWidth * window.innerHeight / 3000)
      
      for (let i = 0; i < starCount; i++) {
        const x = Math.random() * canvas.width
        const y = Math.random() * canvas.height
        const size = Math.random() * 2
        const hue = Math.random() * 60 + 200 // Blue to purple range
        
        stars.push({
          x,
          y,
          size,
          originalSize: size,
          color: `hsl(${hue}, 100%, 70%)`,
          vx: (Math.random() - 0.5) * 0.5,
          vy: (Math.random() - 0.5) * 0.5,
          trail: [],
          maxTrail: Math.floor(Math.random() * 10) + 5
        })
      }
    }

    // Draw background
    const drawBackground = () => {
      // Create a gradient background
      const gradient = ctx.createRadialGradient(
        canvas.width / 2, 
        canvas.height / 2, 
        0, 
        canvas.width / 2, 
        canvas.height / 2, 
        canvas.width
      )
      
      gradient.addColorStop(0, '#0f0c29')
      gradient.addColorStop(0.5, '#302b63')
      gradient.addColorStop(1, '#24243e')
      
      ctx.fillStyle = gradient
      ctx.fillRect(0, 0, canvas.width, canvas.height)
      
      // Add some nebula-like clouds
      for (let i = 0; i < 5; i++) {
        const cloudX = Math.random() * canvas.width
        const cloudY = Math.random() * canvas.height
        const cloudRadius = Math.random() * 300 + 100
        
        const cloudGradient = ctx.createRadialGradient(
          cloudX, cloudY, 0, 
          cloudX, cloudY, cloudRadius
        )
        
        const hue = Math.random() * 60 + 200 // Blue to purple
        cloudGradient.addColorStop(0, `hsla(${hue}, 100%, 50%, 0.05)`)
        cloudGradient.addColorStop(1, 'transparent')
        
        ctx.fillStyle = cloudGradient
        ctx.beginPath()
        ctx.arc(cloudX, cloudY, cloudRadius, 0, Math.PI * 2)
        ctx.fill()
      }
    }

    // Draw stars and their trails
    const drawStars = () => {
      stars.forEach(star => {
        // Update position
        star.x += star.vx
        star.y += star.vy
        
        // Wrap around edges
        if (star.x < 0) star.x = canvas.width
        if (star.x > canvas.width) star.x = 0
        if (star.y < 0) star.y = canvas.height
        if (star.y > canvas.height) star.y = 0
        
        // Respond to mouse
        const dx = mouseX - star.x
        const dy = mouseY - star.y
        const distance = Math.sqrt(dx * dx + dy * dy)
        
        if (distance < 200) {
          const angle = Math.atan2(dy, dx)
          star.vx -= Math.cos(angle) * 0.02
          star.vy -= Math.sin(angle) * 0.02
          star.size = star.originalSize * (1 + (200 - distance) / 100)
        } else {
          star.size = star.originalSize
        }
        
        // Add current position to trail
        star.trail.push({ x: star.x, y: star.y })
        
        // Limit trail length
        if (star.trail.length > star.maxTrail) {
          star.trail.shift()
        }
        
        // Draw trail
        if (star.trail.length > 1) {
          ctx.beginPath()
          ctx.moveTo(star.trail[0].x, star.trail[0].y)
          
          for (let i = 1; i < star.trail.length; i++) {
            ctx.lineTo(star.trail[i].x, star.trail[i].y)
          }
          
          ctx.strokeStyle = star.color.replace(')', ', 0.3)')
          ctx.lineWidth = star.size / 2
          ctx.stroke()
        }
        
        // Draw star
        ctx.beginPath()
        ctx.arc(star.x, star.y, star.size, 0, Math.PI * 2)
        ctx.fillStyle = star.color
        ctx.fill()
      })
    }

    // Animation loop
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)
      drawBackground()
      drawStars()
      animationFrameId = requestAnimationFrame(animate)
    }

    // Handle resize
    const handleResize = () => {
      setCanvasDimensions()
      initStars()
    }

    // Handle mouse move
    const handleMouseMove = (e: MouseEvent) => {
      mouseX = e.clientX
      mouseY = e.clientY
    }

    // Initialize
    setCanvasDimensions()
    initStars()
    animate()
    
    window.addEventListener('resize', handleResize)
    window.addEventListener('mousemove', handleMouseMove)
    
    // Cleanup
    return () => {
      window.removeEventListener('resize', handleResize)
      window.removeEventListener('mousemove', handleMouseMove)
      cancelAnimationFrame(animationFrameId)
    }
  }, [])

  return (
    <motion.canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1.5 }}
    />
  )
}

// TypeScript interface for stars
interface Star {
  x: number
  y: number
  size: number
  originalSize: number
  color: string
  vx: number
  vy: number
  trail: { x: number, y: number }[]
  maxTrail: number
}

export default GalaxyBackground