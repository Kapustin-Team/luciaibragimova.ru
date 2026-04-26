'use client'
import { useState, useEffect, useRef } from 'react'
import Image from 'next/image'
import { motion, useInView } from 'framer-motion'
import CharReveal from '@/components/atoms/CharReveal'
import SectionReveal from '@/components/atoms/SectionReveal'
import s from './Courses.module.sass'

const STRAPI_URL = process.env.NEXT_PUBLIC_STRAPI_URL || 'https://luciastrapi.kpstn.ru'

function mediaUrl(media) {
  if (!media) return null
  const url = typeof media === 'string' ? media : media.url || media.formats?.large?.url || media.formats?.medium?.url || media.formats?.small?.url
  if (!url) return null
  return url.startsWith('http') || (url.startsWith('/') && !url.startsWith('/uploads')) ? url : `${STRAPI_URL}${url}`
}

const gridVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.08, delayChildren: 0.05 } },
}

const cardVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: 'easeOut' } },
}

const FORMAT_MAP = { online: 'Онлайн', offline: 'Офлайн', hybrid: 'Гибрид' }

const COURSE_IMAGES = {
  'rozhdenie-molodoj-semi': '/courses/course-rozhdenie-semi.webp',
  'mama-zdes': '/courses/course-mama-zdes.webp',
  'lyogkost-materinstva': '/courses/course-lyogkost-materinstva.webp',
  'vovremya': '/courses/course-vovremya.webp',
  'podgotovka-ege-oge': '/courses/course-podgotovka-ege.webp',
  'odin-za-vsekh': '/courses/course-odin-za-vsekh.webp',
  'lyogkost-adaptacii': '/courses/course-lyogkost-adaptacii.webp',
  'svoi-lyudi': '/courses/course-svoi-lyudi.webp',
  'podium': '/courses/course-podium.webp',
  'svet-nochi': '/courses/course-svet-nochi.webp',
  'v-and-d': '/courses/course-v-and-d.webp',
  'anti-vygoranie': '/courses/course-anti-vygoranie.webp',
  'put': '/courses/course-put.webp',
  'igra-lvov': '/courses/course-igra-lvov.webp',
}

/* Fallback: map course slug → direction name (when Strapi relation is empty) */
const SLUG_TO_DIR = {
  'rozhdenie-molodoj-semi': 'Рождение семьи',
  'mama-zdes': 'Рождение семьи',
  'lyogkost-materinstva': 'Рождение семьи',
  'vovremya': 'Здоровое взросление',
  'podgotovka-ege-oge': 'Здоровое взросление',
  'odin-za-vsekh': 'Здоровое взросление',
  'lyogkost-adaptacii': 'Здоровое взросление',
  'svoi-lyudi': 'Развитие детей и взрослых',
  'podium': 'Развитие детей и взрослых',
  'svet-nochi': 'Развитие детей и взрослых',
  'v-and-d': 'Развитие детей и взрослых',
  'anti-vygoranie': 'Духовно-нравственная трансформация',
  'put': 'Духовно-нравственная трансформация',
  'igra-lvov': 'Духовно-нравственная трансформация',
}

const DIRECTION_NAMES = ['Все', 'Рождение семьи', 'Здоровое взросление', 'Развитие детей и взрослых', 'Духовно-нравственная трансформация']
const FORMAT_NAMES = ['Все', 'Онлайн', 'Офлайн', 'Гибрид']

function normalizeCourses(strapiCourses) {
  if (!strapiCourses?.length) return []
  return strapiCourses.map(c => ({
    title: c.title,
    slug: c.slug,
    dir: c.direction?.title || SLUG_TO_DIR[c.slug] || '',
    format: FORMAT_MAP[c.format] || c.format,
    duration: c.duration || '',
    desc: c.shortDescription || '',
    featured: c.featured || false,
    imageUrl: mediaUrl(c.image) || COURSE_IMAGES[c.slug] || null,
  }))
}

export default function Courses({ data, courses: strapiCourses, initialDirection, initialFormat } = {}) {
  const title = data?.title || 'Все курсы и тренинги'
  const subtitle = data?.subtitle || 'Выберите формат, который подходит именно вам'
  const coursesList = normalizeCourses(strapiCourses)

  const [dirFilter, setDirFilter] = useState(initialDirection || 'Все')
  const [formatFilter, setFormatFilter] = useState(initialFormat || 'Все')

  useEffect(() => {
    function handleFilter(e) {
      if (e.detail?.direction) setDirFilter(e.detail.direction)
      if (e.detail?.format) setFormatFilter(e.detail.format)
    }
    window.addEventListener('filter-courses', handleFilter)
    return () => window.removeEventListener('filter-courses', handleFilter)
  }, [])

  const filtered = coursesList.filter(c => {
    const dirMatch = dirFilter === 'Все' || c.dir === dirFilter
    const formatMatch = formatFilter === 'Все' || c.format === formatFilter
    return dirMatch && formatMatch
  })

  const hasCourses = coursesList.length > 0

  const gridRef = useRef(null)
  const gridInView = useInView(gridRef, { once: true, amount: 0.1 })

  return (
    <SectionReveal className={s.section} id="courses">
      <div className={s.inner}>
        <div className={s.header}>
          <CharReveal as="h2" className={s.title}>{title}</CharReveal>
          <p className={s.subtitle}>{subtitle}</p>
        </div>

        <div className={s.filtersWrap}>
          <div className={s.filterRow}>
            <span className={s.filterLabel}>Направление:</span>
            <div className={s.filters}>
              {DIRECTION_NAMES.map(d => (
                <button
                  key={d}
                  className={`${s.filterBtn} ${dirFilter === d ? s.active : ''}`}
                  onClick={() => setDirFilter(d)}
                >
                  {d}
                </button>
              ))}
            </div>
          </div>
          <div className={s.filterRow}>
            <span className={s.filterLabel}>Формат:</span>
            <div className={s.filters}>
              {FORMAT_NAMES.map(f => (
                <button
                  key={f}
                  className={`${s.filterBtn} ${formatFilter === f ? s.active : ''}`}
                  onClick={() => setFormatFilter(f)}
                >
                  {f}
                </button>
              ))}
            </div>
          </div>
        </div>

        <motion.div
          ref={gridRef}
          className={s.grid}
          variants={gridVariants}
          initial="hidden"
          animate={gridInView ? 'visible' : 'hidden'}
        >
          {filtered.map((c, i) => (
            <motion.div
              key={c.title}
              variants={cardVariants}
            >
              <a
                href={`/courses/${c.slug || '#'}`}
                className={`${s.card} ${c.featured ? s.featured : ''}`}
              >
                {c.imageUrl ? (
                  <Image
                    src={c.imageUrl}
                    alt={c.title}
                    className={s.cardThumb}
                    width={720}
                    height={480}
                    loading="lazy"
                    sizes="(max-width: 600px) 75vw, (max-width: 1024px) 50vw, 33vw"
                  />
                ) : (
                  <div className={s.cardThumbPlaceholder} />
                )}
                <span className={s.cardOverlay} />
                <div className={s.cardMeta}>
                  <span className={s.format}>{c.format}</span>
                  <span className={s.dot}>·</span>
                  <span className={s.duration}>{c.duration}</span>
                </div>
                <h3 className={s.cardTitle}>{c.title}</h3>
                <p className={s.cardDesc}>{c.desc}</p>
                <div className={s.cardActions}>
                  <span className={s.cardLink}>Подробнее →</span>
                </div>
              </a>
            </motion.div>
          ))}
          {!hasCourses && (
            <p className={s.empty}>Загружаем курсы…</p>
          )}
          {hasCourses && filtered.length === 0 && (
            <p className={s.empty}>Нет курсов по выбранным фильтрам</p>
          )}
        </motion.div>
      </div>
    </SectionReveal>
  )
}
