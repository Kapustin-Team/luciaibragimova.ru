import s from './ForresterWave.module.sass'

export default function ForresterWave() {
  return (
    <section className={s.section}>
      <div className={s.inner}>
        <div className={s.content}>
          <h2 className={s.heading}>
            2025 Forrester Wave™ names Pluralsight as a{' '}
            <span className={s.leader}>Leader</span>{' '}
            among tech skills dev platforms
          </h2>
          <p className={s.desc}>See how our offering and strategy stack up.</p>
          <a href="#" className={s.btn}>Learn more</a>
        </div>
        <div className={s.imageWrap}>
          <img src="/images/forrester.png" alt="Forrester Wave Report" className={s.image} />
        </div>
      </div>
    </section>
  )
}
