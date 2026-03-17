'use client'
import s from './FeaturedCourse.module.sass'

export default function FeaturedCourse({ data } = {}) {
  return (
    <section className={s.section}>
      <div className={s.decorCircle} />
      <div className={s.decorDots} />
      <div className={s.inner}>
        <div className={s.topRow}>
          <div className={s.content}>
            <span className={s.badge}>Бестселлер</span>
            <h2 className={s.title}>Вовремя</h2>
            <p className={s.subtitle}>Системный курс для родителей подростков</p>
            <p className={s.desc}>
              Ваш подросток отдаляется, грубит, вредит себе? Курс «Вовремя» — это 5 модулей глубинной работы с отношениями. Вы научитесь слышать, понимать и восстанавливать доверие.
            </p>
            <blockquote className={s.quote}>
              «Каждый родитель способен стать для подростка опорой, а не источником конфликта»
              <cite className={s.quoteAuthor}>— Люция Ибрагимова</cite>
            </blockquote>
          </div>
          <div className={s.visual}>
            <div className={s.imageFrame}>
              <img src="/courses/course-vovremya.webp" alt="Курс Вовремя" className={s.image} />
              <div className={s.imageAccent} />
            </div>
          </div>
        </div>
        <div className={s.features}>
          <div className={s.featureItem}>
            <div className={s.featureIconWrap}>
              <svg className={s.featureIcon} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="2" y="3" width="20" height="14" rx="2" /><path d="M8 21h8M12 17v4" /></svg>
            </div>
            <div>
              <span className={s.featureLabel}>5 модулей</span>
              <span className={s.featureDesc}>20 видео-лекций</span>
            </div>
          </div>
          <div className={s.featureItem}>
            <div className={s.featureIconWrap}>
              <svg className={s.featureIcon} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10" /><path d="M12 6v6l4 2" /></svg>
            </div>
            <div>
              <span className={s.featureLabel}>В своём темпе</span>
              <span className={s.featureDesc}>Доступ навсегда</span>
            </div>
          </div>
          <div className={s.featureItem}>
            <div className={s.featureIconWrap}>
              <svg className={s.featureIcon} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2" /><circle cx="9" cy="7" r="4" /><path d="M23 21v-2a4 4 0 00-3-3.87M16 3.13a4 4 0 010 7.75" /></svg>
            </div>
            <div>
              <span className={s.featureLabel}>100% онлайн</span>
              <span className={s.featureDesc}>Чат поддержки</span>
            </div>
          </div>
        </div>
        <a href="/courses/vovremya" className={s.btn}>
          Записаться на курс
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M5 12h14M12 5l7 7-7 7" /></svg>
        </a>
      </div>
    </section>
  )
}
