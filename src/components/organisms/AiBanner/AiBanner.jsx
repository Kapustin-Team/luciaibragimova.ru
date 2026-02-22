import s from './AiBanner.module.sass'

export default function AiBanner() {
  return (
    <section className={s.section}>
      <div className={s.inner}>
        <img src="/images/ai-banner.png" alt="" className={s.bg} />
        <div className={s.content}>
          <h2 className={s.heading}>
            «Изменить можно многое.{'\n'}Даже если сейчас кажется, что уже поздно.»
          </h2>
          <p className={s.desc}>Люция Ибрагимова — семейный психолог</p>
        </div>
      </div>
    </section>
  )
}
