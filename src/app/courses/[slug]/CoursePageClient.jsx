'use client'
import { useState, useRef, useEffect } from 'react'
import Header from '@/components/organisms/Header/Header'
import Footer from '@/components/organisms/Footer/Footer'
import GradientPlaceholder from '@/components/atoms/GradientPlaceholder'
import s from './course.module.sass'

const FORMAT_LABELS = { online: 'Онлайн', offline: 'Офлайн', hybrid: 'Гибрид' }

function ModuleAccordion({ module: m, index: i }) {
  const [open, setOpen] = useState(false)
  return (
    <div className={`${s.moduleItem} ${open ? s.moduleItemOpen : ''}`}>
      <button className={s.moduleHeader} onClick={() => setOpen(v => !v)}>
        <span className={s.moduleNum}>Модуль {String(i + 1).padStart(2, '0')}</span>
        <span className={s.moduleTitle}>{m.title}</span>
        <span>▾</span>
      </button>
      {open && (
        <div className={s.moduleBody}>
          <p className={s.moduleDesc}>{m.description}</p>
        </div>
      )}
    </div>
  )
}

export default function CoursePageClient({ course }) {
  const c = course
  const imgSrc = c.image?.url || c.image?.formats?.large?.url
  const heroRef = useRef(null)
  const [heroInView, setHeroInView] = useState(true)
  useEffect(() => {
    const el = heroRef.current
    if (!el) return
    const obs = new IntersectionObserver(([e]) => setHeroInView(e.isIntersecting), { rootMargin: '-100px' })
    obs.observe(el)
    return () => obs.disconnect()
  }, [])

  return (
    <>
      <Header />
      <main>

        {/* ─── Hero — light bg, split layout (Figma 26:12215) ─── */}
        <section className={s.hero} ref={heroRef}>
          <div className={s.heroInner}>
            <div className={s.heroLeft}>
              <div className={s.heroBadges}>
                {c.direction?.title && (
                  <span className={s.badgeFilled}>{c.direction.title}</span>
                )}
                {c.format && (
                  <span className={s.badgeOutline}>{FORMAT_LABELS[c.format] || c.format}</span>
                )}
              </div>
              <h1 className={s.heroTitle}>{c.title}</h1>
              {c.shortDescription && (
                <p className={s.heroDesc}>{c.shortDescription}</p>
              )}
              <div className={s.heroButtons}>
                <a
                  href={c.getcourseLink || '#tariffs'}
                  className={s.btnPrimary}
                  {...(c.getcourseLink ? { target: '_blank', rel: 'noopener' } : {})}
                >
                  Записаться на курс
                </a>
                <a href="#program" className={s.btnSecondary}>Программа курса</a>
              </div>
            </div>

            <div className={s.heroRight}>
              {imgSrc ? (
                <img src={imgSrc} alt={c.title} className={s.heroImage} />
              ) : (
                <GradientPlaceholder variant="warm" aspectRatio="4/3" className={s.heroImage} />
              )}
            </div>
          </div>
        </section>

        {/* ─── Info cards row (Figma 26:12304) ─── */}
        <section className={s.infoCards}>
          <div className={s.infoCardsInner}>
            {c.format && (
              <div className={s.infoCard}>
                <span className={s.infoLabel}>Формат</span>
                <p className={s.infoValue}>{FORMAT_LABELS[c.format] || c.format}</p>
              </div>
            )}
            {c.duration && (
              <div className={s.infoCard}>
                <span className={s.infoLabel}>Длительность</span>
                <p className={s.infoValue}>{c.duration}</p>
              </div>
            )}
            {c.lessonsCount && (
              <div className={s.infoCard}>
                <span className={s.infoLabel}>Занятий</span>
                <p className={s.infoValue}>{c.lessonsCount}</p>
              </div>
            )}
            {c.participantsCount && (
              <div className={s.infoCard}>
                <span className={s.infoLabel}>Участники</span>
                <p className={s.infoValue}>{c.participantsCount} человек</p>
              </div>
            )}
          </div>
        </section>

        {/* ─── Для кого — white bg, card grid (Figma 33:38616 style) ─── */}
        {c.targetAudience?.length > 0 && (
          <section className={s.section}>
            <div className={s.container}>
              <div className={s.centeredHeader}>
                <h2 className={s.sectionTitle}>Для кого этот курс</h2>
                <p className={s.sectionSubtitle}>Курс разработан с учётом потребностей разных людей в разных жизненных ситуациях.</p>
              </div>
              <div style={{ perspective: '1000px' }}>
                <div className={s.audienceGrid}>
                  {c.targetAudience.map((a, i) => (
                    <div key={i} className={s.audienceCard}>
                      <div className={s.audienceNum}>{String(i + 1).padStart(2, '0')}</div>
                      <p>{a.text}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </section>
        )}

        {/* ─── Знакомые ситуации — peach bg, split with checklist (Figma 33:38964 style) ─── */}
        {c.pains?.length > 0 && (
          <section className={s.sectionPeach}>
            <div className={s.container}>
              <div className={s.featureLayout}>
                <div className={s.featureLeft}>
                  <h2 className={s.featureTitle}>Знакомые ситуации?</h2>
                  <p className={s.featureDesc}>Если хотя бы несколько пунктов откликаются — этот курс создан именно для вас.</p>
                </div>
                <div className={s.featureRight}>
                  <ul className={s.checkList}>
                    {c.pains.map((pain, i) => (
                      <li key={i} className={s.checkItem}>
                        <span className={s.checkBox}>✓</span>
                        <span>{pain}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </section>
        )}

        {/* ─── Что получите — white bg, image-left + text-right (Figma 33:38745 style) ─── */}
        {c.results?.length > 0 && (
          <section className={s.section} id="results">
            <div className={s.container}>
              <div className={s.articleLayout}>
                <div className={s.articleFigure}>
                  <GradientPlaceholder variant="warm" aspectRatio="740/478" />
                </div>
                <div className={s.articleText}>
                  <h2 className={s.articleTitle}>Что вы получите</h2>
                  <ul className={s.checkList}>
                    {c.results.map((r, i) => (
                      <li key={i} className={s.checkItem}>
                        <span className={s.checkBox}>✓</span>
                        <span>{r.text}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </section>
        )}

        {/* ─── Программа — peach bg, accordion modules ─── */}
        {c.modules?.length > 0 && (
          <section className={s.sectionPeach} id="program">
            <div className={s.container}>
              <div className={s.centeredHeader}>
                <h2 className={s.sectionTitle}>Программа курса</h2>
                <p className={s.sectionSubtitle}>Структурированная программа, которая ведёт вас шаг за шагом.</p>
              </div>
              <div className={s.modulesList}>
                {c.modules.map((m, i) => (
                  <ModuleAccordion key={i} module={m} index={i} />
                ))}
              </div>
            </div>
          </section>
        )}

        {/* ─── Методики — white bg, image-right + text-left (Figma 33:38757 style) ─── */}
        {c.methods?.length > 0 && (
          <section className={s.section}>
            <div className={s.container}>
              <div className={s.articleLayoutReverse}>
                <div className={s.articleText}>
                  <h2 className={s.articleTitle}>Методики и подходы</h2>
                  <p className={s.articleDesc}>Курс основан на проверенных психологических методиках и современных научных подходах.</p>
                  <div className={s.methodsWrap}>
                    {c.methods.map((m, i) => (
                      <span key={i} className={s.methodTag}>{m}</span>
                    ))}
                  </div>
                </div>
                <div className={s.articleFigure}>
                  <GradientPlaceholder variant="cool" aspectRatio="740/478" />
                </div>
              </div>
            </div>
          </section>
        )}

        {/* ─── Тарифы — pricing cards ─── */}
        {c.tariffs?.length > 0 && (
          <section className={s.sectionPeach} id="tariffs">
            <div className={s.container}>
              <div className={s.centeredHeader}>
                <h2 className={s.sectionTitle}>Выберите тариф</h2>
                <p className={s.sectionSubtitle}>Выберите формат участия, который подходит именно вам.</p>
              </div>
              <div style={{ perspective: '1000px' }}>
                <div className={s.tariffsGrid}>
                  {c.tariffs.map((t, i) => (
                    <div key={i} className={`${s.tariffCard} ${t.popular ? s.tariffPopular : ""}`}>
                      {t.popular && <div className={s.popularBadge}>Популярный</div>}
                      <h3 className={s.tariffName}>{t.name}</h3>
                      {t.features?.length > 0 && (
                        <ul className={s.tariffFeatures}>
                          {t.features.map((f, j) => (
                            <li key={j}>
                              <span className={s.tariffCheck}>✓</span>
                              <span>{f}</span>
                            </li>
                          ))}
                        </ul>
                      )}
                      <a href={c.getcourseLink || '#'} className={t.popular ? s.tariffBtnDark : s.tariffBtn}>
                        Выбрать тариф
                      </a>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </section>
        )}

        {/* ─── Ограничения — peach bg, checklist ─── */}
        {c.limitations?.length > 0 && (
          <section className={s.sectionPeach}>
            <div className={s.container}>
              <div className={s.featureLayout}>
                <div className={s.featureLeft}>
                  <h2 className={s.featureTitle}>Важно знать</h2>
                  <p className={s.featureDesc}>Обратите внимание перед записью на курс.</p>
                </div>
                <div className={s.featureRight}>
                  <ul className={s.checkList}>
                    {c.limitations.map((l, i) => (
                      <li key={i} className={s.checkItem}>
                        <span className={s.checkBox}>!</span>
                        <span>{l}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </section>
        )}

        {/* ─── CTA — orange bg + white card 56px radius (Figma 33:39189) ─── */}
        <section className={s.ctaSection}>
          <div className={s.ctaCard}>
            <h2 className={s.ctaTitle}>Готовы начать?</h2>
            <p className={s.ctaDesc}>Записывайтесь на курс и сделайте первый шаг к изменениям в вашей жизни</p>
            <a href={c.getcourseLink || '#tariffs'} className={s.ctaBtn}>Записаться на курс</a>
          </div>
        </section>

        {/* ─── Sticky CTA bar ─── */}
        {!heroInView && (
          <div className={s.stickyCta}>
            <div className={s.stickyCtaInner}>
              <span className={s.stickyCtaTitle}>{c.title}</span>
              <a href={c.getcourseLink || '#tariffs'} className={s.stickyCtaBtn}>Записаться</a>
            </div>
          </div>
        )}

      </main>
      <Footer />
    </>
  )
}
