import { useEffect, useRef, useState } from 'react'
import { useLanguage } from '../context/LanguageContext.jsx'

function LanguageMenu({ onPick }) {
  const { lang, setLang, t, languages } = useLanguage()
  const [open, setOpen] = useState(false)
  const ref = useRef(null)

  useEffect(() => {
    if (!open) return
    const onDown = (e) => {
      if (ref.current && !ref.current.contains(e.target)) setOpen(false)
    }
    const onKey = (e) => {
      if (e.key === 'Escape') setOpen(false)
    }
    document.addEventListener('pointerdown', onDown)
    document.addEventListener('keydown', onKey)
    return () => {
      document.removeEventListener('pointerdown', onDown)
      document.removeEventListener('keydown', onKey)
    }
  }, [open])

  const current = languages.find((l) => l.code === lang)

  return (
    <div className="lang" ref={ref}>
      <button
        type="button"
        className="lang-toggle"
        aria-haspopup="true"
        aria-expanded={open}
        aria-label={`${t.nav.language}: ${current.name}`}
        onClick={() => setOpen((v) => !v)}
      >
        {current.label} <span aria-hidden="true" className="lang-caret">▾</span>
      </button>
      {open && (
        <ul className="lang-list">
          {languages.map((l) => (
            <li key={l.code}>
              <button
                type="button"
                lang={l.code}
                aria-current={l.code === lang ? 'true' : undefined}
                onClick={() => {
                  setLang(l.code)
                  setOpen(false)
                  onPick?.()
                }}
              >
                <span className="mono">{l.label}</span> {l.name}
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}

export default function Header() {
  const { t } = useLanguage()
  const [open, setOpen] = useState(false)

  useEffect(() => {
    document.body.classList.toggle('menu-open', open)
    if (!open) return
    const onKey = (e) => {
      if (e.key === 'Escape') setOpen(false)
    }
    document.addEventListener('keydown', onKey)
    return () => document.removeEventListener('keydown', onKey)
  }, [open])

  const links = [
    { href: '#projetos', label: t.nav.projects },
    { href: '#metodo', label: t.nav.method },
    { href: '#experiencia', label: t.nav.experience },
    { href: '#contato', label: t.nav.contact },
  ]

  return (
    <header className="header">
      <a className="brand" href="#topo">Ezequiel Nascimento</a>
      <nav aria-label={t.nav.main} className="nav">
        <ul className="nav-links">
          {links.map((l) => (
            <li key={l.href}>
              <a className="ln" href={l.href}>{l.label}</a>
            </li>
          ))}
        </ul>
        <LanguageMenu />
        <button
          type="button"
          className="menu-toggle"
          aria-expanded={open}
          aria-controls="menu-mobile"
          aria-label={open ? t.nav.close : t.nav.menu}
          onClick={() => setOpen((v) => !v)}
        >
          <span />
          <span />
        </button>
      </nav>

      <div id="menu-mobile" className={`menu-mobile ${open ? 'is-open' : ''}`} hidden={!open}>
        <ul>
          {links.map((l) => (
            <li key={l.href}>
              <a href={l.href} onClick={() => setOpen(false)}>{l.label}</a>
            </li>
          ))}
        </ul>
      </div>
    </header>
  )
}
