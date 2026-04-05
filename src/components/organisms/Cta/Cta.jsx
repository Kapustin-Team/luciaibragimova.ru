'use client'
import SectionReveal from '@/components/atoms/SectionReveal'
import s from './Cta.module.sass'

const STRAPI_URL = process.env.NEXT_PUBLIC_STRAPI_URL || 'https://luciastrapi.kpstn.ru'

function imageUrl(media) {
  if (!media) return null
  const url = media.url || media.formats?.large?.url || media.formats?.medium?.url
  if (!url) return null
  return url.startsWith('http') ? url : `${STRAPI_URL}${url}`
}

export default function Cta({ data } = {}) {
  const src = imageUrl(data?.image) || '/interrior/img285.jpg'

  return (
    <SectionReveal className={s.section}>
      <img src={src} alt="" className={s.image} />
    </SectionReveal>
  )
}
