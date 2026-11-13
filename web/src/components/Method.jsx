import { useLanguage } from '../context/LanguageContext.jsx'
import { CHIPS } from '../data/content.js'

export default function Method() {
  const { t } = useLanguage()
  const m = t.method
  return (
    <section id="metodo" className="screen theme-light" aria-labelledby="metodo-titulo">
      <div className="wrap method">
        <h2 id="metodo-titulo" className="section-title">
          {m.title}
          <span className="accent-dark">.</span>
        </h2>
        <ol className="steps">
          {m.steps.map((s, i) => (
            <li key={s.title} className="step">
              <span className="step-num" aria-hidden="true">{String(i + 1).padStart(2, '0')}</span>
              <span className="step-title">{s.title}</span>
              <span className="step-text">{s.text}</span>
            </li>
          ))}
        </ol>
        <ul className="chips" aria-label={m.chipsLabel}>
          {CHIPS.map((c) => (
            <li key={c} className="chip">{c}</li>
          ))}
        </ul>
      </div>
    </section>
  )
}
