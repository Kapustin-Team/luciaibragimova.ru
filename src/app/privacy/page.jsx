import Header from '@/components/organisms/Header/Header'
import Footer from '@/components/organisms/Footer/Footer'

export const metadata = {
  title: 'Политика конфиденциальности — Студия Люции Ибрагимовой',
}

export default function PrivacyPage() {
  return (
    <>
      <Header />
      <main style={{ maxWidth: 800, margin: '0 auto', padding: '80px 32px' }}>
        <h1 style={{ fontSize: 36, fontWeight: 700, marginBottom: 32 }}>Политика конфиденциальности</h1>

        <h2 style={{ fontSize: 20, fontWeight: 600, marginTop: 32, marginBottom: 12 }}>1. Общие положения</h2>
        <p style={{ lineHeight: 1.8, color: 'rgba(26,26,46,0.7)', marginBottom: 16 }}>
          Настоящая Политика конфиденциальности определяет порядок обработки и защиты персональных данных пользователей сайта luciaibragimova.ru (далее — Сайт), принадлежащего ИП Ибрагимова Л.Р. (далее — Оператор).
        </p>

        <h2 style={{ fontSize: 20, fontWeight: 600, marginTop: 32, marginBottom: 12 }}>2. Сбор персональных данных</h2>
        <p style={{ lineHeight: 1.8, color: 'rgba(26,26,46,0.7)', marginBottom: 16 }}>
          Оператор собирает следующие данные: имя, адрес электронной почты, номер телефона — исключительно при добровольном заполнении форм на Сайте.
        </p>

        <h2 style={{ fontSize: 20, fontWeight: 600, marginTop: 32, marginBottom: 12 }}>3. Цели обработки</h2>
        <p style={{ lineHeight: 1.8, color: 'rgba(26,26,46,0.7)', marginBottom: 16 }}>
          Персональные данные используются для: связи с пользователем, предоставления информации о курсах и услугах, выполнения договорных обязательств.
        </p>

        <h2 style={{ fontSize: 20, fontWeight: 600, marginTop: 32, marginBottom: 12 }}>4. Защита данных</h2>
        <p style={{ lineHeight: 1.8, color: 'rgba(26,26,46,0.7)', marginBottom: 16 }}>
          Оператор принимает необходимые организационные и технические меры для защиты персональных данных от несанкционированного доступа, изменения, раскрытия или уничтожения.
        </p>

        <h2 style={{ fontSize: 20, fontWeight: 600, marginTop: 32, marginBottom: 12 }}>5. Передача данных третьим лицам</h2>
        <p style={{ lineHeight: 1.8, color: 'rgba(26,26,46,0.7)', marginBottom: 16 }}>
          Оператор не передаёт персональные данные третьим лицам, за исключением случаев, предусмотренных законодательством РФ.
        </p>

        <h2 style={{ fontSize: 20, fontWeight: 600, marginTop: 32, marginBottom: 12 }}>6. Cookies</h2>
        <p style={{ lineHeight: 1.8, color: 'rgba(26,26,46,0.7)', marginBottom: 16 }}>
          Сайт может использовать cookie-файлы для улучшения работы сервиса. Пользователь может отключить cookies в настройках браузера.
        </p>

        <h2 style={{ fontSize: 20, fontWeight: 600, marginTop: 32, marginBottom: 12 }}>7. Контакты</h2>
        <p style={{ lineHeight: 1.8, color: 'rgba(26,26,46,0.7)', marginBottom: 16 }}>
          По вопросам обработки персональных данных обращайтесь: info@luciaibragimova.ru
        </p>
      </main>
      <Footer />
    </>
  )
}
