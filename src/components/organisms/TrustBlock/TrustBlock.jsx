'use client'
import s from './TrustBlock.module.sass'

const DEFAULT_STATS = [
  { number: '25+', label: 'лет практики' },
  { number: '3677+', label: 'семей прошли обучение' },
  { number: '14', label: 'авторских программ' },
  { number: '10+', label: 'лет работы с подростками' },
]

export default function TrustBlock({ data } = {}) {
  const title = data?.title || 'Наша студия в цифрах'
  const stats = data?.stats?.length ? data.stats : DEFAULT_STATS

  return (
    <section className={s.section} id="trust">
      <div className={s.inner}>
        <h2 className={s.heading}>{title}</h2>
        <div className={s.scroll}>
          {stats.map((stat, i) => (
            <div key={i} className={s.card}>
              <div className={s.number}>{stat.number}</div>
              <div className={s.label}>{stat.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
