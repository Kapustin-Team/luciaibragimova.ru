import s from './TopTierTraining.module.sass'

export default function TopTierTraining() {
  return (
    <section className={s.section}>
      <div className={s.inner}>
        <div className={s.badge}>
          <span className={s.badgeText}>Top-tier training</span>
        </div>
        <div className={s.headingWrap}>
          <h2 className={s.heading}>Tackle tech trends with the best in the industry</h2>
        </div>
        <p className={s.desc}>
          Learn from real experts. Our author list is highly curated with 91% of them backed by at
          least 10 years experience in their field. Cast a wide learning net or develop a highly
          specialized learning path, reassured that you&apos;re getting top notch, up-to-speed insights.
        </p>
        <a href="#" className={s.btn}>View course library</a>
      </div>
    </section>
  )
}
