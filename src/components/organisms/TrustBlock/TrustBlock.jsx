'use client'
import { useRef } from 'react'
import Image from 'next/image'
import { motion, useInView } from 'framer-motion'
import s from './TrustBlock.module.sass'
import CharReveal from '@/components/atoms/CharReveal'
import SectionReveal from '@/components/atoms/SectionReveal'

const STRAPI_URL = process.env.NEXT_PUBLIC_STRAPI_URL || 'https://luciastrapi.kpstn.ru'

function mediaUrl(media) {
  if (!media) return null
  const url = typeof media === 'string' ? media : media.url || media.formats?.large?.url || media.formats?.medium?.url || media.formats?.small?.url
  if (!url) return null
  return url.startsWith('http') || (url.startsWith('/') && !url.startsWith('/uploads')) ? url : `${STRAPI_URL}${url}`
}

const trackVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.12 } },
}

const cardVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: 'easeOut' } },
}

const DEFAULT_STATS = [
  {
    number: '25+',
    label: 'лет практики',
    image: '/interrior/img224.jpg',
  },
  {
    number: '3677+',
    label: 'семей прошли через программы Люции',
    image: '/interrior/img247.jpg',
  },
  {
    number: '14',
    label: 'авторских программ и курсов',
    image: '/interrior/img225.jpg',
  },
  {
    number: '10+',
    label: 'лет работы с трудными подростками',
    image: '/interrior/img266.jpg',
  },
]

export default function TrustBlock({ data } = {}) {
  const hasSteps = Array.isArray(data?.steps) && data.steps.length > 0
  const hasStats = Array.isArray(data?.stats) && data.stats.length > 0

  const label = data?.label || (hasSteps ? 'Процесс' : 'Опыт в цифрах')
  const heading =
    data?.title ||
    (hasSteps
      ? 'Каждый шаг продуман, чтобы дать вам уверенность и профессиональные навыки'
      : 'Опыт, которому доверяют семьи')

  const steps = hasSteps
    ? data.steps.slice(0, 4)
    : hasStats
      ? data.stats.slice(0, 4)
      : DEFAULT_STATS

  const trackRef = useRef(null)
  const trackInView = useInView(trackRef, { once: true, amount: 0.15 })

  return (
    <SectionReveal className={s.section} id="trust">
      <div className={s.inner}>
        <p className={s.label}>{label}</p>
        <CharReveal as="h2" className={s.heading}>
          {heading}
        </CharReveal>

        <motion.div
          ref={trackRef}
          className={s.track}
          variants={trackVariants}
          initial="hidden"
          animate={trackInView ? 'visible' : 'hidden'}
        >
          {steps.map((step, i) => {
            const number = step.number || String(i + 1).padStart(2, '0')
            const fallbackImage = DEFAULT_STATS[i]?.image
            const image = mediaUrl(step.image) || fallbackImage || null
            const title = step.title || null
            const description = step.description || step.label || null

            return (
              <motion.div
                key={i}
                className={s.card}
                variants={cardVariants}
              >
                <div className={s.cardContent}>
                  <div className={s.stepNumber}>{number}</div>
                  {title && <div className={s.title}>{title}</div>}
                  {description && <p className={s.description}>{description}</p>}
                </div>
                <div className={s.imageWrap}>
                  {image && (
                    <Image
                      className={s.image}
                      src={image}
                      alt={title || description || `Пункт ${number}`}
                      width={420}
                      height={280}
                      loading="lazy"
                      sizes="(max-width: 768px) 100vw, 25vw"
                    />
                  )}
                </div>
              </motion.div>
            )
          })}
        </motion.div>
      </div>
    </SectionReveal>
  )
}
