'use client'
import { motion } from 'framer-motion'
import s from './TrustBlock.module.sass'
import CharReveal from '@/components/atoms/CharReveal'
import SectionReveal from '@/components/atoms/SectionReveal'

const DEFAULT_STEPS = [
  {
    number: '01',
    title: 'Знакомство',
    description: 'Первая встреча и диагностическая беседа для определения вашего запроса и целей обучения',
    image: '/interrior/img224.jpg',
  },
  {
    number: '02',
    title: 'Диагностика',
    description: 'Определение уровня подготовки и подбор оптимальной программы под ваши задачи',
    image: '/interrior/img247.jpg',
  },
  {
    number: '03',
    title: 'Программа',
    description: 'Индивидуальный план обучения с учётом вашего опыта, графика и профессиональных целей',
    image: '/interrior/img225.jpg',
  },
  {
    number: '04',
    title: 'Обучение',
    description: 'Теоретические и практические занятия с опытными преподавателями и супервизорами',
    image: '/interrior/img266.jpg',
  },
  {
    number: '05',
    title: 'Практика',
    description: 'Работа с реальными случаями под наблюдением куратора для закрепления навыков',
    image: '/interrior/img256.jpg',
  },
  {
    number: '06',
    title: 'Результат',
    description: 'Выпуск с профессиональными компетенциями, сертификатом и поддержкой сообщества',
    image: '/interrior/img257.jpg',
  },
]

export default function TrustBlock({ data } = {}) {
  const label = data?.label || 'Процесс'
  const heading =
    data?.title ||
    'Каждый шаг продуман, чтобы дать вам уверенность и профессиональные навыки'
  const steps = data?.steps?.length
    ? data.steps
    : data?.stats?.length
      ? data.stats
      : DEFAULT_STEPS

  return (
    <SectionReveal className={s.section} id="trust">
      <div className={s.inner}>
        <p className={s.label}>{label}</p>
        <CharReveal as="h2" className={s.heading}>
          {heading}
        </CharReveal>

        <div className={s.track}>
          {steps.map((step, i) => {
            const number = step.number || String(i + 1).padStart(2, '0')
            return (
              <motion.div
                key={i}
                className={s.card}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-30px' }}
                transition={{ duration: 0.5, delay: i * 0.1, ease: 'easeOut' }}
              >
                <div className={s.cardContent}>
                  <div className={s.stepNumber}>{number}</div>
                  {step.title && <div className={s.title}>{step.title}</div>}
                  {(step.description || step.label) && (
                    <p className={s.description}>
                      {step.description || step.label}
                    </p>
                  )}
                </div>
                <div className={s.imageWrap}>
                  {step.image && (
                    <img
                      className={s.image}
                      src={step.image.url || step.image}
                      alt={step.title || `Шаг ${number}`}
                      loading="lazy"
                    />
                  )}
                </div>
              </motion.div>
            )
          })}
        </div>
      </div>
    </SectionReveal>
  )
}
