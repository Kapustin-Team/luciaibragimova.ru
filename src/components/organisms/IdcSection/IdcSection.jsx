import s from './IdcSection.module.sass'

export default function IdcSection() {
  return (
    <section className={s.section}>
      <div className={s.inner}>
        <div className={s.bg}>
          <img src="/images/idc-bg.png" alt="" className={s.bgImage} />
        </div>
        <div className={s.content}>
          <h2 className={s.heading}>
            Центр{' '}
            <span className={s.leader}>«Время первых»</span>
          </h2>
          <p className={s.desc}>Более 10 лет работаем с подростками, которых другие специалисты называют безнадёжными. Подростки возвращались в школу, снимались с учётов в КДН и ПДН.</p>
          <a href="#" className={s.btn}>О центре</a>
        </div>
      </div>
    </section>
  )
}
