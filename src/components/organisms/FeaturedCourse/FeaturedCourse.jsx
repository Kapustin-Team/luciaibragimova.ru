'use client'
import s from './FeaturedCourse.module.sass'
import CharReveal from '@/components/atoms/CharReveal'

const STRAPI_URL = process.env.NEXT_PUBLIC_STRAPI_URL || 'https://luciastrapi.kpstn.ru'

function mediaUrl(media) {
  if (!media) return null
  const url = media.url || media.formats?.large?.url || media.formats?.medium?.url
  if (!url) return null
  return url.startsWith('http') ? url : `${STRAPI_URL}${url}`
}

export default function FeaturedCourse({ data, courses } = {}) {
  const course = data?.course || (courses && courses[0]) || null
  const title = data?.title || course?.title || 'Начните свой путь'
  const description = data?.description || course?.description || 'Откройте для себя программу, которая изменит вашу жизнь.'
  const ctaText = data?.ctaText || 'Подробнее'
  const ctaLink = data?.ctaLink || (course?.slug ? `/courses/${course.slug}` : '#courses')
  const imgSrc = mediaUrl(data?.image || course?.image)

  return (
    <section className={s.section}>
      <div className={s.inner}>
        {imgSrc && (
          <div className={s.imageWrap}>
            <img src={imgSrc} alt={title} className={s.image} />
          </div>
        )}
        <div className={s.panel}>
          <CharReveal as="h2" className={s.title}>{title}</CharReveal>
          <p className={s.desc}>{description}</p>
          <a href={ctaLink} className={s.btn}>{ctaText}</a>
        </div>
      </div>
    </section>
  )
}
