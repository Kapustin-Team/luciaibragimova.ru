'use client'
import { motion } from 'framer-motion'
import { FaVideo, FaUsers, FaChild, FaHeart } from 'react-icons/fa'
import CharReveal from '@/components/atoms/CharReveal'
import SectionReveal from '@/components/atoms/SectionReveal'
import s from './Consultations.module.sass'

const ICON_MAP = {
  video: <FaVideo size={24} />,
  users: <FaUsers size={24} />,
  child: <FaChild size={24} />,
  heart: <FaHeart size={24} />,
}

const FALLBACK_CONSULTATIONS = [
  {
    icon: 'video',
    title: 'Индивидуальная консультация',
    desc: 'Разбор вашей ситуации один на один с Люцией. Подходит, если нужен персональный подход к конкретной проблеме.',
    duration: '60 мин',
    format: 'Онлайн / Zoom',
  },
  {
    icon: 'users',
    title: 'Семейная консультация',
    desc: 'Работа с парой или всей семьёй. Помогает наладить коммуникацию и найти общий язык между поколениями.',
    duration: '90 мин',
    format: 'Онлайн / Zoom',
  },
  {
    icon: 'child',
    title: 'Консультация по подросткам',
    desc: 'Специализированная помощь родителям подростков. Как справиться с кризисом, агрессией и отчуждением.',
    duration: '60 мин',
    format: 'Онлайн / Zoom',
  },
  {
    icon: 'heart',
    title: 'Поддерживающая сессия',
    desc: 'Короткая сессия для тех, кто уже прошёл курс и нужна точечная поддержка по конкретному вопросу.',
    duration: '30 мин',
    format: 'Онлайн / Zoom',
  },
]

export default function Consultations({ data, consultationTypes } = {}) {
  const title = data?.title || 'Консультации'
  const subtitle = data?.subtitle || 'Индивидуальный подход к вашей ситуации'

  // Use Strapi consultation types if available, otherwise fallback
  const items = consultationTypes?.length
    ? consultationTypes.map((ct) => ({
        icon: ct.icon || 'heart',
        title: ct.title || ct.name,
        desc: ct.description,
        duration: ct.duration,
        format: ct.format || 'Онлайн / Zoom',
      }))
    : FALLBACK_CONSULTATIONS

  return (
    <SectionReveal className={s.section} id="consultations">
      <div className={s.inner}>
        <div className={s.header}>
          <CharReveal as="h2" className={s.title}>{title}</CharReveal>
          <p className={s.subtitle}>{subtitle}</p>
        </div>
        <div className={s.grid}>
          {items.map((item, i) => (
            <motion.div
              key={item.title}
              className={s.card}
              initial={false}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-30px' }}
              transition={{ duration: 0.5, delay: i * 0.1, ease: 'easeOut' }}
            >
              <div className={s.iconWrap}>{ICON_MAP[item.icon] || ICON_MAP.heart}</div>
              <h3 className={s.cardTitle}>{item.title}</h3>
              <p className={s.cardDesc}>{item.desc}</p>
              <div className={s.meta}>
                <span className={s.metaItem}>{item.duration}</span>
                <span className={s.metaDot}>·</span>
                <span className={s.metaItem}>{item.format}</span>
              </div>
            </motion.div>
          ))}
        </div>
        <div className={s.cta}>
          <a href="#contact" className={s.btn}>Записаться на консультацию</a>
        </div>
      </div>
    </SectionReveal>
  )
}
