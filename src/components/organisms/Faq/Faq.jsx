'use client'
import { useState } from 'react'
import CharReveal from '@/components/atoms/CharReveal'
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
  const title = data?.title || 'часто задаваемые вопросы'
  const faqList = normalizeFaqs(strapiFaqs)
  const [openIndex, setOpenIndex] = useState(null)

  const toggle = (i) => setOpenIndex(openIndex === i ? null : i)

  if (!faqList.length) return null

  return (
    <section className={s.section} id="faq">
      <div className={s.inner}>
        <CharReveal as="h2" className={s.title}>{title}</CharReveal>
        <div className={s.items}>
          {faqList.map((f, i) => (
            <div key={i} className={`${s.item} ${openIndex === i ? s.itemOpen : ''}`}>
              <button className={s.itemHeader} onClick={() => toggle(i)}>
                <span className={s.question}>{f.q}</span>
                <span className={s.icon} />
              </button>
              {openIndex === i && f.a && (
                <div className={s.answer}>
                  <p>{f.a}</p>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
