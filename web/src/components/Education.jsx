import { CERTIFICATIONS_DATA, translations } from '../data/translations.js'
import { useLanguage } from '../context/LanguageContext.jsx'
import Reveal from './Reveal.jsx'

export default function Education() {
  const { lang } = useLanguage()
  const t = translations[lang].education

  return (
    <section id="formacao">
      <div className="wrap">
        <Reveal as="p" className="eyebrow">{t.eyebrow}</Reveal>
        <Reveal as="h2" className="section-title">{t.title}</Reveal>

        {t.items.map((edu, i) => (
          <Reveal as="div" className="edu-item" delay={i * 80} key={edu.title}>
            <h3>{edu.title}</h3>
            <p className="edu-meta">{edu.meta}</p>
            <p>{edu.text}</p>
          </Reveal>
        ))}

        <Reveal as="h3" className="cert-heading" delay={120}>{t.certLabel}</Reveal>
        <Reveal as="ul" className="cert-list" delay={160}>
          {CERTIFICATIONS_DATA.map((cert) => (
            <li key={cert.name}>
              <span className="cert-name">{cert.name}</span>
              <span className="cert-meta">{cert.issuer} · {cert.year}</span>
            </li>
          ))}
        </Reveal>
      </div>
    </section>
  )
}
