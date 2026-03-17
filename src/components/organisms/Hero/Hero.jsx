'use client'
import { useState, useEffect } from 'react'
import s from './Hero.module.sass'

const DEFAULT_SUBTITLES = [
  'Для родителей подростков',
  'Для женщин, которые ищут опору',
  'Для семей в трудный момент',
  'Для тех, кто хочет понять себя и своего ребенка',
]

function scrollAndFilter(detail) {
  const el = document.getElementById('courses')
  if (el) el.scrollIntoView({ behavior: 'smooth' })
  window.dispatchEvent(new CustomEvent('filter-courses', { detail }))
}

export default function Hero({ data } = {}) {
  const title = data?.title || 'Путь к благополучию\nсемьи'
  const strapiSubtitles = Array.isArray(data?.subtitles) && data.subtitles.length > 0
    ? data.subtitles.map(s => s.text || s)
    : null
  const description = data?.description || null
  const ctaPrimary = data?.ctaPrimary || 'Выбрать курс'
  const ctaPrimaryLink = data?.ctaPrimaryLink || '#courses'
  const ctaSecondary = data?.ctaSecondary || 'Не знаю, с чего начать'
  const ctaSecondaryLink = data?.ctaSecondaryLink || '#faq'
  const stats = data?.stats || null
  const location = data?.location || 'Екатеринбург · онлайн по всему миру'
  const cards = data?.cards || [
    { title: 'Онлайн-курсы', desc: 'Авторские программы по семейной психологии. Смотрите в удобном темпе.', action: { type: 'filter', detail: { format: 'Онлайн' } }, style: 'cardPink', position: 'cardLeft' },
    { title: 'Консультации', desc: 'Индивидуальная работа с психологом. Онлайн или очно в Екатеринбурге.', action: { type: 'link', href: '#faq' }, style: 'cardDark', position: 'cardCenter' },
    { title: 'Живые тренинги', desc: 'Интенсивы и группы для глубокой трансформации. Для всей семьи.', action: { type: 'filter', detail: { format: 'Офлайн' } }, style: 'cardLight', position: 'cardRight' },
  ]

  // Rotating subtitles — from Strapi (JSON array) or fallback
  const subtitles = strapiSubtitles || DEFAULT_SUBTITLES
  const [subtitleIdx, setSubtitleIdx] = useState(0)
  const [fade, setFade] = useState(true)

  useEffect(() => {
    if (subtitles.length <= 1) return
    const interval = setInterval(() => {
      setFade(false)
      setTimeout(() => {
        setSubtitleIdx(prev => (prev + 1) % subtitles.length)
        setFade(true)
      }, 400)
    }, 4000)
    return () => clearInterval(interval)
  }, [subtitles.length])

  return (
    <>
      <section className={s.hero}>
        <div className={s.decorCircle1} />
        <div className={s.decorCircle2} />
        <div className={s.decorDots} />

        <div className={s.inner}>
          <div className={s.topRow}>
            <div className={s.content}>
              <h1 className={s.title}>
                {title.split('\n').map((line, i, arr) => (
                  <span key={i}>{line}{i < arr.length - 1 && <br />}</span>
                ))}
              </h1>
              <p className={`${s.desc} ${subtitles.length > 1 ? (fade ? s.fadeIn : s.fadeOut) : ''}`}>
                {description || subtitles[subtitleIdx]}
              </p>
              <div className={s.buttons}>
                <a href={ctaPrimaryLink} className={s.btnPrimary}>{ctaPrimary}</a>
                <a href={ctaSecondaryLink} className={s.btnOutline}>{ctaSecondary}</a>
              </div>
              <div className={s.location}>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/>
                  <circle cx="12" cy="10" r="3"/>
                </svg>
                <span>{location}</span>
              </div>
            </div>

            <div className={s.videoWrap}>
              <iframe
                className={s.video}
                src="https://kinescope.io/embed/o1ZLJ9qRpjsF3acNkduExU"
                allow="autoplay; fullscreen; picture-in-picture; encrypted-media; gyroscope; accelerometer; clipboard-write; web-share"
                frameBorder="0"
                allowFullScreen
              />
            </div>
          </div>
        </div>
      </section>

      <div className={s.cardsWrapper}>
        <div className={s.cards}>
          {cards.map((card, i) => {
            const cls = `${s.card} ${s[card.style] || ''} ${s[card.position] || ''}`
            function handleClick() {
              if (card.action?.type === 'link' && card.action.href) {
                const el = document.querySelector(card.action.href)
                if (el) el.scrollIntoView({ behavior: 'smooth' })
              } else if (card.action?.detail) {
                scrollAndFilter(card.action.detail)
              }
            }
            return (
              <button
                key={i}
                type="button"
                className={cls}
                onClick={handleClick}
              >
                <div className={s.cardHeader}>
                  <div className={s.cardTitle}>
                    {card.title} <span className={s.cardArrow}>›</span>
                  </div>
                  <p className={s.cardDesc}>{card.desc}</p>
                </div>
              </button>
            )
          })}
        </div>
      </div>
    </>
  )
}
