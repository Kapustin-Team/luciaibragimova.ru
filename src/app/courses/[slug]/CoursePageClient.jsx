'use client'
import { motion } from 'framer-motion'
import Header from '@/components/organisms/Header/Header'
import Footer from '@/components/organisms/Footer/Footer'
import s from './course.module.sass'

const FORMAT_LABELS = { online: 'Онлайн', offline: 'Офлайн', hybrid: 'Гибрид' }

export default function CoursePageClient({ course }) {
  const c = course
  const imgSrc = c.image?.url || c.image?.formats?.large?.url

  return (
    <>
      <Header />
      <main>

        {/* ─── Hero — orange bg, split layout (Figma 33:38591) ─── */}
        <section className={s.hero}>
          <div className={s.heroInner}>
            <div className={s.heroLeft}>
              {c.direction?.title && (
                <div className={s.dirBadge}>{c.direction.title}</div>
              )}
              <h1 className={s.heroTitle}>{c.title}</h1>
              <p className={s.heroDesc}>{c.shortDescription}</p>
              <div className={s.metaTags}>
                {c.format && <span className={s.metaTag}>{FORMAT_LABELS[c.format] || c.format}</span>}
                {c.duration && <span className={s.metaTag}>{c.duration}</span>}
                {c.lessonsCount && <span className={s.metaTag}>{c.lessonsCount} занятий</span>}
                {c.participantsCount && <span className={s.metaTag}>{c.participantsCount}</span>}
              </div>
              <div className={s.heroCta}>
                {c.getcourseLink ? (
                  <a href={c.getcourseLink} className={s.btnDark} target="_blank" rel="noopener">Записаться на курс</a>
                ) : (
                  <a href="#tariffs" className={s.btnDark}>Записаться на курс</a>
                )}
                <a href="#program" className={s.btnLight}>Программа курса</a>
              </div>
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
                    <div className={s.mockContent}>
                      <div className={s.mockBand} />
                      <div className={s.mockInner}>
                        <p className={s.mockLabel}>Курс от Люции Ибрагимовой</p>
                        <h3 className={s.mockTitle}>{c.title}</h3>
                        {c.duration && <p className={s.mockMeta}>{c.duration}</p>}
                        {c.lessonsCount && <p className={s.mockMeta}>{c.lessonsCount} занятий</p>}
                        <div className={s.mockBtn}>Подробнее →</div>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
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
              <div className={s.audienceGrid}>
                {c.targetAudience.map((a, i) => (
                  <motion.div key={i} className={s.audienceCard}
                    initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }} transition={{ delay: i * 0.07 }}>
                    <p>{a.text}</p>
                  </motion.div>
                ))}
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
                      <motion.li key={i} className={s.checkItem}
                        initial={{ opacity: 0, x: 12 }} whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }} transition={{ delay: i * 0.05 }}>
                        <span className={s.checkBox}>✓</span>
                        <span>{pain}</span>
                      </motion.li>
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
                  <div className={s.articleImageWrap}>
                    <div className={s.articleImgPlaceholder}>
                      <div className={s.imgPlaceholderBand} />
                      <div className={s.imgPlaceholderRow} />
                      <div className={s.imgPlaceholderRow} />
                      <div className={s.imgPlaceholderRow} style={{ width: '60%' }} />
                    </div>
                  </div>
                </div>
                <div className={s.articleText}>
                  <h2 className={s.articleTitle}>Что вы получите</h2>
                  <ul className={s.checkList}>
                    {c.results.map((r, i) => (
                      <motion.li key={i} className={s.checkItem}
                        initial={{ opacity: 0, x: 12 }} whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }} transition={{ delay: i * 0.06 }}>
                        <span className={s.checkBox}>✓</span>
                        <span>{r.text}</span>
                      </motion.li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </section>
        )}

        {/* ─── Программа — peach bg, numbered cards ─── */}
        {c.modules?.length > 0 && (
          <section className={s.sectionPeach} id="program">
            <div className={s.container}>
              <div className={s.centeredHeader}>
                <h2 className={s.sectionTitle}>Программа курса</h2>
                <p className={s.sectionSubtitle}>Структурированная программа, которая ведёт вас шаг за шагом.</p>
              </div>
              <div className={s.modulesGrid}>
                {c.modules.map((m, i) => (
                  <motion.div key={i} className={s.moduleCard}
                    initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }} transition={{ delay: i * 0.07 }}>
                    <div className={s.moduleNum}>Модуль {String(i + 1).padStart(2, '0')}</div>
                    <h3 className={s.moduleTitle}>{m.title}</h3>
                    {m.description && <p className={s.moduleDesc}>{m.description}</p>}
                  </motion.div>
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
                  <div className={s.articleImageWrap}>
                    <div className={s.articleImgPlaceholder}>
                      <div className={s.imgPlaceholderBand} style={{ background: 'var(--accent-blue)' }} />
                      <div className={s.imgPlaceholderRow} />
                      <div className={s.imgPlaceholderRow} />
                      <div className={s.imgPlaceholderRow} style={{ width: '70%' }} />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>
        )}

        {/* ─── Тарифы — white bg, pricing cards ─── */}
        {c.tariffs?.length > 0 && (
          <section className={s.sectionPeach} id="tariffs">
            <div className={s.container}>
              <div className={s.centeredHeader}>
                <h2 className={s.sectionTitle}>Выберите тариф</h2>
                <p className={s.sectionSubtitle}>Выберите формат участия, который подходит именно вам.</p>
              </div>
              <div className={s.tariffsGrid}>
                {c.tariffs.map((t, i) => (
                  <motion.div key={i} className={`${s.tariffCard} ${t.popular ? s.tariffPopular : ''}`}
                    initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }} transition={{ delay: i * 0.1 }}>
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
                  </motion.div>
                ))}
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

      </main>
      <Footer />
    </>
  )
}
