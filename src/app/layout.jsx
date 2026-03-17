import './globals.css'
import Providers from '@/components/Providers'
import ChatWidget from '@/components/organisms/ChatWidget/ChatWidget'

export const metadata = {
  title: 'Школа Люции Ибрагимовой',
  description: 'Авторские программы семейного психолога с 25-летним опытом. Курсы для родителей и подростков.',
}

export default function RootLayout({ children }) {
  return (
    <html lang="ru">
      <body>
        <Providers>
          {children}
          <ChatWidget />
        </Providers>
      </body>
    </html>
  )
}
