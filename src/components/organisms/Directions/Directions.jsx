'use client'
import AnimatedSection from '@/components/atoms/AnimatedSection'
import s from './Directions.module.sass'

const dirs = [
  { title: 'Рождение семьи', desc: 'Курсы для молодых пар, будущих мам и начинающих родителей.', count: 3, bandClass: s.cardBandOrange },
  { title: 'Здоровое взросление', desc: 'Работа с подростками и их родителями. Курс «Вовремя» и другие.', count: 4, bandClass: s.cardBandBlue },
  { title: 'Развитие', desc: 'Тренинги уверенности, коммуникации и самопознания для всей семьи.', count: 4, bandClass: s.cardBandPurple },
  { title: 'Трансформация', desc: 'Глубинная работа с выгоранием и поиском внутренней опоры.', count: 3, bandClass: s.cardBandDark },
]

export default function Directions({ data, directions } = {}) {
  return (
    <section className={s.section} id="directions">
      <div className={s.inner}>
        <AnimatedSection>
          <div className={s.header}>
            <h2 className={s.sectionTitle}>Направления обучения</h2>
            <p className={s.sectionSubtitle}>Выберите то, что актуально для вашей семьи</p>
          </div>
        </AnimatedSection>
        <div className={s.grid}>
          {dirs.map((d, i) => (
            <AnimatedSection key={i} delay={i * 0.08}>
              <a href="#courses" className={s.card}>
                <div className={`${s.cardColorBand} ${d.bandClass}`}>
                  <span className={s.cardCount}>{d.count} программы</span>
                </div>
                <div className={s.cardBody}>
                  <h3 className={s.cardTitle}>{d.title}</h3>
                  <p className={s.cardDesc}>{d.desc}</p>
                  <span className={s.cardLink}>Смотреть →</span>
                </div>
              </a>
            </AnimatedSection>
          ))}
        </div>
      </div>
    </section>
  )
}
