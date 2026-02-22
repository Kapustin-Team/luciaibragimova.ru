import s from './HandsOn.module.sass'

export default function HandsOn() {
  return (
    <section className={s.section}>
      <div className={s.inner}>
        <div className={s.imageWrap}>
          <img src="/images/hands-on.png" alt="Формат обучения" className={s.image} />
        </div>
        <div className={s.content}>
          <span className={s.badge}>Формат обучения</span>
          <h2 className={s.heading}>Практические программы, которые работают в реальных семьях</h2>
          <p className={s.desc}>
            Видеолекции, практические задания, личные консультации и офлайн-тренинги.
            Каждый курс создан на основе реальной практики работы с сотнями семей.
            Вы получаете не теорию, а проверенные инструменты.
          </p>
          <a href="#" className={s.btn}>Смотреть курсы</a>
        </div>
      </div>
    </section>
  )
}
