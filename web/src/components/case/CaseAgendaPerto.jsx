import { Fragment } from 'react'
import { useLanguage } from '../../context/LanguageContext.jsx'
import { agendaPerto } from '../../data/cases/agendaPerto.js'
import { CaseLayout, Decisions, Node, Roadmap, Section, Metrics } from './CaseParts.jsx'

const SECTION_IDS = ['contexto', 'problema', 'isolamento', 'decisoes', 'arquitetura', 'pipeline', 'resultado', 'proximos']

// Cadeia vertical: cada nó ligado ao seguinte, com os três últimos dentro do servidor.
function Diagram({ a }) {
  const outside = a.nodes.slice(0, 2)
  const inside = a.nodes.slice(2)
  return (
    <figure className="arch" role="img" aria-label={a.diagramLabel}>
      {outside.map((lines, i) => (
        <Fragment key={lines[0]}>
          <Node lines={lines} />
          <div className="arch-link">
            <span className="arch-label mono">{a.links[i]}</span>
          </div>
        </Fragment>
      ))}
      <div className="arch-zone">
        {inside.map((lines, i) => (
          <Fragment key={lines[0]}>
            <Node lines={lines} accent={i === inside.length - 1} />
            {i < inside.length - 1 && (
              <div className="arch-link">
                <span className="arch-label mono">{a.links[i + 2]}</span>
              </div>
            )}
          </Fragment>
        ))}
        <span className="arch-zone-label mono">{a.serverLabel}</span>
      </div>
    </figure>
  )
}

function Sql({ parts }) {
  return parts.map(([kind, text], i) =>
    kind === 'kw' ? (
      <span key={i} className="accent">{text}</span>
    ) : kind === 'str' ? (
      <span key={i} className="code-str">{text}</span>
    ) : (
      <Fragment key={i}>{text}</Fragment>
    ),
  )
}

export default function CaseAgendaPerto() {
  const { lang } = useLanguage()
  const c = agendaPerto(lang)
  const s = c.sections
  const iso = c.isolation

  return (
    <CaseLayout c={c} sectionIds={SECTION_IDS} theme="peach">
      <Section id="contexto" n="01" title={s.contexto}>
        {c.context.map((p) => (
          <p key={p} className="case-p">{p}</p>
        ))}
      </Section>

      <Section id="problema" n="02" title={s.problema}>
        <div className="pd">
          {c.problem.map((p) => (
            <div key={p.label} className="pd-item">
              <span className="label mono">{p.label}</span>
              <p>{p.text}</p>
            </div>
          ))}
        </div>
      </Section>

      <Section id="isolamento" n="03" title={s.isolamento}>
        <p className="case-p">{iso.intro}</p>
        <ol className="iso-layers">
          {iso.layers.map(([label, title, text], i) => (
            <li key={label} className={i === iso.layers.length - 1 ? 'iso-layer--db' : ''}>
              <span className="label mono">{label}</span>
              <h3>{title}</h3>
              <p>{text}</p>
            </li>
          ))}
        </ol>
        <figure className="chat case-sql" aria-label={iso.code.label}>
          <div className="chat-bar mono">
            <span>{iso.code.title}</span>
            <span className="pill">{iso.code.tag}</span>
          </div>
          <pre className="code mono">
            <code>
              <Sql parts={iso.code.sql} />
            </code>
          </pre>
        </figure>
        <p className="case-note mono">{iso.note}</p>
      </Section>

      <Section id="decisoes" n="04" title={s.decisoes}>
        <Decisions {...c.decisions} />
      </Section>

      <Section id="arquitetura" n="05" title={s.arquitetura}>
        <div className="case-split">
          <ol className="arch-steps">
            {c.architecture.steps.map((step, i) => (
              <li key={step}>
                <span className="mono chapter-num">{String(i + 1).padStart(2, '0')}</span>
                <p>{step}</p>
              </li>
            ))}
          </ol>
          <Diagram a={c.architecture} />
        </div>
      </Section>

      <Section id="pipeline" n="06" title={s.pipeline}>
        <ol className="flow mono" aria-label={c.pipeline.flowLabel}>
          {c.pipeline.flow.map((step, i) => {
            const kind = i === 1 ? 'gate' : i === c.pipeline.flow.length - 1 ? 'safe' : ''
            return (
              <li key={step}>
                <span className={`flow-pill ${kind ? `flow-pill--${kind}` : ''}`}>{step}</span>
              </li>
            )
          })}
        </ol>
        <ul className="sec-list sec-grid">
          {c.pipeline.items.map(([title, text]) => (
            <li key={title}>
              <h3>{title}</h3>
              <p>{text}</p>
            </li>
          ))}
        </ul>
      </Section>

      <Section id="resultado" n="07" title={s.resultado}>
        <p className="statement case-result">
          {c.result.statement[0]} <span className="statement-muted">{c.result.statement[1]}</span>
        </p>
        <Metrics items={c.result.metrics} />
        <p className="case-note mono">{c.result.note}</p>
      </Section>

      <Section id="proximos" n="08" title={s.proximos}>
        <Roadmap next={c.next} />
      </Section>
    </CaseLayout>
  )
}
