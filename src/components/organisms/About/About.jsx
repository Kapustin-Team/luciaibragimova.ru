'use client'
import { useRef } from 'react'
import Image from 'next/image'
import { motion, useScroll, useTransform, useInView } from 'framer-motion'
import s from './About.module.sass'

const STRAPI_URL = process.env.NEXT_PUBLIC_STRAPI_URL || 'https://luciastrapi.kpstn.ru'
const MotionImage = motion.create(Image)

function mediaUrl(media) {
  if (!media) return null
  const url = typeof media === 'string' ? media : media.url || media.formats?.large?.url || media.formats?.medium?.url || media.formats?.small?.url
  if (!url) return null
  return url.startsWith('http') || (url.startsWith('/') && !url.startsWith('/uploads')) ? url : `${STRAPI_URL}${url}`
}

const DEFAULT_HIGHLIGHTS = [
  'Семейный психолог с 25-летним стажем',
  'Автор книг о взаимоотношениях с подростками',
  'Руководитель центра «Время первых»',
  'Работа с подростками на учёте КДН и ПДН',
  'Более 3 677 семей восстановили отношения',
]

export default function About({ data } = {}) {
  const label = data?.label || null
  const title = data?.title || 'Помогаю семьям вернуть близость и доверие'
  const description = data?.description || 'Люция Ибрагимова — семейный психолог с 25-летним опытом. Руководитель центра для трудных подростков «Время первых». За более чем 10 лет работы с «безнадёжными» подростками — десятки возвращений в школу, снятий с учётов.'
  const highlights = data?.highlights?.length ? data.highlights : DEFAULT_HIGHLIGHTS
  const imageUrl = mediaUrl(data?.image) || '/lucia-new.webp'

  const imageRef = useRef(null)
  const { scrollYProgress } = useScroll({ target: imageRef, offset: ['start end', 'end start'] })
  const imgY = useTransform(scrollYProgress, [0, 1], ['0%', '-10%'])

  // Reveal: photo slide-mask from bottom, then content fades in sequentially from right
  const sectionRef = useRef(null)
  const inView = useInView(sectionRef, { once: true, margin: '0px 0px -10% 0px' })

  const fadeRight = {
    hidden: { opacity: 0, x: 30 },
    visible: { opacity: 1, x: 0, transition: { duration: 0.6, ease: 'easeOut' } },
  }

  return (
    <section ref={sectionRef} className={s.section} id="about">
      <div className={s.inner}>
        <motion.div
          className={s.imageWrap}
          ref={imageRef}
          initial={{ clipPath: 'inset(100% 0 0 0)' }}
          animate={inView ? { clipPath: 'inset(0 0 0 0)' } : { clipPath: 'inset(100% 0 0 0)' }}
          transition={{ duration: 0.9, ease: [0.25, 0.46, 0.45, 0.94] }}
        >
          <MotionImage
            style={{ y: imgY }}
            src={imageUrl}
            alt="Люция Ибрагимова"
            className={s.photo}
            width={900}
            height={900}
            loading="lazy"
            sizes="(max-width: 768px) 100vw, 50vw"
          />
        </motion.div>
        <motion.div
          className={s.textCol}
          initial="hidden"
          animate={inView ? 'visible' : 'hidden'}
          variants={{
            hidden: {},
            visible: { transition: { staggerChildren: 0.12, delayChildren: 0.6 } },
          }}
        >
          {label && (
            <motion.span className={s.label} variants={fadeRight}>
              {label}
            </motion.span>
          )}
          <motion.h3 className={s.title} variants={fadeRight}>
            {title}
          </motion.h3>
          <motion.p className={s.desc} variants={fadeRight}>
            {description}
          </motion.p>
          <motion.ul
            className={s.list}
            variants={{
              hidden: {},
              visible: { transition: { staggerChildren: 0.08 } },
            }}
          >
            {highlights.map((f, i) => (
              <motion.li key={i} className={s.listItem} variants={fadeRight}>
                <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                  <circle cx="10" cy="10" r="10" fill="rgba(116,76,50,0.12)" />
                  <path d="M6 10l3 3 5-5" stroke="#25140C" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
                {f}
              </motion.li>
            ))}
          </motion.ul>
        </motion.div>
      </div>
    </section>
  )
}
