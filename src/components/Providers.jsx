'use client'

import { EnrollProvider } from '@/components/organisms/EnrollModal/EnrollModal'

export default function Providers({ children }) {
  return (
    <EnrollProvider>
      {children}
    </EnrollProvider>
  )
}
