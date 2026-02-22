'use client'
import { useState } from 'react'
import AnimatedSection from '@/components/atoms/AnimatedSection'
import SectionTitle from '@/components/atoms/SectionTitle'
import Button from '@/components/atoms/Button'
import s from './Courses.module.sass'

const courses = [
  { title: 'Вовремя', dir: 'Здоровое взросление', format: 'Онлайн', desc: 'Главный курс. 5 модулей по 4 лекции. Как вернуть контакт с подростком и предотвратить кризис.', featured: true },
  { title: 'Рождение молодой семьи', dir: 'Рождение семьи', format: 'Онлайн', desc: '5 видеолекций + задания. Как построить крепкую семью с первых дней.' },
  { title: 'Мама здесь', dir: 'Рождение семьи', format: 'Онлайн', desc: 'Для беременных. 6 видеолекций. Психологическая подготовка к материнству.' },
  { title: 'Лёгкость материнства', dir: 'Рождение семьи', format: 'Онлайн', desc: '6 видеолекций о принятии новой роли и гармонии в семье.' },
  { title: 'Подготовка к ЕГЭ/ОГЭ', dir: 'Здоровое взросление', format: 'Онлайн / Офлайн', desc: 'Психологическая подготовка к экзаменам. Снятие тревоги и стресса.' },
  { title: 'Свои люди', dir: 'Развитие', format: 'Онлайн', desc: '5 видеолекций о выстраивании здоровых границ и отношений.' },
  { title: 'Подиум', dir: 'Развитие', format: 'Офлайн', desc: 'Тренинг уверенности и самопрезентации. 7 часов трансформации.' },
  { title: 'Анти-выгорание', dir: 'Трансформация', format: 'Онлайн', desc: '3 видеолекции. Как восстановить ресурс и найти внутреннюю опору.' },
  { title: 'Путь', dir: 'Трансформация', format: 'Офлайн', desc: 'Двухдневный интенсив (12 часов). Глубинная работа с собой.' },
  { title: 'Игра львов', dir: 'Трансформация', format: 'Офлайн', desc: 'Трёхчасовой тренинг силы духа и лидерства.' },
]

const filters = ['Все', 'Онлайн', 'Офлайн']

export default function Courses() {
  const [filter, setFilter] = useState('Все')

  const filtered = filter === 'Все'
    ? courses
    : courses.filter(c => c.format.includes(filter === 'Онлайн' ? 'Онлайн' : 'Офлайн'))

  return (
    <section className={s.section} id="courses">
      <div className={s.inner}>
        <AnimatedSection>
          <SectionTitle sub="Курсы и тренинги для всей семьи">Курсы</SectionTitle>
          <div className={s.filters}>
            {filters.map(f => (
              <button
                key={f}
                className={`${s.filterBtn} ${filter === f ? s.active : ''}`}
                onClick={() => setFilter(f)}
              >
                {f}
              </button>
            ))}
          </div>
        </AnimatedSection>
        <div className={s.grid}>
          {filtered.map((c, i) => (
            <AnimatedSection key={c.title} delay={i * 0.05}>
              <div className={`${s.card} ${c.featured ? s.featured : ''}`}>
                {c.featured && <span className={s.badge}>Хит</span>}
                <span className={s.format}>{c.format}</span>
                <h3 className={s.cardTitle}>{c.title}</h3>
                <p className={s.dir}>{c.dir}</p>
                <p className={s.desc}>{c.desc}</p>
                <Button variant="outline">Подробнее</Button>
              </div>
            </AnimatedSection>
          ))}
        </div>
      </div>
    </section>
  )
}
