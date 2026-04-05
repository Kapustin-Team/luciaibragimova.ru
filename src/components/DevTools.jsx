'use client'

import dynamic from 'next/dynamic'

const Agentation = dynamic(
  () => import('agentation').then((mod) => mod.Agentation ? { default: mod.Agentation } : mod),
  { ssr: false }
)

export default function DevTools() {
  if (process.env.NODE_ENV !== 'development') return null
  return <Agentation />
}
