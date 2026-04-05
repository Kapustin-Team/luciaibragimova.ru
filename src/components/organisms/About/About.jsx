'use client'
import CharReveal from '@/components/atoms/CharReveal'
import s from './About.module.sass'

const DEFAULT_HIGHLIGHTS = [
  'Семейный психолог с 25-летним стажем',
  'Автор книг о взаимоотношениях с подростками',
  'Руководитель центра «Время первых»',
  'Работа с подростками на учёте КДН и ПДН',
  'Более 3 677 семей восстановили отношения',
]

export default function About({ data } = {}) {
  const label = data?.label || null
  const title = data?.title || 'Помогаю семьям вернуть близость и доверие'
  const description = data?.description || 'Люция Ибрагимова — семейный психолог с 25-летним опытом. Руководитель центра для трудных подростков «Время первых». За более чем 10 лет работы с «безнадёжными» подростками — десятки возвращений в школу, снятий с учётов.'
  const highlights = data?.highlights?.length ? data.highlights : DEFAULT_HIGHLIGHTS
  const imageUrl = data?.image?.url || '/lucia-new.webp'

  return (
    <section className={s.section} id="about">
      <div className={s.inner}>
        <div className={s.imageWrap}>
          <img src={imageUrl} alt="Люция Ибрагимова" className={s.photo} />
        </div>
        <div className={s.textCol}>
          {label && <span className={s.label}>{label}</span>}
          <CharReveal as="h3" className={s.title}>{title}</CharReveal>
          <p className={s.desc}>{description}</p>
          <ul className={s.list}>
            {highlights.map((f, i) => (
              <li key={i} className={s.listItem}>
                <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                  <circle cx="10" cy="10" r="10" fill="rgba(116,76,50,0.12)" />
                  <path d="M6 10l3 3 5-5" stroke="#25140C" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
                {f}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  )
}
