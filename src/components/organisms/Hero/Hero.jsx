'use client'
import { useState, useEffect, useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import CharReveal from '@/components/atoms/CharReveal'
import s from './Hero.module.sass'

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

function getMediaUrl(media) {
  if (!media?.url) return null

  const baseUrl = media.url.startsWith('http')
    ? media.url
    : `${process.env.NEXT_PUBLIC_STRAPI_URL || 'https://luciastrapi.kpstn.ru'}${media.url}`

  const version = media.updatedAt || media.hash || media.id
  if (!version) return baseUrl

  const separator = baseUrl.includes('?') ? '&' : '?'
  return `${baseUrl}${separator}v=${encodeURIComponent(version)}`
}

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

  // Subtitle rotation
  const [subtitleIdx, setSubtitleIdx] = useState(0)
  const [fade, setFade] = useState(true)
  const [videoReady, setVideoReady] = useState(false)

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

  const heroRef = useRef(null)
  const { scrollYProgress } = useScroll({ target: heroRef, offset: ['start start', 'end start'] })
  const bgY = useTransform(scrollYProgress, [0, 1], ['0%', '20%'])
  const heroVideo = getMediaUrl(data?.video)
  const heroPoster = getMediaUrl(data?.poster) || getMediaUrl(data?.image) || '/hero/lucia-hero.jpg'

  useEffect(() => {
    setVideoReady(false)
  }, [heroVideo, heroPoster])

  return (
    <section className={s.hero} id="hero" ref={heroRef}>
      {/* Hero background */}
      <div className={s.videoBg}>
        <motion.img
          src={heroPoster}
          alt=""
          className={s.videoBgMedia}
          style={{ y: bgY, opacity: heroVideo && videoReady ? 0 : 1 }}
        />

        {heroVideo && (
          <motion.video
            key={`${heroVideo}-${heroPoster || 'no-poster'}`}
            src={heroVideo}
            poster={heroPoster || undefined}
            className={s.videoBgMedia}
            style={{ y: bgY, opacity: videoReady ? 1 : 0 }}
            autoPlay
            muted
            loop
            playsInline
            preload="metadata"
            onLoadedData={() => setVideoReady(true)}
            onCanPlay={() => setVideoReady(true)}
          />
        )}
        <div className={s.videoOverlay} />
      </div>

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
