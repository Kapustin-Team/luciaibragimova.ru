'use client'
import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import AnimatedSection from '@/components/atoms/AnimatedSection'
import s from './Faq.module.sass'

const faqs = [
  { q: 'Как проходят онлайн-курсы?', a: 'Вы получаете доступ к видеолекциям и заданиям. Смотрите в удобном темпе, выполняете практику и получаете обратную связь от куратора.' },
  { q: 'Можно ли оплатить в рассрочку?', a: 'Да, для большинства курсов доступна рассрочка. Свяжитесь с нами для уточнения условий.' },
  { q: 'Подойдёт ли мне курс «Вовремя»?', a: 'Курс подходит родителям подростков 10–18 лет, которые хотят наладить отношения с ребёнком и предотвратить кризисные ситуации.' },
  { q: 'Есть ли сертификат?', a: 'Да, после прохождения курса вы получаете именной сертификат школы психологии Люции Ибрагимовой.' },
  { q: 'Как записаться на офлайн-тренинг?', a: 'Оставьте заявку на сайте или напишите в мессенджерах. Мы сообщим о ближайших датах.' },
]

function Item({ q, a }) {
  const [open, setOpen] = useState(false)
  return (
    <div className={`${s.item} ${open ? s.itemOpen : ''}`} onClick={() => setOpen(!open)}>
      <div className={s.question}>
        <span>{q}</span>
        <span className={s.icon}>{open ? '−' : '+'}</span>
      </div>
      <AnimatePresence>
        {open && (
          <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.25 }}>
            <p className={s.answer}>{a}</p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

export default function Faq() {
  return (
    <section className={s.section} id="faq">
      <div className={s.inner}>
        <AnimatedSection>
          <h2 className={s.title}>Частые вопросы</h2>
        </AnimatedSection>
        <div className={s.list}>
          {faqs.map((f, i) => (
            <AnimatedSection key={i} delay={i * 0.05}>
              <Item q={f.q} a={f.a} />
            </AnimatedSection>
          ))}
        </div>
      </div>
    </section>
  )
}
