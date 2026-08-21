import { SKILLS_DATA, translations } from '../data/translations.js'
import { useLanguage } from '../context/LanguageContext.jsx'
import Reveal from './Reveal.jsx'

export default function Skills() {
  const { lang } = useLanguage()
  const t = translations[lang].skills

  return (
    <section id="competencias">
      <div className="wrap">
        <Reveal as="p" className="eyebrow">{t.eyebrow}</Reveal>
        <Reveal as="h2" className="section-title">{t.title}</Reveal>

        <div className="skills-grid">
          {SKILLS_DATA.map((group, i) => (
            <Reveal as="div" className="skill-group" delay={i * 80} key={group.key}>
              <h3>{t.groups[group.key]}</h3>
              <div className="pill-row">
                {group.items.map((item) => (
                  <span className="pill" key={item}>{item}</span>
                ))}
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
