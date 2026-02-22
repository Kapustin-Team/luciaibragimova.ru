import s from './Testimonials.module.sass'

export default function Testimonials() {
  return (
    <section className={s.section}>
      <div className={s.inner}>
        <h2 className={s.heading}>What our customers are saying</h2>
        <div className={s.quote}>
          <div className={s.avatar}>
            <img src="/images/winston.png" alt="Winston S." width={64} height={64} />
          </div>
          <blockquote className={s.text}>
            Pluralsight is solely responsible for getting me from practically minimum
            wage to over six figures a year.
          </blockquote>
          <div className={s.author}>
            <img src="/images/winston.png" alt="Winston S." width={48} height={48} className={s.authorImg} />
            <div>
              <p className={s.name}>Winston S.</p>
              <p className={s.role}>Cloud Architect</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
