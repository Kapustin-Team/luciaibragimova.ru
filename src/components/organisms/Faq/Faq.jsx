'use client'
import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import AnimatedSection from '@/components/atoms/AnimatedSection'
import SectionTitle from '@/components/atoms/SectionTitle'
import s from './Faq.module.sass'

const faqs = [
  { q: 'Как проходят онлайн-курсы?', a: 'Вы получаете доступ к видеолекциям и заданиям на платформе. Смотрите в удобном темпе, выполняете практику и получаете обратную связь.' },
  { q: 'Можно ли оплатить в рассрочку?', a: 'Да, для большинства курсов доступна рассрочка. Свяжитесь с нами для уточнения условий.' },
  { q: 'Подойдёт ли мне курс «Вовремя»?', a: 'Курс подходит родителям подростков 10–18 лет, которые хотят наладить отношения с ребёнком и предотвратить кризисные ситуации.' },
  { q: 'Есть ли сертификат?', a: 'Да, после прохождения курса вы получаете сертификат школы психологии Люции Ибрагимовой.' },
  { q: 'Как записаться на офлайн-тренинг?', a: 'Оставьте заявку на сайте или свяжитесь с нами в мессенджерах. Мы сообщим о ближайших датах.' },
]

function FaqItem({ q, a }) {
  const [open, setOpen] = useState(false)
  return (
    <div className={s.item} onClick={() => setOpen(!open)}>
      <div className={s.question}>
        <span>{q}</span>
        <span className={`${s.arrow} ${open ? s.open : ''}`}>↓</span>
      </div>
      <AnimatePresence>
        {open && (
          <motion.div
            className={s.answer}
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            <p>{a}</p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

export default function Faq() {
  return (
    <section className={s.section}>
      <div className={s.inner}>
        <AnimatedSection>
          <SectionTitle sub="Ответы на частые вопросы">FAQ</SectionTitle>
        </AnimatedSection>
        <div className={s.list}>
          {faqs.map((f, i) => (
            <AnimatedSection key={i} delay={i * 0.05}>
              <FaqItem q={f.q} a={f.a} />
            </AnimatedSection>
          ))}
        </div>
      </div>
    </section>
  )
}
