import s from './BusinessSection.module.sass'

const features = [
  'Повышение квалификации для школьных психологов и педагогов',
  'Программы профилактики девиантного поведения подростков',
  'Тренинги по работе с трудными подростками и их семьями',
]

export default function BusinessSection() {
  return (
    <section className={s.section}>
      <div className={s.inner}>
        <div className={s.imageWrap}>
          <img src="/images/business.png" alt="Для специалистов" className={s.image} />
        </div>
        <div className={s.content}>
          <span className={s.badge}>Для специалистов</span>
          <h2 className={s.heading}>Программы для специалистов и образовательных учреждений</h2>
          <p className={s.desc}>
            Курсы и тренинги для педагогов, школьных психологов и социальных работников:
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
            <a href="#" className={s.btnPrimary}>Узнать подробнее</a>
            <a href="#" className={s.btnLink}>Все программы →</a>
          </div>
        </div>
      </div>
    </section>
  )
}
