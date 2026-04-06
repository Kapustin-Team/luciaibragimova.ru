'use client'

import dynamic from 'next/dynamic'

const Agentation = dynamic(
  () => import('agentation').then((mod) => mod.Agentation ? { default: mod.Agentation } : mod),
  { ssr: false }
)

export function DevTools() {
  const isEnabled = process.env.NEXT_PUBLIC_AGENTATION_ENABLED !== 'false'
  const endpoint = process.env.NEXT_PUBLIC_AGENTATION_ENDPOINT

  if (!isEnabled) return null

  return endpoint ? <Agentation endpoint={endpoint} /> : <Agentation />
}
