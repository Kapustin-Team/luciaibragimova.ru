'use client'
import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import AnimatedSection from '@/components/atoms/AnimatedSection'
import s from './Courses.module.sass'

const courses = [
  { title: 'Вовремя', dir: 'Здоровое взросление', format: 'Онлайн', duration: '5 модулей · 20 лекций', desc: 'Как вернуть контакт с подростком и предотвратить кризис.', featured: true },
  { title: 'Рождение молодой семьи', dir: 'Рождение семьи', format: 'Онлайн', duration: '5 видеолекций', desc: 'Как построить крепкую семью с первых дней.' },
  { title: 'Мама здесь', dir: 'Рождение семьи', format: 'Онлайн', duration: '6 видеолекций', desc: 'Психологическая подготовка к материнству.' },
  { title: 'Лёгкость материнства', dir: 'Рождение семьи', format: 'Онлайн', duration: '6 видеолекций', desc: 'Гармония в семье с новорождённым.' },
  { title: 'Подготовка к ЕГЭ/ОГЭ', dir: 'Здоровое взросление', format: 'Гибрид', duration: 'Индивидуально', desc: 'Психологическая подготовка к экзаменам.' },
  { title: 'Один за всех', dir: 'Здоровое взросление', format: 'Офлайн', duration: 'Тренинг', desc: 'Командный тренинг для детей и подростков.' },
  { title: 'Свои люди', dir: 'Развитие', format: 'Онлайн', duration: '5 видеолекций', desc: 'Здоровые границы и отношения с окружающими.' },
  { title: 'Подиум', dir: 'Развитие', format: 'Офлайн', duration: '7 часов', desc: 'Тренинг уверенности и самопрезентации.' },
  { title: 'Анти-выгорание', dir: 'Трансформация', format: 'Онлайн', duration: '3 видеолекции', desc: 'Восстановление ресурса и внутренней опоры.' },
  { title: 'Путь', dir: 'Трансформация', format: 'Офлайн', duration: '2 дня · 12 часов', desc: 'Глубинная трансформационная работа.' },
  { title: 'Игра львов', dir: 'Трансформация', format: 'Офлайн', duration: '3 часа', desc: 'Тренинг силы духа и лидерства.' },
  { title: 'Лёгкость адаптации', dir: 'Здоровое взросление', format: 'Гибрид', duration: 'Программа', desc: 'Адаптация для педагогов, родителей и детей.' },
]

const filters = ['Все', 'Онлайн', 'Офлайн', 'Гибрид']

export default function Courses() {
  const [filter, setFilter] = useState('Все')
  const filtered = filter === 'Все' ? courses : courses.filter(c => c.format === filter)

  return (
    <section className={s.section} id="courses">
      <div className={s.inner}>
        <AnimatedSection>
          <div className={s.header}>
            <div>
              <h2 className={s.title}>Все курсы и тренинги</h2>
              <p className={s.subtitle}>Выберите формат, который подходит именно вам</p>
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
                {c.featured && <span className={s.tag}>Хит</span>}
                <div className={s.cardMeta}>
                  <span className={s.format}>{c.format}</span>
                  <span className={s.dot}>·</span>
                  <span className={s.duration}>{c.duration}</span>
                </div>
                <h3 className={s.cardTitle}>{c.title}</h3>
                <p className={s.cardDir}>{c.dir}</p>
                <p className={s.cardDesc}>{c.desc}</p>
                <a href="#" className={s.cardLink}>Подробнее →</a>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  )
}
