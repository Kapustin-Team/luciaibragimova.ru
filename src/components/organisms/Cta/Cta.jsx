'use client'
import MaskReveal from '@/components/atoms/MaskReveal'
import FadeSlideUp from '@/components/atoms/FadeSlideUp'
import ScalePop from '@/components/atoms/ScalePop'
import s from './Cta.module.sass'

export default function Cta({ data } = {}) {
  return (
    <section className={s.section}>
      <div className={s.outer}>
        <div className={s.card}>
          <MaskReveal><h2 className={s.title}>Начните путь<br />к гармонии</h2></MaskReveal>
          <FadeSlideUp delay={0.1}><p className={s.subtitle}>Выберите программу — онлайн, офлайн или гибрид.</p></FadeSlideUp>
          <ScalePop delay={0.2}>
            <div className={s.actions}>
              <a href="#courses" className={s.btnDark}>Выбрать курс</a>
              <a href="#" className={s.btnOutline}>Бесплатная консультация</a>
            </div>
          </ScalePop>
        </div>
      </div>
    </section>
  )
}
