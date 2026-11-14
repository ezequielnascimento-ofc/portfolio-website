import React from 'react'
import ReactDOM from 'react-dom/client'
import { LanguageProvider } from './context/LanguageContext.jsx'
import CasePlataformaMcp from './components/case/CasePlataformaMcp.jsx'
import { plataformaMcp } from './data/cases/plataformaMcp.js'
import './index.css'
import { initAnchorScroll } from './anchorScroll.js'

initAnchorScroll()

const pageMeta = (lang) => plataformaMcp(lang).meta

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <LanguageProvider pageMeta={pageMeta}>
      <CasePlataformaMcp />
    </LanguageProvider>
  </React.StrictMode>,
)
