'use client'
import { motion } from 'framer-motion'
import s from './TrustBlock.module.sass'
import CharReveal from '@/components/atoms/CharReveal'
import SectionReveal from '@/components/atoms/SectionReveal'

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

  return (
    <SectionReveal className={s.section} id="trust">
      <div className={s.inner}>
        <p className={s.label}>{label}</p>
        <CharReveal as="h2" className={s.heading}>
          {heading}
        </CharReveal>

        <div className={s.track}>
          {steps.map((step, i) => {
            const number = step.number || String(i + 1).padStart(2, '0')
            const fallbackImage = DEFAULT_STATS[i]?.image
            const image = step.image?.url || step.image || fallbackImage || null
            const title = step.title || null
            const description = step.description || step.label || null

            return (
              <motion.div
                key={i}
                className={s.card}
                initial={false}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-30px' }}
                transition={{ duration: 0.5, delay: i * 0.1, ease: 'easeOut' }}
              >
                <div className={s.cardContent}>
                  <div className={s.stepNumber}>{number}</div>
                  {title && <div className={s.title}>{title}</div>}
                  {description && <p className={s.description}>{description}</p>}
                </div>
                <div className={s.imageWrap}>
                  {image && (
                    <img
                      className={s.image}
                      src={image}
                      alt={title || description || `Пункт ${number}`}
                      loading="lazy"
                    />
                  )}
                </div>
              </motion.div>
            )
          })}
        </div>
      </div>
    </SectionReveal>
  )
}
