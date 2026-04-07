'use client'

import { motion } from 'framer-motion'

/**
 * Scroll-triggered entrance animation wrapper for page sections.
 *
 * Two variants:
 *  – default (no prop): opacity 0→1 + translateY 40→0  (fade-slide)
 *  – variant="mask": clipPath inset reveal from bottom + opacity fade
 *
 * Uses the same viewport config as CharReveal (K004).
 * Does NOT forward refs (K007).
 *
 * @param {ReactNode} children
 * @param {string} className — CSS class for the section element
 * @param {number} delay — entrance delay in seconds (default 0)
 * @param {'mask'} [variant] — animation variant
 * @param {object} props — passed through to motion.section (id, aria-*, etc.)
 */
export default function SectionReveal({ children, className, delay = 0, variant, ...props }) {
  const isMask = variant === 'mask'

  const initial = isMask
    ? { opacity: 0, clipPath: 'inset(100% 0 0 0)' }
    : { opacity: 0, y: 40 }

  const animate = isMask
    ? { opacity: 1, clipPath: 'inset(0 0 0 0)' }
    : { opacity: 1, y: 0 }

  const transition = isMask
    ? { duration: 0.7, ease: [0.25, 0.46, 0.45, 0.94], delay }
    : { duration: 0.6, ease: 'easeOut', delay }

  return (
    <motion.section
      className={className}
      initial={initial}
      whileInView={animate}
      viewport={{ once: true, amount: 0.05 }}
      transition={transition}
      {...props}
    >
      {children}
    </motion.section>
  )
}
