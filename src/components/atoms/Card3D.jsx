'use client'
import { motion } from 'framer-motion'

export default function Card3D({ children, index = 0, className, stagger = 0.08 }) {
  return (
    <motion.div
      className={className}
      style={{ transformStyle: 'preserve-3d' }}
      initial={{ opacity: 0, rotateY: 8, translateZ: -50 }}
      whileInView={{ opacity: 1, rotateY: 0, translateZ: 0 }}
      viewport={{ once: true, margin: '-80px' }}
      transition={{ duration: 0.6, delay: index * stagger, ease: 'easeOut' }}
    >
      {children}
    </motion.div>
  )
}
