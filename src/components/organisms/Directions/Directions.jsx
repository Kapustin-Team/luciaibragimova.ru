'use client'
import AnimatedSection from '@/components/atoms/AnimatedSection'
import SectionTitle from '@/components/atoms/SectionTitle'
import s from './Directions.module.sass'

const directions = [
  {
    icon: '💍',
    title: 'Рождение семьи',
    desc: 'Курсы для молодых пар, будущих мам и начинающих родителей. Как построить крепкую семью с первых дней.',
    count: 3,
  },
  {
    icon: '🌱',
    title: 'Здоровое взросление',
    desc: 'Работа с подростками и их родителями. Как пережить переходный возраст без потерь.',
    count: 4,
  },
  {
    icon: '✨',
    title: 'Развитие детей и взрослых',
    desc: 'Тренинги уверенности, коммуникации и самопознания для всей семьи.',
    count: 4,
  },
  {
    icon: '🔥',
    title: 'Духовно-нравственная трансформация',
    desc: 'Глубинная работа с выгоранием, поиском смысла и внутренней силой.',
    count: 3,
  },
]

export default function Directions() {
  return (
    <section className={s.section}>
      <div className={s.inner}>
        <AnimatedSection>
          <SectionTitle sub="Четыре ключевых направления для гармоничной жизни">
            Направления
          </SectionTitle>
        </AnimatedSection>
        <div className={s.grid}>
          {directions.map((d, i) => (
            <AnimatedSection key={i} delay={i * 0.1}>
              <div className={s.card}>
                <span className={s.icon}>{d.icon}</span>
                <h3 className={s.cardTitle}>{d.title}</h3>
                <p className={s.cardDesc}>{d.desc}</p>
                <span className={s.count}>{d.count} курса</span>
              </div>
            </AnimatedSection>
          ))}
        </div>
      </div>
    </section>
  )
}
