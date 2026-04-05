'use client'

import { motion } from 'framer-motion'

/**
 * Scroll-triggered entrance animation wrapper for page sections.
 *
 * Renders a <motion.section> that fades in and slides up when it enters
 * the viewport. Uses the same viewport config as CharReveal (K004).
 *
 * @param {ReactNode} children
 * @param {string} className — CSS class for the section element
 * @param {number} delay — entrance delay in seconds (default 0)
 * @param {object} props — passed through to motion.section (id, aria-*, etc.)
 */
export default function SectionReveal({ children, className, delay = 0, ...props }) {
  return (
    <motion.section
      className={className}
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-80px' }}
      transition={{ duration: 0.6, ease: 'easeOut', delay }}
      {...props}
    >
      {children}
    </motion.section>
  )
}
