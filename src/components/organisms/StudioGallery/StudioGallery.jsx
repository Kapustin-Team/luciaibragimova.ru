'use client'

import { useCallback, useEffect, useRef, useState } from 'react'
import Image from 'next/image'
import { motion, useInView } from 'framer-motion'
import CharReveal from '@/components/atoms/CharReveal'
import SectionReveal from '@/components/atoms/SectionReveal'
import { DEFAULT_STUDIO_GALLERY } from '@/lib/siteDefaults'
import s from './StudioGallery.module.sass'

const STRAPI_URL = process.env.NEXT_PUBLIC_STRAPI_URL || 'https://admin.lucia.school'

function mediaUrl(media) {
  const url = media?.formats?.large?.url || media?.url
  if (!url) return null
  return url.startsWith('http') ? url : `${STRAPI_URL}${url}`
}

function normalize(data) {
  const items = Array.isArray(data?.items)
    ? data.items
        .map((item) => ({ src: mediaUrl(item.image), caption: item.caption || '' }))
        .filter((item) => item.src)
    : []
  return {
    title: data?.title || DEFAULT_STUDIO_GALLERY.title,
    subtitle: data?.subtitle ?? DEFAULT_STUDIO_GALLERY.subtitle,
    items: items.length > 0 ? items : DEFAULT_STUDIO_GALLERY.items,
  }
}

const ArrowIcon = ({ direction }) => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    {direction === 'left' ? <path d="M15 18l-6-6 6-6" /> : <path d="M9 18l6-6-6-6" />}
  </svg>
)

export default function StudioGallery({ data } = {}) {
  const { title, subtitle, items } = normalize(data)

  const trackRef = useRef(null)
  const inView = useInView(trackRef, { once: true, amount: 0.15 })
  const [canPrev, setCanPrev] = useState(false)
  const [canNext, setCanNext] = useState(true)

  const updateArrows = useCallback(() => {
    const el = trackRef.current
    if (!el) return
    setCanPrev(el.scrollLeft > 4)
    setCanNext(el.scrollLeft + el.clientWidth < el.scrollWidth - 4)
  }, [])

  useEffect(() => {
    updateArrows()
    window.addEventListener('resize', updateArrows)
    return () => window.removeEventListener('resize', updateArrows)
  }, [updateArrows, items.length])

  function scrollByCard(direction) {
    const el = trackRef.current
    if (!el) return
    const card = el.querySelector('[data-card]')
    const step = card ? card.getBoundingClientRect().width + 24 : el.clientWidth * 0.8
    el.scrollBy({ left: direction * step, behavior: 'smooth' })
  }

  return (
    <SectionReveal className={s.section} id="studio">
      <div className={s.inner}>
        <div className={s.head}>
          <div>
            <CharReveal as="h2" className={s.heading}>{title}</CharReveal>
            {subtitle && <p className={s.subtitle}>{subtitle}</p>}
          </div>
          <div className={s.arrows}>
            <button
              type="button"
              className={s.arrow}
              onClick={() => scrollByCard(-1)}
              disabled={!canPrev}
              aria-label="Предыдущее фото"
            >
              <ArrowIcon direction="left" />
            </button>
            <button
              type="button"
              className={s.arrow}
              onClick={() => scrollByCard(1)}
              disabled={!canNext}
              aria-label="Следующее фото"
            >
              <ArrowIcon direction="right" />
            </button>
          </div>
        </div>
      </div>

      <div className={s.track} ref={trackRef} onScroll={updateArrows}>
        {items.map((item, i) => (
          <motion.figure
            key={`${item.src}-${i}`}
            className={s.card}
            data-card
            initial={{ opacity: 0, y: 30 }}
            animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
            transition={{ duration: 0.5, ease: 'easeOut', delay: Math.min(i, 4) * 0.08 }}
          >
            <div className={s.imageWrap}>
              <Image
                src={item.src}
                alt={item.caption || 'Интерьер студии'}
                fill
                sizes="(max-width: 600px) 82vw, (max-width: 1100px) 55vw, 40vw"
                className={s.image}
              />
            </div>
            {item.caption && <figcaption className={s.caption}>{item.caption}</figcaption>}
          </motion.figure>
        ))}
      </div>
    </SectionReveal>
  )
}
