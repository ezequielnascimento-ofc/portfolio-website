import React from 'react'
import ReactDOM from 'react-dom/client'
import { LanguageProvider } from './context/LanguageContext.jsx'
import CasePlataformaMcp from './components/case/CasePlataformaMcp.jsx'
import CaseAgendaPerto from './components/case/CaseAgendaPerto.jsx'
import { plataformaMcp } from './data/cases/plataformaMcp.js'
import { agendaPerto } from './data/cases/agendaPerto.js'
import './index.css'
import { initAnchorScroll } from './anchorScroll.js'

// Cada página de caso diz qual caso é em <div id="root" data-case="…">.
const CASES = {
  'plataforma-mcp': { Page: CasePlataformaMcp, data: plataformaMcp },
  'agenda-perto': { Page: CaseAgendaPerto, data: agendaPerto },
}

initAnchorScroll()

const root = document.getElementById('root')
const { Page, data } = CASES[root.dataset.case]
const pageMeta = (lang) => data(lang).meta

ReactDOM.createRoot(root).render(
  <React.StrictMode>
    <LanguageProvider pageMeta={pageMeta}>
      <Page />
    </LanguageProvider>
  </React.StrictMode>,
)
