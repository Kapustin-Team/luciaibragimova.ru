'use client'
import SectionReveal from '@/components/atoms/SectionReveal'
import s from './PinkBanner.module.sass'

export default function PinkBanner({ data } = {}) {
  const title = data?.title || 'Более <span>500 семей</span> уже прошли путь к гармонии вместе с Люцией'
  const description = data?.description || '25 лет практики. Автор книг. Руководитель центра «Время первых».'
  const ctaText = data?.ctaText || 'Узнать больше'
  const ctaLink = data?.ctaLink || '#about'

  return (
    <SectionReveal className={s.section}>
      <div className={s.inner}>
        <div className={s.card}>
          <div className={s.textCol}>
            <h2 className={s.title} dangerouslySetInnerHTML={{ __html: title.replace(/\*\*(.*?)\*\*/g, '<span class="highlight">$1</span>') }} />
            <p className={s.desc}>{description}</p>
            <a href={ctaLink} className={s.btn}>{ctaText}</a>
          </div>
          <div className={s.imageCol}>
            <img src="/interrior/img238.jpg" alt="" className={s.cardImage} />
          </div>
        </div>
      </div>
    </SectionReveal>
  )
}
