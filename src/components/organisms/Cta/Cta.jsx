'use client'
import { useRef } from 'react'
import Image from 'next/image'
import { motion, useScroll, useTransform, useInView } from 'framer-motion'
import s from './Cta.module.sass'

const MotionImage = motion.create(Image)

const STRAPI_URL = process.env.NEXT_PUBLIC_STRAPI_URL || 'https://luciastrapi.kpstn.ru'

function imageUrl(media) {
  if (!media) return null
  const url = media.url || media.formats?.large?.url || media.formats?.medium?.url
  if (!url) return null
  return url.startsWith('http') ? url : `${STRAPI_URL}${url}`
}

export default function Cta({ data } = {}) {
  const src = imageUrl(data?.image) || '/interrior/img285.jpg'

  const sectionRef = useRef(null)
  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ['start end', 'end start'] })
  const imgScale = useTransform(scrollYProgress, [0, 1], [1.05, 1])
  const imgY = useTransform(scrollYProgress, [0, 1], ['0%', '-5%'])

  // Top-down clipPath mask reveal (top → bottom)
  const maskRef = useRef(null)
  const inView = useInView(maskRef, { once: true, margin: '0px 0px -10% 0px' })

  return (
    <motion.section
      ref={maskRef}
      className={s.section}
      initial={{ clipPath: 'inset(0 0 100% 0)' }}
      animate={inView ? { clipPath: 'inset(0 0 0 0)' } : { clipPath: 'inset(0 0 100% 0)' }}
      transition={{ duration: 0.9, ease: [0.25, 0.46, 0.45, 0.94] }}
    >
      <div ref={sectionRef} className={s.imageWrap}>
        <MotionImage
          style={{ scale: imgScale, y: imgY }}
          src={src}
          alt=""
          className={s.image}
          width={1600}
          height={900}
          sizes="100vw"
        />
      </div>
    </motion.section>
  )
}
