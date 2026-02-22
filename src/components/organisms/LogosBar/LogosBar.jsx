import s from './LogosBar.module.sass'

export default function LogosBar() {
  return (
    <section className={s.section}>
      <div className={s.inner}>
        <p style={{ textAlign: 'center', color: '#888', fontSize: '0.875rem', letterSpacing: '0.1em', textTransform: 'uppercase' }}>Нам доверяют</p>
        <img src="/images/logos.svg" alt="Партнёры" className={s.logos} />
      </div>
    </section>
  )
}
