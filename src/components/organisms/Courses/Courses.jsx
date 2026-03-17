'use client'
import { useState, useEffect } from 'react'
import { useEnroll } from '@/components/organisms/EnrollModal/EnrollModal'
import s from './Courses.module.sass'

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
  'svoi-lyudi': 'Развитие',
  'podium': 'Развитие',
  'svet-nochi': 'Развитие',
  'v-and-d': 'Развитие',
  'anti-vygoranie': 'Трансформация',
  'put': 'Трансформация',
  'igra-lvov': 'Трансформация',
}

const DIRECTION_NAMES = ['Все', 'Рождение семьи', 'Здоровое взросление', 'Развитие', 'Трансформация']
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
    badge: c.badge || (c.featured ? 'Хит' : null),
    imageUrl: c.image?.url || c.image?.formats?.small?.url || null,
  }))
}

export default function Courses({ data, courses: strapiCourses, initialDirection, initialFormat } = {}) {
  const { openEnroll } = useEnroll()
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

  return (
    <section className={s.section} id="courses">
      <div className={s.inner}>
        <div className={s.header}>
          <h2 className={s.title}>{title}</h2>
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

        <div className={s.grid}>
          {filtered.map((c) => (
            <a
              key={c.title}
              href={`/courses/${c.slug || '#'}`}
              className={`${s.card} ${c.featured ? s.featured : ''}`}
            >
              {(COURSE_IMAGES[c.slug] || c.imageUrl) ? (
                <img
                  src={c.imageUrl || COURSE_IMAGES[c.slug]}
                  alt={c.title}
                  className={s.cardThumb}
                  loading="lazy"
                />
              ) : (
                <div className={s.cardThumbPlaceholder} />
              )}
              {c.badge && <span className={s.tag}>{c.badge}</span>}
              <div className={s.cardMeta}>
                <span className={s.format}>{c.format}</span>
                <span className={s.dot}>·</span>
                <span className={s.duration}>{c.duration}</span>
              </div>
              <h3 className={s.cardTitle}>{c.title}</h3>
              {c.dir && <p className={s.cardDir}>{c.dir}</p>}
              <p className={s.cardDesc}>{c.desc}</p>
              <div className={s.cardActions}>
                <span className={s.cardLink}>Подробнее →</span>
                <span
                  className={s.cardBuy}
                  role="button"
                  onClick={(e) => { e.preventDefault(); e.stopPropagation(); openEnroll({ type: 'course', name: c.title }) }}
                >Купить</span>
              </div>
            </a>
          ))}
          {filtered.length === 0 && (
            <p className={s.empty}>Нет курсов по выбранным фильтрам</p>
          )}
        </div>
      </div>
    </section>
  )
}
