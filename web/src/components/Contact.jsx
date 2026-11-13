import { useLanguage } from '../context/LanguageContext.jsx'
import { LINKS } from '../data/content.js'

export default function Contact() {
  const { t } = useLanguage()
  const c = t.contact
  const links = [
    { href: `mailto:${LINKS.email}`, label: c.email, external: false },
    { href: LINKS.linkedin, label: c.linkedin, external: true },
    { href: LINKS.github, label: c.github, external: true },
  ]
  return (
    <section id="contato" className="screen theme-accent" aria-labelledby="contato-titulo">
      <div className="wrap contact">
        <p className="contact-kicker mono">{c.kicker}</p>
        <h2 id="contato-titulo" className="contact-title">{c.title}</h2>
        <p className="contact-text">{c.text}</p>
        <ul className="contact-links">
          {links.map((l) => (
            <li key={l.label}>
              <a
                className="contact-link"
                href={l.href}
                {...(l.external ? { target: '_blank', rel: 'noreferrer' } : {})}
              >
                {l.label}
                {l.external && <span className="sr-only"> {c.newTab}</span>}
                <span aria-hidden="true">↗</span>
              </a>
            </li>
          ))}
        </ul>
        <footer className="footer mono">
          <span>© 2026 Ezequiel Nascimento</span>
          <span>{t.footer.location}</span>
        </footer>
      </div>
    </section>
  )
}
