'use client'
import { motion } from 'framer-motion'

const shapes = {
  blob1: (color, size, style) => (
    <motion.div
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 1.5, ease: 'easeOut' }}
      style={{
        position: 'absolute',
        width: size,
        height: size,
        borderRadius: '60% 40% 30% 70% / 60% 30% 70% 40%',
        background: color,
        filter: 'blur(1px)',
        ...style,
      }}
    />
  ),
  semicircle: (color, size, style) => (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1.2, delay: 0.3 }}
      style={{
        position: 'absolute',
        width: size,
        height: `calc(${size} / 2)`,
        borderRadius: `${size} ${size} 0 0`,
        background: color,
        ...style,
      }}
    />
  ),
  triangle: (color, size, style) => (
    <motion.div
      initial={{ opacity: 0, rotate: -10 }}
      animate={{ opacity: 1, rotate: 0 }}
      transition={{ duration: 1, delay: 0.5 }}
      style={{
        position: 'absolute',
        width: 0,
        height: 0,
        borderLeft: `calc(${size} / 2) solid transparent`,
        borderRight: `calc(${size} / 2) solid transparent`,
        borderBottom: `${size} solid ${color}`,
        ...style,
      }}
    />
  ),
  circle: (color, size, style) => (
    <motion.div
      initial={{ opacity: 0, scale: 0.5 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 1.2, delay: 0.2 }}
      style={{
        position: 'absolute',
        width: size,
        height: size,
        borderRadius: '50%',
        background: color,
        ...style,
      }}
    />
  ),
}

export default function DecorativeShapes({ items = [] }) {
  return (
    <>
      {items.map((item, i) => {
        const renderer = shapes[item.shape]
        if (!renderer) return null
        return <span key={i}>{renderer(item.color, item.size, item.style)}</span>
      })}
    </>
  )
}
