import s from './BusinessSection.module.sass'

const features = [
  'Identify knowledge gaps and align tech learning to organizational initiatives',
  'Build skills to transform and retain in-house tech talent',
  'Validate skills with assessments, certification practice exams, and hands-on practice labs',
]

export default function BusinessSection() {
  return (
    <section className={s.section}>
      <div className={s.inner}>
        <div className={s.imageWrap}>
          <img src="/images/business.png" alt="Business" className={s.image} />
        </div>
        <div className={s.content}>
          <span className={s.badge}>Develop tech teams</span>
          <h2 className={s.heading}>Accelerate business initiatives</h2>
          <p className={s.desc}>
            Join the Fortune 500 companies and more than 23,000 businesses that rely on
            Pluralsight to:
          </p>
          <ul className={s.list}>
            {features.map((f, i) => (
              <li key={i} className={s.item}>
                <img src="/images/check-icon.svg" alt="" width={24} height={24} className={s.check} />
                <span>{f}</span>
              </li>
            ))}
          </ul>
          <div className={s.buttons}>
            <a href="#" className={s.btnPrimary}>View team plans</a>
            <a href="#" className={s.btnLink}>See all solutions →</a>
          </div>
        </div>
      </div>
    </section>
  )
}
