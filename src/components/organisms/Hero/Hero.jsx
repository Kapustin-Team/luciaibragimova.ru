import s from './Hero.module.sass'

export default function Hero() {
  return (
    <section className={s.hero}>
      <div className={s.inner}>
        <div className={s.content}>
          <h1 className={s.title}>
            Empower your team{'\n'}with future-ready tech{'\n'}skills
          </h1>
          <p className={s.desc}>
            Stay ahead in AI, cloud, cybersecurity, and more to drive
            innovation and achieve measurable results.
          </p>
          <div className={s.stat}>
            <div className={s.statIcon}>
              <img src="/images/course-icon.svg" alt="" width={32} height={32} />
            </div>
            <span className={s.statText}>6,500+ tech courses</span>
          </div>
          <div className={s.buttons}>
            <a href="#" className={s.btnPrimary}>For businesses</a>
            <a href="#" className={s.btnOutline}>For individuals</a>
          </div>
        </div>
        <div className={s.imageWrap}>
          <img src="/images/hero.png" alt="Empower your team" className={s.heroImage} />
        </div>
      </div>
    </section>
  )
}
