import s from './SkillIq.module.sass'

export default function SkillIq() {
  return (
    <section className={s.section}>
      <div className={s.inner}>
        <div className={s.content}>
          <span className={s.badge}>Флагманский курс</span>
          <h2 className={s.heading}>«Вовремя» — 5 модулей, которые вернут доверие с подростком</h2>
          <p className={s.desc}>
            Концентрат 25-летней практики работы с семьями. 5 модулей по 4 видеолекции,
            практические задания и поддержка. Для родителей, которые хотят вернуть контакт
            с подростком, пока не стало слишком поздно.
          </p>
          <a href="#" className={s.btn}>Записаться на курс</a>
        </div>
        <div className={s.imageWrap}>
          <img src="/images/skill-iq.png" alt="Курс Вовремя" className={s.image} />
        </div>
      </div>
    </section>
  )
}
