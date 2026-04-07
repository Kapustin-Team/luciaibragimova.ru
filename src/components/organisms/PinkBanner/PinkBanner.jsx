'use client'
import { useRef } from 'react'
import { motion, useScroll, useTransform, useInView } from 'framer-motion'
import s from './PinkBanner.module.sass'

export default function PinkBanner({ data } = {}) {
  const title = data?.title || 'Более <span>500 семей</span> уже прошли путь к гармонии вместе с Люцией'
  const description = data?.description || '25 лет практики. Автор книг. Руководитель центра «Время первых».'
  const ctaText = data?.ctaText || 'Узнать больше'
  const ctaLink = data?.ctaLink || '#about'

  const imageRef = useRef(null)
  const { scrollYProgress } = useScroll({ target: imageRef, offset: ['start end', 'end start'] })
  const imgY = useTransform(scrollYProgress, [0, 1], ['0%', '-10%'])

  // Reveal sequence: card bg slides in from left → content fades from left → photo slides from right
  const cardRef = useRef(null)
  const inView = useInView(cardRef, { once: true, margin: '0px 0px -10% 0px' })

  // Preserve existing <span class="highlight"> markup without changing trust model
  const titleHtml = { __html: title.replace(/\*\*(.*?)\*\*/g, '<span class="highlight">$1</span>') }
  const injectedHtmlProps = { dangerouslySetInnerHTML: titleHtml }

  const fadeLeft = {
    hidden: { opacity: 0, x: -30 },
    visible: { opacity: 1, x: 0, transition: { duration: 0.6, ease: 'easeOut' } },
  }

  return (
    <section className={s.section}>
      <div className={s.inner}>
        <motion.div
          ref={cardRef}
          className={s.card}
          initial={{ clipPath: 'inset(0 100% 0 0)' }}
          animate={inView ? { clipPath: 'inset(0 0 0 0)' } : { clipPath: 'inset(0 100% 0 0)' }}
          transition={{ duration: 0.9, ease: [0.25, 0.46, 0.45, 0.94] }}
        >
          <motion.div
            className={s.textCol}
            initial="hidden"
            animate={inView ? 'visible' : 'hidden'}
            variants={{
              hidden: {},
              visible: { transition: { staggerChildren: 0.15, delayChildren: 0.55 } },
            }}
          >
            <motion.h2 className={s.title} variants={fadeLeft} {...injectedHtmlProps} />
            <motion.p className={s.desc} variants={fadeLeft}>
              {description}
            </motion.p>
            <motion.a href={ctaLink} className={s.btn} variants={fadeLeft}>
              {ctaText}
            </motion.a>
          </motion.div>
          <motion.div
            className={s.imageCol}
            ref={imageRef}
            initial={{ clipPath: 'inset(0 0 0 100%)' }}
            animate={inView ? { clipPath: 'inset(0 0 0 0)' } : { clipPath: 'inset(0 0 0 100%)' }}
            transition={{ duration: 0.9, ease: [0.25, 0.46, 0.45, 0.94], delay: 0.4 }}
          >
            <motion.img src="/interrior/img238.jpg" alt="" className={s.cardImage} style={{ y: imgY }} />
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}
