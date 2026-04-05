'use client'
import CharReveal from '@/components/atoms/CharReveal'
import SectionReveal from '@/components/atoms/SectionReveal'
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
  'Рождение семьи': { segment: '#744C32' },
  'Здоровое взросление': { segment: '#744C32' },
  'Развитие детей и взрослых': { segment: '#744C32' },
  'Духовно-нравственная трансформация': { segment: '#744C32' },
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

/* ── Decorative circle: 4 segments matching grid quadrant positions ── */
const GRID_TO_SVG = [3, 0, 2, 1]

function DecorativeCircle({ dirs }) {
  const r = 54
  const cx = 60, cy = 60

  const segments = [0, 1, 2, 3].map(svgIdx => {
    const startAngle = svgIdx * 90 - 90
    const endAngle = startAngle + 90
    const startRad = (startAngle * Math.PI) / 180
    const endRad = (endAngle * Math.PI) / 180
    const x1 = cx + r * Math.cos(startRad)
    const y1 = cy + r * Math.sin(startRad)
    const x2 = cx + r * Math.cos(endRad)
    const y2 = cy + r * Math.sin(endRad)

    const gridIdx = GRID_TO_SVG.indexOf(svgIdx)
    const dirTitle = dirs[gridIdx]?.title
    const color = DIR_COLORS[dirTitle]?.segment || '#744C32'

    return (
      <path
        key={svgIdx}
        d={`M${cx},${cy} L${x1},${y1} A${r},${r} 0 0,1 ${x2},${y2} Z`}
        fill={color}
        opacity={0.65}
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

function handleDirectionClick(dirTitle) {
  const filterName = dirTitle
  window.dispatchEvent(new CustomEvent('filter-courses', { detail: { direction: filterName } }))
  const coursesEl = document.getElementById('courses')
  if (coursesEl) {
    coursesEl.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }
}

export default function DirectionsGrid({ data, directions: strapiDirections, courses: strapiCourses } = {}) {
  const title = data?.title || 'Выберите своё направление'
  const subtitle = data?.subtitle || 'Нажмите — увидите курсы ниже'
  const dirs = normalizeDirections(strapiDirections, strapiCourses)

  return (
    <SectionReveal className={s.section} id="directions-grid">
      <div className={s.inner}>
        <div className={s.header}>
          <CharReveal as="h2" className={s.sectionTitle}>{title}</CharReveal>
          <p className={s.sectionSubtitle}>{subtitle}</p>
        </div>

        <div className={s.gridWrap}>
          <div className={s.grid}>
            {dirs.map((d) => {
              const icon = ICON_MAP[d.icon] || ICON_MAP.Heart
              return (
                <button
                  key={d.title}
                  className={s.quadrant}
                  onClick={() => handleDirectionClick(d.title)}
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
            <DecorativeCircle dirs={dirs} />
          </div>
        </div>
      </div>
    </SectionReveal>
  )
}
