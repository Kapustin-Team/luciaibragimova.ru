'use client'
import DecorativeShapes from '@/components/atoms/DecorativeShapes'
import s from './Hero.module.sass'

const heroShapes = [
  { shape: 'blob1', color: 'rgba(232, 108, 79, 0.08)', size: '320px', style: { top: '-60px', right: '-80px' } },
  { shape: 'semicircle', color: 'rgba(196, 181, 224, 0.1)', size: '200px', style: { bottom: '40px', left: '-60px' } },
  { shape: 'triangle', color: 'rgba(245, 215, 160, 0.08)', size: '100px', style: { top: '30%', right: '15%' } },
  { shape: 'circle', color: 'rgba(214, 232, 240, 0.06)', size: '160px', style: { bottom: '-40px', right: '30%' } },
]

export default function Hero() {
  return (
    <section className={s.hero}>
      <DecorativeShapes items={heroShapes} />
      <div className={s.inner}>
        <div className={s.content}>
          <h1 className={s.title}>
            Верните доверие{'\n'}и взаимопонимание{'\n'}с подростком
          </h1>
          <p className={s.desc}>
            Авторские программы семейного психолога с 25-летним опытом.
            Сотни семей уже прошли этот путь.
          </p>
          <div className={s.stat}>
            <span className={s.statText}>25 лет опыта · 500+ семей · 14 курсов</span>
          </div>
          <div className={s.buttons}>
            <a href="#courses" className={s.btnPrimary}>Выбрать курс</a>
            <a href="#" className={s.btnOutline}>Бесплатная консультация</a>
          </div>
        </div>
        <div className={s.imageWrap}>
          <img src="/images/hero.png" alt="Люция Ибрагимова" className={s.heroImage} />
        </div>
      </div>
    </section>
  )
}
