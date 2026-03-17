'use client'
import { useState, useEffect } from 'react'
import s from './Hero.module.sass'

const subtitles = [
  'Авторские программы семейного психолога с 25-летним опытом',
  'Сотни семей уже прошли этот путь к доверию',
  'Индивидуальный подход к каждой семье',
]

function scrollAndFilter(detail) {
  const el = document.getElementById('courses')
  if (el) el.scrollIntoView({ behavior: 'smooth' })
  window.dispatchEvent(new CustomEvent('filter-courses', { detail }))
}

export default function Hero({ data } = {}) {
  const title = data?.title || 'Путь к благополучию\nсемьи'
  const [subtitleIdx, setSubtitleIdx] = useState(0)
  const [fade, setFade] = useState(true)

  useEffect(() => {
    const interval = setInterval(() => {
      setFade(false)
      setTimeout(() => {
        setSubtitleIdx(prev => (prev + 1) % subtitles.length)
        setFade(true)
      }, 400)
    }, 4000)
    return () => clearInterval(interval)
  }, [])

  return (
    <section className={s.hero}>
      <div className={s.decorCircle1} />
      <div className={s.decorCircle2} />
      <div className={s.decorDots} />

      <div className={s.inner}>
        <div className={s.topRow}>
          <div className={s.content}>
            <h1 className={s.title}>
              {title.split('\n').map((line, i, arr) => (
                <span key={i}>{line}{i < arr.length - 1 && <br />}</span>
              ))}
            </h1>
            <p className={`${s.desc} ${fade ? s.fadeIn : s.fadeOut}`}>
              {subtitles[subtitleIdx]}
            </p>
            <div className={s.buttons}>
              <a href="#courses" className={s.btnPrimary}>Выбрать курс</a>
              <a href="#faq" className={s.btnOutline}>Не знаю, с чего начать</a>
            </div>
            <div className={s.location}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/>
                <circle cx="12" cy="10" r="3"/>
              </svg>
              <span>Екатеринбург · онлайн по всему миру</span>
            </div>
          </div>

          <div className={s.videoWrap}>
            <iframe
              className={s.video}
              src="https://kinescope.io/embed/o1ZLJ9qRpjsF3acNkduExU"
              allow="autoplay; fullscreen; picture-in-picture; encrypted-media; gyroscope; accelerometer; clipboard-write; web-share"
              frameBorder="0"
              allowFullScreen
            />
          </div>
        </div>

        <div className={s.cards}>
          <button
            type="button"
            className={`${s.card} ${s.cardPink} ${s.cardLeft}`}
            onClick={() => scrollAndFilter({ format: 'Онлайн' })}
          >
            <div className={s.cardHeader}>
              <div className={s.cardTitle}>
                Онлайн-курсы <span className={s.cardArrow}>›</span>
              </div>
              <p className={s.cardDesc}>
                Авторские программы по семейной психологии. Смотрите в удобном темпе.
              </p>
            </div>
          </button>

          <a
            href="#faq"
            className={`${s.card} ${s.cardDark} ${s.cardCenter}`}
          >
            <div className={s.cardHeader}>
              <div className={s.cardTitle}>
                Консультации <span className={s.cardArrow}>›</span>
              </div>
              <p className={s.cardDesc}>
                Индивидуальная работа с психологом. Онлайн или очно в Екатеринбурге.
              </p>
            </div>
          </a>

          <button
            type="button"
            className={`${s.card} ${s.cardLight} ${s.cardRight}`}
            onClick={() => scrollAndFilter({ format: 'Офлайн' })}
          >
            <div className={s.cardHeader}>
              <div className={s.cardTitle}>
                Живые тренинги <span className={s.cardArrow}>›</span>
              </div>
              <p className={s.cardDesc}>
                Интенсивы и группы для глубокой трансформации. Для всей семьи.
              </p>
            </div>
          </button>
        </div>
      </div>
    </section>
  )
}
