import { CONTACT_DATA, translations } from '../data/translations.js'
import { useLanguage } from '../context/LanguageContext.jsx'
import Reveal from './Reveal.jsx'

export default function Contact() {
  const { lang } = useLanguage()
  const t = translations[lang].contact

  return (
    <section id="contato">
      <div className="wrap">
        <div className="contact">
          <Reveal as="p" className="eyebrow">{t.eyebrow}</Reveal>
          <Reveal as="h2" className="section-title">{t.title}</Reveal>
          <Reveal as="p" className="lede" delay={60}>{t.lede}</Reveal>
          <Reveal className="contact-links" delay={120}>
            <a className="btn btn-primary" href={`mailto:${CONTACT_DATA.email}`}>{CONTACT_DATA.email}</a>
            <a className="btn btn-secondary" href={CONTACT_DATA.linkedin} target="_blank" rel="noreferrer">{t.linkedinLabel}</a>
            <a className="btn btn-secondary" href={CONTACT_DATA.github} target="_blank" rel="noreferrer">{t.githubLabel}</a>
          </Reveal>
        </div>
      </div>
    </section>
  )
}

export function Footer() {
  const { lang } = useLanguage()
  const t = translations[lang].contact
  const name = translations[lang].hero.name

  return (
    <footer>
      <div className="wrap">
        <p>© {new Date().getFullYear()} {name}</p>
        <p>{t.location}</p>
      </div>
    </footer>
  )
}
