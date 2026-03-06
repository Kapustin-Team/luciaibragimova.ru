'use client'
import s from './Cta.module.sass'

export default function Cta({ data } = {}) {
  return (
    <section className={s.section}>
      <div className={s.decorCircle1} />
      <div className={s.decorCircle2} />
      <div className={s.decorDots} />
      <div className={s.outer}>
        <div className={s.card}>
          <h2 className={s.title}>Начните путь<br />к гармонии</h2>
          <p className={s.subtitle}>Выберите программу — онлайн, офлайн или гибрид.</p>
          <a href="#courses" className={s.btnPrimary}>Выбрать курс</a>
        </div>
      </div>
    </section>
  )
}
