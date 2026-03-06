'use client'
import s from './Reviews.module.sass'

const FALLBACK_REVIEWS = [
  { name: 'Анна М.', role: 'Мама подростка', text: 'Благодаря курсу «Вовремя» мы с сыном снова разговариваем. Он вернулся в школу, перестал прогуливать. Это казалось невозможным ещё полгода назад.', course: 'Вовремя', initials: 'АМ' },
  { name: 'Елена К.', role: 'Будущая мама', text: 'Курс «Мама здесь» дал мне уверенность и спокойствие. Я перестала тревожиться и начала наслаждаться беременностью. Очень тёплая подача.', course: 'Мама здесь', initials: 'ЕК' },
  { name: 'Марат И.', role: 'Предприниматель', text: 'После тренинга «Путь» я пересмотрел свои приоритеты. Два дня, которые изменили мой взгляд на жизнь.', course: 'Путь', initials: 'МИ' },
  { name: 'Ольга Д.', role: 'Педагог', text: 'Программа «Лёгкость адаптации» помогла выстроить работу с родителями и детьми совершенно по-новому. Рекомендую всем коллегам.', course: 'Лёгкость адаптации', initials: 'ОД' },
]

const topStyles = [s.cardTop0, s.cardTop1, s.cardTop2, s.cardTop3]

function getInitials(name) {
  return name.split(' ').map(w => w[0]).join('').toUpperCase()
}

function normalizeReviews(strapiReviews) {
  if (!strapiReviews?.length) return FALLBACK_REVIEWS
  return strapiReviews.map(r => ({
    name: r.name,
    role: r.role || '',
    text: r.text,
    course: r.course?.title || '',
    initials: getInitials(r.name),
  }))
}

export default function Reviews({ data, reviews: strapiReviews } = {}) {
  const title = data?.title || 'Истории учеников'
  const subtitle = data?.subtitle || 'Реальные результаты реальных людей'
  const reviewsList = normalizeReviews(strapiReviews)

  return (
    <section className={s.section} id="reviews">
      <div className={s.inner}>
        <div className={s.header}>
          <h2 className={s.title}>{title}</h2>
          <p className={s.subtitle}>{subtitle}</p>
        </div>
        <div style={{ perspective: '1000px' }}>
          <div className={s.grid}>
            {reviewsList.map((r, i) => (
              
                <div className={s.card}>
                  <div className={`${s.cardTop} ${topStyles[i % topStyles.length]}`}>
                    <div className={s.avatarCircle}>{r.initials}</div>
                  </div>
                  <div className={s.cardBottom}>
                    <span className={s.tag}>Отзыв</span>
                    <div className={s.name}>{r.name}</div>
                    {r.role && <div className={s.role}>{r.role}</div>}
                    <p className={s.text}>{r.text}</p>
                    {r.course && <span className={s.course}>{r.course}</span>}
                  </div>
                </div>
              
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
