'use client'
import { useRef } from 'react'
import { motion, useScroll, useTransform, useInView } from 'framer-motion'
import s from './FeaturedCourse.module.sass'

const STRAPI_URL = process.env.NEXT_PUBLIC_STRAPI_URL || 'https://luciastrapi.kpstn.ru'

function mediaUrl(media) {
  if (!media) return null
  const url = media.url || media.formats?.large?.url || media.formats?.medium?.url
  if (!url) return null
  return url.startsWith('http') ? url : `${STRAPI_URL}${url}`
}

export default function FeaturedCourse({ data, courses } = {}) {
  const featuredFallback = (courses || []).find((item) => item.slug === 'vovremya') || (courses && courses[0]) || null
  const course = data?.course || featuredFallback
  const title = data?.title || course?.title || 'Начните свой путь'
  const description = data?.description || course?.description || 'Откройте для себя программу, которая изменит вашу жизнь.'
  const ctaText = data?.ctaText || 'Подробнее'
  const ctaLink = data?.ctaLink && data.ctaLink !== '/' ? data.ctaLink : (course?.slug ? `/courses/${course.slug}` : '#courses')
  const imgSrc = mediaUrl(data?.image || course?.image) || '/interrior/img275.jpg'

  const imageRef = useRef(null)
  const { scrollYProgress } = useScroll({ target: imageRef, offset: ['start end', 'end start'] })
  const imgY = useTransform(scrollYProgress, [0, 1], ['0%', '-10%'])

  // Reveal sequence — reversed from About: content fades in from left first, then photo mask
  const sectionRef = useRef(null)
  const inView = useInView(sectionRef, { once: true, margin: '0px 0px -10% 0px' })

  const fadeLeft = {
    hidden: { opacity: 0, x: -30 },
    visible: { opacity: 1, x: 0, transition: { duration: 0.6, ease: 'easeOut' } },
  }

  return (
    <section ref={sectionRef} className={s.section}>
      <div className={s.inner}>
        <motion.div
          className={s.imageWrap}
          ref={imageRef}
          initial={{ clipPath: 'inset(100% 0 0 0)' }}
          animate={inView ? { clipPath: 'inset(0 0 0 0)' } : { clipPath: 'inset(100% 0 0 0)' }}
          transition={{ duration: 0.9, ease: [0.25, 0.46, 0.45, 0.94], delay: 0.6 }}
        >
          <motion.img src={imgSrc} alt={title} className={s.image} style={{ y: imgY }} />
        </motion.div>
        <motion.div
          className={s.panel}
          initial="hidden"
          animate={inView ? 'visible' : 'hidden'}
          variants={{
            hidden: {},
            visible: { transition: { staggerChildren: 0.12, delayChildren: 0.1 } },
          }}
        >
          <motion.h2 className={s.title} variants={fadeLeft}>
            {title}
          </motion.h2>
          <motion.p className={s.desc} variants={fadeLeft}>
            {description}
          </motion.p>
          <motion.div className={s.actions} variants={fadeLeft}>
            <a href={ctaLink} className={s.btn}>{ctaText}</a>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}
