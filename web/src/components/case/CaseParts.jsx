// Peças comuns das páginas de estudo de caso.
import { useEffect, useState } from 'react'
import Header from '../Header.jsx'
import Contact from '../Contact.jsx'

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

export function Section({ id, n, title, children, className = '' }) {
  return (
    <section id={id} className={`case-section ${className}`} aria-labelledby={`h-${id}`}>
      <h2 id={`h-${id}`} className="case-h2">
        <span className="chapter-num">{n}</span> {title}
      </h2>
      {children}
    </section>
  )
}

export function Metrics({ items }) {
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

export function Node({ lines, accent = false }) {
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

// Diagrama vertical: cliente → proxy → serviço principal (destaque) → dois destinos lado a lado.
export function SplitDiagram({ a }) {
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

export function ArchSteps({ steps }) {
  return (
    <ol className="arch-steps">
      {steps.map((step, i) => (
        <li key={step}>
          <span className="mono chapter-num">{String(i + 1).padStart(2, '0')}</span>
          <p>{step}</p>
        </li>
      ))}
    </ol>
  )
}

export function Decisions({ intro, labels, rows }) {
  return (
    <>
      <p className="case-p">{intro}</p>
      <ol className="decisions">
        {rows.map(([d, alt, why]) => (
          <li key={d}>
            <div>
              <span className="label mono decisions-key">{labels[0]}</span>
              <p className="decisions-main">{d}</p>
            </div>
            <div>
              <span className="label mono">{labels[1]}</span>
              <p className="decisions-alt">
                <s>{alt}</s>
              </p>
            </div>
            <div>
              <span className="label mono">{labels[2]}</span>
              <p>{why}</p>
            </div>
          </li>
        ))}
      </ol>
    </>
  )
}

export function Roadmap({ next }) {
  return (
    <>
      <div className="roadmap">
        {next.items.map(([title, text]) => (
          <article key={title} className="tile roadmap-item">
            <div className="tile-head mono">
              <h3>{title}</h3>
              <span className="pill">{next.planned}</span>
            </div>
            <p className="tile-text">{text}</p>
          </article>
        ))}
      </div>
      <div className="case-stack">
        <span className="label mono">{next.stackLabel}</span>
        <ul className="case-chips mono">
          {next.stack.map((x) => (
            <li key={x}>{x}</li>
          ))}
        </ul>
      </div>
    </>
  )
}

// Página inteira: cabeçalho, topo do caso, índice + seções, próximo caso e contato.
// theme: 'dark' (padrão) ou 'peach' (topo no tom do capítulo 02).
export function CaseLayout({ c, sectionIds, theme = 'dark', children }) {
  const active = useActiveSection(sectionIds)
  const [stmt, stmtMuted] = c.statement
  // Em ES e FR o caso aparece em inglês; o cabeçalho e o contato seguem o idioma do site.
  const contentLang = c.notice ? 'en' : undefined
  const n = c.nextCase
  const peach = theme === 'peach' ? 'theme-peach' : ''

  return (
    <>
      <div id="topo" className={`case-band case-band--${theme} ${peach}`}>
        <div className="case-shell">
          <Header home={false} />
        </div>
      </div>

      <main>
        <section className={`case-band case-band--${theme} ${peach}`} aria-labelledby="caso-titulo" lang={contentLang}>
          <div className="case-shell case-top">
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
          </div>
        </section>

        <div className={`case-shell case-body case-body--${theme}`} lang={contentLang}>
          <nav className="case-toc" aria-label={c.tocLabel}>
            <span className="label mono">{c.tocLabel}</span>
            <ol className="mono">
              {sectionIds.map((id, i) => (
                <li key={id}>
                  <a href={`#${id}`} aria-current={active === id ? 'true' : undefined}>
                    {String(i + 1).padStart(2, '0')} {c.tocShort[id] || c.sections[id]}
                  </a>
                </li>
              ))}
            </ol>
          </nav>

          <div className="case-content">{children}</div>
        </div>

        <section
          className={`next-case next-case--${n.theme || 'peach'} ${n.theme === 'dark' ? '' : 'theme-peach'}`}
          aria-labelledby="h-proximo-caso"
          lang={contentLang}
        >
          <div className="case-shell next-case-inner">
            <div className="chapter-head">
              <h2 id="h-proximo-caso" className="chapter-title">
                <span className="chapter-num">{n.number}</span> {n.title}
              </h2>
              <span className="chapter-meta mono">{n.kicker}</span>
            </div>
            <div className="next-case-row">
              <p className="statement statement--md">
                {n.statement[0]} <span className="statement-muted">{n.statement[1]}</span>
              </p>
              <a className={`btn btn--case ${n.theme === 'dark' ? 'btn--ghost' : 'btn--dark'}`} href={n.href}>
                {n.cta} <span aria-hidden="true">→</span>
              </a>
            </div>
          </div>
        </section>

        <Contact />
      </main>
    </>
  )
}
