import { useParallax } from '../hooks/useParallax.js'
import { translations } from '../data/translations.js'
import { useLanguage } from '../context/LanguageContext.jsx'

export default function Hero() {
  const photoRef = useParallax(0.14, 10)
  const { lang } = useLanguage()
  const t = translations[lang].hero

  return (
    <header className="hero" id="topo">
      <div className="hero-inner wrap">
        <div className="hero-avatar">
          <div className="hero-avatar-inner" ref={photoRef}>
            <img src="/profile.jpg" alt={t.name} />
          </div>
        </div>

        <h1>{t.name}</h1>
        <p className="role">{t.role}</p>
        <p className="lede">{t.lede}</p>
        <div className="hero-actions">
          <a className="btn btn-primary" href="#contato">{t.ctaContact}</a>
          <a className="btn btn-secondary" href="#experiencia">{t.ctaExperience}</a>
        </div>
      </div>

      <div className="hero-scroll-cue" aria-hidden="true">
        <span />
      </div>
    </header>
  )
}
