'use client'
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
          <img src="/lucia.webp" alt="Люция Ибрагимова" className={s.photo} />
        </div>
        <div className={s.textCol}>
          <h2 className={s.title}>Помогаю семьям вернуть близость и доверие</h2>
          <p className={s.desc}>
            Люция Ибрагимова — семейный психолог с 25-летним опытом. Руководитель центра для трудных подростков «Время первых». За более чем 10 лет работы с «безнадёжными» подростками — десятки возвращений в школу, снятий с учётов.
          </p>
          <ul className={s.list}>
            {facts.map((f, i) => (
              <li key={i} className={s.listItem}>
                <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                  <circle cx="10" cy="10" r="10" fill="rgba(233,58,163,0.12)" />
                  <path d="M6 10l3 3 5-5" stroke="#E93AA3" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
                {f}
              </li>
            ))}
          </ul>
          <a href="https://vremyapervyh.ru" target="_blank" rel="noopener noreferrer" className={s.personalBtn}>
            Перейти на личный сайт →
          </a>
        </div>
      </div>
    </section>
  )
}
