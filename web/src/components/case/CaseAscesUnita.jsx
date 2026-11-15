import { useLanguage } from '../../context/LanguageContext.jsx'
import { ascesUnita } from '../../data/cases/ascesUnita.js'
import { ArchSteps, CaseLayout, Decisions, Roadmap, Section, SplitDiagram } from './CaseParts.jsx'

const SECTION_IDS = ['contexto', 'problema', 'cpf', 'decisoes', 'arquitetura', 'testes', 'resultado', 'proximos']

export default function CaseAscesUnita() {
  const { lang } = useLanguage()
  const c = ascesUnita(lang)
  const s = c.sections
  const lim = c.cpf.limits
  const t = c.tests
  const o = c.result.others

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

      <Section id="cpf" n="03" title={s.cpf}>
        <p className="case-p">{c.cpf.intro}</p>
        <ol className="iso-layers iso-layers--grid">
          {c.cpf.steps.map(([label, title, text], i) => (
            <li key={label} className={i === 2 ? 'iso-layer--db' : ''}>
              <span className="label mono">{label}</span>
              <h3>{title}</h3>
              <p>{text}</p>
            </li>
          ))}
        </ol>
        <figure className="chat limits" aria-label={lim.label}>
          <div className="chat-bar mono">
            <span>{lim.title}</span>
            <span className="pill">{lim.tag}</span>
          </div>
          <ul className="limits-grid">
            {lim.items.map(([value, label, accent]) => (
              <li key={label}>
                <span className={`limits-value ${accent ? 'accent' : ''}`}>
                  {value}
                  <span className="limits-unit">{lim.unit}</span>
                </span>
                <span className="mono limits-label">{label}</span>
              </li>
            ))}
          </ul>
        </figure>
      </Section>

      <Section id="decisoes" n="04" title={s.decisoes}>
        <Decisions {...c.decisions} />
      </Section>

      <Section id="arquitetura" n="05" title={s.arquitetura}>
        <div className="case-split">
          <ArchSteps steps={c.architecture.steps} />
          <SplitDiagram a={c.architecture} />
        </div>
      </Section>

      <Section id="testes" n="06" title={s.testes}>
        <p className="case-p">{t.intro}</p>
        <div className="load-table-wrap">
          <table className="load-table">
            <caption className="sr-only">{t.tableLabel}</caption>
            <thead className="mono">
              <tr>
                {t.head.map((h) => (
                  <th key={h} scope="col">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {t.rows.map(([run, responses, rate, p95, failures, cpf, flag]) => (
                <tr key={run}>
                  <th scope="row">{run}</th>
                  <td>{responses}</td>
                  <td>{rate}</td>
                  <td>{p95}</td>
                  <td className={flag === 'warn' ? 'load-warn' : ''}>{failures}</td>
                  <td className="load-ok">{cpf}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p className="case-note mono">{t.note}</p>
        <ul className="sec-list sec-grid">
          {t.items.map(([title, text]) => (
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
        <div className="case-stack case-stack--plain">
          <span className="label mono">{c.result.liveLabel}</span>
          <ul className="case-chips mono">
            {c.result.live.map((x) => (
              <li key={x}>{x}</li>
            ))}
          </ul>
        </div>
        <div className="case-stack case-stack--plain">
          <span className="label mono">{c.result.othersLabel}</span>
          <div className="others">
            <article className="tile tile--accent">
              <div className="tile-head mono">
                <span>{o.bolsa[0]}</span>
              </div>
              <div>
                <p className="tile-big">{o.bolsa[1]}</p>
                <p className="tile-text">{o.bolsa[2]}</p>
              </div>
            </article>
            <article className="tile">
              <div className="tile-head mono">
                <span>{o.dspace[0]}</span>
              </div>
              <p className="tile-figure">{o.dspace[1]}</p>
              <p className="tile-text">{o.dspace[2]}</p>
            </article>
            <article className="tile">
              <div className="tile-head mono">
                <span>{o.cipa[0]}</span>
              </div>
              <p className="others-title">{o.cipa[1]}</p>
              <p className="tile-text">{o.cipa[2]}</p>
            </article>
          </div>
        </div>
      </Section>

      <Section id="proximos" n="08" title={s.proximos}>
        <Roadmap next={c.next} />
      </Section>
    </CaseLayout>
  )
}
