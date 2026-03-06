'use client'
import s from './Faq.module.sass'

const FALLBACK_FAQS = [
  { q: 'Как проходят онлайн-курсы?', a: 'Вы получаете доступ к видеолекциям в удобное время. К каждой лекции — практическое задание. В Премиум тарифах — групповые встречи и сопровождение.' },
  { q: 'Можно ли оплатить в рассрочку?', a: 'Да, рассрочка доступна на все курсы. Подробности при записи.' },
  { q: 'Подойдёт ли мне курс «Вовремя»?', a: 'Курс для родителей подростков 10-17 лет, которые замечают отдаление, грубость, потерю контакта. Если хотя бы один пункт про вас — курс подойдёт.' },
  { q: 'Есть ли сертификат?', a: 'Да, по окончании вы получаете сертификат о прохождении программы.' },
  { q: 'Как записаться на офлайн-тренинг?', a: 'Оставьте заявку на сайте или свяжитесь напрямую. Мы сообщим даты ближайших потоков.' },
  { q: 'Можно ли вернуть деньги?', a: 'Да, в течение 14 дней с момента оплаты, если вы не прошли более 30% курса.' },
  { q: 'Нужно ли психологическое образование?', a: 'Нет, курсы рассчитаны на широкую аудиторию. Специальных знаний не требуется.' },
]

function normalizeFaqs(strapiFaqs) {
  if (!strapiFaqs?.length) return FALLBACK_FAQS
  return strapiFaqs.map(f => ({ q: f.question, a: f.answer }))
}

export default function Faq({ data, faqs: strapiFaqs } = {}) {
  const title = data?.title || 'Частые вопросы'
  const faqList = normalizeFaqs(strapiFaqs)

  return (
    <section className={s.section} id="faq">
      <div className={s.inner}>
        <h2 className={s.title}>{title}</h2>
        <div className={s.list}>
          {faqList.map((f, i) => (
            <div key={i} className={s.item}>
              <h3 className={s.question}>{f.q}</h3>
              <p className={s.answer}>{f.a}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
