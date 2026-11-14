import { createContext, useContext, useEffect, useState } from 'react'
import { content, LANGUAGES } from '../data/content.js'

const LanguageContext = createContext(null)
const STORAGE_KEY = 'lang'
const HTML_LANG = { pt: 'pt-BR', en: 'en', es: 'es', fr: 'fr' }

function initialLang() {
  try {
    const fromUrl = new URLSearchParams(window.location.search).get('lang')
    if (fromUrl && content[fromUrl]) return fromUrl
  } catch {
    // URL sem parâmetros válidos
  }
  try {
    const saved = window.localStorage.getItem(STORAGE_KEY)
    if (saved && content[saved]) return saved
  } catch {
    // armazenamento indisponível: segue com o padrão
  }
  return 'pt'
}

// pageMeta (opcional): (lang) => { title, description } para páginas que não são a inicial.
export function LanguageProvider({ children, pageMeta }) {
  const [lang, setLangState] = useState(initialLang)

  const setLang = (code) => {
    if (!content[code]) return
    setLangState(code)
    try {
      window.localStorage.setItem(STORAGE_KEY, code)
    } catch {
      // sem persistência, sem problema
    }
  }

  useEffect(() => {
    const meta = pageMeta ? pageMeta(lang) : content[lang].meta
    document.documentElement.lang = HTML_LANG[lang]
    document.title = meta.title
    const desc = document.querySelector('meta[name="description"]')
    if (desc) desc.setAttribute('content', meta.description)
  }, [lang, pageMeta])

  return (
    <LanguageContext.Provider value={{ lang, setLang, t: content[lang], languages: LANGUAGES }}>
      {children}
    </LanguageContext.Provider>
  )
}

export function useLanguage() {
  const ctx = useContext(LanguageContext)
  if (!ctx) throw new Error('useLanguage precisa estar dentro de LanguageProvider')
  return ctx
}
