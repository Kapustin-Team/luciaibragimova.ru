import s from './ForresterWave.module.sass'

export default function ForresterWave() {
  return (
    <section className={s.section}>
      <div className={s.inner}>
        <div className={s.content}>
          <h2 className={s.heading}>
            Автор книг, руководитель центра,{' '}
            <span className={s.leader}>сотни спасённых семей</span>
          </h2>
          <p className={s.desc}>Более 10 лет центр «Время первых» помогает подросткам и их родителям.</p>
          <a href="#" className={s.btn}>Узнать больше</a>
        </div>
        <div className={s.imageWrap}>
          <img src="/images/forrester.png" alt="Достижения Люции Ибрагимовой" className={s.image} />
        </div>
      </div>
    </section>
  )
}
