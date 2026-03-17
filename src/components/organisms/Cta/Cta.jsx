'use client'
import s from './Cta.module.sass'

export default function Cta({ data } = {}) {
  const title = data?.title || 'Начните путь\nк гармонии'
  const subtitle = data?.subtitle || 'Выберите программу — онлайн, офлайн или гибрид.'
  const ctaPrimary = data?.ctaPrimary || 'Выбрать курс'
  const ctaPrimaryLink = data?.ctaPrimaryLink || '#courses'
  const ctaSecondary = data?.ctaSecondary || null
  const ctaSecondaryLink = data?.ctaSecondaryLink || '#contact'

  return (
    <section className={s.section}>
      <div className={s.decorCircle1} />
      <div className={s.decorCircle2} />
      <div className={s.decorDots} />
      <div className={s.outer}>
        <div className={s.card}>
          <h2 className={s.title} dangerouslySetInnerHTML={{ __html: title.replace(/\n/g, '<br />') }} />
          <p className={s.subtitle}>{subtitle}</p>
          <div className={s.buttons}>
            <a href={ctaPrimaryLink} className={s.btnPrimary}>{ctaPrimary}</a>
            {ctaSecondary && (
              <a href={ctaSecondaryLink} className={s.btnOutline}>{ctaSecondary}</a>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}
