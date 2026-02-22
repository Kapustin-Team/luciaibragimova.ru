import s from './Footer.module.sass'

const footerCols = [
  {
    title: 'Support',
    links: ['Contact', 'Help Center', 'IP Allowlist', 'Sitemap', 'Download Pluralsight', 'View Plans', 'Professional Services'],
  },
  {
    title: 'Community',
    links: ['Guides', 'Teach', 'Partner with Pluralsight', 'Affiliate Partners', 'Pluralsight One', 'Authors'],
  },
  {
    title: 'Company',
    links: ['About Us', 'Careers', 'Newsroom', 'Resources'],
  },
  {
    title: 'Industries',
    links: ['Education', 'Financial Services (FSBI)', 'Healthcare', 'Insurance', 'Non-Profit', 'Public Sector'],
  },
]

const relatedPages = [
  'Top-Tier Training for Small Businesses',
  'Technology skills for enterprise',
  'Solutions for Tech Workforce Transformation',
]

export default function Footer() {
  return (
    <footer className={s.footer}>
      <div className={s.related}>
        <div className={s.relatedInner}>
          <span className={s.relatedTitle}>Related Pages</span>
          <div className={s.relatedLinks}>
            {relatedPages.map(p => (
              <a key={p} href="#" className={s.relatedLink}>{p}</a>
            ))}
          </div>
        </div>
      </div>
      <div className={s.main}>
        <div className={s.inner}>
          <div className={s.cols}>
            {footerCols.map(col => (
              <div key={col.title} className={s.col}>
                <h4 className={s.colTitle}>{col.title}</h4>
                {col.links.map(link => (
                  <a key={link} href="#" className={s.colLink}>{link}</a>
                ))}
              </div>
            ))}
            <div className={s.newsletter}>
              <h4 className={s.newsletterTitle}>Get tech insights and updates</h4>
              <p className={s.newsletterDesc}>
                Don&apos;t miss the latest industry news, career resources, offers, and more.
              </p>
              <a href="#" className={s.signUpBtn}>Sign up now</a>
              <div className={s.socials}>
                {['f', 'x', 'in', 'ig', 'yt'].map(icon => (
                  <a key={icon} href="#" className={s.socialIcon}>{icon}</a>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className={s.bottom}>
        <div className={s.bottomInner}>
          <div className={s.logoWrap}>
            <img src="/images/pluralsight-logo.svg" alt="Pluralsight" className={s.footerLogo} />
            <span className={s.copyright}>Copyright © 2004 - Pluralsight LLC. All rights reserved</span>
          </div>
          <div className={s.legal}>
            <a href="#">Terms of Use</a>
            <a href="#">Privacy Policy</a>
            <a href="#">Code of Conduct</a>
          </div>
        </div>
      </div>
    </footer>
  )
}
