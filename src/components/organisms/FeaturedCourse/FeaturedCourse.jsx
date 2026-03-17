'use client'
import s from './FeaturedCourse.module.sass'

const DEFAULT_FEATURES = [
  { icon: 'monitor', label: '5 модулей', desc: '20 видео-лекций' },
  { icon: 'clock', label: 'В своём темпе', desc: 'Доступ навсегда' },
  { icon: 'users', label: '100% онлайн', desc: 'Чат поддержки' },
]

const ICONS = {
  monitor: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="2" y="3" width="20" height="14" rx="2" /><path d="M8 21h8M12 17v4" /></svg>,
  clock: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10" /><path d="M12 6v6l4 2" /></svg>,
  users: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2" /><circle cx="9" cy="7" r="4" /><path d="M23 21v-2a4 4 0 00-3-3.87M16 3.13a4 4 0 010 7.75" /></svg>,
}

export default function FeaturedCourse({ data } = {}) {
  const label = data?.label || 'Бестселлер'
  const title = data?.title || 'Вовремя'
  const description = data?.description || 'Ваш подросток отдаляется, грубит, вредит себе? Курс «Вовремя» — это 5 модулей глубинной работы с отношениями. Вы научитесь слышать, понимать и восстанавливать доверие.'
  const ctaText = data?.ctaText || 'Записаться на курс'
  const ctaLink = data?.ctaLink || '/courses/vovremya'
  const imageUrl = data?.image?.url || '/courses/course-vovremya.webp'
  const quote = data?.quote || '«Каждый родитель способен стать для подростка опорой, а не источником конфликта»'
  const quoteAuthor = data?.quoteAuthor || '— Люция Ибрагимова'
  // Strapi stats can be object {format, modules, lectures} or array
  const rawStats = data?.stats
  let features = DEFAULT_FEATURES
  if (Array.isArray(rawStats) && rawStats.length) {
    features = rawStats
  } else if (rawStats && typeof rawStats === 'object') {
    features = [
      { icon: 'monitor', label: `${rawStats.modules || 5} модулей`, desc: `${rawStats.lectures || 20} видео-лекций` },
      { icon: 'clock', label: 'В своём темпе', desc: 'Доступ навсегда' },
      { icon: 'users', label: rawStats.format || '100% онлайн', desc: 'Чат поддержки' },
    ]
  }

  return (
    <section className={s.section}>
      <div className={s.decorCircle} />
      <div className={s.decorDots} />
      <div className={s.inner}>
        <div className={s.topRow}>
          <div className={s.content}>
            <span className={s.badge}>{label}</span>
            <h2 className={s.title}>{title}</h2>
            <p className={s.subtitle}>{data?.subtitle || 'Системный курс для родителей подростков'}</p>
            <p className={s.desc}>{description}</p>
            {quote && (
              <blockquote className={s.quote}>
                {quote}
                {quoteAuthor && <cite className={s.quoteAuthor}>{quoteAuthor}</cite>}
              </blockquote>
            )}
          </div>
          <div className={s.visual}>
            <div className={s.imageFrame}>
              <img src={imageUrl} alt={title} className={s.image} />
              <div className={s.imageAccent} />
            </div>
          </div>
        </div>
        <div className={s.features}>
          {features.map((f, i) => (
            <div key={i} className={s.featureItem}>
              <div className={s.featureIconWrap}>
                {ICONS[f.icon] ? <span className={s.featureIcon}>{ICONS[f.icon]}</span> : <span className={s.featureIcon}>{ICONS.monitor}</span>}
              </div>
              <div>
                <span className={s.featureLabel}>{f.label}</span>
                <span className={s.featureDesc}>{f.desc}</span>
              </div>
            </div>
          ))}
        </div>
        <a href={ctaLink} className={s.btn}>
          {ctaText}
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M5 12h14M12 5l7 7-7 7" /></svg>
        </a>
      </div>
    </section>
  )
}
