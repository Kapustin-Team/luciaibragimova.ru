import s from './CtaSection.module.sass'

export default function CtaSection() {
  return (
    <section className={s.section}>
      <div className={s.inner}>
        <h2 className={s.heading}>Tap into Pluralsight</h2>
        <div className={s.buttons}>
          <a href="#" className={s.btnPrimary}>View individual plans</a>
          <a href="#" className={s.btnOutline}>View team plans</a>
        </div>
      </div>
    </section>
  )
}
