'use client'

import { createContext, useContext, useEffect, useState } from 'react'

const STRAPI_PUBLIC_URL = process.env.NEXT_PUBLIC_STRAPI_URL || 'https://admin.lucia.school'

import {
  DEFAULT_SITE_SETTINGS,
  DEFAULT_LEGAL_DOCUMENTS,
  legalDocumentHref,
  legalDocumentLabel,
} from '@/lib/siteDefaults'

export { DEFAULT_SITE_SETTINGS, DEFAULT_LEGAL_DOCUMENTS, legalDocumentHref, legalDocumentLabel }

function mergeSettings(data) {
  const merged = { ...DEFAULT_SITE_SETTINGS }
  if (!data) return merged
  for (const key of Object.keys(DEFAULT_SITE_SETTINGS)) {
    const value = data[key]
    if (value === null || value === undefined) continue
    merged[key] = value
  }
  return merged
}

const SiteSettingsContext = createContext({
  settings: DEFAULT_SITE_SETTINGS,
  legalDocuments: DEFAULT_LEGAL_DOCUMENTS,
})

async function fetchPublic(path) {
  const res = await fetch(`${STRAPI_PUBLIC_URL}/api/${path}`, { cache: 'no-store' })
  if (!res.ok) return null
  const json = await res.json()
  return json.data
}

export function SiteSettingsProvider({ initialSettings, initialLegalDocuments, children }) {
  const [rawSettings, setRawSettings] = useState(initialSettings || null)
  // Empty array = Strapi answered, all documents unpublished → no footer links.
  // null = Strapi unavailable → fall back to the standard document list.
  const [legalDocuments, setLegalDocuments] = useState(
    Array.isArray(initialLegalDocuments) ? initialLegalDocuments : null
  )

  // Server-side fetch can fail (internal network); retry from the browser.
  useEffect(() => {
    if (rawSettings && legalDocuments) return
    let cancelled = false
    ;(async () => {
      try {
        const [settingsData, docsData] = await Promise.all([
          rawSettings ? null : fetchPublic('site-setting'),
          legalDocuments
            ? null
            : fetchPublic('legal-documents?fields[0]=title&fields[1]=slug&fields[2]=showInFooter&fields[3]=order&sort=order:asc'),
        ])
        if (cancelled) return
        if (settingsData) setRawSettings(settingsData)
        if (Array.isArray(docsData)) setLegalDocuments(docsData)
      } catch (error) {
        console.error('Site settings fetch failed', error)
      }
    })()
    return () => {
      cancelled = true
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const value = {
    settings: mergeSettings(rawSettings),
    legalDocuments: legalDocuments || DEFAULT_LEGAL_DOCUMENTS,
  }

  return <SiteSettingsContext.Provider value={value}>{children}</SiteSettingsContext.Provider>
}

export function useSiteSettings() {
  return useContext(SiteSettingsContext).settings
}

export function useLegalDocuments() {
  return useContext(SiteSettingsContext).legalDocuments
}
