'use client'
import s from './Hero.module.sass'

function scrollAndFilter(detail) {
  const el = document.getElementById('courses')
  if (el) el.scrollIntoView({ behavior: 'smooth' })
  window.dispatchEvent(new CustomEvent('filter-courses', { detail }))
}

export default function Hero({ data } = {}) {
  const title = data?.title || 'Верните доверие\nи взаимопонимание\nс подростком'
  const desc = data?.description || 'Авторские программы семейного психолога с 25-летним опытом. Сотни семей уже прошли этот путь.'

  return (
    <section className={s.hero}>
      {/* Decorative shapes */}
      <div className={s.decorCircle1} />
      <div className={s.decorCircle2} />
      <div className={s.decorDots} />

      <div className={s.inner}>
        <div className={s.content}>
          <h1 className={s.title}>
            {title.split('\n').map((line, i, arr) => (
              <span key={i}>{line}{i < arr.length - 1 && <br />}</span>
            ))}
          </h1>
          <p className={s.desc}>{desc}</p>
          <div className={s.buttons}>
            <a href="#courses" className={s.btnPrimary}>Выбрать курс</a>
            <a href="#about" className={s.btnOutline}>Об авторе</a>
          </div>
        </div>

        <div className={s.cards}>
          <button
            type="button"
            className={`${s.card} ${s.cardPink} ${s.cardLeft}`}
            onClick={() => scrollAndFilter({ format: 'Онлайн' })}
          >
            <div className={s.cardHeader}>
              <div className={s.cardTitle}>
                Онлайн-курсы <span className={s.cardArrow}>›</span>
              </div>
              <p className={s.cardDesc}>
                Авторские программы по семейной психологии. Смотрите в удобном темпе.
              </p>
            </div>
          </button>

          <a
            href="#faq"
            className={`${s.card} ${s.cardDark} ${s.cardCenter}`}
          >
            <div className={s.cardHeader}>
              <div className={s.cardTitle}>
                Консультации <span className={s.cardArrow}>›</span>
              </div>
              <p className={s.cardDesc}>
                Индивидуальная работа с психологом. Онлайн или очно в Москве.
              </p>
            </div>
          </a>

          <button
            type="button"
            className={`${s.card} ${s.cardLight} ${s.cardRight}`}
            onClick={() => scrollAndFilter({ format: 'Офлайн' })}
          >
            <div className={s.cardHeader}>
              <div className={s.cardTitle}>
                Живые тренинги <span className={s.cardArrow}>›</span>
              </div>
              <p className={s.cardDesc}>
                Интенсивы и группы для глубокой трансформации. Для всей семьи.
              </p>
            </div>
          </button>
        </div>
      </div>
    </section>
  )
}
