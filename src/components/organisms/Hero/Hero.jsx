'use client'
import { motion } from 'framer-motion'
import Button from '@/components/atoms/Button'
import s from './Hero.module.sass'

export default function Hero() {
  return (
    <section className={s.hero}>
      <div className={s.inner}>
        <motion.div
          className={s.content}
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <span className={s.badge}>Школа психологии</span>
          <h1 className={s.title}>
            Люция<br />Ибрагимова
          </h1>
          <p className={s.desc}>
            Семейный психолог с 25-летним опытом. Помогаю семьям наладить отношения
            с подростками и вернуть гармонию.
          </p>
          <div className={s.actions}>
            <Button href="#courses">Смотреть курсы</Button>
            <Button variant="outline" href="#about">Обо мне</Button>
          </div>
          <div className={s.stats}>
            <div className={s.stat}>
              <strong>25+</strong>
              <span>лет опыта</span>
            </div>
            <div className={s.stat}>
              <strong>500+</strong>
              <span>семей</span>
            </div>
            <div className={s.stat}>
              <strong>15+</strong>
              <span>курсов</span>
            </div>
          </div>
        </motion.div>
        <motion.div
          className={s.imageWrap}
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <div className={s.imagePlaceholder}>
            <span>Фото Люции</span>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
