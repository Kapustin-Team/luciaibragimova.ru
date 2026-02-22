import s from './HandsOn.module.sass'

export default function HandsOn() {
  return (
    <section className={s.section}>
      <div className={s.inner}>
        <div className={s.imageWrap}>
          <img src="/images/hands-on.png" alt="Hands-on practice" className={s.image} />
        </div>
        <div className={s.content}>
          <span className={s.badge}>Learn by doing</span>
          <h2 className={s.heading}>Build confidence with hands-on practice</h2>
          <p className={s.desc}>
            Experiment with new skills in 3,500+ interactive labs and AI or cloud sandboxes
            to quickly get the hang of them in real-world environments and take your career
            (and subject) to the next level.
          </p>
          <a href="#" className={s.btn}>Learn about labs</a>
        </div>
      </div>
    </section>
  )
}
