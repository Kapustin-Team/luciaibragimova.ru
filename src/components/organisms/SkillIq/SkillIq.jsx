import s from './SkillIq.module.sass'

export default function SkillIq() {
  return (
    <section className={s.section}>
      <div className={s.inner}>
        <div className={s.content}>
          <span className={s.badge}>Identify skills gaps</span>
          <h2 className={s.heading}>Speed up learning with personalized, AI-powered guidance</h2>
          <p className={s.desc}>
            Identify current skill levels and growth opportunities with Skill IQ assessments,
            then get custom content recommendations to upskill faster. Plus, learners
            receive instant guidance from Pluralsight&apos;s AI assistant, Iris, to improve skill
            development outcomes.
          </p>
          <a href="#" className={s.btn}>Explore skill assessments</a>
        </div>
        <div className={s.imageWrap}>
          <img src="/images/skill-iq.png" alt="Skill IQ" className={s.image} />
        </div>
      </div>
    </section>
  )
}
