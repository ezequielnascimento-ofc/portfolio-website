import { useLanguage } from '../../context/LanguageContext.jsx'
import { plataformaMcp } from '../../data/cases/plataformaMcp.js'
import { CaseLayout, Decisions, Node, Roadmap, Section, Metrics } from './CaseParts.jsx'

const SECTION_IDS = ['contexto', 'problema', 'ferramentas', 'decisoes', 'arquitetura', 'seguranca', 'resultado', 'proximos']

function Diagram({ a }) {
  return (
    <figure className="arch" role="img" aria-label={a.diagramLabel}>
      <Node lines={a.nodes.client} />
      <div className="arch-link">
        <span className="arch-label mono">{a.links[0]}</span>
      </div>
      <Node lines={a.nodes.proxy} />
      <div className="arch-link">
        <span className="arch-label mono">{a.links[1]}</span>
      </div>
      <Node lines={a.nodes.platform} accent />
      <div className="arch-split" />
      <div className="arch-pair">
        <Node lines={a.nodes.source} />
        <Node lines={a.nodes.db} />
      </div>
    </figure>
  )
}

export default function CasePlataformaMcp() {
  const { lang } = useLanguage()
  const c = plataformaMcp(lang)
  const s = c.sections

  return (
    <CaseLayout c={c} sectionIds={SECTION_IDS}>
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

      <Section id="ferramentas" n="03" title={s.ferramentas}>
        <p className="case-p">{c.tools.intro}</p>
        <table className="qa">
          <caption className="sr-only">{c.tools.tableLabel}</caption>
          <thead className="mono">
            <tr>
              <th scope="col">{c.tools.head[0]}</th>
              <th scope="col">{c.tools.head[1]}</th>
            </tr>
          </thead>
          <tbody>
            {c.tools.rows.map(([q, a]) => (
              <tr key={q}>
                <th scope="row">{q}</th>
                <td>{a}</td>
              </tr>
            ))}
          </tbody>
        </table>
        <p className="case-note mono">{c.tools.note}</p>
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

      <Section id="seguranca" n="06" title={s.seguranca}>
        <div className="case-split case-split--even">
          <ul className="sec-list">
            {c.security.items.map(([title, text]) => (
              <li key={title}>
                <h3>{title}</h3>
                <p>{text}</p>
              </li>
            ))}
          </ul>
          <figure className="chat case-call" aria-label={c.security.code.label}>
            <div className="chat-bar mono">
              <span className="chat-status">
                <span className="dot dot--live" aria-hidden="true" />
                {c.security.code.status}
              </span>
              <span className="pill">{c.security.code.tag}</span>
            </div>
            <pre className="code mono">
              <span>
                <span className="accent">POST</span> {c.architecture.links[1]}  tools/call
              </span>
              {c.security.code.lines.map(([k, v]) => (
                <span key={k}>
                  <span className="code-muted">{k.padEnd(8, ' ')}</span> {v}
                </span>
              ))}
            </pre>
          </figure>
        </div>
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
