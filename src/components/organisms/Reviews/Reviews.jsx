'use client'
import AnimatedSection from '@/components/atoms/AnimatedSection'
import SectionTitle from '@/components/atoms/SectionTitle'
import s from './Reviews.module.sass'

const reviews = [
  { name: 'Анна М.', text: 'Благодаря курсу «Вовремя» мы с сыном снова разговариваем. Это было невозможно ещё полгода назад.', course: 'Вовремя' },
  { name: 'Елена К.', text: 'Курс для беременных дал мне уверенность и спокойствие. Люция — невероятный специалист.', course: 'Мама здесь' },
  { name: 'Марат И.', text: 'После тренинга «Путь» я пересмотрел свои приоритеты. Сильнейший опыт.', course: 'Путь' },
]

export default function Reviews() {
  return (
    <section className={s.section}>
      <div className={s.inner}>
        <AnimatedSection>
          <SectionTitle sub="Что говорят участники курсов">Отзывы</SectionTitle>
        </AnimatedSection>
        <div className={s.grid}>
          {reviews.map((r, i) => (
            <AnimatedSection key={i} delay={i * 0.1}>
              <div className={s.card}>
                <p className={s.text}>&laquo;{r.text}&raquo;</p>
                <div className={s.author}>
                  <div className={s.avatar}>{r.name[0]}</div>
                  <div>
                    <p className={s.name}>{r.name}</p>
                    <p className={s.course}>{r.course}</p>
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
