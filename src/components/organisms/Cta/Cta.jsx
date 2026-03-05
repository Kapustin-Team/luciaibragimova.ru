'use client'
import AnimatedSection from '@/components/atoms/AnimatedSection'
import s from './Cta.module.sass'

export default function Cta({ data } = {}) {
  return (
    <section className={s.section}>
      <div className={s.outer}>
        <AnimatedSection>
          <div className={s.card}>
            <h2 className={s.title}>Начните путь<br />к гармонии</h2>
            <p className={s.subtitle}>Выберите программу — онлайн, офлайн или гибрид.</p>
            <div className={s.actions}>
              <a href="#courses" className={s.btnDark}>Выбрать курс</a>
              <a href="#" className={s.btnOutline}>Бесплатная консультация</a>
            </div>
          </div>
        </AnimatedSection>
      </div>
    </section>
  )
}
