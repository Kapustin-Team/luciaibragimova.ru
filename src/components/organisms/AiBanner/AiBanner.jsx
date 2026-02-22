import s from './AiBanner.module.sass'

export default function AiBanner() {
  return (
    <section className={s.section}>
      <div className={s.inner}>
        <img src="/images/ai-banner.png" alt="" className={s.bg} />
        <div className={s.content}>
          <h2 className={s.heading}>
            Enhanced AI.{'\n'}Easier navigation. Faster learning.
          </h2>
          <p className={s.desc}>Check out our new features for a more streamlined experience.</p>
          <a href="#" className={s.btn}>Learn more</a>
        </div>
      </div>
    </section>
  )
}
