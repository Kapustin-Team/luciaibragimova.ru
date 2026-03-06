'use client'
import MaskReveal from '@/components/atoms/MaskReveal'
import FadeSlideUp from '@/components/atoms/FadeSlideUp'
import ScalePop from '@/components/atoms/ScalePop'
import s from './FeaturedCourse.module.sass'

export default function FeaturedCourse({ data } = {}) {
  return (
    <section className={s.section}>
      <div className={s.inner}>
        <div className={s.content}>
          <FadeSlideUp><span className={s.badge}>Главный курс</span></FadeSlideUp>
          <MaskReveal delay={0.1}><h2 className={s.title}>Вовремя</h2></MaskReveal>
          <FadeSlideUp delay={0.2}>
            <p className={s.desc}>
              Курс для родителей подростков, которые отдаляются, грубят, вредят себе. 5 модулей по 4 лекции — системный подход к восстановлению отношений.
            </p>
          </FadeSlideUp>
          <ScalePop delay={0.3}><a href="#" className={s.btn}>Узнать подробнее</a></ScalePop>
        </div>
        <div className={s.visual}>
          <div className={s.stats}>
            {[
              { num: '5', label: 'модулей' },
              { num: '20', label: 'лекций' },
              { num: '100%', label: 'онлайн' },
            ].map((stat, i) => (
              <ScalePop key={i} delay={0.2 + i * 0.1} className={s.statItem}>
                <span className={s.statNum}>{stat.num}</span>
                <span className={s.statLabel}>{stat.label}</span>
              </ScalePop>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
