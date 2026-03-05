'use client'
import DecorativeShapes from '@/components/atoms/DecorativeShapes'
import s from './Hero.module.sass'

const heroShapes = [
  { shape: 'blob1', color: 'rgba(232, 108, 79, 0.08)', size: '320px', style: { top: '-60px', right: '-80px' } },
  { shape: 'semicircle', color: 'rgba(196, 181, 224, 0.1)', size: '200px', style: { bottom: '40px', left: '-60px' } },
  { shape: 'triangle', color: 'rgba(245, 215, 160, 0.08)', size: '100px', style: { top: '30%', right: '15%' } },
  { shape: 'circle', color: 'rgba(214, 232, 240, 0.06)', size: '160px', style: { bottom: '-40px', right: '30%' } },
]

export default function Hero({ data } = {}) {
  const title = data?.title || 'Верните доверие\nи взаимопонимание\nс подростком'
  const desc = data?.description || 'Авторские программы семейного психолога с 25-летним опытом. Сотни семей уже прошли этот путь.'
  const stats = data?.stats || ['25 лет опыта', '500+ семей', '14 курсов']
  const ctaPrimary = data?.ctaPrimary || 'Выбрать курс'
  const ctaPrimaryLink = data?.ctaPrimaryLink || '#courses'
  const ctaSecondary = data?.ctaSecondary || 'Бесплатная консультация'
  const ctaSecondaryLink = data?.ctaSecondaryLink || '#'

  return (
    <section className={s.hero}>
      <DecorativeShapes items={heroShapes} />
      <div className={s.inner}>
        <div className={s.content}>
          <h1 className={s.title}>
            {title.split('\n').map((line, i) => <span key={i}>{line}{i < title.split('\n').length - 1 && <br />}</span>)}
          </h1>
          <p className={s.desc}>{desc}</p>
          <div className={s.stat}>
            <span className={s.statText}>{Array.isArray(stats) ? stats.join(' · ') : stats}</span>
          </div>
          <div className={s.buttons}>
            <a href={ctaPrimaryLink} className={s.btnPrimary}>{ctaPrimary}</a>
            <a href={ctaSecondaryLink} className={s.btnOutline}>{ctaSecondary}</a>
          </div>
        </div>
        <div className={s.imageWrap}>
          <img src="/images/hero.png" alt="Люция Ибрагимова" className={s.heroImage} />
        </div>
      </div>
    </section>
  )
}
