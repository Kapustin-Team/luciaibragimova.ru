'use client'
import MaskReveal from '@/components/atoms/MaskReveal'
import FadeSlideUp from '@/components/atoms/FadeSlideUp'
import Card3D from '@/components/atoms/Card3D'
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
        <div className={s.header}>
          <MaskReveal><h2 className={s.sectionTitle}>Направления обучения</h2></MaskReveal>
          <FadeSlideUp delay={0.1}><p className={s.sectionSubtitle}>Выберите то, что актуально для вашей семьи</p></FadeSlideUp>
        </div>
        <div style={{ perspective: '1000px' }}>
          <div className={s.grid}>
            {dirs.map((d, i) => (
              <Card3D key={d.title} index={i}>
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
              </Card3D>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
