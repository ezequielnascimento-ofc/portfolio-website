import { useLanguage } from '../context/LanguageContext.jsx'
import { TICKER } from '../data/content.js'
import Header from './Header.jsx'

function TickerRun({ hidden }) {
  return (
    <span className="ticker-run" aria-hidden={hidden || undefined}>
      {TICKER.map((item) => (
        <span key={item} className="ticker-item">
          <span>{item}</span>
          <span className="ticker-mark" aria-hidden="true">■</span>
        </span>
      ))}
    </span>
  )
}

export default function Hero() {
  const { t } = useLanguage()
  const h = t.hero

  return (
    <section id="topo" className="hero">
      <div className="hero-grid">
        <div className="hero-main">
          <Header />

          <div className="hero-body">
            <p className="hero-meta mono">
              <span className="hero-role">
                <span className="dot dot--live" aria-hidden="true" />
                {h.role}
              </span>
              <span>{h.location}</span>
            </p>

            <h1 className={`hero-title ${h.title.length > 88 ? 'hero-title--long' : ''}`}>
              {h.title}
              <span className="accent">.</span>
            </h1>

            <div className="hero-actions">
              <p className="hero-lead">{h.lead}</p>
              <div className="btn-row">
                <a className="btn btn--accent" href="#projetos">
                  {h.ctaProjects} <span aria-hidden="true">↓</span>
                </a>
                <a className="btn btn--ghost" href="#contato">{h.ctaContact}</a>
              </div>
            </div>
          </div>

          <ul className="hero-stats">
            {h.stats.map((s) => (
              <li key={s.label} className="stat">
                <span className={`stat-value ${s.accent ? 'accent' : ''}`}>{s.value}</span>
                <span className="stat-label">{s.label}</span>
              </li>
            ))}
          </ul>
        </div>

        <div className="hero-photo">
          <img
            src="/profile.jpg"
            alt={h.photoAlt}
            width="896"
            height="1080"
            fetchpriority="high"
          />
        </div>
      </div>

      <div className="ticker" role="region" aria-label={h.tickerLabel}>
        <div className="ticker-track">
          <TickerRun />
          <TickerRun hidden />
        </div>
      </div>
    </section>
  )
}
