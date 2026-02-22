'use client'
import AnimatedSection from '@/components/atoms/AnimatedSection'
import s from './Directions.module.sass'

const dirs = [
  { icon: '💍', title: 'Рождение семьи', desc: 'Курсы для молодых пар, будущих мам и начинающих родителей.', count: 3 },
  { icon: '🌱', title: 'Здоровое взросление', desc: 'Работа с подростками и их родителями. Курс «Вовремя» и другие.', count: 4 },
  { icon: '✨', title: 'Развитие', desc: 'Тренинги уверенности, коммуникации и самопознания для всей семьи.', count: 4 },
  { icon: '🔥', title: 'Трансформация', desc: 'Глубинная работа с выгоранием и поиском внутренней опоры.', count: 3 },
]

export default function Directions() {
  return (
    <section className={s.section} id="directions">
      <div className={s.inner}>
        <div className={s.grid}>
          {dirs.map((d, i) => (
            <AnimatedSection key={i} delay={i * 0.1}>
              <div className={s.card}>
                <div className={s.iconWrap}>
                  <span className={s.icon}>{d.icon}</span>
                </div>
                <h3 className={s.cardTitle}>{d.title}</h3>
                <p className={s.cardDesc}>{d.desc}</p>
                <a href="#courses" className={s.cardLink}>Подробнее →</a>
              </div>
            </AnimatedSection>
          ))}
        </div>
      </div>
    </section>
  )
}
