'use client'
import Image from 'next/image'
import s from './ReviewScreenshot.module.sass'

const STRAPI_URL = process.env.NEXT_PUBLIC_STRAPI_URL || 'https://luciastrapi.kpstn.ru'

function mediaUrl(media) {
  if (!media) return null
  const url = media.url || media.formats?.large?.url || media.formats?.medium?.url
  if (!url) return null
  return url.startsWith('http') ? url : `${STRAPI_URL}${url}`
}

function isVideo(review) {
  return !!review.video?.url
}

export default function ReviewScreenshot({ review, index = 0, onClick }) {
  const hasVideo = isVideo(review)
  const src = hasVideo ? mediaUrl(review.video) : mediaUrl(review.screenshot)
  const poster = hasVideo ? mediaUrl(review.screenshot) : null
  if (!src) return null

  const courseName = review.course?.title || ''

  return (
    <figure
      className={s.card}
      style={{ '--i': index }}
      onClick={() => onClick?.(index)}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => e.key === 'Enter' && onClick?.(index)}
    >
      <div className={s.imageWrap}>
        {hasVideo ? (
          <>
            <video src={src} poster={poster || undefined} className={s.image} muted preload="metadata" />
            <div className={s.playOverlay}>
              <svg width="48" height="48" viewBox="0 0 48 48" fill="none">
                <circle cx="24" cy="24" r="24" fill="rgba(0,0,0,0.45)" />
                <path d="M19 15l14 9-14 9V15z" fill="white" />
              </svg>
            </div>
          </>
        ) : (
          <Image
            src={src}
            alt={`Отзыв ${review.name || ''}`}
            className={s.image}
            width={640}
            height={900}
            loading="lazy"
            sizes="(max-width: 768px) 100vw, 33vw"
          />
        )}
      </div>
      {(review.name || courseName) && (
        <figcaption className={s.caption}>
          {review.name && <span className={s.name}>{review.name}</span>}
          {courseName && <span className={s.course}>{courseName}</span>}
        </figcaption>
      )}
    </figure>
  )
}

export { mediaUrl, isVideo }
