'use client'
import { useState, useEffect, useRef } from 'react'
import Image from 'next/image'
import { motion, useInView } from 'framer-motion'
import useEmblaCarousel from 'embla-carousel-react'
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

function MobileDropdown({ options, value, onChange, getLabel }) {
  const [open, setOpen] = useState(false)
  const ref = useRef(null)
  const labelOf = getLabel || (v => v)

  useEffect(() => {
    if (!open) return
    function onDocClick(e) {
      if (ref.current && !ref.current.contains(e.target)) setOpen(false)
    }
    function onKey(e) {
      if (e.key === 'Escape') setOpen(false)
    }
    document.addEventListener('mousedown', onDocClick)
    document.addEventListener('touchstart', onDocClick)
    document.addEventListener('keydown', onKey)
    return () => {
      document.removeEventListener('mousedown', onDocClick)
      document.removeEventListener('touchstart', onDocClick)
      document.removeEventListener('keydown', onKey)
    }
  }, [open])

  return (
    <div className={s.mobileSelectWrap} ref={ref}>
      <button
        type="button"
        className={`${s.mobileSelect} ${open ? s.mobileSelectOpen : ''}`}
        aria-haspopup="listbox"
        aria-expanded={open}
        onClick={() => setOpen(o => !o)}
      >
        <span className={s.mobileSelectValue}>{labelOf(value)}</span>
        <svg
          className={`${s.mobileSelectChevron} ${open ? s.mobileSelectChevronOpen : ''}`}
          width="14" height="14" viewBox="0 0 24 24" fill="none" aria-hidden="true"
        >
          <path d="M6 9l6 6 6-6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      </button>
      {open && (
        <ul className={s.mobileSelectMenu} role="listbox">
          {options.map(opt => (
            <li key={opt}>
              <button
                type="button"
                role="option"
                aria-selected={opt === value}
                className={`${s.mobileSelectOption} ${opt === value ? s.mobileSelectOptionActive : ''}`}
                onClick={() => { onChange(opt); setOpen(false) }}
              >
                {labelOf(opt)}
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  )
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

  // On mobile, default the format toggle to "Онлайн" (no "Все" option there)
  useEffect(() => {
    if (typeof window === 'undefined') return
    const mq = window.matchMedia('(max-width: 600px)')
    if (mq.matches && (formatFilter === 'Все' || formatFilter === 'Гибрид')) {
      setFormatFilter('Онлайн')
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const filtered = coursesList.filter(c => {
    const dirMatch = dirFilter === 'Все' || c.dir === dirFilter
    const formatMatch =
      formatFilter === 'Все' ||
      c.format === formatFilter ||
      (c.format === 'Гибрид' && (formatFilter === 'Онлайн' || formatFilter === 'Офлайн'))
    return dirMatch && formatMatch
  })

  const hasCourses = coursesList.length > 0

  const gridRef = useRef(null)
  const gridInView = useInView(gridRef, { once: true, amount: 0.1 })
  const [emblaRef, emblaApi] = useEmblaCarousel({
    align: 'start',
    dragFree: true,
    containScroll: 'trimSnaps',
    breakpoints: {
      '(min-width: 601px)': { active: false },
    },
  })

  useEffect(() => {
    emblaApi?.reInit()
  }, [emblaApi, filtered.length])

  return (
    <SectionReveal className={s.section} id="courses">
      <div className={s.inner}>
        <div className={s.header}>
          <CharReveal as="h2" className={s.title}>{title}</CharReveal>
          <p className={s.subtitle}>{subtitle}</p>
        </div>

        <div className={s.filtersWrap}>
          <div className={`${s.filterRow} ${s.directionRow}`}>
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
          <div className={`${s.filterRow} ${s.formatRow}`}>
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

          <div className={s.mobileFiltersRow}>
            <MobileDropdown
              options={DIRECTION_NAMES}
              value={dirFilter}
              onChange={setDirFilter}
              getLabel={d => d === 'Все' ? 'Все направления' : d}
            />
            <div className={s.formatToggle} role="group" aria-label="Формат">
              <button
                type="button"
                className={`${s.toggleOption} ${formatFilter === 'Онлайн' ? s.toggleActive : ''}`}
                aria-pressed={formatFilter === 'Онлайн'}
                onClick={() => setFormatFilter('Онлайн')}
              >
                Онлайн
              </button>
              <button
                type="button"
                className={`${s.toggleOption} ${formatFilter === 'Офлайн' ? s.toggleActive : ''}`}
                aria-pressed={formatFilter === 'Офлайн'}
                onClick={() => setFormatFilter('Офлайн')}
              >
                Офлайн
              </button>
            </div>
          </div>
        </div>

        <div className={s.carouselViewport} ref={emblaRef}>
          <motion.div
            ref={gridRef}
            className={s.grid}
            variants={gridVariants}
            initial="hidden"
            animate={gridInView ? 'visible' : 'hidden'}
          >
            {filtered.map(c => (
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
                      sizes="(max-width: 1024px) 50vw, 33vw"
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
      </div>
    </SectionReveal>
  )
}
