'use client'
import AnimatedSection from '@/components/atoms/AnimatedSection'
import s from './FeaturedCourse.module.sass'

export default function FeaturedCourse() {
  return (
    <section className={s.section}>
      <AnimatedSection>
        <div className={s.inner}>
          <div className={s.content}>
            <span className={s.badge}>Главный курс</span>
            <h2 className={s.title}>Вовремя</h2>
            <p className={s.desc}>
              Курс для родителей подростков, которые отдаляются, грубят, вредят себе. 5 модулей по 4 лекции — системный подход к восстановлению отношений.
            </p>
            <a href="#" className={s.btn}>Узнать подробнее</a>
          </div>
          <div className={s.visual}>
            <div className={s.stats}>
              <div className={s.statItem}>
                <span className={s.statNum}>5</span>
                <span className={s.statLabel}>модулей</span>
              </div>
              <div className={s.statItem}>
                <span className={s.statNum}>20</span>
                <span className={s.statLabel}>лекций</span>
              </div>
              <div className={s.statItem}>
                <span className={s.statNum}>100%</span>
                <span className={s.statLabel}>онлайн</span>
              </div>
            </div>
          </div>
        </div>
      </AnimatedSection>
    </section>
  )
}
