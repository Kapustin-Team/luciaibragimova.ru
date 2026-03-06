'use client'
import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'

export default function Card3D({ children, index = 0, className, stagger = 0.08 }) {
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    setIsMobile(window.innerWidth < 768)
  }, [])

  const rotateAmount = isMobile ? 4 : 8
  const translateAmount = isMobile ? -25 : -50

  return (
    <motion.div
      className={className}
      style={{ transformStyle: 'preserve-3d' }}
      initial={{ opacity: 0, rotateY: rotateAmount, translateZ: translateAmount }}
      whileInView={{ opacity: 1, rotateY: 0, translateZ: 0 }}
      viewport={{ once: true, margin: '-80px' }}
      transition={{ duration: 0.6, delay: index * stagger, ease: 'easeOut' }}
    >
      {children}
    </motion.div>
  )
}
