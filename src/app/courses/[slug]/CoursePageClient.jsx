'use client'
import { motion } from 'framer-motion'
import Header from '@/components/organisms/Header/Header'
import Footer from '@/components/organisms/Footer/Footer'
import s from './course.module.sass'

const FORMAT_LABELS = { online: 'Онлайн', offline: 'Офлайн', hybrid: 'Гибрид' }

export default function CoursePageClient({ course }) {
  const c = course

  return (
    <>
      <Header />
      <main className={s.page}>
        {/* Hero */}
        <section className={s.hero}>
          <div className={s.heroInner}>
            <div className={s.heroContent}>
              {c.direction?.title && (
                <span className={s.dirBadge}>{c.direction.title}</span>
              )}
              {c.badge && <span className={s.badge}>{c.badge}</span>}
              <h1 className={s.title}>{c.title}</h1>
              <p className={s.shortDesc}>{c.shortDescription}</p>
              <div className={s.meta}>
                {c.format && <span className={s.metaItem}>{FORMAT_LABELS[c.format] || c.format}</span>}
                {c.duration && <span className={s.metaItem}>{c.duration}</span>}
                {c.participantsCount && <span className={s.metaItem}>{c.participantsCount}</span>}
                {c.lessonsCount && <span className={s.metaItem}>{c.lessonsCount} занятий</span>}
              </div>
              <div className={s.heroCta}>
                {c.getcourseLink ? (
                  <a href={c.getcourseLink} className={s.btnPrimary} target="_blank" rel="noopener">Записаться</a>
                ) : (
                  <a href="#tariffs" className={s.btnPrimary}>Записаться</a>
                )}
                <a href="#program" className={s.btnOutline}>Программа курса</a>
              </div>
            </div>
          </div>
        </section>

        {/* Для кого */}
        {c.targetAudience?.length > 0 && (
          <section className={s.section}>
            <div className={s.container}>
              <h2 className={s.sectionTitle}>Для кого этот курс</h2>
              <div className={s.audienceGrid}>
                {c.targetAudience.map((a, i) => (
                  <motion.div key={i} className={s.audienceCard}
                    initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }} transition={{ delay: i * 0.1 }}>
                    <p>{a.text}</p>
                  </motion.div>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* Боли */}
        {c.pains?.length > 0 && (
          <section className={s.sectionAlt}>
            <div className={s.container}>
              <h2 className={s.sectionTitle}>Знакомые проблемы?</h2>
              <div className={s.painGrid}>
                {c.pains.map((pain, i) => (
                  <motion.div key={i} className={s.painCard}
                    initial={{ opacity: 0, scale: 0.95 }} whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }} transition={{ delay: i * 0.05 }}>
                    {pain}
                  </motion.div>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* Результаты */}
        {c.results?.length > 0 && (
          <section className={s.section}>
            <div className={s.container}>
              <h2 className={s.sectionTitle}>Что вы получите</h2>
              <div className={s.resultsGrid}>
                {c.results.map((r, i) => (
                  <motion.div key={i} className={s.resultCard}
                    initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }} transition={{ delay: i * 0.08 }}>
                    <span className={s.resultIcon}>✓</span>
                    <span>{r.text}</span>
                  </motion.div>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* Программа */}
        {c.modules?.length > 0 && (
          <section className={s.sectionAlt} id="program">
            <div className={s.container}>
              <h2 className={s.sectionTitle}>Программа курса</h2>
              <div className={s.modulesGrid}>
                {c.modules.map((m, i) => (
                  <motion.div key={i} className={s.moduleCard}
                    initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }} transition={{ delay: i * 0.08 }}>
                    <div className={s.moduleNum}>{String(i + 1).padStart(2, '0')}</div>
                    <h3 className={s.moduleTitle}>{m.title}</h3>
                    {m.description && <p className={s.moduleDesc}>{m.description}</p>}
                  </motion.div>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* Тарифы */}
        {c.tariffs?.length > 0 && (
          <section className={s.section} id="tariffs">
            <div className={s.container}>
              <h2 className={s.sectionTitle}>Тарифы</h2>
              <div className={s.tariffsGrid}>
                {c.tariffs.map((t, i) => (
                  <motion.div key={i} className={`${s.tariffCard} ${t.popular ? s.tariffPopular : ''}`}
                    initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }} transition={{ delay: i * 0.1 }}>
                    <h3 className={s.tariffName}>{t.name}</h3>
                    {t.features?.length > 0 && (
                      <ul className={s.tariffFeatures}>
                        {t.features.map((f, j) => (
                          <li key={j}>{f}</li>
                        ))}
                      </ul>
                    )}
                    <a href={c.getcourseLink || '#'} className={s.tariffBtn}>Выбрать</a>
                  </motion.div>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* Методики */}
        {c.methods?.length > 0 && (
          <section className={s.sectionAlt}>
            <div className={s.container}>
              <h2 className={s.sectionTitle}>Методики и подходы</h2>
              <div className={s.methodsWrap}>
                {c.methods.map((m, i) => (
                  <span key={i} className={s.methodTag}>{m}</span>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* Ограничения */}
        {c.limitations?.length > 0 && (
          <section className={s.section}>
            <div className={s.container}>
              <h2 className={s.sectionTitle}>Важно знать</h2>
              <div className={s.limitationsWrap}>
                {c.limitations.map((l, i) => (
                  <div key={i} className={s.limitationItem}>
                    <span className={s.limitIcon}>⚠️</span>
                    <span>{l}</span>
                  </div>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* CTA */}
        <section className={s.ctaSection}>
          <div className={s.container}>
            <h2 className={s.ctaTitle}>Готовы начать?</h2>
            <p className={s.ctaDesc}>Запишитесь на курс и начните путь к изменениям</p>
            <a href={c.getcourseLink || '#tariffs'} className={s.btnPrimary}>Записаться на курс</a>
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}
