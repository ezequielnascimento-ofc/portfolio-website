import { translations } from '../data/translations.js'
import { useLanguage } from '../context/LanguageContext.jsx'
import { useCountUp } from '../hooks/useCountUp.js'
import { useReveal } from '../hooks/useReveal.js'
import Reveal from './Reveal.jsx'

function MetricCard({ metric, index }) {
  const [ref, visible] = useReveal(0.4)
  const display = useCountUp(metric.value, metric.decimals, visible)

  return (
    <div
      className={`metric-card reveal ${visible ? 'is-visible' : ''}`}
      ref={ref}
      style={{ transitionDelay: visible ? `${index * 90}ms` : '0ms' }}
    >
      <div className="metric-num">{display}{metric.suffix}</div>
      <div className="metric-label">{metric.label}</div>
    </div>
  )
}

export default function About() {
  const { lang } = useLanguage()
  const t = translations[lang].about
  const metrics = translations[lang].metrics

  return (
    <section id="sobre">
      <div className="wrap">
        <Reveal as="p" className="eyebrow">{t.eyebrow}</Reveal>
        <Reveal as="h2" className="section-title">{t.title}</Reveal>

        <div className="about-grid">
          <Reveal delay={80}>
            {t.paragraphs.map((p) => (
              <p key={p.slice(0, 24)}>{p}</p>
            ))}
          </Reveal>

          <div className="metrics">
            {metrics.map((m, i) => (
              <MetricCard metric={m} index={i} key={m.label} />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
