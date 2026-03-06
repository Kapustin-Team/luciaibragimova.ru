'use client'
import s from './Directions.module.sass'

const dirs = [
  { title: 'Рождение семьи', desc: 'Курсы для молодых пар, будущих мам и начинающих родителей.', count: 3, image: '/directions/dir-family.webp' },
  { title: 'Здоровое взросление', desc: 'Работа с подростками и их родителями. Курс «Вовремя» и другие.', count: 4, image: '/directions/dir-growing.webp' },
  { title: 'Развитие', desc: 'Тренинги уверенности, коммуникации и самопознания для всей семьи.', count: 4, image: '/directions/dir-development.webp' },
  { title: 'Трансформация', desc: 'Глубинная работа с выгоранием и поиском внутренней опоры.', count: 3, image: '/directions/dir-transformation.webp' },
]

function handleClick(e, dirTitle) {
  e.preventDefault()
  const el = document.getElementById('courses')
  if (el) el.scrollIntoView({ behavior: 'smooth' })
  window.dispatchEvent(new CustomEvent('filter-courses', { detail: { direction: dirTitle } }))
}

export default function Directions({ data, directions } = {}) {
  return (
    <section className={s.section} id="directions">
      <div className={s.inner}>
        <div className={s.header}>
          <h2 className={s.sectionTitle}>Направления обучения</h2>
          <p className={s.sectionSubtitle}>Выберите то, что актуально для вашей семьи</p>
        </div>
        <div className={s.grid}>
          {dirs.map((d) => (
            <a
              key={d.title}
              href="#courses"
              className={s.card}
              onClick={(e) => handleClick(e, d.title)}
            >
              <div className={s.cardImageWrap}>
                <img src={d.image} alt={d.title} className={s.cardImage} loading="lazy" />
              </div>
              <div className={s.cardBody}>
                <span className={s.cardCount}>{d.count} программы</span>
                <h3 className={s.cardTitle}>{d.title}</h3>
                <p className={s.cardDesc}>{d.desc}</p>
                <span className={s.cardLink}>Смотреть →</span>
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  )
}
