import { useLanguage } from '../context/LanguageContext.jsx'
import { STACKS } from '../data/content.js'

// Mantém palavras com hífen inteiras na quebra de linha (ex.: Asces-Unita).
function keepHyphenated(text) {
  return text.split(' ').map((w, i) => (
    <span key={i}>
      {i > 0 && ' '}
      {w.includes('-') ? <span className="nw">{w}</span> : w}
    </span>
  ))
}

function ChapterHead({ number, title, meta }) {
  return (
    <div className="chapter-head">
      <h2 className="chapter-title">
        <span className="chapter-num">{number}</span> {title}
      </h2>
      <span className="chapter-meta mono">{meta}</span>
    </div>
  )
}

function Statement({ parts, className = '' }) {
  return (
    <p className={`statement ${className}`}>
      {parts[0]} <span className="statement-muted">{parts[1]}</span>
    </p>
  )
}

// Sem href, o caso ainda não tem página: o botão aparece sem destino.
function CaseStudyButton({ variant = 'ghost', href }) {
  const { t } = useLanguage()
  return (
    <a className={`btn btn--case btn--${variant}`} href={href}>
      {t.caseStudy} <span aria-hidden="true">→</span>
    </a>
  )
}

function Mcp() {
  const { t } = useLanguage()
  const m = t.mcp
  return (
    <section id="projetos" className="screen" aria-labelledby="cap-mcp">
      <div className="wrap chapter">
        <ChapterHead number="01" title={<span id="cap-mcp">{keepHyphenated(m.title)}</span>} meta={m.meta} />

        <div className="mcp-grid">
          <div className="mcp-text">
            <Statement parts={m.statement} className="statement--md" />
            <div className="pd">
              <div className="pd-item">
                <span className="label mono">{m.problemLabel}</span>
                <p>{m.problem}</p>
              </div>
              <div className="pd-item">
                <span className="label mono">{m.decisionLabel}</span>
                <p>{m.decision}</p>
              </div>
            </div>
          </div>

          <figure className="chat" aria-label={m.chat.label}>
            <div className="chat-bar mono">
              <span className="chat-status">
                <span className="dot dot--live" aria-hidden="true" />
                {m.chat.status}
              </span>
              <span className="pill">{m.chat.tag}</span>
            </div>
            <p className="chat-q">{m.chat.question}</p>
            <p className="chat-tool mono">
              <span className="dot dot--accent" aria-hidden="true" />
              {m.chat.tool}
            </p>
            <div className="chat-a">
              {m.chat.answers.map((a, i) => (
                <p key={a}>
                  {a}
                  {i === m.chat.answers.length - 1 && <span className="caret" aria-hidden="true" />}
                </p>
              ))}
            </div>
            <p className="chat-note mono">{m.chat.note}</p>
          </figure>
        </div>

        <ul className="metrics">
          {m.metrics.map((x) => (
            <li key={x.label} className={`metric ${x.accent ? 'metric--lead' : ''}`}>
              <span className="metric-value">{x.value}</span>
              <span className="metric-label">{x.label}</span>
            </li>
          ))}
          <li className="metric metric--action">
            <CaseStudyButton href="/casos/plataforma-mcp/" />
          </li>
        </ul>
      </div>
    </section>
  )
}

function Perto() {
  const { t } = useLanguage()
  const p = t.perto
  return (
    <section className="screen theme-peach" aria-labelledby="cap-perto">
      <div className="wrap chapter">
        <ChapterHead number="02" title={<span id="cap-perto">{keepHyphenated(p.title)}</span>} meta={p.meta} />
        <Statement parts={p.statement} className="statement--lg" />
        <ol className="layers">
          {p.layers.map((l, i) => (
            <li key={l.label} className={`layer ${i === p.layers.length - 1 ? 'layer--dark' : ''}`}>
              <span className="label mono">{l.label}</span>
              <span className="layer-text">{l.text}</span>
            </li>
          ))}
        </ol>
        <div className="chapter-foot">
          <p className="mono">
            {p.footnote} · {STACKS.perto}
          </p>
          <CaseStudyButton variant="dark" href="/casos/agenda-perto/" />
        </div>
      </div>
    </section>
  )
}

function Asces() {
  const { t } = useLanguage()
  const a = t.asces
  return (
    <section className="screen" aria-labelledby="cap-asces">
      <div className="wrap chapter">
        <ChapterHead number="03" title={<span id="cap-asces">{keepHyphenated(a.title)}</span>} meta={a.meta} />
        <Statement parts={a.statement} className="statement--md statement--wide" />

        <div className="bento">
          <article className="tile tile--wide">
            <div className="tile-head mono">
              <span>{a.portal.label}</span>
              <span>{a.portal.status}</span>
            </div>
            <p className="tile-text">{a.portal.text}</p>
            <pre className="code mono" aria-hidden="true">
              <span><span className="accent">POST</span> /consulta-local-de-prova</span>
              <span className="code-muted">{'{ "cpf": "hmac:9f2c…e71a" }'}</span>
              <span><span className="code-warn">429</span> {a.portal.limit}</span>
            </pre>
          </article>
          <article className="tile">
            <div className="tile-head mono">
              <span>{a.dspace.label}</span>
            </div>
            <p className="tile-figure">5 → 10</p>
            <p className="tile-text">{a.dspace.text}</p>
          </article>
          <article className="tile tile--accent">
            <div className="tile-head mono">
              <span>{a.bolsa.label}</span>
            </div>
            <div>
              <p className="tile-big">{a.bolsa.value}</p>
              <p className="tile-text">{a.bolsa.text}</p>
            </div>
          </article>
        </div>

        <div className="chapter-foot chapter-foot--rule">
          <p className="mono">{STACKS.asces}</p>
          <CaseStudyButton href="/casos/asces-unita/" />
        </div>
      </div>
    </section>
  )
}

export default function Projects() {
  return (
    <>
      <Mcp />
      <Perto />
      <Asces />
    </>
  )
}
