import './globals.css'
import { Bona_Nova, Onest } from 'next/font/google'
import DevTools from '@/components/DevTools'

const onest = Onest({
  subsets: ['latin', 'cyrillic'],
  weight: ['300', '400', '500', '600', '700'],
  variable: '--font-sans',
  display: 'swap',
})

const bonaNova = Bona_Nova({
  subsets: ['latin', 'cyrillic'],
  weight: '400',
  style: 'italic',
  variable: '--font-heading',
  display: 'swap',
})

export const metadata = {
  title: 'Студия Люции Ибрагимовой',
  description: 'Авторские программы семейного психолога с 25-летним опытом. Курсы для родителей и подростков.',
  manifest: '/manifest.json',
  icons: {
    icon: [
      { url: '/favicon.ico', sizes: 'any' },
      { url: '/favicon-16x16.png', sizes: '16x16', type: 'image/png' },
      { url: '/favicon-32x32.png', sizes: '32x32', type: 'image/png' },
      { url: '/favicon.svg', type: 'image/svg+xml' },
    ],
    apple: '/apple-touch-icon.png',
  },
}

export default function RootLayout({ children }) {
  return (
    <html lang="ru" className={`${onest.variable} ${bonaNova.variable}`}>
      <body>
        {children}
        <DevTools />
      </body>
    </html>
  )
}
