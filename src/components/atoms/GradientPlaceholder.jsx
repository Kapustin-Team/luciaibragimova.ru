'use client'

import s from './GradientPlaceholder.module.sass'

const VARIANTS = {
  warm: 'radial-gradient(ellipse at 30% 50%, var(--accent-orange) 0%, transparent 70%), radial-gradient(ellipse at 70% 80%, var(--accent-purple) 0%, transparent 70%), linear-gradient(135deg, var(--bg-peach) 0%, var(--accent-orange) 100%)',
  cool: 'radial-gradient(ellipse at 20% 30%, var(--accent-blue) 0%, transparent 70%), radial-gradient(ellipse at 80% 70%, var(--accent-orange) 0%, transparent 60%), linear-gradient(135deg, var(--accent-blue) 0%, var(--bg-peach) 100%)',
  mixed: 'radial-gradient(ellipse at 25% 25%, var(--accent-orange) 0%, transparent 50%), radial-gradient(ellipse at 75% 75%, var(--accent-blue) 0%, transparent 50%), radial-gradient(ellipse at 50% 50%, var(--accent-purple) 0%, transparent 60%), var(--bg-peach)',
  subtle: 'radial-gradient(ellipse at 50% 50%, var(--bg-peach) 0%, var(--bg-section-alt) 100%)',
}

export default function GradientPlaceholder({ variant = 'warm', aspectRatio = '16/9', className, children }) {
  return (
    <div
      className={`${s.placeholder} ${className || ''}`}
      style={{ background: VARIANTS[variant] || VARIANTS.warm, aspectRatio }}
    >
      {children}
      <svg className={s.noise} width="100%" height="100%">
        <filter id="noise">
          <feTurbulence type="fractalNoise" baseFrequency="0.65" numOctaves="3" stitchTiles="stitch" />
          <feColorMatrix type="saturate" values="0" />
        </filter>
        <rect width="100%" height="100%" filter="url(#noise)" opacity="0.04" />
      </svg>
    </div>
  )
}
