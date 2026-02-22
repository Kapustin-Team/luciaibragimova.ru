'use client'
import AnimatedSection from '@/components/atoms/AnimatedSection'
import s from './Reviews.module.sass'

const reviews = [
  { name: 'Анна М.', role: 'Мама подростка', text: 'Благодаря курсу «Вовремя» мы с сыном снова разговариваем. Он вернулся в школу, перестал прогуливать. Это казалось невозможным ещё полгода назад.', course: 'Вовремя', initials: 'АМ' },
  { name: 'Елена К.', role: 'Будущая мама', text: 'Курс «Мама здесь» дал мне уверенность и спокойствие. Я перестала тревожиться и начала наслаждаться беременностью. Очень тёплая подача.', course: 'Мама здесь', initials: 'ЕК' },
  { name: 'Марат И.', role: 'Предприниматель', text: 'После тренинга «Путь» я пересмотрел свои приоритеты. Два дня, которые изменили мой взгляд на жизнь.', course: 'Путь', initials: 'МИ' },
  { name: 'Ольга Д.', role: 'Педагог', text: 'Программа «Лёгкость адаптации» помогла выстроить работу с родителями и детьми совершенно по-новому. Рекомендую всем коллегам.', course: 'Лёгкость адаптации', initials: 'ОД' },
]

export default function Reviews() {
  return (
    <section className={s.section} id="reviews">
      <div className={s.inner}>
        <AnimatedSection>
          <h2 className={s.title}>Истории учеников</h2>
          <p className={s.subtitle}>Реальные результаты реальных людей</p>
        </AnimatedSection>
        <div className={s.grid}>
          {reviews.map((r, i) => (
            <AnimatedSection key={i} delay={i * 0.1}>
              <div className={s.card}>
                <div className={s.avatarWrap}>
                  <div className={s.avatar}>{r.initials}</div>
                </div>
                <div className={s.name}>{r.name}</div>
                <div className={s.role}>{r.role}</div>
                <p className={s.text}>{r.text}</p>
                <span className={s.course}>{r.course}</span>
              </div>
            </AnimatedSection>
          ))}
        </div>
      </div>
    </section>
  )
}
