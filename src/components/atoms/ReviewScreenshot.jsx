'use client'
import s from './ReviewScreenshot.module.sass'

const STRAPI_URL = process.env.NEXT_PUBLIC_STRAPI_URL || 'https://luciastrapi.kpstn.ru'

function imgUrl(media) {
  if (!media) return null
  const url = media.url || media.formats?.large?.url || media.formats?.medium?.url
  if (!url) return null
  return url.startsWith('http') ? url : `${STRAPI_URL}${url}`
}

export default function ReviewScreenshot({ review, index = 0, onClick }) {
  const src = imgUrl(review.screenshot)
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
        <img
          src={src}
          alt={`Отзыв ${review.name || ''}`}
          className={s.image}
          loading="lazy"
        />
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

export { imgUrl }
