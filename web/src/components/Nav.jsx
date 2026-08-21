import { useEffect, useState } from 'react'
import { LANGUAGES, translations } from '../data/translations.js'
import { useLanguage } from '../context/LanguageContext.jsx'

export default function Nav() {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)
  const { lang, setLang } = useLanguage()
  const t = translations[lang].nav

  const links = [
    { href: '#sobre', label: t.sobre },
    { href: '#experiencia', label: t.experiencia },
    { href: '#competencias', label: t.competencias },
    { href: '#formacao', label: t.formacao },
    { href: '#contato', label: t.contato },
  ]

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <nav className={`nav ${scrolled ? 'nav--scrolled' : ''}`}>
      <div className="nav-inner">
        <ul className="nav-links nav-links--desktop">
          {links.map((link) => (
            <li key={link.href}>
              <a href={link.href}>{link.label}</a>
            </li>
          ))}
        </ul>

        <div className="lang-switch">
          {LANGUAGES.map((l) => (
            <button
              key={l.code}
              className={`lang-btn ${lang === l.code ? 'is-active' : ''}`}
              onClick={() => setLang(l.code)}
              aria-pressed={lang === l.code}
            >
              {l.label}
            </button>
          ))}
        </div>

        <button
          className={`nav-toggle ${open ? 'is-open' : ''}`}
          aria-label={open ? 'Close menu' : 'Open menu'}
          aria-expanded={open}
          onClick={() => setOpen((v) => !v)}
        >
          <span />
          <span />
        </button>
      </div>

      <div className={`nav-mobile ${open ? 'is-open' : ''}`}>
        <ul>
          {links.map((link) => (
            <li key={link.href}>
              <a href={link.href} onClick={() => setOpen(false)}>{link.label}</a>
            </li>
          ))}
        </ul>
        <div className="lang-switch lang-switch--mobile">
          {LANGUAGES.map((l) => (
            <button
              key={l.code}
              className={`lang-btn ${lang === l.code ? 'is-active' : ''}`}
              onClick={() => { setLang(l.code); setOpen(false) }}
              aria-pressed={lang === l.code}
            >
              {l.label}
            </button>
          ))}
        </div>
      </div>
    </nav>
  )
}
