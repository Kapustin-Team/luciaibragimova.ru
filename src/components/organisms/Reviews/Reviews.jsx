'use client'
import { useState, useEffect, useCallback } from 'react'
import SectionReveal from '@/components/atoms/SectionReveal'
import ReviewScreenshot from '@/components/atoms/ReviewScreenshot'
import ReviewLightbox from '@/components/atoms/ReviewLightbox'
import s from './Reviews.module.sass'

export default function Reviews({ data, reviews: strapiReviews } = {}) {
  const [activeIndex, setActiveIndex] = useState(0)
  const [lightboxIndex, setLightboxIndex] = useState(null)
  const [isPaused, setIsPaused] = useState(false)

  const mediaReviews = (strapiReviews || []).filter(r => r.screenshot || r.video)

  const goNext = useCallback(() => {
    if (mediaReviews.length <= 1) return
    setActiveIndex(prev => (prev + 1) % mediaReviews.length)
  }, [mediaReviews.length])

  const goPrev = useCallback(() => {
    if (mediaReviews.length <= 1) return
    setActiveIndex(prev => (prev - 1 + mediaReviews.length) % mediaReviews.length)
  }, [mediaReviews.length])

  useEffect(() => {
    if (isPaused || mediaReviews.length <= 1) return
    const timer = setInterval(goNext, 6000)
    return () => clearInterval(timer)
  }, [isPaused, goNext, mediaReviews.length])

  if (!mediaReviews.length) return null

  return (
    <SectionReveal className={s.section} id="reviews">
      <div className={s.inner}>
        <div
          className={s.carousel}
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
        >
          {mediaReviews.length > 1 && (
            <button className={s.arrowLeft} onClick={goPrev} aria-label="Предыдущий отзыв">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                <path d="M15 18l-6-6 6-6" />
              </svg>
            </button>
          )}
          <div className={s.slide}>
            <ReviewScreenshot
              key={activeIndex}
              review={mediaReviews[activeIndex]}
              index={activeIndex}
              onClick={() => setLightboxIndex(activeIndex)}
            />
          </div>
          {mediaReviews.length > 1 && (
            <button className={s.arrowRight} onClick={goNext} aria-label="Следующий отзыв">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                <path d="M9 18l6-6-6-6" />
              </svg>
            </button>
          )}
        </div>
        {mediaReviews.length > 1 && (
          <div className={s.dots}>
            {mediaReviews.map((_, i) => (
              <button
                key={i}
                className={i === activeIndex ? s.dotActive : s.dot}
                onClick={() => setActiveIndex(i)}
                aria-label={`Отзыв ${i + 1}`}
              />
            ))}
          </div>
        )}
      </div>
      {lightboxIndex !== null && (
        <ReviewLightbox
          reviews={mediaReviews}
          currentIndex={lightboxIndex}
          onClose={() => setLightboxIndex(null)}
          onNavigate={setLightboxIndex}
        />
      )}
    </SectionReveal>
  )
}
