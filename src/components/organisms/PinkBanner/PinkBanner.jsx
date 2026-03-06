'use client'
import s from './PinkBanner.module.sass'

export default function PinkBanner({ data } = {}) {
  return (
    <section className={s.section}>
      <div className={s.decorCircle1} />
      <div className={s.decorCircle2} />
      <div className={s.decorDots} />
      <div className={s.inner}>
        <div className={s.card}>
          <h2 className={s.title}>
            Более <span className={s.highlight}>500 семей</span> уже прошли путь к гармонии вместе с Люцией
          </h2>
          <p className={s.desc}>25 лет практики. Автор книг. Руководитель центра «Время первых».</p>
          <a href="#about" className={s.btn}>Узнать больше</a>
        </div>
      </div>
    </section>
  )
}
