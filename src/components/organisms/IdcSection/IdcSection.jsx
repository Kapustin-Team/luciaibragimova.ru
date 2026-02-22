import s from './IdcSection.module.sass'

export default function IdcSection() {
  return (
    <section className={s.section}>
      <div className={s.inner}>
        <div className={s.bg}>
          <img src="/images/idc-bg.png" alt="" className={s.bgImage} />
        </div>
        <div className={s.content}>
          <h2 className={s.heading}>
            Pluralsight named a{' '}
            <span className={s.leader}>Leader</span>{' '}
            in North America IT Training Services
          </h2>
          <p className={s.desc}>See why the IDC MarketScape recognized us.</p>
          <a href="#" className={s.btn}>Learn more</a>
        </div>
      </div>
    </section>
  )
}
