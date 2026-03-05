'use client'
import s from './Hero.module.sass'

export default function Hero({ data } = {}) {
  const title = data?.title || 'Верните доверие\nи взаимопонимание\nс подростком'
  const desc = data?.description || 'Авторские программы семейного психолога с 25-летним опытом. Сотни семей уже прошли этот путь.'
  const ctaPrimary = data?.ctaPrimary || 'Выбрать курс'
  const ctaPrimaryLink = data?.ctaPrimaryLink || '#courses'
  const ctaSecondary = data?.ctaSecondary || 'Бесплатная консультация'
  const ctaSecondaryLink = data?.ctaSecondaryLink || '#'

  return (
    <section className={s.hero}>
      <div className={s.inner}>
        <div className={s.content}>
          <h1 className={s.title}>
            {title.split('\n').map((line, i, arr) => (
              <span key={i}>{line}{i < arr.length - 1 && <br />}</span>
            ))}
          </h1>
          <p className={s.desc}>{desc}</p>
          <div className={s.buttons}>
            <a href={ctaPrimaryLink} className={s.btnPrimary}>{ctaPrimary}</a>
            <a href={ctaSecondaryLink} className={s.btnOutline}>{ctaSecondary}</a>
          </div>
        </div>

        <div className={s.cards}>
          {/* Card 1 — Orange */}
          <div className={`${s.card} ${s.cardOrange} ${s.cardLeft}`}>
            <div className={s.cardHeader}>
              <div className={`${s.cardTitle} ${s.cardTitleOrange}`}>
                Онлайн-курсы <span className={s.cardArrow}>›</span>
              </div>
              <p className={`${s.cardDesc} ${s.cardDescOrange}`}>
                Авторские программы по семейной психологии. Смотрите в удобном темпе.
              </p>
            </div>
            <div className={s.cardImage}>
              <div className={s.cardPattern}>
                <div className={`${s.patternRow} ${s.patternRowWide}`} />
                <div className={`${s.patternRow} ${s.patternRowMedium}`} />
                <div className={s.patternBlock} />
                <div className={`${s.patternRow} ${s.patternRowShort}`} />
                <div className={`${s.patternRow} ${s.patternRowMedium}`} />
              </div>
            </div>
          </div>

          {/* Card 2 — Blue (center, no tilt) */}
          <div className={`${s.card} ${s.cardBlue} ${s.cardCenter}`}>
            <div className={s.cardHeader}>
              <div className={`${s.cardTitle} ${s.cardTitleBlue}`}>
                Консультации <span className={s.cardArrow}>›</span>
              </div>
              <p className={`${s.cardDesc} ${s.cardDescBlue}`}>
                Индивидуальная работа с психологом. Онлайн или очно в Москве.
              </p>
            </div>
            <div className={s.cardImage}>
              <div className={s.cardPattern}>
                <div className={`${s.patternRow} ${s.patternRowMedium}`} />
                <div className={s.patternBlock} />
                <div className={`${s.patternRow} ${s.patternRowWide}`} />
                <div className={`${s.patternRow} ${s.patternRowShort}`} />
                <div className={s.patternBlock} style={{ height: 32 }} />
              </div>
            </div>
          </div>

          {/* Card 3 — Purple */}
          <div className={`${s.card} ${s.cardPurple} ${s.cardRight}`}>
            <div className={s.cardHeader}>
              <div className={`${s.cardTitle} ${s.cardTitlePurple}`}>
                Живые тренинги <span className={s.cardArrow}>›</span>
              </div>
              <p className={`${s.cardDesc} ${s.cardDescPurple}`}>
                Интенсивы и группы для глубокой трансформации. Для всей семьи.
              </p>
            </div>
            <div className={s.cardImage}>
              <div className={s.cardPattern}>
                <div className={`${s.patternRow} ${s.patternRowShort}`} />
                <div className={s.patternBlock} style={{ height: 44 }} />
                <div className={`${s.patternRow} ${s.patternRowWide}`} />
                <div className={`${s.patternRow} ${s.patternRowMedium}`} />
                <div className={s.patternBlock} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
