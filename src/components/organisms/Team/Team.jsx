'use client'
import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import CharReveal from '@/components/atoms/CharReveal'
import SectionReveal from '@/components/atoms/SectionReveal'
import s from './Team.module.sass'

const trackVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.12, delayChildren: 0.1 } },
}

const cardVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: 'easeOut' } },
}

export default function Team({ data, team: teamMembers } = {}) {
  const title = data?.title || 'Наша команда'
  const subtitle = data?.subtitle || 'Специалисты, которым доверяют'

  const members = (teamMembers || []).map(m => ({
    id: m.id || m.documentId,
    name: m.name,
    role: m.role,
    bio: m.bio,
    specialization: m.specialization,
    photo: m.photo?.url || m.photo?.formats?.medium?.url || m.photo?.formats?.small?.url || null,
  }))

  const trackRef = useRef(null)
  const trackInView = useInView(trackRef, { once: true, amount: 0.1 })

  if (!members.length) return null

  return (
    <SectionReveal className={s.section} id="team">
      <div className={s.inner}>
        <div className={s.header}>
          <CharReveal as="h2" className={s.title}>{title}</CharReveal>
          <p className={s.subtitle}>{subtitle}</p>
        </div>

        <motion.div
          ref={trackRef}
          className={s.track}
          variants={trackVariants}
          initial="hidden"
          animate={trackInView ? 'visible' : 'hidden'}
        >
          {members.map((member, i) => (
            <motion.div
              className={s.card}
              key={member.id || i}
              variants={cardVariants}
            >
              <div className={s.cardPhotoWrap}>
                {member.photo ? (
                  <img
                    src={member.photo}
                    alt={member.name}
                    className={s.cardPhoto}
                    loading="lazy"
                  />
                ) : (
                  <div className={s.cardPhotoPlaceholder}>
                    <svg width="48" height="48" viewBox="0 0 48 48" fill="none">
                      <circle cx="24" cy="18" r="10" stroke="currentColor" strokeWidth="2" />
                      <path d="M6 44c0-9.941 8.059-18 18-18s18 8.059 18 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                    </svg>
                  </div>
                )}
                <div className={s.cardOverlay} />
              </div>

              <div className={s.cardBody}>
                <h3 className={s.cardName}>{member.name}</h3>
                <span className={s.cardRole}>{member.role}</span>
                {member.specialization && (
                  <span className={s.cardSpec}>{member.specialization}</span>
                )}
                {member.bio && (
                  <p className={s.cardBio}>{member.bio}</p>
                )}
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>

      {/* Decorative element */}
      <div className={s.decor} aria-hidden="true" />
    </SectionReveal>
  )
}
