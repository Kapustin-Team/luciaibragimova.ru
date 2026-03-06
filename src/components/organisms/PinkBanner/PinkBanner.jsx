'use client'
import MaskReveal from '@/components/atoms/MaskReveal'
import FadeSlideUp from '@/components/atoms/FadeSlideUp'
import ScalePop from '@/components/atoms/ScalePop'
import s from './PinkBanner.module.sass'

export default function PinkBanner({ data } = {}) {
  return (
    <section className={s.section}>
      <div className={s.inner}>
        <div className={s.card}>
          <MaskReveal>
            <h2 className={s.title}>
              Более <span className={s.highlight}>500 семей</span> уже прошли путь к гармонии вместе с Люцией
            </h2>
          </MaskReveal>
          <FadeSlideUp delay={0.1}><p className={s.desc}>25 лет практики. Автор книг. Руководитель центра «Время первых».</p></FadeSlideUp>
          <ScalePop delay={0.2}><a href="#about" className={s.btn}>Узнать больше</a></ScalePop>
        </div>
      </div>
    </section>
  )
}
