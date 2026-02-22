'use client'
import AnimatedSection from '@/components/atoms/AnimatedSection'
import s from './Reviews.module.sass'

const reviews = [
  { name: 'Анна М.', role: 'Мама подростка', text: 'Благодаря курсу «Вовремя» мы с сыном снова разговариваем. Он вернулся в школу, перестал прогуливать. Это казалось невозможным ещё полгода назад.', course: 'Вовремя' },
  { name: 'Елена К.', role: 'Будущая мама', text: 'Курс «Мама здесь» дал мне уверенность и спокойствие. Я перестала тревожиться и начала наслаждаться беременностью. Очень тёплая подача.', course: 'Мама здесь' },
  { name: 'Марат И.', role: 'Предприниматель', text: 'После тренинга «Путь» я пересмотрел свои приоритеты. Два дня, которые изменили мой взгляд на жизнь.', course: 'Путь' },
]

export default function Reviews() {
  return (
    <section className={s.section} id="reviews">
      <div className={s.inner}>
        <AnimatedSection>
          <h2 className={s.title}>Что говорят участники курсов</h2>
        </AnimatedSection>
        <div className={s.grid}>
          {reviews.map((r, i) => (
            <AnimatedSection key={i} delay={i * 0.1}>
              <div className={s.card}>
                <div className={s.quoteIcon}>❝</div>
                <p className={s.text}>{r.text}</p>
                <div className={s.author}>
                  <div className={s.avatar}>{r.name[0]}</div>
                  <div>
                    <div className={s.name}>{r.name}</div>
                    <div className={s.role}>{r.role}</div>
                  </div>
                </div>
              </div>
            </AnimatedSection>
          ))}
        </div>
      </div>
    </section>
  )
}
