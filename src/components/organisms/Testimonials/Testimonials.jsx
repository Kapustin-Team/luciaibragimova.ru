import s from './Testimonials.module.sass'

export default function Testimonials() {
  return (
    <section className={s.section}>
      <div className={s.inner}>
        <h2 className={s.heading}>Отзывы наших учеников</h2>
        <div className={s.quote}>
          <div className={s.avatar}>
            <img src="/images/winston.png" alt="Анна К." width={64} height={64} />
          </div>
          <blockquote className={s.text}>
            Благодаря курсу «Вовремя» мы смогли вернуть контакт с сыном-подростком.
            Он снова разговаривает с нами. Спасибо Люции за её работу и неравнодушие.
          </blockquote>
          <div className={s.author}>
            <img src="/images/winston.png" alt="Анна К." width={48} height={48} className={s.authorImg} />
            <div>
              <p className={s.name}>Анна К.</p>
              <p className={s.role}>Мама подростка</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
