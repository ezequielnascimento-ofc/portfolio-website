import { useLanguage } from '../context/LanguageContext.jsx'

export default function Experience() {
  const { t } = useLanguage()
  const e = t.experience
  return (
    <section id="experiencia" className="screen" aria-labelledby="exp-titulo">
      <div className="wrap experience">
        <div className="exp-side">
          <h2 id="exp-titulo" className="section-title">{e.title}</h2>
          <p className="exp-intro">
            {e.intro}
            <span className="accent">.</span>
          </p>
          <p className="exp-edu">{e.education}</p>
        </div>
        <ol className="jobs">
          {e.jobs.map((j, i) => (
            <li key={j.role} className={`job ${i === 0 ? 'job--current' : ''}`}>
              <span className="job-period mono">{j.period}</span>
              <h3 className="job-role">{j.role}</h3>
              <p className="job-text">{j.text}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  )
}
