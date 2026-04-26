'use client'
import { useState, useRef } from 'react'
import Image from 'next/image'
import { motion, useScroll, useTransform } from 'framer-motion'
import CharReveal from '@/components/atoms/CharReveal'
import SectionReveal from '@/components/atoms/SectionReveal'
import Header from '@/components/organisms/Header/Header'
import Footer from '@/components/organisms/Footer/Footer'
import About from '@/components/organisms/About/About'
import ReviewScreenshot from '@/components/atoms/ReviewScreenshot'
import ReviewLightbox from '@/components/atoms/ReviewLightbox'
import { FaBook, FaBrain, FaHeart, FaShieldAlt, FaStar, FaUsers, FaLightbulb, FaEye, FaLeaf, FaSun, FaCheck, FaExclamationTriangle, FaInfoCircle, FaClock, FaBan } from 'react-icons/fa'
import { HiSparkles } from 'react-icons/hi'
import s from './course.module.sass'

const STRAPI_URL = process.env.NEXT_PUBLIC_STRAPI_URL || 'https://luciastrapi.kpstn.ru'
const MotionImage = motion.create(Image)

function mediaUrl(media) {
  if (!media) return null
  const url = typeof media === 'string' ? media : media.url || media.formats?.large?.url || media.formats?.medium?.url || media.formats?.small?.url
  if (!url) return null
  return url.startsWith('http') || (url.startsWith('/') && !url.startsWith('/uploads')) ? url : `${STRAPI_URL}${url}`
}

const METHOD_ICON_MAP = {
  book: <FaBook size={20} />, brain: <FaBrain size={20} />, heart: <FaHeart size={20} />,
  shield: <FaShieldAlt size={20} />, star: <FaStar size={20} />, users: <FaUsers size={20} />,
  lightbulb: <FaLightbulb size={20} />, eye: <FaEye size={20} />, leaf: <FaLeaf size={20} />,
  sun: <FaSun size={20} />, sparkle: <HiSparkles size={20} />, check: <FaCheck size={20} />,
}

const LIMITATION_ICON_MAP = {
  alert: <FaExclamationTriangle size={18} />, info: <FaInfoCircle size={18} />,
  clock: <FaClock size={18} />, ban: <FaBan size={18} />, heart: <FaHeart size={18} />,
  shield: <FaShieldAlt size={18} />, users: <FaUsers size={18} />, star: <FaStar size={18} />,
  check: <FaCheck size={18} />, eye: <FaEye size={18} />,
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

const SLUG_TO_DIR = {
  'rozhdenie-molodoj-semi': 'Рождение семьи', 'mama-zdes': 'Рождение семьи',
  'lyogkost-materinstva': 'Рождение семьи', 'vovremya': 'Здоровое взросление',
  'podgotovka-ege-oge': 'Здоровое взросление', 'odin-za-vsekh': 'Здоровое взросление',
  'lyogkost-adaptacii': 'Здоровое взросление', 'svoi-lyudi': 'Развитие',
  'podium': 'Развитие', 'svet-nochi': 'Развитие', 'v-and-d': 'Развитие',
  'anti-vygoranie': 'Трансформация', 'put': 'Трансформация', 'igra-lvov': 'Трансформация',
}

export default function CoursePageClient({ course }) {
  const c = course
  const dirTitle = c.direction?.title || SLUG_TO_DIR[c.slug] || ''
  const [reviewLightbox, setReviewLightbox] = useState(null)
  const mediaReviews = (c.reviews || []).filter(r => r.screenshot || r.video)
  const imgSrc = mediaUrl(c.image) || COURSE_IMAGES[c.slug] || '/interrior/img265.jpg'
  const resultsImageUrl = mediaUrl(c.resultsImage)

  // Hero parallax — downward shift as user scrolls past (K007: ref on image container)
  const heroRef = useRef(null)
  const { scrollYProgress: heroProgress } = useScroll({ target: heroRef, offset: ['start start', 'end start'] })
  const heroBgY = useTransform(heroProgress, [0, 1], ['0%', '20%'])

  // CTA section scroll-linked scale — subtle zoom-in as it enters viewport
  const ctaRef = useRef(null)
  const { scrollYProgress: ctaProgress } = useScroll({ target: ctaRef, offset: ['start end', 'end start'] })
  const ctaScale = useTransform(ctaProgress, [0, 0.5], [0.96, 1])

  // Results image parallax — upward shift as section enters viewport
  const resultsImageRef = useRef(null)
  const { scrollYProgress: resultsProgress } = useScroll({ target: resultsImageRef, offset: ['start end', 'end start'] })
  const resultsImgY = useTransform(resultsProgress, [0, 1], ['0%', '-10%'])

  const infoItems = [
    c.format && { number: FORMAT_LABELS[c.format] || c.format, label: 'Формат' },
    c.duration && { number: c.duration, label: 'Длительность' },
    c.lessonsCount && { number: c.lessonsCount, label: 'Занятий' },
    c.participantsCount && { number: c.participantsCount, label: 'Участники' },
  ].filter(Boolean)

  return (
    <>
      <Header hasHero />
      <main>

        {/* ─── Hero — full-screen photo bg ─── */}
        <section ref={heroRef} className={s.hero}>
          <div className={s.heroBg}>
            <MotionImage
              src={imgSrc}
              alt={c.title}
              className={s.heroBgImage}
              fill
              priority
              sizes="100vw"
              style={{ y: heroBgY }}
            />
            <div className={s.heroOverlay} />
          </div>
          <div className={s.heroInner}>
            <CharReveal as="h1" className={s.heroTitle}>{c.title}</CharReveal>
            {c.shortDescription && (
              <motion.p
                className={s.heroDesc}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.4, ease: 'easeOut' }}
              >
                {c.shortDescription}
              </motion.p>
            )}
            <motion.div
              className={s.heroButtons}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.6, ease: 'easeOut' }}
            >
              <a
                href={c.getcourseLink || '#tariffs'}
                className={s.btnPrimary}
                {...(c.getcourseLink ? { target: '_blank', rel: 'noopener' } : {})}
              >
                Выбрать тариф
              </a>
              <a href="#program" className={s.btnSecondary}>Программа курса</a>
            </motion.div>
          </div>
        </section>

        {/* ─── Info — flat grid (TrustBlock-style) ─── */}
        {infoItems.length > 0 && (
          <section className={s.infoSection}>
            <div className={s.infoGrid}>
              {infoItems.map((item, i) => (
                <motion.div
                  key={i}
                  className={s.infoCard}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: '-30px' }}
                  transition={{ duration: 0.5, delay: i * 0.1, ease: 'easeOut' }}
                >
                  <span className={s.infoNumber}>{item.number}</span>
                  <span className={s.infoLabel}>{item.label}</span>
                </motion.div>
              ))}
            </div>
          </section>
        )}

        {/* ─── Для кого ─── */}
        {c.targetAudience?.length > 0 && (
          <SectionReveal variant="mask" className={s.section}>
            <div className={s.container}>
              <div className={s.centeredHeader}>
                <CharReveal as="h2" className={s.sectionTitle}>Для кого этот курс</CharReveal>
                <p className={s.sectionSubtitle}>Курс разработан с учётом потребностей разных людей в разных жизненных ситуациях.</p>
              </div>
              <div className={s.audienceGrid} data-count={c.targetAudience.length}>
                {c.targetAudience.map((a, i) => {
                  const imgUrl = mediaUrl(a.image)
                  return (
                    <motion.div
                      key={i}
                      className={`${s.audienceCard} ${imgUrl ? s.audienceCardWithImage : ''}`}
                      initial={{ opacity: 0, y: 30 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true, margin: '-30px' }}
                      transition={{ duration: 0.5, delay: i * 0.1, ease: 'easeOut' }}
                    >
                      {imgUrl && (
                        <div className={s.audienceImageWrap}>
                          <Image
                            src={imgUrl}
                            alt=""
                            className={s.audienceImage}
                            width={640}
                            height={400}
                            loading="lazy"
                            sizes="(max-width: 768px) 100vw, 33vw"
                          />
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
                    </motion.div>
                  )
                })}
              </div>
            </div>
          </SectionReveal>
        )}

        {/* ─── Знакомые ситуации ─── */}
        {c.pains?.length > 0 && (
          <SectionReveal className={s.sectionAlt}>
            <div className={s.container}>
              <div className={s.featureLayout}>
                <div className={s.featureLeft}>
                  <CharReveal as="h2" className={s.featureTitle}>Знакомые ситуации?</CharReveal>
                  <p className={s.featureDesc}>Если хотя бы несколько пунктов откликаются — этот курс создан именно для вас.</p>
                </div>
                <div className={s.featureRight}>
                  <ul className={s.checkList}>
                    {c.pains.map((pain, i) => (
                      <motion.li
                        key={i}
                        className={s.checkItem}
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, margin: '-30px' }}
                        transition={{ duration: 0.4, delay: i * 0.07, ease: 'easeOut' }}
                      >
                        <span className={s.checkBox}>♡</span>
                        <span>{pain}</span>
                      </motion.li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </SectionReveal>
        )}

        {/* ─── Что получите ─── */}
        {c.results?.length > 0 && (
          <SectionReveal variant="mask" className={s.section} id="results">
            <div className={s.container}>
              <div className={s.centeredHeader}>
                <CharReveal as="h2" className={s.sectionTitle}>Что вы получите</CharReveal>
                <p className={s.sectionSubtitle}>Конкретные результаты после прохождения программы</p>
              </div>
              <div className={`${s.resultsLayout} ${!resultsImageUrl ? s.resultsLayoutCentered : ''}`}>
                {resultsImageUrl && (
                  <div ref={resultsImageRef} className={s.resultsImageCol}>
                    <MotionImage
                      src={resultsImageUrl}
                      alt=""
                      className={s.resultsImage}
                      width={900}
                      height={700}
                      loading="lazy"
                      sizes="(max-width: 768px) 100vw, 50vw"
                      style={{ y: resultsImgY }}
                    />
                  </div>
                )}
                <ul className={s.resultsList}>
                  {c.results.map((r, i) => (
                    <motion.li
                      key={i}
                      className={s.resultsItem}
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true, margin: '-30px' }}
                      transition={{ duration: 0.4, delay: i * 0.08, ease: 'easeOut' }}
                    >
                      <span className={s.resultsCheckIcon}>
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg>
                      </span>
                      <span className={s.resultsItemText}>{r.text}</span>
                    </motion.li>
                  ))}
                </ul>
              </div>
            </div>
          </SectionReveal>
        )}

        {/* ─── Программа ─── */}
        {c.modules?.length > 0 && (
          <SectionReveal className={s.sectionDark} id="program">
            <div className={s.container}>
              <div className={s.centeredHeader}>
                <CharReveal as="h2" className={s.sectionTitle}>Программа курса</CharReveal>
                <p className={s.sectionSubtitle}>Структурированная программа, которая ведёт вас шаг за шагом.</p>
              </div>
              <div className={s.modulesList}>
                {c.modules.map((m, i) => (
                  <motion.div
                    key={i}
                    className={s.moduleItem}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: '-30px' }}
                    transition={{ duration: 0.4, delay: i * 0.08, ease: 'easeOut' }}
                  >
                    <div className={s.moduleHeader}>
                      <span className={s.moduleNum}>Модуль {String(i + 1).padStart(2, '0')}</span>
                      <h3 className={s.moduleTitle}>{m.title}</h3>
                    </div>
                    {m.description && (
                      <div className={s.moduleBody}>
                        <p className={s.moduleDesc}>{m.description}</p>
                      </div>
                    )}
                  </motion.div>
                ))}
              </div>
            </div>
          </SectionReveal>
        )}

        {/* ─── Методики ─── */}
        {c.methods?.length > 0 && (
          <SectionReveal variant="mask" className={s.sectionAccent}>
            <div className={s.container}>
              <div className={s.centeredHeader}>
                <CharReveal as="h2" className={s.sectionTitle}>Методики и подходы</CharReveal>
                <p className={s.sectionSubtitle}>Курс основан на проверенных психологических методиках.</p>
              </div>
              <div className={s.methodsGrid}>
                {c.methods.map((m, i) => {
                  const text = typeof m === 'string' ? m : m.text
                  const icon = typeof m === 'string' ? 'book' : (m.icon || 'book')
                  return (
                    <motion.div
                      key={i}
                      className={s.methodCard}
                      initial={{ opacity: 0, y: 30 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true, margin: '-30px' }}
                      transition={{ duration: 0.5, delay: i * 0.1, ease: 'easeOut' }}
                    >
                      <span className={s.methodIcon}>
                        {METHOD_ICON_MAP[icon] || METHOD_ICON_MAP.book}
                      </span>
                      <span className={s.methodName}>{text}</span>
                    </motion.div>
                  )
                })}
              </div>
            </div>
          </SectionReveal>
        )}

        {/* ─── Тарифы ─── */}
        {c.tariffs?.length > 0 && (
          <SectionReveal className={s.sectionDark} id="tariffs">
            <div className={s.container}>
              <div className={s.centeredHeader}>
                <CharReveal as="h2" className={s.sectionTitle}>Выберите тариф</CharReveal>
                <p className={s.sectionSubtitle}>Выберите формат участия, который подходит именно вам.</p>
              </div>
              <div className={s.tariffsGrid} data-count={c.tariffs.length}>
                {c.tariffs.map((t, i) => {
                  const isPopular = t.popular
                  const badgeLabel = t.badgeText || 'Популярный'
                  return (
                    <motion.div
                      key={i}
                      className={`${s.tariffCard} ${isPopular ? s.tariffPopular : ''}`}
                      initial={{ opacity: 0, y: 30 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true, margin: '-30px' }}
                      transition={{ duration: 0.5, delay: i * 0.1, ease: 'easeOut' }}
                    >
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
                      <a href={c.getcourseLink || '#'} className={s.tariffBtn}>
                        Выбрать тариф
                      </a>
                    </motion.div>
                  )
                })}
              </div>
            </div>
          </SectionReveal>
        )}

        {/* ─── Отзывы ─── */}
        {mediaReviews.length > 0 && (
          <SectionReveal variant="mask" className={s.section}>
            <div className={s.container}>
              <div className={s.centeredHeader}>
                <CharReveal as="h2" className={s.sectionTitle}>Отзывы участников</CharReveal>
                <p className={s.sectionSubtitle}>Реальные отзывы от тех, кто уже прошёл курс</p>
              </div>
              <div className={s.reviewsMasonry}>
                {mediaReviews.map((r, i) => (
                  <motion.div
                    key={r.id || i}
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: '-30px' }}
                    transition={{ duration: 0.5, delay: i * 0.1, ease: 'easeOut' }}
                  >
                    <ReviewScreenshot review={r} index={i} onClick={setReviewLightbox} />
                  </motion.div>
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
          </SectionReveal>
        )}

        {/* ─── Ограничения ─── */}
        {c.limitations?.length > 0 && (
          <SectionReveal className={s.sectionAlt}>
            <div className={s.container}>
              <div className={s.featureLayout}>
                <div className={s.featureLeft}>
                  <CharReveal as="h2" className={s.featureTitle}>Важно знать</CharReveal>
                  <p className={s.featureDesc}>Обратите внимание перед записью на курс.</p>
                </div>
                <div className={s.featureRight}>
                  <ul className={s.checkList}>
                    {c.limitations.map((l, i) => {
                      const text = typeof l === 'string' ? l : l.text
                      const icon = typeof l === 'string' ? 'alert' : (l.icon || 'alert')
                      return (
                        <motion.li
                          key={i}
                          className={s.checkItem}
                          initial={{ opacity: 0, y: 20 }}
                          whileInView={{ opacity: 1, y: 0 }}
                          viewport={{ once: true, margin: '-30px' }}
                          transition={{ duration: 0.4, delay: i * 0.07, ease: 'easeOut' }}
                        >
                          <span className={s.checkBox}>
                            {LIMITATION_ICON_MAP[icon] || LIMITATION_ICON_MAP.alert}
                          </span>
                          <span>{text}</span>
                        </motion.li>
                      )
                    })}
                  </ul>
                </div>
              </div>
            </div>
          </SectionReveal>
        )}

        {/* ─── Преподаватели ─── */}
        {c.teachers?.length > 0 && (
          <SectionReveal variant="mask" className={s.section} id="teachers">
            <div className={s.container}>
              <div className={s.centeredHeader}>
                <CharReveal as="h2" className={s.sectionTitle}>Преподаватели курса</CharReveal>
                <p className={s.sectionSubtitle}>Опытные специалисты, которые проведут вас через программу</p>
              </div>
              <div className={s.teachersGrid} data-count={c.teachers.length}>
                {c.teachers.map((t, i) => {
                  const src = mediaUrl(t.photo)
                  return (
                    <motion.div
                      key={i}
                      className={s.teacherCard}
                      initial={{ opacity: 0, y: 30 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true, margin: '-30px' }}
                      transition={{ duration: 0.5, delay: i * 0.1, ease: 'easeOut' }}
                    >
                      <div className={s.teacherPhotoWrap}>
                        {src ? (
                          <Image
                            src={src}
                            alt={t.name}
                            className={s.teacherPhoto}
                            width={120}
                            height={120}
                            loading="lazy"
                            sizes="120px"
                          />
                        ) : (
                          <div className={s.teacherPhotoPlaceholder}>{t.name?.charAt(0)}</div>
                        )}
                      </div>
                      <div className={s.teacherInfo}>
                        <h3 className={s.teacherName}>{t.name}</h3>
                        {t.role && <p className={s.teacherRole}>{t.role}</p>}
                        {t.bio && <p className={s.teacherDesc}>{t.bio}</p>}
                      </div>
                    </motion.div>
                  )
                })}
              </div>
            </div>
          </SectionReveal>
        )}

        {/* ─── About Lucia ─── */}
        <About />

        {/* ─── CTA — clean, dark bg, large text ─── */}
        <motion.section ref={ctaRef} className={s.ctaSection} style={{ scale: ctaScale }}>
          <div>
            <CharReveal as="h2" className={s.ctaTitle}>Готовы начать свой путь?</CharReveal>
            <p className={s.ctaDesc}>Запишитесь на курс «{c.title}» и сделайте первый шаг к изменениям</p>
            <a href={c.getcourseLink || '#tariffs'} className={s.ctaBtn}>
              Выбрать тариф
            </a>
          </div>
        </motion.section>

      </main>
      <Footer />
    </>
  )
}
