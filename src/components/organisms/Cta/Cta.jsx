'use client'
import s from './Cta.module.sass'

const STRAPI_URL = process.env.NEXT_PUBLIC_STRAPI_URL || 'https://luciastrapi.kpstn.ru'

function imageUrl(media) {
  if (!media) return null
  const url = media.url || media.formats?.large?.url || media.formats?.medium?.url
  if (!url) return null
  return url.startsWith('http') ? url : `${STRAPI_URL}${url}`
}

export default function Cta({ data } = {}) {
  const title = data?.title || 'Начните путь к гармонии'
  const subtitle = data?.subtitle || 'Выберите программу — онлайн, офлайн или гибрид.'
  const ctaPrimary = data?.ctaPrimary || 'Выбрать курс'
  const ctaPrimaryLink = data?.ctaPrimaryLink || '#courses'
  const imgSrc = imageUrl(data?.image)

  return (
    <section className={s.section}>
      <div className={imgSrc ? s.split : s.splitNoImage}>
        {imgSrc && (
          <div className={s.imageCol}>
            <img src={imgSrc} alt="" className={s.image} />
          </div>
        )}
        <div className={s.contentCol}>
          <h2 className={s.title}>{title}</h2>
          <p className={s.subtitle}>{subtitle}</p>
          <a href={ctaPrimaryLink} className={s.linkBtn}>
            {ctaPrimary}
            <span className={s.arrow}>&rarr;</span>
          </a>
        </div>
      </div>
    </section>
  )
}
