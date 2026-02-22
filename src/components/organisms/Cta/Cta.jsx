'use client'
import AnimatedSection from '@/components/atoms/AnimatedSection'
import s from './Cta.module.sass'

export default function Cta() {
  return (
    <section className={s.section}>
      <AnimatedSection>
        <div className={s.inner}>
          <h2 className={s.title}>Начните путь к гармонии</h2>
          <div className={s.actions}>
            <a href="#courses" className={s.btnLight}>Выбрать курс</a>
            <a href="#" className={s.btnOutline}>Бесплатная консультация</a>
          </div>
        </div>
      </AnimatedSection>
    </section>
  )
}
