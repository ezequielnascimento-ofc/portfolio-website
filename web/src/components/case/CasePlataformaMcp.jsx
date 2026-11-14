import { useEffect, useState } from 'react'
import { useLanguage } from '../../context/LanguageContext.jsx'
import { plataformaMcp } from '../../data/cases/plataformaMcp.js'
import Header from '../Header.jsx'
import Contact from '../Contact.jsx'

const SECTION_IDS = ['contexto', 'problema', 'ferramentas', 'decisoes', 'arquitetura', 'seguranca', 'resultado', 'proximos']

// Destaca no índice a seção que está na parte de cima da tela.
function useActiveSection(ids) {
  const [active, setActive] = useState(ids[0])
  useEffect(() => {
    const els = ids.map((id) => document.getElementById(id)).filter(Boolean)
    if (!('IntersectionObserver' in window) || els.length === 0) return
    const io = new IntersectionObserver(
      (entries) => {
        const visible = entries.filter((e) => e.isIntersecting)
        if (visible.length) {
          visible.sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top)
          setActive(visible[0].target.id)
        }
      },
      { rootMargin: '-15% 0px -70% 0px' },
    )
    els.forEach((el) => io.observe(el))
    return () => io.disconnect()
  }, [ids])
  return active
}

function Section({ id, n, title, children, className = '' }) {
  return (
    <section id={id} className={`case-section ${className}`} aria-labelledby={`h-${id}`}>
      <h2 id={`h-${id}`} className="case-h2">
        <span className="chapter-num">{n}</span> {title}
      </h2>
      {children}
    </section>
  )
}

function Metrics({ items }) {
  return (
    <ul className="metrics case-metrics">
      {items.map((m) => (
        <li key={m.label} className={`metric ${m.accent ? 'metric--lead' : ''}`}>
          <span className="metric-value">{m.value}</span>
          <span className="metric-label">{m.label}</span>
        </li>
      ))}
    </ul>
  )
}

function Node({ lines, accent = false }) {
  const [title, ...rest] = lines
  return (
    <div className={`arch-node ${accent ? 'arch-node--accent' : ''}`}>
      <b>{title}</b>
      {rest.map((l) => (
        <span key={l}>{l}</span>
      ))}
    </div>
  )
}

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
  const active = useActiveSection(SECTION_IDS)
  const [stmt, stmtMuted] = c.statement
  // Em ES e FR o caso aparece em inglês; o cabeçalho e o contato seguem o idioma do site.
  const contentLang = c.notice ? 'en' : undefined

  return (
    <>
      <div id="topo" className="case-shell">
        <Header home={false} />
      </div>

      <main>
        <section className="case-shell case-top" aria-labelledby="caso-titulo" lang={contentLang}>
          <div className="case-crumbs mono">
            <a className="ln" href="/#projetos">
              <span aria-hidden="true">←</span> {c.back}
            </a>
            <span>{c.counter}</span>
          </div>

          {c.notice && <p className="case-notice mono">{c.notice}</p>}

          <div className="chapter-head">
            <h1 id="caso-titulo" className="chapter-title">
              <span className="chapter-num">{c.number}</span> {c.title}
            </h1>
            <span className="chapter-meta mono">{c.meta_line}</span>
          </div>

          <p className="statement statement--lg">
            {stmt} <span className="statement-muted">{stmtMuted}</span>
          </p>

          <div className="case-intro">
            <p className="case-lead">{c.lead}</p>
            <dl className="case-facts">
              {c.facts.map((f) => (
                <div key={f.label}>
                  <dt className="label mono">{f.label}</dt>
                  <dd>
                    {f.live && <span className="dot dot--live" aria-hidden="true" />}
                    {f.value}
                  </dd>
                </div>
              ))}
            </dl>
          </div>

          <Metrics items={c.metrics} />
        </section>

        <div className="case-shell case-body" lang={contentLang}>
          <nav className="case-toc" aria-label={c.tocLabel}>
            <span className="label mono">{c.tocLabel}</span>
            <ol className="mono">
              {SECTION_IDS.map((id, i) => (
                <li key={id}>
                  <a href={`#${id}`} aria-current={active === id ? 'true' : undefined}>
                    {String(i + 1).padStart(2, '0')} {c.tocShort[id] || s[id]}
                  </a>
                </li>
              ))}
            </ol>
          </nav>

          <div className="case-content">
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
              <p className="case-p">{c.decisions.intro}</p>
              <ol className="decisions">
                {c.decisions.rows.map(([d, alt, why]) => (
                  <li key={d}>
                    <div>
                      <span className="label mono decisions-key">{c.decisions.labels[0]}</span>
                      <p className="decisions-main">{d}</p>
                    </div>
                    <div>
                      <span className="label mono">{c.decisions.labels[1]}</span>
                      <p className="decisions-alt">
                        <s>{alt}</s>
                      </p>
                    </div>
                    <div>
                      <span className="label mono">{c.decisions.labels[2]}</span>
                      <p>{why}</p>
                    </div>
                  </li>
                ))}
              </ol>
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
              <div className="roadmap">
                {c.next.items.map(([title, text]) => (
                  <article key={title} className="tile roadmap-item">
                    <div className="tile-head mono">
                      <h3>{title}</h3>
                      <span className="pill">{c.next.planned}</span>
                    </div>
                    <p className="tile-text">{text}</p>
                  </article>
                ))}
              </div>
              <div className="case-stack">
                <span className="label mono">{c.next.stackLabel}</span>
                <ul className="case-chips mono">
                  {c.next.stack.map((x) => (
                    <li key={x}>{x}</li>
                  ))}
                </ul>
              </div>
            </Section>
          </div>
        </div>

        <section className="theme-peach next-case" aria-labelledby="h-proximo-caso" lang={contentLang}>
          <div className="case-shell next-case-inner">
            <div className="chapter-head">
              <h2 id="h-proximo-caso" className="chapter-title">
                <span className="chapter-num">{c.nextCase.number}</span> {c.nextCase.title}
              </h2>
              <span className="chapter-meta mono">{c.nextCase.kicker}</span>
            </div>
            <div className="next-case-row">
              <p className="statement statement--md">
                {c.nextCase.statement[0]} <span className="statement-muted">{c.nextCase.statement[1]}</span>
              </p>
              <a className="btn btn--case btn--dark" href="/#projetos">
                {c.nextCase.cta} <span aria-hidden="true">→</span>
              </a>
            </div>
          </div>
        </section>

        <Contact />
      </main>
    </>
  )
}
