'use client'
import AnimatedSection from '@/components/atoms/AnimatedSection'
import DecorativeShapes from '@/components/atoms/DecorativeShapes'
import s from './Directions.module.sass'

const dirs = [
  { icon: '💍', title: 'Рождение семьи', desc: 'Курсы для молодых пар, будущих мам и начинающих родителей.', count: 3, bg: 'var(--sand-soft)' },
  { icon: '🌱', title: 'Здоровое взросление', desc: 'Работа с подростками и их родителями. Курс «Вовремя» и другие.', count: 4, bg: 'var(--coral-soft)' },
  { icon: '✨', title: 'Развитие', desc: 'Тренинги уверенности, коммуникации и самопознания для всей семьи.', count: 4, bg: 'var(--lavender-soft)' },
  { icon: '🔥', title: 'Трансформация', desc: 'Глубинная работа с выгоранием и поиском внутренней опоры.', count: 3, bg: 'rgba(214, 232, 240, 0.2)' },
]

const decorShapes = [
  { shape: 'circle', color: 'rgba(196, 181, 224, 0.08)', size: '200px', style: { top: '-60px', right: '10%' } },
  { shape: 'blob1', color: 'rgba(245, 215, 160, 0.06)', size: '180px', style: { bottom: '-40px', left: '5%' } },
]

export default function Directions() {
  return (
    <section className={s.section} id="directions">
      <DecorativeShapes items={decorShapes} />
      <div className={s.inner}>
        <AnimatedSection>
          <h2 className={s.sectionTitle}>Направления обучения</h2>
          <p className={s.sectionSubtitle}>Выберите то, что актуально для вашей семьи</p>
        </AnimatedSection>
        <div className={s.grid}>
          {dirs.map((d, i) => (
            <AnimatedSection key={i} delay={i * 0.1}>
              <div className={s.card}>
                <div className={s.iconWrap} style={{ background: d.bg }}>
                  <span className={s.icon}>{d.icon}</span>
                </div>
                <h3 className={s.cardTitle}>{d.title}</h3>
                <p className={s.cardDesc}>{d.desc}</p>
                <span className={s.cardCount}>{d.count} программы</span>
                <a href="#courses" className={s.cardLink}>Подробнее →</a>
              </div>
            </AnimatedSection>
          ))}
        </div>
      </div>
    </section>
  )
}
