import './globals.css'

export const metadata = {
  title: 'Школа психологии Люции Ибрагимовой',
  description: 'Авторские программы семейного психолога с 25-летним опытом. Курсы для родителей, подростков и специалистов.',
}

export default function RootLayout({ children }) {
  return (
    <html lang="ru">
      <body>{children}</body>
    </html>
  )
}
