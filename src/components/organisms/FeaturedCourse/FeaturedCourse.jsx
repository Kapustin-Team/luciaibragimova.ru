'use client'
import s from './FeaturedCourse.module.sass'

export default function FeaturedCourse({ data } = {}) {
  return (
    <section className={s.section}>
      <div className={s.inner}>
        <div className={s.content}>
          <span className={s.badge}>Главный курс</span>
          <h2 className={s.title}>Вовремя</h2>
          
            <p className={s.desc}>
              Курс для родителей подростков, которые отдаляются, грубят, вредят себе. 5 модулей по 4 лекции — системный подход к восстановлению отношений.
            </p>
          
          <a href="/courses/vovremya" className={s.btn}>Узнать подробнее</a>
        </div>
        <div className={s.visual}>
          <div className={s.stats}>
            {[
              { num: '5', label: 'модулей' },
              { num: '20', label: 'лекций' },
              { num: '100%', label: 'онлайн' },
            ].map((stat, i) => (
              
                <span className={s.statNum}>{stat.num}</span>
                <span className={s.statLabel}>{stat.label}</span>
              
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
