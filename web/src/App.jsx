import { LanguageProvider } from './context/LanguageContext.jsx'
import Hero from './components/Hero.jsx'
import Projects from './components/Projects.jsx'
import Method from './components/Method.jsx'
import Experience from './components/Experience.jsx'
import Contact from './components/Contact.jsx'

export default function App() {
  return (
    <LanguageProvider>
      <main>
        <Hero />
        <Projects />
        <Method />
        <Experience />
        <Contact />
      </main>
    </LanguageProvider>
  )
}
