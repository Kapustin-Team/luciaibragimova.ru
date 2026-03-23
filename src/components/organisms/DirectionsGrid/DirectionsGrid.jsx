'use client'
import { useState, useMemo } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import s from './DirectionsGrid.module.sass'

const FALLBACK_DIRS = [
  { title: 'Рождение семьи', desc: 'Курсы для молодых пар, будущих мам и начинающих родителей.', count: 3, icon: 'Heart' },
  { title: 'Здоровое взросление', desc: 'Работа с подростками и их родителями. Социализация, подготовка к экзаменам.', count: 4, icon: 'Sprout' },
  { title: 'Развитие детей и взрослых', desc: 'Тренинги уверенности, коммуникации и самопознания.', count: 4, icon: 'GraduationCap' },
  { title: 'Духовно-нравственная трансформация', desc: 'Глубинная работа с выгоранием и поиском опоры.', count: 3, icon: 'Sparkles' },
]

/* SVG icons matching Strapi icon field — stroke-based, same style as FeaturedCourse */
const ICON_MAP = {
  Heart: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 000-7.78z" />
    </svg>
  ),
  Sprout: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M7 20h10" /><path d="M12 20v-8" />
      <path d="M12 12C12 8 8 4.5 3 4c0 6 3.5 8 9 8z" />
      <path d="M12 12c0-4 4-7.5 9-8 0 6-3.5 8-9 8z" />
    </svg>
  ),
  GraduationCap: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M22 10l-10-5L2 10l10 5 10-5z" />
      <path d="M6 12v5c0 1.66 2.69 3 6 3s6-1.34 6-3v-5" />
      <path d="M22 10v6" />
    </svg>
  ),
  Sparkles: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 3l1.5 5.5L19 10l-5.5 1.5L12 17l-1.5-5.5L5 10l5.5-1.5L12 3z" />
      <path d="M18 18l.5 1.5L20 20l-1.5.5L18 22l-.5-1.5L16 20l1.5-.5L18 18z" />
    </svg>
  ),
}

/* Each direction has its own accent color */
const DIR_COLORS = {
  'Рождение семьи': { accent: '#30023c', soft: 'rgba(48,2,60,0.15)', segment: '#d9b9e7' },
  'Здоровое взросление': { accent: '#7c5cbf', soft: 'rgba(124,92,191,0.15)', segment: '#7c5cbf' },
  'Развитие детей и взрослых': { accent: '#2d8a6e', soft: 'rgba(45,138,110,0.15)', segment: '#2d8a6e' },
  'Духовно-нравственная трансформация': { accent: '#8b5cf6', soft: 'rgba(139,92,246,0.15)', segment: '#8b5cf6' },
}

/* Fallback: slug → direction title for counting courses */
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

const FORMAT_MAP = { online: 'Онлайн', offline: 'Офлайн', hybrid: 'Гибрид' }

function normalizeDirections(strapiDirections, strapiCourses) {
  if (!strapiDirections?.length) return FALLBACK_DIRS
  const countByDir = {}
  if (strapiCourses?.length) {
    strapiCourses.forEach(c => {
      const dirTitle = c.direction?.title || SLUG_TO_DIR[c.slug] || ''
      if (dirTitle) countByDir[dirTitle] = (countByDir[dirTitle] || 0) + 1
    })
  }
  return strapiDirections.map(d => ({
    title: d.title,
    desc: d.description || '',
    count: countByDir[d.title] || d.courses?.length || 0,
    icon: d.icon || 'Heart',
  }))
}

function normalizeCourses(strapiCourses) {
  if (!strapiCourses?.length) return []
  return strapiCourses.map(c => ({
    title: c.title,
    slug: c.slug,
    dir: c.direction?.title || SLUG_TO_DIR[c.slug] || '',
    format: FORMAT_MAP[c.format] || c.format || '',
    duration: c.duration || '',
    lessonsCount: c.lessonsCount || c.lessons?.length || 0,
  }))
}

/* ── Decorative circle: 4 segments matching grid quadrant positions ── */
/* Grid quadrants: 0=top-left, 1=top-right, 2=bottom-left, 3=bottom-right */
/* SVG segments (clockwise from top): 0=top-right, 1=bottom-right, 2=bottom-left, 3=top-left */
/* Mapping: grid index → SVG segment index */
const GRID_TO_SVG = [3, 0, 2, 1]

function DecorativeCircle({ dirs, activeIndex }) {
  const r = 54
  const cx = 60, cy = 60

  /* Draw 4 SVG segments (clockwise from -90°) */
  const segments = [0, 1, 2, 3].map(svgIdx => {
    const startAngle = svgIdx * 90 - 90
    const endAngle = startAngle + 90
    const startRad = (startAngle * Math.PI) / 180
    const endRad = (endAngle * Math.PI) / 180
    const x1 = cx + r * Math.cos(startRad)
    const y1 = cy + r * Math.sin(startRad)
    const x2 = cx + r * Math.cos(endRad)
    const y2 = cy + r * Math.sin(endRad)

    /* Find which grid quadrant this SVG segment belongs to */
    const gridIdx = GRID_TO_SVG.indexOf(svgIdx)
    const dirTitle = dirs[gridIdx]?.title
    const color = DIR_COLORS[dirTitle]?.segment || '#d9b9e7'
    const isActive = activeIndex === gridIdx

    return (
      <path
        key={svgIdx}
        d={`M${cx},${cy} L${x1},${y1} A${r},${r} 0 0,1 ${x2},${y2} Z`}
        fill={color}
        opacity={isActive ? 1 : 0.35}
        style={{ transition: 'all 0.4s ease' }}
      />
    )
  })

  return (
    <svg viewBox="0 0 120 120" className={s.circle}>
      {segments}
      <circle cx="60" cy="60" r="16" fill="var(--bg-dark)" />
      <circle cx="60" cy="60" r="14" fill="none" stroke="rgba(255,255,255,0.12)" strokeWidth="0.8" />
    </svg>
  )
}

export default function DirectionsGrid({ data, directions: strapiDirections, courses: strapiCourses } = {}) {
  const title = data?.title || 'Выберите своё направление'
  const subtitle = data?.subtitle || 'Нажмите — увидите курсы ниже'
  const dirs = normalizeDirections(strapiDirections, strapiCourses)
  const allCourses = useMemo(() => normalizeCourses(strapiCourses), [strapiCourses])

  const [activeIdx, setActiveIdx] = useState(null)

  const activeDirTitle = activeIdx !== null ? dirs[activeIdx]?.title : null
  const activeColor = activeDirTitle ? DIR_COLORS[activeDirTitle] : null
  const filteredCourses = useMemo(() => {
    if (!activeDirTitle) return []
    return allCourses.filter(c => c.dir === activeDirTitle)
  }, [activeDirTitle, allCourses])

  return (
    <section className={s.section} id="directions-grid">
      <div className={s.inner}>
        <div className={s.header}>
          <h2 className={s.sectionTitle}>{title}</h2>
          <p className={s.sectionSubtitle}>{subtitle}</p>
        </div>

        <div className={s.gridWrap}>
          <div className={s.grid}>
            {dirs.map((d, i) => {
              const isActive = activeIdx === i
              const icon = ICON_MAP[d.icon] || ICON_MAP.Heart
              return (
                <button
                  key={d.title}
                  className={`${s.quadrant} ${isActive ? s.active : ''}`}
                  onClick={() => setActiveIdx(isActive ? null : i)}
                >
                  <div className={s.qIconWrap}>
                    <span className={s.qIcon}>{icon}</span>
                  </div>
                  <div className={s.qContent}>
                    <h3 className={s.qTitle}>{d.title}</h3>
                    <span className={s.qCount}>
                      {d.count} {d.count === 1 ? 'курс' : d.count < 5 ? 'курса' : 'курсов'}
                    </span>
                    {d.desc && <p className={s.qDesc}>{d.desc}</p>}
                  </div>
                </button>
              )
            })}
          </div>
          <div className={s.circleWrap}>
            <DecorativeCircle dirs={dirs} activeIndex={activeIdx} />
          </div>
        </div>

        <AnimatePresence mode="wait">
          {activeIdx !== null && filteredCourses.length > 0 && (
            <motion.div
              key={activeDirTitle}
              className={s.coursesSection}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.35, ease: 'easeOut' }}
            >
              <div className={s.coursesHeader}>
                <h3 className={s.coursesTitle}>{activeDirTitle}</h3>
                <a href="/courses" className={s.allCoursesBtn}>Все курсы</a>
              </div>

              <div className={s.coursesList}>
                {filteredCourses.map((c, i) => (
                  <motion.a
                    key={c.slug}
                    href={`/courses/${c.slug}`}
                    className={s.courseItem}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.06, duration: 0.3 }}
                  >
                    <div className={s.courseInfo}>
                      <span
                        className={s.courseDot}
                        style={{ background: c.format === 'Онлайн' ? '#10b981' : c.format === 'Офлайн' ? '#d9b9e7' : c.format === 'Гибрид' ? '#f59e0b' : '#d9b9e7' }}
                      />
                      <span className={s.courseName}>{c.title}</span>
                    </div>
                    <div className={s.courseActions}>
                      {c.format && (
                        <span className={`${s.courseFormat} ${c.format === 'Онлайн' ? s.formatOnline : c.format === 'Офлайн' ? s.formatOffline : s.formatHybrid}`}>
                          {c.format}
                        </span>
                      )}
                      <span className={s.courseArrow}>→</span>
                    </div>
                  </motion.a>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  )
}
