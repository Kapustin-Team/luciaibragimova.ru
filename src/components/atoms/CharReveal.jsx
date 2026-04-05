'use client'

import { motion } from 'framer-motion'
import { Children, isValidElement } from 'react'

const containerVariants = {
  hidden: {},
  visible: (delay = 0) => ({
    transition: {
      staggerChildren: 0.025,
      delayChildren: delay,
    },
  }),
}

const charVariants = {
  hidden: { y: '110%' },
  visible: {
    y: 0,
    transition: { duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] },
  },
}

/**
 * Per-character heading reveal animation.
 *
 * Splits text content into individually animated characters that slide up
 * from below. Handles mixed children: plain text, <br />, and <span> with
 * className (recursive splitting for styled fragments).
 *
 * @param {string} as — HTML tag to render (e.g. 'h1', 'h2')
 * @param {string} className — CSS class for the heading element
 * @param {number} delay — stagger delay in seconds
 * @param {ReactNode} children — text content, may include <br /> and <span>
 */
export default function CharReveal({ as: Tag = 'h2', className, delay = 0, children }) {
  const MotionTag = motion.create(Tag)

  const renderChildren = (nodes) =>
    Children.map(nodes, (child) => {
      // Plain text → split into characters
      if (typeof child === 'string') {
        return [...child].map((char, i) => (
          <span key={i} style={{ display: 'inline-block', overflow: 'hidden', verticalAlign: 'top', paddingBottom: '0.15em' }}>
            <motion.span style={{ display: 'inline-block' }} variants={charVariants}>
              {char === ' ' ? '\u00A0' : char}
            </motion.span>
          </span>
        ))
      }

      // React element
      if (isValidElement(child)) {
        // <br /> — pass through
        if (child.type === 'br') return child

        // <span className={...}> — recurse into its children
        if (child.type === 'span') {
          return (
            <span className={child.props.className} style={child.props.style}>
              {renderChildren(child.props.children)}
            </span>
          )
        }
      }

      return child
    })

  return (
    <MotionTag
      className={className}
      variants={containerVariants}
      custom={delay}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '-80px' }}
    >
      {renderChildren(children)}
    </MotionTag>
  )
}
