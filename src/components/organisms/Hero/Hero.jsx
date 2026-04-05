'use client'
import { useState, useEffect } from 'react'
import CharReveal from '@/components/atoms/CharReveal'
import s from './Hero.module.sass'

const STRAPI_URL = process.env.NEXT_PUBLIC_STRAPI_URL || ''

const DEFAULT_SUBTITLES = [
  'Для родителей подростков',
  'Для женщин, которые ищут опору',
  'Для семей в трудный момент',
  'Для тех, кто хочет понять себя и своего ребенка',
]

const DEFAULT_BUTTONS = [
  { label: 'Выбрать курс', href: '#courses', variant: 'primary' },
  { label: 'Бесплатная консультация', href: '#contact', variant: 'filled' },
]

export default function Hero({ data } = {}) {
  const title = data?.title || 'Путь к благополучию\nсемьи'
  const description = data?.description || null

  // Tags / list items (badge pills above title)
  const tags = Array.isArray(data?.list) && data.list.length > 0
    ? data.list.map(item => item.text || item)
    : null

  // Rotating subtitles — only when no description and no tags
  const strapiSubtitles = Array.isArray(data?.subtitles) && data.subtitles.length > 0
    ? data.subtitles.map(s => s.text || s)
    : data?.subtitle ? [data.subtitle]
    : null
  const subtitles = strapiSubtitles || DEFAULT_SUBTITLES

  // Buttons from Strapi ctaPrimary/ctaSecondary or defaults
  const buttons = data?.ctaPrimary
    ? [
        { label: data.ctaPrimary, href: data.ctaPrimaryLink || '#', variant: 'primary' },
        ...(data.ctaSecondary ? [{ label: data.ctaSecondary, href: data.ctaSecondaryLink || '#', variant: 'filled' }] : []),
      ]
    : DEFAULT_BUTTONS

  // Video background
  const rawVideoUrl = data?.video?.url
  const videoUrl = rawVideoUrl
    ? (rawVideoUrl.startsWith('http') ? rawVideoUrl : STRAPI_URL + rawVideoUrl)
    : null
  const rawPosterUrl = data?.poster?.url
  const posterUrl = rawPosterUrl
    ? (rawPosterUrl.startsWith('http') ? rawPosterUrl : STRAPI_URL + rawPosterUrl)
    : null

  // Subtitle rotation
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

  const variantClass = {
    primary: s.btnPrimary,
    filled: s.btnFilled,
    outline: s.btnOutline,
  }

  return (
    <section className={s.hero} id="hero">
      {/* Full-screen background video */}
      {videoUrl ? (
        <div className={s.videoBg}>
          <video
            autoPlay
            loop
            muted
            playsInline
            className={s.videoBgMedia}
            poster={posterUrl || undefined}
            src={videoUrl}
          />
          <div className={s.videoOverlay} />
        </div>
      ) : posterUrl ? (
        <div className={s.videoBg}>
          <img src={posterUrl} alt="" className={s.videoBgMedia} />
          <div className={s.videoOverlay} />
        </div>
      ) : (
        <div className={s.videoBg}>
          <img src="/images/hero.png" alt="" className={s.videoBgMedia} />
          <div className={s.videoOverlay} />
        </div>
      )}

      <div className={s.inner}>
        {/* Tags / pills */}
        {tags && (
          <ul className={s.tags}>
            {tags.map((tag, i) => (
              <li key={i} className={s.tag}>{tag}</li>
            ))}
          </ul>
        )}

        {/* Title */}
        <CharReveal as="h1" className={s.title}>
          {title.split('\n').map((line, i, arr) => (
            <span key={i}>{line}{i < arr.length - 1 && <br />}</span>
          ))}
        </CharReveal>

        {/* Description or rotating subtitle */}
        {description ? (
          <p className={s.desc}>{description}</p>
        ) : (
          <p className={`${s.desc} ${subtitles.length > 1 ? (fade ? s.fadeIn : s.fadeOut) : ''}`}>
            {subtitles[subtitleIdx]}
          </p>
        )}

        {/* Buttons */}
        <div className={s.buttons}>
          {buttons.map((btn, i) => (
            <a
              key={i}
              href={btn.href || '#'}
              className={variantClass[btn.variant] || s.btnPrimary}
            >
              {btn.label}
            </a>
          ))}
        </div>
      </div>
    </section>
  )
}
