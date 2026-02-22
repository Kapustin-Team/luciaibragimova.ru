'use client'
import AnimatedSection from '@/components/atoms/AnimatedSection'
import SectionTitle from '@/components/atoms/SectionTitle'
import s from './About.module.sass'

const achievements = [
  'Семейный психолог с 25-летним стажем',
  'Автор книг о взаимоотношениях с подростками',
  'Руководитель центра «Время первых»',
  'Более 10 лет работы с трудными подростками',
  'Сотни восстановленных семей',
]

export default function About() {
  return (
    <section className={s.section} id="about">
      <div className={s.inner}>
        <AnimatedSection>
          <div className={s.imagePlaceholder}>
            <span>Фото Люции</span>
          </div>
        </AnimatedSection>
        <AnimatedSection delay={0.15}>
          <SectionTitle sub="Помогаю семьям уже более 25 лет">О Люции</SectionTitle>
          <p className={s.text}>
            Люция Ибрагимова — семейный психолог, специализирующийся на работе с подростками
            и их семьями. Руководитель психолого-коррекционного центра для трудных подростков
            «Время первых». За годы практики помогла сотням семей наладить отношения
            и вернуть подростков к нормальной жизни.
          </p>
          <ul className={s.list}>
            {achievements.map((item, i) => (
              <li key={i} className={s.item}>
                <span className={s.dot} />
                {item}
              </li>
            ))}
          </ul>
        </AnimatedSection>
      </div>
    </section>
  )
}
