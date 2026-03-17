'use client'
import { FaVideo, FaUsers, FaChild, FaHeart } from 'react-icons/fa'
import s from './Consultations.module.sass'

const consultations = [
  {
    icon: <FaVideo size={24} />,
    title: 'Индивидуальная консультация',
    desc: 'Разбор вашей ситуации один на один с Люцией. Подходит, если нужен персональный подход к конкретной проблеме.',
    duration: '60 мин',
    format: 'Онлайн / Zoom',
  },
  {
    icon: <FaUsers size={24} />,
    title: 'Семейная консультация',
    desc: 'Работа с парой или всей семьёй. Помогает наладить коммуникацию и найти общий язык между поколениями.',
    duration: '90 мин',
    format: 'Онлайн / Zoom',
  },
  {
    icon: <FaChild size={24} />,
    title: 'Консультация по подросткам',
    desc: 'Специализированная помощь родителям подростков. Как справиться с кризисом, агрессией и отчуждением.',
    duration: '60 мин',
    format: 'Онлайн / Zoom',
  },
  {
    icon: <FaHeart size={24} />,
    title: 'Поддерживающая сессия',
    desc: 'Короткая сессия для тех, кто уже прошёл курс и нужна точечная поддержка по конкретному вопросу.',
    duration: '30 мин',
    format: 'Онлайн / Zoom',
  },
]

export default function Consultations() {
  return (
    <section className={s.section} id="consultations">
      <div className={s.inner}>
        <div className={s.header}>
          <h2 className={s.title}>Консультации</h2>
          <p className={s.subtitle}>Индивидуальный подход к вашей ситуации</p>
        </div>
        <div className={s.grid}>
          {consultations.map((item) => (
            <div key={item.title} className={s.card}>
              <div className={s.iconWrap}>{item.icon}</div>
              <h3 className={s.cardTitle}>{item.title}</h3>
              <p className={s.cardDesc}>{item.desc}</p>
              <div className={s.meta}>
                <span className={s.metaItem}>{item.duration}</span>
                <span className={s.metaDot}>·</span>
                <span className={s.metaItem}>{item.format}</span>
              </div>
            </div>
          ))}
        </div>
        <div className={s.cta}>
          <a href="#contact" className={s.btn}>Записаться на консультацию</a>
        </div>
      </div>
    </section>
  )
}
