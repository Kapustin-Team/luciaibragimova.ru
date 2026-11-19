import { notFound } from 'next/navigation'
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import remarkBreaks from 'remark-breaks'
import Header from '@/components/organisms/Header/Header'
import Footer from '@/components/organisms/Footer/Footer'
import { getLegalDocument, STRAPI_URL } from '@/lib/strapi'
import { DEFAULT_LEGAL_DOCUMENTS, DEFAULT_SITE_SETTINGS } from '@/lib/siteDefaults'
import s from './LegalPage.module.sass'

const SITE_NAME = 'Студия Люции Ибрагимовой'

function textOf(node) {
  if (!node) return ''
  if (node.type === 'text') return node.value
  return (node.children || []).map(textOf).join('')
}

// Adds data-label (column header) to every table cell, so on mobile
// each row can be shown as a card: «Header: value».
function rehypeTableLabels() {
  return (tree) => {
    const walk = (node) => {
      if (node.tagName === 'table') {
        const headers = []
        const collect = (n) => {
          if (n.tagName === 'th') headers.push(textOf(n).trim())
          ;(n.children || []).forEach(collect)
        }
        collect(node)
        const label = (n) => {
          if (n.tagName === 'tr') {
            let i = 0
            ;(n.children || []).forEach((cell) => {
              if (cell.tagName === 'td') {
                cell.properties = { ...(cell.properties || {}), dataLabel: headers[i] || '' }
                i += 1
              }
            })
          }
          ;(n.children || []).forEach(label)
        }
        label(node)
        return
      }
      ;(node.children || []).forEach(walk)
    }
    walk(tree)
  }
}

const MARKDOWN_COMPONENTS = {
  // eslint-disable-next-line no-unused-vars
  table: ({ node, ...props }) => (
    <div className={s.tableWrap}>
      <table {...props} />
    </div>
  ),
}

function fileUrl(file) {
  if (!file?.url) return null
  return file.url.startsWith('http') ? file.url : `${STRAPI_URL}${file.url}`
}

function fallbackTitle(slug) {
  return DEFAULT_LEGAL_DOCUMENTS.find((doc) => doc.slug === slug)?.title || 'Документ'
}

export async function legalPageMetadata(slug) {
  const { doc } = await getLegalDocument(slug)
  return { title: `${doc?.title || fallbackTitle(slug)} — ${SITE_NAME}` }
}

export default async function LegalPage({ slug }) {
  const { doc, available } = await getLegalDocument(slug)
  const isStandardDocument = DEFAULT_LEGAL_DOCUMENTS.some((d) => d.slug === slug)
  // Unpublished (draft) document → 404. If Strapi is down, standard documents
  // show a placeholder instead of an error.
  if (!doc && (available || !isStandardDocument)) notFound()

  const title = doc?.title || fallbackTitle(slug)
  const pdf = fileUrl(doc?.file)

  return (
    <>
      <Header />
      <main className={s.page}>
        <h1 className={s.title}>{title}</h1>

        {pdf && (
          <a href={pdf} className={s.download} target="_blank" rel="noopener noreferrer" download>
            Скачать PDF
          </a>
        )}

        {doc?.content ? (
          <div className={s.content}>
            <ReactMarkdown
              remarkPlugins={[remarkGfm, remarkBreaks]}
              rehypePlugins={[rehypeTableLabels]}
              components={MARKDOWN_COMPONENTS}
            >{doc.content}</ReactMarkdown>
          </div>
        ) : (
          <p className={s.placeholder}>
            Документ обновляется. Чтобы получить актуальную редакцию, напишите на{' '}
            <a href={`mailto:${DEFAULT_SITE_SETTINGS.legalEmail}`}>{DEFAULT_SITE_SETTINGS.legalEmail}</a>.
          </p>
        )}
      </main>
      <Footer />
    </>
  )
}
