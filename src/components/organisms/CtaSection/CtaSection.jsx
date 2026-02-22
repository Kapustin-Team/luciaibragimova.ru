import s from './CtaSection.module.sass'

export default function CtaSection() {
  return (
    <section className={s.section}>
      <div className={s.inner}>
        <h2 className={s.heading}>Начните путь к гармонии в семье</h2>
        <div className={s.buttons}>
          <a href="#" className={s.btnPrimary}>Выбрать курс</a>
          <a href="#" className={s.btnOutline}>Бесплатная консультация</a>
        </div>
      </div>
    </section>
  )
}
