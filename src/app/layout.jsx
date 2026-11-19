import './globals.css'
import { getSiteSettings, getLegalDocuments } from '@/lib/strapi'
import { SiteSettingsProvider } from '@/components/SiteSettings/SiteSettings'
import CookieBanner from '@/components/organisms/CookieBanner/CookieBanner'

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

export default async function RootLayout({ children }) {
  const [siteSettings, legalDocuments] = await Promise.all([
    getSiteSettings(),
    getLegalDocuments(),
  ])

  return (
    <html lang="ru">
      <body>
        <SiteSettingsProvider initialSettings={siteSettings} initialLegalDocuments={legalDocuments}>
          {children}
          <CookieBanner />
        </SiteSettingsProvider>
      </body>
    </html>
  )
}
