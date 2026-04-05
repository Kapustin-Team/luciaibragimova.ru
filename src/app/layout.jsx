import './globals.css'
import DevTools from '@/components/DevTools'

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
    <html lang="ru">
      <body>
        {children}
        <DevTools />
      </body>
    </html>
  )
}
