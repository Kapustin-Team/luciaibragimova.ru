import s from './LogosBar.module.sass'

export default function LogosBar() {
  return (
    <section className={s.section}>
      <div className={s.inner}>
        <img src="/images/logos.svg" alt="Company logos" className={s.logos} />
      </div>
    </section>
  )
}
