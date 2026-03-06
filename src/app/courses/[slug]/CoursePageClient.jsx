'use client'
import { useState, useRef } from 'react'
import { motion, AnimatePresence, useInView } from 'framer-motion'
import Header from '@/components/organisms/Header/Header'
import Footer from '@/components/organisms/Footer/Footer'
import MaskReveal from '@/components/atoms/MaskReveal'
import FadeSlideUp from '@/components/atoms/FadeSlideUp'
import Card3D from '@/components/atoms/Card3D'
import ScalePop from '@/components/atoms/ScalePop'
import GradientPlaceholder from '@/components/atoms/GradientPlaceholder'
import s from './course.module.sass'

const FORMAT_LABELS = { online: 'Онлайн', offline: 'Офлайн', hybrid: 'Гибрид' }

function ModuleAccordion({ module: m, index: i }) {
  const [open, setOpen] = useState(false)
  return (
    <FadeSlideUp delay={i * 0.05} className={`${s.moduleItem} ${open ? s.moduleItemOpen : ''}`}>
      <button className={s.moduleHeader} onClick={() => setOpen(v => !v)}>
        <span className={s.moduleNum}>Модуль {String(i + 1).padStart(2, '0')}</span>
        <span className={s.moduleTitle}>{m.title}</span>
        <motion.span className={s.moduleChevron} animate={{ rotate: open ? 180 : 0 }} transition={{ duration: 0.3 }}>
          ▾
        </motion.span>
      </button>
      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            className={s.moduleBody}
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: 'easeInOut' }}
          >
            <p className={s.moduleDesc}>{m.description}</p>
          </motion.div>
        )}
      </AnimatePresence>
    </FadeSlideUp>
  )
}

export default function CoursePageClient({ course }) {
  const c = course
  const imgSrc = c.image?.url || c.image?.formats?.large?.url
  const heroRef = useRef(null)
  const heroInView = useInView(heroRef, { margin: '-100px' })

  return (
    <>
      <Header />
      <main>

        {/* ─── Hero — orange bg, split layout (Figma 33:38591) ─── */}
        <section className={s.hero} ref={heroRef}>
          <div className={s.heroInner}>
            <div className={s.heroLeft}>
              {c.direction?.title && (
                <MaskReveal><div className={s.dirBadge}>{c.direction.title}</div></MaskReveal>
              )}
              <MaskReveal delay={0.1}><h1 className={s.heroTitle}>{c.title}</h1></MaskReveal>
              <FadeSlideUp delay={0.2}><p className={s.heroDesc}>{c.shortDescription}</p></FadeSlideUp>
              <ScalePop delay={0.3} className={s.heroCta}>
                {c.getcourseLink ? (
                  <a href={c.getcourseLink} className={s.btnDark} target="_blank" rel="noopener">Записаться на курс</a>
                ) : (
                  <a href="#tariffs" className={s.btnDark}>Записаться на курс</a>
                )}
                <a href="#program" className={s.btnLight}>Программа курса</a>
              </ScalePop>
            </div>

            {/* Browser-window mockup on the right */}
            <div className={s.heroRight}>
              <div className={s.browserMock}>
                <div className={s.browserBar}>
                  <span className={s.dot} />
                  <span className={s.dot} />
                  <span className={s.dot} />
                </div>
                <div className={s.browserBody}>
                  {imgSrc ? (
                    <img src={imgSrc} alt={c.title} className={s.browserImg} />
                  ) : (
                    <GradientPlaceholder variant="mixed" aspectRatio="16/10" className={s.browserGradient}>
                      <div className={s.mockOverlay}>
                        <p className={s.mockLabel}>Курс от Люции Ибрагимовой</p>
                        <h3 className={s.mockTitle}>{c.title}</h3>
                      </div>
                    </GradientPlaceholder>
                  )}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ─── Stat bar — white bg, horizontal stats with icons ─── */}
        <section className={s.statBar}>
          <div className={s.statBarInner}>
            {c.format && (
              <ScalePop delay={0} className={s.statItem}>
                <span className={s.statIcon}>📋</span>
                <div>
                  <div className={s.statValue}>{FORMAT_LABELS[c.format] || c.format}</div>
                  <div className={s.statLabel}>Формат</div>
                </div>
              </ScalePop>
            )}
            {c.duration && (
              <ScalePop delay={0.1} className={s.statItem}>
                <span className={s.statIcon}>⏱</span>
                <div>
                  <div className={s.statValue}>{c.duration}</div>
                  <div className={s.statLabel}>Длительность</div>
                </div>
              </ScalePop>
            )}
            {c.lessonsCount && (
              <ScalePop delay={0.2} className={s.statItem}>
                <span className={s.statIcon}>📚</span>
                <div>
                  <div className={s.statValue}>{c.lessonsCount}</div>
                  <div className={s.statLabel}>Занятий</div>
                </div>
              </ScalePop>
            )}
            {c.participantsCount && (
              <ScalePop delay={0.3} className={s.statItem}>
                <span className={s.statIcon}>👥</span>
                <div>
                  <div className={s.statValue}>{c.participantsCount}</div>
                  <div className={s.statLabel}>Участников</div>
                </div>
              </ScalePop>
            )}
          </div>
        </section>

        {/* ─── Для кого — white bg, card grid (Figma 33:38616 style) ─── */}
        {c.targetAudience?.length > 0 && (
          <section className={s.section}>
            <div className={s.container}>
              <div className={s.centeredHeader}>
                <MaskReveal><h2 className={s.sectionTitle}>Для кого этот курс</h2></MaskReveal>
                <FadeSlideUp delay={0.1}><p className={s.sectionSubtitle}>Курс разработан с учётом потребностей разных людей в разных жизненных ситуациях.</p></FadeSlideUp>
              </div>
              <div style={{ perspective: '1000px' }}>
                <div className={s.audienceGrid}>
                  {c.targetAudience.map((a, i) => (
                    <Card3D key={i} className={s.audienceCard} index={i}>
                      <div className={s.audienceNum}>{String(i + 1).padStart(2, '0')}</div>
                      <p>{a.text}</p>
                    </Card3D>
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
                  <MaskReveal><h2 className={s.featureTitle}>Знакомые ситуации?</h2></MaskReveal>
                  <FadeSlideUp delay={0.1}><p className={s.featureDesc}>Если хотя бы несколько пунктов откликаются — этот курс создан именно для вас.</p></FadeSlideUp>
                </div>
                <div className={s.featureRight}>
                  <ul className={s.checkList}>
                    {c.pains.map((pain, i) => (
                      <FadeSlideUp as="li" key={i} delay={i * 0.05} className={s.checkItem}>
                        <span className={s.checkBox}>✓</span>
                        <span>{pain}</span>
                      </FadeSlideUp>
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
                  <MaskReveal><h2 className={s.articleTitle}>Что вы получите</h2></MaskReveal>
                  <ul className={s.checkList}>
                    {c.results.map((r, i) => (
                      <FadeSlideUp as="li" key={i} delay={i * 0.05} className={s.checkItem}>
                        <span className={s.checkBox}>✓</span>
                        <span>{r.text}</span>
                      </FadeSlideUp>
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
                <MaskReveal><h2 className={s.sectionTitle}>Программа курса</h2></MaskReveal>
                <FadeSlideUp delay={0.1}><p className={s.sectionSubtitle}>Структурированная программа, которая ведёт вас шаг за шагом.</p></FadeSlideUp>
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
                  <MaskReveal><h2 className={s.articleTitle}>Методики и подходы</h2></MaskReveal>
                  <FadeSlideUp delay={0.1}><p className={s.articleDesc}>Курс основан на проверенных психологических методиках и современных научных подходах.</p></FadeSlideUp>
                  <FadeSlideUp delay={0.2}>
                    <div className={s.methodsWrap}>
                      {c.methods.map((m, i) => (
                        <span key={i} className={s.methodTag}>{m}</span>
                      ))}
                    </div>
                  </FadeSlideUp>
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
                <MaskReveal><h2 className={s.sectionTitle}>Выберите тариф</h2></MaskReveal>
                <FadeSlideUp delay={0.1}><p className={s.sectionSubtitle}>Выберите формат участия, который подходит именно вам.</p></FadeSlideUp>
              </div>
              <div style={{ perspective: '1000px' }}>
                <div className={s.tariffsGrid}>
                  {c.tariffs.map((t, i) => (
                    <Card3D key={i} className={`${s.tariffCard} ${t.popular ? s.tariffPopular : ''}`} index={i} stagger={0.1}>
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
                    </Card3D>
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
                  <MaskReveal><h2 className={s.featureTitle}>Важно знать</h2></MaskReveal>
                  <FadeSlideUp delay={0.1}><p className={s.featureDesc}>Обратите внимание перед записью на курс.</p></FadeSlideUp>
                </div>
                <div className={s.featureRight}>
                  <ul className={s.checkList}>
                    {c.limitations.map((l, i) => (
                      <FadeSlideUp as="li" key={i} delay={i * 0.05} className={s.checkItem}>
                        <span className={s.checkBox}>!</span>
                        <span>{l}</span>
                      </FadeSlideUp>
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
            <MaskReveal><h2 className={s.ctaTitle}>Готовы начать?</h2></MaskReveal>
            <FadeSlideUp delay={0.1}><p className={s.ctaDesc}>Записывайтесь на курс и сделайте первый шаг к изменениям в вашей жизни</p></FadeSlideUp>
            <ScalePop delay={0.2}>
              <a href={c.getcourseLink || '#tariffs'} className={s.ctaBtn}>Записаться на курс</a>
            </ScalePop>
          </div>
        </section>

        {/* ─── Sticky CTA bar ─── */}
        <AnimatePresence>
          {!heroInView && (
            <motion.div
              className={s.stickyCta}
              initial={{ y: '100%' }}
              animate={{ y: 0 }}
              exit={{ y: '100%' }}
              transition={{ duration: 0.3, ease: 'easeOut' }}
            >
              <div className={s.stickyCtaInner}>
                <span className={s.stickyCtaTitle}>{c.title}</span>
                <a href={c.getcourseLink || '#tariffs'} className={s.stickyCtaBtn}>Записаться</a>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

      </main>
      <Footer />
    </>
  )
}
