'use client'
import AnimatedSection from '@/components/atoms/AnimatedSection'
import s from './PinkBanner.module.sass'

export default function PinkBanner() {
  return (
    <section className={s.section}>
      <AnimatedSection>
        <div className={s.inner}>
          <h2 className={s.title}>
            Более <span className={s.highlight}>500 семей</span> уже прошли путь к гармонии вместе с Люцией
          </h2>
          <p className={s.desc}>25 лет практики. Автор книг. Руководитель центра «Время первых».</p>
          <a href="#about" className={s.btn}>Узнать больше</a>
        </div>
      </AnimatedSection>
    </section>
  )
}
