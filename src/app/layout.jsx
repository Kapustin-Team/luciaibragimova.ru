import './globals.css'

export const metadata = {
  title: 'Люция Ибрагимова — Школа психологии',
  description: 'Семейный психолог с 25-летним опытом. Курсы по семейной психологии, работе с подростками и личностному росту.',
}

export default function RootLayout({ children }) {
  return (
    <html lang="ru">
      <body>{children}</body>
    </html>
  )
}
