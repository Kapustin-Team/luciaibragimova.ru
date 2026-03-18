'use client'
import { useState } from 'react'
import ReviewScreenshot from '@/components/atoms/ReviewScreenshot'
import ReviewLightbox from '@/components/atoms/ReviewLightbox'
import s from './Reviews.module.sass'

export default function Reviews({ data, reviews: strapiReviews } = {}) {
  const title = data?.title || 'Истории учеников'
  const subtitle = data?.subtitle || 'Реальные результаты реальных людей'
  const [lightboxIndex, setLightboxIndex] = useState(null)

  const mediaReviews = (strapiReviews || []).filter(r => r.screenshot || r.video)

  if (!mediaReviews.length) return null

  return (
    <section className={s.section} id="reviews">
      <div className={s.inner}>
        <div className={s.header}>
          <h2 className={s.title}>{title}</h2>
          <p className={s.subtitle}>{subtitle}</p>
        </div>
        <div className={s.masonry}>
          {mediaReviews.map((r, i) => (
            <ReviewScreenshot key={r.id || i} review={r} index={i} onClick={setLightboxIndex} />
          ))}
        </div>
      </div>
      {lightboxIndex !== null && (
        <ReviewLightbox
          reviews={mediaReviews}
          currentIndex={lightboxIndex}
          onClose={() => setLightboxIndex(null)}
          onNavigate={setLightboxIndex}
        />
      )}
    </section>
  )
}
