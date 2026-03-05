'use client'
import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import AnimatedSection from '@/components/atoms/AnimatedSection'
import s from './Courses.module.sass'

const FORMAT_MAP = { online: 'Онлайн', offline: 'Офлайн', hybrid: 'Гибрид' }
const FALLBACK_COURSES = [
  { title: 'Вовремя', dir: 'Здоровое взросление', format: 'Онлайн', duration: '5 модулей · 20 лекций', desc: 'Как вернуть контакт с подростком и предотвратить кризис.', featured: true, slug: 'vovremya' },
  { title: 'Рождение молодой семьи', dir: 'Рождение семьи', format: 'Онлайн', duration: '5 видеолекций', desc: 'Как построить крепкую семью с первых дней.', slug: 'rozhdenie-molodoj-semi' },
  { title: 'Мама здесь', dir: 'Рождение семьи', format: 'Онлайн', duration: '6 видеолекций', desc: 'Психологическая подготовка к материнству.', slug: 'mama-zdes' },
  { title: 'Лёгкость материнства', dir: 'Рождение семьи', format: 'Онлайн', duration: '6 видеолекций', desc: 'Гармония в семье с новорождённым.', slug: 'lyogkost-materinstva' },
  { title: 'Подготовка к ЕГЭ/ОГЭ', dir: 'Здоровое взросление', format: 'Гибрид', duration: 'Индивидуально', desc: 'Психологическая подготовка к экзаменам.', slug: 'podgotovka-ege-oge' },
  { title: 'Один за всех', dir: 'Здоровое взросление', format: 'Офлайн', duration: 'Тренинг', desc: 'Командный тренинг для детей и подростков.', slug: 'odin-za-vsekh' },
  { title: 'Свои люди', dir: 'Развитие', format: 'Онлайн', duration: '5 видеолекций', desc: 'Здоровые границы и отношения с окружающими.', slug: 'svoi-lyudi' },
  { title: 'Подиум', dir: 'Развитие', format: 'Офлайн', duration: '7 часов', desc: 'Тренинг уверенности и самопрезентации.', slug: 'podium' },
  { title: 'Анти-выгорание', dir: 'Трансформация', format: 'Онлайн', duration: '3 видеолекции', desc: 'Восстановление ресурса и внутренней опоры.', slug: 'anti-vygoranie' },
  { title: 'Путь', dir: 'Трансформация', format: 'Офлайн', duration: '2 дня · 12 часов', desc: 'Глубинная трансформационная работа.', slug: 'put' },
  { title: 'Игра львов', dir: 'Трансформация', format: 'Офлайн', duration: '3 часа', desc: 'Тренинг силы духа и лидерства.', slug: 'igra-lvov' },
  { title: 'Лёгкость адаптации', dir: 'Здоровое взросление', format: 'Гибрид', duration: 'Программа', desc: 'Адаптация для педагогов, родителей и детей.', slug: 'lyogkost-adaptacii' },
]

const filters = ['Все', 'Онлайн', 'Офлайн', 'Гибрид']

function normalizeCourses(strapiCourses) {
  if (!strapiCourses?.length) return FALLBACK_COURSES
  return strapiCourses.map(c => ({
    title: c.title,
    slug: c.slug,
    dir: c.direction?.title || '',
    format: FORMAT_MAP[c.format] || c.format,
    duration: c.duration || '',
    desc: c.shortDescription || '',
    featured: c.featured || false,
    badge: c.badge || (c.featured ? 'Хит' : null),
  }))
}

export default function Courses({ data, courses: strapiCourses } = {}) {
  const title = data?.title || 'Все курсы и тренинги'
  const subtitle = data?.subtitle || 'Выберите формат, который подходит именно вам'
  const coursesList = normalizeCourses(strapiCourses)

  const [filter, setFilter] = useState('Все')
  const filtered = filter === 'Все' ? coursesList : coursesList.filter(c => c.format === filter)

  return (
    <section className={s.section} id="courses">
      <div className={s.inner}>
        <AnimatedSection>
          <div className={s.header}>
            <div>
              <h2 className={s.title}>{title}</h2>
              <p className={s.subtitle}>{subtitle}</p>
            </div>
            <div className={s.filters}>
              {filters.map(f => (
                <button key={f} className={`${s.filterBtn} ${filter === f ? s.active : ''}`} onClick={() => setFilter(f)}>{f}</button>
              ))}
            </div>
          </div>
        </AnimatedSection>

        <motion.div className={s.grid} layout>
          <AnimatePresence mode="popLayout">
            {filtered.map((c) => (
              <motion.div
                key={c.title}
                className={`${s.card} ${c.featured ? s.featured : ''}`}
                layout
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.25 }}
              >
                {c.badge && <span className={s.tag}>{c.badge}</span>}
                <div className={s.cardMeta}>
                  <span className={s.format}>{c.format}</span>
                  <span className={s.dot}>·</span>
                  <span className={s.duration}>{c.duration}</span>
                </div>
                <h3 className={s.cardTitle}>{c.title}</h3>
                <p className={s.cardDir}>{c.dir}</p>
                <p className={s.cardDesc}>{c.desc}</p>
                <a href={`/courses/${c.slug || '#'}`} className={s.cardLink}>Подробнее →</a>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  )
}
