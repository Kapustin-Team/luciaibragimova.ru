'use client'
import GradientPlaceholder from '@/components/atoms/GradientPlaceholder'
import s from './About.module.sass'

const facts = [
  'Семейный психолог с 25-летним стажем',
  'Автор книг о взаимоотношениях с подростками',
  'Руководитель центра «Время первых»',
  'Работа с подростками на учёте КДН и ПДН',
  'Сотни восстановленных семей',
]

export default function About({ data } = {}) {
  return (
    <section className={s.section} id="about">
      <div className={s.inner}>
        <div className={s.imageWrap}>
          <GradientPlaceholder variant="cool" aspectRatio="1/1">
            <svg width="48" height="48" viewBox="0 0 24 24" fill="none" style={{opacity:0.3, position:'relative', zIndex:1}}><path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2" stroke="currentColor" strokeWidth="1.5"/><circle cx="12" cy="7" r="4" stroke="currentColor" strokeWidth="1.5"/></svg>
            <span style={{opacity:0.4, fontSize:14, position:'relative', zIndex:1}}>Фото Люции</span>
          </GradientPlaceholder>
        </div>
        <div className={s.textCol}>
          <span className={s.tag}>О Люции</span>
          <h2 className={s.title}>Помогаю семьям вернуть близость и доверие</h2>
          <p className={s.desc}>
            Люция Ибрагимова — семейный психолог с 25-летним опытом. Руководитель центра для трудных подростков «Время первых». За более чем 10 лет работы с «безнадёжными» подростками — десятки возвращений в школу, снятий с учётов.
          </p>
          <ul className={s.list}>
            {facts.map((f, i) => (
              <li key={i} className={s.listItem}>
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none"><circle cx="8" cy="8" r="8" fill="var(--green-soft)"/><path d="M5 8l2 2 4-4" stroke="var(--green-tag)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
                {f}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  )
}
