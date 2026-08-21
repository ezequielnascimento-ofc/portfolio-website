import { useEffect } from 'react'
import { LanguageProvider, useLanguage } from './context/LanguageContext.jsx'
import Nav from './components/Nav.jsx'
import Hero from './components/Hero.jsx'
import About from './components/About.jsx'
import Experience from './components/Experience.jsx'
import Skills from './components/Skills.jsx'
import Education from './components/Education.jsx'
import Contact, { Footer } from './components/Contact.jsx'

function DocumentLang() {
  const { lang } = useLanguage()
  useEffect(() => {
    document.documentElement.lang = lang
  }, [lang])
  return null
}

function Page() {
  return (
    <>
      <DocumentLang />
      <Nav />
      <Hero />
      <About />
      <Experience />
      <Skills />
      <Education />
      <Contact />
      <Footer />
    </>
  )
}

export default function App() {
  return (
    <LanguageProvider>
      <Page />
    </LanguageProvider>
  )
}
