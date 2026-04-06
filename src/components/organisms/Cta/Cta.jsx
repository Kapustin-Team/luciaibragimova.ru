'use client'
import { useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import s from './Cta.module.sass'

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

  return (
    <motion.section ref={sectionRef} className={s.section}>
      <motion.img style={{ scale: imgScale, y: imgY }} src={src} alt="" className={s.image} />
    </motion.section>
  )
}
