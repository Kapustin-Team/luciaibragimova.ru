'use client'
import Image from 'next/image'
import { motion } from 'framer-motion'
import CharReveal from '@/components/atoms/CharReveal'
import SectionReveal from '@/components/atoms/SectionReveal'
import s from './Directions.module.sass'

const STRAPI_URL = process.env.NEXT_PUBLIC_STRAPI_URL || 'https://luciastrapi.kpstn.ru'

function mediaUrl(media) {
  if (!media) return null
  const url = typeof media === 'string' ? media : media.url || media.formats?.large?.url || media.formats?.medium?.url || media.formats?.small?.url
  if (!url) return null
  return url.startsWith('http') || (url.startsWith('/') && !url.startsWith('/uploads')) ? url : `${STRAPI_URL}${url}`
}

const FALLBACK_DIRS = [
  { title: 'Рождение семьи', desc: 'Курсы для молодых пар, будущих мам и начинающих родителей.', count: 3, image: '/directions/dir-family.webp' },
  { title: 'Здоровое взросление', desc: 'Работа с подростками и их родителями. Курс «Вовремя» и другие.', count: 4, image: '/directions/dir-growing.webp' },
  { title: 'Развитие', desc: 'Тренинги уверенности, коммуникации и самопознания для всей семьи.', count: 4, image: '/directions/dir-development.webp' },
  { title: 'Трансформация', desc: 'Глубинная работа с выгоранием и поиском внутренней опоры.', count: 3, image: '/directions/dir-transformation.webp' },
]

// Local fallback images by keyword match
const LOCAL_IMAGES = [
  { keywords: ['рождение', 'семьи', 'семья'], image: '/directions/dir-family.webp' },
  { keywords: ['взросление', 'подросток', 'здоровое'], image: '/directions/dir-growing.webp' },
  { keywords: ['развитие', 'детей', 'взрослых'], image: '/directions/dir-development.webp' },
  { keywords: ['трансформация', 'духовно', 'нравственная'], image: '/directions/dir-transformation.webp' },
]

function findLocalImage(title) {
  const lower = (title || '').toLowerCase()
  const match = LOCAL_IMAGES.find(entry => entry.keywords.some(kw => lower.includes(kw)))
  return match?.image || null
}

function handleClick(e, dirTitle) {
  e.preventDefault()
  const el = document.getElementById('courses')
  if (el) el.scrollIntoView({ behavior: 'smooth' })
  window.dispatchEvent(new CustomEvent('filter-courses', { detail: { direction: dirTitle } }))
}

function normalizeDirections(strapiDirections) {
  if (!strapiDirections?.length) return FALLBACK_DIRS
  return strapiDirections.map(d => ({
    title: d.title,
    desc: d.description || d.shortDescription || '',
    count: d.coursesCount || d.courses?.length || 0,
    image: mediaUrl(d.image) || findLocalImage(d.title),
  }))
}

export default function Directions({ data, directions: strapiDirections } = {}) {
  const title = data?.title || 'Направления обучения'
  const subtitle = data?.subtitle || 'Выберите то, что актуально для вашей семьи'
  const dirs = normalizeDirections(strapiDirections)

  return (
    <SectionReveal className={s.section} id="directions">
      <div className={s.inner}>
        <div className={s.header}>
          <CharReveal as="h2" className={s.sectionTitle}>{title}</CharReveal>
          <p className={s.sectionSubtitle}>{subtitle}</p>
        </div>
        <div className={s.grid}>
          {dirs.map((d, i) => (
            <motion.div
              key={d.title}
              initial={false}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-30px' }}
              transition={{ duration: 0.5, delay: i * 0.1, ease: 'easeOut' }}
            >
              <a
                href="#courses"
                className={s.card}
                onClick={(e) => handleClick(e, d.title)}
              >
                {d.image && (
                  <div className={s.cardImageWrap}>
                    <Image
                      src={d.image}
                      alt={d.title}
                      className={s.cardImage}
                      width={640}
                      height={360}
                      loading="lazy"
                      sizes="(max-width: 768px) 100vw, 25vw"
                    />
                  </div>
                )}
                <div className={s.cardBody}>
                  {d.count > 0 && <span className={s.cardCount}>{d.count} программы</span>}
                  <h3 className={s.cardTitle}>{d.title}</h3>
                  <p className={s.cardDesc}>{d.desc}</p>
                  <span className={s.cardLink}>Смотреть →</span>
                </div>
              </a>
            </motion.div>
          ))}
        </div>
      </div>
    </SectionReveal>
  )
}
