import s from './Hero.module.sass'

export default function Hero() {
  return (
    <section className={s.hero}>
      <div className={s.inner}>
        <div className={s.content}>
          <h1 className={s.title}>
            Верните доверие{'\n'}и взаимопонимание{'\n'}с подростком
          </h1>
          <p className={s.desc}>
            Авторские программы семейного психолога с 25-летним опытом.
            Сотни семей уже прошли этот путь.
          </p>
          <div className={s.stat}>
            <div className={s.statIcon}>
              <img src="/images/course-icon.svg" alt="" width={32} height={32} />
            </div>
            <span className={s.statText}>25 лет опыта · 500+ семей · 14 курсов</span>
          </div>
          <div className={s.buttons}>
            <a href="#" className={s.btnPrimary}>Выбрать курс</a>
            <a href="#" className={s.btnOutline}>Бесплатная консультация</a>
          </div>
        </div>
        <div className={s.imageWrap}>
          <img src="/images/hero.png" alt="Люция Ибрагимова" className={s.heroImage} />
        </div>
      </div>
    </section>
  )
}
