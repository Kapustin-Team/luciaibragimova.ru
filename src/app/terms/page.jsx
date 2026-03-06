import Header from '@/components/organisms/Header/Header'
import Footer from '@/components/organisms/Footer/Footer'

export const metadata = {
  title: 'Договор оферты — Школа Люции Ибрагимовой',
}

export default function TermsPage() {
  return (
    <>
      <Header />
      <main style={{ maxWidth: 800, margin: '0 auto', padding: '80px 32px' }}>
        <h1 style={{ fontSize: 36, fontWeight: 700, marginBottom: 32 }}>Договор публичной оферты</h1>

        <h2 style={{ fontSize: 20, fontWeight: 600, marginTop: 32, marginBottom: 12 }}>1. Общие положения</h2>
        <p style={{ lineHeight: 1.8, color: 'rgba(26,26,46,0.7)', marginBottom: 16 }}>
          Настоящий документ является официальным предложением (публичной офертой) ИП Ибрагимова Л.Р. (далее — Исполнитель) заключить договор на оказание образовательных услуг на условиях, изложенных ниже.
        </p>

        <h2 style={{ fontSize: 20, fontWeight: 600, marginTop: 32, marginBottom: 12 }}>2. Предмет договора</h2>
        <p style={{ lineHeight: 1.8, color: 'rgba(26,26,46,0.7)', marginBottom: 16 }}>
          Исполнитель обязуется предоставить Заказчику доступ к образовательному курсу (программе) в соответствии с выбранным тарифом, а Заказчик обязуется оплатить услуги.
        </p>

        <h2 style={{ fontSize: 20, fontWeight: 600, marginTop: 32, marginBottom: 12 }}>3. Порядок оплаты</h2>
        <p style={{ lineHeight: 1.8, color: 'rgba(26,26,46,0.7)', marginBottom: 16 }}>
          Оплата производится на условиях 100% предоплаты. Возможна оплата в рассрочку по отдельной договорённости.
        </p>

        <h2 style={{ fontSize: 20, fontWeight: 600, marginTop: 32, marginBottom: 12 }}>4. Условия возврата</h2>
        <p style={{ lineHeight: 1.8, color: 'rgba(26,26,46,0.7)', marginBottom: 16 }}>
          Возврат денежных средств возможен в течение 14 дней с момента оплаты при условии, что Заказчик не освоил более 30% материалов курса.
        </p>

        <h2 style={{ fontSize: 20, fontWeight: 600, marginTop: 32, marginBottom: 12 }}>5. Права и обязанности сторон</h2>
        <p style={{ lineHeight: 1.8, color: 'rgba(26,26,46,0.7)', marginBottom: 16 }}>
          Исполнитель обязуется предоставить качественный образовательный контент в соответствии с описанием программы. Заказчик обязуется не распространять полученные материалы.
        </p>

        <h2 style={{ fontSize: 20, fontWeight: 600, marginTop: 32, marginBottom: 12 }}>6. Ответственность</h2>
        <p style={{ lineHeight: 1.8, color: 'rgba(26,26,46,0.7)', marginBottom: 16 }}>
          Результаты прохождения программы зависят от индивидуальных особенностей и степени вовлечённости Заказчика. Исполнитель не гарантирует конкретных результатов.
        </p>

        <h2 style={{ fontSize: 20, fontWeight: 600, marginTop: 32, marginBottom: 12 }}>7. Реквизиты</h2>
        <p style={{ lineHeight: 1.8, color: 'rgba(26,26,46,0.7)', marginBottom: 16 }}>
          ИП Ибрагимова Л.Р.<br />
          Email: info@luciaibragimova.ru
        </p>
      </main>
      <Footer />
    </>
  )
}
