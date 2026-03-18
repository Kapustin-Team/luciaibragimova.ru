'use client'
import { useEffect, useCallback } from 'react'
import { imgUrl } from './ReviewScreenshot'
import s from './ReviewLightbox.module.sass'

export default function ReviewLightbox({ reviews, currentIndex, onClose, onNavigate }) {
  const review = reviews[currentIndex]
  const src = review ? imgUrl(review.screenshot) : null
  const hasPrev = currentIndex > 0
  const hasNext = currentIndex < reviews.length - 1

  const handleKey = useCallback((e) => {
    if (e.key === 'Escape') onClose()
    if (e.key === 'ArrowLeft' && hasPrev) onNavigate(currentIndex - 1)
    if (e.key === 'ArrowRight' && hasNext) onNavigate(currentIndex + 1)
  }, [onClose, onNavigate, currentIndex, hasPrev, hasNext])

  useEffect(() => {
    document.body.style.overflow = 'hidden'
    window.addEventListener('keydown', handleKey)
    return () => {
      document.body.style.overflow = ''
      window.removeEventListener('keydown', handleKey)
    }
  }, [handleKey])

  if (!src) return null

  return (
    <div className={s.overlay} onClick={onClose}>
      <div className={s.content} onClick={(e) => e.stopPropagation()}>
        <button className={s.close} onClick={onClose} aria-label="Закрыть">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M18 6L6 18M6 6l12 12" />
          </svg>
        </button>

        {hasPrev && (
          <button className={s.navPrev} onClick={() => onNavigate(currentIndex - 1)} aria-label="Предыдущий">
            <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M15 18l-6-6 6-6" />
            </svg>
          </button>
        )}

        <img src={src} alt={`Отзыв ${review.name || ''}`} className={s.image} />

        {hasNext && (
          <button className={s.navNext} onClick={() => onNavigate(currentIndex + 1)} aria-label="Следующий">
            <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M9 18l6-6-6-6" />
            </svg>
          </button>
        )}

        {review.name && (
          <div className={s.caption}>{review.name}</div>
        )}

        <div className={s.counter}>{currentIndex + 1} / {reviews.length}</div>
      </div>
    </div>
  )
}
