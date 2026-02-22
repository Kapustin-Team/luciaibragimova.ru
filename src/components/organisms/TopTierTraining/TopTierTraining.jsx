import s from './TopTierTraining.module.sass'

export default function TopTierTraining() {
  return (
    <section className={s.section}>
      <div className={s.inner}>
        <div className={s.badge}>
          <span className={s.badgeText}>О Люции</span>
        </div>
        <div className={s.headingWrap}>
          <h2 className={s.heading}>Семейный психолог, которому доверяют сотни семей</h2>
        </div>
        <p className={s.desc}>
          Семейный психолог с 25-летним опытом, автор книг о взаимоотношениях с подростками
          и руководитель психолого-коррекционного Центра для трудных подростков «Время первых».
          Более 10 лет работы с семьями, где подростки отдаляются, грубят, вредят себе.
        </p>
        <a href="#" className={s.btn}>Подробнее о Люции</a>
      </div>
    </section>
  )
}
