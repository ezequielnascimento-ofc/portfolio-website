import { EXPERIENCE_STACKS, translations } from '../data/translations.js'
import { useLanguage } from '../context/LanguageContext.jsx'
import Reveal from './Reveal.jsx'

export default function Experience() {
  const { lang } = useLanguage()
  const t = translations[lang].experience

  return (
    <section id="experiencia">
      <div className="wrap">
        <Reveal as="p" className="eyebrow">{t.eyebrow}</Reveal>
        <Reveal as="h2" className="section-title">{t.title}</Reveal>

        <div className="timeline">
          {t.detailed.map((exp, i) => (
            <Reveal as="div" className="tl-item" delay={i * 90} key={exp.role}>
              <p className="tl-period">{exp.period}</p>
              <h3 className="tl-role">{exp.role}</h3>
              <p className="tl-org">{exp.org}</p>
              <ul>
                {exp.items.map((item) => (
                  <li key={item.slice(0, 24)}>{item}</li>
                ))}
              </ul>
              {exp.key && EXPERIENCE_STACKS[exp.key] && (
                <div className="pill-row tl-stack">
                  {EXPERIENCE_STACKS[exp.key].map((tech) => (
                    <span className="pill pill--sm" key={tech}>{tech}</span>
                  ))}
                </div>
              )}
            </Reveal>
          ))}
          {t.condensed.map((exp, i) => (
            <Reveal as="div" className="tl-condensed" delay={i * 70} key={exp.role}>
              <p className="tl-period">{exp.period}</p>
              <h3 className="tl-role tl-role--sm">{exp.role}</h3>
              <p>{exp.org}</p>
              {exp.key && EXPERIENCE_STACKS[exp.key] && (
                <div className="pill-row tl-stack tl-stack--condensed">
                  {EXPERIENCE_STACKS[exp.key].map((tech) => (
                    <span className="pill pill--sm" key={tech}>{tech}</span>
                  ))}
                </div>
              )}
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
