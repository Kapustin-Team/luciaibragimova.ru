'use client'
import { useState } from 'react'
import Header from '@/components/organisms/Header/Header'
import Footer from '@/components/organisms/Footer/Footer'
import About from '@/components/organisms/About/About'
import GradientPlaceholder from '@/components/atoms/GradientPlaceholder'
import ReviewScreenshot from '@/components/atoms/ReviewScreenshot'
import ReviewLightbox from '@/components/atoms/ReviewLightbox'
import { FaBook, FaBrain, FaHeart, FaShieldAlt, FaStar, FaUsers, FaLightbulb, FaEye, FaLeaf, FaSun, FaCheck, FaExclamationTriangle, FaInfoCircle, FaClock, FaBan } from 'react-icons/fa'
import { HiSparkles } from 'react-icons/hi'
import s from './course.module.sass'

const METHOD_ICON_MAP = {
  book: <FaBook size={20} />,
  brain: <FaBrain size={20} />,
  heart: <FaHeart size={20} />,
  shield: <FaShieldAlt size={20} />,
  star: <FaStar size={20} />,
  users: <FaUsers size={20} />,
  lightbulb: <FaLightbulb size={20} />,
  eye: <FaEye size={20} />,
  leaf: <FaLeaf size={20} />,
  sun: <FaSun size={20} />,
  sparkle: <HiSparkles size={20} />,
  check: <FaCheck size={20} />,
}

const LIMITATION_ICON_MAP = {
  alert: <FaExclamationTriangle size={18} />,
  info: <FaInfoCircle size={18} />,
  clock: <FaClock size={18} />,
  ban: <FaBan size={18} />,
  heart: <FaHeart size={18} />,
  shield: <FaShieldAlt size={18} />,
  users: <FaUsers size={18} />,
  star: <FaStar size={18} />,
  check: <FaCheck size={18} />,
  eye: <FaEye size={18} />,
}

const FORMAT_LABELS = { online: 'Онлайн', offline: 'Офлайн', hybrid: 'Гибрид' }

const COURSE_IMAGES = {
  'rozhdenie-molodoj-semi': '/courses/course-rozhdenie-semi.webp',
  'mama-zdes': '/courses/course-mama-zdes.webp',
  'lyogkost-materinstva': '/courses/course-lyogkost-materinstva.webp',
  'vovremya': '/courses/course-vovremya.webp',
  'podgotovka-ege-oge': '/courses/course-podgotovka-ege.webp',
  'odin-za-vsekh': '/courses/course-odin-za-vsekh.webp',
  'lyogkost-adaptacii': '/courses/course-lyogkost-adaptacii.webp',
  'svoi-lyudi': '/courses/course-svoi-lyudi.webp',
  'podium': '/courses/course-podium.webp',
  'svet-nochi': '/courses/course-svet-nochi.webp',
  'v-and-d': '/courses/course-v-and-d.webp',
  'anti-vygoranie': '/courses/course-anti-vygoranie.webp',
  'put': '/courses/course-put.webp',
  'igra-lvov': '/courses/course-igra-lvov.webp',
}

/* Slug → direction fallback */
const SLUG_TO_DIR = {
  'rozhdenie-molodoj-semi': 'Рождение семьи',
  'mama-zdes': 'Рождение семьи',
  'lyogkost-materinstva': 'Рождение семьи',
  'vovremya': 'Здоровое взросление',
  'podgotovka-ege-oge': 'Здоровое взросление',
  'odin-za-vsekh': 'Здоровое взросление',
  'lyogkost-adaptacii': 'Здоровое взросление',
  'svoi-lyudi': 'Развитие',
  'podium': 'Развитие',
  'svet-nochi': 'Развитие',
  'v-and-d': 'Развитие',
  'anti-vygoranie': 'Трансформация',
  'put': 'Трансформация',
  'igra-lvov': 'Трансформация',
}

/* Color schemes per direction */
const DIRECTION_THEMES = {
  'Рождение семьи': { accent: '#30023c', accentSoft: 'rgba(48,2,60,0.08)', heroGradient: 'linear-gradient(135deg, #fdf8ff 0%, #f0e4f8 50%, #f8f3fc 100%)', heroBg: '#f0e4f8' },
  'Здоровое взросление': { accent: '#7c5cbf', accentSoft: 'rgba(124,92,191,0.08)', heroGradient: 'linear-gradient(135deg, #f3f0f8 0%, #e8e0f4 50%, #d9b9e7 100%)', heroBg: '#e8e0f4' },
  'Развитие': { accent: '#2d8a6e', accentSoft: 'rgba(45,138,110,0.08)', heroGradient: 'linear-gradient(135deg, #ecfdf5 0%, #d1fae5 50%, #f8f3fc 100%)', heroBg: '#d1fae5' },
  'Трансформация': { accent: '#30023c', accentSoft: 'rgba(48,2,60,0.06)', heroGradient: 'linear-gradient(135deg, #f8f3fc 0%, #e8ddf2 50%, #d9b9e7 100%)', heroBg: '#e8ddf2' },
}

/* SVG icons for info cards */
const FormatIcon = () => (
  <svg className={s.infoSvg} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <rect x="2" y="3" width="20" height="14" rx="2" /><path d="M8 21h8M12 17v4" />
  </svg>
)
const DurationIcon = () => (
  <svg className={s.infoSvg} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <circle cx="12" cy="12" r="10" /><path d="M12 6v6l4 2" />
  </svg>
)
const LessonsIcon = () => (
  <svg className={s.infoSvg} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M4 19.5A2.5 2.5 0 016.5 17H20" /><path d="M6.5 2H20v20H6.5A2.5 2.5 0 014 19.5v-15A2.5 2.5 0 016.5 2z" />
  </svg>
)
const ParticipantsIcon = () => (
  <svg className={s.infoSvg} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2" /><circle cx="9" cy="7" r="4" /><path d="M23 21v-2a4 4 0 00-3-3.87M16 3.13a4 4 0 010 7.75" />
  </svg>
)

export default function CoursePageClient({ course }) {
  const c = course
  const dirTitle = c.direction?.title || SLUG_TO_DIR[c.slug] || ''
  const theme = DIRECTION_THEMES[dirTitle] || DIRECTION_THEMES['Рождение семьи']
  const [reviewLightbox, setReviewLightbox] = useState(null)
  const mediaReviews = (c.reviews || []).filter(r => r.screenshot || r.video)
  const imgSrc = c.image?.url || c.image?.formats?.large?.url || COURSE_IMAGES[c.slug]

  const themeStyle = {
    '--theme-accent': theme.accent,
    '--theme-accent-soft': theme.accentSoft,
    '--theme-hero-gradient': theme.heroGradient,
    '--theme-hero-bg': theme.heroBg,
  }

  return (
    <div style={themeStyle}>
      <Header />
      <main>

        {/* ─── Hero — direction-colored ─── */}
        <section className={s.hero} style={{ background: theme.heroGradient }}>
          <div className={s.heroInner}>
            <div className={s.heroLeft}>
              <div className={s.heroBadges}>
                {dirTitle && (
                  <span className={s.badgeFilled}>{dirTitle}</span>
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
                  Выбрать тариф
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
              {c.teachers?.length > 0 && (
                <div className={s.heroTeachers}>
                  {c.teachers.slice(0, 2).map((t, i) => {
                    const src = t.photo?.url || t.photo?.formats?.thumbnail?.url
                    return (
                      <div key={i} className={s.heroTeacherItem}>
                        <div className={s.heroTeacherAvatar}>
                          {src ? (
                            <img src={src} alt={t.name} />
                          ) : (
                            <span>{t.name?.charAt(0)}</span>
                          )}
                        </div>
                        <div className={s.heroTeacherMeta}>
                          <span className={s.heroTeacherName}>{t.name}</span>
                          {t.role && <span className={s.heroTeacherRole}>{t.role}</span>}
                        </div>
                      </div>
                    )
                  })}
                </div>
              )}
            </div>
          </div>

          {/* ─── Info cards (inside hero) ─── */}
          <div className={s.infoCardsInner} style={{ '--info-cards-count': [c.format, c.duration, c.lessonsCount, c.participantsCount].filter(Boolean).length }}>
            {c.format && (
              <div className={s.infoCard}>
                <div className={s.infoIconWrap}><FormatIcon /></div>
                <div>
                  <span className={s.infoLabel}>{FORMAT_LABELS[c.format] || c.format}</span>
                  <span className={s.infoValue}>Формат</span>
                </div>
              </div>
            )}
            {c.duration && (
              <div className={s.infoCard}>
                <div className={s.infoIconWrap}><DurationIcon /></div>
                <div>
                  <span className={s.infoLabel}>{c.duration}</span>
                  <span className={s.infoValue}>Длительность</span>
                </div>
              </div>
            )}
            {c.lessonsCount && (
              <div className={s.infoCard}>
                <div className={s.infoIconWrap}><LessonsIcon /></div>
                <div>
                  <span className={s.infoLabel}>{c.lessonsCount}</span>
                  <span className={s.infoValue}>Занятий</span>
                </div>
              </div>
            )}
            {c.participantsCount && (
              <div className={s.infoCard}>
                <div className={s.infoIconWrap}><ParticipantsIcon /></div>
                <div>
                  <span className={s.infoLabel}>{c.participantsCount}</span>
                  <span className={s.infoValue}>Участники</span>
                </div>
              </div>
            )}
          </div>
        </section>

        {/* ─── Для кого ─── */}
        {c.targetAudience?.length > 0 && (
          <section className={s.section}>
            <div className={s.container}>
              <div className={s.centeredHeader}>
                <h2 className={s.sectionTitle}>Для кого этот курс</h2>
                <p className={s.sectionSubtitle}>Курс разработан с учётом потребностей разных людей в разных жизненных ситуациях.</p>
              </div>
              <div className={s.audienceGrid} data-count={c.targetAudience.length}>
                {c.targetAudience.map((a, i) => {
                  const imgUrl = a.image?.url || a.image?.formats?.small?.url
                  return (
                    <div key={i} className={`${s.audienceCard} ${imgUrl ? s.audienceCardWithImage : ''}`}>
                      {imgUrl && (
                        <div className={s.audienceImageWrap}>
                          <img src={imgUrl} alt="" className={s.audienceImage} />
                        </div>
                      )}
                      <div className={s.audienceContent}>
                        {!imgUrl && (
                          <div className={s.audienceIcon}>
                            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                              <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" /><circle cx="12" cy="7" r="4" />
                            </svg>
                          </div>
                        )}
                        <p className={s.audienceText}>{a.text}</p>
                      </div>
                    </div>
                  )
                })}
              </div>
            </div>
          </section>
        )}

        {/* ─── Знакомые ситуации ─── */}
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
                        <span className={s.checkBox}>
                          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
                            <polyline points="12 8 10 13 14 13 12 17" />
                          </svg>
                        </span>
                        <span>{pain}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </section>
        )}

        {/* ─── Что получите ─── */}
        {c.results?.length > 0 && (
          <section className={s.section} id="results">
            <div className={s.container}>
              <div className={s.centeredHeader}>
                <h2 className={s.sectionTitle}>Что вы получите</h2>
                <p className={s.sectionSubtitle}>Конкретные результаты после прохождения программы</p>
              </div>
              <div className={`${s.resultsLayout} ${!c.resultsImage?.url ? s.resultsLayoutCentered : ''}`}>
                {c.resultsImage?.url && (
                  <div className={s.resultsImageCol}>
                    <img src={c.resultsImage.url} alt="" className={s.resultsImage} />
                  </div>
                )}
                <ul className={s.resultsList}>
                  {c.results.map((r, i) => (
                    <li key={i} className={s.resultsItem}>
                      <span className={s.resultsCheckIcon}>
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg>
                      </span>
                      <span className={s.resultsItemText}>{r.text}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </section>
        )}

        {/* ─── Программа ─── */}
        {c.modules?.length > 0 && (
          <section className={s.sectionPeach} id="program">
            <div className={s.container}>
              <div className={s.centeredHeader}>
                <h2 className={s.sectionTitle}>Программа курса</h2>
                <p className={s.sectionSubtitle}>Структурированная программа, которая ведёт вас шаг за шагом.</p>
              </div>
              <div className={s.modulesList}>
                {c.modules.map((m, i) => (
                  <div key={i} className={s.moduleItem}>
                    <div className={s.moduleHeader}>
                      <span className={s.moduleNum}>Модуль {String(i + 1).padStart(2, '0')}</span>
                      <h3 className={s.moduleTitle}>{m.title}</h3>
                    </div>
                    {m.description && (
                      <div className={s.moduleBody}>
                        <p className={s.moduleDesc}>{m.description}</p>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* ─── Методики ─── */}
        {c.methods?.length > 0 && (
          <section className={s.section}>
            <div className={s.container}>
              <div className={s.centeredHeader}>
                <h2 className={s.sectionTitle}>Методики и подходы</h2>
                <p className={s.sectionSubtitle}>Курс основан на проверенных психологических методиках и современных научных подходах.</p>
              </div>
              <div className={s.methodsGrid}>
                {c.methods.map((m, i) => {
                  const text = typeof m === 'string' ? m : m.text
                  const icon = typeof m === 'string' ? 'book' : (m.icon || 'book')
                  return (
                    <div key={i} className={s.methodCard}>
                      <span className={s.methodIcon}>
                        {METHOD_ICON_MAP[icon] || METHOD_ICON_MAP.book}
                      </span>
                      <span className={s.methodName}>{text}</span>
                    </div>
                  )
                })}
              </div>
            </div>
          </section>
        )}

        {/* ─── Тарифы — с зачёркнутыми пунктами ─── */}
        {c.tariffs?.length > 0 && (
          <section className={s.sectionPeach} id="tariffs">
            <div className={s.container}>
              <div className={s.centeredHeader}>
                <h2 className={s.sectionTitle}>Выберите тариф</h2>
                <p className={s.sectionSubtitle}>Выберите формат участия, который подходит именно вам.</p>
              </div>
              <div className={s.tariffsGrid} data-count={c.tariffs.length}>
                {c.tariffs.map((t, i) => {
                  const isPopular = t.popular
                  const badgeLabel = t.badgeText || 'Популярный'
                  return (
                    <div key={i} className={`${s.tariffCard} ${isPopular ? s.tariffPopular : ''}`}>
                      {isPopular && <div className={s.popularBadge}>{badgeLabel}</div>}
                      <h3 className={s.tariffName}>{t.name}</h3>
                      {t.price && <div className={s.tariffPrice}>{t.price}</div>}
                      {t.features?.length > 0 && (
                        <ul className={s.tariffFeatures}>
                          {t.features.map((f, j) => {
                            const excluded = f.startsWith('~') && f.endsWith('~')
                            const label = excluded ? f.slice(1, -1) : f
                            return (
                              <li key={j} className={excluded ? s.tariffExcluded : s.tariffIncluded}>
                                <span className={excluded ? s.tariffCross : s.tariffCheck}>
                                  {excluded ? '✕' : '✓'}
                                </span>
                                <span className={excluded ? s.strikethrough : ''}>{label}</span>
                              </li>
                            )
                          })}
                        </ul>
                      )}
                      <a href={c.getcourseLink || '#'} className={isPopular ? s.tariffBtnDark : s.tariffBtn}>
                        Выбрать тариф
                      </a>
                    </div>
                  )
                })}
              </div>
            </div>
          </section>
        )}

        {/* ─── Отзывы ─── */}
        {mediaReviews.length > 0 && (
          <section className={s.section}>
            <div className={s.container}>
              <div className={s.centeredHeader}>
                <h2 className={s.sectionTitle}>Отзывы участников</h2>
                <p className={s.sectionSubtitle}>Реальные отзывы от тех, кто уже прошёл курс</p>
              </div>
              <div className={s.reviewsMasonry}>
                {mediaReviews.map((r, i) => (
                  <ReviewScreenshot key={r.id || i} review={r} index={i} onClick={setReviewLightbox} />
                ))}
              </div>
            </div>
            {reviewLightbox !== null && (
              <ReviewLightbox
                reviews={mediaReviews}
                currentIndex={reviewLightbox}
                onClose={() => setReviewLightbox(null)}
                onNavigate={setReviewLightbox}
              />
            )}
          </section>
        )}

        {/* ─── Ограничения ─── */}
        {c.limitations?.length > 0 && (
          <section className={s.section}>
            <div className={s.container}>
              <div className={s.featureLayout}>
                <div className={s.featureLeft}>
                  <h2 className={s.featureTitle}>Важно знать</h2>
                  <p className={s.featureDesc}>Обратите внимание перед записью на курс.</p>
                </div>
                <div className={s.featureRight}>
                  <ul className={s.checkList}>
                    {c.limitations.map((l, i) => {
                      const text = typeof l === 'string' ? l : l.text
                      const icon = typeof l === 'string' ? 'alert' : (l.icon || 'alert')
                      return (
                        <li key={i} className={s.checkItem}>
                          <span className={s.checkBox}>
                            {LIMITATION_ICON_MAP[icon] || LIMITATION_ICON_MAP.alert}
                          </span>
                          <span>{text}</span>
                        </li>
                      )
                    })}
                  </ul>
                </div>
              </div>
            </div>
          </section>
        )}

        {/* ─── Преподаватели ─── */}
        {c.teachers?.length > 0 && (
          <section className={s.section} id="teachers">
            <div className={s.container}>
              <div className={s.centeredHeader}>
                <h2 className={s.sectionTitle}>Преподаватели курса</h2>
                <p className={s.sectionSubtitle}>Опытные специалисты, которые проведут вас через программу</p>
              </div>
              <div className={s.teachersGrid} data-count={c.teachers.length}>
                {c.teachers.map((t, i) => {
                  const src = t.photo?.url || t.photo?.formats?.small?.url
                  return (
                    <div key={i} className={s.teacherCard}>
                      <div className={s.teacherPhotoWrap}>
                        {src ? (
                          <img src={src} alt={t.name} className={s.teacherPhoto} />
                        ) : (
                          <div className={s.teacherPhotoPlaceholder}>
                            {t.name?.charAt(0)}
                          </div>
                        )}
                      </div>
                      <div className={s.teacherInfo}>
                        <h3 className={s.teacherName}>{t.name}</h3>
                        {t.role && <p className={s.teacherRole}>{t.role}</p>}
                        {t.bio && <p className={s.teacherDesc}>{t.bio}</p>}
                      </div>
                    </div>
                  )
                })}
              </div>
            </div>
          </section>
        )}

        {/* ─── About Lucia ─── */}
        <About />

        {/* ─── CTA — bigger ─── */}
        <section className={s.ctaSection}>
          <div className={s.ctaDecorCircle1} />
          <div className={s.ctaDecorCircle2} />
          <div className={s.ctaDecorDots} />
          <div className={s.ctaCard}>
            <h2 className={s.ctaTitle}>Готовы начать свой путь?</h2>
            <p className={s.ctaDesc}>Запишитесь на курс «{c.title}» и сделайте первый шаг к изменениям</p>
            <a href={c.getcourseLink || '#tariffs'} className={s.ctaBtn}>
              Выбрать тариф
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M5 12h14M12 5l7 7-7 7" /></svg>
            </a>
          </div>
        </section>

      </main>
      <Footer />
    </div>
  )
}
